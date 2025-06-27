import React, { useState } from 'react';
import DisplayDataForm from './DisplayDataForm';
import moment from "moment";
import Applicant from "./Applicant"

function Collection_of_Form({ Data, getJobs, DateData , onDelete}) {
  const [DataForm, setDataForm] = useState(false);
  const [visibilityTable, setVisibilityTable] = useState(false);


  console.log(Data)
  const toggleDataForm = () => {
    setDataForm(prevState => !prevState);
  };

  const toggleTable = () => {
    setVisibilityTable(true);
    
    console.log("I m Table");
  };

  const prevForm = () =>{
    setDataForm(true)
    setVisibilityTable(false)
  }

  return (
      <div class="relative w-[350px] h-[254px] mt-8 ml-[40px] rounded-2xl bg-gray-200 p-7 border-2 border-gray-300 transition ease-out duration-500 overflow-visible hover:border-[#928FE6] hover:shadow-2xl hover:shadow-indigo-600 group">
        <div class="text-black h-full gap-2 flex flex-col">
          <p class="text-sm font-light flex justify-end">Posted On {moment(Data.createAt).format("Do MMM'YY")}</p>
          <p class="text-neutral-800 font-sans font-bold text-2xl mt-8">{Data.jobTitle.charAt(0).toUpperCase() + Data.jobTitle.slice(1)}</p>
          <p className='text-[rgba(66,63,193,.9)] font-bold '>{Data.tags}</p>
          <p class="text-lg flex justify-end mt-8 text-green-800 font-bold" ><span className='text-[rgba(66,63,193,.9)] font-bold mr-1'> Reward : </span> { Data.reward}</p>
        </div>
        <button class="absolute left-1/2 bottom-0 w-3/5 transform translate-x-[-50%] translate-y-[125%] rounded-xl bg-[#5A57E8]  text-white text-lg px-4 py-2 opacity-0 transition ease-out duration-300 group-hover:translate-y-1/2 group-hover:opacity-100" onClick={toggleDataForm}>
          More info
        </button>
 
  {DataForm && <DisplayDataForm data={Data} showPage={toggleDataForm}  DeleteData={onDelete} D_M_Y={DateData} DisplayTable={toggleTable} getJobs={getJobs}/>}
      {visibilityTable && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          {/* <div className=" p-8 rounded-lg shadow-lg max-w-lg w-full"> */}
            <Applicant toggleApplicant={prevForm} Data={Data}/>
          {/* </div> */}
        </div>
      )}
    </div>      
  );
}

export default Collection_of_Form;
