import { Link } from "react-router-dom";
import React, { useRef } from "react";
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

export default function Profile() {
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
      <main className="profile-page">
        <section className="relative block h-600-px">
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
            </svg>
          </div>
        </section>
        <section className=" relative py-6 bg-white-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("assets/img/Default-avatar.jpg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Nicholas Tan
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Singapore
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Local Pool Player
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    National University of Singapore
                  </div>

                  <div
                        className="bg-blueGrey-100 mt-10 uppercase text-black font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      >
                        Upload Resume
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
                         <div className="relative flex flex-col min-w-0 break-words w-6\/12 mb-0 shadow-lg rounded bg-blueGray-200 border-0">
                        <div className="relative flex flex-col h-8 break-words bg-blueGray-200 w-6\/12 mt-5 mb-4 text-blueGray-500"> Drop File Here </div>
                        </div>
                      </div>
                    </div>
                    <div className="submit">
                      <button class="bg-lightBlue-500 active:bg-lightBlue 600 uppercase text-white font-bold hover:shadow-md shadow tet-xs px-3 py-1
                      rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" onClick={handleSubmit}>Submit</button>
                    </div>
                      </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      
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
}
