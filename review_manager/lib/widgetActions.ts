"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";
import { getAllReviews } from "./reviewActions";
import { Widget, Review, FetchedWidget } from "@/app/dashboard/dashboardUtils";
import { revalidatePath } from "next/cache";

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

export async function addWidget(prevState: any, formData: FormData) {
  try {
    // This will show in your terminal
    console.log("Server action triggered");
    const data = Object.fromEntries(formData);
    const reviewIds = Object.keys(data)
      .filter((key) => key.startsWith("review-")) // Only get review keys
      .map((key) => key.replace("review-", "")) // Remove 'review-' prefix
      // Or if you need numbers instead of strings:
      .map((id) => parseInt(id));
    console.log("Review ids:", reviewIds);
    console.log("Form data:", { ...formData });

    // You can also return data to the client
    revalidatePath("/dashboard/widgets");
    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating widget:", error);
    return { success: false, error: "Failed to create widget" };
  }
}
