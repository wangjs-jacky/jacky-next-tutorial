# Next.js 图片配置 - remotePatterns 使用指南

> 解决 `next/image` 外部图片源配置问题

## 前言

在使用 Next.js 的 `next/image` 组件加载外部图片时，你可能会遇到这样的错误：

```
Invalid src prop (https://images.unsplash.com/photo-xxx) on `next/image`, 
hostname "images.unsplash.com" is not configured under images in your `next.config.js`
```

这篇文档将详细解释这个报错的原因，以及如何正确配置外部图片源。

## 1. 报错原因

### 1.1. 安全机制

Next.js 的 `next/image` 组件默认**不允许加载外部图片**，这是 Next.js 内置的安全机制。这个机制的目的是：

1. **防止恶意追踪**：防止恶意网站通过图片 URL 追踪用户行为
2. **防止未授权资源**：避免加载未授权的外部资源
3. **防止 XSS 攻击**：减少潜在的跨站脚本攻击风险
4. **性能优化**：Next.js 的图片优化功能需要明确知道图片来源

### 1.2. 为什么需要配置

当你使用外部图片源（如 Unsplash、CDN 等）时，Next.js 需要你**明确允许**该域名，这样可以：

- 确保你了解并信任该图片源
- 避免意外加载恶意资源
- 提供更好的控制和审计能力
- 让 Next.js 的图片优化功能正常工作

### 1.3. 实际场景

假设你在 `photos/page.tsx` 中使用了 Unsplash 的图片：

```typescript
import Image from "next/image";

const photos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
];

export default function PhotosPage() {
  return (
    <div>
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.url}
          alt="Photo"
          width={800}
          height={600}
        />
      ))}
    </div>
  );
}
```

如果没有配置，Next.js 会拒绝加载这些外部图片，并抛出错误。

## 2. 解决方案

### 2.1. 使用 remotePatterns（推荐）

在 `next.config.ts`（或 `next.config.js`）中配置 `images.remotePatterns`：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

### 2.2. remotePatterns 配置详解

`remotePatterns` 是 Next.js 推荐的配置方式（从 v12.3.0 开始），比旧的 `domains` 配置更灵活、更安全。

#### 基本配置

```typescript
remotePatterns: [
  {
    protocol: "https",        // 协议：'https' 或 'http'
    hostname: "example.com",  // 主机名
  },
]
```

#### 高级配置

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    port: "",                    // 可选：指定端口（如 "8080"）
    pathname: "/photo/**",       // 可选：限制路径模式（支持通配符）
  },
]
```

#### 多个图片源

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  {
    protocol: "https",
    hostname: "cdn.example.com",
  },
  {
    protocol: "https",
    hostname: "**.amazonaws.com", // 支持通配符
  },
]
```

### 2.3. 旧版配置方式（已弃用）

在 Next.js v12.3.0 之前，使用 `domains` 配置：

```typescript
// 旧方式（不推荐，但仍支持）
images: {
  domains: ['images.unsplash.com', 'cdn.example.com'],
}
```

**为什么不推荐？**

- `domains` 配置不够灵活，无法限制协议、端口、路径
- `remotePatterns` 提供更细粒度的控制
- `remotePatterns` 更安全，可以精确匹配图片源

### 2.4. 通配符支持

`remotePatterns` 支持通配符，可以匹配多个子域名：

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "**.unsplash.com",  // 匹配所有 unsplash.com 的子域名
  },
  {
    protocol: "https",
    hostname: "cdn-*.example.com", // 匹配 cdn-1.example.com, cdn-2.example.com 等
  },
]
```

## 3. 工作原理

### 3.1. 配置检查流程

当使用 `next/image` 组件时，Next.js 会执行以下检查：

1. **解析图片 URL**：提取协议、主机名、端口、路径等信息
2. **匹配配置**：与 `remotePatterns` 中的配置进行匹配
3. **允许/拒绝**：
   - 如果匹配成功 → 允许加载图片
   - 如果匹配失败 → 抛出错误，拒绝加载

### 3.2. 匹配规则

Next.js 会按照以下规则进行匹配：

1. **协议匹配**：URL 的协议必须与配置的 `protocol` 一致
2. **主机名匹配**：URL 的主机名必须与配置的 `hostname` 匹配（支持通配符）
3. **端口匹配**：如果配置了 `port`，URL 的端口必须匹配
4. **路径匹配**：如果配置了 `pathname`，URL 的路径必须匹配模式

### 3.3. 示例

假设配置如下：

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo/**",
  },
]
```

匹配结果：

