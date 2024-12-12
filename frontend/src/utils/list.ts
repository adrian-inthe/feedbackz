import { CreateFeedbackDto, Feedback } from "../../../shared/types";

export function filterAndSort(
  list: Feedback[],
  type: "" | CreateFeedbackDto["type"],
  sortBy: "date.asc" | "date.desc" | "name.asc" | "name.desc",
) {
  let filteredList = type ? filterListByType(list, type) : list;

  switch (sortBy) {
    case "date.asc":
      sortByDateAsc(filteredList);
      break;
    case "date.desc":
      sortByDateDesc(filteredList);
      break;
    case "name.asc":
      sortByNameAsc(filteredList);
      break;
    case "name.desc":
      sortByNameDesc(filteredList);
      break;
  }
  return filteredList;
}

function filterListByType(list: Feedback[], type: string) {
  return list.filter((item) => item.type === type);
}

function sortByDateAsc(list: Feedback[]) {
  list.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

function sortByDateDesc(list: Feedback[]) {
  list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function sortByNameAsc(list: Feedback[]) {
  list.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByNameDesc(list: Feedback[]) {
  list.sort((a, b) => b.name.localeCompare(a.name));
}
