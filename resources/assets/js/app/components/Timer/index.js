import React from 'react';
import TaskRow from './TaskRow';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            activeTask: {
                id: 0,
                description: '',
                projectId: 0,
                clientId: 0,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);        
    }

    handleChange(event) {
        const description = event.target.value;
        this.setState({activeTask: {description: description}}); 
    }

    handleOnFocus(event) {
        console.log('on focus');
        if (this.state.activeTask.id === 0) {
            console.log('create task');
            // create
            fetch('http://localhost:3000/api/tasks/', {
                method: 'post',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.state.activeTask),
            }).then(response => {
                response.json()
                    .then(json => {
                        console.log(json);
                        this.setState({activeTask: json.task});
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    handleOnBlur(event) {
        console.log('on blur');
        
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
                        <div><input type="text" onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} onChange={this.handleChange} /></div>
                    </div>
                    <div className="ttr-secondary">
                        secondary
                    </div>
                    <div className="ttr-last">
                        last
                    </div>
                </div>
                {tasksRows}
            </div>
        );
    }
}; 

export default Timer;