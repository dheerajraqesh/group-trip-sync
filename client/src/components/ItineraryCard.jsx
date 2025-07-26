import React, { useState } from 'react';
import axios from 'axios';

const ItineraryCard = ({ itinerary, userId }) => {
  const [likes, setLikes] = useState(itinerary.likes || 0);
  const [comments, setComments] = useState(itinerary.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/itineraries/${itinerary._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking itinerary:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/itineraries/${itinerary._id}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setComments([...comments, { userId, text: newComment, timestamp: new Date().toISOString() }]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/itineraries/${itinerary._id}/join`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Join request sent!');
    } catch (error) {
      console.error('Error sending join request:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <h3 className="text-xl font-bold mb-2 text-center">{itinerary.title}</h3>
        <div className="flex items-center justify-center text-blue-100">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{itinerary.destination}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{itinerary.participants?.length || 0}</div>
              <div className="text-sm text-gray-600">of {itinerary.participantLimit} travelers</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-semibold text-gray-900">{itinerary.budget || 'TBD'}</div>
              <div className="text-sm text-gray-600">estimated budget</div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{itinerary.dates}</span>
          </div>
        </div>

        {/* Vibe Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {itinerary.vibeTags.map((tag, index) => (
            <span key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-center mb-6 leading-relaxed">{itinerary.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleLike}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            Like ({likes})
          </button>
          <button
            onClick={handleJoin}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={itinerary.participants?.length >= itinerary.participantLimit}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Join Trip
          </button>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Comments</h4>
          <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-800">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center text-sm">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <form onSubmit={handleComment} className="space-y-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Share your thoughts..."
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
            >
              💬 Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;