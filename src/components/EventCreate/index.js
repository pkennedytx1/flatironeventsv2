import React from 'react'
import Event from '../Event'

class EventCreate extends React.Component {
    render() {
        let user;
        if(this.props.user) {
            user = this.props.user.email.split('@')
        }
        
        return(
            <div>
                {user[1] === 'flatironschool.com' ?
                <Event />
                :
                <h1 style={{textAlign: 'center', margin: '20px'}}>Please login with a valid <b>//Flatiron</b> email.</h1>
                }
            </div>
        )
    }
}

export default EventCreate
