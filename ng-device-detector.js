(function(angular) {
"use strict";
angular.module("ng.deviceDetector",[])
.factory("deviceDetector", [
	function () {
		var ua=navigator.userAgent;
		var deviceInfo = {
		    raw: {
		        userAgent: ua,
				os:{
						windows:/\bWindows\b/.test(ua),
						mac:/\bMacOS\b/.test(ua),
						linux:/\bLinux\b/.test(ua),
						unix:/\bUNIX\b/.test(ua),
						android:/\bAndroid\b/.test(ua),
				},
				browser:{
					chrome:/\bChrome\b/.test(ua),
					firefox:/\Firefox\b/.test(ua),
					safari:/\Safari\b/.test(ua),
					opera:/\Opera\b/.test(ua),
					ie:/\bMSIE\b/.test(ua) || /\Trident\b/.test(ua),
				},
				device:{
					android:/\bAndroid\b/.test(ua),
					ipad:/\biPad\b/.test(ua),
					iphone:/\biPhone\b/.test(ua),
					blackberry:/\bblackberry\b/.test(ua),
				}
			}
		};

	    deviceInfo.os = deviceInfo.raw.os.windows ? "windows" :
	        (deviceInfo.raw.os.mac ? "mac" :
	            (deviceInfo.raw.os.linux ? "linux" :
	                (deviceInfo.raw.os.unix ? "unix" :
	                    (deviceInfo.raw.os.android ? "android" : "unknown"))));
	    deviceInfo.browser = deviceInfo.raw.browser.ie ? "ie" :
	        (deviceInfo.raw.browser.opera ? "opera" :
	            (deviceInfo.raw.browser.chrome ? "chrome" :
	                (deviceInfo.raw.browser.firefox ? "firefox" :
	                    (deviceInfo.raw.browser.safari ? "safari" : "unknown"))));
	    deviceInfo.device = deviceInfo.raw.device.android ? "android" :
	        (deviceInfo.raw.device.iphone ? "iphone" :
	            (deviceInfo.raw.device.ipad ? "ipad" :
	                (deviceInfo.raw.device.blackberry ? "blackberry" : "unknown")));
	    
		return deviceInfo;
	}
])
.directive('deviceDetector', ["deviceDetector",function (deviceDetector) {
	return {
		restrict: "A",
		link: function (scope, elm, attrs) {
			elm.addClass('os-'+deviceDetector.os);
			elm.addClass('browser-'+deviceDetector.browser);
			elm.addClass('device-'+deviceDetector.device);
		}
	};
}]);
})(angular);