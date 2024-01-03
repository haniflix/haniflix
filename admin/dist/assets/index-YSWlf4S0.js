import{j as o,T as B,a as V,a1 as U,a2 as Q,m as X,n as ee,s as re,r as S,B as P,N as A,a3 as te,q as ne,t as z,v as W,a4 as oe,l as ae,a5 as ie,a6 as se,a7 as le,a8 as ce,D as ue,Y as de,w as G,Z as N,W as fe}from"./index-9lkQUlNG.js";import{d as me}from"./AddTwoTone-VZV2cqWv.js";import{G as $}from"./Grid-dpMjCYlK.js";import{P as he}from"./index-pfcZp7m4.js";import{C as pe,F as be}from"./index-6z5A6YgQ.js";import{L as ge}from"./index-FvYSc9wp.js";import{T as xe,a as ye,b as je,c as K,d as _,e as _e,f as Ce,g as De}from"./EditTwoTone-sUhbVifa.js";import{d as Y}from"./DeleteTwoTone-my5jxeJu.js";import{C as J}from"./Card-0NMuTcO3.js";import{C as H}from"./Checkbox-EXi8vXJ_.js";import{C as Fe}from"./Container-qmmmC6zp.js";import"./KeyboardArrowRight-6tdRy6JP.js";import"./SwitchBase-buvszcXd.js";function ve(){const h={name:"Catherine Pike",avatar:"/static/images/avatars/1.jpg"};return o.jsxs($,{container:!0,justifyContent:"space-between",alignItems:"center",children:[o.jsxs($,{item:!0,children:[o.jsx(B,{variant:"h3",component:"h3",gutterBottom:!0,children:"Transactions"}),o.jsxs(B,{variant:"subtitle2",children:[h.name,", these are your recent transactions"]})]}),o.jsx($,{item:!0,children:o.jsx(V,{sx:{mt:{xs:2,md:0}},variant:"contained",startIcon:o.jsx(me,{fontSize:"small"}),children:"Create transaction"})})]})}var Z={exports:{}};/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */(function(h){(function(n,d){h.exports?h.exports=d():n.numeral=d()})(U,function(){var n,d,D="2.0.6",j={},M={},v={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},m={currentLocale:v.currentLocale,zeroFormat:v.zeroFormat,nullFormat:v.nullFormat,defaultFormat:v.defaultFormat,scalePercentBy100:v.scalePercentBy100};function k(e,r){this._input=e,this._value=r}return n=function(e){var r,s,a,t;if(n.isNumeral(e))r=e.value();else if(e===0||typeof e>"u")r=0;else if(e===null||d.isNaN(e))r=null;else if(typeof e=="string")if(m.zeroFormat&&e===m.zeroFormat)r=0;else if(m.nullFormat&&e===m.nullFormat||!e.replace(/[^0-9]+/g,"").length)r=null;else{for(s in j)if(t=typeof j[s].regexps.unformat=="function"?j[s].regexps.unformat():j[s].regexps.unformat,t&&e.match(t)){a=j[s].unformat;break}a=a||n._.stringToNumber,r=a(e)}else r=Number(e)||null;return new k(e,r)},n.version=D,n.isNumeral=function(e){return e instanceof k},n._=d={numberToFormat:function(e,r,s){var a=M[n.options.currentLocale],t=!1,i=!1,l=0,c="",p=1e12,f=1e9,y=1e6,C=1e3,u="",b=!1,g,T,x,F,I,R,w;if(e=e||0,T=Math.abs(e),n._.includes(r,"(")?(t=!0,r=r.replace(/[\(|\)]/g,"")):(n._.includes(r,"+")||n._.includes(r,"-"))&&(I=n._.includes(r,"+")?r.indexOf("+"):e<0?r.indexOf("-"):-1,r=r.replace(/[\+|\-]/g,"")),n._.includes(r,"a")&&(g=r.match(/a(k|m|b|t)?/),g=g?g[1]:!1,n._.includes(r," a")&&(c=" "),r=r.replace(new RegExp(c+"a[kmbt]?"),""),T>=p&&!g||g==="t"?(c+=a.abbreviations.trillion,e=e/p):T<p&&T>=f&&!g||g==="b"?(c+=a.abbreviations.billion,e=e/f):T<f&&T>=y&&!g||g==="m"?(c+=a.abbreviations.million,e=e/y):(T<y&&T>=C&&!g||g==="k")&&(c+=a.abbreviations.thousand,e=e/C)),n._.includes(r,"[.]")&&(i=!0,r=r.replace("[.]",".")),x=e.toString().split(".")[0],F=r.split(".")[1],R=r.indexOf(","),l=(r.split(".")[0].split(",")[0].match(/0/g)||[]).length,F?(n._.includes(F,"[")?(F=F.replace("]",""),F=F.split("["),u=n._.toFixed(e,F[0].length+F[1].length,s,F[1].length)):u=n._.toFixed(e,F.length,s),x=u.split(".")[0],n._.includes(u,".")?u=a.delimiters.decimal+u.split(".")[1]:u="",i&&Number(u.slice(1))===0&&(u="")):x=n._.toFixed(e,0,s),c&&!g&&Number(x)>=1e3&&c!==a.abbreviations.trillion)switch(x=String(Number(x)/1e3),c){case a.abbreviations.thousand:c=a.abbreviations.million;break;case a.abbreviations.million:c=a.abbreviations.billion;break;case a.abbreviations.billion:c=a.abbreviations.trillion;break}if(n._.includes(x,"-")&&(x=x.slice(1),b=!0),x.length<l)for(var L=l-x.length;L>0;L--)x="0"+x;return R>-1&&(x=x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+a.delimiters.thousands)),r.indexOf(".")===0&&(x=""),w=x+u+(c||""),t?w=(t&&b?"(":"")+w+(t&&b?")":""):I>=0?w=I===0?(b?"-":"+")+w:w+(b?"-":"+"):b&&(w="-"+w),w},stringToNumber:function(e){var r=M[m.currentLocale],s=e,a={thousand:3,million:6,billion:9,trillion:12},t,i,l;if(m.zeroFormat&&e===m.zeroFormat)i=0;else if(m.nullFormat&&e===m.nullFormat||!e.replace(/[^0-9]+/g,"").length)i=null;else{i=1,r.delimiters.decimal!=="."&&(e=e.replace(/\./g,"").replace(r.delimiters.decimal,"."));for(t in a)if(l=new RegExp("[^a-zA-Z]"+r.abbreviations[t]+"(?:\\)|(\\"+r.currency.symbol+")?(?:\\))?)?$"),s.match(l)){i*=Math.pow(10,a[t]);break}i*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),i*=Number(e)}return i},isNaN:function(e){return typeof e=="number"&&isNaN(e)},includes:function(e,r){return e.indexOf(r)!==-1},insert:function(e,r,s){return e.slice(0,s)+r+e.slice(s)},reduce:function(e,r){if(this===null)throw new TypeError("Array.prototype.reduce called on null or undefined");if(typeof r!="function")throw new TypeError(r+" is not a function");var s=Object(e),a=s.length>>>0,t=0,i;if(arguments.length===3)i=arguments[2];else{for(;t<a&&!(t in s);)t++;if(t>=a)throw new TypeError("Reduce of empty array with no initial value");i=s[t++]}for(;t<a;t++)t in s&&(i=r(i,s[t],t,s));return i},multiplier:function(e){var r=e.toString().split(".");return r.length<2?1:Math.pow(10,r[1].length)},correctionFactor:function(){var e=Array.prototype.slice.call(arguments);return e.reduce(function(r,s){var a=d.multiplier(s);return r>a?r:a},1)},toFixed:function(e,r,s,a){var t=e.toString().split("."),i=r-(a||0),l,c,p,f;return t.length===2?l=Math.min(Math.max(t[1].length,i),r):l=i,p=Math.pow(10,l),f=(s(e+"e+"+l)/p).toFixed(l),a>r-l&&(c=new RegExp("\\.?0{1,"+(a-(r-l))+"}$"),f=f.replace(c,"")),f}},n.options=m,n.formats=j,n.locales=M,n.locale=function(e){return e&&(m.currentLocale=e.toLowerCase()),m.currentLocale},n.localeData=function(e){if(!e)return M[m.currentLocale];if(e=e.toLowerCase(),!M[e])throw new Error("Unknown locale : "+e);return M[e]},n.reset=function(){for(var e in v)m[e]=v[e]},n.zeroFormat=function(e){m.zeroFormat=typeof e=="string"?e:null},n.nullFormat=function(e){m.nullFormat=typeof e=="string"?e:null},n.defaultFormat=function(e){m.defaultFormat=typeof e=="string"?e:"0.0"},n.register=function(e,r,s){if(r=r.toLowerCase(),this[e+"s"][r])throw new TypeError(r+" "+e+" already registered.");return this[e+"s"][r]=s,s},n.validate=function(e,r){var s,a,t,i,l,c,p,f;if(typeof e!="string"&&(e+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",e)),e=e.trim(),e.match(/^\d+$/))return!0;if(e==="")return!1;try{p=n.localeData(r)}catch{p=n.localeData(n.locale())}return t=p.currency.symbol,l=p.abbreviations,s=p.delimiters.decimal,p.delimiters.thousands==="."?a="\\.":a=p.delimiters.thousands,f=e.match(/^[^\d]+/),f!==null&&(e=e.substr(1),f[0]!==t)||(f=e.match(/[^\d]+$/),f!==null&&(e=e.slice(0,-1),f[0]!==l.thousand&&f[0]!==l.million&&f[0]!==l.billion&&f[0]!==l.trillion))?!1:(c=new RegExp(a+"{2}"),e.match(/[^\d.,]/g)?!1:(i=e.split(s),i.length>2?!1:i.length<2?!!i[0].match(/^\d+.*\d$/)&&!i[0].match(c):i[0].length===1?!!i[0].match(/^\d+$/)&&!i[0].match(c)&&!!i[1].match(/^\d+$/):!!i[0].match(/^\d+.*\d$/)&&!i[0].match(c)&&!!i[1].match(/^\d+$/)))},n.fn=k.prototype={clone:function(){return n(this)},format:function(e,r){var s=this._value,a=e||m.defaultFormat,t,i,l;if(r=r||Math.round,s===0&&m.zeroFormat!==null)i=m.zeroFormat;else if(s===null&&m.nullFormat!==null)i=m.nullFormat;else{for(t in j)if(a.match(j[t].regexps.format)){l=j[t].format;break}l=l||n._.numberToFormat,i=l(s,a,r)}return i},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var r=d.correctionFactor.call(null,this._value,e);function s(a,t,i,l){return a+Math.round(r*t)}return this._value=d.reduce([this._value,e],s,0)/r,this},subtract:function(e){var r=d.correctionFactor.call(null,this._value,e);function s(a,t,i,l){return a-Math.round(r*t)}return this._value=d.reduce([e],s,Math.round(this._value*r))/r,this},multiply:function(e){function r(s,a,t,i){var l=d.correctionFactor(s,a);return Math.round(s*l)*Math.round(a*l)/Math.round(l*l)}return this._value=d.reduce([this._value,e],r,1),this},divide:function(e){function r(s,a,t,i){var l=d.correctionFactor(s,a);return Math.round(s*l)/Math.round(a*l)}return this._value=d.reduce([this._value,e],r),this},difference:function(e){return Math.abs(n(this._value).subtract(e).value())}},n.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var r=e%10;return~~(e%100/10)===1?"th":r===1?"st":r===2?"nd":r===3?"rd":"th"},currency:{symbol:"$"}}),function(){n.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(e,r,s){var a=n._.includes(r," BPS")?" ":"",t;return e=e*1e4,r=r.replace(/\s?BPS/,""),t=n._.numberToFormat(e,r,s),n._.includes(t,")")?(t=t.split(""),t.splice(-1,0,a+"BPS"),t=t.join("")):t=t+a+"BPS",t},unformat:function(e){return+(n._.stringToNumber(e)*1e-4).toFixed(15)}})}(),function(){var e={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},r={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},s=e.suffixes.concat(r.suffixes.filter(function(t){return e.suffixes.indexOf(t)<0})),a=s.join("|");a="("+a.replace("B","B(?!PS)")+")",n.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(a)},format:function(t,i,l){var c,p=n._.includes(i,"ib")?r:e,f=n._.includes(i," b")||n._.includes(i," ib")?" ":"",y,C,u;for(i=i.replace(/\s?i?b/,""),y=0;y<=p.suffixes.length;y++)if(C=Math.pow(p.base,y),u=Math.pow(p.base,y+1),t===null||t===0||t>=C&&t<u){f+=p.suffixes[y],C>0&&(t=t/C);break}return c=n._.numberToFormat(t,i,l),c+f},unformat:function(t){var i=n._.stringToNumber(t),l,c;if(i){for(l=e.suffixes.length-1;l>=0;l--){if(n._.includes(t,e.suffixes[l])){c=Math.pow(e.base,l);break}if(n._.includes(t,r.suffixes[l])){c=Math.pow(r.base,l);break}}i*=c||1}return i}})}(),function(){n.register("format","currency",{regexps:{format:/(\$)/},format:function(e,r,s){var a=n.locales[n.options.currentLocale],t={before:r.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:r.match(/([\+|\-|\)|\s|\$]*)$/)[0]},i,l,c;for(r=r.replace(/\s?\$\s?/,""),i=n._.numberToFormat(e,r,s),e>=0?(t.before=t.before.replace(/[\-\(]/,""),t.after=t.after.replace(/[\-\)]/,"")):e<0&&!n._.includes(t.before,"-")&&!n._.includes(t.before,"(")&&(t.before="-"+t.before),c=0;c<t.before.length;c++)switch(l=t.before[c],l){case"$":i=n._.insert(i,a.currency.symbol,c);break;case" ":i=n._.insert(i," ",c+a.currency.symbol.length-1);break}for(c=t.after.length-1;c>=0;c--)switch(l=t.after[c],l){case"$":i=c===t.after.length-1?i+a.currency.symbol:n._.insert(i,a.currency.symbol,-(t.after.length-(1+c)));break;case" ":i=c===t.after.length-1?i+" ":n._.insert(i," ",-(t.after.length-(1+c)+a.currency.symbol.length-1));break}return i}})}(),function(){n.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(e,r,s){var a,t=typeof e=="number"&&!n._.isNaN(e)?e.toExponential():"0e+0",i=t.split("e");return r=r.replace(/e[\+|\-]{1}0/,""),a=n._.numberToFormat(Number(i[0]),r,s),a+"e"+i[1]},unformat:function(e){var r=n._.includes(e,"e+")?e.split("e+"):e.split("e-"),s=Number(r[0]),a=Number(r[1]);a=n._.includes(e,"e-")?a*=-1:a;function t(i,l,c,p){var f=n._.correctionFactor(i,l),y=i*f*(l*f)/(f*f);return y}return n._.reduce([s,Math.pow(10,a)],t,1)}})}(),function(){n.register("format","ordinal",{regexps:{format:/(o)/},format:function(e,r,s){var a=n.locales[n.options.currentLocale],t,i=n._.includes(r," o")?" ":"";return r=r.replace(/\s?o/,""),i+=a.ordinal(e),t=n._.numberToFormat(e,r,s),t+i}})}(),function(){n.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(e,r,s){var a=n._.includes(r," %")?" ":"",t;return n.options.scalePercentBy100&&(e=e*100),r=r.replace(/\s?\%/,""),t=n._.numberToFormat(e,r,s),n._.includes(t,")")?(t=t.split(""),t.splice(-1,0,a+"%"),t=t.join("")):t=t+a+"%",t},unformat:function(e){var r=n._.stringToNumber(e);return n.options.scalePercentBy100?r*.01:r}})}(),function(){n.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,r,s){var a=Math.floor(e/60/60),t=Math.floor((e-a*60*60)/60),i=Math.round(e-a*60*60-t*60);return a+":"+(t<10?"0"+t:t)+":"+(i<10?"0"+i:i)},unformat:function(e){var r=e.split(":"),s=0;return r.length===3?(s=s+Number(r[0])*60*60,s=s+Number(r[1])*60,s=s+Number(r[2])):r.length===2&&(s=s+Number(r[0])*60,s=s+Number(r[1])),Number(s)}})}(),n})})(Z);var Te=Z.exports;const Be=Q(Te);var E={},we=ee;Object.defineProperty(E,"__esModule",{value:!0});var q=E.default=void 0,Me=we(X()),Ne=o,ke=(0,Me.default)((0,Ne.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVertTwoTone");q=E.default=ke;const Se=re(V)(({theme:h})=>`
     background: ${h.colors.error.main};
     color: ${h.palette.error.contrastText};

     &:hover {
        background: ${h.colors.error.dark};
     }
    `);function Pe(){const[h,n]=S.useState(!1),d=S.useRef(null),D=()=>{n(!0)},j=()=>{n(!1)};return o.jsxs(o.Fragment,{children:[o.jsxs(P,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[o.jsxs(P,{display:"flex",alignItems:"center",children:[o.jsx(B,{variant:"h5",color:"text.secondary",children:"Bulk actions:"}),o.jsx(Se,{sx:{ml:1},startIcon:o.jsx(Y,{}),variant:"contained",children:"Delete"})]}),o.jsx(A,{color:"primary",onClick:D,ref:d,sx:{ml:2,p:1},children:o.jsx(q,{})})]}),o.jsx(te,{keepMounted:!0,anchorEl:d.current,open:h,onClose:j,anchorOrigin:{vertical:"center",horizontal:"center"},transformOrigin:{vertical:"center",horizontal:"center"},children:o.jsxs(ne,{sx:{p:1},component:"nav",children:[o.jsx(z,{button:!0,children:o.jsx(W,{primary:"Bulk delete selected"})}),o.jsx(z,{button:!0,children:o.jsx(W,{primary:"Bulk edit selected"})})]})})]})}const $e=h=>{const n={failed:{text:"Failed",color:"error"},completed:{text:"Completed",color:"success"},pending:{text:"Pending",color:"warning"}},{text:d,color:D}=n[h];return o.jsx(ge,{color:D,children:d})},Ie=(h,n)=>h.filter(d=>{let D=!0;return n.status&&d.status!==n.status&&(D=!1),D}),Ae=(h,n,d)=>h.slice(n*d,n*d+d),O=({cryptoOrders:h})=>{const[n,d]=S.useState([]),D=n.length>0,[j,M]=S.useState(0),[v,m]=S.useState(5),[k,e]=S.useState({status:null}),r=[{id:"all",name:"All"},{id:"completed",name:"Completed"},{id:"pending",name:"Pending"},{id:"failed",name:"Failed"}],s=u=>{let b=null;u.target.value!=="all"&&(b=u.target.value),e(g=>({...g,status:b}))},a=u=>{d(u.target.checked?h.map(b=>b.id):[])},t=(u,b)=>{n.includes(b)?d(g=>g.filter(T=>T!==b)):d(g=>[...g,b])},i=(u,b)=>{M(b)},l=u=>{m(parseInt(u.target.value))},c=Ie(h,k),p=Ae(c,j,v),f=n.length>0&&n.length<h.length,y=n.length===h.length,C=ae();return o.jsxs(J,{children:[D&&o.jsx(P,{flex:1,p:2,children:o.jsx(Pe,{})}),!D&&o.jsx(pe,{action:o.jsx(P,{width:150,children:o.jsxs(ie,{fullWidth:!0,variant:"outlined",children:[o.jsx(se,{children:"Status"}),o.jsx(le,{value:k.status||"all",onChange:s,label:"Status",autoWidth:!0,children:r.map(u=>o.jsx(ce,{value:u.id,children:u.name},u.id))})]})}),title:"Recent Orders"}),o.jsx(ue,{}),o.jsx(xe,{children:o.jsxs(ye,{children:[o.jsx(je,{children:o.jsxs(K,{children:[o.jsx(_,{padding:"checkbox",children:o.jsx(H,{color:"primary",checked:y,indeterminate:f,onChange:a})}),o.jsx(_,{children:"Order Details"}),o.jsx(_,{children:"Order ID"}),o.jsx(_,{children:"Source"}),o.jsx(_,{align:"right",children:"Amount"}),o.jsx(_,{align:"right",children:"Status"}),o.jsx(_,{align:"right",children:"Actions"})]})}),o.jsx(_e,{children:p.map(u=>{const b=n.includes(u.id);return o.jsxs(K,{hover:!0,selected:b,children:[o.jsx(_,{padding:"checkbox",children:o.jsx(H,{color:"primary",checked:b,onChange:g=>t(g,u.id),value:b})}),o.jsxs(_,{children:[o.jsx(B,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:u.orderDetails}),o.jsx(B,{variant:"body2",color:"text.secondary",noWrap:!0,children:de(u.orderDate,"MMMM dd yyyy")})]}),o.jsx(_,{children:o.jsx(B,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:u.orderID})}),o.jsxs(_,{children:[o.jsx(B,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:u.sourceName}),o.jsx(B,{variant:"body2",color:"text.secondary",noWrap:!0,children:u.sourceDesc})]}),o.jsxs(_,{align:"right",children:[o.jsxs(B,{variant:"body1",fontWeight:"bold",color:"text.primary",gutterBottom:!0,noWrap:!0,children:[u.amountCrypto,u.cryptoCurrency]}),o.jsx(B,{variant:"body2",color:"text.secondary",noWrap:!0,children:Be(u.amount).format(`${u.currency}0,0.00`)})]}),o.jsx(_,{align:"right",children:$e(u.status)}),o.jsxs(_,{align:"right",children:[o.jsx(G,{title:"Edit Order",arrow:!0,children:o.jsx(A,{sx:{"&:hover":{background:C.colors.primary.lighter},color:C.palette.primary.main},color:"inherit",size:"small",children:o.jsx(Ce,{fontSize:"small"})})}),o.jsx(G,{title:"Delete Order",arrow:!0,children:o.jsx(A,{sx:{"&:hover":{background:C.colors.error.lighter},color:C.palette.error.main},color:"inherit",size:"small",children:o.jsx(Y,{fontSize:"small"})})})]})]},u.id)})})]})}),o.jsx(P,{p:2,children:o.jsx(De,{component:"div",count:c.length,onPageChange:i,onRowsPerPageChange:l,page:j,rowsPerPage:v,rowsPerPageOptions:[5,10,25,30]})})]})};O.propTypes={cryptoOrders:oe.array.isRequired};O.defaultProps={cryptoOrders:[]};function Ee(){const h=[{id:"1",orderDetails:"Fiat Deposit",orderDate:new Date().getTime(),status:"completed",orderID:"VUVX709ET7BY",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:34.4565,amount:56787,cryptoCurrency:"ETH",currency:"$"},{id:"2",orderDetails:"Fiat Deposit",orderDate:N(new Date,1).getTime(),status:"completed",orderID:"23M3UOG65G8K",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"3",orderDetails:"Fiat Deposit",orderDate:N(new Date,5).getTime(),status:"failed",orderID:"F6JHK65MS818",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"4",orderDetails:"Fiat Deposit",orderDate:N(new Date,55).getTime(),status:"completed",orderID:"QJFAI7N84LGM",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"5",orderDetails:"Fiat Deposit",orderDate:N(new Date,56).getTime(),status:"pending",orderID:"BO5KFSYGC0YW",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"6",orderDetails:"Fiat Deposit",orderDate:N(new Date,33).getTime(),status:"completed",orderID:"6RS606CBMKVQ",sourceName:"Bank Account",sourceDesc:"*** 1111",amountCrypto:6.58454334,amount:8734587,cryptoCurrency:"BTC",currency:"$"},{id:"7",orderDetails:"Fiat Deposit",orderDate:new Date().getTime(),status:"pending",orderID:"479KUYHOBMJS",sourceName:"Bank Account",sourceDesc:"*** 1212",amountCrypto:2.346546,amount:234234,cryptoCurrency:"BTC",currency:"$"},{id:"8",orderDetails:"Paypal Withdraw",orderDate:N(new Date,22).getTime(),status:"completed",orderID:"W67CFZNT71KR",sourceName:"Paypal Account",sourceDesc:"*** 1111",amountCrypto:3.345456,amount:34544,cryptoCurrency:"BTC",currency:"$"},{id:"9",orderDetails:"Fiat Deposit",orderDate:N(new Date,11).getTime(),status:"completed",orderID:"63GJ5DJFKS4H",sourceName:"Bank Account",sourceDesc:"*** 2222",amountCrypto:1.4389567945,amount:123843,cryptoCurrency:"BTC",currency:"$"},{id:"10",orderDetails:"Wallet Transfer",orderDate:N(new Date,123).getTime(),status:"failed",orderID:"17KRZHY8T05M",sourceName:"Wallet Transfer",sourceDesc:"John's Cardano Wallet",amountCrypto:765.5695,amount:7567,cryptoCurrency:"ADA",currency:"$"}];return o.jsx(J,{children:o.jsx(O,{cryptoOrders:h})})}function Ue(){return o.jsxs(o.Fragment,{children:[o.jsx(fe,{children:o.jsx("title",{children:"Transactions - Applications"})}),o.jsx(he,{children:o.jsx(ve,{})}),o.jsx(Fe,{maxWidth:"lg",children:o.jsx($,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:o.jsx($,{item:!0,xs:12,children:o.jsx(Ee,{})})})}),o.jsx(be,{})]})}export{Ue as default};
