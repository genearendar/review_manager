import { Widget, Review } from "@/lib/dashboardUtils";
import Link from "next/link";
import WidgetScreenButtons from "./widgetScreenButtons";
import ActionButton from "@/components/dashboard/actionButton";
import CollapsibleText from "@/components/dashboard/collapsibleText";
import { Star, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publishWidget, unpublishWidget } from "@/lib/widgetActions";
import { truncateText } from "@/lib/utils";
export default function WidgetScreen({ widget }: { widget: Widget }) {
  const reviewsElements = widget.reviews?.map((r: Review) => {
    const truncatedBody = truncateText(r.body, 150);
    const reviewText = truncatedBody
      ? truncatedBody + <Button>Read more</Button>
      : r.body;
    return (
      <div key={r.id} className="mb-4">
        <div className="font-medium">
          <CollapsibleText
            text={r.body}
            length={150}
            buttonTextCollapsed="Read more"
            buttonTextExpended="Read less"
            buttonClasses="p-0 text-muted-foreground"
          />
        </div>
        <span className="ml-2 text-sm text-muted-foreground">
          {r.stars}{" "}
          <Star className="w-3 h-3 inline fill-yellow-400 stroke-yellow-400" />
        </span>
        <span className="ml-2 font-medium text-muted-foreground">
          {r.reviewedBy}
        </span>
      </div>
    );
  });
  return (
    <div className="max-w-xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`?tab=allWidgets`}>
          <MoveLeft /> Back to widgets
        </Link>
      </Button>
      <div className="flex justify-between align-center">
        <div>
          <h1 className="text-2xl">
            Widget: <span className="font-semibold">{widget.name}</span>
          </h1>
          <p className="text-md text-gray-500">{widget.type}</p>
        </div>
        {widget.published ? (
          <div className="h-min bg-green-100 py-2 px-4 rounded-lg">
            Published
          </div>
        ) : (
          <div className="h-min bg-orange-100 p-2 px-4 rounded-lg">Draft</div>
        )}
      </div>
      <h2 className="text-xl mt-4 mb-2">Reviews:</h2>
      {reviewsElements ? reviewsElements : <p>No reviews</p>}
      <WidgetScreenButtons published={widget.published} id={widget.id!} />
      {!widget.published ? (
        <ActionButton
          action={publishWidget}
          args={widget.id!}
          className="mt-4 px-4 py-2 rounded bg-green-500 hover:bg-green-600"
        >
          Publish widget
        </ActionButton>
      ) : (
        <ActionButton
          action={unpublishWidget}
          args={widget.id!}
          className="mt-4 px-4 py-2 rounded bg-orange-200 hover:bg-orange-300"
        >
          Unpublish widget
        </ActionButton>
      )}
    </div>
  );
}
