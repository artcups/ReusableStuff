var Reuseable = Reuseable || {};
Reuseable.eventlisteners = {};

Reuseable.eventlisteners.windowResizeListener = function () {
  var mobileMaxWidth = 767;
  var tabletMaxWidth = 959;

    var callbacks = {
        onMobileToTablet: [],
        onTabletToDesktopish: [],
        onDesktopishToTablet: [],
        onTabletToMobile: []
    };
    var lastWidth = $(window).width();

    function initialize() {
        $(window).on(
            "resize",
            function onWindowResize(e) {
                var width = $(this).width();

                if (width > mobileMaxWidth && !(lastWidth > mobileMaxWidth)) {
                    callbacks.onMobileToTablet.forEach(executeFunction);
                }
                else if (width > tabletMaxWidth && !(lastWidth > tabletMaxWidth)) {
                    callbacks.onTabletToDesktopish.forEach(executeFunction);
                }
                else if (width <= tabletMaxWidth && !(lastWidth <= tabletMaxWidth)) {
                    callbacks.onDesktopishToTablet.forEach(executeFunction);
                }
                else if (width <= mobileMaxWidth && !(lastWidth <= mobileMaxWidth)) {
                    callbacks.onTabletToMobile.forEach(executeFunction);
                }

                lastWidth = width;
            }
        );
    }

    function registerCallback(event, callback) {
        switch (event) {
            case "onMobileToTablet":
                callbacks.onMobileToTablet.push(callback);
                break;
            case "onTabletToDesktopish":
                callbacks.onTabletToDesktopish.push(callback);
                break;
            case "onDesktopishToTablet":
                callbacks.onDesktopishToTablet.push(callback);
                break;
            case "onTabletToMobile":
                callbacks.onTabletToMobile.push(callback);
                break;
        }
    }

    function executeFunction(fn) {
        fn();
    }

    return {
        initialize: initialize,
        registerCallback: registerCallback
    }
}
