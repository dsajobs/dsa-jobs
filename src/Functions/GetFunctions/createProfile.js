
//import axios from 'axios';
//import {useState} from "React";

const createProfile = (email,password) => {
    var profiles = JSON.parse(localStorage.getItem('profiles'));
    //alert(JSON.stringify(profiles));
    var details = [email,password];
    if (profiles === null){
        profiles = [details];
        alert(profiles);
    }
    else{
        profiles = [profiles.flat(0),details];
    }
    localStorage.setItem('profiles',JSON.stringify(profiles));

}

//Axios.post("API LINK HERE",{
    //email:email,
    //password:password
//}).then(
    //res=>console.log(res)
//).catch(error => console.log(error))

export default createProfile