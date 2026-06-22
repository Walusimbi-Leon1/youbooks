import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiBookOpen, FiStar, FiArrowDown, FiBook } from 'react-icons/fi';
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
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-500/5 to-purple-500/5 rounded-full blur-3xl" />
          {/* Floating book icons */}
          <FiBook className="absolute top-20 right-[20%] text-white/5 animate-float" size={40} />
          <FiBook className="absolute bottom-20 left-[15%] text-white/5 animate-float" style={{ animationDelay: '1.5s' }} size={30} />
          <FiBook className="absolute top-40 left-[40%] text-white/5 animate-float" style={{ animationDelay: '3s' }} size={24} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs font-medium mb-6 animate-fade-in">
            <FiBookOpen size={12} /> Free Public Domain Library
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight animate-fade-in-up">
            Discover Books<br />
            <span className="bg-gradient-to-r from-rose-300 via-rose-400 to-pink-300 bg-clip-text text-transparent">
              From Every Author
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-200">
            Browse thousands of public domain classics from the world's greatest authors. 
            Free to read, always — no signup needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-300">
            <Link
              to="/authors"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Authors <FiArrowRight size={16} />
            </Link>
            <Link
              to="/authors"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all border border-white/10"
            >
              <FiBookOpen size={16} /> Explore Books
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
            <FiArrowDown className="text-white/30" size={20} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS ═══════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <FiBookOpen size={22} />, label: 'Classic Books', value: `${PUBLIC_DOMAIN_BOOKS.length}+`, color: 'text-rose-500', bg: 'bg-rose-50' },
            { icon: <FiUsers size={22} />, label: 'Renowned Authors', value: `${authorCount}+`, color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: <FiStar size={22} />, label: '100% Free', value: 'Always', color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2.5 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-extrabold text-gray-900`}>{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ FEATURED BOOKS ═══════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Books</h2>
            <p className="text-gray-500 text-sm mt-1">Classic literature from Project Gutenberg</p>
          </div>
          <Link
            to="/authors"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-rose-500 text-sm font-medium hover:bg-rose-50 rounded-xl transition-colors"
          >
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {displayBooks.map((book, i) => (
            <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                year={book.year}
              />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            to="/authors"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
          >
            View All Books <FiArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ═══════════════════════════ */}
      <section className="bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Browse by Genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Classics', emoji: '📜', count: '30+' },
              { label: 'Romance', emoji: '💕', count: '8+' },
              { label: 'Sci-Fi', emoji: '🚀', count: '6+' },
              { label: 'Horror', emoji: '👻', count: '5+' },
              { label: 'Philosophy', emoji: '🧠', count: '10+' },
              { label: 'Adventure', emoji: '⚡', count: '8+' },
            ].map((cat, i) => (
              <Link
                key={i}
                to={`/authors?search=${encodeURIComponent(cat.label)}`}
                className="group bg-gray-50 hover:bg-gray-100 rounded-2xl p-5 text-center border border-gray-100 hover:border-gray-200 transition-all hover:-translate-y-0.5"
              >
                <div className="text-2xl mb-2">{cat.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{cat.label}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{cat.count} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ HOW IT WORKS ═══════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">How It Works</h2>
        <p className="text-gray-500 text-sm text-center mb-12">Three simple steps to start reading</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: <FiUsers size={28} />,
              title: 'Browse Authors',
              desc: 'Search or browse our curated collection of famous authors from every genre.',
            },
            {
              step: '02',
              icon: <FiBookOpen size={28} />,
              title: 'Pick a Book',
              desc: 'Explore each author\'s works and find your next great read.',
            },
            {
              step: '03',
              icon: <FiStar size={28} />,
              title: 'Read Free',
              desc: 'Click through to read on Project Gutenberg — no paywalls, ever.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-5xl font-black text-rose-100 mb-3">{item.step}</div>
              <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-3xl p-10 sm:p-14 text-center shadow-2xl">
          {/* Decorative blurs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Start Reading?</h2>
            <p className="text-gray-400 mb-7 max-w-lg mx-auto leading-relaxed">
              Explore our collection of world-famous authors and discover your next favorite book.
            </p>
            <Link
              to="/authors"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Authors <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
