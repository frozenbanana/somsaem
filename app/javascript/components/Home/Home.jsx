import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {Container, Row, Image} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Container fluid>
                    <Row>
                    <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fconversionxl.com%2Fwp-content%2Fuploads%2F2016%2F05%2Fhero-image.jpeg&f=1&nofb=1" fluid/>
                    </Row>
                    <Row>
                        h
                    </Row>
                </Container>
                <Footer/>
            </div>
            )
    }
}
