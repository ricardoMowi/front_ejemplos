import renderGeneralView from '../utilities/renderGeneralView';
import Api from './Api';

/*Login*/
module.exports.redirectTo = async (ctx,next) => {
  ctx.redirect('/dashboard/login');
};
module.exports.showLogin = async (ctx,next) => {
  if (ctx.session.user) {
    ctx.redirect('/dashboard/escritorio')
  }else{
    const viewData = {
      title : 'Iniciar Sesión',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
  }
  await renderGeneralView(ctx,'dashboard/pages/login', viewData);
  }  
};
module.exports.showRegister = async (ctx,next) => {  
  if (ctx.session.user) {
    ctx.redirect('/dashboard/escritorio')
  }else{
    const viewData = {
      title : 'Registro',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',      
  }
  await renderGeneralView(ctx,'dashboard/pages/register', viewData);
  }
  
};
module.exports.showSpecialistsManagement = async (ctx,next) => {
  var isAdmin= false
  ctx.session.user.specialistDetail ? isAdmin = ctx.session.user.specialistDetail.isAdmin : null
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Especialistas',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      isAdmin: isAdmin
    }
  await renderGeneralView(ctx,'dashboard/pages/specialistsManagement', viewData);
  }
};
module.exports.showHCPBManagement = async (ctx,next) => {
  var isAdmin= false
  ctx.session.user.specialistDetail ? isAdmin = ctx.session.user.specialistDetail.isAdmin : null
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'HCPBs',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
  }
  await renderGeneralView(ctx,'dashboard/pages/hcpbsManagement', viewData);
}
};
module.exports.showHCPB = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'HCPB',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    await renderGeneralView(ctx,'dashboard/pages/HCPBContainer', viewData);
  }
};
module.exports.newHCPB = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Nuevo HCPB',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    await renderGeneralView(ctx,'dashboard/pages/newHCPBContainer', viewData);
  }
};
module.exports.showProfile = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Perfil',
      initialState: JSON.stringify(ctx.session.user),
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    await renderGeneralView(ctx,'dashboard/pages/profile', viewData);
  }
};
module.exports.showDesktop = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Escritorio',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      initialState: JSON.stringify(ctx.session.user)
    }
    await renderGeneralView(ctx,'dashboard/pages/desktop', viewData);
  }
};
module.exports.showPregnants = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Gestantes',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    console.log('user en showPrgenants::::::::',ctx.session.user)
    await renderGeneralView(ctx,'dashboard/pages/pregnantsManagement', viewData);
  } 
};
module.exports.showSpecialityManagement = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Especialidades',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
    }
    await renderGeneralView(ctx,'dashboard/pages/specialityManagement', viewData);
  } 
};
module.exports.newPrenatalControl = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Nuevo control prenatal',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
      initialState: JSON.stringify(ctx.session.user),
  }
  await renderGeneralView(ctx,'dashboard/pages/prenatalControl', viewData);
  }
};
module.exports.newEmergency = async (ctx,next) => {
  if (!ctx.session.user) {
    ctx.redirect('/dashboard/login')
  }else{
    const viewData = {
      title : 'Emergencia',
      username: (ctx.session.user || {}).name || 'Mowidev - Tester',
  }
  await renderGeneralView(ctx,'dashboard/pages/emergency', viewData);
  }
};
/*Cerrar sesión*/
module.exports.logout = async (ctx,next) => {
  console.log("user: ", ctx.session.user);
  ctx.session=null;
  ctx.redirect('/dashboard/login');
};