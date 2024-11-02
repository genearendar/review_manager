"use client";
import ReviewForm from "./reviewForm";
import TempButton from "./tempButton";
import { useState } from "react";
export default function NewReview() {
  const [formToggle, setFormToggle] = useState(false);
  function toggleForm() {
    setFormToggle((prevToggle) => !prevToggle);
    console.log(formToggle);
  }
  return (
    <>
      {!formToggle && <TempButton action={toggleForm}>Add review</TempButton>}
      {formToggle && <ReviewForm toggle={toggleForm} />}
    </>
  );
}
