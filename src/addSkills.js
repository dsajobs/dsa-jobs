const addSkills = (skill) =>{
    var skillsets = JSON.parse(localStorage.getItem('skillsets'));
    if (skillsets===null){
        skillsets = [[skill]];
    }
    else{
        skillsets = [... skill];
        localStorage.setItem('skillsets',skillsets);
    }

}

export default addSkills