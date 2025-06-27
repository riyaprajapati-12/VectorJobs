import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import RatingForm from "../FreelancerSide/RatingForm";

export default function Applicant({ toggleApplicant, Data }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiredApplicantId, setHiredApplicantId] = useState(null); // Track hired applicant ID
  const [showRatingForm,setShowRatingForm] = useState(false)
  const fetchApplicants = async () => {
    try {
      const response = await axiosInstance.get(`/job/jobs/${Data._id}`);
      const applicantsData = response.data.applicants;
      setApplicants(applicantsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setError('Failed to fetch applicants.');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplicants();
  }, [Data._Id]);

  const updateChatClient = async ()=>{
    try{
      const response = await axiosInstance.post('/freelancer/updateChatClients');
      alert(response.data.msg);
      console.log(response);
    }catch(error){
      console.error("Error updating chat clients", error);
      alert('Failed to update chat clients');
    }
  };

  const handleHireApplicant = async (applicantId) => {
    try {
      const response = await axiosInstance.patch(`/job/hire/${Data._id}`, {
        applicantId,
      });
      if (response.status === 200) {
        setHiredApplicantId(applicantId);
        updateChatFreelancer();
        updateChatClient();
        fetchApplicants() // Set the hired applicant ID
      }
    } catch (error) {
      console.error("Error hiring applicant:", error);
    }
  };

  const updateChatFreelancer = async () => {
    try {
      const response = await axiosInstance.get('/client/updateChatFreelancer', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the access token
        },
      });
      console.log('Chat freelancer list updated successfully:', response);
    } catch (error) {
      console.error('Error updating chat freelancer list:', error.response ? error.response.data : error.message);
    }
  };

  const handleCloseRatingForm = () => {
    setShowRatingForm(false);
    setHiredApplicantId(null); // Clear the hired applicant ID
  };

  return (
    <div className="flex items-center justify-center shadow-2xl shadow-black">
      <div className="relative w-full max-w-4xl h-full overflow-x-auto">
        {/* Cross button at the top right of the table */}
        <button
          onClick={toggleApplicant}
          className="absolute top-0 right-[1px] text-black text-3xl hover:text-gray-800 focus:outline-none bg-transparent"
        >
          &times;
        </button>

        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[rgb(66,63,193)] text-white text-left">
              <th className="px-6 py-6 font-medium text-sm">S.no.</th>
              <th className="px-6 py-6 font-medium text-sm">Username</th>
              <th className="px-6 py-6 font-medium text-sm">Speciality</th>
              <th className="px-6 py-6 font-medium text-sm">Bid</th>
              <th className="px-6 py-6 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={applicant._id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 text-gray-800">{applicant.username}</td>
                <td className="px-6 py-4 text-gray-600">{applicant.skills}</td>
                <td className="px-6 py-4 text-gray-800">{applicant.bid}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button 
                    onClick={() => handleHireApplicant(applicant._id)} 
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                  >
                    <FaCheck className="text-lg" />
                  </button>
                  <button 
                    onClick={updateChatFreelancer} 
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                  {hiredApplicantId === applicant._id && (
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    >
                      Rate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showRatingForm && <RatingForm 
      applicantId={hiredApplicantId}
      jobId={Data._id}
      onClose={handleCloseRatingForm}/>}
    </div>
  );
}
