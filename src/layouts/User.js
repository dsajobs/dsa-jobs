import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/Navbar.js";
//import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import JobListings from "views/user/JobListings.js";
import Settings from "views/user/Settings.js";
import CalendarPage from "views/user/CalendarPage.js";
import Profile from "views/user/Profile.js";
import JobDescription from "components/JobDescription/JobDescription";

export default function User() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <Navbar/>
        {/* Header Ribbon <HeaderStats />*/}

        <div className="relative bg-lightBlue-600 md:pt-32 pb-5 pt-12 ">
        </div>
    
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/user/joblistings" exact component={JobListings} />
            <Route path="/user/settings" exact component={Settings} />
            <Route path="/user/calendar" exact component={CalendarPage} />
            <Route path="/user/profile" exact component={Profile} />
            <Route path="/user/joblistings/:id">
              <JobDescription/>
            </Route>
            <Redirect from="/user" to="/user/joblistings" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
