
import React from 'react';

const RecentActivity = ({ notifications }) => {
  return (
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
  );
};

export default RecentActivity;
