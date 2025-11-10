# Next.js Pages Router - getServerSideProps 使用指南

## 📖 概述

在 Next.js **Pages Router**（旧版路由系统）中，`getServerSideProps` 用于在每次请求时在服务端获取数据并渲染页面。这与 App Router 中的服务端组件类似，但语法不同。

## 🎯 基本用法

### 1. 基本语法

```typescript
// pages/posts/[id].tsx
import { GetServerSideProps } from 'next';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PageProps {
  post: Post;
}

// 页面组件（默认是客户端组件）
export default function PostPage({ post }: PageProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// 服务端数据获取函数
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { id } = context.params!;
  
  // 在服务端获取数据
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();

  // 如果数据不存在，返回 404
  if (!post) {
    return {
      notFound: true,
    };
  }

  // 返回 props，这些 props 会传递给页面组件
  return {
    props: {
      post,
    },
  };
};
```

### 2. context 参数说明

`getServerSideProps` 接收一个 `context` 参数，包含以下属性：

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 路由参数（动态路由）
  const { id, slug } = context.params;
  
  // 查询字符串参数
  const { page, limit } = context.query;
  
  // 请求对象（req）
  const { cookies, headers } = context.req;
  
  // 响应对象（res）
  context.res.setHeader('Cache-Control', 'public, s-maxage=10');
  
  // 预览模式
  const isPreview = context.preview;
  
  // 预览数据
  const previewData = context.previewData;
  
  // 区域设置
  const locale = context.locale;
  
  // 默认区域设置
  const defaultLocale = context.defaultLocale;
  
  return {
    props: {},
  };
};
```

## 📝 完整示例

### 示例 1: 用户资料页面

```typescript
// pages/users/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface PageProps {
  user: User;
}

export default function UserProfile({ user }: PageProps) {
  const router = useRouter();
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { id } = context.params!;
  
  try {
    // 模拟从数据库或 API 获取用户数据
    const res = await fetch(`https://api.example.com/users/${id}`);
    
    if (!res.ok) {
      return {
        notFound: true,
      };
    }
    
    const user = await res.json();
    
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
```

### 示例 2: 带查询参数的列表页面

```typescript
// pages/products.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface PageProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function ProductsPage({ products, currentPage, totalPages }: PageProps) {
  return (
    <div>
      <h1>产品列表</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
      
      <div>
        {currentPage > 1 && (
          <Link href={`/products?page=${currentPage - 1}`}>上一页</Link>
        )}
        <span>第 {currentPage} 页 / 共 {totalPages} 页</span>
        {currentPage < totalPages && (
          <Link href={`/products?page=${currentPage + 1}`}>下一页</Link>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const page = Number(context.query.page) || 1;
  const limit = 10;
  
  // 从 API 获取分页数据
  const res = await fetch(
    `https://api.example.com/products?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  
  return {
    props: {
      products: data.products,
      currentPage: page,
      totalPages: Math.ceil(data.total / limit),
    },
  };
};
```

### 示例 3: 需要认证的页面

```typescript
// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface PageProps {
  user: {
    name: string;
    email: string;
  };
}

export default function Dashboard({ user }: PageProps) {
  return (
    <div>
      <h1>欢迎, {user.name}!</h1>
      <p>你的邮箱: {user.email}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  // 检查用户是否已登录
  const session = await getSession({ req: context.req });
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      user: {
        name: session.user?.name || '',
        email: session.user?.email || '',
      },
    },
  };
};
```

### 示例 4: 使用 Cookie 和 Headers

```typescript
// pages/profile.tsx
import { GetServerSideProps } from 'next';

interface PageProps {
  userAgent: string;
  theme: string;
}

export default function Profile({ userAgent, theme }: PageProps) {
  return (
    <div>
      <p>你的浏览器: {userAgent}</p>
      <p>主题设置: {theme}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  // 从请求头获取 User-Agent
  const userAgent = context.req.headers['user-agent'] || 'Unknown';
  
  // 从 Cookie 获取主题设置
  const theme = context.req.cookies.theme || 'light';
  
  return {
    props: {
      userAgent,
      theme,
    },
  };
};
```

## 🔄 返回值选项

### 1. 返回 props（正常情况）

```typescript
return {
  props: {
    data: 'some data',
  },
};
```

### 2. 返回 404

```typescript
return {
  notFound: true,
};
```

### 3. 重定向

```typescript
// 临时重定向（302）
return {
  redirect: {
    destination: '/login',
    permanent: false,
  },
};

// 永久重定向（301）
return {
  redirect: {
    destination: '/new-url',
    permanent: true,
  },
};
```

### 4. 设置响应头

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 设置缓存控制
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  return {
    props: {},
  };
};
```

## ⚠️ 注意事项

### 1. 性能考虑

- `getServerSideProps` 在**每次请求**时都会执行
- 会增加服务器负载和响应时间
- 如果数据不经常变化，考虑使用 `getStaticProps` + ISR

### 2. 不能用于客户端组件

- `getServerSideProps` 只能在 Pages Router 中使用
- 不能在 App Router 中使用
- 页面组件本身仍然是客户端组件（除非使用 `getStaticProps`）

### 3. 类型安全

```typescript
import { GetServerSideProps } from 'next';

interface PageProps {
  data: string;
}

// 使用泛型确保类型安全
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      data: 'hello', // TypeScript 会检查类型
    },
  };
};
```

## 🔀 Pages Router vs App Router 对比

| 特性 | Pages Router | App Router |
|------|-------------|------------|
| 服务端数据获取 | `getServerSideProps` | 直接在组件中使用 `async/await` |
| 静态生成 | `getStaticProps` | `generateStaticParams` |
| 默认渲染 | 客户端渲染 | 服务端渲染 |
| 文件位置 | `pages/` 目录 | `app/` 目录 |
| 类型定义 | `GetServerSideProps` | 直接使用 `async` 函数 |

### Pages Router 示例

```typescript
// pages/posts/[id].tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const post = await fetchPost(id);
  return { props: { post } };
};

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

### App Router 等价示例

```typescript
// app/posts/[id]/page.tsx
export default async function Post({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return <div>{post.title}</div>;
}
```

## 📚 相关 API

- **getStaticProps**: 静态生成（构建时）
- **getStaticPaths**: 动态路由的静态生成
- **getServerSideProps**: 服务端渲染（请求时）← 本文档
- **getInitialProps**: 已废弃，不推荐使用

## 🎯 最佳实践

1. **只在需要时使用**: 如果数据可以静态生成，使用 `getStaticProps`
2. **错误处理**: 始终处理可能的错误情况
3. **类型安全**: 使用 TypeScript 和 `GetServerSideProps` 泛型
4. **性能优化**: 考虑使用缓存和数据库索引
5. **安全性**: 不要在客户端暴露敏感信息

## 📖 总结

`getServerSideProps` 是 Pages Router 中实现服务端渲染的主要方式。它在每次请求时运行，适合需要实时数据或用户特定内容的页面。如果你使用的是 Next.js 13+，建议迁移到 App Router，它提供了更简洁的 API。

