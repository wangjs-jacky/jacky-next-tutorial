import Link from "next/link";

// 这是一个服务端组件（默认）
export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Next.js App Router 完整示例</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          这个 DEMO 覆盖了 App Router 的所有主要场景
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="静态页面"
          description="展示静态路由和页面"
          href="/about"
        />
        <FeatureCard
          title="动态路由"
          description="使用动态路由参数"
          href="/products/1"
        />
        <FeatureCard
          title="路由组"
          description="使用路由组组织路由"
          href="/dashboard"
        />
        <FeatureCard
          title="加载状态"
          description="使用 loading.tsx"
          href="/loading-demo"
        />
        <FeatureCard
          title="手动 Suspense"
          description="不使用 loading.tsx 的写法"
          href="/loading-demo-manual"
        />
        <FeatureCard
          title="Streaming 演示"
          description="Loading 和 Streaming 的关系"
          href="/streaming-demo"
        />
        <FeatureCard
          title="水合演示"
          description="Hydration 工作原理"
          href="/hydration-demo"
        />
        <FeatureCard
          title="错误处理"
          description="使用 error.tsx"
          href="/error-demo"
        />
        <FeatureCard
          title="API 路由"
          description="路由处理程序"
          href="/api-demo"
        />
        <FeatureCard
          title="Server Actions"
          description="服务端操作"
          href="/server-actions"
        />
        <FeatureCard
          title="客户端组件"
          description="交互式组件"
          href="/client-demo"
        />
        <FeatureCard
          title="博客示例"
          description="完整的博客功能"
          href="/blog"
        />
        <FeatureCard
          title="中间件"
          description="请求拦截和处理"
          href="/middleware-demo"
        />
      </div>

      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">涵盖的功能</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside">
          <li>静态路由和页面</li>
          <li>动态路由 [id]</li>
          <li>路由组 (group)</li>
          <li>嵌套布局</li>
          <li>加载状态 (loading.tsx)</li>
          <li>错误处理 (error.tsx)</li>
          <li>路由处理程序 (API Routes)</li>
          <li>Server Actions</li>
          <li>服务端组件 vs 客户端组件</li>
          <li>元数据 (Metadata)</li>
          <li>中间件 (Middleware)</li>
          <li>数据获取</li>
        </ul>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
}
