# 阶段 0：项目初始化 - 详细指南

## 🎯 目标
搭建一个可以运行的 Next.js 项目基础框架

---

## 📋 步骤详解

### 步骤 1：创建 Next.js 项目

在终端中执行：

```bash
cd /Users/jiashengwang/jacky-github/jacky-next-tutorial/ai-chatbot-jacky
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir
```

**参数说明**：
- `.` - 在当前目录创建项目
- `--typescript` - 使用 TypeScript
- `--tailwind` - 使用 Tailwind CSS
- `--app` - 使用 App Router
- `--eslint` - 启用 ESLint
- `--no-src-dir` - 不使用 src 目录（文件直接在根目录）

**选择提示时**：
- 是否使用 `src/` 目录？ → **No**
- 是否使用 App Router？ → **Yes**（已通过参数设置）
- 是否自定义默认导入别名？ → **No**（使用默认）

---

### 步骤 2：安装基础依赖

查看原项目的 `package.json`，安装必要的依赖：

```bash
# 基础依赖
pnpm add react@latest react-dom@latest
pnpm add next@latest

# 类型定义
pnpm add -D @types/node @types/react @types/react-dom typescript

# 工具库
pnpm add clsx tailwind-merge
pnpm add -D tailwindcss postcss autoprefixer
```

---

### 步骤 3：配置 TypeScript

创建或更新 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### 步骤 4：配置 Tailwind CSS

确保 `tailwind.config.ts` 存在并配置正确：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

确保 `postcss.config.mjs` 存在：

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### 步骤 5：创建基础目录结构

创建以下目录（如果不存在）：

```bash
mkdir -p app
mkdir -p components
mkdir -p components/ui
mkdir -p lib
mkdir -p public
```

---

### 步骤 6：创建基础文件

#### 6.1 创建 `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chatbot - Jacky",
  description: "学习构建 AI 聊天机器人",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

#### 6.2 创建 `app/page.tsx`

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">AI Chatbot</h1>
      <p className="mt-4 text-lg text-gray-600">
        欢迎来到 AI 聊天机器人学习项目！
      </p>
    </main>
  );
}
```

#### 6.3 确保 `app/globals.css` 存在

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 步骤 7：创建工具函数

创建 `lib/utils.ts`：

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### 步骤 8：测试项目

1. **启动开发服务器**：
   ```bash
   pnpm dev
   ```

2. **打开浏览器**：
   访问 http://localhost:3000

3. **检查是否正常**：
   - 页面应该显示 "AI Chatbot" 标题
   - 没有控制台错误
   - 样式正常显示

---

## ✅ 完成检查清单

完成阶段 0 后，确保：

- [ ] 项目可以成功启动（`pnpm dev`）
- [ ] 浏览器可以访问 http://localhost:3000
- [ ] 页面显示正常，没有错误
- [ ] TypeScript 编译没有错误
- [ ] Tailwind CSS 样式正常工作
- [ ] 目录结构清晰

---

## 🐛 常见问题

### 问题 1：端口被占用
**解决**：修改 `package.json` 中的 dev 脚本
```json
"dev": "next dev -p 3001"
```

### 问题 2：TypeScript 错误
**解决**：确保安装了正确的类型定义
```bash
pnpm add -D @types/node @types/react @types/react-dom
```

### 问题 3：Tailwind 样式不生效
**解决**：检查 `tailwind.config.ts` 中的 `content` 路径是否正确

---

## 📚 学习资源

- [Next.js 快速开始](https://nextjs.org/docs/getting-started)
- [TypeScript 基础](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

## 🎉 下一步

完成阶段 0 后，可以开始**阶段 1：基础 UI 搭建**！

记住：**不要急于求成，确保每一步都理解透彻！**

