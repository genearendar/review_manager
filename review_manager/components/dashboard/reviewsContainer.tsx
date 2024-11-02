import { Review } from "@/app/protected/reviews/reviewUtils";
import SingleReviewBox from "./singleReviewBox";
import NewReview from "./newReview";
import ReviewForm from "./reviewForm";

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
      <NewReview />
      <h2>Reviews</h2>
      {reviewComponents}
    </>
  );
}
