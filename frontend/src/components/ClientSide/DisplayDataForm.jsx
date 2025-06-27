import React, { useState } from "react";
import Client from "../../assets/Client.jpg";
import Message from "./Message";
import axiosInstance from "../../utils/axiosInstance";
import { AiFillDelete } from "react-icons/ai";
import RatingForm from "../FreelancerSide/RatingForm";

export default function DisplayDataForm({
  data,
  showPage,
  D_M_Y,
  DisplayTable,
  getJobs,
  DeleteData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [showMessage, setShowMessage] = useState(false);


  const [showRForm, setShowRform] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  async function handleSaveClick() {
    await axiosInstance
      .put(`/job/edit/${data._id}`, { editedData })
      .then((res) => {
        console.log(res);
      });
    getJobs();
    console.log("Data saved:", editedData);
    setIsEditing(false);
  }

  const handleChange = (e) => {
    setEditedData({ ...editedData, jobDescription: e.target.value });
  };

  async function DeleteData() {
    const userInput = prompt("Sure want to delete the job? yes/no?");
    if (userInput === "yes" || userInput === "Yes") {
      try {
        const response = await axiosInstance.delete(`/job/delete/${data._id}`);
        getJobs();
        alert("User Deleted successfully");
        console.log(response.data.message); 
      } catch (error) {
        console.error(
          "Error deleting job:",
          error.response ? error.response.data.message : error.message
        );
      }
    }
  }

  const ShowRating = () => {
    setShowRform(true);
    // showPage(); // Close DisplayDataForm after showing RatingForm
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="relative w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden ">
        <button
          onClick={showPage}
          className="absolute top-0 right-4 bg-transparent text-3xl text-gray-600 p-1 transition-all duration-300 transform hover:text-black hover:scale-110"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Dustbin Icon */}
        <button
          onClick={DeleteData}
          className="absolute top-4 left-4 bg-transparent text-2xl text-red-600 p-1 transition-all duration-300 transform hover:text-red-800 hover:scale-110"
          aria-label="Delete"
        >
          <AiFillDelete />
        </button>
        <button onClick={ShowRating} className="bg-red-600 text-white px-3 py-1 ml-14 mt-4  rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600">
          End Job
        </button>
        <div className="flex mt-8">
          <div className="w-1/2">
            <img
              src={Client}
              alt="Client"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-2/3 p-6">
            <h1 className="text-2xl font-bold text-white p-4 rounded-lg shadow-md mb-6 bg-gradient-to-r from-blue-600 to-blue-800">
              Job Details
            </h1>
            <div className="mb-6 p-4 bg-white shadow-xl rounded-xl border border-gray-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-950 mb-2 sm:mb-0">
                  Project:{" "}
                  <span className="text-gray-600 font-medium">
                    {data.jobTitle}
                  </span>
                </h2>
                <p className="text-lg font-semibold text-gray-950">
                  Deadline:{" "}
                  <span className="text-gray-600 font-medium">
                    {data.deadline}
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-6 p-4 bg-white shadow-xl rounded-xl border border-gray-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="text-lg font-semibold text-gray-950 mb-2 sm:mb-0">
                  Rewards: <span className="text-gray-600">{data.reward}</span>
                </p>
                <p className="text-lg font-semibold text-gray-950">
                  Tags: <span className="text-gray-600">{data.tags}</span>
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-950 mb-2">
                Description:
              </p>
              <textarea
                className={`w-full p-4 border border-gray-300 text-black rounded-lg bg-gray-50 shadow-inner focus:outline-none focus:ring-2 resize-none transition-all duration-300 hover:border-blue-500 ${
                  isEditing ? "focus:ring-blue-500" : "focus:ring-gray-300"
                }`}
                style={{ minHeight: "150px" }}
                value={editedData.jobDescription}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex justify-end gap-4 relative">
              {isEditing ? (
                <button
                  onMouseEnter={() => setShowMessage(false)}
                  onMouseLeave={() => setShowMessage(false)}
                  onClick={handleSaveClick}
                  className="bg-gray-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 flex items-center gap-2 border-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </button>
              ) : (
                <button
                  onMouseEnter={() => setShowMessage(true)}
                  onMouseLeave={() => setShowMessage(false)}
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L6.75 19.75H3.5v-3.25L16.732 4.732z"
                    />
                  </svg>
                  Edit
                </button>
              )}
              <button
                onClick={() => {
                  showPage();
                  DisplayTable();
                }}
                className="absolute bg-gray-600 left-0 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 flex items-center gap-2 border-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    />
                </svg>
                Applicants
              </button>
              {showMessage && (
                <div className="absolute bottom-full mb-2 left-4/5 transform -translate-x-1/2">
                  <Message />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* RatingForm component */}
      {showRForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <RatingForm
            jobId={data._id}
            jobTitle={data.jobTitle}
            jobSkills={data.tags}
            close={showPage}
          />
        </div>
      )}
    </div>
  );
}
