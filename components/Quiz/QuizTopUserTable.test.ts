import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizTopUserTable from "./QuizTopUserTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizTopUserTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizTopUserTable);
        expect(wrapper.exists()).toBe(true);
    });
});
