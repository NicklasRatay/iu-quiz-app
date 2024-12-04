import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import NavigationCardList from "./NavigationCardList.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("NavigationCardList", () => {
    it("can be mounted", () => {
        const wrapper = mount(NavigationCardList);
        expect(wrapper.exists()).toBe(true);
    });
});
