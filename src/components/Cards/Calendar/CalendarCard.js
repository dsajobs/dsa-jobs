import React, { useState,useCallback} from "react";

import data from '../../../data/jobsData.js';



import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})




const events = [
  {
      title: "Meta - College Intern",
      allDay: true,
      start: new Date(2022, 10, 2),
      end: new Date(2022, 10, 2),
      id:"9"
  },
  {
      title: "Shopee - Data Intern",
      start: new Date(2022, 10, 5),
      end: new Date(2022, 10, 5),
      id:"8"
  },
  {
      title: "HPB - Business Analyst",
      start: new Date(2022, 10, 10),
      end: new Date(2022, 10, 10),
      id:"7"
  },
];

const CalendarCard = () => {
  const [myEvents, setEvents] = useState(events)




  const handleSelectSlot =useCallback(
    ({start,end}) => {
      data.forEach(job=>console.log(job));
      const title= window.prompt("new event")
      if (title){
        setEvents((prev)=>[...prev,{start,end,title}])
      }
    },
    [setEvents]
  )

  //const handleSelectEvent =useCallback(
    //(event) => window.alert(event.title),
    //[]
  //)
  
  const handleMoveTo = useCallback((event)=>{
      window.location =`joblistings/${event.id}`}
  )
  
    data.forEach(job => {
      const end = job.estEnd.replaceAll('/', '-');
      const start = new Date(end);
      const position = job.company + " - " + job.position;
      events.push({title:position,allDay:true,start:start,end:start,id:job.id});
  })


  console.log(events);

    return (
      <div className="text-blueGray-700">
    
        <Calendar
        localizer={localizer} 
        events={myEvents} 
        startAccessor="start" 
        endAccessor="end" 
        onSelectEvent ={handleMoveTo}
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500, margin: "50px" }} />
        
      </div>
    );
  }
  

  export default CalendarCard;
