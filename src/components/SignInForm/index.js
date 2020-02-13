import React from 'react'
import firebase from 'firebase'

import shortid from 'shortid'
import './style.css'
import { Form, Col, Button, ProgressBar, Toast } from 'react-bootstrap'

class SignInForm extends React.Component {
    constructor() {
        super() 
        this.state = {
            event: {},
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            category: 'Please Choose a Category',
            signIn: false,
            now: 100,
            error: {},
            noErrors: false
        }
    }
    
    async componentDidMount() {
        let event = {
            name: this.props.eventName,
            date: this.props.date,
            campus: this.props.campus
        }
        this.setState({ event })
        await this.handleClientLoad();
    }

    handleClientLoad = async () => {
        // Signal Google that we want to use Google authorization (Initializing the Google API authorization)
        await window.gapi.load('client: auth2', firebase.auth().currentUser.getIdToken());
    }

    updateSignInStatus = (isSignedIn) => {
        if(isSignedIn) {
            // alert("Welcome Flatiron Staff!")
            console.log(isSignedIn)
            this.setState({ successfulLogin: true })
        } else {
            alert("Something not right")
        }
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }
    
    handleSigninAction = (e) => {
        e.preventDefault()
        this.handleError()
        if (this.state.noErrors) {
            let fullName
            fullName = `${this.state.firstName.trim().charAt(0).toUpperCase()}${this.state.firstName.trim().slice(1)} ${this.state.lastName.trim().charAt(0).toUpperCase()}${this.state.lastName.trim().slice(1)}`
            this.setState({ 
                fullName,
                signIn: true
            })
            // this.writeAttendace()
            // this.handleSheetAddition(e)
            fetch('https://us-central1-flatironevents-49b92.cloudfunctions.net/onSignIn', {
                method: 'POST',
                body: JSON.stringify(this.state)
            }).then(res => res.json()).then(data => console.log(data))
            let start = setInterval(() => this.setState({ now: this.state.now -  1}), 50)
            setTimeout(() => {
                clearInterval(start)
                this.setState({ signIn: false })
            }, 5000)
            this.setState({
                now: 100,
                firstName: '',
                lastName: '',
                fullName: '',
                email: '',
                noErrors: false
            })
        }
    }

    handleTimer = () => {setTimeout(() => {
        this.setState({ 
            signIn: false,
        })

    }, 5000)}

    handleError = () => {
        let error = {}
        let emptyError = 'This field Cannot Be Empty'
        if (this.state.firstName === '') {
            error.firstName = emptyError
        }
        if (this.state.lastName === '') {
            error.lastName = emptyError
        }
        if (this.state.email === '') {
            error.email = emptyError
        }
        if (this.state.category === 'Please Choose a Category') {
            error.category = emptyError
        }
        this.setState({ error })
        if (this.state.email !== '' && this.state.lastName !== '' && this.state.firstName !== '') {
            this.setState({ noErrors: true })
        }
    }

    handleSelect = (e) => {
        this.setState({ category: e.target.value})
    }

    handleSheetAddition = async (e) => {
        e.preventDefault()
        
        let submissionValues = Object.values(this.state)
        submissionValues = [ this.state.event.name, this.state.event.campus, this.state.firstName, this.state.lastName, this.state.email, this.state.event.date, this.state.category]

        const params = {
            spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID,
            range: 'Sheet1',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS'
        }
        console.log(submissionValues)
        const valueRangeBody = {
            'majorDimension': 'ROWS',
            'values': [submissionValues] //Needs to be a 2d array
        }

        // Request to just talk to Google
        let request = window.gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
        request.then(function (response) {
            // TODO: Insert desired response behaviour on submission
            // Edwin's comment: Should refresh the form right after submit has been clicked by previous checkin user.
            console.log(response.result)
        }, function (reason) {
            console.error('error: ' + reason.result.error.message)
        })

        this.setState({ showConfirmation: true })
    }

    render() {
        let name = this.state.fullName
        console.log(name)
        return(
            <div style={{ margin: '40px auto'}}>
            {this.state.signIn
            ?
            <div style={{maxWidth: '400px', margin: '0 auto'}}>
                <h1>Sign In Successful, Welcome to Flatiron!</h1>
                <ProgressBar now={this.state.now} />
            </div>
            :
            <Form onSubmit={this.handleSigninAction} style={{maxWidth: '400px', margin: '0 auto'}} >
                <h1 style={{textAlign: 'center'}} >{this.props.eventName}</h1>
                <Form.Row style={{marginTop: '20px'}}>
                    <Col>
                        <Form.Control isInvalid={this.state.error.firstName} onChange={this.handleChange} name='firstName' value={this.state.firstName} placeholder="First name" />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.error.firstName}
                        </Form.Control.Feedback >
                    </Col>
                    <Col>
                        <Form.Control isInvalid={this.state.error.lastName} onChange={this.handleChange} name='lastName' value={this.state.lastName} placeholder="Last name" />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.error.lastName}
                        </Form.Control.Feedback >
                    </Col>
                </Form.Row>
                <Form.Row style={{marginTop: '20px'}}>
                    <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control isInvalid={this.state.error.email} onChange={this.handleChange} name='email' value={this.state.email} type="email" placeholder="Enter email" />
                        {
                            this.state.error.email ?
                            <Form.Control.Feedback type='invalid'>
                                {this.state.error.email}
                            </Form.Control.Feedback > :
                            <Form.Text className="text-muted">
                                We will never share your email with anoyone.
                            </Form.Text>
                        }
                    </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                    <Form.Group>
                        <Form.Control isInvalid={this.state.error.category} as="select" value={this.state.category} onChange={this.handleSelect}>
                            <option value='Please Choose a Category'>Please Choose a Category</option>
                            <option value='Prospective Student'>Prospective Student</option>
                            <option value='Current Flatiron Student'>Current Flatiron Student</option>
                            <option value='Flatiron Alumni'>Flatiron Alumni</option>
                            <option value='Other'>Other</option>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {this.state.error.category}
                        </Form.Control.Feedback >
                    </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Button block variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Col>
                </Form.Row>
            </Form >
            }
            </div>
        )
    }
}

export default SignInForm
