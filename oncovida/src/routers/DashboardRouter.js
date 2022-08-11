import router from 'koa-router';
import body from 'koa-body';

import DashboardController from '../controllers/DashboardController';

const Router = router();
const koaBody = body();

/*Login*/
Router.get('/dashboard/login', DashboardController.showLogin);
Router.get('/dashboard/register', DashboardController.showRegister);
Router.get('/dashboard/logout', DashboardController.logout);
Router.get('/', DashboardController.redirectTo);
/*ADM*/
Router.get('/dashboard/admEspecialistas', DashboardController.showSpecialistsManagement);
Router.get('/dashboard/admEspecialidades', DashboardController.showSpecialityManagement);
Router.get('/dashboard/admHCPBS', DashboardController.showHCPBManagement);
Router.get('/dashboard/gestantes', DashboardController.showPregnants);
Router.get('/dashboard/HCPB', DashboardController.showHCPB);
Router.get('/dashboard/newHCPB', DashboardController.newHCPB);

Router.get('/dashboard/controlPrenatal', DashboardController.newPrenatalControl);
Router.get('/dashboard/emergencia', DashboardController.newEmergency);

/**perfil */
Router.get('/dashboard/perfil', DashboardController.showProfile);
Router.get('/dashboard/escritorio', DashboardController.showDesktop);

module.exports = Router;
