<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-question"
            title="Eigene Frage"
            subtitle="Selbsterstellte Frage."
            return-button-route="/question"
        />
        <QuestionFormEdit
            :question-id="questionId"
            @submitted="handleSubmit"
        >
            <Button
                v-tooltip.bottom="{
                    value: 'Speichert alle Änderungen und reicht die Frage zur Validierung ein.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                type="submit"
                label="Speichern und Einreichen"
                icon="pi pi-send"
                size="large"
                class="w-full h-20"
            />
        </QuestionFormEdit>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const route = useRoute();
const param = route.params.id;
const questionId = isNaN(Number(param)) ? null : Number(param);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();
const simpleDialog = useSimpleDialog();

const handleSubmit = async (event: FormSubmitEvent) => {
    if (questionId) {
        simpleDialog.confirm({
            header: "Achtung",
            message:
                'Der Status der Frage wird dadurch auf "Eingereicht" zurückgesetzt und somit erneut zur Validierung abgeschickt.', // eslint-disable-line @stylistic/quotes
            icon: "pi pi-exclamation-triangle",
            acceptCallback: async () => await updateQuestion(event),
        });
    } else {
        await insertQuestion(event);
    }
};

const insertQuestion = async (values: FormSubmitEvent) => {
    const { error } = await supabase.rpc("insert_question_with_details", {
        json_input: { ...values.values, question_status_id: 1 },
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.success("Frage zum Validieren eingereicht.");
    navigateTo("/question");
};

const updateQuestion = async (values: FormSubmitEvent) => {
    const { error } = await supabase.rpc("update_question_with_details", {
        json_input: { ...values.values, question_status_id: 1 },
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.success("Frage zum Validieren eingereicht.");
    navigateTo("/question");
};
</script>
