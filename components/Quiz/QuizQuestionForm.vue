<template>
    <div
        v-if="!loading"
        class="flex flex-col gap-6"
    >
        <QuestionCard
            v-if="question"
            :question="question"
            :hide-status-and-date="true"
        >
            <template #top-right-corner>
                <Button
                    v-tooltip.bottom="{
                        value: 'Setzen Sie eine persönliche Markierung, um die Frage später unter [Markierte Fragen] wiederzufinden.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    icon="pi pi-bookmark"
                    :label="getMarkButtonLabel"
                    severity="secondary"
                    :disabled="isQuestionMarked"
                    @click="markQuestion"
                />
            </template>
            <template #default>
                <Inplace v-if="question?.hint">
                    <template #display>
                        <div
                            v-tooltip.bottom="{
                                value: 'Durch Verwendung des Lösungshinweises verzichten Sie auf einen Bonuspunkt.',
                                showDelay: 500,
                                hideDelay: 250,
                            }"
                            @click="hasUsedHint = true"
                        >
                            Lösungshinweis Anzeigen
                        </div>
                    </template>
                    <template #content>
                        <Message
                            icon="pi pi-info-circle"
                            severity="secondary"
                            class="max-w-fit"
                        >
                            {{ question?.hint }}
                        </Message>
                    </template>
                </Inplace>
            </template>
        </QuestionCard>
        <CommonIconTitle
            icon="pi pi-check-circle"
            title="Antwortmöglichkeiten"
            subtitle="Null bis Vier können richtig sein."
        >
            <div
                class="text-6xl text-center transition-colors duration-1000 ease-linear"
                :style="{ color: timerColor }"
            >
                {{ remainingSeconds }}
            </div>
        </CommonIconTitle>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
                v-for="answer in answers || []"
                :key="answer.id"
                :class="[
                    'c-card flex flex-col gap-6 justify-between transition-colors duration-200',
                    areAnswersClickable
                        ? 'hover:cursor-pointer select-none'
                        : '',
                    getCardColor(
                        answerAttempts.find(
                            (a) => a.answerOptionId === answer.id,
                        )?.isSelectedAsCorrect ?? false,
                    ),
                ]"
                @click="toggleAnswer(answer.id)"
            >
                <div class="flex justify-between items-start gap-6">
                    <div class="text-xl font-semibold">
                        {{ answer.answer }}
                    </div>
                    <Badge
                        v-if="quiz?.quiz_type_id === QuizType.Coop"
                        :value="
                            answerAttempts.find(
                                (a) => a.answerOptionId === answer.id,
                            )?.selectedCount
                        "
                        :severity="
                            answerAttempts.find(
                                (a) => a.answerOptionId === answer.id,
                            )?.selectedCount || 0 > 0
                                ? undefined
                                : 'secondary'
                        "
                        size="xlarge"
                    />
                </div>
                <div
                    v-if="isSolutionVisible"
                    class="flex justify-between items-end gap-6"
                >
                    <Message
                        v-if="answer.justification"
                        icon="pi pi-info-circle"
                        severity="secondary"
                        class="max-w-fit"
                    >
                        {{ answer.justification }}
                    </Message>
                    <Message
                        :icon="
                            getReason(
                                answer.is_correct,
                                answerAttempts.find(
                                    (a) => a.answerOptionId === answer.id,
                                )?.isSelectedAsCorrect ?? false,
                            ).icon
                        "
                        :severity="
                            getReason(
                                answer.is_correct,
                                answerAttempts.find(
                                    (a) => a.answerOptionId === answer.id,
                                )?.isSelectedAsCorrect ?? false,
                            ).severity
                        "
                        class="w-fit h-min"
                    >
                        {{
                            getReason(
                                answer.is_correct,
                                answerAttempts.find(
                                    (a) => a.answerOptionId === answer.id,
                                )?.isSelectedAsCorrect ?? false,
                            ).message
                        }}
                    </Message>
                </div>
            </div>
        </div>
        <Button
            v-if="!isSubmitted"
            v-tooltip.bottom="{
                value: 'Nach dem Absenden können Sie Ihre Antworten nicht mehr ändern.',
                showDelay: 500,
                hideDelay: 250,
            }"
            label="Lösungsversuch Abschicken"
            icon="pi pi-send"
            size="large"
            class="h-20"
            @click="submitAttempt()"
        />
        <Button
            v-if="isSolutionVisible"
            v-tooltip.bottom="{
                value: 'Alle Teilnehmenden haben ihre Lösungsversuche abgegeben. Klicken Sie hier, um zur nächsten Frage zu gelangen.',
                showDelay: 500,
                hideDelay: 250,
            }"
            label="Weiter"
            icon="pi pi-arrow-right"
            size="large"
            class="h-20"
            @click="navigateEveryoneToNextPage()"
        />
        <Button
            v-if="isSubmitted && !isSolutionVisible"
            v-tooltip.bottom="{
                value: 'Warten Sie, bis alle Teilnehmenden ihre Lösungsversuche abgegeben haben.',
                showDelay: 500,
                hideDelay: 250,
            }"
            :label="`${totalSubmissions} von ${allParticipants!.length} Teilnehmenden abgegeben`"
            icon="pi pi-hourglass"
            size="large"
            class="h-20"
            disabled
        />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";
