
import React from "react"
import { render } from "react-dom"

import Header from "./components/Header"
import Search from "./components/Search"

const App = () => {
  return (
    <>
    <Header />
      <main>
        <section>
          <div className="wrapper">
            <Search />
          </div>
        </section>
      </main>
    </>
  )
}

render(React.createElement(App), document.getElementById("root"))


