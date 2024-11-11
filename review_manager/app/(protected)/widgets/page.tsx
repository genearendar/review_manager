import { getUserData } from "@/lib/userActions";

export default async function Account() {
  const user = await getUserData();

  return (
    <>
      <h2>Your user details</h2>
      <div>{JSON.stringify(user, null, 2)}</div>
    </>
  );
}
