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
					ie:/\bMSIE\b/.test(ua) || /\Trident\b/.test(ua),
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

	    deviceInfo.os = deviceInfo.raw.os.windows ? "windows" :
        	(deviceInfo.raw.os.ios ? "ios" :
	        	(deviceInfo.raw.os.mac ? "mac" :
		            (deviceInfo.raw.os.android ? "android" :
		                (deviceInfo.raw.os.unix ? "unix" :
		                    (deviceInfo.raw.os.linux ? "linux" :
		                        (deviceInfo.raw.os.firefoxos ? "firefoxos" : "unknown"))))));
	    deviceInfo.browser = deviceInfo.raw.browser.ie ? "ie" :
	        (deviceInfo.raw.browser.opera ? "opera" :
	            (deviceInfo.raw.browser.chrome ? "chrome" :
	                (deviceInfo.raw.browser.firefox ? "firefox" :
	                    (deviceInfo.raw.browser.safari ? "safari" : "unknown"))));
	    deviceInfo.device = deviceInfo.raw.device.android ? "android" :
	        (deviceInfo.raw.device.iphone ? "iphone" :
	            (deviceInfo.raw.device.ipad ? "ipad" :
		            (deviceInfo.raw.device.ipod ? "ipod" :
		                (deviceInfo.raw.device.blackberry ? "blackberry" :
		                    (deviceInfo.raw.device.firefoxos ? "firefoxos" : "unknown")))));
	    
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
