import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizQuestionForm from "./QuizQuestionForm.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizQuestionForm", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizQuestionForm);
        expect(wrapper.exists()).toBe(true);
    });
});
