import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiLoader, FiBookOpen, FiSearch, FiPlus, FiLogIn, FiLogOut, FiLock } from 'react-icons/fi';
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
    if (!title.trim()) return toast.error('Title required');
    if (!author.trim()) return toast.error('Author required');
    if (!bookUrl.trim()) return toast.error('URL required');

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
      toast.error('Failed');
    }
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <FiLoader className="animate-spin text-rose-500 text-2xl" />
      </div>
    );
  }

  // Login form
  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiLock className="text-rose-500 text-xl" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Access</h1>
            <p className="text-gray-500 text-sm">Sign in to manage books</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" autoComplete="email"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" autoComplete="current-password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>
            <button type="submit" disabled={loggingIn}
              className="w-full py-2.5 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm">
              {loggingIn ? <><FiLoader className="animate-spin" /> Signing in...</> : <><FiLogIn /> Sign In</>}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-400 text-xs hover:text-rose-500 transition-colors">← Back to YouBooks</Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Signed in as <span className="text-rose-500 font-medium">{user.email}</span></p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 text-sm rounded-lg hover:text-red-500 hover:bg-red-50 transition-all border border-gray-200">
          <FiLogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiPlus className="text-rose-500" /> Add Book
          </h2>

          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>

            <div className="relative">
              <label className="block text-xs text-gray-500 mb-1">Author *</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" value={author}
                  onChange={(e) => { setAuthor(e.target.value); searchAuthors(e.target.value); }}
                  onFocus={() => authorSearch.length > 0 && setShowAuthorDropdown(true)}
                  onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 200)}
                  placeholder="Search author..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
              </div>
              {showAuthorDropdown && authorSearch.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {authorSearch.map((a: any, i: number) => (
                    <button key={i} type="button" onMouseDown={() => selectAuthor(a)}
                      className="w-full text-left px-3 py-2 hover:bg-rose-50 transition-colors text-sm border-b border-gray-50 last:border-0">
                      <div className="text-gray-900 font-medium">{a.name}</div>
                      {a.birth_date && <div className="text-gray-400 text-xs">{a.birth_date}{a.death_date ? ` — ${a.death_date}` : ''}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description" rows={2}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none" />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Book URL *</label>
              <input type="url" value={bookUrl} onChange={(e) => setBookUrl(e.target.value)} placeholder="https://..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Cover Image URL</label>
              <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Tags (comma-separated)</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="fiction, classic"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>

            <button type="submit" disabled={saving}
              className="w-full py-2.5 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm">
              {saving ? <><FiLoader className="animate-spin" /> Publishing...</> : <><FiPlus /> Publish Book</>}
            </button>
          </form>
        </div>

        {/* Books list */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiBookOpen className="text-rose-500" /> Published ({books.length})
          </h2>

          {booksLoading ? (
            <div className="flex items-center justify-center py-12">
              <FiLoader className="animate-spin text-rose-500 text-xl" />
            </div>
          ) : books.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center">
              <FiBookOpen className="text-3xl text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No books yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {books.map((book) => (
                <div key={book.id} className="bg-white rounded-xl p-3 border border-gray-200 hover:border-rose-200 transition-all flex items-center gap-3">
                  <div className="w-10 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiBookOpen className="text-sm text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 text-sm font-medium truncate">{book.title}</h3>
                    <p className="text-gray-500 text-xs truncate">{book.author}</p>
                  </div>
                  <button onClick={() => deleteBook(book.id, book.title)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
