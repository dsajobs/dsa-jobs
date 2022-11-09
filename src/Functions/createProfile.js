import React from 'react'
import ReactDOM from 'react-dom';
function getNamesList(item) {
    return item.isArray ? item.namesArray.map(getNamesList) : item.name
}

//const names = namesArrayTree.map(getNamesList).flat(Infinity)

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


export default createProfile