import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import UserProfileDialog from "./UserProfileDialog.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("ProfileDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(UserProfileDialog);
        expect(wrapper.exists()).toBe(true);
    });
});
