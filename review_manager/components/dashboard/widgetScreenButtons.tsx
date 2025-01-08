import ActionButton from "./actionButton";
import { publishWidget, unpublishWidget } from "@/lib/widgetActions";
import Link from "next/link";
import { Button } from "../ui/button";
export default function WidgetScreenButtons({
  published,
  id,
}: {
  published: boolean;
  id: number;
}) {
  return (
    <div className="widget-buttons flex justify-between">
      {!published ? (
        <ActionButton
          action={publishWidget}
          args={id!}
          className="mt-4 px-4 py-2 rounded bg-green-500 hover:bg-green-600"
        >
          Publish widget
        </ActionButton>
      ) : (
        <ActionButton
          action={unpublishWidget}
          args={id!}
          className="mt-4 px-4 py-2 rounded bg-orange-200 hover:bg-orange-300"
        >
          Unpublish widget
        </ActionButton>
      )}
    </div>
  );
}

// {!widget.published ? (
// <ActionButton
//   action={publishWidget}
//   args={widget.id!}
//   className="mt-4 px-4 py-2 rounded bg-green-500 hover:bg-green-600"
// >
//   Publish widget
// </ActionButton>
// ) : (
//   <ActionButton
//     action={unpublishWidget}
//     args={widget.id!}
//     className="mt-4 px-4 py-2 rounded bg-orange-200 hover:bg-orange-300"
//   >
//     Unpublish widget
//   </ActionButton>
// )}
// )
