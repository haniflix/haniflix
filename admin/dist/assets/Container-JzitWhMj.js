import{aQ as W,_ as c,aR as k,ab as l,r as v,n as R,j as $,aS as G,aT as S,p as T,k as M,s as P,m as j}from"./index-RN40GIN3.js";const y=W(),L=["className","component","disableGutters","fixed","maxWidth","classes"],N=k(),_=y("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[`maxWidth${l(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),U=a=>S({props:a,name:"MuiContainer",defaultTheme:N}),z=(a,e)=>{const o=i=>M(e,i),{classes:p,fixed:u,disableGutters:x,maxWidth:t}=a,s={root:["root",t&&`maxWidth${l(String(t))}`,u&&"fixed",x&&"disableGutters"]};return T(s,o,p)};function E(a={}){const{createStyledComponent:e=_,useThemeProps:o=U,componentName:p="MuiContainer"}=a,u=e(({theme:t,ownerState:s})=>c({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!s.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:s})=>s.fixed&&Object.keys(t.breakpoints.values).reduce((i,n)=>{const d=n,r=t.breakpoints.values[d];return r!==0&&(i[t.breakpoints.up(d)]={maxWidth:`${r}${t.breakpoints.unit}`}),i},{}),({theme:t,ownerState:s})=>c({},s.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},s.maxWidth&&s.maxWidth!=="xs"&&{[t.breakpoints.up(s.maxWidth)]:{maxWidth:`${t.breakpoints.values[s.maxWidth]}${t.breakpoints.unit}`}}));return v.forwardRef(function(s,i){const n=o(s),{className:d,component:r="div",disableGutters:b=!1,fixed:f=!1,maxWidth:C="lg"}=n,g=R(n,L),m=c({},n,{component:r,disableGutters:b,fixed:f,maxWidth:C}),h=z(m,p);return $.jsx(u,c({as:r,ownerState:m,className:G(h.root,d),ref:i},g))})}const w=E({createStyledComponent:P("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[`maxWidth${l(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),useThemeProps:a=>j({props:a,name:"MuiContainer"})}),O=w;export{O as C};
