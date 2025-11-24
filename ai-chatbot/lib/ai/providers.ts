import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
    const {
      artifactModel,
      chatModel,
      reasoningModel,
      titleModel,
    } = require("./models.mock");
    return customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    });
  })()
  : customProvider({
    languageModels: {
      "chat-model": openrouter("xai/grok-2-vision-1212"),
      "chat-model-reasoning": wrapLanguageModel({
        model: openrouter("xai/grok-3-mini"),
        middleware: extractReasoningMiddleware({ tagName: "think" }),
      }),
      "title-model": openrouter("xai/grok-2-1212"),
      "artifact-model": openrouter("xai/grok-2-1212"),
    },
  });
