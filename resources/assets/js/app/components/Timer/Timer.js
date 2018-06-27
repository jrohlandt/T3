'use strict';
import React from 'react';
import DateHelper from '../../core/Helpers/Date.js';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            duration: 0, // in seconds
            intervalId: 0,
            started: false,
        };

        this.date = new DateHelper;
    }

    componentDidMount() {

        console.log('timer mounted', this.props.startTime);
       
        const intervalId = setInterval(() => {

            console.log('interval ');
            this.setState({intervalId});

            if (this.props.startTime === 0) {
                if (this.state.started === true) {
                    this.setState({
                        duration: 0,
                        started: false,
                    });
                }
                return;
            }
    
            const startTime = new Date(this.props.startTime).getTime();
            const startTimeInSeconds = startTime / 1000;
            const currentTime = new Date().getTime() / 1000;
            const duration = Math.round(currentTime - startTimeInSeconds);

            this.setState({duration, started: true});

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