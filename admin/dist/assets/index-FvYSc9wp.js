import{s,a4 as o,j as n}from"./index-9lkQUlNG.js";const i=s("span")(({theme:r})=>`
      background-color: ${r.colors.alpha.black[5]};
      padding: ${r.spacing(.5,1)};
      font-size: ${r.typography.pxToRem(13)};
      border-radius: ${r.general.borderRadius};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: ${r.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${r.colors.primary.lighter};
          color: ${r.palette.primary.main}
        }

        &-black {
          background-color: ${r.colors.alpha.black[100]};
          color: ${r.colors.alpha.white[100]};
        }
        
        &-secondary {
          background-color: ${r.colors.secondary.lighter};
          color: ${r.palette.secondary.main}
        }
        
        &-success {
          background-color: ${r.colors.success.lighter};
          color: ${r.palette.success.main}
        }
        
        &-warning {
          background-color: ${r.colors.warning.lighter};
          color: ${r.palette.warning.main}
        }
              
        &-error {
          background-color: ${r.colors.error.lighter};
          color: ${r.palette.error.main}
        }
        
        &-info {
          background-color: ${r.colors.info.lighter};
          color: ${r.palette.info.main}
        }
      }
`),p=({className:r,color:a="secondary",children:c,...l})=>n.jsx(i,{className:"MuiLabel-"+a,...l,children:c});p.propTypes={children:o.node,className:o.string,color:o.oneOf(["primary","black","secondary","error","warning","success","info"])};export{p as L};
