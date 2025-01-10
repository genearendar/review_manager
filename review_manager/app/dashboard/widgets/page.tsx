import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import { Widget } from "@/lib/dashboardUtils";

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

  return <WidgetTabs initialWidgets={widgets} reviews={reviews} />;
}
