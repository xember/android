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

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        document.addEventListener("pause", onPause, false);
    }


    document.addEventListener("backbutton", onBackKeyDown, false);

    function onPause() {
        rts.exit();
    }

    function onBackKeyDown() {
        rts.exit();
    }

}); /* end of document ready function */