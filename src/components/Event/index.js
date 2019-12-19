import React from 'react'
import { Form, Button } from 'react-bootstrap'
import SignInForm from '../SignInForm'
import moment from 'moment'

class Event extends React.Component {
    constructor() {
        super() 
        this.state = {
            campus: 'Please Select A Campus',
            campusArray: ['Austin', 'Houston', 'Atlanta', 'Seatle'],
            rememberLocation: false,
            eventName: '',
            error: {},
            date: '',
            isEventCreated: false
        }
    }

    componentDidMount() {
        if(localStorage.getItem('location')) {
            this.setState({
                campus: localStorage.getItem('location'),
                rememberLocation: true
            })
        }
    }

    handleSelectChange = (e) => {
        this.setState({
            campus: e.target.value
        })
    }

    handleChenge = (e) => {
        this.setState({
            eventName: e.target.value
        })
    }

    handleCheckChange = () => {
        this.setState({rememberLocation: !this.state.rememberLocation})
    }

    handleEventCreate = (e) => {
        e.preventDefault()
        this.handleErrors()
        this.setState({ date: moment().subtract(10, 'days').calendar()})
        if (this.state.rememberLocation) {
            localStorage.setItem('location', this.state.campus)
        } else {
            localStorage.removeItem('location')
        }
        if(this.state.eventName.length > 1 && this.state.campus !== 'Please Select A Campus') {
            this.setState({
                isEventCreated: true
            })
        }
    }

    handleErrors = () => {
        let error = {}
        if (this.state.campus === 'Please Select A Campus') {
            error.campus = 'You Must Select A Campus'
        }
        if (this.state.eventName === '') {
            error.event = 'Input Cannot Be Empty'
        }
        this.setState({
            error
        })
    }

    render() {
        return(
            <div>
            {this.state.isEventCreated
                ? <SignInForm eventName={this.state.eventName} date={this.state.date} campus={this.state.campus} />
                : <Form onSubmit={this.handleEventCreate} style={{maxWidth: '400px', margin: '0 auto'}}>
                    <h1 style={{margin: '20px auto'}}>Create Event</h1>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Please Select A Campus</Form.Label>
                        <Form.Control isInvalid={this.state.error.campus} onChange={this.handleSelectChange} as="select">
                            <option value={this.state.campus}>{this.state.campus}</option>
                            {this.state.campusArray.map((location, i) => {
                               return <option value={location} key={i}>{location}</option>
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {this.state.error.campus}
                        </Form.Control.Feedback >
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control valus={this.state.eventName} onChange={this.handleChenge} isInvalid={this.state.error.event} type="eventName" placeholder="Event Name" />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.error.event}
                        </Form.Control.Feedback >
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check checked={this.state.rememberLocation} onChange={this.handleCheckChange} type="checkbox" label="Remeber My Campus" />
                    </Form.Group>
                    <Button block variant="primary" type="submit">
                        Create Event
                    </Button>
                </Form>
            }
            </div>
        )
    }
}

export default Event
