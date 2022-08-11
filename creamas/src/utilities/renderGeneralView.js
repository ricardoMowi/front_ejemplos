// import moment from 'moment';
import Api from '../controllers/Api';
import _ from 'lodash';



module.exports = async(ctx, file, viewData, tag) => {
    const isSessionActive = !!ctx.session.idSession;
    var semester = await Api.getCurrentSemester({})
    var screens = [];
    screens = ctx.session.shoiw;
    //si hay una sesión, cargar las páginas de acceso del voluntario
    if(isSessionActive){
      screens = await Api.getAllPagesByVolunteer({id:ctx.session.user.id, semesterCode:semester.body.id })
    }
    //función para validar el menpu que puede visualizar el usuario
    var verifyMenu = function (...keys) {
      let validate = false;
      _.map(keys,(key)=>{

        if(_.findIndex(screens.body, function(o) {
          return o.code == key; }) != -1){
          validate = true;
        }
      })
      return validate;
    }

    viewData['version'] = 'v1.5.0';
    viewData['verifyMenu'] = verifyMenu;

    if(isSessionActive){
      
      if(ctx.session.user.imageUrl){
        viewData['imageUrl'] = ctx.session.user.imageUrl;
      }else{
        viewData['imageUrl'] = '/LogoCrea.png'
      }
      viewData['name'] =  ctx.session.user.name;
      viewData['statusCode'] =  ctx.session.user.statusCode; 
      // console.log("datos  ", viewData)

      let response = await Api.validateSession({id : ctx.session.idSession});
      if(response.body == true){
        //la sesión fue validada , ahora debemos validar si el usuario puede ver la página que se va a renderizar
        var page= _.find(screens.body, (item) => {
          //Aplicamos excepciones para páginas públicas:
          if(file == 'dashboard/pages/asistenciaReclutamiento'){
            return true
          }else{
            return item.route == file
          }
        });
        var access = page != null? access= true: access = false; //ORIGINAL
        // var access = true;
        //var access= true
        if(access == true){
          //acceso validado
          return await ctx.render(file, viewData);
        }else{
          //si no puede visualizar la página se redirecciona a una página de acceso denegado
          ctx.redirect('/dashboard/accesoDenegado');
        }
        
      }else{
        //si no hay sesión activa se redirecciona al login 
        ctx.session = null;
        ctx.redirect('/dashboard/login');
      }
    }else{
      ctx.session = null;
    }
    return await ctx.render(file, viewData);

}

