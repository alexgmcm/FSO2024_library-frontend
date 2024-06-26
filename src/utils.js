// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
    // helper that is used to eliminate saving same book twice
    const uniqById = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.id
        return seen.has(k) ? false : seen.add(k)
      })
    }
  console.log(cache)
    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqById(allBooks.concat(addedBook)),
      }
    })
  }