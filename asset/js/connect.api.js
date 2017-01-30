// connect api Spotify
//
//
var getSPotify = function(id, callback) {
    $.get('http://moodtube.yoanndm.fr/spotify.php', function(jsonP) {
        var _tokenSpotify = JSON.parse(jsonP),
            _playlistID;
        
        if(id == 'glitter') {
            _playlistID = '7uDoSz5VxK5lbXgj7tBMG9';
        }
        else if(id == 'sad') {
            _playlistID = '2XuC4mXYHL6ZSorxFFZhLq';
        }
        else {
            _playlistID = 'ok';
        }
        
        $.ajax({
            url: 'https://api.spotify.com/v1/users/spotify/playlists/' + _playlistID,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + _tokenSpotify.access_token);
            },
            success: function(data) {
                // data.tracks.items[0].track.artists[0].name
                callback(data);
            },
            error: function(err) {
                console.log('token expire err code : ' + err.code + ' & err message : ' + err.message);
            }
        });
    });
}

// connect api Giphy
//
//
var getGiphy = function(id, callback) {
    var _stepKeyGihpy = 'dc6zaTOxFJmzC';
    var idGiphy = function(id) {
        return 'http://api.giphy.com/v1/gifs/search?q='+id+'&api_key='+_stepKeyGihpy;
    }

    $.get(idGiphy(id), function(jsonP) {
        $.ajax({
            url: idGiphy(id),
            type: 'GET',
            success: function(data) {
                callback(data);
            },
            error: function(err) {
                console.log(err.code + err.message);
            }
        });
    });
}