import { NextRequest } from "next/server";
import { getPublicWidget } from "@/lib/widgetActions";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const widgetId = searchParams.get("id");

  // Handle case when no id is provided
  if (!widgetId) {
    return Response.json({ error: "Widget ID is required" }, { status: 400 });
  }
  try {
    const widget = await getPublicWidget(parseInt(widgetId));
    if (!widget) {
      return Response.json({ error: "Widget not found" }, { status: 404 });
    }
    return Response.json({
      widget,
    });
  } catch (error) {
    console.error("Error fetching widget:", error);
    return Response.json({ error: "Widget not found" }, { status: 404 });
  }
}


