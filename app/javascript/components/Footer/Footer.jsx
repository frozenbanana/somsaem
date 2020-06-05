import React, { Component } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';


export default class Footer extends Component {
    render() {
        return (
            <Container fluid>
                <Navbar fixed="bottom" expand="lg" variant="dark" bg="dark" >
                    <Row className="justify-content-center">
                        <Col xs lg="2">
                            <h5 className="title">Footer Content</h5>
                            <p>
                                Here you can use rows and columns here to organize your footer
                                content.
                        </p>
                        </Col>
                        <Col xs lg="2">
                            <h5 className="title">Links</h5>
                            <ul>
                                <li>
                                    <a href="#!">Home</a>
                                </li>
                                <li>
                                    <a href="#!">About</a>
                                </li>
                                <li>
                                    <a href="#!">Contact</a>
                                </li>
                            </ul>
                        </Col>
                        <Col xs lg="2">
                            <h5 className="title">Opening Times</h5>
                            <span>Mon-Fri: HH-MM - HH-MM</span>
                            <span>Sat-Sun: HH-MM - HH-MM</span>
                        </Col>
                    </Row>
                </Navbar>
            </Container>
        );
    }
}
