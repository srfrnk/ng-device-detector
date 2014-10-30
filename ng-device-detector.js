(function(angular) {
"use strict";
angular.module("ng.deviceDetector",[])
.constant("BROWSERS", {
    CHROME: "chrome",
    FIREFOX: "firefox",
    SAFARI: "safari",
    OPERA: "opera",
    IE: "ie",
    UNKNOWN: "unknown"
})
.constant("DEVICES", {
    ANDROID: "android",
    IPAD: "ipad",
    IPHONE: "iphone",
    IPOD: "ipod",
    BLACKBERRY: "blackberry",
    FIREFOXOS: "firefoxos",
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
    UNKNOWN: "unknown"
})
.service("detectUtils", ["deviceDetector", "DEVICES", "BROWSERS", "OS",
    function(deviceDetector, DEVICES, BROWSERS, OS) {
        var deviceInfo = deviceDetector;

        this.isMobile = function () {
            return deviceInfo.device !== 'unknown';
        };

        this.isAndroid = function(){
            return (deviceInfo.device === DEVICES.ANDROID || deviceInfo.OS === OS.ANDROID);
        }

        this.isIOS = function(){
            return (deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.IPOD || deviceInfo.device === DEVICES.IPHONE);
        }
    }
])
.factory("deviceDetector", ["$window", "DEVICES", "BROWSERS", "OS",
	function ($window, DEVICES, BROWSERS, OS) {
		var ua=$window.navigator.userAgent;

		var deviceInfo = {
		    raw: {
		        userAgent: ua,
				os:{
					windows:/\bWindows\b/.test(ua),
					mac:/\bMac OS\b/.test(ua),
					ios:/\biPad\b/.test(ua) || /\biPhone\b/.test(ua) || /\biPod\b/.test(ua),
					android:/\bAndroid\b/.test(ua),
					linux:/\bLinux\b/.test(ua),
					unix:/\bUNIX\b/.test(ua),
					firefoxos:/\bFirefox\b/.test(ua) && /\Mobile\b/.test(ua)
				},
				browser:{
					chrome:/\bChrome\b/.test(ua) || /\bCriOS\b/.test(ua),
					firefox:/\Firefox\b/.test(ua),
					safari:/^((?!CriOS).)*\Safari\b.*$/.test(ua),
					opera:/\Opera\b/.test(ua),
					ie:/\bMSIE\b/.test(ua) || /\Trident\b/.test(ua)
				},
				device:{
					android:/\bAndroid\b/.test(ua),
					ipad:/\biPad\b/.test(ua),
					iphone:/\biPhone\b/.test(ua),
					ipod:/\biPod\b/.test(ua),
					blackberry:/\bblackberry\b/.test(ua),
					firefoxos:/\bFirefox\b/.test(ua) && /\Mobile\b/.test(ua)
				}
			}
		};

	    deviceInfo.os = deviceInfo.raw.os.windows ? OS.WINDOWS :
        	(deviceInfo.raw.os.ios ? OS.IOS :
	        	(deviceInfo.raw.os.mac ? OS.MAC :
		            (deviceInfo.raw.os.android ? OS.ANDROID :
		                (deviceInfo.raw.os.unix ? OS.UNIX :
		                    (deviceInfo.raw.os.linux ? OS.LINUX :
		                        (deviceInfo.raw.os.firefoxos ? OS.FIREFOXOS : OS.UNKNOWN))))));
	    deviceInfo.browser = deviceInfo.raw.browser.ie ? BROWSERS.IE :
	        (deviceInfo.raw.browser.opera ? BROWSERS.OPERA :
	            (deviceInfo.raw.browser.chrome ? BROWSERS.CHROME :
	                (deviceInfo.raw.browser.firefox ? BROWSERS.FIREFOX :
	                    (deviceInfo.raw.browser.safari ? BROWSERS.SAFARI : BROWSERS.UNKNOWN))));
	    deviceInfo.device = deviceInfo.raw.device.android ? DEVICES.ANDROID :
	        (deviceInfo.raw.device.iphone ? DEVICES.IPHONE :
	            (deviceInfo.raw.device.ipad ? DEVICES.IPAD :
		            (deviceInfo.raw.device.ipod ? DEVICES.IPOD :
		                (deviceInfo.raw.device.blackberry ? DEVICES.BLACKBERRY :
		                    (deviceInfo.raw.device.firefoxos ? DEVICES.FIREFOXOS : DEVICES.UNKNOWN)))));
	    
		return deviceInfo;
	}
])
.directive('deviceDetector', ["deviceDetector",function (deviceDetector) {
	return {
		restrict: "A",
		link: function (scope, elm/*, attrs*/) {
			elm.addClass('os-'+deviceDetector.os);
			elm.addClass('browser-'+deviceDetector.browser);
			elm.addClass('device-'+deviceDetector.device);
		}
	};
}]);
})(angular);
