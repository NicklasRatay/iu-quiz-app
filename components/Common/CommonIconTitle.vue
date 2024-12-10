<template>
    <div class="flex gap-3 items-center justify-between">
        <div class="flex gap-6 items-center">
            <i :class="[icon, 'pi !text-3xl']" />
            <div>
                <div class="text-2xl font-semibold">{{ title }}</div>
                <div v-if="subtitle">
                    {{ subtitle }}
                </div>
            </div>
        </div>
        <div class="flex gap-6 items-center">
            <slot />
            <Button
                v-if="returnButtonRoute"
                v-tooltip.bottom="{
                    value: 'Navigieren Sie zurück zur vorherigen Seite.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-arrow-left"
                :label="getLabel()"
                severity="secondary"
                size="large"
                @click="navigateTo(returnButtonRoute)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string;
    title: string;
    subtitle?: string;
    returnButtonRoute?: string;
    returnButtonLabel?: string;
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const getLabel = () => {
    if (isMobile.value) {
        return undefined;
    }
    return props.returnButtonLabel ?? "Zurück";
};
</script>
