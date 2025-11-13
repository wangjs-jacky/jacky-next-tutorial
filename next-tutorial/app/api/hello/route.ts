import { NextResponse } from "next/server";

// GET 请求处理
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  return NextResponse.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    method: "GET",
  });
}

// POST 请求处理
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: "数据接收成功",
      receivedData: body,
      timestamp: new Date().toISOString(),
      method: "POST",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "无效的 JSON 数据" },
      { status: 400 }
    );
  }
}

// PUT 请求处理
export async function PUT(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: "数据更新成功",
    updatedData: body,
    timestamp: new Date().toISOString(),
    method: "PUT",
  });
}

// DELETE 请求处理
export async function DELETE(request: Request) {
  return NextResponse.json({
    message: "删除成功",
    timestamp: new Date().toISOString(),
    method: "DELETE",
  });
}

