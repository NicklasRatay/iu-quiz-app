<template>
    <div>
        <UserDialog
            ref="refUserDialog"
            @processed="refUserTable.loadProfiles()"
        />
        <UserTable
            ref="refUserTable"
            @edit-button-clicked="refUserDialog.openDialog($event.user_id)"
        >
            <Button
                v-tooltip.bottom="{
                    value: `Einen neuen Nutzer für ${APP_NAME} anlegen.`,
                    showDelay: 500,
                    hideDelay: 250,
                }"
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Nutzenden Erstellen'"
                @click="refUserDialog.openDialog(null)"
            />
        </UserTable>
    </div>
</template>

<script setup lang="ts">
import { APP_NAME } from "~/utils/constants";

const refUserDialog = ref();
const refUserTable = ref();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);
</script>
