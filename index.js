import userAgentInfo from 'useragent-info';

function endianness() {
  var heap = new ArrayBuffer(0x10000);
  var i32 = new Int32Array(heap);
  var u32 = new Uint32Array(heap);
  var u16 = new Uint16Array(heap);
  u32[64] = 0x7FFF0100;
  var typedArrayEndianness;
  if (u16[128] === 0x7FFF && u16[129] === 0x0100) typedArrayEndianness = 'big endian';
  else if (u16[128] === 0x0100 && u16[129] === 0x7FFF) typedArrayEndianness = 'little endian';
  else typedArrayEndianness = 'unknown! (a browser bug?) (short 1: ' + u16[128].toString(16) + ', short 2: ' + u16[129].toString(16) + ')';
  return typedArrayEndianness;  
}

function padLengthLeft(s, len, ch) {
  if (ch === undefined) ch = ' ';
  while(s.length < len) s = ch + s;
  return s;
}

// Performs the browser feature test. Immediately returns a JS object that contains the results of all synchronously computable fields, and launches asynchronous
// tasks that perform the remaining tests. Once the async tasks have finished, the given successCallback function is called, with the full browser feature test
// results object as the first parameter.
export default function browserFeatureTest(successCallback) {
  var apis = {};
  function setApiSupport(apiname, cmp) {
    if (cmp) apis[apiname] = true;
    else apis[apiname] = false;
  }

  setApiSupport('Math_imul', typeof Math.imul !== 'undefined');
  setApiSupport('Math_fround', typeof Math.fround !== 'undefined');  
  setApiSupport('ArrayBuffer_transfer', typeof ArrayBuffer.transfer !== 'undefined');
  setApiSupport('WebAudio', typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined');
  setApiSupport('PointerLock', document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock);
  setApiSupport('FullscreenAPI', document.body.requestFullscreen || document.body.msRequestFullscreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullscreen);
  var hasBlobConstructor = false;
  try { new Blob(); hasBlobConstructor = true; } catch(e) { }
  setApiSupport('Blob', hasBlobConstructor);
  if (!hasBlobConstructor) setApiSupport('BlobBuilder', typeof BlobBuilder !== 'undefined' || typeof MozBlobBuilder !== 'undefined' || typeof WebKitBlobBuilder !== 'undefined');
  setApiSupport('SharedArrayBuffer', typeof SharedArrayBuffer !== 'undefined');
  setApiSupport('navigator.hardwareConcurrency', typeof navigator.hardwareConcurrency !== 'undefined');
  setApiSupport('SIMDjs', typeof SIMD !== 'undefined');
  setApiSupport('WebWorkers', typeof Worker !== 'undefined');
  setApiSupport('WebAssembly', typeof WebAssembly !== 'undefined');
  setApiSupport('GamepadAPI', navigator.getGamepads || navigator.webkitGetGamepads);
  var hasIndexedDB = false;
  try { hasIndexedDB = typeof indexedDB !== 'undefined'; } catch (e) {}
  setApiSupport('IndexedDB', hasIndexedDB);
  setApiSupport('VisibilityAPI', typeof document.visibilityState !== 'undefined' || typeof document.hidden !== 'undefined');
  setApiSupport('requestAnimationFrame', typeof requestAnimationFrame !== 'undefined');
  setApiSupport('performance_now', typeof performance !== 'undefined' && performance.now);
  setApiSupport('WebSockets', typeof WebSocket !== 'undefined');
  setApiSupport('WebRTC', typeof RTCPeerConnection !== 'undefined' || typeof mozRTCPeerConnection !== 'undefined' || typeof webkitRTCPeerConnection !== 'undefined' || typeof msRTCPeerConnection !== 'undefined');
  setApiSupport('VibrationAPI', navigator.vibrate);
  setApiSupport('ScreenOrientationAPI', window.screen && (window.screen.orientation || window.screen.mozOrientation || window.screen.webkitOrientation || window.screen.msOrientation));
  setApiSupport('GeolocationAPI', navigator.geolocation);
  setApiSupport('BatteryStatusAPI', navigator.getBattery);
  setApiSupport('WebAssembly', typeof WebAssembly !== 'undefined');
  setApiSupport('WebVR', typeof navigator.getVRDisplays !== 'undefined');
  setApiSupport('WebXR', typeof navigator.xr !== 'undefined');
  setApiSupport('OffscreenCanvas', typeof OffscreenCanvas !== 'undefined');
  setApiSupport('WebComponents', 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template'));

  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------
  var webGLSupport = {};
  var bestGLContext = null; // The GL contexts are tested from best to worst (newest to oldest), and the most desirable
                            // context is stored here for later use.
  function testWebGLSupport(contextName, failIfMajorPerformanceCaveat) {
    var canvas = document.createElement('canvas');
    var errorReason = '';
    canvas.addEventListener("webglcontextcreationerror", function(e) { errorReason = e.statusMessage; }, false);
    var context = canvas.getContext(contextName, failIfMajorPerformanceCaveat ? { failIfMajorPerformanceCaveat: true } : {});
    if (context && !errorReason) {
      if (!bestGLContext) bestGLContext = context;
      var results = { supported: true, performanceCaveat: !failIfMajorPerformanceCaveat };
      if (contextName == 'experimental-webgl') results['experimental-webgl'] = true;
      return results;
    }
    else return { supported: false, errorReason: errorReason };
  }

  webGLSupport['webgl2'] = testWebGLSupport('webgl2', true);
  if (!webGLSupport['webgl2'].supported) {
    var softwareWebGL2 = testWebGLSupport('webgl2', false);
    if (softwareWebGL2.supported) {
      softwareWebGL2.hardwareErrorReason = webGLSupport['webgl2'].errorReason; // Capture the reason why hardware WebGL 2 context did not succeed.
      webGLSupport['webgl2'] = softwareWebGL2;
    }
  }

  webGLSupport['webgl1'] = testWebGLSupport('webgl', true);
  if (!webGLSupport['webgl1'].supported) {
    var experimentalWebGL = testWebGLSupport('experimental-webgl', true);
    if (experimentalWebGL.supported || (experimentalWebGL.errorReason && !webGLSupport['webgl1'].errorReason)) {
      webGLSupport['webgl1'] = experimentalWebGL;
    }
  }

  if (!webGLSupport['webgl1'].supported) {
    var softwareWebGL1 = testWebGLSupport('webgl', false);
    if (!softwareWebGL1.supported) {
      var experimentalWebGL = testWebGLSupport('experimental-webgl', false);
      if (experimentalWebGL.supported || (experimentalWebGL.errorReason && !softwareWebGL1.errorReason)) {
        softwareWebGL1 = experimentalWebGL;
      }
    }

    if (softwareWebGL1.supported) {
      softwareWebGL1.hardwareErrorReason = webGLSupport['webgl1'].errorReason; // Capture the reason why hardware WebGL 1 context did not succeed.
      webGLSupport['webgl1'] = softwareWebGL1;
    }
  }

  setApiSupport('WebGL1', webGLSupport['webgl1'].supported);
  setApiSupport('WebGL2', webGLSupport['webgl2'].supported);
  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------

  var results = {
    userAgent: userAgentInfo(navigator.userAgent),
    navigator: {
      buildID: navigator.buildID,
      appVersion: navigator.appVersion,
      oscpu: navigator.oscpu,
      platform: navigator.platform  
    },
    // displayRefreshRate: displayRefreshRate, // Will be asynchronously filled in on first run, directly filled in later.
    display: {
      windowDevicePixelRatio: window.devicePixelRatio,
      screenWidth: screen.width,
      screenHeight: screen.height,
      physicalScreenWidth: screen.width * window.devicePixelRatio,
      physicalScreenHeight: screen.height * window.devicePixelRatio,  
    },
    hardwareConcurrency: navigator.hardwareConcurrency, // If browser does not support this, will be asynchronously filled in by core estimator.
    apiSupport: apis,
    typedArrayEndianness: endianness()
  };

  // Some fields exist don't always exist
  var optionalFields = ['vendor', 'vendorSub', 'product', 'productSub', 'language', 'appCodeName', 'appName', 'maxTouchPoints', 'pointerEnabled', 'cpuClass'];
  for(var i in optionalFields) {
    var f = optionalFields[i];
    if (navigator[f]) { results.navigator[f] = navigator[f]; }
  }
/*
  if (bestGLContext) {
    results.GL_VENDOR = bestGLContext.getParameter(bestGLContext.VENDOR);
    results.GL_RENDERER = bestGLContext.getParameter(bestGLContext.RENDERER);
    results.GL_VERSION = bestGLContext.getParameter(bestGLContext.VERSION);
    results.GL_SHADING_LANGUAGE_VERSION = bestGLContext.getParameter(bestGLContext.SHADING_LANGUAGE_VERSION);
    results.GL_MAX_TEXTURE_IMAGE_UNITS = bestGLContext.getParameter(bestGLContext.MAX_TEXTURE_IMAGE_UNITS);

    var WEBGL_debug_renderer_info = bestGLContext.getExtension('WEBGL_debug_renderer_info');
    if (WEBGL_debug_renderer_info) {
      results.GL_UNMASKED_VENDOR_WEBGL = bestGLContext.getParameter(WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL);
      results.GL_UNMASKED_RENDERER_WEBGL = bestGLContext.getParameter(WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL);
    }
    results.supportedWebGLExtensions = bestGLContext.getSupportedExtensions();
  }
*/

  // Spin off the asynchronous tasks.

  var numCoresChecked = navigator.hardwareConcurrency > 0;

  // On first run, estimate the number of cores if needed.
  if (!numCoresChecked) {
    if (navigator.getHardwareConcurrency) {
      navigator.getHardwareConcurrency(function(cores) {
        results.hardwareConcurrency = cores;
        numCoresChecked = true;

        // If this was the last async task, fire success callback.
        if (numCoresChecked && successCallback) successCallback(results);
      });
    } else {
      // navigator.hardwareConcurrency is not supported, and no core estimator available either.
      // Report number of cores as 0.
      results.hardwareConcurrency = 0;
      numCoresChecked = true;

      if (numCoresChecked && successCallback) successCallback(results);
    }
  }

  // If none of the async tasks were needed to be executed, queue success callback.
  if (numCoresChecked && successCallback) setTimeout(function() { successCallback(results); }, 1);

  // If caller is not interested in asynchronously fillable data, also return the results object immediately for the synchronous bits.
  return results;
}
