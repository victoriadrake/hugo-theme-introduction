$(document).ready(function() {
    var time = moment().tz("{{ .Site.Params.timeZone }}").format("h:mm A");
    $('#time').html(time);
})
