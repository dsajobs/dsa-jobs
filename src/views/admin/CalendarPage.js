import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CalendarCard from "components/Cards/Calendar/CalendarCard.js";

export default function CalendarPage() {
  return (
    <>
    <div className="container self-center">
      <div className="flex flex-wrap mt-4 pt-8 w-full">
          <CalendarCard/>
      </div>
    </div>
      
    </>
  );
}
