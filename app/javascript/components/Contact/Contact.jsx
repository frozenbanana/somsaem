import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';


class Contact extends Component {
    render() {
        return (<div>
                    <Navigation/>
                    <p>This is the Contact component.</p>
                    <Footer/>
                </div>)
    }
}

export default Contact;