import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import img from "./../assets/user.png";
import { FaEnvelope, FaRegFileAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaArrowCircleRight, FaUser, FaFileAlt } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaCheck } from "react-icons/fa";

const ProfileClient = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  //gst
  const [isEditing, setIsEditing] = useState(false);
  const [gstNumber, setGstNumber] = useState(""); // You can initialize with the default GST number if needed

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // const handleReadOnly = () => {
  //   setIsEditing(false);
  // };

  const handleChangeGST = (e) => {
    setGstNumber(e.target.value);
  };
  // const handleSubmitGST = () => {
  //   // Perform validation or any other logic before switching to read-only
  //   handleReadOnly();
  // };

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    description: "",
    profilePhoto: img,

  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    description: "",
    profilePhoto: img,
  });

  // Function to fetch user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/client/getUser");
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
    console.log(userInfo);
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
        profilePhoto: img, // You may want to update this if userInfo has a profile photo
      });
      setFormData({
        name: userInfo.fullname,
        username: userInfo.username,
        email: userInfo.email,
        description: userInfo.description,
        profilePhoto: img,
      });
    }
  }, [userInfo]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto" && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Update the profile state with the new form data
      // Send the updated data to the backend
      const response = await axiosInstance.put("/client/edit", {
        name: formData.name, // Correctly use 'name' from formData
        username: formData.username, // Update if this field is editable in your form
        email: formData.email, // Update if this field is editable in your form
        description: formData.description,
        profilePhoto: formData.profilePhoto,
      });
      getUserInfo();
      setProfile({
        name: userInfo.fullname, // Correctly use 'name' from formData
        username: userInfo.username, // Update if this field is editable in your form
        email: userInfo.email, // Update if this field is editable in your form
        description: userInfo.description,
        profilePhoto: userInfo.profilePhoto, // Ensure correct use of profilePhoto
      });
      console.log(response);
    } catch (err) {
      console.log("Error: " + err);
    }

    setShowModal(false); // Close the modal after saving
  }

  return (
    <>
      <div className="flex w-screen h-screen">
        <Navbar userInfo={userInfo} />
        {/* Profile Image and Name */}
        <div className="w-1/3 h-full bg-[#071952] flex flex-col items-center justify-center p-6 shadow-lg transition-transform duration-300 ease-in-out  hover:shadow-2xl ">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-48 h-48 rounded-full border-8 p-2 border-white  mb-4 transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h2 className="text-2xl font-bold my-2 text-white transition-colors duration-300 ease-in-out hover:text-blue-600 hover:scale-105">
            {userInfo ? userInfo.username : profile.name}
          </h2>
        </div>

        {/* Remaining Profile Information */}
        <div className="w-2/3 h-full px-12 py-8 flex flex-col justify-center bg-white">
        {/* GST */}
          <div className="flex left-0 flex-col "> 
            {/* <p className="text-black flex justify-center items-center font-bold text-2xl mb-2"> */}
              {/* GST Registration Number */}
            {/* </p> */}
            <div className="flex items-center justify-center text-white mt-2">
              {/* <div className="flex items-center justify-center mb-8">
              </div> */}
            </div>
          </div>
          {/* GST */}
          <div className="flex justify-around items-center mb-8">
            <h2 className="text-black text-3xl font-bold">Client Profile</h2>
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg border border-blue-600 text-sm font-medium transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700 active:scale-95 "
              onClick={handleEditClick}
            >
              <MdEdit className="mr-1 w-4 h-4" />
              Edit
            </button>

            <button
              type="button"
              className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg border border-green-600 text-sm font-medium transition-transform duration-300 ease-in-out hover:bg-green-600 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-700 active:scale-95"
              onClick={() => navigate("/client")}
            >
              Dashboard
              <FaArrowCircleRight className=" ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 mx-2 my-2">
            <div className="bg-white text-gray-800 p-4 rounded-lg shadow-2xl shadow-gray-500  flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 ">
              <CgProfile className="w-6 h-6 text-blue-600 mr-4" />
              <div className="flex flex-grow flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-lg">Full Name :</p>
                  <p className="text-md text-gray-700">
                    {userInfo ? userInfo.fullname : profile.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-4 rounded-lg shadow-2xl shadow-gray-500  flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 ">
              <FaEnvelope className="w-6 h-6 text-blue-600 mr-4" />
              <div className="flex flex-grow flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-lg">Email:</p>
                  <p className="text-md text-gray-700">
                    {userInfo ? userInfo.email : profile.email}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg shadow-gray-300 flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 hover:border-green-400 hover:border-2 border hover:scale-105 hover:shadow-2xl">
              <FaBriefcase className="w-6 h-6 text-green-600 mr-4" />
              <div className="flex flex-grow flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-lg">Number of Jobs:</p>
                  <p className="text-md text-gray-700">{profile.jobs}</p>
                </div>
              </div>
            </div> */}
            <div className="bg-white text-gray-800 p-4 rounded-lg shadow-2xl shadow-gray-500  flex items-center transition-transform duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-200 hover:border-yellow-400">
              <FaRegFileAlt className="w-6 h-6 text-yellow-600 mr-4" />
              <div className="flex flex-grow flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-lg">Description:</p>
                  <p className="text-md text-gray-700">
                    {userInfo ? userInfo.description : profile.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 px-8 rounded-lg w-1/3 h-[95vh] max-h-[95vh] overflow-auto relative">
              <button
                className="absolute top-0 right-2 text-3xl text-black"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-xl  text-black font-bold mb-4 text-center">
                Edit Profile
              </h2>

              {/* Profile Photo Preview and Input */}
              <div className="flex flex-col items-center mb-4">
                <img
                  alt="Profile"
                  className="w-32 h-32 rounded-full  mt-4"
                  src={formData.profilePhoto}
                />
                {/* <div className="relative">
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleChange}
                    id="profile-photo-upload"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="profile-photo-upload"
                    className="flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-black border rounded-md cursor-pointer hover:bg-gray-800"
                  >
                    Upload Profile Photo
                  </label>
                </div> */}
              </div>

              <div className="flex flex-col mt-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-8 ">
                    <div className="shadow-2xl shadow-gray-500 flex gap-2 items-center bg-white p-2  rounded-md">
                      <FaUser className="w-6 h-6 text-gray-500  duration-300" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-3xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                  <FaEnvelope className="w-6 h-6  text-gray-500  duration-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                    placeholder="Enter your email"
                  />
                </div> */}

                    {/* <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
                  <FaList className="w-6 h-6 text-gray-500  duration-300" />
                  <input
                    type="number"
                    name="jobs"
                    value={formData.jobs}
                    onChange={handleChange}
                    className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                    placeholder="Enter the number of jobs"
                  />
                </div> */}

                    <div className="shadow-2xl shadow-gray-500 flex gap-2 items-center bg-white p-2 rounded-md">
                      <FaFileAlt className="w-6 h-6 text-gray-500  duration-300" />
                      <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="flex-1 focus:outline-none placeholder-gray-500 text-gray-900 bg-white"
                        placeholder="Enter a description"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-around ">
                    <button
                      type="button"
                      className="mr-2 cursor-pointer transition-all bg-gray-200 text-gray-700 px-6 py-2 rounded-lg border-gray-400 border-b-[4px] 
       hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
       active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-12"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg border-blue-600 border-b-[4px] 
       hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
       active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-12"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileClient;
