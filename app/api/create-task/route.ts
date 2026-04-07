export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/app/lib/create-task";

export async function POST(req: NextRequest) {
  try {
    {/* API route が受け取れるのは Request オブジェクトのみらしい */}
    const formData = await req.formData(); // フォームデータ(req内のbody部分)を取得
    await createTask(formData);

    return NextResponse.json({ message: "タスクが登録されました" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "タスク登録に失敗しました" },
      { status: 500 }
    );
  }
}

