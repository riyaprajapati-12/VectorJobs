import React, { useState } from "react";
import Bid from '../../assets/Bid.jpg';
import axiosInstance from "../../utils/axiosInstance";

export default function FreelancerForm({ VisibleForm ,data, setShowFreelancerForm }) {
  const [formData, setFormData] = useState({
    bid: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   setFormData({
  //     bid: "",
  //     note: "",
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(data);

    try {
      const response = await axiosInstance.post(`/job/apply/${data._id}`, formData);
      alert(response.data.msg);
      console.log(data);
      // Optionally reset form data after successful submission
      setFormData({
        bid: "",
        note: "",
        skills: ""
      });
    } catch (error) {
      console.error(error);
      alert('Failed to apply');
    }
  };

  const hideForm = () => {
    setShowFreelancerForm({
      isShown: false,
      Data: null
    });
  };

  return (
    <div className="relative p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-xl flex items-center">
      {/* Close button */}
      <button
        onClick={hideForm }
        className="absolute top-4 right-4 bg-transparent text-gray-700 hover:text-gray-900 text-2xl font-bold focus:outline-none"
      >
        &times;
      </button>

      <div className="w-1/2 p-4">
        <img
          src={Bid}
          alt="Bid"
          className="rounded-lg object-cover h-full w-full shadow-md border border-gray-200"
        />
      </div>

      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Freelancer Bid Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="bid"
              className="block text-gray-700 font-medium text-lg mb-2"
            >
              Bid Amount:
            </label>
            <input
              type="number"
              id="bid"
              name="bid"
              value={formData.bid}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your bid amount"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="note"
              className="block text-gray-700 font-medium text-lg mb-2"
            >
              Additional Notes:
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              rows="4"
              placeholder="Add any additional information"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[rgb(66,63,193)] text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
