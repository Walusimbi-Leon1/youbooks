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
  // Generate a subtle gradient background based on the title string for fallback
  const gradients = [
    'from-rose-100 to-pink-100',
    'from-blue-100 to-indigo-100',
    'from-emerald-100 to-teal-100',
    'from-amber-100 to-orange-100',
    'from-violet-100 to-purple-100',
    'from-cyan-100 to-sky-100',
  ];
  const gradientIndex = title.length % gradients.length;

  return (
    <Link
      to={`/book/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div className="aspect-[2/3] bg-gray-50 relative overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center`}>
            <FiBookOpen className="text-3xl text-gray-300" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-medium px-3 py-1.5 bg-rose-500 rounded-full shadow-lg">
            Read Now →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-rose-500 transition-colors mb-0.5">
          {title}
        </h3>
        <p className="text-gray-400 text-xs">{author}</p>
        {year && (
          <span className="inline-block mt-2 text-[10px] text-gray-300 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
            {year}
          </span>
        )}
      </div>
    </Link>
  );
}
