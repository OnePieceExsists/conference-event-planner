
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const RegistrationChart = () => {
  return (
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
  );
};

export default RegistrationChart;
