"use client";
import TempButton from "./tempButton";
import { useState } from "react";
export default function NewReview({ children }: { children: React.ReactNode }) {
  const [formToggle, setFormToggle] = useState(false);
  function toggleForm() {
    setFormToggle((prevToggle) => !prevToggle);
  }
  return (
    <>
      <TempButton action={toggleForm}>Add review</TempButton>
      {formToggle && children}
    </>
  );
}
