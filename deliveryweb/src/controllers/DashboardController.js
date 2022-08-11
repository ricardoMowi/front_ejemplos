import renderGeneralView from '../utilities/renderGeneralView';
import Api from './Api';

/*Login*/
module.exports.redirectTo = async (ctx,next) => {
    //Cambiar
    ctx.redirect('/shared/login');
};

module.exports.showLogin = async (ctx,next) => {
    console.log('entró showLogin ',ctx )
    
    if (ctx.session.user) {
      ctx.redirect('/shared-public/desktop')
    }else{
      const viewData = {
        title : 'Iniciar Sesión',
        username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    await renderGeneralView(ctx,'shared/login', viewData);
    }
};
module.exports.showforgotMyPassword = async (ctx,next) => {

  /*const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/shared/login');
  }*/
  var generateToken= ctx.params.generateToken;
  
  const _initialState = {
    generateToken:generateToken
  }
  const viewData = {
      title : 'Me olvide la contraseña',
      initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared/forgotMyPassword', viewData);
};
module.exports.showChangePassword = async (ctx,next) => {

  /*const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/shared/login');
  }*/
  var userCode = (ctx.session.user || {}).userCode;
  console.log(ctx.session.user)
  //console.log('Coountry//////////////', ctx.session.user);
  const _initialState = {
    userCode: userCode,
  }
  const viewData = {
      title : 'Cambiar contraseña',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared/changePassword', viewData);
};
module.exports.showRecoverPassword = async (ctx,next) => {

  /*const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/shared/login');
  }*/
  var userCode = (ctx.session.user || {}).userCode;
  console.log(ctx.session.user)
  //console.log('Coountry//////////////', ctx.session.user);
  const _initialState = {
    userCode: userCode,
  }
  const viewData = {
      title : 'Recuperar contraseña',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared/recoverPassword', viewData);
};

/*Cerrar sesión*/
module.exports.logout = async (ctx,next) => {
    console.log("user: ", ctx.session.user);
    ctx.session=null;
    ctx.redirect('/shared/login');
};

/*Map*/
module.exports.showMap = async (ctx,next) => {
  console.log('entró a showMap',ctx )
  // if (!ctx.session.user) {
  //     ctx.redirect('/shared/login');
  // }else{
    if(ctx.session.user.isAdmin == true ){
      var fullName = (ctx.session.user || {}).fullName || 'Mowidev';
      var userCode = (ctx.session.user || {}).userCode;
      
      const _initialState = {
        fullName: fullName,
        userCode: userCode
      }
      const viewData = {
          title : 'HOME',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/map', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')      
    }

  // }
};

/*Clientes*/
module.exports.showCustomerManagement = async (ctx,next) => {
  console.log('entró a showCustomerManagement',ctx )
  if (!ctx.session.user) {
      ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin){
      const _initialState = {
        newCustomer:false,
      }
      const viewData = {
          title : 'Gestión de clientes',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'client-service/customerManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Registra nuevo cliente al registrar un servicio*/
module.exports.showNewCustomerManagement = async (ctx,next) => {

  console.log('entró a showCustomerManagement',ctx )
  
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
        newCustomer:true,
        //id: id,
      }
      const viewData = {
          title : 'Gestión de clientes',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'client-service/customerManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso') 
    }
  }

};

/*Riders*/
module.exports.showRiderManagement = async (ctx,next) => {

  console.log('entró a showCustomerManagement',ctx )
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
        //id: id,
      }
      const viewData = {
          title : 'Gestión de Riders',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'rider-service/riderManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')            
    }
  }
};

/*Servicios*/
module.exports.showServiceManagement = async (ctx,next) => {

  console.log('entró a showCustomerManagement',ctx )
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin == true) {
      const _initialState = {
        //id: id,
      }
      const viewData = {
          title : 'Gestión de servicios',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'client-service/serviceManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')      
    }
  }
};

