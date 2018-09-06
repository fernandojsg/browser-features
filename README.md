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
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "productComponents": {
            "Mozilla": "5.0",
            "AppleWebKit": "537.36 (KHTML, like Gecko)",
            "Chrome": "68.0.3440.106",
            "Safari": "537.36"
        },
        "platformInfo": [
            "Macintosh",
            "Intel Mac OS X 10_13_5"
        ],
        "bitness": 64,
        "arch": "Intel",
        "platform": "Mac",
        "os": "Mac OS",
        "osVersion": "10.13.5",
        "browserVendor": "Google",
        "browserProduct": "Chrome",
        "browserVersion": "68.0.3440.106",
        "formFactor": "Desktop"
    },
    "navigator": {
        "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "platform": "MacIntel",
        "vendor": "Google Inc.",
        "product": "Gecko",
        "productSub": "20030107",
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
        "SharedArrayBuffer": true,
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
        "Battery Status API": true,
        "WebVR": false,
        "WebXR": false,
        "OffscreenCanvas": false,
        "WebComponents": true,
        "WebGL1": true,
        "WebGL2": true
    },
    "typedArrayEndianness": "little endian"
}
```