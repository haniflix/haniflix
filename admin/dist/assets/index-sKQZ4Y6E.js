import{s as e,L as p,B as t,j as r,P as s,av as a,g as n}from"./index-RN40GIN3.js";import{B as d}from"./Badge-v8-OwAxe.js";const l=e(p)(({theme:o})=>`
        color: ${o.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${o.typography.fontWeightBold};
`),g=e(t)(()=>`
        width: 52px;
        height: 38px;
`),c=e(t)(({theme:o})=>`
        background: ${o.general.reactFrameworkColor};
        width: 18px;
        height: 18px;
        border-radius: ${o.general.borderRadiusSm};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${o.general.borderRadiusSm};
        }

        &:before {
            background: ${o.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${o.palette.secondary.main};
        }
`),x=e(t)(({theme:o})=>`
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${o.general.borderRadiusSm};
        background: ${o.header.background};
`),u=e(({className:o,...i})=>r.jsx(s,{...i,classes:{popper:o}}))(({theme:o})=>({[`& .${a.tooltip}`]:{backgroundColor:o.colors.alpha.trueWhite[100],color:o.palette.getContrastText(o.colors.alpha.trueWhite[100]),fontSize:o.typography.pxToRem(12),fontWeight:"bold",borderRadius:o.general.borderRadiusSm,boxShadow:"0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)"},[`& .${a.arrow}`]:{color:o.colors.alpha.trueWhite[100]}}));function f(){const o=n();return r.jsx(u,{title:"Tokyo Free White React Typescript Admin Dashboard",arrow:!0,children:r.jsx(l,{to:"/overview",children:r.jsx(d,{sx:{".MuiBadge-badge":{fontSize:o.typography.pxToRem(11),right:-2,top:8}},overlap:"circular",color:"success",badgeContent:"2.0",children:r.jsx(g,{children:r.jsx(c,{children:r.jsx(x,{})})})})})})}export{f as L};
