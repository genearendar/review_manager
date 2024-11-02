import { addReview } from "@/lib/reviewActions";
import { Review } from "@/app/protected/reviews/reviewUtils";
import { revalidatePath } from "next/cache";

export default function ReviewForm() {

  async function handleSubmit(formData: FormData) {
    const dateValue = formData.get("date")?.toString();
    const review: Review = {
      body: formData.get("body") as string,
      stars: Number(formData.get("stars")),
      reviewedBy: (formData.get("reviewedBy") as string) ?? undefined,
      source: formData.get("source") as string,
      date: dateValue !== "" ? dateValue : null,
    };
    try {
      await addReview(review);
      revalidatePath("/protected/reviews");
      return { success: true, review };
    } catch (error) {
      console.error("Review submission error:", error);
      return { success: false, error: "Failed to submit review" };
    }
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

      {/* Review Source ( Dropdown) */}
      <div>
        <label htmlFor="reviewSource">Review Source:</label>
        <select id="reviewSource" name="source" required>
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
