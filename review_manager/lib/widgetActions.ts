"use server";

import { createClient } from "@/utils/supabase/server";
import { getAuthUser } from "@/utils/supabase/auth-actions";
import { getAllReviews, getWidgetReviews } from "./reviewActions";
import { Widget, Review, FetchedWidget } from "@/app/dashboard/dashboardUtils";
import { revalidatePath } from "next/cache";

// Get all widget for an authenticated user
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
        ),
        published`
    )
    .eq("auth_id", user.id)
    .returns<FetchedWidget[]>();
  if (error) {
    throw new Error(`Error fetching widgets: ${error.message}`);
  }

  // Get reviews that are part of widgets:
  // Map review ids to review objects
  const reviewsMap: Map<number | undefined, Review> = new Map(
    allReviews.map((review) => [review.id, review])
  );
  // Build final widget objects
  const allWidgets = data.map((w) => ({
    id: w.id,
    name: w.name,
    type: w.type,
    reviews: w.grouped.length
      ? w.grouped
          .map((r) => r.reviews) // Get reviews from grouped
          .map((rev: any) => reviewsMap.get(rev.id))
      : null, // Get matching review from Map
    published: w.published,
  }));

  return allWidgets as Widget[];
}

//Add a widget to the database
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

//Delete widget from a DB (deletes record from Grouped table too)
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

// Get a public widget by id (for API)
export async function getPublicWidget(id: number) {
  const supabase = await createClient();
  const { data: widgetData, error } = await supabase
    .from("review_groups")
    .select(
      `id, 
        name,
        type, 
        grouped!left(
          reviews(id)
        )`
    )
    .eq("id", id)
    .eq("published", true)
    .single();
  if (error) {
    throw new Error(`Error fetching the widget: ${error.message}`);
  }

  let widgetReviews: Review[] | null = null;

  try {
    widgetReviews = await getWidgetReviews(widgetData.id);
  } catch (error) {
    console.error("Error fetching widget reviews:", error);
    widgetReviews = null;
  }
  const widget: Widget = {
    id: widgetData.id,
    name: widgetData.name,
    type: widgetData.type,
    reviews: widgetReviews,
  };

  return widget;
}

// Publish a widget

export async function publishWidget(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("review_groups")
    .update({ published: true })
    .match({ id });
  revalidatePath("/dashboard/widgets");
  if (error) console.error("Publish error:", error);
  else console.log("Publish successful:", data);
}

export async function unpublishWidget(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("review_groups")
    .update({ published: false })
    .match({ id });
  revalidatePath("/dashboard/widgets");
  if (error) console.error("Unublish error:", error);
  else console.log("Unublish successful:", data);
}
