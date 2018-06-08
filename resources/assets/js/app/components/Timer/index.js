import React from 'react';
import TaskRow from './TaskRow';

const initialActiveTask = {
    id: 0,
    description: '',
    projectId: 0,
    clientId: 0,
    activeButton: 'start',
    startTime: 0,
    endTime: 0,
    tzOffset: 0,
    tzName: 'none',
};

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            activeTask: initialActiveTask,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this); 
        this.toggleTimer = this.toggleTimer.bind(this);      
    }

    dateToMysql(dateObj) {
        var hours = (dateObj.getHours() < 10) ? "0" + dateObj.getHours().toString() : dateObj.getHours();
        var minutes = (dateObj.getMinutes() < 10) ? "0" + dateObj.getMinutes().toString() : dateObj.getMinutes();
        var seconds = (dateObj.getSeconds() < 10) ? "0" + dateObj.getSeconds().toString() : dateObj.getSeconds();
        var month = ((dateObj.getMonth() + 1) < 10) ? "0" + (dateObj.getMonth() + 1).toString() : (dateObj.getMonth() + 1);
        var day = (dateObj.getDate() < 10) ? "0" + dateObj.getDate().toString() : dateObj.getDate();

        return dateObj.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }

    toggleTimer() {
        console.log('toggle timer');
        let activeTask = this.state.activeTask;
        const date = new Date();
        activeTask.tzOffset = (date.getTimezoneOffset() / 60) * -1;
        const region = new Intl.DateTimeFormat();
        const regionValues = region.resolvedOptions();
        activeTask.tzName = regionValues.timeZone;

        if (this.state.activeTask.startTime === 0) {
            activeTask.startTime = this.dateToMysql(date);
            activeTask.activeButton = 'stop';
            this.setState({activeTask});
            if (this.state.activeTask.id > 0) {
                console.log('start timer');
                // update
                fetch('http://localhost:3000/api/tasks/', {
                    method: 'put',
                    cache: 'no-cache',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(activeTask),
                }).then(response => {
                    response.json()
                        .then(json => {
                            console.log(json);
                            if (response.status !== 200) {
                                console.log('Could not update task. Status Code: ' + response.status);
                                return;
                            }
                        })
                        .catch(err => console.log(err));
                }).catch(err => console.log(err));
            }
        } else {
            console.log('stop timer');
            activeTask.endTime = this.dateToMysql(date);
            // update
            fetch('http://localhost:3000/api/tasks/', {
                method: 'put',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(activeTask),
            })
            .then(response => {
                if (response.status !== 200) {
                    console.log('Could not update task. Status Code: ' + response.status);
                    throw new Error(`The task could not be updated on the server. HTTP Status: ${response.status}.`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                fetch('http://localhost:3000/api/tasks')
                    .then(res => {
                        if (res.status !== 200) {
                            console.log('Could not fetch tasks. Status Code: ' + res.status);
                            return;
                        }
                        console.log('initailAct: ', initialActiveTask);
                        res.json()
                            .then(json => this.setState({tasks: json.tasks, activeTask: initialActiveTask})) // todo activeTask state is not changed.
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
    }

    handleChange(event) {
        const description = event.target.value;
        const activeTask = this.state.activeTask;
        activeTask.description = description;
        this.setState({activeTask});
    }

    handleOnFocus(event) {
        console.log('on focus');
        let activeTask = this.state.activeTask;
        if (activeTask.id === 0) {
            console.log('create task');
            // create
            fetch('http://localhost:3000/api/tasks/', {
                method: 'post',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(activeTask),
            }).then(response => {
                response.json()
                    .then(json => {
                        console.log(json);
                        if (response.status !== 200) {
                            console.log('Could not create task. Status Code: ' + response.status);
                            return;
                        }
                        activeTask.id = json.task.id;
                        this.setState({activeTask});
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }   

    handleOnBlur(event) {
        console.log('on blur');
        if (this.state.activeTask.id > 0) {
            console.log('update task');
            // update
            fetch('http://localhost:3000/api/tasks/', {
                method: 'put',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.state.activeTask),
            }).then(response => {
                response.json()
                    .then(json => {
                        console.log(json);
                        if (response.status !== 200) {
                            console.log('Could not update task. Status Code: ' + response.status);
                            return;
                        }
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    componentDidMount() {
        
        fetch('http://localhost:3000/api/tasks')
            .then(res => {
                if (res.status !== 200) {
                    console.log('Could not fetch tasks. Status Code: ' + res.status);
                    return;
                }
                res.json()
                    .then(json => this.setState({tasks: json.tasks}))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {

        const tasksRows = this.state.tasks.map((t, i) => <TaskRow task={t} key={t.id} />);
        return (
            <div>
                <div className="timer-active-task-row">
                    <div className="ttr-main">
                        <div>
                            <input 
                                type="text" 
                                onFocus={this.handleOnFocus} 
                                onBlur={this.handleOnBlur} 
                                onChange={this.handleChange} 
                                value={this.state.activeTask.description}
                            />
                        </div>
                    </div>
                    <div className="ttr-secondary">
                        secondary
                    </div>
                    <div className="ttr-last">
                        <button onClick={this.toggleTimer}>{this.state.activeTask.activeButton}</button>
                    </div>
                </div>
                {tasksRows}
            </div>
        );
    }
}; 

export default Timer;