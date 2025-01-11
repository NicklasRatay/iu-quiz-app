<template>
    <CRUDForm
        v-if="!loading"
        @submit="saveQuiz($event)"
    >
        <template #default="{ form }">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                    <CRUDFormField
                        id="quiz_type_id"
                        v-tooltip.bottom="{
                            value: 'Bestimmen Sie den Spielmodus des Quizzes.',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                        label="Quiz-Typ"
                        component="Select"
                        :schema="
                            yup.number().required('Quiz-Typ ist erforderlich')
                        "
                        :options="quizTypeOptions"
                        option-value="id"
                        option-label="name"
                        placeholder="Kein Quiz-Typ"
                        class="w-full"
                    />
                    <div class="flex gap-6">
                        <CRUDFormField
                            id="quiz_question_count"
                            v-tooltip.bottom="{
                                value: 'Bestimmen Sie die Anzahl der Fragen, die gestellt werden sollen.',
                                showDelay: 500,
                                hideDelay: 250,
                            }"
                            label="Umfang"
                            component="InputNumber"
                            :schema="
                                yup
                                    .number()
                                    .required('Umfang ist erforderlich')
                                    .min(1, 'Mindestens 1 Frage')
                            "
                            :initial-value="10"
                            show-buttons
                            :min="1"
                            :max="99"
                            suffix=" Fragen"
                            class="w-full"
                        />
                        <CRUDFormField
                            id="seconds_per_question"
                            v-tooltip.bottom="{
                                value: 'Nach wie vielen Sekunden soll die Auswahl aller Teilnehmenden automatisch abgeschickt werden?',
                                showDelay: 500,
                                hideDelay: 250,
                            }"
                            label="Zeit pro Frage"
                            component="InputNumber"
                            :schema="
                                yup
                                    .number()
                                    .required('Zeit pro Frage ist erforderlich')
                                    .min(1, 'Mindestens 10 Sekunden')
                            "
                            :initial-value="30"
                            show-buttons
                            :min="10"
                            :max="300"
                            suffix=" Sekunden"
                            class="w-full"
                        />
                    </div>
                </div>
                <div class="flex gap-6">
                    <CRUDFormField
                        id="difficulty"
                        v-tooltip.bottom="{
                            value: 'Bestimmen Sie den Schwierigkeitsgrad der Fragen. Dieser wird automatisch anhand von Statistiken berechnet.',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                        label="Schwierigkeitsgrad"
                        component="Select"
                        :options="quizDifficultyOptions"
                        option-value="id"
                        option-label="name"
                        placeholder="Alle Schwierigkeitsgrade"
                        show-clear
                        class="w-full"
                    />
                    <CRUDFormField
                        v-if="form.quiz_type_id?.value === 1"
                        id="include_own_unvalidated"
                        v-tooltip.bottom="{
                            value: 'Sollen eigene, noch nicht validierte Fragen im Quiz enthalten sein?',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                        label="Eigene nicht validierte Fragen?"
                        component="Checkbox"
                        binary
                        size="large"
                        class="w-full"
                    />
                    <div
                        v-else
                        class="w-full"
                    />
                </div>
                <CRUDFormField
                    id="courses"
                    v-tooltip.bottom="{
                        value: 'Die Fragen werden aus diesen Kursen ausgewählt. Wenn kein Kurs ausgewählt ist, werden Fragen aus allen Kursen berücksichtigt.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Kurse"
                    component="MultiSelect"
                    :options="courseOptions"
                    option-value="id"
                    option-label="name"
                    display="chip"
                    placeholder="Alle Kurse"
                    filter
                    show-clear
                    :show-toggle-all="false"
                    filter-placeholder="Suche"
                    class="w-full"
                />
                <CRUDFormField
                    id="categories"
                    v-tooltip.bottom="{
                        value: 'Die Fragen werden aus diesen Kategorien ausgewählt. Wenn keine Kategorie ausgewählt ist, werden Fragen aus allen Kategorien berücksichtigt.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Kategorien"
                    component="MultiSelect"
                    :options="categoryOptions"
                    option-value="id"
                    option-label="name"
                    display="chip"
                    placeholder="Alle Kategorien"
                    filter
                    show-clear
                    :show-toggle-all="false"
                    filter-placeholder="Suche"
                    class="w-full"
                />
            </div>
            <Button
                v-tooltip.bottom="{
                    value: 'Erzeugt ein neues Quiz nach den angegebenen Einstellungen und fügt Sie automatisch als Teilnehmenden hinzu.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                type="submit"
                label="Erstellen und Beitreten"
                icon="pi pi-sign-in"
                size="large"
                class="w-full h-20"
            />
        </template>
    </CRUDForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import * as yup from "yup";
import type { Database } from "~/supabase/types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const quizTypeOptions =
    ref<Array<Database["public"]["Tables"]["quiz_type"]["Row"]>>();
const courseOptions =
    ref<Array<Database["public"]["Tables"]["course"]["Row"]>>();
const categoryOptions =
    ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();
const quizDifficultyOptions = ref([
    { id: 1, name: "Leicht" },
    { id: 2, name: "Mittel" },
    { id: 3, name: "Schwer" },
]);

const loading = ref(true);

const loadQuizTypeOptions = async () => {
    const { data, error } = await supabase.from("quiz_type").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    quizTypeOptions.value = data;
};

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

onMounted(async () => {
    await Promise.all([
        loadQuizTypeOptions(),
        loadCourseOptions(),
        loadCategoryOptions(),
    ]);

    loading.value = false;
});

const saveQuiz = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    const {
        quiz_type_id,
        quiz_question_count,
        seconds_per_question,
        courses,
        categories,
        difficulty,
        include_own_unvalidated,
    } = event.values;

    const { data, error } = await supabase.rpc("create_quiz", {
        p_quiz_type_id: quiz_type_id,
        p_seconds_per_question: seconds_per_question,
        p_number_of_questions: quiz_question_count,
        p_course_ids: courses,
        p_category_ids: categories,
        p_difficulty: difficulty,
        p_user_id: include_own_unvalidated ? user.value?.id : undefined,
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.success("Quiz erstellt.");
    navigateTo("/quiz/" + data);
};
</script>
