"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";
import { Review, DatabaseReview, FetchedReview } from "@/lib/dashboardUtils";
import { transformFromDbReview } from "@/lib/dashboardUtils";
import { revalidatePath } from "next/cache";

// Return all reviews of the current user
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

// Get all reviews for a specific widget
export async function getWidgetReviews(id: number): Promise<Review[]> {
  const supabase = await createClient();
  console.log("Getting reviews for widget ID:", id);
  // Fetch reviews that are associated with the grouped table for the specified widget_id
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id, body, stars, reviewed_by, date, created_at, reviewer_avatar, 
      sources(name), 
      grouped!inner(group_id)
      `
    )
    .eq("grouped.group_id", id)
    .returns<FetchedReview[]>();

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  console.log("Fetched reviews:", data);

  const widgetReviews: Review[] = data.map((r) => {
    console.log("Running transform on:", r);
    let result = transformFromDbReview(r);
    console.log("Result:", result);
    return result;
  });
  console.log("Widget reviews:", widgetReviews);
  return widgetReviews;
}

//Add a review to the database
export async function addReview(formData: FormData) {
  const supabase = await createClient();
  const user = await getAuthUser();

  const dateValue = formData.get("date")?.toString();
  const review: Review = {
    body: formData.get("body") as string,
    stars: Number(formData.get("stars")),
    reviewedBy: (formData.get("reviewedBy") as string) ?? undefined,
    source: formData.get("source") as string,
    date: dateValue !== "" ? dateValue : null,
  };

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

export async function deleteReview(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reviews").delete().match({ id });
  revalidatePath("/dashboard/reviews");
  if (error) console.error("Delete error:", error);
  else console.log("Delete successful:", data);
}

// Util functions:

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

//Get sources and their ids from the DB
export async function getReviewSources() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("sources").select("*");

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  return data;
}
