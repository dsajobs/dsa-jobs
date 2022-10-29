const ShowSkills=(array1) => {
        var skills = array1;
        return (
            <ul>
                {skills.map(function(name, index){
                    return <li key={ index }>{name}</li>;
                  })}
            </ul>
        )
    };

  export default ShowSkills