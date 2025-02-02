import { getUserData } from "@/lib/userActions";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";

export default async function Account() {
  const user = await getUserData();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
    </Suspense>
  );
}
