
import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';

const StatsCards = ({ stats }) => {
  return (
    <div className="flex gap-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
        <Users className="w-8 h-8 text-blue-500 mb-2" />
        <div className="text-2xl font-bold">{stats.totalAttendees}</div>
        <div className="text-gray-500 text-sm">Attendees</div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
        <Calendar className="w-8 h-8 text-green-500 mb-2" />
        <div className="text-2xl font-bold">{stats.sessions}</div>
        <div className="text-gray-500 text-sm">Sessions</div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
        <Users className="w-8 h-8 text-purple-500 mb-2" />
        <div className="text-2xl font-bold">{stats.registeredSpeakers}</div>
        <div className="text-gray-500 text-sm">Speakers</div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
        <MapPin className="w-8 h-8 text-pink-500 mb-2" />
        <div className="text-2xl font-bold">{stats.venues}</div>
        <div className="text-gray-500 text-sm">Venues</div>
      </div>
    </div>
  );
};

export default StatsCards;
