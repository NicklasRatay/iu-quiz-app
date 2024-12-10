<template>
    <CRUDForm
        v-if="!loading"
        @submit="emitModifiedEvent($event)"
    >
        <div class="c-card mb-6 !pb-0 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <CRUDFormField
                id="courses"
                v-tooltip.bottom="{
                    value: 'Ordnen Sie die Frage einem oder mehreren Kursen zu.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Kurse"
                component="MultiSelect"
                :schema="
                    yup
                        .array()
                        .required('Mindestens ein Kurs ist erforderlich')
                        .min(1, 'Mindestens ein Kurs ist erforderlich')
                "
                :initial-value="courses"
                :options="courseOptions"
                option-value="id"
                option-label="name"
                display="chip"
                placeholder="Keine Kurse"
                filter
                show-clear
                :show-toggle-all="false"
                filter-placeholder="Suche"
                class="w-full"
            />
            <CRUDFormField
                id="categories"
                v-tooltip.bottom="{
                    value: 'Ordnen Sie die Frage optional einer oder mehreren Kategorien zu.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Kategorien"
                component="MultiSelect"
                :initial-value="categories"
                :options="categoryOptions"
                option-value="id"
                option-label="name"
                display="chip"
                placeholder="Keine Kategorien"
                filter
                show-clear
                :show-toggle-all="false"
                filter-placeholder="Suche"
                class="w-full"
            />
            <CRUDFormField
                id="question"
                v-tooltip.bottom="{
                    value: 'Diese Fragestellung wird im Quiz angezeigt.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Frage"
                component="Textarea"
                :schema="yup.string().required('Frage ist erforderlich')"
                :initial-value="question?.question"
                class="w-full"
            />
            <CRUDFormField
                id="hint"
                v-tooltip.bottom="{
                    value: 'Dieser Lösungshinweis kann in einem Quiz eingeblendet werden. Nicht-Verwendung bringt jedoch einen Bonuspunkt.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                label="Lösungshinweis"
                component="Textarea"
                :initial-value="question?.hint"
                class="w-full"
            />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div
                v-for="(answer, index) in answers || answerOptionFallback"
                :key="answer.id || 0"
                class="c-card !pb-0"
            >
                <div class="flex gap-6">
                    <CRUDFormField
                        :id="`answer_${index + 1}`"
                        v-tooltip.bottom="{
                            value: 'Dies ist eine der vier auswählbaren Antwortmöglichkeiten in einem Quiz.',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                        :label="'Antwort ' + (index + 1)"
                        component="Textarea"
                        :schema="
                            yup
                                .string()
                                .required('Beschreibung ist erforderlich')
                        "
                        :initial-value="answer.answer"
                        class="w-full"
                    />
                    <CRUDFormField
                        :id="`is_correct_${index + 1}`"
                        v-tooltip.bottom="{
                            value: 'Ist die Antwortmöglichkeit korrekt und muss damit in einem Quiz als richtige Antwort ausgewählt werden, um einen Punkt zu erzielen?',
                            showDelay: 500,
                            hideDelay: 250,
                        }"
                        label="Korrektheit"
                        component="ToggleButton"
                        :initial-value="answer.is_correct"
                        on-icon="pi pi-check-circle"
                        on-label="Richtig"
                        off-icon="pi pi-times-circle"
                        off-label="Falsch"
                        class="w-24"
                    />
                </div>
                <CRUDFormField
                    :id="`justification_${index + 1}`"
                    v-tooltip.bottom="{
                        value: 'Erklärt, warum die Antwortmöglichkeit richtig oder falsch ist. Diese Begründung wird im Quiz angezeigt, wenn alle Teilnehmer ihre Antworten abgegeben haben.',
                        showDelay: 500,
                        hideDelay: 250,
                    }"
                    label="Begründung"
                    component="Textarea"
                    :initial-value="answer.justification"
                />
            </div>
        </div>
        <slot />
    </CRUDForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import * as yup from "yup";
import type { Database } from "~/supabase/types";

const props = defineProps<{
    questionId: number | null;
}>();

const emits = defineEmits<{
    submitted: [FormSubmitEvent];
}>();

const simpleToast = useSimpleToast();

const question = ref<Database["public"]["Views"]["vw_question"]["Row"]>();
const answers =
    ref<Array<Database["public"]["Tables"]["answer_option"]["Row"]>>();
const courses = ref<Array<number>>();
const categories = ref<Array<number>>();
const courseOptions =
    ref<Array<Database["public"]["Tables"]["course"]["Row"]>>();
const categoryOptions =
    ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();

const answerOptionFallback = [
    {
        id: 0,
        answer: "",
        is_correct: false,
        justification: "",
    },
    {
        id: 0,
        answer: "",
        is_correct: false,
        justification: "",
    },
    {
        id: 0,
        answer: "",
        is_correct: false,
        justification: "",
    },
    {
        id: 0,
        answer: "",
        is_correct: false,
        justification: "",
    },
];

const loading = ref(true);

onMounted(async () => {
    const questionData = useQuestionData();
    const data = await questionData.load(props.questionId);
console.log(data)
    question.value = data.question;
    answers.value = data.answers;
    courses.value = data.courses;
    categories.value = data.categories;
    courseOptions.value = data.courseOptions;
    categoryOptions.value = data.categoryOptions;

    loading.value = false;
});

const emitModifiedEvent = (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.warn("Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    event.values = {
        ...event.values,
        question_id: props.questionId,
        answer_id_1: answers?.value?.[0]?.id || null,
        answer_id_2: answers?.value?.[1]?.id || null,
        answer_id_3: answers?.value?.[2]?.id || null,
        answer_id_4: answers?.value?.[3]?.id || null,
    };
    emits("submitted", event);
};
</script>
