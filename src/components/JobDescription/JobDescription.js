import React from 'react';
import { useState, useEffect } from 'react';
import jobsData from '../../data/jobsData.js'

import axios from 'axios';

//import data from '../../data/jobsData.js';


const JobDescription = () => {



//const id = window.location.pathname.split("/");
//console.log(id);

const [job, setJob] = useState({});
const [address, setAddress] = useState(null);
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
const [jobs, setJobs] = useState(jobsData);


console.log(jobs);



const fetchJob = async(id2) => {

  const jobDesc = await jobs[id2-1];
  //console.log(jobDesc);
  const {id,
    logo,
    role,
    company,
    postal,
    location,
    industry,
    description,
    position,
    contract,
    estEnd,
    companyLink,
    applyLink,
    languages,
    tools,
    skillset,
    salaryMatch,
    toolsMatch,
    skillsetMatch,
    distanceMatch
  } = jobDesc;
    setJob({id,
      logo,
      role,
      company,
      postal,
      location,
      industry,
      description,
      position,
      contract,
      estEnd,
      companyLink,
      applyLink,
      languages,
      tools,
      skillset,
      salaryMatch,
      toolsMatch,
      skillsetMatch,
      distanceMatch});
};

useEffect(()=>{
  const id = window.location.pathname.split("/");
  fetchJob(id[3]);
}, []);

//console.log('Job');
//console.log(job);
//console.log(job.postcode);

const tags = [];
if (job.tools){
    tags.push(...job.tools);
}

if (job.languages){
    tags.push(...job.languages);
}

if (job.skillset){
    tags.push(...job.skillset);
}
useEffect(() => {

  // React advises to declare the async function directly inside useEffect
  async function getAddress(location) {
    console.log("company ", location);
    var genURL = "https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y&pageNum=1";
    var response = await fetch(genURL);
    var data = await response.json();
    console.log(data.results);
    var tempAddress = data.results[0].ADDRESS;
    var tempLatitude =  data.results[0].LATITUDE;
    var tempLongitude =  data.results[0].LONGITUDE;
    setAddress(tempAddress);
    setLatitude(tempLatitude);
    setLongitude(tempLongitude);
  }
  getAddress(job.location);

},[job.location]);


console.log({address,latitude,longitude});

const image_api= "https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=" + latitude + "&lng=" + longitude + "&zoom=11&height=512&width=512&points=[" + latitude + "," + longitude + "]";
const image_api_zoom = "https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=" + latitude + "&lng=" + longitude + "&zoom=16&height=512&width=512&points=[" + latitude + "," + longitude + "]";


console.log(job.applyLink);

return (<>
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          //style={{
            //backgroundImage:
              //"url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          //}}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              //className="text-blueGray-200 fill-current" // WTF HOW CHG THIS
              //points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-1 bg-white-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={job.logo} 
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-1">
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal text-blueGray-700">
                  {job.company}
                </h3>
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {job.position}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                  {job.location}
                </div>
                <div className="mb-2 text-blueGray-600 font-bold text-xl mt-10">
                  {job.contract} | {job.position}
                </div>
                
                <div className='flex items-center'>
                  <div className='flex flex-wrap w-full justify-center'>
                    {tags ? tags.map((tag)=> 
                    <span className="text-lightBlue-600 bg-lightBlue-100 m-2 p-2 rounded-full text-center text-xs font-semibold">
                        {tag}
                    </span>): '' }
                  </div>
                </div>

              </div>
              

              <div className='flex flex-row items-center'>
                <div className='flex flex-wrap w-full justify-center'>

                <div className='items-center'>
                          <a href={job.applyLink} rel="noreferrer"> 
                            <button className = 'click bg-lightBlue-600 text-white m-9 p-2 rounded-t float-right font-semibold'> 
                                Apply Now
                            </button>
                            </a>
                            
                            <a href={job.companyLink} rel="noreferrer"> 
                            <button className = 'click bg-lightBlue-600 text-white m-9 p-2 rounded-t float-right font-semibold'> 
                                Company Homepage
                            </button>
                            </a>
                            
                    </div>
                </div>

              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    
                  </div>
                </div>
                <div>
                    <p className=''>
                      {job.description}
                      <br/>
                    </p>
                    <br/>
                </div>
                <div className='flex justify-center'>
                 <div>
                    <h3 className="mb-2 text-blueGray-600 font-bold text-xl mt-10"> 
                      Map
                    </h3>
                    <div className='flex flex-row'>

                      <div className='flex flex-col'>
                        <h3 className="mb-2 text-blueGray-600 font-bold text-xs mt-10"> 
                          Singapore
                        </h3>
                        <img src = {image_api} alt= {job.postcode}/>
                      </div>


                      <div className='flex flex-col ml-4'>
                      <h3 className="mb-2 text-blueGray-600 font-bold text-xs mt-10"> 
                          Neighbourhood
                        </h3>
                        <img src = {image_api_zoom} alt= {job.postcode}/>
                      </div>
                    
                    
                    </div>
                 </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
);
};

export default JobDescription;
