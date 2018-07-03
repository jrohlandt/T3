'use strict';

import React from 'react';
import TaskRow from './TaskRow.js';

import Ajax from '../../core/Helpers/AjaxHelper';
import DateHelper from '../../core/Helpers/DateHelper';
import TaskHelper from '../../core/Helpers/TaskHelper';


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
            tasksByDate: {},
            activeTask: Object.assign({}, emptyTask),
            projects: [
                { id: 0, name: 'no project' },
                { id: 1, name: 'Webinarignition', color: '193, 92, 3' },
                { id: 2, name: 'Provely', color: '111, 229, 84' },
                { id: 3, name: 'Heatmaptracker', color: '239, 154, 43' },
                { id: 4, name: 'PressPlay' },
                { id: 5, name: 'Listeruption2' },
                { id: 6, name: 'LeadGrab' },
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

        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.getActiveTask = this.getActiveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    getTasks() {
        this.ajax.get()
            .then(res => {
                this.setState({
                    tasks: res.tasks,
                    tasksByDate: TaskHelper.sortTasksByDate(res.tasks)
                });
            })
            .catch(err => console.log('Could not fetch tasks. Error: ', err));
    }

    getActiveTask() {
        const ajax = new Ajax({ url: this.ajaxUrl + 'active' });
        ajax.get()
            .then(res => {

                if (res.task == undefined) { 
                    this.setState({ activeTask: Object.assign({}, emptyTask) });
                    return;
                }

                this.setState({ activeTask: Object.assign({}, res.task) });
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

    updateTask(task, isActiveTask=false) {
        if (task.id == 0)
            return;

        let tasks = this.state.tasks;
        let activeTask = this.state.activeTask;
        if ( ! isActiveTask ) {
            tasks = this.state.tasks.map((t, i) => {
                if (task.id !== t.id)
                    return t;

                return task;
            });
            
        } else {
            activeTask = task;
            if (TaskHelper.isDone(task)) {
                activeTask = Object.assign({}, emptyTask);
                tasks.unshift(task);
            }
        }

        this.setState({
            tasks, 
            activeTask,
            tasksByDate: TaskHelper.sortTasksByDate(tasks),
        });

        // Update server.
        this.ajax.put( task )
            .catch(err => console.log('Task could not be updated. Error: ', err));
    }

    deleteTask(id) {
        this.setState((prevState) => {
            const tasks = prevState.tasks.filter((task) => task.id !== id);
            return {
                tasks,
                tasksByDate: TaskHelper.sortTasksByDate(tasks),
            }
        });

        this.ajax.delete( {id: id} )
            .catch(err => console.log('Task could not be deleted. Error: ', err));
    }

    componentDidMount() {
        this.getTasks();
        this.getActiveTask();
    }

    render() {

        let tasksRows = [];
        let dateKey;
        const tasks = this.state.tasksByDate;

        for (dateKey in tasks) {
            if ( ! tasks.hasOwnProperty(dateKey) ) {
                continue;
            }

            tasksRows.push(
                <li 
                    key={dateKey} 
                    className='tasks-date-heading'
                >
                    <div >
                        <h3>{dateKey}</h3>
                    </div>
                </li>
            );
            tasksRows.push(tasks[dateKey].map((t, i) => 
                <TaskRow 
                    task={t} 
                    projects={this.state.projects} 
                    types={this.state.types} 
                    key={t.id} 
                    updateTask={this.updateTask}
                    deleteTask={this.deleteTask}
                />
            ));
        }

        const projectOptions = this.state.projects.map((p, i) => <option value={p.id} key={p.id} >{p.name}</option>);
        const typeOptions = this.state.types.map((t, i) => <option value={t.id} key={t.id} >{t.name}</option>);

        const activeTask = this.state.activeTask;

        return (
            <div>
                <div>
                    <ul className="tasks-rows" >
                        <TaskRow 
                            task={activeTask} 
                            projects={this.state.projects} 
                            types={this.state.types} 
                            key={activeTask.id} 
                            createTask={this.createTask} 
                            updateTask={this.updateTask}
                            deleteTask={this.deleteTask}
                            isActiveTask='true'
                        />
                    </ul>
                </div>
                <div>
                    <ul className="tasks-rows">
                        {tasksRows}
                    </ul>       
                </div>
            </div>
        );
    }
}; 

export default Timer;