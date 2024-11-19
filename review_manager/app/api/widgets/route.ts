import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const widgetId = searchParams.get("id");

  // Handle case when no id is provided
  if (!widgetId) {
    return Response.json({ error: "Widget ID is required" }, { status: 400 });
  }

  return Response.json({
    message: `This is a public widget ${widgetId}`,
  });
}
