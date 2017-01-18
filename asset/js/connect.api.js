var _stepKey = "http://moodtube.yoanndm.fr/spotify.php"; // recup key spotify

$.get(_stepKey, function(jsonP) {
    var _tokenSpotify = JSON.parse(jsonP.replace(/\\/g, ""));
    //var _tokenSpotify = s.access_token;
    
    $.ajax({
        url: "https://api.spotify.com/v1/users/spotify/playlists/7uDoSz5VxK5lbXgj7tBMG9",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+_tokenSpotify.access_token);
        },
        success: function(data) {
            // data.tracks.items[0].track.artists[0].name
                
            // connect 
            console.log('spotify connect'); 
        },
        error: function(err) {
                
            // connect error
            console.log('token expire err code : '+err.code+' & err message : '+err.message);
        }
    });
});