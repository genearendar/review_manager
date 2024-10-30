"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";

export interface Review {
  id?: number;
  body: string;
  stars: number;
  source: string;
  reviewedBy?: string | null;
  date?: string | null;
  createdAt?: string | null;
  reviewerAvatar?: string | null;
}

export interface DatabaseReview {
  // Database type
  auth_id: string;
  id?: number;
  body: string;
  stars: number;
  source_id: number;
  reviewed_by?: string | null;
  date?: string | null;
  created_at?: string | null;
  reviewer_avatar?: string | null;
}

// Return all reviews of the current user in a client safe format
export async function getAllReviews() {
  // Fetch current authenticated user's information
  const supabase = await createClient();
  const user = await getAuthUser();

  // Fetch reviews that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("auth_id", user.id);

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  const allReviews: Promise<Review>[] = data.map(
    (r) => transformFromDbReview(r)
  );
  return Promise.all(allReviews);
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
}

//transform Review to DatabaseReview by changing object keys and adding auth_id
async function transformToDbReview(review: Review, authId: string) {
  //get source_id from sourcefor the DB
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

//Transform DatabaseReview to Review - remove auth_id and rename object keys
async function transformFromDbReview(
  dbReview: DatabaseReview
): Promise<Review> {
  async function getSourceFromId(
    sourceId: DatabaseReview["source_id"]
  ): Promise<string> {
    const allSources = await getReviewSources();
    const source: string = allSources.find((s) => s.id === sourceId)?.source;
    return source;
  }
  const source = await getSourceFromId(dbReview.source_id as number);

  return {
    id: dbReview.id,
    body: dbReview.body,
    stars: dbReview.stars,
    reviewedBy: dbReview.reviewed_by,
    source: source,
    date: dbReview.date,
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
