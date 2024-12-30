import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Tag from "primevue/tag";
import QuizCard from "./QuizCard.vue";
import type { Database } from "~/supabase/types";

describe("QuizCard", () => {
    const mockQuiz = {
        quiz_type_name: "General Knowledge Quiz",
        type_icon: "pi pi-book",
        quiz_status_name: "Completed",
        status_icon: "pi pi-check",
        status_severity: "success",
        question_count: 10,
    } as Database["public"]["Views"]["vw_quiz"]["Row"];

    it("renders correctly with required props", () => {
        const wrapper = mount(QuizCard, {
            props: {
                quiz: mockQuiz,
            },
            global: {
                components: {
                    Tag,
                },
            },
        });

        // Check if the quiz type name is rendered
        expect(wrapper.text()).toContain("General Knowledge Quiz");

        // Check if the type icon is rendered
        const typeIcon = wrapper.find("i");
        expect(typeIcon.exists()).toBe(true);
        expect(typeIcon.classes()).toContain("pi");
        expect(typeIcon.classes()).toContain("pi-book");

        // Check if the status tag is rendered
        const statusTag = wrapper.findComponent(Tag);
        expect(statusTag.exists()).toBe(true);
        expect(statusTag.props("value")).toBe("Completed");
        expect(statusTag.props("icon")).toBe("pi pi-check");
        expect(statusTag.props("severity")).toBe("success");

        // Check if the question count is rendered
        expect(wrapper.text()).toContain("10 Fragen");
    });

    it("applies hover styles when `clickable` is true", () => {
        const wrapper = mount(QuizCard, {
            props: {
                quiz: mockQuiz,
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
        const wrapper = mount(QuizCard, {
            props: {
                quiz: mockQuiz,
                clickable: false,
            },
        });

        // Check if hover styles are not applied
        expect(wrapper.classes()).not.toContain("hover:cursor-pointer");
        expect(wrapper.classes()).not.toContain("hover:bg-surface-50");
        expect(wrapper.classes()).not.toContain("dark:hover:bg-surface-800");
    });

    it("renders slot content", () => {
        const wrapper = mount(QuizCard, {
            props: {
                quiz: mockQuiz,
            },
            slots: {
                default: "<div class='slot-content'>Slot Content</div>",
            },
        });

        // Check if slot content is rendered
        const slotContent = wrapper.find(".slot-content");
        expect(slotContent.exists()).toBe(true);
        expect(wrapper.text()).toContain("Slot Content");
    });
});
