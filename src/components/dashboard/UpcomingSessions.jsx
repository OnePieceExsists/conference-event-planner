
import React from 'react';

const UpcomingSessions = ({ filteredSessions, handleEditSession }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="text-gray-500">No sessions found.</div>
          ) : (
            filteredSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-500">by {session.speaker}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{session.time}</span>
                    <span className="text-xs text-gray-500">{session.room}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-600">{session.attendees} attendees</span>
                  <button
                    className="ml-2 text-xs text-blue-500 underline"
                    onClick={() => handleEditSession(session)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessions;
