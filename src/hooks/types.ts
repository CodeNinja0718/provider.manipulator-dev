export interface IListItem {
  id: string;
  name: string;
}

export interface IListResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
}
