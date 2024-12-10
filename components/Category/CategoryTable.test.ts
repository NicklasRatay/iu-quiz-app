import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import CategoryTable from "./CategoryTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("CategoryTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(CategoryTable);
        expect(wrapper.exists()).toBe(true);
    });
});
