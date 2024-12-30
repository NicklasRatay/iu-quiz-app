import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizLobby from "./QuizLobby.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizLobby", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizLobby);
        expect(wrapper.exists()).toBe(true);
    });
});
