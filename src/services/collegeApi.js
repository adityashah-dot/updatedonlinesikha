const API_URL = import.meta.env?.VITE_API_URL || "https://api.degreefyd.com/api/b2c";
const API_TOKEN = import.meta.env?.VITE_API_TOKEN;

export const COLLEGE_CONTENT_TAG = "college-content";

function buildHeaders() {
  const headers = { Accept: "application/json" };
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;
  return headers;
}

function unwrapNestedData(result) {
  return result?.data?.data || result?.data || result;
}

export async function getCollegeBySlug(collegeName, sub) {
  let url = `${API_URL}/website/colleges/${encodeURIComponent(collegeName)}`;
  if (sub) {
    url += `?sub=${encodeURIComponent(sub)}`;
  }

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch college: ${response.status}`);
  }

  const result = await response.json();
  return unwrapNestedData(result);
}

export async function fetchCollegePage(collegeName, sub) {
  return getCollegeBySlug(collegeName, sub);
}

export async function getCollegeNavbarList(collegeId, isTest = false) {
  const url = `${API_URL}/website/colleges/navbar-list/${collegeId}?isTest=${isTest}`;

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch navbar list: ${response.status}`);
  }

  const result = await response.json();
  return result?.colleges || result?.data || result || [];
}

export async function getCollegeGallery(collegeId) {
  const url = `${API_URL}/website/colleges/gallery?collegeId=${collegeId}`;

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    console.warn(`Gallery fetch failed: ${response.status}`);
    return [];
  }

  const result = await response.json();
  return result?.data || result || [];
}

export async function getCollegeRecruiters(collegeId) {
  const url = `${API_URL}/website/colleges/resources?collegeId=${collegeId}&resourceCategory=recruiters`;

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    console.warn(`Recruiters fetch failed: ${response.status}`);
    return [];
  }

  const result = await response.json();
  return result?.data || result || [];
}

export async function getSimilarColleges(slug) {
  const url = `${API_URL}/website/colleges/similar/${encodeURIComponent(slug)}`;

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    console.warn(`Similar colleges fetch failed: ${response.status}`);
    return [];
  }

  const result = await response.json();
  return result?.data || result || [];
}

export async function getCollegeBlogs(collegeId, blockContent = {}) {
  const url = `${API_URL}/blogs/get-block-blogs`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...buildHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collegeID: collegeId,
      ...blockContent,
    }),
  });

  if (!response.ok) {
    console.warn(`Blogs fetch failed: ${response.status}`);
    return [];
  }

  const result = await response.json();
  return result?.data || result || [];
}

export async function getCollegeCourses(collegeId) {
  const url = `${API_URL}/website/colleges/courses-new/${collegeId}?page=0&limit=25`;

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    console.warn(`Courses fetch failed: ${response.status}`);
    return [];
  }

  const result = await response.json();
  return result?.data || result || [];
}
