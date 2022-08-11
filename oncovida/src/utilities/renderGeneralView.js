
import moment from 'moment';
import _ from 'lodash';
import Api from './../controllers/Api';
module.exports = async(ctx, file, viewData, tag) => {

  if(ctx.session.user){
    var isAdmin= false
    ctx.session.user.specialistDetail ? isAdmin = ctx.session.user.specialistDetail.isAdmin : null
    var verifyMenu = function (...keys) {
      let validate = false;
      _.map(keys,(key)=>{
            
        switch (key) {
          case 'CENTRO_GESTION':
            if(isAdmin == true){
              validate = true
            }
            break;
          case 'ADM_ESP':
            if(isAdmin == true){
              validate = true
            }
            break;  
          case 'ADM_DOC':
            if(isAdmin == true){
              validate = true
            }
            break;            
                        
                          
          default:
            validate = true
            break;
        }

      })
      return validate
    }
    viewData['verifyMenu'] = verifyMenu;
  }

  viewData['initialState'] = JSON.stringify(ctx.session.user)
  viewData['version'] = moment().unix();
  return await ctx.render(file, viewData);
}
