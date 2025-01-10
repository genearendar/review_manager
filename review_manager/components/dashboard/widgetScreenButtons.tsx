import ActionButton from "./actionButton";
import {
  publishWidget,
  unpublishWidget,
  deleteWidget,
} from "@/lib/widgetActions";
import Link from "next/link";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
export default function WidgetScreenButtons({
  published,
  id,
}: {
  published: boolean;
  id: number;
}) {
  return (
    <div className="widget-buttons mt-4">
      {!published ? (
        <div className="flex align-center justify-between">
          <ActionButton
            action={publishWidget}
            args={id!}
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600"
          >
            Publish widget
          </ActionButton>
          <ActionButton action={deleteWidget} args={id} className="py-2">
            <Trash2 className="text-gray-600 hover:text-red-600" />
          </ActionButton>
        </div>
      ) : (
        <>
          <ActionButton
            action={unpublishWidget}
            args={id!}
            className="px-4 py-2 rounded bg-orange-200 hover:bg-orange-300"
          >
            Unpublish widget
          </ActionButton>
          <div className="mt-6">
            <h3 className="text-lg font-medium">Export widget</h3>
            <p className="text-base">
              To embed this widget on your website, copy and paste the following
              code on the page where you want it to appear:
            </p>
            <div className="border-2 rounded-xl mt-4">
              <div className="text-sm bg-gray-200 p-2">HTML</div>
              <div className="p-2">
                <code>
                  {`<script 
                  src="${process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL}" 
                  data-widget-id="${id}"></script>`}
                </code>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
