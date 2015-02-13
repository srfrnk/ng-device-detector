(function (angular) {
    "use strict";
    angular.module("ng.deviceDetector", [])
        .constant("BROWSERS", {
            CHROME: "chrome",
            FIREFOX: "firefox",
            SAFARI: "safari",
            OPERA: "opera",
            IE: "ie",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .constant("DEVICES", {
            ANDROID: "android",
            IPAD: "ipad",
            IPHONE: "iphone",
            IPOD: "ipod",
            BLACKBERRY: "blackberry",
            FIREFOXOS: "firefoxos",
            WINDOWSPHONE: "windows-phone",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .constant("OS", {
            WINDOWS: "windows",
            MAC: "mac",
            IOS: "ios",
            ANDROID: "android",
            LINUX: "linux",
            UNIX: "unix",
            FIREFOXOS: "firefoxos",
            WINDOWSPHONE: "windows-phone",
            PS4: "ps4",
            VITA: "vita",
            UNKNOWN: "unknown"
        })
        .service("detectUtils", ["deviceDetector", "DEVICES", "BROWSERS", "OS",
            function (deviceDetector, DEVICES, BROWSERS, OS) {
                var deviceInfo = deviceDetector;

                this.isMobile = function () {
                    return deviceInfo.device !== 'unknown';
                };

                this.isAndroid = function () {
                    return (deviceInfo.device === DEVICES.ANDROID || deviceInfo.OS === OS.ANDROID);
                };

                this.isIOS = function () {
                    return (deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.IPOD || deviceInfo.device === DEVICES.IPHONE);
                };
            }
        ])
        .factory("deviceDetector", ["$window", "DEVICES", "BROWSERS", "OS",
            function ($window, DEVICES, BROWSERS, OS) {

                var OS_RE={
                    WINDOWS:{and:[/\bWindows\b/,{not:/\bWindows Phone\b/}]},
                    MAC:/\bMac OS\b/,
                    IOS:{or:[/\biPad\b/,/\biPhone\b/,/\biPod\b/]},
                    ANDROID:/\bAndroid\b/,
                    LINUX:/\bLinux\b/,
                    UNIX:/\bUNIX\b/,
                    FIREFOXOS:{and:[/\bFirefox\b/,/Mobile\b/]},
                    WINDOWSPHONE:/\bIEMobile\b/,
                    PS4:/\bMozilla\/5.0 \(PlayStation 4\b/,
                    VITA:/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
                };

                var BROWSERS_RE={
                    CHROME:{or:[/\bChrome\b/,/\bCriOS\b/]},
                    FIREFOX:/\bFirefox\b/,
                    SAFARI:/^((?!CriOS).)*\Safari\b.*$/,
                    OPERA:/Opera\b/,
                    IE:{and:[/\bMSIE\b/,/\bTrident\b/]},
                    PS4:/\bMozilla\/5.0 \(PlayStation 4\b/,
                    VITA:/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
                };

                var DEVICES_RE={
                    ANDROID:/\bAndroid\b/,
                    IPAD:/\biPad\b/,
                    IPHONE:/\biPhone\b/,
                    IPOD:/\biPod\b/,
                    BLACKBERRY:/\bblackberry\b/,
                    FIREFOXOS:{and:[/\bFirefox\b/,/\bMobile\b/]},
                    WINDOWSPHONE:/\bIEMobile\b/,
                    PS4:/\bMozilla\/5.0 \(PlayStation 4\b/,
                    VITA:/\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
                };

                function test(string, regex) {
                    if (regex instanceof RegExp) {
                        return regex.test(string);
                    }
                    else if (regex && Array.isArray(regex.and)) {
                        return regex.and.every(function (item) {
                            return test(string,item);
                        });
                    }
                    else if (regex && Array.isArray(regex.or)) {
                        return regex.or.some(function (item) {
                            return test(string,item);
                        });
                    }
                    else if (regex && regex.not) {
                        return !test(string,regex.not);
                    }
                    else {
                        return false;
                    }
                }

                var ua = $window.navigator.userAgent;

                var deviceInfo = {
                    raw: {
                        userAgent: ua,
                        os: {},
                        browser: {},
                        device: {}
                    }
                };

                deviceInfo.raw.os=Object.keys(OS).reduce(function (obj,item) {
                    obj[OS[item]]=test(ua,OS_RE[item]);
                    return obj;
                },{});

                deviceInfo.raw.browser=Object.keys(BROWSERS).reduce(function (obj,item) {
                    obj[BROWSERS[item]]=test(ua,BROWSERS_RE[item]);
                    return obj;
                },{});

                deviceInfo.raw.device=Object.keys(DEVICES).reduce(function (obj,item) {
                    obj[DEVICES[item]]=test(ua,DEVICES_RE[item]);
                    return obj;
                },{});

                deviceInfo.os = [
                    OS.WINDOWS,
                    OS.IOS,
                    OS.MAC,
                    OS.ANDROID,
                    OS.LINUX,
                    OS.UNIX,
                    OS.FIREFOXOS,
                    OS.WINDOWSPHONE,
                    OS.PS4,
                    OS.VITA
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === OS.UNKNOWN && deviceInfo.raw.os[currentValue]) ? currentValue : previousValue;
                    }, OS.UNKNOWN);

                deviceInfo.browser = [
                    BROWSERS.CHROME,
                    BROWSERS.FIREFOX,
                    BROWSERS.SAFARI,
                    BROWSERS.OPERA,
                    BROWSERS.IE,
                    BROWSERS.PS4,
                    BROWSERS.VITA
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === BROWSERS.UNKNOWN && deviceInfo.raw.browser[currentValue]) ? currentValue : previousValue;
                    }, BROWSERS.UNKNOWN);

                deviceInfo.device = [
                    DEVICES.ANDROID,
                    DEVICES.IPAD,
                    DEVICES.IPHONE,
                    DEVICES.IPOD,
                    DEVICES.BLACKBERRY,
                    DEVICES.FIREFOXOS,
                    DEVICES.WINDOWSPHONE,
                    DEVICES.PS4,
                    DEVICES.VITA
                ].reduce(function (previousValue, currentValue) {
                        return (previousValue === DEVICES.UNKNOWN && deviceInfo.raw.device[currentValue]) ? currentValue : previousValue;
                    }, DEVICES.UNKNOWN);

                deviceInfo.isMobile = function () {
                    return [
                        DEVICES.ANDROID,
                        DEVICES.IPAD,
                        DEVICES.IPHONE,
                        DEVICES.IPOD,
                        DEVICES.BLACKBERRY,
                        DEVICES.FIREFOXOS,
                        DEVICES.WINDOWSPHONE,
                        DEVICES.VITA
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                deviceInfo.isTablet = function () {
                    return [
                        DEVICES.IPAD,
                        DEVICES.FIREFOXOS
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                deviceInfo.isDesktop = function () {
                    return [
                        DEVICES.PS4,
                        DEVICES.UNKNOWN
                    ].some(function (item) {
                            return deviceInfo.device == item;
                        });
                };

                return deviceInfo;
            }
        ])
        .directive('deviceDetector', ["deviceDetector", function (deviceDetector) {
            return {
                restrict: "A",
                link: function (scope, elm/*, attrs*/) {
                    elm.addClass('os-' + deviceDetector.os);
                    elm.addClass('browser-' + deviceDetector.browser);
                    elm.addClass('device-' + deviceDetector.device);
                }
            };
        }]);
})(angular);
