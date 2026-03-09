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

export interface GetReviewsParams {
  page?: number;
  pageSize?: number;
}

export interface Reviews {
  data: Review[];
  totalRecords: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
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

export type ReviewsGroupedByRatings = {
  rating: number;
  data: Review[];
  totalRecords: number;
}[];

export interface GetReviewsByRatingParams {
  rating: number;
  page?: number;
  pageSize?: number;
}

export interface ReviewsByRating {
  rating: number;
  data: Review[];
  totalRecords: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
