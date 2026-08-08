import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import { renderCatalog } from "./src/render-catalog.mjs";

export default defineConfig(() => {
  const coverageEnabled = process.env.VITE_COVERAGE === "true";

  return {
    plugins: [
      {
        name: "eklipse-release-catalog",
        transformIndexHtml: {
          order: "pre",
          handler: renderCatalog,
        },
      },
      tailwindcss(),
      ...(coverageEnabled
        ? [
            istanbul({
              include: ["src/**/*.ts"],
              exclude: ["node_modules", "tests"],
              extension: [".ts"],
              requireEnv: true,
              forceBuildInstrument: true,
            }),
          ]
        : []),
    ],
    build: {
      sourcemap: coverageEnabled,
    },
  };
});
