<template>
    <div>
        <div
            :class="[
                'grid grid-cols-1 gap-6 mb-6',
                !isSinglePlayer ? 'sm:grid-cols-2' : '',
            ]"
        >
            <Button
                v-if="isQuizPending && !isSinglePlayer"
                v-tooltip.bottom="{
                    value: `Über diesen Link können Sie andere Studierende mit Zugang zu ${APP_NAME} einladen, an diesem Quiz teilzunehmen.`,
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-envelope"
                label="Einladungslink Kopieren"
                severity="secondary"
                size="large"
                class="w-full h-full min-h-20"
                @click="copyInviteLink()"
            />
            <Button
                v-if="isQuizPending"
                v-tooltip.bottom="{
                    value: 'Startet das Quiz und navigiert alle Teilnehmenden zu der ersten Frage.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-play-circle"
                label="Quiz Starten"
                size="large"
                class="w-full h-full min-h-20"
                @click="startQuiz()"
            />
        </div>
        <div
            class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
            <QuizParticipantCard
                v-for="profile in participants"
                :key="profile.user_id ?? undefined"
                :participant="profile"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { APP_NAME } from "~/utils/constants";
import type { Database } from "~/supabase/types";
import { QuizStatus, QuizType } from "~/utils/enums";

const props = defineProps<{
    quizId: number;
}>();

const router = useRouter();
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const participants = ref<
    Array<Database["public"]["Views"]["vw_quiz_participant"]["Row"]>
>([]);

const quiz = ref<Database["public"]["Tables"]["quiz"]["Row"] | null>(null);
const isQuizPending = computed(
    () => quiz.value?.quiz_status_id === QuizStatus.Pending,
);
const isSinglePlayer = computed(
    () => quiz.value?.quiz_type_id === QuizType.Singleplayer,
);

const channelName = "quiz-channel-" + props.quizId;

const loadQuiz = async () => {
    const { data, error } = await supabase
        .from("quiz")
        .select("*")
        .eq("id", props.quizId)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    quiz.value = data;
};

const joinQuiz = async () => {
    if (!user.value) {
        return;
    }

    // Get channel of opened quiz
    const channel = supabase.channel(channelName);

    channel
        // Listen to other users joining the quiz to update the profiles list
        .on("broadcast", { event: "user-joined" }, (payload) => {
            participants.value.push(payload.payload.profile);
        })
        // Listen to quiz start event to navigate to the first quiz question
        .on("broadcast", { event: "quiz-started" }, () => {
            navigateTo(`/quiz/${props.quizId}/question/1`);
        })
        .subscribe();

    const { data: quizParticipantData } = await supabase
        .from("quiz_participant")
        .select("*")
        .eq("quiz_id", props.quizId)
        .eq("user_id", user.value.id);

    // If the user has already joined the quiz and still is active, do nothing
    if (!quizParticipantData || quizParticipantData?.length > 0) {
        return;
    }

    // Create quiz_participant entry for the user
    const { error: insertError } = await supabase
        .from("quiz_participant")
        .insert({
            quiz_id: props.quizId,
            user_id: user.value.id,
        } as never);
    if (insertError) {
        simpleToast.error(insertError.message);
        return;
    }

    // Get the profile of the current user
    const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.value.id)
        .single();
    if (profileError) {
        simpleToast.error(profileError.message);
        return;
    }

    // Send a message to the channel that the user has joined
    channel.send({
        type: "broadcast",
        event: "user-joined",
        payload: { profile: profileData },
    });
};

const loadParticipants = async () => {
    const { data, error } = await supabase
        .from("vw_quiz_participant")
        .select("*")
        .eq("quiz_id", props.quizId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    participants.value = data;
};

onMounted(async () => {
    await loadQuiz();

    if (isQuizPending.value) {
        await joinQuiz();
    }

    await loadParticipants();
});

const copyInviteLink = async () => {
    const currentUrl = `${window.location.origin}${router.currentRoute.value.fullPath}`;

    try {
        await navigator.clipboard.writeText(currentUrl);
        simpleToast.info("Einladungslink wurde in die Zwischenablage kopiert.");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        simpleToast.error("Fehler beim Kopieren des Einladungslinks: ");
    }
};

const startQuiz = async () => {
    const { error } = await supabase
        .from("quiz")
        .update({ quiz_status_id: QuizStatus.Active })
        .eq("id", props.quizId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    const channel = supabase.channel(channelName);
    channel.send({
        type: "broadcast",
        event: "quiz-started",
        payload: {},
    });
};
</script>
