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
    $($(this).attr('data-target')).addClass('is-active');
    $("html").addClass("modal-open");
});
$('.modal-close').click(function () {
    $($(this).attr('data-target')).removeClass('is-active');
    $("html").removeClass("modal-open");
});
$(document).keypress(function(e) {
    if(e.which == 0) {
        $('.modal.is-active').removeClass('is-active');
    }
});

{{ if .Site.Params.localTime }}
$(document).ready(function() {
    var time = moment().tz("{{ .Site.Params.timeZone }}").format("h:mm A");
    $('#time').html(time);
})
{{ end }}
