<template>
    <div
        v-if="!loading && quizId"
        class="flex flex-col gap-6"
    >
        <QuizLeaderboardTable
            v-if="quiz?.quiz_type_id === QuizType.Versus"
            :quiz-id="quizId"
        />
        <QuizResultTable
            v-else
            :quiz-id="quizId"
            :single-view="quiz?.quiz_type_id === QuizType.Singleplayer"
        />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const route = useRoute();
const param = route.params.id;
const quizId = isNaN(Number(param)) ? null : Number(param);

const loading = ref(true);

const quiz = ref<Database["public"]["Views"]["vw_quiz"]["Row"]>();

const loadData = async () => {
    if (!quizId) {
        return;
    }

    const { data, error } = await supabase
        .from("vw_quiz")
        .select("*")
        .eq("id", quizId)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    quiz.value = data;
};

onMounted(async () => {
    loadData();
    loading.value = false;
});
</script>
