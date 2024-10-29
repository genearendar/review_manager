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

// Returns all reviews of the current user
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
  return data;
}

export async function addReview(review: Review) {
  const supabase = await createClient();
  const user = await getAuthUser();

  //transform Review to DatabaseReview by changing keys and adding auth_id
  async function transformToDbReview(review: Review, authId: string) {
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

  // Prepare the review data for DB
  const reviewData: DatabaseReview = await transformToDbReview(review, user.id);

  // Add the review passed to the function to the database
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...reviewData, auth_id: user.id }]);
  if (error) console.error("Insert error:", error);
  else console.log("Insert successful:", data);
}

export async function getReviewSources() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("sources").select("*");

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  return data;
}
