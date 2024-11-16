import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import { Widget } from "@/app/dashboard/dashboardUtils";

export default async function Widgets({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const widgets = await getAllWidgets();
  const reviews = await getAllReviews();
  const queryString = await searchParams;

  function matchWidget() {
    const widgetParam = queryString?.widget;
    if (!widgetParam || typeof widgetParam !== "string") return null;
    const widgetId = Number(widgetParam);
    return widgets.find((w) => w.id === widgetId) as Widget;
  }

  return (
    <>
      {queryString?.widget ? (
        <WidgetScreen widget={matchWidget()} />
      ) : (
        <WidgetTabs initialWidgets={widgets} reviews={reviews} />
      )}
    </>
  );
}
