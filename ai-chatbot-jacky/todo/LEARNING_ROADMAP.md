# AI Chatbot 渐进式学习路线图

## 📚 学习目标
通过渐进式的方式，从零开始构建一个完整的 Next.js AI 聊天机器人项目。

---

## 🎯 阶段划分

### 阶段 0：项目初始化（第 1 天）
**目标**：搭建基础项目结构

#### 任务清单
- [ ] 创建 Next.js 项目
  ```bash
  npx create-next-app@latest ai-chatbot-jacky --typescript --tailwind --app
  ```
- [ ] 配置基础依赖（package.json）
- [ ] 设置 TypeScript 配置
- [ ] 配置 Tailwind CSS
- [ ] 创建基础目录结构
- [ ] 运行 `pnpm dev` 确保项目可以启动

#### 学习要点
- Next.js 15 App Router 基础
- TypeScript 基础配置
- Tailwind CSS 配置

---

### 阶段 1：基础 UI 搭建（第 2-3 天）
**目标**：创建基础的聊天界面布局

#### 任务清单
- [ ] 安装 shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [ ] 创建基础布局组件
  - `app/layout.tsx` - 根布局
  - `app/globals.css` - 全局样式
- [ ] 创建聊天页面
  - `app/page.tsx` - 首页
  - `components/chat.tsx` - 聊天组件（简化版）
- [ ] 创建基础 UI 组件
  - `components/ui/button.tsx`
  - `components/ui/input.tsx`
  - `components/ui/textarea.tsx`
  - `components/ui/card.tsx`

#### 学习要点
- shadcn/ui 组件库使用
- React Server Components vs Client Components
- Tailwind CSS 布局技巧

#### 预期成果
一个静态的聊天界面，包含输入框和消息显示区域

---

### 阶段 2：消息显示功能（第 4-5 天）
**目标**：实现消息的显示和管理

#### 任务清单
- [ ] 创建消息类型定义
  - `lib/types.ts` - 定义消息类型
- [ ] 创建消息组件
  - `components/message.tsx` - 单条消息组件
  - `components/messages.tsx` - 消息列表组件
- [ ] 实现消息状态管理（使用 React useState）
- [ ] 添加消息样式（用户消息 vs AI 消息）
- [ ] 实现消息滚动到底部功能

#### 学习要点
- React Hooks（useState, useEffect）
- TypeScript 类型定义
- 组件拆分和组合

#### 预期成果
可以手动添加消息并显示在界面上，区分用户和 AI 消息样式

---

### 阶段 3：AI SDK 集成（第 6-7 天）
**目标**：集成 AI SDK，实现基础的 AI 对话功能

#### 任务清单
- [ ] 安装 AI SDK
  ```bash
  pnpm add ai @ai-sdk/react
  ```
- [ ] 配置 AI Provider（先使用 OpenAI 或 xAI）
- [ ] 创建 API 路由
  - `app/api/chat/route.ts` - 聊天 API 端点
- [ ] 集成 useChat Hook
  - 在 `components/chat.tsx` 中使用 `useChat`
- [ ] 实现消息发送功能
- [ ] 实现流式响应显示

#### 学习要点
- Next.js API Routes
- AI SDK 的 useChat Hook
- Server Actions vs API Routes
- 流式数据处理

#### 预期成果
可以发送消息给 AI，并实时显示 AI 的回复（流式输出）

---

### 阶段 4：输入组件优化（第 8 天）
**目标**：完善输入体验

#### 任务清单
- [ ] 创建多模态输入组件
  - `components/multimodal-input.tsx`
- [ ] 实现输入框功能
  - 支持多行输入
  - Enter 发送，Shift+Enter 换行
  - 禁用状态处理
- [ ] 添加发送按钮
- [ ] 实现加载状态显示

#### 学习要点
- 表单处理
- 键盘事件处理
- 用户体验优化

---

### 阶段 5：聊天历史管理（第 9-10 天）
**目标**：实现聊天会话的创建和管理

#### 任务清单
- [ ] 安装数据库相关依赖
  ```bash
  pnpm add drizzle-orm postgres
  pnpm add -D drizzle-kit
  ```
- [ ] 配置数据库连接
  - `lib/db/schema.ts` - 数据库 schema
  - `lib/db/queries.ts` - 数据库查询函数
- [ ] 创建数据库迁移
- [ ] 实现聊天会话创建
- [ ] 实现消息持久化
- [ ] 创建聊天列表页面
  - `app/chat/[id]/page.tsx` - 单个聊天页面

#### 学习要点
- Drizzle ORM 使用
- PostgreSQL 数据库操作
- Next.js 动态路由
- 数据持久化

#### 预期成果
可以创建多个聊天会话，消息会保存到数据库

---

### 阶段 6：侧边栏和历史记录（第 11-12 天）
**目标**：添加侧边栏显示聊天历史

#### 任务清单
- [ ] 安装侧边栏组件
  ```bash
  npx shadcn@latest add sidebar
  ```
