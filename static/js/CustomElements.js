/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.5.4
"undefined"==typeof WeakMap&&!function(){var e=Object.defineProperty,t=Date.now()%1e9,r=function(){this.name="__st"+(1e9*Math.random()>>>0)+(t++ +"__")};r.prototype={set:function(t,r){var n=t[this.name];return n&&n[0]===t?n[1]=r:e(t,this.name,{value:[t,r],writable:!0}),this},get:function(e){var t;return(t=e[this.name])&&t[0]===e?t[1]:void 0},"delete":function(e){var t=e[this.name];return t&&t[0]===e?(t[0]=t[1]=void 0,!0):!1},has:function(e){var t=e[this.name];return t?t[0]===e:!1}},window.WeakMap=r}(),function(e){function t(e){_.push(e),b||(b=!0,m(n))}function r(e){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(e)||e}function n(){b=!1;var e=_;_=[],e.sort(function(e,t){return e.uid_-t.uid_});var t=!1;e.forEach(function(e){var r=e.takeRecords();o(e),r.length&&(e.callback_(r,e),t=!0)}),t&&n()}function o(e){e.nodes_.forEach(function(t){var r=v.get(t);r&&r.forEach(function(t){t.observer===e&&t.removeTransientObservers()})})}function i(e,t){for(var r=e;r;r=r.parentNode){var n=v.get(r);if(n)for(var o=0;o<n.length;o++){var i=n[o],a=i.options;if(r===e||a.subtree){var s=t(a);s&&i.enqueue(s)}}}}function a(e){this.callback_=e,this.nodes_=[],this.records_=[],this.uid_=++E}function s(e,t){this.type=e,this.target=t,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function d(e){var t=new s(e.type,e.target);return t.addedNodes=e.addedNodes.slice(),t.removedNodes=e.removedNodes.slice(),t.previousSibling=e.previousSibling,t.nextSibling=e.nextSibling,t.attributeName=e.attributeName,t.attributeNamespace=e.attributeNamespace,t.oldValue=e.oldValue,t}function u(e,t){return y=new s(e,t)}function c(e){return N?N:(N=d(y),N.oldValue=e,N)}function l(){y=N=void 0}function f(e){return e===N||e===y}function p(e,t){return e===t?e:N&&f(e)?N:null}function h(e,t,r){this.observer=e,this.target=t,this.options=r,this.transientObservedNodes=[]}var m,v=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))m=setTimeout;else if(window.setImmediate)m=window.setImmediate;else{var w=[],g=String(Math.random());window.addEventListener("message",function(e){if(e.data===g){var t=w;w=[],t.forEach(function(e){e()})}}),m=function(e){w.push(e),window.postMessage(g,"*")}}var b=!1,_=[],E=0;a.prototype={observe:function(e,t){if(e=r(e),!t.childList&&!t.attributes&&!t.characterData||t.attributeOldValue&&!t.attributes||t.attributeFilter&&t.attributeFilter.length&&!t.attributes||t.characterDataOldValue&&!t.characterData)throw new SyntaxError;var n=v.get(e);n||v.set(e,n=[]);for(var o,i=0;i<n.length;i++)if(n[i].observer===this){o=n[i],o.removeListeners(),o.options=t;break}o||(o=new h(this,e,t),n.push(o),this.nodes_.push(e)),o.addListeners()},disconnect:function(){this.nodes_.forEach(function(e){for(var t=v.get(e),r=0;r<t.length;r++){var n=t[r];if(n.observer===this){n.removeListeners(),t.splice(r,1);break}}},this),this.records_=[]},takeRecords:function(){var e=this.records_;return this.records_=[],e}};var y,N;h.prototype={enqueue:function(e){var r=this.observer.records_,n=r.length;if(r.length>0){var o=r[n-1],i=p(o,e);if(i)return void(r[n-1]=i)}else t(this.observer);r[n]=e},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(e){var t=this.options;t.attributes&&e.addEventListener("DOMAttrModified",this,!0),t.characterData&&e.addEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.addEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(e){var t=this.options;t.attributes&&e.removeEventListener("DOMAttrModified",this,!0),t.characterData&&e.removeEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.removeEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(e){if(e!==this.target){this.addListeners_(e),this.transientObservedNodes.push(e);var t=v.get(e);t||v.set(e,t=[]),t.push(this)}},removeTransientObservers:function(){var e=this.transientObservedNodes;this.transientObservedNodes=[],e.forEach(function(e){this.removeListeners_(e);for(var t=v.get(e),r=0;r<t.length;r++)if(t[r]===this){t.splice(r,1);break}},this)},handleEvent:function(e){switch(e.stopImmediatePropagation(),e.type){case"DOMAttrModified":var t=e.attrName,r=e.relatedNode.namespaceURI,n=e.target,o=new u("attributes",n);o.attributeName=t,o.attributeNamespace=r;var a=e.attrChange===MutationEvent.ADDITION?null:e.prevValue;i(n,function(e){return!e.attributes||e.attributeFilter&&e.attributeFilter.length&&-1===e.attributeFilter.indexOf(t)&&-1===e.attributeFilter.indexOf(r)?void 0:e.attributeOldValue?c(a):o});break;case"DOMCharacterDataModified":var n=e.target,o=u("characterData",n),a=e.prevValue;i(n,function(e){return e.characterData?e.characterDataOldValue?c(a):o:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(e.target);case"DOMNodeInserted":var s,d,n=e.relatedNode,f=e.target;"DOMNodeInserted"===e.type?(s=[f],d=[]):(s=[],d=[f]);var p=f.previousSibling,h=f.nextSibling,o=u("childList",n);o.addedNodes=s,o.removedNodes=d,o.previousSibling=p,o.nextSibling=h,i(n,function(e){return e.childList?o:void 0})}l()}},e.JsMutationObserver=a,e.MutationObserver||(e.MutationObserver=a)}(this),window.CustomElements=window.CustomElements||{flags:{}},function(e){var t=e.flags,r=[],n=function(e){r.push(e)},o=function(){r.forEach(function(t){t(e)})};e.addModule=n,e.initializeModules=o,e.hasNative=Boolean(document.registerElement),e.useNative=!t.register&&e.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||HTMLImports.useNative)}(CustomElements),CustomElements.addModule(function(e){function t(e,t){r(e,function(e){return t(e)?!0:void n(e,t)}),n(e,t)}function r(e,t,n){var o=e.firstElementChild;if(!o)for(o=e.firstChild;o&&o.nodeType!==Node.ELEMENT_NODE;)o=o.nextSibling;for(;o;)t(o,n)!==!0&&r(o,t,n),o=o.nextElementSibling;return null}function n(e,r){for(var n=e.shadowRoot;n;)t(n,r),n=n.olderShadowRoot}function o(e,t){a=[],i(e,t),a=null}function i(e,t){if(e=wrap(e),!(a.indexOf(e)>=0)){a.push(e);for(var r,n=e.querySelectorAll("link[rel="+s+"]"),o=0,d=n.length;d>o&&(r=n[o]);o++)r["import"]&&i(r["import"],t);t(e)}}var a,s=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none";e.forDocumentTree=o,e.forSubtree=t}),CustomElements.addModule(function(e){function t(e){return r(e)||n(e)}function r(t){return e.upgrade(t)?!0:void s(t)}function n(e){_(e,function(e){return r(e)?!0:void 0})}function o(e){s(e),f(e)&&_(e,function(e){s(e)})}function i(e){M.push(e),N||(N=!0,setTimeout(a))}function a(){N=!1;for(var e,t=M,r=0,n=t.length;n>r&&(e=t[r]);r++)e();M=[]}function s(e){y?i(function(){d(e)}):d(e)}function d(e){e.__upgraded__&&(e.attachedCallback||e.detachedCallback)&&!e.__attached&&f(e)&&(e.__attached=!0,e.attachedCallback&&e.attachedCallback())}function u(e){c(e),_(e,function(e){c(e)})}function c(e){y?i(function(){l(e)}):l(e)}function l(e){e.__upgraded__&&(e.attachedCallback||e.detachedCallback)&&e.__attached&&!f(e)&&(e.__attached=!1,e.detachedCallback&&e.detachedCallback())}function f(e){for(var t=e,r=wrap(document);t;){if(t==r)return!0;t=t.parentNode||t.host}}function p(e){if(e.shadowRoot&&!e.shadowRoot.__watched){b.dom&&console.log("watching shadow-root for: ",e.localName);for(var t=e.shadowRoot;t;)v(t),t=t.olderShadowRoot}}function h(e){if(b.dom){var r=e[0];if(r&&"childList"===r.type&&r.addedNodes&&r.addedNodes){for(var n=r.addedNodes[0];n&&n!==document&&!n.host;)n=n.parentNode;var o=n&&(n.URL||n._URL||n.host&&n.host.localName)||"";o=o.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",e.length,o||"")}e.forEach(function(e){"childList"===e.type&&(O(e.addedNodes,function(e){e.localName&&t(e)}),O(e.removedNodes,function(e){e.localName&&u(e)}))}),b.dom&&console.groupEnd()}function m(e){for(e=wrap(e),e||(e=wrap(document));e.parentNode;)e=e.parentNode;var t=e.__observer;t&&(h(t.takeRecords()),a())}function v(e){if(!e.__observer){var t=new MutationObserver(h);t.observe(e,{childList:!0,subtree:!0}),e.__observer=t}}function w(e){e=wrap(e),b.dom&&console.group("upgradeDocument: ",e.baseURI.split("/").pop()),t(e),v(e),b.dom&&console.groupEnd()}function g(e){E(e,w)}var b=e.flags,_=e.forSubtree,E=e.forDocumentTree,y=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;e.hasPolyfillMutations=y;var N=!1,M=[],O=Array.prototype.forEach.call.bind(Array.prototype.forEach),L=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var e=L.call(this);return CustomElements.watchShadow(this),e},e.watchShadow=p,e.upgradeDocumentTree=g,e.upgradeSubtree=n,e.upgradeAll=t,e.attachedNode=o,e.takeRecords=m}),CustomElements.addModule(function(e){function t(t){if(!t.__upgraded__&&t.nodeType===Node.ELEMENT_NODE){var n=t.getAttribute("is"),o=e.getRegisteredDefinition(n||t.localName);if(o){if(n&&o.tag==t.localName)return r(t,o);if(!n&&!o["extends"])return r(t,o)}}}function r(t,r){return a.upgrade&&console.group("upgrade:",t.localName),r.is&&t.setAttribute("is",r.is),n(t,r),t.__upgraded__=!0,i(t),e.attachedNode(t),e.upgradeSubtree(t),a.upgrade&&console.groupEnd(),t}function n(e,t){Object.__proto__?e.__proto__=t.prototype:(o(e,t.prototype,t["native"]),e.__proto__=t.prototype)}function o(e,t,r){for(var n={},o=t;o!==r&&o!==HTMLElement.prototype;){for(var i,a=Object.getOwnPropertyNames(o),s=0;i=a[s];s++)n[i]||(Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(o,i)),n[i]=1);o=Object.getPrototypeOf(o)}}function i(e){e.createdCallback&&e.createdCallback()}var a=e.flags;e.upgrade=t,e.upgradeWithDefinition=r,e.implementPrototype=n}),CustomElements.addModule(function(e){function t(t,n){var d=n||{};if(!t)throw new Error("document.registerElement: first argument `name` must not be empty");if(t.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(t)+"'.");if(o(t))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(t)+"'. The type name is invalid.");if(u(t))throw new Error("DuplicateDefinitionError: a type with name '"+String(t)+"' is already registered");return d.prototype||(d.prototype=Object.create(HTMLElement.prototype)),d.__name=t.toLowerCase(),d.lifecycle=d.lifecycle||{},d.ancestry=i(d["extends"]),a(d),s(d),r(d.prototype),c(d.__name,d),d.ctor=l(d),d.ctor.prototype=d.prototype,d.prototype.constructor=d.ctor,e.ready&&v(document),d.ctor}function r(e){if(!e.setAttribute._polyfilled){var t=e.setAttribute;e.setAttribute=function(e,r){n.call(this,e,r,t)};var r=e.removeAttribute;e.removeAttribute=function(e){n.call(this,e,null,r)},e.setAttribute._polyfilled=!0}}function n(e,t,r){e=e.toLowerCase();var n=this.getAttribute(e);r.apply(this,arguments);var o=this.getAttribute(e);this.attributeChangedCallback&&o!==n&&this.attributeChangedCallback(e,n,o)}function o(e){for(var t=0;t<E.length;t++)if(e===E[t])return!0}function i(e){var t=u(e);return t?i(t["extends"]).concat([t]):[]}function a(e){for(var t,r=e["extends"],n=0;t=e.ancestry[n];n++)r=t.is&&t.tag;e.tag=r||e.__name,r&&(e.is=e.__name)}function s(e){if(!Object.__proto__){var t=HTMLElement.prototype;if(e.is){var r=document.createElement(e.tag),n=Object.getPrototypeOf(r);n===e.prototype&&(t=n)}for(var o,i=e.prototype;i&&i!==t;)o=Object.getPrototypeOf(i),i.__proto__=o,i=o;e["native"]=t}}function d(e){return g(M(e.tag),e)}function u(e){return e?y[e.toLowerCase()]:void 0}function c(e,t){y[e]=t}function l(e){return function(){return d(e)}}function f(e,t,r){return e===N?p(t,r):O(e,t)}function p(e,t){var r=u(t||e);if(r){if(e==r.tag&&t==r.is)return new r.ctor;if(!t&&!r.is)return new r.ctor}var n;return t?(n=p(e),n.setAttribute("is",t),n):(n=M(e),e.indexOf("-")>=0&&b(n,HTMLElement),n)}function h(e){var t=L.call(this,e);return w(t),t}var m,v=e.upgradeDocumentTree,w=e.upgrade,g=e.upgradeWithDefinition,b=e.implementPrototype,_=e.useNative,E=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],y={},N="http://www.w3.org/1999/xhtml",M=document.createElement.bind(document),O=document.createElementNS.bind(document),L=Node.prototype.cloneNode;m=Object.__proto__||_?function(e,t){return e instanceof t}:function(e,t){for(var r=e;r;){if(r===t.prototype)return!0;r=r.__proto__}return!1},document.registerElement=t,document.createElement=p,document.createElementNS=f,Node.prototype.cloneNode=h,e.registry=y,e["instanceof"]=m,e.reservedTagList=E,e.getRegisteredDefinition=u,document.register=document.registerElement}),function(e){function t(){a(wrap(document)),window.HTMLImports&&(HTMLImports.__importsParsingHook=function(e){a(wrap(e["import"]))}),CustomElements.ready=!0,setTimeout(function(){CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}var r=e.useNative,n=e.initializeModules,o=/Trident/.test(navigator.userAgent);if(r){var i=function(){};e.watchShadow=i,e.upgrade=i,e.upgradeAll=i,e.upgradeDocumentTree=i,e.upgradeSubtree=i,e.takeRecords=i,e["instanceof"]=function(e,t){return e instanceof t}}else n();var a=e.upgradeDocumentTree;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(e){return e}),o&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(e,t){t=t||{};var r=document.createEvent("CustomEvent");return r.initCustomEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.detail),r},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||e.flags.eager)t();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var s=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(s,t)}else t()}(window.CustomElements);