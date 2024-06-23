import {  useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select';
import { useState } from 'react';


const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [options, setOptions] = useState(null)
  const variables = genreFilter ? {genre: genreFilter} : {}
  
  const result = useQuery(ALL_BOOKS, 
    {variables: variables}
  )



  if (!props.show) {
    return null
  }
  if (result.loading){
    return <div>loading...</div>
  } 

  const books = result.data.allBooks
  

  if (!options && books){
  
    const unique_genres = new Set(books.reduce((acc, cur) => {
      acc = acc.concat(cur.genres)
      return acc
    },[]).flat())

    let optionsArray = Array.from(unique_genres, (a) => {return({value: a, label: a})} )
    optionsArray = optionsArray.concat({value:null, label: "ALL"})

   setOptions(optionsArray)
   
  }

  let selectElem = options ? <Select
  defaultValue={"ALL"}
  onChange={(opt) => {setGenreFilter(opt.value)}}
  options={options}
/> : <></>


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectElem}
      
    </div>
  )
}

export default Books
