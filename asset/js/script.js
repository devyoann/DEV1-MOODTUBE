$(document).ready(function() {
    $('.glitter').click(function() {
        $('main').hide();
        $('#glitter').show();
        $('body').css('backgroundColor', '#ffbce4');
    });
    
    $('#back').click(function(){
        $('#glitter').hide();
        $('main').show();
        $('body').css('backgroundColor', 'whitesmoke');
    });
    
    $('.button').hover(
        function() {
            $('#vbutton').text(
                $(this).text()
            );
        }, function() {
            $('#vbutton').text('');
        }
    );
});