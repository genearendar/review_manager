import { createClient } from "@/utils/supabase/server";

export async function getUserData() {
  // Fetch current authenticated user's information
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");  // This should never happen in protected routes
  }

  // Fetch User data that match the authenticated user's `auth_id`
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id);
    
  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  return data;
}