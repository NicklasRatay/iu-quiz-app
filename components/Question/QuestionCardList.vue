<template>
    <div class="flex flex-col gap-6">
        <div class="grid grid-cols-2 xl:grid-cols-6 gap-6">
            <IconField
                v-tooltip.bottom="{
                    value: 'Volltextsuche in den Fragestellungen.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                class="col-span-2"
            >
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="searchFilter"
                    placeholder="Suche"
                    fluid
                />
            </IconField>
            <Select
                v-model="courseFilter"
                v-tooltip.bottom="{
                    value: 'Filtern Sie die Fragen nach einem Kurs.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :options="courseOptions"
                option-value="name"
                option-label="name"
                placeholder="Alle Kurse"
                show-clear
                filter
                fluid
            />
            <Select
                v-model="categoryFilter"
                v-tooltip.bottom="{
                    value: 'Filtern Sie die Fragen nach einer Kategorie.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :options="categoryOptions"
                option-value="name"
                option-label="name"
                placeholder="Alle Kategorien"
                show-clear
                filter
                fluid
            />
            <Select
                v-if="!hideStatusFilter"
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
                :label="isMobile ? undefined : 'Filter Zurücksetzen'"
                severity="secondary"
                :class="['min-w-full', hideStatusFilter ? 'col-span-2' : '']"
                @click="resetfilters"
            />
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <Button
                v-if="newQuestionButton"
                v-tooltip.bottom="{
                    value: 'Erstellen Sie eine neue Frage samt Antwortmöglichkeiten und reichen Sie sie zur Validierung ein.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-plus"
                label="Neue Frage Erstellen"
                severity="secondary"
                size="large"
                class="w-full h-full min-h-20"
                @click="navigateTo('/question/new')"
            />
            <QuestionCard
                v-for="question in filteredQuestions"
                :key="question.id || 0"
                v-tooltip.bottom="{
                    value: 'Öffnen Sie die Frage in der Detailansicht.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                :question="question"
                clickable
                @click="() => $emit('questionClicked', question)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    questions: Array<Database["public"]["Views"]["vw_question"]["Row"]>;
    newQuestionButton?: boolean;
    hideStatusFilter?: boolean;
}>();

defineEmits<{
    questionClicked: [Database["public"]["Views"]["vw_question"]["Row"]];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const courseFilter = ref<string | null>(null);
const categoryFilter = ref<string | null>(null);
const statusFilter = ref<number | null>(null);
const searchFilter = ref<string | null>(null);

const resetfilters = () => {
    courseFilter.value = null;
    categoryFilter.value = null;
    statusFilter.value = null;
    searchFilter.value = null;
};

const filteredQuestions = computed(() => {
    return props.questions.filter((question) => {
        // Course filter
        if (
            courseFilter.value &&
            !question.courses?.includes(courseFilter.value)
        ) {
            return false;
        }

        // Category filter
        if (
            categoryFilter.value &&
            !question.categories?.includes(categoryFilter.value)
        ) {
            return false;
        }

        // Question status filter
        if (
            statusFilter.value &&
            question.question_status_id !== statusFilter.value
        ) {
            return false;
        }

        // Question text search filter
        if (
            searchFilter.value &&
            !question.question
                ?.toLowerCase()
                .includes(searchFilter.value.toLowerCase())
        ) {
            return false;
        }

        return true;
    });
});

const courseOptions =
    ref<Array<Database["public"]["Tables"]["course"]["Row"]>>();
const categoryOptions =
    ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();
const statusOptions =
    ref<Array<Database["public"]["Tables"]["question_status"]["Row"]>>();

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

const loadCategoryOptions = async () => {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    categoryOptions.value = data;
};

const loadStatusOptions = async () => {
    const { data, error } = await supabase
        .from("question_status")
        .select("*")
        .order("name");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    statusOptions.value = data;
};

onMounted(() => {
    Promise.all([
        loadCourseOptions(),
        loadCategoryOptions(),
        loadStatusOptions(),
    ]);
});
</script>
