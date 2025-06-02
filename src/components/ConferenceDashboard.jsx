import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, BarChart3, Settings, Bell, Search, Plus } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'conference_sessions';

const ConferenceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New speaker registration: Dr. Sarah Johnson", time: "2 min ago", type: "info" },
    { id: 2, message: "Room A capacity reached for ML Workshop", time: "15 min ago", type: "warning" },
    { id: 3, message: "Payment received for 25 attendee registrations", time: "1 hour ago", type: "success" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [stats, setStats] = useState({
    totalAttendees: 1247,
    registeredSpeakers: 38,
    sessions: 64,
    venues: 5
  });

  // Sessions state with localStorage persistence
  const [upcomingSessions, setUpcomingSessions] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : [
          { id: 1, title: "AI in Healthcare", speaker: "Dr. Emily Chen", time: "10:00 AM", room: "Main Hall", attendees: 245 },
          { id: 2, title: "Blockchain Security", speaker: "Mike Rodriguez", time: "11:30 AM", room: "Tech Lab", attendees: 89 },
          { id: 3, title: "Future of Web Development", speaker: "Alex Thompson", time: "02:00 PM", room: "Innovation Center", attendees: 156 }
        ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(upcomingSessions));
  }, [upcomingSessions]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSession, setShowAddSession] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', speaker: '', time: '', room: '', attendees: 0 });
  const [editSessionId, setEditSessionId] = useState(null);

  // Filter sessions by search term
  const filteredSessions = upcomingSessions.filter(
    session =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or edit session handler
  const handleSaveSession = (e) => {
    e.preventDefault();
    if (editSessionId) {
      setUpcomingSessions(upcomingSessions.map(s =>
        s.id === editSessionId ? { ...newSession, id: editSessionId, attendees: Number(newSession.attendees) || 0 } : s
      ));
      setEditSessionId(null);
    } else {
      setUpcomingSessions([
        ...upcomingSessions,
        { ...newSession, id: Date.now(), attendees: Number(newSession.attendees) || 0 }
      ]);
    }
    setShowAddSession(false);
    setNewSession({ title: '', speaker: '', time: '', room: '', attendees: 0 });
  };

  // Start editing a session
  const handleEditSession = (session) => {
    setEditSessionId(session.id);
    setNewSession(session);
    setShowAddSession(true);
  };

  // Cancel add/edit
  const handleCancelSession = () => {
    setShowAddSession(false);
    setEditSessionId(null);
    setNewSession({ title: '', speaker: '', time: '', room: '', attendees: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map(n => (
                        <li key={n.id} className="px-4 py-2 flex items-start space-x-2 hover:bg-gray-50">
                          <span className={`mt-2 w-2 h-2 rounded-full ${
                            n.type === 'success' ? 'bg-green-400' :
                            n.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}></span>
                          <div>
                            <div className="text-sm text-gray-900">{n.message}</div>
                            <div className="text-xs text-gray-500">{n.time}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Add Session */}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                onClick={() => {
                  setShowAddSession(true);
                  setEditSessionId(null);
                  setNewSession({ title: '', speaker: '', time: '', room: '', attendees: 0 });
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Session</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add/Edit Session Modal */}
      {showAddSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
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
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs as buttons in a single row */}
        <div className="flex gap-4 mb-8">
          <button
            className={`flex-1 py-3 rounded border text-sm font-medium transition ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-3 rounded border text-sm font-medium transition ${
              activeTab === 'schedule'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </button>
          <button
            className={`flex-1 py-3 rounded border text-sm font-medium transition ${
              activeTab === 'attendees'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('attendees')}
          >
            Attendees
          </button>
          <button
            className={`flex-1 py-3 rounded border text-sm font-medium transition ${
              activeTab === 'venues'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('venues')}
          >
            Venues
          </button>
          <button
            className={`flex-1 py-3 rounded border text-sm font-medium transition ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        {/* ...rest of your content... */}
      </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
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
              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-400' :
                          notification.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></div>
                        <div>
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Registration Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Registration Trends</h3>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Registration analytics chart would go here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab Content */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Conference Schedule Builder</h3>
            </div>
            <div className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Drag & Drop Schedule Builder</h4>
                  <p className="text-gray-500">Interactive schedule management interface would be implemented here</p>
                  <p className="text-sm text-gray-400 mt-2">Features: Multi-track support, conflict detection, room assignments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendees Tab Content */}
        {activeTab === 'attendees' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Attendee Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                Export List
              </button>
            </div>
            <div className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Attendee Dashboard</h4>
                  <p className="text-gray-500">Registration management, check-in system, and attendee analytics</p>
                  <p className="text-sm text-gray-400 mt-2">Features: QR code check-in, custom registration forms, networking tools</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Venues Tab Content */}
        {activeTab === 'venues' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Venue & Room Management</h3>
            </div>
            <div className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Floor Plan Designer</h4>
                  <p className="text-gray-500">Interactive venue layout with capacity management and accessibility features</p>
                  <p className="text-sm text-gray-400 mt-2">Features: Drag-and-drop layout, capacity alerts, booth management</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab Content */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Conference Settings</h3>
            </div>
            <div className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Configuration Panel</h4>
                  <p className="text-gray-500">Branding, notifications, integrations, and system preferences</p>
                  <p className="text-sm text-gray-400 mt-2">Features: Custom branding, API integrations, notification settings</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};


export default ConferenceDashboard;
