import React from "react";

export default function FreelancerCard({ funcShow , Data}) {


  
  return (
    <div className="w-auto mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow transition-transform duration-300 hover:scale-100 hover:shadow-xl  dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
       {Data.jobTitle}
      </h5>

      <div className="flex justify-between mb-3">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{Data.tags}</span>
        <span className="text-sm  text-black">Deadline: {Data.deadline}</span>
        <span className="text-sm  text-black">Reward: {Data.reward} RS.</span>
      </div>

      <p className="mb-4 font-normal text-black ">
        {Data.jobDescription}
      </p>

      <a
        href="#"
        onClick={()=>{funcShow (Data)}}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Apply
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
