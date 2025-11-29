# 修复数据库连接错误

## ❌ 当前错误

```
Error: getaddrinfo ENOTFOUND db.zjnlmhfhxgfsactubkdj.supabase.co
```

**问题**：无法连接到 Supabase 数据库服务器。

---

## 🔍 可能的原因

1. **数据库项目已删除或暂停**
   - Supabase 项目可能已被删除
   - 项目可能已暂停（免费项目有暂停机制）

2. **网络连接问题**
   - DNS 解析失败
   - 防火墙阻止连接

3. **连接字符串不正确**
   - 主机地址错误
   - 项目 ID 错误

---

## ✅ 解决方案

### 方案 1：检查并修复 Supabase 数据库

#### 步骤 1：访问 Supabase 控制台

1. 访问 https://supabase.com/
2. 登录你的账号
3. 检查项目列表

#### 步骤 2：检查项目状态

- ✅ **项目存在且运行中** → 获取新的连接字符串
- ❌ **项目不存在** → 创建新项目
- ⚠️ **项目已暂停** → 恢复项目或创建新项目

#### 步骤 3：获取正确的连接字符串

1. 进入项目 Dashboard
2. 点击左侧 "Settings" → "Database"
3. 找到 "Connection String" 部分
4. 选择 "URI" 格式
5. 复制连接字符串

格式应该是：
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

#### 步骤 4：更新 `.env.local`

```env
POSTGRES_URL=postgresql://postgres:你的密码@db.项目ID.supabase.co:5432/postgres
```

---

### 方案 2：创建新的 Supabase 项目（推荐）

如果原项目无法恢复，创建新项目：

#### 步骤 1：创建新项目

1. 访问 https://supabase.com/
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: chatbot-db（或任意名称）
   - **Database Password**: 设置一个强密码（**记住这个密码！**）
   - **Region**: 选择离你最近的区域
4. 点击 "Create new project"
5. 等待项目创建完成（约 2 分钟）

#### 步骤 2：获取连接字符串

1. 项目创建完成后，点击左侧 "Settings" → "Database"
2. 找到 "Connection String" 部分
3. 选择 "URI" 格式
4. 点击 "Copy" 复制连接字符串

#### 步骤 3：更新 `.env.local`

```env
POSTGRES_URL=postgresql://postgres:你的新密码@db.新项目ID.supabase.co:5432/postgres
```

---

### 方案 3：使用 Neon（推荐，免费额度）

Neon 是另一个很好的 PostgreSQL 服务，有免费额度：

#### 步骤 1：创建 Neon 项目

1. 访问 https://neon.tech/
2. 点击 "Sign Up" 注册账号（可以用 GitHub 登录）
3. 点击 "Create Project"
4. 填写项目信息：
   - **Name**: chatbot-db
   - **Region**: 选择离你最近的区域
5. 点击 "Create Project"

#### 步骤 2：获取连接字符串

1. 项目创建完成后，在 Dashboard 中找到 "Connection String"
2. 点击 "Copy" 复制连接字符串

格式：
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

#### 步骤 3：更新 `.env.local`

```env
POSTGRES_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

---

### 方案 4：使用本地 PostgreSQL（开发环境）

如果只是本地开发，可以使用本地数据库：

#### 步骤 1：安装 PostgreSQL

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Linux
sudo apt install postgresql
sudo systemctl start postgresql
```

#### 步骤 2：创建数据库

```bash
# 创建数据库
createdb chatbot_db

# 或使用 psql
psql postgres
CREATE DATABASE chatbot_db;
\q
```

#### 步骤 3：更新 `.env.local`

```env
POSTGRES_URL=postgresql://localhost:5432/chatbot_db
```

或如果有密码：

```env
POSTGRES_URL=postgresql://postgres:password@localhost:5432/chatbot_db
```

---

## 🔧 验证配置

### 步骤 1：测试数据库连接

```bash
pnpm db:migrate
```

**如果成功**：
```
⏳ Running migrations...
✅ Migrations completed in 1234 ms
```

**如果失败**：
- 检查错误信息
- 确认连接字符串格式正确
- 确认数据库服务可访问

### 步骤 2：打开数据库管理界面

```bash
pnpm db:studio
```

如果连接成功，会打开浏览器显示数据库管理界面。

### 步骤 3：启动应用

```bash
pnpm dev
```

如果数据库连接正常，应用应该可以正常启动。

---

## 📋 连接字符串格式检查

### ✅ 正确的格式

```env
# Supabase
POSTGRES_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# Neon
POSTGRES_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# 本地
POSTGRES_URL=postgresql://localhost:5432/chatbot_db
```

### ❌ 错误的格式

```env
# ❌ 缺少协议
POSTGRES_URL=db.xxx.supabase.co:5432/postgres

# ❌ 缺少密码
POSTGRES_URL=postgresql://postgres@db.xxx.supabase.co:5432/postgres

# ❌ 格式错误
POSTGRES_URL=****
```

---

## 🎯 推荐方案

### 开发环境

**推荐：Neon**
- ✅ 免费额度充足
- ✅ 设置简单
- ✅ 性能好
- ✅ 不需要信用卡

### 生产环境

**推荐：Supabase 或 Neon**
- ✅ 稳定可靠
- ✅ 有免费额度
- ✅ 易于管理

---

## 💡 常见问题

### Q1: 为什么会出现 ENOTFOUND 错误？
**A**: DNS 无法解析数据库主机名，可能是：
- 数据库项目已删除
- 数据库项目已暂停
- 网络连接问题

### Q2: Supabase 项目暂停了怎么办？
**A**: 
- 访问 Supabase 控制台
- 恢复项目或创建新项目
- 获取新的连接字符串

### Q3: 如何知道数据库连接字符串是否正确？
**A**: 
- 运行 `pnpm db:migrate` 测试
- 如果成功，说明连接字符串正确
- 如果失败，检查错误信息

### Q4: 可以同时使用多个数据库吗？
**A**: 可以，但需要分别配置不同的 `POSTGRES_URL`。

---

## ✨ 快速修复步骤总结

1. **选择数据库服务**
   - Supabase（如果项目存在）
   - Neon（推荐，免费）
   - 本地 PostgreSQL（开发用）

2. **获取连接字符串**
   - 从数据库服务控制台复制
   - 确保格式正确

3. **更新 `.env.local`**
   ```env
   POSTGRES_URL=postgresql://...
   ```

4. **运行数据库迁移**
   ```bash
   pnpm db:migrate
   ```

5. **验证配置**
   ```bash
   pnpm db:studio
   pnpm dev
   ```

---

**记住**：数据库连接是应用的基础，必须先解决数据库连接问题！🎯


