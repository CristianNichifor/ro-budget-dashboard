import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "ro",
  locales: ["ro", "en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
    },
  ],
});
