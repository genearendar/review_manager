import { Review, addReview } from "@/lib/reviews";

export default function ReviewForm() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const review: Review = {
      body: formData.get("body") as string,
      stars: Number(formData.get("stars")),
      reviewedBy: formData.get("reviewedBy") as string,
      source: formData.get("source") as string,
      date: formData.get("date") as string,
    };
    await addReview(review);
  }

  return (
    <form action={handleSubmit}>
      {/* Review Text */}
      <div>
        <label htmlFor="text">Review Text:</label>
        <textarea id="text" name="body" required />
      </div>

      {/* Star Rating */}
      <div>
        <label htmlFor="starRating">Star Rating (1-5):</label>
        <input
          type="number"
          id="starRating"
          name="stars"
          min="1"
          max="5"
          required
        />
      </div>

      {/* Reviewer Name (Optional) */}
      <div>
        <label htmlFor="reviewerName">Reviewer Name (Optional):</label>
        <input type="text" id="reviewerName" name="reviewedBy" />
      </div>

      {/* Review Source (Optional Dropdown) */}
      <div>
        <label htmlFor="reviewSource">Review Source (Optional):</label>
        <select id="reviewSource" name="source">
          <option value="">Select a source</option>
          <option value="Google">Google</option>
          <option value="Yelp">Yelp</option>
          <option value="Facebook">Facebook</option>
          <option value="Website">Website</option>
        </select>
      </div>

      {/* Date (Optional) */}
      <div>
        <label htmlFor="date">Date (Optional):</label>
        <input type="date" id="date" name="date" />
      </div>

      <button type="submit">Submit Review</button>
    </form>
  );
}
