# AI_GATEWAY_API_KEY 详解

## 🔑 第 6-11 行的作用

`.env` 文件的第 6-11 行是关于 **AI Gateway API Key** 的配置说明：

```env
# Instructions to create an AI Gateway API key here: https://vercel.com/ai-gateway
# API key required for non-Vercel deployments
# For Vercel deployments, OIDC tokens are used automatically
# https://vercel.com/ai-gateway
AI_GATEWAY_API_KEY=****
```

---

## 🤔 什么是 AI Gateway？

**Vercel AI Gateway** 是 Vercel 提供的一个**统一的 AI 模型访问网关**。它让你可以通过一个统一的接口访问多个 AI 模型（如 OpenAI、Anthropic、xAI 等）。

### 简单理解

想象一下：
- 🚪 **没有 AI Gateway**：你需要为每个 AI 提供商单独配置 API 密钥，管理多个密钥很麻烦
- ✨ **有了 AI Gateway**：只需要一个 API 密钥，就可以访问所有支持的 AI 模型！

---

## 🎯 AI_GATEWAY_API_KEY 的作用

### 1. **认证和授权**
`AI_GATEWAY_API_KEY` 用于：
- 验证你的应用是否有权限使用 AI Gateway
- 控制 API 访问频率和配额
- 记录使用情况和计费

### 2. **在项目中的使用**

在这个项目中，AI Gateway 用于访问 xAI 的模型（如 Grok）：

```typescript
// lib/ai/providers.ts
import { gateway } from "@ai-sdk/gateway";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
    "chat-model-reasoning": gateway.languageModel("xai/grok-3-mini"),
    "title-model": gateway.languageModel("google/gemini-2.5-flash"),
    "artifact-model": gateway.languageModel("google/gemini-2.5-flash"),
  },
});
```

---

## 📋 配置说明

### 情况 1：部署在 Vercel 上 ✅

**不需要配置 `AI_GATEWAY_API_KEY`！**

- Vercel 会自动使用 **OIDC tokens** 进行认证
- 无需手动配置 API 密钥
- 更安全，更简单

### 情况 2：本地开发或非 Vercel 部署 ⚙️

**需要配置 `AI_GATEWAY_API_KEY`**

1. **获取 API Key**：
   - 访问：https://vercel.com/ai-gateway
   - 登录 Vercel 账号
   - 创建 AI Gateway
   - 获取 API Key

2. **配置环境变量**：
   ```env
   AI_GATEWAY_API_KEY=你的API密钥
   ```

---

## 🔍 代码中的使用

### 1. AI Gateway 自动检测

AI Gateway SDK 会自动检测环境：
- **在 Vercel 上**：使用 OIDC tokens（自动）
- **本地/其他平台**：使用 `AI_GATEWAY_API_KEY` 环境变量

### 2. 错误处理

如果配置不正确，会显示错误提示：

```typescript
// components/chat.tsx
onError: (error) => {
  if (error.message?.includes("AI Gateway requires a valid credit card")) {
    setShowCreditCardAlert(true);
  }
}
```

---

## 🚀 如何获取 AI_GATEWAY_API_KEY

### 步骤 1：访问 AI Gateway 页面

1. 打开浏览器，访问：https://vercel.com/ai-gateway
2. 登录你的 Vercel 账号

### 步骤 2：创建 AI Gateway

1. 点击 "Create AI Gateway"
2. 选择你的 Vercel 团队
3. 配置 Gateway 设置

### 步骤 3：获取 API Key

1. 在 Gateway 设置页面找到 "API Key"
2. 点击 "Generate" 或 "Copy"
3. 复制生成的 API Key

### 步骤 4：配置到项目

在 `.env.local` 文件中添加：

```env
AI_GATEWAY_API_KEY=你的API密钥
```

---

## ⚠️ 重要注意事项

### ✅ 应该做的
- ✅ 将 `AI_GATEWAY_API_KEY` 存储在 `.env.local` 中
- ✅ 确保 `.env.local` 在 `.gitignore` 中
- ✅ 生产环境使用不同的 API Key
- ✅ 定期轮换 API Key（如果怀疑泄露）

