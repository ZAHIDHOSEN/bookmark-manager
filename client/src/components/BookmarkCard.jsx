import { BADGE, getDomain } from "../utils/bookmarkHelpers";

export function BookmarkCard({ bookmark, onFavorite, onDelete }) {
  return (
    <div className="space-y-2 rounded-xl border border-neutral-700 bg-neutral-900 p-4">
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer"
        className="block font-semibold hover:underline"
      >
        {bookmark.title}
      </a>

      <p className="text-sm text-neutral-300">{getDomain(bookmark.url)}</p>

      <span
        className={`inline-block rounded-full border px-3 py-0.5 text-xs ${
          BADGE[bookmark.category] || ""
        }`}
      >
        {bookmark.category}
      </span>

      <div className="flex gap-2 pt-1">
        <button type="button" onClick={() => onFavorite(bookmark._id)}
          className={`rounded-lg border px-4 py-1.5 text-sm ${
            bookmark.isFavorite
              ? "border-yellow-600 bg-yellow-900/60 text-yellow-400"
              : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
          }`}
        >
          {bookmark.isFavorite ? "Favorited" : "Favorite"}
        </button>

        <button
          type="button"
          onClick={() => onDelete(bookmark._id)}
          className="rounded-lg border border-red-700 bg-red-900/60 px-4 py-1.5 text-sm text-red-300 hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}