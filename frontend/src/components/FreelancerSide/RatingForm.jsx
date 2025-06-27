import React, { useState,useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const RatingForm = ({ applicantId, jobId, onClose, close }) => {
  const [completionTimeRating, setCompletionTimeRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);
  const [error, setError] = useState('');
  const [applicant, setApplicant] = useState(null); // Store applicant data

  useEffect(() => {
    const fetchApplicantId = async () => {
      try {
        const response = await axiosInstance.get(`/job/${jobId}`);
        const job = response.data;

        // Assuming job.applicants is an array and applicantId is stored within the applicants array
        const applicant = job.applicants.find(app => app._id === applicantId);

        if (applicant) {
          setApplicant(applicant); // Store the applicant data
        } else {
          setError('Applicant not found for this job.');
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
       // setError('Failed to fetch job data.');
      }
    };

    fetchApplicantId();
  }, [jobId, applicantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (completionTimeRating === null || overallRating === null) {
      setError('Please provide ratings for both Completion Time and Overall Experience.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/freelancer/rate', {
        applicantId,
        jobId,
        completionTimeRating,
        overallRating,
      });
  
      if (response.status === 200) {
        alert('Rating submitted successfully');
        onClose(); // Close the form after submission
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Failed to submit rating.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4 text-black">Rate Completion Time</h2>
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setCompletionTimeRating(rate)}
                className={`text-3xl ${
                  completionTimeRating >= rate ? 'text-yellow-500' : 'text-gray-400'
                } hover:text-yellow-500 focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4 text-black">Rate Overall Experience</h2>
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setOverallRating(rate)}
                className={`text-3xl ${
                  overallRating >= rate ? 'text-yellow-500' : 'text-gray-400'
                } hover:text-yellow-500 focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Submit Ratings
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
