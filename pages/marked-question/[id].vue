<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-bookmark"
            title="Markierte Frage"
            subtitle="Frage, die während eines Quizzes markiert worden ist."
            return-button-route="/marked-question"
        />
        <QuestionFormView :question-id="questionId">
            <Button
                v-tooltip.bottom="{
                    value: 'Entfernt die persönliche Markierung von dieser Frage.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Markierung Entfernen"
                icon="pi pi-bookmark "
                severity="danger"
                size="large"
                class="w-full h-20"
                @click="unmarkQuestionWithConfirm"
            />
        </QuestionFormView>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const route = useRoute();
const param = route.params.id;
const questionId = isNaN(Number(param)) ? null : Number(param);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();
const simpleDialog = useSimpleDialog();

const unmarkQuestion = async () => {
    if (!questionId) {
        return;
    }

    const { error } = await supabase
        .from("marked_question")
        .delete()
        .eq("question_id", questionId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.success("Markierung entfernt.");
    navigateTo("/marked-question");
};

const unmarkQuestionWithConfirm = () => {
    simpleDialog.confirmDeletion({
        acceptCallback: unmarkQuestion,
    });
};
</script>
