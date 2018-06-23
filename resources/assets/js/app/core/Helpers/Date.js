class DateHelper {

    toMysqlDateTime(dateObj) {
        var hours = (dateObj.getHours() < 10) ? "0" + dateObj.getHours().toString() : dateObj.getHours();
        var minutes = (dateObj.getMinutes() < 10) ? "0" + dateObj.getMinutes().toString() : dateObj.getMinutes();
        var seconds = (dateObj.getSeconds() < 10) ? "0" + dateObj.getSeconds().toString() : dateObj.getSeconds();
        var month = ((dateObj.getMonth() + 1) < 10) ? "0" + (dateObj.getMonth() + 1).toString() : (dateObj.getMonth() + 1);
        var day = (dateObj.getDate() < 10) ? "0" + dateObj.getDate().toString() : dateObj.getDate();

        return dateObj.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
}

export default DateHelper;