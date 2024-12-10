<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-verified"
            title="Eingereichte Fragen"
            subtitle="Alle Fragen, deren Validierung noch aussteht."
            return-button-route="/"
        />
        <QuestionCardList
            v-if="questions"
            :questions="questions"
            hide-status-filter
            @question-clicked="navigateTo('/submitted-question/' + $event.id)"
        />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const questions = ref<Array<Database["public"]["Views"]["vw_question"]["Row"]>>(
    [],
);

onMounted(async () => {
    if (user.value?.id) {
        const { data, error } = await supabase
            .from("vw_question")
            .select("*")
            .eq("question_status_id", 1);
        if (error) {
            simpleToast.error(error.message);
            return;
        }
        questions.value = data;
    }
});
</script>
