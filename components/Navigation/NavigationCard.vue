<template>
    <NuxtLink
        class="c-card text-center hover:cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-300"
        :to="navigationEntry.route"
    >
        <i :class="[navigationEntry.icon, '!text-4xl']" />
        <div class="text-2xl">{{ navigationEntry.label }}</div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    navigationEntry: {
        label: string;
        icon: string;
        route: string;
    };
}>();
</script>
