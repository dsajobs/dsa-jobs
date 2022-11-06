// import React from "react";
import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";


export default function Landing(props) {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();
  
  const inputRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = createFormData();
  
    try {
      // axios.post("../data/", formData, {
      //   'content-type': 'multipart/form-data',
      // });
      localStorage.setItem("resume", formData);
      
      console.log(localStorage.getItem("resume"));
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-3xl">
                    Welcome!
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    To get started, head over to the Job Listings page to check out the jobs available. 
                    To get a more cutomised listing, please upload your resume below or head to the profile page to update your profile.
                  </p>
                </div>
              </div>
            </div>
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
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-10 bg-blueGray-200 -mt-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Job Listing Page</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Get the listings of jobs that we have.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-award"></i>
                    </div>

                    <h6 className="text-xl font-semibold">Upload Resume</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      By uploading your resume, we will be able to get a list of jobs most suited to you. Feel free to adjust your job preferences in the filters panel.
                    </p>
                    <div className="form-container">
                      {/* Display the files to be uploaded */}
                      <div>
                        <ul>
                          {fileNames.map((name) => (
                            <li key={name}>
                              <span>{name}</span>

                              <span onClick={() => removeFile(name)}>
                                <i className="fa fa-times" />
                              </span>
                            </li>
                          ))}
                        </ul>

                        {files.length > 0 && (
                          <ul>
                            <li>File types found: {fileTypes.join(', ')}</li>
                            <li>Total Size: {totalSize}</li>
                            <li>Total Bytes: {totalSizeInBytes}</li>

                            <li className="clear-all">
                              <button onClick={() => clearAllFiles()}>Clear All</button>
                            </li>
                          </ul>
                        )}
                      </div>

                      {/* Provide a drop zone and an alternative button inside it to upload files. */}
                      <div
                        // css={Dropzone}
                        onDragEnter={handleDragDropEvent}
                        onDragOver={handleDragDropEvent}
                        onDrop={(e) => {
                          handleDragDropEvent(e);
                          setFiles(e, 'a');
                        }}
                      >
                        {/* <p>Drag and drop files here</p> */}

                        <button class="bg-lightBlue-500 active:bg-lightBlue 600 text-white hover:shadow-md shadow tet-xs px-2 py-1 rounded outline-none 
                        focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" onClick={() => inputRef.current.click()}>Select files to upload</button>

                        {/* Hide the crappy looking default HTML input */}
                        <input
                          ref={inputRef}
                          type="file"
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            setFiles(e, 'a');
                            inputRef.current.value = null;
                          }}
                        />
                      </div>
                    </div>
                    <div className="submit">
                      <button class="bg-lightBlue-500 active:bg-lightBlue 600 uppercase text-white font-bold hover:shadow-md shadow tet-xs px-3 py-1
                      rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                </div>             
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Profile Page</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Head to the profile page to update your job preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-33">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  About Us
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Our team has desgined a job portal that makes job applications easier. 
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  To get started, upload your resume so we could search through your resume to find your 
                  relevant skills. Additionally, head to your profile page to update your preferences 
                  about your future job. We would find jobs that best suit you based on the information 
                  provided.
                </p>
                <Link to="/" className="font-bold text-blueGray-700 mt-8">
                  Start Your Job Search Now!
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      We have built a model that is able to retrieve the best 
                      matches based on previous experience and preference. 
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
