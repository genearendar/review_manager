(function () {
  const BASE_URL = "https://review-manager-cyan.vercel.app/";
  const styleGrid = `]
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

  function renderWidget(container, widgetData) {
    console.log(widgetData);
    const widgetType = widgetData.widget.type;
    // Create review blocks
    const reviews = widgetData.widget.reviews.map((review) => {
      const truncatedText = truncateText(review.body, 150);
      const renderedText = truncatedText ? truncatedText : review.body;
      const readMoreBtnHtml = truncatedText
        ? '<button class="review-read-btn" style="text-decoration: underline; padding: 0; border: none; background: none; cursor: pointer;">Read more</button>'
        : "";
      const starsContent = "★".repeat(review.stars);
      return `
        <div class="review" id="rev-${review.id}">
        <img src="${BASE_URL}img/google.png" alt="">
        <h3 class="review-name">${review.reviewedBy}</h3>
        <p class="review-date">${review.date}</p>
        <div class="review-rating" style="color: #FFD700;">${starsContent}</div>
        <p class="review-body">${renderedText}</p>
        ${readMoreBtnHtml}
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
    // Run slider
    widgetType === "slider" && runSlider();
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("review-read-btn")) {
        readMore(event.target);
      }
    });

    // Functions in render review
    //

    // Slider function
    function runSlider() {
      const slider = document.getElementById("slider");
      const sliderWidth = slider.offsetWidth; //To use later
      let reviewWidth = document.querySelector(".review").offsetWidth;

      const prev = document.getElementById("prev");
      const next = document.getElementById("next");

      let scrollAmount = 0;
      const scrollStep = reviewWidth + 20; // Width of one review + gap

      // Get total number of reviews and visible reviews
      const totalReviews = slider.children.length;
      const visibleReviews = Math.floor(sliderWidth / scrollStep);
      const maxScrollPosition = (totalReviews - visibleReviews) * scrollStep;
      const autoScrollInterval = 8000;

      // Touch events
      let isDragging = false;
      slider.addEventListener("touchstart", () => (isDragging = true));
      slider.addEventListener("touchend", () => {
        isDragging = false;
        snapScroll(0);
      });

      // Scroll to snap position - forward: 1 , backward: -1 or adjust in place: 0
      let resetScroll = false; // used in snapScroll fn
      function snapScroll(step) {
        const scrollLeft = slider.scrollLeft;
        const nearestIndex = Math.round(scrollLeft / scrollStep);
        const snapPosition = (nearestIndex + step) * scrollStep;
        if (resetScroll) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
          resetScroll = false;
          return;
        }
        slider.scrollTo({ left: snapPosition, behavior: "smooth" });
        if (snapPosition >= maxScrollPosition) {
          resetScroll = true;
        }
      }

      // Manual controls
      next.addEventListener("click", () => {
        snapScroll(1);
      });
      prev.addEventListener("click", () => {
        snapScroll(-1);
      });

      // Automatic scroll
      setInterval(() => {
        snapScroll(1);
      }, autoScrollInterval);
    }

    // Truncate text. Return null if too short to truncate
    function truncateText(text, length) {
      if (text.length > length) {
        // Find the last space before maxLength
        const lastSpace = text.lastIndexOf(" ", length);
        if (lastSpace === -1) return text.slice(0, length) + "...";
        return text.slice(0, lastSpace) + "...";
      } else {
        return null;
      }
    }

    function readMore(btn) {
      console.log(btn);
      const reviewBody = btn.parentElement.querySelector(".review-body");
      const reviewId = Number(btn.parentElement.id.split("-")[1]);
      const reviewFullText = widgetData.widget.reviews.find(
        (r) => r.id === reviewId
      ).body;
      const reviewTruncatedText = truncateText(reviewFullText, 150);
      reviewBody.textContent =
        reviewBody.textContent === reviewFullText
          ? reviewTruncatedText
          : reviewFullText;
      btn.textContent =
        btn.textContent === "Read more" ? "Read less" : "Read more";
    }
  }
  // Look for a script tag with data-widget-id attribute
  const widgetId = document.currentScript.getAttribute("data-widget-id");

  if (widgetId) {
    loadReviewWidget(widgetId);
  } else {
    console.error("Review widget error: No widget ID provided");
  }
})();
