import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { mount, config } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import SimpleDialogConfirm from "./SimpleDialogConfirm.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("SimpleDialogConfirm", () => {
    let wrapper: VueWrapper;

    // Mock data to be used for dialogRef
    const dialogData = {
        message: "Are you sure?",
        icon: "pi pi-question",
        iconColor: "text-warning",
        acceptLabel: "Yes",
        cancelLabel: "No",
        acceptCallback: vi.fn(),
        cancelCallback: vi.fn(),
    };

    const dialogRef = ref({
        data: dialogData,
        close: vi.fn(),
    });

    beforeEach(() => {
        wrapper = mount(SimpleDialogConfirm, {
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

    it("renders correct buttons", () => {
        const buttons = wrapper.findAll("button");
        expect(buttons.length).toBe(2);

        expect(buttons[0].text()).toBe(dialogData.acceptLabel);
        expect(buttons[1].text()).toBe(dialogData.cancelLabel);
    });

    it("calls acceptCallback on accept button click", async () => {
        const acceptButton = wrapper.find("button:nth-child(1)");
        await acceptButton.trigger("click");

        expect(dialogData.acceptCallback).toHaveBeenCalled();
        expect(dialogRef.value.close).toHaveBeenCalled();
    });

    it("calls cancelCallback on cancel button click", async () => {
        const cancelButton = wrapper.find("button:nth-child(2)");
        await cancelButton.trigger("click");

        expect(dialogData.cancelCallback).toHaveBeenCalled();
        expect(dialogRef.value.close).toHaveBeenCalled();
    });
});
