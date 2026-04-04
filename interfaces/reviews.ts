import { Pagination, PaginationUrlParams } from "./common";

export interface Review {
  id: number;
  userId: number;
  mediaId: string | null;
  name: string;
  rating: number | null;
  review: string;
  url: string | null;
  watchAgain: boolean;
  media: null | {
    img: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Reviews extends Pagination {
  data: Review[];
}

export type MediaType = "movie" | "tv" | "podcast" | "youtube" | "other";

export interface CreateReview {
  name: string;
  review: string;
  rating?: number | null;
  url?: string | null;
  watchAgain: boolean;
  mediaType: MediaType;
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

export interface GetReviewsByRatingParams extends PaginationUrlParams {
  rating: number;
}

export interface ReviewsByRating extends Pagination {
  rating: number;
  data: Review[];
}
