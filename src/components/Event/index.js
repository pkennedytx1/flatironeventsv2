import React from 'react'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { thisExpression } from '@babel/types'

class Event extends React.Component {
    constructor() {
        super() 
        this.state = {
            campus: 'Please Select A Campus',
            campusArray: ['Austin', 'Houston'],
            rememberLocation: false,
            eventName: ''
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

    handleChenge = () => {
        this.setState({
            eventName: e.target.value
        })
    }

    handleCheckChange = () => {
        this.setState({rememberLocation: !this.state.rememberLocation})
    }

    handleEventCreate = (e) => {
        if (this.state.rememberLocation) {
            localStorage.setItem('location', this.state.campus)
        } 
    }

    render() {
        console.log(this.state)
        return(
            <Form onSubmit={this.handleEventCreate} style={{maxWidth: '400px', margin: '0 auto'}}>
                <h1 style={{margin: '20px auto'}}>Create Event</h1>
                <Form.Group controlId="formGridState">
                    <Form.Label>Please Select A Campus</Form.Label>
                    <Form.Control onChange={this.handleSelectChange} as="select">
                        <option value={this.state.campus}>{this.state.campus}</option>
                        {this.state.campusArray.map((location, i) => {
                           return <option value={location} key={i}>{location}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="eventName" placeholder="Event Name" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check checked={this.state.rememberLocation} onChange={this.handleCheckChange} defaultChecked={this.state.rememberLocation} type="checkbox" label="Remeber My Campus" />
                </Form.Group>
                <Button block variant="primary" type="submit">
                    Create Event
                </Button>
            </Form>
        )
    }
}

export default Event
