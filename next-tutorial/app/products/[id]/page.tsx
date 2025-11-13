import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// 模拟产品数据
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
  const { id } = await params;
  const product = products[id];
  
  if (!product) {
    return {
      title: "产品未找到",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

// 动态路由页面
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  // 如果产品不存在，返回 404
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
        ← 返回产品列表
      </Link>
      
      <div className="mt-8 p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          ¥{product.price}
        </p>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">动态路由说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>路由参数通过 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">params</code> prop 传递</li>
          <li>在 Next.js 15+ 中，params 是 Promise，需要使用 await</li>
          <li>文件路径：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">app/products/[id]/page.tsx</code></li>
          <li>对应路由：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/products/:id</code></li>
          <li>可以使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">generateMetadata</code> 动态生成元数据</li>
        </ul>
      </div>
    </div>
  );
}

