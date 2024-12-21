import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizFormCreate from "./QuizFormCreate.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizFormCreate", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizFormCreate);
        expect(wrapper.exists()).toBe(true);
    });
});
