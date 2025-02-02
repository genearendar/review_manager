import { getAllReviews, addReview } from "@/lib/reviewActions";
import { Review } from "@/lib/dashboardUtils";
import { getUserData } from "@/lib/userActions";
import ReviewsContainer from "@/components/dashboard/reviewsContainer";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";

export default async function Reviews() {
  const user = await getUserData();
  const initialReviews: Review[] = await getAllReviews();

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <h2 className="text-lg mb-4">Hello {user[0].email}</h2>
        <ReviewsContainer initialReviews={initialReviews} />
      </Suspense>
    </>
  );
}
