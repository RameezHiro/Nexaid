import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportNeed from './pages/ReportNeed';
import VolunteerRegistration from './pages/VolunteerRegistration';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import Impact from './pages/Impact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (e) {
      console.error("Failed to log out", e);
    }
  };

  return (
    <header className="w-full top-0 sticky z-50 bg-background dark:bg-slate-950 border-none">
      <nav className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <Link to="/" className="text-xl font-bold text-on-surface dark:text-slate-100 font-headline tracking-tighter">
          Nexaid
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-on-surface dark:text-slate-400 font-semibold hover:text-[#0058be] font-label text-sm uppercase tracking-wider transition-colors duration-200">Dashboard</Link>
          <Link to="/report-need" className="text-on-surface dark:text-slate-400 hover:text-[#0058be] font-label text-sm uppercase tracking-wider transition-colors duration-200">Report Need</Link>
          <Link to="/volunteer" className="text-on-surface dark:text-slate-400 hover:text-[#0058be] font-label text-sm uppercase tracking-wider transition-colors duration-200">Volunteer</Link>
          <Link to="/impact" className="text-on-surface dark:text-slate-400 hover:text-[#0058be] font-label text-sm uppercase tracking-wider transition-colors duration-200">Impact</Link>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest hidden lg:inline">{currentUser.email}</span>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-semibold text-error hover:bg-error/10 rounded-lg transition-colors scale-95 active:opacity-80"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-5 py-2 text-sm font-semibold text-on-surface hover:text-[#0058be] transition-colors scale-95 active:opacity-80">Sign In</Link>
              <Link to="/signup" className="px-5 py-2 text-sm font-semibold bg-primary bg-linear-to-br from-primary to-primary-container text-on-primary rounded-lg shadow-sm scale-95 active:opacity-80 transition-transform">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 bg-[#111c2d] dark:bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 border-t border-slate-800 max-w-[1440px] mx-auto pt-12 space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-white font-bold text-xl">Nexaid</div>
          <p className="text-slate-400 font-body text-sm">© 2026 Nexaid. Algorithmic Coordination.</p>
          <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/5 rounded border border-white/10">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-[10px] font-label text-slate-300 uppercase tracking-widest">Powered by Google Gemini AI</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-slate-400 hover:text-white transition-colors text-sm font-label uppercase tracking-wider" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm font-label uppercase tracking-wider" href="#">Infrastructure</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm font-label uppercase tracking-wider" href="#">Contact Support</a>
          <a className="text-slate-400 hover:text-white transition-colors text-sm font-label uppercase tracking-wider" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report-need" element={<ReportNeed />} />
            <Route path="/volunteer" element={<VolunteerRegistration />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <CoordinatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/impact" element={<Impact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
