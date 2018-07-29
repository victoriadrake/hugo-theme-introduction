$(document).ready(function() {
    var time = moment().tz("{{ .Site.Params.home.timeZone }}").format("h:mm A");
    $("#time").html(time);
})
