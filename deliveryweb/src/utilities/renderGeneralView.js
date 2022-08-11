import moment from 'moment';
import Api from '../controllers/Api';
import _ from 'lodash';

module.exports = async(ctx, file, viewData, tag) => {
      var screens = []; 
      // var verifyMenu = function (...keys) {
      //   let validate = false;
      //   _.map(keys,(key)=>{
  
      //     if(_.findIndex(screens, function(o) { 
            
      //       return o == key; }) != -1){
      //       validate = true;
      //     }
      //   })
      //   return validate;
      // }
      console.log('ctx.session.user.', ctx.session.user )
      if(ctx.session.user){
        var isRider = ctx.session.user.isRider 
        var isAdmin = ctx.session.user.isAdmin  
        var verifyMenu = function (...keys) {
          let validate = false;
  
          _.map(keys,(key)=>{
            
            switch (key) {
              case 'CONFIGURATION':
                if(isAdmin == true){
                  validate = true
                }
                break;
              case 'SUGGESTIONS':
                if(isAdmin == true){
                  validate = true
                }
                break;  
              case 'CLIENTS':
                if(isAdmin == true){
                  validate = true
                }
                break;
              case 'RIDERS':
                if(isAdmin == true){
                  validate = true
                }
                break;  
              case 'SERVICES':
                if(isAdmin == true){
                  validate = true
                }
                break;      
              case 'CREDITS':
                if(isAdmin == true){
                  validate = true
                }
                break;
              case 'NEWS':
                if(isAdmin == true){
                  validate = true
                }
                break;  
              case 'FREQUENT_QUESTIONS':
                if(isAdmin == true){
                  validate = true
                }
                break;              
              case 'MY_CREDITS':
                if(isRider == true){
                  validate = true
                }
                break;           
              case 'MAP':
                if(isAdmin == true){
                  validate = true
                }
                break;                     
              default:
                break;
            }
          })
          return validate;
        }
        viewData['verifyMenu'] = verifyMenu;
      }
      viewData['version'] = moment().unix();
      return await ctx.render(file, viewData);    
  }