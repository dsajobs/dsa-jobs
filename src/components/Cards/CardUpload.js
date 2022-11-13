import React, { useRef } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';


export default function CardUpload(){
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
            axios.post('https://some-api.com', formData, {
            'content-type': 'multipart/form-data',
            });
        } catch (error) {
            console.error('Failed to submit files.');
        }
    };

    return (
    <div>
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
            // css={DropzoneCSS}
            onDragEnter={handleDragDropEvent}
            onDragOver={handleDragDropEvent}
            onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
            }}
        >
            <button class="bg-lightBlue-500 active:bg-lightBlue 600 text-white 
            hover:shadow-md shadow tet-xs px-2 py-1 rounded outline-none 
            focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
            onClick={() => inputRef.current.click()}>Select files to upload</button>

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
            <div className="relative flex flex-col min-w-0 break-words w-1\/12 
            mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="relative flex flex-col h-8 break-words 
            bg-blueGray-200 w-full mt-5 mb-4 text-blueGray-500"> Drop File Here 
            </div>
        </div>
        </div>

        <div className="submit">
            <button class="bg-lightBlue-500 active:bg-lightBlue 600 uppercase 
            text-white font-bold hover:shadow-md shadow tet-xs px-3 py-1
            rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear 
            transition-all duration-150" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </div>
    );
};