import{g as N,c as U,s as A,_ as n,f as J,r as v,u as K,h as Q,j as r,aq as X,i as Y,e as a,k as Z,m as L,n as V,B as G,W as S,D as B,S as P,ar as t,a as E}from"./index-9lkQUlNG.js";import{P as w}from"./index-u5NVnNHL.js";import{P as oo}from"./index-pfcZp7m4.js";import{C as y,F as ro}from"./index-6z5A6YgQ.js";import{d as io}from"./Add-LipFNFPA.js";import{C as eo}from"./Container-qmmmC6zp.js";import{G as x}from"./Grid-dpMjCYlK.js";import{C as z}from"./Card-0NMuTcO3.js";import{C as _}from"./CardContent-cJndBEpe.js";import{F as ao}from"./FormControlLabel-HcH3OfZv.js";import{S as to}from"./Switch-L53RCSnV.js";import"./AddTwoTone-VZV2cqWv.js";import"./SwitchBase-buvszcXd.js";function no(i){return U("MuiButtonGroup",i)}const so=N("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary"]),s=so,lo=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],co=(i,o)=>{const{ownerState:e}=i;return[{[`& .${s.grouped}`]:o.grouped},{[`& .${s.grouped}`]:o[`grouped${a(e.orientation)}`]},{[`& .${s.grouped}`]:o[`grouped${a(e.variant)}`]},{[`& .${s.grouped}`]:o[`grouped${a(e.variant)}${a(e.orientation)}`]},{[`& .${s.grouped}`]:o[`grouped${a(e.variant)}${a(e.color)}`]},o.root,o[e.variant],e.disableElevation===!0&&o.disableElevation,e.fullWidth&&o.fullWidth,e.orientation==="vertical"&&o.vertical]},uo=i=>{const{classes:o,color:e,disabled:l,disableElevation:u,fullWidth:h,orientation:d,variant:c}=i,p={root:["root",c,d==="vertical"&&"vertical",h&&"fullWidth",u&&"disableElevation"],grouped:["grouped",`grouped${a(d)}`,`grouped${a(c)}`,`grouped${a(c)}${a(d)}`,`grouped${a(c)}${a(e)}`,l&&"disabled"]};return Z(p,no,o)},po=A("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:co})(({theme:i,ownerState:o})=>n({display:"inline-flex",borderRadius:(i.vars||i).shape.borderRadius},o.variant==="contained"&&{boxShadow:(i.vars||i).shadows[2]},o.disableElevation&&{boxShadow:"none"},o.fullWidth&&{width:"100%"},o.orientation==="vertical"&&{flexDirection:"column"},{[`& .${s.grouped}`]:n({minWidth:40,"&:not(:first-of-type)":n({},o.orientation==="horizontal"&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},o.orientation==="vertical"&&{borderTopRightRadius:0,borderTopLeftRadius:0},o.variant==="outlined"&&o.orientation==="horizontal"&&{marginLeft:-1},o.variant==="outlined"&&o.orientation==="vertical"&&{marginTop:-1}),"&:not(:last-of-type)":n({},o.orientation==="horizontal"&&{borderTopRightRadius:0,borderBottomRightRadius:0},o.orientation==="vertical"&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},o.variant==="text"&&o.orientation==="horizontal"&&{borderRight:i.vars?`1px solid rgba(${i.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${i.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`},o.variant==="text"&&o.orientation==="vertical"&&{borderBottom:i.vars?`1px solid rgba(${i.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${i.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`},o.variant==="text"&&o.color!=="inherit"&&{borderColor:i.vars?`rgba(${i.vars.palette[o.color].mainChannel} / 0.5)`:J(i.palette[o.color].main,.5)},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"transparent"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"transparent"},o.variant==="contained"&&o.orientation==="horizontal"&&{borderRight:`1px solid ${(i.vars||i).palette.grey[400]}`,[`&.${s.disabled}`]:{borderRight:`1px solid ${(i.vars||i).palette.action.disabled}`}},o.variant==="contained"&&o.orientation==="vertical"&&{borderBottom:`1px solid ${(i.vars||i).palette.grey[400]}`,[`&.${s.disabled}`]:{borderBottom:`1px solid ${(i.vars||i).palette.action.disabled}`}},o.variant==="contained"&&o.color!=="inherit"&&{borderColor:(i.vars||i).palette[o.color].dark},{"&:hover":n({},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"currentColor"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"currentColor"})}),"&:hover":n({},o.variant==="contained"&&{boxShadow:"none"})},o.variant==="contained"&&{boxShadow:"none"})})),go=v.forwardRef(function(o,e){const l=K({props:o,name:"MuiButtonGroup"}),{children:u,className:h,color:d="primary",component:c="div",disabled:p=!1,disableElevation:b=!1,disableFocusRipple:m=!1,disableRipple:f=!1,fullWidth:j=!1,orientation:O="horizontal",size:C="medium",variant:R="outlined"}=l,q=Q(l,lo),W=n({},l,{color:d,component:c,disabled:p,disableElevation:b,disableFocusRipple:m,disableRipple:f,fullWidth:j,orientation:O,size:C,variant:R}),$=uo(W),I=v.useMemo(()=>({className:$.grouped,color:d,disabled:p,disableElevation:b,disableFocusRipple:m,disableRipple:f,fullWidth:j,size:C,variant:R}),[d,p,b,m,f,j,C,R,$.grouped]);return r.jsx(po,n({as:c,role:"group",className:Y($.root,h),ref:e,ownerState:W},q,{children:r.jsx(X.Provider,{value:I,children:u})}))}),xo=go;var M={},vo=V;Object.defineProperty(M,"__esModule",{value:!0});var D=M.default=void 0,ho=vo(L()),bo=r,mo=(0,ho.default)((0,bo.jsx)("path",{d:"M19 13H5v-2h14v2z"}),"Remove");D=M.default=mo;var T={},fo=V;Object.defineProperty(T,"__esModule",{value:!0});var g=T.default=void 0,jo=fo(L()),Co=r,Ro=(0,jo.default)((0,Co.jsx)("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"}),"Mail");g=T.default=Ro;const F={bgcolor:"primary.main",width:40,height:40},$o={borderRadius:"50%"},k=r.jsx(G,{component:"span",sx:F}),H=r.jsx(G,{component:"span",sx:{...F,...$o}});function Vo(){const[i,o]=v.useState(1),[e,l]=v.useState(!1),u=()=>{l(!e)};return r.jsxs(r.Fragment,{children:[r.jsx(S,{children:r.jsx("title",{children:"Badges - Components"})}),r.jsx(oo,{children:r.jsx(w,{heading:"Badges",subHeading:"Badge generates a small badge to the top-right of its child(ren).",docs:"https://material-ui.com/components/badges/"})}),r.jsx(eo,{maxWidth:"lg",children:r.jsxs(x,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[r.jsx(x,{item:!0,xs:12,children:r.jsxs(z,{children:[r.jsx(y,{title:"Shapes"}),r.jsx(B,{}),r.jsx(_,{children:r.jsxs(P,{spacing:3,direction:"row",children:[r.jsx(t,{color:"secondary",badgeContent:" ",children:k}),r.jsx(t,{color:"secondary",badgeContent:" ",variant:"dot",children:k}),r.jsx(t,{color:"secondary",overlap:"circular",badgeContent:" ",children:H}),r.jsx(t,{color:"secondary",overlap:"circular",badgeContent:" ",variant:"dot",children:H})]})})]})}),r.jsx(x,{item:!0,xs:12,children:r.jsxs(z,{children:[r.jsx(y,{title:"Badges Visibility"}),r.jsx(B,{}),r.jsx(_,{children:r.jsxs(G,{sx:{color:"action.active",display:"flex",flexDirection:"column","& > *":{marginBottom:2},"& .MuiBadge-root":{marginRight:4}},children:[r.jsxs("div",{children:[r.jsx(t,{color:"secondary",badgeContent:i,children:r.jsx(g,{})}),r.jsxs(xo,{children:[r.jsx(E,{"aria-label":"reduce",onClick:()=>{o(Math.max(i-1,0))},children:r.jsx(D,{fontSize:"small"})}),r.jsx(E,{"aria-label":"increase",onClick:()=>{o(i+1)},children:r.jsx(io,{fontSize:"small"})})]})]}),r.jsxs("div",{children:[r.jsx(t,{color:"secondary",variant:"dot",invisible:e,children:r.jsx(g,{})}),r.jsx(ao,{sx:{color:"text.primary"},control:r.jsx(to,{checked:!e,onChange:u}),label:"Show Badge"})]})]})})]})}),r.jsx(x,{item:!0,xs:12,children:r.jsxs(z,{children:[r.jsx(y,{title:"Colors"}),r.jsx(B,{}),r.jsx(_,{children:r.jsxs(P,{spacing:2,direction:"row",children:[r.jsx(t,{badgeContent:4,color:"secondary",children:r.jsx(g,{color:"action"})}),r.jsx(t,{badgeContent:4,color:"success",children:r.jsx(g,{color:"action"})})]})})]})})]})}),r.jsx(ro,{})]})}export{Vo as default};
