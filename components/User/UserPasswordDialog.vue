<template>
    <Dialog
        id="profile-password-dialog"
        header="Passwort Ändern"
        modal
        :visible="isDialogVisible"
        class="w-96"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm @submit="savePassword($event)">
            <CRUDFormField
                id="password"
                label="Neues Passwort"
                component="Password"
                :schema="
                    yup
                        .string()
                        .required('Passwort ist erforderlich')
                        .min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
                        .matches(
                            /[a-z]/,
                            'Passwort muss einen Kleinbuchstaben enthalten',
                        )
                        .matches(
                            /[A-Z]/,
                            'Passwort muss einen Großbuchstaben enthalten',
                        )
                        .matches(/[0-9]/, 'Passwort muss eine Zahl enthalten')
                        .matches(
                            /[^a-zA-Z0-9]/,
                            'Passwort muss ein Sonderzeichen enthalten',
                        )
                "
                toggle-mask
                :feedback="false"
            />
            <CRUDFormField
                id="confirm_password"
                label="Passwort Bestätigen"
                component="Password"
                :schema="
                    yup
                        .string()
                        .required('Bestätigung ist erforderlich')
                        .oneOf(
                            [yup.ref('password')],
                            'Passwörter stimmen nicht überein',
                        )
                "
                toggle-mask
                :feedback="false"
            />
            <Button
                label="Speichern"
                icon="pi pi-save"
                type="submit"
                class="w-full"
            />
        </CRUDForm>
    </Dialog>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const isDialogVisible = ref(false);

const savePassword = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: event.values.password,
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    isDialogVisible.value = false;
    simpleToast.success("Änderungen gespeichert.");
};

const openDialog = () => (isDialogVisible.value = true);

defineExpose({
    openDialog,
});
</script>
