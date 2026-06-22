import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiBookOpen, FiStar } from 'react-icons/fi';
import BookCard from '../components/BookCard';
import { PUBLIC_DOMAIN_BOOKS } from '../data/books';
import { db, collection, getDocs, query, orderBy, limit } from '../firebase';

export default function Home() {
  const [firestoreBooks, setFirestoreBooks] = useState<any[]>([]);

  useEffect(() => {
    loadFirestoreBooks();
  }, []);

  const loadFirestoreBooks = async () => {
    try {
      const booksRef = collection(db, 'books');
      const q = query(booksRef, orderBy('createdAt', 'desc'), limit(8));
      const snapshot = await getDocs(q);
      setFirestoreBooks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.log('Firestore not loaded');
    }
  };

  const allBooks = [...firestoreBooks, ...PUBLIC_DOMAIN_BOOKS];
  const displayBooks = allBooks.slice(0, 8);
  const authorCount = new Set(allBooks.map(b => b.author)).size;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Discover Books<br />
            From Every Author
          </h1>
          <p className="text-rose-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Browse thousands of public domain books from the world's greatest authors. Free to read, always.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/authors"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 rounded-full font-semibold hover:bg-rose-50 transition-colors shadow-lg"
            >
              Browse Authors <FiArrowRight />
            </Link>
            <Link
              to="/authors"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              <FiBookOpen size={16} /> View Books
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <FiBookOpen size={20} />, label: 'Public Domain Books', value: `${PUBLIC_DOMAIN_BOOKS.length}+` },
            { icon: <FiUsers size={20} />, label: 'Famous Authors', value: `${authorCount}+` },
            { icon: <FiStar size={20} />, label: 'Always Free', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="text-rose-500 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Books</h2>
            <p className="text-gray-500 text-sm mt-1">Classic literature from Project Gutenberg</p>
          </div>
          <Link
            to="/authors"
            className="flex items-center gap-1 text-rose-500 text-sm font-medium hover:text-rose-600 transition-colors"
          >
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              year={book.year}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse Authors', desc: 'Search or explore popular authors from Open Library.' },
              { step: '02', title: 'Pick a Book', desc: 'Find a book you like from the author\'s collection.' },
              { step: '03', title: 'Read Online', desc: 'Click through to read on Project Gutenberg — free forever.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-rose-200 mb-3">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to Start Reading?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Explore our collection of authors and discover your next favorite book.
          </p>
          <Link
            to="/authors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-lg"
          >
            Browse Authors <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
