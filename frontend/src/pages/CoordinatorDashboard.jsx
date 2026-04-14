import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoordinatorDashboard() {
  const [needs, setNeeds] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await axios.get('http://127.0.0.1:8000/api/needs/active');
      setNeeds(resp.data.needs || []);
      setSummary(resp.data.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const criticalCount = needs.filter(n => n.urgency?.toLowerCase() === 'critical').length;
  // If there's an actual summary provided by Gemini on the backend, we could use that.
  // Otherwise we render static layout mimicking the design.

  const getUrgencyClass = (urgency) => {
    const l = urgency?.toLowerCase() || '';
    if (l === 'critical') return 'bg-error-container text-on-error-container';
    if (l === 'high') return 'bg-tertiary-container text-on-tertiary-fixed';
    return 'bg-surface-container-high text-on-surface-variant';
  };

  return (
    <div className="flex max-w-[1440px] mx-auto flex-col lg:flex-row">
      <aside className="lg:w-64 w-full bg-[#f0f3ff] dark:bg-slate-900 flex flex-col p-6 space-y-4 shadow-sm min-h-[300px] lg:min-h-screen">
        <div className="mb-8 hidden lg:block">
          <h2 className="text-lg font-black text-[#111c2d] dark:text-white font-headline">Command Center</h2>
          <p className="text-[10px] font-label uppercase tracking-widest text-outline">NGO Coordinator</p>
        </div>
        <nav className="flex-1 space-y-2 flex sm:flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          <a className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 text-primary shadow-sm rounded-md min-w-[120px] lg:min-w-0" href="#">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-label text-xs uppercase tracking-wider hidden lg:inline">Overview</span>
          </a>
          <a className="flex items-center gap-3 p-3 text-secondary dark:text-slate-400 hover:bg-primary-fixed hover:text-primary rounded-md min-w-[120px] lg:min-w-0" href="#">
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span className="font-label text-xs uppercase tracking-wider hidden lg:inline">Live Needs</span>
          </a>
          <a className="flex items-center gap-3 p-3 text-secondary dark:text-slate-400 hover:bg-primary-fixed hover:text-primary rounded-md min-w-[120px] lg:min-w-0" href="#">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            <span className="font-label text-xs uppercase tracking-wider hidden lg:inline">Logistics</span>
          </a>
        </nav>
        <button className="w-full mt-auto bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 rounded-md font-label text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          New Request
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-surface min-h-screen">
        {loading ? (
            <div className="flex justify-center py-20 text-primary font-bold">Loading dashboard...</div>
        ) : (
            <>
                <section className="mb-12">
                <div className="col-span-12 bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary shadow-lg relative overflow-hidden">
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
                           <p className="text-xs text-white/80 mt-2">
                            Critical Needs: {criticalCount}
                           </p>
                        </div>
                    </div>
                    </div>
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-container rounded-full blur-3xl opacity-30"></div>
                </div>
                </section>

                <section className="mb-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                    <h4 className="font-headline text-xl font-bold tracking-tight text-on-surface">Active Need Registry</h4>
                    <p className="text-on-surface-variant text-sm">Algorithmic prioritization based on urgency and skill availability.</p>
                    </div>
                    <div className="flex gap-2">
                    <button className="bg-surface-container-high px-4 py-2 rounded-md font-label text-[10px] uppercase tracking-widest text-on-secondary-container">Filter All</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {needs.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-outline">No active needs to resolve. Everything is optimal.</div>
                    ) : (
                        needs.map(need => (
                            <div key={need.id} className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border-l-4 border-primary flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`${getUrgencyClass(need.urgency)} px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider`}>
                                        {need.urgency?.toUpperCase() || 'NORMAL'}
                                    </span>
                                    <span className="material-symbols-outlined text-outline">more_vert</span>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">📋</span>
                                    <h5 className="text-lg font-bold text-on-surface">{need.title || 'Support Needed'}</h5>
                                </div>
                                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed flex-grow">
                                    {need.description || need.raw_text?.substring(0,100)}...
                                </p>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                                    <span className="text-xs font-medium text-outline">{need.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {(need.skills || need.tags || []).map(skill => (
                                       <span key={skill} className="bg-surface-container-high text-on-secondary-container px-2 py-1 rounded-sm text-[10px] font-label uppercase tracking-widest">{skill}</span>
                                    ))}
                                </div>
                                <button className="w-full bg-surface-container-high text-primary py-3 rounded-md font-label text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-primary hover:text-on-primary transition-all duration-200">
                                    Find Volunteer
                                </button>
                            </div>
                        ))
                    )}
                </div>
                </section>
            </>
        )}
      </main>
    </div>
  );
}

export default CoordinatorDashboard;
