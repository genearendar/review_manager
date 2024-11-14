"use client";
import { useFormStatus } from "react-dom";

export default function ButtonFormSubmit({
  children,
  pendingText = "Submitting...",
  ...props
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}
