import { FiBook, FiGithub, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-rose-500 rounded-md flex items-center justify-center">
                <FiBook className="text-white" size={14} />
              </div>
              <span className="text-base font-bold text-white">
                You<span className="text-rose-400">Books</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Discover and read books from authors worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-rose-400 transition-colors">Home</Link>
              <Link to="/authors" className="block text-sm hover:text-rose-400 transition-colors">Browse Authors</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">About</h3>
            <p className="text-sm leading-relaxed mb-3">
              Books sourced from Open Library and Project Gutenberg.
            </p>
            <a
              href="https://github.com/Walusimbi-Leon1/youbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm hover:text-rose-400 transition-colors"
            >
              <FiGithub /> GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs">
          <p className="flex items-center justify-center gap-1">
            Made with <FiHeart className="text-rose-500" /> by Leon
          </p>
        </div>
      </div>
    </footer>
  );
}
