$(document).ready(function() {
    // variable public
    var pagesBlack = ['sad', 'gangsta', 'kawai', 'rockstar'],
        colorRGB = ['rgb(255, 255, 255)', 'rgb(0, 0, 0)', 'rgba(255, 255, 255,0.3)'],
        playerAudio = $('audio')[0],
        clickPlay = 1,
        clickSound = 1,
        IntervalGifAnim,
        lestP,
        dataR,
        musicNext,
        noNext = 0;
    
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
            tracksName = [],
            ArtistName = [],
            el,
            max;
        // open page and function
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
                    if(data.tracks.items[q].track.preview_url != null) {
                        tracks.push(data.tracks.items[q].track.preview_url);
                        tracksName.push(data.tracks.items[q].track.name);
                        ArtistName.push(data.tracks.items[q].track.artists[0].name);
                    }
                }
                
                var nae = tracksName[el];
                var ars = ArtistName[el];
                var son = tracks[el];
                $('audio').attr('src', son);
                $('source').attr('src', son);
                $('#songName').text(nae);
                $('#artistName').text(ars);
                    if(noNext == 0) {
                    playerPlay('play'); 
                }
            }
            
            playerNext();
            
            musicNext = setInterval(playerNext, 30000);
            
            playerAudio.volume = 0.5;
            var pv = playerAudio.volume;
            
            var d = 118 % pv;
            $('#grabSB').css('left', d);
            $('#songName').text(nae);
        });
        
        var queues = function() {
            if($(this).attr('id') === 'previous')
                el = el > 0 ? el-1 : 0;
            else
                el = el < max ? el+1 : max;     

            son = tracks[el];
            nae = tracksName[el];
            ars = ArtistName[el];
            
            $('audio').attr('src', son);
            $('source').attr('src', son);
            playerPlay('play');
            $('#songName').text(nae);
            $('#artistName').text(ars);
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
                $('header a').css('color', colorRGB[0]);
                $('#time').css('color', colorRGB[0]);
                $('#date').css('color', colorRGB[0]);
                $('#sec-name').css('backgroundColor', colorRGB[2]);
                $('#player').css('backgroundColor', colorRGB[2]);
                $('.cls-2').css('fill', '#FFF');
            }
        }

        if ('glitter' == _val) {
            $('#gifabsolute').append(
                '<img id="gif1" class="gifs hide" />' +
                '<img id="gif2" class="gifs hide" />' +
                '<img id="gif3" class="gifs hide" />' +
                '<img id="gif4" class="gifs hide" />'
            );
            $('#gif1')
                .attr('src', 'asset/img/gif/glitter/1.gif')
                .removeClass('hide')
                .addClass('show'),
            $('#gif2')
                .attr('src', 'asset/img/gif/glitter/2.gif')
                .removeClass('hide')
                .addClass('show'),
            $('#gif3')
                .attr('src', 'asset/img/gif/glitter/3.gif')
                .removeClass('hide')
                .addClass('show'),
            $('#gif4')
                .attr('src', 'asset/img/gif/glitter/4.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('sad' == _val) {
            $('body').addClass('rain');
            // number of drops created.
            var nbDrop = 550; 

            // function to generate a random number range.
            function randRange( minNum, maxNum) {
              return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
            }

            // function to generate drops
            function createRain() {
                for(i = 1; i < nbDrop; i++) {
                var dropLeft = randRange(0, 1600);
                var dropTop = randRange(-1000, 1400);

                $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
                $('#drop' + i).css('left', dropLeft);
                $('#drop' + i).css('top', dropTop);
                }
            }
            // Make it rain
            createRain();
            
            $('#gifabsolute').append(
                '<img id="gif5" class="gifs hide" />' +
                '<img id="gif6" class="gifs hide" />' +
                '<img id="gif7" class="gifs hide" />'
            );
            
            $('#gif5')
                .attr('src', 'asset/img/gif/sad/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif6')
                .attr('src', 'asset/img/gif/sad/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif7')
                .attr('src', 'asset/img/gif/sad/3.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('happy' == _val) {
            $('#gifabsolute').append(
                '<img id="gif8" class="gifs hide" />' +
                '<img id="gif9" class="gifs hide" />' +
                '<img id="gif10" class="gifs hide" />'
            );
            $('#gif8')
                .attr('src', 'asset/img/gif/happy/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif9')
                .attr('src', 'asset/img/gif/happy/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif10')
                .attr('src', 'asset/img/gif/happy/3.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('dancing' == _val) {
            $('#gifabsolute').append(
                '<img id="gif11" class="gifs hide" />' +
                '<img id="gif12" class="gifs hide" />' +
                '<img id="gif13" class="gifs hide" />' +
                '<img id="gif14" class="gifs hide" />'
            );
            $('#gif11')
                .attr('src', 'asset/img/gif/dancing/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif12')
                .attr('src', 'asset/img/gif/dancing/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif13')
                .attr('src', 'asset/img/gif/dancing/3.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif14')
                .attr('src', 'asset/img/gif/dancing/4.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('chilling' == _val) {
            $('#gifabsolute').append(
                '<img id="gif15" class="gifs hide" />' +
                '<img id="gif16" class="gifs hide" />' 
            );
            $('#gif15')
                .attr('src', 'asset/img/gif/chilling/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif16')
                .attr('src', 'asset/img/gif/chilling/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('working' == _val) {
            $('#gifabsolute').append(
                '<img id="gif17" class="gifs hide" />' +
                '<img id="gif18" class="gifs hide" />' 
            );
            $('#gif17')
                .attr('src', 'asset/img/gif/working/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif18')
                .attr('src', 'asset/img/gif/working/2.gif')
                .removeClass('hide')
                .addClass('show');
            
        }
        else if ('sporty' == _val) {
            $('#gifabsolute').append(
                '<img id="gif19" class="gifs hide" />' +
                '<img id="gif20" class="gifs hide" />' +
                '<img id="gif21" class="gifs hide" />'
            );
            $('#gif19')
                .attr('src', 'asset/img/gif/sporty/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif20')
                .attr('src', 'asset/img/gif/sporty/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif21')
                .attr('src', 'asset/img/gif/sporty/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
        
        else if ('sexual' == _val) {
            $('body').addClass('bg_heart');
            $('#gifabsolute').append(
                '<img id="gif22" class="gifs hide" />' +
                '<img id="gif23" class="gifs hide" />' 
            );
            $('#gif22')
                .attr('src', 'asset/img/gif/sexual/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif23')
                .attr('src', 'asset/img/gif/sexual/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
        
        else if ('travelling' == _val) {
            $('#gifabsolute').append(
                '<img id="gif24" class="gifs hide" />' +
                '<img id="gif25" class="gifs hide" />' +
                '<img id="gif26" class="gifs hide" />'
            );
            $('#gif24')
                .attr('src', 'asset/img/gif/travel/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif25')
                .attr('src', 'asset/img/gif/travel/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif26')
                .attr('src', 'asset/img/gif/travel/3.gif')
                .removeClass('hide')
                .addClass('show');
        }
        
        else if ('gangsta' == _val) {
            $('#gifabsolute').append(
                '<img id="gif27" class="gifs hide" />' +
                '<img id="gif28" class="gifs hide" />' 
            );
            $('#gif27')
                .attr('src', 'asset/img/gif/gangsta/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif28')
                .attr('src', 'asset/img/gif/gangsta/2.gif')
                .removeClass('hide')
                .addClass('show');    
        }
        
        else if ('trendy' == _val) {
            $('#gifabsolute').append(
                '<img id="gif29" class="gifs hide" />' +
                '<img id="gif30" class="gifs hide" />' +
                '<img id="gif31" class="gifs hide" />'
            );
            $('#gif29')
                .attr('src', 'asset/img/gif/trendy/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif30')
                .attr('src', 'asset/img/gif/trendy/2.gif')
                .removeClass('hide')
                .addClass('show');
             $('#gif31')
                .attr('src', 'asset/img/gif/trendy/3.gif')
                .removeClass('hide')
                .addClass('show');       
        }
        else if ('tgif' == _val) {
            $('#gifabsolute').append(
                '<img id="gif32" class="gifs hide" />' +
                '<img id="gif33" class="gifs hide" />' 
            );
            $('#gif32')
                .attr('src', 'asset/img/gif/tgif/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif33')
                .attr('src', 'asset/img/gif/tgif/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
        else if ('kawai' == _val) {
            $('#gifabsolute').append(
                '<img id="gif34" class="gifs hide" />' +
                '<img id="gif35" class="gifs hide" />' +
                '<img id="gif36" class="gifs hide" />'
            );
            $('#gif34')
                .attr('src', 'asset/img/gif/kawai/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif35')
                .attr('src', 'asset/img/gif/kawai/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif36')
                .attr('src', 'asset/img/gif/kawai/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
            
        else if ('rockstar' == _val) {
            $('#gifabsolute').append(
                '<img id="gif37" class="gifs hide" />' +
                '<img id="gif38" class="gifs hide" />' 
            );
            $('#gif37')
                .attr('src', 'asset/img/gif/rockstar/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif38')
                .attr('src', 'asset/img/gif/rockstar/2.gif')
                .removeClass('hide')
                .addClass('show');

        }
            
        else if ('jazzy' == _val) {
            $('#gifabsolute').append(
                '<img id="gif39" class="gifs hide" />' +
                '<img id="gif40" class="gifs hide" />'
            );
            $('#gif39')
                .attr('src', 'asset/img/gif/jazzy/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif40')
                .attr('src', 'asset/img/gif/jazzy/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
            
        else if ('country' == _val) {
            $('#gifabsolute').append(
                '<img id="gif41" class="gifs hide" />' 
            );

            $('#gif41')
                .attr('src', 'asset/img/gif/country/1.gif')
                .removeClass('hide')
                .addClass('show');
        }
            
        else if ('blessed' == _val) {
            $('#gifabsolute').append(
                '<img id="gif42" class="gifs hide" />' +
                '<img id="gif43" class="gifs hide" />' +
                '<img id="gif44" class="gifs hide" />' +
                '<img id="gif45" class="gifs hide" />' 
            );
            $('#gif42')
                .attr('src', 'asset/img/gif/blessed/1.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif43')
                .attr('src', 'asset/img/gif/blessed/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif44')
                .attr('src', 'asset/img/gif/blessed/2.gif')
                .removeClass('hide')
                .addClass('show');
            $('#gif45')
                .attr('src', 'asset/img/gif/blessed/2.gif')
                .removeClass('hide')
                .addClass('show');
        }
            
        else if ('s80' == _val) {
            $('#gifabsolute').append(
                '<img id="gif46" class="gifs hide" />' 
            );
            $('#gif46')
                .attr('src', 'asset/img/gif/s80/1.gif')
                .removeClass('hide')
                .addClass('show');
        }
            
        else if ('s90' == _val) {

        }

        else if ('s2000' == _val) {

        }
    });

    $('#board button').each(function(i) {
        if(i != 0) {
            $('#sound')
                .clone()
                .attr('id', 'sound' + i)
                .appendTo($(this).parent());
        }
        $(this).data('beep', i);
    }).mouseenter(function() {
        $('#sound' + $(this).data('beep'))[0].play();
    });

    $('#sound').attr('id', 'sound0');

    $('#return').click(function() {
        $('main').show();
        $('section').addClass('none').hide();
        $('img#rdm').attr('src', '').attr('alt', 'moodtube');
        $('#rs').empty();
        $('body').removeClass();
        $('header a').css('color', colorRGB[1]);
        $('#time').css('color', colorRGB[1]);
        $('#date').css('color', colorRGB[1]);
        playerPlay('pause');
        $('#songName').empty();
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
        $('#gifabsolute').empty();

    });

    
    
    $('#playPause').click(function() {
        if(clickPlay == 1) {
            playerPlay('pause');
            clickPlay = 0;
            noNext = 1;
            $(this).css('background-image', 'url(asset/img/play.svg)');
        }
        
        else if(clickPlay == 0) {
            playerPlay('play');
            clickPlay = 1;
            noNext = 2;
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