# OpenRouter 快速开始 🚀

## ✅ 已完成的修改

代码已经自动修改完成！

- ✅ `lib/ai/providers.ts` - 已改为使用 OpenRouter 官方 Provider
- ✅ `package.json` - 已添加 `@openrouter/ai-sdk-provider` 依赖
- ✅ 依赖已安装完成

**使用官方推荐的方案**：根据 [OpenRouter 官方文档](https://openrouter.ai/docs/community/vercel-ai-sdk)，使用 `@openrouter/ai-sdk-provider` 是最佳实践。

---

## 📋 你需要做的 3 步

### 1. 安装依赖（已完成 ✅）

依赖已经安装完成！如果遇到问题，可以运行：

```bash
pnpm install
```

### 2. 获取 OpenRouter API Key

1. 访问 https://openrouter.ai/
2. 注册/登录账号
3. 在 API Keys 页面创建新的 API Key
4. 复制 API Key（格式：`sk-or-v1-xxx...`）

### 3. 配置环境变量

在 `.env.local` 文件中添加：

```env
# OpenRouter API Key（必需）
OPENROUTER_API_KEY=sk-or-v1-你的API密钥
```

**注意**：使用官方 `@openrouter/ai-sdk-provider` 包时，不需要手动配置 HTTP-Referer 等头部信息，SDK 会自动处理。

---

## 🧪 测试

运行项目：

```bash
pnpm dev
```

访问 http://localhost:3000，测试聊天功能是否正常。

---

## 🎯 模型选择

OpenRouter 支持 100+ 个模型，你可以在 `lib/ai/providers.ts` 中修改模型：

```typescript
// 当前使用的模型
"chat-model": openrouter("xai/grok-2-vision-1212"),

// 可以改为其他模型，例如：
"chat-model": openrouter("openai/gpt-4"),
"chat-model": openrouter("anthropic/claude-3-opus"),
"chat-model": openrouter("google/gemini-pro"),
```

查看所有可用模型：https://openrouter.ai/models

---

## 🔄 回滚到 AI Gateway

如果需要回滚：

1. 恢复 `lib/ai/providers.ts` 文件（使用 Git）
2. 确保 `AI_GATEWAY_API_KEY` 在环境变量中
3. 重新安装依赖

---

## 📚 更多信息

查看 `MIGRATE_TO_OPENROUTER.md` 了解详细迁移步骤。

