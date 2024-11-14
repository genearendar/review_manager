"use client";

export default function ButtonForm({
  action,
  children,
  args,
}: {
  action: (a?: any) => Promise<void>;
  children: React.ReactNode;
  args: any;
}) {
  const handleSubmit = args ? action.bind(null, args) : action;
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

  return <form action={handleSubmit}>{children}</form>;
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
