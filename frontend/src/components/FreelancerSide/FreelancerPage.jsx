import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import FreelancerCard from "./FreelancerCard";
import FreelancerForm from "./FreelancerForm";
import axiosInstance from "../../utils/axiosInstance";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";

export default function FreelancerPage() {
  const [showFreelancerForm, setShowFreelancerForm] = useState({
    isShown: false,
    Data: null
  });
  const [userInfo, setUserInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job/allJobs");
        setJobs(res.data);
        setFilteredJobs(res.data); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on selected options
  useEffect(() => {
    getUserInfo();
    if (selectedOptions.length === 0) {
      setFilteredJobs(jobs); // If no options selected, show all jobs
    } else {
      const filtered = jobs.filter(job =>
        selectedOptions.some(option => job.tags.includes(option))
      );
      setFilteredJobs(filtered);
    }
  }, [selectedOptions, jobs]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const FormShow = (Job) => {
    setShowFreelancerForm({
      isShown: true,
      Data: Job
    });
    console.log("hello");
  };

  const ToggleMode = () => {
    setShowFreelancerForm({ isShown: false, Data: null });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/freelancer/getUser");
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

  const jobTitles = [
    "Software Developer",
    "Python Developer",
    "Java Developer",
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "App Developer",
    "Graphic Designer",
    "UI/UX Designer",
    "Content Writer",
    "Social Media Manager",
    "Project Manager",
  ];

  return (
    <div className="min-h-screen w-screen inset-0 overflow-hidden shadow-xl bg-white">
      <div className="flex flex-col min-h-screen">
        <Navbar userInfo={userInfo}/>
        <div className="mt-16 flex flex-row">
          <div className="h-screen w-1/4 bg-slate-200">
            {/* Filter Section */}
            <div className="flex flex-col bg-[#071952]  py-8 px-2 h-full">
              <h2 className="text-2xl  text-white cursor-pointer mb-4 text-center font-bold hover:text-slate-500">
                Filters
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 bg-[#071952] mx-4 p-4 ">
                {jobTitles.map((title) => (
                  <label
                    key={title}
                    htmlFor={title}
                    className="flex items-center gap-3 cursor-pointer mb-2"
                  >
                    <input
                      id={title}
                      type="checkbox"
                      value={title}
                      checked={selectedOptions.includes(title)}
                      onChange={handleCheckboxChange}
                      className="peer hidden"
                    />
                    <div
                      className={`h-6 w-6 flex rounded-md border ${
                        selectedOptions.includes(title)
                          ? "bg-[#5b38e8] border-[#5b38e8]"
                          : "border-black bg-white dark:bg-white"
                      } peer-checked:bg-[#7152f3] transition`}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className={`w-6 h-6 ${
                          selectedOptions.includes(title)
                            ? "stroke-white"
                            : "stroke-black"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <span
                      className={`text-lg font-medium ${
                        selectedOptions.includes(title)
                          ? "text-white "
                          : "text-slate-400"
                      }`}
                    >
                      {title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs */}
          <div className="w-3/4 flex flex-col  h-screen overflow-y-scroll bg-[#7E8EF1]">
            <h2 className="text-center font-bold text-2xl m-4  text-white  bg-[#7E8EF1]">
              Explore Jobs
            </h2>
            <div className="Jobs container mx-auto px-8 min-h-screen">
              {filteredJobs.length > 0 ? (
                <div>
                  {filteredJobs.map((job) => (
                    <FreelancerCard
                    key={job._id}
                    Data={job}
                    funcShow={FormShow}
                    />
                  ))}
                </div>
              ) : (
                <ErrorPage />
              )}
            </div>
          </div>
        </div>
      </div>
      {showFreelancerForm.isShown && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <FreelancerForm
            VisibleForm={ToggleMode}
            data={showFreelancerForm.Data}
            setShowFreelancerForm={setShowFreelancerForm}
            />
        </div>
      )}
      <div className="">
      
      <Footer/>
      </div>
    </div>
  );
}
