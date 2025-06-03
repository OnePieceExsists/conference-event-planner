import React from 'react';
import { Star, Clock } from 'lucide-react';

const featuredSpeakers = [
  { name: "Dr. Sarah Chen", title: "AI Research Director", company: "TechCorp", rating: 4.9, sessions: 3, image: "👩‍💼" },
  { name: "Mike Rodriguez", title: "Blockchain Expert", company: "CryptoLab", rating: 4.8, sessions: 2, image: "👨‍💻" },
  { name: "Dr. Emily Watson", title: "Healthcare Innovation", company: "MedTech", rating: 4.7, sessions: 4, image: "👩‍⚕️" }
];

const FeaturedSpeakers = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Featured Speakers:</h3>
      <div className="flex gap-4">
        {featuredSpeakers.map((speaker, index) => (
          <div
            key={index}
            className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-between shadow border"
            style={{ maxWidth: "33%" }}
          >
            <div className="text-4xl mb-2">{speaker.image}</div>
            <div className="font-medium text-gray-900">{speaker.name}</div>
            <div className="text-sm text-gray-500">{speaker.title}</div>
            <div className="text-xs text-gray-400 mb-2">{speaker.company}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center text-yellow-500">
                <Star className="w-3 h-3 mr-1" />
                {speaker.rating}
              </span>
              <span className="flex items-center text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {speaker.sessions} sessions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSpeakers;