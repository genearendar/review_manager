import { addReview } from "@/lib/reviews";
import { getReviewSources } from "@/lib/reviews";

export default function ReviewForm() {
  async function handleSubmit(formData: FormData) {
    "use server";
    function transformToReview() {
      console.log(formData);
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Review Text */}
      <div>
        <label htmlFor="text">Review Text:</label>
        <textarea id="text" name="text" required />
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
