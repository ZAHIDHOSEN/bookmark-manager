import { INPUT_CLASS, TABS } from "../utils/bookmarkHelpers";

export function FilterBar({ search, onSearchChange, tab, onTabChange }) {
  return (
    <div>
      <input
        className={`${INPUT_CLASS} mt-5 border-neutral-700`}
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => onTabChange(t)}
            className={`rounded-full border px-5 py-1.5 text-sm ${
              tab === t
                ? "border-indigo-500 bg-indigo-800 text-indigo-100"
                : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}