$(document).ready(function() {
    $('.glitter').click(function() {
        $('main').hide();
        $('#player').show();
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