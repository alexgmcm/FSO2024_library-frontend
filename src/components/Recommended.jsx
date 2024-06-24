import { GET_CURRENT_USER, ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Recommended = ({show}) => {
    const result = useQuery(GET_CURRENT_USER)
    const favGenre = result.loading ? null : result.data.me.favoriteGenre
    const bookResult = useQuery(ALL_BOOKS, { variables: { genre: favGenre } });
    const books = bookResult.loading ? null : bookResult.data.allBooks
   

    if (!show) {return (
        <></>
            )}

    if (result.loading) {
        return <div>loading...</div>;
      }
    
      if (bookResult.loading) {
        return <div>loading...</div>;
      }
      

      console.log(favGenre)
      console.log(books)

      
    if (show){
        return(<>
        <h1>recommendations</h1>

    <p>books in your favourite genre: <b>{favGenre}</b></p>

    <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => {return(
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.toString()}</td>
            </tr>
          )})}
        </tbody>
      </table>

        
        </>)
    }
    
}

export default Recommended