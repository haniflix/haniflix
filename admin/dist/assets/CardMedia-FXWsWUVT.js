import{c as M,g as x,s as v,_ as c,r as f,u as y,h as b,j as h,i as I,k as N}from"./index-9lkQUlNG.js";function k(e){return M("MuiCardMedia",e)}x("MuiCardMedia",["root","media","img"]);const E=["children","className","component","image","src","style"],O=e=>{const{classes:o,isMediaComponent:t,isImageComponent:s}=e;return N({root:["root",t&&"media",s&&"img"]},k,o)},R=v("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e,{isMediaComponent:s,isImageComponent:a}=t;return[o.root,s&&o.media,a&&o.img]}})(({ownerState:e})=>c({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),_=["video","audio","picture","iframe","img"],j=["picture","img"],P=f.forwardRef(function(o,t){const s=y({props:o,name:"MuiCardMedia"}),{children:a,className:l,component:i="div",image:n,src:p,style:d}=s,C=b(s,E),r=_.indexOf(i)!==-1,u=!r&&n?c({backgroundImage:`url("${n}")`},d):d,m=c({},s,{component:i,isMediaComponent:r,isImageComponent:j.indexOf(i)!==-1}),g=O(m);return h.jsx(R,c({className:I(g.root,l),as:i,role:!r&&n?"img":void 0,ref:t,style:u,ownerState:m,src:r?n||p:void 0},C,{children:a}))}),U=P;export{U as C};
