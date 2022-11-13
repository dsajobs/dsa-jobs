//import {useState} from "React";
//import axios from 'axios';
const checkProfile=(email,password) => {
    var profiles = localStorage.getItem('profiles');
    var isUser = false;
    for (var i =0;i <profiles.length;i++){
        if ((email === profiles[i][0]) && (password === profiles[i][1])){
            console.log(profiles[i][0]);
            console.log(profiles[i][1]);
            isUser =true;
        }
    }
    return isUser;



// const [profiles,setProfiles] = useState([]);
// axios.get("API LINK HERE").then((res)=>setProfiles(res.data)).catch((error)=>(console.log(error)));
// const isUser = false;
//profiles.forEach((user)=>{
//  if (user.email === email) &&& (user.password === password) {
//      isUser = true;
//}

//if (isUser){
    //window.location = "user/listings"
//}
// else{ alert("wrong password, please try again")}
//})
}
export default checkProfile


