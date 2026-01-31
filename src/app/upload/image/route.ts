import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder =
      (req.nextUrl.searchParams.get("folder") as string) || "uploads";

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || ".jpg";
    const basename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const filename = `${basename}${ext}`;
    const dirPath = path.join(UPLOAD_DIR, folder);
    const filePath = path.join(dirPath, filename);

    await mkdir(dirPath, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const url = `/uploads/${folder}/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Ошибка загрузки" },
      { status: 500 }
    );
  }
}
