<template>
    <div
        :class="[
            'c-card flex flex-col gap-3',
            clickable
                ? 'hover:cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-300'
                : '',
        ]"
    >
        <div class="flex justify-between gap-3">
            <div class="text-2xl font-semibold h-full">
                {{ quiz.quiz_type_name }}
            </div>
            <i :class="[quiz.type_icon, '!text-2xl']" />
        </div>

        <slot name="default" />
        <div class="flex justify-between items-end">
            <Tag
                :icon="quiz.status_icon || undefined"
                :value="quiz.quiz_status_name"
                :severity="quiz.status_severity || undefined"
            />
            <div class="text-muted-color">{{ quiz.question_count }} Fragen</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

defineProps<{
    quiz: Database["public"]["Views"]["vw_quiz"]["Row"];
    clickable?: boolean;
}>();
</script>
