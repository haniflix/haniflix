import{i as ma,k as va,s as c,_ as y,l as fa,A as u,r as g,m as de,n as pe,j as e,o as q,p as ue,q as ja,t as ga,v as V,h as Z,w as oe,x as ya,y as ba,z as $a,C as Ta,D as Ke,E as Ia,F as _a,G as Y,H as Ma,I as Pe,J as wa,K as Ca,M as Sa,N as v,O as f,B as s,g as xe,T as l,P as M,Q as P,R as Je,S as U,U as E,V as I,a as le,X as za,L as W,Y as Re,W as Da,Z as Q,$ as Pa}from"./index-RN40GIN3.js";import{d as ee}from"./ExpandMore-dGJJoQ68.js";import{d as Qe}from"./SearchTwoTone-7-Qt_iXu.js";import{g as Ra}from"./listItemIconClasses-fFuYOhmb.js";import{A as ka,a as ae,b as te}from"./AccordionSummary-JsEy7Or1.js";import{L as m}from"./ListItemText-LP5BUS3b.js";import{I as Aa}from"./OutlinedInput-5k8n8BVu.js";import{L as N,s as ke}from"./index-3owHxchF.js";import{F as La}from"./FormControlLabel-8nvg-ha1.js";import{S as Ha}from"./Switch-xpzl13WD.js";import{T as Oa}from"./TextField-nZuO35Fk.js";import{I as Ba}from"./InputAdornment-UDjRWuy1.js";import{T as Va,a as Wa}from"./Tabs-aYZpldsl.js";import{L as A}from"./ListItemAvatar-ORTRWRCY.js";import"./react-is.production.min-pGgGHoNV.js";import{s as K}from"./index-bm8yqKud.js";import{C as ea}from"./Card-_T_mgdHf.js";import"./listItemTextClasses-Grt4FLsb.js";import"./useFormControl-ymE63IOh.js";import"./SwitchBase-5ivMydxc.js";import"./FormControl-hzYzaU_O.js";import"./InputLabel-OdKkbQhf.js";import"./Select-LOUEVqMY.js";import"./FormHelperText-7DzgE79G.js";import"./KeyboardArrowRight--ulIzshY.js";function Na(a){return va("MuiAvatarGroup",a)}const Fa=ma("MuiAvatarGroup",["root","avatar"]),Ga=Fa,qa=["children","className","componentsProps","max","spacing","total","variant"],Ae={small:-16,medium:null},Ea=a=>{const{classes:t}=a;return ue({root:["root"],avatar:["avatar"]},Na,t)},Ua=c("div",{name:"MuiAvatarGroup",slot:"Root",overridesResolver:(a,t)=>y({[`& .${Ga.avatar}`]:t.avatar},t.root)})(({theme:a})=>({[`& .${fa.root}`]:{border:`2px solid ${(a.vars||a).palette.background.default}`,boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}},display:"flex",flexDirection:"row-reverse"})),Xa=c(u,{name:"MuiAvatarGroup",slot:"Avatar",overridesResolver:(a,t)=>t.avatar})(({theme:a})=>({border:`2px solid ${(a.vars||a).palette.background.default}`,boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}})),Za=g.forwardRef(function(t,i){var r,d;const n=de({props:t,name:"MuiAvatarGroup"}),{children:x,className:h,componentsProps:o={},max:j=5,spacing:p="medium",total:$,variant:z="circular"}=n,w=pe(n,qa);let T=j<2?2:j;const C=y({},n,{max:j,spacing:p,variant:z}),b=Ea(C),R=g.Children.toArray(x).filter(k=>g.isValidElement(k)),D=$||R.length;D===T&&(T+=1),T=Math.min(D+1,T);const B=Math.min(R.length,T-1),ze=Math.max(D-T,D-B,0),De=p&&Ae[p]!==void 0?Ae[p]:-p;return e.jsxs(Ua,y({ownerState:C,className:q(b.root,h),ref:i},w,{children:[ze?e.jsxs(Xa,y({ownerState:C,variant:z},o.additionalAvatar,{className:q(b.avatar,(r=o.additionalAvatar)==null?void 0:r.className),style:y({marginLeft:De},(d=o.additionalAvatar)==null?void 0:d.style),children:["+",ze]})):null,R.slice(0,B).reverse().map((k,ha)=>g.cloneElement(k,{className:q(k.props.className,b.avatar),style:y({marginLeft:ha===B-1?void 0:De},k.props.style),variant:k.props.variant||z}))]}))}),Le=Za,Ya=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected"],Ka=(a,t)=>{const{ownerState:i}=a;return[t.root,i.dense&&t.dense,i.alignItems==="flex-start"&&t.alignItemsFlexStart,i.divider&&t.divider,!i.disableGutters&&t.gutters]},Ja=a=>{const{alignItems:t,classes:i,dense:r,disabled:d,disableGutters:n,divider:x,selected:h}=a,j=ue({root:["root",r&&"dense",!n&&"gutters",x&&"divider",d&&"disabled",t==="flex-start"&&"alignItemsFlexStart",h&&"selected"]},$a,i);return y({},i,j)},Qa=c(ja,{shouldForwardProp:a=>ga(a)||a==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:Ka})(({theme:a,ownerState:t})=>y({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:a.transitions.create("background-color",{duration:a.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${V.selected}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.primary.mainChannel} / ${a.vars.palette.action.selectedOpacity})`:Z(a.palette.primary.main,a.palette.action.selectedOpacity),[`&.${V.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.primary.mainChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:Z(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}},[`&.${V.selected}:hover`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.primary.mainChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:Z(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?`rgba(${a.vars.palette.primary.mainChannel} / ${a.vars.palette.action.selectedOpacity})`:Z(a.palette.primary.main,a.palette.action.selectedOpacity)}},[`&.${V.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`&.${V.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity}},t.divider&&{borderBottom:`1px solid ${(a.vars||a).palette.divider}`,backgroundClip:"padding-box"},t.alignItems==="flex-start"&&{alignItems:"flex-start"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.dense&&{paddingTop:4,paddingBottom:4})),et=g.forwardRef(function(t,i){const r=de({props:t,name:"MuiListItemButton"}),{alignItems:d="center",autoFocus:n=!1,component:x="div",children:h,dense:o=!1,disableGutters:j=!1,divider:p=!1,focusVisibleClassName:$,selected:z=!1}=r,w=pe(r,Ya),T=g.useContext(oe),C={dense:o||T.dense||!1,alignItems:d,disableGutters:j},b=g.useRef(null);ya(()=>{n&&b.current&&b.current.focus()},[n]);const R=y({},r,{alignItems:d,dense:C.dense,disableGutters:j,divider:p,selected:z}),D=Ja(R),B=ba(b,i);return e.jsx(oe.Provider,{value:C,children:e.jsx(Qa,y({ref:B,href:w.href||w.to,component:(w.href||w.to)&&x==="div"?"a":x,focusVisibleClassName:q(D.focusVisible,$),ownerState:R},w,{classes:D,children:h}))})}),at=et,tt=["className"],rt=a=>{const{alignItems:t,classes:i}=a;return ue({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},Ra,i)},st=c("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:i}=a;return[t.root,i.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(({theme:a,ownerState:t})=>y({minWidth:56,color:(a.vars||a).palette.action.active,flexShrink:0,display:"inline-flex"},t.alignItems==="flex-start"&&{marginTop:8})),nt=g.forwardRef(function(t,i){const r=de({props:t,name:"MuiListItemIcon"}),{className:d}=r,n=pe(r,tt),x=g.useContext(oe),h=y({},r,{alignItems:x.alignItems}),o=rt(h);return e.jsx(st,y({className:q(o.root,d),ownerState:h,ref:i},n))}),it=nt;function ot(a){return Ta({},a)}var He=1440,lt=2520,re=43200,ct=86400;function S(a,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};Ke(2,arguments);var r=i.locale||Ia;if(!r.formatDistance)throw new RangeError("locale must contain formatDistance property");var d=_a(a,t);if(isNaN(d))throw new RangeError("Invalid time value");var n=ot(i);n.addSuffix=!!i.addSuffix,n.comparison=d;var x,h;d>0?(x=Y(t),h=Y(a)):(x=Y(a),h=Y(t));var o=Ma(h,x),j=(Pe(h)-Pe(x))/1e3,p=Math.round((o-j)/60),$;if(p<2)return i.includeSeconds?o<5?r.formatDistance("lessThanXSeconds",5,n):o<10?r.formatDistance("lessThanXSeconds",10,n):o<20?r.formatDistance("lessThanXSeconds",20,n):o<40?r.formatDistance("halfAMinute",null,n):o<60?r.formatDistance("lessThanXMinutes",1,n):r.formatDistance("xMinutes",1,n):p===0?r.formatDistance("lessThanXMinutes",1,n):r.formatDistance("xMinutes",p,n);if(p<45)return r.formatDistance("xMinutes",p,n);if(p<90)return r.formatDistance("aboutXHours",1,n);if(p<He){var z=Math.round(p/60);return r.formatDistance("aboutXHours",z,n)}else{if(p<lt)return r.formatDistance("xDays",1,n);if(p<re){var w=Math.round(p/He);return r.formatDistance("xDays",w,n)}else if(p<ct)return $=Math.round(p/re),r.formatDistance("aboutXMonths",$,n)}if($=wa(h,x),$<12){var T=Math.round(p/re);return r.formatDistance("xMonths",T,n)}else{var C=$%12,b=Math.floor($/12);return C<3?r.formatDistance("aboutXYears",b,n):C<9?r.formatDistance("overXYears",b,n):r.formatDistance("almostXYears",b+1,n)}}function X(a,t){Ke(2,arguments);var i=Sa(t);return Ca(a,-i)}var he={},dt=f;Object.defineProperty(he,"__esModule",{value:!0});var aa=he.default=void 0,pt=dt(v()),Oe=e,ut=(0,pt.default)([(0,Oe.jsx)("path",{d:"M19 17.47c-.88-.07-1.75-.22-2.6-.45l-1.19 1.19c1.2.41 2.48.67 3.8.75v-1.49zM6.54 5h-1.5c.09 1.32.35 2.59.75 3.8l1.2-1.2c-.24-.84-.39-1.71-.45-2.6z",opacity:".3"},"0"),(0,Oe.jsx)("path",{d:"M20 21c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17zm-3.6-3.98c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19zM5.03 5h1.5c.07.89.22 1.76.46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79z"},"1")],"CallTwoTone");aa=he.default=ut;var me={},xt=f;Object.defineProperty(me,"__esModule",{value:!0});var ta=me.default=void 0,ht=xt(v()),Be=e,mt=(0,ht.default)([(0,Be.jsx)("path",{d:"M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zM16 18H4V6h12v12zm-6-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.99 0-1.93.21-2.78.58C6.48 13.9 6 14.62 6 15.43V16h8v-.57z"},"0"),(0,Be.jsx)("path",{d:"M4 18h12V6H4v12zm6-10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 7.43c0-.81.48-1.53 1.22-1.85.85-.37 1.79-.58 2.78-.58.99 0 1.93.21 2.78.58.74.32 1.22 1.04 1.22 1.85V16H6v-.57z",opacity:".3"},"1")],"VideoCameraFrontTwoTone");ta=me.default=mt;var ve={},vt=f;Object.defineProperty(ve,"__esModule",{value:!0});var ra=ve.default=void 0,ft=vt(v()),Ve=e,jt=(0,ft.default)([(0,Ve.jsx)("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z",opacity:".3"},"0"),(0,Ve.jsx)("path",{d:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"},"1")],"InfoTwoTone");ra=ve.default=jt;var fe={},gt=f;Object.defineProperty(fe,"__esModule",{value:!0});var sa=fe.default=void 0,yt=gt(v()),L=e,bt=(0,yt.default)([(0,L.jsx)("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm4.5 2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z",opacity:".3"},"0"),(0,L.jsx)("path",{d:"M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm4 13h-1.77c-1.38 0-2.5 1.12-2.5 2.5 0 .61.22 1.19.63 1.65.06.07.14.19.14.35 0 .28-.22.5-.5.5-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.14 8 7c0 2.21-1.79 4-4 4z"},"1"),(0,L.jsx)("circle",{cx:"6.5",cy:"11.5",r:"1.5"},"2"),(0,L.jsx)("circle",{cx:"9.5",cy:"7.5",r:"1.5"},"3"),(0,L.jsx)("circle",{cx:"14.5",cy:"7.5",r:"1.5"},"4"),(0,L.jsx)("circle",{cx:"17.5",cy:"11.5",r:"1.5"},"5")],"ColorLensTwoTone");sa=fe.default=bt;var je={},$t=f;Object.defineProperty(je,"__esModule",{value:!0});var na=je.default=void 0,Tt=$t(v()),We=e,It=(0,Tt.default)([(0,We.jsx)("path",{d:"M8 17h8v-.24L8.34 9.1C8.12 9.68 8 10.32 8 11v6zm4-10.5c-.19 0-.37.03-.55.06L16 11.1V11c0-2.48-1.51-4.5-4-4.5z",opacity:".3"},"0"),(0,We.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm0-15.5c2.49 0 4 2.02 4 4.5v.1l2 2V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23l1.64 1.64c.18-.02.36-.05.55-.05zM5.41 3.35 4 4.76l2.81 2.81C6.29 8.57 6 9.74 6 11v5l-2 2v1h14.24l1.74 1.74 1.41-1.41L5.41 3.35zM16 17H8v-6c0-.68.12-1.32.34-1.9L16 16.76V17z"},"1")],"NotificationsOffTwoTone");na=je.default=It;var ge={},_t=f;Object.defineProperty(ge,"__esModule",{value:!0});var ia=ge.default=void 0,Mt=_t(v()),F=e,wt=(0,Mt.default)([(0,F.jsx)("path",{d:"M20 12c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",opacity:".3"},"0"),(0,F.jsx)("circle",{cx:"15.5",cy:"9.5",r:"1.5"},"1"),(0,F.jsx)("circle",{cx:"8.5",cy:"9.5",r:"1.5"},"2"),(0,F.jsx)("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"},"3"),(0,F.jsx)("path",{d:"M12 18c2.28 0 4.22-1.66 5-4H7c.78 2.34 2.72 4 5 4z"},"4")],"EmojiEmotionsTwoTone");ia=ge.default=wt;var ye={},Ct=f;Object.defineProperty(ye,"__esModule",{value:!0});var oa=ye.default=void 0,St=Ct(v()),Ne=e,zt=(0,St.default)([(0,Ne.jsx)("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 11.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",opacity:".3"},"0"),(0,Ne.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"},"1")],"CancelTwoTone");oa=ye.default=zt;var be={},Dt=f;Object.defineProperty(be,"__esModule",{value:!0});var la=be.default=void 0,Pt=Dt(v()),Rt=e,kt=(0,Pt.default)((0,Rt.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"}),"BlockTwoTone");la=be.default=kt;var $e={},At=f;Object.defineProperty($e,"__esModule",{value:!0});var ca=$e.default=void 0,Lt=At(v()),Fe=e,Ht=(0,Lt.default)([(0,Fe.jsx)("path",{d:"M4.47 19h15.06L12 5.99 4.47 19zM13 18h-2v-2h2v2zm0-4h-2v-4h2v4z",opacity:".3"},"0"),(0,Fe.jsx)("path",{d:"M1 21h22L12 2 1 21zm3.47-2L12 5.99 19.53 19H4.47zM11 16h2v2h-2zm0-6h2v4h-2z"},"1")],"WarningTwoTone");ca=$e.default=Ht;var Te={},Ot=f;Object.defineProperty(Te,"__esModule",{value:!0});var J=Te.default=void 0,Bt=Ot(v()),Ge=e,Vt=(0,Bt.default)([(0,Ge.jsx)("path",{d:"M13 4H6v16h12V9h-5V4zm3 14H8v-2h8v2zm0-6v2H8v-2h8z",opacity:".3"},"0"),(0,Ge.jsx)("path",{d:"M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"},"1")],"DescriptionTwoTone");J=Te.default=Vt;const Wt=c(s)(({theme:a})=>`
        @media (min-width: ${a.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`),_=c(it)(({theme:a})=>`
        min-width: 36px;
        color: ${a.colors.primary.light};
`),se=c(ka)(({theme:a})=>`
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${a.transitions.create(["color"])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${a.spacing(.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${a.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${a.colors.primary.main};
            }
          }
        }
`);function Nt(){const a=xe(),[t,i]=g.useState(!1),r=()=>{i(!t)},[d,n]=g.useState("section1"),x=h=>(o,j)=>{n(j?h:!1)};return e.jsxs(e.Fragment,{children:[e.jsxs(Wt,{children:[e.jsxs(s,{display:"flex",alignItems:"center",children:[e.jsx(u,{variant:"rounded",sx:{width:48,height:48},alt:"Zain Baptista",src:"/static/images/avatars/1.jpg"}),e.jsxs(s,{ml:1,children:[e.jsx(l,{variant:"h4",children:"Zain Baptista"}),e.jsx(l,{variant:"subtitle1",children:S(X(new Date,8),new Date,{addSuffix:!0})})]})]}),e.jsxs(s,{sx:{display:{xs:"none",lg:"flex"}},children:[e.jsx(M,{placement:"bottom",title:"Start a voice call",children:e.jsx(P,{color:"primary",children:e.jsx(aa,{})})}),e.jsx(M,{placement:"bottom",title:"Start a video call",children:e.jsx(P,{color:"primary",children:e.jsx(ta,{})})}),e.jsx(M,{placement:"bottom",title:"Conversation information",children:e.jsx(P,{color:"primary",onClick:r,children:e.jsx(ra,{})})})]})]}),e.jsx(Je,{sx:{display:{xs:"none",md:"flex"}},variant:"temporary",anchor:a.direction==="rtl"?"left":"right",open:t,onClose:r,elevation:9,children:e.jsxs(s,{sx:{minWidth:360},p:2,children:[e.jsxs(s,{sx:{textAlign:"center"},children:[e.jsx(u,{sx:{mx:"auto",my:2,width:a.spacing(12),height:a.spacing(12)},variant:"rounded",alt:"Zain Baptista",src:"/static/images/avatars/1.jpg"}),e.jsx(l,{variant:"h4",children:"Zain Baptista"}),e.jsxs(l,{variant:"subtitle2",children:["Active"," ",S(X(new Date,7),new Date,{addSuffix:!0})]})]}),e.jsx(U,{sx:{my:3}}),e.jsxs(ae,{expanded:d==="section1",onChange:x("section1"),children:[e.jsx(se,{expandIcon:e.jsx(ee,{}),children:e.jsx(l,{variant:"h5",children:"Customize Chat"})}),e.jsx(te,{sx:{p:0},children:e.jsxs(E,{component:"nav",children:[e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(Qe,{})}),e.jsx(m,{primary:"Search in Conversation",primaryTypographyProps:{variant:"h5"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(sa,{})}),e.jsx(m,{primary:"Change Theme Styling",primaryTypographyProps:{variant:"h5"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(ia,{})}),e.jsx(m,{primary:"Choose Default Emoji",primaryTypographyProps:{variant:"h5"}})]})]})})]}),e.jsxs(ae,{expanded:d==="section2",onChange:x("section2"),children:[e.jsx(se,{expandIcon:e.jsx(ee,{}),children:e.jsx(l,{variant:"h5",children:"Privacy & Support"})}),e.jsx(te,{sx:{p:0},children:e.jsxs(E,{component:"nav",children:[e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(na,{})}),e.jsx(m,{primary:"Turn off notifications",primaryTypographyProps:{variant:"h5"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(oa,{})}),e.jsx(m,{primary:"Ignore all messages",primaryTypographyProps:{variant:"h5"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(la,{})}),e.jsx(m,{primary:"Block user",primaryTypographyProps:{variant:"h5"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(ca,{})}),e.jsx(m,{primary:"Something's Wrong",primaryTypographyProps:{variant:"h5"},secondary:"Report the conversation and provide feedback",secondaryTypographyProps:{variant:"subtitle1"}})]})]})})]}),e.jsxs(ae,{expanded:d==="section3",onChange:x("section3"),children:[e.jsx(se,{expandIcon:e.jsx(ee,{}),children:e.jsx(l,{variant:"h5",children:"Shared Files"})}),e.jsx(te,{sx:{p:0},children:e.jsxs(E,{component:"nav",children:[e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(J,{})}),e.jsx(m,{primary:"HolidayPictures.zip",primaryTypographyProps:{variant:"h5"},secondary:"You opened in the past year",secondaryTypographyProps:{variant:"subtitle1"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(J,{})}),e.jsx(m,{primary:"2021Screenshot.jpg",primaryTypographyProps:{variant:"h5"},secondary:"You edited this file yesterday",secondaryTypographyProps:{variant:"subtitle1"}})]}),e.jsxs(I,{button:!0,children:[e.jsx(_,{children:e.jsx(J,{})}),e.jsx(m,{primary:"PresentationDeck.pdf",primaryTypographyProps:{variant:"h5"},secondary:"Never opened",secondaryTypographyProps:{variant:"subtitle1"}})]})]})})]})]})})]})}var Ie={},Ft=f;Object.defineProperty(Ie,"__esModule",{value:!0});var da=Ie.default=void 0,Gt=Ft(v()),qt=e,Et=(0,Gt.default)((0,qt.jsx)("path",{d:"M12.5 23c3.04 0 5.5-2.46 5.5-5.5V6h-1.5v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5z"}),"AttachFileTwoTone");da=Ie.default=Et;var _e={},Ut=f;Object.defineProperty(_e,"__esModule",{value:!0});var pa=_e.default=void 0,Xt=Ut(v()),qe=e,Zt=(0,Xt.default)([(0,qe.jsx)("path",{d:"m4 8.25 7.51 1-7.5-3.22zm.01 9.72 7.5-3.22-7.51 1z",opacity:".3"},"0"),(0,qe.jsx)("path",{d:"M2.01 3 2 10l15 2-15 2 .01 7L23 12 2.01 3zM4 8.25V6.03l7.51 3.22-7.51-1zm.01 9.72v-2.22l7.51-1-7.51 3.22z"},"1")],"SendTwoTone");pa=_e.default=Zt;const Yt=c(Aa)(({theme:a})=>`
    font-size: ${a.typography.pxToRem(18)};
    padding: ${a.spacing(1)};
    width: 100%;
`),Kt=c("input")({display:"none"});function Jt(){const a=xe(),t={name:"Catherine Pike",avatar:"/static/images/avatars/1.jpg"};return e.jsxs(s,{sx:{background:a.colors.alpha.white[50],display:"flex",alignItems:"center",p:2},children:[e.jsxs(s,{flexGrow:1,display:"flex",alignItems:"center",children:[e.jsx(u,{sx:{display:{xs:"none",sm:"flex"},mr:1},alt:t.name,src:t.avatar}),e.jsx(Yt,{autoFocus:!0,placeholder:"Write your message here...",fullWidth:!0})]}),e.jsxs(s,{children:[e.jsx(M,{arrow:!0,placement:"top",title:"Choose an emoji",children:e.jsx(P,{sx:{fontSize:a.typography.pxToRem(16)},color:"primary",children:"😀"})}),e.jsx(Kt,{accept:"image/*",id:"messenger-upload-file",type:"file"}),e.jsx(M,{arrow:!0,placement:"top",title:"Attach a file",children:e.jsx("label",{htmlFor:"messenger-upload-file",children:e.jsx(P,{sx:{mx:1},color:"primary",component:"span",children:e.jsx(da,{fontSize:"small"})})})}),e.jsx(le,{startIcon:e.jsx(pa,{}),variant:"contained",children:"Send"})]})]})}var Me={},Qt=f;Object.defineProperty(Me,"__esModule",{value:!0});var ua=Me.default=void 0,er=Qt(v()),Ee=e,ar=(0,er.default)([(0,Ee.jsx)("path",{d:"m19.28 8.6-.7-1.21-1.27.51-1.06.43-.91-.7c-.39-.3-.8-.54-1.23-.71l-1.06-.43-.16-1.13L12.7 4h-1.4l-.19 1.35-.16 1.13-1.06.44c-.41.17-.82.41-1.25.73l-.9.68-1.05-.42-1.27-.52-.7 1.21 1.08.84.89.7-.14 1.13c-.03.3-.05.53-.05.73s.02.43.05.73l.14 1.13-.89.7-1.08.84.7 1.21 1.27-.51 1.06-.43.91.7c.39.3.8.54 1.23.71l1.06.43.16 1.13.19 1.36h1.39l.19-1.35.16-1.13 1.06-.43c.41-.17.82-.41 1.25-.73l.9-.68 1.04.42 1.27.51.7-1.21-1.08-.84-.89-.7.14-1.13c.04-.31.05-.52.05-.73 0-.21-.02-.43-.05-.73l-.14-1.13.89-.7 1.1-.84zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",opacity:".3"},"0"),(0,Ee.jsx)("path",{d:"M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"SettingsTwoTone");ua=Me.default=ar;var we={},tr=f;Object.defineProperty(we,"__esModule",{value:!0});var xa=we.default=void 0,rr=tr(v()),sr=e,nr=(0,rr.default)((0,sr.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"}),"CheckTwoTone");xa=we.default=nr;var Ce={},ir=f;Object.defineProperty(Ce,"__esModule",{value:!0});var ce=Ce.default=void 0,or=ir(v()),Ue=e,lr=(0,or.default)([(0,Ue.jsx)("path",{d:"M12 6c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm3.75 10.85L11 14V8h1.5v5.25l4 2.37-.75 1.23z",opacity:".3"},"0"),(0,Ue.jsx)("path",{d:"M12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zm4.837-6.19 4.607 3.845-1.28 1.535-4.61-3.843zm-10.674 0 1.282 1.536L3.337 7.19l-1.28-1.536zM12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"},"1")],"AlarmTwoTone");ce=Ce.default=lr;const cr=c(u)(({theme:a})=>`
          background-color: ${a.colors.success.lighter};
          color: ${a.colors.success.main};
          width: ${a.spacing(8)};
          height: ${a.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `),Xe=c(s)(({theme:a})=>`
          background-color: ${za(a.colors.alpha.black[10],.5)};
          margin: ${a.spacing(2)} 0;
          border-radius: ${a.general.borderRadius};
          padding: ${a.spacing(2)};
    `),dr=c(s)(({theme:a})=>`
        padding: ${a.spacing(2.5)};
  `),H=c(at)(({theme:a})=>`
        &.MuiButtonBase-root {
            margin: ${a.spacing(1)} 0;
        }
  `),pr=c(s)(({theme:a})=>`
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${a.spacing(3)};
                font-size: ${a.typography.pxToRem(16)};
                color: ${a.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${a.colors.alpha.black[100]};
            }
        }
  `);function Ze(){const a={name:"Catherine Pike",avatar:"/static/images/avatars/1.jpg",jobtitle:"Software Developer"},[t,i]=g.useState({invisible:!0}),r=o=>{i({...t,[o.target.name]:o.target.checked})},[d,n]=g.useState("all"),x=[{value:"all",label:"All"},{value:"unread",label:"Unread"},{value:"archived",label:"Archived"}],h=(o,j)=>{n(j)};return e.jsxs(dr,{children:[e.jsxs(s,{display:"flex",alignItems:"flex-start",children:[e.jsx(u,{alt:a.name,src:a.avatar}),e.jsxs(s,{sx:{ml:1.5,flex:1},children:[e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"space-between",children:[e.jsxs(s,{children:[e.jsx(l,{variant:"h5",noWrap:!0,children:a.name}),e.jsx(l,{variant:"subtitle1",noWrap:!0,children:a.jobtitle})]}),e.jsx(P,{sx:{p:1},size:"small",color:"primary",children:e.jsx(ua,{fontSize:"small"})})]}),e.jsx(La,{control:e.jsx(Ha,{checked:t.invisible,onChange:r,name:"invisible",color:"primary"}),label:"Invisible"})]})]}),e.jsx(Oa,{sx:{mt:2,mb:1},size:"small",fullWidth:!0,InputProps:{startAdornment:e.jsx(Ba,{position:"start",children:e.jsx(Qe,{})})},placeholder:"Search..."}),e.jsx(l,{sx:{mb:1,mt:2},variant:"h3",children:"Chats"}),e.jsx(pr,{children:e.jsx(Va,{onChange:h,value:d,variant:"scrollable",scrollButtons:"auto",textColor:"primary",indicatorColor:"primary",children:x.map(o=>e.jsx(Wa,{label:o.label,value:o.value},o.value))})}),e.jsxs(s,{mt:2,children:[d==="all"&&e.jsxs(E,{disablePadding:!0,component:"div",children:[e.jsxs(H,{selected:!0,children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/1.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Zain Baptista",secondary:"Hey there, how are you today? Is it ok if I call you?"}),e.jsx(N,{color:"primary",children:e.jsx("b",{children:"2"})})]}),e.jsxs(H,{children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/2.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Kierra Herwitz",secondary:"Hi! Did you manage to send me those documents"})]}),e.jsxs(H,{children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/3.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Craig Vaccaro",secondary:"Ola, I still haven't received the program schedule"})]}),e.jsxs(H,{children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/4.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Adison Press",secondary:"I recently did some buying on Amazon and now I'm stuck"}),e.jsx(N,{color:"primary",children:e.jsx("b",{children:"8"})})]})]}),d==="unread"&&e.jsxs(E,{disablePadding:!0,component:"div",children:[e.jsxs(H,{children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/1.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Zain Baptista",secondary:"Hey there, how are you today? Is it ok if I call you?"}),e.jsx(N,{color:"primary",children:e.jsx("b",{children:"2"})})]}),e.jsxs(H,{children:[e.jsx(A,{children:e.jsx(u,{src:"/static/images/avatars/4.jpg"})}),e.jsx(m,{sx:{mr:1},primaryTypographyProps:{color:"textPrimary",variant:"h5",noWrap:!0},secondaryTypographyProps:{color:"textSecondary",noWrap:!0},primary:"Adison Press",secondary:"I recently did some buying on Amazon and now I'm stuck"}),e.jsx(N,{color:"primary",children:e.jsx("b",{children:"8"})})]})]}),d==="archived"&&e.jsxs(s,{pb:3,children:[e.jsx(U,{sx:{mb:3}}),e.jsx(cr,{children:e.jsx(xa,{})}),e.jsx(l,{sx:{mt:2,textAlign:"center"},variant:"subtitle2",children:"Hurray! There are no archived chats!"}),e.jsx(U,{sx:{mt:3}})]})]}),e.jsxs(s,{display:"flex",pb:1,mt:4,alignItems:"center",children:[e.jsx(l,{sx:{mr:1},variant:"h3",children:"Meetings"}),e.jsx(N,{color:"success",children:e.jsx("b",{children:"2"})})]}),e.jsxs(Xe,{children:[e.jsx(l,{variant:"h4",children:"Daily Design Meeting"}),e.jsxs(s,{py:3,display:"flex",alignItems:"flex-start",children:[e.jsx(ce,{}),e.jsxs(s,{pl:1,children:[e.jsx(l,{variant:"subtitle2",sx:{lineHeight:1},color:"text.primary",children:"10:00 - 11:30"}),e.jsx(l,{variant:"subtitle1",children:S(X(new Date,12),new Date,{addSuffix:!0})})]})]}),e.jsxs(s,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsxs(Le,{children:[e.jsx(M,{arrow:!0,title:"View profile for Remy Sharp",children:e.jsx(u,{sx:{width:28,height:28},component:W,to:"#",alt:"Remy Sharp",src:"/static/images/avatars/1.jpg"})}),e.jsx(M,{arrow:!0,title:"View profile for Travis Howard",children:e.jsx(u,{sx:{width:28,height:28},component:W,to:"#",alt:"Travis Howard",src:"/static/images/avatars/2.jpg"})}),e.jsx(M,{arrow:!0,title:"View profile for Craig Vaccaro",children:e.jsx(u,{sx:{width:28,height:28},component:W,to:"#",alt:"Craig Vaccaro",src:"/static/images/avatars/3.jpg"})})]}),e.jsx(le,{variant:"contained",size:"small",children:"Attend"})]})]}),e.jsxs(Xe,{children:[e.jsx(l,{variant:"h4",children:"Investors Council Meeting"}),e.jsxs(s,{py:3,display:"flex",alignItems:"flex-start",children:[e.jsx(ce,{}),e.jsxs(s,{pl:1,children:[e.jsx(l,{variant:"subtitle2",sx:{lineHeight:1},color:"text.primary",children:"14:30 - 16:15"}),e.jsx(l,{variant:"subtitle1",children:S(K(new Date,4),new Date,{addSuffix:!0})})]})]}),e.jsxs(s,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsxs(Le,{children:[e.jsx(M,{arrow:!0,title:"View profile for Travis Howard",children:e.jsx(u,{sx:{width:28,height:28},component:W,to:"#",alt:"Travis Howard",src:"/static/images/avatars/4.jpg"})}),e.jsx(M,{arrow:!0,title:"View profile for Craig Vaccaro",children:e.jsx(u,{sx:{width:28,height:28},component:W,to:"#",alt:"Craig Vaccaro",src:"/static/images/avatars/5.jpg"})})]}),e.jsx(le,{variant:"contained",size:"small",children:"Attend"})]})]})]})}var Se={},ur=f;Object.defineProperty(Se,"__esModule",{value:!0});var O=Se.default=void 0,xr=ur(v()),Ye=e,hr=(0,xr.default)([(0,Ye.jsx)("path",{d:"M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.25 12.15L11 13V7h1.5v5.25l4.5 2.67-.75 1.23z",opacity:".3"},"0"),(0,Ye.jsx)("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"},"1")],"ScheduleTwoTone");O=Se.default=hr;const ne=c(U)(({theme:a})=>`
      .MuiDivider-wrapper {
        border-radius: ${a.general.borderRadiusSm};
        text-transform: none;
        background: ${a.palette.background.default};
        font-size: ${a.typography.pxToRem(13)};
        color: ${a.colors.alpha.black[50]};
      }
`),G=c(ea)(({theme:a})=>`
      background: ${a.colors.primary.main};
      color: ${a.palette.primary.contrastText};
      padding: ${a.spacing(2)};
      border-radius: ${a.general.borderRadiusXl};
      border-top-right-radius: ${a.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`),ie=c(ea)(({theme:a})=>`
      background: ${a.colors.alpha.black[10]};
      color: ${a.colors.alpha.black[100]};
      padding: ${a.spacing(2)};
      border-radius: ${a.general.borderRadiusXl};
      border-top-left-radius: ${a.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`);function mr(){const a={name:"Catherine Pike",avatar:"/static/images/avatars/1.jpg"};return e.jsxs(s,{p:3,children:[e.jsx(ne,{children:Re(ke(new Date,3),"MMMM dd yyyy")}),e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",py:3,children:[e.jsx(u,{variant:"rounded",sx:{width:50,height:50},alt:"Zain Baptista",src:"/static/images/avatars/2.jpg"}),e.jsxs(s,{display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"flex-start",ml:2,children:[e.jsx(ie,{children:"Hi. Can you send me the missing invoices asap?"}),e.jsxs(l,{variant:"subtitle1",sx:{pt:1,display:"flex",alignItems:"center"},children:[e.jsx(O,{sx:{mr:.5},fontSize:"small"}),S(K(new Date,115),new Date,{addSuffix:!0})]})]})]}),e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",py:3,children:[e.jsxs(s,{display:"flex",alignItems:"flex-end",flexDirection:"column",justifyContent:"flex-end",mr:2,children:[e.jsx(G,{children:"Yes, I'll email them right now. I'll let you know once the remaining invoices are done."}),e.jsxs(l,{variant:"subtitle1",sx:{pt:1,display:"flex",alignItems:"center"},children:[e.jsx(O,{sx:{mr:.5},fontSize:"small"}),S(K(new Date,125),new Date,{addSuffix:!0})]})]}),e.jsx(u,{variant:"rounded",sx:{width:50,height:50},alt:a.name,src:a.avatar})]}),e.jsx(ne,{children:Re(ke(new Date,5),"MMMM dd yyyy")}),e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",py:3,children:[e.jsxs(s,{display:"flex",alignItems:"flex-end",flexDirection:"column",justifyContent:"flex-end",mr:2,children:[e.jsx(G,{children:"Hey! Are you there?"}),e.jsx(G,{sx:{mt:2},children:"Heeeelloooo????"}),e.jsxs(l,{variant:"subtitle1",sx:{pt:1,display:"flex",alignItems:"center"},children:[e.jsx(O,{sx:{mr:.5},fontSize:"small"}),S(K(new Date,60),new Date,{addSuffix:!0})]})]}),e.jsx(u,{variant:"rounded",sx:{width:50,height:50},alt:a.name,src:a.avatar})]}),e.jsx(ne,{children:"Today"}),e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",py:3,children:[e.jsx(u,{variant:"rounded",sx:{width:50,height:50},alt:"Zain Baptista",src:"/static/images/avatars/2.jpg"}),e.jsxs(s,{display:"flex",alignItems:"flex-start",flexDirection:"column",justifyContent:"flex-start",ml:2,children:[e.jsx(ie,{children:"Hey there!"}),e.jsx(ie,{sx:{mt:1},children:"How are you? Is it ok if I call you?"}),e.jsxs(l,{variant:"subtitle1",sx:{pt:1,display:"flex",alignItems:"center"},children:[e.jsx(O,{sx:{mr:.5},fontSize:"small"}),S(X(new Date,6),new Date,{addSuffix:!0})]})]})]}),e.jsxs(s,{display:"flex",alignItems:"flex-start",justifyContent:"flex-end",py:3,children:[e.jsxs(s,{display:"flex",alignItems:"flex-end",flexDirection:"column",justifyContent:"flex-end",mr:2,children:[e.jsx(G,{children:"Hello, I just got my Amazon order shipped and I’m very happy about that."}),e.jsx(G,{sx:{mt:1},children:"Can you confirm?"}),e.jsxs(l,{variant:"subtitle1",sx:{pt:1,display:"flex",alignItems:"center"},children:[e.jsx(O,{sx:{mr:.5},fontSize:"small"}),S(X(new Date,8),new Date,{addSuffix:!0})]})]}),e.jsx(u,{variant:"rounded",sx:{width:50,height:50},alt:a.name,src:a.avatar})]})]})}const vr=c(s)(({theme:a})=>`
       height: calc(100vh - ${a.header.height});
       display: flex;
`),fr=c(s)(({theme:a})=>`
        width: 300px;
        background: ${a.colors.alpha.white[100]};
        border-right: ${a.colors.alpha.black[10]} solid 1px;
`),jr=c(s)(()=>`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`),gr=c(s)(({theme:a})=>`
        background: ${a.colors.alpha.white[100]};
        border-bottom: ${a.colors.alpha.black[10]} solid 1px;
        padding: ${a.spacing(2)};
        align-items: center;
`),yr=c(P)(({theme:a})=>`
  width: ${a.spacing(4)};
  height: ${a.spacing(4)};
  background: ${a.colors.alpha.white[100]};
`),br=c(Je)(()=>`
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`);function Ur(){const a=xe(),[t,i]=g.useState(!1),r=()=>{i(!t)};return e.jsxs(e.Fragment,{children:[e.jsx(Da,{children:e.jsx("title",{children:"Messenger - Applications"})}),e.jsxs(vr,{className:"Mui-FixedWrapper",children:[e.jsx(br,{sx:{display:{lg:"none",xs:"inline-block"}},variant:"temporary",anchor:a.direction==="rtl"?"right":"left",open:t,onClose:r,children:e.jsx(Q,{children:e.jsx(Ze,{})})}),e.jsx(fr,{sx:{display:{xs:"none",lg:"inline-block"}},children:e.jsx(Q,{children:e.jsx(Ze,{})})}),e.jsxs(jr,{children:[e.jsxs(gr,{sx:{display:{xs:"flex",lg:"inline-block"}},children:[e.jsx(yr,{sx:{display:{lg:"none",xs:"flex"},mr:2},color:"primary",onClick:r,size:"small",children:e.jsx(Pa,{})}),e.jsx(Nt,{})]}),e.jsx(s,{flex:1,children:e.jsx(Q,{children:e.jsx(mr,{})})}),e.jsx(U,{}),e.jsx(Jt,{})]})]})]})}export{Ur as default};
