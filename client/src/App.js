import React, { Component } from 'react';
import { Router, Route, Link, History, browserHistory} from 'react-router'
import Home from './Home';
import About from './About';
import SingleCallout from './SingleCallout';
import BSNav from './BSNav'
import history from './history'

const style = {
  background: "#121211"
}
export default class App extends Component {
  render() {
    return (
    <div style={style}>
      <BSNav/>
      <Router history={history}>
          <Route path="/about" component={About}/>
          <Route path="/callouts/:id" component={SingleCallout}/>
          <Route path="/" component={Home}/>
      </Router>
    </div>
    );
  }
}
