import DateHelper from './DateHelper';

class TasksHelper {

    constructor() {
        this.date = new DateHelper;
    }
    
    // Create a object that stores each task by it's date.
    sortTasksByDate(tasks) {
        let tasksByDate = {};
        for ( let i=0; i < tasks.length; i++ ) {
            let task    = tasks[i];
            let dateKey = this.date.toMysqlDate(new Date(task.startTime));
            
            if ( ! tasksByDate.hasOwnProperty(dateKey) ) {
                tasksByDate[dateKey] = [];
            }

            tasksByDate[dateKey].push(task);
        }

        return tasksByDate;
    }

    // Check if a task is done (has a valid end date).
    isDone(task) {
        return new Date(task.startTime).getTime() != 0 && new Date(task.endTime).getTime() != 0;
    }
}

export default new TasksHelper;