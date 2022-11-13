
import React from "react";
import {useState} from "react";

import addPreferences from "../../Functions/PostFunctions/addPreferences";
import { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';


const CardSettings = () => {


  /*btn.addEventListener('click', function handleClick(event) {
    event.preventDefault();
    document.getElementById('skillset').value = '';
  })*/

  const [skill,setSkill] = useState('');
  const [skillsets,setSkillSets] = useState([]);
  const [currentSalary, setCurrentSalary] = useState(0);
  
  const [currentDistance, setCurrentDistance] = useState(0);
  const [WFH, setWFH] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [address,setAddress] = useState("");
  const [postal,setPostal] = useState('');
  const [country,setCountry] = useState('');
  const [institute, setInstitute] = useState('');
  const [details,setDetails] = useState('');
  const handleChange = (e) => {
    console.log(e.target.value);
    //const value = e.target.value;
    //const name = e.target.name;
    //setSkill((prev) =>{
      //  return { ...prev,[name]:value}
    //})
    setSkill(e.target.value);
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    setSkill( ...[skill]);
    setSkillSets([].concat(skillsets,skill +" ") );
    const field = document.getElementById("skillset");
    field.value ='';
  }

const handleRemove = (e) => {
  e.preventDefault();
  const toBeRemoved = e.target.value;
  const update =[];
  for (var i=0; i < skillsets.length; i++){
    if (skillsets[i] !== toBeRemoved){
      update.push(skillsets[i]);
    }
  }
  setSkillSets(update);
}

const handlePreferences =(e) => {
  e.preventDefault();
  const preferences = {sal: currentSalary,dist:currentDistance,wfh:WFH,ind:industry,skills:skillsets};
  addPreferences(preferences);
}

const handleSalary = (e) =>{
  e.preventDefault();
  setCurrentSalary(e.value);
}

const handleDistance = (e) =>{
  e.preventDefault();
  setCurrentDistance(e.value);
}

const handleWFH = (e) =>{
  e.preventDefault();
  setWFH(e.value);
}

const handleIndustry = (e) =>{
  e.preventDefault();
  setIndustry(e.value);
}

const handleContact = (e) => {
  e.preventDefault();
  const contactDetails = {address:address,postal:postal,count:country,insti:institute};
  setDetails(contactDetails);
}

const changeAddress =(e) =>{
  setAddress(e.target.value);
}

const changePostal =(e) =>{
  setPostal(e.target.value);
}

const changeCountry =(e) =>{
  setCountry(e.target.value);
}

const changeInstitute =(e) =>{
  setInstitute(e.target.value);
}

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="NicTan"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="NicTan@ghotmail.com"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Nicholas"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Tan"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    onChange={changeAddress}
                  >
                    Office Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Company Address"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Office Postal Code
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="800000"
                    onChange={changePostal}
                  />
                  <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={handleContact}
                      id="skillBtn"
                    >
                      Save Information</button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    onChange={changeCountry}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Singapore"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    onChange={changeInstitute}
                  >
                    Institution 
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="National University of Singapore"
                  />
                </div>
                
              </div>
              
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Preferences
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Skills
                  </label>
                  
                  <div
                  className="block text-blueGray-600 text-xs font-bold mb-2"
                    >
                      {
            skillsets.length === 0 ?(
              <p className="font-light"> Add a Skill </p>
            ):skillsets.map((skill1) => <div
            ><span
            className="text-lightBlue-600 bg-lightBlue-100 m-2 p-2 rounded-full text-center text-xs font-semibold"
            > 
            {skill1}
            <button
            className="text-lightBlue-600 bg-lightBlue-100 m-2 p-2 rounded-full text-center text-xs font-semibold"
            onClick ={() => handleRemove(skill1)}
            > X </button>
                        </span>
            </div>)
        }
          
                    </div>
                  <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Skill"
                      name = "skillset"
                      id="skillset"
                      onChange={handleChange}
                    />
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={handleSubmit}
                      id="skillBtn"
                    >
                      Add skill</button>
                </div>
                <br></br>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Salary
                  </label>
                  <select id = "salary" value={currentSalary} defaultValue={currentSalary} onChange={handleSalary}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="Choose Salary11"> Choose Salary</option>
                      <option value="<1000"
                      //onClick= {setCurrentSalary("1000-2000")}
                      >{'<'}1000</option>
                      <option value="1000-3000">1000-3000</option>
                      <option value="3000-5000">3000-5000</option>
                      <option value=">5000">{'>'}5000</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Distance
                  </label>
                  <select id = "distance" value={currentDistance} defaultValue={currentDistance}  onChange={handleDistance}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="Choose Distance"> Choose Distance</option>
                      <option value="5km">{'<'}5km</option>
                      <option value="5km-10km">5km-10km</option>
                      <option value="10km-20km">10km-20km</option>
                      <option value=">20km">{'>'}20km</option>
                  </select>
                  
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    WFH Option
                  </label>
                  <select id = "3rdMetric" value={WFH} defaultValue={WFH}  onChange={handleWFH}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="3rd Metric"> WFH   </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No Preference">No Preference</option>
                      
                  </select>
                  <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={handlePreferences}
                      id="PrefBtn"
                    >
                      Apply Preferences</button>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Industry
                  </label>
                  <select id = "4thMetric" value={industry} defaultValue={industry}  onChange={handleIndustry}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                      <option value="Choose 4th Metric   "> Choose Industry</option>
                      <option value="HealthCare">HealthCare</option>
                      <option value="Media">Media</option>
                      <option value="Tech">Tech</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            
          </form>
        </div>
        
      </div>

      
    </>
  );

  }

  export default CardSettings