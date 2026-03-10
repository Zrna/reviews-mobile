export interface Pagination {
  totalRecords: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationUrlParams {
  page?: number;
  pageSize?: number;
}
