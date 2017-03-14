!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("playerjsIframe",[],e):"object"==typeof exports?exports.playerjsIframe=e():t.playerjsIframe=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=r(o),u=n(4),a=r(u),c=n(3),s={create:function(t){var e=a["default"][t.schema];if(!e)throw new Error("No adapter for "+t.schema);return new e(t,new i["default"]({context:c.CONTEXT,targetOrigin:t.targetOrigin}))},addAdapter:function(t,e){a["default"][t]=e}};e["default"]=s,t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(2),c=r(a),s=n(3),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t),this.listeners={},this.config=e,this.origin=(0,c["default"])(document.referrer),this.bindEvents()}return u(t,[{key:"bindEvents",value:function(){var t=this;this.on(s.METHODS.ADD_EVENT_LISTENER,function(e,n){e===s.EVENTS.READY&&t.readyData?t.emit(i({},t.readyData,{listener:n.listener})):(t.listeners[e]=t.listeners[e]||[],t.listeners[e].indexOf(n.listener)===-1&&t.listeners[e].push(n.listener))}),this.on(s.METHODS.REMOVE_EVENT_LISTENER,function(e,n){if(t.listeners[e])if(n.listener){var r=t.listeners[e].indexOf(n.listener);r>-1&&t.listeners[e].splice(r,1)}else t.listeners[e]=[]})}},{key:"on",value:function(t,e){var n=this;return window.addEventListener("message",function(r){if(r.origin===n.origin){var o=r.data;if("string"==typeof o)try{o=JSON.parse(o)}catch(i){o={}}n.config.context&&o.context!==n.config.context||o.method===t&&e&&e(o.value,o)}}),this}},{key:"emit",value:function(t){var e=this;if(this.origin){"string"==typeof t&&(t={event:t}),t=i({context:this.config.context,version:this.config.version},t);var n=t.listener?[t.listener]:this.listeners[t.event]||[];return t.event===s.EVENTS.READY&&n.push(null),n.forEach(function(n){n?t.listener=n:delete t.listener,window.parent.postMessage(JSON.stringify(t),e.origin)}),this}}},{key:"returns",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.event=t.method||t.event,t.value=e,delete t.method,this.emit(t)}}]),t}();e["default"]=f,t.exports=e["default"]},function(t,e){"use strict";function n(t){return"//"===t.substr(0,2)&&(t=window.location.protocol+t),t.split("/").slice(0,3).join("/")}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.CONTEXT="player.js",e.EVENTS={READY:"ready",PLAY:"play",PAUSE:"pause",ENDED:"ended",SEEKED:"seeked",TIME_UPDATE:"timeupdate",PROGRESS:"progress",ERROR:"error"},e.METHODS={PLAY:"play",PAUSE:"pause",GET_PAUSED:"getPaused",MUTE:"mute",UNMUTE:"unmute",GET_MUTED:"getMuted",SET_VOLUME:"setVolume",GET_VOLUME:"getVolume",GET_DURATION:"getDuration",SET_CURRENT_TIME:"setCurrentTime",GET_CURRENT_TIME:"getCurrentTime",SET_LOOP:"setLoop",GET_LOOP:"getLoop",SUPPORTS:"supports",ADD_EVENT_LISTENER:"addEventListener",REMOVE_EVENT_LISTENER:"removeEventListener"}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),i=r(o),u=n(72),a=r(u);e["default"]={vimeo:i["default"],youtube:a["default"]},t.exports=e["default"]},function(t,e,n){(function(r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(70),f=o(s),l=n(71),p=o(l),d=n(3),v="//player.vimeo.com/api/player.js",h=[d.METHODS.PLAY,d.METHODS.PAUSE,d.METHODS.GET_PAUSED,d.METHODS.MUTE,d.METHODS.UNMUTE,d.METHODS.GET_MUTED,d.METHODS.SET_VOLUME,d.METHODS.GET_VOLUME,d.METHODS.GET_DURATION,d.METHODS.SET_CURRENT_TIME,d.METHODS.GET_CURRENT_TIME,d.METHODS.SET_LOOP,d.METHODS.GET_LOOP],y=[d.EVENTS.PROGRESS,d.EVENTS.TIME_UPDATE,d.EVENTS.PLAY,d.EVENTS.PAUSE,d.EVENTS.ENDED,d.EVENTS.SEEKED,d.EVENTS.ERROR],E=function(t){function e(){i(this,e);var t=u(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments));t.supportedEvents=y,t.supportedMethods=h,t.lastVolume=100;var n=new r(function(t,e){(0,p["default"])(v).then(t)});return n.then(function(){return t.init()}),t}return a(e,t),c(e,[{key:"init",value:function(){var t=this,e=this.config.src||this.config.videoId;this.player=new Vimeo.Player(document.body,{width:window.innerWidth,height:window.innerHeight,id:e}),this.player.ready().then(function(){y.forEach(function(e){t.player.on(e,function(n){t.messenger.emit({event:e,value:n})})}),t.ready()})}},{key:"play",value:function(){this.next("play")}},{key:"pause",value:function(){this.next("pause")}},{key:"getPaused",value:function(t){this.player.getPaused().then(function(e){t(e)})}},{key:"mute",value:function(){var t=this;this.player.getVolume().then(function(e){t.lastVolume=100*e,t.player.setVolume(0)})}},{key:"unmute",value:function(){this.setVolume(this.lastVolume)}},{key:"getMuted",value:function(t){this.player.getVolume().then(function(e){t(0===e)})}},{key:"setVolume",value:function(t){var e=this;this.player.setVolume(t/100).then(function(t){e.lastVolume=100*t})}},{key:"getVolume",value:function(t){var e=this;this.player.getVolume().then(function(n){e.lastVolume=100*n,t(e.lastVolume)})}},{key:"getDuration",value:function(t){this.player.getDuration().then(function(e){t(e)})}},{key:"setCurrentTime",value:function(t){this.player.setCurrentTime(t)}},{key:"getCurrentTime",value:function(t){this.player.getCurrentTime().then(function(e){t(e)})}},{key:"setLoop",value:function(t){this.player.setLoop(t)}},{key:"getLoop",value:function(t){this.player.getLoop().then(function(e){t(e)})}},{key:"next",value:function(t){var e=function(){this.waitFor=this.player[t]()}.bind(this);this.waitFor?this.waitFor.then(e,e):e()}}]),e}(f["default"]);e["default"]=E,t.exports=e["default"]}).call(e,n(6))},function(t,e,n){n(7),n(27),n(53),n(57),t.exports=n(26).Promise},function(t,e,n){"use strict";var r=n(8),o={};o[n(10)("toStringTag")]="z",o+""!="[object z]"&&n(14)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){var r=n(9),o=n(10)("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(11)("wks"),o=n(13),i=n(12).Symbol,u="function"==typeof i,a=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};a.store=r},function(t,e,n){var r=n(12),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(12),o=n(15),i=n(25),u=n(13)("src"),a="toString",c=Function[a],s=(""+c).split(a);n(26).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,a){var c="function"==typeof n;c&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(c&&(i(n,u)||o(n,u,t[e]?""+t[e]:s.join(String(e)))),t===r?t[e]=n:a?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,a,function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,e,n){var r=n(16),o=n(24);t.exports=n(20)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(17),o=n(19),i=n(23),u=Object.defineProperty;e.f=n(20)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(18);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(20)&&!n(21)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(21)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(18),o=n(12).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(18);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){"use strict";var r=n(28)(!0);n(31)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(29),o=n(30);t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),c=r(n),s=a.length;return c<0||c>=s?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===s||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(32),o=n(33),i=n(14),u=n(15),a=n(25),c=n(36),s=n(37),f=n(50),l=n(51),p=n(10)("iterator"),d=!([].keys&&"next"in[].keys()),v="@@iterator",h="keys",y="values",E=function(){return this};t.exports=function(t,e,n,m,T,_,g){s(n,e,m);var O,S,b,w=function(t){if(!d&&t in P)return P[t];switch(t){case h:return function(){return new n(this,t)};case y:return function(){return new n(this,t)}}return function(){return new n(this,t)}},M=e+" Iterator",x=T==y,D=!1,P=t.prototype,j=P[p]||P[v]||T&&P[T],R=j||w(T),N=T?x?w("entries"):R:void 0,k="Array"==e?P.entries||j:j;if(k&&(b=l(k.call(new t)),b!==Object.prototype&&(f(b,M,!0),r||a(b,p)||u(b,p,E))),x&&j&&j.name!==y&&(D=!0,R=function(){return j.call(this)}),r&&!g||!d&&!D&&P[p]||u(P,p,R),c[e]=R,c[M]=E,T)if(O={values:x?R:w(y),keys:_?R:w(h),entries:N},g)for(S in O)S in P||i(P,S,O[S]);else o(o.P+o.F*(d||D),e,O);return O}},function(t,e){t.exports=!1},function(t,e,n){var r=n(12),o=n(26),i=n(15),u=n(14),a=n(34),c="prototype",s=function(t,e,n){var f,l,p,d,v=t&s.F,h=t&s.G,y=t&s.S,E=t&s.P,m=t&s.B,T=h?r:y?r[e]||(r[e]={}):(r[e]||{})[c],_=h?o:o[e]||(o[e]={}),g=_[c]||(_[c]={});h&&(n=e);for(f in n)l=!v&&T&&void 0!==T[f],p=(l?T:n)[f],d=m&&l?a(p,r):E&&"function"==typeof p?a(Function.call,p):p,T&&u(T,f,p,t&s.U),_[f]!=p&&i(_,f,d),E&&g[f]!=p&&(g[f]=p)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e,n){var r=n(35);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(38),o=n(24),i=n(50),u={};n(15)(u,n(10)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(17),o=n(39),i=n(48),u=n(47)("IE_PROTO"),a=function(){},c="prototype",s=function(){var t,e=n(22)("iframe"),r=i.length,o="<",u=">";for(e.style.display="none",n(49).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+u+"document.F=Object"+o+"/script"+u),t.close(),s=t.F;r--;)delete s[c][i[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[c]=r(t),n=new a,a[c]=null,n[u]=t):n=s(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(16),o=n(17),i=n(40);t.exports=n(20)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,c=0;a>c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(41),o=n(48);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(25),o=n(42),i=n(44)(!1),u=n(47)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,s=[];for(n in a)n!=u&&r(a,n)&&s.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(s,n)||s.push(n));return s}},function(t,e,n){var r=n(43),o=n(30);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(42),o=n(45),i=n(46);t.exports=function(t){return function(e,n,u){var a,c=r(e),s=o(c.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if(a=c[f++],a!=a)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(29),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(29),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(11)("keys"),o=n(13);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){t.exports=n(12).document&&document.documentElement},function(t,e,n){var r=n(16).f,o=n(25),i=n(10)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(25),o=n(52),i=n(47)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(30);t.exports=function(t){return Object(r(t))}},function(t,e,n){for(var r=n(54),o=n(14),i=n(12),u=n(15),a=n(36),c=n(10),s=c("iterator"),f=c("toStringTag"),l=a.Array,p=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],d=0;d<5;d++){var v,h=p[d],y=i[h],E=y&&y.prototype;if(E){E[s]||u(E,s,l),E[f]||u(E,f,h),a[h]=l;for(v in r)E[v]||o(E,v,r[v],!0)}}},function(t,e,n){"use strict";var r=n(55),o=n(56),i=n(36),u=n(42);t.exports=n(31)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(10)("unscopables"),o=Array.prototype;void 0==o[r]&&n(15)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r,o,i,u=n(32),a=n(12),c=n(34),s=n(8),f=n(33),l=n(18),p=n(35),d=n(58),v=n(59),h=n(63),y=n(64).set,E=n(66)(),m="Promise",T=a.TypeError,_=a.process,g=a[m],_=a.process,O="process"==s(_),S=function(){},b=!!function(){try{var t=g.resolve(1),e=(t.constructor={})[n(10)("species")]=function(t){t(S,S)};return(O||"function"==typeof PromiseRejectionEvent)&&t.then(S)instanceof e}catch(r){}}(),w=function(t,e){return t===e||t===g&&e===i},M=function(t){var e;return!(!l(t)||"function"!=typeof(e=t.then))&&e},x=function(t){return w(g,t)?new D(t):new o(t)},D=o=function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw T("Bad Promise constructor");e=t,n=r}),this.resolve=p(e),this.reject=p(n)},P=function(t){try{t()}catch(e){return{error:e}}},j=function(t,e){if(!t._n){t._n=!0;var n=t._c;E(function(){for(var r=t._v,o=1==t._s,i=0,u=function(e){var n,i,u=o?e.ok:e.fail,a=e.resolve,c=e.reject,s=e.domain;try{u?(o||(2==t._h&&k(t),t._h=1),u===!0?n=r:(s&&s.enter(),n=u(r),s&&s.exit()),n===e.promise?c(T("Promise-chain cycle")):(i=M(n))?i.call(n,a,c):a(n)):c(r)}catch(f){c(f)}};n.length>i;)u(n[i++]);t._c=[],t._n=!1,e&&!t._h&&R(t)})}},R=function(t){y.call(a,function(){var e,n,r,o=t._v;if(N(t)&&(e=P(function(){O?_.emit("unhandledRejection",o,t):(n=a.onunhandledrejection)?n({promise:t,reason:o}):(r=a.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=O||N(t)?2:1),t._a=void 0,e)throw e.error})},N=function(t){if(1==t._h)return!1;for(var e,n=t._a||t._c,r=0;n.length>r;)if(e=n[r++],e.fail||!N(e.promise))return!1;return!0},k=function(t){y.call(a,function(){var e;O?_.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},V=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),j(e,!0))},U=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw T("Promise can't be resolved itself");(e=M(t))?E(function(){var r={_w:n,_d:!1};try{e.call(t,c(U,r,1),c(V,r,1))}catch(o){V.call(r,o)}}):(n._v=t,n._s=1,j(n,!1))}catch(r){V.call({_w:n,_d:!1},r)}}};b||(g=function(t){d(this,g,m,"_h"),p(t),r.call(this);try{t(c(U,this,1),c(V,this,1))}catch(e){V.call(this,e)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(67)(g.prototype,{then:function(t,e){var n=x(h(this,g));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=O?_.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&j(this,!1),n.promise},"catch":function(t){return this.then(void 0,t)}}),D=function(){var t=new r;this.promise=t,this.resolve=c(U,t,1),this.reject=c(V,t,1)}),f(f.G+f.W+f.F*!b,{Promise:g}),n(50)(g,m),n(68)(m),i=n(26)[m],f(f.S+f.F*!b,m,{reject:function(t){var e=x(this),n=e.reject;return n(t),e.promise}}),f(f.S+f.F*(u||!b),m,{resolve:function(t){if(t instanceof g&&w(t.constructor,this))return t;var e=x(this),n=e.resolve;return n(t),e.promise}}),f(f.S+f.F*!(b&&n(69)(function(t){g.all(t)["catch"](S)})),m,{all:function(t){var e=this,n=x(e),r=n.resolve,o=n.reject,i=P(function(){var n=[],i=0,u=1;v(t,!1,function(t){var a=i++,c=!1;n.push(void 0),u++,e.resolve(t).then(function(t){c||(c=!0,n[a]=t,--u||r(n))},o)}),--u||r(n)});return i&&o(i.error),n.promise},race:function(t){var e=this,n=x(e),r=n.reject,o=P(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o&&r(o.error),n.promise}})},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(34),o=n(60),i=n(61),u=n(17),a=n(45),c=n(62),s={},f={},e=t.exports=function(t,e,n,l,p){var d,v,h,y,E=p?function(){return t}:c(t),m=r(n,l,e?2:1),T=0;if("function"!=typeof E)throw TypeError(t+" is not iterable!");if(i(E)){for(d=a(t.length);d>T;T++)if(y=e?m(u(v=t[T])[0],v[1]):m(t[T]),y===s||y===f)return y}else for(h=E.call(t);!(v=h.next()).done;)if(y=o(h,m,v.value,e),y===s||y===f)return y};e.BREAK=s,e.RETURN=f},function(t,e,n){var r=n(17);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var u=t["return"];throw void 0!==u&&r(u.call(t)),i}}},function(t,e,n){var r=n(36),o=n(10)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(8),o=n(10)("iterator"),i=n(36);t.exports=n(26).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r=n(17),o=n(35),i=n(10)("species");t.exports=function(t,e){var n,u=r(t).constructor;return void 0===u||void 0==(n=r(u)[i])?e:o(n)}},function(t,e,n){var r,o,i,u=n(34),a=n(65),c=n(49),s=n(22),f=n(12),l=f.process,p=f.setImmediate,d=f.clearImmediate,v=f.MessageChannel,h=0,y={},E="onreadystatechange",m=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},T=function(t){m.call(t.data)};p&&d||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++h]=function(){a("function"==typeof t?t:Function(t),e)},r(h),h},d=function(t){delete y[t]},"process"==n(9)(l)?r=function(t){l.nextTick(u(m,t,1))}:v?(o=new v,i=o.port2,o.port1.onmessage=T,r=u(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",T,!1)):r=E in s("script")?function(t){c.appendChild(s("script"))[E]=function(){c.removeChild(this),m.call(t)}}:function(t){setTimeout(u(m,t,1),0)}),t.exports={set:p,clear:d}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(12),o=n(64).set,i=r.MutationObserver||r.WebKitMutationObserver,u=r.process,a=r.Promise,c="process"==n(9)(u);t.exports=function(){var t,e,n,s=function(){var r,o;for(c&&(r=u.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(i){throw t?n():e=void 0,i}}e=void 0,r&&r.enter()};if(c)n=function(){u.nextTick(s)};else if(i){var f=!0,l=document.createTextNode("");new i(s).observe(l,{characterData:!0}),n=function(){l.data=f=!f}}else if(a&&a.resolve){var p=a.resolve();n=function(){p.then(s)}}else n=function(){o.call(r,s)};return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var r=n(14);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e,n){"use strict";var r=n(12),o=n(16),i=n(20),u=n(10)("species");t.exports=function(t){var e=r[t];i&&e&&!e[u]&&o.f(e,u,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(10)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(u){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(a){}return n}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(3),u=function(){function t(e,n){r(this,t),this.supportedEvents=[],this.supportedMethods=[],this.config=e,this.messenger=n}return o(t,[{key:"createIframe",value:function(t){var e=document.createElement("iframe"),n="embed-iframe";return e.id=n,e.src=t,e.width="100%",e.height="100%",e.scrolling="no",e.frameBorder="0",e.tabIndex=0,e.allowTransparency=!0,e.setAttribute("allowfullscreen",""),e}},{key:"ready",value:function(){var t=this;this.supportedMethods.forEach(function(e){t.messenger.on(e,function(n,r){t[e]&&(/^get/.test(e)?t[e](function(e){t.messenger.returns(r,e)}):t[e](n))})}),this.supportedEvents.length>0&&this.supportedMethods.push(i.METHODS.ADD_EVENT_LISTENER,i.METHODS.REMOVE_EVENT_LISTENER),this.messenger.on(i.METHODS.ADD_EVENT_LISTENER,function(e,n){n.value===i.EVENTS.READY&&t.emitReadyEvent()}),this.emitReadyEvent()}},{key:"emitReadyEvent",value:function(){this.readyData={event:i.EVENTS.READY,value:{src:window.location.href,events:this.supportedEvents,methods:this.supportedMethods}},this.messenger.emit(this.readyData)}}]),t}();e["default"]=u,t.exports=e["default"]},function(t,e,n){(function(n){"use strict";function r(t){return new n(function(e,n){if(document.querySelector('script[src="'+t+'"]'))return void e();var r=document.createElement(o);r.async=!0,i.appendChild(r),r.onload=r.onreadystatechange=function(t,o){(o||!r.readyState||u.test(r.readyState))&&(r.onload=r.onreadystatechange=null,r=void 0,o?n():e())},r.src=t})}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=r;var o="script",i=document.head||document.body,u=/loaded|complete/;t.exports=e["default"]}).call(e,n(6))},function(t,e,n){(function(r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t){var e="";switch(t){case 2:e="[YouTube] The request contains an invalid parameter value.";break;case 100:e="[YouTube] The video requested was not found.";break;case 101:case 150:e="[YouTube] The owner of the requested video does not allow it to be played in embedded players.";break;default:e="[YouTube] Something went wrong."}return e}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(70),l=o(f),p=n(71),d=o(p),v=n(3),h="//www.youtube.com/iframe_api",y=[v.METHODS.PLAY,v.METHODS.PAUSE,v.METHODS.GET_PAUSED,v.METHODS.MUTE,v.METHODS.UNMUTE,v.METHODS.GET_MUTED,v.METHODS.SET_VOLUME,v.METHODS.GET_VOLUME,v.METHODS.GET_DURATION,v.METHODS.SET_CURRENT_TIME,v.METHODS.GET_CURRENT_TIME,v.METHODS.SET_LOOP,v.METHODS.GET_LOOP],E=[v.EVENTS.PLAY,v.EVENTS.PAUSE,v.EVENTS.ENDED,v.EVENTS.ERROR,v.EVENTS.TIME_UPDATE],m={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,VIDEO_CUED:5},T=function(t){function e(){i(this,e);var t=u(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments));t.supportedEvents=E,t.supportedMethods=y;var n=new r(function(t,e){window.onYouTubeIframeAPIReady=t,(0,d["default"])(h)});return n.then(function(){return t.init()}),t}return a(e,t),s(e,[{key:"init",value:function(){var t=this;this.config.videoId||(this.config.videoId="");var e="https://www.youtube.com/embed/"+this.config.videoId+"?enablejsapi=1&wmode=opaque&widgetid=1";if(this.config.playlistId){var n=this.config.playlistType||"playlist";e+="&list="+encodeURIComponent(this.config.playlistId)+"&listType="+encodeURIComponent(n)}window.location&&window.location.origin&&(e+="&origin="+encodeURIComponent(window.location.origin));var r=this.createIframe(e),o=r.id;document.body.appendChild(r),this.player=new YT.Player(o,{events:{onReady:function(){t.ready(),t.pollForUpdates()},onError:function(e){var n=e.data;t.messenger.emit({event:v.EVENTS.ERROR,value:{code:n,msg:c(n)}})},onStateChange:function(e){var n={0:v.EVENTS.ENDED,1:v.EVENTS.PLAY,2:v.EVENTS.PAUSE};n[e.data]&&t.messenger.emit(n[e.data]),0===e.data&&t.isLooping&&(t.setCurrentTime(0),t.play())}}})}},{key:"play",value:function(){this.player.playVideo()}},{key:"pause",value:function(){this.player.pauseVideo()}},{key:"getPaused",value:function(t){t(this.player.getPlayerState()===m.PAUSED)}},{key:"mute",value:function(){this.player.mute()}},{key:"unmute",value:function(){this.player.unMute()}},{key:"getMuted",value:function(t){t(this.player.isMuted())}},{key:"setVolume",value:function(t){this.player.setVolume(t)}},{key:"getVolume",value:function(t){t(this.player.getVolume())}},{key:"getDuration",value:function(t){t(this.player.getDuration())}},{key:"setCurrentTime",value:function(t){this.player.seekTo(t)}},{key:"getCurrentTime",value:function(t){t(this.player.getCurrentTime())}},{key:"setLoop",value:function(t){this.isLooping=t}},{key:"getLoop",value:function(t){t(this.isLooping)}},{key:"pollForUpdates",value:function(t){var e=this;window.setInterval(function(){e.onCurrentTimeChange(function(t){e.getDuration(function(n){e.messenger.emit({event:v.EVENTS.TIME_UPDATE,value:{seconds:t,duration:n}})})})},250)}},{key:"onCurrentTimeChange",value:function(t){var e=this;this.getPaused(function(n){n||e.getCurrentTime(function(n){e.lastTimeUpdate!==n&&(e.lastTimeUpdate=n,t(n))})})}}]),e}(l["default"]);T.isLooping=!1,e["default"]=T,t.exports=e["default"]}).call(e,n(6))}])});