- [ ] 创建侧边栏组件
  - `components/app-sidebar.tsx`
  - `components/sidebar-history.tsx`
  - `components/sidebar-history-item.tsx`
- [ ] 实现聊天历史列表
- [ ] 实现聊天切换功能
- [ ] 添加新建聊天按钮

#### 学习要点
- 组件状态管理
- 路由导航
- 列表渲染优化

---

### 阶段 7：用户认证（第 13-14 天）
**目标**：添加用户登录和注册功能

#### 任务清单
- [ ] 安装 NextAuth.js
  ```bash
  pnpm add next-auth@beta
  ```
- [ ] 配置认证
  - `app/(auth)/auth.ts` - 认证配置
  - `app/(auth)/auth.config.ts` - 认证配置
- [ ] 创建登录页面
  - `app/(auth)/login/page.tsx`
- [ ] 创建注册页面
  - `app/(auth)/register/page.tsx`
- [ ] 创建认证表单组件
  - `components/auth-form.tsx`
- [ ] 实现用户会话管理
- [ ] 添加中间件保护路由

#### 学习要点
- NextAuth.js 配置
- 密码加密（bcrypt）
- 会话管理
- 中间件使用

---

### 阶段 8：模型选择器（第 15 天）
**目标**：允许用户选择不同的 AI 模型

#### 任务清单
- [ ] 创建模型配置
  - `lib/ai/models.ts` - 模型配置
- [ ] 创建模型选择器组件
  - `components/model-selector.tsx`
- [ ] 实现模型切换功能
- [ ] 保存用户选择的模型（Cookie）

#### 学习要点
- Cookie 操作
- 状态持久化

---

### 阶段 9：消息操作功能（第 16-17 天）
**目标**：添加消息的编辑、删除、重新生成等功能

#### 任务清单
- [ ] 创建消息操作组件
  - `components/message-actions.tsx`
- [ ] 实现消息编辑功能
- [ ] 实现消息删除功能
- [ ] 实现重新生成功能
- [ ] 添加点赞/点踩功能
  - `app/api/vote/route.ts`

#### 学习要点
- 数据更新操作
- 乐观更新（Optimistic Updates）

---

### 阶段 10：文件上传（第 18-19 天）
**目标**：支持上传文件并在聊天中使用

#### 任务清单
- [ ] 安装文件存储相关依赖
  ```bash
  pnpm add @vercel/blob
  ```
- [ ] 创建文件上传 API
  - `app/api/files/upload/route.ts`
- [ ] 实现文件上传组件
  - `components/multimodal-input.tsx` - 添加文件上传功能
- [ ] 实现文件预览
  - `components/preview-attachment.tsx`
- [ ] 在消息中显示附件

#### 学习要点
- 文件上传处理
- Vercel Blob 使用
- 文件类型验证

---

### 阶段 11：高级功能（第 20-21 天）
**目标**：添加高级特性

#### 任务清单
- [ ] 实现代码高亮显示
  - `components/elements/code-block.tsx`
- [ ] 实现 Markdown 渲染
- [ ] 添加主题切换功能
  - `components/theme-provider.tsx`
- [ ] 实现响应式设计优化

#### 学习要点
- 代码高亮库使用
- Markdown 渲染
- 主题系统
- 响应式设计

---

### 阶段 12：优化和部署（第 22-23 天）
**目标**：性能优化和部署准备

#### 任务清单
- [ ] 添加错误处理
- [ ] 添加加载状态
- [ ] 性能优化
  - 代码分割
  - 图片优化
- [ ] 添加环境变量配置
- [ ] 准备部署配置
- [ ] 部署到 Vercel

#### 学习要点
- 错误边界
- 性能优化技巧
- 部署流程

---

## 📝 学习建议

### 1. 每个阶段的学习方法
- **先理解**：阅读原项目对应功能的代码
- **再实现**：自己尝试实现（不要直接复制）
- **对比学习**：实现后对比原项目，学习最佳实践
- **记录笔记**：记录遇到的问题和解决方案

### 2. 遇到问题时的处理
- 先查看 Next.js 官方文档
- 查看 AI SDK 文档
- 查看相关库的文档
- 使用 ChatGPT/Claude 提问
- 查看原项目的实现方式

### 3. 代码组织建议
- 每个阶段完成后提交一次 Git
- 保持代码整洁，添加注释
- 使用有意义的变量和函数名

### 4. 学习资源
- [Next.js 官方文档](https://nextjs.org/docs)
- [AI SDK 文档](https://sdk.vercel.ai/docs)
- [shadcn/ui 文档](https://ui.shadcn.com)
- [Drizzle ORM 文档](https://orm.drizzle.team)

---

## 🎓 学习检查点

完成每个阶段后，确保：
- ✅ 功能可以正常运行
- ✅ 代码没有明显错误
- ✅ 理解了实现原理
- ✅ 可以解释给他人听

---

## 🚀 开始学习

准备好后，从阶段 0 开始，一步一步构建你的 AI 聊天机器人！

记住：**慢就是快，理解比完成更重要！**

