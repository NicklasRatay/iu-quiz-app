<template>
    <div class="flex flex-col gap-6">
        <NavigationCardList>
            <div
                v-tooltip.bottom="{
                    value: `Sie haben an ${dailyStreakText} mindestens ein Quiz absolviert.`,
                    showDelay: 500,
                    hideDelay: 250,
                }"
                class="c-card !bg-primary text-primary-contrast text-center"
            >
                <i class="pi pi-calendar !text-4xl" />
                <div class="text-2xl">{{ dailyStreakText }}</div>
            </div>
        </NavigationCardList>
        <QuizTopUserTable />
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const dailyStreak = ref<number | null>(null);
const dailyStreakText = computed(() => {
    const suffix = dailyStreak.value === 1 ? "Tag" : "Tage";
    return `${dailyStreak.value ?? 0} ${suffix} in Folge`;
});

const loadDailyStreak = async () => {
    if (!user.value) {
        return;
    }

    const { data, error } = await supabase.rpc("get_current_streak", {
        p_user_id: user.value.id,
    });
    if (error) {
        simpleToast.error(error.message);
    }

    dailyStreak.value = data;
};

onMounted(async () => {
    await loadDailyStreak();
});
</script>
