"use client";
import { useEffect } from "react";

export default function ReviewWidgetLoader({ widgetId }: { widgetId: string }) {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL as string;
    script.setAttribute("data-widget-id", widgetId);

    // Create a container div that the script will target
    const container = document.createElement("div");
    container.id = `review-widget-container-${widgetId}`;

    // Insert both into the DOM
    const targetElement = document.getElementById("review-widget-mount");
    if (targetElement) {
      targetElement.appendChild(container);
      targetElement.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      script.remove();
      container?.remove();
    };
  }, [widgetId]);

  return <div id="review-widget-mount" />;
}
