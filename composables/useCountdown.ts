export const useCountdown = (callback?: () => void) => {
    const remainingSeconds = ref<number | null>(null);
    const countdownInterval = ref<number | null>(null);
    const shouldExecuteCallback = ref(true);

    const startCountdown = (seconds: number) => {
        remainingSeconds.value = seconds; // Set the initial seconds
        countdownInterval.value = window.setInterval(() => {
            if (remainingSeconds.value! > 0) {
                remainingSeconds.value! -= 1;
                return;
            }

            stopCountdown();

            if (shouldExecuteCallback.value) {
                callback?.();
            }
        }, 1000);
    };

    const stopCountdown = () => {
        if (countdownInterval.value) {
            clearInterval(countdownInterval.value);
            countdownInterval.value = null;
        }
    };

    const cancelCountdownCallback = () => {
        shouldExecuteCallback.value = false;
    };

    return {
        remainingSeconds,
        startCountdown,
        stopCountdown,
        cancelCountdownCallback,
    };
};
