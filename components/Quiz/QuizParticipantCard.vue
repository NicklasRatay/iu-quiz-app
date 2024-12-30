<template>
    <div
        :class="[
            'c-card',
            clickable
                ? 'hover:cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-300'
                : '',
        ]"
    >
        <div class="flex items-center gap-6">
            <div
                class="flex items-center justify-center rounded-full bg-primary size-14 text-primary-contrast text-2xl font-semibold"
            >
                {{ initials }}
            </div>
            <div>
                <div class="text-xl">{{ fullName }}</div>
                <a
                    :href="'mailto:' + participant.email"
                    class="text-primary-emphasis-alt"
                >
                    {{ participant.email }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    participant: Database["public"]["Views"]["vw_quiz_participant"]["Row"];
    clickable?: boolean;
}>();

const initials = computed(() => {
    return (
        (props.participant.first_name?.[0] || "").toUpperCase() +
        (props.participant.last_name?.[0] || "").toUpperCase()
    );
});

const fullName = computed(() => {
    return props.participant.first_name + " " + props.participant.last_name;
});
</script>
