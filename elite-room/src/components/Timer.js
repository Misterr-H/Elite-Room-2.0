import React, { Component } from 'react'

class Timer extends Component {
    state = {
        date: new Date()
    };

    callMe() {
        setInterval(()=> {
            this.setState({date: new Date()})
        }, 1000);
    }
    render() {
        return (
            <p className="text-xs ml-auto">{this.state.date.getHours() + ":" + (this.state.date.getMinutes()<10?"0"+this.state.date.getMinutes():this.state.date.getMinutes())} </p>
        )
    }
}

export default Timer;