/**
 * Copied from https://analytics.scratchaddons.com/js/plausible.outbound-links.exclusions.js
 */

!function(n,o){"use strict";var e,s=n.location,l=n.document,t=l.querySelector('[src*="'+o+'"]'),c=t&&t.getAttribute("data-domain"),p=n.localStorage.plausible_ignore,u=t&&t.getAttribute("data-exclude").split(",");function h(e){console.warn("Ignoring Event: "+e)}function a(e,t){if(/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(s.hostname)||"file:"===s.protocol)return h("localhost");if(!(n.phantom||n._phantom||n.__nightmare||n.navigator.webdriver||n.Cypress)){if("true"==p)return h("localStorage flag");if(u)for(var a=0;a<u.length;a++)if("pageview"==e&&s.pathname.match(new RegExp("^"+u[a].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return h("exclusion rule");var r={};r.n=e,r.u=s.href,r.d=c,r.r=l.referrer||null,r.w=n.innerWidth,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=JSON.stringify(t.props));var i=new XMLHttpRequest;i.open("POST",o+"/api/event",!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(r)),i.onreadystatechange=function(){4==i.readyState&&t&&t.callback&&t.callback()}}}function r(){e!==s.pathname&&(e=s.pathname,a("pageview"))}function i(e){for(var t=e.target,a="auxclick"==e.type&&2==e.which,r="click"==e.type;t&&(void 0===t.tagName||"a"!=t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==s.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){s.href=t.href},150),e.preventDefault()))}try{var f,g=n.history;g.pushState&&(f=g.pushState,g.pushState=function(){f.apply(this,arguments),r()},n.addEventListener("popstate",r)),l.addEventListener("click",i),l.addEventListener("auxclick",i);var d=n.plausible&&n.plausible.q||[];n.plausible=a;for(var v=0;v<d.length;v++)a.apply(this,d[v]);"prerender"===l.visibilityState?l.addEventListener("visibilitychange",function(){e||"visible"!==l.visibilityState||r()}):r()}catch(e){console.error(e),(new Image).src=o+"/api/error?message="+encodeURIComponent(e.message)}}(window,"https://analytics.scratchaddons.com");