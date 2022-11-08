import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
//import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import JobListings from "views/admin/JobListings.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import CalendarPage from "views/admin/CalendarPage.js";
import Profile from "views/admin/Profile.js";

export default function Admin() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <Navbar/>
        {/* Header Ribbon <HeaderStats />*/}

        <div className="relative bg-lightBlue-600 md:pt-32 pb-5 pt-12 ">
        </div>
    
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/joblistings" exact component={JobListings} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/calendar" exact component={CalendarPage} />
            <Route path="/admin/profile" exact component={Profile} />
            <Redirect from="/admin" to="/admin/joblistings" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
