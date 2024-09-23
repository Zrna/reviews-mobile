export interface Review {
  id: number;
  img: string | null;
  userId: number;
  name: string;
  rating: number | null;
  review: string;
  url: string | null;
  watchAgain: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Reviews {
  data: Review[];
  totalRecords: number;
}

export interface CreateReview {
  name: string;
  review: string;
  rating?: number | null;
  url?: string | null;
  watchAgain: boolean;
}

export interface UpdateReview {
  rating?: number | null;
  review: string;
  url?: string | null;
  watchAgain: boolean;
}

export interface GetReviewsGroupedByRatingsParams {
  count?: number;
  rating?: number;
}

export type ReviewsGroupedByRatings = {
  rating: number;
  reviews: Review[];
}[];
