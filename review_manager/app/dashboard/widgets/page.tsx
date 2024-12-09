import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";
import WidgetScreen from "@/components/dashboard/widgetScreen";
import { Widget } from "@/app/dashboard/dashboardUtils";

export default async function Widgets({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) {
  const widgets = await getAllWidgets();
  const reviews = await getAllReviews();

  const widgetParam = await searchParams?.widget;
  const widgetToShow = widgetParam
    ? widgets.find((w) => w.id === Number(widgetParam)) || null
    : null;

  return (
    <>
      {widgetToShow ? (
        <WidgetScreen widget={widgetToShow as Widget} />
      ) : (
        <WidgetTabs initialWidgets={widgets} reviews={reviews} />
      )}
    </>
  );
}
