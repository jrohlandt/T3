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
            task: {},
        }

        this.date = new DateHelper;        

        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleDescriptionChange(event) {
        const task = this.state.task;
        task.description = event.target.value;

        this.setState({task});
    }

    createTask(task={}) {
        if (Object.keys(task).length > 0) {
            this.props.createTask(task);
        } else {
            this.props.createTask(this.state.task);
        }
    }

    updateTask(task={}) {
        console.log('inside task;', task.length, task);
        if (Object.keys(task).length > 0) {
        console.log('inside 1');

            this.props.updateTask(task);
        } else {
        console.log('inside 2');

            this.props.updateTask(this.state.task);
        }
    }

    toggleTimer() {

        let activeTask          = Object.assign({}, this.state.task);
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
        console.log('stop task: ', activeTask);
        this.updateTask(activeTask);
    }

    componentDidMount() {
        const p = this.props;
        const isActiveTask = p.isActiveTask != undefined ? p.isActiveTask : false;
        this.setState({task: p.task, isActiveTask});
    }

    render() {
        const props = this.props;
        const t = this.state.task;
        return (
            <div className="timer-task-row">
                <div className="ttr-main">
                    <div>
                            {
                                this.state.isActiveTask
                                    ?  <input 
                                            type="text" 
                                            onFocus={ this.createTask }
                                            onBlur={ this.updateTask } 
                                            onChange={ this.handleDescriptionChange } 
                                            value={t.description}
                                        />
                                    : <input 
                                            type="text" 
                                            onBlur={ this.updateTask } 
                                            onChange={ this.handleDescriptionChange } 
                                            value={t.description}
                                        />
                            }
                        
                    </div>
                </div>
                <div className="ttr-secondary">
                    {getProjectName(t.projectId, props.projects)}
                    | {getTypeName(t.typeId, props.types)}
                </div>
                <div className="ttr-last">
                    {t.displayStartTime} - {t.displayEndTime} | {t.displayDuration}
                </div>
                { this.state.isActiveTask 
                    ? <div className="ttr-last" style={{marginBottom: '20px'}}>
                            <button onClick={this.toggleTimer}>{t.activeButton}</button>
                        </div>
                    : ''
                }
                
            </div>
        );
    }
    
};

export default TaskRow;