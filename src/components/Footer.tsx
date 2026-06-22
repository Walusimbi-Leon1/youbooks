import { FiBook, FiGithub, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center shadow-sm">
                <FiBook className="text-white" size={15} />
              </div>
              <span className="text-base font-bold text-white">
                You<span className="text-rose-400">Books</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-4">
              Discover and read books from the world's greatest authors. Free, always.
            </p>
            <div className="flex gap-2">
              <a href="https://github.com/Walusimbi-Leon1/youbooks" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all">
                <FiGithub size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Explore</h3>
            <div className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/authors', label: 'Browse Authors' },
              ].map((l) => (
                <Link key={l.to} to={l.to}
                  className="block text-sm text-gray-500 hover:text-rose-400 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Books */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Popular Authors</h3>
            <div className="space-y-2.5">
              {['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoy', 'Mark Twain'].map((a) => (
                <Link key={a} to={`/authors?search=${encodeURIComponent(a)}`}
                  className="block text-sm text-gray-500 hover:text-rose-400 transition-colors">
                  {a}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Info</h3>
            <div className="space-y-2.5 text-sm text-gray-500">
              <p>Books from Open Library</p>
              <p>Public domain via Gutenberg</p>
              <p>Built with TypeScript</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800/60 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className="flex items-center gap-1.5 text-gray-600">
            Made with <FiHeart className="text-rose-500" size={11} /> by Leon
          </p>
          <p className="text-gray-600">
            © {new Date().getFullYear()} YouBooks — Free to read
          </p>
        </div>
      </div>
    </footer>
  );
}
