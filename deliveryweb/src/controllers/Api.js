import fetch from 'node-fetch';
import _ from 'lodash';
import {POST,PUT,GET} from './constants/constants'

module.exports.consumer = async (url,method,body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  let options = {}

  if(method != GET){
    options = {
      method: method,
      headers,
      body: JSON.stringify(body),
    }
  }else{
    options = {
      method: method,
    }
  }
  var status =  '';
  const response = await fetch(url,options)
  .then(res => {
        status = res.status;
        if(!_.isEqual(res.status+'', '200')){
        }
        return res.json();
      }
    )
    .then(data => {
      var dataWithStatus = {
        body:data,
        status:status,
      }
      //Agregar el status en el body
      return dataWithStatus
    })
    .catch((err) => {
      console.log('-------INI-ERROR-------');
      console.log('ERROR: api.js');
      console.log('URL: '+ url);
      console.log('METHOD: '+ (method));
      console.log("BODY:", body);
      console.log("MESSAGE:", err);
      console.log('-------END-ERROR-------');
    });
    return response || {status:status };
  // return {};
};

module.exports.getActiveServices = async (body) => {
  console.log('---API--- : getActiveServices');
  const url = `${process.env.API_BASE_URL}/services/getActiveServices`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getActiveRiders = async (body) => {
  console.log('---API--- : getActiveRiders');
  const url = `${process.env.API_BASE_URL}/riders/getActiveRiders`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAllRiders = async (body) => {
  console.log('---API--- : getAllRiders');
  const url = `${process.env.API_BASE_URL}/riders/getAllRiders`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getService = async (body) => {
  console.log('---API--- : getService');
  const url = `${process.env.API_BASE_URL}/services/${body.id}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getRider = async (body) => {
  console.log('---API--- : getRider');
  const url = `${process.env.API_BASE_URL}/riders/${body.id}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.confirmEmail = async (body) => {
  console.log('---API--- : confirmEmail');
  const url = `${process.env.API_BASE_URL}/users/confirmEmail`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.resetPassword = async (body) => {
  console.log('---API--- : resetPassword');
  const url = `${process.env.API_BASE_URL}/users/resetPassword`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.changePassword = async (body) => {
  console.log('---API--- : changePassword');
  const url = `${process.env.API_BASE_URL}/users/changePassword`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.generatePasswordToken = async (body) => {
  console.log('---API--- : generatePasswordToken');
  const url = `${process.env.API_BASE_URL}/users/generatePasswordToken?email=${body.email}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.findByToken = async (body) => {
  console.log('---API--- : findByToken');
  const url = `${process.env.API_BASE_URL}/users/findByToken?passwordToken=${body.generateToken}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.sendEmailResetPassword = async (body) => {
  console.log('---API--- : sendEmailResetPassword');
  const url = `${process.env.API_BASE_URL}/users/sendEmailResetPassword`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
module.exports.validPassword = async (body) => {
  console.log('---API--- : validPassword');
  const url = `${process.env.API_BASE_URL}/users/validPassword`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
module.exports.signUp = async (body) => {
  console.log('---API--- : signUp');
  const url = `${process.env.API_BASE_URL}/users/signUp`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
module.exports.validateUser = async (body) => {
  console.log('---API--- : validateUser');
  const url = `${process.env.API_BASE_URL}/users/validateUser`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.login = async (body) => {
  console.log('---API--- : Login');
  const url = `${process.env.API_BASE_URL}/users/signIn`;
  const response = await module.exports.consumer(url,POST,body);
  // console.log('Response', response);
  // console.log(url);
  return response;
}

//Client
module.exports.createClient = async (body) => {
  console.log('---API--- : createClient');
  const url = `${process.env.API_BASE_URL}/clients`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.listClients = async (body) => {
  console.log('---API--- : listClients');
  const url = `${process.env.API_BASE_URL}/clients/getClients`;
  let response = ''
  if(body.rol){
    //para roles, en esta versión del proyecto no tenemos
    let urlRol = `${url}?rol=${body.rol}`
    console.log('urlRol',urlRol)
    response = await module.exports.consumer(url);
  }else{
    console.log('urlRol',url)
    response = await module.exports.consumer(url);
  }
  return response;
}

module.exports.searchClients = async (body) => {
  console.log('---API--- : searchClients');
  //const url = `${process.env.API_BASE_URL}/clients/search?fullName=${body.fullName}&phone=${body.phone}&documentNumber=${body.documentNumber}&email=${body.email}`;
  const url = `${process.env.API_BASE_URL}/clients/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.updateUser = async (body) => {
  console.log('---API--- : updateUser');
  const url = `${process.env.API_BASE_URL}/users/${body._id}`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

//Preguntas
module.exports.listQuestions = async (body) => {
  console.log('---API--- : listQuestions');
  const url = `${process.env.API_BASE_URL}/frequentQuestions`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.searchQuestions = async (body) => {
  console.log('---API--- : searchQuestions');
  const url = `${process.env.API_BASE_URL}/frequentQuestions/search?target=${body.target}`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.createQuestion = async (body) => {
  console.log('---API--- : createQuestion');
  const url = `${process.env.API_BASE_URL}/frequentQuestions`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.updateQuestion = async (body) => {
  console.log('---API--- : updateQuestion');
  const url = `${process.env.API_BASE_URL}/frequentQuestions/${body._id}`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.publishQuestion = async (body) => {
  console.log('---API--- : publishQuestion');
  const url = `${process.env.API_BASE_URL}/frequentQuestions/${body._id}/publishQuestion`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log('rol::::::::::::', url)
  return response;
}


//Noticias
module.exports.listNews = async (body) => {
  console.log('---API--- : listNews');
  const url = `${process.env.API_BASE_URL}/news`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.searchNews = async (body) => {
  console.log('---API--- : searchNews');
  // const url = `${process.env.API_BASE_URL}/news/search?size=${body.size}&target=${body.target}&title=${body.title}`;
  const url = `${process.env.API_BASE_URL}/news/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.createNewRecord = async (body) => {
  console.log('---API--- : createNewRecord');
  const url = `${process.env.API_BASE_URL}/news`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.updateNewRecord = async (body) => {
  console.log('---API--- : updateNewRecord');
  const url = `${process.env.API_BASE_URL}/news/${body._id}`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.deleteNewRecord = async (body) => {
  console.log('---API--- : deleteNewRecord');
  const url = `${process.env.API_BASE_URL}/news/${body._id}/deleteNew`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.publishNewRecord = async (body) => {
  console.log('---API--- : publishNewRecord');
  const url = `${process.env.API_BASE_URL}/news/${body._id}/publishNew`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.unpublishNewRecord = async (body) => {
  console.log('---API--- : unpublishNewRecord');
  const url = `${process.env.API_BASE_URL}/news/${body._id}/unpublishNew`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

//Rider
module.exports.listActiveRiders = async (body) => {
  console.log('---API--- : listActiveRiders');
  const url = `${process.env.API_BASE_URL}/riders/getActiveRiders`;
  let response = ''
  if(body.rol){
    //para roles, en esta versión del proyecto no tenemos
    let urlRol = `${url}?rol=${body.rol}`
    console.log('urlRol',urlRol)
    response = await module.exports.consumer(url);
  }else{
    console.log('urlRol',url)
    response = await module.exports.consumer(url);
  }
  return response;
}

module.exports.setActive = async (body) => {
  console.log('---API--- : setActive');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/setActive`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.setupRider = async (body) => {
  console.log('---API--- : setupRider');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/setupRider`;
  console.log('url: ', url)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.setEnabledRider = async (body) => {
  console.log('---API--- : setEnabled');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/setEnabled`;
  console.log('url: ', url)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.setdisabledRider = async (body) => {
  console.log('---API--- : setdisabled');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/setdisabled`;
  console.log('url: ', url)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.updateDocumentation = async (body) => {
  console.log('---API--- : updateDocumentation');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/updateDocumentation`;
  console.log('url: ', url)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.searchRiders = async (body) => {
  console.log('---API--- : searchRiders');
  //const url = `${process.env.API_BASE_URL}/riders/search?fullName=${body.fullName}&phone=${body.phone}&documentNumber=${body.documentNumber}&email=${body.email}`;
  const url = `${process.env.API_BASE_URL}/riders/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.listCreditsByRider = async (body) => {
  console.log('---API--- : searchRiders');
  const url = `${process.env.API_BASE_URL}/riders/${body._id}/getCredits`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

//Service
module.exports.createService = async (body) => {
  console.log('---API--- : createService');
  const url = `${process.env.API_BASE_URL}/services/`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.updateService = async (body) => {
  console.log('---API--- : updateService');
  const url = `${process.env.API_BASE_URL}/services/${body.id}`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.searchServices = async (body) => {
  console.log('---API--- : searchServices');
  const url = `${process.env.API_BASE_URL}/services/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
//Credits
module.exports.listCredits = async (body) => {
  console.log('---API--- : listCredits');
  const url = `${process.env.API_BASE_URL}/credits`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.searchCredits = async (body) => {
  console.log('---API--- : searchCredits');
  //const url = `${process.env.API_BASE_URL}/credits/search?fullName=${body.fullName}&phone=${body.phone}&documentNumber=${body.documentNumber}&currentStatus=${body.currentStatus}`;
  const url = `${process.env.API_BASE_URL}/credits/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.createCredit = async (body) => {
  console.log('---API--- : createCredit');
  const url = `${process.env.API_BASE_URL}/credits`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.approveCredit = async (body) => {
  console.log('---API--- : approveCredit');
  const url = `${process.env.API_BASE_URL}/credits/${body._id}/approveCredit`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.rejectCredit = async (body) => {
  console.log('---API--- : rejectCredit');
  const url = `${process.env.API_BASE_URL}/credits/${body._id}/rejectCredit`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.deleteCredit = async (body) => {
  console.log('---API--- : deleteCredit');
  const url = `${process.env.API_BASE_URL}/credits/${body._id}/deleteCredit`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.createRefund = async (body) => {
  console.log('---API--- : createRefund');
  const url = `${process.env.API_BASE_URL}/credits/createRefund`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.createBonus = async (body) => {
  console.log('---API--- : createBonus');
  const url = `${process.env.API_BASE_URL}/credits/createBonus`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

//Configuration
module.exports.getConfiguration = async (body) => {
  console.log('---API--- : getConfiguration');
  const url = `${process.env.API_BASE_URL}/configuration/list`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.saveConfiguration = async (body) => {
  console.log('---API--- : saveConfiguration');
  const url = `${process.env.API_BASE_URL}/configuration`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

//Suggestions
module.exports.getSuggestions = async (body) => {
  console.log('---API--- : getSuggestions');
  const url = `${process.env.API_BASE_URL}/suggestions/`;
  const response = await module.exports.consumer(url,GET);
  return response;
}

module.exports.searchSuggestions = async (body) => {
  console.log('---API--- : searchSuggestions');
  //const url = `${process.env.API_BASE_URL}/suggestions/search?idClient=${body.idClient}&creationDate=${body.creationDate}&active=${body.status}`;
  const url = `${process.env.API_BASE_URL}/suggestions/search`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}