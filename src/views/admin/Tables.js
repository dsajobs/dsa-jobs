import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import Calendar from "../../components/Calendar/Calendar";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
          <img src = {require("assets/img/Calendar2.png").default} style = {{width:900,height:900}} />
      </div>
    </>
  );
}
