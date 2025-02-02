import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import { Widget } from "@/lib/dashboardUtils";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";

export default async function Widgets() {
  const [widgets, reviews] = await Promise.all([
    getAllWidgets(),
    getAllReviews(),
  ]);

  // const widgetParam = resolvedSearchParams.widget;
  // const widgetToShow =
  //   widgetParam && typeof widgetParam === "string"
  //     ? widgets.find((w) => w.id === Number(widgetParam)) || null
  //     : null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <WidgetTabs initialWidgets={widgets} reviews={reviews} />
    </Suspense>
  );
}
