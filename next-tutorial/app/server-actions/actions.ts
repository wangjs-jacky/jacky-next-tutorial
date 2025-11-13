"use server";

// Server Action：创建用户
export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // 模拟数据库操作
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: `用户 ${name} (${email}) 创建成功！`,
    id: Math.random().toString(36).substring(7),
  };
}

// Server Action：增加计数器
export async function incrementCounter(currentCount: number) {
  // 模拟服务器处理
  await new Promise((resolve) => setTimeout(resolve, 500));

  return currentCount + 1;
}

