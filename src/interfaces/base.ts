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

export type { Response, Pagination };
