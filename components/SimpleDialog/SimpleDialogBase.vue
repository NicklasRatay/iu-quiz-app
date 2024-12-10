<template>
    <div class="flex flex-col gap-6 w-80">
        <div class="flex gap-6 items-center pt-1">
            <i
                :class="['pi', icon, iconColor]"
                style="font-size: 3rem"
            />
            <div class="my-0 w-full">{{ message }}</div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message: string;
    icon: string;
    iconColor: string;
}>();
</script>
