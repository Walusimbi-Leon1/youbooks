import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Authors from './pages/Authors';
import AuthorPage from './pages/AuthorPage';
import BookReader from './pages/BookReader';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/author/:authorId" element={<AuthorPage />} />
            <Route path="/book/:bookId" element={<BookReader />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
