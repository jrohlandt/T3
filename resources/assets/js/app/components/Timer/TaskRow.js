import React from 'react';

const TaskRow = (props) => {
    const t = props.task;
    return (
        <div className="timer-task-row">
            <div className="ttr-main">
                    <div>{t.description}</div>
            </div>
            <div className="ttr-secondary">
                secondary
            </div>
            <div className="ttr-last">
                {t.displayStartTime} - {t.displayEndTime} | {t.displayDuration}
            </div>
        </div>
    );
};

export default TaskRow;