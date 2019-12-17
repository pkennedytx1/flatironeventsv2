import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

class Navagation extends React.Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><b>// Flatiron Austin</b></Navbar.Brand>
                <Nav className="ml-auto">
                    {this.props.user ?
                        <Nav.Link onClick={this.props.signOut}>Log Out</Nav.Link>
                    :
                        null
                    }
                </Nav>
            </Navbar>
        )
    }
}

export default Navagation
