$(document).ready(function() {
    var time = moment()
        .tz("{{ or .Site.Params.timeZone .Site.Params.home.timeZone }}")
        .format("{{ or .Site.Params.timeFormat .Site.Params.home.timeFormat }}");
    $("#time").html(time);
})
