import React from 'react'
import { Form, Col, Button, ProgressBar } from 'react-bootstrap'

class SignInForm extends React.Component {
    constructor() {
        super() 
        this.state = {
            event: {},
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            signIn: false,
            now: 100
        }
    }
    
    
    componentDidMount() {
        let event = {
            name: this.props.eventName,
            date: this.props.date,
            campus: this.props.campus
        }
        this.setState({ event })
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSigninAction = (e) => {
        e.preventDefault()
        let fullName
        fullName = `${this.state.firstName.trim().charAt(0).toUpperCase()}${this.state.firstName.trim().slice(1)} ${this.state.lastName.trim().charAt(0).toUpperCase()}${this.state.lastName.trim().slice(1)}`
        this.setState({ 
            fullName,
            signIn: true
        })
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
            email: ''
        })
    }

    handleTimer = () => {setTimeout(() => {
        this.setState({ 
            signIn: false,
        })

    }, 5000)}


    render() {
        console.log(this.state.fullName)
        return(
            <div>
            {this.state.signIn
            ?
            <div style={{maxWidth: '400px', margin: '0 auto'}}>
                <h1>Sign In Successful, Welcome!</h1>
                <ProgressBar now={this.state.now} />
            </div>
            :
            <Form onSubmit={this.handleSigninAction} style={{maxWidth: '400px', margin: '0 auto'}} >
                <h1 style={{textAlign: 'center'}} >{this.props.eventName}</h1>
                <Form.Row style={{marginTop: '20px'}}>
                    <Col>
                        <Form.Control onChange={this.handleChange} name='firstName' value={this.state.firstName} placeholder="First name" />
                    </Col>
                    <Col>
                        <Form.Control onChange={this.handleChange} name='lastName' value={this.state.lastName} placeholder="Last name" />
                    </Col>
                </Form.Row>
                <Form.Row style={{marginTop: '20px'}}>
                    <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control onChange={this.handleChange} name='email' value={this.state.email} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We will never share your email with anoyone.
                        </Form.Text>
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
