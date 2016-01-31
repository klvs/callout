import React, { Component } from 'react';
import { Router, Route, Link, History, browserHistory} from 'react-router'
import Home from './Home';
import About from './About';
import SingleCallout from './SingleCallout';
import BSNav from './BSNav'
import history from './history'

const style = {
  background: "linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95)), url('http://paper-backgrounds.com/textureimages/2012/08/cracked-concrete-wall-texture-hd.jpg')",
  width: "100%"
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
