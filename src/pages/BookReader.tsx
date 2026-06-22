import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiBookOpen, FiExternalLink } from 'react-icons/fi';
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

    // 1. Check Firestore
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
    } catch (e) { /* not in firestore */ }

    // 2. Check local public domain books
    const localBook = PUBLIC_DOMAIN_BOOKS.find(b => b.id === bookId);
    if (localBook) {
      setBook(localBook);
      setSource('gutenberg');
      setLoading(false);
      return;
    }

    // 3. Try Open Library
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
      <div className="flex items-center justify-center min-h-[50vh]">
        <FiLoader className="animate-spin text-rose-500 text-2xl" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Book not found.</p>
        <Link to="/" className="text-rose-500 mt-3 inline-block hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const coverUrl = book.coverUrl || null;
  const readUrl = book.url || book.openLibraryUrl || '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-rose-500 mb-6 text-sm transition-colors">
        <FiArrowLeft size={14} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-20">
            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 mb-5">
              {coverUrl ? (
                <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiBookOpen className="text-4xl text-gray-300" />
                </div>
              )}
            </div>

            <h1 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h1>
            <p className="text-rose-500 text-sm font-medium mb-3">{book.author}</p>

            {book.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {book.description.length > 300 ? book.description.substring(0, 300) + '...' : book.description}
              </p>
            )}

            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {book.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            )}

            {book.subjects && book.subjects.slice(0, 5).map((s: string, i: number) => (
              <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full mr-1 mb-1">{s}</span>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <FiBookOpen className="text-rose-500" size={16} />
              <span className="text-gray-900 font-medium text-sm">
                {source === 'firestore' ? 'Book Reader' : source === 'gutenberg' ? 'Project Gutenberg' : 'Open Library'}
              </span>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col items-center justify-center">
              <FiBookOpen className="text-5xl text-gray-200 mb-5" />
              <h2 className="text-gray-900 text-lg font-semibold mb-1 text-center">{book.title}</h2>
              <p className="text-gray-500 text-sm mb-6 text-center">{book.author}</p>

              {readUrl ? (
                <a
                  href={readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-lg"
                >
                  Read Book <FiExternalLink size={16} />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No reading link available.</p>
              )}

              <p className="text-gray-400 text-xs mt-4">
                {source === 'gutenberg' ? 'Opens on gutenberg.org' : source === 'firestore' ? 'Opens in a new tab' : 'Opens on openlibrary.org'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
