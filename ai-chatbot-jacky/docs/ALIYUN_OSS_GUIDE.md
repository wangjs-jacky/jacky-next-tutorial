# 阿里云 OSS 集成指南

## 🎯 概述

阿里云 OSS（Object Storage Service）是阿里云提供的对象存储服务，非常适合国内项目使用。

---

## ✅ 为什么选择阿里云 OSS？

### 优势

1. **国内访问快** 🌏
   - 国内 CDN 加速
   - 访问速度快
   - 适合国内用户

2. **价格便宜** 💰
   - 国内价格相对较低
   - 按使用量付费
   - 有免费额度

3. **稳定可靠** 🛡️
   - 阿里云企业级服务
   - 高可用性
   - 数据安全

4. **中文支持** 🇨🇳
   - 中文文档完善
   - 中文客服支持
   - 国内支付方便

---

## 📋 集成步骤

### 步骤 1：创建阿里云账号和 Bucket

1. **注册阿里云账号**
   - 访问 https://www.aliyun.com/
   - 注册/登录账号

2. **开通 OSS 服务**
   - 访问 https://oss.console.aliyun.com/
   - 开通 OSS 服务

3. **创建 Bucket**
   - 点击 "创建 Bucket"
   - 选择区域（推荐：华东1-杭州）
   - 设置 Bucket 名称（全局唯一）
   - 设置读写权限：
     - **公共读**：如果文件需要公开访问
     - **私有**：如果文件需要权限控制

4. **获取 AccessKey**
   - 访问 https://ram.console.aliyun.com/manage/ak
   - 创建 AccessKey
   - **重要**：保存 AccessKey ID 和 AccessKey Secret

---

### 步骤 2：安装 SDK

#### 方法 1：使用阿里云 OSS SDK（推荐）

```bash
pnpm add ali-oss
```

#### 方法 2：使用 AWS S3 SDK（S3 兼容模式）

```bash
pnpm add @aws-sdk/client-s3
```

---

### 步骤 3：创建存储工具函数

#### 方法 1：使用阿里云 OSS SDK

```typescript
// lib/storage/aliyun-oss.ts
import OSS from "ali-oss";

const client = new OSS({
  region: process.env.OSS_REGION!, // 例如：oss-cn-hangzhou
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET_NAME!,
});

export async function uploadToOSS(
  filename: string,
  buffer: Buffer,
  contentType: string
) {
  try {
    const result = await client.put(`uploads/${filename}`, buffer, {
      headers: {
        "Content-Type": contentType,
      },
    });

    return {
      url: result.url,
    };
  } catch (error) {
    console.error("OSS upload failed:", error);
    throw error;
  }
}

// 删除文件
export async function deleteFromOSS(filename: string) {
  try {
    await client.delete(`uploads/${filename}`);
  } catch (error) {
    console.error("OSS delete failed:", error);
    throw error;
  }
}
```

#### 方法 2：使用 AWS S3 SDK（S3 兼容模式）

```typescript
// lib/storage/aliyun-oss-s3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ossClient = new S3Client({
  region: process.env.OSS_REGION!,
  endpoint: `https://oss-${process.env.OSS_REGION}.aliyuncs.com`,
  credentials: {
    accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.OSS_ACCESS_KEY_SECRET!,
  },
  forcePathStyle: false, // OSS 使用虚拟主机风格
});

export async function uploadToOSSS3(
  filename: string,
  buffer: Buffer,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: process.env.OSS_BUCKET_NAME!,
    Key: `uploads/${filename}`,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read", // 如果需要公开访问
  });

  await ossClient.send(command);

  return {
    url: `https://${process.env.OSS_BUCKET_NAME}.oss-${process.env.OSS_REGION}.aliyuncs.com/uploads/${filename}`,
  };
}
```

---

### 步骤 4：修改上传 API

```typescript
// app/(chat)/api/files/upload/route.ts

// 之前（使用 Vercel Blob）
import { put } from "@vercel/blob";
const data = await put(filename, fileBuffer, { access: "public" });

// 之后（使用阿里云 OSS）
import { uploadToOSS } from "@/lib/storage/aliyun-oss";

// ... 其他代码保持不变 ...

