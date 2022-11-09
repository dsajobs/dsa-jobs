
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
}

export default checkProfile


