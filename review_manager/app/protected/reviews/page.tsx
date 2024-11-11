import { getAllReviews, addReview } from "@/lib/reviewActions";
import { Review } from "@/app/protected/reviews/reviewUtils";
import { getUserData } from "@/lib/userActions";
import ReviewForm from "@/components/dashboard/reviewForm";
import ReviewsContainer from "@/components/dashboard/reviewsContainer";

export default async function Reviews() {
  const user = await getUserData();
  const initialReviews: Review[] = await getAllReviews();
  console.log(user);

  return (
    <>
      <h2 className="text-lg mb-4">Hello {user[0].email}</h2>
      <ReviewsContainer initialReviews={initialReviews} />
    </>
  );
}
