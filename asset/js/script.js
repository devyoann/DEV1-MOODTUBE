$(document).ready(function() {
    $('.button').hover(function() {
        $('#vbutton').text(
            $(this).val()
        );
    }, function() {
        $('#vbutton').empty();
    });

    $('.button').click(function() {
        var randomGif,
            _val = $(this).val(),
            sectionId = 'section.' + _val;

        $('main').hide();
        $('section').addClass(_val);
        $('section').attr('id', _val);
        $(sectionId).show();
        $('#return').text(_val);

        getGiphy(_val, function(data){
            console.log(data);
            randomGif = Math.floor(Math.random() * data.data.length) + 1;
            $('#rs').append(randomGif);
            $('img#rdm').attr('src', data.data[randomGif].images.downsized.url);
            $('img#rdm').attr('alt', _val);
            $('#rs').append($('img#rdm').attr('src'));
        });
    });

    $('#return').click(function() {
        $('main').show();
        $('section').hide();
        $('img#rdm').attr('src', '');
        $('#rs').empty();
    });
});