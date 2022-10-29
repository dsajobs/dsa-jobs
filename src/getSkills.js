const getSkills = (person) => {
    var skillsets = JSON.parse(localStorage.getItem('skillsets'));
    alert("hey!");
    alert(skillsets);
    return skillsets;
}

export default getSkills