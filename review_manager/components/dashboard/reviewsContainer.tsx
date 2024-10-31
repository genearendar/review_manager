// "use client";
import { Review } from "@/app/protected/reviews/reviewUtils";
import { useState } from "react";
import SingleReviewBox from "./singleReviewBox";

export default function ReviewsContainer({
  initialReviews,
}: {
  initialReviews: Review[];
}) {
  if (!initialReviews) {
    return <div>No reviews</div>;
  }
  // const [allReviews, setAllReviews] = useState(initialReviews);
  const reviewComponents = initialReviews.map((review: Review) => {
    return <SingleReviewBox key={review.id} review={review} />;
  });
  return (
    <>
    <h2>Reviews</h2>
    {reviewComponents}
    </>
  );
}
