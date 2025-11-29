# 数据库连接错误解决方案

## ❌ 错误信息

```
Error: An error occurred while executing a database query.
Failed to create guest user
```

以及：

```
Error: getaddrinfo ENOTFOUND db.zjnlmhfhxgfsactubkdj.supabase.co
```

---

## 🔍 问题分析

### 错误原因

1. **数据库连接失败**
   - 无法连接到数据库服务器
   - 可能是网络问题或连接字符串错误

2. **数据库表未创建**
   - 数据库迁移未成功运行
   - 数据库表不存在，无法插入数据

3. **创建 Guest 用户失败**
   - 因为数据库连接失败，无法创建用户
   - 导致应用无法启动

---

## ✅ 解决方案

### 步骤 1：检查数据库连接字符串

检查 `.env.local` 文件中的 `POSTGRES_URL`：

```bash
# 查看当前的配置
grep "^POSTGRES_URL=" .env.local
```

确保格式正确：

```env
POSTGRES_URL=postgresql://用户名:密码@主机:端口/数据库名
```

### 步骤 2：测试数据库连接

#### 方法 1：使用 Drizzle Studio

```bash
pnpm db:studio
```

如果连接成功：
- ✅ 会打开浏览器，显示数据库管理界面

如果连接失败：
- ❌ 会显示连接错误
- 检查 `POSTGRES_URL` 是否正确

#### 方法 2：运行数据库迁移

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
- 确认数据库连接字符串正确
- 确认数据库服务器可访问

### 步骤 3：检查网络连接

如果使用 Supabase 或其他云数据库：

1. **检查数据库是否可访问**
   - 确认数据库服务是否正常运行
   - 检查防火墙设置

2. **检查连接字符串**
   - 确认主机地址正确
   - 确认端口正确（通常是 5432）
   - 确认用户名和密码正确

### 步骤 4：重新配置数据库

如果数据库连接有问题，可以：

#### 选项 1：使用 Supabase（推荐）

1. 访问 https://supabase.com/
2. 创建新项目
3. 在项目设置中找到 "Database" → "Connection String"
4. 复制连接字符串
5. 更新 `.env.local`：

```env
POSTGRES_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

#### 选项 2：使用 Neon（推荐）

1. 访问 https://neon.tech/
2. 创建新项目
3. 复制连接字符串
4. 更新 `.env.local`

#### 选项 3：使用本地 PostgreSQL

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# 创建数据库
createdb chatbot_db

# 配置连接字符串
POSTGRES_URL=postgresql://localhost:5432/chatbot_db
```

---

## 🔧 常见错误和解决方法

### 错误 1：ENOTFOUND（域名解析失败）

```
Error: getaddrinfo ENOTFOUND db.xxx.supabase.co
```

**解决方法**：
- 检查数据库连接字符串中的主机地址是否正确
- 确认网络连接正常
- 尝试 ping 数据库主机地址

### 错误 2：连接被拒绝

```
Error: connect ECONNREFUSED
```

**解决方法**：
- 检查数据库服务是否运行
- 检查端口是否正确
- 检查防火墙设置

### 错误 3：认证失败

```
Error: password authentication failed
```

**解决方法**：
- 检查用户名和密码是否正确
- 确认数据库用户有访问权限

### 错误 4：数据库不存在

```
Error: database "xxx" does not exist
```

**解决方法**：
- 检查数据库名称是否正确
- 确认数据库已创建

---

## 📋 完整解决步骤

### 1. 检查当前配置

```bash
# 查看 POSTGRES_URL
grep "^POSTGRES_URL=" .env.local
```

### 2. 测试数据库连接

```bash
# 尝试运行迁移
pnpm db:migrate
```

### 3. 如果连接失败

#### 选项 A：修复现有数据库连接

1. 检查数据库服务是否运行
2. 验证连接字符串是否正确
3. 测试网络连接

#### 选项 B：创建新的数据库

1. 选择数据库服务（Supabase、Neon、Vercel Postgres）
2. 创建数据库
3. 获取连接字符串
4. 更新 `.env.local`

### 4. 运行数据库迁移

```bash
pnpm db:migrate
```

### 5. 验证配置

```bash
# 打开数据库管理界面
pnpm db:studio

# 或启动应用
pnpm dev
```

---

## 🎯 快速检查清单

解决数据库连接问题后，确保：

- [ ] `POSTGRES_URL` 格式正确
- [ ] 数据库服务可访问
- [ ] 用户名和密码正确
- [ ] 数据库已创建
- [ ] 可以运行 `pnpm db:migrate` 成功
- [ ] 可以打开 `pnpm db:studio` 查看数据
- [ ] 应用可以正常启动

---

## 💡 预防措施

### 1. 使用环境变量验证

在代码中添加验证：

```typescript
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined");
}
```

### 2. 使用连接池

配置连接池参数：

```typescript
const client = postgres(process.env.POSTGRES_URL!, {
  max: 10, // 最大连接数
  idle_timeout: 20, // 空闲超时
});
```

### 3. 添加错误处理

```typescript
try {
  await db.insert(user).values({ email, password });
} catch (error) {
  console.error("Database error:", error);
  throw new Error("Failed to create user");
}
```

---

## 📚 参考资源

- [PostgreSQL 连接字符串格式](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Supabase 数据库连接](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Neon 连接指南](https://neon.tech/docs/connect/connect-from-any-app)
- [Drizzle ORM 文档](https://orm.drizzle.team/docs/overview)

---

## ✨ 总结

### 问题根源
**数据库连接失败**，导致无法创建用户和运行应用。

### 解决步骤
1. 检查 `POSTGRES_URL` 配置
2. 测试数据库连接
3. 运行数据库迁移
4. 验证应用启动

### 关键提示
- ✅ 确保数据库连接字符串格式正确
- ✅ 确保数据库服务可访问
- ✅ 确保已运行数据库迁移
- ✅ 使用 `pnpm db:studio` 验证连接

---

**记住**：数据库连接是应用的基础，必须先解决数据库连接问题，才能正常运行应用！🎯


