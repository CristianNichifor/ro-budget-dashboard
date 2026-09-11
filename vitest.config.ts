import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
      coverage: {
        provider: "v8",
        include: ["src/lib/**", "src/data/**"],
      },
    },
  })
);
