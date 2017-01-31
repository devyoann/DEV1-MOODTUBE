$(document).ready(function() {
    // variable public
    var pagesBlack = ['sad', 'gangsta', 'kaway', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)',
        playerAudio = $('audio')[0],
        clickPlay = 1,
        clickSound = 1,
        IntervalGifAnim,
        lestP,
        dataR;
    
    // function public
    var randomInt = function(int) {
            return Math.floor(Math.random() * int) + 1;
    },
        playerPlay = function(i) {
            if(i == 'play')
                playerAudio.play();
            else if(i == 'pause')
                playerAudio.pause();
    },
        playerSound = function(a, i) {
            if(i == 1)
                a.volume = 1;
            else if(i == 0)
                a.volume = 0;
    };

    // audio pause
    playerPlay('pause');
    
    // hover (i feel) button
    $('.button').hover(function() {
        $('#vbutton').text(
            $(this).val()
        );
    }, function() {
        $('#vbutton').empty();
    });

    // function button
    $('.button').click(function() {
        // private variable
        var _val = $(this).val(),
            sectionClass = 'section.' + _val,
            sectionId = 'section#' + _val,
            backgroundId,
            i,
            shareUrl = url + '#' + _val,
            tracks = [],
            el,
            max;

        $('main').hide();
        $('section').removeClass('none').addClass(_val).attr('id', _val);
        $('body').addClass('section ' + _val);
        $(sectionId).show();
        $('#sec-name').text($(this).text());
        $('.fb-share-button').attr('data-href', shareUrl);
        $('.twitter-share-button').attr('href', shareUrl);
        // get Spotify api and execute function
        
        getSPotify(_val, function(data) {
            console.log(data);
            var datalenght = data.tracks.items.length,
                count = 0,
            playerNext = function() {
                max = parseInt(datalenght - 1);
                el = randomInt(datalenght);
                    
                for(var q = 0; q < datalenght; q++) {
                    if(data.tracks.items[q].track.preview_url != null)
                        tracks.push(data.tracks.items[q].track.preview_url);
                }
                
                var son = tracks[el];
                $('audio').attr('src', son);
                $('source').attr('src', son);
                
                playerPlay('play');
            }
            
            playerNext();
            
            setInterval(playerNext, 30000);
            
            playerAudio.volume = 0.5;
            var pv = playerAudio.volume;
            
            var d = 118 % pv;
            $('#grabSB').css('left', d);
        });
        
        var queues = function() {
            if($(this).attr('id') === 'previous')
                el = el > 0 ? el-1 : 0;
            else
                el = el < max ? el+1 : max;     

            son = tracks[el];
            console.log(tracks[el]);
            $('audio').attr('src', son);
            $('source').attr('src', son);
            playerPlay('play');
        }
    
        $('#previous, #next').click(queues);
        
        // get Giphy api and execute function
        getGiphy(_val, function(data){
            console.log(data);
            var gifAnim = function() {
                dataR = data.data[randomInt(data.data.length)];
                $('img#rdm').
                    attr('src', dataR.images.original.url).
                    attr('alt', _val);
            }
            
            gifAnim();
            
            IntervalGifAnim = setInterval(gifAnim, 5000);
        });
    
        for(i = 0; i < pagesBlack.length; i++) {
            if(pagesBlack[i] == _val) {
                $('header a').css('color', colorWhite);
                $('#time').css('color', colorWhite);
                $('#date').css('color', colorWhite);
            }
        }
    });
    
    $('#return').click(function() {
        $('main').show();
        $('section').addClass('none').hide();
        $('img#rdm').attr('src', '').attr('alt', 'moodtube');
        $('#rs').empty();
        $('body').removeClass();
        $('header a').css('color', colorBlack);
        $('#time').css('color', colorBlack);
        $('#date').css('color', colorBlack);
        playerPlay('pause');
        $('audio').attr('src', '');
        $('source').attr('src', '');
        clearInterval(IntervalGifAnim);
    });
    
    $('#playPause').click(function() {
        if(clickPlay == 1) {
            playerPlay('pause');
            clickPlay = 0;
            $(this).css('background-image', 'url(asset/img/play.svg)');
        }
        else if(clickPlay == 0) {
            playerPlay('play');
            clickPlay = 1;
            $(this).css('background-image', 'url(asset/img/pause.svg)');
        }
    });
    
    $('#soundIcon').click(function() {
        if(clickSound == 1) {
            playerSound(playerAudio, 0);
            clickSound = 0;
            $(this).css('background-image', 'url(asset/img/soundMute.svg)');
        }
        else if(clickSound == 0) {
            playerSound(playerAudio, 1);
            clickSound = 1;
            $(this).css('background-image', 'url(asset/img/sound3.svg)');
        }
    });

    for(x = 0; x < sectionGet.length; x++) {
        if(getUrl == sectionGet[x]) {
            $('.button').val(getUrl).trigger('click');
        }
    }
});