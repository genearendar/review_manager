export interface Review {
  id?: number;
  body: string;
  stars: number;
  source: string;
  reviewedBy?: string | null;
  date?: string | null;
  createdAt?: string | null;
  reviewerAvatar?: string | null;
}

export interface DatabaseReview {
  // Database type
  auth_id: string;
  id?: number;
  body: string;
  stars: number;
  source_id: number;
  reviewed_by?: string | null;
  date?: string | null;
  created_at?: string | null;
  reviewer_avatar?: string | null;
}

export interface FetchedReview {
  // Database type
  id: number;
  body: string;
  stars: number;
  sources: { name: string };
  reviewed_by: string | null;
  date: string | null;
  created_at: string | null;
  reviewer_avatar: string | null;
}

export interface Widget {
  id?: number;
  name: string;
  reviews: Review[] | null;
}

export interface FetchedWidget {
  id: number;
  name: string;
  grouped: {
    reviews: {
      id: number;
    }[];
  }[];
}

//Transform DatabaseReview to Review - remove auth_id and rename object keys
export function transformFromDbReview(dbReview: FetchedReview): Review {
  return {
    id: dbReview.id,
    body: dbReview.body,
    stars: dbReview.stars,
    reviewedBy: dbReview.reviewed_by,
    source: dbReview.sources.name,
    date: dbReview.date,
  };
}
