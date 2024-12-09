import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "review-widget.js");
  const fileContent = fs.readFileSync(filePath, "utf8");

  return new NextResponse(fileContent, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