- ✅ `https://images.unsplash.com/photo-123` → 匹配成功
- ✅ `https://images.unsplash.com/photo-456?w=800` → 匹配成功
- ❌ `http://images.unsplash.com/photo-123` → 协议不匹配
- ❌ `https://images.unsplash.com/other-123` → 路径不匹配

## 4. 常见场景

### 4.1. Unsplash 图片

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
}
```

### 4.2. AWS S3 / CloudFront

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.s3.amazonaws.com",
    },
    {
      protocol: "https",
      hostname: "**.cloudfront.net",
    },
  ],
}
```

### 4.3. 自定义 CDN

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.example.com",
      pathname: "/images/**",
    },
  ],
}
```

### 4.4. 多个图片源

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "cdn.example.com",
    },
    {
      protocol: "https",
      hostname: "**.amazonaws.com",
    },
  ],
}
```

## 5. 注意事项

### 5.1. 重启开发服务器

**重要**：修改 `next.config.ts` 后，必须**重启开发服务器**才能生效。

```bash
# 停止当前服务器（Ctrl + C）
# 然后重新启动
npm run dev
# 或
pnpm dev
```

### 5.2. 生产环境配置

配置在开发环境和生产环境中都有效，不需要额外配置。

### 5.3. 只添加信任的域名

只添加你**信任的图片源**，不要添加未知或不信任的域名。

### 5.4. 性能考虑

虽然配置了外部图片源，Next.js 的图片优化功能仍然可以正常工作：

- 自动优化图片大小
- 支持响应式图片
- 支持懒加载
- 支持 WebP 等现代格式

### 5.5. 本地图片 vs 外部图片

- **本地图片**：放在 `public` 目录下，不需要配置
- **外部图片**：必须配置 `remotePatterns`

```typescript
// 本地图片 - 不需要配置
<Image src="/logo.png" alt="Logo" width={200} height={200} />

// 外部图片 - 需要配置
<Image src="https://images.unsplash.com/photo-xxx" alt="Photo" width={800} height={600} />
```

## 6. 故障排查

### 6.1. 配置后仍然报错

**可能原因：**

1. 没有重启开发服务器
2. 配置语法错误
3. 主机名拼写错误
4. 协议不匹配（配置了 `https` 但 URL 是 `http`）

**解决方法：**

1. 检查配置文件语法
2. 确认主机名正确
3. 重启开发服务器
4. 检查浏览器控制台的完整错误信息

### 6.2. 通配符不生效

确保通配符格式正确：

```typescript
// ✅ 正确
hostname: "**.example.com"

// ❌ 错误
hostname: "*.example.com"  // 缺少一个 *
```

### 6.3. 路径限制不生效

确保 `pathname` 模式正确：

```typescript
// ✅ 正确 - 匹配 /photo/ 下的所有路径
pathname: "/photo/**"

// ✅ 正确 - 匹配 /images/ 下的所有路径
pathname: "/images/**"

// ❌ 错误 - 缺少通配符
pathname: "/photo/"
```

## 7. 最佳实践

### 7.1. 使用 remotePatterns 而非 domains

```typescript
// ✅ 推荐
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
}

// ❌ 不推荐（旧方式）
images: {
  domains: ['images.unsplash.com'],
}
```

### 7.2. 限制路径范围

如果可能，使用 `pathname` 限制图片路径：

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "cdn.example.com",
    pathname: "/images/**",  // 只允许 /images/ 路径下的图片
  },
]
```

### 7.3. 只使用 HTTPS

除非必要，否则只允许 HTTPS 协议：

```typescript
remotePatterns: [
  {
    protocol: "https",  // 只允许 HTTPS
    hostname: "example.com",
  },
]
```

### 7.4. 使用环境变量

对于不同环境使用不同的图片源：

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME || "cdn.example.com",
      },
    ],
  },
};
```

## 8. 完整示例

### 8.1. 配置文件

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
```

### 8.2. 使用示例

```typescript
// app/photos/page.tsx
import Image from "next/image";

const photos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "山景",
  },
];

export default function PhotosPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id}>
          <Image
            src={photo.url}
            alt={photo.title}
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
```

## 小结

通过本文档，我们了解了：

1. **报错原因**：Next.js 的安全机制要求明确配置外部图片源
2. **解决方案**：使用 `remotePatterns` 配置允许的外部图片源
3. **工作原理**：Next.js 会检查图片 URL 是否匹配配置
4. **最佳实践**：使用 `remotePatterns`、限制路径、只使用 HTTPS

记住：**修改配置后一定要重启开发服务器！**

## 参考链接

- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [Next.js Image Configuration](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)
- [Next.js Config Images](https://nextjs.org/docs/app/api-reference/next-config-js/images)

