import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizResultTable from "./QuizResultTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizResultTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizResultTable);
        expect(wrapper.exists()).toBe(true);
    });
});
