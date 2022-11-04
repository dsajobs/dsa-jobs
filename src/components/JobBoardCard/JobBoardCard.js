import React from 'react';

/*
    Wrapper,
    Column,
    CompanyInfoWrapper,    
    CompanyName,
    JobTitle,
    MetaInfoWrapper,
    MetaInfo,
    MetaInfoDot,
    Skill,
    NewJob,
    FeaturedJob,
    
id: 4,
    
    className="relative text-white "> 
*/

const JobBoardCard = ({
    job:{
        company,
        logo,
        isNew,
        featured,
        position,
        role,
        level,
        estStart,
        estEnd,
        contract,
        location,
        languages,
        tools,
        skillset
    },handleTagClick,
}) => {
        const tags = [];

        if (tools){
            tags.push(...tools);
        }

        if (languages){
            tags.push(...languages);
        }

        if (skillset){
            tags.push(...skillset);
        }


    return (
        <div className = 'flex flex-wrap bg-white shadow-md m-4 p-5 overflow-x-scroll rounded'>
            <div className = 'flex flex-row'>
                <div className='p-3'>
                    <img src={logo} alt={company} className='h-20'/>
                </div>
                <div className='wrap'>
                    <div className='flex-1 flex-col justify-between ml-4'>
                        <h3 className='text-l font-semibold text-blue-600'> 
                            {company}
                        </h3>
                        <h2 className='font-bold text-xl'>{position}</h2>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                            {location}
                        </div>
                        <p>
                            {contract} | {level} 
                        </p>
                    </div>
                    <div className='ml-auto'>
                        <button className = 'bg-lightBlue-600 text-white m-9 p-2 rounded-t float-right font-semibold'>
                            See More
                        </button>
                    </div>
                </div>
            </div>


            <div className='flex items-center'>
                {tags ? tags.map((tag)=> 
                <span onClick ={() => handleTagClick(tag)
                }className="text-lightBlue-600 bg-lightBlue-100 m-2 p-2 rounded-full text-center text-xs font-semibold">
                    {tag}
                </span>): '' }
            </div>
        </div>
    )
};

export default JobBoardCard;