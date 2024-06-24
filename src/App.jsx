import { useState, useEffect} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommended from "./components/Recommended";
import { BOOK_ADDED , ALL_BOOKS} from "./queries";
import { updateCache } from "./utils";





const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client=useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  },[])
  
  const logout = () => {
    setToken(null)
    setPage("authors")
    localStorage.clear()
    client.resetStore()
  }

  const loginButton = token ? <></> :  <button onClick={() => setPage("login")}>login</button> 
  const logoutButton = token ? <button onClick={logout}>logout</button> :  <></>
  const addButton = token ? <button onClick={() => setPage("add")}>add book</button> : <></>
  const recommendedButton = token ? <button onClick={() => setPage("recommend")}>recommend</button> : <></>


  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      window.alert(`Book "${book.title}" by Author "${book.author.name}" added.`)
      console.log(client.cache)
      updateCache(client.cache, { query: ALL_BOOKS }, book)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {addButton}
        {loginButton}
        {logoutButton}
        {recommendedButton}

      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recommended show={page === "recommend"} />
    </div>
  );
};

export default App;



