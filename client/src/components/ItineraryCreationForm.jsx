import React, { useState } from 'react';
import axios from 'axios';

const ItineraryCreationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    dates: '',
    participantLimit: 1,
    vibeTags: [],
    description: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setFormData({
        ...formData,
        vibeTags: [...formData.vibeTags, e.target.value],
      });
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itineraryData = {
      title: formData.title,
      destination: formData.destination,
      dates: formData.dates,
      participantLimit: parseInt(formData.participantLimit, 10),
      vibeTags: formData.vibeTags,
      description: formData.description,
      budget: formData.budget,
      timestamp: new Date().toISOString(),
    };
    try {
      await axios.post('http://localhost:5000/api/itineraries', itineraryData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onSubmit(itineraryData);
      setFormData({
        title: '',
        destination: '',
        dates: '',
        participantLimit: 1,
        vibeTags: [],
        description: '',
        budget: '',
      });
    } catch (error) {
      console.error('Error posting itinerary:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a Group Trip</h2>
        <p className="text-gray-600">Share your adventure idea and find travel companions</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Trip Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Coastal Camping Adventure"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Big Sur, CA"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Travel Dates</label>
            <input
              type="text"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., July 10-12, 2025"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Participant Limit</label>
            <input
              type="number"
              name="participantLimit"
              value={formData.participantLimit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              min="1"
              max="50"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Vibe Tags</label>
          <input
            type="text"
            onKeyDown={handleTagAdd}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., adventure, budget, music (press Enter to add)"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.vibeTags.map((tag, index) => (
              <span key={index} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Describe the trip (e.g., hiking, beach days, cultural exploration)"
            rows="4"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Estimated Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., $200 per person"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          🚀 Create Amazing Trip
        </button>
      </form>
    </div>
  );
};

export default ItineraryCreationForm;