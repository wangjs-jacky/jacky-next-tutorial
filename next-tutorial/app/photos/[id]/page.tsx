import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// 模拟照片数据
const photos: Record<string, { id: string; title: string; url: string; description: string }> = {
  "1": {
    id: "1",
    title: "山景",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "壮丽的山脉景色，展现了自然的力量和美丽。",
  },
  "2": {
    id: "2",
    title: "海滩",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    description: "美丽的海滩风光，海浪轻抚着金色的沙滩。",
  },
  "3": {
    id: "3",
    title: "森林",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "宁静的森林小径，阳光透过树叶洒下斑驳的光影。",
  },
  "4": {
    id: "4",
    title: "城市",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop",
    description: "现代都市夜景，灯火通明的城市天际线。",
  },
  "5": {
    id: "5",
    title: "沙漠",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "广袤的沙漠景观，沙丘在风中不断变化形状。",
  },
  "6": {
    id: "6",
    title: "湖泊",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop",
    description: "清澈的湖泊倒影，如镜面般平静的水面。",
  },
};

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos[id];

  if (!photo) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/photos"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← 返回照片库
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{photo.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {photo.description}
        </p>
      </div>

      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>

      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">这是完整页面视图</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          当你直接访问 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/photos/{id}</code> 或刷新页面时，会看到这个完整页面。
          <br />
          如果从列表页点击照片，会以模态框形式显示（拦截路由）。
        </p>
      </div>
    </div>
  );
}

