<template>
    <SimpleDialogBase
        :message="data.message"
        :icon="data.icon ?? 'pi-info-circle'"
        :icon-color="data.iconColor ?? 'text-primary'"
    >
        <slot />
    </SimpleDialogBase>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");

const data = dialogRef?.value.data;
</script>
