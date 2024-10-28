import { createClient } from "@/utils/supabase/server";

export async function getUserData() {
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

  // Fetch User data that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id);

  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  console.log(data);
  return data;
}
