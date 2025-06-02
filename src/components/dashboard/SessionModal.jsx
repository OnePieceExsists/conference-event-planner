
import React from 'react';

const SessionModal = ({ 
  showAddSession, 
  editSessionId, 
  newSession, 
  setNewSession, 
  handleSaveSession, 
  handleCancelSession 
}) => {
  if (!showAddSession) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Stronger overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl border-4 border-blue-600 p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold mb-4">{editSessionId ? "Edit Session" : "Add New Session"}</h2>
        <form onSubmit={handleSaveSession} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            value={newSession.title}
            onChange={e => setNewSession({ ...newSession, title: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Speaker"
            value={newSession.speaker}
            onChange={e => setNewSession({ ...newSession, speaker: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Time"
            value={newSession.time}
            onChange={e => setNewSession({ ...newSession, time: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Room"
            value={newSession.room}
            onChange={e => setNewSession({ ...newSession, room: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Attendees"
            type="number"
            value={newSession.attendees}
            onChange={e => setNewSession({ ...newSession, attendees: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={handleCancelSession}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {editSessionId ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
