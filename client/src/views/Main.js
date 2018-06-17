import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Registration from '../components/Registration'

const Main = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/registration' component={Registration}/>
    </Switch>
)

export default Main