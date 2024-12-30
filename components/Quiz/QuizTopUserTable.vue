<template>
    <DataTable
        :value="results"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        class="c-card !p-0 c-max-h-full"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-trophy !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Top-Studierende
                    </div>
                    <slot />
                </div>
                <Select
                    v-model="selectedCourse"
                    v-tooltip.bottom="{
                        value: 'Filtern Sie nach einem bestimmten Kurs.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    :options="courseOptions"
                    option-value="id"
                    option-label="name"
                    placeholder="Alle Kurse"
                    show-clear
                    filter
                    class="w-60"
                    @change="loadTopUsers"
                />
            </div>
        </template>
        <template #empty>
            <div class="text-center">Keine Nutzenden gefunden.</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
        </template>
        <Column header="Platz">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column
            field="email"
            header="E-Mail"
        >
            <template #body="slotProps">
                <a
                    :href="'mailto:' + slotProps.data.email"
                    class="text-primary-emphasis-alt"
                >
                    {{ slotProps.data.email }}
                </a>
            </template>
        </Column>
        <Column
            field="first_name"
            header="Vorname"
        />
        <Column
            field="last_name"
            header="Nachname"
        />
        <Column
            field="correct_answers"
            header="Korrekt"
        />
        <Column
            field="total_answers"
            header="Gesamt"
        />
        <Column
            field="accuracy_percentage"
            header="Quote"
        >
            <template #body="slotProps">
                <ProgressBar
                    :value="slotProps.data.accuracy_percentage"
                    class="!h-7 min-w-20"
                >
                    <div class="text-base">
                        {{ slotProps.data.accuracy_percentage.toFixed(0) }}%
                    </div>
                </ProgressBar>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const loading = ref(true);
const results =
    ref<
        Database["public"]["Functions"]["get_top_users_by_course"]["Returns"]
    >();
const selectedCourse = ref<number>();
const courseOptions =
    ref<Array<Database["public"]["Tables"]["course"]["Row"]>>();

const loadCourseOptions = async () => {
    const { data, error } = await supabase
        .from("course")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    courseOptions.value = data;
};

const loadTopUsers = async () => {
    const { data, error } = await supabase.rpc("get_top_users_by_course", {
        p_course_id: selectedCourse.value,
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    results.value = data;
};

onMounted(async () => {
    Promise.all([loadCourseOptions(), loadTopUsers()]);
    loading.value = false;
});
</script>
