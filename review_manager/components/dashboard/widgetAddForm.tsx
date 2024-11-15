"use client";

import { useState } from "react";
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
import { Review } from "@/app/dashboard/dashboardUtils";
import { Star } from "lucide-react";

export default function AddWidgetForm({ reviews }: { reviews: Review[] }) {
  const [widgetReviews, setWidgetReviews] = useState(
    reviews.map((r) => {
      return { ...r, selected: false };
    })
  );
  const selectedReviews = widgetReviews.filter((r) => r.selected);
  //build the review checkboxes
  const reviewBoxes = widgetReviews.map((review) => (
    <div key={review.id} className="flex items-center space-x-2">
      <Checkbox
        id={`review-${review.id}`}
        checked={
          review.selected || false
        }
        onCheckedChange={() => 
          setWidgetReviews((prev) => 
            prev.map((r) => 
              r.id === review.id ? { ...r, selected: !r.selected } : r
            )
          )
        }
      />
      <Label htmlFor={`review-${review.id}`} className="flex items-center">
        <span className="font-medium">{review.body}</span>
        <span className="ml-2 text-sm text-muted-foreground">
          ({review.stars}{" "}
          <Star className="w-3 h-3 inline fill-yellow-400 stroke-yellow-400" />)
        </span>
        <span className="ml-2 font-medium">{review.reviewedBy}</span>
      </Label>
    </div>
  ));
  
  
  
  return (
    <form className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="widget-name">Widget Name</Label>
        <Input id="widget-name" placeholder="Enter widget name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="widget-type">Widget Type</Label>
        <Select>
          <SelectTrigger id="widget-type">
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
      {/* Color Scheme */}
      {/* <div className="space-y-2">
        <Label>Color Scheme</Label>
        <RadioGroup defaultValue="light" className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
        </RadioGroup>
      </div> */}
      {/* <div className="space-y-2">
        <Label>Number of Reviews</Label>
        <Slider defaultValue={[3]} max={10} step={1} className="w-[60%]" />
      </div> */}
      {/* Show rating */}
      {/* <div className="flex items-center space-x-2">
        <Switch id="show-rating" />
        <Label htmlFor="show-rating">Show Rating</Label>
      </div> */}
      <Button type="submit">Create Widget</Button>
    </form>
  );
}
