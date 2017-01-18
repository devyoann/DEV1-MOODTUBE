$(document).ready(function() {
    $('.glitter').click(function() {
        $('main').hide();
        $('#glitter').show();
        $('body').css('backgroundColor', 'aqua');
    });
    
    $('.button').hover(
        function() {
            $('#vbutton').text(
                $(this).text()
            );
        }, function() {
            $('#vbutton').empty();
        }
    );
});