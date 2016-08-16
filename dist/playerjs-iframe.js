!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("playerjsIframe",[],e):"object"==typeof exports?exports.playerjsIframe=e():t.playerjsIframe=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=r(o),u=n(71),c=r(u),s=n(70),a={create:function(t){var e=c["default"][t.schema];if(!e)throw new Error("No adapter for "+t.schema);return new e(t,new i["default"]({context:s.CONTEXT,targetOrigin:t.targetOrigin}))},addAdapter:function(t,e){c["default"][t]=e}};e["default"]=a,t.exports=e["default"]},function(t,e,n){(function(r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(69),s=o(c),a=n(70),f=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];i(this,t),this.listeners={},this.config=e,this.bindEvents()}return u(t,[{key:"bindEvents",value:function(){var t=this;this.on(a.METHODS.ADD_EVENT_LISTENER,function(e,n){t.listeners[n.value]=new r(t.listeners[n.value]),t.listeners[n.value].add(n.listener)}),this.on(a.METHODS.REMOVE_EVENT_LISTENER,function(e,n){t.listeners[n.value]&&t.listeneres[n.value]["delete"](n.listener)})}},{key:"on",value:function(t,e){var n=this;return window.addEventListener("message",function(r){var o=r.origin||r.originalEvent.origin;if(o===n.config.targetOrigin)try{var i=JSON.parse(r.data);n.config.context&&i.context!==n.config.context||i.method===t&&e&&e(i.value,i)}catch(u){}}),this}},{key:"emit",value:function(t){var e=this;if("string"==typeof t&&(t={event:t}),t=Object.keys(this.config).reduce(function(t,n){return t.hasOwnProperty(n)||(t[n]=e.config[n]),t},t||{}),t.event===a.EVENTS.READY)(0,s["default"])(t,this.config.targetOrigin);else{var n=t.listener?[t.listener]:this.listeners[t.event]||[];n.forEach(function(n){t.listener=n,(0,s["default"])(t,e.config.targetOrigin)})}return this}},{key:"returns",value:function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=arguments.length<=1||void 0===arguments[1]?"":arguments[1];t.event=t.method||t.event,t.value=e,delete t.method,this.emit(t)}}]),t}();e["default"]=f,t.exports=e["default"]}).call(e,n(2))},function(t,e,n){n(3),n(23),n(49),n(53),t.exports=n(22).Set},function(t,e,n){"use strict";var r=n(4),o={};o[n(6)("toStringTag")]="z",o+""!="[object z]"&&n(10)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){var r=n(5),o=n(6)("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(c=r(e))&&"function"==typeof e.callee?"Arguments":c}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(7)("wks"),o=n(9),i=n(8).Symbol,u="function"==typeof i,c=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};c.store=r},function(t,e,n){var r=n(8),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(8),o=n(11),i=n(21),u=n(9)("src"),c="toString",s=Function[c],a=(""+s).split(c);n(22).inspectSource=function(t){return s.call(t)},(t.exports=function(t,e,n,c){var s="function"==typeof n;s&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(s&&(i(n,u)||o(n,u,t[e]?""+t[e]:a.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,c,function(){return"function"==typeof this&&this[u]||s.call(this)})},function(t,e,n){var r=n(12),o=n(20);t.exports=n(16)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(13),o=n(15),i=n(19),u=Object.defineProperty;e.f=n(16)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(c){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(14);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(16)&&!n(17)(function(){return 7!=Object.defineProperty(n(18)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(17)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(14),o=n(8).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(14);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){"use strict";var r=n(24)(!0);n(27)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(25),o=n(26);t.exports=function(t){return function(e,n){var i,u,c=String(o(e)),s=r(n),a=c.length;return 0>s||s>=a?t?"":void 0:(i=c.charCodeAt(s),55296>i||i>56319||s+1===a||(u=c.charCodeAt(s+1))<56320||u>57343?t?c.charAt(s):i:t?c.slice(s,s+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(28),o=n(29),i=n(10),u=n(11),c=n(21),s=n(32),a=n(33),f=n(46),l=n(47),p=n(6)("iterator"),v=!([].keys&&"next"in[].keys()),h="@@iterator",d="keys",y="values",E=function(){return this};t.exports=function(t,e,n,_,m,g,T){a(n,e,_);var O,S,b,w=function(t){if(!v&&t in j)return j[t];switch(t){case d:return function(){return new n(this,t)};case y:return function(){return new n(this,t)}}return function(){return new n(this,t)}},x=e+" Iterator",M=m==y,P=!1,j=t.prototype,D=j[p]||j[h]||m&&j[m],N=D||w(m),k=m?M?w("entries"):N:void 0,R="Array"==e?j.entries||D:D;if(R&&(b=l(R.call(new t)),b!==Object.prototype&&(f(b,x,!0),r||c(b,p)||u(b,p,E))),M&&D&&D.name!==y&&(P=!0,N=function(){return D.call(this)}),r&&!T||!v&&!P&&j[p]||u(j,p,N),s[e]=N,s[x]=E,m)if(O={values:M?N:w(y),keys:g?N:w(d),entries:k},T)for(S in O)S in j||i(j,S,O[S]);else o(o.P+o.F*(v||P),e,O);return O}},function(t,e){t.exports=!1},function(t,e,n){var r=n(8),o=n(22),i=n(11),u=n(10),c=n(30),s="prototype",a=function(t,e,n){var f,l,p,v,h=t&a.F,d=t&a.G,y=t&a.S,E=t&a.P,_=t&a.B,m=d?r:y?r[e]||(r[e]={}):(r[e]||{})[s],g=d?o:o[e]||(o[e]={}),T=g[s]||(g[s]={});d&&(n=e);for(f in n)l=!h&&m&&void 0!==m[f],p=(l?m:n)[f],v=_&&l?c(p,r):E&&"function"==typeof p?c(Function.call,p):p,m&&u(m,f,p,t&a.U),g[f]!=p&&i(g,f,v),E&&T[f]!=p&&(T[f]=p)};r.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(31);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(34),o=n(20),i=n(46),u={};n(11)(u,n(6)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(13),o=n(35),i=n(44),u=n(43)("IE_PROTO"),c=function(){},s="prototype",a=function(){var t,e=n(18)("iframe"),r=i.length,o=">";for(e.style.display="none",n(45).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),a=t.F;r--;)delete a[s][i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c[s]=r(t),n=new c,c[s]=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(12),o=n(13),i=n(36);t.exports=n(16)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),c=u.length,s=0;c>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){var r=n(37),o=n(44);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(21),o=n(38),i=n(40)(!1),u=n(43)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),s=0,a=[];for(n in c)n!=u&&r(c,n)&&a.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(a,n)||a.push(n));return a}},function(t,e,n){var r=n(39),o=n(26);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(5);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(38),o=n(41),i=n(42);t.exports=function(t){return function(e,n,u){var c,s=r(e),a=o(s.length),f=i(u,a);if(t&&n!=n){for(;a>f;)if(c=s[f++],c!=c)return!0}else for(;a>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(25),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(25),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(7)("keys"),o=n(9);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){t.exports=n(8).document&&document.documentElement},function(t,e,n){var r=n(12).f,o=n(21),i=n(6)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(21),o=n(48),i=n(43)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(26);t.exports=function(t){return Object(r(t))}},function(t,e,n){for(var r=n(50),o=n(10),i=n(8),u=n(11),c=n(32),s=n(6),a=s("iterator"),f=s("toStringTag"),l=c.Array,p=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],v=0;5>v;v++){var h,d=p[v],y=i[d],E=y&&y.prototype;if(E){E[a]||u(E,a,l),E[f]||u(E,f,d),c[d]=l;for(h in r)E[h]||o(E,h,r[h],!0)}}},function(t,e,n){"use strict";var r=n(51),o=n(52),i=n(32),u=n(38);t.exports=n(27)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(6)("unscopables"),o=Array.prototype;void 0==o[r]&&n(11)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r=n(54);t.exports=n(63)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},function(t,e,n){"use strict";var r=n(12).f,o=n(34),i=(n(11),n(55)),u=n(30),c=n(56),s=n(26),a=n(57),f=n(27),l=n(52),p=n(61),v=n(16),h=n(62).fastKey,d=v?"_s":"size",y=function(t,e){var n,r=h(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var l=t(function(t,r){c(t,l,e,"_i"),t._i=o(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=r&&a(r,n,t[f],t)});return i(l.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[d]=0},"delete":function(t){var e=this,n=y(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[d]--}return!!n},forEach:function(t){c(this,l,"forEach");for(var e,n=u(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!y(this,t)}}),v&&r(l.prototype,"size",{get:function(){return s(this[d])}}),l},def:function(t,e,n){var r,o,i=y(t,e);return i?i.v=n:(t._l=i={i:o=h(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[d]++,"F"!==o&&(t._i[o]=i)),t},getEntry:y,setStrong:function(t,e,n){f(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?l(0,n.k):"values"==e?l(0,n.v):l(0,[n.k,n.v]):(t._t=void 0,l(1))},n?"entries":"values",!n,!0),p(e)}}},function(t,e,n){var r=n(10);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(30),o=n(58),i=n(59),u=n(13),c=n(41),s=n(60),a={},f={},e=t.exports=function(t,e,n,l,p){var v,h,d,y,E=p?function(){return t}:s(t),_=r(n,l,e?2:1),m=0;if("function"!=typeof E)throw TypeError(t+" is not iterable!");if(i(E)){for(v=c(t.length);v>m;m++)if(y=e?_(u(h=t[m])[0],h[1]):_(t[m]),y===a||y===f)return y}else for(d=E.call(t);!(h=d.next()).done;)if(y=o(d,_,h.value,e),y===a||y===f)return y};e.BREAK=a,e.RETURN=f},function(t,e,n){var r=n(13);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var u=t["return"];throw void 0!==u&&r(u.call(t)),i}}},function(t,e,n){var r=n(32),o=n(6)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(4),o=n(6)("iterator"),i=n(32);t.exports=n(22).getIteratorMethod=function(t){return void 0!=t?t[o]||t["@@iterator"]||i[r(t)]:void 0}},function(t,e,n){"use strict";var r=n(8),o=n(12),i=n(16),u=n(6)("species");t.exports=function(t){var e=r[t];i&&e&&!e[u]&&o.f(e,u,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(9)("meta"),o=n(14),i=n(21),u=n(12).f,c=0,s=Object.isExtensible||function(){return!0},a=!n(17)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++c,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},v=function(t){return a&&h.NEED&&s(t)&&!i(t,r)&&f(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:v}},function(t,e,n){"use strict";var r=n(8),o=n(29),i=n(10),u=n(55),c=n(62),s=n(57),a=n(56),f=n(14),l=n(17),p=n(64),v=n(46),h=n(65);t.exports=function(t,e,n,d,y,E){var _=r[t],m=_,g=y?"set":"add",T=m&&m.prototype,O={},S=function(t){var e=T[t];i(T,t,"delete"==t?function(t){return E&&!f(t)?!1:e.call(this,0===t?0:t)}:"has"==t?function(t){return E&&!f(t)?!1:e.call(this,0===t?0:t)}:"get"==t?function(t){return E&&!f(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof m&&(E||T.forEach&&!l(function(){(new m).entries().next()}))){var b=new m,w=b[g](E?{}:-0,1)!=b,x=l(function(){b.has(1)}),M=p(function(t){new m(t)}),P=!E&&l(function(){for(var t=new m,e=5;e--;)t[g](e,e);return!t.has(-0)});M||(m=e(function(e,n){a(e,m,t);var r=h(new _,e,m);return void 0!=n&&s(n,y,r[g],r),r}),m.prototype=T,T.constructor=m),(x||P)&&(S("delete"),S("has"),y&&S("get")),(P||w)&&S(g),E&&T.clear&&delete T.clear}else m=d.getConstructor(e,t,y,g),u(m.prototype,n),c.NEED=!0;return v(m,t),O[t]=m,o(o.G+o.W+o.F*(m!=_),O),E||d.setStrong(m,t,y),m}},function(t,e,n){var r=n(6)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(u){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(c){}return n}},function(t,e,n){var r=n(14),o=n(66).set;t.exports=function(t,e,n){var i,u=e.constructor;return u!==n&&"function"==typeof u&&(i=u.prototype)!==n.prototype&&r(i)&&o&&o(t,i),t}},function(t,e,n){var r=n(14),o=n(13),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n(30)(Function.call,n(67).f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(o){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},function(t,e,n){var r=n(68),o=n(20),i=n(38),u=n(19),c=n(21),s=n(15),a=Object.getOwnPropertyDescriptor;e.f=n(16)?a:function(t,e){if(t=i(t),e=u(e,!0),s)try{return a(t,e)}catch(n){}return c(t,e)?o(!r.f.call(t,e),t[e]):void 0}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){"use strict";function n(t,e){e&&window.parent.postMessage(JSON.stringify(t),e)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.CONTEXT="player.js",e.EVENTS={READY:"ready",PLAY:"play",PAUSE:"pause",ENDED:"ended",SEEKED:"seeked",TIME_UPDATE:"timeupdate",PROGRESS:"progress",ERROR:"error"},e.METHODS={PLAY:"play",PAUSE:"pause",GET_PAUSED:"getPaused",MUTE:"mute",UNMUTE:"unmute",GET_MUTED:"getMuted",SET_VOLUME:"setVolume",GET_VOLUME:"getVolume",GET_DURATION:"getDuration",SET_CURRENT_TIME:"setCurrentTime",GET_CURRENT_TIME:"getCurrentTime",SET_LOOP:"setLoop",GET_LOOP:"getLoop",REMOVE_EVENT_LISTENER:"removeEventListener",ADD_EVENT_LISTENER:"addEventListener"}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(72),i=r(o),u=n(81),c=r(u);e["default"]={vimeo:i["default"],youtube:c["default"]},t.exports=e["default"]},function(t,e,n){(function(r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(79),f=o(a),l=n(80),p=o(l),v=n(70),h="//player.vimeo.com/api/player.js",d=[v.METHODS.PLAY,v.METHODS.PAUSE,v.METHODS.GET_PAUSED,v.METHODS.MUTE,v.METHODS.UNMUTE,v.METHODS.GET_MUTED,v.METHODS.SET_VOLUME,v.METHODS.GET_VOLUME,v.METHODS.GET_DURATION,v.METHODS.SET_CURRENT_TIME,v.METHODS.GET_CURRENT_TIME],y=[v.EVENTS.PROGRESS,v.EVENTS.TIME_UPDATE,v.EVENTS.PLAY,v.EVENTS.PAUSE,v.EVENTS.ENDED,v.EVENTS.SEEKED,v.EVENTS.ERROR],E=function(t){function e(){i(this,e);var t=u(this,Object.getPrototypeOf(e).apply(this,arguments));t.supportedEvents=y,t.supportedMethods=d;var n=new r(function(t,e){(0,p["default"])(h).then(t)});return n.then(function(){return t.init()}),t}return c(e,t),s(e,[{key:"init",value:function(){var t=this;this.player=new Vimeo.Player(document.body,{width:window.innerWidth,height:window.innerHeight,id:this.config.videoId}),this.player.ready().then(function(){y.forEach(function(e){t.player.on(e,function(){t.messenger.emit(e)})}),t.ready()})}},{key:"play",value:function(){this.player.play()}},{key:"pause",value:function(){this.player.pause()}},{key:"getPaused",value:function(t){var e=this;this.player.getPaused().then(function(n){e.messenger.returns(t,n)})}},{key:"mute",value:function(){var t=this;this.player.getVolume().then(function(e){t.lastVolume=e,t.player.setVolume(0)})}},{key:"unmute",value:function(){this.player.setVolume(this.lastVolume)}},{key:"getMuted",value:function(t){var e=this;this.player.getVolume().then(function(n){e.messenger.returns(t,0===n)})}},{key:"setVolume",value:function(t){var e=this;this.player.setVolume(t.value/100).then(function(t){e.lastVolume=t})}},{key:"getVolume",value:function(t){var e=this;this.player.getVolume().then(function(n){e.lastVolume=n,e.messenger.returns(t,Math.round(100*n))})}},{key:"getDuration",value:function(t){var e=this;this.player.getDuration().then(function(n){e.messenger.returns(t,n)})}},{key:"setCurrentTime",value:function(t){this.player.setCurrentTime(t.value)}},{key:"getCurrentTime",value:function(t){var e=this;this.player.getCurrentTime().then(function(n){e.messenger.returns(t,n)})}}]),e}(f["default"]);E.lastVolume=100,e["default"]=E,t.exports=e["default"]}).call(e,n(73))},function(t,e,n){n(3),n(23),n(49),n(74),t.exports=n(22).Promise},function(t,e,n){"use strict";var r,o,i,u=n(28),c=n(8),s=n(30),a=n(4),f=n(29),l=n(14),p=(n(13),n(31)),v=n(56),h=n(57),d=(n(66).set,n(75)),y=n(76).set,E=n(78)(),_="Promise",m=c.TypeError,g=c.process,T=c[_],g=c.process,O="process"==a(g),S=function(){},b=!!function(){try{var t=T.resolve(1),e=(t.constructor={})[n(6)("species")]=function(t){t(S,S)};return(O||"function"==typeof PromiseRejectionEvent)&&t.then(S)instanceof e}catch(r){}}(),w=function(t,e){return t===e||t===T&&e===i},x=function(t){var e;return l(t)&&"function"==typeof(e=t.then)?e:!1},M=function(t){return w(T,t)?new P(t):new o(t)},P=o=function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw m("Bad Promise constructor");e=t,n=r}),this.resolve=p(e),this.reject=p(n)},j=function(t){try{t()}catch(e){return{error:e}}},D=function(t,e){if(!t._n){t._n=!0;var n=t._c;E(function(){for(var r=t._v,o=1==t._s,i=0,u=function(e){var n,i,u=o?e.ok:e.fail,c=e.resolve,s=e.reject,a=e.domain;try{u?(o||(2==t._h&&R(t),t._h=1),u===!0?n=r:(a&&a.enter(),n=u(r),a&&a.exit()),n===e.promise?s(m("Promise-chain cycle")):(i=x(n))?i.call(n,c,s):c(n)):s(r)}catch(f){s(f)}};n.length>i;)u(n[i++]);t._c=[],t._n=!1,e&&!t._h&&N(t)})}},N=function(t){y.call(c,function(){var e,n,r,o=t._v;if(k(t)&&(e=j(function(){O?g.emit("unhandledRejection",o,t):(n=c.onunhandledrejection)?n({promise:t,reason:o}):(r=c.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=O||k(t)?2:1),t._a=void 0,e)throw e.error})},k=function(t){if(1==t._h)return!1;for(var e,n=t._a||t._c,r=0;n.length>r;)if(e=n[r++],e.fail||!k(e.promise))return!1;return!0},R=function(t){y.call(c,function(){var e;O?g.emit("rejectionHandled",t):(e=c.onrejectionhandled)&&e({promise:t,reason:t._v})})},V=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0))},A=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw m("Promise can't be resolved itself");(e=x(t))?E(function(){var r={_w:n,_d:!1};try{e.call(t,s(A,r,1),s(V,r,1))}catch(o){V.call(r,o)}}):(n._v=t,n._s=1,D(n,!1))}catch(r){V.call({_w:n,_d:!1},r)}}};b||(T=function(t){v(this,T,_,"_h"),p(t),r.call(this);try{t(s(A,this,1),s(V,this,1))}catch(e){V.call(this,e)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(55)(T.prototype,{then:function(t,e){var n=M(d(this,T));return n.ok="function"==typeof t?t:!0,n.fail="function"==typeof e&&e,n.domain=O?g.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},"catch":function(t){return this.then(void 0,t)}}),P=function(){var t=new r;this.promise=t,this.resolve=s(A,t,1),this.reject=s(V,t,1)}),f(f.G+f.W+f.F*!b,{Promise:T}),n(46)(T,_),n(61)(_),i=n(22)[_],f(f.S+f.F*!b,_,{reject:function(t){var e=M(this),n=e.reject;return n(t),e.promise}}),f(f.S+f.F*(u||!b),_,{resolve:function(t){if(t instanceof T&&w(t.constructor,this))return t;var e=M(this),n=e.resolve;return n(t),e.promise}}),f(f.S+f.F*!(b&&n(64)(function(t){T.all(t)["catch"](S)})),_,{all:function(t){var e=this,n=M(e),r=n.resolve,o=n.reject,i=j(function(){var n=[],i=0,u=1;h(t,!1,function(t){var c=i++,s=!1;n.push(void 0),u++,e.resolve(t).then(function(t){s||(s=!0,n[c]=t,--u||r(n))},o)}),--u||r(n)});return i&&o(i.error),n.promise},race:function(t){var e=this,n=M(e),r=n.reject,o=j(function(){h(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o&&r(o.error),n.promise}})},function(t,e,n){var r=n(13),o=n(31),i=n(6)("species");t.exports=function(t,e){var n,u=r(t).constructor;return void 0===u||void 0==(n=r(u)[i])?e:o(n)}},function(t,e,n){var r,o,i,u=n(30),c=n(77),s=n(45),a=n(18),f=n(8),l=f.process,p=f.setImmediate,v=f.clearImmediate,h=f.MessageChannel,d=0,y={},E="onreadystatechange",_=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},m=function(t){_.call(t.data)};p&&v||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++d]=function(){c("function"==typeof t?t:Function(t),e)},r(d),d},v=function(t){delete y[t]},"process"==n(5)(l)?r=function(t){l.nextTick(u(_,t,1))}:h?(o=new h,i=o.port2,o.port1.onmessage=m,r=u(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",m,!1)):r=E in a("script")?function(t){s.appendChild(a("script"))[E]=function(){s.removeChild(this),_.call(t)}}:function(t){setTimeout(u(_,t,1),0)}),t.exports={set:p,clear:v}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(8),o=n(76).set,i=r.MutationObserver||r.WebKitMutationObserver,u=r.process,c=r.Promise,s="process"==n(5)(u);t.exports=function(){var t,e,n,a=function(){var r,o;for(s&&(r=u.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(i){throw t?n():e=void 0,i}}e=void 0,r&&r.enter()};if(s)n=function(){u.nextTick(a)};else if(i){var f=!0,l=document.createTextNode("");new i(a).observe(l,{characterData:!0}),n=function(){l.data=f=!f}}else if(c&&c.resolve){var p=c.resolve();n=function(){p.then(a)}}else n=function(){o.call(r,a)};return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(70),u=function(){function t(e,n){r(this,t),this.supportedEvents=[],this.supportedMethods=[],this.config=e,this.messenger=n}return o(t,[{key:"ready",value:function(){var t=this;this.supportedMethods.forEach(function(e){t.messenger.on(e,function(n,r){t[e]&&t[e](r)})}),this.supportedEvents.length>0&&this.supportedMethods.push(i.METHODS.ADD_EVENT_LISTENER,i.METHODS.REMOVE_EVENT_LISTENER),this.messenger.emit({event:i.EVENTS.READY,value:{src:window.location.href,events:this.supportedEvents,methods:this.supportedMethods}})}}]),t}();e["default"]=u,t.exports=e["default"]},function(t,e,n){(function(n){"use strict";function r(t){return new n(function(e,n){if(document.querySelector('script[src="'+t+'"]'))return void e();var r=document.createElement(o);r.async=!0,i.appendChild(r),r.onload=r.onreadystatechange=function(t,o){(o||!r.readyState||u.test(r.readyState))&&(r.onload=r.onreadystatechange=null,r=void 0,o?n():e())},r.src=t})}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=r;var o="script",i=document.head||document.body,u=/loaded|complete/;t.exports=e["default"]}).call(e,n(73))},function(t,e,n){(function(r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(79),f=o(a),l=n(80),p=o(l),v=n(70),h="//www.youtube.com/iframe_api",d=[v.METHODS.PLAY,v.METHODS.PAUSE,v.METHODS.GET_PAUSED,v.METHODS.MUTE,v.METHODS.UNMUTE,v.METHODS.GET_MUTED,v.METHODS.SET_VOLUME,v.METHODS.GET_VOLUME,v.METHODS.GET_DURATION,v.METHODS.SET_CURRENT_TIME,v.METHODS.GET_CURRENT_TIME],y=[v.EVENTS.PLAY,v.EVENTS.PAUSE,v.EVENTS.ENDED,v.EVENTS.ERROR],E={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,VIDEO_CUED:5},_=function(t){function e(){i(this,e);var t=u(this,Object.getPrototypeOf(e).apply(this,arguments));t.supportedEvents=y,t.supportedMethods=d;var n=new r(function(t,e){window.onYouTubeIframeAPIReady=t,(0,p["default"])(h)});return n.then(function(){return t.init()}),t}return c(e,t),s(e,[{key:"init",value:function(){var t=this,e=document.createElement("div");document.body.appendChild(e),this.player=new YT.Player(e,{height:"100%",width:"100%",videoId:this.config.videoId,events:{onReady:function(){t.ready()},onError:function(){t.messenger.emit({event:v.EVENTS.ERROR,value:{code:-1,msg:"something went wrong"}})},onStateChange:function(e){var n={0:v.EVENTS.ENDED,1:v.EVENTS.PLAY,2:v.EVENTS.PAUSE};n[e.data]&&t.messenger.emit(n[e.data])}}})}},{key:"play",value:function(){this.player.playVideo()}},{key:"pause",value:function(){this.player.pauseVideo()}},{key:"getPaused",value:function(t){this.messenger.returns(t,this.player.getPlayerState()===E.PAUSED)}},{key:"mute",value:function(){this.player.mute()}},{key:"unmute",value:function(){this.player.unMute()}},{key:"getMuted",value:function(t){this.messenger.returns(t,this.player.isMuted())}},{key:"setVolume",value:function(t){this.player.setVolume(t.value)}},{key:"getVolume",value:function(t){this.messenger.returns(t,this.player.getVolume())}},{key:"getDuration",value:function(t){this.messenger.returns(t,this.player.getDuration())}},{key:"setCurrentTime",value:function(t){this.player.seekTo(t.value)}},{key:"getCurrentTime",value:function(t){
this.messenger.returns(t,this.player.getCurrentTime())}}]),e}(f["default"]);e["default"]=_,t.exports=e["default"]}).call(e,n(73))}])});