// Public domain books from Project Gutenberg and Open Library
// These are pre-loaded into the site

export interface StaticBook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  url: string;
  gutenbergId: number;
  year: string;
  tags: string[];
}

export const PUBLIC_DOMAIN_BOOKS: StaticBook[] = [
  // Shakespeare
  {
    id: 'gutenberg-1112',
    title: 'Hamlet',
    author: 'William Shakespeare',
    description: 'The Tragedy of Hamlet, Prince of Denmark. Shakespeare\'s most famous play about revenge, madness, and mortality.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1112/pg1112.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1112',
    gutenbergId: 1112,
    year: '1603',
    tags: ['tragedy', 'classic', 'drama'],
  },
  {
    id: 'gutenberg-1513',
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    description: 'The most famous love story ever written. Two young star-crossed lovers whose deaths reconcile their feuding families.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1513',
    gutenbergId: 1513,
    year: '1597',
    tags: ['romance', 'tragedy', 'classic'],
  },
  {
    id: 'gutenberg-1524',
    title: 'The Tempest',
    author: 'William Shakespeare',
    description: 'A play about Prospero, the rightful Duke of Milan, who uses magic to conjure a storm and control events.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1524/pg1524.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1524',
    gutenbergId: 1524,
    year: '1611',
    tags: ['comedy', 'classic', 'fantasy'],
  },

  // Austen
  {
    id: 'gutenberg-1342',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'The story of Elizabeth Bennet and Mr. Darcy, exploring themes of love, reputation, and class in Regency England.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1342',
    gutenbergId: 1342,
    year: '1813',
    tags: ['romance', 'classic', 'fiction'],
  },
  {
    id: 'gutenberg-161',
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    description: 'The Dashwood sisters must navigate love, heartbreak, and financial ruin in Georgian England.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/161/pg161.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/161',
    gutenbergId: 161,
    year: '1811',
    tags: ['romance', 'classic'],
  },
  {
    id: 'gutenberg-946',
    title: 'Emma',
    author: 'Jane Austen',
    description: 'A young woman\'s misguided attempts at matchmaking lead to comic misunderstandings and personal growth.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/946/pg946.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/946',
    gutenbergId: 946,
    year: '1815',
    tags: ['romance', 'comedy', 'classic'],
  },

  // Dickens
  {
    id: 'gutenberg-46',
    title: 'A Christmas Carol',
    author: 'Charles Dickens',
    description: 'Ebenezer Scrooge is visited by three ghosts on Christmas Eve, teaching him the value of charity and kindness.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/46/pg46.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/46',
    gutenbergId: 46,
    year: '1843',
    tags: ['classic', 'holiday', 'fiction'],
  },
  {
    id: 'gutenberg-766',
    title: 'David Copperfield',
    author: 'Charles Dickens',
    description: 'The story of a young man\'s journey from impoverished childhood to literary success in Victorian England.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/766/pg766.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/766',
    gutenbergId: 766,
    year: '1850',
    tags: ['classic', 'biography', 'fiction'],
  },

  // Orwell
  {
    id: 'gutenberg-84',
    title: 'Frankenstein; Or, The Modern Prometheus',
    author: 'Mary Shelley',
    description: 'A young scientist creates a living being from dead tissue, with disastrous consequences. A masterpiece of Gothic horror.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/84',
    gutenbergId: 84,
    year: '1818',
    tags: ['horror', 'science fiction', 'classic'],
  },
  {
    id: 'gutenberg-11',
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    description: 'Alice falls through a rabbit hole into a fantastical world of peculiar creatures and nonsensical adventures.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/11',
    gutenbergId: 11,
    year: '1865',
    tags: ['fantasy', 'children', 'classic'],
  },

  // Tolstoy
  {
    id: 'gutenberg-2600',
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description: 'A masterpiece of world literature chronicling Russian society during the Napoleonic Wars.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2600/pg2600.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2600',
    gutenbergId: 2600,
    year: '1869',
    tags: ['classic', 'historical', 'fiction'],
  },

  // Verne
  {
    id: 'gutenberg-164',
    title: 'Twenty Thousand Leagues Under the Sea',
    author: 'Jules Verne',
    description: 'Professor Aronnax journeys aboard the Nautilus with the mysterious Captain Nemo on an undersea adventure.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/164/pg164.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/164',
    gutenbergId: 164,
    year: '1870',
    tags: ['science fiction', 'adventure', 'classic'],
  },

  // Wells
  {
    id: 'gutenberg-35',
    title: 'The Time Machine',
    author: 'H.G. Wells',
    description: 'A Victorian scientist travels to the year 802,701 AD, discovering the future of humanity.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/35',
    gutenbergId: 35,
    year: '1895',
    tags: ['science fiction', 'classic'],
  },
  {
    id: 'gutenberg-36',
    title: 'The Island of Doctor Moreau',
    author: 'H.G. Wells',
    description: 'A shipwrecked man discovers a mad scientist conducting horrific experiments on animals.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/36',
    gutenbergId: 36,
    year: '1896',
    tags: ['science fiction', 'horror', 'classic'],
  },

  // Doyle
  {
    id: 'gutenberg-1661',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    description: 'Twelve tales of the brilliant detective Sherlock Holmes and his loyal companion Dr. Watson.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1661',
    gutenbergId: 1661,
    year: '1892',
    tags: ['mystery', 'detective', 'classic'],
  },

  // Stoker
  {
    id: 'gutenberg-345',
    title: 'Dracula',
    author: 'Bram Stoker',
    description: 'The iconic vampire novel told through letters, diary entries, and newspaper clippings.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/345',
    gutenbergId: 345,
    year: '1897',
    tags: ['horror', 'gothic', 'classic'],
  },

  // Twain
  {
    id: 'gutenberg-76',
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    description: 'A boy\'s adventures along the Mississippi River in antebellum Missouri.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/76/pg76.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/76',
    gutenbergId: 76,
    year: '1876',
    tags: ['adventure', 'classic', 'humor'],
  },
  {
    id: 'gutenberg-74',
    title: 'The Adventures of Huckleberry Finn',
    author: 'Mark Twain',
    description: 'Huck Finn and Jim escape down the Mississippi River in this classic American novel.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/74/pg74.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/74',
    gutenbergId: 74,
    year: '1884',
    tags: ['adventure', 'classic', 'satire'],
  },

  // Hemingway
  {
    id: 'gutenberg-768',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    description: 'The dark and passionate story of Catherine and Heathcliff on the Yorkshire moors.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/768',
    gutenbergId: 768,
    year: '1847',
    tags: ['romance', 'gothic', 'classic'],
  },

  // Melville
  {
    id: 'gutenberg-2701',
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description: 'Captain Ahab\'s obsessive quest to hunt the great white whale in this epic American novel.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2701',
    gutenbergId: 2701,
    year: '1851',
    tags: ['adventure', 'classic', 'fiction'],
  },

  // Dostoyevsky
  {
    id: 'gutenberg-2554',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description: 'A destitute former student commits murder and grapples with guilt and redemption.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2554',
    gutenbergId: 2554,
    year: '1866',
    tags: ['psychological', 'classic', 'fiction'],
  },

  // Stevenson
  {
    id: 'gutenberg-43',
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde',
    author: 'Robert Louis Stevenson',
    description: 'A London lawyer investigates strange occurrences between his old friend Dr. Jekyll and the evil Edward Hyde.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/43/pg43.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/43',
    gutenbergId: 43,
    year: '1886',
    tags: ['horror', 'classic', 'thriller'],
  },

  // Hugo
  {
    id: 'gutenberg-135',
    title: 'Les Misérables',
    author: 'Victor Hugo',
    description: 'An epic tale of redemption, justice, and love in 19th-century France.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/135/pg135.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/135',
    gutenbergId: 135,
    year: '1862',
    tags: ['classic', 'historical', 'fiction'],
  },

  // Wilde
  {
    id: 'gutenberg-174',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    description: 'A young man remains youthful while his portrait ages and reflects his sins.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/174',
    gutenbergId: 174,
    year: '1890',
    tags: ['classic', 'philosophy', 'fiction'],
  },

  // Plato
  {
    id: 'gutenberg-1497',
    title: 'Republic',
    author: 'Plato',
    description: 'Plato\'s dialogue on justice, the ideal state, and the nature of the good life.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1497/pg1497.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/1497',
    gutenbergId: 1497,
    year: '380 BC',
    tags: ['philosophy', 'non-fiction', 'classic'],
  },

  // Sun Tzu
  {
    id: 'gutenberg-132',
    title: 'The Art of War',
    author: 'Sun Tzu',
    description: 'The ancient Chinese military treatise on strategy, widely applied in business and life.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/132/pg132.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/132',
    gutenbergId: 132,
    year: '500 BC',
    tags: ['philosophy', 'strategy', 'non-fiction'],
  },

  // Austen continued
  {
    id: 'gutenberg-105',
    title: 'Persuasion',
    author: 'Jane Austen',
    description: 'Anne Elliot reconnects with Captain Wentworth years after being persuaded to break off their engagement.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/105/pg105.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/105',
    gutenbergId: 105,
    year: '1817',
    tags: ['romance', 'classic'],
  },

  // Gaskell
  {
    id: 'gutenberg-734',
    title: 'North and South',
    author: 'Elizabeth Gaskell',
    description: 'A southern woman moves to industrial Manchester and clashes with a mill owner.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/734/pg734.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/734',
    gutenbergId: 734,
    year: '1855',
    tags: ['romance', 'classic', 'social'],
  },

  // James
  {
    id: 'gutenberg-145',
    title: 'Washington Square',
    author: 'Henry James',
    description: 'A young woman in New York City deals with her controlling father and a charming suitor.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/145/pg145.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/145',
    gutenbergId: 145,
    year: '1880',
    tags: ['classic', 'fiction'],
  },

  // Kafka (public domain in some jurisdictions)
  {
    id: 'gutenberg-7849',
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    description: 'Gregor Samsa wakes up transformed into a giant insect in this surreal masterpiece.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/7849/pg7849.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/7849',
    gutenbergId: 7849,
    year: '1915',
    tags: ['surreal', 'classic', 'fiction'],
  },

  // Carroll
  {
    id: 'gutenberg-13',
    title: 'Through the Looking-Glass',
    author: 'Lewis Carroll',
    description: 'Alice enters a bizarre world through a mirror, encountering fantastical characters.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/13/pg13.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/13',
    gutenbergId: 13,
    year: '1871',
    tags: ['fantasy', 'children', 'classic'],
  },

  // Montaigne
  {
    id: 'gutenberg-3600',
    title: 'The Essays of Montaigne',
    author: 'Michel de Montaigne',
    description: 'The foundational work of the essay as a literary genre.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/3600/pg3600.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/3600',
    gutenbergId: 3600,
    year: '1580',
    tags: ['philosophy', 'essays', 'classic'],
  },

  // Adam Smith
  {
    id: 'gutenberg-25717',
    title: 'The Wealth of Nations',
    author: 'Adam Smith',
    description: 'The foundational work of classical economics and free-market theory.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/25717/pg25717.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/25717',
    gutenbergId: 25717,
    year: '1776',
    tags: ['economics', 'non-fiction', 'classic'],
  },

  // Darwin
  {
    id: 'gutenberg-2009',
    title: 'On the Origin of Species',
    author: 'Charles Darwin',
    description: 'The groundbreaking work establishing the theory of evolution by natural selection.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2009/pg2009.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2009',
    gutenbergId: 2009,
    year: '1859',
    tags: ['science', 'non-fiction', 'classic'],
  },

  // Kierkegaard
  {
    id: 'gutenberg-57724',
    title: 'Fear and Trembling',
    author: 'Søren Kierkegaard',
    description: 'A philosophical work exploring the nature of faith through the story of Abraham and Isaac.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/57724/pg57724.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/57724',
    gutenbergId: 57724,
    year: '1843',
    tags: ['philosophy', 'religion', 'classic'],
  },

  // Nietzsche
  {
    id: 'gutenberg-55201',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    description: 'A philosophical novel about the concept of the Übermensch and the eternal recurrence.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/55201/pg55201.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/55201',
    gutenbergId: 55201,
    year: '1883',
    tags: ['philosophy', 'classic'],
  },

  // Machiavelli
  {
    id: 'gutenberg-10763',
    title: 'The Prince',
    author: 'Niccolò Machiavelli',
    description: 'A political treatise on how to acquire and maintain political power.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/10763/pg10763.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/10763',
    gutenbergId: 10763,
    year: '1532',
    tags: ['politics', 'philosophy', 'classic'],
  },

  // Marcus Aurelius
  {
    id: 'gutenberg-2680',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    description: 'Personal writings of the Roman Emperor on Stoic philosophy and self-discipline.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2680/pg2680.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2680',
    gutenbergId: 2680,
    year: '180 AD',
    tags: ['philosophy', 'stoicism', 'classic'],
  },

  // Defoe
  {
    id: 'gutenberg-521',
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    description: 'A man spends 28 years on a remote island in this classic adventure tale.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/521/pg521.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/521',
    gutenbergId: 521,
    year: '1719',
    tags: ['adventure', 'classic', 'fiction'],
  },

  // Swift
  {
    id: 'gutenberg-828',
    title: 'Gulliver\'s Travels',
    author: 'Jonathan Swift',
    description: 'Satirical voyages to fantastical lands including Lilliput and Brobdingnag.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/828/pg828.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/828',
    gutenbergId: 828,
    year: '1726',
    tags: ['satire', 'adventure', 'classic'],
  },

  // Rousseau
  {
    id: 'gutenberg-39336',
    title: 'The Social Contract',
    author: 'Jean-Jacques Rousseau',
    description: 'A treatise on the best way to establish a political community.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/39336/pg39336.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/39336',
    gutenbergId: 39336,
    year: '1762',
    tags: ['politics', 'philosophy', 'classic'],
  },

  // Poe
  {
    id: 'gutenberg-2148',
    title: 'The Works of Edgar Allan Poe — Volume 1',
    author: 'Edgar Allan Poe',
    description: 'Tales of mystery and the macabre from the master of the short story.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2148/pg2148.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2148',
    gutenbergId: 2148,
    year: '1845',
    tags: ['horror', 'mystery', 'classic'],
  },

  // Conrad
  {
    id: 'gutenberg-219',
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
    description: 'A journey into the African Congo that becomes a journey into the darkness of the human soul.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/219/pg219.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/219',
    gutenbergId: 219,
    year: '1899',
    tags: ['classic', 'adventure', 'philosophy'],
  },

  // Doyle continued
  {
    id: 'gutenberg-2350',
    title: 'The Lost World',
    author: 'Arthur Conan Doyle',
    description: 'Professor Challenger leads an expedition to a plateau in South America where dinosaurs still live.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2350/pg2350.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/2350',
    gutenbergId: 2350,
    year: '1912',
    tags: ['adventure', 'science fiction', 'classic'],
  },

  // Burroughs
  {
    id: 'gutenberg-62',
    title: 'A Princess of Mars',
    author: 'Edgar Rice Burroughs',
    description: 'John Carter is transported to Mars and becomes embarted on epic adventures.',
    coverUrl: 'https://www.gutenberg.org/cache/epub/62/pg62.cover.medium.jpg',
    url: 'https://www.gutenberg.org/ebooks/62',
    gutenbergId: 62,
    year: '1912',
    tags: ['science fiction', 'adventure', 'classic'],
  },
];
