import React from 'react';
import TaskRow from './TaskRow';

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
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
                {tasksRows}
            </div>
        );
    }
}; 

export default Timer;