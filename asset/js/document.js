/* date - momentjs */
function dateTime() {
    var date = new Date();
    var _getTime = moment().format('HH:mm:ss'),
        _getDate = moment().format('DD.MM.YYYY');
        
    $('#time').text(_getTime);
    $('#date').text(_getDate);
}

setInterval(dateTime, 1000);

var url = window.location.protocol + "//" + (window.location.host + "/" + window.location.pathname).replace('//', '/'),
    getUrl = document.URL.split('#')[1],
    sectionGet = ['glitter', 'sad', 'happy', 'dancing', 'chilling', 'working', 'sporty', 'sexuel', 'travelling', 'gangsta', 'trendy', 'tgif', 'frenchy', 'moodbooster', 'kawai', 'rockstar', 'jazzy', 'country', 'blessed', '80', '90', '2000'];