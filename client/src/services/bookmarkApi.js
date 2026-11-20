
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const BASE_URL = `${BACKEND_URL}/api/bookmarks`;


export const getBookmarks = async (category = "All", search = "") => {
  const params = new URLSearchParams();
  if (category && category !== "All") params.append("category", category);
  if (search && search.trim()) params.append("search", search.trim());

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${BASE_URL}${query}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookmarks");
  return data;
};

export const createBookmark = async (payload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create bookmark");
  return data;
};

export const toggleFavorite = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/favorite`, {
    method: "PATCH",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to toggle favorite");
  return data;
};

export const deleteBookmark = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete bookmark");
  return data;
};