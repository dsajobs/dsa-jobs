import React, {useEffect, useState} from "react";

import data from '../../../data/jobsData.js';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

console.log(data);



const events = [
  {
      title: "HP",
      allDay: true,
      start: new Date(2022, 10, 2),
      end: new Date(2022, 10, 2),
  },
  {
      title: "Happy",
      start: new Date(2022, 10, 5),
      end: new Date(2022, 10, 5),
  },
  {
      title: "Depression",
      start: new Date(2022, 10, 10),
      end: new Date(2022, 10, 10),
  },
];

const CalendarCard = () => {
  console.log('ji');

    return (
      <div className="text-blueGray-700">
        <Calendar
        localizer={localizer} 
        events={events} 
        startAccessor="start" 
        endAccessor="end" 
        style={{ height: 500, margin: "50px" }} />
        
      </div>
    );
  }
  

  export default CalendarCard;