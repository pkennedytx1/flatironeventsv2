import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

class Navagation extends React.Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><b>// Flatiron Austin</b></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navagation
