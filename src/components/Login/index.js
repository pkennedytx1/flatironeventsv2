import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import firebase from 'firebase'

class Login extends React.Component {

    render() {
        return(
            <div style={{maxWidth: '400px', margin: '0 auto'}}> 
                <Form>
                    <h1>Login</h1>
                    <Row>
                        <Col>
                            <Button onClick={this.props.signInWithGoogle} variant='primary' block>
                                <b>//Flatiron Email Login</b>
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h6>Need Instructions? <span>😇</span></h6>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Login
