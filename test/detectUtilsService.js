describe("detectUtils", function () {
    var deviceDetector,
        osConstant,
        browserConstant,
        deviceConstant,
        util;

    function loadDetector(userAgent) {
        module("ng.deviceDetector");
        inject(["$window", function ($window) {
            var __originalNavigator = $window.navigator;
            $window.navigator = {};
            if ($window.navigator !== __originalNavigator) {
                $window.navigator.__proto__ = __originalNavigator;
            }
            $window.navigator.__defineGetter__('userAgent', function () {
                return userAgent;
            });
        }]);
        inject(["deviceDetector", "detectUtils", "DEVICES", "BROWSERS", "OS", function (deviceDetectorI, detectUtils, DEVICES, BROWSERS, OS) {
            deviceDetector = deviceDetectorI;
            osConstant = OS;
            browserConstant = BROWSERS;
            deviceConstant = DEVICES;
            util = detectUtils;
        }]);
    }

    describe("with ios user-agent", function () {
        function describeUserAgent(userAgent, os, browser, device) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should return true for iOS", function () {
                    expect(util.isIOS()).toBeTruthy();
                });

                it("should return true for isMobile ", function () {
                    expect(util.isMobile()).toBeTruthy();
                });

                it("should return false for isAndroid ", function () {
                    expect(util.isAndroid()).toBeFalsy();
                });
            });
        }

        // Safari
        describeUserAgent("Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
            "ios", "safari", "ipad");
    });

    describe("with andriod user-agent", function () {
        function describeUserAgent(userAgent, os, browser, device) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should return false for iOS", function () {
                    expect(util.isIOS()).toBeFalsy();
                });

                it("should return true for isMobile ", function () {
                    expect(util.isMobile()).toBeTruthy();
                });

                it("should return true for isAndroid ", function () {
                    expect(util.isAndroid()).toBeTruthy();
                });
            });
        }

        // Android
        describeUserAgent("Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
            "android", "chrome", "android");
    });

    describe("with desktop chrome user-agent", function () {
        function describeUserAgent(userAgent, os, browser, device) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should return false for iOS", function () {
                    expect(util.isIOS()).toBeFalsy();
                });

                it("should return false for isMobile ", function () {
                    expect(util.isMobile()).toBeFalsy();
                });

                it("should return false for isAndroid ", function () {
                    expect(util.isAndroid()).toBeFalsy();
                });
            });
        }

        // Chrome
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "chrome", "unknown");
    });

    describe("with windows phone user-agent", function () {
        function describeUserAgent(userAgent, os, browser, device) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should return false for iOS", function () {
                    expect(util.isIOS()).toBeFalsy();
                });

                it("should return true for isMobile ", function () {
                    expect(util.isMobile()).toBeTruthy();
                });

                it("should return false for isAndroid ", function () {
                    expect(util.isAndroid()).toBeFalsy();
                });
            });
        }

        // Windows phone
        describeUserAgent("Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 930) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537",
            "windows-phone", "ie", "windows-phone");
    });
});
