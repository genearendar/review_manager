import {
  getAllReviews,
  addReview,
  Review,
  DatabaseReview,
  transformFromDbReview,
} from "@/lib/reviews";
import SingleReviewBox from "./singleReviewBox";
import { promiseHooks } from "v8";

export default async function ReviewsContainer() {
  const reviews: DatabaseReview[] = await getAllReviews();
  if (!reviews) {
    return <div>No reviews</div>;
  }
  const reviewComponents = await Promise.all(
    reviews.map(async (dbReview: DatabaseReview) => {
      const review = await transformFromDbReview(dbReview);
      return <SingleReviewBox key={dbReview.id} review={review} />;
    })
  );
  return <div>{reviewComponents}</div>;
}
