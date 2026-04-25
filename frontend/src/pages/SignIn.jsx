import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials or security protocol failure. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-2xl border border-surface-variant backdrop-blur-sm">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-6">
               <h2 className="text-3xl font-black text-on-surface tracking-tighter">Nexaid</h2>
            </Link>
            <h1 className="text-2xl font-bold text-on-surface tracking-tight mb-2">Command Authorization</h1>
            <p className="text-sm text-on-surface-variant font-medium">Please verify your credentials to access the logistics core.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container text-xs font-bold rounded-xl border border-error/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">security</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface px-1">Institutional Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">alternate_email</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium placeholder:text-outline/50"
                  placeholder="coordinator@nexaid.org"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface">Access Key</label>
                <a href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot Key?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-linear-to-br from-primary to-primary-container text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <span>{loading ? 'Authorizing...' : 'Authorize Access'}</span>
              <span className="material-symbols-outlined text-sm">shield_with_heart</span>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-variant text-center">
            <p className="text-sm text-on-surface-variant mb-4">New to the coordination network?</p>
            <Link to="/signup" className="text-primary font-bold text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">Request Infrastructure Access</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
