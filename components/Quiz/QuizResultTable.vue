<template>
    <DataTable
        :value="results"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        :row-group-mode="singleView ? undefined : 'subheader'"
        :group-rows-by="singleView ? undefined : 'question'"
        class="c-card !p-0 c-max-h-full"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-chart-bar !text-2xl" />
                    <div class="text-2xl font-semibold">Quiz-Ergebnis</div>
                    <slot />
                </div>
                <Button
                    icon="pi pi-arrow-left"
                    :label="isMobile ? undefined : 'Zurück'"
                    severity="secondary"
                    @click="navigateTo('/quiz')"
                />
            </div>
        </template>
        <template #empty>
            <div class="text-center">Keine Ergebnisse gefunden.</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
        </template>
        <Column
            field="question"
            header="Frage"
        >
            <template #body="slotProps">
                <div>
                    {{
                        `${slotProps.data.order_number}. ${slotProps.data.question}`
                    }}
                </div>
            </template>
        </Column>
        <Column
            v-if="!props.singleView"
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
            v-if="!props.singleView"
            field="first_name"
            header="Vorname"
        />
        <Column
            v-if="!props.singleView"
            field="last_name"
            header="Nachname"
        />
        <Column
            field="points"
            header="Punktzahl"
        >
            <template #body="slotProps">
                <Tag
                    :value="slotProps.data.points + ' Pkt.'"
                    :severity="getPointSeverity(slotProps.data.points)"
                />
            </template>
        </Column>
        <Column
            field="has_used_hint"
            header="Lösungshinweis"
        >
            <template #body="slotProps">
                <Tag
                    v-if="slotProps.data.has_used_hint"
                    value="Ja"
                    severity="danger"
                />
                <Tag
                    v-else
                    value="Nein"
                    severity="success"
                />
            </template>
        </Column>
        <template
            v-if="!props.singleView"
            #groupheader="slotProps"
        >
            <div class="text-xl font-semibold">
                {{
                    `${slotProps.data.order_number}. ${slotProps.data.question}`
                }}
            </div>
        </template>
        <template #footer>
            <div class="text-xl font-semibold text-center">
                {{ `${totalPoints} von ${maxPoints} Pkt. (${percentage} %)` }}
            </div>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    quizId: number;
    singleView?: boolean;
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const loading = ref(true);
const results =
    ref<Array<Database["public"]["Views"]["vw_quiz_results"]["Row"]>>();

const loadData = async () => {
    const { data, error } = await supabase
        .from("vw_quiz_results")
        .select("*")
        .eq("quiz_id", props.quizId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    results.value = data;
};

onMounted(async () => {
    loadData();
    loading.value = false;
});

const getPointSeverity = (points: number) => {
    if (points >= 4) return "success";
    if (points >= 2) return "warn";
    return "danger";
};

const totalPoints = computed(() => {
    return results.value?.reduce((acc, curr) => acc + (curr.points ?? 0), 0);
});

// Get count of all entries
const maxPoints = computed(() => (results.value?.length || 0) * 5);

const percentage = computed(() => {
    if (!totalPoints.value || !maxPoints.value) {
        return 0;
    }

    return Math.round((totalPoints.value / maxPoints.value) * 100);
});
</script>
