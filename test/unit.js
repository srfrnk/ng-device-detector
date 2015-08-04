describe("ng-device-detector", function () {
    var deviceDetector;

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

    describe("with user-agent", function () {

        function describeUserAgent(userAgent, os, os_version, browser, browser_version, device, isMobile, isTablet, isDesktop) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should detect os = " + os, function () {
                    expect(deviceDetector.os).toBe(os);
                });
                it("should detect os version = " + os_version, function () {
                    expect(deviceDetector.os_version).toBe(os_version);
                });
                it("should detect browser = " + browser, function () {
                    expect(deviceDetector.browser).toBe(browser);
                });
                it("should detect browser version= " + browser_version, function () {
                    expect(deviceDetector.browser_version).toBe(browser_version);
                });
                it("should detect device = " + device, function () {
                    expect(deviceDetector.device).toBe(device);
                });
                it("should have isMobile = " + isMobile, function () {
                    expect(deviceDetector.isMobile()).toBe(isMobile);
                });
                it("should have isTablet = " + isTablet, function () {
                    expect(deviceDetector.isTablet()).toBe(isTablet);
                });
                it("should have isDesktop = " + isDesktop, function () {
                    expect(deviceDetector.isDesktop()).toBe(isDesktop);
                });
            });
        }

// Chrome
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-8-1", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
            "mac", "unknown", "chrome", "32.0.1664.3", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21",
            "linux", "unknown", "chrome", "19.0.1042.0", "unknown", false, false, true);

// Firefox
        describeUserAgent("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
            "windows", "windows-xp", "firefox", "31.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
            "mac", "unknown", "firefox", "25.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0",
            "linux", "unknown", "firefox", "24.0", "unknown", false, false, true);

// Safari
        describeUserAgent("Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
            "ios", "unknown", "safari", "6.0", "ipad", true, true, false);
        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
            "mac", "unknown", "safari", "5.1.7", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+",
            "linux", "unknown", "safari", "5.0", "unknown", false, false, true);

// Issue #10
        describeUserAgent("Mozilla/5.0 (iPad; CPU OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/38.0.2125.59 Mobile/12A405 Safari/600.1.4 (000767)",
            "ios", "unknown", "chrome", "0", "ipad", true, true, false);

// Issue #14
        describeUserAgent("Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
            "windows-phone", "windows-phone-7-5", "ie", "9.0", "windows-phone", true, false, false);

// Issue #15
        describeUserAgent("Mozilla/5.0 (PlayStation 4 1.52) AppleWebKit/536.26 (KHTML, like Gecko)",
            "ps4", "unknown", "ps4", "0", "ps4", false, false, true);
        describeUserAgent("Mozilla/5.0 (Playstation Vita 1.61) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2",
            "vita", "unknown", "vita", "0", "vita", true, false, false);

// Issue #18
        describeUserAgent("Mozilla/5.0 (Win16; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-3-11", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 95; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-95", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Win95; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-95", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows_95; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-95", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Win 9x 4.90; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-me", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows ME; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-me", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 98; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-98", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Win98; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-98", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows CE; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-ce", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 5.0; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-2000", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 2000; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-2000", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 5.1; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-xp", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows XP; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-xp", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-server-2003", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-vista", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-7", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 7; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-7", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-8-1", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 8.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-8-1", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-8", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows 8; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-8", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 4.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-nt-4-0", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (WinNT4.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-nt-4-0", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (WinNT; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-nt-4-0", "chrome", "37.0.2049.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows", "windows-nt-4-0", "chrome", "37.0.2049.0", "unknown", false, false, true);

        describeUserAgent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 4.0)",
            "windows", "windows-nt-4-0", "ie", "6.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/4.0 (compatible; MSIE 6.0b; Windows NT 4.0)",
            "windows", "windows-nt-4-0", "ie", "6.0b", "unknown", false, false, true);
        describeUserAgent("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 4.0)",
            "windows", "windows-nt-4-0", "ie", "7.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 4.0)",
            "windows", "windows-nt-4-0", "ie", "10.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/4.0 (compatible; MSIE 11; Windows NT 4.0)",
            "windows", "windows-nt-4-0", "ie", "11", "unknown", false, false, true);

// Issue 21
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko",
            "windows", "windows-8-1", "ie", "11.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; rv:11.0) like Gecko",
            "windows", "windows-7", "ie", "11.0", "unknown", false, false, true);

// Issue 24
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36 OPR/29.0.1795.47",
            "windows", "windows-8-1", "opera", "29.0.1795.47", "unknown", false, false, true);

// Issue 27
        describeUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0",
            "windows", "windows-10", "ms-edge", "12.0", "unknown", false, false, true);
        describeUserAgent("Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Mobile Safari/537.36 Edge/12.0",
            "windows-phone", "windows-phone-10", "ms-edge", "12.0", "windows-phone", true, false, false);

// Issue 29
        describeUserAgent("Mozilla/5.0 (X11; CrOS x86_64 4731.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
            "chrome-os", "unknown", "chrome", "31.0.1650.63", "chrome-book", true, true, false);

// Issue 32
        describeUserAgent("Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 930) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537",
            "windows-phone", "windows-phone-8-1", "ie", "11.0", "windows-phone", true, false, false);
    });
});
