import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

const registrationData = [
  { date: "May 30", daily: 120, cumulative: 120 },
  { date: "May 31", daily: 240, cumulative: 360 },
  { date: "Jun 1", daily: 180, cumulative: 540 },
  { date: "Jun 2", daily: 300, cumulative: 840 },
  { date: "Jun 3", daily: 407, cumulative: 1247 },
];

const hourlyData = [
  { hour: "8 AM", registrations: 30 },
  { hour: "9 AM", registrations: 80 },
  { hour: "10 AM", registrations: 120 },
  { hour: "11 AM", registrations: 150 },
  { hour: "12 PM", registrations: 110 },
  { hour: "1 PM", registrations: 90 },
  { hour: "2 PM", registrations: 70 },
];

const sessionPopularity = [
  { name: "AI in Healthcare", attendees: 245 },
  { name: "Future of Web Dev", attendees: 156 },
  { name: "Blockchain Security", attendees: 89 },
];

const ticketTypeBreakdown = [
  { name: "Standard", value: 830 },
  { name: "Student", value: 290 },
  { name: "VIP", value: 127 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function RegistrationAnalytics() {
  return (
    <div className="space-y-6 p-4">
      {/* Top Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Left: Registration Trends */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">📈 Registration Trends</h2>
            <AreaChart width={600} height={300} data={registrationData}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="cumulative" stroke="#8884d8" fillOpacity={1} fill="url(#colorCumulative)" name="Cumulative" />
              <Line type="monotone" dataKey="daily" stroke="#82ca9d" name="Daily" />
            </AreaChart>
          </CardContent>
        </Card>

        {/* Right: Trending Now */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">🔥 Trending Now</h2>
            <div className="space-y-2">
              <div>
                <strong>Most Registered Session:</strong> {sessionPopularity[0].name} ({sessionPopularity[0].attendees} attendees)
              </div>
              <div>
                <strong>Room Near Capacity:</strong> Tech Lab (92%)
              </div>
              <div>
                <strong>Live Check-ins Today:</strong> 382
              </div>
              <div>
                <strong>Popular Ticket Type:</strong> Standard
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">🎟️ Ticket Type Breakdown</h3>
              <PieChart width={300} height={200}>
                <Pie
                  data={ticketTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {ticketTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom: Insights & Hourly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">📊 Hourly Registrations</h2>
            <BarChart width={600} height={250} data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#82ca9d" name="Registrations" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">🏆 Top Sessions</h2>
            <ul className="space-y-2">
              {sessionPopularity.map((session, index) => (
                <li key={index} className="flex justify-between">
                  <span>{session.name}</span>
                  <span className="font-semibold">{session.attendees}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
