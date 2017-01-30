$(document).ready(function() {
    $('.button').hover(function() {
        $('#vbutton').text(
            $(this).val()
        );
    }, function() {
        $('#vbutton').empty();
    });

    var pageBlack = ['sad', 'gangsta', 'kaway', 'rockstar'],
        colorWhite = 'rgb(255, 255, 255)',
        colorBlack = 'rgb(0, 0, 0)',
        IntervalGifAnim;
    
    $('.button').click(function() {
        var randomGif,
            _val = $(this).val(),
            sectionClass = 'section.' + _val,
            sectionId = 'section#' + _val,
            backgroundId,
            i;

        $('main').hide();
        $('section').addClass(_val);
        $('body').addClass('section ' + _val);
        $('section').attr('id', _val);
        $(sectionClass).show();
        
        $(sectionId).show();
        $('#sec-Name').text(_val);

        getGiphy(_val, function(data){
            console.log(data);
            var gifAnim = function() {
                randomGif = Math.floor(Math.random() * data.data.length) + 1;
                $('img#rdm').attr('src', data.data[randomGif].images.downsized.url);
                $('img#rdm').attr('alt', _val);
            }
            
            gifAnim();
            
            IntervalGifAnim = setInterval(gifAnim, 5000);
        });
        
        for(i = 0; i < pageBlack.length; i++) {
            if(pageBlack[i] == _val) {
                $('header a').css('color', colorWhite);
                $('#time').css('color', colorWhite);
                $('#date').css('color', colorWhite);
            }
        }

        if ('glitter' == _val){
            $('#gif1').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif1').removeClass('hide').addClass('show');
            $('#gif3').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif3').removeClass('hide').addClass('show');
        }
        else if ('sad' == _val){
            $('#gif1').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif1').removeClass('hide').addClass('show');
            $('#gif2').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif2').removeClass('hide').addClass('show');
        }
        else if ('happy' == _val){
            $('#gif1').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif1').removeClass('hide').addClass('show');
            $('#gif2').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif2').removeClass('hide').addClass('show');
        }
        else if ('dancing' == _val){
            $('#gif1').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif1').removeClass('hide').addClass('show');
            $('#gif2').attr('src', 'asset/img/gif/Sad/cry.gif');
            $('#gif2').removeClass('hide').addClass('show');
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
        $('section').hide();
        $('img#rdm').attr('src', '');
        $('#rs').empty();
        $('body').removeClass();
        $('header a').css('color', colorBlack);
        $('#time').css('color', colorBlack);
        $('#date').css('color', colorBlack);
        clearInterval(IntervalGifAnim);
        $('#heyhey').removeClass('show').addClass('hide');
        $('.gifs').removeClass('show').addClass('hide');
    });

});

