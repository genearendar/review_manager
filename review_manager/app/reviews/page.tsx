import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = await createClient();
  const { data: reviews } = await supabase.from("reviews").select();

  return <div>{JSON.stringify(reviews, null, 2)}</div>;
}
