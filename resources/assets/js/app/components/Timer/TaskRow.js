'use strict';
import React from 'react';
import DropDown from './DropDown.js';
import DisplayTimer from './Timer';
import DateHelper from '../../core/Helpers/DateHelper';

const getProjectName = (projectId, projects) => {
    
    for (let i=0; i < projects.length; i++) {
        let project = projects[i];
        if (project.id == projectId) {
            return project.name;
        }
    }

    return 'no project';
};

const getTypeName = (typeId, types) => {
    
    for (let i=0; i < types.length; i++) {
        let type = types[i];
        if (type.id == typeId) {
            return type.name;
        }
    }

    return '';
};

class TaskRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActiveTask: false,
            task: {
                description: '',
            },
        }

        this.date = new DateHelper;        

        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        // this.handleDescriptionOnFocus = this.handleDescriptionOnFocus.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDescriptionOnBlur = this.handleDescriptionOnBlur.bind(this);
    }

    handleDescriptionChange(event) {
        const task = this.state.task;
        task.description = event.target.value;

        this.setState({task});
    }

    handleDescriptionOnBlur(event) {
        this.updateTask();
    }

    // handleDescriptionOnFocus(event) {
    //     this.createTask();
    // }

    createTask(task={}) {
        if (Object.keys(task).length > 0) {
            this.props.createTask(task);
            return;
        }

        this.props.createTask(this.state.task);
    }

    updateTask(task={}) {
        let t;
        if (Object.keys(task).length > 0) {
            t = Object.assign({}, task);
        } else {
            t = Object.assign({}, this.state.task);
        }

        if (t.id === 0) {
            // Call internal createTask method.
            this.createTask(task);
        } else {
            this.props.updateTask(t);
        }
        // this.setState({task: t});
    }

    toggleTimer() {

        let task            = Object.assign({}, this.state.task);
        const date          = new Date();
        const region        = new Intl.DateTimeFormat();
        const regionValues  = region.resolvedOptions();
        task.tzName         = regionValues.timeZone;
        task.tzOffset       = (date.getTimezoneOffset() / 60) * -1;

        let status = '';
        if (task.startTime === 0) {
            status = 'start';
            task.startTime = this.date.toMysqlDateTime(date);
            task.activeButton = 'stop';
        } else {
            status = 'stop';
            task.endTime = this.date.toMysqlDateTime(date);
        }

        this.updateTask(task);
    }

    handleProjectChange(projectId) {
        this.updateTask(Object.assign(this.state.task, {projectId}));
    }

    handleTypeChange(typeId) {
        this.updateTask(Object.assign(this.state.task, {typeId}));
    }

    displayDuration(task) {
        let date = new DateHelper;
        const durationInSeconds = date.mysqlToSeconds(task.endTime) - date.mysqlToSeconds(task.startTime);
        return date.durationForDisplay(durationInSeconds);
    }

    // @param string mysqlDateTime
    displayTime(mysqlDateTime) {
        let date = new DateHelper;
        if (mysqlDateTime && mysqlDateTime.indexOf('1970') === -1) {
            return date.getTimeOnly(mysqlDateTime);
        }
        return '';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task !== this.state.task) {
            this.setState({task: nextProps.task});
        }
    }

    componentDidMount() {
        const p = this.props;
        const isActiveTask = p.isActiveTask != undefined ? p.isActiveTask : false;
        this.setState({task: p.task, isActiveTask});
    }

    render() {
        const props = this.props;
        const task = this.state.task;
        return (
            <div className="timer-task-row">
                <div className="ttr-main">
                    <div>
                        {
                            this.state.isActiveTask
                                ?  <input 
                                        type="text" 
                                        onChange={ this.handleDescriptionChange } 
                                        onBlur={ this.handleDescriptionOnBlur }
                                        value={ task.description }
                                    />
                                : <input 
                                        type="text" 
                                        onChange={ this.handleDescriptionChange } 
                                        onBlur={ this.handleDescriptionOnBlur }
                                        value={ task.description }
                                    />
                        }
                        
                    </div>
                </div>
                <div className="ttr-secondary">
                    <DropDown 
                        selected={ task.projectId } 
                        handleChange={ this.handleProjectChange } 
                        options={ props.projects }
                    />
                    <DropDown 
                        selected={ task.typeId } 
                        handleChange={ this.handleTypeChange } 
                        options={ props.types } 
                        displayIcon='tag'
                    />
                </div>
                <div className="ttr-last">
                    {this.displayTime(task.startTime)} - {this.displayTime(task.endTime)} | {this.displayDuration(task)}
                    { props.isActiveTask 
                        ? <div className="ttr-last" style={{marginBottom: '20px'}}>
                                <button onClick={this.toggleTimer}>{task.activeButton}</button>
                            </div>
                        : ''
                    }
                </div>
                
                
            </div>
        );
    }
    
};

export default TaskRow;