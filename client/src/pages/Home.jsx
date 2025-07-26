import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItineraryCreationForm from '../components/ItineraryCreationForm';
import ItineraryCard from '../components/ItineraryCard';

const Home = () => {
  const [itineraries, setItineraries] = useState([]);
  const userId = localStorage.getItem('userId'); // Assume stored after login

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/itineraries');
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };
    fetchItineraries();
  }, []);

  const handleNewItinerary = (itinerary) => {
    setItineraries([itinerary, ...itineraries]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Plan Amazing Group Adventures</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with like-minded travelers, create unforgettable experiences, and discover new destinations together.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Planning
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Browse Trips
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Create Trip Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Next Adventure</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your travel ideas and find the perfect travel companions for your next journey.
          </p>
        </div>
        
        <div className="flex justify-center mb-16">
          <ItineraryCreationForm onSubmit={handleNewItinerary} />
        </div>

        {/* Trips Section */}
        {itineraries.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Amazing Trips</h2>
              <p className="text-lg text-gray-600">
                Join these exciting adventures or get inspired for your own trip.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary) => (
                <ItineraryCard key={itinerary._id} itinerary={itinerary} userId={userId} />
              ))}
            </div>
          </div>
        )}
        
        {itineraries.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet!</h3>
              <p className="text-gray-600 mb-4">Be the first to create an amazing group adventure.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create First Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;