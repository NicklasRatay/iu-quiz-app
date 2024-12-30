import { UserRole } from "~/utils/enums";

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path === "/login") return;

    const user = useSupabaseUser();
    if (!user.value) return abortNavigation();

    // Define route-to-roles mapping here
    const routeRoles: Record<string, UserRole[]> = {
        "/user": [UserRole.Admin],
        "/quiz": [UserRole.Student],
        "/question": [UserRole.Student],
        "/marked-question": [UserRole.Student],
        "/category": [UserRole.Student],
        "/submitted-question": [UserRole.Teacher],
        "/course": [UserRole.Teacher],
    };

    // Get the allowed roles for the current route or any sub-routes
    const allowedRoles = Object.entries(routeRoles).find(([route]) =>
        to.path.startsWith(route),
    )?.[1];

    // If no roles are specified for the route, assume the page is publicly accessible
    if (!allowedRoles) return;

    // Redirect if the user does not have any of the allowed roles
    const role = useRole();
    if (!(await role.hasAnyRole(allowedRoles))) {
        return navigateTo("/unauthorized");
    }
});
