import{r as d,i as M,k as N,s as g,as as T,_ as n,m as G,n as j,al as U,j as l,o as v,p as k,q as W}from"./index-RN40GIN3.js";import"./react-is.production.min-pGgGHoNV.js";import{C as E}from"./ExpandMore-dGJJoQ68.js";const V=d.createContext({});function q(o){return N("MuiAccordion",o)}const _=M("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),R=_,L=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],H=o=>{const{classes:s,square:e,expanded:r,disabled:a,disableGutters:i}=o;return k({root:["root",!e&&"rounded",r&&"expanded",a&&"disabled",!i&&"gutters"],region:["region"]},q,s)},O=g(T,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:e}=o;return[{[`& .${R.region}`]:s.region},s.root,!e.square&&s.rounded,!e.disableGutters&&s.gutters]}})(({theme:o})=>{const s={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],s),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],s)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${R.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${R.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o,ownerState:s})=>n({},!s.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!s.disableGutters&&{[`&.${R.expanded}`]:{margin:"16px 0"}})),z=d.forwardRef(function(s,e){const r=G({props:s,name:"MuiAccordion"}),{children:a,className:i,defaultExpanded:c=!1,disabled:p=!1,disableGutters:m=!1,expanded:h,onChange:f,square:y=!1,TransitionComponent:C=E,TransitionProps:A}=r,S=j(r,L),[t,u]=U({controlled:h,default:c,name:"Accordion",state:"expanded"}),b=d.useCallback(P=>{u(!t),f&&f(P,!t)},[t,f,u]),[$,...w]=d.Children.toArray(a),B=d.useMemo(()=>({expanded:t,disabled:p,disableGutters:m,toggle:b}),[t,p,m,b]),D=n({},r,{square:y,disabled:p,disableGutters:m,expanded:t}),I=H(D);return l.jsxs(O,n({className:v(I.root,i),ref:e,ownerState:D,square:y},S,{children:[l.jsx(V.Provider,{value:B,children:$}),l.jsx(C,n({in:t,timeout:"auto"},A,{children:l.jsx("div",{"aria-labelledby":$.props.id,id:$.props["aria-controls"],role:"region",className:I.region,children:w})}))]}))}),lo=z;function F(o){return N("MuiAccordionDetails",o)}M("MuiAccordionDetails",["root"]);const J=["className"],K=o=>{const{classes:s}=o;return k({root:["root"]},F,s)},Q=g("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),X=d.forwardRef(function(s,e){const r=G({props:s,name:"MuiAccordionDetails"}),{className:a}=r,i=j(r,J),c=r,p=K(c);return l.jsx(Q,n({className:v(p.root,a),ref:e,ownerState:c},i))}),po=X;function Y(o){return N("MuiAccordionSummary",o)}const Z=M("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),x=Z,oo=["children","className","expandIcon","focusVisibleClassName","onClick"],so=o=>{const{classes:s,expanded:e,disabled:r,disableGutters:a}=o;return k({root:["root",e&&"expanded",r&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",e&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",e&&"expanded"]},Y,s)},eo=g(W,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o,ownerState:s})=>{const e={duration:o.transitions.duration.shortest};return n({display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],e),[`&.${x.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${x.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${x.disabled})`]:{cursor:"pointer"}},!s.disableGutters&&{[`&.${x.expanded}`]:{minHeight:64}})}),ro=g("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,s)=>s.content})(({theme:o,ownerState:s})=>n({display:"flex",flexGrow:1,margin:"12px 0"},!s.disableGutters&&{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${x.expanded}`]:{margin:"20px 0"}})),to=g("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,s)=>s.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${x.expanded}`]:{transform:"rotate(180deg)"}})),ao=d.forwardRef(function(s,e){const r=G({props:s,name:"MuiAccordionSummary"}),{children:a,className:i,expandIcon:c,focusVisibleClassName:p,onClick:m}=r,h=j(r,oo),{disabled:f=!1,disableGutters:y,expanded:C,toggle:A}=d.useContext(V),S=b=>{A&&A(b),m&&m(b)},t=n({},r,{expanded:C,disabled:f,disableGutters:y}),u=so(t);return l.jsxs(eo,n({focusRipple:!1,disableRipple:!0,disabled:f,component:"div","aria-expanded":C,className:v(u.root,i),focusVisibleClassName:v(u.focusVisible,p),onClick:S,ref:e,ownerState:t},h,{children:[l.jsx(ro,{className:u.content,ownerState:t,children:a}),c&&l.jsx(to,{className:u.expandIconWrapper,ownerState:t,children:c})]}))}),uo=ao;export{uo as A,lo as a,po as b};
