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
        colorBlack = 'rgb(0, 0, 0)';
    
    $('.button').click(function() {
        var randomGif,
            _val = $(this).val(),
            sectionClass = 'section.' + _val,
            sectionId = 'section#' + _val,
            backgroundId;

        $('main').hide();
        $('section').addClass(_val);
        $('body').addClass('section ' + _val);
        $('section').attr('id', _val);
        $(sectionId).show();
        $('#sec-Name').text($(this).text());
        $(sectionClass).show();
        
        getGiphy(_val, function(data){
            console.log(data);
            var gifAnim = function() {
                randomGif = Math.floor(Math.random() * data.data.length) + 1;
                $('img#rdm').attr('src', data.data[randomGif].images.downsized.url);
                $('img#rdm').attr('alt', _val);
            }
            
            gifAnim();
            setInterval(gifAnim, 5000);
        });
        
        for(var i=0; i < pageBlack.length; i++) {
            if(pageBlack[i] == _val) {
                $('header a').css('color', colorWhite);
                $('#time').css('color', colorWhite);
                $('#date').css('color', colorWhite);
            }
        }
    });
    
    $('#return').click(function() {
        $('main').show();
        $('section').hide();
        $('img#rdm').attr('src', '');
        $('#rs').empty();
        $('body').removeClass();
        $('header a').css('color', colorBlack);
        $('#time').css('color', colorBlack);
        $('#date').css('color', colorBlack);
    });
});