import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function VolunteerRegistration() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || skills.length === 0) return;
    setLoading(true);
    try {
      const resp = await axios.post('http://127.0.0.1:8000/api/volunteers/register', {
        name,
        location,
        skills,
        availability
      });
      setSuccessData(resp.data.volunteer);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const skillOptions = [
    { id: 'medical', icon: 'medical_services', label: 'Medical' },
    { id: 'first-aid', icon: 'medical_information', label: 'First Aid' },
    { id: 'food', icon: 'nutrition', label: 'Food Dist' },
    { id: 'transport', icon: 'local_shipping', label: 'Transport' },
    { id: 'construction', icon: 'construction', label: 'Construction' },
    { id: 'counseling', icon: 'groups', label: 'Counseling' },
    { id: 'education', icon: 'school', label: 'Education' },
    { id: 'technical', icon: 'terminal', label: 'Technical' }
  ];

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <p className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">Coordination Infrastructure</p>
            <h1 className="text-on-surface font-headline text-[3.5rem] leading-none font-extrabold tracking-tighter">Register as Volunteer</h1>
          </div>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-md">
            Join our algorithmic coordination network. We transform logistics into impact by matching precision skills with urgent humanitarian needs. Your expertise is the engine of our response system.
          </p>
          <div className="pt-8 grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-6 rounded-lg border-left border-l-4 border-primary">
              <p className="text-on-surface font-headline text-2xl font-bold tracking-tight">14k+</p>
              <p className="text-outline font-label text-[10px] uppercase tracking-wider">Active Responders</p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg">
              <p className="text-on-surface font-headline text-2xl font-bold tracking-tight">0.8s</p>
              <p className="text-outline font-label text-[10px] uppercase tracking-wider">Matching Latency</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest rounded-xl p-10 relative overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(17, 28, 45, 0.06)' }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

            {successData ? (
              <div className="flex flex-col justify-center h-full space-y-6">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-green-600">verified</span>
                  </div>
                  <h3 className="text-on-surface font-headline text-3xl font-extrabold tracking-tight mb-2">Registration Confirmed</h3>
                  <p className="text-on-surface-variant text-lg">Welcome to the bridge, <span className="text-primary font-bold">{successData.name}</span>.</p>
                  <p className="text-outline text-sm mt-4 leading-relaxed max-w-sm">Your profile has been indexed. Our coordination algorithms are currently scanning active live needs for potential matches with your skill matrix.</p>
                </div>
                <div className="mt-12 flex gap-4">
                  <Link to="/dashboard" className="bg-surface-container-high text-on-secondary-container px-6 py-2 rounded-md font-label text-[10px] uppercase tracking-widest font-bold text-center flex items-center justify-center">Command Center</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">fingerprint</span>
                    <h2 className="text-on-surface font-headline text-lg font-bold tracking-tight">Identity & Reach</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-on-surface font-label text-xs uppercase tracking-widest font-bold">Full Name</label>
                      <input
                        type="text"
                        className="bg-surface-container-low border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200"
                        placeholder="Johnathan Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-on-surface font-label text-xs uppercase tracking-widest font-bold">Location</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">location_on</span>
                        <input
                          type="text"
                          className="w-full bg-surface-container-low border-none rounded-md pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200"
                          placeholder="London, UK"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                    <h2 className="text-on-surface font-headline text-lg font-bold tracking-tight">Capability Matrix</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skillOptions.map(opt => (
                      <label key={opt.id} className="group cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={skills.includes(opt.label)}
                          onChange={() => toggleSkill(opt.label)}
                        />
                        <div className="bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary-container p-4 rounded-md border border-transparent transition-all duration-200 flex flex-col items-center text-center gap-2">
                          <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                          <span className="text-[10px] uppercase font-bold tracking-tighter">{opt.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-md">
                  <div className="flex flex-col">
                    <span className="text-on-surface font-headline font-bold">Active Readiness</span>
                    <span className="text-outline text-xs">Signal immediate availability for emergency dispatch.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={availability}
                      onChange={e => setAvailability(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-br from-primary to-primary-container text-white py-4 rounded-md font-label text-xs uppercase tracking-widest font-bold scale-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <span>{loading ? 'Registering...' : 'Register'}</span>
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default VolunteerRegistration;
