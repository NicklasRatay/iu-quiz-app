import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { mount, config } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import SimpleDialogBase from "./SimpleDialogBase.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("SimpleDialogBase", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(SimpleDialogBase, {
            props: {
                message: "Test message",
                icon: "pi-database",
                iconColor: "text-primary",
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("can be mounted", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("renders correct message", () => {
        const message = wrapper.find("div > div > div");
        expect(message.text()).toBe("Test message");
    });

    it("renders correct icon", () => {
        const icon = wrapper.find("div > div > i");
        expect(icon.classes()).toContain("pi");
        expect(icon.classes()).toContain("pi-database");
        expect(icon.classes()).toContain("text-primary");
    });
});
