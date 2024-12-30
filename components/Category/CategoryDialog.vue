<template>
    <Dialog
        id="category-dialog"
        header="Kategorie"
        modal
        :visible="isDialogVisible"
        class="w-96"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm @submit="handleSubmit($event)">
            <CRUDFormField
                id="name"
                v-tooltip.bottom="{
                    value: 'Anzeigename der Kategorie.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Name"
                component="InputText"
                :schema="yup.string().required('Name ist erforderlich')"
                :initial-value="category?.name"
                class="w-full"
            />
            <Button
                v-if="!category?.id"
                v-tooltip.bottom="{
                    value: 'Neue Kategorie mit angegebenem Namen erstellen.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Speichern"
                icon="pi pi-save"
                type="submit"
                class="w-full"
                @click="buttonClicked = 'insert'"
            />
            <div
                v-if="category?.id"
                class="flex gap-6"
            >
                <Button
                    v-tooltip.bottom="{
                        value: 'Änderungen am Kategorienamen speichern.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Speichern"
                    icon="pi pi-save"
                    type="submit"
                    class="w-full"
                    @click="buttonClicked = 'save'"
                />
                <Button
                    v-tooltip.bottom="{
                        value: 'Kategorie permanent löschen. Entfernt diese Kategorie aus allen Fragen.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Löschen"
                    icon="pi pi-trash"
                    severity="danger"
                    type="submit"
                    class="w-full"
                    @click="buttonClicked = 'delete'"
                />
            </div>
        </CRUDForm>
    </Dialog>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const emits = defineEmits<{
    processed: ["inserted" | "updated" | "deleted"];
}>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();
const simpleDialog = useSimpleDialog();

const buttonClicked = ref();
const handleSubmit = (event: FormSubmitEvent) => {
    if (buttonClicked.value === "insert") {
        insertData(event);
    } else if (buttonClicked.value === "save") {
        updateData(event);
    } else if (buttonClicked.value === "delete") {
        deleteDataWithConfirm();
    }
};

const category = ref<Database["public"]["Tables"]["category"]["Row"] | null>(
    null,
);
const isDialogVisible = ref(false);

const loadData = async (id: number) => {
    const { data, error } = await supabase
        .from("category")
        .select()
        .eq("id", id)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    category.value = data;
};

const insertData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const { error } = await supabase.from("category").insert({
        name: event.values.name,
    } as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "inserted");

    isDialogVisible.value = false;
    simpleToast.success("Kurs erstellt.");
};

const updateData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const { error } = await supabase
        .from("category")
        .update({ name: event.values.name } as never)
        .eq("id", category.value?.id as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "updated");

    isDialogVisible.value = false;
    simpleToast.success("Änderungen gespeichert.");
};

const deleteData = async () => {
    const { error } = await supabase
        .from("category")
        .delete()
        .eq("id", category.value?.id as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "deleted");

    isDialogVisible.value = false;
    simpleToast.success("Kurs gelöscht.");
};

const deleteDataWithConfirm = async () => {
    simpleDialog.confirmDeletion({
        acceptCallback: deleteData,
    });
};

const openDialog = async (id: number | null) => {
    category.value = null;
    if (id) {
        await loadData(id);
    }
    isDialogVisible.value = true;
};

defineExpose({
    openDialog,
});
</script>
