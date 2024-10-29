import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getAuthUser(): Promise<User> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  return user;
}