import React from 'react';
import TaskRow from './TaskRow';
import Ajax from '../../core/Helpers/Ajax';
import DateHelper from '../../core/Helpers/Date';

var emptyTask = {
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
            'activeTask': Object.assign({}, emptyTask),
        };

        this.ajaxUrl = 'http://localhost:3000/api/tasks/';
        this.ajax = new Ajax( {url: this.ajaxUrl} );
        this.date = new DateHelper;

        this.handleChange   = this.handleChange.bind(this);
        this.handleOnFocus  = this.handleOnFocus.bind(this);
        this.handleOnBlur   = this.handleOnBlur.bind(this); 
        this.toggleTimer    = this.toggleTimer.bind(this);
        this.createTask     = this.createTask.bind(this);
        this.updateTask     = this.updateTask.bind(this);
        this.getTasks       = this.getTasks.bind(this);
        this.getActiveTask  = this.getActiveTask.bind(this);
    }

    toggleTimer() {

        let activeTask          = this.state.activeTask;
        const date              = new Date();
        const region            = new Intl.DateTimeFormat();
        const regionValues      = region.resolvedOptions();
        activeTask.tzName       = regionValues.timeZone;
        activeTask.tzOffset     = (date.getTimezoneOffset() / 60) * -1;

        if (activeTask.startTime === 0) {

            activeTask.startTime = this.date.toMysqlDateTime(date);
            activeTask.activeButton = 'stop';

            if (activeTask.id > 0) {
                this.updateTask(activeTask);
                return;
            }

            this.createTask(activeTask);
                
        } 

        activeTask.endTime = this.date.toMysqlDateTime(date);

        // Stop timer and refresh tasks list.
        this.stopActiveTask(activeTask);
    }

    getTasks() {
        this.ajax.get()
            .then(res => this.setState({tasks: res.tasks}))
            .catch(err => console.log('Could not fetch tasks. Error: ', err));
    }

    getActiveTask() {
        const ajax = new Ajax({ url: this.ajaxUrl + 'active' });
        ajax.get()
            .then(res => {

                if (res.task == undefined) 
                    return;

                console.log('activeTask: ', res);
                let activeTask = Object.assign(this.state.activeTask, res.task);
                activeTask.activeButton = res.started ? 'stop' : 'start';
                this.setState({ activeTask });
            })
            .catch(err => console.log('Could not fetch active task. Error: ', err));
    }
    
    createTask(task) {
        
        if (task.id != 0)
            return;

        this.ajax.post( task )
            .then(res => this.setState( {activeTask: Object.assign(task, res.task)} ))
            .catch(err => console.log('Task could not be created. Error: ', err));
    }

    stopActiveTask(task, clearActiveTask=true ) {
        if (task.id == 0)
            return;

        // let isActiveTask = false;
        // if (task.activeButton != undefined) 
        //     isActiveTask = true;

        this.ajax.put( task )
            .then(res => {
                this.setState( { activeTask: clearActiveTask ? emptyTask : Object.assign(task, res.task) } );
                this.getTasks();
            })
            .catch(err => console.log('Task could not be updated. Error: ', err));
    }

    updateTask(task) {

        if (task.id == 0)
            return;

        this.ajax.put( task )
            .then(res => this.setState( { activeTask: Object.assign(task, res.task) } ))
            .catch(err => console.log('Task could not be updated. Error: ', err));
    }

    handleOnBlur() {
        this.updateTask(this.state.activeTask);
    }

    handleChange(event) {
        const activeTask = this.state.activeTask;
        activeTask.description = event.target.value;
        this.setState({activeTask});
    }

    handleOnFocus() {
        this.createTask(this.state.activeTask);
    }

    componentDidMount() {
        this.getTasks();
        this.getActiveTask();
    }

    render() {

        const tasksRows = this.state.tasks.map((t, i) => <TaskRow task={t} key={t.id} />);
        const activeTask = this.state.activeTask;

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
                                value={activeTask.description}
                            />
                        </div>
                    </div>
                    <div className="ttr-secondary">
                        secondary
                    </div>
                    <div className="ttr-last">
                        <button onClick={this.toggleTimer}>{activeTask.activeButton}</button>
                    </div>
                </div>
                {tasksRows}
            </div>
        );
    }
}; 

export default Timer;