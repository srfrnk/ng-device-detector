describe("ng-device-detector", function () {
    beforeEach(module("ng.deviceDetector"));

    var deviceDetector;

    beforeEach(inject(["deviceDetector", function (deviceDetectorI) {
        deviceDetector = deviceDetectorI;
    }]));

    it("is loaded", function () {
        expect(deviceDetector).not.toBeNull();
    })
})
