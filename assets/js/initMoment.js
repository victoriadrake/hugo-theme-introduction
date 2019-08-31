$(document).ready(function() {
    const tnode = $("#time")
    const update_localtime = function(){
        var time = moment()
            .tz(tnode.attr("data-time-zone"))
            .format(tnode.attr("data-time-format"));
        tnode.html(time);
    }
    update_localtime();
    setInterval(update_localtime, 1000);
})
