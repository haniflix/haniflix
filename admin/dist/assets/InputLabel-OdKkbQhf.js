import{i as b,k,s as x,_ as i,r as v,m as h,n as C,j as f,o as q,ab as g,p as L,t as I}from"./index-RN40GIN3.js";import{u as F,f as z}from"./useFormControl-ymE63IOh.js";function R(s){return k("MuiFormLabel",s)}const u=b("MuiFormLabel",["root","colorSecondary","focused","disabled","error","filled","required","asterisk"]),$=["children","className","color","component","disabled","error","filled","focused","required"],y=s=>{const{classes:r,color:o,focused:e,disabled:c,error:n,filled:d,required:t}=s,l={root:["root",`color${g(o)}`,c&&"disabled",n&&"error",d&&"filled",e&&"focused",t&&"required"],asterisk:["asterisk",n&&"error"]};return L(l,R,r)},M=x("label",{name:"MuiFormLabel",slot:"Root",overridesResolver:({ownerState:s},r)=>i({},r.root,s.color==="secondary"&&r.colorSecondary,s.filled&&r.filled)})(({theme:s,ownerState:r})=>i({color:(s.vars||s).palette.text.secondary},s.typography.body1,{lineHeight:"1.4375em",padding:0,position:"relative",[`&.${u.focused}`]:{color:(s.vars||s).palette[r.color].main},[`&.${u.disabled}`]:{color:(s.vars||s).palette.text.disabled},[`&.${u.error}`]:{color:(s.vars||s).palette.error.main}})),A=x("span",{name:"MuiFormLabel",slot:"Asterisk",overridesResolver:(s,r)=>r.asterisk})(({theme:s})=>({[`&.${u.error}`]:{color:(s.vars||s).palette.error.main}})),W=v.forwardRef(function(r,o){const e=h({props:r,name:"MuiFormLabel"}),{children:c,className:n,component:d="label"}=e,t=C(e,$),l=F(),a=z({props:e,muiFormControl:l,states:["color","required","focused","disabled","error","filled"]}),p=i({},e,{color:a.color||"primary",component:d,disabled:a.disabled,error:a.error,filled:a.filled,focused:a.focused,required:a.required}),m=y(p);return f.jsxs(M,i({as:d,ownerState:p,className:q(m.root,n),ref:o},t,{children:[c,a.required&&f.jsxs(A,{ownerState:p,"aria-hidden":!0,className:m.asterisk,children:[" ","*"]})]}))}),j=W;function E(s){return k("MuiInputLabel",s)}b("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);const U=["disableAnimation","margin","shrink","variant"],P=s=>{const{classes:r,formControl:o,size:e,shrink:c,disableAnimation:n,variant:d,required:t}=s,a=L({root:["root",o&&"formControl",!n&&"animated",c&&"shrink",e==="small"&&"sizeSmall",d],asterisk:[t&&"asterisk"]},E,r);return i({},r,a)},_=x(j,{shouldForwardProp:s=>I(s)||s==="classes",name:"MuiInputLabel",slot:"Root",overridesResolver:(s,r)=>{const{ownerState:o}=s;return[{[`& .${u.asterisk}`]:r.asterisk},r.root,o.formControl&&r.formControl,o.size==="small"&&r.sizeSmall,o.shrink&&r.shrink,!o.disableAnimation&&r.animated,r[o.variant]]}})(({theme:s,ownerState:r})=>i({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},r.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},r.size==="small"&&{transform:"translate(0, 17px) scale(1)"},r.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!r.disableAnimation&&{transition:s.transitions.create(["color","transform","max-width"],{duration:s.transitions.duration.shorter,easing:s.transitions.easing.easeOut})},r.variant==="filled"&&i({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},r.size==="small"&&{transform:"translate(12px, 13px) scale(1)"},r.shrink&&i({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},r.size==="small"&&{transform:"translate(12px, 4px) scale(0.75)"})),r.variant==="outlined"&&i({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},r.size==="small"&&{transform:"translate(14px, 9px) scale(1)"},r.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 24px)",transform:"translate(14px, -9px) scale(0.75)"}))),N=v.forwardRef(function(r,o){const e=h({name:"MuiInputLabel",props:r}),{disableAnimation:c=!1,shrink:n}=e,d=C(e,U),t=F();let l=n;typeof l>"u"&&t&&(l=t.filled||t.focused||t.adornedStart);const a=z({props:e,muiFormControl:t,states:["size","variant","required"]}),p=i({},e,{disableAnimation:c,formControl:t,shrink:l,size:a.size,variant:a.variant,required:a.required}),m=P(p);return f.jsx(_,i({"data-shrink":l,ownerState:p,ref:o},d,{classes:m}))}),w=N;export{j as F,w as I};
