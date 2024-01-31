import{i as tr,k as ir,s as n,q as or,r as N,m as nr,n as lr,j as r,_ as cr,o as L,p as dr,N as j,O as m,B as s,a2 as pr,P as f,Q as y,T as a,a as p,A as x,g as K,S as o,U as xr,V as c,a3 as hr,X as ur,a4 as jr,W as mr}from"./index-RN40GIN3.js";import{C as u,F as gr}from"./index-_sfl2CT1.js";import{d as vr}from"./MoreHorizTwoTone-2YQ7fqFO.js";import{C as l}from"./Card-_T_mgdHf.js";import{C as fr}from"./CardMedia-5HvVokjG.js";import{d as Q}from"./AddTwoTone-WXoqmA6f.js";import{G as i}from"./Grid-Eqeh4S9L.js";import{L as d}from"./ListItemText-LP5BUS3b.js";import{L as w}from"./ListItemAvatar-ORTRWRCY.js";import{d as P}from"./DeleteTwoTone-rQEkRLJH.js";import{F as B}from"./FormControlLabel-8nvg-ha1.js";import{R as F}from"./Radio-njAvA_46.js";import{C as yr}from"./CardContent-StIXZN0g.js";import{C as br}from"./Container-JzitWhMj.js";import"./listItemTextClasses-Grt4FLsb.js";import"./useFormControl-ymE63IOh.js";import"./SwitchBase-5ivMydxc.js";function $r(e){return ir("MuiCardActionArea",e)}const Cr=tr("MuiCardActionArea",["root","focusVisible","focusHighlight"]),A=Cr,wr=["children","className","focusVisibleClassName"],Ar=e=>{const{classes:t}=e;return dr({root:["root"],focusHighlight:["focusHighlight"]},$r,t)},Tr=n(or,{name:"MuiCardActionArea",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>({display:"block",textAlign:"inherit",width:"100%",[`&:hover .${A.focusHighlight}`]:{opacity:(e.vars||e).palette.action.hoverOpacity,"@media (hover: none)":{opacity:0}},[`&.${A.focusVisible} .${A.focusHighlight}`]:{opacity:(e.vars||e).palette.action.focusOpacity}})),_r=n("span",{name:"MuiCardActionArea",slot:"FocusHighlight",overridesResolver:(e,t)=>t.focusHighlight})(({theme:e})=>({overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})})),kr=N.forwardRef(function(t,g){const h=nr({props:t,name:"MuiCardActionArea"}),{children:v,className:b,focusVisibleClassName:ar}=h,sr=lr(h,wr),$=h,C=Ar($);return r.jsxs(Tr,cr({className:L(C.root,b),focusVisibleClassName:L(ar,C.focusVisible),ref:g,ownerState:$},sr,{children:[v,r.jsx(_r,{className:C.focusHighlight,ownerState:$})]}))}),Ir=kr;var k={},Rr=m;Object.defineProperty(k,"__esModule",{value:!0});var X=k.default=void 0,Sr=Rr(j()),Mr=r,zr=(0,Sr.default)((0,Mr.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBackTwoTone");X=k.default=zr;var I={},Lr=m;Object.defineProperty(I,"__esModule",{value:!0});var Y=I.default=void 0,Pr=Lr(j()),Br=r,Fr=(0,Pr.default)((0,Br.jsx)("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"}),"ArrowForwardTwoTone");Y=I.default=Fr;var R={},Wr=m;Object.defineProperty(R,"__esModule",{value:!0});var _=R.default=void 0,Hr=Wr(j()),W=r,Vr=(0,Hr.default)([(0,W.jsx)("path",{d:"M9.83 8H11v6h2V8h1.17L12 5.83z",opacity:".3"},"0"),(0,W.jsx)("path",{d:"m12 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2V8H9.83L12 5.83 14.17 8H13zM5 18h14v2H5z"},"1")],"UploadTwoTone");_=R.default=Vr;const H=n("input")({display:"none"}),Dr=n(l)(({theme:e})=>`

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${e.spacing(9)};
    margin-left: ${e.spacing(2)};

    .MuiAvatar-root {
      width: ${e.spacing(16)};
      height: ${e.spacing(16)};
    }
`),Or=n(s)(({theme:e})=>`
    position: absolute;
    width: ${e.spacing(4)};
    height: ${e.spacing(4)};
    bottom: -${e.spacing(1)};
    right: -${e.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${e.colors.primary.main};
      color: ${e.palette.primary.contrastText};
      box-shadow: ${e.colors.shadows.primary};
      width: ${e.spacing(4)};
      height: ${e.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${e.colors.primary.dark};
      }
    }
`),Ur=n(l)(({theme:e})=>`
    position: relative;

    .MuiCardMedia-root {
      height: ${e.spacing(26)};
    }
`),qr=n(s)(({theme:e})=>`
    position: absolute;
    right: ${e.spacing(2)};
    bottom: ${e.spacing(2)};
`),J=({user:e})=>r.jsxs(r.Fragment,{children:[r.jsxs(s,{display:"flex",mb:3,children:[r.jsx(f,{arrow:!0,placement:"top",title:"Go back",children:r.jsx(y,{color:"primary",sx:{p:2,mr:2},children:r.jsx(X,{})})}),r.jsxs(s,{children:[r.jsxs(a,{variant:"h3",component:"h3",gutterBottom:!0,children:["Profile for ",e.name]}),r.jsx(a,{variant:"subtitle2",children:"This is a profile page. Easy to modify, always blazing fast"})]})]}),r.jsxs(Ur,{children:[r.jsx(fr,{image:e.coverImg}),r.jsxs(qr,{children:[r.jsx(H,{accept:"image/*",id:"change-cover",multiple:!0,type:"file"}),r.jsx("label",{htmlFor:"change-cover",children:r.jsx(p,{startIcon:r.jsx(_,{}),variant:"contained",component:"span",children:"Change cover"})})]})]}),r.jsxs(Dr,{children:[r.jsx(x,{variant:"rounded",alt:e.name,src:e.avatar}),r.jsxs(Or,{children:[r.jsx(H,{accept:"image/*",id:"icon-button-file",name:"icon-button-file",type:"file"}),r.jsx("label",{htmlFor:"icon-button-file",children:r.jsx(y,{component:"span",color:"primary",children:r.jsx(_,{})})})]})]}),r.jsxs(s,{py:2,pl:2,mb:3,children:[r.jsx(a,{gutterBottom:!0,variant:"h4",children:e.name}),r.jsx(a,{variant:"subtitle2",children:e.description}),r.jsxs(a,{sx:{py:2},variant:"subtitle2",color:"text.primary",children:[e.jobtitle," | ",e.location," | ",e.followers," followers"]}),r.jsxs(s,{display:{xs:"block",md:"flex"},alignItems:"center",justifyContent:"space-between",children:[r.jsxs(s,{children:[r.jsx(p,{size:"small",variant:"contained",children:"Follow"}),r.jsx(p,{size:"small",sx:{mx:1},variant:"outlined",children:"View website"}),r.jsx(y,{color:"primary",sx:{p:.5},children:r.jsx(vr,{})})]}),r.jsxs(p,{sx:{mt:{xs:2,md:0}},size:"small",variant:"text",endIcon:r.jsx(Y,{}),children:["See all ",e.followers," connections"]})]})]})]});J.propTypes={user:pr.object.isRequired};var S={},Er=m;Object.defineProperty(S,"__esModule",{value:!0});var Z=S.default=void 0,Gr=Er(j()),V=r,Nr=(0,Gr.default)([(0,V.jsx)("path",{d:"M18 20H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z",opacity:".3"},"0"),(0,V.jsx)("path",{d:"M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"},"1")],"ShoppingBagTwoTone");Z=S.default=Nr;var M={},Kr=m;Object.defineProperty(M,"__esModule",{value:!0});var rr=M.default=void 0,Qr=Kr(j()),D=r,Xr=(0,Qr.default)([(0,D.jsx)("path",{d:"M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5z",opacity:".3"},"0"),(0,D.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"},"1")],"FavoriteTwoTone");rr=M.default=Xr;var z={},Yr=m;Object.defineProperty(z,"__esModule",{value:!0});var er=z.default=void 0,Jr=Yr(j()),O=r,Zr=(0,Jr.default)([(0,O.jsx)("path",{d:"m12 15.4-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z",opacity:".3"},"0"),(0,O.jsx)("path",{d:"m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"},"1")],"StarTwoTone");er=z.default=Zr;const T=n(x)(({theme:e})=>`
      background: ${e.colors.primary.lighter};
      color: ${e.colors.primary.main};
      width: ${e.spacing(7)};
      height: ${e.spacing(7)};
`);function re(){const e=K();return r.jsxs(l,{children:[r.jsx(u,{title:"Recent Activity"}),r.jsx(o,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(T,{children:r.jsx(Z,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Orders"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Total"}),r.jsx(a,{variant:"h2",children:"485"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Failed"}),r.jsx(a,{variant:"h2",children:"8"})]})]})]})]}),r.jsx(o,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(T,{children:r.jsx(rr,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Favourites"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Products"}),r.jsx(a,{variant:"h2",children:"64"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Lists"}),r.jsx(a,{variant:"h2",children:"15"})]})]})]})]}),r.jsx(o,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(T,{children:r.jsx(er,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Reviews"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Total"}),r.jsx(a,{variant:"h2",children:"654"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Useful"}),r.jsx(a,{variant:"h2",children:"21"})]})]})]})]})]})}function ee(){const e=[{name:"Munroe Dacks",jobtitle:"Senior Accountant",company:"Trudoo",avatar:"/static/images/avatars/1.jpg"},{name:"Gunilla Canario",jobtitle:"Associate Professor",company:"Buzzdog",avatar:"/static/images/avatars/2.jpg"},{name:"Rowena Geistmann",jobtitle:"Pharmacist",company:"Yozio",avatar:"/static/images/avatars/3.jpg"},{name:"Ede Stoving",jobtitle:"VP Operations",company:"Cogibox",avatar:"/static/images/avatars/4.jpg"},{name:"Crissy Spere",jobtitle:"Social Worker",company:"Babbleblab",avatar:"/static/images/avatars/5.jpg"},{name:"Michel Greatbanks",jobtitle:"Research Assistant III",company:"Aimbu",avatar:"/static/images/avatars/6.jpg"}];return r.jsxs(l,{children:[r.jsx(u,{title:"Followers Feed"}),r.jsx(o,{}),r.jsx(s,{p:2,children:r.jsx(i,{container:!0,spacing:0,children:e.map(t=>r.jsx(i,{item:!0,xs:12,sm:6,lg:4,children:r.jsxs(s,{p:3,display:"flex",alignItems:"flex-start",children:[r.jsx(x,{src:t.avatar}),r.jsxs(s,{pl:2,children:[r.jsx(a,{gutterBottom:!0,variant:"subtitle2",children:t.company}),r.jsx(a,{variant:"h4",gutterBottom:!0,children:t.name}),r.jsx(a,{color:"text.primary",sx:{pb:2},children:t.jobtitle}),r.jsx(p,{variant:"outlined",size:"small",startIcon:r.jsx(Q,{}),children:"Follow"})]})]})},t.name))})})]})}const ae=n(xr)(()=>`
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`);function se(){const e=K();return r.jsxs(l,{sx:{height:"100%"},children:[r.jsx(u,{title:"Popular Tags"}),r.jsx(o,{}),r.jsxs(ae,{disablePadding:!0,children:[r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#HTML"})}),r.jsx(o,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#software_development"})}),r.jsx(o,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#TrendingInfuencers"})}),r.jsx(o,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#investorsWatch2022"})}),r.jsx(o,{}),r.jsx(hr,{children:r.jsx(a,{sx:{py:1.5},variant:"h4",color:"text.primary",children:"Groups"})}),r.jsx(o,{}),r.jsxs(c,{button:!0,children:[r.jsx(w,{children:r.jsx(x,{sx:{width:38,height:38,background:`${e.colors.info.main}`,color:`${e.palette.info.contrastText}`},children:"WD"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Web Designers Lounge"})]}),r.jsx(o,{}),r.jsxs(c,{button:!0,children:[r.jsx(w,{children:r.jsx(x,{sx:{width:38,height:38,background:`${e.colors.alpha.black[100]}`,color:`${e.colors.alpha.white[100]}`},children:"D"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Writer’s Digest Daily"})]}),r.jsx(o,{}),r.jsxs(c,{button:!0,children:[r.jsx(w,{children:r.jsx(x,{sx:{width:38,height:38},src:"/static/images/logo/google.svg"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Google Developers"})]})]})]})}const te=n(x)(({theme:e})=>`
        background: ${e.colors.alpha.black[5]};
        color: ${e.colors.primary.main};
        width: ${e.spacing(8)};
        height: ${e.spacing(8)};
`),U=n("img")(({theme:e})=>`
      border: 1px solid ${e.colors.alpha.black[30]};
      border-radius: ${e.general.borderRadius};
      padding: ${e.spacing(1)};
      margin-right: ${e.spacing(2)};
      background: ${e.colors.alpha.white[100]};
`),ie=n(l)(({theme:e})=>`
        border: ${e.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${e.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${e.colors.alpha.black[100]};
        }
`),q=n(y)(({theme:e})=>`
     background: ${e.colors.error.lighter};
     color: ${e.colors.error.main};
     padding: ${e.spacing(.5)};

     &:hover {
      background: ${ur(e.colors.error.lighter,.4)};
     }
`),E=n(l)(({theme:e})=>`
     border: 1px solid ${e.colors.alpha.black[30]};
     background: ${e.colors.alpha.black[5]};
     box-shadow: none;
`);function oe(){const e={savedCards:7},[t,g]=N.useState("a"),h=b=>{g(b.target.value)},v=()=>{};return r.jsxs(l,{children:[r.jsx(u,{subheader:e.savedCards+" saved cards",title:"Cards"}),r.jsx(o,{}),r.jsx(s,{p:3,children:r.jsxs(i,{container:!0,spacing:3,children:[r.jsx(i,{item:!0,xs:12,sm:6,children:r.jsxs(E,{sx:{px:2,pt:2,pb:1},children:[r.jsxs(s,{display:"flex",alignItems:"center",children:[r.jsx(U,{src:"/static/images/placeholders/logo/visa.png",alt:"Visa"}),r.jsxs(s,{children:[r.jsx(a,{variant:"h3",fontWeight:"normal",children:"•••• 6879"}),r.jsxs(a,{variant:"subtitle2",children:["Expires:"," ",r.jsx(a,{component:"span",color:"text.primary",children:"12/24"})]})]})]}),r.jsxs(s,{pt:3,display:"flex",alignItems:"center",justifyContent:"space-between",children:[r.jsx(B,{value:"a",control:r.jsx(F,{checked:t==="a",onChange:h,value:"a",color:"primary",name:"primary-card"}),label:"Primary"}),r.jsx(f,{arrow:!0,title:"Remove this card",children:r.jsx(q,{onClick:()=>v(),children:r.jsx(P,{fontSize:"small"})})})]})]})}),r.jsx(i,{item:!0,xs:12,sm:6,children:r.jsxs(E,{sx:{px:2,pt:2,pb:1},children:[r.jsxs(s,{display:"flex",alignItems:"center",children:[r.jsx(U,{src:"/static/images/placeholders/logo/mastercard.png",alt:"Visa"}),r.jsxs(s,{children:[r.jsx(a,{variant:"h3",fontWeight:"normal",children:"•••• 4634"}),r.jsxs(a,{variant:"subtitle2",children:["Expires:"," ",r.jsx(a,{component:"span",color:"text.primary",children:"6/22"})]})]})]}),r.jsxs(s,{pt:3,display:"flex",alignItems:"center",justifyContent:"space-between",children:[r.jsx(B,{value:"b",control:r.jsx(F,{checked:t==="b",onChange:h,value:"b",color:"primary",name:"primary-card"}),label:"Primary"}),r.jsx(f,{arrow:!0,title:"Remove this card",children:r.jsx(q,{onClick:()=>v(),children:r.jsx(P,{fontSize:"small"})})})]})]})}),r.jsx(i,{item:!0,xs:12,sm:6,children:r.jsx(f,{arrow:!0,title:"Click to add a new card",children:r.jsx(ie,{children:r.jsx(Ir,{sx:{px:1},children:r.jsx(yr,{children:r.jsx(te,{children:r.jsx(Q,{fontSize:"large"})})})})})})})]})})]})}const G=jr(r.jsx("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"}),"ArrowForwardTwoTone");function ne(){const e={delivery:12,shipping:8};return r.jsxs(i,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[r.jsx(i,{item:!0,xs:12,sm:6,children:r.jsxs(l,{children:[r.jsx(u,{title:"Delivery Addresses",subheader:e.delivery+" saved addresses"}),r.jsx(o,{}),r.jsxs(s,{p:2,children:[r.jsx(a,{variant:"caption",fontWeight:"bold",children:"Favourite"}),r.jsxs(s,{sx:{minHeight:{xs:0,md:242}},p:2,children:[r.jsx(a,{variant:"h5",children:"Kadin Westervelt"}),r.jsx(a,{variant:"h5",sx:{py:1},fontWeight:"normal",children:"714-650-6297"}),r.jsx(a,{variant:"subtitle1",children:"348 W. Goldfield Street Bethel Park, PA 15102"})]}),r.jsx(p,{fullWidth:!0,variant:"outlined",endIcon:r.jsx(G,{}),children:"Manage"})]})]})}),r.jsx(i,{item:!0,xs:12,sm:6,children:r.jsxs(l,{children:[r.jsx(u,{title:"Shipping Addresses",subheader:e.shipping+" saved addresses"}),r.jsx(o,{}),r.jsxs(s,{p:2,children:[r.jsx(a,{variant:"caption",fontWeight:"bold",children:"Favourite"}),r.jsxs(s,{sx:{minHeight:{xs:0,md:242}},p:2,children:[r.jsx(a,{variant:"h5",children:"Kadin Westervelt"}),r.jsx(a,{variant:"h5",sx:{py:1},fontWeight:"normal",children:"714-650-6297"}),r.jsx(a,{variant:"subtitle1",children:"10 E. Wrangler Avenue Sioux Falls, SD 57103"})]}),r.jsx(p,{fullWidth:!0,variant:"outlined",endIcon:r.jsx(G,{}),children:"Manage"})]})]})})]})}function Ae(){const e={savedCards:7,name:"Catherine Pike",coverImg:"/static/images/placeholders/covers/5.jpg",avatar:"/static/images/avatars/4.jpg",description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",jobtitle:"Web Developer",location:"Barcelona, Spain",followers:"465"};return r.jsxs(r.Fragment,{children:[r.jsx(mr,{children:r.jsx("title",{children:"User Details - Management"})}),r.jsx(br,{sx:{mt:3},maxWidth:"lg",children:r.jsxs(i,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[r.jsx(i,{item:!0,xs:12,md:8,children:r.jsx(J,{user:e})}),r.jsx(i,{item:!0,xs:12,md:4,children:r.jsx(re,{})}),r.jsx(i,{item:!0,xs:12,md:8,children:r.jsx(ee,{})}),r.jsx(i,{item:!0,xs:12,md:4,children:r.jsx(se,{})}),r.jsx(i,{item:!0,xs:12,md:7,children:r.jsx(oe,{})}),r.jsx(i,{item:!0,xs:12,md:5,children:r.jsx(ne,{})})]})}),r.jsx(gr,{})]})}export{Ae as default};
