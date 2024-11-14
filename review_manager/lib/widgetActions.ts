"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";
import { getAllReviews } from "./reviewActions";
import { Widget, Review, FetchedWidget } from "@/app/dashboard/dashboardUtils";

export async function getAllWidgets() {
  const supabase = await createClient();
  const user = await getAuthUser();
  const allReviews = await getAllReviews();
  // Fetch widgets that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("review_groups")
    .select(
      `id, 
        name,
        type, 
        grouped!left(
          reviews(id)
        )`
    )
    .eq("auth_id", user.id)
    .returns<FetchedWidget[]>();
  if (error) {
    throw new Error(`Error fetching widgets: ${error.message}`);
  }
  const reviewsMap: Map<number | undefined, Review> = new Map(
    allReviews.map((review) => [review.id, review])
  );

  const allWidgets = data.map((w) => ({
    id: w.id,
    name: w.name,
    type: w.type,
    reviews: w.grouped.length
      ? w.grouped
          .map((r) => r.reviews) // Get reviews from grouped
          .map((rev: any) => reviewsMap.get(rev.id))
      : null, // Get matching review from Map
  }));

  return allWidgets as Widget[];
}
