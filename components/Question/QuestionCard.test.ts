import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Tag from "primevue/tag";
import QuestionCard from "./QuestionCard.vue";
import type { Database } from "~/supabase/types";

describe("QuestionCard", () => {
    const mockQuestion = {
        question: "What is the capital of France?",
        courses: ["Geography", "History"],
        categories: ["Europe", "Capital Cities"],
        question_status_name: "Reviewed",
        status_icon: "pi pi-check",
        status_severity: "success",
        created_at: "2023-11-01T10:00:00Z",
    } as Database["public"]["Views"]["vw_question"]["Row"];

    it("renders correctly with required props", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
            },
            global: {
                components: {
                    Tag,
                },
            },
        });

        // Check if the question text is rendered
        expect(wrapper.text()).toContain("What is the capital of France?");

        // Check if courses tags are rendered
        const courseTags = wrapper
            .findAllComponents(Tag)
            .filter((tag) =>
                mockQuestion.courses?.includes(tag.props("value")),
            );
        expect(courseTags.length).toBe(2);

        // Check if categories tags are rendered
        const categoryTags = wrapper
            .findAllComponents(Tag)
            .filter((tag) =>
                mockQuestion.categories?.includes(tag.props("value")),
            );
        expect(categoryTags.length).toBe(2);
    });

    it("renders status and date when `hideStatusAndDate` is false", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
                hideStatusAndDate: false,
            },
            global: {
                components: {
                    Tag,
                },
            },
        });

        // Check if the status tag is rendered
        const tags = wrapper.findAllComponents(Tag);
        const statusTag = tags[tags.length - 1]; // Get the last Tag component
        expect(statusTag.exists()).toBe(true);
        expect(statusTag.props("value")).toBe("Reviewed");
        expect(statusTag.props("icon")).toBe("pi pi-check");
        expect(statusTag.props("severity")).toBe("success");

        // Check if the formatted date is rendered
        expect(wrapper.text()).toContain("1.11.2023");
    });

    it("hides status and date when `hideStatusAndDate` is true", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
                hideStatusAndDate: true,
            },
            global: {
                components: {
                    Tag,
                },
            },
        });

        // Check if the status and date section is not rendered
        expect(wrapper.find(".flex.justify-between.items-end").exists()).toBe(
            false,
        );
    });

    it("applies hover styles when `clickable` is true", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
                clickable: true,
            },
        });

        expect(wrapper.classes()).toContain("hover:cursor-pointer");
        expect(wrapper.classes()).toContain("hover:bg-surface-50");
        expect(wrapper.classes()).toContain("dark:hover:bg-surface-800");
        expect(wrapper.classes()).toContain("transition-colors");
        expect(wrapper.classes()).toContain("duration-300");
    });

    it("does not apply hover styles when `clickable` is false", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
                clickable: false,
            },
        });

        expect(wrapper.classes()).not.toContain("hover:cursor-pointer");
        expect(wrapper.classes()).not.toContain("hover:bg-surface-50");
        expect(wrapper.classes()).not.toContain("dark:hover:bg-surface-800");
    });

    it("renders slot content", () => {
        const wrapper = mount(QuestionCard, {
            props: {
                question: mockQuestion,
            },
            slots: {
                "default": "<div class='slot-content'>Default Slot Content</div>",
                "top-right-corner":
                    "<div class='top-right-slot'>Top Right Slot</div>",
            },
        });

        // Check default slot
        expect(wrapper.find(".slot-content").exists()).toBe(true);
        expect(wrapper.text()).toContain("Default Slot Content");

        // Check top-right-corner slot
        expect(wrapper.find(".top-right-slot").exists()).toBe(true);
        expect(wrapper.text()).toContain("Top Right Slot");
    });
});
