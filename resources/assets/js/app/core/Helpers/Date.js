class DateHelper {

    getTimeOnly(mysqlDateTime) {        
        return this.toMysqlDateTime(new Date(mysqlDateTime), true);
    }

    toMysqlDateTime(dateObj, hoursAndMinutesOnly=false) {
        const hours = (dateObj.getHours() < 10) ? "0" + dateObj.getHours().toString() : dateObj.getHours();
        const minutes = (dateObj.getMinutes() < 10) ? "0" + dateObj.getMinutes().toString() : dateObj.getMinutes();

        if (hoursAndMinutesOnly)
            return hours + ":" + minutes;

        const seconds = (dateObj.getSeconds() < 10) ? "0" + dateObj.getSeconds().toString() : dateObj.getSeconds();

        const month = ((dateObj.getMonth() + 1) < 10) ? "0" + (dateObj.getMonth() + 1).toString() : (dateObj.getMonth() + 1);
        const day = (dateObj.getDate() < 10) ? "0" + dateObj.getDate().toString() : dateObj.getDate();

        return dateObj.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }

    toMysqlDate(dateObj) {
        const month = ((dateObj.getMonth() + 1) < 10) ? "0" + (dateObj.getMonth() + 1).toString() : (dateObj.getMonth() + 1);
        const day = (dateObj.getDate() < 10) ? "0" + dateObj.getDate().toString() : dateObj.getDate();

        return dateObj.getFullYear() + "-" + month + "-" + day;
    }

    /**
     * 
     * @param {string} dateTimeString e.g. '2018-06-24 11:00:21'
     */
    mysqlToSeconds(dateTimeString) {
        return new Date(dateTimeString).getTime() / 1000;
    }

    durationForTitle(durationInSeconds) {

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
    
    durationForDisplay(durationInSeconds) {
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
}

export default DateHelper;