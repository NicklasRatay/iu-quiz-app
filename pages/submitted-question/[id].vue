<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-verified"
            title="Eingereichte Frage"
            subtitle="Frage, dessen Validierung noch aussteht."
            return-button-route="/submitted-question"
        />
        <QuestionFormEdit
            :question-id="question_id"
            @submitted="handleSubmit"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                    type="submit"
                    label="Speichern und Akzeptieren"
                    icon="pi pi-verified"
                    severity="success"
                    size="large"
                    class="w-full h-20"
                    @click="buttonPressed = 'accept'"
                />
                <Button
                    type="submit"
                    label="Speichern und Ablehnen"
                    icon="pi pi-ban"
                    severity="danger"
                    size="large"
                    class="w-full h-20"
                    @click="buttonPressed = 'reject'"
                />
            </div>
        </QuestionFormEdit>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const route = useRoute();
const param = route.params.id;
const question_id = isNaN(Number(param)) ? null : Number(param);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const buttonPressed = ref<"accept" | "reject">();

const handleSubmit = async (event: FormSubmitEvent) => {
    let questionStatusId;
    let successMessage;
    switch (buttonPressed.value) {
        case "accept":
            questionStatusId = 2;
            successMessage = "Frage akzeptiert.";
            break;
        case "reject":
            questionStatusId = 3;
            successMessage = "Frage abgelehnt.";
            break;
        default:
            return;
    }

    const { error } = await supabase.rpc("update_question_with_details", {
        json_input: { ...event.values, question_status_id: questionStatusId },
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.success(successMessage);
    navigateTo("/submitted-question");
};
</script>
