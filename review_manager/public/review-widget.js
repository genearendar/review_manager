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
    const sliderWidth = slider.offsetWidth; //To use later
    let reviewWidth = document.querySelector(".review").offsetWidth;
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    let scrollAmount = 0;
    const scrollStep = reviewWidth + 20; // Width of one review + gap
    const autoScrollInterval = 8000;
    let isDragging = false;

    slider.addEventListener("touchstart", () => (isDragging = true));
    slider.addEventListener("touchend", () => {
      isDragging = false;
      snapScroll(0);
    });
    // Scroll to snap position - forward: 1 , backward: -1 or adjust in place: 0
    function snapScroll(step) {
      const scrollLeft = slider.scrollLeft;
      const nearestIndex = Math.round(scrollLeft / scrollStep);
      const snapPosition = (nearestIndex + step) * scrollStep;
      if (snapPosition >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollTo({ left: snapPosition, behavior: "smooth" });
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
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0; // Reset to the start
      }
      snapScroll(1);
    }, autoScrollInterval);
  }

  // Look for a script tag with data-widget-id attribute
  const widgetId = document.currentScript.getAttribute("data-widget-id");

  if (widgetId) {
    loadReviewWidget(widgetId);
  } else {
    console.error("Review widget error: No widget ID provided");
  }
})();
