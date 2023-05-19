export interface IListItem {
  id: string;
  name: string;
}

export interface IListResult<T> {
  docs: T[];
  items: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
}
