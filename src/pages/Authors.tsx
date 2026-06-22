import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiLoader, FiChevronLeft, FiChevronRight, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import AuthorCard from '../components/AuthorCard';
import { POPULAR_AUTHORS } from '../data/authors';

interface AuthorData {
  key: string;
  name: string;
  cover_i?: number;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
}

const API = 'https://openlibrary.org';

export default function Authors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authors, setAuthors] = useState<AuthorData[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [activeTab, setActiveTab] = useState('trending');
  const PER_PAGE = 24;

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      doSearch(search, 0);
    } else {
      loadTrending();
    }
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    setActiveTab('trending');
    try {
      const results: AuthorData[] = [];
      for (const name of POPULAR_AUTHORS.slice(0, 30)) {
        try {
          const res = await fetch(`${API}/search/authors.json?q=${encodeURIComponent(name)}&limit=1`);
          const data = await res.json();
          if (data.docs?.[0]) results.push(data.docs[0]);
        } catch (e) { /* skip */ }
      }
      setAuthors(results);
      setTotalResults(results.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const doSearch = useCallback(async (q: string, start: number) => {
    if (!q.trim()) return;
    setLoading(true);
    setActiveTab('search');
    try {
      const res = await fetch(`${API}/search/authors.json?q=${encodeURIComponent(q)}&limit=${PER_PAGE}&offset=${start}`);
      const data = await res.json();
      setAuthors(data.docs || []);
      setTotalResults(data.numFound || 0);
      setPage(Math.floor(start / PER_PAGE));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      doSearch(searchQuery, 0);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Authors</h1>
        <p className="text-gray-500 text-sm mt-1">Browse authors from Open Library</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-xl group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-400 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search authors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-28 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* Tabs */}
      <div className="flex gap-2 mb-7">
        <button
          onClick={() => { setSearchQuery(''); setSearchParams({}); loadTrending(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'trending'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-500/20'
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        >
          <FiTrendingUp size={14} /> Popular
        </button>
        {searchQuery && (
          <button
            onClick={() => doSearch(searchQuery, 0)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            <FiSearch size={14} /> Results
          </button>
        )}
      </div>

      {/* Results count */}
      {activeTab === 'search' && totalResults > 0 && (
        <p className="text-gray-500 text-sm mb-5">
          <span className="font-semibold text-gray-700">{totalResults.toLocaleString()}</span> authors found
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <FiLoader className="animate-spin text-rose-500 text-3xl mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Searching authors...</p>
          </div>
        </div>
      )}

      {/* Results grid */}
      {!loading && authors.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {authors.map(({ key: authorKey, ...rest }) => (
              <AuthorCard key={authorKey} {...rest} authorKey={authorKey} />
            ))}
          </div>

          {/* Pagination */}
          {activeTab === 'search' && totalResults > PER_PAGE && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => {
                  const p = Math.max(0, (page - 1) * PER_PAGE);
                  doSearch(searchQuery, p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
              >
                <FiChevronLeft /> Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, Math.ceil(totalResults / PER_PAGE)) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { doSearch(searchQuery, (p - 1) * PER_PAGE); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      page + 1 === p
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const n = (page + 1) * PER_PAGE;
                  if (n < totalResults) { doSearch(searchQuery, n); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                }}
                disabled={(page + 1) * PER_PAGE >= totalResults}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && authors.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="text-2xl text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">No authors found</p>
          <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          <button
            onClick={() => { setSearchQuery(''); setSearchParams({}); loadTrending(); }}
            className="mt-4 px-5 py-2 text-rose-500 text-sm font-medium hover:bg-rose-50 rounded-xl transition-all"
          >
            Browse popular authors →
          </button>
        </div>
      )}
    </div>
  );
}
