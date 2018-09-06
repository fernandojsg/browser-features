# browser-features
Browser features

# Usage
```sh
npm install browser-features
```

```javascript
import browserFeatures from 'browser-features';
browserFeatures(features => console.log(features));
```

And you should get a report similar to the following:
```json
{
    "userAgent": {
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0",
        "productComponents": {
            "Mozilla": "5.0",
            "Gecko": "20100101",
            "Firefox": "62.0"
        },
        "platformInfo": [
            "Macintosh",
            "Intel Mac OS X 10.13",
            "rv:62.0"
        ],
        "bitness": 64,
        "arch": "Intel",
        "platform": "Mac",
        "os": "Mac OS",
        "osVersion": "10.13",
        "browserVendor": "Mozilla",
        "browserProduct": "Firefox",
        "browserVersion": "62.0",
        "formFactor": "Desktop"
    },
    "navigator": {
        "buildID": "20180830143136",
        "appVersion": "5.0 (Macintosh)",
        "oscpu": "Intel Mac OS X 10.13",
        "platform": "MacIntel",
        "product": "Gecko",
        "productSub": "20100101",
        "language": "en-US",
        "appCodeName": "Mozilla",
        "appName": "Netscape"
    },
    "display": {
        "windowDevicePixelRatio": 2,
        "screenWidth": 1680,
        "screenHeight": 1050,
        "physicalScreenWidth": 3360,
        "physicalScreenHeight": 2100
    },
    "hardwareConcurrency": 8,
    "apiSupport": {
        "Math.imul()": true,
        "Math.fround()": true,
        "ArrayBuffer.transfer()": false,
        "Web Audio": true,
        "Pointer Lock": true,
        "Fullscreen API": true,
        "Blob": true,
        "SharedArrayBuffer": false,
        "navigator.hardwareConcurrency": true,
        "SIMD.js": false,
        "Web Workers": true,
        "WebAssembly": true,
        "Gamepad API": true,
        "IndexedDB": true,
        "Visibility API": true,
        "requestAnimationFrame()": true,
        "performance.now()": true,
        "WebSockets": true,
        "WebRTC": true,
        "Vibration API": true,
        "Screen Orientation API": true,
        "Geolocation API": true,
        "Battery Status API": false,
        "WebVR": false,
        "WebXR": false,
        "OffscreenCanvas": false,
        "WebComponents": false,
        "WebGL1": true,
        "WebGL2": true
    },
    "typedArrayEndianness": "little endian"
}
```