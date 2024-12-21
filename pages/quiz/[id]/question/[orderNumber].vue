<template>
    <div>
        <CommonIconTitle
            icon="pi-question-circle"
            :title="title"
            :subtitle="subtitle"
            return-button-route="/quiz/"
            return-button-label="Quiz Abbrechen"
            class="mb-3"
        />
        <QuizQuestionForm
            :quiz-id="quizId"
            :quiz-question-order-number="quizQuestionOrderNumber"
        />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const params = route.params;
const quizId = Number(params.id);
const quizQuestionOrderNumber = Number(params.orderNumber);

const title = `Frage ${quizQuestionOrderNumber}`;
const subtitle = "Für einen Bonuspunkt ohne Lösungshinweis beantworten.";
</script>
