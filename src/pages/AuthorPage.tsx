import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiUser, FiBookOpen, FiExternalLink } from 'react-icons/fi';
import { PUBLIC_DOMAIN_BOOKS } from '../data/books';

const API = 'https://openlibrary.org';

interface AuthorInfo {
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
  bio?: string;
  photos?: number[];
  links?: { url: string; title: string }[];
}

interface Work {
  key: string;
  title: string;
  first_publish_date?: string;
  covers?: number[];
  description?: string | { value: string };
}

export default function AuthorPage() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<AuthorInfo | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [worksLoading, setWorksLoading] = useState(true);

  useEffect(() => {
    loadAuthor();
  }, [authorId]);

  const loadAuthor = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}${authorId}.json`);
      const data = await res.json();
      setAuthor(data);

      setWorksLoading(true);
      const worksRes = await fetch(`${API}${authorId}/works.json?limit=50`);
      const worksData = await worksRes.json();
      setWorks(worksData.entries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setWorksLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <FiLoader className="animate-spin text-rose-500 text-2xl" />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Author not found.</p>
        <Link to="/authors" className="text-rose-500 mt-3 inline-block hover:underline">← Back to Authors</Link>
      </div>
    );
  }

  const photoUrl = author.photos?.[0]
    ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
    : null;

  const bio = typeof author.bio === 'string' ? author.bio : author.bio || '';

  // Match works to our public domain books
  const matchingBooks = PUBLIC_DOMAIN_BOOKS.filter(b =>
    b.author.toLowerCase().includes(author.name?.toLowerCase() || '')
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/authors" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-rose-500 mb-6 text-sm transition-colors">
        <FiArrowLeft size={14} /> Back to Authors
      </Link>

      {/* Author Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
            {photoUrl ? (
              <img src={photoUrl} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiUser className="text-3xl text-gray-300" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{author.name}</h1>
            {author.personal_name && author.personal_name !== author.name && (
              <p className="text-gray-500 text-sm mb-2">Full name: {author.personal_name}</p>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
              {author.birth_date && <span>Born: {author.birth_date}</span>}
              {author.death_date && <span>Died: {author.death_date}</span>}
              {author.work_count !== undefined && <span>{author.work_count} works</span>}
            </div>
            {author.links?.[0] && (
              <a href={author.links[0].url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-rose-500 text-sm hover:underline">
                Wikipedia <FiExternalLink size={12} />
              </a>
            )}
            {bio && (
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                {bio.length > 400 ? bio.substring(0, 400) + '...' : bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Books from Project Gutenberg */}
      {matchingBooks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiBookOpen className="text-rose-500" />
            <h2 className="text-lg font-bold text-gray-900">Books on YouBooks ({matchingBooks.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {matchingBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all"
              >
                <div className="aspect-[2/3] bg-gray-100">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiBookOpen className="text-2xl text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-rose-500 transition-colors">{book.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{book.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Open Library Works */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FiBookOpen className="text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">
            More Works on Open Library
            {author.work_count !== undefined && ` (${author.work_count})`}
          </h2>
        </div>

        {worksLoading ? (
          <div className="flex items-center justify-center py-12">
            <FiLoader className="animate-spin text-rose-500 text-xl" />
          </div>
        ) : works.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {works.map((work) => (
              <a
                key={work.key}
                href={`https://openlibrary.org${work.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all"
              >
                <div className="aspect-[2/3] bg-gray-100">
                  {work.covers?.[0] ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiBookOpen className="text-2xl text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-rose-500 transition-colors">{work.title}</h3>
                  {work.first_publish_date && (
                    <p className="text-gray-500 text-xs mt-0.5">{work.first_publish_date}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <FiBookOpen className="text-2xl text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No works found on Open Library.</p>
          </div>
        )}
      </div>
    </div>
  );
}
