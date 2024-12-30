import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { mount, config } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import UserLoginForm from "./UserLoginForm.vue";
import { APP_NAME } from "~/utils/constants";

config.global.plugins = [PrimeVue, ToastService];

describe("UserLoginForm", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(UserLoginForm);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("can be mounted", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("renders correct title", () => {
        const titleElement = wrapper.find("#title");
        expect(titleElement.exists()).toBe(true);
        expect(titleElement.text()).toBe(APP_NAME);
    });

    it("renders correct labels", () => {
        const emailLabel = wrapper.find("label[for=email]");
        const passwordLabel = wrapper.find("label[for=password]");

        expect(emailLabel.exists()).toBe(true);
        expect(emailLabel.text()).toBe("E-Mail");

        expect(passwordLabel.exists()).toBe(true);
        expect(passwordLabel.text()).toBe("Passwort");
    });

    it("renders input fields", () => {
        const emailInput = wrapper.find("#email");
        const passwordInput = wrapper.find("#password");

        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
    });
});
