'use strict';
import React from 'react';
import DateHelper from '../../core/Helpers/Date.js';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            duration: 0, // in seconds
            intervalId: 0,
        };

        this.date = new DateHelper;
    }

    componentDidMount() {
        const startTime = new Date(this.props.startTime).getTime() / 1000;
        
        console.log('timer mounted', startTime);
        
        const intervalId = setInterval(() => {

            console.log('interval ');
            if (startTime === 0) {
                clearInterval(intervalId);
                return;
            }
            const currentTime = new Date().getTime() / 1000;
            const duration = Math.round(currentTime - startTime);

            this.setState({intervalId, duration});

        }, 1000);
    }

    componentWillUnmount() {
        console.log('timer clear interval');
        clearInterval(this.state.intervalId);
    }

    render() {



        const duration = this.state.duration !== 0 ? this.date.durationForDisplay(this.state.duration) : '';
        return (

            <div>
                {duration}
            </div>
        );
    }
}

export default Timer;