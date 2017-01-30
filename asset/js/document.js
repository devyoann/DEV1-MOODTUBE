/* date - momentjs */
function dateTime() {
    var date = new Date();
    var _getTime = moment().format('HH:mm:ss'),
        _getDate = moment().format('DD.MM.YYYY');
        
    $('#time').text(_getTime);
    $('#date').text(_getDate);
}

$(function() {
    dateTime();
});

setInterval(dateTime, 1000);