import React, { useState, useEffect } from "react";
import FormDiv from "./FormDiv";
import ClientForm from "./ClientForm";
import Collection_of_Form from "./Collection-of-Form";
import ErrorPage from "../ErrorPage";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa"; // Import trophy icon
import "../../styles/App.css";

function ClientPage() {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const toggleFormVisibility = () => {
    setVisible(!visible);
  };

  const DateChange = (dates) => {
    setDate(dates);
  };

  const handleDeleteCollection = () => {
    setFormData(null);
    console.log("whole data deleted!");
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/client/getUser");
      if (response.data && response.data.user) {
        console.log(response.data.user);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const getJobs = async () => {
    try {
      const response = await axiosInstance.get("/job/getJobs");
      setJobs(response.data.jobs || []);
      console.log(response.data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    getJobs();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white">
      <Navbar userInfo={userInfo} profile="/profileClient" />
      <div className="flex items-end justify-end mr-8 mt-24">
        <button
          onClick={() => navigate("/client/leaderboard")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          <FaTrophy className="mr-2 text-xl" /> {/* Trophy icon */}
          <span>Leaderboard</span>
        </button>
      </div>

      <div className="Jobs container mx-auto px-8 min-h-screen">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Collection_of_Form
                key={job._id}
                Data={job}
                getJobs={getJobs}
                DateData={date}
                onDelete={handleDeleteCollection}
              />
            ))}
          </div>
        ) : (
          <ErrorPage />
        )}
      </div>

      <div className="fixed bottom-4 right-4 h-[120px] w-[120px] rounded-2xl">
        <FormDiv temp={toggleFormVisibility} />
      </div>

      {visible && (
        <ClientForm
          getJobs={getJobs}
          toggleFormVisibility={toggleFormVisibility}
          onSubmit={handleFormSubmit}
          ChangeDate={DateChange}
        />
      )}

      <Footer />
    </div>
  );
}

export default ClientPage;
