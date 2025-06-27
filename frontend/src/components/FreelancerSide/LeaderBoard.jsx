import React, { useState } from "react";
import Navbar from "../Navbar";
import LeaderTable from "./LeaderTable";

const LeaderBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);

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

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOption((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleDropdownChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Filter Section */}
        <div className="w-1/3 bg-[#071952] py-8 px-2 h-full overflow-y-auto">
          <h2 className="text-2xl text-white cursor-pointer mb-4 text-center font-bold hover:text-slate-500">
            Filters
          </h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mx-4 p-4">
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
                  checked={selectedOption.includes(title)}
                  onChange={handleCheckboxChange}
                  disabled={!selectedFilter}
                  className="peer hidden"
                />
                <div
                  className={`h-6 w-6 flex rounded-md border ${
                    selectedOption.includes(title)
                      ? "bg-[#5b38e8] border-[#5b38e8]"
                      : "border-black bg-white dark:bg-white"
                  } peer-checked:bg-[#7152f3] transition`}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 ${
                      selectedOption.includes(title)
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
                    selectedOption.includes(title)
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  {title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* LeaderTable Component */}
        <div className="flex-1 bg-slate-200 p-4 mt-16">
          <LeaderTable
            selectedFilter={selectedFilter}
            selectedOption={selectedOption}
            onDropdownChange={handleDropdownChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;