import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiBookOpen, FiExternalLink, FiClock, FiTag } from 'react-icons/fi';
import { PUBLIC_DOMAIN_BOOKS } from '../data/books';
import { db, doc, getDoc } from '../firebase';

const API = 'https://openlibrary.org';

export default function BookReader() {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const loadBook = async () => {
    setLoading(true);

    // 1. Firestore
    try {
      const docRef = doc(db, 'books', bookId!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const d = docSnap.data();
        setBook({ id: bookId, title: d.title, author: d.author, description: d.description, coverUrl: d.coverUrl, url: d.url, tags: d.tags });
        setSource('firestore');
        setLoading(false);
        return;
      }
    } catch (e) { /* skip */ }

    // 2. Public domain
    const localBook = PUBLIC_DOMAIN_BOOKS.find(b => b.id === bookId);
    if (localBook) {
      setBook(localBook);
      setSource('gutenberg');
      setLoading(false);
      return;
    }

    // 3. Open Library
    try {
      const res = await fetch(`${API}/works/${bookId}.json`);
      const data = await res.json();
      const authorRes = data.authors?.[0]?.author?.key
        ? await fetch(`${API}${data.authors[0].author.key}.json`).then(r => r.json())
        : null;

      setBook({
        id: bookId,
        title: data.title,
        author: authorRes?.name || 'Unknown',
        description: typeof data.description === 'string' ? data.description : data.description?.value || '',
        coverUrl: data.covers?.[0] ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : null,
        openLibraryUrl: `${API}/works/${bookId}`,
        subjects: data.subjects,
      });
      setSource('openlibrary');
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FiLoader className="animate-spin text-rose-500 text-3xl mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiBookOpen className="text-2xl text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">Book not found</p>
        <Link to="/" className="inline-block mt-4 text-rose-500 text-sm font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const coverUrl = book.coverUrl || null;
  const readUrl = book.url || book.openLibraryUrl || '';

  const sourceLabels: Record<string, { label: string; badge: string }> = {
    gutenberg: { label: 'Project Gutenberg', badge: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    firestore: { label: 'YouBooks Collection', badge: 'bg-rose-50 text-rose-600 border-rose-200' },
    openlibrary: { label: 'Open Library', badge: 'bg-blue-50 text-blue-600 border-blue-200' },
  };
  const sourceInfo = sourceLabels[source] || { label: 'External Source', badge: 'bg-gray-50 text-gray-600 border-gray-200' };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-rose-500 mb-6 text-sm transition-colors">
        <FiArrowLeft size={14} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm sticky top-20">
            {/* Cover */}
            <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-5 shadow-sm">
              {coverUrl ? (
                <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiBookOpen className="text-5xl text-gray-300" />
                </div>
              )}
            </div>

            {/* Title & Author */}
            <h1 className="text-lg font-bold text-gray-900 mb-0.5">{book.title}</h1>
            <p className="text-rose-500 text-sm font-medium mb-3">{book.author}</p>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {book.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[11px] rounded-lg border border-rose-100 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Subjects (Open Library) */}
            {book.subjects && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {book.subjects.slice(0, 5).map((s: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] rounded-lg border border-blue-100 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Year */}
            {book.year && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                <FiClock size={12} /> First published {book.year}
              </div>
            )}

            {/* Source badge */}
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border ${sourceInfo.badge}`}>
              <FiTag size={11} /> {sourceInfo.label}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
              <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                <FiBookOpen className="text-rose-500" size={15} />
              </div>
              <div>
                <h2 className="text-gray-900 font-semibold text-sm">Reading</h2>
                <p className="text-gray-400 text-xs">{sourceInfo.label}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 flex flex-col items-center justify-center min-h-[400px] text-center">
              {/* Book illustration */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center mb-6">
                <FiBookOpen className="text-3xl text-rose-300" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h2>
              <p className="text-gray-500 mb-6">by {book.author}</p>

              {/* Description */}
              {book.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg">
                  {book.description.length > 300 ? book.description.substring(0, 300) + '...' : book.description}
                </p>
              )}

              {/* Read button */}
              {readUrl ? (
                <a
                  href={readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FiExternalLink size={16} /> Read Book
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No reading link available for this book.</p>
              )}

              <p className="text-gray-400 text-xs mt-4 flex items-center gap-1">
                <FiExternalLink size={11} /> Opens on {sourceInfo.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
