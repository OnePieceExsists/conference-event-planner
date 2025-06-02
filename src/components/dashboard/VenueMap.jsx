
import React from 'react';

const VenueMap = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Conference Venue Map</h3>
      </div>
      <div className="p-6">
        <div className="w-full flex justify-center">
          <svg
            viewBox="0 0 700 350"
            className="w-full max-w-3xl h-80"
            style={{ background: "#f3f4f6", borderRadius: "1rem" }}
          >
            {/* Hallways */}
            <rect x="0" y="150" width="700" height="50" fill="#e0e7ef" />
            <rect x="320" y="0" width="60" height="350" fill="#e0e7ef" />

            {/* Left Area */}
            <rect x="30" y="30" width="200" height="100" fill="#c7d2fe" stroke="#2563eb" strokeWidth="2" rx="12" />
            <text x="130" y="85" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="bold">Main Hall</text>

            <rect x="30" y="210" width="150" height="80" fill="#fcd34d" stroke="#b45309" strokeWidth="2" rx="12" />
            <text x="105" y="250" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">Tech Lab</text>

            <rect x="220" y="210" width="90" height="80" fill="#a7f3d0" stroke="#047857" strokeWidth="2" rx="12" />
            <text x="265" y="245" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
              <tspan x="265" dy="0">Innovation</tspan>
              <tspan x="265" dy="14">Center</tspan>
            </text>

            {/* Right Area */}
            <rect x="400" y="30" width="180" height="100" fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" rx="12" />
            <text x="490" y="85" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="bold">Conference Hall</text>

            <rect x="600" y="30" width="70" height="100" fill="#f9fafb" stroke="#6b7280" strokeWidth="2" rx="12" />
            <text x="635" y="75" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="bold">
              <tspan x="635" dy="0">Display</tspan>
              <tspan x="635" dy="14">Room</tspan>
            </text>

            <rect x="400" y="210" width="120" height="60" fill="#fcd34d" stroke="#b45309" strokeWidth="2" rx="12" />
            <text x="460" y="245" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">Workshop Room</text>

            <rect x="540" y="210" width="130" height="60" fill="#a7f3d0" stroke="#047857" strokeWidth="2" rx="12" />
            <text x="605" y="245" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">Networking Lounge</text>

            {/* Toilets */}
            <rect x="420" y="300" width="40" height="30" fill="#d1fae5" stroke="#059669" strokeWidth="2" rx="8" />
            <text x="440" y="318" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">Toilets</text>

            <rect x="265" y="300" width="40" height="30" fill="#d1fae5" stroke="#059669" strokeWidth="2" rx="8" />
            <text x="285" y="318" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">Toilets</text>

            {/* Info Desk - Completely right */}
            <rect x="640" y="155" width="50" height="40" fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" rx="8" />
            <text x="665" y="170" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
              <tspan x="665" dy="0">Info</tspan>
              <tspan x="665" dy="12">Desk</tspan>
            </text>

            {/* Main Entrance - Top center */}
            <rect x="335" y="0" width="30" height="10" fill="#1f2937">
              <animate attributeName="height" values="10;20;10" dur="1s" repeatCount="indefinite" />
            </rect>
            <text x="350" y="25" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">🚪 Entrance</text>
          </svg>
        </div>

        <div className="text-xs text-gray-500 mt-2 text-center space-x-2">
          <span>🟦 Main Hall</span>
          <span>🟨 Tech Lab</span>
          <span>🟩 Innovation Center</span>
          <span>🟥 Conference Hall</span>
          <span>⬜ Display Room</span>
          <span>🟧 Workshop Room</span>
          <span>🟩 Networking Lounge</span>
          <span>🟦 Toilets</span>
          <span>🟥 Info Desk</span>
          <span>⬛ Entrance</span>
          <span>⬜ Hallways</span>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;
