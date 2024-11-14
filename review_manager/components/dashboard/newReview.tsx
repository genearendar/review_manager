"use client";
import ReviewForm from "./reviewForm";
import TempButton from "./tempButton";
import ReviewModal from "./reviewModal";
import { useState } from "react";
import { SquarePlus } from "lucide-react";

export default function NewReview() {
  const [formToggle, setFormToggle] = useState(false);
  function toggleForm() {
    console.log("Toggle running");
    setFormToggle((prevToggle) => !prevToggle);
  }
  return (
    <>
      {!formToggle && (
        <TempButton action={toggleForm}>
          <span className="flex gap-2 items-center">
            <SquarePlus size={36} strokeWidth={1.25} /> Add review
          </span>
        </TempButton>
      )}
      {/* {formToggle && <ReviewForm toggle={toggleForm} />} */}
      {formToggle && (
        <ReviewModal isOpen={formToggle} setIsOpen={toggleForm}>
          <ReviewForm toggle={toggleForm} />
        </ReviewModal>
      )}
    </>
  );
}
