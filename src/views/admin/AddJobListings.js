import React from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";


export default function AddJobListings() {

  console.log(1);

  //const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [company,setCompany] = useState('');
  const [position,setPosition] = useState('');
  const [postal,setPostal] = useState('');
  const [address,setAddress] = useState('');
  const [industry,setIndustry] = useState('');
  const [JD,setJD] = useState('');
  const [listing,setListing] = useState('');

  //const btnDropdownRef = React.createRef();
  //const popoverDropdownRef = React.createRef();

  const handleCompany = (e) =>{
    setCompany(e.target.value);
  }

  const handlePosition =(e) => {
    setPosition(e.target.value);
  }

  const handlePostal = (e) =>{
    setPostal(e.target.value);
  }

  const handleAddress = (e) =>{
    setAddress(e.target.value)
  }

  const handleIndustry = (e) =>{
    setIndustry(e.target.value);
  }

  const handleJD = (e) =>{
    setJD(e.target.value);
  }

  const submitListing = (e) => {
    e.preventDefault();
    const listing = [company,position,postal,address,industry,JD]
    localStorage.setItem("listing",listing);
    //Change this eventually
  }


  return (

    <>
      <div className = "w-full xl:w-8/12 mb-12 xl:mb-0 px-4 h-100vh" >
        <h2 className="relative text-white text-xl font-semibold"> 
          Add Listing
        </h2>
        <h1 className="h-20"> Edit this to make a padding. </h1>

      </div>




      <a
        className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
      >
        
      </a>
      <div>
        <form className="flex flex-col wrap">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Company Name:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Company Name"
                    name ="company"
                    id ="company"
                    onChange={handleCompany}
                  />
            
        </form>

        <form className="flex flex-col wrap mt-2">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Position Title:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Position Title"
                    name ="position"
                    id ="position"
                    onChange={handlePosition}
                  />
            
        </form>

        <form className="flex flex-col wrap mt-2">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Office Postal Code:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Postal Code"
                    name ="postal"
                    id ="postal"
                    onChange={handlePostal}
                  />
            
        </form>

        <form className="flex flex-col wrap mt-2">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Office Address:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Address"
                    name ="address"
                    id ="address"
                    onChange={handleAddress}
                  />
            
        </form>
        
        <form className="flex flex-col wrap mt-2">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Industry:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Industry"
                    name ="industry"
                    id ="industry"
                    onChange={handleIndustry}
                  />
            
        </form>

        <form className="flex flex-col wrap mt-2">
            <span
            className={
                "text-sm pt-2 pb-0 font-bold block whitespace-nowrap bg-transparent text-blueGray-400"
              }>
                Job Description:
                </span>
                <input
                    type="text"
                    className="border-0 px-3 py-3 mt-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Enter Job Description"
                    name ="JD"
                    id ="JD"
                    onChange={handleJD}
                  />
            
        </form>



        <button 
        className="click w-full mt-5
        bg-teal-500 text-white active:bg-teal-700 font-bold uppercase text-xs px-4 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        onSubmit = {submitListing}
        >
        Submit Listing 
        </button>
        <div className="h-10">

        </div>
      </div>
    </>
  );
}
