import router from 'koa-router';
import body from 'koa-body';

import ApiController from '../controllers/ApiController';

const Router = router();
const koaBody = body({
    "formLimit":"50mb",
    "jsonLimit":"50mb",
    "textLimit":"50mb"
});
const uploadKoaBody = body({ multipart: true , jsonLimit:'10mb'});

//SERVICE
Router.post('/createService', koaBody, ApiController.createService);
Router.post('/getActiveServices', koaBody, ApiController.getActiveServices);
Router.post('/getActiveRiders', koaBody, ApiController.getActiveRiders);
Router.post('/getService', koaBody, ApiController.getService);
Router.post('/getRider', koaBody, ApiController.getRider);
Router.post('/updateService', koaBody, ApiController.updateService);
////////////////////

Router.post('/login', koaBody, ApiController.login);
Router.post('/resetPassword', koaBody, ApiController.resetPassword);
Router.post('/changePassword', koaBody, ApiController.changePassword);
Router.post('/generatePasswordToken', koaBody, ApiController.generatePasswordToken);
Router.post('/findByToken', koaBody, ApiController.findByToken);
Router.post('/validPassword', koaBody, ApiController.validPassword);

//USER
Router.post('/updateUser', koaBody, ApiController.updateUser);
Router.post('/validateUser', koaBody, ApiController.validateUser);
Router.post('/showUser', koaBody, ApiController.showUser);
Router.post('/registerUser', koaBody, ApiController.registerUser);
//CLIENT
Router.post('/listClients', koaBody, ApiController.listClients);
Router.post('/searchClients', koaBody, ApiController.searchClients);
Router.post('/createClient', koaBody, ApiController.createClient);
//RIDER
Router.post('/listRiders', koaBody, ApiController.listRiders);
Router.post('/setupRider', koaBody, ApiController.setupRider);
Router.post('/setActive', koaBody, ApiController.setActive);
Router.post('/updateDocumentation', koaBody, ApiController.updateDocumentation);
//NEWS
Router.post('/listNews', koaBody, ApiController.listNews);
Router.post('/searchNews', koaBody, ApiController.searchNews);
Router.post('/deleteNewRecord', koaBody, ApiController.deleteNewRecord);
Router.post('/updateNewRecord', koaBody, ApiController.updateNewRecord);
Router.post('/createNewRecord', koaBody, ApiController.createNewRecord);
Router.post('/publishNewRecord', koaBody, ApiController.publishNewRecord);
Router.post('/unpublishNewRecord', koaBody, ApiController.unpublishNewRecord);
//CREDITS
Router.post('/listCredits', koaBody, ApiController.listCredits);
Router.post('/searchCredits', koaBody, ApiController.searchCredits);
Router.post('/createCredit', koaBody, ApiController.createCredit);
Router.post('/approveCredit', koaBody, ApiController.approveCredit);
Router.post('/rejectCredit', koaBody, ApiController.rejectCredit);
Router.post('/deleteCredit', koaBody, ApiController.deleteCredit);
//CONFIGURATION
Router.post('/getConfiguration', koaBody, ApiController.getConfiguration);
Router.post('/saveConfiguration', koaBody, ApiController.saveConfiguration);
//SUGGESTIONS
Router.post('/listSuggestions', koaBody, ApiController.getSuggestions);
Router.post('/searchSuggestions', koaBody, ApiController.searchSuggestions);
//QUESTIONS
Router.post('/listQuestions', koaBody, ApiController.listQuestions);
Router.post('/searchQuestions', koaBody, ApiController.searchQuestions);
Router.post('/updateQuestion', koaBody, ApiController.updateQuestion);
Router.post('/createQuestion', koaBody, ApiController.createQuestion);
Router.post('/publishQuestion', koaBody, ApiController.publishQuestion);
/*Upload*/
Router.post('/uploadAttachment', uploadKoaBody, ApiController.uploadAttachment);

/**RUTAS BACK */

//ESPECIALIDADES
Router.post('/listSpecialties', koaBody, ApiController.listSpecialties);
Router.post('/createSpeciality', koaBody, ApiController.createSpeciality);
Router.post('/updateSpeciality', koaBody, ApiController.updateSpeciality);
Router.post('/deleteSpeciality', koaBody, ApiController.deleteSpeciality);

//ESPECIALISTAS
Router.post('/listSpecialists', koaBody, ApiController.listSpecialists);
Router.post('/reportAdmin', koaBody, ApiController.reportAdmin);
Router.post('/createSpecialist', koaBody, ApiController.createSpecialist);
Router.post('/updateSpecialist', koaBody, ApiController.updateSpecialist);
Router.post('/deleteSpecialist', koaBody, ApiController.deleteSpecialist);

//PACIENTES
Router.post('/listPatients', koaBody, ApiController.listPatients);
Router.post('/createPatient', koaBody, ApiController.createPatient);
Router.post('/updatePatient', koaBody, ApiController.updatePatient);
Router.post('/deletePatient', koaBody, ApiController.deletePatient);

//HCPBS
Router.post('/listHCPBs', koaBody, ApiController.listHCPBs);
Router.post('/showHCPB', koaBody, ApiController.showHCPB);
Router.post('/createHCPB', koaBody, ApiController.createHCPB);
Router.post('/terminatedHCPB', koaBody, ApiController.terminatedHCPB); 
Router.post('/updateHCPB', koaBody, ApiController.updateHCPB);
Router.post('/deleteHCPB', koaBody, ApiController.deleteHCPB);

//CONTROL
Router.post('/listControls', koaBody, ApiController.listControls);
Router.post('/showControl', koaBody, ApiController.showControl);
Router.post('/createControl', koaBody, ApiController.createControl);
Router.post('/deleteControl', koaBody, ApiController.deleteControl);

//EMERGENCIAS
Router.post('/listEmergencies', koaBody, ApiController.listEmergencies);
Router.post('/showEmergency', koaBody, ApiController.showEmergency);
Router.post('/createEmergency', koaBody, ApiController.createEmergency);
Router.post('/deleteEmergency', koaBody, ApiController.deleteEmergency);

Router.post('/classifyPregnancy', koaBody, ApiController.classifyPregnancy);


module.exports = Router;
