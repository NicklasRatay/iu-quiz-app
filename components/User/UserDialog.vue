<template>
    <Dialog
        id="profile-dialog"
        header="Profil"
        modal
        :visible="isDialogVisible"
        class="w-96"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm
            @submit="profile?.user_id ? updateData($event) : insertData($event)"
        >
            <div class="flex gap-6 justify-between">
                <CRUDFormField
                    id="email"
                    v-tooltip.bottom="{
                        value: 'E-Mail-Adresse die zur Anmeldung verwendet werden muss.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="E-Mail"
                    component="InputText"
                    :schema="
                        yup
                            .string()
                            .required('E-Mail ist erforderlich')
                            .email('Ungültige E-Mail-Adresse')
                    "
                    :initial-value="profile?.email"
                    :disabled="profile"
                    class="w-full"
                />
                <CRUDFormField
                    v-if="profile"
                    id="is_active"
                    v-tooltip.bottom="{
                        value: `Aktivieren oder deaktivieren Sie den Zugang zu ${APP_NAME}.`,
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Status"
                    component="ToggleButton"
                    :initial-value="profile?.is_active"
                    :schema="yup.boolean().required('Status ist erforderlich')"
                    on-icon="pi pi-check-circle"
                    on-label="Aktiv"
                    off-icon="pi pi-times-circle"
                    off-label="Inaktiv"
                    class="w-24"
                />
            </div>
            <CRUDFormField
                v-if="!profile"
                id="password"
                v-tooltip.bottom="{
                    value: 'Das initiale Passwort sollte vom Nutzenden nach erstmaliger Anmeldung geändert werden.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Initiales Passwort"
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
                v-if="!profile"
                id="confirm_password"
                v-tooltip.bottom="{
                    value: 'Geben Sie das Passwort erneut ein, um Tippfehler zu vermeiden.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
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
            <div
                v-if="profile"
                class="flex gap-6"
            >
                <CRUDFormField
                    id="first_name"
                    v-tooltip.bottom="{
                        value: 'Kann nur vom Nutzenden selbst geändert werden.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Vorname"
                    component="InputText"
                    :initial-value="profile?.first_name"
                    disabled
                />
                <CRUDFormField
                    id="last_name"
                    v-tooltip.bottom="{
                        value: 'Kann nur vom Nutzenden selbst geändert werden.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Nachname"
                    component="InputText"
                    :initial-value="profile?.last_name"
                    disabled
                />
            </div>
            <CRUDFormField
                id="role_ids"
                v-tooltip.bottom="{
                    value: 'Die Rollen bestimmen die Zugriffsrechte und damit den nutzbaren Funktionsumfang.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Rollen"
                component="MultiSelect"
                :schema="
                    yup.array().min(1, 'Mindestens eine Rolle ist erforderlich')
                "
                :initial-value="assignedRoles"
                :options="roleLOV"
                option-value="id"
                option-label="name"
                placeholder="Keine Rollen"
            />
            <Button
                v-tooltip.bottom="{
                    value: profile
                        ? 'Änderungen speichern.'
                        : 'Nutzenden erstellen.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
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
import { APP_NAME } from "~/utils/constants";
import type { Database } from "~/supabase/types";

const emits = defineEmits<{
    processed: ["inserted" | "updated"];
}>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const profile = ref<Database["public"]["Tables"]["profile"]["Row"] | null>(
    null,
);
const assignedRoles = ref<Array<number>>([]);
const roleLOV = ref<Array<Database["public"]["Tables"]["role"]["Row"]>>([]);
const isDialogVisible = ref(false);

const loadRoleLOV = async () => {
    const { data, error } = await supabase
        .from("role")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    roleLOV.value = data;
};

const loadData = async (user_id: string) => {
    const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select()
        .eq("user_id", user_id)
        .single();
    if (profileError) {
        simpleToast.error(profileError.message);
        return;
    }
    profile.value = profileData;

    const { data: roleData, error: roleError } = await supabase
        .from("user_role")
        .select("role_id")
        .eq("user_id", user_id);
    if (roleError) {
        simpleToast.error(roleError.message);
        return;
    }
    assignedRoles.value = roleData.map((row) => row.role_id);
};

const insertData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const { data } = await useFetch("/api/auth/register", {
        method: "POST",
        body: {
            email: event.values.email,
            password: event.values.password,
        },
    });
    const userData = data.value?.data;
    const userError = data.value?.error;

    if (userError) {
        simpleToast.error(userError.code || "Unbekannter Fehler");
        return;
    }

    const { error } = await supabase.from("user_role").insert(
        event.values.role_ids.map((role_id: number) => ({
            user_id: userData?.user?.id,
            role_id,
        })),
    );
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "inserted");

    isDialogVisible.value = false;
    simpleToast.success("Nutzenden erstellt.");
};

const updateData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const newProfile = {
        is_active: event.values.is_active,
    };
    const { error: profileError } = await supabase
        .from("profile")
        .update(newProfile as never)
        .eq("user_id", profile.value?.user_id as never);
    if (profileError) {
        simpleToast.error(profileError.message);
        return;
    }

    const rolesToInsert = event.values.role_ids.filter(
        (roleId: number) => !assignedRoles.value?.includes(roleId),
    );
    const rolesToDelete = assignedRoles.value?.filter(
        (roleId) => !event.values.role_ids.includes(roleId),
    );

    if (rolesToInsert.length > 0) {
        const { error: roleInsertError } = await supabase
            .from("user_role")
            .insert(
                rolesToInsert.map((role_id: number) => ({
                    user_id: profile.value?.user_id,
                    role_id,
                })),
            );
        if (roleInsertError) {
            simpleToast.error(roleInsertError.message);
            return;
        }
    }

    for (const role_id of rolesToDelete ?? []) {
        const { error: roleDeleteError } = await supabase
            .from("user_role")
            .delete()
            .match({ user_id: profile.value?.user_id, role_id });
        if (roleDeleteError) {
            simpleToast.error(roleDeleteError.message);
            return;
        }
    }

    emits("processed", "updated");

    isDialogVisible.value = false;
    simpleToast.success("Änderungen gespeichert.");
};

onMounted(() => {
    loadRoleLOV();
});

const openDialog = async (id: string | null) => {
    profile.value = null;
    assignedRoles.value = [];
    if (id) {
        await loadData(id);
    }
    isDialogVisible.value = true;
};

defineExpose({
    openDialog,
});
</script>
