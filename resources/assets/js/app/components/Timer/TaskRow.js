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

const getTypeName = (typeId, types) => {
    
    for (let i=0; i < types.length; i++) {
        let type = types[i];
        if (type.id == typeId) {
            return type.name;
        }
    }

    return '';
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
                | {getTypeName(t.typeId, props.types)}
            </div>
            <div className="ttr-last">
                {t.displayStartTime} - {t.displayEndTime} | {t.displayDuration}
            </div>
        </div>
    );
};

export default TaskRow;