
import React from 'react';
import { Calendar, Users, MapPin, Settings } from 'lucide-react';

const TabContent = ({ activeTab }) => {
  const tabContent = {
    schedule: {
      icon: Calendar,
      title: "Conference Schedule Builder",
      description: "Interactive schedule management interface would be implemented here",
      features: "Features: Multi-track support, conflict detection, room assignments"
    },
    attendees: {
      icon: Users,
      title: "Attendee Dashboard",
      description: "Registration management, check-in system, and attendee analytics",
      features: "Features: QR code check-in, custom registration forms, networking tools",
      button: "Export List"
    },
    venues: {
      icon: MapPin,
      title: "Floor Plan Designer",
      description: "Interactive venue layout with capacity management and accessibility features",
      features: "Features: Drag-and-drop layout, capacity alerts, booth management"
    },
    settings: {
      icon: Settings,
      title: "Configuration Panel",
      description: "Branding, notifications, integrations, and system preferences",
      features: "Features: Custom branding, API integrations, notification settings"
    }
  };

  if (activeTab === 'overview') return null;

  const content = tabContent[activeTab];
  if (!content) return null;

  const IconComponent = content.icon;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
        {content.button && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
            {content.button}
          </button>
        )}
      </div>
      <div className="p-6">
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <IconComponent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">{content.title}</h4>
            <p className="text-gray-500">{content.description}</p>
            <p className="text-sm text-gray-400 mt-2">{content.features}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;
