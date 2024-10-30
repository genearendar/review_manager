import { getAllReviews, addReview, Review } from "@/lib/reviews";
import { getUserData } from "@/lib/user";
import ReviewForm from "@/components/dashboard/form-add-review";
import ReviewsContainer from "@/components/dashboard/reviewsContainer";

export default async function Reviews() {
  const user = await getUserData();
  const reviews = await getAllReviews();

  return (
    <>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
      <h2>Reviews</h2>
      <ReviewsContainer />
      <h2>Add a new review</h2>
      <ReviewForm />
    </>
  );
}
