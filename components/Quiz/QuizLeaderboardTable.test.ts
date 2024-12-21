import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import QuizLeaderboardTable from "./QuizLeaderboardTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("QuizLeaderboardTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(QuizLeaderboardTable);
        expect(wrapper.exists()).toBe(true);
    });
});
