import { createClient } from "@/utils/supabase/server";

export interface Review {
  body: string;
  stars: number;
  reviewedBy?: string;
  sourceId?: number;
  date?: string;
}

// Returns all reviews of the current user
export async function getAllReviews() {
  // Fetch current authenticated user's information
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }

  // Ensure we have a user to query by `auth_id`
  if (!user || !user.id) {
    throw new Error("User not authenticated.");
  }

  // Fetch reviews that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("auth_id", user.id); // Assuming 'auth_id' is the field in the 'reviews' table

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  console.log(data);
  return data;
}

export async function addReview(review: Review) {
  const supabase = await createClient();
  // Fetch current authenticated user's information
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }
  // Ensure we have a user to query by `auth_id`
  if (!user || !user.id) {
    throw new Error("User not authenticated.");
  }
  const reviewData = {
    body: review.body,
    stars: review.stars,
    reviewed_by: review.reviewedBy, // Map to the database key
    source_id: review.sourceId, // Map to the database key
    date: review.date,
  };
  // Add the review passed to the functionto the database
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...reviewData, auth_id: user.id }]);
  console.log("insert data", data);
  if (error) console.error("Insert error:", error);
  else console.log("Insert successful:", data);
}
