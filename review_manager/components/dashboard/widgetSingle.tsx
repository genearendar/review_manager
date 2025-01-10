import { Widget } from "@/lib/dashboardUtils";
import { Trash2 } from "lucide-react";
import ActionButton from "./actionButton";
import { Button } from "@/components/ui/button";
import { deleteWidget } from "@/lib/widgetActions";
import Link from "next/link";
export default function WidgetSingle({ widget }: { widget: Widget }) {
  return (
    <Link href={`widgets/${widget.id}`}>
      <div className="flex flex-col p-4 border-solid border-2 border-gray-200 hover:border-gray-400 rounded-md">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl">{widget.name}</h2>
            <p className="text-sm text-gray-500">Widget type:{widget.type}</p>
          </div>
          {widget.published ? (
            <div className="h-min bg-green-100 py-2 px-4 rounded-lg">
              Published
            </div>
          ) : (
            <div className="h-min bg-orange-100 p-2 px-4 rounded-lg">Draft</div>
          )}
        </div>
        <p className="mt-4 text-md">
          Number of reviews: {widget.reviews?.length}
        </p>
      </div>
    </Link>
  );
}
