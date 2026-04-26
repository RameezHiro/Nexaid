import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrisisMap from '../components/CrisisMap';

function CoordinatorDashboard() {
  const [needs, setNeeds] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // tabs: overview, needs, logistics

  // Matching States
  const [matchingModalOpen, setMatchingModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [matchingLoading, setMatchingLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await axios.get('https://nexaid-production.up.railway.app/api/needs/active');
      setNeeds(resp.data.needs || []);
      setSummary(resp.data.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMatching = async (need) => {
    setSelectedNeed(need);
    setMatchingModalOpen(true);
    setSuggestions([]);
    setMatchingLoading(true);
    try {
      const resp = await axios.get(`https://nexaid-production.up.railway.app/api/matches/suggest/${need.id}`);
      setSuggestions(resp.data.suggestions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setMatchingLoading(false);
    }
  };

  const handleConfirmMatch = async (volunteerId) => {
    try {
      await axios.post(`https://nexaid-production.up.railway.app/api/matches/${selectedNeed.id}?volunteer_id=${volunteerId}`);
      setMatchingModalOpen(false);
      fetchData(); // Refresh list to show matched status
    } catch (e) {
      console.error(e);
    }
  };

  const criticalCount = needs.filter(n => n.urgency?.toLowerCase() === 'critical').length;

  const getUrgencyClass = (urgency) => {
    const l = urgency?.toLowerCase() || '';
    if (l === 'critical') return 'bg-error-container text-on-error-container';
    if (l === 'high') return 'bg-tertiary-container text-on-tertiary-fixed';
    return 'bg-surface-container-high text-on-surface-variant';
  };

  const renderOverview = () => (
    <>
      <section className="mb-12">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] opacity-80 mb-2">Critical Operations</p>
              <h3 className="text-6xl font-black font-headline tracking-tighter mb-1">{needs.length}</h3>
              <p className="font-body font-medium">Unresolved Emergency Needs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-white">auto_awesome</span>
                <p className="font-label text-[10px] uppercase tracking-wider">Recommended Action</p>
              </div>
              <p className="text-lg font-semibold leading-snug mb-4">
                {summary?.recommendation || `Deploy specialists to handle ${criticalCount} critical need(s) immediately.`}
              </p>
              <button className="bg-surface text-primary px-4 py-2 rounded font-label text-[10px] uppercase tracking-widest font-bold">Execute Deployment</button>
            </div>
            <div className="space-y-4">
              <p className="font-label text-[10px] uppercase tracking-widest opacity-80">Dashboard Intel</p>
              <div className="space-y-2">
                <p className="text-sm border-l-2 border-white pl-2">
                  {summary?.overall_sentiment || "Analyzing overall network load."}
                </p>
                <p className="text-xs text-white/80 mt-2">Critical Needs: {criticalCount}</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-container rounded-full blur-3xl opacity-30"></div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-headline text-xl font-bold tracking-tight text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">public</span>
            Geographic Command View
          </h4>
          <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Real-time Coordination Map</span>
        </div>
        <CrisisMap needs={needs} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant group hover:border-primary transition-all">
          <h4 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">diversity_3</span>
            Volunteer Pool
          </h4>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Our matching engine analyzes available volunteers with specialized medical and logistical skills ready for dispatch.
          </p>
          <button onClick={() => setActiveTab('logistics')} className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
            Manage Logistics <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant group hover:border-primary transition-all">
          <h4 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">analytics</span>
            Impact Tracking
          </h4>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Average response time has improved by 14.2% since the last automated coordination cycle.
          </p>
          <a href="/impact" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
            View Analytics <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </>
  );

  const renderNeeds = () => (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h4 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Active Need Registry</h4>
          <p className="text-on-surface-variant text-sm">Algorithmic prioritization based on urgency and skill availability.</p>
        </div>
        <button className="bg-surface-container-high px-4 py-2 rounded-md font-label text-[10px] uppercase tracking-widest text-on-secondary-container hover:bg-primary hover:text-on-primary transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {needs.length === 0 ? (
          <div className="col-span-full py-24 text-center text-outline flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-6xl opacity-20">inventory_2</span>
            <p>No active needs to resolve. Everything is optimal.</p>
          </div>
        ) : (
          needs.map(need => (
            <div key={need.id} className={`bg-surface-container-lowest p-6 rounded-lg shadow-sm border-l-4 ${need.status === 'matched' ? 'border-green-500 opacity-80' : 'border-primary'} flex flex-col h-full hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-6">
                <span className={`${getUrgencyClass(need.urgency)} px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider`}>
                  {need.status === 'matched' ? 'RESOLVED' : (need.urgency?.toUpperCase() || 'NORMAL')}
                </span>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">more_vert</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{need.status === 'matched' ? '✅' : '📋'}</span>
                <h5 className="text-lg font-bold text-on-surface line-clamp-1">{need.title || 'Support Needed'}</h5>
              </div>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                {need.description || need.raw_text?.substring(0, 100)}...
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                <span className="text-xs font-medium text-outline">{need.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8 h-12 overflow-hidden">
                {(need.skills || need.skills_required || need.tags || []).map(skill => (
                  <span key={skill} className="bg-surface-container-high text-on-secondary-container px-2 py-1 rounded-sm text-[10px] font-label uppercase tracking-widest">{skill}</span>
                ))}
              </div>
              <button
                onClick={() => handleStartMatching(need)}
                disabled={need.status === 'matched'}
                className={`w-full ${need.status === 'matched' ? 'bg-green-100 text-green-700' : 'bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary'} py-3 rounded-md font-label text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200`}
              >
                {need.status === 'matched' ? 'Volunteer Assigned' : 'Find Volunteer'}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );

  const renderLogistics = () => (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h4 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Logistics Hub</h4>
        <p className="text-on-surface-variant text-sm">Managing active deployments and volunteer matching efficiency.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
            <tr>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant">
            {[
              { id: 1, item: 'Medical Specialists', dest: 'North District', status: 'En Route', color: 'text-primary' },
              { id: 2, item: 'Food Supplies (2t)', dest: 'Naw Haven Shelter', status: 'Delivered', color: 'text-green-600' },
              { id: 3, item: 'Sanitation Team', dest: 'West Camps', status: 'Standby', color: 'text-outline' },
            ].map(row => (
              <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-on-surface">{row.item}</div>
                  <div className="text-[10px] uppercase tracking-widest text-outline">ID: {row.id}AX9</div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{row.dest}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${row.color}`}>{row.status}</span>
                </td>
                <td className="px-6 py-4 text-primary font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:underline">Track</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-white p-4 rounded-xl shadow-xl border border-primary/5 rotate-[-2deg]">
          <span className="material-symbols-outlined text-primary text-5xl">hub</span>
        </div>
        <div>
          <h5 className="text-lg font-bold text-on-surface mb-2">Automated Matching Engine</h5>
          <p className="text-sm text-on-surface-variant mb-4 leading-relaxed max-w-xl">
            Our AI engine is currently monitoring 12 upcoming deployments. It has pre-calculated the most efficient route and volunteer distribution for the next 24 hours.
          </p>
          <button className="bg-primary text-white px-6 py-2 rounded font-label text-[10px] uppercase tracking-widest font-bold hover:bg-primary-container transition-colors">Run Optimization</button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex max-w-[1440px] mx-auto flex-col lg:flex-row min-h-screen bg-surface">
      <aside className="lg:w-64 w-full bg-surface-container-low flex flex-col p-6 space-y-4 shadow-sm border-r border-surface-variant min-h-[300px] lg:min-h-screen sticky top-0">
        <div className="mb-8 hidden lg:block">
          <h2 className="text-xl font-black text-on-surface font-headline tracking-tighter">Nexaid</h2>
          <p className="text-[10px] font-label uppercase tracking-widest text-outline font-bold">Command Center</p>
        </div>
        <nav className="flex-1 space-y-2 flex sm:flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'overview' ? 'bg-white text-primary shadow-sm font-bold' : 'text-secondary hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'overview' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            <span className="font-label text-[10px] uppercase tracking-wider hidden lg:inline">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('needs')}
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'needs' ? 'bg-white text-primary shadow-sm font-bold' : 'text-secondary hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'needs' ? "'FILL' 1" : "'FILL' 0" }}>emergency</span>
            <span className="font-label text-[10px] uppercase tracking-wider hidden lg:inline">Live Needs</span>
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${activeTab === 'logistics' ? 'bg-white text-primary shadow-sm font-bold' : 'text-secondary hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'logistics' ? "'FILL' 1" : "'FILL' 0" }}>local_shipping</span>
            <span className="font-label text-[10px] uppercase tracking-wider hidden lg:inline">Logistics</span>
          </button>
        </nav>
        <button className="w-full mt-auto bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-md font-label text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm">add</span>
          New Request
        </button>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-surface">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-primary font-bold text-xs uppercase tracking-widest">Indexing Intelligence...</p>
          </div>
        ) : (
          <div className="max-w-6xl">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'needs' && renderNeeds()}
            {activeTab === 'logistics' && renderLogistics()}
          </div>
        )}
      </main>

      {/* Matching Discovery Modal */}
      {matchingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-8 text-on-primary flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6">psychology</span>
                <h4 className="text-2xl font-headline font-black leading-tight mb-2">Match Discovery</h4>
                <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Powered by Gemini AI</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Analyzing</p>
                <p className="text-sm font-medium line-clamp-3">{selectedNeed?.description || selectedNeed?.raw_text}</p>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h5 className="font-bold text-on-surface uppercase tracking-widest text-[10px]">AI Recommendations</h5>
                <button onClick={() => setMatchingModalOpen(false)} className="material-symbols-outlined text-outline hover:text-on-surface">close</button>
              </div>

              <div className="space-y-4 min-h-[300px]">
                {matchingLoading ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
                    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">Scanning Volunteer Network...</p>
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-outline mb-4 opacity-20">person_off</span>
                    <p className="text-sm text-outline">No optimal matches found in proximity. Try broadcasting the request.</p>
                  </div>
                ) : (
                  suggestions.map((sug, idx) => (
                    <div key={idx} className="group bg-surface-container-low p-4 rounded-xl border border-surface-variant hover:border-primary transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h6 className="font-bold text-on-surface">{sug.volunteer_name}</h6>
                          <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">location_on</span>
                            {sug.volunteer_location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-primary leading-none">{sug.match_score}%</p>
                          <p className="text-[8px] uppercase font-bold tracking-tighter text-outline">Match Score</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-on-surface-variant italic mb-4 leading-relaxed">"{sug.reason}"</p>
                      <button
                        onClick={() => handleConfirmMatch(sug.volunteer_id)}
                        className="w-full py-2 bg-on-surface text-surface text-[10px] font-bold uppercase tracking-widest rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-primary"
                      >
                        Confirm Deployment
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoordinatorDashboard;
