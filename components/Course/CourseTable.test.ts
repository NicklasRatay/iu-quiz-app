import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import CourseTable from "./CourseTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("CourseTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(CourseTable);
        expect(wrapper.exists()).toBe(true);
    });
});
