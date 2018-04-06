# ng-device-detector
##### Angular module to detect OS / Browser / Device

[![Build Status](https://travis-ci.org/srfrnk/ng-device-detector.svg?branch=master)](https://travis-ci.org/srfrnk/ng-device-detector)
[![GitHub issues](https://img.shields.io/github/issues/srfrnk/ng-device-detector.svg)](https://github.com/srfrnk/ng-device-detector/issues)
[![Known Vulnerabilities](https://snyk.io/package/npm/ng-device-detector/badge.svg)](https://snyk.io/package/npm/ng-device-detector)
[![Open Source Helpers](https://www.codetriage.com/srfrnk/ng-device-detector/badges/users.svg)](https://www.codetriage.com/srfrnk/ng-device-detector)

[![GitHub license](https://img.shields.io/github/license/srfrnk/ng-device-detector.svg)](https://github.com/srfrnk/ng-device-detector/blob/master/license.txt)
[![npm](https://img.shields.io/npm/dm/ng-device-detector.svg)](https://www.npmjs.com/package/ng-device-detector) 
[![npm](https://img.shields.io/npm/dt/ng-device-detector.svg)](https://www.npmjs.com/package/ng-device-detector)
[![npm](https://img.shields.io/npm/v/ng-device-detector.svg)](https://www.npmjs.com/package/ng-device-detector)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)

Uses user-agent to set CSS classes or directly usable via JS.
See website: [http://srfrnk.github.io/ng-device-detector](http://srfrnk.github.io/ng-device-detector)

### Install
NPM
```sh
$ npm install ng-device-detector --save
```
Bower
```sh
$ bower install ng-device-detector --save
```
Browser (Add scripts in HTML)
```sh
<script type="text/javascript" src=".../re-tree.js"></script>
<script type="text/javascript" src=".../ua-device-detector.js"></script>
<script type="text/javascript" src=".../ng-device-detector.js"></script>
```
Adding `'ng.deviceDetector'` to your app module dependencies
```js
angular.module('app', ['ng.deviceDetector']);
```
Injecting *DeviceDetector* service in controller
```js
angular.module('app').controller('Home', function($scope, deviceDetector){
  // Awesome stuff
});
```

To add classes, add directive like: `<div device-detector>`

### Setup

You can set custom detectors at the provider object.
The 
```javascript
angular.module('app', ["ng.deviceDetector"])
    .config(['deviceDetectorProvider', function(deviceDetectorProvider) {
      deviceDetectorProvider.addCustom("Custom_UA_Entry", {
        and:["\\bCustom_UA_Entry\\b", {
            not:"\\bChrome\\b"
        }]
      });
    }])
    
    .controller('Home', function($scope, deviceDetector) {
      // (true / false)
      $scope.customUAEntry = deviceDetector.custom["Custom_UA_Entry"];
    });
```

> Custom detectors will also be added as CSS classes with 'is-' prefix and encoded into css class name casing.

### deviceDetector service
Holds the following properties:
* raw : object : contains the raw values... for internal use mostly.
* os : string : name of current OS
* browser : string : name of current browser
* device : string : name of current device
 
### Support
At first I added just major browser, OS, device support.
With help from mariendries, javierprovecho and crisandretta more support was added.
[The current list of supported browser, OS, device can be easily viewed in here](https://github.com/srfrnk/ng-device-detector/blob/master/ng-device-detector.js).

Pull-requests with new stuff will be highly appreciated :)

### Example

See [plunker](http://plnkr.co/edit/urqMI1?p=preview)

### License

[MIT License](//github.com/srfrnk/ng-device-detector/blob/master/license.txt)
