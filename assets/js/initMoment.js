$(document).ready(function() {
    const tnode = $("#time")
    const update_localtime = function(){
        var time = moment()
            .tz(tnode.attr("data-time-zone"))
            .format(tnode.attr("data-time-format"));
        tnode.html(time);
    }
    update_localtime();
    const refresh = Number(tnode.attr("data-refresh"))
    if (refresh > 0) {
        setInterval(update_localtime, refresh);
    }    
})