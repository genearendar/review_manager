import { createClient } from "@/utils/supabase/server";

export interface Review {
  body: string;
  starRating: number;
  reviewedBy?: string;
  reviewSource?: string;
  date?: string;
}

// Returns all reviews of the current user
export async function getAllReviews() {
  // Fetch current authenticated user's information
  const supabase = await createClient()
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }

  // Ensure we have a user to query by `auth_id`
  if (!user || !user.id) {
    throw new Error('User not authenticated.');
  }

  // Fetch reviews that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('auth_id', user.id); // Assuming 'auth_id' is the field in the 'reviews' table

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
  console.log(data)
  return data;
}

export async function addReview(review: Review) {
  const supabase = await createClient()
  // Fetch current authenticated user's information
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }
  // Ensure we have a user to query by `auth_id`
  if (!user || !user.id) {
    throw new Error('User not authenticated.');
  }
  // Add the review passed to the functionto the database
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      review
  ]);

if (error) console.error('Insert error:', error);
else console.log('Insert successful:', data);
}
