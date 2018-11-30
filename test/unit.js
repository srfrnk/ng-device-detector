"use strict";

describe("ng-device-detector", function () {
    var deviceDetector;

    function loadDetector(userAgent, setup) {
        module("ng.deviceDetector", function (deviceDetectorProvider) {
            if (!!setup) {
                setup.apply(null, [deviceDetectorProvider]);
            }
        });
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
        inject(["deviceDetector", function (deviceDetectorI) {
            deviceDetector = deviceDetectorI;
        }]);
    }

    it("should load", function () {
        loadDetector("");
        expect(deviceDetector).not.toBeNull();
    });

    describe("with empty user-agent", function () {
        beforeEach(function () {
            loadDetector("");
        });

        it("should read empty", function () {
            expect(deviceDetector.raw.userAgent).toBe("");
        });
    });

    describe("with dummy user-agent", function () {
        beforeEach(function () {
            loadDetector("dummy");
        });

        it("should read dummy", function () {
            expect(deviceDetector.raw.userAgent).toBe("dummy");
        });
    });

    // Issue 72
    describe("Test custom UA string parsing", function () {
        it("Should parse the specified UA", function () {
            loadDetector("Custom", function(deviceDetectorProvider) {
                deviceDetectorProvider.addCustom('MY_CUSTOM', {
                    and: ['\\bCustom\\b']
                });
            });
            var deviceInfo = deviceDetector.parseUserAgent("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36 Custom");
            expect(deviceDetector.browser).toBe("unknown");
            expect(deviceDetector.os).toBe("unknown");
            expect(deviceDetector.device).toBe("unknown");
            expect(deviceInfo.os).toBe("windows");
            expect(deviceInfo.os_version).toBe("windows-8-1");
            expect(deviceInfo.browser).toBe("chrome");
            expect(deviceInfo.browser_version).toBe("37.0.2049.0");
            expect(deviceInfo.device).toBe("unknown");
            expect(deviceInfo.isMobile()).toBeFalsy();
            expect(deviceInfo.isTablet()).toBeFalsy();
            expect(deviceInfo.isDesktop()).toBeTruthy();
            expect(deviceDetector.custom.MY_CUSTOM).toBeTruthy();
        });
    });
});
