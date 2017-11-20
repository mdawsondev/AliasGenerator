(function(h){function e(f){if(k[f])return k[f].exports;var b=k[f]={i:f,l:!1,exports:{}};h[f].call(b.exports,b,b.exports,e);b.l=!0;return b.exports}var k={};e.m=h;e.c=k;e.d=function(f,b,a){e.o(f,b)||Object.defineProperty(f,b,{configurable:!1,enumerable:!0,get:a})};e.n=function(f){var b=f&&f.__esModule?function(){return f["default"]}:function(){return f};e.d(b,"a",b);return b};e.o=function(e,b){return Object.prototype.hasOwnProperty.call(e,b)};e.p="";return e(e.s=0)})([function(h,e,k){function f(a){return a&&
  a.__esModule?a:{"default":a}}h=k(1);h=f(h);e=k(2);e=f(e);var b=k(3);b=f(b);k=k(4);k=f(k);new h["default"];new e["default"];new b["default"];new k["default"]},function(h,e,k){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function b(a,c){for(var d=0;d<c.length;d++){var g=c[d];g.enumerable=g.enumerable||!1;g.configurable=!0;"value"in g&&(g.writable=!0);Object.defineProperty(a,g.key,g)}}return function(a,c,d){c&&b(a.prototype,c);d&&b(a,d);return a}}();h=function(){function b(){if(!(this instanceof
  b))throw new TypeError("Cannot call a class as a function");this.activeCats=[];this.custom=document.querySelector("#custom__input");this.data=null;this.log=[];this.output=document.querySelector(".output__username");this.history=document.querySelector(".history__log");this.settings=[];this.username=[];this.wordCount=3;this.init()}f(b,[{key:"init",value:function(){this.getData();this.getWordCount()}},{key:"getButtons",value:function(){this.generate();this.toggleOptions("setting",this.settings);this.toggleOptions("category",
  this.activeCats)}},{key:"buildCats",value:function(a){var c=document.createDocumentFragment();this.data.forEach(function(a){var d=document.createElement("div"),b=document.createElement("span"),e=document.createElement("i");a=a.name;b.classList.add("category--uppercase");e.classList.add("fa","fa-toggle-on");d.classList.add("category","category--enabled");d.id=a;b.textContent=" "+a;d.append(b);d.prepend(e);c.appendChild(d)});document.querySelector(".features__categories").appendChild(c);a()}},{key:"getData",
  value:function(a){var c=this;fetch("./assets/data/collection.json").then(function(a){return a.json()}).then(function(a){c.data=a.category;c.buildCats(function(){return c.getButtons()});c.enableCats()})}},{key:"enableCats",value:function(){var a=this;this.data.forEach(function(c){a.activeCats.push(c.name)})}},{key:"clearGen",value:function(){this.setName();this.setOutput("")}},{key:"createName",value:function(){for(var a=this,c=this.activeCats.length,d=this.custom.value.replace(/ /g,"").split(","),
  b=d.length,e=0,f=function(){var g=null;g=null;var f=a.activeCats[Math.floor(Math.random()*c)];"somecustom"===f||-1<a.activeCats.indexOf("onlycustom")?g=d[Math.floor(Math.random()*b)]:(g=a.data.find(function(a){return a.name===f}),g=g.content[Math.floor(Math.random()*g.content.length)]);-1===a.username.indexOf(g)&&(a.username.push(g),e++)};e<this.wordCount;)f()}},{key:"setName",value:function(){this.username=[]}},{key:"setOutput",value:function(a){this.output.textContent=a}},{key:"addLog",value:function(a){10<=
  this.log.length&&this.log.shift();this.log.push(a)}},{key:"transformOutput",value:function(a){var c=this;a.forEach(function(a){switch(a){case "capsfirst":c.toCaps("first");break;case "capslock":c.toCaps("lock");break;case "capsrandom":c.toCaps("random");break;case "leet":c.toLeet();break;case "title":c.toTitle()}});this.username=this.username.join("")}},{key:"toCaps",value:function(a){var c=this;this.username.forEach(function(d,b){"first"===a&&(c.username[b]=d.charAt(0).toUpperCase()+d.slice(1));
  "lock"===a&&(c.username[b]=d.toUpperCase());if("random"===a){var g="",e;for(e in d){var f=d[e];Math.floor(2*Math.random())?g+=f.toUpperCase():g+=f}c.username[b]=g}})}},{key:"toLeet",value:function(){var a=this;this.username.forEach(function(c,d){a.username[d]=c.replace(/a/gi,"4").replace(/e/gi,"3").replace(/f/gi,"ph").replace(/i/gi,"1").replace(/t/gi,"7").replace(/o/gi,"0").replace(/s/gi,"5").replace(/ate/gi,"8")})}},{key:"toTitle",value:function(){var a=this.activeCats.find(function(a){return"titles"===
  a.name});this.username[0]=a.content[Math.floor(Math.random()*a.content.length)]}},{key:"generate",value:function(){var a=this;document.querySelector("#generate").addEventListener("click",function(){a.clearGen();try{a.createName(),a.transformOutput(a.settings),a.setOutput(a.username),a.addLog(a.username)}catch(c){a.setOutput("Pick some words!")}})}},{key:"toggleOptions",value:function(a,c){document.querySelectorAll("."+a).forEach(function(d){d.addEventListener("click",function(d){d=d.currentTarget;
  var b=d.children[0],g=d.id,e=c.indexOf(g);-1===e?c.push(g):c.splice(e,1);d.classList.toggle(a+"--enabled");b.classList.toggle("fa-toggle-on");b.classList.toggle("fa-toggle-off")})})}},{key:"getWordCount",value:function(){var a=this;document.querySelector("#wordcount").addEventListener("change",function(c){a.wordCount=c.currentTarget.value})}}]);return b}();e["default"]=h},function(h,e,k){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function b(a,c){for(var d=0;d<c.length;d++){var b=
  c[d];b.enumerable=b.enumerable||!1;b.configurable=!0;"value"in b&&(b.writable=!0);Object.defineProperty(a,b.key,b)}}return function(a,c,d){c&&b(a.prototype,c);d&&b(a,d);return a}}();h=function(){function b(){if(!(this instanceof b))throw new TypeError("Cannot call a class as a function");this.container=document.querySelector(".container");this.features=document.querySelector(".features");this.settingsButton=document.querySelector(".btn--options");this.init()}f(b,[{key:"init",value:function(){var a=
  this;this.settingsButton.addEventListener("click",function(b){a.features.classList.toggle("features--hidden")})}}]);return b}();e["default"]=h},function(h,e,k){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function b(a,b){for(var d=0;d<b.length;d++){var c=b[d];c.enumerable=c.enumerable||!1;c.configurable=!0;"value"in c&&(c.writable=!0);Object.defineProperty(a,c.key,c)}}return function(a,c,d){c&&b(a.prototype,c);d&&b(a,d);return a}}();h=function(){function b(){if(!(this instanceof
  b))throw new TypeError("Cannot call a class as a function");this.data=[];this.getData()}f(b,[{key:"getData",value:function(){var a=this;fetch("./assets/data/quotes.json").then(function(a){return a.json()}).then(function(b){for(var c in b.quotes.quote)a.data.push(b.quotes.quote[c]);a.triggerOutput()})}},{key:"triggerOutput",value:function(){var a=this;setInterval(function(){var b=a.data[Math.floor(Math.random()*a.data.length)],d=document.createElement("p"),e=document.querySelector(".output__username").textContent,
  f=Math.floor(Math.random()*window.innerWidth),h=Math.floor(Math.random()*window.innerHeight);b=b.replace("username",e);d.classList.add("quote");d.style.left=h+"px";d.style.top=f+"px";d.textContent='"'+b+'"';document.querySelector("body").append(d);setTimeout(function(){d.classList.add("quote--show");setTimeout(function(){d.classList.remove("quote--show");setTimeout(function(){d.remove()},5E3)},3E3)},100)},3E3)}}]);return b}();e["default"]=h},function(h,e,k){Object.defineProperty(e,"__esModule",{value:!0});
  var f=function(){function b(a,b){for(var d=0;d<b.length;d++){var c=b[d];c.enumerable=c.enumerable||!1;c.configurable=!0;"value"in c&&(c.writable=!0);Object.defineProperty(a,c.key,c)}}return function(a,c,d){c&&b(a.prototype,c);d&&b(a,d);return a}}();h=function(){function b(){if(!(this instanceof b))throw new TypeError("Cannot call a class as a function");this.title=document.querySelector(".title");this.colorize()}f(b,[{key:"colorize",value:function(){var a=this,b=["red","orange","yellow"];setInterval(function(c){a.title.style.color=
  b[Math.floor(Math.random()*b.length)]},2E3)}}]);return b}();e["default"]=h}]);