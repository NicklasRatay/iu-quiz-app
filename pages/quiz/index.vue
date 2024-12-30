<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-list-check"
            title="Quizze"
            subtitle="Erstellen oder Beitreten von Quizzen."
            return-button-route="/"
        />
        <QuizCardList
            v-if="quizzes"
            :quizzes="quizzes"
            new-quiz-button
            @quiz-clicked="handleCardClick($event)"
        />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const quizzes = ref<Array<Database["public"]["Views"]["vw_quiz"]["Row"]>>([]);

onMounted(async () => {
    if (user.value?.id) {
        const { data, error } = await supabase.rpc(
            "get_interactable_quizzes_for_user",
            { p_user_id: user.value.id },
        );
        if (error) {
            simpleToast.error(error.message);
            return;
        }
        quizzes.value = data;
    }
});

const handleCardClick = (
    quiz: Database["public"]["Views"]["vw_quiz"]["Row"],
) => {
    if (quiz.quiz_status_id === 1) {
        navigateTo(`/quiz/${quiz.id}`);
    } else {
        navigateTo(`/quiz/${quiz.id}/result`);
    }
};
</script>
