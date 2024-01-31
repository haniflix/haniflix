import{D as l,a9 as n,M as i,s as e,a2 as s,j as p}from"./index-RN40GIN3.js";function u(r,o){l(2,arguments);var a=i(o);return n(r,-a)}const g=e("span")(({theme:r})=>`
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
`),d=({className:r,color:o="secondary",children:a,...c})=>p.jsx(g,{className:"MuiLabel-"+o,...c,children:a});d.propTypes={children:s.node,className:s.string,color:s.oneOf(["primary","black","secondary","error","warning","success","info"])};export{d as L,u as s};
