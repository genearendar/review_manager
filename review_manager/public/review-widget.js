(function () {
  const styleGrid = `
  .review-widget {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: center;
    max-width: 1200px;
    margin-inline: auto;
  }
  .review {
    flex-grow: 1;
    width: clamp(300px, 30%, 90%);

    position: relative;
    padding: 1em;
    border: 1px solid #80808080;
    border-radius: 5px;
  }
  .review img {
    width: 30px;
    position: absolute;
    right: 15px;
  }
  .review-name {
    margin: 0;
  }
  .review-date {
    opacity: 0.5;
    margin-top: 8px;
  }
  .review-body {
    font-style: italic;
  }
  `;

  const styleSlider = `
  .review-widget {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 800px;
    margin: auto;
  }

  .slider {
    display: flex;
    gap: 20px;
    transition: transform 0.5s ease-in-out;
    overflow:scroll;
    scrollbar-width: none;
  }

  .review {
    position: relative;
    min-width: 300px; /* Adjust this width as needed */
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
    text-align: center;
  }

  .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 10;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
  .review img {
      width: 30px;
      position: absolute;
      right: 15px;
    }
  .review-name {
    margin: 0;
  }
  .review-date {
    opacity: 0.5;
    margin-top: 8px;
  }
  .review-body {
    font-style: italic;
  }  
`;

  function loadReviewWidget(widgetId) {
    // Create a container for the widget
    const container = document.createElement("div");

    container.id = `review-widget-${widgetId}`;
    container.className = "review-widget";

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
        renderWidget(container, data);
      })
      .catch((error) => {
        console.error("Error loading widget:", error);
        container.innerHTML =
          "<p>Error loading reviews. Please try again later.</p>";
      });
  }

  function renderWidget(container, data) {
    console.log(data);
    const widgetType = data.widget.type;
    // Create review blocks
    const reviews = data.widget.reviews.map((review) => {
      return `
        <div class="review">
        <img src="./google.png" alt="">
        <h3 class="review-name">${review.reviewedBy}</h3>
        <p class="review-date">${review.date}</p>
        <div class="review-rating">${review.stars}★</div>
        <p class="review-body">${review.body}</p>
        <button>Read more</button>
        </div>
      `;
    });
    // Apply custom styles
    const styles = document.createElement("style");
    let content = "";
    switch (widgetType) {
      case "grid": {
        styles.textContent = styleGrid;
        content = reviews.join("");
        break;
      }
      case "slider": {
        styles.textContent = styleSlider;
        content = `
          <div class="slider"id="slider">
            ${reviews.join("")}
          </div>
          <button class="control prev" id="prev">❮</button>
          <button class="control next" id="next">❯</button>
        `;
      }
    }
    document.head.appendChild(styles);
    container.innerHTML = content;
    // Extra function for slider
    widgetType === "slider" && runSlider();
  }

  function runSlider() {
    const slider = document.getElementById("slider");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    let scrollAmount = 0;
    const scrollStep = 320; // Width of one review + gap (adjust if necessary)
    const autoScrollInterval = 8000; // 8 seconds

    // Manual controls
    next.addEventListener("click", () => {
      scrollAmount += scrollStep;
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
      console.log("next");
    });

    prev.addEventListener("click", () => {
      scrollAmount -= scrollStep;
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
      console.log("prev");
    });

    // Automatic scroll
    setInterval(() => {
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0; // Reset to the start
      } else {
        scrollAmount += scrollStep;
      }
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, autoScrollInterval);
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
