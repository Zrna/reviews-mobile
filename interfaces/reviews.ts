export interface Review {
  id: number;
  userId: number;
  imageId: string | null;
  name: string;
  rating: number | null;
  review: string;
  url: string | null;
  watchAgain: boolean;
  image: null | {
    img: string;
  };
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
