
import React from 'react';
import { Star, Clock } from 'lucide-react';

const featuredSpeakers = [
  { name: "Dr. Sarah Chen", title: "AI Research Director", company: "TechCorp", rating: 4.9, sessions: 3, image: "👩‍💼" },
  { name: "Mike Rodriguez", title: "Blockchain Expert", company: "CryptoLab", rating: 4.8, sessions: 2, image: "👨‍💻" },
  { name: "Dr. Emily Watson", title: "Healthcare Innovation", company: "MedTech", rating: 4.7, sessions: 4, image: "👩‍⚕️" }
];

const FeaturedSpeakers = () => {
  return (
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
  );
};

export default FeaturedSpeakers;
