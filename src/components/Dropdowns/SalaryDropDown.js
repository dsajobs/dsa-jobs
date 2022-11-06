import React, {useState} from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const SalaryDropDown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [salary,setSalary] = useState('Choose Salary Range');
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handle1st = () =>{
    setSalary("1000-2000");
  }

  const handle2nd =() =>{
    setSalary("2000-3000");
  }

  const handle3rd =() =>{
    setSalary("3000-5000");
  }

  const handle4th =() =>{
    setSalary(">5000");
  }

  return (
    <>
      <button
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
        
      >
        
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handle1st}
        >
          1000-2000
        </button>
        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handle2nd}
        >
          2000-3000
        </button>
        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handle3rd}
        >
          3000-5000
        </button>
        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handle4th}
        >
          {'>'}5000
        </button>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />

      </div>
    </>
  );
};

export default SalaryDropDown;