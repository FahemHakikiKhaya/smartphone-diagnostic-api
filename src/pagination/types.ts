export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}
