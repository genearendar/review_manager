import { Widget, Review } from "@/lib/dashboardUtils";
import Link from "next/link";
import WidgetScreenButtons from "./widgetScreenButtons";
import ActionButton from "@/components/dashboard/actionButton";
import CollapsibleText from "@/components/dashboard/collapsibleText";
import { Star, MoveLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
export default function WidgetScreen({ widget }: { widget: Widget }) {
  const reviewsElements = widget.reviews?.map((r: Review) => {
    const truncatedBody = truncateText(r.body, 150);
    const reviewText = truncatedBody
      ? truncatedBody + <Button>Read more</Button>
      : r.body;
    return (
      <div key={r.id} className="mb-4">
        <div className="text-base">
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
        <Link href={"."}>
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
        <div className="flex gap-2 align-center">
          <Button variant="ghost">
            <Pencil className="text-gray-600 hover:text-black" />
          </Button>
          {widget.published ? (
            <div className="h-min bg-green-100 py-2 px-4 rounded-lg">
              Published
            </div>
          ) : (
            <div className="h-min bg-orange-100 p-2 px-4 rounded-lg">Draft</div>
          )}
        </div>
      </div>
      <h2 className="text-xl mt-4 mb-2">Reviews:</h2>
      {reviewsElements ? reviewsElements : <p>No reviews</p>}
      <WidgetScreenButtons published={widget.published} id={widget.id!} />
    </div>
  );
}
