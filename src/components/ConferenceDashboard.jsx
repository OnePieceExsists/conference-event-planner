import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, BarChart3, Settings, Bell, Search, Plus, Star, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const LOCAL_STORAGE_KEY = 'conference_sessions';

// Sample data for registration trends
const registrationData = [
  { date: 'Jan 1', registrations: 45, earlyBird: 30, regular: 15, student: 0 },
  { date: 'Jan 8', registrations: 89, earlyBird: 65, regular: 20, student: 4 },
  { date: 'Jan 15', registrations: 156, earlyBird: 95, regular: 45, student: 16 },
  { date: 'Jan 22', registrations: 234, earlyBird: 120, regular: 85, student: 29 },
  { date: 'Jan 29', registrations: 345, earlyBird: 150, regular: 145, student: 50 },
  { date: 'Feb 5', registrations: 456, earlyBird: 180, regular: 195, student: 81 },
  { date: 'Feb 12', registrations: 589, earlyBird: 200, regular: 275, student: 114 },
  { date: 'Feb 19', registrations: 723, earlyBird: 210, regular: 365, student: 148 },
  { date: 'Feb 26', registrations: 867, earlyBird: 215, regular: 445, student: 207 },
  { date: 'Mar 5', registrations: 1024, earlyBird: 220, regular: 535, student: 269 },
  { date: 'Mar 12', registrations: 1247, earlyBird: 225, regular: 645, student: 377 }
];

// Featured speakers data
const featuredSpeakers = [
  { name: "Dr. Sarah Chen", title: "AI Research Director", company: "TechCorp", rating: 4.9, sessions: 3, image: "👩‍💼" },
  { name: "Mike Rodriguez", title: "Blockchain Expert", company: "CryptoLab", rating: 4.8, sessions: 2, image: "👨‍💻" },
  { name: "Dr. Emily Watson", title: "Healthcare Innovation", company: "MedTech", rating: 4.7, sessions: 4, image: "👩‍⚕️" }
];

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

    // Add this useEffect to refresh sessions when localStorage changes (step 4)
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      setUpcomingSessions(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

      {/* Add/Edit Session Modal */}
      {showAddSession && (
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
            
            {/* Conference Venue Map */}
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

            {/* Featured Speakers */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Featured Speakers</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {featuredSpeakers.map((speaker, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{speaker.image}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{speaker.name}</h4>
                        <p className="text-xs text-gray-500">{speaker.title}</p>
                        <p className="text-xs text-gray-400">{speaker.company}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{speaker.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 ml-1">{speaker.sessions} sessions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Registration Chart */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Registration Trends</h3>
                <p className="text-sm text-gray-500 mt-1">Daily registration counts and breakdown by ticket type</p>
              </div>
              <div className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={registrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [value, name]}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="registrations" 
                        stroke="#2563eb" 
                        strokeWidth={3}
                        name="Total Registrations"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="earlyBird" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Early Bird"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="regular" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Regular"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="student" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Student"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                    <span>Total Registrations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span>Early Bird</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                    <span>Regular</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                    <span>Student</span>
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
