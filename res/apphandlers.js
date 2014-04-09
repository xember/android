$(document).ready(function() {

    /* disable copy past in application */
    document.documentElement.style.webkitTouchCallout = "none";
    document.documentElement.style.webkitUserSelect = "none";

    /* prevent vertical scrolling */
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    var chart = new d3gauge1(".gauge1", {
        width: 100,
        height: 110,
        duration: 750,
        bgWidth: 20,
        bgColor: "#ddd",
        arcWidth: 20,
        arcColors: ["#005ABB", "red"],
        thresholds: [1],
        valueColor: "black",
        valueSize: 24,
        maxValue: 60,
        needleColor: "black",
        needleCenterColor: "white",
        needleLength: 75,
        needleWidth: 3
    });

    setInterval(function() {
        if (typeof($('body').data('stats')) !== "undefined") {
            if ($('body').data('stats').hasOwnProperty('RehousingLongestWaitTime')) {
                chart.render($('body').data('stats')['RehousingLongestWaitTime']);
            }
        }
    }, 500);

    /*phonegap eventlistner*/
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        document.addEventListener("pause", onPause, false);
        document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);
        document.addEventListener("resume", onResume, false);
    }


    function onPause() {
        rts.exit();
    }

    function onBackKeyDown() {

    }

    function onMenuKeyDown() {

    }

    function onResume() {
        rts.system(true);
    }

    //calculate total waiting calls

    setInterval(function() {
        var totalwaiting = parseInt($('body').data('stats')['RehousingWaiting']) + parseInt($('body').data('stats')['OutageWaiting']) + parseInt($('body').data('stats')['OtherWaiting']) + parseInt($('body').data('stats')['MeteringWaiting']) + parseInt($('body').data('stats')['InvoicesWaiting']) + parseInt($('body').data('stats')['ConnectionsWaiting']) + parseInt($('body').data('stats')['ComplaintsWaiting']);
        $("#currwait").text(totalwaiting);
        $("#avwt").text(Math.round(totalwaiting / 7));
        var totalabandoned = parseInt($('body').data('stats')['ComplaintsEntered']);
        $("#totab").text(totalabandoned);
    }, 100);

    $("#rtb").hammer().on("touch", function(event) {
        event.gesture.preventDefault();
        $(".rightmenu").toggle("slide", {
            direction: "right"
        }, 250);
        $("#rtb").toggle(function() {
            $(".container").animate({
                left: "-=14%",
            }, 250);
        }, function() {
            $(".container").animate({
                left: "+=14%",
            }, 250);
        });
    });

}); /* end of document ready function */