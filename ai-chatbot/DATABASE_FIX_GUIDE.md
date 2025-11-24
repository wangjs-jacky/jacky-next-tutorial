# 数据库连接问题修复指南

## 🔍 问题诊断

**错误信息**：
```
Error: getaddrinfo ENOTFOUND db.zjnlmhfhxgfsactubkdj.supabase.co
```

**问题原因**：
- DNS 无法解析数据库主机名
- Supabase 数据库可能已被删除、暂停或 URL 已过期

---

## ✅ 解决方案

### 方案 1：检查并恢复 Supabase 数据库

1. **访问 Supabase 控制台**
   - 打开 https://supabase.com/
   - 登录你的账号

2. **检查项目状态**
   - 查看项目列表
   - 确认项目 `zjnlmhfhxgfsactubkdj` 是否存在
   - 如果项目被暂停，点击 "Resume" 恢复

3. **获取新的连接字符串**
   - 进入项目 → Settings → Database
   - 找到 "Connection String" 或 "Connection Pooling"
   - 复制新的 `POSTGRES_URL`

4. **更新 `.env.local`**
   ```env
   POSTGRES_URL=postgresql://postgres:新密码@db.xxx.supabase.co:5432/postgres
   ```

---

### 方案 2：创建新的 Supabase 数据库（推荐）

#### 步骤 1：创建新项目

1. 访问 https://supabase.com/
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: `ai-chatbot`（或任意名称）
   - **Database Password**: 设置一个强密码（**重要：保存好这个密码**）
   - **Region**: 选择离你最近的区域
4. 点击 "Create new project"
5. 等待项目创建完成（约 2-3 分钟）

#### 步骤 2：获取连接字符串

1. 在项目页面，点击左侧菜单的 **Settings** → **Database**
2. 找到 **Connection string** 部分
3. 选择 **URI** 格式
4. 复制连接字符串，格式类似：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

#### 步骤 3：更新环境变量

编辑 `.env.local` 文件：

```bash
# 在项目根目录
cd /Users/jiashengwang/jacky-github/jacky-next-tutorial/ai-chatbot
```

更新 `POSTGRES_URL`：

```env
POSTGRES_URL=postgresql://postgres:你的密码@db.新项目ID.supabase.co:5432/postgres
```

**注意**：
- 将 `[YOUR-PASSWORD]` 替换为你创建项目时设置的密码
- 确保整个 URL 在一行，没有换行

#### 步骤 4：运行数据库迁移

```bash
pnpm db:migrate
```

如果成功，你会看到：
```
⏳ Running migrations...
✅ Migrations completed in 1234 ms
```

---

### 方案 3：使用 Neon（Serverless Postgres，推荐用于开发）

#### 步骤 1：创建 Neon 账户

1. 访问 https://neon.tech/
2. 点击 "Sign Up" 注册（可以使用 GitHub 账号）
3. 登录后点击 "Create Project"

#### 步骤 2：创建数据库

1. 填写项目信息：
   - **Project name**: `ai-chatbot`
   - **Region**: 选择离你最近的区域
2. 点击 "Create Project"
3. 等待创建完成

#### 步骤 3：获取连接字符串

1. 在项目页面，找到 **Connection Details**
2. 点击 "Connection string" 旁边的复制按钮
3. 连接字符串格式：
   ```
   postgresql://用户名:密码@ep-xxx-xxx.region.aws.neon.tech/数据库名?sslmode=require
   ```

#### 步骤 4：更新环境变量

编辑 `.env.local`：

```env
POSTGRES_URL=postgresql://用户名:密码@ep-xxx-xxx.region.aws.neon.tech/数据库名?sslmode=require
```

#### 步骤 5：运行数据库迁移

```bash
pnpm db:migrate
```

---

### 方案 4：使用 Vercel Postgres（如果项目部署在 Vercel）

#### 步骤 1：在 Vercel 中创建数据库

1. 访问 https://vercel.com/
2. 进入你的项目
3. 点击 **Storage** 标签
4. 点击 **Create Database** → 选择 **Postgres**
5. 选择区域和配置
6. 点击 **Create**

#### 步骤 2：获取连接字符串

1. 在数据库页面，找到 **Connection String**
2. 复制 `POSTGRES_URL`

#### 步骤 3：更新环境变量

在 Vercel 项目设置中：
1. 进入 **Settings** → **Environment Variables**
2. 添加 `POSTGRES_URL`
3. 或者在本地 `.env.local` 中添加

#### 步骤 4：运行数据库迁移

```bash
pnpm db:migrate
```

---

## 🧪 验证配置

### 1. 测试数据库连接

```bash
# 运行迁移（会自动测试连接）
pnpm db:migrate
```

### 2. 使用 Drizzle Studio 查看数据库

```bash
pnpm db:studio
```

如果连接成功，会在浏览器中打开数据库管理界面。

### 3. 启动应用

```bash
pnpm dev
```

---

## 🔧 常见问题

### Q1: 迁移失败，提示 "database does not exist"

**解决方法**：
- 确保数据库已创建
- 检查连接字符串中的数据库名称是否正确
- Supabase/Neon 通常使用 `postgres` 作为默认数据库名

### Q2: 迁移失败，提示 "password authentication failed"

**解决方法**：
- 检查密码是否正确
- 确保密码中没有特殊字符需要 URL 编码
- 如果密码包含特殊字符，需要进行 URL 编码：
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
  - `&` → `%26`
  - `+` → `%2B`
  - `=` → `%3D`

### Q3: 如何 URL 编码密码？

使用在线工具或命令行：

```bash
# macOS/Linux
python3 -c "import urllib.parse; print(urllib.parse.quote('你的密码'))"
```

### Q4: 迁移成功后，应用仍然无法连接数据库

**解决方法**：
1. 确保 `.env.local` 文件在项目根目录
2. 重启开发服务器：`pnpm dev`
3. 检查环境变量是否正确加载：
   ```bash
   # 在代码中添加调试
   console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? '已设置' : '未设置');
   ```

---

## 📋 快速检查清单

配置完成后，确保：

- [ ] 已创建数据库（Supabase/Neon/Vercel Postgres）
- [ ] 已获取正确的 `POSTGRES_URL`
- [ ] 已在 `.env.local` 中配置 `POSTGRES_URL`
- [ ] 密码已正确 URL 编码（如果包含特殊字符）
- [ ] 已运行 `pnpm db:migrate` 且成功
- [ ] 可以使用 `pnpm db:studio` 查看数据库
- [ ] 应用可以正常启动

---

## 🎯 推荐方案

### 开发环境
- **推荐**：Neon（免费额度，Serverless，易于使用）
- **备选**：Supabase（免费额度，功能丰富）

### 生产环境
- **推荐**：Vercel Postgres（如果项目部署在 Vercel）
- **备选**：Supabase（稳定可靠）

---

## 📚 相关文档

- [Supabase 数据库连接](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Neon 连接指南](https://neon.tech/docs/connect/connect-from-any-app)
- [Vercel Postgres 文档](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle ORM 文档](https://orm.drizzle.team/docs/overview)

---

**记住**：数据库连接是应用的基础，必须先解决数据库连接问题，才能正常运行应用！🎯

