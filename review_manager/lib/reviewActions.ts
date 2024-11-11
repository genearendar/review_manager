"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";
import {
  Review,
  DatabaseReview,
  FetchedReview,
} from "@/app/dashboard/reviews/reviewUtils";
import { transformFromDbReview } from "@/app/dashboard/reviews/reviewUtils";
import { revalidatePath } from "next/cache";

// Return all reviews of the current user in a client safe format
export async function getAllReviews(): Promise<Review[]> {
  // Fetch current authenticated user's information
  const supabase = await createClient();
  const user = await getAuthUser();

  // Fetch reviews that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("reviews")
    .select(
      "id, body, stars, reviewed_by, date, created_at, reviewer_avatar, sources(name)"
    )
    .eq("auth_id", user.id)
    .returns<FetchedReview[]>();

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  const allReviews: Review[] = data.map((r) => transformFromDbReview(r));
  return allReviews;
}

//Add a review to the database
export async function addReview(review: Review) {
  const supabase = await createClient();
  const user = await getAuthUser();

  // Prepare the review data for DB
  const reviewData: DatabaseReview = await transformToDbReview(review, user.id);

  // Add the review passed to the function to the database
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...reviewData, auth_id: user.id }]);
  if (error) console.error("Insert error:", error);
  else console.log("Insert successful:", data);
  revalidatePath("/dashboard/reviews");
}

//transform Review to DatabaseReview by changing object keys and adding auth_id
async function transformToDbReview(review: Review, authId: string) {
  //get source_id from source for the DB
  async function getSourceId(source: Review["source"]) {
    const allSources = await getReviewSources();
    const sourceId: number =
      allSources.find((s) => s.name === source)?.id ??
      allSources.find((s) => s.name === "Other")?.id;
    return sourceId;
  }
  const sourceId = await getSourceId(review.source);

  return {
    auth_id: authId,
    body: review.body,
    stars: review.stars,
    reviewed_by: review.reviewedBy,
    source_id: sourceId,
    date: review.date,
  };
}

//Get sources and their ids to the DB
export async function getReviewSources() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("sources").select("*");

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  return data;
}

export async function deleteReview(id: number) {
  "use server";
  const supabase = await createClient();
  const { data, error } = await supabase.from("reviews").delete().match({ id });
  revalidatePath("/dashboard/reviews");
  if (error) console.error("Delete error:", error);
  else console.log("Delete successful:", data);
}
