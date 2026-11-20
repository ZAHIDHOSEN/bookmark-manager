import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { createBookmark, deleteBookmark, getBookmarks, toggleFavorite } from './services/bookmarkApi'
import { useEffect } from 'react'
import { BookmarkForm } from './components/BookmarkForm'
import { FilterBar } from './components/FilterBar'
import { BookmarkCard } from './components/BookmarkCard'

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const apiCategory = tab === "Favorites" ? "All" : tab;
      const data = await getBookmarks(apiCategory, search);
      setBookmarks(tab === "Favorites" ? data.filter((b) => b.isFavorite) : data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tab, search]);


  useEffect(() => {
    let active = true;
    const apiCategory = tab === "Favorites" ? "All" : tab;

    async function syncBookmarks() {
      try {
        const data = await getBookmarks(apiCategory, search);
        if (!active) return;
        setBookmarks(tab === "Favorites" ? data.filter((b) => b.isFavorite) : data);
        setError("");
      } catch (err) {
        if (!active) return;
        setError(err.message);
      }
    }

    syncBookmarks();

    return () => {
      active = false;
    };
  }, [tab, search]);


  const handleAdd = async (payload) => {
    await createBookmark(payload);
    await loadBookmarks();
  };

  const handleFavorite = async (id) => {
    const previousBookmarks = bookmarks;

    setBookmarks((prev) => {
      const updated = prev.map((b) =>
        b._id === id ? { ...b, isFavorite: !b.isFavorite } : b
      );
      return tab === "Favorites" ? updated.filter((b) => b.isFavorite) : updated;
    });

    try {
      setError("");
      await toggleFavorite(id);
    } catch (err) {
      setBookmarks(previousBookmarks);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const previousBookmarks = bookmarks;

    setBookmarks((prev) => prev.filter((b) => b._id !== id));

    try {
      setError("");
      await deleteBookmark(id);
    } catch (err) {
      setBookmarks(previousBookmarks);
      setError(err.message);
    }
  };



  return (
       <div className="min-h-screen bg-neutral-900 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-950 p-6 text-neutral-100">
        <h1 className="mb-4 text-lg font-semibold">Bookmark manager</h1>

        <BookmarkForm onAdd={handleAdd} />

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          tab={tab}
          onTabChange={setTab}
        />

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {!loading &&
            bookmarks.map((b) => (
              <BookmarkCard
                key={b._id}
                bookmark={b}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
              />
            ))}

          {(loading || bookmarks.length === 0) && (
            <div className="flex min-h-35 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-600 p-4 text-center text-sm text-neutral-300">
              <p>{loading ? "Loading..." : "No bookmarks found"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
