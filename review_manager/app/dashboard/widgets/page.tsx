import { getAllWidgets } from "@/lib/widgetActions";
import WidgetTabs from "@/components/dashboard/widgetTabs";

export default async function Account() {
  const widgets = await getAllWidgets();

  return (
    <>
      <h2>Your widgets</h2>
      <WidgetTabs initialWidgets={widgets} />
    </>
  );
}
