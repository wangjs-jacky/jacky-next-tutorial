# AI Chatbot 学习项目

> 通过渐进式学习的方式，从零开始构建一个完整的 Next.js AI 聊天机器人项目

## 📚 项目简介

这是一个学习项目，目标是通过**渐进式**的方式，一步一步地复刻 `ai-chatbot` 项目。我们不会直接复制代码，而是通过理解、实践、对比的方式来学习。

## 🎯 学习目标

- 掌握 Next.js 15 App Router
- 理解 AI SDK 的使用
- 学习现代 React 开发模式
- 掌握数据库操作（Drizzle ORM）
- 理解用户认证流程
- 学习 UI 组件库的使用（shadcn/ui）

## 📖 学习文档

### 1. [学习路线图](./LEARNING_ROADMAP.md) ⭐ **从这里开始**
   完整的 12 个阶段学习计划，每个阶段都有明确的目标和任务清单。

### 2. [阶段 0 详细指南](./STAGE_0_GUIDE.md)
   项目初始化的详细步骤，帮助你搭建基础框架。

### 3. [原项目文件参考索引](./REFERENCE_FILES.md)
   每个阶段应该参考的原项目文件列表，帮助你找到学习重点。

## 🚀 快速开始

### 第一步：阅读学习路线图

```bash
# 打开学习路线图
open LEARNING_ROADMAP.md
# 或者
cat LEARNING_ROADMAP.md
```

### 第二步：开始阶段 0

按照 [阶段 0 详细指南](./STAGE_0_GUIDE.md) 的步骤，搭建项目基础。

### 第三步：逐步学习

按照路线图的顺序，一个阶段一个阶段地完成。每个阶段完成后：
- ✅ 确保功能正常运行
- ✅ 理解实现原理
- ✅ 提交代码到 Git
- ✅ 再进入下一个阶段

## 📁 项目结构

```
ai-chatbot-jacky/
├── README.md                 # 本文件
├── LEARNING_ROADMAP.md      # 学习路线图（重要！）
├── STAGE_0_GUIDE.md         # 阶段 0 详细指南
├── REFERENCE_FILES.md       # 原项目文件参考索引
├── app/                      # Next.js App Router 目录
├── components/               # React 组件
├── lib/                      # 工具函数和配置
└── public/                   # 静态资源
```

## 🎓 学习原则

### ✅ 应该做的
- **先理解再实现**：阅读原项目代码，理解设计思路
- **自己动手敲**：不要直接复制，自己实现一遍
- **记录学习笔记**：记录遇到的问题和解决方案
- **逐步完善**：先实现基础功能，再优化和添加特性
- **对比学习**：实现后对比原项目，学习最佳实践

### ❌ 不应该做的
- **不要直接复制代码**：理解后自己实现
- **不要跳过基础**：每个阶段都很重要
- **不要急于求成**：慢就是快，理解比完成更重要
- **不要忽略错误**：遇到问题要解决，不要绕过

## 🛠️ 技术栈

- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件**：shadcn/ui
- **AI SDK**：Vercel AI SDK
- **数据库**：PostgreSQL + Drizzle ORM
- **认证**：NextAuth.js
- **包管理**：pnpm

## 📝 学习进度跟踪

建议使用以下方式跟踪学习进度：

### 方式 1：Git 提交记录
每个阶段完成后提交一次，提交信息格式：
```
feat: 完成阶段 X - [阶段名称]

- [ ] 任务 1
- [ ] 任务 2
- [ ] 任务 3
```

### 方式 2：创建进度文件
创建 `PROGRESS.md` 文件，记录每个阶段的完成情况：

```markdown
# 学习进度

- [x] 阶段 0：项目初始化
- [x] 阶段 1：基础 UI 搭建
- [ ] 阶段 2：消息显示功能
- [ ] 阶段 3：AI SDK 集成
...
```

## 🐛 遇到问题？

### 1. 查看文档
- Next.js 官方文档：https://nextjs.org/docs
- AI SDK 文档：https://sdk.vercel.ai/docs
- shadcn/ui 文档：https://ui.shadcn.com

### 2. 参考原项目
查看 [REFERENCE_FILES.md](./REFERENCE_FILES.md)，找到对应阶段的参考文件。

### 3. 搜索解决方案
- 查看原项目的实现方式
- 搜索相关错误信息
- 使用 AI 工具提问

## 🎉 完成后的收获

完成所有阶段后，你将：
- ✅ 掌握 Next.js 15 的核心特性
- ✅ 理解现代 React 开发模式
- ✅ 能够独立开发 AI 应用
- ✅ 掌握全栈开发技能
- ✅ 拥有一个完整的项目作品

## 📚 推荐学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [AI SDK 文档](https://sdk.vercel.ai/docs)
- [React 官方文档](https://react.dev)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 💡 学习建议

1. **每天学习一点**：不要一次性学太多，每天完成一个小任务
2. **保持代码整洁**：写好注释，使用有意义的变量名
3. **理解原理**：不仅要会使用，还要理解为什么这样设计
4. **多实践**：理论结合实践，多动手敲代码
5. **记录笔记**：记录学习过程中的收获和问题

## 🤝 学习交流

在学习过程中，如果遇到问题：
1. 先尝试自己解决
2. 查看相关文档
3. 参考原项目实现
4. 使用 AI 工具提问
5. 记录问题和解决方案

---

## 🎯 现在开始

1. 打开 [LEARNING_ROADMAP.md](./LEARNING_ROADMAP.md)
2. 阅读阶段 0 的内容
3. 按照 [STAGE_0_GUIDE.md](./STAGE_0_GUIDE.md) 开始搭建项目
4. 开始你的学习之旅！

**记住：慢就是快，理解比完成更重要！** 🚀

