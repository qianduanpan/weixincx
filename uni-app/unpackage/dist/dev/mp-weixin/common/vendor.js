"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks, data) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function handlePromise(promise) {
  return promise;
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject$1(options.formatArgs) && isPlainObject$1(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$1(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string" && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string") {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!Array.isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ type: "receive", data: normalizePushMessage(args.message) });
    });
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ type: "click", data: normalizePushMessage(args.message) });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushCid(args) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  getPushCidCallbacks.push((cid2, errMsg) => {
    let res;
    if (cid2) {
      res = { errMsg: "getPushCid:ok", cid: cid2 };
      hasSuccess && success(res);
    } else {
      res = { errMsg: "getPushCid:fail" + (errMsg ? " " + errMsg : "") };
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  if (typeof cid !== "undefined") {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid, cidErrMsg));
  }
}
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || "zh-Hans";
};
const setLocale = (locale) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushCid,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, wx[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.windowHeight - safeArea.bottom
    };
  }
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet
});
var index = initUni(shims, protocols);
const ON_SHOW$1 = "onShow";
const ON_HIDE$1 = "onHide";
const ON_LAUNCH$1 = "onLaunch";
const ON_ERROR$1 = "onError";
const ON_THEME_CHANGE$1 = "onThemeChange";
const ON_PAGE_NOT_FOUND$1 = "onPageNotFound";
const ON_UNHANDLE_REJECTION$1 = "onUnhandledRejection";
const ON_LOAD$1 = "onLoad";
const ON_READY$1 = "onReady";
const ON_UNLOAD$1 = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE$1 = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP$1 = "onTabItemTap";
const ON_REACH_BOTTOM$1 = "onReachBottom";
const ON_PULL_DOWN_REFRESH$1 = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES$1 = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD$1,
  ON_SHOW$1,
  ON_HIDE$1,
  ON_UNLOAD$1,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP$1,
  ON_REACH_BOTTOM$1,
  ON_PULL_DOWN_REFRESH$1,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES$1,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW$1,
  ON_HIDE$1,
  ON_LAUNCH$1,
  ON_ERROR$1,
  ON_THEME_CHANGE$1,
  ON_PAGE_NOT_FOUND$1,
  ON_UNHANDLE_REJECTION$1,
  ON_INIT,
  ON_LOAD$1,
  ON_READY$1,
  ON_UNLOAD$1,
  ON_RESIZE$1,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP$1,
  ON_REACH_BOTTOM$1,
  ON_PULL_DOWN_REFRESH$1,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES$1,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l3;
      for (i2 = 0, l3 = this.effects.length; i2 < l3; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l3 = this.cleanups.length; i2 < l3; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l3 = this.scopes.length; i2 < l3; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l3 = this.length; i2 < l3; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
  return i2;
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a2, b2) => getId(a2) - getId(b2));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1("rtg");
const onRenderTracked = createHook$1("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (key[0] !== "$" && key[0] !== "_") {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component2);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = resolve(instance[type] || Component2[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.__$el || (i2.__$el = {}),
  $data: (i2) => i2.data,
  $props: (i2) => shallowReadonly(i2.props),
  $attrs: (i2) => shallowReadonly(i2.attrs),
  $slots: (i2) => shallowReadonly(i2.slots),
  $refs: (i2) => shallowReadonly(i2.refs),
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => () => queueJob(i2.update),
  $watch: (i2) => instanceWatch.bind(i2)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && (key[0] === "$" || key[0] === "_") && hasOwn$1(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (key[0] === "$" || key[0] === "_") {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile$1;
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.33";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src2, seen) {
  src2 = unwrapper(src2);
  const type = typeof src2;
  if (type === "object" && src2 !== null) {
    let copy = seen.get(src2);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src2)) {
      const len = src2.length;
      copy = new Array(len);
      seen.set(src2, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone(src2[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src2, copy);
      for (const name in src2) {
        if (hasOwn$1(src2, name)) {
          copy[name] = clone(src2[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src2;
  }
}
function deepCopy(src2) {
  return clone(src2, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const doSet = () => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, findComponentPublicInstance(mpComponents, templateRef.i), setupState));
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    return getExposeProxy(vm.$) || vm;
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u: u2 } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u2) {
        queuePostRenderEffect$1(u2);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$2(target, key, val) {
  return target[key] = val;
}
function errorHandler(err, instance, info) {
  if (!instance) {
    throw err;
  }
  const app = getApp();
  if (!app || !app.$vm) {
    throw err;
  }
  {
    app.$vm.$callHook(ON_ERROR$1, err, info);
  }
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = errorHandler;
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$2;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && isPromise(res)) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l3 = source.length; i2 < l3; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l3 = keys.length; i2 < l3; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n$3 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_RESIZE = "onResize";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x2) => x2.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction(vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook$1(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook$1(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook$1(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(wx.getSystemInfoSync().language || "zh-Hans");
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps());
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$1(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    invalidateJob(instance.update);
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a2 = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var jsbn = { exports: {} };
(function(module, exports2) {
  (function() {
    var dbits;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger2(a2, b2, c2) {
      if (a2 != null)
        if (typeof a2 == "number")
          this.fromNumber(a2, b2, c2);
        else if (b2 == null && typeof a2 != "string")
          this.fromString(a2, 256);
        else
          this.fromString(a2, b2);
    }
    function nbi() {
      return new BigInteger2(null);
    }
    function am1(i2, x2, w2, j2, c2, n2) {
      while (--n2 >= 0) {
        var v2 = x2 * this[i2++] + w2[j2] + c2;
        c2 = Math.floor(v2 / 67108864);
        w2[j2++] = v2 & 67108863;
      }
      return c2;
    }
    function am2(i2, x2, w2, j2, c2, n2) {
      var xl = x2 & 32767, xh = x2 >> 15;
      while (--n2 >= 0) {
        var l3 = this[i2] & 32767;
        var h2 = this[i2++] >> 15;
        var m2 = xh * l3 + h2 * xl;
        l3 = xl * l3 + ((m2 & 32767) << 15) + w2[j2] + (c2 & 1073741823);
        c2 = (l3 >>> 30) + (m2 >>> 15) + xh * h2 + (c2 >>> 30);
        w2[j2++] = l3 & 1073741823;
      }
      return c2;
    }
    function am3(i2, x2, w2, j2, c2, n2) {
      var xl = x2 & 16383, xh = x2 >> 14;
      while (--n2 >= 0) {
        var l3 = this[i2] & 16383;
        var h2 = this[i2++] >> 14;
        var m2 = xh * l3 + h2 * xl;
        l3 = xl * l3 + ((m2 & 16383) << 14) + w2[j2] + c2;
        c2 = (l3 >> 28) + (m2 >> 14) + xh * h2;
        w2[j2++] = l3 & 268435455;
      }
      return c2;
    }
    var inBrowser = typeof navigator !== "undefined";
    if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
      BigInteger2.prototype.am = am2;
      dbits = 30;
    } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
      BigInteger2.prototype.am = am1;
      dbits = 26;
    } else {
      BigInteger2.prototype.am = am3;
      dbits = 28;
    }
    BigInteger2.prototype.DB = dbits;
    BigInteger2.prototype.DM = (1 << dbits) - 1;
    BigInteger2.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger2.prototype.FV = Math.pow(2, BI_FP);
    BigInteger2.prototype.F1 = BI_FP - dbits;
    BigInteger2.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr, vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
      BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    function int2char(n2) {
      return BI_RM.charAt(n2);
    }
    function intAt(s2, i2) {
      var c2 = BI_RC[s2.charCodeAt(i2)];
      return c2 == null ? -1 : c2;
    }
    function bnpCopyTo(r2) {
      for (var i2 = this.t - 1; i2 >= 0; --i2)
        r2[i2] = this[i2];
      r2.t = this.t;
      r2.s = this.s;
    }
    function bnpFromInt(x2) {
      this.t = 1;
      this.s = x2 < 0 ? -1 : 0;
      if (x2 > 0)
        this[0] = x2;
      else if (x2 < -1)
        this[0] = x2 + this.DV;
      else
        this.t = 0;
    }
    function nbv(i2) {
      var r2 = nbi();
      r2.fromInt(i2);
      return r2;
    }
    function bnpFromString(s2, b2) {
      var k2;
      if (b2 == 16)
        k2 = 4;
      else if (b2 == 8)
        k2 = 3;
      else if (b2 == 256)
        k2 = 8;
      else if (b2 == 2)
        k2 = 1;
      else if (b2 == 32)
        k2 = 5;
      else if (b2 == 4)
        k2 = 2;
      else {
        this.fromRadix(s2, b2);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i2 = s2.length, mi = false, sh = 0;
      while (--i2 >= 0) {
        var x2 = k2 == 8 ? s2[i2] & 255 : intAt(s2, i2);
        if (x2 < 0) {
          if (s2.charAt(i2) == "-")
            mi = true;
          continue;
        }
        mi = false;
        if (sh == 0)
          this[this.t++] = x2;
        else if (sh + k2 > this.DB) {
          this[this.t - 1] |= (x2 & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x2 >> this.DB - sh;
        } else
          this[this.t - 1] |= x2 << sh;
        sh += k2;
        if (sh >= this.DB)
          sh -= this.DB;
      }
      if (k2 == 8 && (s2[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0)
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
      this.clamp();
      if (mi)
        BigInteger2.ZERO.subTo(this, this);
    }
    function bnpClamp() {
      var c2 = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c2)
        --this.t;
    }
    function bnToString(b2) {
      if (this.s < 0)
        return "-" + this.negate().toString(b2);
      var k2;
      if (b2 == 16)
        k2 = 4;
      else if (b2 == 8)
        k2 = 3;
      else if (b2 == 2)
        k2 = 1;
      else if (b2 == 32)
        k2 = 5;
      else if (b2 == 4)
        k2 = 2;
      else
        return this.toRadix(b2);
      var km = (1 << k2) - 1, d2, m2 = false, r2 = "", i2 = this.t;
      var p2 = this.DB - i2 * this.DB % k2;
      if (i2-- > 0) {
        if (p2 < this.DB && (d2 = this[i2] >> p2) > 0) {
          m2 = true;
          r2 = int2char(d2);
        }
        while (i2 >= 0) {
          if (p2 < k2) {
            d2 = (this[i2] & (1 << p2) - 1) << k2 - p2;
            d2 |= this[--i2] >> (p2 += this.DB - k2);
          } else {
            d2 = this[i2] >> (p2 -= k2) & km;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if (d2 > 0)
            m2 = true;
          if (m2)
            r2 += int2char(d2);
        }
      }
      return m2 ? r2 : "0";
    }
    function bnNegate() {
      var r2 = nbi();
      BigInteger2.ZERO.subTo(this, r2);
      return r2;
    }
    function bnAbs() {
      return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a2) {
      var r2 = this.s - a2.s;
      if (r2 != 0)
        return r2;
      var i2 = this.t;
      r2 = i2 - a2.t;
      if (r2 != 0)
        return this.s < 0 ? -r2 : r2;
      while (--i2 >= 0)
        if ((r2 = this[i2] - a2[i2]) != 0)
          return r2;
      return 0;
    }
    function nbits(x2) {
      var r2 = 1, t3;
      if ((t3 = x2 >>> 16) != 0) {
        x2 = t3;
        r2 += 16;
      }
      if ((t3 = x2 >> 8) != 0) {
        x2 = t3;
        r2 += 8;
      }
      if ((t3 = x2 >> 4) != 0) {
        x2 = t3;
        r2 += 4;
      }
      if ((t3 = x2 >> 2) != 0) {
        x2 = t3;
        r2 += 2;
      }
      if ((t3 = x2 >> 1) != 0) {
        x2 = t3;
        r2 += 1;
      }
      return r2;
    }
    function bnBitLength() {
      if (this.t <= 0)
        return 0;
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    }
    function bnpDLShiftTo(n2, r2) {
      var i2;
      for (i2 = this.t - 1; i2 >= 0; --i2)
        r2[i2 + n2] = this[i2];
      for (i2 = n2 - 1; i2 >= 0; --i2)
        r2[i2] = 0;
      r2.t = this.t + n2;
      r2.s = this.s;
    }
    function bnpDRShiftTo(n2, r2) {
      for (var i2 = n2; i2 < this.t; ++i2)
        r2[i2 - n2] = this[i2];
      r2.t = Math.max(this.t - n2, 0);
      r2.s = this.s;
    }
    function bnpLShiftTo(n2, r2) {
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n2 / this.DB), c2 = this.s << bs & this.DM, i2;
      for (i2 = this.t - 1; i2 >= 0; --i2) {
        r2[i2 + ds + 1] = this[i2] >> cbs | c2;
        c2 = (this[i2] & bm) << bs;
      }
      for (i2 = ds - 1; i2 >= 0; --i2)
        r2[i2] = 0;
      r2[ds] = c2;
      r2.t = this.t + ds + 1;
      r2.s = this.s;
      r2.clamp();
    }
    function bnpRShiftTo(n2, r2) {
      r2.s = this.s;
      var ds = Math.floor(n2 / this.DB);
      if (ds >= this.t) {
        r2.t = 0;
        return;
      }
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r2[0] = this[ds] >> bs;
      for (var i2 = ds + 1; i2 < this.t; ++i2) {
        r2[i2 - ds - 1] |= (this[i2] & bm) << cbs;
        r2[i2 - ds] = this[i2] >> bs;
      }
      if (bs > 0)
        r2[this.t - ds - 1] |= (this.s & bm) << cbs;
      r2.t = this.t - ds;
      r2.clamp();
    }
    function bnpSubTo(a2, r2) {
      var i2 = 0, c2 = 0, m2 = Math.min(a2.t, this.t);
      while (i2 < m2) {
        c2 += this[i2] - a2[i2];
        r2[i2++] = c2 & this.DM;
        c2 >>= this.DB;
      }
      if (a2.t < this.t) {
        c2 -= a2.s;
        while (i2 < this.t) {
          c2 += this[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += this.s;
      } else {
        c2 += this.s;
        while (i2 < a2.t) {
          c2 -= a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 -= a2.s;
      }
      r2.s = c2 < 0 ? -1 : 0;
      if (c2 < -1)
        r2[i2++] = this.DV + c2;
      else if (c2 > 0)
        r2[i2++] = c2;
      r2.t = i2;
      r2.clamp();
    }
    function bnpMultiplyTo(a2, r2) {
      var x2 = this.abs(), y2 = a2.abs();
      var i2 = x2.t;
      r2.t = i2 + y2.t;
      while (--i2 >= 0)
        r2[i2] = 0;
      for (i2 = 0; i2 < y2.t; ++i2)
        r2[i2 + x2.t] = x2.am(0, y2[i2], r2, i2, 0, x2.t);
      r2.s = 0;
      r2.clamp();
      if (this.s != a2.s)
        BigInteger2.ZERO.subTo(r2, r2);
    }
    function bnpSquareTo(r2) {
      var x2 = this.abs();
      var i2 = r2.t = 2 * x2.t;
      while (--i2 >= 0)
        r2[i2] = 0;
      for (i2 = 0; i2 < x2.t - 1; ++i2) {
        var c2 = x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
        if ((r2[i2 + x2.t] += x2.am(i2 + 1, 2 * x2[i2], r2, 2 * i2 + 1, c2, x2.t - i2 - 1)) >= x2.DV) {
          r2[i2 + x2.t] -= x2.DV;
          r2[i2 + x2.t + 1] = 1;
        }
      }
      if (r2.t > 0)
        r2[r2.t - 1] += x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
      r2.s = 0;
      r2.clamp();
    }
    function bnpDivRemTo(m2, q2, r2) {
      var pm = m2.abs();
      if (pm.t <= 0)
        return;
      var pt2 = this.abs();
      if (pt2.t < pm.t) {
        if (q2 != null)
          q2.fromInt(0);
        if (r2 != null)
          this.copyTo(r2);
        return;
      }
      if (r2 == null)
        r2 = nbi();
      var y2 = nbi(), ts = this.s, ms = m2.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y2);
        pt2.lShiftTo(nsh, r2);
      } else {
        pm.copyTo(y2);
        pt2.copyTo(r2);
      }
      var ys = y2.t;
      var y0 = y2[ys - 1];
      if (y0 == 0)
        return;
      var yt2 = y0 * (1 << this.F1) + (ys > 1 ? y2[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt2, d2 = (1 << this.F1) / yt2, e2 = 1 << this.F2;
      var i2 = r2.t, j2 = i2 - ys, t3 = q2 == null ? nbi() : q2;
      y2.dlShiftTo(j2, t3);
      if (r2.compareTo(t3) >= 0) {
        r2[r2.t++] = 1;
        r2.subTo(t3, r2);
      }
      BigInteger2.ONE.dlShiftTo(ys, t3);
      t3.subTo(y2, y2);
      while (y2.t < ys)
        y2[y2.t++] = 0;
      while (--j2 >= 0) {
        var qd = r2[--i2] == y0 ? this.DM : Math.floor(r2[i2] * d1 + (r2[i2 - 1] + e2) * d2);
        if ((r2[i2] += y2.am(0, qd, r2, j2, 0, ys)) < qd) {
          y2.dlShiftTo(j2, t3);
          r2.subTo(t3, r2);
          while (r2[i2] < --qd)
            r2.subTo(t3, r2);
        }
      }
      if (q2 != null) {
        r2.drShiftTo(ys, q2);
        if (ts != ms)
          BigInteger2.ZERO.subTo(q2, q2);
      }
      r2.t = ys;
      r2.clamp();
      if (nsh > 0)
        r2.rShiftTo(nsh, r2);
      if (ts < 0)
        BigInteger2.ZERO.subTo(r2, r2);
    }
    function bnMod(a2) {
      var r2 = nbi();
      this.abs().divRemTo(a2, null, r2);
      if (this.s < 0 && r2.compareTo(BigInteger2.ZERO) > 0)
        a2.subTo(r2, r2);
      return r2;
    }
    function Classic(m2) {
      this.m = m2;
    }
    function cConvert(x2) {
      if (x2.s < 0 || x2.compareTo(this.m) >= 0)
        return x2.mod(this.m);
      else
        return x2;
    }
    function cRevert(x2) {
      return x2;
    }
    function cReduce(x2) {
      x2.divRemTo(this.m, null, x2);
    }
    function cMulTo(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    }
    function cSqrTo(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
      if (this.t < 1)
        return 0;
      var x2 = this[0];
      if ((x2 & 1) == 0)
        return 0;
      var y2 = x2 & 3;
      y2 = y2 * (2 - (x2 & 15) * y2) & 15;
      y2 = y2 * (2 - (x2 & 255) * y2) & 255;
      y2 = y2 * (2 - ((x2 & 65535) * y2 & 65535)) & 65535;
      y2 = y2 * (2 - x2 * y2 % this.DV) % this.DV;
      return y2 > 0 ? this.DV - y2 : -y2;
    }
    function Montgomery(m2) {
      this.m = m2;
      this.mp = m2.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m2.DB - 15) - 1;
      this.mt2 = 2 * m2.t;
    }
    function montConvert(x2) {
      var r2 = nbi();
      x2.abs().dlShiftTo(this.m.t, r2);
      r2.divRemTo(this.m, null, r2);
      if (x2.s < 0 && r2.compareTo(BigInteger2.ZERO) > 0)
        this.m.subTo(r2, r2);
      return r2;
    }
    function montRevert(x2) {
      var r2 = nbi();
      x2.copyTo(r2);
      this.reduce(r2);
      return r2;
    }
    function montReduce(x2) {
      while (x2.t <= this.mt2)
        x2[x2.t++] = 0;
      for (var i2 = 0; i2 < this.m.t; ++i2) {
        var j2 = x2[i2] & 32767;
        var u0 = j2 * this.mpl + ((j2 * this.mph + (x2[i2] >> 15) * this.mpl & this.um) << 15) & x2.DM;
        j2 = i2 + this.m.t;
        x2[j2] += this.m.am(0, u0, x2, i2, 0, this.m.t);
        while (x2[j2] >= x2.DV) {
          x2[j2] -= x2.DV;
          x2[++j2]++;
        }
      }
      x2.clamp();
      x2.drShiftTo(this.m.t, x2);
      if (x2.compareTo(this.m) >= 0)
        x2.subTo(this.m, x2);
    }
    function montSqrTo(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    }
    function montMulTo(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }
    function bnpExp(e2, z3) {
      if (e2 > 4294967295 || e2 < 1)
        return BigInteger2.ONE;
      var r2 = nbi(), r22 = nbi(), g = z3.convert(this), i2 = nbits(e2) - 1;
      g.copyTo(r2);
      while (--i2 >= 0) {
        z3.sqrTo(r2, r22);
        if ((e2 & 1 << i2) > 0)
          z3.mulTo(r22, g, r2);
        else {
          var t3 = r2;
          r2 = r22;
          r22 = t3;
        }
      }
      return z3.revert(r2);
    }
    function bnModPowInt(e2, m2) {
      var z3;
      if (e2 < 256 || m2.isEven())
        z3 = new Classic(m2);
      else
        z3 = new Montgomery(m2);
      return this.exp(e2, z3);
    }
    BigInteger2.prototype.copyTo = bnpCopyTo;
    BigInteger2.prototype.fromInt = bnpFromInt;
    BigInteger2.prototype.fromString = bnpFromString;
    BigInteger2.prototype.clamp = bnpClamp;
    BigInteger2.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger2.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger2.prototype.lShiftTo = bnpLShiftTo;
    BigInteger2.prototype.rShiftTo = bnpRShiftTo;
    BigInteger2.prototype.subTo = bnpSubTo;
    BigInteger2.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger2.prototype.squareTo = bnpSquareTo;
    BigInteger2.prototype.divRemTo = bnpDivRemTo;
    BigInteger2.prototype.invDigit = bnpInvDigit;
    BigInteger2.prototype.isEven = bnpIsEven;
    BigInteger2.prototype.exp = bnpExp;
    BigInteger2.prototype.toString = bnToString;
    BigInteger2.prototype.negate = bnNegate;
    BigInteger2.prototype.abs = bnAbs;
    BigInteger2.prototype.compareTo = bnCompareTo;
    BigInteger2.prototype.bitLength = bnBitLength;
    BigInteger2.prototype.mod = bnMod;
    BigInteger2.prototype.modPowInt = bnModPowInt;
    BigInteger2.ZERO = nbv(0);
    BigInteger2.ONE = nbv(1);
    function bnClone() {
      var r2 = nbi();
      this.copyTo(r2);
      return r2;
    }
    function bnIntValue() {
      if (this.s < 0) {
        if (this.t == 1)
          return this[0] - this.DV;
        else if (this.t == 0)
          return -1;
      } else if (this.t == 1)
        return this[0];
      else if (this.t == 0)
        return 0;
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }
    function bnByteValue() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }
    function bnShortValue() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }
    function bnpChunkSize(r2) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r2));
    }
    function bnSigNum() {
      if (this.s < 0)
        return -1;
      else if (this.t <= 0 || this.t == 1 && this[0] <= 0)
        return 0;
      else
        return 1;
    }
    function bnpToRadix(b2) {
      if (b2 == null)
        b2 = 10;
      if (this.signum() == 0 || b2 < 2 || b2 > 36)
        return "0";
      var cs = this.chunkSize(b2);
      var a2 = Math.pow(b2, cs);
      var d2 = nbv(a2), y2 = nbi(), z3 = nbi(), r2 = "";
      this.divRemTo(d2, y2, z3);
      while (y2.signum() > 0) {
        r2 = (a2 + z3.intValue()).toString(b2).substr(1) + r2;
        y2.divRemTo(d2, y2, z3);
      }
      return z3.intValue().toString(b2) + r2;
    }
    function bnpFromRadix(s2, b2) {
      this.fromInt(0);
      if (b2 == null)
        b2 = 10;
      var cs = this.chunkSize(b2);
      var d2 = Math.pow(b2, cs), mi = false, j2 = 0, w2 = 0;
      for (var i2 = 0; i2 < s2.length; ++i2) {
        var x2 = intAt(s2, i2);
        if (x2 < 0) {
          if (s2.charAt(i2) == "-" && this.signum() == 0)
            mi = true;
          continue;
        }
        w2 = b2 * w2 + x2;
        if (++j2 >= cs) {
          this.dMultiply(d2);
          this.dAddOffset(w2, 0);
          j2 = 0;
          w2 = 0;
        }
      }
      if (j2 > 0) {
        this.dMultiply(Math.pow(b2, j2));
        this.dAddOffset(w2, 0);
      }
      if (mi)
        BigInteger2.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a2, b2, c2) {
      if (typeof b2 == "number") {
        if (a2 < 2)
          this.fromInt(1);
        else {
          this.fromNumber(a2, c2);
          if (!this.testBit(a2 - 1))
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
          if (this.isEven())
            this.dAddOffset(1, 0);
          while (!this.isProbablePrime(b2)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a2)
              this.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), this);
          }
        }
      } else {
        var x2 = new Array(), t3 = a2 & 7;
        x2.length = (a2 >> 3) + 1;
        b2.nextBytes(x2);
        if (t3 > 0)
          x2[0] &= (1 << t3) - 1;
        else
          x2[0] = 0;
        this.fromString(x2, 256);
      }
    }
    function bnToByteArray() {
      var i2 = this.t, r2 = new Array();
      r2[0] = this.s;
      var p2 = this.DB - i2 * this.DB % 8, d2, k2 = 0;
      if (i2-- > 0) {
        if (p2 < this.DB && (d2 = this[i2] >> p2) != (this.s & this.DM) >> p2)
          r2[k2++] = d2 | this.s << this.DB - p2;
        while (i2 >= 0) {
          if (p2 < 8) {
            d2 = (this[i2] & (1 << p2) - 1) << 8 - p2;
            d2 |= this[--i2] >> (p2 += this.DB - 8);
          } else {
            d2 = this[i2] >> (p2 -= 8) & 255;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if ((d2 & 128) != 0)
            d2 |= -256;
          if (k2 == 0 && (this.s & 128) != (d2 & 128))
            ++k2;
          if (k2 > 0 || d2 != this.s)
            r2[k2++] = d2;
        }
      }
      return r2;
    }
    function bnEquals(a2) {
      return this.compareTo(a2) == 0;
    }
    function bnMin(a2) {
      return this.compareTo(a2) < 0 ? this : a2;
    }
    function bnMax(a2) {
      return this.compareTo(a2) > 0 ? this : a2;
    }
    function bnpBitwiseTo(a2, op, r2) {
      var i2, f2, m2 = Math.min(a2.t, this.t);
      for (i2 = 0; i2 < m2; ++i2)
        r2[i2] = op(this[i2], a2[i2]);
      if (a2.t < this.t) {
        f2 = a2.s & this.DM;
        for (i2 = m2; i2 < this.t; ++i2)
          r2[i2] = op(this[i2], f2);
        r2.t = this.t;
      } else {
        f2 = this.s & this.DM;
        for (i2 = m2; i2 < a2.t; ++i2)
          r2[i2] = op(f2, a2[i2]);
        r2.t = a2.t;
      }
      r2.s = op(this.s, a2.s);
      r2.clamp();
    }
    function op_and(x2, y2) {
      return x2 & y2;
    }
    function bnAnd(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_and, r2);
      return r2;
    }
    function op_or(x2, y2) {
      return x2 | y2;
    }
    function bnOr(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_or, r2);
      return r2;
    }
    function op_xor(x2, y2) {
      return x2 ^ y2;
    }
    function bnXor(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_xor, r2);
      return r2;
    }
    function op_andnot(x2, y2) {
      return x2 & ~y2;
    }
    function bnAndNot(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_andnot, r2);
      return r2;
    }
    function bnNot() {
      var r2 = nbi();
      for (var i2 = 0; i2 < this.t; ++i2)
        r2[i2] = this.DM & ~this[i2];
      r2.t = this.t;
      r2.s = ~this.s;
      return r2;
    }
    function bnShiftLeft(n2) {
      var r2 = nbi();
      if (n2 < 0)
        this.rShiftTo(-n2, r2);
      else
        this.lShiftTo(n2, r2);
      return r2;
    }
    function bnShiftRight(n2) {
      var r2 = nbi();
      if (n2 < 0)
        this.lShiftTo(-n2, r2);
      else
        this.rShiftTo(n2, r2);
      return r2;
    }
    function lbit(x2) {
      if (x2 == 0)
        return -1;
      var r2 = 0;
      if ((x2 & 65535) == 0) {
        x2 >>= 16;
        r2 += 16;
      }
      if ((x2 & 255) == 0) {
        x2 >>= 8;
        r2 += 8;
      }
      if ((x2 & 15) == 0) {
        x2 >>= 4;
        r2 += 4;
      }
      if ((x2 & 3) == 0) {
        x2 >>= 2;
        r2 += 2;
      }
      if ((x2 & 1) == 0)
        ++r2;
      return r2;
    }
    function bnGetLowestSetBit() {
      for (var i2 = 0; i2 < this.t; ++i2)
        if (this[i2] != 0)
          return i2 * this.DB + lbit(this[i2]);
      if (this.s < 0)
        return this.t * this.DB;
      return -1;
    }
    function cbit(x2) {
      var r2 = 0;
      while (x2 != 0) {
        x2 &= x2 - 1;
        ++r2;
      }
      return r2;
    }
    function bnBitCount() {
      var r2 = 0, x2 = this.s & this.DM;
      for (var i2 = 0; i2 < this.t; ++i2)
        r2 += cbit(this[i2] ^ x2);
      return r2;
    }
    function bnTestBit(n2) {
      var j2 = Math.floor(n2 / this.DB);
      if (j2 >= this.t)
        return this.s != 0;
      return (this[j2] & 1 << n2 % this.DB) != 0;
    }
    function bnpChangeBit(n2, op) {
      var r2 = BigInteger2.ONE.shiftLeft(n2);
      this.bitwiseTo(r2, op, r2);
      return r2;
    }
    function bnSetBit(n2) {
      return this.changeBit(n2, op_or);
    }
    function bnClearBit(n2) {
      return this.changeBit(n2, op_andnot);
    }
    function bnFlipBit(n2) {
      return this.changeBit(n2, op_xor);
    }
    function bnpAddTo(a2, r2) {
      var i2 = 0, c2 = 0, m2 = Math.min(a2.t, this.t);
      while (i2 < m2) {
        c2 += this[i2] + a2[i2];
        r2[i2++] = c2 & this.DM;
        c2 >>= this.DB;
      }
      if (a2.t < this.t) {
        c2 += a2.s;
        while (i2 < this.t) {
          c2 += this[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += this.s;
      } else {
        c2 += this.s;
        while (i2 < a2.t) {
          c2 += a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += a2.s;
      }
      r2.s = c2 < 0 ? -1 : 0;
      if (c2 > 0)
        r2[i2++] = c2;
      else if (c2 < -1)
        r2[i2++] = this.DV + c2;
      r2.t = i2;
      r2.clamp();
    }
    function bnAdd(a2) {
      var r2 = nbi();
      this.addTo(a2, r2);
      return r2;
    }
    function bnSubtract(a2) {
      var r2 = nbi();
      this.subTo(a2, r2);
      return r2;
    }
    function bnMultiply(a2) {
      var r2 = nbi();
      this.multiplyTo(a2, r2);
      return r2;
    }
    function bnSquare() {
      var r2 = nbi();
      this.squareTo(r2);
      return r2;
    }
    function bnDivide(a2) {
      var r2 = nbi();
      this.divRemTo(a2, r2, null);
      return r2;
    }
    function bnRemainder(a2) {
      var r2 = nbi();
      this.divRemTo(a2, null, r2);
      return r2;
    }
    function bnDivideAndRemainder(a2) {
      var q2 = nbi(), r2 = nbi();
      this.divRemTo(a2, q2, r2);
      return new Array(q2, r2);
    }
    function bnpDMultiply(n2) {
      this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function bnpDAddOffset(n2, w2) {
      if (n2 == 0)
        return;
      while (this.t <= w2)
        this[this.t++] = 0;
      this[w2] += n2;
      while (this[w2] >= this.DV) {
        this[w2] -= this.DV;
        if (++w2 >= this.t)
          this[this.t++] = 0;
        ++this[w2];
      }
    }
    function NullExp() {
    }
    function nNop(x2) {
      return x2;
    }
    function nMulTo(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
    }
    function nSqrTo(x2, r2) {
      x2.squareTo(r2);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e2) {
      return this.exp(e2, new NullExp());
    }
    function bnpMultiplyLowerTo(a2, n2, r2) {
      var i2 = Math.min(this.t + a2.t, n2);
      r2.s = 0;
      r2.t = i2;
      while (i2 > 0)
        r2[--i2] = 0;
      var j2;
      for (j2 = r2.t - this.t; i2 < j2; ++i2)
        r2[i2 + this.t] = this.am(0, a2[i2], r2, i2, 0, this.t);
      for (j2 = Math.min(a2.t, n2); i2 < j2; ++i2)
        this.am(0, a2[i2], r2, i2, 0, n2 - i2);
      r2.clamp();
    }
    function bnpMultiplyUpperTo(a2, n2, r2) {
      --n2;
      var i2 = r2.t = this.t + a2.t - n2;
      r2.s = 0;
      while (--i2 >= 0)
        r2[i2] = 0;
      for (i2 = Math.max(n2 - this.t, 0); i2 < a2.t; ++i2)
        r2[this.t + i2 - n2] = this.am(n2 - i2, a2[i2], r2, 0, 0, this.t + i2 - n2);
      r2.clamp();
      r2.drShiftTo(1, r2);
    }
    function Barrett(m2) {
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger2.ONE.dlShiftTo(2 * m2.t, this.r2);
      this.mu = this.r2.divide(m2);
      this.m = m2;
    }
    function barrettConvert(x2) {
      if (x2.s < 0 || x2.t > 2 * this.m.t)
        return x2.mod(this.m);
      else if (x2.compareTo(this.m) < 0)
        return x2;
      else {
        var r2 = nbi();
        x2.copyTo(r2);
        this.reduce(r2);
        return r2;
      }
    }
    function barrettRevert(x2) {
      return x2;
    }
    function barrettReduce(x2) {
      x2.drShiftTo(this.m.t - 1, this.r2);
      if (x2.t > this.m.t + 1) {
        x2.t = this.m.t + 1;
        x2.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x2.compareTo(this.r2) < 0)
        x2.dAddOffset(1, this.m.t + 1);
      x2.subTo(this.r2, x2);
      while (x2.compareTo(this.m) >= 0)
        x2.subTo(this.m, x2);
    }
    function barrettSqrTo(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    }
    function barrettMulTo(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e2, m2) {
      var i2 = e2.bitLength(), k2, r2 = nbv(1), z3;
      if (i2 <= 0)
        return r2;
      else if (i2 < 18)
        k2 = 1;
      else if (i2 < 48)
        k2 = 3;
      else if (i2 < 144)
        k2 = 4;
      else if (i2 < 768)
        k2 = 5;
      else
        k2 = 6;
      if (i2 < 8)
        z3 = new Classic(m2);
      else if (m2.isEven())
        z3 = new Barrett(m2);
      else
        z3 = new Montgomery(m2);
      var g = new Array(), n2 = 3, k1 = k2 - 1, km = (1 << k2) - 1;
      g[1] = z3.convert(this);
      if (k2 > 1) {
        var g2 = nbi();
        z3.sqrTo(g[1], g2);
        while (n2 <= km) {
          g[n2] = nbi();
          z3.mulTo(g2, g[n2 - 2], g[n2]);
          n2 += 2;
        }
      }
      var j2 = e2.t - 1, w2, is1 = true, r22 = nbi(), t3;
      i2 = nbits(e2[j2]) - 1;
      while (j2 >= 0) {
        if (i2 >= k1)
          w2 = e2[j2] >> i2 - k1 & km;
        else {
          w2 = (e2[j2] & (1 << i2 + 1) - 1) << k1 - i2;
          if (j2 > 0)
            w2 |= e2[j2 - 1] >> this.DB + i2 - k1;
        }
        n2 = k2;
        while ((w2 & 1) == 0) {
          w2 >>= 1;
          --n2;
        }
        if ((i2 -= n2) < 0) {
          i2 += this.DB;
          --j2;
        }
        if (is1) {
          g[w2].copyTo(r2);
          is1 = false;
        } else {
          while (n2 > 1) {
            z3.sqrTo(r2, r22);
            z3.sqrTo(r22, r2);
            n2 -= 2;
          }
          if (n2 > 0)
            z3.sqrTo(r2, r22);
          else {
            t3 = r2;
            r2 = r22;
            r22 = t3;
          }
          z3.mulTo(r22, g[w2], r2);
        }
        while (j2 >= 0 && (e2[j2] & 1 << i2) == 0) {
          z3.sqrTo(r2, r22);
          t3 = r2;
          r2 = r22;
          r22 = t3;
          if (--i2 < 0) {
            i2 = this.DB - 1;
            --j2;
          }
        }
      }
      return z3.revert(r2);
    }
    function bnGCD(a2) {
      var x2 = this.s < 0 ? this.negate() : this.clone();
      var y2 = a2.s < 0 ? a2.negate() : a2.clone();
      if (x2.compareTo(y2) < 0) {
        var t3 = x2;
        x2 = y2;
        y2 = t3;
      }
      var i2 = x2.getLowestSetBit(), g = y2.getLowestSetBit();
      if (g < 0)
        return x2;
      if (i2 < g)
        g = i2;
      if (g > 0) {
        x2.rShiftTo(g, x2);
        y2.rShiftTo(g, y2);
      }
      while (x2.signum() > 0) {
        if ((i2 = x2.getLowestSetBit()) > 0)
          x2.rShiftTo(i2, x2);
        if ((i2 = y2.getLowestSetBit()) > 0)
          y2.rShiftTo(i2, y2);
        if (x2.compareTo(y2) >= 0) {
          x2.subTo(y2, x2);
          x2.rShiftTo(1, x2);
        } else {
          y2.subTo(x2, y2);
          y2.rShiftTo(1, y2);
        }
      }
      if (g > 0)
        y2.lShiftTo(g, y2);
      return y2;
    }
    function bnpModInt(n2) {
      if (n2 <= 0)
        return 0;
      var d2 = this.DV % n2, r2 = this.s < 0 ? n2 - 1 : 0;
      if (this.t > 0)
        if (d2 == 0)
          r2 = this[0] % n2;
        else
          for (var i2 = this.t - 1; i2 >= 0; --i2)
            r2 = (d2 * r2 + this[i2]) % n2;
      return r2;
    }
    function bnModInverse(m2) {
      var ac = m2.isEven();
      if (this.isEven() && ac || m2.signum() == 0)
        return BigInteger2.ZERO;
      var u2 = m2.clone(), v2 = this.clone();
      var a2 = nbv(1), b2 = nbv(0), c2 = nbv(0), d2 = nbv(1);
      while (u2.signum() != 0) {
        while (u2.isEven()) {
          u2.rShiftTo(1, u2);
          if (ac) {
            if (!a2.isEven() || !b2.isEven()) {
              a2.addTo(this, a2);
              b2.subTo(m2, b2);
            }
            a2.rShiftTo(1, a2);
          } else if (!b2.isEven())
            b2.subTo(m2, b2);
          b2.rShiftTo(1, b2);
        }
        while (v2.isEven()) {
          v2.rShiftTo(1, v2);
          if (ac) {
            if (!c2.isEven() || !d2.isEven()) {
              c2.addTo(this, c2);
              d2.subTo(m2, d2);
            }
            c2.rShiftTo(1, c2);
          } else if (!d2.isEven())
            d2.subTo(m2, d2);
          d2.rShiftTo(1, d2);
        }
        if (u2.compareTo(v2) >= 0) {
          u2.subTo(v2, u2);
          if (ac)
            a2.subTo(c2, a2);
          b2.subTo(d2, b2);
        } else {
          v2.subTo(u2, v2);
          if (ac)
            c2.subTo(a2, c2);
          d2.subTo(b2, d2);
        }
      }
      if (v2.compareTo(BigInteger2.ONE) != 0)
        return BigInteger2.ZERO;
      if (d2.compareTo(m2) >= 0)
        return d2.subtract(m2);
      if (d2.signum() < 0)
        d2.addTo(m2, d2);
      else
        return d2;
      if (d2.signum() < 0)
        return d2.add(m2);
      else
        return d2;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t3) {
      var i2, x2 = this.abs();
      if (x2.t == 1 && x2[0] <= lowprimes[lowprimes.length - 1]) {
        for (i2 = 0; i2 < lowprimes.length; ++i2)
          if (x2[0] == lowprimes[i2])
            return true;
        return false;
      }
      if (x2.isEven())
        return false;
      i2 = 1;
      while (i2 < lowprimes.length) {
        var m2 = lowprimes[i2], j2 = i2 + 1;
        while (j2 < lowprimes.length && m2 < lplim)
          m2 *= lowprimes[j2++];
        m2 = x2.modInt(m2);
        while (i2 < j2)
          if (m2 % lowprimes[i2++] == 0)
            return false;
      }
      return x2.millerRabin(t3);
    }
    function bnpMillerRabin(t3) {
      var n1 = this.subtract(BigInteger2.ONE);
      var k2 = n1.getLowestSetBit();
      if (k2 <= 0)
        return false;
      var r2 = n1.shiftRight(k2);
      t3 = t3 + 1 >> 1;
      if (t3 > lowprimes.length)
        t3 = lowprimes.length;
      var a2 = nbi();
      for (var i2 = 0; i2 < t3; ++i2) {
        a2.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y2 = a2.modPow(r2, this);
        if (y2.compareTo(BigInteger2.ONE) != 0 && y2.compareTo(n1) != 0) {
          var j2 = 1;
          while (j2++ < k2 && y2.compareTo(n1) != 0) {
            y2 = y2.modPowInt(2, this);
            if (y2.compareTo(BigInteger2.ONE) == 0)
              return false;
          }
          if (y2.compareTo(n1) != 0)
            return false;
        }
      }
      return true;
    }
    BigInteger2.prototype.chunkSize = bnpChunkSize;
    BigInteger2.prototype.toRadix = bnpToRadix;
    BigInteger2.prototype.fromRadix = bnpFromRadix;
    BigInteger2.prototype.fromNumber = bnpFromNumber;
    BigInteger2.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger2.prototype.changeBit = bnpChangeBit;
    BigInteger2.prototype.addTo = bnpAddTo;
    BigInteger2.prototype.dMultiply = bnpDMultiply;
    BigInteger2.prototype.dAddOffset = bnpDAddOffset;
    BigInteger2.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger2.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger2.prototype.modInt = bnpModInt;
    BigInteger2.prototype.millerRabin = bnpMillerRabin;
    BigInteger2.prototype.clone = bnClone;
    BigInteger2.prototype.intValue = bnIntValue;
    BigInteger2.prototype.byteValue = bnByteValue;
    BigInteger2.prototype.shortValue = bnShortValue;
    BigInteger2.prototype.signum = bnSigNum;
    BigInteger2.prototype.toByteArray = bnToByteArray;
    BigInteger2.prototype.equals = bnEquals;
    BigInteger2.prototype.min = bnMin;
    BigInteger2.prototype.max = bnMax;
    BigInteger2.prototype.and = bnAnd;
    BigInteger2.prototype.or = bnOr;
    BigInteger2.prototype.xor = bnXor;
    BigInteger2.prototype.andNot = bnAndNot;
    BigInteger2.prototype.not = bnNot;
    BigInteger2.prototype.shiftLeft = bnShiftLeft;
    BigInteger2.prototype.shiftRight = bnShiftRight;
    BigInteger2.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger2.prototype.bitCount = bnBitCount;
    BigInteger2.prototype.testBit = bnTestBit;
    BigInteger2.prototype.setBit = bnSetBit;
    BigInteger2.prototype.clearBit = bnClearBit;
    BigInteger2.prototype.flipBit = bnFlipBit;
    BigInteger2.prototype.add = bnAdd;
    BigInteger2.prototype.subtract = bnSubtract;
    BigInteger2.prototype.multiply = bnMultiply;
    BigInteger2.prototype.divide = bnDivide;
    BigInteger2.prototype.remainder = bnRemainder;
    BigInteger2.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger2.prototype.modPow = bnModPow;
    BigInteger2.prototype.modInverse = bnModInverse;
    BigInteger2.prototype.pow = bnPow;
    BigInteger2.prototype.gcd = bnGCD;
    BigInteger2.prototype.isProbablePrime = bnIsProbablePrime;
    BigInteger2.prototype.square = bnSquare;
    BigInteger2.prototype.Barrett = Barrett;
    var rng_state;
    var rng_pool;
    var rng_pptr;
    function rng_seed_int(x2) {
      rng_pool[rng_pptr++] ^= x2 & 255;
      rng_pool[rng_pptr++] ^= x2 >> 8 & 255;
      rng_pool[rng_pptr++] ^= x2 >> 16 & 255;
      rng_pool[rng_pptr++] ^= x2 >> 24 & 255;
      if (rng_pptr >= rng_psize)
        rng_pptr -= rng_psize;
    }
    function rng_seed_time() {
      rng_seed_int(new Date().getTime());
    }
    if (rng_pool == null) {
      rng_pool = new Array();
      rng_pptr = 0;
      var t2;
      if (typeof window !== "undefined" && window.crypto) {
        if (window.crypto.getRandomValues) {
          var ua = new Uint8Array(32);
          window.crypto.getRandomValues(ua);
          for (t2 = 0; t2 < 32; ++t2)
            rng_pool[rng_pptr++] = ua[t2];
        } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
          var z2 = window.crypto.random(32);
          for (t2 = 0; t2 < z2.length; ++t2)
            rng_pool[rng_pptr++] = z2.charCodeAt(t2) & 255;
        }
      }
      while (rng_pptr < rng_psize) {
        t2 = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t2 >>> 8;
        rng_pool[rng_pptr++] = t2 & 255;
      }
      rng_pptr = 0;
      rng_seed_time();
    }
    function rng_get_byte() {
      if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
          rng_pool[rng_pptr] = 0;
        rng_pptr = 0;
      }
      return rng_state.next();
    }
    function rng_get_bytes(ba) {
      var i2;
      for (i2 = 0; i2 < ba.length; ++i2)
        ba[i2] = rng_get_byte();
    }
    function SecureRandom2() {
    }
    SecureRandom2.prototype.nextBytes = rng_get_bytes;
    function Arcfour() {
      this.i = 0;
      this.j = 0;
      this.S = new Array();
    }
    function ARC4init(key) {
      var i2, j2, t3;
      for (i2 = 0; i2 < 256; ++i2)
        this.S[i2] = i2;
      j2 = 0;
      for (i2 = 0; i2 < 256; ++i2) {
        j2 = j2 + this.S[i2] + key[i2 % key.length] & 255;
        t3 = this.S[i2];
        this.S[i2] = this.S[j2];
        this.S[j2] = t3;
      }
      this.i = 0;
      this.j = 0;
    }
    function ARC4next() {
      var t3;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t3 = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t3;
      return this.S[t3 + this.S[this.i] & 255];
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;
    function prng_newstate() {
      return new Arcfour();
    }
    var rng_psize = 256;
    {
      module.exports = {
        default: BigInteger2,
        BigInteger: BigInteger2,
        SecureRandom: SecureRandom2
      };
    }
  }).call(commonjsGlobal);
})(jsbn);
const { BigInteger: BigInteger$3 } = jsbn.exports;
function bigintToValue(bigint) {
  let h2 = bigint.toString(16);
  if (h2[0] !== "-") {
    if (h2.length % 2 === 1)
      h2 = "0" + h2;
    else if (!h2.match(/^[0-7]/))
      h2 = "00" + h2;
  } else {
    h2 = h2.substr(1);
    let len = h2.length;
    if (len % 2 === 1)
      len += 1;
    else if (!h2.match(/^[0-7]/))
      len += 2;
    let mask = "";
    for (let i2 = 0; i2 < len; i2++)
      mask += "f";
    mask = new BigInteger$3(mask, 16);
    h2 = mask.xor(bigint).add(BigInteger$3.ONE);
    h2 = h2.toString(16).replace(/^-/, "");
  }
  return h2;
}
class ASN1Object {
  constructor() {
    this.tlv = null;
    this.t = "00";
    this.l = "00";
    this.v = "";
  }
  getEncodedHex() {
    if (!this.tlv) {
      this.v = this.getValue();
      this.l = this.getLength();
      this.tlv = this.t + this.l + this.v;
    }
    return this.tlv;
  }
  getLength() {
    const n2 = this.v.length / 2;
    let nHex = n2.toString(16);
    if (nHex.length % 2 === 1)
      nHex = "0" + nHex;
    if (n2 < 128) {
      return nHex;
    } else {
      const head = 128 + nHex.length / 2;
      return head.toString(16) + nHex;
    }
  }
  getValue() {
    return "";
  }
}
class DERInteger extends ASN1Object {
  constructor(bigint) {
    super();
    this.t = "02";
    if (bigint)
      this.v = bigintToValue(bigint);
  }
  getValue() {
    return this.v;
  }
}
class DERSequence extends ASN1Object {
  constructor(asn1Array) {
    super();
    this.t = "30";
    this.asn1Array = asn1Array;
  }
  getValue() {
    this.v = this.asn1Array.map((asn1Object) => asn1Object.getEncodedHex()).join("");
    return this.v;
  }
}
function getLenOfL(str, start) {
  if (+str[start + 2] < 8)
    return 1;
  return +str.substr(start + 2, 2) & 127 + 1;
}
function getL(str, start) {
  const len = getLenOfL(str, start);
  const l3 = str.substr(start + 2, len * 2);
  if (!l3)
    return -1;
  const bigint = +l3[0] < 8 ? new BigInteger$3(l3, 16) : new BigInteger$3(l3.substr(2), 16);
  return bigint.intValue();
}
function getStartOfV(str, start) {
  const len = getLenOfL(str, start);
  return start + (len + 1) * 2;
}
var asn1 = {
  encodeDer(r2, s2) {
    const derR = new DERInteger(r2);
    const derS = new DERInteger(s2);
    const derSeq = new DERSequence([derR, derS]);
    return derSeq.getEncodedHex();
  },
  decodeDer(input) {
    const start = getStartOfV(input, 0);
    const vIndexR = getStartOfV(input, start);
    const lR = getL(input, start);
    const vR = input.substr(vIndexR, lR * 2);
    const nextStart = vIndexR + vR.length;
    const vIndexS = getStartOfV(input, nextStart);
    const lS = getL(input, nextStart);
    const vS = input.substr(vIndexS, lS * 2);
    const r2 = new BigInteger$3(vR, 16);
    const s2 = new BigInteger$3(vS, 16);
    return { r: r2, s: s2 };
  }
};
const { BigInteger: BigInteger$2 } = jsbn.exports;
const TWO = new BigInteger$2("2");
const THREE = new BigInteger$2("3");
class ECFieldElementFp {
  constructor(q2, x2) {
    this.x = x2;
    this.q = q2;
  }
  equals(other) {
    if (other === this)
      return true;
    return this.q.equals(other.q) && this.x.equals(other.x);
  }
  toBigInteger() {
    return this.x;
  }
  negate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
  }
  add(b2) {
    return new ECFieldElementFp(this.q, this.x.add(b2.toBigInteger()).mod(this.q));
  }
  subtract(b2) {
    return new ECFieldElementFp(this.q, this.x.subtract(b2.toBigInteger()).mod(this.q));
  }
  multiply(b2) {
    return new ECFieldElementFp(this.q, this.x.multiply(b2.toBigInteger()).mod(this.q));
  }
  divide(b2) {
    return new ECFieldElementFp(this.q, this.x.multiply(b2.toBigInteger().modInverse(this.q)).mod(this.q));
  }
  square() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
  }
}
class ECPointFp {
  constructor(curve2, x2, y2, z2) {
    this.curve = curve2;
    this.x = x2;
    this.y = y2;
    this.z = z2 == null ? BigInteger$2.ONE : z2;
    this.zinv = null;
  }
  getX() {
    if (this.zinv === null)
      this.zinv = this.z.modInverse(this.curve.q);
    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  getY() {
    if (this.zinv === null)
      this.zinv = this.z.modInverse(this.curve.q);
    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  equals(other) {
    if (other === this)
      return true;
    if (this.isInfinity())
      return other.isInfinity();
    if (other.isInfinity())
      return this.isInfinity();
    const u2 = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
    if (!u2.equals(BigInteger$2.ZERO))
      return false;
    const v2 = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
    return v2.equals(BigInteger$2.ZERO);
  }
  isInfinity() {
    if (this.x === null && this.y === null)
      return true;
    return this.z.equals(BigInteger$2.ZERO) && !this.y.toBigInteger().equals(BigInteger$2.ZERO);
  }
  negate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
  }
  add(b2) {
    if (this.isInfinity())
      return b2;
    if (b2.isInfinity())
      return this;
    const x1 = this.x.toBigInteger();
    const y1 = this.y.toBigInteger();
    const z1 = this.z;
    const x2 = b2.x.toBigInteger();
    const y2 = b2.y.toBigInteger();
    const z2 = b2.z;
    const q2 = this.curve.q;
    const w1 = x1.multiply(z2).mod(q2);
    const w2 = x2.multiply(z1).mod(q2);
    const w3 = w1.subtract(w2);
    const w4 = y1.multiply(z2).mod(q2);
    const w5 = y2.multiply(z1).mod(q2);
    const w6 = w4.subtract(w5);
    if (BigInteger$2.ZERO.equals(w3)) {
      if (BigInteger$2.ZERO.equals(w6)) {
        return this.twice();
      }
      return this.curve.infinity;
    }
    const w7 = w1.add(w2);
    const w8 = z1.multiply(z2).mod(q2);
    const w9 = w3.square().mod(q2);
    const w10 = w3.multiply(w9).mod(q2);
    const w11 = w8.multiply(w6.square()).subtract(w7.multiply(w9)).mod(q2);
    const x3 = w3.multiply(w11).mod(q2);
    const y3 = w6.multiply(w9.multiply(w1).subtract(w11)).subtract(w4.multiply(w10)).mod(q2);
    const z3 = w10.multiply(w8).mod(q2);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  }
  twice() {
    if (this.isInfinity())
      return this;
    if (!this.y.toBigInteger().signum())
      return this.curve.infinity;
    const x1 = this.x.toBigInteger();
    const y1 = this.y.toBigInteger();
    const z1 = this.z;
    const q2 = this.curve.q;
    const a2 = this.curve.a.toBigInteger();
    const w1 = x1.square().multiply(THREE).add(a2.multiply(z1.square())).mod(q2);
    const w2 = y1.shiftLeft(1).multiply(z1).mod(q2);
    const w3 = y1.square().mod(q2);
    const w4 = w3.multiply(x1).multiply(z1).mod(q2);
    const w5 = w2.square().mod(q2);
    const w6 = w1.square().subtract(w4.shiftLeft(3)).mod(q2);
    const x3 = w2.multiply(w6).mod(q2);
    const y3 = w1.multiply(w4.shiftLeft(2).subtract(w6)).subtract(w5.shiftLeft(1).multiply(w3)).mod(q2);
    const z3 = w2.multiply(w5).mod(q2);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  }
  multiply(k2) {
    if (this.isInfinity())
      return this;
    if (!k2.signum())
      return this.curve.infinity;
    const k3 = k2.multiply(THREE);
    const neg = this.negate();
    let Q2 = this;
    for (let i2 = k3.bitLength() - 2; i2 > 0; i2--) {
      Q2 = Q2.twice();
      const k3Bit = k3.testBit(i2);
      const kBit = k2.testBit(i2);
      if (k3Bit !== kBit) {
        Q2 = Q2.add(k3Bit ? this : neg);
      }
    }
    return Q2;
  }
}
class ECCurveFp$1 {
  constructor(q2, a2, b2) {
    this.q = q2;
    this.a = this.fromBigInteger(a2);
    this.b = this.fromBigInteger(b2);
    this.infinity = new ECPointFp(this, null, null);
  }
  equals(other) {
    if (other === this)
      return true;
    return this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b);
  }
  fromBigInteger(x2) {
    return new ECFieldElementFp(this.q, x2);
  }
  decodePointHex(s2) {
    switch (parseInt(s2.substr(0, 2), 16)) {
      case 0:
        return this.infinity;
      case 2:
      case 3:
        const x2 = this.fromBigInteger(new BigInteger$2(s2.substr(2), 16));
        let y2 = this.fromBigInteger(x2.multiply(x2.square()).add(x2.multiply(this.a)).add(this.b).toBigInteger().modPow(this.q.divide(new BigInteger$2("4")).add(BigInteger$2.ONE), this.q));
        if (!y2.toBigInteger().mod(TWO).equals(new BigInteger$2(s2.substr(0, 2), 16).subtract(TWO))) {
          y2 = y2.negate();
        }
        return new ECPointFp(this, x2, y2);
      case 4:
      case 6:
      case 7:
        const len = (s2.length - 2) / 2;
        const xHex = s2.substr(2, len);
        const yHex = s2.substr(len + 2, len);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger$2(xHex, 16)), this.fromBigInteger(new BigInteger$2(yHex, 16)));
      default:
        return null;
    }
  }
}
var ec = {
  ECPointFp,
  ECCurveFp: ECCurveFp$1
};
const { BigInteger: BigInteger$1, SecureRandom } = jsbn.exports;
const { ECCurveFp } = ec;
const rng = new SecureRandom();
const { curve: curve$1, G: G$2, n: n$2 } = generateEcparam();
function getGlobalCurve() {
  return curve$1;
}
function generateEcparam() {
  const p2 = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16);
  const a2 = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16);
  const b2 = new BigInteger$1("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16);
  const curve2 = new ECCurveFp(p2, a2, b2);
  const gxHex = "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7";
  const gyHex = "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0";
  const G2 = curve2.decodePointHex("04" + gxHex + gyHex);
  const n2 = new BigInteger$1("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16);
  return { curve: curve2, G: G2, n: n2 };
}
function generateKeyPairHex(a2, b2, c2) {
  const random = a2 ? new BigInteger$1(a2, b2, c2) : new BigInteger$1(n$2.bitLength(), rng);
  const d2 = random.mod(n$2.subtract(BigInteger$1.ONE)).add(BigInteger$1.ONE);
  const privateKey = leftPad$1(d2.toString(16), 64);
  const P2 = G$2.multiply(d2);
  const Px = leftPad$1(P2.getX().toBigInteger().toString(16), 64);
  const Py = leftPad$1(P2.getY().toBigInteger().toString(16), 64);
  const publicKey = "04" + Px + Py;
  return { privateKey, publicKey };
}
function compressPublicKeyHex(s2) {
  if (s2.length !== 130)
    throw new Error("Invalid public key to compress");
  const len = (s2.length - 2) / 2;
  const xHex = s2.substr(2, len);
  const y2 = new BigInteger$1(s2.substr(len + 2, len), 16);
  let prefix = "03";
  if (y2.mod(new BigInteger$1("2")).equals(BigInteger$1.ZERO))
    prefix = "02";
  return prefix + xHex;
}
function utf8ToHex(input) {
  input = unescape(encodeURIComponent(input));
  const length = input.length;
  const words = [];
  for (let i2 = 0; i2 < length; i2++) {
    words[i2 >>> 2] |= (input.charCodeAt(i2) & 255) << 24 - i2 % 4 * 8;
  }
  const hexChars = [];
  for (let i2 = 0; i2 < length; i2++) {
    const bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 15).toString(16));
  }
  return hexChars.join("");
}
function leftPad$1(input, num) {
  if (input.length >= num)
    return input;
  return new Array(num - input.length + 1).join("0") + input;
}
function arrayToHex(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function arrayToUtf8$1(arr) {
  const words = [];
  let j2 = 0;
  for (let i2 = 0; i2 < arr.length * 2; i2 += 2) {
    words[i2 >>> 3] |= parseInt(arr[j2], 10) << 24 - i2 % 8 * 4;
    j2++;
  }
  try {
    const latin1Chars = [];
    for (let i2 = 0; i2 < arr.length; i2++) {
      const bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
      latin1Chars.push(String.fromCharCode(bite));
    }
    return decodeURIComponent(escape(latin1Chars.join("")));
  } catch (e2) {
    throw new Error("Malformed UTF-8 data");
  }
}
function hexToArray$2(hexStr) {
  const words = [];
  let hexStrLength = hexStr.length;
  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad$1(hexStr, hexStrLength + 1);
  }
  hexStrLength = hexStr.length;
  for (let i2 = 0; i2 < hexStrLength; i2 += 2) {
    words.push(parseInt(hexStr.substr(i2, 2), 16));
  }
  return words;
}
function verifyPublicKey(publicKey) {
  const point = curve$1.decodePointHex(publicKey);
  if (!point)
    return false;
  const x2 = point.getX();
  const y2 = point.getY();
  return y2.square().equals(x2.multiply(x2.square()).add(x2.multiply(curve$1.a)).add(curve$1.b));
}
function comparePublicKeyHex(publicKey1, publicKey2) {
  const point1 = curve$1.decodePointHex(publicKey1);
  if (!point1)
    return false;
  const point2 = curve$1.decodePointHex(publicKey2);
  if (!point2)
    return false;
  return point1.equals(point2);
}
var utils = {
  getGlobalCurve,
  generateEcparam,
  generateKeyPairHex,
  compressPublicKeyHex,
  utf8ToHex,
  leftPad: leftPad$1,
  arrayToHex,
  arrayToUtf8: arrayToUtf8$1,
  hexToArray: hexToArray$2,
  verifyPublicKey,
  comparePublicKeyHex
};
const W$1 = new Uint32Array(68);
const M$1 = new Uint32Array(64);
function rotl$1(x2, n2) {
  const s2 = n2 & 31;
  return x2 << s2 | x2 >>> 32 - s2;
}
function xor(x2, y2) {
  const result = [];
  for (let i2 = x2.length - 1; i2 >= 0; i2--)
    result[i2] = (x2[i2] ^ y2[i2]) & 255;
  return result;
}
function P0(X2) {
  return X2 ^ rotl$1(X2, 9) ^ rotl$1(X2, 17);
}
function P1(X2) {
  return X2 ^ rotl$1(X2, 15) ^ rotl$1(X2, 23);
}
function sm3$2(array) {
  let len = array.length * 8;
  let k2 = len % 512;
  k2 = k2 >= 448 ? 512 - k2 % 448 - 1 : 448 - k2 - 1;
  const kArr = new Array((k2 - 7) / 8);
  const lenArr = new Array(8);
  for (let i2 = 0, len2 = kArr.length; i2 < len2; i2++)
    kArr[i2] = 0;
  for (let i2 = 0, len2 = lenArr.length; i2 < len2; i2++)
    lenArr[i2] = 0;
  len = len.toString(2);
  for (let i2 = 7; i2 >= 0; i2--) {
    if (len.length > 8) {
      const start = len.length - 8;
      lenArr[i2] = parseInt(len.substr(start), 2);
      len = len.substr(0, start);
    } else if (len.length > 0) {
      lenArr[i2] = parseInt(len, 2);
      len = "";
    }
  }
  const m2 = new Uint8Array([...array, 128, ...kArr, ...lenArr]);
  const dataView = new DataView(m2.buffer, 0);
  const n2 = m2.length / 64;
  const V2 = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]);
  for (let i2 = 0; i2 < n2; i2++) {
    W$1.fill(0);
    M$1.fill(0);
    const start = 16 * i2;
    for (let j2 = 0; j2 < 16; j2++) {
      W$1[j2] = dataView.getUint32((start + j2) * 4, false);
    }
    for (let j2 = 16; j2 < 68; j2++) {
      W$1[j2] = P1(W$1[j2 - 16] ^ W$1[j2 - 9] ^ rotl$1(W$1[j2 - 3], 15)) ^ rotl$1(W$1[j2 - 13], 7) ^ W$1[j2 - 6];
    }
    for (let j2 = 0; j2 < 64; j2++) {
      M$1[j2] = W$1[j2] ^ W$1[j2 + 4];
    }
    const T1 = 2043430169;
    const T2 = 2055708042;
    let A2 = V2[0];
    let B2 = V2[1];
    let C2 = V2[2];
    let D2 = V2[3];
    let E2 = V2[4];
    let F2 = V2[5];
    let G2 = V2[6];
    let H2 = V2[7];
    let SS1;
    let SS2;
    let TT1;
    let TT2;
    let T3;
    for (let j2 = 0; j2 < 64; j2++) {
      T3 = j2 >= 0 && j2 <= 15 ? T1 : T2;
      SS1 = rotl$1(rotl$1(A2, 12) + E2 + rotl$1(T3, j2), 7);
      SS2 = SS1 ^ rotl$1(A2, 12);
      TT1 = (j2 >= 0 && j2 <= 15 ? A2 ^ B2 ^ C2 : A2 & B2 | A2 & C2 | B2 & C2) + D2 + SS2 + M$1[j2];
      TT2 = (j2 >= 0 && j2 <= 15 ? E2 ^ F2 ^ G2 : E2 & F2 | ~E2 & G2) + H2 + SS1 + W$1[j2];
      D2 = C2;
      C2 = rotl$1(B2, 9);
      B2 = A2;
      A2 = TT1;
      H2 = G2;
      G2 = rotl$1(F2, 19);
      F2 = E2;
      E2 = P0(TT2);
    }
    V2[0] ^= A2;
    V2[1] ^= B2;
    V2[2] ^= C2;
    V2[3] ^= D2;
    V2[4] ^= E2;
    V2[5] ^= F2;
    V2[6] ^= G2;
    V2[7] ^= H2;
  }
  const result = [];
  for (let i2 = 0, len2 = V2.length; i2 < len2; i2++) {
    const word = V2[i2];
    result.push((word & 4278190080) >>> 24, (word & 16711680) >>> 16, (word & 65280) >>> 8, word & 255);
  }
  return result;
}
const blockLen = 64;
const iPad = new Uint8Array(blockLen);
const oPad = new Uint8Array(blockLen);
for (let i2 = 0; i2 < blockLen; i2++) {
  iPad[i2] = 54;
  oPad[i2] = 92;
}
function hmac$1(input, key) {
  if (key.length > blockLen)
    key = sm3$2(key);
  while (key.length < blockLen)
    key.push(0);
  const iPadKey = xor(key, iPad);
  const oPadKey = xor(key, oPad);
  const hash = sm3$2([...iPadKey, ...input]);
  return sm3$2([...oPadKey, ...hash]);
}
var sm3_1$1 = {
  sm3: sm3$2,
  hmac: hmac$1
};
const { BigInteger } = jsbn.exports;
const { encodeDer, decodeDer } = asn1;
const _$1 = utils;
const sm3$1 = sm3_1$1.sm3;
const { G: G$1, curve, n: n$1 } = _$1.generateEcparam();
const C1C2C3 = 0;
function doEncrypt(msg, publicKey, cipherMode = 1) {
  msg = typeof msg === "string" ? _$1.hexToArray(_$1.utf8ToHex(msg)) : Array.prototype.slice.call(msg);
  publicKey = _$1.getGlobalCurve().decodePointHex(publicKey);
  const keypair = _$1.generateKeyPairHex();
  const k2 = new BigInteger(keypair.privateKey, 16);
  let c1 = keypair.publicKey;
  if (c1.length > 128)
    c1 = c1.substr(c1.length - 128);
  const p2 = publicKey.multiply(k2);
  const x2 = _$1.hexToArray(_$1.leftPad(p2.getX().toBigInteger().toRadix(16), 64));
  const y2 = _$1.hexToArray(_$1.leftPad(p2.getY().toBigInteger().toRadix(16), 64));
  const c3 = _$1.arrayToHex(sm3$1([].concat(x2, msg, y2)));
  let ct2 = 1;
  let offset = 0;
  let t2 = [];
  const z2 = [].concat(x2, y2);
  const nextT = () => {
    t2 = sm3$1([...z2, ct2 >> 24 & 255, ct2 >> 16 & 255, ct2 >> 8 & 255, ct2 & 255]);
    ct2++;
    offset = 0;
  };
  nextT();
  for (let i2 = 0, len = msg.length; i2 < len; i2++) {
    if (offset === t2.length)
      nextT();
    msg[i2] ^= t2[offset++] & 255;
  }
  const c2 = _$1.arrayToHex(msg);
  return cipherMode === C1C2C3 ? c1 + c2 + c3 : c1 + c3 + c2;
}
function doDecrypt(encryptData, privateKey, cipherMode = 1, {
  output = "string"
} = {}) {
  privateKey = new BigInteger(privateKey, 16);
  let c3 = encryptData.substr(128, 64);
  let c2 = encryptData.substr(128 + 64);
  if (cipherMode === C1C2C3) {
    c3 = encryptData.substr(encryptData.length - 64);
    c2 = encryptData.substr(128, encryptData.length - 128 - 64);
  }
  const msg = _$1.hexToArray(c2);
  const c1 = _$1.getGlobalCurve().decodePointHex("04" + encryptData.substr(0, 128));
  const p2 = c1.multiply(privateKey);
  const x2 = _$1.hexToArray(_$1.leftPad(p2.getX().toBigInteger().toRadix(16), 64));
  const y2 = _$1.hexToArray(_$1.leftPad(p2.getY().toBigInteger().toRadix(16), 64));
  let ct2 = 1;
  let offset = 0;
  let t2 = [];
  const z2 = [].concat(x2, y2);
  const nextT = () => {
    t2 = sm3$1([...z2, ct2 >> 24 & 255, ct2 >> 16 & 255, ct2 >> 8 & 255, ct2 & 255]);
    ct2++;
    offset = 0;
  };
  nextT();
  for (let i2 = 0, len = msg.length; i2 < len; i2++) {
    if (offset === t2.length)
      nextT();
    msg[i2] ^= t2[offset++] & 255;
  }
  const checkC3 = _$1.arrayToHex(sm3$1([].concat(x2, msg, y2)));
  if (checkC3 === c3.toLowerCase()) {
    return output === "array" ? msg : _$1.arrayToUtf8(msg);
  } else {
    return output === "array" ? [] : "";
  }
}
function doSignature(msg, privateKey, {
  pointPool,
  der,
  hash,
  publicKey,
  userId
} = {}) {
  let hashHex = typeof msg === "string" ? _$1.utf8ToHex(msg) : _$1.arrayToHex(msg);
  if (hash) {
    publicKey = publicKey || getPublicKeyFromPrivateKey(privateKey);
    hashHex = getHash(hashHex, publicKey, userId);
  }
  const dA = new BigInteger(privateKey, 16);
  const e2 = new BigInteger(hashHex, 16);
  let k2 = null;
  let r2 = null;
  let s2 = null;
  do {
    do {
      let point;
      if (pointPool && pointPool.length) {
        point = pointPool.pop();
      } else {
        point = getPoint();
      }
      k2 = point.k;
      r2 = e2.add(point.x1).mod(n$1);
    } while (r2.equals(BigInteger.ZERO) || r2.add(k2).equals(n$1));
    s2 = dA.add(BigInteger.ONE).modInverse(n$1).multiply(k2.subtract(r2.multiply(dA))).mod(n$1);
  } while (s2.equals(BigInteger.ZERO));
  if (der)
    return encodeDer(r2, s2);
  return _$1.leftPad(r2.toString(16), 64) + _$1.leftPad(s2.toString(16), 64);
}
function doVerifySignature(msg, signHex, publicKey, { der, hash, userId } = {}) {
  let hashHex = typeof msg === "string" ? _$1.utf8ToHex(msg) : _$1.arrayToHex(msg);
  if (hash) {
    hashHex = getHash(hashHex, publicKey, userId);
  }
  let r2;
  let s2;
  if (der) {
    const decodeDerObj = decodeDer(signHex);
    r2 = decodeDerObj.r;
    s2 = decodeDerObj.s;
  } else {
    r2 = new BigInteger(signHex.substring(0, 64), 16);
    s2 = new BigInteger(signHex.substring(64), 16);
  }
  const PA = curve.decodePointHex(publicKey);
  const e2 = new BigInteger(hashHex, 16);
  const t2 = r2.add(s2).mod(n$1);
  if (t2.equals(BigInteger.ZERO))
    return false;
  const x1y1 = G$1.multiply(s2).add(PA.multiply(t2));
  const R2 = e2.add(x1y1.getX().toBigInteger()).mod(n$1);
  return r2.equals(R2);
}
function getHash(hashHex, publicKey, userId = "1234567812345678") {
  userId = _$1.utf8ToHex(userId);
  const a2 = _$1.leftPad(G$1.curve.a.toBigInteger().toRadix(16), 64);
  const b2 = _$1.leftPad(G$1.curve.b.toBigInteger().toRadix(16), 64);
  const gx = _$1.leftPad(G$1.getX().toBigInteger().toRadix(16), 64);
  const gy = _$1.leftPad(G$1.getY().toBigInteger().toRadix(16), 64);
  let px;
  let py;
  if (publicKey.length === 128) {
    px = publicKey.substr(0, 64);
    py = publicKey.substr(64, 64);
  } else {
    const point = G$1.curve.decodePointHex(publicKey);
    px = _$1.leftPad(point.getX().toBigInteger().toRadix(16), 64);
    py = _$1.leftPad(point.getY().toBigInteger().toRadix(16), 64);
  }
  const data = _$1.hexToArray(userId + a2 + b2 + gx + gy + px + py);
  const entl = userId.length * 4;
  data.unshift(entl & 255);
  data.unshift(entl >> 8 & 255);
  const z2 = sm3$1(data);
  return _$1.arrayToHex(sm3$1(z2.concat(_$1.hexToArray(hashHex))));
}
function getPublicKeyFromPrivateKey(privateKey) {
  const PA = G$1.multiply(new BigInteger(privateKey, 16));
  const x2 = _$1.leftPad(PA.getX().toBigInteger().toString(16), 64);
  const y2 = _$1.leftPad(PA.getY().toBigInteger().toString(16), 64);
  return "04" + x2 + y2;
}
function getPoint() {
  const keypair = _$1.generateKeyPairHex();
  const PA = curve.decodePointHex(keypair.publicKey);
  keypair.k = new BigInteger(keypair.privateKey, 16);
  keypair.x1 = PA.getX().toBigInteger();
  return keypair;
}
var sm2 = {
  generateKeyPairHex: _$1.generateKeyPairHex,
  compressPublicKeyHex: _$1.compressPublicKeyHex,
  comparePublicKeyHex: _$1.comparePublicKeyHex,
  doEncrypt,
  doDecrypt,
  doSignature,
  doVerifySignature,
  getPublicKeyFromPrivateKey,
  getPoint,
  verifyPublicKey: _$1.verifyPublicKey
};
const { sm3, hmac } = sm3_1$1;
function leftPad(input, num) {
  if (input.length >= num)
    return input;
  return new Array(num - input.length + 1).join("0") + input;
}
function ArrayToHex$1(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function hexToArray$1(hexStr) {
  const words = [];
  let hexStrLength = hexStr.length;
  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad(hexStr, hexStrLength + 1);
  }
  hexStrLength = hexStr.length;
  for (let i2 = 0; i2 < hexStrLength; i2 += 2) {
    words.push(parseInt(hexStr.substr(i2, 2), 16));
  }
  return words;
}
function utf8ToArray$1(str) {
  const arr = [];
  for (let i2 = 0, len = str.length; i2 < len; i2++) {
    const point = str.codePointAt(i2);
    if (point <= 127) {
      arr.push(point);
    } else if (point <= 2047) {
      arr.push(192 | point >>> 6);
      arr.push(128 | point & 63);
    } else if (point <= 55295 || point >= 57344 && point <= 65535) {
      arr.push(224 | point >>> 12);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else if (point >= 65536 && point <= 1114111) {
      i2++;
      arr.push(240 | point >>> 18 & 28);
      arr.push(128 | point >>> 12 & 63);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else {
      arr.push(point);
      throw new Error("input is not supported");
    }
  }
  return arr;
}
var sm3_1 = function(input, options) {
  input = typeof input === "string" ? utf8ToArray$1(input) : Array.prototype.slice.call(input);
  if (options) {
    const mode = options.mode || "hmac";
    if (mode !== "hmac")
      throw new Error("invalid mode");
    let key = options.key;
    if (!key)
      throw new Error("invalid key");
    key = typeof key === "string" ? hexToArray$1(key) : Array.prototype.slice.call(key);
    return ArrayToHex$1(hmac(input, key));
  }
  return ArrayToHex$1(sm3(input));
};
const DECRYPT = 0;
const ROUND = 32;
const BLOCK = 16;
const Sbox = [
  214,
  144,
  233,
  254,
  204,
  225,
  61,
  183,
  22,
  182,
  20,
  194,
  40,
  251,
  44,
  5,
  43,
  103,
  154,
  118,
  42,
  190,
  4,
  195,
  170,
  68,
  19,
  38,
  73,
  134,
  6,
  153,
  156,
  66,
  80,
  244,
  145,
  239,
  152,
  122,
  51,
  84,
  11,
  67,
  237,
  207,
  172,
  98,
  228,
  179,
  28,
  169,
  201,
  8,
  232,
  149,
  128,
  223,
  148,
  250,
  117,
  143,
  63,
  166,
  71,
  7,
  167,
  252,
  243,
  115,
  23,
  186,
  131,
  89,
  60,
  25,
  230,
  133,
  79,
  168,
  104,
  107,
  129,
  178,
  113,
  100,
  218,
  139,
  248,
  235,
  15,
  75,
  112,
  86,
  157,
  53,
  30,
  36,
  14,
  94,
  99,
  88,
  209,
  162,
  37,
  34,
  124,
  59,
  1,
  33,
  120,
  135,
  212,
  0,
  70,
  87,
  159,
  211,
  39,
  82,
  76,
  54,
  2,
  231,
  160,
  196,
  200,
  158,
  234,
  191,
  138,
  210,
  64,
  199,
  56,
  181,
  163,
  247,
  242,
  206,
  249,
  97,
  21,
  161,
  224,
  174,
  93,
  164,
  155,
  52,
  26,
  85,
  173,
  147,
  50,
  48,
  245,
  140,
  177,
  227,
  29,
  246,
  226,
  46,
  130,
  102,
  202,
  96,
  192,
  41,
  35,
  171,
  13,
  83,
  78,
  111,
  213,
  219,
  55,
  69,
  222,
  253,
  142,
  47,
  3,
  255,
  106,
  114,
  109,
  108,
  91,
  81,
  141,
  27,
  175,
  146,
  187,
  221,
  188,
  127,
  17,
  217,
  92,
  65,
  31,
  16,
  90,
  216,
  10,
  193,
  49,
  136,
  165,
  205,
  123,
  189,
  45,
  116,
  208,
  18,
  184,
  229,
  180,
  176,
  137,
  105,
  151,
  74,
  12,
  150,
  119,
  126,
  101,
  185,
  241,
  9,
  197,
  110,
  198,
  132,
  24,
  240,
  125,
  236,
  58,
  220,
  77,
  32,
  121,
  238,
  95,
  62,
  215,
  203,
  57,
  72
];
const CK = [
  462357,
  472066609,
  943670861,
  1415275113,
  1886879365,
  2358483617,
  2830087869,
  3301692121,
  3773296373,
  4228057617,
  404694573,
  876298825,
  1347903077,
  1819507329,
  2291111581,
  2762715833,
  3234320085,
  3705924337,
  4177462797,
  337322537,
  808926789,
  1280531041,
  1752135293,
  2223739545,
  2695343797,
  3166948049,
  3638552301,
  4110090761,
  269950501,
  741554753,
  1213159005,
  1684763257
];
function hexToArray(str) {
  const arr = [];
  for (let i2 = 0, len = str.length; i2 < len; i2 += 2) {
    arr.push(parseInt(str.substr(i2, 2), 16));
  }
  return arr;
}
function ArrayToHex(arr) {
  return arr.map((item) => {
    item = item.toString(16);
    return item.length === 1 ? "0" + item : item;
  }).join("");
}
function utf8ToArray(str) {
  const arr = [];
  for (let i2 = 0, len = str.length; i2 < len; i2++) {
    const point = str.codePointAt(i2);
    if (point <= 127) {
      arr.push(point);
    } else if (point <= 2047) {
      arr.push(192 | point >>> 6);
      arr.push(128 | point & 63);
    } else if (point <= 55295 || point >= 57344 && point <= 65535) {
      arr.push(224 | point >>> 12);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else if (point >= 65536 && point <= 1114111) {
      i2++;
      arr.push(240 | point >>> 18 & 28);
      arr.push(128 | point >>> 12 & 63);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else {
      arr.push(point);
      throw new Error("input is not supported");
    }
  }
  return arr;
}
function arrayToUtf8(arr) {
  const str = [];
  for (let i2 = 0, len = arr.length; i2 < len; i2++) {
    if (arr[i2] >= 240 && arr[i2] <= 247) {
      str.push(String.fromCodePoint(((arr[i2] & 7) << 18) + ((arr[i2 + 1] & 63) << 12) + ((arr[i2 + 2] & 63) << 6) + (arr[i2 + 3] & 63)));
      i2 += 3;
    } else if (arr[i2] >= 224 && arr[i2] <= 239) {
      str.push(String.fromCodePoint(((arr[i2] & 15) << 12) + ((arr[i2 + 1] & 63) << 6) + (arr[i2 + 2] & 63)));
      i2 += 2;
    } else if (arr[i2] >= 192 && arr[i2] <= 223) {
      str.push(String.fromCodePoint(((arr[i2] & 31) << 6) + (arr[i2 + 1] & 63)));
      i2++;
    } else {
      str.push(String.fromCodePoint(arr[i2]));
    }
  }
  return str.join("");
}
function rotl(x2, n2) {
  const s2 = n2 & 31;
  return x2 << s2 | x2 >>> 32 - s2;
}
function byteSub(a2) {
  return (Sbox[a2 >>> 24 & 255] & 255) << 24 | (Sbox[a2 >>> 16 & 255] & 255) << 16 | (Sbox[a2 >>> 8 & 255] & 255) << 8 | Sbox[a2 & 255] & 255;
}
function l1(b2) {
  return b2 ^ rotl(b2, 2) ^ rotl(b2, 10) ^ rotl(b2, 18) ^ rotl(b2, 24);
}
function l2(b2) {
  return b2 ^ rotl(b2, 13) ^ rotl(b2, 23);
}
function sms4Crypt(input, output, roundKey) {
  const x2 = new Array(4);
  const tmp = new Array(4);
  for (let i2 = 0; i2 < 4; i2++) {
    tmp[0] = input[4 * i2] & 255;
    tmp[1] = input[4 * i2 + 1] & 255;
    tmp[2] = input[4 * i2 + 2] & 255;
    tmp[3] = input[4 * i2 + 3] & 255;
    x2[i2] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }
  for (let r2 = 0, mid; r2 < 32; r2 += 4) {
    mid = x2[1] ^ x2[2] ^ x2[3] ^ roundKey[r2 + 0];
    x2[0] ^= l1(byteSub(mid));
    mid = x2[2] ^ x2[3] ^ x2[0] ^ roundKey[r2 + 1];
    x2[1] ^= l1(byteSub(mid));
    mid = x2[3] ^ x2[0] ^ x2[1] ^ roundKey[r2 + 2];
    x2[2] ^= l1(byteSub(mid));
    mid = x2[0] ^ x2[1] ^ x2[2] ^ roundKey[r2 + 3];
    x2[3] ^= l1(byteSub(mid));
  }
  for (let j2 = 0; j2 < 16; j2 += 4) {
    output[j2] = x2[3 - j2 / 4] >>> 24 & 255;
    output[j2 + 1] = x2[3 - j2 / 4] >>> 16 & 255;
    output[j2 + 2] = x2[3 - j2 / 4] >>> 8 & 255;
    output[j2 + 3] = x2[3 - j2 / 4] & 255;
  }
}
function sms4KeyExt(key, roundKey, cryptFlag) {
  const x2 = new Array(4);
  const tmp = new Array(4);
  for (let i2 = 0; i2 < 4; i2++) {
    tmp[0] = key[0 + 4 * i2] & 255;
    tmp[1] = key[1 + 4 * i2] & 255;
    tmp[2] = key[2 + 4 * i2] & 255;
    tmp[3] = key[3 + 4 * i2] & 255;
    x2[i2] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }
  x2[0] ^= 2746333894;
  x2[1] ^= 1453994832;
  x2[2] ^= 1736282519;
  x2[3] ^= 2993693404;
  for (let r2 = 0, mid; r2 < 32; r2 += 4) {
    mid = x2[1] ^ x2[2] ^ x2[3] ^ CK[r2 + 0];
    roundKey[r2 + 0] = x2[0] ^= l2(byteSub(mid));
    mid = x2[2] ^ x2[3] ^ x2[0] ^ CK[r2 + 1];
    roundKey[r2 + 1] = x2[1] ^= l2(byteSub(mid));
    mid = x2[3] ^ x2[0] ^ x2[1] ^ CK[r2 + 2];
    roundKey[r2 + 2] = x2[2] ^= l2(byteSub(mid));
    mid = x2[0] ^ x2[1] ^ x2[2] ^ CK[r2 + 3];
    roundKey[r2 + 3] = x2[3] ^= l2(byteSub(mid));
  }
  if (cryptFlag === DECRYPT) {
    for (let r2 = 0, mid; r2 < 16; r2++) {
      mid = roundKey[r2];
      roundKey[r2] = roundKey[31 - r2];
      roundKey[31 - r2] = mid;
    }
  }
}
function sm4(inArray, key, cryptFlag, {
  padding = "pkcs#7",
  mode,
  iv = [],
  output = "string"
} = {}) {
  if (mode === "cbc") {
    if (typeof iv === "string")
      iv = hexToArray(iv);
    if (iv.length !== 128 / 8) {
      throw new Error("iv is invalid");
    }
  }
  if (typeof key === "string")
    key = hexToArray(key);
  if (key.length !== 128 / 8) {
    throw new Error("key is invalid");
  }
  if (typeof inArray === "string") {
    if (cryptFlag !== DECRYPT) {
      inArray = utf8ToArray(inArray);
    } else {
      inArray = hexToArray(inArray);
    }
  } else {
    inArray = [...inArray];
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag !== DECRYPT) {
    const paddingCount = BLOCK - inArray.length % BLOCK;
    for (let i2 = 0; i2 < paddingCount; i2++)
      inArray.push(paddingCount);
  }
  const roundKey = new Array(ROUND);
  sms4KeyExt(key, roundKey, cryptFlag);
  const outArray = [];
  let lastVector = iv;
  let restLen = inArray.length;
  let point = 0;
  while (restLen >= BLOCK) {
    const input = inArray.slice(point, point + 16);
    const output2 = new Array(16);
    if (mode === "cbc") {
      for (let i2 = 0; i2 < BLOCK; i2++) {
        if (cryptFlag !== DECRYPT) {
          input[i2] ^= lastVector[i2];
        }
      }
    }
    sms4Crypt(input, output2, roundKey);
    for (let i2 = 0; i2 < BLOCK; i2++) {
      if (mode === "cbc") {
        if (cryptFlag === DECRYPT) {
          output2[i2] ^= lastVector[i2];
        }
      }
      outArray[point + i2] = output2[i2];
    }
    if (mode === "cbc") {
      if (cryptFlag !== DECRYPT) {
        lastVector = output2;
      } else {
        lastVector = input;
      }
    }
    restLen -= BLOCK;
    point += BLOCK;
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag === DECRYPT) {
    const len = outArray.length;
    const paddingCount = outArray[len - 1];
    for (let i2 = 1; i2 <= paddingCount; i2++) {
      if (outArray[len - i2] !== paddingCount)
        throw new Error("padding is invalid");
    }
    outArray.splice(len - paddingCount, paddingCount);
  }
  if (output !== "array") {
    if (cryptFlag !== DECRYPT) {
      return ArrayToHex(outArray);
    } else {
      return arrayToUtf8(outArray);
    }
  } else {
    return outArray;
  }
}
var sm4_1 = {
  encrypt(inArray, key, options) {
    return sm4(inArray, key, 1, options);
  },
  decrypt(inArray, key, options) {
    return sm4(inArray, key, 0, options);
  }
};
var src = {
  sm2,
  sm3: sm3_1,
  sm4: sm4_1
};
var md5 = { exports: {} };
var __viteBrowserExternal = new Proxy({}, {
  get() {
    throw new Error('Module "" has been externalized for browser compatibility and cannot be accessed in client code.');
  }
});
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": __viteBrowserExternal
});
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.8.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2023
 * @license MIT
 */
(function(module) {
  (function() {
    var INPUT_ERROR = "input is invalid type";
    var FINALIZE_ERROR = "finalize already called";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_MD5_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && true && module.exports;
    var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var EXTRA = [128, 32768, 8388608, -2147483648];
    var SHIFT = [0, 8, 16, 24];
    var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"];
    var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    var blocks = [], buffer8;
    if (ARRAY_BUFFER) {
      var buffer = new ArrayBuffer(68);
      buffer8 = new Uint8Array(buffer);
      blocks = new Uint32Array(buffer);
    }
    var isArray2 = Array.isArray;
    if (root.JS_MD5_NO_NODE_JS || !isArray2) {
      isArray2 = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    var isView = ArrayBuffer.isView;
    if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !isView)) {
      isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var formatMessage = function(message) {
      var type = typeof message;
      if (type === "string") {
        return [message, true];
      }
      if (type !== "object" || message === null) {
        throw new Error(INPUT_ERROR);
      }
      if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
        return [new Uint8Array(message), false];
      }
      if (!isArray2(message) && !isView(message)) {
        throw new Error(INPUT_ERROR);
      }
      return [message, false];
    };
    var createOutputMethod = function(outputType) {
      return function(message) {
        return new Md5(true).update(message)[outputType]();
      };
    };
    var createMethod = function() {
      var method = createOutputMethod("hex");
      if (NODE_JS) {
        method = nodeWrap(method);
      }
      method.create = function() {
        return new Md5();
      };
      method.update = function(message) {
        return method.create().update(message);
      };
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createOutputMethod(type);
      }
      return method;
    };
    var nodeWrap = function(method) {
      var crypto = require$$1;
      var Buffer2 = require$$1.Buffer;
      var bufferFrom;
      if (Buffer2.from && !root.JS_MD5_NO_BUFFER_FROM) {
        bufferFrom = Buffer2.from;
      } else {
        bufferFrom = function(message) {
          return new Buffer2(message);
        };
      }
      var nodeMethod = function(message) {
        if (typeof message === "string") {
          return crypto.createHash("md5").update(message, "utf8").digest("hex");
        } else {
          if (message === null || message === void 0) {
            throw new Error(INPUT_ERROR);
          } else if (message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          }
        }
        if (isArray2(message) || isView(message) || message.constructor === Buffer2) {
          return crypto.createHash("md5").update(bufferFrom(message)).digest("hex");
        } else {
          return method(message);
        }
      };
      return nodeMethod;
    };
    var createHmacOutputMethod = function(outputType) {
      return function(key, message) {
        return new HmacMd5(key, true).update(message)[outputType]();
      };
    };
    var createHmacMethod = function() {
      var method = createHmacOutputMethod("hex");
      method.create = function(key) {
        return new HmacMd5(key);
      };
      method.update = function(key, message) {
        return method.create(key).update(message);
      };
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createHmacOutputMethod(type);
      }
      return method;
    };
    function Md5(sharedMemory) {
      if (sharedMemory) {
        blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        this.blocks = blocks;
        this.buffer8 = buffer8;
      } else {
        if (ARRAY_BUFFER) {
          var buffer2 = new ArrayBuffer(68);
          this.buffer8 = new Uint8Array(buffer2);
          this.blocks = new Uint32Array(buffer2);
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
      }
      this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
      this.finalized = this.hashed = false;
      this.first = true;
    }
    Md5.prototype.update = function(message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var result = formatMessage(message);
      message = result[0];
      var isString2 = result[1];
      var code, index2 = 0, i2, length = message.length, blocks2 = this.blocks;
      var buffer82 = this.buffer8;
      while (index2 < length) {
        if (this.hashed) {
          this.hashed = false;
          blocks2[0] = blocks2[16];
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        if (isString2) {
          if (ARRAY_BUFFER) {
            for (i2 = this.start; index2 < length && i2 < 64; ++index2) {
              code = message.charCodeAt(index2);
              if (code < 128) {
                buffer82[i2++] = code;
              } else if (code < 2048) {
                buffer82[i2++] = 192 | code >>> 6;
                buffer82[i2++] = 128 | code & 63;
              } else if (code < 55296 || code >= 57344) {
                buffer82[i2++] = 224 | code >>> 12;
                buffer82[i2++] = 128 | code >>> 6 & 63;
                buffer82[i2++] = 128 | code & 63;
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index2) & 1023);
                buffer82[i2++] = 240 | code >>> 18;
                buffer82[i2++] = 128 | code >>> 12 & 63;
                buffer82[i2++] = 128 | code >>> 6 & 63;
                buffer82[i2++] = 128 | code & 63;
              }
            }
          } else {
            for (i2 = this.start; index2 < length && i2 < 64; ++index2) {
              code = message.charCodeAt(index2);
              if (code < 128) {
                blocks2[i2 >>> 2] |= code << SHIFT[i2++ & 3];
              } else if (code < 2048) {
                blocks2[i2 >>> 2] |= (192 | code >>> 6) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i2 >>> 2] |= (224 | code >>> 12) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index2) & 1023);
                blocks2[i2 >>> 2] |= (240 | code >>> 18) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code >>> 12 & 63) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i2++ & 3];
                blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              }
            }
          }
        } else {
          if (ARRAY_BUFFER) {
            for (i2 = this.start; index2 < length && i2 < 64; ++index2) {
              buffer82[i2++] = message[index2];
            }
          } else {
            for (i2 = this.start; index2 < length && i2 < 64; ++index2) {
              blocks2[i2 >>> 2] |= message[index2] << SHIFT[i2++ & 3];
            }
          }
        }
        this.lastByteIndex = i2;
        this.bytes += i2 - this.start;
        if (i2 >= 64) {
          this.start = i2 - 64;
          this.hash();
          this.hashed = true;
        } else {
          this.start = i2;
        }
      }
      if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
      }
      return this;
    };
    Md5.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks2 = this.blocks, i2 = this.lastByteIndex;
      blocks2[i2 >>> 2] |= EXTRA[i2 & 3];
      if (i2 >= 56) {
        if (!this.hashed) {
          this.hash();
        }
        blocks2[0] = blocks2[16];
        blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
      }
      blocks2[14] = this.bytes << 3;
      blocks2[15] = this.hBytes << 3 | this.bytes >>> 29;
      this.hash();
    };
    Md5.prototype.hash = function() {
      var a2, b2, c2, d2, bc, da, blocks2 = this.blocks;
      if (this.first) {
        a2 = blocks2[0] - 680876937;
        a2 = (a2 << 7 | a2 >>> 25) - 271733879 << 0;
        d2 = (-1732584194 ^ a2 & 2004318071) + blocks2[1] - 117830708;
        d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
        c2 = (-271733879 ^ d2 & (a2 ^ -271733879)) + blocks2[2] - 1126478375;
        c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
        b2 = (a2 ^ c2 & (d2 ^ a2)) + blocks2[3] - 1316259209;
        b2 = (b2 << 22 | b2 >>> 10) + c2 << 0;
      } else {
        a2 = this.h0;
        b2 = this.h1;
        c2 = this.h2;
        d2 = this.h3;
        a2 += (d2 ^ b2 & (c2 ^ d2)) + blocks2[0] - 680876936;
        a2 = (a2 << 7 | a2 >>> 25) + b2 << 0;
        d2 += (c2 ^ a2 & (b2 ^ c2)) + blocks2[1] - 389564586;
        d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
        c2 += (b2 ^ d2 & (a2 ^ b2)) + blocks2[2] + 606105819;
        c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
        b2 += (a2 ^ c2 & (d2 ^ a2)) + blocks2[3] - 1044525330;
        b2 = (b2 << 22 | b2 >>> 10) + c2 << 0;
      }
      a2 += (d2 ^ b2 & (c2 ^ d2)) + blocks2[4] - 176418897;
      a2 = (a2 << 7 | a2 >>> 25) + b2 << 0;
      d2 += (c2 ^ a2 & (b2 ^ c2)) + blocks2[5] + 1200080426;
      d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
      c2 += (b2 ^ d2 & (a2 ^ b2)) + blocks2[6] - 1473231341;
      c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
      b2 += (a2 ^ c2 & (d2 ^ a2)) + blocks2[7] - 45705983;
      b2 = (b2 << 22 | b2 >>> 10) + c2 << 0;
      a2 += (d2 ^ b2 & (c2 ^ d2)) + blocks2[8] + 1770035416;
      a2 = (a2 << 7 | a2 >>> 25) + b2 << 0;
      d2 += (c2 ^ a2 & (b2 ^ c2)) + blocks2[9] - 1958414417;
      d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
      c2 += (b2 ^ d2 & (a2 ^ b2)) + blocks2[10] - 42063;
      c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
      b2 += (a2 ^ c2 & (d2 ^ a2)) + blocks2[11] - 1990404162;
      b2 = (b2 << 22 | b2 >>> 10) + c2 << 0;
      a2 += (d2 ^ b2 & (c2 ^ d2)) + blocks2[12] + 1804603682;
      a2 = (a2 << 7 | a2 >>> 25) + b2 << 0;
      d2 += (c2 ^ a2 & (b2 ^ c2)) + blocks2[13] - 40341101;
      d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
      c2 += (b2 ^ d2 & (a2 ^ b2)) + blocks2[14] - 1502002290;
      c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
      b2 += (a2 ^ c2 & (d2 ^ a2)) + blocks2[15] + 1236535329;
      b2 = (b2 << 22 | b2 >>> 10) + c2 << 0;
      a2 += (c2 ^ d2 & (b2 ^ c2)) + blocks2[1] - 165796510;
      a2 = (a2 << 5 | a2 >>> 27) + b2 << 0;
      d2 += (b2 ^ c2 & (a2 ^ b2)) + blocks2[6] - 1069501632;
      d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
      c2 += (a2 ^ b2 & (d2 ^ a2)) + blocks2[11] + 643717713;
      c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
      b2 += (d2 ^ a2 & (c2 ^ d2)) + blocks2[0] - 373897302;
      b2 = (b2 << 20 | b2 >>> 12) + c2 << 0;
      a2 += (c2 ^ d2 & (b2 ^ c2)) + blocks2[5] - 701558691;
      a2 = (a2 << 5 | a2 >>> 27) + b2 << 0;
      d2 += (b2 ^ c2 & (a2 ^ b2)) + blocks2[10] + 38016083;
      d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
      c2 += (a2 ^ b2 & (d2 ^ a2)) + blocks2[15] - 660478335;
      c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
      b2 += (d2 ^ a2 & (c2 ^ d2)) + blocks2[4] - 405537848;
      b2 = (b2 << 20 | b2 >>> 12) + c2 << 0;
      a2 += (c2 ^ d2 & (b2 ^ c2)) + blocks2[9] + 568446438;
      a2 = (a2 << 5 | a2 >>> 27) + b2 << 0;
      d2 += (b2 ^ c2 & (a2 ^ b2)) + blocks2[14] - 1019803690;
      d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
      c2 += (a2 ^ b2 & (d2 ^ a2)) + blocks2[3] - 187363961;
      c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
      b2 += (d2 ^ a2 & (c2 ^ d2)) + blocks2[8] + 1163531501;
      b2 = (b2 << 20 | b2 >>> 12) + c2 << 0;
      a2 += (c2 ^ d2 & (b2 ^ c2)) + blocks2[13] - 1444681467;
      a2 = (a2 << 5 | a2 >>> 27) + b2 << 0;
      d2 += (b2 ^ c2 & (a2 ^ b2)) + blocks2[2] - 51403784;
      d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
      c2 += (a2 ^ b2 & (d2 ^ a2)) + blocks2[7] + 1735328473;
      c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
      b2 += (d2 ^ a2 & (c2 ^ d2)) + blocks2[12] - 1926607734;
      b2 = (b2 << 20 | b2 >>> 12) + c2 << 0;
      bc = b2 ^ c2;
      a2 += (bc ^ d2) + blocks2[5] - 378558;
      a2 = (a2 << 4 | a2 >>> 28) + b2 << 0;
      d2 += (bc ^ a2) + blocks2[8] - 2022574463;
      d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
      da = d2 ^ a2;
      c2 += (da ^ b2) + blocks2[11] + 1839030562;
      c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
      b2 += (da ^ c2) + blocks2[14] - 35309556;
      b2 = (b2 << 23 | b2 >>> 9) + c2 << 0;
      bc = b2 ^ c2;
      a2 += (bc ^ d2) + blocks2[1] - 1530992060;
      a2 = (a2 << 4 | a2 >>> 28) + b2 << 0;
      d2 += (bc ^ a2) + blocks2[4] + 1272893353;
      d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
      da = d2 ^ a2;
      c2 += (da ^ b2) + blocks2[7] - 155497632;
      c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
      b2 += (da ^ c2) + blocks2[10] - 1094730640;
      b2 = (b2 << 23 | b2 >>> 9) + c2 << 0;
      bc = b2 ^ c2;
      a2 += (bc ^ d2) + blocks2[13] + 681279174;
      a2 = (a2 << 4 | a2 >>> 28) + b2 << 0;
      d2 += (bc ^ a2) + blocks2[0] - 358537222;
      d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
      da = d2 ^ a2;
      c2 += (da ^ b2) + blocks2[3] - 722521979;
      c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
      b2 += (da ^ c2) + blocks2[6] + 76029189;
      b2 = (b2 << 23 | b2 >>> 9) + c2 << 0;
      bc = b2 ^ c2;
      a2 += (bc ^ d2) + blocks2[9] - 640364487;
      a2 = (a2 << 4 | a2 >>> 28) + b2 << 0;
      d2 += (bc ^ a2) + blocks2[12] - 421815835;
      d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
      da = d2 ^ a2;
      c2 += (da ^ b2) + blocks2[15] + 530742520;
      c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
      b2 += (da ^ c2) + blocks2[2] - 995338651;
      b2 = (b2 << 23 | b2 >>> 9) + c2 << 0;
      a2 += (c2 ^ (b2 | ~d2)) + blocks2[0] - 198630844;
      a2 = (a2 << 6 | a2 >>> 26) + b2 << 0;
      d2 += (b2 ^ (a2 | ~c2)) + blocks2[7] + 1126891415;
      d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
      c2 += (a2 ^ (d2 | ~b2)) + blocks2[14] - 1416354905;
      c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
      b2 += (d2 ^ (c2 | ~a2)) + blocks2[5] - 57434055;
      b2 = (b2 << 21 | b2 >>> 11) + c2 << 0;
      a2 += (c2 ^ (b2 | ~d2)) + blocks2[12] + 1700485571;
      a2 = (a2 << 6 | a2 >>> 26) + b2 << 0;
      d2 += (b2 ^ (a2 | ~c2)) + blocks2[3] - 1894986606;
      d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
      c2 += (a2 ^ (d2 | ~b2)) + blocks2[10] - 1051523;
      c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
      b2 += (d2 ^ (c2 | ~a2)) + blocks2[1] - 2054922799;
      b2 = (b2 << 21 | b2 >>> 11) + c2 << 0;
      a2 += (c2 ^ (b2 | ~d2)) + blocks2[8] + 1873313359;
      a2 = (a2 << 6 | a2 >>> 26) + b2 << 0;
      d2 += (b2 ^ (a2 | ~c2)) + blocks2[15] - 30611744;
      d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
      c2 += (a2 ^ (d2 | ~b2)) + blocks2[6] - 1560198380;
      c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
      b2 += (d2 ^ (c2 | ~a2)) + blocks2[13] + 1309151649;
      b2 = (b2 << 21 | b2 >>> 11) + c2 << 0;
      a2 += (c2 ^ (b2 | ~d2)) + blocks2[4] - 145523070;
      a2 = (a2 << 6 | a2 >>> 26) + b2 << 0;
      d2 += (b2 ^ (a2 | ~c2)) + blocks2[11] - 1120210379;
      d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
      c2 += (a2 ^ (d2 | ~b2)) + blocks2[2] + 718787259;
      c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
      b2 += (d2 ^ (c2 | ~a2)) + blocks2[9] - 343485551;
      b2 = (b2 << 21 | b2 >>> 11) + c2 << 0;
      if (this.first) {
        this.h0 = a2 + 1732584193 << 0;
        this.h1 = b2 - 271733879 << 0;
        this.h2 = c2 - 1732584194 << 0;
        this.h3 = d2 + 271733878 << 0;
        this.first = false;
      } else {
        this.h0 = this.h0 + a2 << 0;
        this.h1 = this.h1 + b2 << 0;
        this.h2 = this.h2 + c2 << 0;
        this.h3 = this.h3 + d2 << 0;
      }
    };
    Md5.prototype.hex = function() {
      this.finalize();
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
      return HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15];
    };
    Md5.prototype.toString = Md5.prototype.hex;
    Md5.prototype.digest = function() {
      this.finalize();
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
      return [
        h0 & 255,
        h0 >>> 8 & 255,
        h0 >>> 16 & 255,
        h0 >>> 24 & 255,
        h1 & 255,
        h1 >>> 8 & 255,
        h1 >>> 16 & 255,
        h1 >>> 24 & 255,
        h2 & 255,
        h2 >>> 8 & 255,
        h2 >>> 16 & 255,
        h2 >>> 24 & 255,
        h3 & 255,
        h3 >>> 8 & 255,
        h3 >>> 16 & 255,
        h3 >>> 24 & 255
      ];
    };
    Md5.prototype.array = Md5.prototype.digest;
    Md5.prototype.arrayBuffer = function() {
      this.finalize();
      var buffer2 = new ArrayBuffer(16);
      var blocks2 = new Uint32Array(buffer2);
      blocks2[0] = this.h0;
      blocks2[1] = this.h1;
      blocks2[2] = this.h2;
      blocks2[3] = this.h3;
      return buffer2;
    };
    Md5.prototype.buffer = Md5.prototype.arrayBuffer;
    Md5.prototype.base64 = function() {
      var v1, v2, v3, base64Str = "", bytes = this.array();
      for (var i2 = 0; i2 < 15; ) {
        v1 = bytes[i2++];
        v2 = bytes[i2++];
        v3 = bytes[i2++];
        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
      }
      v1 = bytes[i2];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + "==";
      return base64Str;
    };
    function HmacMd5(key, sharedMemory) {
      var i2, result = formatMessage(key);
      key = result[0];
      if (result[1]) {
        var bytes = [], length = key.length, index2 = 0, code;
        for (i2 = 0; i2 < length; ++i2) {
          code = key.charCodeAt(i2);
          if (code < 128) {
            bytes[index2++] = code;
          } else if (code < 2048) {
            bytes[index2++] = 192 | code >>> 6;
            bytes[index2++] = 128 | code & 63;
          } else if (code < 55296 || code >= 57344) {
            bytes[index2++] = 224 | code >>> 12;
            bytes[index2++] = 128 | code >>> 6 & 63;
            bytes[index2++] = 128 | code & 63;
          } else {
            code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i2) & 1023);
            bytes[index2++] = 240 | code >>> 18;
            bytes[index2++] = 128 | code >>> 12 & 63;
            bytes[index2++] = 128 | code >>> 6 & 63;
            bytes[index2++] = 128 | code & 63;
          }
        }
        key = bytes;
      }
      if (key.length > 64) {
        key = new Md5(true).update(key).array();
      }
      var oKeyPad = [], iKeyPad = [];
      for (i2 = 0; i2 < 64; ++i2) {
        var b2 = key[i2] || 0;
        oKeyPad[i2] = 92 ^ b2;
        iKeyPad[i2] = 54 ^ b2;
      }
      Md5.call(this, sharedMemory);
      this.update(iKeyPad);
      this.oKeyPad = oKeyPad;
      this.inner = true;
      this.sharedMemory = sharedMemory;
    }
    HmacMd5.prototype = new Md5();
    HmacMd5.prototype.finalize = function() {
      Md5.prototype.finalize.call(this);
      if (this.inner) {
        this.inner = false;
        var innerHash = this.array();
        Md5.call(this, this.sharedMemory);
        this.update(this.oKeyPad);
        this.update(innerHash);
        Md5.prototype.finalize.call(this);
      }
    };
    var exports2 = createMethod();
    exports2.md5 = exports2;
    exports2.md5.hmac = createHmacMethod();
    if (COMMON_JS) {
      module.exports = exports2;
    } else {
      root.md5 = exports2;
    }
  })();
})(md5);
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
  * pinia v2.0.13
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const getActivePinia = () => getCurrentInstance() && inject(piniaSymbol) || activePinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const componentStateTypes = [];
const getStoreType = (id) => "\u{1F34D} " + id;
function registerPiniaDevtools(app, pinia) {
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  if (options.state) {
    store._isOptionsAPI = true;
  }
  if (typeof options.state === "function") {
    patchActionForGrouping(store, Object.keys(options.actions));
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(app, store);
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (IS_CLIENT) {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
const isUseStore = (fn) => {
  return typeof fn === "function" && typeof fn.$id === "string";
};
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
function acceptHMRUpdate(initialUseStore, hot) {
  return (newModule) => {
    const pinia = hot.data.pinia || initialUseStore._pinia;
    if (!pinia) {
      return;
    }
    hot.data.pinia = pinia;
    for (const exportName in newModule) {
      const useStore = newModule[exportName];
      if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
        const id = useStore.$id;
        if (id !== initialUseStore.$id) {
          console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
          return hot.invalidate();
        }
        const existingStore = pinia._s.get(id);
        if (!existingStore) {
          console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
          return;
        }
        useStore(pinia, existingStore);
      }
    }
  };
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function skipHydrate(obj) {
  return Object.defineProperty(obj, skipHydrateSymbol, {});
}
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed$1(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot) {
  let scope;
  const buildState = options.state;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!buildState && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    nextTick().then(() => {
      isListening = true;
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = () => {
    throw new Error(`\u{1F34D}: Store "${$id}" is build using the setup syntax and does not implement $reset().`);
  };
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(IS_CLIENT ? {
    _customProperties: markRaw(/* @__PURE__ */ new Set()),
    _hmrPayload
  } : {}, partialStore));
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!buildState) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = buildState ? options.getters[key] : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = buildState ? computed$1(() => {
          setActivePinia(pinia);
          return getter.call(store, store);
        }) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
    const nonEnumerable = {
      writable: true,
      configurable: true,
      enumerable: false
    };
    if (IS_CLIENT) {
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, __spreadValues({
          value: store[p2]
        }, nonEnumerable));
      });
    }
  }
  pinia._p.forEach((extender) => {
    if (IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && buildState && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance2 = getCurrentInstance();
    pinia = pinia || currentInstance2 && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && !hot) {
      const vm = currentInstance2.proxy;
      const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
      cache[id] = store;
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
let mapStoreSuffix = "Store";
function setMapStoreSuffix(suffix) {
  mapStoreSuffix = suffix;
}
function mapStores(...stores) {
  if (Array.isArray(stores[0])) {
    console.warn(`[\u{1F34D}]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
    stores = stores[0];
  }
  return stores.reduce((reduced, useStore) => {
    reduced[useStore.$id + mapStoreSuffix] = function() {
      return useStore(this.$pinia);
    };
    return reduced;
  }, {});
}
function mapState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function() {
      return useStore(this.$pinia)[key];
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function() {
      const store = useStore(this.$pinia);
      const storeKey = keysOrMapper[key];
      return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
    };
    return reduced;
  }, {});
}
const mapGetters = mapState;
function mapActions(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[key](...args);
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[keysOrMapper[key]](...args);
    };
    return reduced;
  }, {});
}
function mapWritableState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[key];
      },
      set(value) {
        return useStore(this.$pinia)[key] = value;
      }
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[keysOrMapper[key]];
      },
      set(value) {
        return useStore(this.$pinia)[keysOrMapper[key]] = value;
      }
    };
    return reduced;
  }, {});
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = toRef(store, key);
      }
    }
    return refs;
  }
}
const PiniaVuePlugin = function(_Vue) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.pinia) {
        const pinia = options.pinia;
        if (!this._provided) {
          const provideCache = {};
          Object.defineProperty(this, "_provided", {
            get: () => provideCache,
            set: (v2) => Object.assign(provideCache, v2)
          });
        }
        this._provided[piniaSymbol] = pinia;
        if (!this.$pinia) {
          this.$pinia = pinia;
        }
        pinia._a = this;
        if (IS_CLIENT) {
          setActivePinia(pinia);
          {
            registerPiniaDevtools(pinia._a);
          }
        }
      } else if (!this.$pinia && options.parent && options.parent.$pinia) {
        this.$pinia = options.parent.$pinia;
      }
    },
    destroyed() {
      delete this._pStores;
    }
  });
};
var Pinia = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get MutationType() {
    return MutationType;
  },
  PiniaVuePlugin,
  acceptHMRUpdate,
  createPinia,
  defineStore,
  getActivePinia,
  mapActions,
  mapGetters,
  mapState,
  mapStores,
  mapWritableState,
  setActivePinia,
  setMapStoreSuffix,
  skipHydrate,
  storeToRefs
});
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createHook(ON_LOAD$1);
/*!
  * vue-router v4.0.14
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol("[vue-router]: " + name) : "[vue-router]: " + name;
const routeLocationKey = /* @__PURE__ */ PolySymbol("route location");
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function useRoute() {
  return inject(routeLocationKey);
}
const isArray = Array.isArray;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(t3 == null && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, o2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, i2 = r2.WordArray = o2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var o3 = 0; o3 < r3; o3++) {
          var i3 = n4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          t4[s3 + o3 >>> 2] |= i3 << 24 - (s3 + o3) % 4 * 8;
        }
      else
        for (o3 = 0; o3 < r3; o3 += 4)
          t4[s3 + o3 >>> 2] = n4[o3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, o3 = 0; o3 < t4; o3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new i2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var o3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((o3 >>> 4).toString(16)), s3.push((15 & o3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new i2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var o3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(o3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new i2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l3 = r2.BufferedBlockAlgorithm = o2.extend({ reset: function() {
      this._data = new i2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      typeof e4 == "string" && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, o3 = this.blockSize, a3 = r3 / (4 * o3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * o3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += o3)
          this._doProcessBlock(s3, h3);
        var l4 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new i2.init(l4, u3);
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l3.extend({ cfg: o2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l3.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = s, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, o2 = s2.Hasher, i2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = i2.MD5 = o2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var o3 = this._hash.words, i3 = e4[t4 + 0], c3 = e4[t4 + 1], f2 = e4[t4 + 2], p2 = e4[t4 + 3], g = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], k2 = e4[t4 + 9], v2 = e4[t4 + 10], S2 = e4[t4 + 11], T2 = e4[t4 + 12], A2 = e4[t4 + 13], P2 = e4[t4 + 14], I2 = e4[t4 + 15], b2 = o3[0], O2 = o3[1], E2 = o3[2], C2 = o3[3];
      b2 = u2(b2, O2, E2, C2, i3, 7, a2[0]), C2 = u2(C2, b2, O2, E2, c3, 12, a2[1]), E2 = u2(E2, C2, b2, O2, f2, 17, a2[2]), O2 = u2(O2, E2, C2, b2, p2, 22, a2[3]), b2 = u2(b2, O2, E2, C2, g, 7, a2[4]), C2 = u2(C2, b2, O2, E2, m2, 12, a2[5]), E2 = u2(E2, C2, b2, O2, y2, 17, a2[6]), O2 = u2(O2, E2, C2, b2, _2, 22, a2[7]), b2 = u2(b2, O2, E2, C2, w2, 7, a2[8]), C2 = u2(C2, b2, O2, E2, k2, 12, a2[9]), E2 = u2(E2, C2, b2, O2, v2, 17, a2[10]), O2 = u2(O2, E2, C2, b2, S2, 22, a2[11]), b2 = u2(b2, O2, E2, C2, T2, 7, a2[12]), C2 = u2(C2, b2, O2, E2, A2, 12, a2[13]), E2 = u2(E2, C2, b2, O2, P2, 17, a2[14]), b2 = h2(b2, O2 = u2(O2, E2, C2, b2, I2, 22, a2[15]), E2, C2, c3, 5, a2[16]), C2 = h2(C2, b2, O2, E2, y2, 9, a2[17]), E2 = h2(E2, C2, b2, O2, S2, 14, a2[18]), O2 = h2(O2, E2, C2, b2, i3, 20, a2[19]), b2 = h2(b2, O2, E2, C2, m2, 5, a2[20]), C2 = h2(C2, b2, O2, E2, v2, 9, a2[21]), E2 = h2(E2, C2, b2, O2, I2, 14, a2[22]), O2 = h2(O2, E2, C2, b2, g, 20, a2[23]), b2 = h2(b2, O2, E2, C2, k2, 5, a2[24]), C2 = h2(C2, b2, O2, E2, P2, 9, a2[25]), E2 = h2(E2, C2, b2, O2, p2, 14, a2[26]), O2 = h2(O2, E2, C2, b2, w2, 20, a2[27]), b2 = h2(b2, O2, E2, C2, A2, 5, a2[28]), C2 = h2(C2, b2, O2, E2, f2, 9, a2[29]), E2 = h2(E2, C2, b2, O2, _2, 14, a2[30]), b2 = l3(b2, O2 = h2(O2, E2, C2, b2, T2, 20, a2[31]), E2, C2, m2, 4, a2[32]), C2 = l3(C2, b2, O2, E2, w2, 11, a2[33]), E2 = l3(E2, C2, b2, O2, S2, 16, a2[34]), O2 = l3(O2, E2, C2, b2, P2, 23, a2[35]), b2 = l3(b2, O2, E2, C2, c3, 4, a2[36]), C2 = l3(C2, b2, O2, E2, g, 11, a2[37]), E2 = l3(E2, C2, b2, O2, _2, 16, a2[38]), O2 = l3(O2, E2, C2, b2, v2, 23, a2[39]), b2 = l3(b2, O2, E2, C2, A2, 4, a2[40]), C2 = l3(C2, b2, O2, E2, i3, 11, a2[41]), E2 = l3(E2, C2, b2, O2, p2, 16, a2[42]), O2 = l3(O2, E2, C2, b2, y2, 23, a2[43]), b2 = l3(b2, O2, E2, C2, k2, 4, a2[44]), C2 = l3(C2, b2, O2, E2, T2, 11, a2[45]), E2 = l3(E2, C2, b2, O2, I2, 16, a2[46]), b2 = d2(b2, O2 = l3(O2, E2, C2, b2, f2, 23, a2[47]), E2, C2, i3, 6, a2[48]), C2 = d2(C2, b2, O2, E2, _2, 10, a2[49]), E2 = d2(E2, C2, b2, O2, P2, 15, a2[50]), O2 = d2(O2, E2, C2, b2, m2, 21, a2[51]), b2 = d2(b2, O2, E2, C2, T2, 6, a2[52]), C2 = d2(C2, b2, O2, E2, p2, 10, a2[53]), E2 = d2(E2, C2, b2, O2, v2, 15, a2[54]), O2 = d2(O2, E2, C2, b2, c3, 21, a2[55]), b2 = d2(b2, O2, E2, C2, w2, 6, a2[56]), C2 = d2(C2, b2, O2, E2, I2, 10, a2[57]), E2 = d2(E2, C2, b2, O2, y2, 15, a2[58]), O2 = d2(O2, E2, C2, b2, A2, 21, a2[59]), b2 = d2(b2, O2, E2, C2, g, 6, a2[60]), C2 = d2(C2, b2, O2, E2, S2, 10, a2[61]), E2 = d2(E2, C2, b2, O2, f2, 15, a2[62]), O2 = d2(O2, E2, C2, b2, k2, 21, a2[63]), o3[0] = o3[0] + b2 | 0, o3[1] = o3[1] + O2 | 0, o3[2] = o3[2] + E2 | 0, o3[3] = o3[3] + C2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var o3 = e3.floor(s3 / 4294967296), i3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function l3(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    t3.MD5 = o2._createHelper(c2), t3.HmacMD5 = o2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2, r2, o2;
  e2.exports = (r2 = (n2 = s).lib.Base, o2 = n2.enc.Utf8, void (n2.algo.HMAC = r2.extend({ init: function(e3, t3) {
    e3 = this._hasher = new e3.init(), typeof t3 == "string" && (t3 = o2.parse(t3));
    var n3 = e3.blockSize, s2 = 4 * n3;
    t3.sigBytes > s2 && (t3 = e3.finalize(t3)), t3.clamp();
    for (var r3 = this._oKey = t3.clone(), i2 = this._iKey = t3.clone(), a2 = r3.words, c2 = i2.words, u2 = 0; u2 < n3; u2++)
      a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
    r3.sigBytes = i2.sigBytes = s2, this.reset();
  }, reset: function() {
    var e3 = this._hasher;
    e3.reset(), e3.update(this._iKey);
  }, update: function(e3) {
    return this._hasher.update(e3), this;
  }, finalize: function(e3) {
    var t3 = this._hasher, n3 = t3.finalize(e3);
    return t3.reset(), t3.finalize(this._oKey.clone().concat(n3));
  } })));
}), n(function(e2, t2) {
  e2.exports = s.HmacMD5;
}));
const o = "FUNCTION", i = "OBJECT", a = "CLIENT_DB";
function c(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function u(e2) {
  return c(e2) === "object";
}
function h(e2) {
  return e2 && typeof e2 == "string" ? JSON.parse(e2) : e2;
}
const l = true, d = "mp-weixin", f = h({}.UNICLOUD_DEBUG), p = h("[]");
let m = "";
try {
  m = "__UNI__DD60002";
} catch (e2) {
}
let y = {};
function _(e2, t2 = {}) {
  var n2, s2;
  return n2 = y, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (y[e2] = t2), y[e2];
}
const w = ["invoke", "success", "fail", "complete"], k = _("_globalUniCloudInterceptor");
function v(e2, t2) {
  k[e2] || (k[e2] = {}), u(t2) && Object.keys(t2).forEach((n2) => {
    w.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = k[e3][t3];
      s2 || (s2 = k[e3][t3] = []), s2.indexOf(n3) === -1 && typeof n3 == "function" && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function S(e2, t2) {
  k[e2] || (k[e2] = {}), u(t2) ? Object.keys(t2).forEach((n2) => {
    w.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = k[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete k[e2];
}
function T(e2, t2) {
  return e2 && e2.length !== 0 ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function A(e2, t2) {
  return k[e2] && k[e2][t2] || [];
}
function P(e2, t2) {
  return t2 ? function(n2) {
    let s2, r2 = false;
    if (t2 === "callFunction") {
      const e3 = n2 && n2.type || o;
      r2 = e3 !== o;
    }
    s2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
    const i2 = s2.then(() => r2 ? Promise.resolve() : T(A(t2, "invoke"), n2)).then(() => e2.call(this, n2)).then((e3) => r2 ? Promise.resolve(e3) : T(A(t2, "success"), e3).then(() => T(A(t2, "complete"), e3)).then(() => Promise.resolve(e3)), (e3) => r2 ? Promise.reject(e3) : T(A(t2, "fail"), e3).then(() => T(A(t2, "complete"), e3)).then(() => Promise.reject(e3)));
    if (!(n2.success || n2.fail || n2.complete))
      return i2;
    i2.then((e3) => {
      n2.success && n2.success(e3), n2.complete && n2.complete(e3);
    }, (e3) => {
      n2.fail && n2.fail(e3), n2.complete && n2.complete(e3);
    });
  } : function(t3) {
    if (!((t3 = t3 || {}).success || t3.fail || t3.complete))
      return e2.call(this, t3);
    e2.call(this, t3).then((e3) => {
      t3.success && t3.success(e3), t3.complete && t3.complete(e3);
    }, (e3) => {
      t3.fail && t3.fail(e3), t3.complete && t3.complete(e3);
    });
  };
}
class I extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || "", this.errCode = this.code = e2.code, this.requestId = e2.requestId, Object.defineProperties(this, { message: { get() {
      return this.errMsg;
    }, set(e3) {
      this.errMsg = e3;
    } } });
  }
}
let b;
function O() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (b)
    return __spreadProps(__spreadValues({}, b), { LOCALE: e2 });
  const { deviceId: t2, platform: n2 } = index.getSystemInfoSync();
  return b = { PLATFORM: d, OS: n2, APPID: m, DEVICEID: t2, CLIENT_SDK_VERSION: "1.0.25" }, __spreadProps(__spreadValues({}, b), { LOCALE: e2 });
}
var E = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), r(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400)
        return s2(new I({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
      const r2 = e3.data;
      if (r2.error)
        return s2(new I({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
} };
var C = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync() }, U = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
const { t: x } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: U, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: U }, "zh-Hans");
var D = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(x("uniCloud.init.paramRequired", { param: t2 }));
    }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = C, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return E.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || t3.code !== "GATEWAY_INVALID_TOKEN" && t3.code !== "InvalidParameter.InvalidToken" ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = E.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = E.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    if (this._getAccessTokenPromiseStatus === "pending")
      return this._getAccessTokenPromise;
    this._getAccessTokenPromiseStatus = "pending";
    return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => new Promise((t2, n2) => {
      e2.result && e2.result.accessToken ? (this.setAccessToken(e2.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new I({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
    }), (e2) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e2))), this._getAccessTokenPromise;
  }
  authorize() {
    this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: o2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new I({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new I({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      typeof o2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e3) => {
        o2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
    if (c(t2) !== "string")
      throw new I({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
    if (!(t2 = t2.trim()))
      throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    if (/:\/\//.test(t2))
      throw new I({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
    const o2 = r2 && r2.envType || this.config.envType;
    let i2, a2;
    return this.getOSSUploadOptionsFromPath({ env: o2, filename: t2 }).then((t3) => {
      const r3 = t3.result;
      i2 = r3.id, a2 = "https://" + r3.cdnDomain + "/" + r3.ossPath;
      const o3 = { url: "https://" + r3.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r3.accessKeyId, Signature: r3.signature, host: r3.host, id: i2, key: r3.ossPath, policy: r3.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, o3, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ id: i2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: a2 }) : s3(new I({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e2[0] }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && e2.length !== 0 || n2(new I({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
};
var q = { init(e2) {
  const t2 = new D(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const R = typeof location != "undefined" && location.protocol === "http:" ? "http:" : "https:";
var L;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(L || (L = {}));
var F = function() {
};
const N = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function $(e2) {
  return e2 === void 0;
}
function j(e2) {
  return Object.prototype.toString.call(e2) === "[object Null]";
}
var M;
function B(e2) {
  const t2 = (n2 = e2, Object.prototype.toString.call(n2) === "[object Array]" ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(M || (M = {}));
const K = { adapter: null, runtime: void 0 }, H = ["anonymousUuidKey"];
class W extends F {
  constructor() {
    super(), K.adapter.root.tcbObject || (K.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    K.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return K.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete K.adapter.root.tcbObject[e2];
  }
  clear() {
    delete K.adapter.root.tcbObject;
  }
}
function z(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new W();
    case "none":
      return new W();
    default:
      return t2.sessionStorage || new W();
  }
}
class J {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = K.adapter.primaryStorage || e2.persistence, this._storage = z(this._persistence, K.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, o2 = `login_type_${e2.env}`, i2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: o2, userInfoKey: i2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = this._persistence === "local";
    this._persistence = e2;
    const n2 = z(e2, K.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && H.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      $(r2) || j(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const V = {}, Y = {};
function X(e2) {
  return V[e2];
}
class G {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Q extends G {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const Z = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        s2 !== -1 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Q)
      return console.error(e2.error), this;
    const n2 = typeof e2 == "string" ? new G(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function ee(e2, t2) {
  Z.on(e2, t2);
}
function te(e2, t2 = {}) {
  Z.fire(e2, t2);
}
function ne(e2, t2) {
  Z.off(e2, t2);
}
const se = "loginStateChanged", re = "loginStateExpire", oe = "loginTypeChanged", ie = "anonymousConverted", ae = "refreshAccessToken";
var ce;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(ce || (ce = {}));
const ue = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], he = { "X-SDK-Version": "1.3.5" };
function le(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, o2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: i3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(o2, i3);
    });
    const i2 = t3.data;
    return i2 && (() => {
      var e3;
      if (e3 = i2, Object.prototype.toString.call(e3) !== "[object FormData]")
        t3.data = __spreadValues(__spreadValues({}, i2), r2);
      else
        for (const e4 in r2)
          i2.append(e4, r2[e4]);
    })(), t3.headers = __spreadValues(__spreadValues({}, t3.headers || {}), o2), s2.call(e2, t3);
  };
}
function de() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: __spreadProps(__spreadValues({}, he), { "x-seqid": e2 }) };
}
class fe {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new K.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = X(this.config.env), this._localCache = (t2 = this.config.env, Y[t2]), le(this._reqClass, "post", [de]), le(this._reqClass, "upload", [de]), le(this._reqClass, "download", [de]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let o2 = this._cache.getStore(n2);
    if (!o2)
      throw new Error("\u672A\u767B\u5F55CloudBase");
    const i2 = { refresh_token: o2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", i2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if (e3 === "SIGN_PARAM_INVALID" || e3 === "REFRESH_TOKEN_EXPIRED" || e3 === "INVALID_REFRESH_TOKEN") {
        if (this._cache.getStore(s2) === ce.ANONYMOUS && e3 === "INVALID_REFRESH_TOKEN") {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        te(re), this._cache.removeStore(n2);
      }
      throw new Error(`\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}`);
    }
    if (a2.data.access_token)
      return te(ae), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new Error("refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38");
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), o2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (o2 = false), (!s2 || !r2 || r2 < Date.now()) && o2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const o2 = __spreadValues({ action: e2, env: this.config.env, dataVersion: "2019-08-16" }, t2);
    if (ue.indexOf(e2) === -1) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (o2.access_token = (await this.getAccessToken()).accessToken);
    }
    let i2;
    if (e2 === "storage.uploadFile") {
      i2 = new FormData();
      for (let e3 in i2)
        i2.hasOwnProperty(e3) && i2[e3] !== void 0 && i2.append(e3, o2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", i2 = {};
      for (let e3 in o2)
        o2[e3] !== void 0 && (i2[e3] = o2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l3 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = __spreadValues(__spreadValues({}, h2), d2));
    let f2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        r3 === "" ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(R, "//tcb-api.tencentcloudapi.com/web", d2);
    l3 && (f2 += l3);
    const p2 = await this.post(__spreadValues({ url: f2, data: i2 }, a2)), g = p2.header && p2.header["x-tcb-trace"];
    if (g && this._localCache.setStore(s2, g), Number(p2.status) !== 200 && Number(p2.statusCode) !== 200 || !p2.data)
      throw new Error("network request error");
    return p2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if (n2.data.code === "ACCESS_TOKEN_EXPIRED" && ue.indexOf(e2) === -1) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new Error(`[${n3.data.code}] ${n3.data.message}`);
      return n3.data;
    }
    if (n2.data.code)
      throw new Error(`[${n2.data.code}] ${n2.data.message}`);
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const pe = {};
function ge(e2) {
  return pe[e2];
}
class me {
  constructor(e2) {
    this.config = e2, this._cache = X(e2.env), this._request = ge(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class ye {
  constructor(e2) {
    if (!e2)
      throw new Error("envId is not defined");
    this._envId = e2, this._cache = X(this._envId), this._request = ge(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if (typeof e2 != "string")
      throw new Error("ticket must be string");
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: o2, city: i2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: o2, city: i2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class _e {
  constructor(e2) {
    if (!e2)
      throw new Error("envId is not defined");
    this._cache = X(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), o2 = this._cache.getStore(n2), i2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: o2, accessTokenExpire: i2 }, this.user = new ye(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === ce.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === ce.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === ce.WECHAT || this.loginType === ce.WECHAT_OPEN || this.loginType === ce.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class we extends me {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), te(se), te(oe, { env: this.config.env, loginType: ce.ANONYMOUS, persistence: "local" });
      const e3 = new _e(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new Error("\u533F\u540D\u767B\u5F55\u5931\u8D25");
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), o2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (o2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(o2.refresh_token), await this._request.refreshAccessToken(), te(ie, { env: this.config.env }), te(oe, { loginType: ce.CUSTOM, persistence: "local" }), { credential: { refreshToken: o2.refresh_token } };
    throw new Error("\u533F\u540D\u8F6C\u5316\u5931\u8D25");
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, ce.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class ke extends me {
  async signIn(e2) {
    if (typeof e2 != "string")
      throw new Error("ticket must be a string");
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), te(se), te(oe, { env: this.config.env, loginType: ce.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new _e(this.config.env);
    throw new Error("\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25");
  }
}
class ve extends me {
  async signIn(e2, t2) {
    if (typeof e2 != "string")
      throw new Error("email must be a string");
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: o2, access_token_expire: i2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), te(se), te(oe, { env: this.config.env, loginType: ce.EMAIL, persistence: this.config.persistence }), new _e(this.config.env);
    throw s2.code ? new Error(`\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [${s2.code}] ${s2.message}`) : new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25");
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class Se extends me {
  async signIn(e2, t2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    typeof t2 != "string" && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: ce.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: o2, access_token: i2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), te(se), te(oe, { env: this.config.env, loginType: ce.USERNAME, persistence: this.config.persistence }), new _e(this.config.env);
    throw s2.code ? new Error(`\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [${s2.code}] ${s2.message}`) : new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25");
  }
}
class Te {
  constructor(e2) {
    this.config = e2, this._cache = X(e2.env), this._request = ge(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ee(oe, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new we(this.config);
  }
  customAuthProvider() {
    return new ke(this.config);
  }
  emailAuthProvider() {
    return new ve(this.config);
  }
  usernameAuthProvider() {
    return new Se(this.config);
  }
  async signInAnonymously() {
    return new we(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new ve(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new Se(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new we(this.config)), ee(ie, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === ce.ANONYMOUS)
      throw new Error("\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C");
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), te(se), te(oe, { env: this.config.env, loginType: ce.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    ee(se, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    ee(re, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    ee(ae, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    ee(ie, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    ee(oe, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new _e(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new ke(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : __spreadProps(__spreadValues({}, e2.data), { requestId: e2.seqId }));
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const Ae = function(e2, t2) {
  t2 = t2 || N();
  const n2 = ge(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: o2, fileType: i2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l3 }, requestId: d2 } = e3, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": l3, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: f2, file: r2, name: s2, fileType: i2, onUploadProgress: o2 }).then((e4) => {
      e4.statusCode === 201 ? t2(null, { fileID: h2, requestId: d2 }) : t2(new Error(`STORAGE_REQUEST_FAIL: ${e4.data}`));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Pe = function(e2, t2) {
  t2 = t2 || N();
  const n2 = ge(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Ie = function({ fileList: e2 }, t2) {
  if (t2 = t2 || N(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
  for (let t3 of e2)
    if (!t3 || typeof t3 != "string")
      return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
  const n2 = { fileid_list: e2 };
  return ge(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, be = function({ fileList: e2 }, t2) {
  t2 = t2 || N(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
  let n2 = [];
  for (let s3 of e2)
    typeof s3 == "object" ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : typeof s3 == "string" ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
  const s2 = { file_list: n2 };
  return ge(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Oe = async function({ fileID: e2 }, t2) {
  const n2 = (await be.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if (n2.code !== "SUCCESS")
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = ge(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, Ee = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, o2) {
  const i2 = o2 || N();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new Error("\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A"));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
  return ge(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      i2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        i2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), i2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          i2(new Error("response data must be json"));
        }
    }
    return i2.promise;
  }).catch((e3) => {
    i2(e3);
  }), i2.promise;
}, Ce = { timeout: 15e3, persistence: "session" }, Ue = {};
class xe {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (K.adapter || (this.requestClient = new K.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e2.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = __spreadValues(__spreadValues({}, Ce), e2), true) {
      case this.config.timeout > 6e5:
        console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
    }
    return new xe(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || K.adapter.primaryStorage || Ce.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      V[t3] = new J(e3), Y[t3] = new J(__spreadProps(__spreadValues({}, e3), { persistence: "local" }));
    }(this.config), n2 = this.config, pe[n2.env] = new fe(n2), this.authObj = new Te(this.config), this.authObj;
  }
  on(e2, t2) {
    return ee.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return ne.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return Ee.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return Ie.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return be.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return Oe.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return Ae.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return Pe.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    Ue[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = Ue[e2];
    if (!n2)
      throw Error(`\u6269\u5C55${e2} \u5FC5\u987B\u5148\u6CE8\u518C`);
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = B(e2) || {};
    t2 && (K.adapter = t2), n2 && (K.runtime = n2);
  }
}
var De = new xe();
function qe(e2, t2, n2) {
  n2 === void 0 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var o2 in n2)
    r2 === "" ? !s2 && (t2 += "?") : r2 += "&", r2 += o2 + "=" + encodeURIComponent(n2[o2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class Re {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, r2) => {
      C.request({ url: qe("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        r2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: o2, headers: i2, fileType: a2 } = e2, c2 = C.uploadFile({ url: qe("https:", s2), name: "file", formData: Object.assign({}, o2), filePath: r2, fileType: a2, header: i2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        e3.statusCode === 200 && o2.success_action_status && (n3.statusCode = parseInt(o2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      typeof e2.onUploadProgress == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const Le = { setItem(e2, t2) {
  C.setStorageSync(e2, t2);
}, getItem: (e2) => C.getStorageSync(e2), removeItem(e2) {
  C.removeStorageSync(e2);
}, clear() {
  C.clearStorageSync();
} };
var Fe = { genAdapter: function() {
  return { root: {}, reqClass: Re, localStorage: Le, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
De.useAdapters(Fe);
const Ne = De, $e = Ne.init;
Ne.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = $e.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      t3[e4] = P(t3[e4]).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var je = Ne;
function Me(e2) {
  return e2 && Me(e2.__v_raw) || e2;
}
function Be() {
  return { token: C.getStorageSync("uni_id_token") || C.getStorageSync("uniIdToken"), tokenExpired: C.getStorageSync("uni_id_token_expired") };
}
var He = class extends D {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = E.sign(n2, this.config.clientSecret);
    const r2 = O();
    s2["x-client-info"] = JSON.stringify(r2);
    const { token: o2 } = Be();
    return s2["x-client-token"] = o2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: o2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new I({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new I({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      typeof o2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e3) => {
        o2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: o2, formData: i2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: o2, formData: i2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new I({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
};
var We = { init(e2) {
  const t2 = new He(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
function ze({ data: e2 }) {
  let t2;
  t2 = O();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = Be();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
function Je({ name: e2, data: t2 }) {
  const { localAddress: n2, localPort: s2 } = this, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], o2 = this.config.spaceId, i2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    C.request({ method: "POST", url: i2, data: { name: e2, platform: d, provider: r2, spaceId: o2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: t3 === 0 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (n3 !== 0) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
          break;
        case "NETWORK_ERROR": {
          const e3 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
          throw console.error(e3), new Error(e3);
        }
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._originCallFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = ze.call(this, { data: t2 });
      C.request({ method: "POST", url: a2, data: { provider: r2, platform: d, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new I({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new I({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const Ve = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
var Ye = /[\\^$.*+?()[\]{}|]/g, Xe = RegExp(Ye.source);
function Ge(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Xe.test(s2) ? s2.replace(Ye, "\\$&") : s2, "g"), n2);
  var s2;
}
function Qe({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.config.useDebugFunction && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Ze(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = ze.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];
    return t2.call(this, n3).then((e3) => (Qe.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (Qe.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: o2, mode: i2 } = n4[s3], a2 = e4.match(r3);
        if (!a2)
          continue;
        let c2 = o2;
        for (let e5 = 1; e5 < a2.length; e5++)
          c2 = Ge(c2, `{$${e5}}`, a2[e5]);
        for (const e5 in t3)
          c2 = Ge(c2, `{${e5}}`, t3[e5]);
        return i2 === "replace" ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: Ve, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    let s2;
    return e2.debugInfo && !e2.debugInfo.forceRemote && p ? (e2._originCallFunction || (e2._originCallFunction = n2), s2 = Je.call(this, t3)) : s2 = n2.call(this, t3), Object.defineProperty(s2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), s2;
  };
}
const et = Symbol("CLIENT_DB_INTERNAL");
function tt(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = et, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if (n2 === "_uniClient")
      return null;
    if (n2 in e3 || typeof n2 != "string") {
      const t3 = e3[n2];
      return typeof t3 == "function" ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function nt(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    s2 !== -1 && e2[t2].splice(s2, 1);
  } };
}
const st = ["db.Geo", "db.command", "command.aggregate"];
function rt(e2, t2) {
  return st.indexOf(`${e2}.${t2}`) > -1;
}
function ot(e2) {
  switch (c(e2 = Me(e2))) {
    case "array":
      return e2.map((e3) => ot(e3));
    case "object":
      return e2._internalType === et || Object.keys(e2).forEach((t2) => {
        e2[t2] = ot(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
class it {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: ot(e3.$param) })) };
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => e3.$method === "action");
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => e2.$method !== "action") };
  }
  get useAggregate() {
    let e2 = this, t2 = false;
    for (; e2.prevStage; ) {
      e2 = e2.prevStage;
      const n2 = e2.content.$method;
      if (n2 === "aggregate" || n2 === "pipeline") {
        t2 = true;
        break;
      }
    }
    return t2;
  }
  get count() {
    if (!this.useAggregate)
      return function() {
        return this._send("count", Array.from(arguments));
      };
    const e2 = this;
    return function() {
      return at({ $method: "count", $param: ot(Array.from(arguments)) }, e2, this._database);
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  add() {
    return this._send("add", Array.from(arguments));
  }
  remove() {
    return this._send("remove", Array.from(arguments));
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  set() {
    throw new Error("clientDB\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: ot(t2) }), l) {
      const e3 = s2.$db.find((e4) => e4.$method === "collection"), t3 = e3 && e3.$param;
      t3 && t3.length === 1 && typeof e3.$param[0] == "string" && e3.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function at(e2, t2, n2) {
  return tt(new it(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), rt(s2, t3) ? at({ $method: t3 }, e3, n2) : function() {
      return at({ $method: t3, $param: ot(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function ct({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
  };
}
class ut extends class {
  constructor({ uniClient: e2 = {} } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2.isDefault && (this._dbCallBacks = _("_globalUniCloudDatabaseCallback")), this.auth = nt(this._authCallBacks), Object.assign(this, nt(this._dbCallBacks)), this.env = tt({}, { get: (e3, t2) => ({ $env: t2 }) }), this.Geo = tt({}, { get: (e3, t2) => ct({ path: ["Geo"], method: t2 }) }), this.serverDate = ct({ path: [], method: "serverDate" }), this.RegExp = ct({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if (typeof e2 != "string" || !e2.trim())
      throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if (n2.$db[n2.$db.length - 1].$method !== "getTemp")
        throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && typeof r3.udb.setResult == "function" && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const o2 = T(A("database", "invoke")), i2 = this._uniClient;
    return o2.then(() => i2.callFunction({ name: "DCloud-clientDB", type: a, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: o3, systemInfo: i3 = [] } = e3.result;
      if (i3)
        for (let e4 = 0; e4 < i3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = i3[e4], r3 = console[t4] || console.log;
          let o4 = "[System Info]" + n4;
          s4 && (o4 = `${o4}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), r3(o4);
        }
      if (t3) {
        const s4 = new I({ message: n3, code: t3, requestId: e3.requestId });
        return this._callback("error", [s4]), Promise.reject(s4);
      }
      s3 && o3 && (!function({ token: e4, tokenExpired: t4 } = {}) {
        e4 && C.setStorageSync("uni_id_token", e4), t4 && C.setStorageSync("uni_id_token_expired", t4);
      }({ token: s3, tokenExpired: o3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: o3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: o3 }]));
      const a2 = e3.result.affectedDocs;
      return typeof a2 == "number" && Object.defineProperty(e3.result, "affectedDocs", { get: () => (console.warn("affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3"), a2) }), T(A("database", "success"), e3).then(() => T(A("database", "complete"), e3)).then(() => (r2(e3, null), Promise.resolve(e3)));
    }, (e3) => {
      const t3 = new I({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId });
      return this._callback("error", [t3]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB"), T(A("database", "fail"), e3).then(() => T(A("database", "complete"), e3)).then(() => (r2(null, e3), Promise.reject(e3)));
    });
  }
}
function ht(e2) {
  e2.database = function(t2) {
    if (t2 && Object.keys(t2).length > 0)
      return e2.init(t2).database();
    if (this._database)
      return this._database;
    const n2 = function(e3, t3 = {}) {
      return tt(new e3(t3), { get: (e4, t4) => rt("db", t4) ? at({ $method: t4 }, null, e4) : function() {
        return at({ $method: t4, $param: ot(Array.from(arguments)) }, null, e4);
      } });
    }(ut, { uniClient: e2 });
    return this._database = n2, n2;
  };
}
let lt;
const dt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ft = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function pt() {
  const e2 = Be().token || "", t2 = e2.split(".");
  if (!e2 || t2.length !== 3)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(lt(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
lt = typeof atob != "function" ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !ft.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", o2 = 0; o2 < e2.length; )
    t2 = dt.indexOf(e2.charAt(o2++)) << 18 | dt.indexOf(e2.charAt(o2++)) << 12 | (n2 = dt.indexOf(e2.charAt(o2++))) << 6 | (s2 = dt.indexOf(e2.charAt(o2++))), r2 += n2 === 64 ? String.fromCharCode(t2 >> 16 & 255) : s2 === 64 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var gt = t(n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function o2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (t4 !== void 0)
          return Promise.resolve(t4).then((t5) => t5 === void 0 ? e4 : t5);
      }
      return e4;
    }).then((t4) => t4 === false ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const o3 = t5.tempFiles, i2 = o3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= i2)
            return void (!o3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = o3[s5];
          e4.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < i2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < i2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return t3.type === "image" ? o2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: o3 = ["album", "camera"], extension: i2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: o3, extension: i2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : t3.type === "video" ? o2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: o3, sourceType: i2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: o3, sourceType: i2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: o4, height: i3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: o4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: i3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : o2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, o3) => {
          let i2 = index.chooseFile;
          if (typeof wx != "undefined" && typeof wx.chooseMessageFile == "function" && (i2 = wx.chooseMessageFile), typeof i2 != "function")
            return o3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
          i2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            o3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}));
