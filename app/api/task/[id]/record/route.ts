export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { registerRecord } from "@/app/lib/register-record";
import { updateTaskInfo } from "@/app/lib/update-taskinfo";

export async function GET(req: NextRequest) {
  {/* TODO: あるタスクに紐づく達成度一覧を返すAPI(達成度登録，初期画面，達成度画面などで利用) */}

  try {
    {/* API route が受け取れるのは Request オブジェクトのみらしい */}
    const formData = await req.formData(); // フォームデータ(req内のbody部分)を取得
    await updateTaskInfo(formData);

    return NextResponse.json({ message: "タスクが登録されました" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "タスク登録に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  {/* TODO: タスク情報を更新するAPI(update-taskなどで利用) */}

  try {
    {/* API route が受け取れるのは Request オブジェクトのみらしい */}
    const formData = await req.formData(); // フォームデータ(req内のbody部分)を取得
    await registerRecord(formData);

    return NextResponse.json({ message: "タスクが登録されました" }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "タスク登録に失敗しました" },
      { status: 500 }
    );
  }
}
