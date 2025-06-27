import React, { useState, useEffect } from "react";
import RatingForm from "./RatingForm";
import axiosInstance from "../../utils/axiosInstance";
//const sendEmail = require('../services/mailer'); // Adjust path as necessary
// import sendEmail from "../../../../backEnd/services/mailer";



const LeaderTable = ({ selectedFilter, selectedOption, onDropdownChange }) => {
  const [sortedData, setSortedData] = useState([]);
  const [button, setButton] = useState(false);
  // async function onSubmit(){
  //   const emailSubject = `Invitation to collaborate`;
  //     const emailText = `Dear Om govindani \n\nI hope you are well my name is Adam polls and i represent zegotech.we are working on a project and believe your expertiece would be invaluable lets discuss the possibility of your envolvement in this project if you are interested please let us kniw looking forward for your response\n\nBest regards,\nAdam polls`;

  //     // Send the email to the freelancer
  //     await sendEmail("omgovindani@gmail.com", emailSubject, emailText).then((res)=>{
  //       console.log(res);
  //     })
  // }

  const handleApproachClick = async (email) => {
    try {
      const emailSubject = `Invitation to collaborate`;
      const emailText = `Dear Freelancer, \n\nWe are interested in collaborating with you on a project. Please let us know if you are available to discuss this opportunity further.\n\nBest regards,\nVector Jobs`;

      await axiosInstance.post('/client/send-email', { to: email, subject: emailSubject, text: emailText });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error); 
      alert("Failed to send email.");
    }
  };

  // Sample data for the table with updated skills
  const tableData = [
    // Your data here
    { id: 1, name: "Piyush Govindani", skills: "Frontend Developer", rating: 4.5, ranking: 3, completionRating: 4.2 },
    { id: 2, name: "Jane Smith", skills: "Python Developer", rating: 4.7, ranking: 3, completionRating: 4.8 },
    { id: 3, name: "Om Govindani", skills: "Java Developer", rating: 4.6, ranking: 2, completionRating: 4.6 },
    { id: 4, name: "Michael Brown", skills: "Backend Developer", rating: 4.4, ranking: 5, completionRating: 4.0 },
    { id: 5, name: "Emily Davis", skills: "Fullstack Developer", rating: 4.8, ranking: 4, completionRating: 4.7 },
    { id: 6, name: "David Wilson", skills: "App Developer", rating: 4.3, ranking: 7, completionRating: 4.1 },
    { id: 7, name: "Sophia Martinez", skills: "Graphic Designer", rating: 4.5, ranking: 6, completionRating: 4.3 },
    { id: 8, name: "James Anderson", skills: "UI/UX Designer", rating: 4.6, ranking: 8, completionRating: 4.5 },
    { id: 9, name: "Isabella Thomas", skills: "Content Writer", rating: 4.7, ranking: 9, completionRating: 4.9 },
    { id: 10, name: "William Jackson", skills: "Social Media Manager", rating: 4.4, ranking: 10, completionRating: 4.2 },
    { id: 11, name: "Mia White", skills: "Project Manager", rating: 4.9, ranking: 11, completionRating: 4.8 },
    { id: 12, name: "Benjamin Harris", skills: "Software Developer", rating: 4.3, ranking: 12, completionRating: 4.1 },
    { id: 13, name: "Charlotte Lee", skills: "Frontend Developer", rating: 4.8, ranking: 13, completionRating: 4.7 },
    { id: 14, name: "Alexander King", skills: "Backend Developer", rating: 4.5, ranking: 14, completionRating: 4.4 },
    { id: 15, name: "Amelia Wright", skills: "Fullstack Developer", rating: 4.7, ranking: 15, completionRating: 4.6 },
  ];

  const fetchFreelancers = async () => {
    try {
      const response = await axiosInstance.get("/freelancer/all");
      setSortedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);


  useEffect(() => {
    let filteredData = [...sortedData];
    
    // Apply skill filter based on selected options
    if (selectedOption.length > 0) {
      filteredData = filteredData.filter((item) => selectedOption.includes(item.skills));
    }

    // Apply dropdown filter
    switch (selectedFilter) {
      case 'average-rating':
        filteredData.sort((a, b) => b.overallRating - a.overallRating);
        break;
      case 'average-ranking':
        filteredData.sort((a, b) => a.numberOfRatings - b.numberOfRatings);
        break;
      case 'average-completion-time':
        filteredData.sort((a, b) => b.CompletionRatings - a.CompletionRatings);
        break;
      default:
        break;
    }

    setSortedData(filteredData);
  }, [selectedFilter, selectedOption]);

  const handleButtonClick = () => {
    setButton(!button);
  };
  let items =0;

  return (
    <div className="h-full p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex justify-center space-x-6">
        <select
          value={selectedFilter}
          onChange={onDropdownChange}
          className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 bg-gray-200 text-gray-800 transition hover:bg-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select Filter</option>
          <option value="average-rating">Average Rating</option>
          <option value="average-ranking">Average Ranking</option>
          <option value="average-completion-time">Average Completion Time</option>
        </select>
        
        {/* <button
          onClick={handleButtonClick}
          className={`px-5 py-2.5 text-sm font-medium rounded-lg transition ${
            button ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`}
        >
          {button ? 'Hide Rating Form' : 'Show Rating Form'}
        </button> */}
      </div>

      {button && <RatingForm />}
      <div className="overflow-auto h-[380px] mt-4"> {/* Adjust height as needed */}
        <table className="w-full table-auto border-collapse text-black bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">S.No.</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Full Name</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Skills</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Rating</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-center text-sm font-semibold text-blue-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="bg-white text-black hover:bg-blue-50 transition">
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{items+(items+1)}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.username}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.skills}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.overallRating}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-center text-sm">
                  <button 
                    
                    onClick={handleApproachClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Approach
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderTable;