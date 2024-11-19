import { Widget, Review } from "@/app/dashboard/dashboardUtils";
import { Star, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function WidgetScreen({ widget }: { widget: Widget }) {
  const reviewsElements = widget.reviews?.map((r: Review) => (
    <div>
      <span className="font-medium">{r.body}</span>
      <span className="ml-2 text-sm text-muted-foreground">
        {r.stars}{" "}
        <Star className="w-3 h-3 inline fill-yellow-400 stroke-yellow-400" />
      </span>
      <span className="ml-2 font-medium">{r.reviewedBy}</span>
    </div>
  ));
  return (
    <div className="container">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`?tab=allWidgets`}>
          <MoveLeft /> Back to widgets
        </Link>
      </Button>
      <h2>{widget.name}</h2>
      <p>{widget.type}</p>
      <p>Reviews:</p>
      {reviewsElements ? reviewsElements : <p>No reviews</p>}
    </div>
  );
}
