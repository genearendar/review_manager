import { addReview } from "@/lib/reviewActions";
import {
  Review,
  FetchedReview,
  DatabaseReview,
  transformFromDbReview,
} from "@/app/protected/reviews/reviewUtils";
import SingleReviewBox from "./singleReviewBox";

export default async function ReviewsContainer({ initialReviews }: { initialReviews: Review[] }) {
  if (!initialReviews) {
    return <div>No reviews</div>;
  }
  const reviewComponents = initialReviews.map((review: Review) => {
    return <SingleReviewBox key={review.id} review={review} />;
  });
  return <div>{reviewComponents}</div>;
}
