<template>
    <DataTable
        v-model:filters="filters"
        :value="categorys"
        data-key="id"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        paginator
        :rows="50"
        :rows-per-page-options="[20, 50, 100, 250]"
        sort-mode="multiple"
        removable-sort
        :global-filter-fields="['name']"
        filter-display="menu"
        state-storage="session"
        state-key="category-table-state"
        class="c-card !p-0 c-max-h-full"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-tag !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Kategorien
                    </div>
                    <IconField
                        v-tooltip.bottom="{
                            value: 'Volltextsuche in der Namensspalte.',
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
            <div class="text-center">Keine Kategorien gefunden.</div>
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
            field="name"
            header="Name"
            sortable
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import type { Database } from "~/supabase/types";

defineEmits<{
    editButtonClicked: [Database["public"]["Tables"]["category"]["Row"]];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const loading = ref(true);
const categorys = ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();

const loadData = async () => {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    categorys.value = data;
};

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
    };
};
resetfilters();

onMounted(async () => {
    loadData();
    loading.value = false;
});

defineExpose({
    loadData,
});
</script>
