import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Analysis from './pages/Analysis';
import CaseStudies from './pages/CaseStudies';
import Data from './pages/Data';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/cases" element={<CaseStudies />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
