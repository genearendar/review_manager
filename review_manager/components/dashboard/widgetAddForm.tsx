"use client";

// @ts-ignore
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Review } from "@/lib/dashboardUtils";
import { Star } from "lucide-react";
import { addWidget } from "@/lib/widgetActions";
import CollapsibleText from "./collapsibleText";

export default function AddWidgetForm({ reviews }: { reviews: Review[] }) {
  const [widgetReviews, setWidgetReviews] = useState(
    reviews.map((r) => {
      return { ...r, selected: false };
    })
  );
  const [actionState, formAction] = useActionState(addWidget, null);
  const router = useRouter();

  // If the form action is complete, switch to All widgets tab
  if (actionState) {
    router.push(`?widget=${actionState.data.id}`);
  }
  //build the review checkboxes
  const reviewBoxes = widgetReviews.map((review) => (
    <div key={review.id} className="flex items-top space-x-2">
      <Checkbox
        id={`review-${review.id}`}
        name={`review-${review.id}`}
        checked={review.selected || false}
        onCheckedChange={() =>
          setWidgetReviews((prev) =>
            prev.map((r) =>
              r.id === review.id ? { ...r, selected: !r.selected } : r
            )
          )
        }
        className="mt-1"
      />
      <Label
        htmlFor={`review-${review.id}`}
        className="flex flex-wrap items-center"
      >
        <div className="font-medium mr-2">
          <CollapsibleText
            text={review.body}
            length={150}
            buttonTextCollapsed="Read more"
            buttonTextExpended="Read less"
            buttonClasses="p-0 mt-1 text-muted-foreground"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          ({review.stars}{" "}
          <Star className="w-3 h-3 inline fill-yellow-400 stroke-yellow-400" />)
        </span>
        <span className="ml-2 font-medium">{review.reviewedBy}</span>
      </Label>
    </div>
  ));

  return (
    <form className="space-y-4 max-w-xl" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="widgetName">Widget Name</Label>
        <Input
          id="widgetName"
          name="widgetName"
          placeholder="Enter widget name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="widgetType">Widget Type</Label>
        <Select name="widgetType">
          <SelectTrigger id="widgetType">
            <SelectValue placeholder="Select widget type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slider">Slider</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Select Reviews to Include</Label>
        {reviewBoxes}
      </div>
      <Button type="submit">Create Widget</Button>
    </form>
  );
}
