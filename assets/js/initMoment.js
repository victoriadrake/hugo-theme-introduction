$(document).ready(function() {
    var update_localtime = function(){
        var time = moment().tz("{{ .Site.Params.home.timeZone }}").format("{{ .Site.Params.home.timeFormat }}");
        $("#time").html(time);
    }
    update_localtime();
    {{if gt .Site.Params.home.timeUpdatePeriod 0}} setInterval(update_localtime, {{ .Site.Params.home.timeUpdatePeriod }}); {{end}}
})
