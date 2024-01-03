import{m as j,n as u,j as r,s as o,B as s,a4 as Q,w as m,N as v,T as a,a as x,A as p,l as V,D as i,q as X,t as c,v as d,a9 as Z,o as g,R as rr,r as er,aa as ar,W as sr}from"./index-9lkQUlNG.js";import{C as h,F as tr}from"./index-6z5A6YgQ.js";import{d as ir}from"./MoreHorizTwoTone-CB78cudT.js";import{C as n}from"./Card-0NMuTcO3.js";import{C as or}from"./CardMedia-FXWsWUVT.js";import{d as q}from"./AddTwoTone-VZV2cqWv.js";import{G as t}from"./Grid-dpMjCYlK.js";import{d as S}from"./DeleteTwoTone-my5jxeJu.js";import{F as z}from"./FormControlLabel-HcH3OfZv.js";import{R}from"./Radio-VHW-aV_B.js";import{C as nr}from"./CardActionArea-L2oxhVMC.js";import{C as lr}from"./CardContent-cJndBEpe.js";import{C as cr}from"./Container-qmmmC6zp.js";import"./SwitchBase-buvszcXd.js";var b={},dr=u;Object.defineProperty(b,"__esModule",{value:!0});var E=b.default=void 0,xr=dr(j()),pr=r,hr=(0,xr.default)((0,pr.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBackTwoTone");E=b.default=hr;var $={},jr=u;Object.defineProperty($,"__esModule",{value:!0});var G=$.default=void 0,ur=jr(j()),mr=r,vr=(0,ur.default)((0,mr.jsx)("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"}),"ArrowForwardTwoTone");G=$.default=vr;var w={},gr=u;Object.defineProperty(w,"__esModule",{value:!0});var y=w.default=void 0,fr=gr(j()),A=r,yr=(0,fr.default)([(0,A.jsx)("path",{d:"M9.83 8H11v6h2V8h1.17L12 5.83z",opacity:".3"},"0"),(0,A.jsx)("path",{d:"m12 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2V8H9.83L12 5.83 14.17 8H13zM5 18h14v2H5z"},"1")],"UploadTwoTone");y=w.default=yr;const M=o("input")({display:"none"}),br=o(n)(({theme:e})=>`

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${e.spacing(9)};
    margin-left: ${e.spacing(2)};

    .MuiAvatar-root {
      width: ${e.spacing(16)};
      height: ${e.spacing(16)};
    }
`),$r=o(s)(({theme:e})=>`
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
`),wr=o(n)(({theme:e})=>`
    position: relative;

    .MuiCardMedia-root {
      height: ${e.spacing(26)};
    }
`),Tr=o(s)(({theme:e})=>`
    position: absolute;
    right: ${e.spacing(2)};
    bottom: ${e.spacing(2)};
`),O=({user:e})=>r.jsxs(r.Fragment,{children:[r.jsxs(s,{display:"flex",mb:3,children:[r.jsx(m,{arrow:!0,placement:"top",title:"Go back",children:r.jsx(v,{color:"primary",sx:{p:2,mr:2},children:r.jsx(E,{})})}),r.jsxs(s,{children:[r.jsxs(a,{variant:"h3",component:"h3",gutterBottom:!0,children:["Profile for ",e.name]}),r.jsx(a,{variant:"subtitle2",children:"This is a profile page. Easy to modify, always blazing fast"})]})]}),r.jsxs(wr,{children:[r.jsx(or,{image:e.coverImg}),r.jsxs(Tr,{children:[r.jsx(M,{accept:"image/*",id:"change-cover",multiple:!0,type:"file"}),r.jsx("label",{htmlFor:"change-cover",children:r.jsx(x,{startIcon:r.jsx(y,{}),variant:"contained",component:"span",children:"Change cover"})})]})]}),r.jsxs(br,{children:[r.jsx(p,{variant:"rounded",alt:e.name,src:e.avatar}),r.jsxs($r,{children:[r.jsx(M,{accept:"image/*",id:"icon-button-file",name:"icon-button-file",type:"file"}),r.jsx("label",{htmlFor:"icon-button-file",children:r.jsx(v,{component:"span",color:"primary",children:r.jsx(y,{})})})]})]}),r.jsxs(s,{py:2,pl:2,mb:3,children:[r.jsx(a,{gutterBottom:!0,variant:"h4",children:e.name}),r.jsx(a,{variant:"subtitle2",children:e.description}),r.jsxs(a,{sx:{py:2},variant:"subtitle2",color:"text.primary",children:[e.jobtitle," | ",e.location," | ",e.followers," followers"]}),r.jsxs(s,{display:{xs:"block",md:"flex"},alignItems:"center",justifyContent:"space-between",children:[r.jsxs(s,{children:[r.jsx(x,{size:"small",variant:"contained",children:"Follow"}),r.jsx(x,{size:"small",sx:{mx:1},variant:"outlined",children:"View website"}),r.jsx(v,{color:"primary",sx:{p:.5},children:r.jsx(ir,{})})]}),r.jsxs(x,{sx:{mt:{xs:2,md:0}},size:"small",variant:"text",endIcon:r.jsx(G,{}),children:["See all ",e.followers," connections"]})]})]})]});O.propTypes={user:Q.object.isRequired};var T={},Cr=u;Object.defineProperty(T,"__esModule",{value:!0});var U=T.default=void 0,_r=Cr(j()),L=r,kr=(0,_r.default)([(0,L.jsx)("path",{d:"M18 20H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z",opacity:".3"},"0"),(0,L.jsx)("path",{d:"M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"},"1")],"ShoppingBagTwoTone");U=T.default=kr;var C={},Ir=u;Object.defineProperty(C,"__esModule",{value:!0});var K=C.default=void 0,Sr=Ir(j()),P=r,zr=(0,Sr.default)([(0,P.jsx)("path",{d:"M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5z",opacity:".3"},"0"),(0,P.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"},"1")],"FavoriteTwoTone");K=C.default=zr;var _={},Rr=u;Object.defineProperty(_,"__esModule",{value:!0});var N=_.default=void 0,Ar=Rr(j()),B=r,Mr=(0,Ar.default)([(0,B.jsx)("path",{d:"m12 15.4-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z",opacity:".3"},"0"),(0,B.jsx)("path",{d:"m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"},"1")],"StarTwoTone");N=_.default=Mr;const f=o(p)(({theme:e})=>`
      background: ${e.colors.primary.lighter};
      color: ${e.colors.primary.main};
      width: ${e.spacing(7)};
      height: ${e.spacing(7)};
`);function Lr(){const e=V();return r.jsxs(n,{children:[r.jsx(h,{title:"Recent Activity"}),r.jsx(i,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(f,{children:r.jsx(U,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Orders"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Total"}),r.jsx(a,{variant:"h2",children:"485"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Failed"}),r.jsx(a,{variant:"h2",children:"8"})]})]})]})]}),r.jsx(i,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(f,{children:r.jsx(K,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Favourites"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Products"}),r.jsx(a,{variant:"h2",children:"64"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Lists"}),r.jsx(a,{variant:"h2",children:"15"})]})]})]})]}),r.jsx(i,{}),r.jsxs(s,{px:2,py:4,display:"flex",alignItems:"flex-start",children:[r.jsx(f,{children:r.jsx(N,{})}),r.jsxs(s,{pl:2,flex:1,children:[r.jsx(a,{variant:"h3",children:"Reviews"}),r.jsxs(s,{pt:2,display:"flex",children:[r.jsxs(s,{pr:8,children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Total"}),r.jsx(a,{variant:"h2",children:"654"})]}),r.jsxs(s,{children:[r.jsx(a,{gutterBottom:!0,variant:"caption",sx:{fontSize:`${e.typography.pxToRem(16)}`},children:"Useful"}),r.jsx(a,{variant:"h2",children:"21"})]})]})]})]})]})}function Pr(){const e=[{name:"Munroe Dacks",jobtitle:"Senior Accountant",company:"Trudoo",avatar:"/static/images/avatars/1.jpg"},{name:"Gunilla Canario",jobtitle:"Associate Professor",company:"Buzzdog",avatar:"/static/images/avatars/2.jpg"},{name:"Rowena Geistmann",jobtitle:"Pharmacist",company:"Yozio",avatar:"/static/images/avatars/3.jpg"},{name:"Ede Stoving",jobtitle:"VP Operations",company:"Cogibox",avatar:"/static/images/avatars/4.jpg"},{name:"Crissy Spere",jobtitle:"Social Worker",company:"Babbleblab",avatar:"/static/images/avatars/5.jpg"},{name:"Michel Greatbanks",jobtitle:"Research Assistant III",company:"Aimbu",avatar:"/static/images/avatars/6.jpg"}];return r.jsxs(n,{children:[r.jsx(h,{title:"Followers Feed"}),r.jsx(i,{}),r.jsx(s,{p:2,children:r.jsx(t,{container:!0,spacing:0,children:e.map(l=>r.jsx(t,{item:!0,xs:12,sm:6,lg:4,children:r.jsxs(s,{p:3,display:"flex",alignItems:"flex-start",children:[r.jsx(p,{src:l.avatar}),r.jsxs(s,{pl:2,children:[r.jsx(a,{gutterBottom:!0,variant:"subtitle2",children:l.company}),r.jsx(a,{variant:"h4",gutterBottom:!0,children:l.name}),r.jsx(a,{color:"text.primary",sx:{pb:2},children:l.jobtitle}),r.jsx(x,{variant:"outlined",size:"small",startIcon:r.jsx(q,{}),children:"Follow"})]})]})},l.name))})})]})}const Br=o(X)(()=>`
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`);function Fr(){const e=V();return r.jsxs(n,{sx:{height:"100%"},children:[r.jsx(h,{title:"Popular Tags"}),r.jsx(i,{}),r.jsxs(Br,{disablePadding:!0,children:[r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#HTML"})}),r.jsx(i,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#software_development"})}),r.jsx(i,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#TrendingInfuencers"})}),r.jsx(i,{}),r.jsx(c,{sx:{color:`${e.colors.primary.main}`,"&:hover":{color:`${e.colors.primary.dark}`}},button:!0,children:r.jsx(d,{primary:"#investorsWatch2022"})}),r.jsx(i,{}),r.jsx(Z,{children:r.jsx(a,{sx:{py:1.5},variant:"h4",color:"text.primary",children:"Groups"})}),r.jsx(i,{}),r.jsxs(c,{button:!0,children:[r.jsx(g,{children:r.jsx(p,{sx:{width:38,height:38,background:`${e.colors.info.main}`,color:`${e.palette.info.contrastText}`},children:"WD"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Web Designers Lounge"})]}),r.jsx(i,{}),r.jsxs(c,{button:!0,children:[r.jsx(g,{children:r.jsx(p,{sx:{width:38,height:38,background:`${e.colors.alpha.black[100]}`,color:`${e.colors.alpha.white[100]}`},children:"D"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Writer’s Digest Daily"})]}),r.jsx(i,{}),r.jsxs(c,{button:!0,children:[r.jsx(g,{children:r.jsx(p,{sx:{width:38,height:38},src:"/static/images/logo/google.svg"})}),r.jsx(d,{primaryTypographyProps:{variant:"h5",color:`${e.colors.alpha.black[100]}`},primary:"Google Developers"})]})]})]})}const Wr=o(p)(({theme:e})=>`
        background: ${e.colors.alpha.black[5]};
        color: ${e.colors.primary.main};
        width: ${e.spacing(8)};
        height: ${e.spacing(8)};
`),F=o("img")(({theme:e})=>`
      border: 1px solid ${e.colors.alpha.black[30]};
      border-radius: ${e.general.borderRadius};
      padding: ${e.spacing(1)};
      margin-right: ${e.spacing(2)};
      background: ${e.colors.alpha.white[100]};
`),Dr=o(n)(({theme:e})=>`
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
`),W=o(v)(({theme:e})=>`
     background: ${e.colors.error.lighter};
     color: ${e.colors.error.main};
     padding: ${e.spacing(.5)};

     &:hover {
      background: ${rr(e.colors.error.lighter,.4)};
     }
`),D=o(n)(({theme:e})=>`
     border: 1px solid ${e.colors.alpha.black[30]};
     background: ${e.colors.alpha.black[5]};
     box-shadow: none;
`);function Hr(){const e={savedCards:7},[l,Y]=er.useState("a"),k=J=>{Y(J.target.value)},I=()=>{};return r.jsxs(n,{children:[r.jsx(h,{subheader:e.savedCards+" saved cards",title:"Cards"}),r.jsx(i,{}),r.jsx(s,{p:3,children:r.jsxs(t,{container:!0,spacing:3,children:[r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsxs(D,{sx:{px:2,pt:2,pb:1},children:[r.jsxs(s,{display:"flex",alignItems:"center",children:[r.jsx(F,{src:"/static/images/placeholders/logo/visa.png",alt:"Visa"}),r.jsxs(s,{children:[r.jsx(a,{variant:"h3",fontWeight:"normal",children:"•••• 6879"}),r.jsxs(a,{variant:"subtitle2",children:["Expires:"," ",r.jsx(a,{component:"span",color:"text.primary",children:"12/24"})]})]})]}),r.jsxs(s,{pt:3,display:"flex",alignItems:"center",justifyContent:"space-between",children:[r.jsx(z,{value:"a",control:r.jsx(R,{checked:l==="a",onChange:k,value:"a",color:"primary",name:"primary-card"}),label:"Primary"}),r.jsx(m,{arrow:!0,title:"Remove this card",children:r.jsx(W,{onClick:()=>I(),children:r.jsx(S,{fontSize:"small"})})})]})]})}),r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsxs(D,{sx:{px:2,pt:2,pb:1},children:[r.jsxs(s,{display:"flex",alignItems:"center",children:[r.jsx(F,{src:"/static/images/placeholders/logo/mastercard.png",alt:"Visa"}),r.jsxs(s,{children:[r.jsx(a,{variant:"h3",fontWeight:"normal",children:"•••• 4634"}),r.jsxs(a,{variant:"subtitle2",children:["Expires:"," ",r.jsx(a,{component:"span",color:"text.primary",children:"6/22"})]})]})]}),r.jsxs(s,{pt:3,display:"flex",alignItems:"center",justifyContent:"space-between",children:[r.jsx(z,{value:"b",control:r.jsx(R,{checked:l==="b",onChange:k,value:"b",color:"primary",name:"primary-card"}),label:"Primary"}),r.jsx(m,{arrow:!0,title:"Remove this card",children:r.jsx(W,{onClick:()=>I(),children:r.jsx(S,{fontSize:"small"})})})]})]})}),r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsx(m,{arrow:!0,title:"Click to add a new card",children:r.jsx(Dr,{children:r.jsx(nr,{sx:{px:1},children:r.jsx(lr,{children:r.jsx(Wr,{children:r.jsx(q,{fontSize:"large"})})})})})})})]})})]})}const H=ar(r.jsx("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"}),"ArrowForwardTwoTone");function Vr(){const e={delivery:12,shipping:8};return r.jsxs(t,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsxs(n,{children:[r.jsx(h,{title:"Delivery Addresses",subheader:e.delivery+" saved addresses"}),r.jsx(i,{}),r.jsxs(s,{p:2,children:[r.jsx(a,{variant:"caption",fontWeight:"bold",children:"Favourite"}),r.jsxs(s,{sx:{minHeight:{xs:0,md:242}},p:2,children:[r.jsx(a,{variant:"h5",children:"Kadin Westervelt"}),r.jsx(a,{variant:"h5",sx:{py:1},fontWeight:"normal",children:"714-650-6297"}),r.jsx(a,{variant:"subtitle1",children:"348 W. Goldfield Street Bethel Park, PA 15102"})]}),r.jsx(x,{fullWidth:!0,variant:"outlined",endIcon:r.jsx(H,{}),children:"Manage"})]})]})}),r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsxs(n,{children:[r.jsx(h,{title:"Shipping Addresses",subheader:e.shipping+" saved addresses"}),r.jsx(i,{}),r.jsxs(s,{p:2,children:[r.jsx(a,{variant:"caption",fontWeight:"bold",children:"Favourite"}),r.jsxs(s,{sx:{minHeight:{xs:0,md:242}},p:2,children:[r.jsx(a,{variant:"h5",children:"Kadin Westervelt"}),r.jsx(a,{variant:"h5",sx:{py:1},fontWeight:"normal",children:"714-650-6297"}),r.jsx(a,{variant:"subtitle1",children:"10 E. Wrangler Avenue Sioux Falls, SD 57103"})]}),r.jsx(x,{fullWidth:!0,variant:"outlined",endIcon:r.jsx(H,{}),children:"Manage"})]})]})})]})}function ae(){const e={savedCards:7,name:"Catherine Pike",coverImg:"/static/images/placeholders/covers/5.jpg",avatar:"/static/images/avatars/4.jpg",description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",jobtitle:"Web Developer",location:"Barcelona, Spain",followers:"465"};return r.jsxs(r.Fragment,{children:[r.jsx(sr,{children:r.jsx("title",{children:"User Details - Management"})}),r.jsx(cr,{sx:{mt:3},maxWidth:"lg",children:r.jsxs(t,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:[r.jsx(t,{item:!0,xs:12,md:8,children:r.jsx(O,{user:e})}),r.jsx(t,{item:!0,xs:12,md:4,children:r.jsx(Lr,{})}),r.jsx(t,{item:!0,xs:12,md:8,children:r.jsx(Pr,{})}),r.jsx(t,{item:!0,xs:12,md:4,children:r.jsx(Fr,{})}),r.jsx(t,{item:!0,xs:12,md:7,children:r.jsx(Hr,{})}),r.jsx(t,{item:!0,xs:12,md:5,children:r.jsx(Vr,{})})]})}),r.jsx(tr,{})]})}export{ae as default};
