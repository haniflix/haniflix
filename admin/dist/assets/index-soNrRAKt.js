import{i as tt,k as ut,r as g,ak as A,j as t,al as dt,am as yt,y as Ze,x as kt,ae as Xe,af as De,_ as s,n as Ae,an as J,a8 as Te,p as pt,s as Q,m as mt,o as et,a7 as Ct,ab as D,X as St,ao as wt,h as ot,ap as ft,g as Lt,N as ht,O as bt,W as Rt,S as pe,B as Je,ah as Pt}from"./index-RN40GIN3.js";import{P as Vt}from"./index-1xcLvYOp.js";import{P as $t}from"./index-cCWBJ18I.js";import{C as ve,F as Tt}from"./index-_sfl2CT1.js";import{C as Mt}from"./Container-JzitWhMj.js";import{G as me}from"./Grid-Eqeh4S9L.js";import{C as xe}from"./Card-_T_mgdHf.js";import{C as ge}from"./CardContent-StIXZN0g.js";import{T as b}from"./TextField-nZuO35Fk.js";import{M as Ke}from"./MenuItem-B-jDr2rN.js";import{S as Me}from"./Switch-xpzl13WD.js";import{C as je}from"./Checkbox-FaetVbke.js";import{p as lt}from"./pink-ZZND6y90.js";import{F as Ft}from"./FormControl-hzYzaU_O.js";import{F as It}from"./InputLabel-OdKkbQhf.js";import{a as Nt,R as Fe}from"./Radio-njAvA_46.js";import{u as _t,f as zt}from"./useFormControl-ymE63IOh.js";import{F as Ie}from"./FormControlLabel-8nvg-ha1.js";import{s as Ne}from"./shouldSpreadAdditionalProps-GoisWXYb.js";import"./AddTwoTone-WXoqmA6f.js";import"./Select-LOUEVqMY.js";import"./react-is.production.min-pGgGHoNV.js";import"./OutlinedInput-5k8n8BVu.js";import"./FormHelperText-7DzgE79G.js";import"./listItemIconClasses-fFuYOhmb.js";import"./listItemTextClasses-Grt4FLsb.js";import"./SwitchBase-5ivMydxc.js";const Ht={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},Dt=Ht;function ke(e){return ut("MuiSlider",e)}const Et=tt("MuiSlider",["root","active","focusVisible","disabled","dragging","marked","vertical","trackInverted","trackFalse","rail","track","mark","markActive","markLabel","markLabelActive","thumb","valueLabel","valueLabelOpen","valueLabelCircle","valueLabelLabel"]),Ee=Et,Ot=e=>{const{open:a}=e;return{offset:A(a&&Ee.valueLabelOpen),circle:Ee.valueLabelCircle,label:Ee.valueLabelLabel}};function vt(e){const{children:a,className:r,value:l,theme:u}=e,f=Ot(e);return g.cloneElement(a,{className:A(a.props.className)},t.jsxs(g.Fragment,{children:[a.props.children,t.jsx("span",{className:A(f.offset,r),theme:u,"aria-hidden":!0,children:t.jsx("span",{className:f.circle,children:t.jsx("span",{className:f.label,children:l})})})]}))}const At=2;function xt(e,a){return e-a}function ye(e,a,r){return e==null?a:Math.min(Math.max(a,e),r)}function st(e,a){var r;const{index:l}=(r=e.reduce((u,f,i)=>{const h=Math.abs(a-f);return u===null||h<u.distance||h===u.distance?{distance:h,index:i}:u},null))!=null?r:{};return l}function _e(e,a){if(a.current!==void 0&&e.changedTouches){const r=e;for(let l=0;l<r.changedTouches.length;l+=1){const u=r.changedTouches[l];if(u.identifier===a.current)return{x:u.clientX,y:u.clientY}}return!1}return{x:e.clientX,y:e.clientY}}function Oe(e,a,r){return(e-a)*100/(r-a)}function Ut(e,a,r){return(r-a)*e+a}function Gt(e){if(Math.abs(e)<1){const r=e.toExponential().split("e-"),l=r[0].split(".")[1];return(l?l.length:0)+parseInt(r[1],10)}const a=e.toString().split(".")[1];return a?a.length:0}function qt(e,a,r){const l=Math.round((e-r)/a)*a+r;return Number(l.toFixed(Gt(a)))}function nt({values:e,newValue:a,index:r}){const l=e.slice();return l[r]=a,l.sort(xt)}function ze({sliderRef:e,activeIndex:a,setActive:r}){var l,u;const f=De(e.current);if(!((l=e.current)!=null&&l.contains(f.activeElement))||Number(f==null||(u=f.activeElement)==null?void 0:u.getAttribute("data-index"))!==a){var i;(i=e.current)==null||i.querySelector(`[type="range"][data-index="${a}"]`).focus()}r&&r(a)}const Wt={horizontal:{offset:e=>({left:`${e}%`}),leap:e=>({width:`${e}%`})},"horizontal-reverse":{offset:e=>({right:`${e}%`}),leap:e=>({width:`${e}%`})},vertical:{offset:e=>({bottom:`${e}%`}),leap:e=>({height:`${e}%`})}},Bt=e=>e;let He;function Qe(){return He===void 0&&(typeof CSS<"u"&&typeof CSS.supports=="function"?He=CSS.supports("touch-action","none"):He=!0),He}function Yt(e){const{"aria-labelledby":a,defaultValue:r,disabled:l=!1,disableSwap:u=!1,isRtl:f=!1,marks:i=!1,max:h=100,min:j=0,name:N,onChange:_,onChangeCommitted:R,orientation:k="horizontal",ref:z,scale:H=Bt,step:$=1,tabIndex:w,value:ae}=e,U=g.useRef(),[Ce,E]=g.useState(-1),[re,Z]=g.useState(-1),[Se,ee]=g.useState(!1),oe=g.useRef(0),[B,G]=dt({controlled:ae,default:r??j,name:"Slider"}),P=_&&((o,n,c)=>{const d=o.nativeEvent||o,C=new d.constructor(d.type,d);Object.defineProperty(C,"target",{writable:!0,value:{value:n,name:N}}),_(C,n,c)}),te=Array.isArray(B);let v=te?B.slice().sort(xt):[B];v=v.map(o=>ye(o,j,h));const T=i===!0&&$!==null?[...Array(Math.floor((h-j)/$)+1)].map((o,n)=>({value:j+$*n})):i||[],O=T.map(o=>o.value),{isFocusVisibleRef:S,onBlur:le,onFocus:Ue,ref:Ge}=yt(),[we,se]=g.useState(-1),L=g.useRef(),ne=Ze(Ge,L),Le=Ze(z,ne),qe=o=>n=>{var c;const d=Number(n.currentTarget.getAttribute("data-index"));Ue(n),S.current===!0&&se(d),Z(d),o==null||(c=o.onFocus)==null||c.call(o,n)},We=o=>n=>{var c;le(n),S.current===!1&&se(-1),Z(-1),o==null||(c=o.onBlur)==null||c.call(o,n)};kt(()=>{if(l&&L.current.contains(document.activeElement)){var o;(o=document.activeElement)==null||o.blur()}},[l]),l&&Ce!==-1&&E(-1),l&&we!==-1&&se(-1);const he=o=>n=>{var c;(c=o.onChange)==null||c.call(o,n);const d=Number(n.currentTarget.getAttribute("data-index")),C=v[d],M=O.indexOf(C);let p=n.target.valueAsNumber;if(T&&$==null&&(p=p<C?O[M-1]:O[M+1]),p=ye(p,j,h),T&&$==null){const m=O.indexOf(v[d]);p=p<v[d]?O[m-1]:O[m+1]}if(te){u&&(p=ye(p,v[d-1]||-1/0,v[d+1]||1/0));const m=p;p=nt({values:v,newValue:p,index:d});let x=d;u||(x=p.indexOf(m)),ze({sliderRef:L,activeIndex:x})}G(p),se(d),P&&P(n,p,d),R&&R(n,p)},V=g.useRef();let ie=k;f&&k==="horizontal"&&(ie+="-reverse");const ce=({finger:o,move:n=!1,values:c})=>{const{current:d}=L,{width:C,height:M,bottom:p,left:m}=d.getBoundingClientRect();let x;ie.indexOf("vertical")===0?x=(p-o.y)/M:x=(o.x-m)/C,ie.indexOf("-reverse")!==-1&&(x=1-x);let y;if(y=Ut(x,j,h),$)y=qt(y,$,j);else{const I=st(O,y);y=O[I]}y=ye(y,j,h);let F=0;if(te){n?F=V.current:F=st(c,y),u&&(y=ye(y,c[F-1]||-1/0,c[F+1]||1/0));const I=y;y=nt({values:c,newValue:y,index:F}),u&&n||(F=y.indexOf(I),V.current=F)}return{newValue:y,activeIndex:F}},Y=Xe(o=>{const n=_e(o,U);if(!n)return;if(oe.current+=1,o.type==="mousemove"&&o.buttons===0){q(o);return}const{newValue:c,activeIndex:d}=ce({finger:n,move:!0,values:v});ze({sliderRef:L,activeIndex:d,setActive:E}),G(c),!Se&&oe.current>At&&ee(!0),P&&P(o,c,d)}),q=Xe(o=>{const n=_e(o,U);if(ee(!1),!n)return;const{newValue:c}=ce({finger:n,move:!0,values:v});E(-1),o.type==="touchend"&&Z(-1),R&&R(o,c),U.current=void 0,X()}),ue=Xe(o=>{if(l)return;Qe()||o.preventDefault();const n=o.changedTouches[0];n!=null&&(U.current=n.identifier);const c=_e(o,U);if(c!==!1){const{newValue:C,activeIndex:M}=ce({finger:c,values:v});ze({sliderRef:L,activeIndex:M,setActive:E}),G(C),P&&P(o,C,M)}oe.current=0;const d=De(L.current);d.addEventListener("touchmove",Y),d.addEventListener("touchend",q)}),X=g.useCallback(()=>{const o=De(L.current);o.removeEventListener("mousemove",Y),o.removeEventListener("mouseup",q),o.removeEventListener("touchmove",Y),o.removeEventListener("touchend",q)},[q,Y]);g.useEffect(()=>{const{current:o}=L;return o.addEventListener("touchstart",ue,{passive:Qe()}),()=>{o.removeEventListener("touchstart",ue,{passive:Qe()}),X()}},[X,ue]),g.useEffect(()=>{l&&X()},[l,X]);const Re=o=>n=>{var c;if((c=o.onMouseDown)==null||c.call(o,n),l||n.defaultPrevented||n.button!==0)return;n.preventDefault();const d=_e(n,U);if(d!==!1){const{newValue:M,activeIndex:p}=ce({finger:d,values:v});ze({sliderRef:L,activeIndex:p,setActive:E}),G(M),P&&P(n,M,p)}oe.current=0;const C=De(L.current);C.addEventListener("mousemove",Y),C.addEventListener("mouseup",q)},de=Oe(te?v[0]:j,j,h),Be=Oe(v[v.length-1],j,h)-de,Pe=(o={})=>{const n={onMouseDown:Re(o||{})},c=s({},o,n);return s({ref:Le},c)},be=o=>n=>{var c;(c=o.onMouseOver)==null||c.call(o,n);const d=Number(n.currentTarget.getAttribute("data-index"));Z(d)},Ve=o=>n=>{var c;(c=o.onMouseLeave)==null||c.call(o,n),Z(-1)};return{active:Ce,axis:ie,axisProps:Wt,dragging:Se,focusVisible:we,getHiddenInputProps:(o={})=>{const n={onChange:he(o||{}),onFocus:qe(o||{}),onBlur:We(o||{})},c=s({},o,n);return s({tabIndex:w,"aria-labelledby":a,"aria-orientation":k,"aria-valuemax":H(h),"aria-valuemin":H(j),name:N,type:"range",min:e.min,max:e.max,step:e.step,disabled:l},c,{style:s({},Dt,{direction:f?"rtl":"ltr",width:"100%",height:"100%"})})},getRootProps:Pe,getThumbProps:(o={})=>{const n={onMouseOver:be(o||{}),onMouseLeave:Ve(o||{})},c=s({},o,n);return s({},c)},marks:T,open:re,range:te,trackLeap:Be,trackOffset:de,values:v}}const Xt=["aria-label","aria-valuetext","className","component","classes","disableSwap","disabled","getAriaLabel","getAriaValueText","marks","max","min","name","onChange","onChangeCommitted","onMouseDown","orientation","scale","step","tabIndex","track","value","valueLabelDisplay","valueLabelFormat","isRtl","components","componentsProps"],it=e=>e,Jt=e=>{const{disabled:a,dragging:r,marked:l,orientation:u,track:f,classes:i}=e;return pt({root:["root",a&&"disabled",r&&"dragging",l&&"marked",u==="vertical"&&"vertical",f==="inverted"&&"trackInverted",f===!1&&"trackFalse"],rail:["rail"],track:["track"],mark:["mark"],markActive:["markActive"],markLabel:["markLabel"],markLabelActive:["markLabelActive"],valueLabel:["valueLabel"],thumb:["thumb",a&&"disabled"],active:["active"],disabled:["disabled"],focusVisible:["focusVisible"]},ke,i)},Kt=({children:e})=>e,Qt=g.forwardRef(function(a,r){var l,u,f,i,h,j,N;const{"aria-label":_,"aria-valuetext":R,className:k,component:z,classes:H,disableSwap:$=!1,disabled:w=!1,getAriaLabel:ae,getAriaValueText:U,marks:Ce=!1,max:E=100,min:re=0,onMouseDown:Z,orientation:Se="horizontal",scale:ee=it,step:oe=1,track:B="normal",valueLabelDisplay:G="off",valueLabelFormat:P=it,isRtl:te=!1,components:v={},componentsProps:T={}}=a,O=Ae(a,Xt),S=s({},a,{marks:Ce,classes:H,disabled:w,isRtl:te,max:E,min:re,orientation:Se,scale:ee,step:oe,track:B,valueLabelDisplay:G,valueLabelFormat:P}),{axisProps:le,getRootProps:Ue,getHiddenInputProps:Ge,getThumbProps:we,open:se,active:L,axis:ne,range:Le,focusVisible:qe,dragging:We,marks:he,values:V,trackOffset:ie,trackLeap:ce}=Yt(s({},S,{ref:r}));S.marked=he.length>0&&he.some(m=>m.label),S.dragging=We;const Y=(l=z??v.Root)!=null?l:"span",q=J(Y,s({},O,T.root),S),ue=(u=v.Rail)!=null?u:"span",X=J(ue,T.rail,S),Re=(f=v.Track)!=null?f:"span",de=J(Re,T.track,S),Be=s({},le[ne].offset(ie),le[ne].leap(ce)),Pe=(i=v.Thumb)!=null?i:"span",be=J(Pe,T.thumb,S),Ve=(h=v.ValueLabel)!=null?h:vt,Ye=J(Ve,T.valueLabel,S),$e=(j=v.Mark)!=null?j:"span",o=J($e,T.mark,S),n=(N=v.MarkLabel)!=null?N:"span",c=J(n,T.markLabel,S),d=v.Input||"input",C=J(d,T.input,S),M=Ge(),p=Jt(S);return t.jsxs(Y,s({},q,Ue({onMouseDown:Z}),{className:A(p.root,q.className,k),children:[t.jsx(ue,s({},X,{className:A(p.rail,X.className)})),t.jsx(Re,s({},de,{className:A(p.track,de.className),style:s({},Be,de.style)})),he.filter(m=>m.value>=re&&m.value<=E).map((m,x)=>{const y=Oe(m.value,re,E),F=le[ne].offset(y);let I;return B===!1?I=V.indexOf(m.value)!==-1:I=B==="normal"&&(Le?m.value>=V[0]&&m.value<=V[V.length-1]:m.value<=V[0])||B==="inverted"&&(Le?m.value<=V[0]||m.value>=V[V.length-1]:m.value>=V[0]),t.jsxs(g.Fragment,{children:[t.jsx($e,s({"data-index":x},o,!Te($e)&&{markActive:I},{style:s({},F,o.style),className:A(p.mark,o.className,I&&p.markActive)})),m.label!=null?t.jsx(n,s({"aria-hidden":!0,"data-index":x},c,!Te(n)&&{markLabelActive:I},{style:s({},F,c.style),className:A(p.markLabel,c.className,I&&p.markLabelActive),children:m.label})):null]},m.value)}),V.map((m,x)=>{const y=Oe(m,re,E),F=le[ne].offset(y),I=G==="off"?Kt:Ve;return t.jsx(g.Fragment,{children:t.jsx(I,s({},!Te(I)&&{valueLabelFormat:P,valueLabelDisplay:G,value:typeof P=="function"?P(ee(m),x):P,index:x,open:se===x||L===x||G==="on",disabled:w},Ye,{className:A(p.valueLabel,Ye.className),children:t.jsx(Pe,s({"data-index":x},be,we(),{className:A(p.thumb,be.className,L===x&&p.active,qe===x&&p.focusVisible),style:s({},F,{pointerEvents:$&&L!==x?"none":void 0},be.style),children:t.jsx(d,s({},M,{"data-index":x,"aria-label":ae?ae(x):_,"aria-valuenow":ee(m),"aria-valuetext":U?U(ee(m),x):R,value:V[x]},!Te(d)&&{ownerState:s({},S,C.ownerState)},C,{style:s({},M.style,C.style)}))}))}))},x)})]}))}),Zt=Qt;function ea(e){return ut("MuiFormGroup",e)}tt("MuiFormGroup",["root","row","error"]);const ta=["className","row"],aa=e=>{const{classes:a,row:r,error:l}=e;return pt({root:["root",r&&"row",l&&"error"]},ea,a)},ra=Q("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:r}=e;return[a.root,r.row&&a.row]}})(({ownerState:e})=>s({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),oa=g.forwardRef(function(a,r){const l=mt({props:a,name:"MuiFormGroup"}),{className:u,row:f=!1}=l,i=Ae(l,ta),h=_t(),j=zt({props:l,muiFormControl:h,states:["error"]}),N=s({},l,{row:f,error:j.error}),_=aa(N);return t.jsx(ra,s({className:et(_.root,u),ownerState:N,ref:r},i))}),la=oa,sa=["actions","children","defaultValue","name","onChange","value"],na=g.forwardRef(function(a,r){const{actions:l,children:u,defaultValue:f,name:i,onChange:h,value:j}=a,N=Ae(a,sa),_=g.useRef(null),[R,k]=dt({controlled:j,default:f,name:"RadioGroup"});g.useImperativeHandle(l,()=>({focus:()=>{let w=_.current.querySelector("input:not(:disabled):checked");w||(w=_.current.querySelector("input:not(:disabled)")),w&&w.focus()}}),[]);const z=Ze(r,_),H=w=>{k(w.target.value),h&&h(w,w.target.value)},$=Ct(i);return t.jsx(Nt.Provider,{value:{name:$,onChange:H,value:R},children:t.jsx(la,s({role:"radiogroup",ref:z},N,{children:u}))})}),ia=na,ca=["component","components","componentsProps","color","size"],K=s({},Ee,tt("MuiSlider",["colorPrimary","colorSecondary","thumbColorPrimary","thumbColorSecondary","sizeSmall","thumbSizeSmall"])),ua=Q("span",{name:"MuiSlider",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:r}=e;return[a.root,a[`color${D(r.color)}`],r.size!=="medium"&&a[`size${D(r.size)}`],r.marked&&a.marked,r.orientation==="vertical"&&a.vertical,r.track==="inverted"&&a.trackInverted,r.track===!1&&a.trackFalse]}})(({theme:e,ownerState:a})=>s({borderRadius:12,boxSizing:"content-box",display:"inline-block",position:"relative",cursor:"pointer",touchAction:"none",color:e.palette[a.color].main,WebkitTapHighlightColor:"transparent"},a.orientation==="horizontal"&&s({height:4,width:"100%",padding:"13px 0","@media (pointer: coarse)":{padding:"20px 0"}},a.size==="small"&&{height:2},a.marked&&{marginBottom:20}),a.orientation==="vertical"&&s({height:"100%",width:4,padding:"0 13px","@media (pointer: coarse)":{padding:"0 20px"}},a.size==="small"&&{width:2},a.marked&&{marginRight:44}),{"@media print":{colorAdjust:"exact"},[`&.${K.disabled}`]:{pointerEvents:"none",cursor:"default",color:e.palette.grey[400]},[`&.${K.dragging}`]:{[`& .${K.thumb}, & .${K.track}`]:{transition:"none"}}})),da=Q("span",{name:"MuiSlider",slot:"Rail",overridesResolver:(e,a)=>a.rail})(({ownerState:e})=>s({display:"block",position:"absolute",borderRadius:"inherit",backgroundColor:"currentColor",opacity:.38},e.orientation==="horizontal"&&{width:"100%",height:"inherit",top:"50%",transform:"translateY(-50%)"},e.orientation==="vertical"&&{height:"100%",width:"inherit",left:"50%",transform:"translateX(-50%)"},e.track==="inverted"&&{opacity:1})),pa=Q("span",{name:"MuiSlider",slot:"Track",overridesResolver:(e,a)=>a.track})(({theme:e,ownerState:a})=>{const r=e.palette.mode==="light"?St(e.palette[a.color].main,.62):wt(e.palette[a.color].main,.5);return s({display:"block",position:"absolute",borderRadius:"inherit",border:"1px solid currentColor",backgroundColor:"currentColor",transition:e.transitions.create(["left","width","bottom","height"],{duration:e.transitions.duration.shortest})},a.size==="small"&&{border:"none"},a.orientation==="horizontal"&&{height:"inherit",top:"50%",transform:"translateY(-50%)"},a.orientation==="vertical"&&{width:"inherit",left:"50%",transform:"translateX(-50%)"},a.track===!1&&{display:"none"},a.track==="inverted"&&{backgroundColor:r,borderColor:r})}),ma=Q("span",{name:"MuiSlider",slot:"Thumb",overridesResolver:(e,a)=>{const{ownerState:r}=e;return[a.thumb,a[`thumbColor${D(r.color)}`],r.size!=="medium"&&a[`thumbSize${D(r.size)}`]]}})(({theme:e,ownerState:a})=>s({position:"absolute",width:20,height:20,boxSizing:"border-box",borderRadius:"50%",outline:0,backgroundColor:"currentColor",display:"flex",alignItems:"center",justifyContent:"center",transition:e.transitions.create(["box-shadow","left","bottom"],{duration:e.transitions.duration.shortest})},a.size==="small"&&{width:12,height:12},a.orientation==="horizontal"&&{top:"50%",transform:"translate(-50%, -50%)"},a.orientation==="vertical"&&{left:"50%",transform:"translate(-50%, 50%)"},{"&:before":s({position:"absolute",content:'""',borderRadius:"inherit",width:"100%",height:"100%",boxShadow:e.shadows[2]},a.size==="small"&&{boxShadow:"none"}),"&::after":{position:"absolute",content:'""',borderRadius:"50%",width:42,height:42,top:"50%",left:"50%",transform:"translate(-50%, -50%)"},[`&:hover, &.${K.focusVisible}`]:{boxShadow:`0px 0px 0px 8px ${ot(e.palette[a.color].main,.16)}`,"@media (hover: none)":{boxShadow:"none"}},[`&.${K.active}`]:{boxShadow:`0px 0px 0px 14px ${ot(e.palette[a.color].main,.16)}`},[`&.${K.disabled}`]:{"&:hover":{boxShadow:"none"}}})),fa=Q(vt,{name:"MuiSlider",slot:"ValueLabel",overridesResolver:(e,a)=>a.valueLabel})(({theme:e,ownerState:a})=>s({[`&.${K.valueLabelOpen}`]:{transform:"translateY(-100%) scale(1)"},zIndex:1,whiteSpace:"nowrap"},e.typography.body2,{fontWeight:500,transition:e.transitions.create(["transform"],{duration:e.transitions.duration.shortest}),top:-10,transformOrigin:"bottom center",transform:"translateY(-100%) scale(0)",position:"absolute",backgroundColor:e.palette.grey[600],borderRadius:2,color:e.palette.common.white,display:"flex",alignItems:"center",justifyContent:"center",padding:"0.25rem 0.75rem"},a.size==="small"&&{fontSize:e.typography.pxToRem(12),padding:"0.25rem 0.5rem"},{"&:before":{position:"absolute",content:'""',width:8,height:8,bottom:0,left:"50%",transform:"translate(-50%, 50%) rotate(45deg)",backgroundColor:"inherit"}})),ha=Q("span",{name:"MuiSlider",slot:"Mark",shouldForwardProp:e=>ft(e)&&e!=="markActive",overridesResolver:(e,a)=>a.mark})(({theme:e,ownerState:a,markActive:r})=>s({position:"absolute",width:2,height:2,borderRadius:1,backgroundColor:"currentColor"},a.orientation==="horizontal"&&{top:"50%",transform:"translate(-1px, -50%)"},a.orientation==="vertical"&&{left:"50%",transform:"translate(-50%, 1px)"},r&&{backgroundColor:e.palette.background.paper,opacity:.8})),ba=Q("span",{name:"MuiSlider",slot:"MarkLabel",shouldForwardProp:e=>ft(e)&&e!=="markLabelActive",overridesResolver:(e,a)=>a.markLabel})(({theme:e,ownerState:a,markLabelActive:r})=>s({},e.typography.body2,{color:e.palette.text.secondary,position:"absolute",whiteSpace:"nowrap"},a.orientation==="horizontal"&&{top:30,transform:"translateX(-50%)","@media (pointer: coarse)":{top:40}},a.orientation==="vertical"&&{left:36,transform:"translateY(50%)","@media (pointer: coarse)":{left:44}},r&&{color:e.palette.text.primary})),va=e=>{const{color:a,size:r,classes:l={}}=e;return s({},l,{root:et(l.root,ke(`color${D(a)}`),l[`color${D(a)}`],r&&[ke(`size${D(r)}`),l[`size${D(r)}`]]),thumb:et(l.thumb,ke(`thumbColor${D(a)}`),l[`thumbColor${D(a)}`],r&&[ke(`thumbSize${D(r)}`),l[`thumbSize${D(r)}`]])})},xa=g.forwardRef(function(a,r){var l,u,f,i;const h=mt({props:a,name:"MuiSlider"}),N=Lt().direction==="rtl",{component:_="span",components:R={},componentsProps:k={},color:z="primary",size:H="medium"}=h,$=Ae(h,ca),w=s({},h,{color:z,size:H}),ae=va(w);return t.jsx(Zt,s({},$,{isRtl:N,components:s({Root:ua,Rail:da,Track:pa,Thumb:ma,ValueLabel:fa,Mark:ha,MarkLabel:ba},R),componentsProps:s({},k,{root:s({},k.root,Ne(R.Root)&&{as:_,ownerState:s({},(l=k.root)==null?void 0:l.ownerState,{color:z,size:H})}),thumb:s({},k.thumb,Ne(R.Thumb)&&{ownerState:s({},(u=k.thumb)==null?void 0:u.ownerState,{color:z,size:H})}),track:s({},k.track,Ne(R.Track)&&{ownerState:s({},(f=k.track)==null?void 0:f.ownerState,{color:z,size:H})}),valueLabel:s({},k.valueLabel,Ne(R.ValueLabel)&&{ownerState:s({},(i=k.valueLabel)==null?void 0:i.ownerState,{color:z,size:H})})}),classes:ae,ref:r}))}),ct=xa;var at={},ga=bt;Object.defineProperty(at,"__esModule",{value:!0});var gt=at.default=void 0,ja=ga(ht()),ya=t,ka=(0,ja.default)((0,ya.jsx)("path",{d:"M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"}),"VolumeDown");gt=at.default=ka;var rt={},Ca=bt;Object.defineProperty(rt,"__esModule",{value:!0});var jt=rt.default=void 0,Sa=Ca(ht()),wa=t,La=(0,Sa.default)((0,wa.jsx)("path",{d:"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"}),"VolumeUp");jt=rt.default=La;const W={inputProps:{"aria-label":"Switch demo"}},fe=[{value:"USD",label:"$"},{value:"EUR",label:"€"},{value:"BTC",label:"฿"},{value:"JPY",label:"¥"}];function er(){const[e,a]=g.useState("EUR"),r=i=>{a(i.target.value)},[l,u]=g.useState(30),f=(i,h)=>{u(h)};return t.jsxs(t.Fragment,{children:[t.jsx(Rt,{children:t.jsx("title",{children:"Forms - Components"})}),t.jsx($t,{children:t.jsx(Vt,{heading:"Forms",subHeading:"Components that are used to build interactive placeholders used for data collection from users.",docs:"https://material-ui.com/components/text-fields/"})}),t.jsx(Mt,{maxWidth:"lg",children:t.jsxs(me,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[t.jsx(me,{item:!0,xs:12,children:t.jsxs(xe,{children:[t.jsx(ve,{title:"Input Fields"}),t.jsx(pe,{}),t.jsx(ge,{children:t.jsxs(Je,{component:"form",sx:{"& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:[t.jsxs("div",{children:[t.jsx(b,{required:!0,id:"outlined-required",label:"Required",defaultValue:"Hello World"}),t.jsx(b,{disabled:!0,id:"outlined-disabled",label:"Disabled",defaultValue:"Hello World"}),t.jsx(b,{id:"outlined-password-input",label:"Password",type:"password",autoComplete:"current-password"}),t.jsx(b,{id:"outlined-read-only-input",label:"Read Only",defaultValue:"Hello World",InputProps:{readOnly:!0}}),t.jsx(b,{id:"outlined-number",label:"Number",type:"number",InputLabelProps:{shrink:!0}}),t.jsx(b,{id:"outlined-search",label:"Search field",type:"search"}),t.jsx(b,{id:"outlined-helperText",label:"Helper text",defaultValue:"Default Value",helperText:"Some important text"})]}),t.jsxs("div",{children:[t.jsx(b,{required:!0,id:"filled-required",label:"Required",defaultValue:"Hello World",variant:"filled"}),t.jsx(b,{disabled:!0,id:"filled-disabled",label:"Disabled",defaultValue:"Hello World",variant:"filled"}),t.jsx(b,{id:"filled-password-input",label:"Password",type:"password",autoComplete:"current-password",variant:"filled"}),t.jsx(b,{id:"filled-read-only-input",label:"Read Only",defaultValue:"Hello World",InputProps:{readOnly:!0},variant:"filled"}),t.jsx(b,{id:"filled-number",label:"Number",type:"number",InputLabelProps:{shrink:!0},variant:"filled"}),t.jsx(b,{id:"filled-search",label:"Search field",type:"search",variant:"filled"}),t.jsx(b,{id:"filled-helperText",label:"Helper text",defaultValue:"Default Value",helperText:"Some important text",variant:"filled"})]}),t.jsxs("div",{children:[t.jsx(b,{required:!0,id:"standard-required",label:"Required",defaultValue:"Hello World",variant:"standard"}),t.jsx(b,{disabled:!0,id:"standard-disabled",label:"Disabled",defaultValue:"Hello World",variant:"standard"}),t.jsx(b,{id:"standard-password-input",label:"Password",type:"password",autoComplete:"current-password",variant:"standard"}),t.jsx(b,{id:"standard-read-only-input",label:"Read Only",defaultValue:"Hello World",InputProps:{readOnly:!0},variant:"standard"}),t.jsx(b,{id:"standard-number",label:"Number",type:"number",InputLabelProps:{shrink:!0},variant:"standard"}),t.jsx(b,{id:"standard-search",label:"Search field",type:"search",variant:"standard"}),t.jsx(b,{id:"standard-helperText",label:"Helper text",defaultValue:"Default Value",helperText:"Some important text",variant:"standard"})]})]})})]})}),t.jsx(me,{item:!0,xs:12,children:t.jsxs(xe,{children:[t.jsx(ve,{title:"Select Inputs"}),t.jsx(pe,{}),t.jsx(ge,{children:t.jsxs(Je,{component:"form",sx:{"& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:[t.jsxs("div",{children:[t.jsx(b,{id:"outlined-select-currency",select:!0,label:"Select",value:e,onChange:r,helperText:"Please select your currency",children:fe.map(i=>t.jsx(Ke,{value:i.value,children:i.label},i.value))}),t.jsx(b,{id:"outlined-select-currency-native",select:!0,label:"Native select",value:e,onChange:r,SelectProps:{native:!0},helperText:"Please select your currency",children:fe.map(i=>t.jsx("option",{value:i.value,children:i.label},i.value))})]}),t.jsxs("div",{children:[t.jsx(b,{id:"filled-select-currency",select:!0,label:"Select",value:e,onChange:r,helperText:"Please select your currency",variant:"filled",children:fe.map(i=>t.jsx(Ke,{value:i.value,children:i.label},i.value))}),t.jsx(b,{id:"filled-select-currency-native",select:!0,label:"Native select",value:e,onChange:r,SelectProps:{native:!0},helperText:"Please select your currency",variant:"filled",children:fe.map(i=>t.jsx("option",{value:i.value,children:i.label},i.value))})]}),t.jsxs("div",{children:[t.jsx(b,{id:"standard-select-currency",select:!0,label:"Select",value:e,onChange:r,helperText:"Please select your currency",variant:"standard",children:fe.map(i=>t.jsx(Ke,{value:i.value,children:i.label},i.value))}),t.jsx(b,{id:"standard-select-currency-native",select:!0,label:"Native select",value:e,onChange:r,SelectProps:{native:!0},helperText:"Please select your currency",variant:"standard",children:fe.map(i=>t.jsx("option",{value:i.value,children:i.label},i.value))})]})]})})]})}),t.jsx(me,{item:!0,xs:12,children:t.jsxs(xe,{children:[t.jsx(ve,{title:"Switches"}),t.jsx(pe,{}),t.jsxs(ge,{children:[t.jsx(Me,{...W,defaultChecked:!0}),t.jsx(Me,{...W}),t.jsx(Me,{...W,disabled:!0,defaultChecked:!0}),t.jsx(Me,{...W,disabled:!0})]})]})}),t.jsx(me,{item:!0,xs:12,children:t.jsxs(xe,{children:[t.jsx(ve,{title:"Checkboxes & Radios"}),t.jsx(pe,{}),t.jsxs(ge,{children:[t.jsx(je,{...W,defaultChecked:!0}),t.jsx(je,{...W,defaultChecked:!0,color:"secondary"}),t.jsx(je,{...W,defaultChecked:!0,color:"success"}),t.jsx(je,{...W,defaultChecked:!0,color:"default"}),t.jsx(je,{...W,defaultChecked:!0,sx:{color:lt[800],"&.Mui-checked":{color:lt[600]}}}),t.jsx(pe,{sx:{my:5}}),t.jsxs(Ft,{component:"fieldset",children:[t.jsx(It,{component:"legend",children:"Gender"}),t.jsxs(ia,{row:!0,"aria-label":"gender",name:"row-radio-buttons-group",children:[t.jsx(Ie,{value:"female",control:t.jsx(Fe,{}),label:"Female"}),t.jsx(Ie,{value:"male",control:t.jsx(Fe,{}),label:"Male"}),t.jsx(Ie,{value:"other",control:t.jsx(Fe,{}),label:"Other"}),t.jsx(Ie,{value:"disabled",disabled:!0,control:t.jsx(Fe,{}),label:"other"})]})]})]})]})}),t.jsx(me,{item:!0,xs:12,children:t.jsxs(xe,{children:[t.jsx(ve,{title:"Sliders"}),t.jsx(pe,{}),t.jsx(ge,{children:t.jsxs(Je,{sx:{width:200},children:[t.jsxs(Pt,{spacing:2,direction:"row",sx:{mb:1},alignItems:"center",children:[t.jsx(gt,{}),t.jsx(ct,{"aria-label":"Volume",value:l,onChange:f}),t.jsx(jt,{})]}),t.jsx(ct,{disabled:!0,defaultValue:30,"aria-label":"Disabled slider"})]})})]})})]})}),t.jsx(Tt,{})]})}export{er as default};
