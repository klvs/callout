import React, { Component } from 'react';
import { Router, Route, Link, History, browserHistory} from 'react-router'
import Home from './Home';
import About from './About';
import SingleCallout from './SingleCallout';
import createHistory from 'history/lib/createHashHistory';
import BSNav from './BSNav'

var history = createHistory({
  queryKey: false
});

export default class App extends Component {
  render() {
    return (
    <div>
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
