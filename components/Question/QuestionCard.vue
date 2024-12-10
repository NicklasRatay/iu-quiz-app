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
            <div class="flex flex-wrap gap-2 h-min">
                <Tag
                    v-for="course in question.courses"
                    :key="course"
                    :value="course"
                    severity="primary"
                />
                <Tag
                    v-for="category in question.categories"
                    :key="category"
                    :value="category"
                    severity="secondary"
                />
            </div>
            <slot name="top-right-corner" />
        </div>
        <div class="text-xl font-semibold h-full">{{ question.question }}</div>
        <slot name="default" />
        <div
            v-if="!hideStatusAndDate"
            class="flex justify-between items-end"
        >
            <Tag
                :icon="question.status_icon || undefined"
                :value="question.question_status_name"
                :severity="question.status_severity || undefined"
            />
            <div class="text-muted-color">
                {{
                    question.created_at
                        ? new Date(question.created_at).toLocaleDateString()
                        : null
                }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

defineProps<{
    question: Database["public"]["Views"]["vw_question"]["Row"];
    hideStatusAndDate?: boolean;
    clickable?: boolean;
}>();
</script>
