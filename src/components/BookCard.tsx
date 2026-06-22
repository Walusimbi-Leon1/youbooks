import { Link } from 'react-router-dom';
import { FiBookOpen } from 'react-icons/fi';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  year?: string;
}

export default function BookCard({ id, title, author, coverUrl, year }: BookCardProps) {
  return (
    <Link
      to={`/book/${id}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[2/3] bg-gray-100 relative overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiBookOpen className="text-3xl text-gray-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-xs font-medium">Read Now →</span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-0.5 group-hover:text-rose-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-1">{author}</p>
        {year && <p className="text-gray-400 text-xs mt-1">{year}</p>}
      </div>
    </Link>
  );
}
