import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import { Widget } from "@/lib/dashboardUtils";

export default async function Widgets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [widgets, reviews, resolvedSearchParams] = await Promise.all([
    getAllWidgets(),
    getAllReviews(),
    searchParams,
  ]);

  const widgetParam = resolvedSearchParams.widget;
  const widgetToShow =
    widgetParam && typeof widgetParam === "string"
      ? widgets.find((w) => w.id === Number(widgetParam)) || null
      : null;

  return (
  // Show a specific widget if valid search params present
  // otherwise show all widgets
    <>
      {widgetToShow ? (
        <WidgetScreen widget={widgetToShow as Widget} />
      ) : (
        <WidgetTabs initialWidgets={widgets} reviews={reviews} />
      )}
    </>
  );
}
