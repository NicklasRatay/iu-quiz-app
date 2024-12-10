import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuestionFormEdit from "./QuestionFormEdit.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuestionFormEdit", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuestionFormEdit);
        expect(wrapper.exists()).toBe(true);
    });
});
