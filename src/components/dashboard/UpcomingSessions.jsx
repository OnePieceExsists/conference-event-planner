import React from "react";

const UpcomingSessions = ({ filteredSessions, handleEditSession }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Upcoming Sessions:</h3>
    <div className="flex gap-4">
      {filteredSessions.length === 0 ? (
        <div className="text-gray-500">No sessions found.</div>
      ) : (
        filteredSessions.map(session => (
          <div
            key={session.id}
            className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4 flex flex-col items-start justify-between shadow border"
            style={{ maxWidth: "25%" }}
          >
            <div>
              <h4 className="font-medium text-gray-900 truncate">{session.title}</h4>
              <p className="text-sm text-gray-500 truncate">by {session.speaker}</p>
              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                <span>{session.time}</span>
                <span>{session.room}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-start">
              <span className="text-sm font-medium text-blue-600">{session.attendees} attendees</span>
              <button
                className="mt-1 text-xs text-blue-500 underline"
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
);

export default UpcomingSessions;