/* date - momentjs */
var dateTime = function() {
    var date = new Date();
        _getTime = moment().format('HH:mm:ss'),
        _getDate = moment().format('DD.MM.YYYY');
        
    $('#time').text(_getTime);
    $('#date').text(_getDate);
}

dateTime();

setInterval(dateTime, 100);