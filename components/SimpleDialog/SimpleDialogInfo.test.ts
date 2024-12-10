import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { mount, config } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import SimpleDialogInfo from "./SimpleDialogInfo.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("SimpleDialogInfo", () => {
    let wrapper: VueWrapper;

    // Mock data to be used for dialogRef
    const dialogData = {
        message: "Are you sure?",
    };

    const dialogRef = ref({
        data: dialogData,
        close: vi.fn(),
    });

    beforeEach(() => {
        wrapper = mount(SimpleDialogInfo, {
            global: {
                provide: {
                    dialogRef,
                },
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
        vi.clearAllMocks();
    });

    it("can be mounted", () => {
        expect(wrapper.exists()).toBe(true);
    });
});
