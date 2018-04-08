// animation of hamburger class on click
$('#hamburger-button').click(function () {
    if ($('#menu').position().left == 0) { // work around
        $('#menu').animate({
            left: '-250px'
        });
        $('#content').animate({
            left: '0',
            width: '100%'
        });
    } else {
        $('#menu').animate({
            left: '0'
        });
        $('#content').animate({
            left: '250px',
            width: '-=250px'
        });
    }
});

