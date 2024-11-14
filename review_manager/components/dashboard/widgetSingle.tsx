import { Widget } from "@/app/dashboard/dashboardUtils";
export default function WidgetSingle({ widget }: { widget: Widget }) {
  return (
    <div className="p-4 border-solid border-2 border-gray-200">
      <h2 className="text-lg">{widget.name}</h2>
      <p className="text-sm text-gray-500">Widget type:{widget.type}</p>
      <p>Number of reviews: {widget.reviews?.length}</p>
    </div>
  );
}
