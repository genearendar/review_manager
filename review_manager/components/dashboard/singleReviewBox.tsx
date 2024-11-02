import { Review } from "@/app/protected/reviews/reviewUtils";
import TempButton from "./tempButton";
import { deleteReview } from "@/lib/reviewActions";

export default function SingleReviewBox({ review }: { review: Review }) {
  return (
    <>
      <div>
        <h3>{review.body}</h3>
        <p>Stars: {review.stars}</p>
        <p>Reviewed by: {review.reviewedBy}</p>
        <p>Source: {review.source}</p>
        <p>Date: {review.date}</p>
      </div>
      <div>
      <TempButton action={deleteReview.bind(null, review.id!)}>
        Delete
      </TempButton>
      </div>
    </>
  );
}
