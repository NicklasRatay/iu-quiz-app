type MessageType = "success" | "info" | "warn" | "error";
const messageTypeMap: Record<MessageType, string> = {
    success: "Erfolgreich",
    info: "Information",
    warn: "Achtung",
    error: "Error",
};

export const useSimpleToast = () => {
    const toast = useToast();

    const display = (
        type: MessageType,
        message: string,
        life?: number | null,
        callback?: () => void,
    ) => {
        toast.add({
            severity: type,
            summary: messageTypeMap[type],
            detail: message,
            life: life === null ? undefined : 5000,
        });
        callback?.();
    };

    return {
        info: (message: string) => display("info", message),
        success: (message: string) => display("success", message),
        warn: (message: string) => display("warn", message),
        error: (message: string) =>
            display("error", message, null, () => console.error(message)),
    };
};
