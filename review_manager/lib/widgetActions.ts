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
  const supabase = await createClient();
  const user = await getAuthUser();
  try {
    // Get an array of review IDs for Grouped table
    const reviewIds = Object.keys(Object.fromEntries(formData))
      .filter((key) => key.startsWith("review-")) // Only get review keys
      .map((key) => key.replace("review-", "")) // Remove 'review-' prefix
      .map((id) => parseInt(id));

    // Add the data from form entry to review_groups table
    console.log(Object.fromEntries(formData));
    const { data: newGroup, error: groupError } = await supabase
      .from("review_groups")
      .insert([
        {
          name: formData.get("widgetName") as string,
          type: formData.get("widgetType") as string,
          auth_id: user.id,
        },
      ])
      .select("id")
      .single();

    if (groupError) throw groupError;

    // Create records for grouped table
    const groupedRecords = reviewIds.map((reviewId) => ({
      group_id: newGroup.id,
      review_id: reviewId,
      auth_id: user.id,
    }));

    const { error: groupedError } = await supabase
      .from("grouped")
      .insert(groupedRecords);

    if (groupedError) throw groupedError;
    // Update page data on success
    revalidatePath("/dashboard/widgets");
    console.log("Widget created successfully");
    return { success: true, data: newGroup };
  } catch (error) {
    console.error("Error creating widget:", error);
    return { success: false, error: "Failed to create widget" };
  }
}

export async function deleteWidget(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("review_groups")
    .delete()
    .match({ id });
  revalidatePath("/dashboard/widgets");
  if (error) console.error("Delete error:", error);
  else console.log("Delete successful:", data);
}
