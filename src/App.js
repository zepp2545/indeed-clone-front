import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import { Top } from './containers/Top'
import { Jobs } from './containers/Jobs'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/jobs">
          <Jobs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
