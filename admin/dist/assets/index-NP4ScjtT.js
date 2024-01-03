import{s as n,B as a,aF as l,a as o,j as e,W as d,T as s,a5 as h,X as r,P as c,D as x}from"./index-9lkQUlNG.js";import{C as i}from"./Container-qmmmC6zp.js";import{C as m}from"./Card-0NMuTcO3.js";const u=n(a)(({theme:t})=>`
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`),p=n(l)(({theme:t})=>`
    background-color: ${t.colors.alpha.white[100]};
`),j=n(o)(({theme:t})=>`
    margin-right: -${t.spacing(1)};
`);function y(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{children:e.jsx("title",{children:"Status - 404"})}),e.jsx(u,{children:e.jsxs(i,{maxWidth:"md",children:[e.jsxs(a,{textAlign:"center",children:[e.jsx("img",{alt:"404",height:180,src:"/static/images/status/404.svg"}),e.jsx(s,{variant:"h2",sx:{my:2},children:"The page you were looking for doesn't exist."}),e.jsx(s,{variant:"h4",color:"text.secondary",fontWeight:"normal",sx:{mb:4},children:"It's on us, we moved the content to a different page. The search below should help!"})]}),e.jsx(i,{maxWidth:"sm",children:e.jsxs(m,{sx:{textAlign:"center",mt:3,p:4},children:[e.jsx(h,{variant:"outlined",fullWidth:!0,children:e.jsx(p,{type:"text",placeholder:"Search terms here...",endAdornment:e.jsx(r,{position:"end",children:e.jsx(j,{variant:"contained",size:"small",children:"Search"})}),startAdornment:e.jsx(r,{position:"start",children:e.jsx(c,{})})})}),e.jsx(x,{sx:{my:4},children:"OR"}),e.jsx(o,{href:"/overview",variant:"outlined",children:"Go to homepage"})]})})]})})]})}export{y as default};