const mt = "manual";
function yt(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === mt)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const o2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = o2, t2 && t2(o2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2 = e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const o2 = t2.where || this.where;
    o2 && Object.keys(o2).length && (n2 = n2.where(o2));
    const i2 = t2.field || this.field;
    i2 && (n2 = n2.field(i2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    (t2.distinct !== void 0 ? t2.distinct : this.distinct) === true && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l3 = t2.pageCurrent !== void 0 ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = t2.pageSize !== void 0 ? t2.pageSize : this.mixinDatacomPage.size, f2 = t2.getcount !== void 0 ? t2.getcount : this.getcount, p2 = t2.gettree !== void 0 ? t2.gettree : this.gettree, g = t2.gettreepath !== void 0 ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: t2.limitlevel !== void 0 ? t2.limitlevel : this.limitlevel, startWith: t2.startwith !== void 0 ? t2.startwith : this.startwith };
    return p2 && (m2.getTree = y2), g && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l3 - 1)).limit(d2).get(m2), n2;
  } } };
}
function _t(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), e3;
    }({ customUI: false, loadingOptions: { text: "\u52A0\u8F7D\u4E2D...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get: (n3, s3) => async function n4(...c2) {
      let u2;
      a2 && index.showLoading({ title: r2.title, mask: r2.mask });
      try {
        u2 = await e2.callFunction({ name: t2, type: i, data: { method: s3, params: c2 } });
      } catch (e3) {
        u2 = { result: e3 };
      }
      const { errCode: h2, errMsg: l3 } = u2.result || {};
      if (a2 && index.hideLoading(), h2) {
        if (a2)
          if (o2.type === "toast")
            index.showToast({ title: l3, icon: "none" });
          else {
            if (o2.type !== "modal")
              throw new Error(`Invalid errorOptions.type: ${o2.type}`);
            {
              const { confirm: e4 } = await async function({ title: e5, content: t3, showCancel: n5, cancelText: s4, confirmText: r3 } = {}) {
                return new Promise((o3, i2) => {
                  index.showModal({ title: e5, content: t3, showCancel: n5, cancelText: s4, confirmText: r3, success(e6) {
                    o3(e6);
                  }, fail() {
                    o3({ confirm: false, cancel: true });
                  } });
                });
              }({ title: "\u63D0\u793A", content: l3, showCancel: o2.retry, cancelText: "\u53D6\u6D88", confirmText: o2.retry ? "\u91CD\u8BD5" : "\u786E\u5B9A" });
              if (o2.retry && e4)
                return n4(...c2);
            }
          }
        const e3 = new I({ code: h2, message: l3, requestId: u2.requestId });
        throw e3.detail = u2.result, e3;
      }
      return u2.result;
    } });
  };
}
async function wt(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      C.request(__spreadProps(__spreadValues({}, s2), { success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } }));
    }));
    return !(!e3.data || e3.data.code !== 0);
  } catch (e3) {
    return false;
  }
  var s2;
}
function kt(e2) {
  if (e2.initUniCloudStatus && e2.initUniCloudStatus !== "rejected")
    return;
  let t2 = Promise.resolve();
  var n2;
  n2 = 1, t2 = new Promise((e3, t3) => {
    setTimeout(() => {
      e3();
    }, n2);
  }), e2.isReady = false, e2.isDefault = false;
  const s2 = e2.auth();
  e2.initUniCloudStatus = "pending", e2.initUniCloud = t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
    if (e2.debugInfo) {
      const { address: t3, servePort: n3 } = e2.debugInfo;
      return async function(e3, t4) {
        let n4;
        for (let s3 = 0; s3 < e3.length; s3++) {
          const r2 = e3[s3];
          if (await wt(r2, t4)) {
            n4 = r2;
            break;
          }
        }
        return { address: n4, port: t4 };
      }(t3, n3);
    }
  }).then(({ address: t3, port: n3 } = {}) => {
    if (t3)
      e2.localAddress = t3, e2.localPort = n3;
    else if (e2.debugInfo) {
      const t4 = console["warn"];
      let n4 = "";
      e2.debugInfo.initialLaunchType === "remote" ? (e2.debugInfo.forceRemote = true, n4 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs") : n4 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs", t4(n4);
    }
  }).then(() => {
    e2.isReady = true, e2.initUniCloudStatus = "fulfilled";
  }).catch((t3) => {
    console.error(t3), e2.initUniCloudStatus = "rejected";
  });
}
let vt = new class {
  init(e2) {
    let t2 = {};
    const n2 = e2.debugFunction !== false && l && d === "app-plus";
    switch (e2.provider) {
      case "tencent":
        t2 = je.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      case "aliyun":
        t2 = q.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      case "private":
        t2 = We.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      default:
        throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
    }
    const s2 = f;
    s2 && !s2.code && (t2.debugInfo = s2), kt(t2), t2.reInit = function() {
      kt(this);
    }, Ze(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), ht(t2), function(e3) {
      e3.getCurrentUserInfo = pt, e3.chooseAndUploadFile = gt.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return yt(e3);
      } }), e3.importObject = _t(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return t2.reInit(), n3.apply(t2, Array.from(arguments));
      }, t2[e3] = P(t2[e3], e3).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  {
    const e2 = p;
    let t2 = {};
    if (e2.length === 1)
      t2 = e2[0], vt = vt.init(t2), vt.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "\u5E94\u7528\u672A\u5173\u8054\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u5728uniCloud\u76EE\u5F55\u53F3\u952E\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t3.forEach((e3) => {
        vt[e3] = function() {
          return console.error(n2), Promise.reject(new I({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(vt, { get mixinDatacom() {
      return yt(vt);
    } }), vt.addInterceptor = v, vt.removeInterceptor = S;
  }
})();
var St = vt;
exports.Pinia = Pinia;
exports.St = St;
exports._export_sfc = _export_sfc;
exports.createPinia = createPinia;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f$1;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.n = n$3;
exports.o = o$1;
exports.onLoad = onLoad;
exports.p = p$1;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.sr = sr;
exports.src = src;
exports.t = t$1;
exports.useRoute = useRoute;
