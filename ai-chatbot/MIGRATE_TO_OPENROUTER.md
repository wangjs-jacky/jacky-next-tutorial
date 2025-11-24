# 迁移到 OpenRouter 指南

## 🎯 概述

本指南将帮助你将项目从 Vercel AI Gateway 迁移到 OpenRouter。

---

## 📋 迁移步骤

### 步骤 1：安装 OpenRouter 官方 SDK

```bash
pnpm add @openrouter/ai-sdk-provider
```

**注意**：OpenRouter 官方提供了专门的 SDK，这是推荐的方式。参考：[OpenRouter Vercel AI SDK 文档](https://openrouter.ai/docs/community/vercel-ai-sdk)

### 步骤 2：获取 OpenRouter API Key

1. 访问 [OpenRouter 官网](https://openrouter.ai/)
2. 注册/登录账号
3. 在 API Keys 页面创建新的 API Key
4. 复制 API Key

### 步骤 3：配置环境变量

在 `.env.local` 文件中添加：

```env
# OpenRouter API Key
OPENROUTER_API_KEY=sk-or-v1-你的API密钥

# 可选：如果需要保留 AI Gateway（用于对比测试）
# AI_GATEWAY_API_KEY=xxx...
```

### 步骤 4：修改 Provider 配置

修改 `lib/ai/providers.ts` 文件：

**修改前（使用 AI Gateway）：**
```typescript
import { gateway } from "@ai-sdk/gateway";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
    // ...
  },
});
```

**修改后（使用 OpenRouter）：**
```typescript
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// 使用 OpenRouter 官方 Provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    "chat-model": openrouter("xai/grok-2-vision-1212"),
    // ...
  },
});
```

**注意**：代码已经自动修改完成！✅

### 步骤 5：更新模型名称

OpenRouter 使用不同的模型命名格式，需要更新模型 ID。

---

## 🔧 代码修改详情

### 已完成的修改

✅ **`lib/ai/providers.ts`** - 已修改为使用 OpenRouter
✅ **`package.json`** - 已添加 `@ai-sdk/openrouter` 依赖

### 主要变化

1. **导入语句**：
   ```typescript
   // 之前
   import { gateway } from "@ai-sdk/gateway";
   
   // 现在（使用 OpenRouter 官方 Provider）
   import { createOpenRouter } from "@openrouter/ai-sdk-provider";
   ```

2. **创建 Provider 实例**：
   ```typescript
   // 之前
   gateway.languageModel("xai/grok-2-vision-1212")
   
   // 现在（更简洁，官方推荐）
   const openrouter = createOpenRouter({
     apiKey: process.env.OPENROUTER_API_KEY,
   });
   openrouter("xai/grok-2-vision-1212")
   ```

---

## 📝 模型名称映射

### 当前使用的模型（AI Gateway）

- `xai/grok-2-vision-1212` → OpenRouter: `xai/grok-2-vision-1212`
- `xai/grok-3-mini` → OpenRouter: `xai/grok-3-mini`
- `google/gemini-2.5-flash` → OpenRouter: `google/gemini-2.5-flash`

### OpenRouter 支持的模型格式

OpenRouter 使用格式：`provider/model-name`

例如：
- `openai/gpt-4`
- `anthropic/claude-3-opus`
- `xai/grok-2-vision-1212`
- `google/gemini-pro`

---

## ✅ 优势

### 使用 OpenRouter 的优势

1. **更多模型选择**：支持 100+ 个 AI 模型
2. **统一接口**：使用 OpenAI 标准格式
3. **灵活部署**：可以在任何平台使用
4. **统一计费**：一个账单管理所有模型

### 与 AI Gateway 的对比

| 特性 | AI Gateway | OpenRouter |
|------|-----------|------------|
| 支持的模型 | Vercel 支持的模型 | 100+ 模型 |
| 部署要求 | 主要在 Vercel | 任何平台 |
| 认证方式 | OIDC（Vercel）或 API Key | API Key |
| 费用 | 按使用量 | 按使用量 |

---

## 🧪 测试

修改完成后，运行项目测试：

```bash
pnpm dev
```

确保：
- ✅ 聊天功能正常
- ✅ 模型调用成功
- ✅ 响应格式正确

---

## 🔄 回滚方案

如果需要回滚到 AI Gateway：

1. 恢复 `lib/ai/providers.ts` 文件
2. 确保 `AI_GATEWAY_API_KEY` 在环境变量中
3. 重新安装依赖（如果需要）

---

## 📚 参考资源

- [OpenRouter 官网](https://openrouter.ai/)
- [OpenRouter 文档](https://openrouter.ai/docs)
- [OpenRouter 模型列表](https://openrouter.ai/models)
- [AI SDK OpenRouter Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/openrouter)

