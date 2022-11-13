//import {useState} from "React";

import User from "layouts/User";

//import axios from 'axios';
const addPreferences = (preference) =>{
    var preferences = JSON.parse(localStorage.getItem('preferences'));
    if (preferences===null){
        preferences = [[preference]];
    }
    else{
        preferences = [...preference];
        localStorage.setItem('preferences',preferences);
    }

}
// const [user,setUsers] = useState([]);
//Axios.get("API LINK FOR USERS").then((
//  (users)=>{setUsers(users.data).catch((err)=>{console.log(error)})};
//));
//users.forEach((user)=>{
//if (user.email === account.email) && (user.password === account.password){
    //user.skillset = preferences.skills;
    //user.salary = preferences.salary;
    //user.WFH = preferences.WFH;
    //user.industry = preferences.industry;
    //user.distance = preferences.distance;
//}
//})

export default addPreferences