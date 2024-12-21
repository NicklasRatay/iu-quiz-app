import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import QuizParticipantCard from "./QuizParticipantCard.vue";
import type { Database } from "~/supabase/types";

describe("QuizParticipantCard", () => {
    const mockParticipant = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
    } as Database["public"]["Views"]["vw_quiz_participant"]["Row"];

    it("renders correctly with required props", () => {
        const wrapper = mount(QuizParticipantCard, {
            props: {
                participant: mockParticipant,
            },
        });

        // Check if initials are computed and displayed correctly
        const initials = wrapper.find(".rounded-full");
        expect(initials.exists()).toBe(true);
        expect(initials.text()).toBe("JD");

        // Check if full name is displayed correctly
        const fullName = wrapper.find(".text-xl");
        expect(fullName.exists()).toBe(true);
        expect(fullName.text()).toBe("John Doe");

        // Check if email is displayed as a mailto link
        const emailLink = wrapper.find("a");
        expect(emailLink.exists()).toBe(true);
        expect(emailLink.text()).toBe("john.doe@example.com");
        expect(emailLink.attributes("href")).toBe(
            "mailto:john.doe@example.com",
        );
    });

    it("applies hover styles when `clickable` is true", () => {
        const wrapper = mount(QuizParticipantCard, {
            props: {
                participant: mockParticipant,
                clickable: true,
            },
        });

        // Check if hover styles are applied
        expect(wrapper.classes()).toContain("hover:cursor-pointer");
        expect(wrapper.classes()).toContain("hover:bg-surface-50");
        expect(wrapper.classes()).toContain("dark:hover:bg-surface-800");
        expect(wrapper.classes()).toContain("transition-colors");
        expect(wrapper.classes()).toContain("duration-300");
    });

    it("does not apply hover styles when `clickable` is false", () => {
        const wrapper = mount(QuizParticipantCard, {
            props: {
                participant: mockParticipant,
                clickable: false,
            },
        });

        // Check if hover styles are not applied
        expect(wrapper.classes()).not.toContain("hover:cursor-pointer");
        expect(wrapper.classes()).not.toContain("hover:bg-surface-50");
        expect(wrapper.classes()).not.toContain("dark:hover:bg-surface-800");
    });

    it("handles missing first or last name gracefully", () => {
        const incompleteParticipant = {
            first_name: "John",
            last_name: null,
            email: "john.doe@example.com",
        } as Database["public"]["Views"]["vw_quiz_participant"]["Row"];

        const wrapper = mount(QuizParticipantCard, {
            props: {
                participant: incompleteParticipant,
            },
        });

        // Check initials and full name for incomplete participant data
        const initials = wrapper.find(".rounded-full");
        expect(initials.text()).toBe("J");

        const fullName = wrapper.find(".text-xl");
        expect(fullName.text()).toBe("John null");
    });
});
