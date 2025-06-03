
import React, { useState, useEffect } from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import StatsCards from './dashboard/StatsCards';
import VenueMap from './dashboard/VenueMap';
import UpcomingSessions from './dashboard/UpcomingSessions';
import RecentActivity from './dashboard/RecentActivity';
import FeaturedSpeakers from './dashboard/FeaturedSpeakers';
import RegistrationChart from './dashboard/RegistrationChart';
import TabContent from './dashboard/TabContent';
import SessionModal from './dashboard/SessionModal';
import RegistrationAnalytics from './dashboard/RegistrationAnalytics';


const LOCAL_STORAGE_KEY = 'conference_sessions';

const ConferenceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New speaker registration: Dr. Sarah Johnson", time: "2 min ago", type: "info" },
    { id: 2, message: "Room A capacity reached for ML Workshop", time: "15 min ago", type: "warning" },
    { id: 3, message: "Payment received for 25 attendee registrations", time: "1 hour ago", type: "success" }
  ]);

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

  // Add this useEffect to refresh sessions when localStorage changes
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
      <DashboardHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <SessionModal 
        showAddSession={showAddSession}
        editSessionId={editSessionId}
        newSession={newSession}
        setNewSession={setNewSession}
        handleSaveSession={handleSaveSession}
        handleCancelSession={handleCancelSession}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {['overview', 'schedule', 'attendees', 'venues', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 rounded border text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Section */}
            <StatsCards stats={stats} />
            <VenueMap />

            {/* Two-Row, Two-Column Grid */}
            <div className="grid grid-rows-2 gap-6">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  {/* Left: Upcoming Sessions */}
                  <UpcomingSessions
                    filteredSessions={filteredSessions}
                    handleEditSession={handleEditSession}
                  />
                </div>
                <div>
                  {/* Right: Featured Speakers */}
                  <FeaturedSpeakers />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <RecentActivity notifications={notifications} />
                </div>
                <div>
                  <RegistrationAnalytics />
                </div>
              </div>
            </div>
          </div>
        )}


        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default ConferenceDashboard;
