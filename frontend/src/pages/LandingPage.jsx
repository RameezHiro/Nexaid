import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <section className="relative pt-24 pb-32 px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high text-primary font-label text-xs font-bold tracking-widest uppercase">
              System Status: Operational
            </div>
            <h1 className="text-7xl font-extrabold tracking-tighter leading-[0.95] text-on-surface">
              AI-Powered <br /><span className="text-primary">Volunteer</span> <br />Coordination
            </h1>
            <p className="max-w-xl text-lg text-on-surface-variant leading-relaxed">
              Deploying Gemini AI to transform crisis response into a logistical masterpiece. We bridge the gap between community needs and volunteer capacity with algorithmic precision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/report-need" className="px-8 py-4 bg-primary bg-linear-to-br from-primary to-primary-container text-on-primary font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-2">
                Report a Need
                <span className="material-symbols-outlined text-sm">emergency_share</span>
              </Link>
              <Link to="/volunteer" className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-surface-container-low transition-all">
                Register as Volunteer
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-square bg-surface-container-low rounded-xl relative overflow-hidden group">
              <img className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" alt="high-tech digital interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnUbWwskHXC6MihTDSPej5MiR3ZRkMEEAIiD4VwNGuht4c1BkFspnV-M_JNlagk3o37-b68t3KKvV-3cRScvpzbOMocvozKQd03zCZQSJLACw942zRxuEhTC8IEibELDirAPZP3pS7b3uxMWvQWxKh1uFeFlTu8Ry7WLRjnRUql1XR4JaFSsXQzY3Nu3hOZs7XNwkD7aa_r4AYtWJIwNRUCDxl6OlrHCgVL17Vfp9-GLjBH08QzSosXNjSevEqRK8VFoH_Mqbca533" />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6 left-6 p-6 bg-surface-container-lowest/80 backdrop-blur-xl rounded-lg border-l-4 border-primary shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  <span className="text-xs font-bold uppercase tracking-tighter text-on-surface">Gemini Live Analysis</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mb-3">
                  <div className="h-full w-3/4 bg-primary"></div>
                </div>
                <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Efficiency: 98.4% Optimization achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tighter text-on-surface uppercase mb-2">Technical Core</h2>
            <p className="text-on-surface-variant max-w-md">Our infrastructure leverages proprietary neural architectures to eliminate coordination latency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-lg flex flex-col justify-between border-l-4 border-primary group hover:bg-primary transition-all duration-500">
              <div>
                <span className="material-symbols-outlined text-primary mb-6 text-4xl group-hover:text-white" style={{ fontVariationSettings: "'FILL' 0" }}>query_stats</span>
                <h3 className="text-xl font-bold tracking-tight text-on-surface group-hover:text-white mb-4">AI Analysis</h3>
                <p className="text-on-surface-variant group-hover:text-white/80 leading-relaxed">Automated ingestion of multi-source crisis reports. Gemini extracts urgency vectors and resource requirements in milliseconds.</p>
              </div>
              <div className="mt-12 flex items-center text-primary group-hover:text-white font-bold text-sm tracking-widest uppercase gap-2 cursor-pointer">
                View Protocol <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg flex flex-col justify-between border-l-4 border-primary group hover:bg-primary transition-all duration-500">
              <div>
                <span className="material-symbols-outlined text-primary mb-6 text-4xl group-hover:text-white" style={{ fontVariationSettings: "'FILL' 0" }}>hub</span>
                <h3 className="text-xl font-bold tracking-tight text-on-surface group-hover:text-white mb-4">Smart Matching</h3>
                <p className="text-on-surface-variant group-hover:text-white/80 leading-relaxed">Dynamic volunteer dispatching based on skill-sets, geographical proximity, and real-time availability matrices.</p>
              </div>
              <div className="mt-12 flex items-center text-primary group-hover:text-white font-bold text-sm tracking-widest uppercase gap-2 cursor-pointer">
                Efficiency Logs <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg flex flex-col justify-between border-l-4 border-primary group hover:bg-primary transition-all duration-500">
              <div>
                <span className="material-symbols-outlined text-primary mb-6 text-4xl group-hover:text-white" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard_customize</span>
                <h3 className="text-xl font-bold tracking-tight text-on-surface group-hover:text-white mb-4">Real-time Dashboard</h3>
                <p className="text-on-surface-variant group-hover:text-white/80 leading-relaxed">Command-level oversight for NGO coordinators. Monitor every deployment through a single, unified logistics stage.</p>
              </div>
              <Link to="/dashboard" className="mt-12 flex items-center text-primary group-hover:text-white font-bold text-sm tracking-widest uppercase gap-2 cursor-pointer">
                Open Command <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 overflow-hidden bg-background">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
            <div className="aspect-square bg-surface-container-highest rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover" alt="diverse team" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSotOYCvrymh0BGxeLQRGW5sTBi9Tj5roRP_gGtXIQA5eQjf5CH8669TlKIe73Lm17WsSDGlIgBKcNhMiQOTerekqFoKrtBFlFBQAWqx2jCXBwx76NHJvJVMQmuMJa9s9HCBWfMpV2jOvFAARakZ5O4pxXeDic7ROumZqy5CE2ogP_3AT2QJsEl_SGEpl0qBVoP0hY3zcwNrp5mBkySBsXCvhwE9tEr6P5C9llLmEm6wHw8unMm5LDoKI2gcPWhEMap0ONkHV-6yRg" />
            </div>
            <div className="aspect-square bg-surface-container-high rounded-lg overflow-hidden mt-8">
              <img className="w-full h-full object-cover" alt="hands typing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1KvihE2qTgMebXrTywRL75QUET5Omt4BQ6B9nC-3o2ymOE8kx8h-kfsBT5vZnakcGM-abq0N8144qSJP6nfYqnKG80uGGfAbIlQqtbcH3ZxtXpi6imsvbzysSLnHFe8eiQCmkDmhNnG3tltq1Eju933YiqtpDVOedVJ5ARUJsQlOsxcKZp8Iy1X-NbuSZDwe8p6IlYruHCylhTAOqx8oR8JpZcWjfrY531rp-xHZPFyHjKoSM_uf7Zl9qQDL5l3OeKl68yD090u6a" />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-5xl font-black tracking-tighter text-on-surface">Data-Driven Philanthropy</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              We don't just find volunteers; we build resilience. By utilizing the Google Gemini API, we ensure that every second donated is directed toward the highest impact area.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high rounded">verified</span>
                <div>
                  <h4 className="font-bold text-on-surface tracking-tight">Verified Impact</h4>
                  <p className="text-sm text-on-surface-variant">Cryptographically signed verification of volunteer hours and outcomes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high rounded">speed</span>
                <div>
                  <h4 className="font-bold text-on-surface tracking-tight">Rapid Response</h4>
                  <p className="text-sm text-on-surface-variant">Average response time reduced by 64% compared to legacy systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-[1440px] mx-auto bg-on-surface p-12 md:p-24 rounded-xl text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-bold tracking-tighter mb-6">Ready to lead the bridge?</h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">Join 500+ organizations using algorithmic coordination to scale their community impact.</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-all">Get Started Today</button>
              <button className="px-10 py-4 border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all">Contact Sales</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/20 to-transparent flex items-center justify-center opacity-30">
            <span className="material-symbols-outlined text-[300px] text-white">diversity_1</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
