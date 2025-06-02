import React, { useState } from "react";

const LOCAL_STORAGE_KEY = "conference_sessions";

const AddSessionPage = () => {
  const [session, setSession] = useState({ title: "", speaker: "", time: "", room: "", attendees: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const sessions = stored ? JSON.parse(stored) : [];
    sessions.push({ ...session, id: Date.now(), attendees: Number(session.attendees) || 0 });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
    window.close(); // Close the popup after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-500 p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            value={session.title}
            onChange={e => setSession({ ...session, title: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Speaker"
            value={session.speaker}
            onChange={e => setSession({ ...session, speaker: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Time"
            value={session.time}
            onChange={e => setSession({ ...session, time: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Room"
            value={session.room}
            onChange={e => setSession({ ...session, room: e.target.value })}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Attendees"
            type="number"
            value={session.attendees}
            onChange={e => setSession({ ...session, attendees: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => window.close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionPage;