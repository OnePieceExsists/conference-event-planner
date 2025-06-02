
import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

const DashboardHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">TechConf 2025</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">LIVE</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sessions, speakers..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  window.open(
                    "/notifications",
                    "Notifications",
                    "width=500,height=600"
                  );
                }}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
            </div>
            {/* Add Session */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => {
                window.open(
                  "/add-session",
                  "AddSession",
                  "width=500,height=700"
                );
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Session</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
