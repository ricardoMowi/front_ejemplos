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
Router.post('/getAllRiders', koaBody, ApiController.getAllRiders);
Router.post('/getService', koaBody, ApiController.getService);
Router.post('/getRider', koaBody, ApiController.getRider);
Router.post('/updateService', koaBody, ApiController.updateService);
Router.post('/searchServices', koaBody, ApiController.searchServices);
////////////////////

Router.post('/login', koaBody, ApiController.login);
Router.post('/resetPassword', koaBody, ApiController.resetPassword);
Router.post('/changePassword', koaBody, ApiController.changePassword);
Router.post('/generatePasswordToken', koaBody, ApiController.generatePasswordToken);
Router.post('/sendEmailResetPassword', koaBody, ApiController.sendEmailResetPassword);
Router.post('/findByToken', koaBody, ApiController.findByToken);
Router.post('/validPassword', koaBody, ApiController.validPassword);

//USER
Router.post('/confirmEmail', koaBody, ApiController.confirmEmail);
Router.post('/updateUser', koaBody, ApiController.updateUser);
Router.post('/validateUser', koaBody, ApiController.validateUser);
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
Router.post('/searchRiders', koaBody, ApiController.searchRiders);
Router.post('/setEnabledRider', koaBody, ApiController.setEnabledRider);
Router.post('/setdisabledRider', koaBody, ApiController.setdisabledRider);
Router.post('/listCreditsByRider', koaBody, ApiController.listCreditsByRider); 
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
Router.post('/createRefund', koaBody, ApiController.createRefund);
Router.post('/createBonus', koaBody, ApiController.createBonus);
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
module.exports = Router;
