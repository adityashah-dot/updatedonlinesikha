export const UNIVERSITY_PAGE_SIZE = 8;

export function paginateUniversities(universities, page, pageSize = UNIVERSITY_PAGE_SIZE) {
  const list = Array.isArray(universities) ? universities : [];
  const currentPage = Math.min(Math.max(1, Number(page) || 1), Math.max(1, Math.ceil(list.length / pageSize)));
  const start = (currentPage - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

export function getUniversityPageNumbers(currentPage, totalPages) {
  const maxPage = Math.max(1, Number(totalPages) || 1);
  const current = Math.min(Math.max(1, Number(currentPage) || 1), maxPage);

  if (maxPage <= 5) {
    return Array.from({ length: maxPage }, (_, index) => index + 1);
  }

  if (current <= 3) return [1, 2, 3, "ellipsis", maxPage];
  if (current >= maxPage - 2) return [1, "ellipsis", maxPage - 2, maxPage - 1, maxPage];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", maxPage];
}
