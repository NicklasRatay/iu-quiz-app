import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import QuizCardList from "./QuizCardList.vue";
import QuizCard from "./QuizCard.vue";
import type { Database } from "~/supabase/types";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizCardList", () => {
    const mockQuizzes = [
        {
            id: 1,
            quiz_type_name: "General Knowledge Quiz",
            type_icon: "pi pi-book",
            quiz_status_name: "Completed",
            status_icon: "pi pi-check",
            status_severity: "success",
            question_count: 10,
        },
        {
            id: 2,
            quiz_type_name: "Science Quiz",
            type_icon: "pi pi-flask",
            quiz_status_name: "In Progress",
            status_icon: "pi pi-clock",
            status_severity: "warning",
            question_count: 15,
        },
    ] as Array<Database["public"]["Views"]["vw_quiz"]["Row"]>;

    it("renders correctly with quizzes", () => {
        const wrapper = mount(QuizCardList, {
            props: {
                quizzes: mockQuizzes,
            },
            global: {
                components: {
                    QuizCard,
                },
            },
        });

        // Check if QuizCard components are rendered
        const quizCards = wrapper.findAllComponents(QuizCard);
        expect(quizCards.length).toBe(mockQuizzes.length);

        // Verify each QuizCard receives the correct props
        mockQuizzes.forEach((quiz, index) => {
            expect(quizCards[index].props("quiz")).toEqual(quiz);
        });
    });

    it("renders the new quiz button when `newQuizButton` is true", () => {
        const wrapper = mount(QuizCardList, {
            props: {
                quizzes: mockQuizzes,
                newQuizButton: true,
            },
            global: {
                components: {
                    Button,
                },
            },
        });

        const newQuizButton = wrapper.findAllComponents(Button)[1];
        expect(newQuizButton.exists()).toBe(true);
        expect(newQuizButton.props("label")).toBe("Neues Quiz Erstellen");
        expect(newQuizButton.props("icon")).toBe("pi pi-plus");
    });

    it("does not render the new quiz button when `newQuizButton` is false", () => {
        const wrapper = mount(QuizCardList, {
            props: {
                quizzes: mockQuizzes,
                newQuizButton: false,
            },
        });

        const buttons = wrapper.findAllComponents(Button);
        expect(buttons.length === 2).toBe(false);
    });

    it("emits `quizClicked` event when a QuizCard is clicked", async () => {
        const wrapper = mount(QuizCardList, {
            props: {
                quizzes: mockQuizzes,
            },
            global: {
                components: {
                    QuizCard,
                },
            },
        });

        const quizCards = wrapper.findAllComponents(QuizCard);

        // Trigger click event on the first QuizCard
        await quizCards[0].trigger("click");

        // Ensure the `quizClicked` event is emitted with the correct quiz
        expect(wrapper.emitted().quizClicked).toBeTruthy();
        expect(wrapper.emitted().quizClicked[0]).toEqual([mockQuizzes[0]]);
    });
});
