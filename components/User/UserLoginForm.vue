<template>
    <div class="flex items-center justify-center h-screen">
        <div class="c-card">
            <div
                id="title"
                class="text-xl text-color font-bold mb-6"
            >
                {{ APP_NAME }}
            </div>
            <CRUDForm
                :validate-on-value-update="false"
                :validate-on-blur="true"
                @submit="handleSubmit($event)"
            >
                <CRUDFormField
                    id="email"
                    label="E-Mail"
                    component="InputText"
                    :schema="
                        yup
                            .string()
                            .required('E-Mail ist erforderlich')
                            .email('Keine gültige E-Mail-Adresse')
                    "
                />
                <CRUDFormField
                    id="password"
                    label="Passwort"
                    component="Password"
                    :schema="yup.string().required('Passwort ist erforderlich')"
                    :feedback="false"
                    toggle-mask
                />
                <Button
                    label="Anmelden"
                    icon="pi pi-sign-in"
                    type="submit"
                    :loading="loading"
                    fluid
                />
            </CRUDForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import * as yup from "yup";
import { APP_NAME } from "~/utils/constants";

const supabase = useSupabaseClient();
const simpleToast = useSimpleToast();

const loading = ref(false);

const handleSubmit = async ({
    valid,
    values: { email, password },
}: FormSubmitEvent) => {
    if (!valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    loading.value = false;

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    navigateTo("/");
};
</script>
