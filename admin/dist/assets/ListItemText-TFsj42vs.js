import{s as P,_ as n,r as u,m as j,n as C,w as v,T as p,j as l,o as N,p as R}from"./index-UxWg3ezt.js";import{l as h,g as _}from"./listItemTextClasses-2n_E-t3u.js";const $=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],k=e=>{const{classes:s,inset:r,primary:a,secondary:c,dense:y}=e;return R({root:["root",r&&"inset",y&&"dense",a&&c&&"multiline"],primary:["primary"],secondary:["secondary"]},_,s)},w=P("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[{[`& .${h.primary}`]:s.primary},{[`& .${h.secondary}`]:s.secondary},s.root,r.inset&&s.inset,r.primary&&r.secondary&&s.multiline,r.dense&&s.dense]}})(({ownerState:e})=>n({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56})),B=u.forwardRef(function(s,r){const a=j({props:s,name:"MuiListItemText"}),{children:c,className:y,disableTypography:i=!1,inset:g=!1,primary:d,primaryTypographyProps:f,secondary:L,secondaryTypographyProps:b}=a,I=C(a,$),{dense:x}=u.useContext(v);let o=d??c,t=L;const T=n({},a,{disableTypography:i,inset:g,primary:!!o,secondary:!!t,dense:x}),m=k(T);return o!=null&&o.type!==p&&!i&&(o=l.jsx(p,n({variant:x?"body2":"body1",className:m.primary,component:"span",display:"block"},f,{children:o}))),t!=null&&t.type!==p&&!i&&(t=l.jsx(p,n({variant:"body2",className:m.secondary,color:"text.secondary",display:"block"},b,{children:t}))),l.jsxs(w,n({className:N(m.root,y),ownerState:T,ref:r},I,{children:[o,t]}))}),U=B;export{U as L};