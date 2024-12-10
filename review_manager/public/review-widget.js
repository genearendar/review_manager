(function () {
  function loadReviewWidget(widgetId) {
    console.log("running the function");
    // Create a container for the widget
    const container = document.createElement("div");
    container.id = `review-widget-${widgetId}`;
    container.style.cssText =
      "font-family: Arial, sans-serif; max-width: 300px; margin: 20px auto; padding: 15px; border: 1px solid #ddd; border-radius: 8px;";

    // Add a loading message
    container.innerHTML = "<p>Loading reviews...</p>";

    // Insert the container into the page
    document.currentScript.parentNode.insertBefore(
      container,
      document.currentScript.nextSibling
    );

    // Fetch the widget data
    fetch(`https://review-manager-cyan.vercel.app/api/widgets?id=${widgetId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // renderWidget(container, data);
      })
      .catch((error) => {
        console.error("Error loading widget:", error);
        container.innerHTML =
          "<p>Error loading reviews. Please try again later.</p>";
      });
  }

  // function renderWidget(container, data) {
  //   // Apply custom styles
  //   Object.assign(container.style, data.styles.container);

  //   // Create the HTML structure for your widget based on the data
  //   let html = `
  //     <h3 style="${Object.entries(data.styles.title)
  //       .map(([k, v]) => `${k}:${v}`)
  //       .join(";")}">${data.title}</h3>
  //     <div style="${Object.entries(data.styles.reviewsContainer)
  //       .map(([k, v]) => `${k}:${v}`)
  //       .join(";")}">
  //   `;

  //   data.reviews.forEach((review) => {
  //     html += `
  //       <div style="${Object.entries(data.styles.review)
  //         .map(([k, v]) => `${k}:${v}`)
  //         .join(";")}">
  //         <p style="${Object.entries(data.styles.reviewContent)
  //           .map(([k, v]) => `${k}:${v}`)
  //           .join(";")}">${review.content}</p>
  //         <p style="${Object.entries(data.styles.reviewAuthor)
  //           .map(([k, v]) => `${k}:${v}`)
  //           .join(";")}">- ${review.author}</p>
  //         ${
  //           review.rating
  //             ? `<div style="${Object.entries(data.styles.rating)
  //                 .map(([k, v]) => `${k}:${v}`)
  //                 .join(
  //                   ";"
  //                 )}">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>`
  //             : ""
  //         }
  //       </div>
  //     `;
  //   });

  //   html += `
  //     </div>
  //     <a href="${data.moreLink}" style="${Object.entries(data.styles.moreLink)
  //       .map(([k, v]) => `${k}:${v}`)
  //       .join(";")}">See more reviews</a>
  //   `;

  //   if (data.poweredBy) {
  //     html += `<div style="${Object.entries(data.styles.poweredBy)
  //       .map(([k, v]) => `${k}:${v}`)
  //       .join(";")}">Powered by ${data.poweredBy}</div>`;
  //   }

  //   container.innerHTML = html;

  //   // Add any custom scripts
  //   if (data.customScripts) {
  //     const script = document.createElement("script");
  //     script.textContent = data.customScripts;
  //     container.appendChild(script);
  //   }
  // }

  // Look for a script tag with data-widget-id attribute
  const widgetId = document.currentScript.getAttribute("data-widget-id");

  if (widgetId) {
    loadReviewWidget(widgetId);
  } else {
    console.error("Review widget error: No widget ID provided");
  }
})();
