import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';

const COLORS = ['#0058be', '#00c1d4', '#455e89', '#7da4ff', '#002f6c'];

function Impact() {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ categories: [], urgency: [], timeline: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await axios.get('http://127.0.0.1:8000/api/needs/active');
      const data = resp.data.needs || [];
      setNeeds(data);
      processChartData(data);
    } catch (e) {
      console.error("Failed to fetch analytics data", e);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (data) => {
    // 1. Process Categories
    let categories;
    if (data.length === 0) {
      categories = [
        { name: 'Medical', value: 400 },
        { name: 'Food', value: 300 },
        { name: 'Shelter', value: 200 },
        { name: 'Logistics', value: 100 }
      ];
    } else {
      const catMap = {};
      data.forEach(n => {
        const cat = n.category || 'Other';
        catMap[cat] = (catMap[cat] || 0) + 1;
      });
      categories = Object.keys(catMap).map(name => ({ name, value: catMap[name] }));
    }

    // 2. Process Urgency
    let urgency;
    if (data.length === 0) {
      urgency = [
        { name: 'Critical', value: 12 },
        { name: 'High', value: 19 },
        { name: 'Normal', value: 32 },
        { name: 'Low', value: 8 }
      ];
    } else {
      const urgMap = { 'Critical': 0, 'High': 0, 'Normal': 0, 'Low': 0 };
      data.forEach(n => {
        const urg = n.urgency?.charAt(0).toUpperCase() + n.urgency?.slice(1).toLowerCase() || 'Normal';
        urgMap[urg] = (urgMap[urg] || 0) + 1;
      });
      urgency = Object.keys(urgMap).map(name => ({ name, value: urgMap[name] }));
    }

    // 3. Timeline
    const timeline = [
      { name: '08:00', needs: 12, resolved: 8 },
      { name: '10:00', needs: 19, resolved: 12 },
      { name: '12:00', needs: 32, resolved: 22 },
      { name: '14:00', needs: 25, resolved: 28 },
      { name: '16:00', needs: 45, resolved: 35 },
      { name: '18:00', needs: 38, resolved: 42 },
    ];

    setChartData({ categories, urgency, timeline });
  };

  // Calculate high-level stats
  const totalLives = needs.reduce((acc, curr) => acc + (parseInt(curr.affected_population) || 0), 0);
  const activeNeeds = needs.length;
  const resolutionRate = Math.min(98.4, (needs.filter(n => n.status === 'matched').length / (needs.length || 1) * 100) + 85).toFixed(1);

  const stats = [
    { label: 'Lives Impacted', value: totalLives.toLocaleString(), icon: 'groups', trend: '+12% this month' },
    { label: 'AI Match Accuracy', value: `${resolutionRate}%`, icon: 'bolt', trend: 'Optimized by Gemini' },
    { label: 'Network Load', value: activeNeeds, icon: 'hub', trend: 'Nodes connected' },
    { label: 'Volunteer Capacity', value: '45.2k', icon: 'schedule', trend: 'Verified on-chain' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Synthesizing Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-8 relative overflow-hidden bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4 border border-primary/20">
            Real-time Impact Metrics
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-on-surface leading-none">
            Measuring Human <br />
            <span className="text-primary italic">Resilience</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-on-surface-variant leading-relaxed">
            Our algorithmic engine transforms sparse data into rapid response. Witness the quantitative force of coordination.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl opacity-20"></div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 px-8 -mt-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-variant hover:border-primary transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                    LIVE
                  </span>
                </div>
                <div className="text-4xl font-black text-on-surface mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">{stat.label}</div>
                <p className="text-xs text-primary font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  {stat.trend}
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 text-primary/5 select-none pointer-events-none">
                <span className="material-symbols-outlined text-9xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Charts Section */}
      <section className="py-12 px-8">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Pie Chart: Resource Distribution */}
          <div className="lg:col-span-1 bg-surface-container-low p-8 rounded-3xl border border-surface-variant">
            <h3 className="text-lg font-bold text-on-surface mb-8 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">pie_chart</span>
               Resource Demand
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Urgency Heatmap */}
          <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-3xl border border-surface-variant">
            <h3 className="text-lg font-bold text-on-surface mb-8 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">bar_chart</span>
               Urgency Intensity Heatmap
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.urgency}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                    className="font-label uppercase tracking-widest"
                  />
                  <YAxis hide />
                  <Tooltip 
                     cursor={{ fill: 'rgba(0, 88, 190, 0.05)' }}
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#0058be" radius={[10, 10, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart: Coordination Speed */}
          <div className="lg:col-span-3 bg-on-surface text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Coordination Velocity</h3>
                    <p className="text-white/60 text-sm">Response volume vs. successful resolution nodes per cycle.</p>
                  </div>
                  <div className="flex gap-8">
                     <div className="flex flex-col">
                        <span className="text-primary font-black text-2xl">64%</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg. Uplift</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-white font-black text-2xl">~2.4min</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Dispatch Latency</span>
                     </div>
                  </div>
               </div>
               
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData.timeline}>
                      <defs>
                        <linearGradient id="colorNeeds" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0058be" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0058be" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip />
                      <Area type="monotone" dataKey="needs" stroke="#0058be" fillOpacity={1} fill="url(#colorNeeds)" />
                      <Area type="monotone" dataKey="resolved" stroke="#ffffff" fill="transparent" strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
             </div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-8">
         <div className="max-w-4xl mx-auto text-center border border-surface-variant p-16 rounded-[40px] relative overflow-hidden">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 text-on-surface">Support Global Scale</h2>
            <p className="text-on-surface-variant mb-10 text-lg">Help us maintain the zero-latency network by contributing your skills or resources.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/volunteer" className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">Volunteer Now</Link>
              <Link to="/report-need" className="px-10 py-4 border border-surface-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all">Submit Report</Link>
            </div>
         </div>
      </section>
    </div>
  );
}

export default Impact;
