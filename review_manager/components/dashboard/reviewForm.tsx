import { addReview } from "@/lib/reviewActions";
import { Review } from "@/app/dashboard/reviews/reviewUtils";
import { revalidatePath } from "next/cache";

export default function ReviewForm({ toggle }: { toggle: () => void }) {
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
      toggle();
      return { success: true, review };
    } catch (error) {
      console.error("Review submission error:", error);
      return { success: false, error: "Failed to submit review" };
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Review Text */}
      <div className="py-2">
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Review Text:
        </label>
        <textarea
          id="text"
          name="body"
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Star Rating */}
      <div className="py-2">
        <label
          htmlFor="starRating"
          className="block text-sm font-medium text-gray-700"
        >
          Star Rating (1-5):
        </label>
        <input
          type="number"
          id="starRating"
          name="stars"
          min="1"
          max="5"
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Reviewer Name (Optional) */}
      <div className="py-2">
        <label
          htmlFor="reviewerName"
          className="block text-sm font-medium text-gray-700"
        >
          Reviewer Name (Optional):
        </label>
        <input
          type="text"
          id="reviewerName"
          name="reviewedBy"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Review Source ( Dropdown) */}
      <div className="py-2">
        <label
          htmlFor="reviewSource"
          className="block text-sm font-medium text-gray-700"
        >
          Review Source:
        </label>
        <select
          id="reviewSource"
          name="source"
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a source</option>
          <option value="Google">Google</option>
          <option value="Yelp">Yelp</option>
          <option value="Facebook">Facebook</option>
          <option value="Website">Website</option>
        </select>
      </div>

      {/* Date (Optional) */}
      <div className="py-2">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date (Optional):
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
}
