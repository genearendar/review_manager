"use client";
import { truncateText } from "@/lib/utils";
import { useState } from "react";

// Accepts text as a string, a length, and two variants of button text for expanding/collapsing
export default function CollapsibleText({
  text,
  length,
  buttonTextCollapsed,
  buttonTextExpended,
  buttonClasses,
}: {
  text: string;
  length: number;
  buttonTextCollapsed: string;
  buttonTextExpended: string;
  buttonClasses: string;
}) {
  const truncatedText = truncateText(text, length);
  const [collapsed, setCollapsed] = useState(truncatedText ? true : false);
  function toggleCollapsed() {
    if (!truncatedText) return;
    setCollapsed(!collapsed);
  }
  return (
    <div>
      {collapsed ? truncatedText : text}
      {truncatedText && <br />}
      {truncatedText && (
        <button
          type="button"
          onClick={toggleCollapsed}
          className={buttonClasses}
        >
          {collapsed ? buttonTextCollapsed : buttonTextExpended}
        </button>
      )}
    </div>
  );
}
