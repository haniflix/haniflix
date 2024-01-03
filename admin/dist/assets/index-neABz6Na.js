import{m as g,n as y,j as e,s as o,B as n,T as s,aF as v,a as T,r as m,W as w,b,a5 as M,X as u,aL as C,D as _,w as l,N as c}from"./index-9lkQUlNG.js";import{d as S,a as W,b as z}from"./Instagram-Z0s80E_C.js";import{C as d}from"./Container-qmmmC6zp.js";var h={},A=y;Object.defineProperty(h,"__esModule",{value:!0});var f=h.default=void 0,I=A(g()),p=e,L=(0,I.default)([(0,p.jsx)("path",{d:"M20 6H4l8 4.99zM4 8v10h16V8l-8 5z",opacity:".3"},"0"),(0,p.jsx)("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"},"1")],"MailTwoTone");f=h.default=L;const $=o(n)(()=>`
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`),D=o(s)(({theme:t})=>`
  font-size: ${t.typography.pxToRem(75)};
`),E=o(s)(({theme:t})=>`
  color: ${t.colors.alpha.black[50]};
`),F=o(v)(({theme:t})=>`
    background-color: ${t.colors.alpha.white[100]};
`),H=o(T)(({theme:t})=>`
    margin-right: -${t.spacing(1)};
`);function O(){const t=()=>{const r=+new Date("2023")-+new Date;let x={};return r>0&&(x={days:Math.floor(r/864e5),hours:Math.floor(r/36e5%24),minutes:Math.floor(r/1e3/60%60),seconds:Math.floor(r/1e3%60)}),x},[a,j]=m.useState(t());m.useEffect(()=>{setTimeout(()=>{j(t())},1e3)});const i=[];return Object.keys(a).forEach(r=>{a[r]&&i.push(e.jsxs(n,{textAlign:"center",px:3,children:[e.jsx(D,{variant:"h1",children:a[r]}),e.jsx(E,{variant:"h3",children:r})]}))}),e.jsxs(e.Fragment,{children:[e.jsx(w,{children:e.jsx("title",{children:"Status - Coming Soon"})}),e.jsx($,{children:e.jsxs(d,{maxWidth:"md",children:[e.jsx(b,{}),e.jsxs(n,{textAlign:"center",mb:3,children:[e.jsxs(d,{maxWidth:"xs",children:[e.jsx(s,{variant:"h1",sx:{mt:4,mb:2},children:"Coming Soon"}),e.jsx(s,{variant:"h3",color:"text.secondary",fontWeight:"normal",sx:{mb:4},children:"We're working on implementing the last features before our launch!"})]}),e.jsx("img",{alt:"Coming Soon",height:200,src:"/static/images/status/coming-soon.svg"})]}),e.jsx(n,{display:"flex",justifyContent:"center",children:i.length?i:e.jsx(e.Fragment,{children:"Time's up!"})}),e.jsx(d,{maxWidth:"sm",children:e.jsxs(n,{sx:{textAlign:"center",p:4},children:[e.jsxs(M,{variant:"outlined",fullWidth:!0,children:[e.jsx(F,{type:"text",placeholder:"Enter your email address here...",endAdornment:e.jsx(u,{position:"end",children:e.jsx(H,{variant:"contained",size:"small",children:"Notify Me"})}),startAdornment:e.jsx(u,{position:"start",children:e.jsx(f,{})})}),e.jsx(C,{children:"We'll email you once our website is launched!"})]}),e.jsx(_,{sx:{my:4}}),e.jsxs(n,{sx:{textAlign:"center"},children:[e.jsx(l,{arrow:!0,placement:"top",title:"Facebook",children:e.jsx(c,{color:"primary",children:e.jsx(S,{})})}),e.jsx(l,{arrow:!0,placement:"top",title:"Twitter",children:e.jsx(c,{color:"primary",children:e.jsx(W,{})})}),e.jsx(l,{arrow:!0,placement:"top",title:"Instagram",children:e.jsx(c,{color:"primary",children:e.jsx(z,{})})})]})]})})]})})]})}export{O as default};
