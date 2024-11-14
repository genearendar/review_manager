import { Review } from "@/app/dashboard/dashboardUtils";
import SingleReviewBox from "./singleReviewBox";
import NewReview from "./newReview";
import ReviewTable from "./reviewTable";

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
    <div>
      <NewReview />
      <h2 className="my-4 text-4xl text-center ">Reviews</h2>
      <ReviewTable>{reviewComponents}</ReviewTable>
    </div>
  );
}
