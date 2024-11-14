"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ActionButton({
  action,
  children,
  args,
  classes
}: {
  action: (a?: any) => Promise<void>;
  children: React.ReactNode;
  args: any;
  classes?: string;
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
        setError(e instanceof Error ? e.message : "Error performing a server action");
      }
    });
  };
  return <button className={classes} onClick={handleClick}>{children}</button>;
  //return <form action={handleSubmit}>{children}</form>;
}

// ("use client");

// import { useState } from "react";
// import { useTransition } from "react";
// import { Button } from "@/components/ui/button";

// interface ButtonFormProps<T> {
//   action: (args: T) => Promise<void>;
//   children: React.ReactNode;
//   args: T;
//   className?: string;
// }

// export default function ButtonForm<T>({ action, children, args, className }: ButtonFormProps<T>) {
//   const [isPending, startTransition] = useTransition()
//   const [error, setError] = useState<string | null>(null)

//   const handleClick = () => {
//     setError(null)
//     startTransition(async () => {
//       try {
//         await action(args)
//       } catch (e) {
//         setError(e instanceof Error ? e.message : 'An error occurred')
//       }
//     })
//   }

//   return (
//     <div>
//       <Button onClick={handleClick} disabled={isPending} className={className}>
//         {isPending ? 'Processing...' : children}
//       </Button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   )
// }
