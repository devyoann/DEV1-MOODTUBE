$(document).ready(function() {
    // variable public
    var pagesBlack = ['sad', 'gangsta', 'kawai', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)',
        playerAudio = $('audio')[0],
        clickPlay = 1,
        IntervalGifAnim;
    
    playerAudio.pause();

    // hover (i feel) button
    $('.button').hover(function() {
        $('#vbutton').text(
            $(this).text()
        );
    }, function() {
        $('#vbutton').empty();
    });

    var pageBlack = ['sad', 'gangsta', 'kawai', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)';
    
    $('.button').click(function() {
        var _val = $(this).val(),
            dataSearch = $(this).data('search'),
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

        var randomInt = function(int) {
            return Math.floor(Math.random() * int) + 1;
        }
        
        getSPotify(_val, function(data) {
            console.log(data);
            
            
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
            playerAudio.play();
        });
        
        getGiphy(dataSearch, function(data){
            var gifAnim = function() {
                $('img#rdm').attr('src', data.data[randomInt(data.data.length)].images.downsized.url).attr('alt', dataSearch);
            }
            
            gifAnim();
            
            IntervalGifAnim = setInterval(gifAnim, 5000);
        });
    
        for(i = 0; i < pagesBlack.length; i++) {
            if(pagesBlack[i] == _val) {
                $('header a').css('color', colorWhite);
                $('#time').css('color', colorWhite);
                $('#date').css('color', colorWhite);
                $('#sec-name').css('backgroundColor', 'rgba(255, 255, 255,0.3)');
                $('#player').css('backgroundColor', 'rgba(255, 255, 255,0.3)');
                $('.cls-2').css('fill', '#FFF');
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
        $('#sec-name').css('backgroundColor', 'rgba(0, 0, 0, 0.3)');
        $('#player').css('backgroundColor', 'rgba(0, 0, 0, 0.3)');
        $('.cls-2').css('fill', '#000');
        playerAudio.pause();
        $('audio').attr('src', '');
        $('source').attr('src', '');
        clearInterval(IntervalGifAnim);
    });
    
    $('#playPause').click(function() {
        if(clickPlay == 1) {
            playerAudio.pause();
            clickPlay = 0;
            $(this).css('background-image', 'url(asset/img/play.svg)');
        }
        else if(clickPlay == 0) {
            playerAudio.play();
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