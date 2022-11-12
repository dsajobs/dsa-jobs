import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
//import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import AddJobListings from "views/admin/AddJobListings.js";
import Profile from "views/admin/Profile.js";

export default function Admin() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <AdminNavbar/>
        {/* Header Ribbon <HeaderStats />*/}

        <div className="relative bg-teal-500 md:pt-32 pb-5 pt-12 ">
        </div>
    
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/add" exact component={AddJobListings} />
            <Route path="/admin/profile" exact component={Profile} />
            <Redirect from="/admin" to="/admin/add" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
