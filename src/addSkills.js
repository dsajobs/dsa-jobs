const addSkills = (skill) =>{
    var skills = JSON.parse(localStorage.getItem("skills"));
    skills = [skills[1],skill];
    localStorage.setItem("skills",skills);
}

export default addSkills