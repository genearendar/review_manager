"use client";

import { useTransition, useState } from "react";

export default function ActionButton({
  action,
  children,
  args,
  className,
}: {
  action: (a?: any) => Promise<void>;
  children: React.ReactNode;
  args: any;
  className?: string;
}) {
  const handleSubmit = args ? action.bind(null, args) : action;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        await action(args);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Error performing a server action"
        );
      }
    });
  };
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}