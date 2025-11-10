# Next.js generateMetadata 使用指南

## 概述

`generateMetadata` 是 Next.js 框架提供的一个特殊函数，用于动态生成网页的元数据（Metadata）。元数据是网页的"身份证信息"，包括标题、描述等，主要用于：

- **SEO（搜索引擎优化）**：帮助搜索引擎理解页面内容
- **社交媒体分享**：当页面被分享到微信、微博等平台时，显示正确的标题和描述
- **浏览器标签页**：显示在浏览器标签页上的标题

简单来说，`generateMetadata` 就像是一个"自动写标签"的工具，可以根据不同的页面内容，自动生成对应的标题和描述。

## 工具对比

在 Next.js 中，有两种方式可以设置元数据：

### 1. 静态元数据（metadata 对象）
- **优点**：简单直接，适合固定不变的内容
- **缺点**：无法根据动态数据生成
- **适用场景**：首页、关于页面等固定内容页面

### 2. 动态元数据（generateMetadata 函数）
- **优点**：可以根据路由参数、API 数据等动态生成
- **缺点**：需要编写函数，稍微复杂一些
- **适用场景**：产品详情页、博客文章页等需要根据 ID 动态生成内容的页面

## 前置条件

- 已安装 Next.js（版本 13.0 或以上，推荐 15.0+）
- 使用 App Router（不是 Pages Router）
- 了解基本的 TypeScript/JavaScript 语法
- 了解 Next.js 的路由系统

## 详细步骤

### 步骤 1: 理解 generateMetadata 的基本结构

`generateMetadata` 是一个异步函数，接收路由参数，返回一个元数据对象。

**基本语法：**
```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // 1. 获取路由参数
  const { id } = await params;
  
  // 2. 根据参数获取数据（可以是 API 调用、数据库查询等）
  const data = await fetchData(id);
  
  // 3. 返回元数据对象
  return {
    title: data.title,
    description: data.description,
  };
}
```

**关键点说明：**
- `export async function`：必须是导出的异步函数
- `params`：路由参数，在 Next.js 15+ 中是 Promise，需要使用 `await`
- `Promise<Metadata>`：返回类型必须是 Metadata 类型
- `Metadata`：需要从 `next` 导入类型

### 步骤 2: 在 page.tsx 中使用 generateMetadata

这是最常见的用法，为特定页面生成元数据。

#### 示例：产品详情页

**文件位置：** `app/products/[id]/page.tsx`

```typescript
import type { Metadata } from "next";

// 模拟产品数据（实际项目中可能来自数据库或 API）
const products: Record<string, { name: string; description: string; price: number }> = {
  "1": { name: "产品 A", description: "这是产品 A 的详细描述", price: 99 },
  "2": { name: "产品 B", description: "这是产品 B 的详细描述", price: 199 },
  "3": { name: "产品 C", description: "这是产品 C 的详细描述", price: 299 },
};

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // 获取路由参数
  const { id } = await params;
  
  // 根据 ID 查找产品
  const product = products[id];
  
  // 如果产品不存在，返回默认元数据
  if (!product) {
    return {
      title: "产品未找到",
    };
  }

  // 返回产品的元数据
  return {
    title: product.name,
    description: product.description,
  };
}

// 页面组件
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>¥{product.price}</p>
    </div>
  );
}
```

**预期效果：**
- 访问 `/products/1` 时，浏览器标签页显示"产品 A"
- 页面描述为"这是产品 A 的详细描述"
- 分享到社交媒体时，会显示正确的标题和描述

### 步骤 3: 在 layout.tsx 中使用 generateMetadata

布局文件中的元数据会应用到该布局下的所有页面，适合设置共享的元数据。

#### 示例：根布局

**文件位置：** `app/layout.tsx`

```typescript
import type { Metadata } from "next";

// 方式一：静态元数据（简单场景）
export const metadata: Metadata = {
  title: "我的网站",
  description: "欢迎来到我的网站",
};

// 方式二：动态元数据（需要根据环境或数据生成）
export async function generateMetadata(): Promise<Metadata> {
  // 可以从环境变量、API 等获取数据
  const siteName = process.env.SITE_NAME || "我的网站";
  
  return {
    title: siteName,
    description: "欢迎来到我的网站",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

**注意事项：**
- 布局的元数据会被子页面的元数据覆盖（除非使用 `absolute`）
- 如果布局和页面都设置了 `title`，页面的 `title` 会覆盖布局的

### 步骤 4: 理解元数据的完整结构

`generateMetadata` 可以返回更丰富的元数据，不仅仅是标题和描述。

#### 完整示例

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    // 基础元数据
    title: product.name,
    description: product.description,
    keywords: ["产品", "购物", product.category],
    
    // Open Graph（用于社交媒体分享）
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      url: `https://example.com/products/${id}`,
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
    
    // 其他元数据
    authors: [{ name: "产品团队" }],
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

### 步骤 5: 使用标题模板（Title Template）

在布局中设置标题模板，子页面可以自动继承。

#### 示例：在布局中设置模板

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "我的网站",
    template: "%s | 我的网站", // %s 会被子页面的标题替换
  },
};

