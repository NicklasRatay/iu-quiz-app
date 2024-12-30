<template>
    <div>
        <CategoryDialog
            ref="refCategoryDialog"
            @processed="refCategoryTable.loadData()"
        />
        <CategoryTable
            ref="refCategoryTable"
            @edit-button-clicked="refCategoryDialog.openDialog($event.id)"
        >
            <Button
                v-tooltip.bottom="{
                    value: 'Eine neue Kategorie erstellen, die für Fragen verwendet werden kann.',
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Kategorie Erstellen'"
                @click="refCategoryDialog.openDialog(null)"
            />
        </CategoryTable>
    </div>
</template>

<script setup lang="ts">
const refCategoryDialog = ref();
const refCategoryTable = ref();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);
</script>