/*Recargas*/
module.exports.showRechargeManagement = async (ctx,next) => {
  console.log('entró a showCustomerManagement',ctx )
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    if (ctx.session.user.isAdmin == true) {
      const _initialState = {
        //id: id,
      }
      const viewData = {
          title : 'Gestión de recargas',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'rider-service/rechargeManagement', viewData);       
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Noticias*/
module.exports.showNewsManagement = async (ctx,next) => {
  //var id = ctx.session.user.id;
  console.log('entró a showCustomerManagement')
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }
  else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
        //id: id,
      }
      const viewData = {
          title : 'Gestión de Noticias',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/newsManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Configuración del sistema*/
module.exports.showConfiguration = async (ctx,next) => {
  //var id = ctx.session.user.id;
  console.log('entró a showCustomerManagement')
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }
  else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
        //id: id,
      }
      const viewData = {
          title : 'Configuración del sistema',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/configuration', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Admisión*/
module.exports.showDesktopContainer = async (ctx,next) => {

  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }
  else{

    var user = ctx.session.user
    var id = user._id
    var isAdmin = user.isAdmin
    var isRider = user.isRider
    var currentStatus = user.riderDetail ? currentStatus = user.riderDetail.currentStatus : currentStatus = null
    var recruitmentStatus = user.riderDetail ? recruitmentStatus = user.riderDetail.recruitmentStatus : recruitmentStatus = null
    const _initialState = {
      id: id,
      isAdmin : isAdmin,
      isRider : isRider,
      currentStatus : currentStatus,
      recruitmentStatus : recruitmentStatus 
    }
    const viewData = {
        title : 'Admisión',
        username: (ctx.session.user || {}).name || 'Mowidev - Tester',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/desktop', viewData);
  }
};

/*Sugerencias*/
module.exports.showSuggestionsManagement = async (ctx,next) => {
  console.log('entró a showCustomerManagement',ctx )
  
  if (!ctx.session.user) {
      ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
      }
      const viewData = {
          title : 'Sugerencias',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'shared-public/suggestionsManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Tracking*/
module.exports.showTrackingManagement = async (ctx,next) => {  
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    var id = ctx.params.id;
    const _initialState = {
      id: id,
    }
    const viewData = {
        title : 'Tracking',
        username: (ctx.session.user || {}).name || 'Mowidev - Tester',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/trackingManagement', viewData);
  }
};

/*Acceso denegado*/
module.exports.showAccessDenied = async (ctx,next) => {

  //var id = ctx.session.user.id;
  console.log('entró a showCustomerManagement')
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }
  else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Acceso Denegado',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/accesoDenegado', viewData);
  }
};


/**Registro de postulantes */
module.exports.showRegister = async (ctx,next) => {
  console.log('entró showRegister ',ctx )
  
  if (ctx.session.user) {
    ctx.redirect('/shared-public/desktop')
  }else{
    const viewData = {
      title : 'Registro',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
  }
  await renderGeneralView(ctx,'shared-public/register', viewData);
  }
};

/*Preguntas frecuentes*/
module.exports.showFrequentQuestionsManagement = async (ctx,next) => {
  console.log('entró a showFrequentQuestionsManagement',ctx )
  

  if (!ctx.session.user) {
      ctx.redirect('/shared/login');
  }else{
    if(ctx.session.user.isAdmin == true){
      const _initialState = {
      }
      const viewData = {
          title : 'Preguntas frecuentes',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/frequentQuestionsManagement', viewData);
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Créditos*/
module.exports.showMyCreditsManagement = async (ctx,next) => {
  console.log('entró a showMyCreditsManagement',ctx )
  if(!ctx.session.user){
    ctx.redirect('/shared/login');
  }else{
    if (ctx.session.user.isRider == true) {
      var id = ctx.session.user._id
      const _initialState = {
        id: id,
      }
      const viewData = {
          title : 'Mis créditos',
          username: (ctx.session.user || {}).name || 'Mowidev - Tester',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'rider-service/myCreditsManagement', viewData);       
    }else{
      ctx.redirect('/shared-public/accesoDenegado');
      console.log('No tiene permiso')
    }
  }
};

/*Confirmación de registro*/
module.exports.showConfirmEmail = async (ctx,next) => {
  console.log('entró a showConfirmEmail',ctx )      
  const _initialState = {
    id : ctx.params.id
  }
  const viewData = {
      title : 'Confirmación de registro',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared-public/confirmEmail', viewData);       
 
};