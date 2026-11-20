
export const CATEGORIES = ["Work", "Learning", "Tools", "Entertainment"];
export const TABS = ["All", "Favorites", ...CATEGORIES];

export const BADGE = {
  Work: "bg-orange-900/50 text-orange-300 border-orange-700",
  Learning: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  Tools: "bg-indigo-900/60 text-indigo-300 border-indigo-600",
  Entertainment: "bg-pink-900/50 text-pink-300 border-pink-700",
};

export const INPUT_CLASS =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-400 outline-none focus:border-indigo-500";

export const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const getDomain = (value) => {
  try {
    return new URL(value).hostname.replace("www.", "");
  } catch {
    return value;
  }
};