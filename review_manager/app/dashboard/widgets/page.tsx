import { getAllWidgets } from "@/lib/widgetActions";
import { getAllReviews } from "@/lib/reviewActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";

export default async function Account() {
  const widgets = await getAllWidgets();
  const reviews = await getAllReviews();

  return (
    <>
      <h2 className="text-4xl mb-4">Your widgets</h2>
      <WidgetTabs initialWidgets={widgets} reviews={reviews} />
    </>
  );
}
