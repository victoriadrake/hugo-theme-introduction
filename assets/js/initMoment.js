$(document).ready(function() {
    var time = moment().tz("{{ .Site.Params.home.timeZone }}").format("{{ .Site.Params.home.timeFormat }}");
    $("#time").html(time);
})
