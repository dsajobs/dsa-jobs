import React from "react";

import FullCalendar from "fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

/*import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css"; */
import events from "./events";

const Calendar = () => {
    return (
      <div className="text-lightBlue-100">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={events}
        />
        <FullCalendar
          defaultView="dayGridMonth"
          // themeSystem="Simplex"
          // header={{
          //   left: "prev,next",
          //   center: "title",
          //   right: "dayGridMonth,timeGridWeek,timeGridDay",
          // }}
          plugins={[dayGridPlugin]}
          events={events}
          displayEventEnd="true"
          eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
        />
      </div>
    );
  }
  

  export default Calendar