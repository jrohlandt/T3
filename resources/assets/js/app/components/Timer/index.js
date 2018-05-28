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
    }

    handleChange(event) {
        const description = event.target.value;
        this.setState({activeTask: {description: description}});

        if (this.state.activeTask.id === 0) {
            // create
        } else {
            // update
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/tasks')
            .then(res => {
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
                        <div><input type="text" onChange={this.handleChange} /></div>
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