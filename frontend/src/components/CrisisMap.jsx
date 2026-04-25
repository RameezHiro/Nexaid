import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to map text locations to coordinates (Mumbai-centric for Demo)
const LOCATION_COORDS = {
  "mumbai": [19.0760, 72.8777],
  "govandi": [19.0553, 72.9158],
  "chembur": [19.0622, 72.8973],
  "kurla": [19.0652, 72.8794],
  "bandra": [19.0596, 72.8295],
  "dharavi": [19.0380, 72.8538],
  "thane": [19.2183, 72.9781],
  "navi mumbai": [19.0330, 73.0297]
};

function CrisisMap({ needs }) {
  const getCoords = (locationText) => {
    if (!locationText) return LOCATION_COORDS["mumbai"];
    const normalized = locationText.toLowerCase().trim();
    
    // Check if any of our keys are in the string
    for (const key in LOCATION_COORDS) {
      if (normalized.includes(key)) return LOCATION_COORDS[key];
    }
    
    // Default to Mumbai center if unknown but exists
    return LOCATION_COORDS["mumbai"];
  };

  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-surface-variant shadow-lg relative group">
      <div className="absolute top-4 left-4 z-[1000] bg-surface-container-highest/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Live Crisis Feed</span>
      </div>
      
      <MapContainer 
        center={[19.0760, 72.8777]} 
        zoom={11} 
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: '#0f172a' }} // Dark Slate Background while loading
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {needs.map((need) => (
          <Marker 
            key={need.id} 
            position={getCoords(need.location)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                    need.urgency === 'critical' ? 'bg-error text-on-error' : 'bg-warning-container text-on-warning-container'
                  }`}>
                    {need.urgency}
                  </span>
                  <span className="text-[10px] text-outline font-bold uppercase">{need.category}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{need.location}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{need.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-[9px] font-black text-primary uppercase">ID: {need.id?.substring(0, 8)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Visual Overlay Gradient */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-surface-container-lowest/10 rounded-3xl z-[999]"></div>
    </div>
  );
}

export default CrisisMap;
