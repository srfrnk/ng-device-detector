#ng-device-detector
##Angular module to detect OS / Browser / Device

Uses user-agent to set classes or directly usable with JS.

### Install
* Run $ bower install ng-device-detector --save
* Add script load to HTML: <script type="text/javascript" src=".../ng-device-detector.js"></script>
* Add module to your app dependencies: ...angular.module("...", [..."ng.deviceDetector"...])...
* To add classes <div ... ng-device-detector ...>
* To use directly add "deviceDetector" service to your injectors...

### deviceDetector service
Hold the following properties for usage:
* raw : object : contains the raw values... for internal use mostly.
* os : string : name of current OS
* browser : string : name of current browser
* device : string : name of current device
