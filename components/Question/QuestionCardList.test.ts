import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import QuestionCardList from "./QuestionCardList.vue";
import QuestionCard from "./QuestionCard.vue";
import type { Database } from "~/supabase/types";

config.global.plugins = [PrimeVue, ToastService];

describe("QuestionCardList", () => {
    const mockQuestions = [
        {
            id: 1,
            question: "What is the capital of France?",
            courses: ["Geography"],
            categories: ["Europe"],
            question_status_name: "Reviewed",
            status_icon: "pi pi-check",
            status_severity: "success",
            created_at: "2023-11-01T10:00:00Z",
        },
        {
            id: 2,
            question: "What is the capital of Germany?",
            courses: ["Geography"],
            categories: ["Europe"],
            question_status_name: "Pending",
            status_icon: "pi pi-clock",
            status_severity: "warning",
            created_at: "2023-11-02T10:00:00Z",
        },
    ] as Array<Database["public"]["Views"]["vw_question"]["Row"]>;

    it("renders correctly with questions", () => {
        const wrapper = mount(QuestionCardList, {
            props: {
                questions: mockQuestions,
            },
            global: {
                components: {
                    QuestionCard,
                },
            },
        });

        // Check if QuestionCard components are rendered
        const questionCards = wrapper.findAllComponents(QuestionCard);
        expect(questionCards.length).toBe(mockQuestions.length);

        // Verify each QuestionCard receives the correct props
        mockQuestions.forEach((question, index) => {
            expect(questionCards[index].props("question")).toEqual(question);
        });
    });

    it("renders the new question button when `newQuestionButton` is true", () => {
        const wrapper = mount(QuestionCardList, {
            props: {
                questions: mockQuestions,
                newQuestionButton: true,
            },
            global: {
                components: {
                    Button,
                },
            },
        });

        const newQuestionButton = wrapper.findAllComponents(Button)[1];
        expect(newQuestionButton.exists()).toBe(true);
        expect(newQuestionButton.props("label")).toBe("Neue Frage Erstellen");
        expect(newQuestionButton.props("icon")).toBe("pi pi-plus");
    });

    it("does not render the new question button when `newQuestionButton` is false", () => {
        const wrapper = mount(QuestionCardList, {
            props: {
                questions: mockQuestions,
                newQuestionButton: false,
            },
        });

        const buttons = wrapper.findAllComponents(Button);
        expect(buttons.length === 2).toBe(false);
    });

    it("emits `questionClicked` event when a QuestionCard is clicked", async () => {
        const wrapper = mount(QuestionCardList, {
            props: {
                questions: mockQuestions,
            },
            global: {
                components: {
                    QuestionCard,
                },
            },
        });

        const questionCards = wrapper.findAllComponents(QuestionCard);

        // Trigger click event on the first QuestionCard
        await questionCards[0].trigger("click");

        // Ensure the `questionClicked` event is emitted with the correct question
        expect(wrapper.emitted().questionClicked).toBeTruthy();
        expect(wrapper.emitted().questionClicked[0]).toEqual([
            mockQuestions[0],
        ]);
    });
});
