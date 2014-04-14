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
        navigator.app.exitApp();
    }

    function onMenuKeyDown() {
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            $(".container").animate({
                left: "-14%",
            }, 250);
            $(".rightmenu").animate({
                right: "0%",
            }, 250);
            console.log("rm 0% ; container -14%")
        } else {
            $(".container").animate({
                left: "0%",
            }, 250);
            $(".rightmenu").animate({
                right: "-14%",
            }, 250);
        }
    }

    function onResume() {
        rts.system(true);
    }

    //Interval functions

    setInterval(function() {
        var pasttotalwaiting = parseInt($("#totalwaiting").text());
        var totalwaiting = parseInt($('body').data('stats')['RehousingWaiting']) + parseInt($('body').data('stats')['OutageWaiting']) + parseInt($('body').data('stats')['OtherWaiting']) + parseInt($('body').data('stats')['MeteringWaiting']) + parseInt($('body').data('stats')['InvoicesWaiting']) + parseInt($('body').data('stats')['ConnectionsWaiting']) + parseInt($('body').data('stats')['ComplaintsWaiting']);

        if (parseInt(totalwaiting) > parseInt(pasttotalwaiting)) {
            $("#bad").hide();
            $("#good").show();
        } else if (parseInt(totalwaiting) == parseInt(pasttotalwaiting)) {} else {
            $("#bad").show();
            $("#good").hide();
        }

        $(".currwait").text(totalwaiting);
        $(".avwt").text(Math.round(totalwaiting / 7));
        var totalabandoned = parseInt($('body').data('stats')['ComplaintsEntered']);
        $("#totab").text(totalabandoned);
    }, 100);

    setInterval(function() {
        if (typeof($('body').data('stats')) !== "undefined") {
            if ($('body').data('stats').hasOwnProperty('RehousingLongestWaitTime')) {
                chart.render($('body').data('stats')['RehousingLongestWaitTime']);
            }
        }
    }, 500);

    //rightmenu handlers

    $("#rtb").hammer().on("touch", function(event) {
        event.gesture.preventDefault();
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            $(".container").animate({
                left: "-14%",
            }, 250);
            $(".rightmenu").animate({
                right: "0%",
            }, 250);
            console.log("rm 0% ; container -14%")
        } else {
            $(".container").animate({
                left: "0%",
            }, 250);
            $(".rightmenu").animate({
                right: "-14%",
            }, 250);
        }
    });


    $(".rightmenu, .sidespace").hammer().on("dragright", {
        drag_min_distance: -1,
        drag_max_touches: 1
    }, function(event) {
        event.gesture.preventDefault();
        $(".container").animate({
            left: "0%",
        }, 250);
        $(".rightmenu").animate({
            right: "-14%",
        }, 250);
        event.gesture.stopDetect();
    });

    $(".sidespace").hammer().on("dragleft", {
        drag_min_distance: -1,
        drag_max_touches: 1
    }, function(event) {
        event.gesture.preventDefault();
        $(".container").animate({
            left: "-14%",
        }, 250);
        $(".rightmenu").animate({
            right: "0%",
        }, 250);
        event.gesture.stopDetect();
    });


    //royal slider
    $('.royalSlider').royalSlider({
        autoHeight: false,
        arrowsNav: false,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        controlNavigation: 'none',
        imageScaleMode: 'none',
        imageAlignCenter: false,
        loop: false,
        loopRewind: true,
        numImagesToPreload: 6,
        keyboardNavEnabled: true,
        usePreloader: false,
        loop: true,
        slidesSpacing: 0
    });

    //get INITIAL middleheigt for determain table element heights
    $(window).trigger('resize');

    //barcharts
    var bar1 = d3BarChart("#bar1", {
        height: $(".graphblock").height() * .5,
        width: $(".graphblock").width() * .5,
        threshold: [12, 23, 16, 39, 24, 49, 32],
        thresholdcolor: "#F9631C",
        thresholdwidth: 1,
        duration: 750,
        bgWidth: 30,
        bgColor: "lightblue",
        bgbarWidth: ($(".graphblock").width() / 100) * 2.7,
        barColor: "#0066AE",
        barRounding: 3,
        barWidth: ($(".graphblock").width() / 100) * 2.7,
        spacer: ($(".graphblock").width() / 100) * 4.7
    });


    var bar2 = d3BarChart("#bar2", {
        height: $(".graphblock").height() * .5,
        width: $(".graphblock").width() * .5,
        threshold: [12, 23, 16, 39, 24, 49, 32],
        thresholdcolor: "#F9631C",
        thresholdwidth: 1,
        duration: 750,
        bgWidth: 30,
        bgColor: "lightblue",
        bgbarWidth: ($(".graphblock").width() / 100) * 2.7,
        barColor: "#0066AE",
        barRounding: 3,
        barWidth: ($(".graphblock").width() / 100) * 2.7,
        spacer: ($(".graphblock").width() / 100) * 4.7
    });

    setInterval(function() {
        bar1.render([parseInt($('body').data('stats')['RehousingWaiting']), parseInt($('body').data('stats')['OutageWaiting']), parseInt($('body').data('stats')['OtherWaiting']), parseInt($('body').data('stats')['MeteringWaiting']), parseInt($('body').data('stats')['InvoicesWaiting']), parseInt($('body').data('stats')['ConnectionsWaiting']), parseInt($('body').data('stats')['ComplaintsWaiting'])]);
        bar2.render([parseInt($('body').data('stats')['RehousingWaiting']), parseInt($('body').data('stats')['OutageWaiting']), parseInt($('body').data('stats')['OtherWaiting']), parseInt($('body').data('stats')['MeteringWaiting']), parseInt($('body').data('stats')['InvoicesWaiting']), parseInt($('body').data('stats')['ConnectionsWaiting']), parseInt($('body').data('stats')['ComplaintsWaiting'])]);
    }, 1000);


}); /* end of document ready function */

//get RESIZE middleheigt for determain table element heights

$(window).on('resize', function() {
    var middleheight = $(".middle").height();
    $(".slidetable").height(middleheight);
    $(".graphblock").height(middleheight / 3);
});