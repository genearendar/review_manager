"use client";

import Script from "next/script";

export default function ScriptLoader() {
  return (
    <div>
      <Script
        src="https://review-manager-cyan.vercel.app/review-widget.js"
        data-widget-id="59"
        strategy="lazyOnload"
      />
      {/* rest of your component */}
    </div>
  );
}
