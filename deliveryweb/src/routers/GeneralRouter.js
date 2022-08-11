import router from 'koa-router';
import body from 'koa-body';

import DashboardController from '../controllers/DashboardController';

const Router = router();
const koaBody = body();

/*Login*/
Router.get('/', DashboardController.redirectTo);
Router.get('/shared/login', DashboardController.showLogin);
Router.get('/shared/logout', DashboardController.logout);
Router.get('/shared/forgotMyPassword/:generateToken', DashboardController.showforgotMyPassword);
Router.get('/shared/changePassword', DashboardController.showChangePassword);
Router.get('/shared/recoverPassword', DashboardController.showRecoverPassword);

/*Confirmación de registro */
Router.get('/shared-public/confirmEmail/:id', DashboardController.showConfirmEmail);

/*Home*/
Router.get('/admin/map', DashboardController.showMap);

/*Cliente*/
Router.get('/client-service/customerManagement', DashboardController.showCustomerManagement);
Router.get('/client-service/newCustomerManagement', DashboardController.showNewCustomerManagement);

/*Rider*/
Router.get('/rider-service/riderManagement', DashboardController.showRiderManagement);

/*Servicio*/
Router.get('/client-service/serviceManagement', DashboardController.showServiceManagement);

/*Recargas*/
Router.get('/rider-service/rechargeManagement', DashboardController.showRechargeManagement);

/*Noticias*/
Router.get('/admin/newsManagement', DashboardController.showNewsManagement);

/*Configuration*/
Router.get('/admin/configuration', DashboardController.showConfiguration);

/*Admisión*/
Router.get('/shared-public/desktop', DashboardController.showDesktopContainer);

/*Sugerencias*/
Router.get('/shared-public/suggestionsManagement', DashboardController.showSuggestionsManagement);

/*Tracking*/
Router.get('/shared-public/trackingManagement/:id', DashboardController.showTrackingManagement);

/*Acceso denegado*/
Router.get('/shared-public/accesoDenegado', DashboardController.showAccessDenied);

/*Registrar usuario*/
Router.get('/shared-public/register', DashboardController.showRegister);

/*Administrar preguntas frecuentes */
Router.get('/admin/frequentQuestionsManagement', DashboardController.showFrequentQuestionsManagement);

/*Mis créditos*/
Router.get('/rider-service/myCredits', DashboardController.showMyCreditsManagement);

module.exports = Router;
