import React from 'react';

const getProjectName = (projectId, projects) => {
    
    for (let i=0; i < projects.length; i++) {
        let project = projects[i];
        if (project.id == projectId) {
            return project.name;
        }
    }

    return 'no project';
};

const TaskRow = (props) => {
    const t = props.task;
    return (
        <div className="timer-task-row">
            <div className="ttr-main">
                    <div>{t.description}</div>
            </div>
            <div className="ttr-secondary">
                {getProjectName(t.projectId, props.projects)}
            </div>
            <div className="ttr-last">
                {t.displayStartTime} - {t.displayEndTime} | {t.displayDuration}
            </div>
        </div>
    );
};

export default TaskRow;