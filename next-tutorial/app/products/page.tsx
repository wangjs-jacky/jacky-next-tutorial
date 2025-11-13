import Link from "next/link";

// 模拟产品数据
const products = [
  { id: 1, name: "产品 A", description: "这是产品 A 的描述" },
  { id: 2, name: "产品 B", description: "这是产品 B 的描述" },
  { id: 3, name: "产品 C", description: "这是产品 C 的描述" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">产品列表</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        点击产品查看详情（动态路由示例）
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            <span className="inline-block mt-4 text-blue-600 dark:text-blue-400">
              查看详情 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

