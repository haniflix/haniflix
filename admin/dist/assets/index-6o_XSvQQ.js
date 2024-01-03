import{s as l,a4 as r,j as c,i}from"./index-9lkQUlNG.js";const t=l("span")(({theme:a})=>`
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${a.palette.common.black}
        }

        &-primary {
          color: ${a.palette.primary.main}
        }
        
        &-secondary {
          color: ${a.palette.secondary.main}
        }
        
        &-success {
          color: ${a.palette.success.main}
        }
        
        &-warning {
          color: ${a.palette.warning.main}
        }
              
        &-error {
          color: ${a.palette.error.main}
        }
        
        &-info {
          color: ${a.palette.info.main}
        }
      }
`),p=({className:a,color:e="secondary",flex:o,children:s,...n})=>c.jsx(t,{className:i("MuiText-"+e,{flexItem:o}),...n,children:s});p.propTypes={children:r.node,className:r.string,color:r.oneOf(["primary","secondary","error","warning","success","info","black"])};export{p as T};
