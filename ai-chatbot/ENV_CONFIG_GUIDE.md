# 环境变量配置指南

## 📍 配置文件位置

环境变量配置在项目根目录的 **`.env.local`** 文件中。

```
ai-chatbot/
├── .env.local          ← 在这里配置（本地开发）
├── .env.example        ← 示例文件（不要修改）
└── ...
```

---

## 🔑 OpenRouter 配置

### 1. 打开 `.env.local` 文件

在项目根目录找到 `.env.local` 文件并打开。

### 2. 添加 OpenRouter API Key

在文件末尾添加：

```env
# OpenRouter API Key
# Get your API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-你的API密钥
```

### 3. 完整的 `.env.local` 示例

```env
# Generate a random secret: https://generate-secret.vercel.app/32 or `openssl rand -base64 32`
AUTH_SECRET=onwvtLX6Nghd6RSZJ7WbN22U3L+qrXBkP0lHHMOxaf0=

# AI Gateway API key (如果使用 AI Gateway)
AI_GATEWAY_API_KEY=****

# OpenRouter API Key (如果使用 OpenRouter)
OPENROUTER_API_KEY=sk-or-v1-你的API密钥

# Vercel Blob Store
BLOB_READ_WRITE_TOKEN=****

# PostgreSQL database
POSTGRES_URL=****

# Redis store
REDIS_URL=****
```

---

## 🎯 如何获取 OpenRouter API Key

1. **访问 OpenRouter**
   - 打开 https://openrouter.ai/
   - 注册/登录账号

2. **创建 API Key**
   - 点击右上角头像 → "Keys"
   - 点击 "Create Key"
   - 复制生成的 API Key（格式：`sk-or-v1-xxx...`）

3. **配置到项目**
   - 在 `.env.local` 中添加：
     ```env
     OPENROUTER_API_KEY=sk-or-v1-你的API密钥
     ```

---

## ⚠️ 重要提示

### ✅ 应该做的
- ✅ 在 `.env.local` 中配置（本地开发）
- ✅ 确保 `.env.local` 在 `.gitignore` 中（已配置）
- ✅ 生产环境在 Vercel 环境变量中配置

### ❌ 不应该做的
- ❌ **不要**将 `.env.local` 提交到 Git
- ❌ **不要**在代码中硬编码 API Key
- ❌ **不要**分享你的 API Key

---

## 🔄 不同环境的配置

### 本地开发环境

配置文件：`.env.local`

```env
OPENROUTER_API_KEY=sk-or-v1-你的API密钥
```

### 生产环境（Vercel）

在 Vercel 项目设置中配置：

1. 进入 Vercel 项目设置
2. 找到 "Environment Variables"
3. 添加 `OPENROUTER_API_KEY`
4. 选择对应的环境（Production, Preview, Development）

---

## 📝 当前项目需要的环境变量

根据项目代码，你需要配置：

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `AUTH_SECRET` | ✅ | NextAuth.js 密钥 |
| `OPENROUTER_API_KEY` | ✅ | OpenRouter API Key（如果使用 OpenRouter）|
| `AI_GATEWAY_API_KEY` | ⚠️ | AI Gateway API Key（如果使用 AI Gateway）|
| `POSTGRES_URL` | ✅ | PostgreSQL 数据库连接字符串 |
| `BLOB_READ_WRITE_TOKEN` | ✅ | Vercel Blob 存储 Token |
| `REDIS_URL` | ⚠️ | Redis 连接字符串（可选）|

---

## 🧪 验证配置

配置完成后，重启开发服务器：

```bash
pnpm dev
```

如果配置正确，应用应该能正常启动并连接到 OpenRouter。

---

## 📚 参考

- [OpenRouter API Keys](https://openrouter.ai/keys)
- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel 环境变量文档](https://vercel.com/docs/projects/environment-variables)

