import { createClient } from "@/utils/supabase/server";
import { getAllReviews } from "@/lib/reviews";
import { getUserData } from "@/lib/user";

export default async function Reviews() {
  const user = await getUserData();
  const reviews = await getAllReviews();

  return (
    <>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
      <h2>Reviews</h2>
      <div>{JSON.stringify(reviews, null, 2)}</div>
    </>
  );
}
