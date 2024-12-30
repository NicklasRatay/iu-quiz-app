<template>
    <div class="flex flex-col gap-6">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <Select
                v-model="typeFilter"
                v-tooltip.bottom="{
                    value: 'Filtern Sie die Fragen nach einem Kurs.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :options="typeOptions"
                option-value="id"
                option-label="name"
                placeholder="Alle Spielmodi"
                show-clear
                fluid
            />
            <Select
                v-model="statusFilter"
                v-tooltip.bottom="{
                    value: 'Filtern Sie die Fragen nach einem Status.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :options="statusOptions"
                option-value="id"
                option-label="name"
                placeholder="Alle Status"
                show-clear
                fluid
            />
            <Button
                v-tooltip.bottom="{
                    value: 'Setzt sämtliche Filtereinstellung zurück.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-undo"
                label="Filter Zurücksetzen"
                severity="secondary"
                class="min-w-full col-span-2 lg:col-span-1"
                @click="resetfilters"
            />
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <Button
                v-if="newQuizButton"
                v-tooltip.bottom="{
                    value: 'Konfigurieren, erstellen und teilen Sie ein neues Quiz für andere Studierende.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-plus"
                label="Neues Quiz Erstellen"
                severity="secondary"
                size="large"
                class="w-full h-full min-h-20"
                @click="navigateTo('/quiz/new')"
            />
            <QuizCard
                v-for="quiz in filteredQuizzes"
                :key="quiz.id || 0"
                v-tooltip.bottom="{
                    value:
                        quiz.quiz_status_id === QuizStatus.Completed
                            ? 'Schauen Sie sich das Ergebnis von diesem Quiz an.'
                            : 'Treten Sie diesem Quiz bei.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :quiz="quiz"
                clickable
                @click="() => $emit('quizClicked', quiz)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    quizzes: Array<Database["public"]["Views"]["vw_quiz"]["Row"]>;
    newQuizButton?: boolean;
}>();

defineEmits<{
    quizClicked: [Database["public"]["Views"]["vw_quiz"]["Row"]];
}>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const typeFilter = ref<number | null>(null);
const statusFilter = ref<number | null>(null);

const resetfilters = () => {
    typeFilter.value = null;
    statusFilter.value = null;
};

const filteredQuizzes = computed(() => {
    return props.quizzes.filter((quiz) => {
        if (typeFilter.value && quiz.quiz_type_id !== typeFilter.value) {
            return false;
        }

        if (statusFilter.value && quiz.quiz_status_id !== statusFilter.value) {
            return false;
        }

        return true;
    });
});

const typeOptions =
    ref<Array<Database["public"]["Tables"]["quiz_type"]["Row"]>>();
const statusOptions =
    ref<Array<Database["public"]["Tables"]["quiz_status"]["Row"]>>();

const loadTypeOptions = async () => {
    const { data, error } = await supabase
        .from("quiz_type")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    typeOptions.value = data;
};

const loadStatusOptions = async () => {
    const { data, error } = await supabase
        .from("quiz_status")
        .select("*")
        .order("name")
        .neq("id", QuizStatus.Active);
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    statusOptions.value = data;
};

onMounted(() => {
    Promise.all([loadTypeOptions(), loadStatusOptions()]);
});
</script>
