import { getAllReviews, addReview } from "@/lib/reviewActions";
import  { Review } from "@/app/protected/reviews/reviewUtils";
import { getUserData } from "@/lib/userActions";
import ReviewForm from "@/components/dashboard/form-add-review";
import ReviewsContainer from "@/components/dashboard/reviewsContainer";

export default async function Reviews() {
  const user = await getUserData();
  const initialReviews: Review[] = await getAllReviews();

  return (
    <>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
      <ReviewForm />
      <ReviewsContainer initialReviews={initialReviews} />

    </>
  );
}
