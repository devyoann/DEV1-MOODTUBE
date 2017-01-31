$(document).ready(function() {
    // variable public
    var pagesBlack = ['sad', 'gangsta', 'kawai', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)',
        playerAudio = $('audio')[0],
        clickPlay = 1,
        clickSound = 1,
        IntervalGifAnim,
        lestP,
        dataR,
        musicNext;
    
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
            $(this).text()
        );
    }, function() {
        $('#vbutton').empty();
    });

    // function button
    $('.button').click(function() {
        // private variable
        var _val = $(this).val(),
            dataSearch = $(this).data('search'),
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
        $('section').attr('id', _val);
        $(sectionClass).show();
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
            
            musicNext = setInterval(playerNext, 30000);
            
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

        if ('glitter' == _val){
            $('#gif1').attr('src', 'asset/img/gif/glitter/1.gif');
            $('#gif1').removeClass('hide').addClass('show');
            $('#gif2').attr('src', 'asset/img/gif/glitter/2.gif');
            $('#gif2').removeClass('hide').addClass('show');
            $('#gif3').attr('src', 'asset/img/gif/glitter/3.gif');
            $('#gif3').removeClass('hide').addClass('show');
            $('#gif4').attr('src', 'asset/img/gif/glitter/4.gif');
            $('#gif4').removeClass('hide').addClass('show');
        }
        else if ('sad' == _val){
            $('body').addClass('rain');
            // number of drops created.
            var nbDrop = 550; 

            // function to generate a random number range.
            function randRange( minNum, maxNum) {
              return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
            }

            // function to generate drops
            function createRain() {

                for( i=1;i<nbDrop;i++) {
                var dropLeft = randRange(0,1600);
                var dropTop = randRange(-1000,1400);

                $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
                $('#drop'+i).css('left',dropLeft);
                $('#drop'+i).css('top',dropTop);
                }

            }
            // Make it rain
            createRain();

            $('#gif5').attr('src', 'asset/img/gif/sad/1.gif');
            $('#gif5').removeClass('hide').addClass('show');
            $('#gif6').attr('src', 'asset/img/gif/sad/2.gif');
            $('#gif6').removeClass('hide').addClass('show');
            $('#gif7').attr('src', 'asset/img/gif/sad/3.gif');
            $('#gif7').removeClass('hide').addClass('show');
        }
        else if ('happy' == _val){
            $('#gif8').attr('src', 'asset/img/gif/happy/1.gif');
            $('#gif8').removeClass('hide').addClass('show');
            $('#gif9').attr('src', 'asset/img/gif/happy/2.gif');
            $('#gif9').removeClass('hide').addClass('show');
            $('#gif10').attr('src', 'asset/img/gif/happy/3.gif');
            $('#gif10').removeClass('hide').addClass('show');
        }
        else if ('dancing' == _val){
            $('#gif11').attr('src', 'asset/img/gif/dancing/1.gif');
            $('#gif11').removeClass('hide').addClass('show');
            $('#gif12').attr('src', 'asset/img/gif/dancing/2.gif');
            $('#gif12').removeClass('hide').addClass('show');
            $('#gif13').attr('src', 'asset/img/gif/dancing/3.gif');
            $('#gif13').removeClass('hide').addClass('show');
            $('#gif14').attr('src', 'asset/img/gif/dancing/4.gif');
            $('#gif14').removeClass('hide').addClass('show');
        }
        else if ('chilling' == _val){
            
        }
        else if ('working' == _val){
            
        }
        else if ('sporty' == _val){
            
        }
        else if ('sexual' == _val){
            
        }
        else if ('travelling' == _val){
            
        }
        else if ('gangsta' == _val){
            
        }
        else if ('trendy' == _val){
            
        }
        else if ('tgif' == _val){
            
        }
        else if ('kawai' == _val){
            
            
        }


    });

$("#board button")
  .each(function(i) {
    if (i != 0) {
      $("#sound")
        .clone()
        .attr("id", "sound" + i)
        .appendTo($(this).parent());
    }
    $(this).data("beep", i);
  })
  .mouseenter(function() {
    console.log($(this).data('beep'))
    $("#sound" + $(this).data("beep"))[0].play();
  });
$("#sound").attr("id", "sound0");

    
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
        $('#sec-name').css('backgroundColor', 'rgba(0, 0, 0, 0.3)');
        $('#player').css('backgroundColor', 'rgba(0, 0, 0, 0.3)');
        $('.cls-2').css('fill', '#000');
        $('audio').attr('src', '');
        $('source').attr('src', '');
        clearInterval(IntervalGifAnim);
        clearInterval(musicNext);
        $('#heyhey').removeClass('show').addClass('hide');
        $('.gifs').removeClass('show').addClass('hide');
        $('.drop').remove();
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