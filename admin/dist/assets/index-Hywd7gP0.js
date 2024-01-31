import{N as g,O as y,j as e,s as n,B as o,T as s,a as v,r as x,W as T,S as w,P as l,Q as c}from"./index-RN40GIN3.js";import{L as M}from"./index-sKQZ4Y6E.js";import{d as b,a as C,b as S}from"./Instagram-7WSU6DTk.js";import{O as _}from"./OutlinedInput-5k8n8BVu.js";import{C as m}from"./Container-JzitWhMj.js";import{F as W}from"./FormControl-hzYzaU_O.js";import{I as p}from"./InputAdornment-UDjRWuy1.js";import{F as I}from"./FormHelperText-7DzgE79G.js";import"./Badge-v8-OwAxe.js";import"./shouldSpreadAdditionalProps-GoisWXYb.js";import"./useFormControl-ymE63IOh.js";var d={},z=y;Object.defineProperty(d,"__esModule",{value:!0});var f=d.default=void 0,A=z(g()),u=e,F=(0,A.default)([(0,u.jsx)("path",{d:"M20 6H4l8 4.99zM4 8v10h16V8l-8 5z",opacity:".3"},"0"),(0,u.jsx)("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"},"1")],"MailTwoTone");f=d.default=F;const L=n(o)(()=>`
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`),$=n(s)(({theme:t})=>`
  font-size: ${t.typography.pxToRem(75)};
`),E=n(s)(({theme:t})=>`
  color: ${t.colors.alpha.black[50]};
`),H=n(_)(({theme:t})=>`
    background-color: ${t.colors.alpha.white[100]};
`),O=n(v)(({theme:t})=>`
    margin-right: -${t.spacing(1)};
`);function K(){const t=()=>{const r=+new Date("2023")-+new Date;let h={};return r>0&&(h={days:Math.floor(r/864e5),hours:Math.floor(r/36e5%24),minutes:Math.floor(r/1e3/60%60),seconds:Math.floor(r/1e3%60)}),h},[i,j]=x.useState(t());x.useEffect(()=>{setTimeout(()=>{j(t())},1e3)});const a=[];return Object.keys(i).forEach(r=>{i[r]&&a.push(e.jsxs(o,{textAlign:"center",px:3,children:[e.jsx($,{variant:"h1",children:i[r]}),e.jsx(E,{variant:"h3",children:r})]}))}),e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx("title",{children:"Status - Coming Soon"})}),e.jsx(L,{children:e.jsxs(m,{maxWidth:"md",children:[e.jsx(M,{}),e.jsxs(o,{textAlign:"center",mb:3,children:[e.jsxs(m,{maxWidth:"xs",children:[e.jsx(s,{variant:"h1",sx:{mt:4,mb:2},children:"Coming Soon"}),e.jsx(s,{variant:"h3",color:"text.secondary",fontWeight:"normal",sx:{mb:4},children:"We're working on implementing the last features before our launch!"})]}),e.jsx("img",{alt:"Coming Soon",height:200,src:"/static/images/status/coming-soon.svg"})]}),e.jsx(o,{display:"flex",justifyContent:"center",children:a.length?a:e.jsx(e.Fragment,{children:"Time's up!"})}),e.jsx(m,{maxWidth:"sm",children:e.jsxs(o,{sx:{textAlign:"center",p:4},children:[e.jsxs(W,{variant:"outlined",fullWidth:!0,children:[e.jsx(H,{type:"text",placeholder:"Enter your email address here...",endAdornment:e.jsx(p,{position:"end",children:e.jsx(O,{variant:"contained",size:"small",children:"Notify Me"})}),startAdornment:e.jsx(p,{position:"start",children:e.jsx(f,{})})}),e.jsx(I,{children:"We'll email you once our website is launched!"})]}),e.jsx(w,{sx:{my:4}}),e.jsxs(o,{sx:{textAlign:"center"},children:[e.jsx(l,{arrow:!0,placement:"top",title:"Facebook",children:e.jsx(c,{color:"primary",children:e.jsx(b,{})})}),e.jsx(l,{arrow:!0,placement:"top",title:"Twitter",children:e.jsx(c,{color:"primary",children:e.jsx(C,{})})}),e.jsx(l,{arrow:!0,placement:"top",title:"Instagram",children:e.jsx(c,{color:"primary",children:e.jsx(S,{})})})]})]})})]})})]})}export{K as default};
