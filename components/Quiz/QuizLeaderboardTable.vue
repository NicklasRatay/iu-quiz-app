<template>
    <DataTable
        :value="results"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        row-group-mode="subheader"
        group-rows-by="email"
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
                    v-tooltip.bottom="{
                        value: 'Navigieren Sie zurück zur Quiz-Übersicht.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
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
            field="email"
            header="E-Mail"
        />
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
        <template #groupheader="slotProps">
            <div class="flex justify-between text-xl font-semibold">
                <div>
                    {{
                        `Platz ${userRanks[slotProps.data.email]}: ${
                            slotProps.data.first_name
                        } ${slotProps.data.last_name}`
                    }}
                    <a
                        :href="'mailto:' + slotProps.data.email"
                        class="text-primary-emphasis-alt ml-1"
                    >
                        <i class="pi pi-envelope" />
                    </a>
                </div>
                <div>
                    {{
                        `${
                            totalPointsPerUser[slotProps.data.email]
                        } von ${maxPointsPerParticipant} Pkt. (${getPercentage(
                            totalPointsPerUser[slotProps.data.email],
                        )} %)`
                    }}
                </div>
            </div>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    quizId: number;
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

const totalPointsPerUser = ref<Record<string, number>>({});
const userRanks = ref<Record<string, number>>({});

const calculateTotalPointsPerUser = () => {
    // Create a map to store points by email
    const pointsMap = new Map<string, number>();

    results.value?.forEach((item) => {
        if (item.email && item.points) {
            // Accumulate points for the email
            pointsMap.set(
                item.email,
                (pointsMap.get(item.email) || 0) + item.points,
            );
        }
    });

    // Convert the map to an object
    const totalPoints = Object.fromEntries(pointsMap);

    // Sort emails by their total points in descending order
    const sortedEmails = Object.entries(totalPoints)
        .sort(([, pointsA], [, pointsB]) => pointsB - pointsA)
        .map(([email]) => email);

    // Calculate ranks based on the sorted order
    const ranks = sortedEmails.reduce((acc, email, index) => {
        acc[email] = index + 1; // Rank starts at 1
        return acc;
    }, {} as Record<string, number>);

    // Optionally, sort the original `results.value` array by points
    if (results.value) {
        results.value = results.value.sort((a, b) => {
            const pointsA = a.email ? totalPoints[a.email] || 0 : 0;
            const pointsB = b.email ? totalPoints[b.email] || 0 : 0;
            return pointsB - pointsA; // Descending order
        });
    }

    return { totalPoints, ranks };
};

onMounted(async () => {
    await loadData();
    const totalPoints = calculateTotalPointsPerUser();
    totalPointsPerUser.value = totalPoints.totalPoints;
    userRanks.value = totalPoints.ranks;
    loading.value = false;
});

const getPointSeverity = (points: number) => {
    if (points >= 4) return "success";
    if (points >= 2) return "warn";
    return "danger";
};

const maxPoints = computed(() => (results.value?.length || 0) * 5);
const maxPointsPerParticipant = computed(
    () => maxPoints.value / Object.keys(totalPointsPerUser.value).length,
);

const getPercentage = (totalPoints: number) => {
    if (!maxPointsPerParticipant.value) {
        return 0;
    }

    return Math.round((totalPoints / maxPointsPerParticipant.value) * 100);
};
</script>
