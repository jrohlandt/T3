import React from 'react';

const TaskRow = (props) => {
    const t = props.task;
    return (
        <div className="timer-active-task-row">
            <div className="ttr-main">
                    <div>{t.description}</div>
            </div>
            <div className="ttr-secondary">
                secondary
            </div>
            <div className="ttr-last">
                last
            </div>
        </div>
    );
};

export default TaskRow;