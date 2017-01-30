$(document).ready(function() {
    // variable public
    var pagesBlack = ['sad', 'gangsta', 'kaway', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)',
        playerAudio = $('audio')[0],
        clickPlay = 1,
        IntervalGifAnim;

    // hover (i feel) button
    $('.button').hover(function() {
        $('#vbutton').text(
            $(this).val()
        );
    }, function() {
        $('#vbutton').empty();
    });
    
    var queues = function() {
        
    },
        playerPlay = function(a, i) {
            if(i == 'play')
                a.play();
            else if(i == 'pause')
                a.pause();
    },
        playerPrevious = function(a, i) {
            
    },
        playerNext = function() {
            
    },
        randomInt = function(int) {
            return Math.floor(Math.random() * int) + 1;
    };
    
    playerPlay(playerAudio, 'pause');

    $('.button').click(function() {
        var _val = $(this).val(),
            sectionClass = 'section.' + _val,
            sectionId = 'section#' + _val,
            backgroundId,
            i,
            shareUrl = url + '#' + _val;

        $('main').hide();
        $('section').removeClass('none').addClass(_val).attr('id', _val);
        $('body').addClass('section ' + _val);
        $(sectionId).show();
        $('#sec-name').text($(this).text());
        $('.fb-share-button').attr('data-href', shareUrl);
        $('.twitter-share-button').attr('href', shareUrl);
        
        getSPotify(_val, function(data) {
            //console.log(data);
            
            var _tpl = [
                'description : ' + data.description,
                'follower : ' + data.followers.total,
                'id : ' + data.id,
                'images : ' + data.images.url,
                'public : ' + data.public,
                'ms : ' + data.tracks.items[randomInt(data.tracks.items.length)].track.duration_ms
            ].join('<br/>');
            $('test').html(_tpl);
            
            var son = data.tracks.items[randomInt(data.tracks.items.length)].track.preview_url,
                ms = data.tracks.items[randomInt(data.tracks.items.length)].track.duration_ms,
                moms = parseInt(moment().format('ms'));
    
            $('audio').attr('src', son);
            $('source').attr('src', son);
            playerPlay(playerAudio, 'play');
        });
        var dataR;
        getGiphy(_val, function(data){
            console.log(data);
            var gifAnim = function() {
                dataR = data.data[randomInt(data.data.length)];
                $('img#rdm').
                    attr('src', dataR.images.original.url).
                    attr('alt', _val).
                    css('width', dataR.images.original.width).
                    css('height', dataR.images.original.height);
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
        playerPlay(playerAudio, 'pause');
        $('audio').attr('src', '');
        $('source').attr('src', '');
        clearInterval(IntervalGifAnim);
    });
    
    $('#playPause').click(function() {
        if(clickPlay == 1) {
            playerPlay(playerAudio, 'pause');
            clickPlay = 0;
            $(this).css('background-image', 'url(asset/img/play.svg)');
        }
        else if(clickPlay == 0) {
            playerPlay(playerAudio, 'play');
            clickPlay = 1;
            $(this).css('background-image', 'url(asset/img/pause.svg)');
        }
    });

    for(x = 0; x < sectionGet.length; x++) {
        if(getUrl == sectionGet[x]) {
            $('.button').val(getUrl).trigger('click');
        }
    }
});