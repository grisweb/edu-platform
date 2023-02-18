interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

interface WithPaginationRequest {
  page: number;
  perPage: number;
}

interface WithPaginationResponse {
  pagination: Pagination;
}

export type {
  Response,
  Pagination,
  WithPaginationRequest,
  WithPaginationResponse
};
