import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuestionFormView from "./QuestionFormView.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuestionFormView", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuestionFormView);
        expect(wrapper.exists()).toBe(true);
    });
});