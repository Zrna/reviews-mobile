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
