<template>
    <SimpleDialogBase
        :message="data.message"
        :icon="data.icon ?? 'pi-question-circle'"
        :icon-color="data.iconColor ?? 'text-primary'"
    >
        <div class="flex gap-6 justify-center">
            <Button
                :label="data.acceptLabel ?? 'Bestätigen'"
                :icon="'pi ' + (data.acceptIcon ?? 'pi-check')"
                :severity="data.acceptSeverity"
                @click="accept"
            />
            <Button
                :label="data.cancelLabel ?? 'Abbrechen'"
                :icon="'pi ' + (data.cancelLabel ?? 'pi-times')"
                :severity="data.cancelSeverity ?? 'secondary'"
                @click="cancel"
            />
        </div>
    </SimpleDialogBase>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef");

const data = dialogRef?.value.data;

const accept = () => {
    if (data.acceptCallback) data.acceptCallback();
    dialogRef?.value.close();
};

const cancel = () => {
    if (data.cancelCallback) data.cancelCallback();
    dialogRef?.value.close();
};
</script>
