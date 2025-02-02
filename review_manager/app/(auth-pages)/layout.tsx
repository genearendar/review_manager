export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-7xl flex flex-col gap-12 items-center py-12">{children}</main>
  );
}
