import './polyfills.server.mjs';
import{a}from"./chunk-ED5CGBUQ.mjs";import{cb as s}from"./chunk-W6RV52TI.mjs";import{f as r}from"./chunk-HQUS2UUF.mjs";function p(e,n){return r(this,null,function*(){let o=new URL(e.url);console.log("render SSR",o.href);let c=new URL("/",o),t=yield n.ASSETS.fetch(new Request(c)),l=yield t.text(),i=yield s(a,{document:l,url:o.pathname});return new Response(i,t)})}var w={fetch:(e,n)=>globalThis.__zone_symbol__Promise.resolve(p(e,n))};export{w as default};