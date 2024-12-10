<template>
    <div>
        <CourseDialog
            ref="refCourseDialog"
            @processed="refCourseTable.loadData()"
        />
        <CourseTable
            ref="refCourseTable"
            @edit-button-clicked="refCourseDialog.openDialog($event.id)"
        >
            <Button
                v-tooltip.bottom="{
                    value: 'Einen neuen Kurs erstellen, der für Fragen verwendet werden kann.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Kurs Erstellen'"
                @click="refCourseDialog.openDialog(null)"
            />
        </CourseTable>
    </div>
</template>

<script setup lang="ts">
const refCourseDialog = ref();
const refCourseTable = ref();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);
</script>
