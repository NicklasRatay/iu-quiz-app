import SimpleDialogInfo from "@/components/SimpleDialog/SimpleDialogInfo.vue";
import SimpleDialogConfirm from "@/components/SimpleDialog/SimpleDialogConfirm.vue";

export const useSimpleDialog = () => {
    const dialog = useDialog();

    return {
        inform: (options: {
            message: string;
            header?: string;
            icon?: string;
            iconColor?: string;
        }) => {
            dialog.open(SimpleDialogInfo, {
                props: {
                    header: options.header ?? "Information",
                    modal: true,
                },
                data: {
                    icon: options.icon,
                    iconColor: options.iconColor,
                    message: options.message,
                },
            });
        },
        confirm: (options: {
            message: string;
            acceptCallback: () => void;
            cancelCallback?: () => void;
            header?: string;
            icon?: string;
            iconColor?: string;
            requiresConfirmation?: boolean;
            acceptLabel?: string;
            acceptIcon?: string;
            acceptSeverity?:
                | "success"
                | "help"
                | "secondary"
                | "info"
                | "warning"
                | "danger"
                | "contrast";
            cancelLabel?: string;
            cancelIcon?: string;
            cancelSeverity?:
                | "success"
                | "help"
                | "secondary"
                | "info"
                | "warning"
                | "danger"
                | "contrast";
        }) => {
            if (options.requiresConfirmation ?? true) {
                dialog.open(SimpleDialogConfirm, {
                    props: {
                        header: options.header ?? "Bestätigen",
                        modal: true,
                    },
                    data: {
                        acceptCallback: options.acceptCallback,
                        icon: options.icon,
                        iconColor: options.iconColor,
                        message: options.message,
                        acceptLabel: options.acceptLabel,
                        acceptIcon: options.acceptIcon,
                        acceptSeverity: options.acceptSeverity,
                        cancelLabel: options.cancelLabel,
                        cancelIcon: options.cancelIcon,
                        cancelSeverity: options.cancelSeverity,
                    },
                });
            } else {
                options.acceptCallback();
            }
        },
        confirmUnsavedChanges: (options: {
            hasUnsavedChanges: boolean;
            acceptCallback: () => void;
            cancelCallback?: () => void;
        }) => {
            if (options.hasUnsavedChanges ?? true) {
                dialog.open(SimpleDialogConfirm, {
                    props: {
                        header: "Ungespeicherte Daten",
                        modal: true,
                    },
                    data: {
                        acceptCallback: options.acceptCallback,
                        iconColor: "text-orange-500",
                        message:
                            "Es gibt ungespeicherte Änderungen. Möchten Sie diese verwerfen und fortfahren?",
                        acceptLabel: "Verwerfen",
                        acceptIcon: "pi-undo",
                        acceptSeverity: "warn",
                        cancelCallback: options.cancelCallback,
                    },
                });
            } else {
                options.acceptCallback();
            }
        },
        confirmDeletion: (options: {
            acceptCallback: () => void;
            cancelCallback?: () => void;
        }) => {
            dialog.open(SimpleDialogConfirm, {
                props: {
                    header: "Löschen Bestätigen",
                    modal: true,
                },
                data: {
                    acceptCallback: options.acceptCallback,
                    iconColor: "text-red-500",
                    message:
                        "Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?",
                    acceptLabel: "Löschen",
                    acceptIcon: "pi-trash",
                    acceptSeverity: "danger",
                    cancelCallback: options.cancelCallback,
                },
            });
        },
    };
};
