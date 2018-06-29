'use strict';
import React from 'react';
import DropDown from './DropDown.js';
import DisplayTimer from './Timer';
import DateHelper from '../../core/Helpers/Date.js';

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
        
        console.log('create tttask', task);
        if (Object.keys(task).length > 0) {
            console.log('c1');
            
            this.props.createTask(task);
        } else {
            console.log('c2');

            this.props.createTask(this.state.task);
        }
    }

    updateTask(task={}) {

        let t;
        console.log('inside task;', Object.keys(task).length, task);
        if (Object.keys(task).length > 0) {
        console.log('inside 1');
            t = Object.assign({}, task);
        } else {
        console.log('inside 2');
            t = Object.assign({}, this.state.task);
        }
        if (t.id === 0) {
        console.log('inside 3 create');

            this.props.createTask(task);
        } else {
        console.log('inside 4 update');

            this.props.updateTask(t);
        }
        // this.setState({task: t});

    }

    toggleTimer() {

        let activeTask          = Object.assign({}, this.state.task);
        const date              = new Date();
        const region            = new Intl.DateTimeFormat();
        const regionValues      = region.resolvedOptions();
        activeTask.tzName       = regionValues.timeZone;
        activeTask.tzOffset     = (date.getTimezoneOffset() / 60) * -1;

        let status = '';
        if (activeTask.startTime === 0) {
            status = 'start';
            activeTask.startTime = this.date.toMysqlDateTime(date);
            activeTask.activeButton = 'stop';

            // if (activeTask.id > 0) {
            //     this.updateTask(activeTask);
            //     return;
            // }

            // this.createTask(activeTask);
        } else {
            status = 'stop';
            activeTask.endTime = this.date.toMysqlDateTime(date);
        }


        // Stop timer and refresh tasks list.
        console.log('toggle timer: ',status, activeTask);
        this.updateTask(activeTask);
    }

    handleProjectChange(projectId) {
        let task = Object.assign({}, this.state.task);
        task.projectId = projectId;
        this.updateTask(task);
        // this.updateTask(Object.assign(this.state.task, {projectId}));
    }

    handleTypeChange(typeId) {
        let task = Object.assign({}, this.state.task);
        task.typeId = typeId;
        this.updateTask(task);
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
                    {task.displayStartTime} - {task.displayEndTime} | {task.displayDuration}
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