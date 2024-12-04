<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
        <slot />
        <NavigationCard
            v-for="navigationEntry in navigationEntriesWithoutDashboard"
            :key="navigationEntry.label"
            v-tooltip.bottom="{
                value: `Navigieren Sie zu der Seite '${navigationEntry.label}''.`,
                showDelay: 500,
                hideDelay: 250,
            }"
            :navigation-entry="navigationEntry"
        />
    </div>
</template>

<script setup lang="ts">
const { navigationEntries } = useNavigationEntries();

const navigationEntriesWithoutDashboard = computed(() =>
    navigationEntries.value.filter((entry) => entry.label !== "Dashboard"),
);
</script>
