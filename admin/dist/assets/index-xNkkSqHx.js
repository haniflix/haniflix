import{g as f,j as r,T as a,s as l,A as g,h as $,r as n,u as b,B as o,W as y}from"./index-RN40GIN3.js";import{G as i}from"./Grid-Eqeh4S9L.js";import{P as C}from"./index-cCWBJ18I.js";import{C as c}from"./Card-_T_mgdHf.js";import{C as d}from"./CardContent-StIXZN0g.js";import{C as v}from"./Container-JzitWhMj.js";function W(){return f(),r.jsx(i,{container:!0,alignItems:"center",children:r.jsx(i,{item:!0,children:r.jsx(a,{variant:"h3",component:"h3",gutterBottom:!0,children:"Haniflix Administration"})})})}const h=l(g)(({theme:t})=>`
    margin: ${t.spacing(2,0,1,-.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${t.spacing(1)};
    padding: ${t.spacing(.5)};
    border-radius: 60px;
    height: ${t.spacing(5.5)};
    width: ${t.spacing(5.5)};
    background: ${t.palette.mode==="dark"?t.colors.alpha.trueWhite[30]:$(t.colors.alpha.black[100],.07)};
  
    img {
      background: ${t.colors.alpha.trueWhite[100]};
      padding: ${t.spacing(.5)};
      display: block;
      border-radius: inherit;
      height: ${t.spacing(4.5)};
      width: ${t.spacing(4.5)};
    }
`);l(g)(({theme:t})=>`
        background: ${t.colors.alpha.black[10]};
        color: ${t.colors.primary.main};
        width: ${t.spacing(8)};
        height: ${t.spacing(8)};
`);l(c)(({theme:t})=>`
        border: ${t.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${t.colors.primary.main};
        transition: ${t.transitions.create(["all"])};
        
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
          border-color: ${t.colors.alpha.black[70]};
        }
`);function k(){const[t,x]=n.useState([]),[e,u]=n.useState([]),p=b(),j=()=>{p.getMovies().then(s=>{u(s)}).catch(s=>{console.error(s)})},m=()=>{p.getUsers().then(s=>{x(s)}).catch(s=>{console.error(s)})};return n.useEffect(()=>{j(),m()},[]),r.jsxs(r.Fragment,{children:[r.jsx(o,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{pb:3},children:r.jsx(a,{variant:"h3",children:"Stats"})}),r.jsxs(i,{container:!0,spacing:3,children:[r.jsx(i,{xs:12,sm:6,md:3,item:!0,children:r.jsx(c,{sx:{px:1},children:r.jsxs(d,{children:[r.jsx(h,{children:r.jsx("img",{alt:"BTC",src:"/static/images/placeholders/logo/bitcoin.png"})}),r.jsx(a,{variant:"h5",noWrap:!0,children:"Users"}),r.jsx(o,{sx:{pt:3},children:r.jsx(a,{variant:"h3",gutterBottom:!0,noWrap:!0,children:t==null?void 0:t.length})})]})})}),r.jsx(i,{xs:12,sm:6,md:3,item:!0,children:r.jsx(c,{sx:{px:1},children:r.jsxs(d,{children:[r.jsx(h,{children:r.jsx("img",{alt:"Ripple",src:"/static/images/placeholders/logo/ripple.png"})}),r.jsx(a,{variant:"h5",noWrap:!0,children:"Movies"}),r.jsx(o,{sx:{pt:3},children:r.jsx(a,{variant:"h3",gutterBottom:!0,noWrap:!0,children:e==null?void 0:e.length})})]})})})]})]})}function U(){return r.jsxs(r.Fragment,{children:[r.jsx(y,{children:r.jsx("title",{children:"Dashboard"})}),r.jsx(C,{children:r.jsx(W,{})}),r.jsx(v,{maxWidth:"lg",children:r.jsx(i,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:4,children:r.jsx(i,{item:!0,lg:8,xs:12,children:r.jsx(k,{})})})})]})}export{U as default};
