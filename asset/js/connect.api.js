// connect api Spotify
var getSPotify = function(id, callback) {
    $.get('http://matthieuvignolle.fr/spotify.php', function(jsonP) {
        // require Token
        var _tokenSpotify = JSON.parse(jsonP),
            _playlistID,
            _userID;
        
        if(id == 'glitter') {
            _userID = 'spotify';
            _playlistID = '7uDoSz5VxK5lbXgj7tBMG9';
        }
        else if(id == 'sad') {
            _userID = 'spotify_uk_';
            _playlistID = '0ApL3HCGSTLQhXIcQqIMVZ';
        }
        else if(id == 'happy') {
            _userID = 'iloveplaylists';
            _playlistID = '1V93SRHKAhfJ83uFY8YtAg';
        }
        else if(id == 'chilling') {
            _userID = 'spotify';
            _playlistID = '7b9XqnXw5J47tmn0Y0IZeW';
        }
        else if(id == 'dancing') {
            _userID = 'spotify';
            _playlistID = '5rJNwG9BImUMYDrN5D3aUi';
        }
        else if(id == 'working') {
            _userID = 'spotify_france';
            _playlistID = '7gvtLWWpXVxQfIRtjkJk8n';
        }
        else if(id == 'sporty') {
            _userID = 'digster.fr';
            _playlistID = '1rUqrkSj6eDDSlLTb98qfy';
        }
        else if(id == 'sexual') {
            _userID = '1230056338';
            _playlistID = '54VqYS5eGzITyXWYw3RK2Y';
        }
        else if(id == 'travelling') {
            _userID = 'spotify';
            _playlistID = '3TA33aezSXwtdkmbTxSknA';
        }
        else if(id == 'gangsta') {
            _userID = 'digster.fr';
            _playlistID = '0MF1XGKzqqeL0ZHeqMrq7R';
        }
        else if(id == 'trendy') {
            _userID = 'warnerfrspotify';
            _playlistID = '71Yp73gW0EuxhaPrTkmTN7';
        }
        else if(id == 'tgif') {
            _userID = 'spotify';
            _playlistID = '2JkjXscXs35c5wKE5ZeaYK';
        }
        else if(id == 'frenchy') {
            _userID = 'nicolaslanglois';
            _playlistID = '1ydTKOkRvoHpNvJhWjOLce';
        }
        else if(id == 'moodbooster') {
            _userID = 'spotify';
            _playlistID = '6uTuhSs7qiEPfCI3QDHXsL';
        }
        else if(id == 'kawai') {
            _userID = '12124288245';
            _playlistID = '3qcBgSbo3mtCeAtUmGraGP';
        }
        else if(id == 'rockstar') {
            _userID = 'spotify';
            _playlistID = '2Qi8yAzfj1KavAhWz1gaem';
        }
        else if(id == 'jazzy') {
            _userID = 'spotify';
            _playlistID = '3YxrKQSAnQGlgxrEAWbwSm';
        }
        else if(id == 'country') {
            _userID = 'digster.fm';
            _playlistID = '6nU0t33tQA2i0qTI5HiyRV';
        }
        else if(id == 'blessed') {
            _userID = '1124117330';
            _playlistID = '1Lfv5hpiBqtxHIlaeUo8TS';
        }
        else if(id == 's80') {
            _userID = 'myplay.com';
            _playlistID = '19PgP2QSGPcm6Ve8VhbtpG';
        }
        else if(id == 's90') {
            _userID = 'myplay.com';
            _playlistID = '3C64V048fGyQfCjmu9TIGA';
        }
        else if(id == 's2000') {
            _userID = 'myplay.com';
            _playlistID = '2f6tXtN0XesjONxicAzMIw';
        }
        else {
            _userID = 'spotify';
            _playlistID = '7uDoSz5VxK5lbXgj7tBMG9';
        }
        
        $.ajax({
            url: 'https://api.spotify.com/v1/users/' + _userID + '/playlists/' + _playlistID,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + _tokenSpotify.access_token);
            },
            success: function(data) {
                callback(data);
            },
            error: function(err) {
                console.log('token expire err code : ' + err.code + ' & err message : ' + err.message);
            }
        });
    });
}

// connect api Giphy
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