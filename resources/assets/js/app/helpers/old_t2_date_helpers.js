var months = [
    {name: "january", abbreviation: 'jan'},
    {name: "february", abbreviation: 'feb'},
    {name: "march", abbreviation: 'mar'},
    {name: "april", abbreviation: 'apr'},
    {name: "may", abbreviation: 'may'},
    {name: "june", abbreviation: 'jun'},
    {name: "july", abbreviation: 'jul'},
    {name: "august", abbreviation: 'aug'},
    {name: "september", abbreviation: 'sep'},
    {name: "october", abbreviation: 'oct'},
    {name: "november", abbreviation: 'nov'},
    {name: "december", abbreviation: 'dec'}
];

var daysOfTheWeek = [
    {name: "sunday", abbreviation: "sun"},
    {name: "monday", abbreviation: "mon"},
    {name: "tuesday", abbreviation: "tue"},
    {name: "wednesday", abbreviation: "wed"},
    {name: "thursday", abbreviation: "thu"},
    {name: "friday", abbreviation: "fri"},
    {name: "saturday", abbreviation: "sat"},
];

function mysqlToSeconds(datetime) {
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = datetime.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    return Date.parse(d) / 1000;
}

function mysqlDateToTitle(mysqlDate) {
    var t = mysqlDate.split(/[-]/);

    // Apply each element to the Date function
    var date = new Date(t[0], t[1]-1, t[2]);
    return daysOfTheWeek[date.getDay()].abbreviation + ' ' + date.getDate() + ' ' + months[date.getMonth()].abbreviation;
}

function secondsToMysql(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = (date.getHours() < 10) ? "0" + date.getHours().toString() : date.getHours();
    var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes().toString() : date.getMinutes();
    var seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds().toString() : date.getSeconds();
    var month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
    var day = (date.getDate() < 10) ? "0" + date.getDate().toString() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function durationForTitle(durationInSeconds) {

    var time = '';

    // get seconds
    var seconds = Math.round(durationInSeconds % 60);

    // remove seconds from the date
    durationInSeconds = Math.floor(durationInSeconds / 60);

    // get minutes
    var minutes = Math.round(durationInSeconds % 60);

    // remove minutes from the date
    durationInSeconds = Math.floor(durationInSeconds / 60);

    // get hours
    var hours = Math.round(durationInSeconds % 24);

    // remove hours from the date
    durationInSeconds = Math.floor(durationInSeconds / 24);

    if (hours > 0) {
        time += hours + ' h ';
    }

    if (minutes > 0) {
        time += minutes + ' min ';
    }

    return time;
}

function durationForDisplay(durationInSeconds) {
//        /* if (typeof durationInSeconds !== "string") {
//         return false;
//         }*/

    var time = '';

    // get seconds
    var seconds = Math.round(durationInSeconds % 60);

    // remove seconds from the date
    durationInSeconds = Math.floor(durationInSeconds / 60);

    // get minutes
    var minutes = Math.round(durationInSeconds % 60);

    // remove minutes from the date
    durationInSeconds = Math.floor(durationInSeconds / 60);

    // get hours
    var hours = Math.round(durationInSeconds % 24);

    // remove hours from the date
    durationInSeconds = Math.floor(durationInSeconds / 24);

    // the rest of durationInSeconds is number of days
    var days = durationInSeconds ;

    /*if (days > 0) {
     time += days + 'd ';
     }*/

    if (hours > 0) {
        time += (hours < 10) ? ('0' + hours + ':') : (hours + ':');
    } else {
        time += '00:';
    }

    if (minutes > 0) {
        time += (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    } else {
        time += '00:';
    }

    if (seconds > 0) {
        time += (seconds < 10) ? ('0' + seconds) : seconds;
    } else {
        time += '00';
    }

    return time;
}

function durationToSeconds(duration) {
    var arr = duration.split(":");
    var minutes = ((parseInt(arr[0], 10) * 60) + parseInt(arr[1], 10));
    var seconds = (minutes * 60) + parseInt(arr[2]);
    return seconds;
}

function stoppedAt(task) {
    var start = mysqlToSeconds(task.started_at);
    var duration = durationToSeconds(task.duration);
    var stop = secondsToMysql((start + duration));

    return stop;
}

export {durationForDisplay, durationForTitle, mysqlToSeconds, mysqlDateToTitle, secondsToMysql, durationToSeconds, stoppedAt};
