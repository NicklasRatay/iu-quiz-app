export function useNavigationEntries() {
    const navigationEntries = ref([
        {
            label: "Dashboard",
            icon: "pi pi-home",
            route: "/",
        },
    ]);

    return { navigationEntries };
}
