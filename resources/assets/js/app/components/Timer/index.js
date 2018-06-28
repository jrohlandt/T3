'use strict';

import React from 'react';
import TaskRow from './TaskRow.js';

import Ajax from '../../core/Helpers/Ajax.js';
import DateHelper from '../../core/Helpers/Date.js';


var emptyTask = {
    id: 0,
    description: '',
    projectId: 0,
    clientId: 0,
    typeId: 0,
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
            tasks: {},
            activeTask: Object.assign({}, emptyTask),
            projects: [
                { id: 0, name: 'no project' },
                { id: 1, name: 'Webinarignition' },
                { id: 2, name: 'Provely' },
                { id: 3, name: 'Heatmaptracker' },
            ],
            types: [
                { id: 0, name: 'none' },
                { id: 1, name: 'ticket' },
                { id: 2, name: 'bug fix' },
                { id: 3, name: 'development' },
            ],
        };

        this.ajaxUrl = 'http://localhost:3000/api/tasks/';
        this.ajax = new Ajax( {url: this.ajaxUrl} );
        this.date = new DateHelper;

        // this.handleChange           = this.handleChange.bind(this);
        // this.handleOnFocus          = this.handleOnFocus.bind(this);
        // this.handleOnBlur           = this.handleOnBlur.bind(this); 
        // this.toggleTimer            = this.toggleTimer.bind(this);
        this.createTask             = this.createTask.bind(this);
        this.updateTask             = this.updateTask.bind(this);
        this.getTasks               = this.getTasks.bind(this);
        this.getActiveTask          = this.getActiveTask.bind(this);
        this.handleProjectChange    = this.handleProjectChange.bind(this);
        this.handleTypeChange       = this.handleTypeChange.bind(this);
        // this.stopActiveTask         = this.stopActiveTask.bind(this);
    }

    // toggleTimer() {

    //     let activeTask          = this.state.activeTask;
    //     const date              = new Date();
    //     const region            = new Intl.DateTimeFormat();
    //     const regionValues      = region.resolvedOptions();
    //     activeTask.tzName       = regionValues.timeZone;
    //     activeTask.tzOffset     = (date.getTimezoneOffset() / 60) * -1;

    //     if (activeTask.startTime === 0) {

    //         activeTask.startTime = this.date.toMysqlDateTime(date);
    //         activeTask.activeButton = 'stop';

    //         if (activeTask.id > 0) {
    //             this.updateTask(activeTask);
    //             return;
    //         }

    //         this.createTask(activeTask);
                
    //     } 

    //     activeTask.endTime = this.date.toMysqlDateTime(date);

    //     // Stop timer and refresh tasks list.
    //     this.stopActiveTask(activeTask);
    // }

    getTasks() {
        this.ajax.get()
            .then(res => {

                // Format the display times and duration for each task.
                const tasks = res.tasks.map((t, i) => {
                    const durationInSeconds = this.date.mysqlToSeconds(t.endTime) - this.date.mysqlToSeconds(t.startTime);
                    t.displayStartTime      = this.date.toMysqlDateTime(new Date(t.startTime), true);
                    t.displayEndTime        = this.date.toMysqlDateTime(new Date(t.endTime), true);
                    t.displayDuration       =  this.date.durationForDisplay(durationInSeconds);

                    return t;
                });

                // Now create a object that stores each task by it's date.
                let tasksByDate = {};

                for ( let i=0; i < tasks.length; i++ ) {

                    let task    = tasks[i];
                    let dateKey = this.date.toMysqlDate(new Date(task.startTime));
                    
                    if ( ! tasksByDate.hasOwnProperty(dateKey) ) {
                        tasksByDate[dateKey] = [];
                    }

                    tasksByDate[dateKey].push(task);
                }

                this.setState({tasks: tasksByDate});
            })
            .catch(err => console.log('Could not fetch tasks. Error: ', err));
    }

    getActiveTask() {
        const ajax = new Ajax({ url: this.ajaxUrl + 'active' });
        ajax.get()
            .then(res => {

                let activeTask = {};
                if (res.task == undefined) { 
                    activeTask = Object.assign({}, emptyTask);
                } else {
                    activeTask = Object.assign({}, res.task);
                }
                    // return;

                // let activeTask = Object.assign(this.state.activeTask, res.task);
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

    // stopActiveTask(task, clearActiveTask=true ) {
    //     console.log('stopActiveTask', 'emptyTask: ', emptyTask, clearActiveTask, task);
    //     if (task.id == 0)
    //         return;

    //     this.ajax.put( task )
    //         .then(res => {
    //             this.setState( { activeTask: clearActiveTask ? Object.assign({}, emptyTask) : Object.assign(task, res.task) } );
    //             this.getTasks();
    //         })
    //         .catch(err => console.log('Task could not be updated. Error: ', err));
    // }

    updateTask(task) {
        console.log('update tassssk', task);
        if (task.id == 0)
            return;

        this.ajax.put( task )
            .then(res => {
                this.getTasks();
                this.getActiveTask();
            })
            .catch(err => console.log('Task could not be updated. Error: ', err));
    }

    // handleOnBlur() {
    //     this.updateTask(this.state.activeTask);
    // }

    // todo change to handleDescriptionChange
    // handleChange(event) {
    //     const activeTask = this.state.activeTask;
    //     activeTask.description = event.target.value;

    //     this.setState({activeTask});
    // }

    // handleOnFocus() {
    //     console.log('focus create task');
    //     this.createTask(this.state.activeTask);
    // }

    handleProjectChange(projectId) {
        let activeTask = this.state.activeTask;
        activeTask.projectId = projectId;

        this.setState({activeTask});
        this.updateTask(activeTask);
    }

    handleTypeChange(typeId) {
        let activeTask = this.state.activeTask;
        activeTask.typeId = typeId;

        this.setState({activeTask});
        this.updateTask(activeTask);
    }

    componentDidMount() {
        this.getTasks();
        this.getActiveTask();
    }

    render() {

        let tasksRows = [];
        let dateKey;
        const tasks = this.state.tasks;

        for (dateKey in tasks) {
            if ( ! tasks.hasOwnProperty(dateKey) ) {
                continue;
            }

            tasksRows.push(<h3 key={dateKey} >{dateKey}</h3>);
            tasksRows.push(tasks[dateKey].map((t, i) => 
                <TaskRow 
                    task={t} 
                    projects={this.state.projects} 
                    types={this.state.types} 
                    key={t.id} 
                    updateTask={this.updateTask}
                />
            ));
        }

        const projectOptions = this.state.projects.map((p, i) => <option value={p.id} key={p.id} >{p.name}</option>);
        const typeOptions = this.state.types.map((t, i) => <option value={t.id} key={t.id} >{t.name}</option>);


        const activeTask = this.state.activeTask;

        return (
            <div>
                {/* <div className="timer-active-task-row">
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
                        <DropDown 
                            selected={activeTask.projectId} 
                            handleChange={this.handleProjectChange} 
                            options={this.state.projects}
                        />
                        <DropDown 
                            selected={activeTask.typeId} 
                            handleChange={this.handleTypeChange} 
                            options={this.state.types} 
                            displayIcon='tag'
                        />
                    </div>

                    <div>
                        { 
                            activeTask.startTime !== 0
                                ? <DisplayTimer startTime={activeTask.startTime} />
                                : ''
                        }
                    </div> */}
                    <TaskRow 
                        task={activeTask} 
                        projects={this.state.projects} 
                        types={this.state.types} 
                        key={activeTask.id} 
                        createTask={this.createTask} 
                        updateTask={this.updateTask}
                        isActiveTask='true'
                    />
                    {/* <div className="ttr-last" style={{marginBottom: '20px'}}>
                        <button onClick={this.toggleTimer}>{activeTask.activeButton}</button>
                    </div> */}
                {/* </div> */}
                {tasksRows}
            </div>
        );
    }
}; 

export default Timer;