import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiLoader, FiBookOpen, FiSearch, FiPlus, FiLogIn, FiLogOut, FiLock, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  db, auth,
  collection, getDocs, addDoc, deleteDoc, doc, query, orderBy,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from '../firebase';

const API = 'https://openlibrary.org';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [books, setBooks] = useState<any[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authorSearch, setAuthorSearch] = useState<any[]>([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [description, setDescription] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) loadBooks();
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return toast.error('Enter email and password');
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome!');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setBooks([]);
    toast.success('Logged out');
  };

  const loadBooks = async () => {
    setBooksLoading(true);
    try {
      const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setBooks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setBooksLoading(false);
    }
  };

  const searchAuthors = async (q: string) => {
    if (!q || q.length < 2) { setAuthorSearch([]); return; }
    try {
      const res = await fetch(`${API}/search/authors.json?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      setAuthorSearch(data.docs || []);
      setShowAuthorDropdown(true);
    } catch (e) { console.error(e); }
  };

  const selectAuthor = (a: any) => {
    setAuthor(a.name);
    setShowAuthorDropdown(false);
    setAuthorSearch([]);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error('Title is required');
    if (!author.trim()) return toast.error('Author is required');
    if (!bookUrl.trim()) return toast.error('Book URL is required');

    setSaving(true);
    const id = toast.loading('Publishing...');
    try {
      await addDoc(collection(db, 'books'), {
        title: title.trim(), author: author.trim(), description: description.trim(),
        url: bookUrl.trim(), coverUrl: coverUrl.trim() || null,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      });
      toast.success('Published!', { id });
      setTitle(''); setAuthor(''); setDescription(''); setBookUrl(''); setCoverUrl(''); setTags('');
      loadBooks();
    } catch (err: any) {
      toast.error('Failed: ' + err.message, { id });
    } finally {
      setSaving(false);
    }
  };

  const deleteBook = async (bookId: string, bookTitle: string) => {
    if (!confirm(`Delete "${bookTitle}"?`)) return;
    try {
      await deleteDoc(doc(db, 'books', bookId));
      setBooks(books.filter(b => b.id !== bookId));
      toast.success('Deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="animate-spin text-rose-500 text-3xl" />
      </div>
    );
  }

  // === LOGIN SCREEN ===
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FiLock className="text-rose-500 text-2xl" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Admin Access</h1>
            <p className="text-gray-500 text-sm text-center mb-6">Sign in to manage books</p>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com" autoComplete="email"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
              </div>
              <button type="submit" disabled={loggingIn}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-rose-500/20">
                {loggingIn ? <><FiLoader className="animate-spin" /> Signing in...</> : <><FiLogIn size={16} /> Sign In</>}
              </button>
            </form>

            <div className="mt-5 text-center">
              <Link to="/" className="text-gray-400 text-xs hover:text-rose-500 transition-colors">
                ← Back to YouBooks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === ADMIN PANEL ===
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Signed in as <span className="text-rose-500 font-medium">{user.email}</span>
          </p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 text-gray-500 text-sm rounded-xl hover:text-red-500 hover:bg-red-50 transition-all border border-gray-200 hover:border-red-200">
          <FiLogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === ADD BOOK FORM === */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
              <FiPlus className="text-rose-500" size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Add Book</h2>
              <p className="text-gray-500 text-xs">Publish a new book to Firestore</p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="space-y-3.5">
            {/* Title */}
            <div>
              <label className="block text-xs text-gray-500 font-medium mb-1">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The Great Gatsby"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
            </div>

            {/* Author with autocomplete */}
            <div className="relative">
              <label className="block text-xs text-gray-500 font-medium mb-1">Author *</label>
              <div className="relative">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" value={author}
                  onChange={(e) => { setAuthor(e.target.value); searchAuthors(e.target.value); }}
                  onFocus={() => authorSearch.length > 0 && setShowAuthorDropdown(true)}
                  onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 200)}
                  placeholder="F. Scott Fitzgerald"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
              </div>
              {showAuthorDropdown && authorSearch.length > 0 && (
                <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                  {authorSearch.map((a: any, i: number) => (
                    <button key={i} type="button" onMouseDown={() => selectAuthor(a)}
                      className="w-full text-left px-4 py-2.5 hover:bg-rose-50 transition-colors text-sm border-b border-gray-50 last:border-0">
                      <div className="text-gray-900 font-medium">{a.name}</div>
                      {a.birth_date && <div className="text-gray-400 text-xs">{a.birth_date}{a.death_date ? ` — ${a.death_date}` : ''}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-gray-500 font-medium mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the book..." rows={2}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all resize-none" />
            </div>

            {/* URL + Cover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1">Book URL *</label>
                <input type="url" value={bookUrl} onChange={(e) => setBookUrl(e.target.value)} placeholder="https://gutenberg.org/ebooks/..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1">Cover Image URL</label>
                <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs text-gray-500 font-medium mb-1">Tags</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="fiction, classic, romance"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 focus:bg-white transition-all" />
            </div>

            <button type="submit" disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-rose-500/20">
              {saving ? <><FiLoader className="animate-spin" /> Publishing...</> : <><FiPlus size={16} /> Publish Book</>}
            </button>
          </form>
        </div>

        {/* === BOOKS LIST === */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
              <FiBookOpen className="text-rose-500" size={15} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Published Books</h2>
              <p className="text-gray-500 text-xs">{books.length} book{books.length !== 1 ? 's' : ''} in collection</p>
            </div>
          </div>

          {booksLoading ? (
            <div className="flex items-center justify-center py-16">
              <FiLoader className="animate-spin text-rose-500 text-2xl" />
            </div>
          ) : books.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center shadow-sm">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiBookOpen className="text-2xl text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No books yet</p>
              <p className="text-gray-400 text-sm mt-1">Publish your first book using the form</p>
            </div>
          ) : (
            <div className="space-y-2">
              {books.map((book) => (
                <div key={book.id} className="group bg-white rounded-2xl p-3.5 border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all flex items-center gap-3.5 shadow-sm">
                  {/* Thumbnail */}
                  <div className="w-11 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-rose-50">
                        <FiBookOpen className="text-sm text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 text-sm font-semibold truncate">{book.title}</h3>
                    <p className="text-gray-500 text-xs truncate">{book.author}</p>
                    {book.tags && book.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {book.tags.slice(0, 3).map((t: string, i: number) => (
                          <span key={i} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={book.url} target="_blank" rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50">
                      <FiExternalLink size={13} />
                    </a>
                    <button onClick={() => deleteBook(book.id, book.title)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
