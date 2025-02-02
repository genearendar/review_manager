import { Widget } from "@/lib/dashboardUtils";
import { getAllWidgets } from "@/lib/widgetActions";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";

export default async function WidgetId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const widget = await getAllWidgets().then((widgets: Widget[]) =>
    widgets.find((widget) => widget.id === Number(id))
  );
  return widget ? (
    <Suspense fallback={<LoadingFallback />}>
      <WidgetScreen widget={widget as Widget} />
    </Suspense>
  ) : (
    <div>
      <h2 className="text-2xl mt-4 mb-4">Sorry, this widget does not exist</h2>
      <Button asChild>
        <Link href="/dashboard/widgets">Go back to all widgets</Link>
      </Button>
    </div>
  );
}