import { QuizStatus, QuizType } from "~/utils/enums";

const props = defineProps<{
    quizId: number | null;
    quizQuestionOrderNumber: number | null;
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const isSubmitted = ref(false);
const isSolutionVisible = ref(false);
const areAnswersClickable = computed(() => !isSubmitted.value);
const hasUsedHint = ref(false);

const channelName = `quiz-question-channel-${props.quizId}-${props.quizQuestionOrderNumber}`;

const allParticipants =
    ref<Array<Database["public"]["Tables"]["quiz_participant"]["Row"]>>();
const currentParticipant =
    ref<Database["public"]["Tables"]["quiz_participant"]["Row"]>();
const quiz = ref<Database["public"]["Views"]["vw_quiz"]["Row"]>();
const quizQuestionId = ref<number | null>(null);
const questionId = ref<number | null>(null);
const question = ref<Database["public"]["Views"]["vw_question"]["Row"]>();
const answers =
    ref<Array<Database["public"]["Tables"]["answer_option"]["Row"]>>();
const answerAttempts = ref<
    Array<{
        answerOptionId: number;
        isSelectedAsCorrect: boolean;
        selectedCount: number;
    }>
>([]);

const loading = ref(true);

const loadQuizParticipant = async () => {
    if (!props.quizId || !user.value?.id) {
        return;
    }

    const { data, error } = await supabase
        .from("quiz_participant")
        .select("*")
        .eq("quiz_id", props.quizId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    allParticipants.value = data;
    currentParticipant.value = data.find(
        (participant) => participant.user_id === user.value?.id,
    );
};

const loadQuiz = async () => {
    if (!props.quizId) {
        return;
    }

    const { data, error } = await supabase
        .from("vw_quiz")
        .select("*")
        .eq("id", props.quizId)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    quiz.value = data;
};

const loadQuestionId = async () => {
    if (!props.quizId) {
        return;
    }

    const { data, error } = await supabase
        .from("quiz_question")
        .select("*")
        .eq("quiz_id", props.quizId)
        .eq("order_number", props.quizQuestionOrderNumber ?? 1)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    quizQuestionId.value = data.id;
    questionId.value = data.question_id;
};

const loadQuestionAndAnswers = async () => {
    const questionData = useQuestionData();
    const data = await questionData.load(questionId.value);
    question.value = data.question;
    answers.value = data.answers;
    answerAttempts.value = (answers.value ?? []).map((answer) => ({
        answerOptionId: answer.id,
        isSelectedAsCorrect: false,
        selectedCount: 0,
    }));
};

const loadMarkedQuestion = async () => {
    if (!questionId.value || !user.value?.id) {
        return;
    }

    const { data, error } = await supabase
        .from("marked_question")
        .select("*")
        .eq("question_id", questionId.value)
        .eq("user_id", user.value?.id);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    isQuestionMarked.value = data.length > 0;
};

const totalSubmissions = ref(0);
const increaseSelectedCounter = (
    submittedAnswers: Array<{
        answer_option_id: number;
        is_selected_as_correct: boolean;
    }>,
) => {
    // Increase the selected counter for each answer
    submittedAnswers.forEach((submittedAnswer) => {
        const answerIndex = answerAttempts.value.findIndex(
            (a) =>
                a.answerOptionId === submittedAnswer.answer_option_id &&
                submittedAnswer.is_selected_as_correct,
        );
        if (answerIndex === -1) {
            return;
        }

        answerAttempts.value[answerIndex].selectedCount++;
    });

    // Show solution if everyone submitted
    totalSubmissions.value++;
    if (totalSubmissions.value === allParticipants.value?.length) {
        isSolutionVisible.value = true;
        stopCountdown();
    }
};

const attachRealtimeListeners = () => {
    // Get channel of current quiz question
    const channel = supabase.channel(channelName);

    // Listen to other users submitting their attempts to update the answers
    channel
        .on("broadcast", { event: "attempt-submitted" }, (payload) =>
            increaseSelectedCounter(payload.payload.answer_attempts),
        )
        .on("broadcast", { event: "continue-button-clicked" }, () =>
            goToNextPage(),
        )
        .subscribe();
};

const goToNextPage = () => {
    if (quiz.value?.question_count === props.quizQuestionOrderNumber) {
        navigateTo(`/quiz/${props.quizId}/result`);
    } else {
        navigateTo(
            `/quiz/${props.quizId}/question/${
                (props.quizQuestionOrderNumber ?? 0) + 1
            }`,
        );
    }
};

onMounted(async () => {
    Promise.all([loadQuizParticipant(), loadQuiz()]);
    await loadQuestionId();
    await loadQuestionAndAnswers();
    await loadMarkedQuestion();

    attachRealtimeListeners();
    startCountdown(quiz.value?.seconds_per_question ?? 30);
    loading.value = false;
});

const toggleAnswer = (answerId: number) => {
    if (isSubmitted.value) {
        return;
    }

    // Get index of the answer in the attempts array
    const answerIndex = answerAttempts.value.findIndex(
        (a) => a.answerOptionId === answerId,
    );
    if (answerIndex === -1) {
        return;
    }

    // Toggle the selection of the answer
    answerAttempts.value[answerIndex].isSelectedAsCorrect =
        !answerAttempts.value[answerIndex].isSelectedAsCorrect;
};

const getCardColor = (isSelected: boolean) => {
    return isSelected ? "!bg-primary-400 !bg-opacity-30" : "";
};

const getReason = (isCorrect: boolean, isSelected: boolean) => {
    switch (true) {
        case isCorrect && isSelected:
            return {
                message: "Richtig ausgewählt.",
                severity: "success",
                icon: "pi pi-check-circle",
            };
        case isCorrect && !isSelected:
            return {
                message: "Nicht ausgewählt, aber richtig.",
                severity: "error",
                icon: "pi pi-times-circle",
            };
        case !isCorrect && isSelected:
            return {
                message: "Falsch ausgewählt.",
                severity: "error",
                icon: "pi pi-times-circle",
            };
        case !isCorrect && !isSelected:
            return {
                message: "Nicht ausgewählt und falsch.",
                severity: "success",
                icon: "pi pi-check-circle",
            };
        default:
            return {};
    }
};

const submitAttempt = async () => {
    if (
        !props.quizId ||
        !quizQuestionId.value ||
        !currentParticipant.value?.id
    ) {
        return;
    }

    const { data, error } = await supabase.rpc(
        "create_question_attempt_with_answers",
        {
            p_quiz_participant_id: currentParticipant.value?.id,
            p_quiz_question_id: quizQuestionId.value,
            p_has_used_hint: hasUsedHint.value,
            p_answers: answerAttempts.value.map((a) => ({
                answer_option_id: a.answerOptionId,
                is_selected_as_correct: a.isSelectedAsCorrect,
            })),
        },
    );
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    cancelCountdownCallback();

    const channel = supabase.channel(channelName);
    channel.send({
        type: "broadcast",
        event: "attempt-submitted",
        payload: data,
    });

    isSubmitted.value = true;
    simpleToast.success("Lösungsversuch gespeichert.");
};

const navigateEveryoneToNextPage = async () => {
    if (!props.quizId) {
        return;
    }

    const { error } = await supabase
        .from("quiz")
        .update({ quiz_status_id: QuizStatus.Completed })
        .eq("id", props.quizId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    const channel = supabase.channel(channelName);
    channel.send({
        type: "broadcast",
        event: "continue-button-clicked",
        payload: {},
    });
};

const {
    remainingSeconds,
    startCountdown,
    stopCountdown,
    cancelCountdownCallback,
} = useCountdown(submitAttempt);

onUnmounted(() => {
    stopCountdown();
});

// Custom start and end colors
const startColor = { r: 50, g: 200, b: 150 };
const endColor = { r: 200, g: 0, b: 50 };

// Compute the countdown color dynamically based on the remaining seconds
const timerColor = computed(() => {
    if (remainingSeconds.value === null) return "gray"; // Default color for no timer
    const fraction =
        remainingSeconds.value / (quiz.value?.seconds_per_question ?? 30); // Normalize to 0-1 range

    // Interpolate each RGB component
    const r = Math.round(endColor.r + fraction * (startColor.r - endColor.r));
    const g = Math.round(endColor.g + fraction * (startColor.g - endColor.g));
    const b = Math.round(endColor.b + fraction * (startColor.b - endColor.b));

    return `rgb(${r}, ${g}, ${b})`; // Generate the color
});

const isQuestionMarked = ref(false);

const getMarkButtonLabel = computed(() => {
    if (isMobile.value) {
        return undefined;
    }

    if (isQuestionMarked.value) {
        return "Frage Markiert";
    }

    return "Frage Markieren";
});

const markQuestion = async () => {
    if (!questionId.value || !user.value?.id || isQuestionMarked.value) {
        return;
    }

    const { error } = await supabase.from("marked_question").insert({
        question_id: questionId.value,
        user_id: user.value?.id,
    } as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    isQuestionMarked.value = true;
    simpleToast.success("Frage markiert.");
};
</script>
