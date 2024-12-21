<template>
    <div class="flex flex-col gap-6">
        <CommonIconTitle
            icon="pi-list-check"
            :title="title"
            :subtitle="subtitle"
            return-button-route="/quiz"
        />
        <QuizFormCreate v-if="!quizId" />
        <QuizLobby
            v-else
            :quiz-id="quizId"
        />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const param = route.params.id;
const quizId = isNaN(Number(param)) ? null : Number(param);

const title = quizId ? "Ausstehendes Quiz" : "Neues Quiz";
const subtitle = quizId
    ? "Übersicht vor dem Quiz-Start"
    : "Individuelles oder kollaboratives Quiz erstellen.";
</script>
