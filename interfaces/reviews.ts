import { Pagination, PaginationUrlParams } from "./common";

interface Genre {
  id: number;
  name: string;
}

export interface Media {
  img: string;
  type: string;
  overview: string | null;
  releaseDate: string | null;
  genres: Genre[];
}

export interface Review {
  id: number;
  userId: number;
  mediaId: string | null;
  name: string;
  type: MediaType | null;
  rating: number | null;
  review: string;
  url: string | null;
  watchAgain: boolean;
  createdAt: string;
  updatedAt: string;
  media: null | Media;
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
