// Bitty scrolling links script
$('a[href^="#"]').click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 500);
    $("#nav-menu").removeClass("is-active");
    return true;
})

// Modal closer
$('.card').click(function () {
    $('#'+this.id+'.modal').addClass('is-active');
});
$('.modal-close').click(function () {
    $('#'+$(this).parent('.modal').get(0).id+'.modal').removeClass('is-active');
});
$(document).keypress(function(e) {
    if(e.which == 0) {
        $('.modal.is-active').removeClass('is-active');
    }
});
