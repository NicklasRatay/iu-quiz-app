import type { Database } from "~/supabase/types";

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path === "/login") return;

    const simpleToast = useSimpleToast();
    const supabase = useSupabaseClient<Database>();
    const user = useSupabaseUser();

    if (!user.value) return navigateTo("/login");

    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.value.id)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return abortNavigation();
    }

    if (!data.is_active && to.path !== "/unauthorized") {
        return navigateTo("/unauthorized");
    }
});
