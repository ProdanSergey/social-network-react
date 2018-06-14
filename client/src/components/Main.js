import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Registration from './Registration'

const Main = () => (
  <main className="row main">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/registration' component={Registration}/>
    </Switch>
  </main>
)

export default Main