import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiLoader, FiUser, FiBookOpen, FiExternalLink, FiBook } from 'react-icons/fi';
import { PUBLIC_DOMAIN_BOOKS } from '../data/books';

const API = 'https://openlibrary.org';

interface AuthorInfo {
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
  bio?: string | { value: string };
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <FiLoader className="animate-spin text-rose-500 text-3xl mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading author...</p>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiBook className="text-2xl text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">Author not found</p>
        <Link to="/authors" className="inline-block mt-4 text-rose-500 text-sm font-medium hover:underline">
          ← Back to Authors
        </Link>
      </div>
    );
  }

  const photoUrl = author.photos?.[0]
    ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
    : null;

  const bio = typeof author.bio === 'string' ? author.bio : author.bio?.value || '';

  // Match our public domain books
  const matchingBooks = PUBLIC_DOMAIN_BOOKS.filter(b =>
    b.author.toLowerCase().includes(author.name?.toLowerCase() || '')
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Back link */}
      <Link to="/authors" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-rose-500 mb-6 text-sm transition-colors">
        <FiArrowLeft size={14} /> Back to Authors
      </Link>

      {/* Author header card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Photo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 shadow-sm ring-2 ring-gray-100">
            {photoUrl ? (
              <img src={photoUrl} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiUser className="text-3xl text-gray-300" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{author.name}</h1>
            {author.personal_name && author.personal_name !== author.name && (
              <p className="text-gray-500 text-sm mb-2">{author.personal_name}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {author.birth_date && (
                <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">
                  Born {author.birth_date}
                </span>
              )}
              {author.death_date && (
                <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">
                  Died {author.death_date}
                </span>
              )}
              {author.work_count !== undefined && (
                <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-xs rounded-lg border border-rose-100 font-medium">
                  {author.work_count} works
                </span>
              )}
            </div>

            {author.links?.[0] && (
              <a href={author.links[0].url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-rose-500 text-sm hover:text-rose-600 transition-colors font-medium">
                Wikipedia <FiExternalLink size={12} />
              </a>
            )}

            {bio && (
              <p className="text-gray-600 text-sm leading-relaxed mt-4 border-t border-gray-100 pt-4">
                {bio.length > 400 ? bio.substring(0, 400) + '...' : bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Our books section */}
      {matchingBooks.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
              <FiBookOpen className="text-rose-500" size={15} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">On YouBooks</h2>
              <p className="text-gray-500 text-xs">{matchingBooks.length} books available</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {matchingBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-rose-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[2/3] bg-gray-50">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
                      <FiBookOpen className="text-2xl text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-3.5">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-rose-500 transition-colors">{book.title}</h3>
                  <span className="inline-block mt-1.5 text-[10px] text-gray-300 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{book.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Open Library works */}
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <FiExternalLink className="text-gray-500" size={15} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">More on Open Library</h2>
            {author.work_count !== undefined && (
              <p className="text-gray-500 text-xs">{author.work_count} total works</p>
            )}
          </div>
        </div>

        {worksLoading ? (
          <div className="flex items-center justify-center py-16">
            <FiLoader className="animate-spin text-rose-500 text-xl" />
          </div>
        ) : works.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {works.map((work) => (
              <a
                key={work.key}
                href={`https://openlibrary.org${work.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[2/3] bg-gray-50">
                  {work.covers?.[0] ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
                      <FiBookOpen className="text-2xl text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-3.5">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-500 transition-colors">{work.title}</h3>
                  {work.first_publish_date && (
                    <span className="inline-block mt-1.5 text-[10px] text-gray-300 font-medium bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{work.first_publish_date}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
            <FiBookOpen className="text-3xl text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No works found on Open Library for this author.</p>
          </div>
        )}
      </div>
    </div>
  );
}
