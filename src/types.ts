// Types for the application

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string | null;
  url: string;
  tags: string[];
  year?: string;
  gutenbergId?: string;
  source: 'openlibrary' | 'gutenberg' | 'custom';
}

export interface Author {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
  cover_i?: number;
  bio?: string;
  alternate_names?: string[];
}

export interface FirestoreBook {
  title: string;
  author: string;
  description: string;
  url: string;
  coverUrl: string | null;
  tags: string[];
  createdAt: string;
}
