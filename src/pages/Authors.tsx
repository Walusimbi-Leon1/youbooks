import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiLoader, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Authors</h1>
        <p className="text-gray-500 text-sm">Browse authors from Open Library</p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search authors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setSearchQuery(''); setSearchParams({}); loadTrending(); }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTab === 'trending' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Popular
        </button>
        {searchQuery && (
          <button
            onClick={() => doSearch(searchQuery, 0)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === 'search' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Results
          </button>
        )}
      </div>

      {activeTab === 'search' && totalResults > 0 && (
        <p className="text-gray-500 text-sm mb-4">
          {totalResults.toLocaleString()} authors found
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="animate-spin text-rose-500 text-2xl" />
          <span className="ml-3 text-gray-500">Searching...</span>
        </div>
      )}

      {!loading && authors.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {authors.map(({ key: authorKey, ...rest }) => (
              <AuthorCard key={authorKey} {...rest} authorKey={authorKey} />
            ))}
          </div>

          {activeTab === 'search' && totalResults > PER_PAGE && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => { const p = Math.max(0, (page - 1) * PER_PAGE); doSearch(searchQuery, p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === 0}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-full disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <FiChevronLeft /> Prev
              </button>
              <span className="text-gray-500 text-sm">{page + 1} / {Math.ceil(totalResults / PER_PAGE)}</span>
              <button
                onClick={() => { const n = (page + 1) * PER_PAGE; if (n < totalResults) { doSearch(searchQuery, n); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                disabled={(page + 1) * PER_PAGE >= totalResults}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-full disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {!loading && authors.length === 0 && (
        <div className="text-center py-20">
          <FiSearch className="text-3xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No authors found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
