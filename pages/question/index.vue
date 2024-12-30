<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-question"
            title="Eigene Fragen"
            subtitle="Alle selbsterstellten Fragen."
            return-button-route="/"
        />
        <QuestionCardList
            v-if="questions"
            :questions="questions"
            new-question-button
            @question-clicked="navigateTo('/question/' + $event.id)"
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
            .eq("created_by", user.value.id);
        if (error) {
            simpleToast.error(error.message);
            return;
        }
        questions.value = data;
    }
});
</script>
