import React, { useState } from "react"

import Results from "./Results"

const Search = () => {
  const [query, setQuery] = useState()
  const [initResults, setInitResults] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const getQuotes = async () => {
    const res = await fetch(`http://localhost:3001/search?q=${query}`);

    const json = await res.json();

    if (!json.length) {
      setNoResult(true);
      setInitResults([])
    } else {
      setNoResult(false);
      formatResults(json);
    }
  }

  const formatResults = (results) => {
    const formattedResults = results.map(result => {
      // trim result so it doesn't cut off in the middle of words
      const trimmedResult = result.substring(result.indexOf(" ") + 1, result.lastIndexOf(" "));
      // highlight query word in result
      // both lower and uppercase hits
      const regex = new RegExp(`(${query})`, "gi");
      const highlightResult = trimmedResult.replaceAll(regex, "<span>$&</span>")
      return highlightResult
    })
    setInitResults(formattedResults)
  }
  
  return (
    <>
      <form id="search-form" onSubmit={(e) => { e.preventDefault(), getQuotes(query) }}>

          <div className="full">
            <label htmlFor="query">Query</label>
            <input required type="text" id="query" name="query" className="full" onChange={e => setQuery(e.target.value)} />
          </div>

          <button type="submit">Search</button>
  
      </form>

      { initResults.length > 0 && 
        <Results results={initResults} setResults={setInitResults} /> 
      }
      {/* added a role of alert to the no results text for screenreaders */}
      { noResult && <p role="alert">We didn't find any quotes. Try another word!</p> }
    </>
  )
}

export default Search
