import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

interface AuthorCardProps {
  authorKey: string;
  name: string;
  cover_i?: number;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
}

export default function AuthorCard({ authorKey, name, cover_i, birth_date, death_date, work_count }: AuthorCardProps) {
  const photoUrl = cover_i
    ? `https://covers.openlibrary.org/a/id/${cover_i}-M.jpg`
    : null;

  return (
    <Link
      to={`/author/${authorKey}`}
      className="group block bg-white rounded-2xl p-5 border border-gray-100 hover:border-rose-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
    >
      {/* Avatar */}
      <div className="relative w-16 h-16 mx-auto mb-3.5">
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-100 group-hover:border-rose-200 transition-colors shadow-sm">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <FiUser className="text-gray-400" size={22} />
            </div>
          )}
        </div>
        {/* Ring glow on hover */}
        <div className="absolute inset-0 rounded-full ring-2 ring-rose-500/0 group-hover:ring-rose-500/30 transition-all duration-300" />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-rose-500 transition-colors line-clamp-2 mb-1">
        {name}
      </h3>

      {/* Work count */}
      {work_count !== undefined && (
        <p className="text-gray-400 text-xs font-medium">
          {work_count.toLocaleString()} {work_count === 1 ? 'work' : 'works'}
        </p>
      )}

      {/* Dates */}
      {birth_date && (
        <p className="text-gray-400 text-[11px] mt-1 opacity-70">
          {birth_date}{death_date ? ` — ${death_date}` : ''}
        </p>
      )}
    </Link>
  );
}
