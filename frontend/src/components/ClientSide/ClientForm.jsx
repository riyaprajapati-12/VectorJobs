import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";



function ClientForm({ toggleFormVisibility, onSubmit,ChangeDate , getJobs}) {
  const [formData, setFormData] = useState({
    Project_Title: "No Project title",
    Deadline: " No deadline",
    Rewards: " $0",
    Tags: "no tags",
    Description: "no description"
  });
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const [currentDate, setCurrentDate] = useState(getDate());


  const [isFormVisible, setIsFormVisible] = useState(true);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Form Submitted:', formData); 
  //   onSubmit(formData);
  //   ChangeDate(currentDate)
  //    console.log(currentDate)
  //   setFormData({
  //       Project_Title: "",
  //       Deadline: "",
  //       Rewards: "",
  //       Tags: "",
  //       Description: ""
  //   });
  //   setIsFormVisible(!isFormVisible);
  // };



  async function handleSubmit(event){
    event.preventDefault();
    onSubmit(formData);
    console.log('Form Submitted:', formData); 
    await axiosInstance.post("/job/create",{formData}).then((res)=>{
      toggleFormVisibility(false);
      console.log(res);
    })
    getJobs();
    setFormData({
        Project_Title: "",
        Deadline: "",
        Rewards: "",
        Tags: "",
        Description: ""
    });
  };
 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <section className="dark:bg-white rounded-md shadow-xl shadow-black h-[645px] w-[700px] max-w-2xl">
        <div className="container mx-auto w-2xl pl-3 justify-end">
          <div className="flex text-2xl text-center justify-between pt-4 pb-4 md:text-3xl font-light text-gray-800 dark:text-white">
            <div className="pl-[250px] text-black font-bold">Create a Job</div>
            <button 
              onClick={toggleFormVisibility} 
              className="flex items-center justify-center w-10 h-10 mx-3 bg-white text-gray-400 rounded-full transition-colors duration-300 hover:text-black focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-1 py-6 rounded-lg bg-white dark:bg-white w-[600px] ml-5">
              <form onSubmit={handleSubmit}>
                <div className="-mx-2 md:flex ">
                  <div className="flex-1 px-2">
                    <label htmlFor="projectTitle" className="block mb-2 text-sm text-gray-600 dark:text-black">Project Title</label>
                    <input
                      id="projectTitle"
                      type="text"
                      name="Project_Title"
                      value={formData.Project_Title}
                      onChange={handleChange}
                      required
                      className="block w-full px-5 py-2.5 mt-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-200 dark:text-black dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label htmlFor="deadline" className="block mb-2 text-sm text-gray-600 dark:text-black">Deadline</label>
                    <input
                      id="deadline"
                      type="date"
                      name="Deadline"
                      value={formData.Deadline}
                      onChange={handleChange}
                      required
                      className="block w-full px-5 py-2.5 mt-2 text-black placeholder-white bg-white border border-gray-200 rounded-lg dark:placeholder-white dark:bg-gray-200 dark:text-black dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="-mx-2 md:flex mt-4">
                  <div className="flex-1 px-2">
                    <label htmlFor="rewards" className="block mb-2 text-sm text-gray-600 dark:text-black">Rewards</label>
                    <input
                      id="rewards"
                      type="text"
                      name="Rewards"
                      value={formData.Rewards}
                      onChange={handleChange}
                      required
                      className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-200 dark:text-black dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label htmlFor="tags" className="block mb-2 text-sm text-gray-600 dark:text-black">Tags</label>
                    <select
                      id="tags"
                      name="Tags"
                      value={formData.Tags}
                      onChange={handleChange}
                      required
                      className="block w-full px-5 py-2.5 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-200 dark:text-black dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="">Select a Tag</option>
                      <option value="Software Developer">Software Developer</option>
                      <option value="Phython Developer">Phython Developer</option>
                      <option value="Java Developer">Java Developer</option>
                      <option value="Fullstack Developer">Fullstack Developer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="App Developer">App Developer</option>
                      <option value="Graphic Designer"> Graphic Designer</option>
                      <option value="UI/UX designer">UI/UX designer</option>
                      <option value="Content Writter">Content Writter</option>
                      <option value="Social media manager">Social media manager</option>
                      <option value="Project Manager">Project Manager </option>
                      
                    </select>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <label htmlFor="description" className="block mb-2 text-sm text-gray-600 dark:text-black">Description</label>
                  <textarea
                    id="description"
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    required
                    className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-200 dark:text-black dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-[250px] px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientForm;
