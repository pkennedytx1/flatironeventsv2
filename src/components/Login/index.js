import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import firebase from 'firebase'

class Login extends React.Component {

    render() {
        return(
            <div style={{maxWidth: '400px', margin: '0 auto'}}> 
                <Form>
                    <br />
                    <br />
                    <h1 style={{textAlign: 'center'}}>Event Signin Login</h1>
                    <br />
                    <Row>
                        <Col>
                            <Button onClick={this.props.signInWithGoogle} variant='primary' block>
                                <b>//Flatiron Email Login</b>
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <hr />
                    <Row>
                        <Col>
                            <h3>Instructions</h3>
                            <br />
                            <h6>1. Login with your <b>//Flatiron</b> email.</h6>
                            <br />
                            <h6>2. Create a new event.</h6>
                            <br />
                            <h6>3. You will be asked to verify a google account that has <b>write access</b> to the google sheet.</h6>
                            <br />
                            <h6>4. Use the link below to go to the sheet and ask for permission if you don't already.</h6>
                            <br />
                            <h6>5. Enjoy your event <span>🥳</span></h6>
                            <br />
                            <b><a target='_blank' href='https://docs.google.com/spreadsheets/d/1bJqnfZGA1x1r5ZDE9Lb5yQl9_0c4A3Fy3h5hMPtOr-c/edit#gid=0'><span>📑</span> Event Signin Sheet</a></b>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Login
