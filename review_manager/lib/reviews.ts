"use server";

import { createClient } from "@/utils/supabase/server";

export interface Review {
  body: string;
  stars: number;
  reviewedBy?: string;
  sourceId?: number;
  date?: string;
}

export interface DatabaseReview {
  // Database type
  auth_id: string;
  body: string;
  stars: number;
  reviewed_by?: string;
  source_id?: number;
  date?: string;
}

// Returns all reviews of the current user
export async function getAllReviews() {
  // Fetch current authenticated user's information
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ensure we have a user to query by `auth_id`
  if (!user) {
    throw new Error("User not found");
  }

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
  // Fetch current authenticated user's information
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ensure we have a user to query by `auth_id`
  if (!user) {
    throw new Error("User not found.");
  }
  // Prepare the review data for DB
  const reviewData: DatabaseReview = transformToDbReview(review, user.id);

  // Add the review passed to the function to the database
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...reviewData, auth_id: user.id }]);
  console.log("insert data", data);
  if (error) console.error("Insert error:", error);
  else console.log("Insert successful:", data);
}

//transforms Review to DatabaseReview by changing keys and adding auth_id
export function transformToDbReview(review: Review, authId: string) {
  return {
    auth_id: authId,
    body: review.body,
    stars: review.stars,
    reviewed_by: review.reviewedBy,
    source_id: review.sourceId,
    date: review.date,
  };
}