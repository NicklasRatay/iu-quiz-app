import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import CourseDialog from "./CourseDialog.vue";

config.global.plugins = [PrimeVue, ToastService, DialogService];

describe("CourseDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(CourseDialog);
        expect(wrapper.exists()).toBe(true);
    });
});
