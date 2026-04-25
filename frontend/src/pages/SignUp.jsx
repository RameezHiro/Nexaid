import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. ' + err.message);
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
            <h1 className="text-2xl font-bold text-on-surface tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-on-surface-variant font-medium">Join the algorithmic coordination network.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container text-xs font-bold rounded-xl border border-error/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">warning</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
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
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface px-1">Access Key</label>
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
              <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
              <span className="material-symbols-outlined text-sm">person_add</span>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-variant text-center">
            <p className="text-sm text-on-surface-variant mb-4">Already have an account?</p>
            <Link to="/signin" className="text-primary font-bold text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">Return to Auth</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
