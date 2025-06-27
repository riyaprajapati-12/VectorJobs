import React, { useEffect, useState } from "react";
import img from "./../assets/user.png";
import Navbar from "../components/Navbar";
import resume from "./../assets/Prateek's Resume.pdf";
import "../styles/App.css";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import {
  FaEnvelope,
  FaBriefcase,
  FaRegFileAlt,
  FaUser,
  FaFileAlt,
  FaImage,
  FaReact,
} from "react-icons/fa";

import { FaArrowCircleRight } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

const ProfileFreelancer = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); 
  const [profile, setProfile] = useState({
    photo: img,
    name: "",
    username: "",
    description: "",
    email: "",
    skills: "",
    // resume: resume,
  });

  //const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    photo: img, // Updated default value to null
    name: '',
    username : '',
    description: '',
    skills: '',
    // resume: resume,
  });

  // Function to fetch user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/freelancer/getUser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user); // This updates the state
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

   // Use useEffect to call getUserInfo once when the component mounts
  useEffect(() => {
    getUserInfo();
  }, []); // Empty dependency array ensures it runs only on mount

  // Update the profile state after userInfo is fetched
  useEffect(() => {
    if (userInfo) {
      setProfile({
        name: userInfo.fullname,
        username: userInfo.username,
        email: userInfo.email,
        description: userInfo.description,
        skills : userInfo.skills,
        profilePhoto: img, // You may want to update this if userInfo has a profile photo
      });
      setFormData({
        name: userInfo.fullname,
        username: userInfo.username,
        email: userInfo.email,
        description: userInfo.description,
        skills : userInfo.skills,
        profilePhoto: img,
      });
    }
  }, [userInfo]);





  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit (e){
    e.preventDefault();
    // Only update the photo and resume if new files are selected
   try{
    const response = await axiosInstance.put('/freelancer/edit',{
      name : formData.name,
      username: formData.username,
      email: formData.email,
      description: formData.description,
      skills : formData.skills
    })
    getUserInfo();
    setProfile({
      name : userInfo.fullname,
      username: userInfo.username,
      email: userInfo.email,
      description: userInfo.description,
      skills : userInfo.skills
    })
   }catch(err){
    console.log("Error: "+err);
   }

    setIsEditing(false);
  };

  return (
    <>
      {/* <div className="bg-white  h-screen w-screen"> */}
      <div className=" w-screen flex flex-row ">
      <Navbar />
        <div className="h-screen w-1/3 bg-[#071952] flex items-center justify-evenly">
          <div className="flex items-center justify-center flex-col mt-12">
            <img
              src={profile.photo}
              alt="Profile"
              className="w-48 h-48 rounded-full mb-4 transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="flex flex-col text-center justify-center gap-2 p-4 ">
              <h2 className="text-4xl font-bold text-white">
              {profile.name}
              </h2>
              <p className="text-2xl text-white">{profile.description}</p>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col"> */}
        {/* Div for table */}
        <div className="w-2/3 h-auto bg-white">
          <div className="h-3/2 px-12 py-4  mt-16 flex flex-col justify-start bg-white">
            <div className="flex justify-around items-center mb-8">
              <h2 className="text-black text-3xl font-bold">
                Freelancer Profile
              </h2>
              <button
                type="button"
                className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg border border-blue-600 text-sm font-medium transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700 active:scale-95"
                onClick={() => setIsEditing(true)}
              >
                <MdEdit className="mr-1 w-4 h-4" />
                Edit
              </button>

              <button
                type="button"
                className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg border border-green-600 text-sm font-medium transition-transform duration-300 ease-in-out hover:bg-green-600 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-700 active:scale-95"
                onClick={() => navigate('/freelancer')}
              >
                Dashboard
                <FaArrowCircleRight className=" ml-2 w-4 h-4" />
              </button>

              {/* <button
                class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Dashbooard
              </button> */}
            </div>

            <div className="bg-white max-h-12 max-w-auto text-gray-800 p-4 rounded-lg shadow-lg shadow-gray-300 flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 hover:border-2 border ">
              <CgProfile  className="w-6 h-6 text-blue-600 mr-4" />
              <div className="flex flex-grow flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-lg">Full Name :</p>
                  <p className="text-md text-gray-700">{profile.name}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mx-2 my-2">
              <div className="bg-white max-h-12 text-gray-800 p-4 rounded-lg shadow-lg shadow-gray-300 flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 hover:border-2 ">
                <FaEnvelope className="w-6 h-6 text-blue-600 mr-4" />
                <div className="flex flex-grow flex-col">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-lg">Email:</p>
                    <p className="text-md text-gray-700">{profile.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white max-h-12 text-gray-800 p-4 rounded-lg shadow-lg shadow-gray-300 flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 hover:border-green-400 hover:border-2 ">
                <FaBriefcase className="w-6 h-6 text-green-600 mr-4" />
                <div className="flex flex-grow flex-col">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-lg">Skills:</p>
                    <p className="text-md text-gray-700">{profile.skills}</p>
                  </div>
                </div>
              </div>

              {profile.resume && (
                <div className="bg-white max-h-12 text-gray-800 p-4 rounded-lg shadow-lg shadow-gray-300 flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-200 hover:border-yellow-400 hover:border-2 hover:scale-105 hover:shadow-2xl">
                  <FaRegFileAlt className="w-6 h-6 text-yellow-600 mr-4" />
                  <div className="flex flex-grow flex-col">
                    <a
                      href={profile.resume}
                      download
                      className="text-blue-600 hover:underline font-medium transition duration-300 ease-in-out hover:text-blue-700"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
              )}
              </div>
          </div>

          
            {/* <div className="overflow-y-auto" style={{ maxHeight: "100px" }}>
              {" "}
              {/* Set a maxHeight that works for your layout */}
              
            </div>
          </div>
        {/* <div className=" w-auto  bg-gray-500 ">
            hello
          </div> */}
      

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 px-8 rounded-lg w-1/3 h-[95vh] max-h-[95vh] overflow-auto relative">
            <button
              className="absolute top-1 right-2 text-black text-3xl hover:text-gray-800 hover:scale-150  transition-transform duration-300"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

            {/* Profile Photo Preview and Input */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  formData.photo
                    ? URL.createObjectURL(formData.photo)
                    : profile.photo
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mb-2"
              />
              {/* <div className="relative">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="photo-upload"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-black border rounded-md cursor-pointer hover:bg-gray-800"
                >
                  <FaImage className="mr-2" /> Upload Image
                </label>
              </div> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                <FaUser className="w-6 h-6 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                  placeholder="Enter your name"
                />
              </div>

              {/* <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                <FaEnvelope className="w-6 h-6 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                  placeholder="Enter your email"
                />
              </div> */}

              <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                <FaFileAlt className="w-6 h-6 text-gray-500" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                  placeholder="Enter a description"
                />
              </div>

              <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                <FaReact className="w-6 h-6 text-gray-500" />
                <select
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="flex-1 bg-white text-gray-900 border border-white rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                >
                  <option value="">Select a Tag</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Python Developer">Python Developer</option>
                  <option value="Java Developer">Java Developer</option>
                  <option value="Fullstack Developer">
                    Fullstack Developer
                  </option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="App Developer">App Developer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Content Writer">Content Writer</option>
                  <option value="Social Media Manager">
                    Social Media Manager
                  </option>
                  <option value="Project Manager">Project Manager</option>
                </select>
              </div>

              <div className="flex items-center justify-around">
                {/* <div className="relative text-center">
                  <input
                    type="file"
                    name="resume"
                    id="resume-upload"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center h-12 w-36 text-sm font-medium text-white bg-black border rounded-md cursor-pointer hover:bg-gray-800"
                  >
                    <FaFileAlt className="mr-2" /> Upload Resume
                  </label>
                </div> */}
                <button
                  type="submit"
                  className="cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg border-blue-600 border-b-[4px] 
            hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default ProfileFreelancer;
