export function useNavigationEntries() {
    const navigationEntries = ref([
        {
            label: "Dashboard",
            icon: "pi pi-home",
            route: "/",
        },
    ]);

    const role = useRole();

    const populateNavigationEntries = async () => {
        if (await role.hasRole(UserRole.Student)) {
            navigationEntries.value.push(
                {
                    label: "Quizze",
                    icon: "pi pi-list-check",
                    route: "/quiz",
                },
                {
                    label: "Eigene Fragen",
                    icon: "pi pi-question",
                    route: "/question",
                },
                {
                    label: "Markierte Fragen",
                    icon: "pi pi-bookmark",
                    route: "/marked-question",
                },
                {
                    label: "Kategorien",
                    icon: "pi pi-tag",
                    route: "/category",
                },
            );
        }
        if (await role.hasRole(UserRole.Teacher)) {
            navigationEntries.value.push(
                {
                    label: "Eingereichte Fragen",
                    icon: "pi pi-verified",
                    route: "/submitted-question",
                },
                {
                    label: "Kurse",
                    icon: "pi pi-book",
                    route: "/course",
                },
            );
        }
    };

    onMounted(() => {
        populateNavigationEntries();
    });

    return { navigationEntries };
}
