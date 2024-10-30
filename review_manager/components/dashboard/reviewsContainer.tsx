import { getAllReviews, addReview, Review } from "@/lib/reviews";
import SingleReviewBox from "./singleReviewBox";

export default async function ReviewsContainer() {
  const reviews: Review[] = await getAllReviews();

  if (!reviews) {
    return <div>No reviews</div>;
  }

  const reviewComponents = reviews.map((review: Review) => (
    <SingleReviewBox key={review.id} review={review} />   
  ))
  return <div>{JSON.stringify(reviews, null, 2)}</div>;
}
