import { Review } from "@/app/protected/reviews/reviewUtils";
export default function SingleReviewBox({ review }: { review: Review }) {
  return (
    <div>
      <h3>{review.body}</h3>
      <p>Stars: {review.stars}</p>
      <p>Reviewed by: {review.reviewedBy}</p>
      <p>Source: {review.source}</p>
      <p>Date: {review.date}</p>
    </div>
  );
}
