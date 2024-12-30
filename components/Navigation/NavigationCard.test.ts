import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NavigationCard from "./NavigationCard.vue";

describe("NavigationCard", () => {
    const navigationEntryMock = {
        label: "Dashboard",
        icon: "pi pi-home",
        route: "/dashboard",
    };

    it("renders correctly with props", () => {
        const wrapper = mount(NavigationCard, {
            props: {
                navigationEntry: navigationEntryMock,
            },
        });

        // Check if the label is rendered
        expect(wrapper.text()).toContain(navigationEntryMock.label);

        // Check if the icon is rendered
        const iconElement = wrapper.find("i");
        expect(iconElement.classes()).toContain("pi");
        expect(iconElement.classes()).toContain("pi-home");
        expect(iconElement.classes()).toContain("!text-4xl");
    });

    it("throws an error if required props are missing", () => {
        // Suppress console error to avoid polluting test output
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        expect(() => {
            mount(NavigationCard);
        }).toThrowError();

        consoleErrorSpy.mockRestore();
    });
});
