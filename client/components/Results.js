import React, { useState } from "react"

const Results = ({results, setResults}) => {
  // don't want to overwhelm the user with a ton of scrolling when there are hundreds of results
  // if there are more then 50, we'll show 50 at a time
  // with a more complex app/data, it would be better to implement pagination, making an api call for additional data only when the user wants it
  const [visibleResults, setVisibleResults] = useState(50);

  const showMoreResults = () => {
    setVisibleResults((prev) => prev + 50);
  }

  return (
    <>
        { results.length > 0 && 
          <>
            <div className="flex">
              <p id="results-counter">{results.length} results</p>      
              <button className="clear-btn" onClick={() => {setResults([])}}>Clear results</button>
            </div>
      
            <ul>
            { results?.slice(0, visibleResults).map((result, i) => (
              // using dangerouslySetInnerHTML only because I'm confident about the data
              <li key={i} dangerouslySetInnerHTML={{ __html: result }}></li>
            ))}
            </ul>
          </>
        }
        {
          results.length > 50 &&
          <button onClick={showMoreResults}>Show more</button>
        }
    </>
  )
}

export default Results