### ❌ 不应该做的
- ❌ **不要**将 API Key 提交到 Git
- ❌ **不要**在代码中硬编码 API Key
- ❌ **不要**在客户端代码中暴露 API Key
- ❌ **不要**分享你的 API Key 给他人

---

## 💰 费用说明

### AI Gateway 的费用

- **Gateway 本身**：免费
- **AI 模型调用**：按实际使用量计费
  - 每个模型的定价不同
  - 可以在 Vercel 控制台查看使用情况

### 需要信用卡

- 使用 AI Gateway 需要**在 Vercel 账户中添加信用卡**
- 这是为了支付 AI 模型调用的费用
- 如果没有添加信用卡，会显示错误提示

---

## 🔄 不同环境的配置

### 开发环境（本地）

```env
# .env.local
AI_GATEWAY_API_KEY=你的开发环境API密钥
```

### 生产环境（Vercel）

**不需要配置**，Vercel 会自动处理。

如果需要在非 Vercel 平台部署：

```env
# .env.production
AI_GATEWAY_API_KEY=你的生产环境API密钥
```

---

## 🎓 学习阶段 3 的准备工作

当你在**阶段 3：AI SDK 集成**时，你需要：

### 选项 1：使用 AI Gateway（推荐）

1. **创建 Vercel 账号**（如果还没有）
2. **设置 AI Gateway**：
   - 访问 https://vercel.com/ai-gateway
   - 创建 Gateway
   - 获取 API Key
3. **配置环境变量**：
   ```env
   AI_GATEWAY_API_KEY=你的API密钥
   ```

### 选项 2：直接使用 AI 提供商（简单）

如果不想使用 AI Gateway，可以直接使用 OpenAI 或其他提供商：

```typescript
// lib/ai/providers.ts
import { openai } from "@ai-sdk/openai";

export const myProvider = openai({
  apiKey: process.env.OPENAI_API_KEY,
});
```

然后在 `.env.local` 中配置：

```env
OPENAI_API_KEY=你的OpenAI密钥
```

---

## 📚 相关文档

- [Vercel AI Gateway 文档](https://vercel.com/docs/ai-gateway)
- [AI SDK Gateway Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/vercel-gateway)
- [Vercel AI Gateway 定价](https://vercel.com/pricing)

---

## 💡 常见问题

### Q1: 本地开发必须使用 AI Gateway 吗？
**A**: 不一定。你可以：
- 使用 AI Gateway（需要 API Key）
- 直接使用 AI 提供商的 SDK（如 OpenAI SDK）

### Q2: 为什么 Vercel 部署不需要 API Key？
**A**: Vercel 使用 OIDC（OpenID Connect）自动认证，更安全且无需手动配置。

### Q3: AI Gateway 是免费的吗？
**A**: Gateway 本身免费，但调用 AI 模型需要付费（按使用量）。

### Q4: 可以同时使用多个 AI 模型吗？
**A**: 可以！AI Gateway 支持访问多个模型，只需要在代码中指定模型名称即可。

### Q5: 如何查看使用情况？
**A**: 在 Vercel 控制台的 AI Gateway 页面可以查看使用统计和费用。

---

## ✨ 总结

**第 6-11 行的作用**：

1. **注释说明**（第 6-9 行）：
   - 如何创建 AI Gateway API Key
   - 什么时候需要配置
   - Vercel 部署的特殊说明

2. **环境变量配置**（第 10 行）：
   - `AI_GATEWAY_API_KEY` 用于非 Vercel 部署
   - 本地开发时需要配置
   - 必须妥善保管，不要泄露

**记住**：
- ✅ Vercel 部署：**不需要**配置（自动处理）
- ⚙️ 本地/其他平台：**需要**配置 API Key
- 🔒 安全第一：**不要**提交到 Git！

---

## 🎯 快速检查清单

配置 AI Gateway 后，确保：
- [ ] 已创建 Vercel 账号
- [ ] 已在 Vercel 中添加信用卡
- [ ] 已创建 AI Gateway
- [ ] 已获取 API Key
- [ ] 已在 `.env.local` 中配置
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] 项目可以正常调用 AI 模型

---

**现在你理解了 AI_GATEWAY_API_KEY 的作用！** 🚀

