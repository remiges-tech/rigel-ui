import { defineConfig } from "cypress";
import registerExcelTask from "./cypress/plugins/index"; // Import the Excel task plugin

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    setupNodeEvents(on, config) {
      registerExcelTask(on); // Register our custom task for writing to Excel
      return config;
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
