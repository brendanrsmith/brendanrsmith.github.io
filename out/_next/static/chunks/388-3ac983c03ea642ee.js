(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[388],{1432:function(e,t,n){"use strict";var r=n(930),i=n(5696),a=n(7980);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.src,u=e.sizes,l=e.unoptimized,y=void 0!==l&&l,S=e.priority,C=void 0!==S&&S,_=e.loading,z=e.className,E=e.quality,x=e.width,I=e.height,k=e.fill,j=e.style,M=e.onLoadingComplete,A=e.placeholder,O=void 0===A?"empty":A,L=e.blurDataURL,P=d(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoadingComplete","placeholder","blurDataURL"]),R=c.useContext(h.ImageConfigContext),U=c.useMemo((function(){var e=g||R||p.imageConfigDefault,t=[].concat(a(e.deviceSizes),a(e.imageSizes)).sort((function(e,t){return e-t})),n=e.deviceSizes.sort((function(e,t){return e-t}));return o({},e,{allSizes:t,deviceSizes:n})}),[R]),N=P,q=w;if("loader"in N){if(N.loader){var B=N.loader;q=function(e){e.config;var t=d(e,["config"]);return B(t)}}delete N.loader}var Z,T,W="",D=v(x),F=v(I);if(function(e){return"object"===typeof e&&(m(e)||function(e){return void 0!==e.src}(e))}(n)){var H=m(n)?n.default:n;if(!H.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(H)));if(!H.height||!H.width)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(H)));if(Z=H.blurWidth,T=H.blurHeight,L=L||H.blurDataURL,W=H.src,!k)if(D||F){if(D&&!F){var G=D/H.width;F=Math.round(H.height*G)}else if(!D&&F){var V=F/H.height;D=Math.round(H.width*V)}}else D=H.width,F=H.height}var $=!C&&("lazy"===_||"undefined"===typeof _);((n="string"===typeof n?n:W).startsWith("data:")||n.startsWith("blob:"))&&(y=!0,$=!1);U.unoptimized&&(y=!0);var J=c.useState(!1),Q=i(J,2),K=Q[0],X=Q[1],Y=c.useState(!1),ee=i(Y,2),te=ee[0],ne=ee[1],re=v(E);0;var ie=Object.assign(k?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0}:{},te?{}:{color:"transparent"},j),ae="blur"===O&&L&&!K?{backgroundSize:ie.objectFit||"cover",backgroundPosition:ie.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(f.getImageBlurSvg({widthInt:D,heightInt:F,blurWidth:Z,blurHeight:T,blurDataURL:L}),'")')}:{};0;var oe=function(e){var t=e.config,n=e.src,r=e.unoptimized,i=e.width,o=e.quality,u=e.sizes,l=e.loader;if(r)return{src:n,srcSet:void 0,sizes:void 0};var d=function(e,t,n){var r=e.deviceSizes,i=e.allSizes;if(n){for(var o,u=/(^|\s)(1?\d?\d)vw/g,l=[];o=u.exec(n);o)l.push(parseInt(o[2]));if(l.length){var d=.01*Math.min.apply(Math,l);return{widths:i.filter((function(e){return e>=r[0]*d})),kind:"w"}}return{widths:i,kind:"w"}}if("number"!==typeof t)return{widths:r,kind:"w"};return{widths:a(new Set([t,2*t].map((function(e){return i.find((function(t){return t>=e}))||i[i.length-1]})))),kind:"x"}}(t,i,u),c=d.widths,s=d.kind,f=c.length-1;return{sizes:u||"w"!==s?u:"100vw",srcSet:c.map((function(e,r){return"".concat(l({config:t,src:n,quality:o,width:e})," ").concat("w"===s?e:r+1).concat(s)})).join(", "),src:l({config:t,src:n,quality:o,width:c[f]})}}({config:U,src:n,unoptimized:y,width:D,quality:re,sizes:u,loader:q}),ue=n;0;var le="imagesrcset",de="imagesizes";le="imageSrcSet",de="imageSizes";var ce=(r(t={},le,oe.srcSet),r(t,de,oe.sizes),t),se=c.useRef(M);c.useEffect((function(){se.current=M}),[M]);var fe=o({isLazy:$,imgAttributes:oe,heightInt:F,widthInt:D,qualityInt:re,className:z,imgStyle:ie,blurStyle:ae,loading:_,config:U,fill:k,unoptimized:y,placeholder:O,loader:q,srcString:ue,onLoadingCompleteRef:se,setBlurComplete:X,setShowAltText:ne},N);return c.default.createElement(c.default.Fragment,null,c.default.createElement(b,Object.assign({},fe)),C?c.default.createElement(s.default,null,c.default.createElement("link",Object.assign({key:"__nimg-"+oe.src+oe.srcSet+oe.sizes,rel:"preload",as:"image",href:oe.srcSet?void 0:oe.src},ce))):null)};var o=n(6495).Z,u=n(2648).Z,l=n(1598).Z,d=n(7273).Z,c=l(n(7294)),s=u(n(2717)),f=n(8259),p=n(8187),h=n(9239);n(9475);var g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"custom",dangerouslyAllowSVG:!1,unoptimized:!1};new Map;function m(e){return void 0!==e.default}function v(e){return"number"===typeof e||"undefined"===typeof e?e:"string"===typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function y(e,t,n,r,i){e&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch((function(){})).then((function(){e.parentNode&&("blur"===n&&i(!0),(null==r?void 0:r.current)&&r.current(e))})))}var b=function(e){var t=e.imgAttributes,n=e.heightInt,r=e.widthInt,i=(e.qualityInt,e.className),a=e.imgStyle,u=e.blurStyle,l=e.isLazy,s=e.fill,f=e.placeholder,p=e.loading,h=e.srcString,g=(e.config,e.unoptimized,e.loader,e.onLoadingCompleteRef),m=e.setBlurComplete,v=e.setShowAltText,b=e.onLoad,w=e.onError,S=d(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return p=l?"lazy":p,c.default.createElement(c.default.Fragment,null,c.default.createElement("img",Object.assign({},S,t,{width:r,height:n,decoding:"async","data-nimg":"future".concat(s?"-fill":""),className:i,loading:p,style:o({},a,u),ref:c.useCallback((function(e){e&&(w&&(e.src=e.src),e.complete&&y(e,h,f,g,m))}),[h,f,g,m,w]),onLoad:function(e){y(e.currentTarget,h,f,g,m),b&&b(e)},onError:function(e){v(!0),"blur"===f&&m(!0),w&&w(e)}})))};function w(e){var t=e.config,n=e.src,r=e.width,i=e.quality;return n.endsWith(".svg")&&!t.dangerouslyAllowSVG?n:"".concat(t.path,"?url=").concat(encodeURIComponent(n),"&w=").concat(r,"&q=").concat(i||75)}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,i=void 0!==r&&r,a=e.hasQuery,o=void 0!==a&&a;return n||i&&o}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=c,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,a=(0,n(1598).Z)(n(7294)),o=i(n(1585)),u=n(8e3),l=n(5850),d=n(9470);n(9475);function c(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var f=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n=t.inAmpMode;return e.reduce(s,[]).reverse().concat(c(n).reverse()).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(i){var a=!0,o=!1;if(i.key&&"number"!==typeof i.key&&i.key.indexOf("$")>0){o=!0;var u=i.key.slice(i.key.indexOf("$")+1);e.has(u)?a=!1:e.add(u)}switch(i.type){case"title":case"base":t.has(i.type)?a=!1:t.add(i.type);break;case"meta":for(var l=0,d=f.length;l<d;l++){var c=f[l];if(i.props.hasOwnProperty(c))if("charSet"===c)n.has(c)?a=!1:n.add(c);else{var s=i.props[c],p=r[c]||new Set;"name"===c&&o||!p.has(s)?(p.add(s),r[c]=p):a=!1}}}return a}}()).reverse().map((function(e,t){var i=e.key||t;if(!n&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var o=r({},e.props||{});return o["data-href"]=o.href,o.href=void 0,o["data-optimized-fonts"]=!0,a.default.cloneElement(e,o)}return a.default.cloneElement(e,{key:i})}))}var h=function(e){var t=e.children,n=a.useContext(u.AmpStateContext),r=a.useContext(l.HeadManagerContext);return a.default.createElement(o.default,{reduceComponentsToState:p,headManager:r,inAmpMode:d.isInAmpMode(n)},t)};t.default=h,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8259:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){var t=e.widthInt,n=e.heightInt,r=e.blurWidth,i=e.blurHeight,a=e.blurDataURL,o=r&&i?"1":"20",u=r||t,l=i||n,d=a.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(u," ").concat(l,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(o,"'/%3E").concat(d,"%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(a,"'/%3E%3C/svg%3E")}},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.headManager,n=e.reduceComponentsToState;function u(){if(t&&t.mountedInstances){var i=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(i,e))}}if(i){var l;null==t||null==(l=t.mountedInstances)||l.add(e.children),u()}return a((function(){var n;return null==t||null==(n=t.mountedInstances)||n.add(e.children),function(){var n;null==t||null==(n=t.mountedInstances)||n.delete(e.children)}})),a((function(){return t&&(t._pendingUpdate=u),function(){t&&(t._pendingUpdate=u)}})),o((function(){return t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),function(){t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)}})),null};var r=(0,n(1598).Z)(n(7294));var i=!1,a=i?function(){}:r.useLayoutEffect,o=i?function(){}:r.useEffect},930:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},e.exports.default=e.exports,e.exports.__esModule=!0},1608:function(e,t,n){e.exports=n(1432)},9008:function(e,t,n){e.exports=n(2717)}}]);