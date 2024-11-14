import { Widget } from "@/app/dashboard/dashboardUtils";
export default function WidgetSingle({ widget }: { widget: Widget }) {
  return (
    <div className="flex flex-col p-4 border-solid border-2 border-gray-200 rounded-md">
      <h2 className="text-xl">{widget.name}</h2>
      <p className="text-sm text-gray-500">Widget type:{widget.type}</p>
      <p className="mt-4 text-md">
        Number of reviews: {widget.reviews?.length}
      </p>
    </div>
  );
}
