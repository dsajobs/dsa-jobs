import React from 'react';

import { Link } from 'react-router-dom';

const JobDescription = () => {

console.log('hello');

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
                      src={require("assets/img/vue.jpg").default}
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
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Job Title
                </h3>
                <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                  Location
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  Full Time | Intern
                </div>
                <div className="mb-2 text-blueGray-600">
                  Tools and Skills
                </div>
              </div>
              

              <div className='flex flex-row items-cente'>
                <div className='flex flex-wrap w-full justify-center'>

                <div className='items-center'>
                            <Link>
                            <button className = 'click bg-lightBlue-600 text-white m-9 p-2 rounded-t float-right font-semibold'> 
                                Company Homepage
                            </button>
                            </Link>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem mauris, interdum vitae ex in, consequat efficitur justo. Donec sit amet gravida sem, sit amet tempor tortor. Donec sit amet facilisis mi, eu pulvinar velit. Quisque vel sem placerat, ullamcorper leo non, auctor purus. Nulla facilisi. Donec leo dui, molestie id ante tempor, consectetur blandit felis. In hac habitasse platea dictumst. Nulla ultricies, mauris tempor cursus laoreet, odio lacus porta elit, id varius dolor ante vel sem. Fusce at justo eget libero feugiat dapibus. Donec convallis non sapien sit amet elementum. Mauris nec nulla tortor. Duis porttitor lorem suscipit dapibus ullamcorper. Donec porttitor orci magna. Quisque iaculis sapien at augue sollicitudin ultricies. Proin euismod venenatis consequat. Maecenas vulputate lectus vitae vulputate sodales. In in condimentum quam. Nam a neque sit amet velit mattis tincidunt eget non ante. Ut at maximus nunc, et congue ex. Duis semper nulla id turpis varius, sit amet vestibulum mi imperdiet.
                    </p>
                    <br/>
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