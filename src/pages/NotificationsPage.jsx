import React from "react";

const notifications = [
  { id: 1, message: "New speaker registration: Dr. Sarah Johnson", time: "2 min ago", type: "info" },
  { id: 2, message: "Room A capacity reached for ML Workshop", time: "15 min ago", type: "warning" },
  { id: 3, message: "Payment received for 25 attendee registrations", time: "1 hour ago", type: "success" }
];

const typeColor = {
  info: "text-sky-300",
  warning: "text-yellow-300",
  success: "text-green-300"
};

const NotificationsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-full max-w-md p-8 rounded-xl shadow-2xl bg-black border border-blue-900">
      <h2 className="text-2xl font-bold mb-6 text-sky-300">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map(n => (
          <li key={n.id}>
            <div className={`text-lg font-semibold ${typeColor[n.type]}`}>{n.message}</div>
            <div className="text-xs text-blue-400">{n.time}</div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-8">
        <button
          className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
          onClick={() => window.close()}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default NotificationsPage;