import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';


export default class About extends Component {
    render() {
        return (<div>
                <Navigation/>
                <p>This is the About component.</p>
                <Footer/>
            </div>)
    }
}
