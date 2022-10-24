import React from 'react'
import ReactDOM from 'react-dom';

const createProfile = (email,password) => {
    var profiles = JSON.parse(localStorage.getItem('profiles'));
    //alert(JSON.stringify(profiles));
    var details = [email,password];
    profiles = [profiles[1],details];
    localStorage.setItem("profiles",JSON.stringify(profiles));

}


export default createProfile