import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import { APP_NAME, APP_DESCRIPTION } from "./utils/constants";

const customPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{blue.50}",
            100: "{blue.100}",
            200: "{blue.200}",
            300: "{blue.300}",
            400: "{blue.400}",
            500: "{blue.500}",
            600: "{blue.600}",
            700: "{blue.700}",
            800: "{blue.800}",
            900: "{blue.900}",
            950: "{blue.950}",
        },
    },
});

export default defineNuxtConfig({
    modules: [
        "@primevue/nuxt-module",
        "@nuxtjs/supabase",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/test-utils/module",
        "nuxt-lodash",
        "@nuxt/eslint",
    ],
    devtools: {
        enabled: true,
    },
    app: {
        head: {
            title: APP_NAME,
            meta: [
                {
                    name: APP_DESCRIPTION,
                    content: APP_NAME,
                },
            ],
        },
    },
    build: {
        transpile: ["primevue"],
    },
    css: ["@/assets/css/tailwind.css", "primeicons/primeicons.css"],
    primevue: {
        options: {
            theme: {
                preset: customPreset,
            },
            locale: {
                fileSizeTypes: ["Bytes", "KB", "MB", "GB", "TB"],
                accept: "Bestätigen",
                reject: "Abbrechen",
                apply: "Anwenden",
                clear: "Zurücksetzen",
                addRule: "Regel hinzufügen",
                matchAll: "Alle Bedingungen",
                matchAny: "Irgendeine Bedingung",
                contains: "Enthält",
                notContains: "Enthält nicht",
                startsWith: "Beginnt mit",
                endsWith: "Endet mit",
                equals: "Gleich",
                notEquals: "Ungleich",
                gt: "Größer als",
                gte: "Größer oder gleich",
                lt: "Kleiner als",
                lte: "Kleiner oder gleich",
                dateIs: "Ist",
                dateIsNot: "Ist nicht",
                dateBefore: "Vor",
                dateAfter: "Nach",
                today: "Heute",
                weekHeader: "WK",
                firstDayOfWeek: 1,
                dateFormat: "dd.mm.yyyy",
                dayNames: [
                    "Sonntag",
                    "Montag",
                    "Dienstag",
                    "Mittwoch",
                    "Donnerstag",
                    "Freitag",
                    "Samstag",
                ],
                dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                monthNames: [
                    "Januar",
                    "Februar",
                    "März",
                    "April",
                    "Mai",
                    "Juni",
                    "Juli",
                    "August",
                    "September",
                    "Oktober",
                    "November",
                    "Dezember",
                ],
                monthNamesShort: [
                    "Jan",
                    "Feb",
                    "Mär",
                    "Apr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Dez",
                ],
            },
            pt: {
                global: {
                    css: `
                      .p-datatable-header {
                          border: none !important;
                          border-bottom: 1px solid var(--p-datatable-header-border-color) !important;
                          border-top-left-radius: 0.5rem !important;
                          border-top-right-radius: 0.5rem !important;
                      }
                      .p-datatable-paginator-bottom {
                          border: none !important;
                          border-top: 1px solid var(--p-datatable-header-border-color) !important;
                          border-bottom-left-radius: 0.5rem !important;
                          border-bottom-right-radius: 0.5rem !important;
                      }
                  `,
                },
            },
        },
    },
    vite: {
        plugins: [
            Components({
                resolvers: [PrimeVueResolver()],
            }),
        ],
    },
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
                braceStyle: "1tbs",
                arrowParens: true,
            },
        },
    },
    compatibilityDate: "2024-11-23",
});
