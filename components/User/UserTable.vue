<template>
    <DataTable
        v-model:filters="filters"
        :value="users"
        data-key="user_id"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        paginator
        :rows="50"
        :rows-per-page-options="[20, 50, 100, 250]"
        sort-mode="multiple"
        removable-sort
        :global-filter-fields="['email', 'first_name', 'last_name', 'roles']"
        filter-display="menu"
        state-storage="session"
        state-key="user-table-state"
        class="c-card !p-0 c-max-h-full"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-users !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Nutzende
                    </div>
                    <IconField
                        v-tooltip.bottom="{
                            value: 'Volltextsuche in allen Textspalten.',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                    >
                        <InputIcon class="pi pi-search" />
                        <InputText
                            v-model="filters.global.value"
                            placeholder="Suche"
                            fluid
                        />
                    </IconField>
                    <slot />
                </div>
                <Button
                    v-tooltip.bottom="{
                        value: 'Setzt sämtliche Filtereinstellung zurück.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    icon="pi pi-undo"
                    :label="isMobile ? undefined : 'Filter Zurücksetzen'"
                    severity="secondary"
                    @click="resetfilters"
                />
            </div>
        </template>
        <template #empty>
            <div class="text-center">Keine Nutzenden gefunden.</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
        </template>
        <Column
            header="Bearbeiten"
            class="w-28"
            body-class="!p-1"
        >
            <template #body="{ data }">
                <Button
                    v-tooltip.bottom="{
                        value: 'Öffnen Sie den Eintrag zur Bearbeitung.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    icon="pi pi-pencil"
                    text
                    class="min-w-full"
                    @click="$emit('editButtonClicked', data)"
                />
            </template>
        </Column>
        <Column
            field="email"
            header="E-Mail"
            sortable
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="first_name"
            header="Vorname"
            sortable
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="last_name"
            header="Nachname"
            sortable
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="roles"
            header="Rolle"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="roles"
                    option-value="name"
                    option-label="name"
                    :max-selected-labels="1"
                />
            </template>
        </Column>
        <Column
            field="is_active"
            header="Status"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-44"
        >
            <template #body="{ data }">
                <i
                    :class="[
                        'w-full text-center pi',
                        {
                            'pi-check-circle text-green-500 ': data.is_active,
                            'pi-times-circle text-red-500': !data.is_active,
                        },
                    ]"
                />
            </template>
            <template #filter="{ filterModel }">
                <Select
                    v-model="filterModel.value"
                    :options="[
                        { label: 'Aktiv', value: true },
                        { label: 'Inaktiv', value: false },
                    ]"
                    option-label="label"
                    option-value="value"
                />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import type { Database } from "~/supabase/types";

defineEmits<{
    editButtonClicked: [
        Database["public"]["Views"]["vw_user_role_list"]["Row"],
    ];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const loading = ref(true);
const roles = ref<Array<Database["public"]["Tables"]["role"]["Row"]>>();
const users =
    ref<Array<Database["public"]["Views"]["vw_user_role_list"]["Row"]>>();

const loadRoles = async () => {
    const { data, error } = await supabase.from("role").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    roles.value = data;
};

const loadProfiles = async () => {
    const { data, error } = await supabase
        .from("vw_user_role_list")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    users.value = data;
};

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        first_name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        last_name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        roles: { value: null, matchMode: FilterMatchMode.IN },
        is_active: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
};
resetfilters();

onMounted(async () => {
    loadRoles();
    loadProfiles();
    loading.value = false;
});

defineExpose({
    loadProfiles,
});
</script>