try {
  const data = await uploadToOSS(
    filename,
    Buffer.from(fileBuffer),
    file.type
  );

  return NextResponse.json(data);
} catch (error) {
  return NextResponse.json({ error: "Upload failed" }, { status: 500 });
}
```

---

### 步骤 5：配置环境变量

在 `.env.local` 文件中添加：

```env
# 阿里云 OSS 配置
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET_NAME=your-bucket-name
```

#### 区域列表

常用的 OSS 区域：

| 区域 | Region 值 |
|------|-----------|
| 华东1（杭州） | `oss-cn-hangzhou` |
| 华东2（上海） | `oss-cn-shanghai` |
| 华北1（青岛） | `oss-cn-qingdao` |
| 华北2（北京） | `oss-cn-beijing` |
| 华北3（张家口） | `oss-cn-zhangjiakou` |
| 华南1（深圳） | `oss-cn-shenzhen` |
| 香港 | `oss-cn-hongkong` |

---

## 🔐 安全配置

### 1. 设置 Bucket 权限

#### 公共读（适合公开文件）

```
Bucket 权限设置：
- 读写权限：公共读
- 文件可以公开访问
```

#### 私有（适合敏感文件）

```
Bucket 权限设置：
- 读写权限：私有
- 需要通过签名 URL 访问
```

### 2. 使用 RAM 子账号（推荐）

不要使用主账号的 AccessKey，创建 RAM 子账号：

1. 访问 https://ram.console.aliyun.com/
2. 创建 RAM 用户
3. 授予 OSS 相关权限
4. 创建 AccessKey
5. 使用子账号的 AccessKey

---

## 💡 高级功能

### 1. 生成签名 URL（私有文件）

```typescript
// 生成临时访问 URL（私有文件）
export async function getSignedUrl(filename: string, expires: number = 3600) {
  const url = client.signatureUrl(`uploads/${filename}`, {
    expires: expires, // 过期时间（秒）
  });
  return url;
}
```

### 2. 设置文件元数据

```typescript
export async function uploadToOSSWithMetadata(
  filename: string,
  buffer: Buffer,
  contentType: string,
  metadata: Record<string, string>
) {
  const result = await client.put(`uploads/${filename}`, buffer, {
    headers: {
      "Content-Type": contentType,
      ...metadata, // 自定义元数据
    },
  });

  return {
    url: result.url,
  };
}
```

### 3. 批量上传

```typescript
export async function uploadMultipleFiles(
  files: Array<{ filename: string; buffer: Buffer; contentType: string }>
) {
  const uploadPromises = files.map((file) =>
    uploadToOSS(file.filename, file.buffer, file.contentType)
  );

  const results = await Promise.all(uploadPromises);
  return results;
}
```

---

## 📊 与 Vercel Blob 对比

| 特性 | Vercel Blob | 阿里云 OSS |
|------|-------------|------------|
| **国内访问速度** | 较慢 | 快 |
| **价格** | 中等 | 便宜 |
| **中文支持** | 一般 | 好 |
| **集成难度** | 简单 | 简单 |
| **CDN** | 全球 | 国内 |
| **适用场景** | Vercel 项目 | 国内项目 |

---

## 🎯 实际项目示例

### 完整的集成示例

```typescript
// lib/storage/aliyun-oss.ts
import OSS from "ali-oss";

const client = new OSS({
  region: process.env.OSS_REGION!,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET_NAME!,
});

export async function uploadToOSS(
  filename: string,
  buffer: Buffer,
  contentType: string
) {
  try {
    // 生成唯一文件名（避免冲突）
    const uniqueFilename = `${Date.now()}-${filename}`;
    
    const result = await client.put(`uploads/${uniqueFilename}`, buffer, {
      headers: {
        "Content-Type": contentType,
      },
    });

    return {
      url: result.url,
      filename: uniqueFilename,
    };
  } catch (error) {
    console.error("OSS upload failed:", error);
    throw new Error("文件上传失败");
  }
}

// app/(chat)/api/files/upload/route.ts
import { uploadToOSS } from "@/lib/storage/aliyun-oss";

export async function POST(request: Request) {
  // ... 验证和获取文件 ...

  try {
    const data = await uploadToOSS(
      filename,
      Buffer.from(fileBuffer),
      file.type
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "文件上传失败" },
      { status: 500 }
    );
  }
}
```

---

## 📚 参考资源

- [阿里云 OSS 官方文档](https://help.aliyun.com/product/31815.html)
- [阿里云 OSS Node.js SDK](https://help.aliyun.com/document_detail/32068.html)
- [OSS 控制台](https://oss.console.aliyun.com/)
- [RAM 访问控制](https://ram.console.aliyun.com/)

---

## ✨ 总结

### 阿里云 OSS 的优势

- ✅ **国内访问快**：CDN 加速，适合国内用户
- ✅ **价格便宜**：国内价格相对较低
- ✅ **稳定可靠**：企业级服务
- ✅ **中文支持**：文档和客服都是中文

### 适用场景

- ✅ 国内项目
- ✅ 需要国内访问速度快
- ✅ 使用阿里云生态
- ✅ 成本敏感的项目

### 一句话总结

**阿里云 OSS = 国内版的 AWS S3，访问速度快，价格便宜，中文支持好！**

---

**现在你可以使用阿里云 OSS 替代 Vercel Blob 了！** 🎉



