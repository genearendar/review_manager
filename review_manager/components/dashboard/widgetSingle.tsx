import { Widget } from "@/app/dashboard/dashboardUtils";
import { X } from "lucide-react";
import ActionButton from "./actionButton";
import { deleteWidget } from "@/lib/widgetActions";
export default function WidgetSingle({ widget }: { widget: Widget }) {
  return (
    <div className="flex flex-col p-4 border-solid border-2 border-gray-200 rounded-md">
      <h2 className="text-xl">{widget.name}</h2>
      <p className="text-sm text-gray-500">Widget type:{widget.type}</p>
      <p className="mt-4 text-md">
        Number of reviews: {widget.reviews?.length}
      </p>
      <div className="button-group, flex-initial mt-4">
        <ActionButton
          action={deleteWidget}
          args={widget.id!}
          className="rounded py-2 px-4 bg-red-500"
        >
          Delete widget
          {/* <X size={16} className="text-gray-600 hover:text-black" /> */}
        </ActionButton>
      </div>
    </div>
  );
}
