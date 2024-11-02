"use client";
export default function TempButton({
  children,
  id,
  action,
}: {
  children: React.ReactNode;
  id: number;
  action: (id: number) => void;
}) {
  return <button onClick={() => action(id)}>{children}</button>;
}
