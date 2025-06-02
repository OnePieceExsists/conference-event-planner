
import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, BarChart3, Settings, Bell, Search, Plus } from 'lucide-react';

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

  const [upcomingSessions] = useState([
    { id: 1, title: "AI in Healthcare", speaker: "Dr. Emily Chen", time: "10:00 AM", room: "Main Hall", attendees: 245 },
    { id: 2, title: "Blockchain Security", speaker: "Mike Rodriguez", time: "11:30 AM", room: "Tech Lab", attendees: 89 },
    { id: 3, title: "Future of Web Development", speaker: "Alex Thompson", time: "2:00 PM", room: "Innovation Center", attendees: 156 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">TechConf 2024</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">LIVE</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search sessions, speakers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Session</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'attendees', label: 'Attendees', icon: Users },
            { id: 'venues', label: 'Venues', icon: MapPin },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalAttendees.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Sessions</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.sessions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Speakers</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.registeredSpeakers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MapPin className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Venues</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.venues}</p>
                  </div>
                </div>
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
                    {upcomingSessions.map(session => (
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
                        </div>
                      </div>
                    ))}
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
    </div>
  );
};

export default ConferenceDashboard;
