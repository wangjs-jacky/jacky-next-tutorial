import Link from "next/link";
import Image from "next/image";

// 模拟照片数据
const photos = [
  {
    id: "1",
    title: "山景",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "壮丽的山脉景色",
  },
  {
    id: "2",
    title: "海滩",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    description: "美丽的海滩风光",
  },
  {
    id: "3",
    title: "森林",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "宁静的森林小径",
  },
  {
    id: "4",
    title: "城市",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    description: "现代都市夜景",
  },
  {
    id: "5",
    title: "沙漠",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop",
    description: "广袤的沙漠景观",
  },
  {
    id: "6",
    title: "湖泊",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
    description: "清澈的湖泊倒影",
  },
];

export default function PhotosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">照片库</h1>
        <p className="text-gray-600 dark:text-gray-400">
          点击任意照片，会以模态框形式打开（拦截路由）。直接访问 URL 会显示完整页面。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="group relative block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {photo.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">拦截路由说明</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>拦截路由</strong>：使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">@modal/(.)photos/[id]</code> 格式
          </li>
          <li>
            <strong>从列表页点击</strong>：会以模态框形式显示，URL 变为 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/photos/[id]</code>
          </li>
          <li>
            <strong>直接访问 URL</strong>：会显示完整的详情页面
          </li>
          <li>
            <strong>刷新页面</strong>：如果 URL 是 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/photos/[id]</code>，会显示完整页面
          </li>
          <li>
            <strong>并行路由</strong>：需要在根布局中使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">@modal</code> slot
          </li>
        </ul>
      </div>
    </div>
  );
}

