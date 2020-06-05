import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';

export default class App extends Component {
    render () {
        return (
            <Switch> 
                <Route exact path="/" component={Home}/> 
                <Route exact path="/about" component={About}/> 
                <Route exact path="/contact" component={Contact}/> 
            </Switch> 
            );
    }
}
