type FilterByType = "" | CreateFeedbackDto["type"];
type SortBy = "createdAt.asc" | "createdAt.desc" | "name.asc" | "name.desc";
type PaginatedRequest = {
  page: number;
  limit: number;
  filterByType: string;
  sortBy: string;
};
type PaginatedResponse = {
  page: number;
  limit: number;
  totalCount: number;
  data: Feedback[];
};
