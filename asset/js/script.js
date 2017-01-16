$(document).ready(function() {
    var _stepKey = "http://moodtube.yoanndm.fr/spotify.php";

    $.get(_stepKey, function(jsonP) {
        var s = JSON.parse(jsonP.replace(/\\/g, ""));
        var _tokenSpotify = s.access_token;
        
        // result token
        $('#rsltS').append(_tokenSpotify);
    
        $.ajax({
            url: "https://api.spotify.com/v1/users/spotify/playlists/7uDoSz5VxK5lbXgj7tBMG9",
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+_tokenSpotify);
            },
            success: function(data) {
                
                // connect 
                $('#errorSpotify').append('connect'); 
                
                /*
                $('#r').append('</br>description : '+data.description);
                $('#r').append('</br>id : '+data.id);
                $('#r').append('</br>tracks : '+data.tracks.href);
                $('#r').append('</br>added_at : '+data.tracks.items[0].added_at);
                $('#r').append('</br>name : '+data.tracks.items[0].track.name);
                $('#r').append('</br>art name : '+data.tracks.items[0].track.artists[0].name);

                var _playlist = data.tracks.items;

                for(var o=0; o<_playlist.length; o++) {
                    var _tpl = [
                        '<li>',
                        'titre : '+_playlist[o].track.name,
                        ' - ',
                        'artiste : '+_playlist[o].track.artists[0].name,
                        '</li>'
                    ].join('');
                    $('ul').append(_tpl);
                }
                */
    
                $('button').click(function() {
                    var _val = $('#search').val();
                    alert(_val);
                });
            },
            error: function(err) {
                
                // connect error
                $('#errorSpotify').append('token expire err code : '+err.code+' & err message : '+err.message);
            }
        });
    });

    var dateTime = function() {
        var date = new Date(),
            _getTime = moment().format('h:mm:ss'),
            _getDate = moment().format('DD.MM.YYYY');
        
        $('#time').text(_getTime);
        $('#date').text(_getDate);
    }
    
    setInterval(dateTime, 1000);
    
});