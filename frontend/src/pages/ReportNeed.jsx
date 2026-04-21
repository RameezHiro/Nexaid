import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ReportNeed() {
  const [location, setLocation] = useState('');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleAnalyze = async () => {
    if (!location || !rawText) return;
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/needs/submit', {
        location: location,
        raw_text: rawText
      });
      setResults(response.data.needs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyClass = (urgency) => {
    const l = urgency?.toLowerCase() || '';
    if (l === 'critical') return 'bg-error-container text-on-error-container border-error';
    if (l === 'high') return 'bg-tertiary-container text-on-tertiary-fixed border-tertiary';
    return 'bg-surface-container-highest text-on-surface-variant border-primary';
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12 flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary font-medium group">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="hover:underline">Back to Dashboard</span>
        </Link>
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Report Community Need</h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">Leverage the Gemini AI engine to parse complex community reports and identify actionable logistical needs in seconds.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-sm border-l-4 border-primary">
          <form className="space-y-8">
            <div>
              <label className="block font-bold uppercase tracking-wider text-sm text-on-surface-variant mb-2">Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                <input 
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                  placeholder="e.g. South District, New Haven" 
                />
              </div>
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-sm text-on-surface-variant mb-2">Community Survey Data</label>
              <textarea 
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                className="w-full p-4 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all leading-relaxed" 
                placeholder="Paste your community survey report here..." 
                rows="10">
              </textarea>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-md font-semibold flex items-center gap-3 hover:opacity-90 transition-all shadow-md disabled:opacity-50">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                {loading ? 'Analyzing...' : 'Analyze with Gemini AI'}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-high rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-on-secondary-container">Logistical Intelligence</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-sm text-on-secondary-container">Identifies specific skill requirements</span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-sm text-on-secondary-container">Calculates urgency based on sentiment</span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-sm text-on-secondary-container">Groups needs by infrastructure sectors</span>
              </li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-xl h-48">
            <img className="w-full h-full object-cover grayscale opacity-80" alt="map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW0mkF4uw6FAHB8xEJyFccSrnvUfmbdFiFrIRe97GTcAsJNapUX7gtGi-RU0fKMG8UHpraluezgwC0umT6xXcYXDPWjgtiEzkTss2ReTWhuio5EUkqjomOfCj1qwl0ATGI9SWBQDLGjmNyPgCEo9bS4hHtQ1YUEsn7buGzk_OUFQoBNnyo8D7TpjTsHWAU5a6pc7QJuE3CYK9Sin_2uMO7emN7I57GUhrBNOx6M2U38qcMOrsgh3Us8Wl-8uXlWRpCty4fN7nFuZTs" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mb-16 bg-surface-container-low rounded-xl p-12 flex flex-col items-center justify-center text-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-primary tracking-tight">Gemini is analyzing your report...</p>
            <p className="text-on-surface-variant text-sm">Identifying logistical bottlenecks and resource gaps</p>
          </div>
        </div>
      )}

      {results.length > 0 && !loading && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight">Extracted Community Needs</h2>
            <span className="font-bold text-outline uppercase text-sm tracking-widest">{results.length} Insights Found</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((need, idx) => {
              const uClass = getUrgencyClass(need.urgency);
              return (
                <div key={idx} className={`bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col h-full border-l-4 ${uClass.split(' ').find(c => c.startsWith('border-'))}`}>
                  <div className="flex justify-between items-start mb-4">
                    {/* Placeholder icon since we don't have exact mapping, default to toolkit or food */}
                    <span className="text-3xl">🧩</span> 
                    <span className={`${uClass.replace(/border-.*/,'')} px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-tighter`}>{need.urgency || 'Normal'}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{need.title || 'Identified Need'}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">{need.description}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-container">
                    {(need.skills || need.tags || ['General']).slice(0,2).map(skill => (
                      <span key={skill} className="bg-surface-container-high text-on-secondary-container px-2 py-1 rounded text-[10px] font-bold">{skill}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default ReportNeed;
