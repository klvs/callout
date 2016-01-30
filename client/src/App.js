import React, { Component } from 'react';
import { Router, Route, Link, History, browserHistory} from 'react-router'
import Home from './Home';
import About from './About';
import createHistory from 'history/lib/createHashHistory';

var history = createHistory({
  queryKey: false
});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Route path="*about" component={About}/>
          <Route path="*" component={Home}/>
      </Router>
    );
  }
}
