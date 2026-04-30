export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { updateTaskInfo } from "@/app/lib/update-taskinfo";
import { deleteTask } from "@/app/lib/delete-task";

export async function PUT(req: NextRequest) {
  try {
    {/* API route が受け取れるのは Request オブジェクトのみらしい */}
    const formData = await req.formData(); // フォームデータ(req内のbody部分)を取得
    await updateTaskInfo(formData);

    return NextResponse.json({ message: "タスク情報が更新されました" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "タスク情報更新に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string }}) {
  try {
    {/* API route が受け取れるのは Request オブジェクトのみらしい */}
    const { id } = context.params; // URLパラメータからIDを取得
    const taskid = Number(id); // 数値型に変換
    await deleteTask(taskid);

    return NextResponse.json({ message: "タスクが削除されました" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "タスク削除に失敗しました" },
      { status: 500 }
    );
  }
}
