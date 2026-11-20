import { useState } from "react";
import { CATEGORIES, INPUT_CLASS, isValidUrl } from "../utils/bookmarkHelpers";

export function BookmarkForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!isValidUrl(url.trim())) newErrors.url = "Enter a valid URL";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      const payload = { title: title.trim(), url: url.trim() };
      if (category) payload.category = category;

      await onAdd(payload);
      setTitle("");
      setUrl("");
      setCategory("");
      setErrors({});
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
      >
        <div>
          <input
            className={`${INPUT_CLASS} ${
              errors.title ? "border-red-500 bg-red-950/60" : "border-neutral-700"
            }`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            className={`${INPUT_CLASS} ${
              errors.url ? "border-red-500 bg-red-950/60" : "border-neutral-700"
            }`}
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-400">{errors.url}</p>
          )}
        </div>

        <select
          className={`${INPUT_CLASS} border-neutral-700 sm:w-auto`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg border border-indigo-500 bg-indigo-800 px-8 py-3 font-semibold text-indigo-100 hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {errors.server && (
        <p className="mt-2 text-sm text-red-400">{errors.server}</p>
      )}
    </>
  );
}