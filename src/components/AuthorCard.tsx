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
      className="group block bg-white rounded-xl p-4 border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all duration-200 text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-100 mb-3 border-2 border-gray-100 group-hover:border-rose-200 transition-colors">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <FiUser className="text-gray-400" size={20} />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-rose-500 transition-colors line-clamp-2 mb-1">
        {name}
      </h3>
      {work_count !== undefined && (
        <p className="text-gray-500 text-xs">
          {work_count} {work_count === 1 ? 'work' : 'works'}
        </p>
      )}
      {birth_date && (
        <p className="text-gray-400 text-xs mt-0.5">
          {birth_date}{death_date ? ` — ${death_date}` : ''}
        </p>
      )}
    </Link>
  );
}
