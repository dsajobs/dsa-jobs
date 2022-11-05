import React, { useEffect, useState } from "react";
import data from '../../data/jobsData.js'

// components

//import CardLineChart from "components/Cards/CardLineChart.js";
//import CardBarChart from "components/Cards/CardBarChart.js";
//import CardPageVisits from "components/Cards/CardPageVisits.js";
//import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import JobBoardCard from "components/JobBoardCard/JobBoardCard";

export default function Dashboard() {
  const [jobs,setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  /*Change to api call for the data*/
  useEffect(() => setJobs(data), []);

  const filterFunc = ({role, level, tools, languages,skillset}
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

  const filteredJobs = jobs.filter(filterFunc);

  console.log(jobs);

  return (
    <>
      <div className = "w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <h2 className="relative text-white text-xl font-semibold"> 
          Job Listings 
        </h2>
        <h1 className="h-20"> Edit this to make a padding. </h1>

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