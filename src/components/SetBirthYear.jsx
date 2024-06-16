import { useState } from "react";
import { EDIT_BORN, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";
import Select from 'react-select';


const SetBirthYear = ({authors}) => {

  const options = authors.map((a) => {return({value: a.name, label: a.name})} )
  console.log(options)
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editBorn] = useMutation(EDIT_BORN,  {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  });

    const submitHandler = (event) => {
        event.preventDefault();
        editBorn({  variables: { name, setBornTo: parseInt(born) } })
        setBorn("")
        setName("")
    }

    return(<>
    <h2>Set Birth Year</h2>
    <form onSubmit={submitHandler}>
    <div>
          name

          <Select
        defaultValue={options[0]}
        onChange={(opt) => setName(opt.value)}
        options={options}
      />
         
        </div>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change birth year</button>
    </form>
    </>)
} 

export default SetBirthYear