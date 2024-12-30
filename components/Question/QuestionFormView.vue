<template>
    <div v-if="!loading">
        <QuestionCard
            v-if="question"
            :question="question"
            class="mb-6"
        >
            <template #top-right-corner>
                <ToggleButton
                    v-model="areHintsVisible"
                    v-tooltip.bottom="{
                        value: 'Zeigt die Lösungen zu dieser Frage an oder blendet sie wieder aus.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    on-icon="pi pi-eye"
                    on-label="Lösung"
                    off-icon="pi pi-eye-slash"
                    off-label="Lösung"
                    class="w-24 h-min"
                />
            </template>
            <Inplace v-if="question?.hint">
                <template #display>
                    <div
                        v-tooltip.bottom="{
                            value: 'Zeigt einen Hinweis zur Lösung dieser Frage an.',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
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
        </QuestionCard>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div
                v-for="answer in answers || []"
                :key="answer.id"
                class="c-card flex flex-col gap-6 justify-between"
            >
                <div class="flex gap-6 justify-between">
                    <div class="text-xl font-semibold">
                        {{ answer.answer }}
                    </div>
                    <Message
                        v-if="areHintsVisible"
                        :icon="
                            answer.is_correct
                                ? 'pi pi-check-circle'
                                : 'pi pi-times-circle'
                        "
                        :severity="answer.is_correct ? 'success' : 'error'"
                        class="h-min"
                    >
                        {{ answer.is_correct ? "Richtig" : "Falsch" }}
                    </Message>
                </div>
                <Message
                    v-if="areHintsVisible && answer.justification"
                    icon="pi pi-info-circle"
                    severity="secondary"
                    class="max-w-fit"
                >
                    {{ answer.justification }}
                </Message>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    questionId: number | null;
}>();

const areHintsVisible = ref(false);

const question = ref<Database["public"]["Views"]["vw_question"]["Row"]>();
const answers =
    ref<Array<Database["public"]["Tables"]["answer_option"]["Row"]>>();

const loading = ref(true);

onMounted(async () => {
    const questionData = useQuestionData();
    const data = await questionData.load(props.questionId);
    question.value = data.question;
    answers.value = data.answers;
    loading.value = false;
});
</script>