// app/products/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products[id];
  
  return {
    title: product.name, // 最终显示为："产品 A | 我的网站"
  };
}
```

## 使用范围总结

| 文件类型 | 是否支持 | 使用场景 | 注意事项 |
|---------|---------|---------|---------|
| `page.tsx` | ✅ 支持 | 为特定页面生成元数据 | 最常用 |
| `layout.tsx` | ✅ 支持 | 为布局及其子页面生成共享元数据 | 子页面会覆盖父布局的元数据 |
| `template.tsx` | ❌ 不支持 | - | 官方不支持，请使用 layout 或 page |

## 验证方法

### 方法 1: 查看浏览器标签页
1. 启动开发服务器：`npm run dev`
2. 访问使用 `generateMetadata` 的页面
3. 查看浏览器标签页，确认标题是否正确显示

### 方法 2: 查看页面源代码
1. 在浏览器中右键点击页面，选择"查看页面源代码"
2. 查找 `<title>` 和 `<meta name="description">` 标签
3. 确认内容与 `generateMetadata` 返回的值一致

### 方法 3: 使用浏览器开发者工具
1. 打开浏览器开发者工具（F12）
2. 切换到"Elements"（元素）标签
3. 在 `<head>` 部分查找元数据标签
4. 确认内容正确

### 方法 4: 测试社交媒体分享
1. 使用 [Facebook 分享调试器](https://developers.facebook.com/tools/debug/)
2. 或使用 [Twitter Card 验证器](https://cards-dev.twitter.com/validator)
3. 输入页面 URL，查看预览效果

## 常见问题

**Q: generateMetadata 是内置函数吗？**
A: 不是传统意义上的"内置函数"，而是 Next.js 框架约定的特殊导出函数。Next.js 会自动识别并调用这个函数来生成页面的元数据。你需要在页面或布局文件中导出这个函数。

**Q: generateMetadata 输出什么？是 TDK（Title, Description, Keywords）吗？**
A: `generateMetadata` 返回一个 `Metadata` 对象，主要用于 SEO。它支持：
- ✅ **Title**：页面标题（对应 HTML `<title>` 标签）
- ✅ **Description**：页面描述（对应 HTML `<meta name="description">` 标签）
- ✅ **Keywords**：关键词（通过 `keywords` 字段设置）
- ✅ 其他丰富的元数据（Open Graph、Twitter Card 等）

**Q: 可以在 template.tsx 中使用 generateMetadata 吗？**
A: 不可以。`generateMetadata` 只能在 `page.tsx` 和 `layout.tsx` 中使用。`template.tsx` 不支持元数据生成功能。

**Q: 为什么我的 generateMetadata 不生效？**
A: 检查以下几点：
1. 函数是否正确导出（使用 `export`）
2. 函数是否是异步函数（使用 `async`）
3. 返回类型是否正确（`Promise<Metadata>`）
4. 是否从 `next` 导入了 `Metadata` 类型
5. 在 Next.js 15+ 中，`params` 是 Promise，是否使用了 `await`

**Q: 可以同时使用静态 metadata 和 generateMetadata 吗？**
A: 不可以。在同一个路由段中，不能同时导出 `metadata` 对象和 `generateMetadata` 函数。只能选择其中一种方式。

**Q: 子页面的元数据会覆盖父布局的元数据吗？**
A: 是的，子页面的元数据会覆盖父布局的元数据。如果需要在子页面中使用父布局的标题模板，可以使用 `title.template`。如果子页面想完全覆盖父布局的标题，可以使用 `title.absolute`。

**Q: generateMetadata 可以调用 API 吗？**
A: 可以。`generateMetadata` 是异步函数，可以调用 API、查询数据库等。但要注意性能，避免阻塞页面渲染。

**Q: 如何处理动态路由参数？**
A: 在 Next.js 15+ 中，`params` 是 Promise，需要使用 `await`：
```typescript
const { id } = await params;
```
在 Next.js 13-14 中，`params` 是普通对象：
```typescript
const { id } = params;
```

## 实际应用示例

### 示例 1: 博客文章页

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
    },
  };
}
```

### 示例 2: 电商产品页

```typescript
// app/products/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    title: `${product.name} - 价格 ¥${product.price}`,
    description: product.description,
    keywords: [product.name, product.category, "购买", "在线商城"],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      type: "product",
    },
  };
}
```

## 参考资料

- [Next.js Metadata 官方文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Metadata API 参考](https://nextjs.org/docs/app/api-reference/metadata)
- [Open Graph 协议](https://ogp.me/)
- [Twitter Card 文档](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [SEO 最佳实践](https://nextjs.org/learn/seo/introduction-to-seo)

## 下一步学习

1. **深入学习 Metadata API**
   - 了解所有可用的元数据字段
   - 学习 Open Graph 和 Twitter Card 的完整配置
   - 掌握元数据的继承和覆盖规则

2. **性能优化**
   - 学习如何优化 `generateMetadata` 的性能
   - 了解静态生成（Static Generation）和动态生成的区别
   - 学习使用 `generateStaticParams` 预生成页面

3. **SEO 进阶**
   - 学习结构化数据（Schema.org）
   - 了解 sitemap 和 robots.txt 的配置
   - 学习使用 Next.js 的 SEO 工具

4. **实际项目应用**
   - 在真实项目中应用 `generateMetadata`
   - 学习如何处理多语言网站的元数据
   - 了解如何测试和验证元数据的效果

