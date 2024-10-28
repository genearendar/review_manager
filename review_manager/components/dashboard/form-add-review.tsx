//This component needs checking and refactoring - paste from ai

import React, { useState } from 'react';

type ReviewFormProps = {
  onSubmit: (reviewData: {
    text: string;
    starRating: number;
    reviewerName?: string;
    reviewSource?: string;
    date?: string;
  }) => void;
};

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [text, setText] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewSource, setReviewSource] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ text, starRating, reviewerName, reviewSource, date });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Review Text */}
      <div>
        <label htmlFor="text">Review Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      {/* Star Rating */}
      <div>
        <label htmlFor="starRating">Star Rating (1-5):</label>
        <input
          type="number"
          id="starRating"
          value={starRating}
          onChange={(e) => setStarRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </div>

      {/* Reviewer Name (Optional) */}
      <div>
        <label htmlFor="reviewerName">Reviewer Name (Optional):</label>
        <input
          type="text"
          id="reviewerName"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />
      </div>

      {/* Review Source (Optional Dropdown) */}
      <div>
        <label htmlFor="reviewSource">Review Source (Optional):</label>
        <select
          id="reviewSource"
          value={reviewSource}
          onChange={(e) => setReviewSource(e.target.value)}
        >
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
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit">Submit Review</button>
    </form>
  );
};