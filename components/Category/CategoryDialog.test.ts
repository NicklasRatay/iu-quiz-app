import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import CategoryDialog from "./CategoryDialog.vue";

config.global.plugins = [PrimeVue, ToastService, DialogService];

describe("CategoryDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(CategoryDialog);
        expect(wrapper.exists()).toBe(true);
    });
});
