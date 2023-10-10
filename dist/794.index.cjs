"use strict";exports.id=794,exports.ids=[794],exports.modules={5794:(e,t,n)=>{var a=Object.defineProperty,r=(e,t)=>a(e,"name",{value:t,configurable:!0});n(7561),n(9411);const o=n(6824);n(8849),n(2286),n(5628),n(4492),n(2254),n(7261),n(3020),n(7503);let i=0;const s={START_BOUNDARY:i++,HEADER_FIELD_START:i++,HEADER_FIELD:i++,HEADER_VALUE_START:i++,HEADER_VALUE:i++,HEADER_VALUE_ALMOST_DONE:i++,HEADERS_ALMOST_DONE:i++,PART_DATA_START:i++,PART_DATA:i++,END:i++};let d=1;const E=d,A=d*=2,l=r((e=>32|e),"lower"),h=r((()=>{}),"noop"),D=class{constructor(e){this.index=0,this.flags=0,this.onHeaderEnd=h,this.onHeaderField=h,this.onHeadersEnd=h,this.onHeaderValue=h,this.onPartBegin=h,this.onPartData=h,this.onPartEnd=h,this.boundaryChars={},e="\r\n--"+e;const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n),this.boundaryChars[t[n]]=!0;this.boundary=t,this.lookbehind=new Uint8Array(this.boundary.length+8),this.state=s.START_BOUNDARY}write(e){let t=0;const n=e.length;let a=this.index,{lookbehind:o,boundary:i,boundaryChars:d,index:h,state:D,flags:c}=this;const T=this.boundary.length,f=T-1,_=e.length;let u,R;const b=r((e=>{this[e+"Mark"]=t}),"mark"),H=r((e=>{delete this[e+"Mark"]}),"clear"),p=r(((e,t,n,a)=>{(void 0===t||t!==n)&&this[e](a&&a.subarray(t,n))}),"callback"),P=r(((n,a)=>{const r=n+"Mark";r in this&&(a?(p(n,this[r],t,e),delete this[r]):(p(n,this[r],e.length,e),this[r]=0))}),"dataCallback");for(t=0;t<n;t++)switch(u=e[t],D){case s.START_BOUNDARY:if(h===i.length-2){if(45===u)c|=A;else if(13!==u)return;h++;break}if(h-1==i.length-2){if(c&A&&45===u)D=s.END,c=0;else{if(c&A||10!==u)return;h=0,p("onPartBegin"),D=s.HEADER_FIELD_START}break}u!==i[h+2]&&(h=-2),u===i[h+2]&&h++;break;case s.HEADER_FIELD_START:D=s.HEADER_FIELD,b("onHeaderField"),h=0;case s.HEADER_FIELD:if(13===u){H("onHeaderField"),D=s.HEADERS_ALMOST_DONE;break}if(h++,45===u)break;if(58===u){if(1===h)return;P("onHeaderField",!0),D=s.HEADER_VALUE_START;break}if(R=l(u),R<97||R>122)return;break;case s.HEADER_VALUE_START:if(32===u)break;b("onHeaderValue"),D=s.HEADER_VALUE;case s.HEADER_VALUE:13===u&&(P("onHeaderValue",!0),p("onHeaderEnd"),D=s.HEADER_VALUE_ALMOST_DONE);break;case s.HEADER_VALUE_ALMOST_DONE:if(10!==u)return;D=s.HEADER_FIELD_START;break;case s.HEADERS_ALMOST_DONE:if(10!==u)return;p("onHeadersEnd"),D=s.PART_DATA_START;break;case s.PART_DATA_START:D=s.PART_DATA,b("onPartData");case s.PART_DATA:if(a=h,0===h){for(t+=f;t<_&&!(e[t]in d);)t+=T;t-=f,u=e[t]}if(h<i.length)i[h]===u?(0===h&&P("onPartData",!0),h++):h=0;else if(h===i.length)h++,13===u?c|=E:45===u?c|=A:h=0;else if(h-1===i.length)if(c&E){if(h=0,10===u){c&=~E,p("onPartEnd"),p("onPartBegin"),D=s.HEADER_FIELD_START;break}}else c&A&&45===u?(p("onPartEnd"),D=s.END,c=0):h=0;if(h>0)o[h-1]=u;else if(a>0){const e=new Uint8Array(o.buffer,o.byteOffset,o.byteLength);p("onPartData",0,a,e),a=0,b("onPartData"),t--}break;case s.END:break;default:throw new Error(`Unexpected state entered: ${D}`)}P("onHeaderField"),P("onHeaderValue"),P("onPartData"),this.index=h,this.state=D,this.flags=c}end(){if(this.state===s.HEADER_FIELD_START&&0===this.index||this.state===s.PART_DATA&&this.index===this.boundary.length)this.onPartEnd();else if(this.state!==s.END)throw new Error("MultipartParser.end(): stream ended unexpectedly")}};r(D,"MultipartParser");let c=D;function T(e){const t=e.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);if(!t)return;const n=t[2]||t[3]||"";let a=n.slice(n.lastIndexOf("\\")+1);return a=a.replace(/%22/g,'"'),a=a.replace(/&#(\d{4});/g,((e,t)=>String.fromCharCode(t))),a}async function f(e,t){if(!/multipart/i.test(t))throw new TypeError("Failed to fetch");const n=t.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!n)throw new TypeError("no or bad content-type header, no multipart boundary");const a=new c(n[1]||n[2]);let i,s,d,E,A,l;const h=[],D=new o.FormData,f=r((e=>{d+=b.decode(e,{stream:!0})}),"onPartData"),_=r((e=>{h.push(e)}),"appendToFile"),u=r((()=>{const e=new o.File(h,l,{type:A});D.append(E,e)}),"appendFileToFormData"),R=r((()=>{D.append(E,d)}),"appendEntryToFormData"),b=new TextDecoder("utf-8");b.decode(),a.onPartBegin=function(){a.onPartData=f,a.onPartEnd=R,i="",s="",d="",E="",A="",l=null,h.length=0},a.onHeaderField=function(e){i+=b.decode(e,{stream:!0})},a.onHeaderValue=function(e){s+=b.decode(e,{stream:!0})},a.onHeaderEnd=function(){if(s+=b.decode(),i=i.toLowerCase(),"content-disposition"===i){const e=s.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);e&&(E=e[2]||e[3]||""),l=T(s),l&&(a.onPartData=_,a.onPartEnd=u)}else"content-type"===i&&(A=s);s="",i=""};for await(const t of e)a.write(t);return a.end(),D}r(T,"_fileName"),r(f,"toFormData"),t.toFormData=f}};