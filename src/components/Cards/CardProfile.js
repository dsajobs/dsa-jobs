import React from "react";

import { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';




// components

export default function CardProfile() {

  
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
  const handleSend = async (e) => {
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
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={require("assets/img/Default-avatar.jpg").default}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              Nicholas Tan
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              Singapore
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              Data Science and Analytics
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              National University of Singapore
            </div>
          </div>

          <div
              className="bg-blueGrey-600 text-black font-bold uppercase text-xs px-4 mt-5 py-2 rounded shadow mr-1"
            >
              <div className='inline-flex w-full justify-center'>
              <div className="text-center">
              Upload Resume
              
              <div className="form-container justify-center pt-2">
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
                        <div className="relative flex flex-col h-16 break-words bg-blueGray-50 w-full mt-2 mb-4 text-blueGray-500"> 
                        <div className="mt-5">
                        Drop File Here 
                          </div>
                          </div>
                      </div>
                      </div>
                      </div>
                    </div>
            </div>

          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
