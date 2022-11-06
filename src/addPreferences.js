const addPreferences = (preference) =>{
    var preferences = JSON.parse(localStorage.getItem('preferences'));
    if (preferences===null){
        preferences = [[preference]];
    }
    else{
        preferences = [... preference];
        localStorage.setItem('preferences',preferences);
    }

}

export default addPreferences