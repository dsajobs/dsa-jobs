import React, { useEffect, useState } from "react";
import data from '../../data/jobsData.js'

// component
import JobBoardCard from "components/Cards/JobBoardCard/JobBoardCard";

export default function JobListings() {
  const [jobs,setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [level, setLevel] = useState("null");
  const [contract, setContract] = useState("null");
  /*Change to api call for the data*/
  useEffect(() => setJobs(data), []);

  const levelFilter = (currJob
    ) => {
      if(level==="null") {
        return true;
      }
      return currJob.level=== level;
    }

  const contractFilter = (currJob
      ) => {
        if(contract === "null") {
          return true;
        }
        return currJob.contract === contract;
      }

  const tagsFilter = ({role, level, tools, languages, skillset}
  ) => {
    if(filters.length ===0) {
      return true;
    }

    const tags = [role,level];

    if (tools){
      tags.push(...tools);
    }

    if (languages){
        tags.push(...languages);
    }

  if (skillset){
      tags.push(...skillset);
  }

    return tags.some(tag => filters.includes(tag));
  }

  const handleTagClick = (tag) => {
    setFilters([...filters,tag]);
  }

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter(f => f!== passedFilter))
  }

  const handleLevel = (e) =>{
    e.preventDefault();
    setLevel(e.target.value);
  }

  const handleContract = (e) =>{
    e.preventDefault();
    setContract(e.target.value);
  }

  const filteredJobs1 = jobs.filter(tagsFilter);
  console.log(filteredJobs1);
  const filteredJobs2 = jobs.filter(contractFilter);
  console.log(filteredJobs2);
  const filteredJobs = filteredJobs2.filter(levelFilter);
  console.log(filteredJobs);

  return (
    <>
      <div className = "w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <h2 className="relative text-white text-xl font-semibold"> 
          Job Listings 
        </h2>
        <h1 className="h-20"> Edit this to make a padding. </h1>

        <div className="m-4">
        <div className="flex flex-row w-/12">

          <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Full Time / Part Time
                  </label>
                  <select id = "contract" value={contract} defaultValue={contract} onChange={handleContract}
                  className="border-0 pr-12 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-xs shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150">
                      <option value="null"> </option>
                      <option value="Part Time">Part Time</option>
                      <option value="Full Time">Full Time</option>
                  </select>
                </div>
            </div>

            <div className="ml-10">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Intern / Graduate role
                  </label>
                  <select id = "level" value={level} defaultValue={level} onChange={handleLevel}
                  className="border-0 pr-12 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-lg text-xs shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150">
                      <option value="null"></option>
                      <option value="Intern">Intern</option>
                      <option value="Graduate Role">Graduate Role</option>
                  </select>
                </div>
            </div>

            </div>
          </div>
        <div className ='flex bg-white shadow-md m-4 p-5 rounded align-middle'>
          {
            filters.length === 0 ?(
              <p className="font-light"> Click on a Tag to Apply filter </p>
            ):filters.map(
              (filter) => 
                <span onClick={() =>
                  handleFilterClick(filter)}
                  className="text-lightBlue-600 bg-lightBlue-100 m-2 p-2 rounded-full text-center text-xs font-semibold"
                  >
                  {filter}
                  <span className='text-lightBlue-600 -mr-4 font-semibold text-lg-special pl-2h pr-1'>x</span>
                </span>)
          }
          
        </div>
        {
          jobs.length === 0 ? (
            <p> Jobs are loading... </p>
          ):(
            filteredJobs.map((job)=> 
            <JobBoardCard 
              job ={job} 
              key = {job.id} 
              handleTagClick ={handleTagClick}
            />
          ))
        }
      </div>
    </>
  );
}