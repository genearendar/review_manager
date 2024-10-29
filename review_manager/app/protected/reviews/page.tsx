import { getAllReviews, addReview, Review } from "@/lib/reviews";
import { getUserData } from "@/lib/user";
import ReviewForm from "@/components/dashboard/form-add-review";

export default async function Reviews() {
  const user = await getUserData();
  const reviews = await getAllReviews();

  const newReview: Review = {
    body: "This is a new review",
    stars: 5,
    reviewedBy: user[0].name,
    sourceId: 1,
    date: new Date().toISOString(),
  };

  return (
    <>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
      <h2>Reviews</h2>
      <div>{JSON.stringify(reviews, null, 2)}</div>
      <h2>Add a new review</h2>
      <ReviewForm />
    </>
  );
}
