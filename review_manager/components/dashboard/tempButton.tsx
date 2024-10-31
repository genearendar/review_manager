"use client";
export default function TempButton({ children, action }: { children: React.ReactNode, action: () => void }) {
  return <button onClick = {action}>{children}</button>;
}
