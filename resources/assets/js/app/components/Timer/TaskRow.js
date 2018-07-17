'use strict';
import React from 'react';
import DropDown from './DropDown.js';
import DisplayTimer from './Timer';
import DateHelper from '../../core/Helpers/DateHelper';
import TaskHelper from '../../core/Helpers/TaskHelper';
import Trash from 'react-icons/lib/md/delete';


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
                startTime: 0,
            },
        }

        this.date = new DateHelper;  

        this.createTask                 = this.createTask.bind(this);
        this.updateTask                 = this.updateTask.bind(this);
        this.toggleTimer                = this.toggleTimer.bind(this);
        this.handleProjectChange        = this.handleProjectChange.bind(this);
        this.handleTypeChange           = this.handleTypeChange.bind(this);
        this.handleDescriptionChange    = this.handleDescriptionChange.bind(this);
        this.handleDescriptionOnBlur    = this.handleDescriptionOnBlur.bind(this);
    }

    handleDescriptionChange(event) {
        const task = this.state.task;
        task.description = event.target.value;

        this.setState({task});
    }

    handleDescriptionOnBlur(event) {
        this.updateTask();
    }

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

        if (TaskHelper.hasNotBeenCreated(t)) {
            this.createTask(task);
            return;
        }

        this.props.updateTask(t, this.state.isActiveTask);
    }

    toggleTimer() {

        let task            = Object.assign({}, this.state.task);
        const date          = new Date();
        const region        = new Intl.DateTimeFormat();
        const regionValues  = region.resolvedOptions();
        task.tzName         = regionValues.timeZone;
        task.tzOffset       = (date.getTimezoneOffset() / 60) * -1;

        if ( ! TaskHelper.isStarted(task) ) {
            task.startTime = this.date.toMysqlDateTime(date);
            this.updateTask(task);
            return;
        }

        task.endTime = this.date.toMysqlDateTime(date);
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
            <li className={props.isActiveTask ? 'timer-active-task-row' : 'timer-task-row' } >

                <div className="ttr-left">
                        <div className="ttr-description-wrapper" >
                            <input 
                                type="text" 
                                onChange={ this.handleDescriptionChange } 
                                onBlur={ this.handleDescriptionOnBlur }
                                value={ task.description }
                                placeHolder={props.isActiveTask ? 'Type task description...' : 'no description'}
                            />
                        </div>

                        <DropDown 
                            selected={ task.projectId } 
                            handleChange={ this.handleProjectChange } 
                            options={ props.projects }
                            role="project-select"
                        />
                </div>
                
                <div className="ttr-right">
                    <DropDown 
                        selected={ task.typeId } 
                        handleChange={ this.handleTypeChange } 
                        options={ props.types } 
                        role="type-select"
                    />
                    <div className="ttr-last">
                        <div className="ttr-times" >
                            { ! props.isActiveTask 
                                ? <span>{this.displayTime(task.startTime)} - {this.displayTime(task.endTime)}</span> 
                                : ''
                            }
                        </div>
                        <div className="ttr-display-timer">
                            { props.isActiveTask && TaskHelper.isStarted(task)
                                ? <DisplayTimer startTime={task.startTime} />
                                : this.displayDuration(task)
                            }
                        </div> 
                        <div className="ttr-actions">
                            { props.isActiveTask 
                                ? <button onClick={this.toggleTimer}>
                                        {TaskHelper.isStarted(task) ? 'stop' : 'start'}
                                    </button>
                                : ''
                            }
                            <span 
                                className="ttr-delete"
                                onClick={ () => props.deleteTask(task.id) }
                            >
                                <Trash />
                            </span>
                        </div>
                    </div>
                </div>
                
            </li>
        );
    }
    
};

export default TaskRow;