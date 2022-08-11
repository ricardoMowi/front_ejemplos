import fetch from 'node-fetch';
import _ from 'lodash';
import {POST,PUT,PATCH} from './constants/constants'

module.exports.consumer = async (url,method,body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  let options;
  if(method){
    options = {
      method: method,
      headers,
      body: JSON.stringify(body),
    }
  }else{
    options = {
      method: 'GET',
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
      //Agregar el satatus en el body
      return dataWithStatus
    })
  .catch((err) => {
    console.log('-------INI-ERROR-------');
    console.log('ERROR: api.js');
    console.log('URL: '+ url);
    console.log('METHOD: '+ (method || 'GET'));
    console.log("BODY:", body);
    console.log("MESSAGE:", err);
    console.log('-------END-ERROR-------');
  });
  return response || {status:status };
  // return {};
};


module.exports.login = async (body) => {
  console.log('---API--- : login');
  const url = `${process.env.API_BASE_URL}/volunteer/signIn`;
  const response = await module.exports.consumer(url, POST, body);
  console.log('respuesta de back: ', response);
  return response;
}

//////////////////////////////////////////////////////////////////////////////////

module.exports.getStudyCenter = async (body) => {
  console.log('---API--- : getStudyCenter');
  const url = `${process.env.API_BASE_URL}/studyCenter`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createStudyCenter = async (body) => {
  console.log('---API--- : createStudyCenter');
  const url = `${process.env.API_BASE_URL}/studyCenter/createStudyCenter`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.getLocale = async (body) => {
  console.log('---API--- : getLocale');
  const url = `${process.env.API_BASE_URL}/locale`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createLocale = async (body) => {
  console.log('---API--- : createLocale');
  const url = `${process.env.API_BASE_URL}/locale/createLocale`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateLocale = async (body) => {
  console.log('---API--- : updateLocale');
  const url = `${process.env.API_BASE_URL}/locale/${body.id}/updateLocale`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.removeLocale = async (body) => {
  console.log('---API--- : removeLocale');
  const url = `${process.env.API_BASE_URL}/locale/${body.id}/removeLocale`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.getLocaleRoom = async (body) => {
  console.log('---API--- : getLocaleRoom');
  const url = `${process.env.API_BASE_URL}/localeRoom/getLocaleRoom?idLocale=${body.id}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createLocaleRoom = async (body) => {
  console.log('---API--- : createLocaleRoom');
  const url = `${process.env.API_BASE_URL}/localeRoom/createLocaleRoom`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateLocaleRoom = async (body) => {
  console.log('---API--- : updateLocaleRoom');
  const url = `${process.env.API_BASE_URL}/localeRoom/${body.id}/updateLocaleRoom`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.bulkUpdateLocaleRoom = async (body) => {
  console.log('---API--- : bulkUpdateLocaleRoom');
  const url = `${process.env.API_BASE_URL}/localeRoom/bulkUpdate`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.removeLocaleRoom = async (body) => {
  console.log('---API--- : removeLocaleRoom');
  const url = `${process.env.API_BASE_URL}/localeRoom/${body.id}/removeLocaleRoom`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.newEvent = async (body) => {
  console.log('---API--- : newEvent');
  const url = `${process.env.API_BASE_URL}/event/createNewEvent`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.createEvent = async (body) => {
  console.log('---API--- : createEvent');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/createEvent`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateSchoolManagementEvent = async (body) => {
  console.log('---API--- : updateSchoolManagementEvent');
  const url = `${process.env.API_BASE_URL}/schoolManagementEvent/${body.id}/updateEvent`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
} 
module.exports.removeEvent = async (body) => {
  console.log('---API--- : removeEvent');
  const url = `${process.env.API_BASE_URL}/schoolManagementEvent/${body.id}/removeEvent`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.renewAgreement = async (body) => {
  console.log('---API--- : renewAgreement');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.idVolunteer}/renewAgreement?idVolunteerJob=${body.idVolunteerJob}`;
  console.log(body);
  const response = await module.exports.consumer(url, POST, body);
  console.log(response);
  return response;
}
module.exports.renewVirtualAgreement = async (body) => {
  console.log('---API--- : renewVirtualAgreement');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.idVolunteer}/renewVirtualAgreement?idVolunteerJob=${body.idVolunteerJob}`;
  console.log("body", body);
  const response = await module.exports.consumer(url, POST, body);
  console.log("response: ", response);
  return response;
}
module.exports.assignJob = async (body) => {
  console.log('---API--- : assignJob');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/assignJob`;
  console.log(body);
  const response = await module.exports.consumer(url, POST, body);
  console.log(response);
  return response;
}

module.exports.removeAssignation = async (body) => {
  console.log('---API--- : removeAssignation');
  const url = `${process.env.API_BASE_URL}/volunteerJob/${body.id}/removeAssignation`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;


}

module.exports.addTurn = async (body) => {
  console.log('---API--- : addTurn');
  const url = `${process.env.API_BASE_URL}/eventTurn`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.newAttendance = async (body) => {
  console.log('---API--- : newAttendance');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/attendance/createNewAttendance`;
  const response = await module.exports.consumer(url, POST, body);
  console.log(response);
  return response;
}
module.exports.checkAttendance = async (body) => {
  console.log('---API--- : checkAttendance');
  const url = `${process.env.API_BASE_URL}/event/${body.id}/checkAttendance`;
  console.log(body);
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  console.log(response);
  return response;
}

module.exports.getSchoolLeaders = async (body) => {
  console.log('---API--- : getSchoolLeaders');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolLeaders?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchoolEvents = async (body) => {
  console.log('---API--- : getSchoolEvents');
  var query = ``
  body.semesterCode ? query = query + `?semesterCode=${body.semesterCode}` : query = ``
  body.public ? query = query + `&public=${body.public}` : null
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolEvents` + query;
  console.log('url: ', url)

  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getSchoolAvailableWorkshops = async (body) => {
  console.log('---API--- : getSchoolAvailableWorkshops');
  var typeCodeQuery = ``
  body.typeCode ? typeCodeQuery = `&typeCode=${body.typeCode}` : null
  var gradeCodeQuery = ``
  body.grade ? gradeCodeQuery = `&grade=${body.grade}` : null
  var levelCodeQuery = ``
  body.levelCode ? levelCodeQuery = `&levelCode=${body.levelCode}` : null
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolAvailableWorkshops?semesterCode=${body.semesterCode}`+ gradeCodeQuery + typeCodeQuery;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.signUp = async (body) => {
  console.log('---API--- : signUp');
  const url = `${process.env.API_BASE_URL}/volunteer/signUp`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.checkDocument = async (body) => {
  console.log('---API--- : checkDocument');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/checkDocument`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.checkDocumentSpecialEvent = async (body) => {
  console.log('---API--- : checkDocumentSpecialEvent');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/checkDocumentSpecialEvent`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.participationRegister = async (body) => {
  console.log('---API--- : participationRegister');
  const url = `${process.env.API_BASE_URL}/volunteer/participationRegister?formStep=${body.formStep}`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.changePassword = async (body) => {
  console.log('---API--- : changePassword');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.documentNumber}/changePassword`;
  const response = await module.exports.consumer(url,PATCH,body);
  return response;
}

module.exports.changePasswordFromEmail = async (body) => {
  console.log('---API--- : changePasswordFromEmail');
  const url = `${process.env.API_BASE_URL}/volunteer/changePasswordFromEmail`;
  const response = await module.exports.consumer(url,PATCH,body);
  return response;
}

module.exports.resetPassword = async (body) => {
  console.log('---API--- : resetPassword');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.documentNumber}/resetPassword`;
  const response = await module.exports.consumer(url,PATCH,body);
  return response;
}
module.exports.sendEmailResetPassword = async (body) => {
  console.log('---API--- : sendEmailResetPassword');
  const url = `${process.env.API_BASE_URL}/volunteer/sendEmailResetPassword`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.searchVolunteer = async (body) => {
  console.log('---API--- : searchVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/search?documentNumber=${body.documentNumber}&name=${body.name}&lastName=${body.lastName}&email=${body.email}&phone=${body.phone}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.searchVolunteerByJob = async (body) => {
  console.log('---API--- : searchVolunteerByJob');
  var filter = "";
  body.documentNumber ? filter += `&documentNumber=${body.documentNumber}`: null ;
  body.name ? filter += `&name=${body.name}`: null ;
  body.lastName ? filter += `&lastName=${body.lastName}`: null ;
  body.jobs ? filter += `&jobs=[${body.jobs}]`: null ;

  const url = `${process.env.API_BASE_URL}/volunteer/search?semesterCode=${body.semesterCode}${filter}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.searchVolunteerNoJobs = async (body) => {
  console.log('---API--- : searchVolunteerNoJobs');
  const url = `${process.env.API_BASE_URL}/volunteer/search?documentNumber=${body.documentNumber}&name=${body.name}&lastName=${body.lastName}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.searchStudent = async (body) => {
  console.log('---API--- : searchStudent');
  const url = `${process.env.API_BASE_URL}/student/search?documentNumber=${body.documentNumber}&name=${body.name}&lastName=${body.lastName}&idSchool=${body.idSchool}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchool = async (body) => {
  console.log('---API--- : getSchool');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getSchool?semesterCode=${body.semesterCode}`;
  console.log("url ",url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.createStudent = async (body) => {
  console.log('---API--- : createStudent');
  const url = `${process.env.API_BASE_URL}/student/createStudent`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateStudent = async (body) => {
  console.log('---API--- : updateStudent');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/student/${body.id}/updateStudent`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.createEnrollment = async (body) => {
  console.log('---API--- : createEnrollment');
  const url = `${process.env.API_BASE_URL}/student/${body.id}/createEnrollment`;
  console.log("url:   ",url);
  console.log("body:   ",body);
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateEnrollmentWorkshop = async (body) => {
  console.log('---API--- : updateEnrollmentWorkshop');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/enrollment/${body.id}/updateEnrollmentWorkshop`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.getVolunteer = async (body) => {
  console.log('---API--- : getVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}`;
  const response = await module.exports.consumer(url);
  // console.log(response);
  return response;
}

module.exports.getRecruitmentEvent = async (body) => {
  console.log('---API--- : getRecruitmentEvent');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getRecruitmentEvent`;
  const response = await module.exports.consumer(url);
  return response;

}
module.exports.getWelcomeEvent = async (body) => {
  console.log('---API--- : getWelcomeEvent');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getWelcomeEvent`;
  const response = await module.exports.consumer(url);
  return response;

}
module.exports.updateVolunteer = async (body) => {
  console.log('---API--- : updateVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.documentNumber}/updateVolunteer`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url)
  return response;
}

module.exports.updateAllVolunteer = async (body) => {
  console.log('---API--- : updateAllVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/updateAllVolunteer`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.setRoles = async (body) => {
  console.log('---API--- : setRoles');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/volunteer/${body.documentNumber}/setRoles`;
  var body0=body.roles;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body0);
  return response;
}

module.exports.setJobs = async (body) => {
  console.log('---API--- : setJobs');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/setJobs?semesterCode=${body.semesterCode}`;
  var body0 = body.jobs;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body0);
  return response;
}

module.exports.createSession = async (body) => {
  console.log('---API--- : createSession');
  const url = `${process.env.API_BASE_URL}/volunteer/saveSession`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.deleteSession = async (body) => {
  console.log('---API--- : deleteSession');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/deleteSession`;
  console.log("url: ", url);
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.getSessionsByUser = async (body) => {
  console.log('---API--- : getSessionsByUser');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getSessionsByUser?idSession=${body.idSession}`;
  const response = await module.exports.consumer(url);
  return response;
}

////////////Jobs
module.exports.createJob = async (body) => {
  console.log('---API--- : createJob');
  const url = `${process.env.API_BASE_URL}/job/createJob`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateJob = async (body) => {
  console.log('---API--- : updateJob');
  const url = `${process.env.API_BASE_URL}/job/${body.id}/updateJob`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.getAllJobs = async (body) => {
  console.log('---API--- : getAllJobs');
  const url = `${process.env.API_BASE_URL}/job/getAllJobs`;
  const response = await module.exports.consumer(url);
  return response;
}

///////////Organization
module.exports.createOrganization = async (body) => {
  console.log('---API--- : createOrganization');
  const url = `${process.env.API_BASE_URL}/organization/createOrganization`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateOrganization = async (body) => {
  console.log('---API--- : updateOrganziation');
  const url = `${process.env.API_BASE_URL}/organization/${body.id}/updateOrganization`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.getOrganizations = async (body) => {
  console.log('---API--- : getOrganizations');
  const url = `${process.env.API_BASE_URL}/organization/getOrganizations`;
  const response = await module.exports.consumer(url);
  return response;
}
///////////Administradores
module.exports.getAdministrators = async (body) => {
  console.log('---API--- : getAdministrators');
  const url = `${process.env.API_BASE_URL}/volunteerJob/getAdministrators?idJob=${body.idJob}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.createAdministrator = async (body) => {
  console.log('---API--- : createAdministrator');
  const url = `${process.env.API_BASE_URL}/volunteerJob/createAdministrator`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.getAreas = async (body) => {
  console.log('---API--- : getAreas');
  const url = `${process.env.API_BASE_URL}/organization/${body.id}/getAreas`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getCostCenters = async (body) => {
  console.log('---API--- : getCostCenters');
  const url = `${process.env.API_BASE_URL}/organization/${body.id}/getCostCenters`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getPeriods = async (body) => {
  console.log('---API--- : getPeriods');
  const url = `${process.env.API_BASE_URL}/organization/${body.id}/getPeriods`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAllAccounts = async (body) => {
  console.log('---API--- : getAllAccounts');
  const url = `${process.env.API_BASE_URL}/organization/${body.id}/getAllAccounts`;
  const response = await module.exports.consumer(url);
  return response;
}

/////////////Centro de costos
module.exports.createCostCenter = async (body) => {
  console.log('---API--- : createCostCenter');
  const url = `${process.env.API_BASE_URL}/accountingCostCenter/createCostCenter`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.removeCostCenter = async (body) => {
  console.log('---API--- : removeCostCenter');
  const url = `${process.env.API_BASE_URL}/accountingCostCenter/${body.id}/removeCostCenter`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
///////////Periodos contables
module.exports.createNewPeriod = async (body) => {
  console.log('---API--- : createNewPeriod');
  const url = `${process.env.API_BASE_URL}/accountingPeriod/createNewPeriod`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updatePeriod = async (body) => {
  console.log('---API--- : updatePeriod');
  const url = `${process.env.API_BASE_URL}/accountingPeriod/${body.id}/updatePeriod`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.getDeclarationsByPeriod = async (body) => {
  console.log('---API--- : getDeclarationsByPeriod');
  const url = `${process.env.API_BASE_URL}/reports/getDeclarationsByPeriod?idAccountingPeriod=${body.idAccountingPeriod}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getDeclarationsByPeriodByVolunteer = async (body) => {
  console.log('---API--- : getDeclarationsByPeriodByVolunteer');
  const url = `${process.env.API_BASE_URL}/reports/getDeclarationsByPeriodByVolunteer?idAccountingPeriod=${body.idAccountingPeriod}&idVolunteer=${body.idVolunteer}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getGroupedEnrollments = async (body) => {
  console.log('---API--- : getGroupedEnrollments');
  const url = `${process.env.API_BASE_URL}/reports/getGroupedEnrollments?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}&typeCode=${body.typeCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getVolunteersByJobPerSchool = async (body) => {
  console.log('---API--- : getGroupedEnrollments');
  const url = `${process.env.API_BASE_URL}/reports/getVolunteersByJobPerSchool?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
/////////////Cuentas contables
module.exports.createNewAccount = async (body) => {
  console.log('---API--- : createNewAccount');
  const url = `${process.env.API_BASE_URL}/accountingAccount/createNewAccount`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.getAccounts = async (body) => {
  console.log('---API--- : getAccounts');
  const url = `${process.env.API_BASE_URL}/accountingAccount/getAccounts?idOrganization=${body.idOrganization}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.removeAccount = async (body) => {
  console.log('---API--- : removeAccount');
  const url = `${process.env.API_BASE_URL}/accountingAccount/${body.id}/removeAccount`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
/////////////Rendición contable
module.exports.createNewDeclaration = async (body) => {
  console.log('---API--- : createNewDeclaration');
  const url = `${process.env.API_BASE_URL}/accountingDeclaration/createNewDeclaration`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.createNewDeclarationCode = async (body) => {
  console.log('---API--- : createNewDeclarationCode');
  const url = `${process.env.API_BASE_URL}/accountingDeclaration/createNewDeclarationCode`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}


/////////////Actividades
module.exports.createNewActivity = async (body) => {
  console.log('---API--- : createNewActivity');
  const url = `${process.env.API_BASE_URL}/accountingActivity/createNewActivity`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.getActivities = async (body) => {
  console.log('---API--- : getActivities');
  const url = `${process.env.API_BASE_URL}/accountingActivity/getActivities?idAccount=${body.idAccount}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.removeActivity = async (body) => {
  console.log('---API--- : removeActivity');
  const url = `${process.env.API_BASE_URL}/accountingActivity/${body.id}/removeActivity`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

/////////////Rubros
module.exports.createNewHeading = async (body) => {
  console.log('---API--- : createNewHeading');
  const url = `${process.env.API_BASE_URL}/accountingHeading/createNewHeading`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.getHeadings = async (body) => {
  console.log('---API--- : getHeadings');
  const url = `${process.env.API_BASE_URL}/accountingHeading/getHeadings?idActivity=${body.idActivity}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.removeHeading = async (body) => {
  console.log('---API--- : removeHeading');
  const url = `${process.env.API_BASE_URL}/accountingHeading/${body.id}/removeHeading`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

/////////////Subrubros
module.exports.createNewSubHeader = async (body) => {
  console.log('---API--- : createNewSubHeader');
  const url = `${process.env.API_BASE_URL}/accountingSubHeader/createNewSubHeader`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.getSubHeaders = async (body) => {
  console.log('---API--- : getSubHeaders');
  const url = `${process.env.API_BASE_URL}/accountingSubHeader/getSubHeaders?idAccountingHeading=${body.idAccountingHeading}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.removeSubHeader = async (body) => {
  console.log('---API--- : removeSubHeader');
  const url = `${process.env.API_BASE_URL}/accountingSubHeader/${body.id}/removeSubHeader`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

/////////////Area
module.exports.createArea = async (body) => {
  console.log('---API--- : createArea');
  const url = `${process.env.API_BASE_URL}/area/createArea`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.getAreasTree = async (body) => {
  console.log('---API--- : getAllJobs');
  const url = `${process.env.API_BASE_URL}/area/getAreasTree`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.validateSession = async (body) => {
  console.log('---API--- : validateSession');
  // console.log("body: ", body);
  const url = `${process.env.API_BASE_URL}/session/${body.id}/validateSession`;
  // console.log("url: ", url);
  const response = await module.exports.consumer(url);
  // console.log("response: ", response);
  return response;
}

module.exports.deleteJob = async (body) => {
  console.log('---API--- : deleteJob');
  const url = `${process.env.API_BASE_URL}/job/${body.id}/removeJob`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url)
  return response;

}

module.exports.getRolesByJob = async (body) => {
  console.log('---API--- : getRolesByJob');
  const url = `${process.env.API_BASE_URL}/job/${body.id}/getRoles`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.setRolesByJob = async (body) => {
  console.log('---API--- : setRolesByJob');
  const url = `${process.env.API_BASE_URL}/job/${body.id}/setRoles`;
  var body0=body.Roles;
  console.log(body0)
  console.log(body.id)
  const response = await module.exports.consumer(url,PUT,body0);
  console.log(url)
  return response;

}

/////////////////////////////////////

module.exports.getRegions = async (body) => {
  console.log('---API--- : getRegions');
  const url = `${process.env.API_BASE_URL}/location/getRegions`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getProvincesbyRegion = async (body) => {
  console.log('---API--- : getProvincesbyRegion');
  const url = `${process.env.API_BASE_URL}/location/getProvincesByRegion?idRegion=${body.idRegion}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getDistrictsbyProvince = async (body) => {
  console.log('---API--- : getDistrictsbyProvince');
  const url = `${process.env.API_BASE_URL}/location/getDistrictsByProvince?idProvince=${body.idProvince}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getUbigeos = async (body) => {
  console.log('---API--- : getUbigeos');
  const url = `${process.env.API_BASE_URL}/location/getAll`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getEvents = async (body) => {
  console.log('---API--- : getEvents');
  const url = `${process.env.API_BASE_URL}/event/getEvents`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getOpenEvents = async (body) => {
  console.log('---API--- : getOpenEvents');
  const url = `${process.env.API_BASE_URL}/event/getEventsByStatus?status=EVENT_ENROLLMENT_OPENED`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getTurnbyEvent = async (body) => {
  console.log('---API--- : getTurnbyEvent');
  const url = `${process.env.API_BASE_URL}/eventTurn?idEvent=${body.idEvent}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.updateTurn = async (body) => {
  console.log('---API--- : updateTurn');
  const url = `${process.env.API_BASE_URL}/eventTurn/bulkUpdate`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.deleteTurn = async (body) => {
  console.log('---API--- : deleteTurn');
  const url = `${process.env.API_BASE_URL}/eventTurn/${body.idTurn}/deleteTurn`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.updateStatusEvent = async (body) => {
  console.log('---API--- : updateStatusEvent');
  const url = `${process.env.API_BASE_URL}/event/${body.idEvent}/updateStatus`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.updateEvent = async (body) => {
  console.log('---API--- : updateEvent');
  console.log(body);
  const url = `${process.env.API_BASE_URL}/event/${body.idEvent}`;
  console.log(url);
  const response = await module.exports.consumer(url, PUT, body);
  console.log(response);
  return response;
}

module.exports.deleteAttendance = async (body) => {
  console.log('---API--- : deleteAttendance');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/deleteAttendance`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.evaluationCompetenceSave = async (body) => {
  console.log('---API--- : evaluationCompetenceSave');
  const url = `${process.env.API_BASE_URL}/evaluationCompetence/save`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.deleteAttendance = async (body) => {
  console.log('---API--- : deleteAttendance');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/deleteAttendance`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.getRooms = async (body) => {
  console.log('---API--- : getRooms');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolWorkshops?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.createRoom = async (body) => {
  console.log('---API--- : createRoom');
  const url = `${process.env.API_BASE_URL}/workshop/createWorkshop`;
  console.log("url:   ",url);
  console.log("body:   ",body);
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateRoom = async (body) => {
  console.log('---API--- : updateRoom');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/updateWorkshop`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.removeRoom = async (body) => {
  console.log('---API--- : removeRoom');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/removeWorkshop`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.getSchoolWorkshops = async (body) => {
  console.log('---API--- : getSchoolWorkshops');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolWorkshops?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log("url getSchoolWorkshops",url)
  return response;
}

module.exports.getRotations = async (body) => {
  console.log('---API--- : getRotations');
  const url = `${process.env.API_BASE_URL}/rotation/getRotations?idSchool=${body.idSchool}&typeRotation=${body.typeRotation}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createNewRotation = async (body) => {
  console.log('---API--- : createNewRotation');
  const url = `${process.env.API_BASE_URL}/rotation/createNewRotation`;
  console.log("url:   ",url);
  console.log("body:   ",body);
  const response = await module.exports.consumer(url,POST,body);
  return response;
}

module.exports.updateRotation = async (body) => {
  console.log('---API--- : updateRotation');
  const url = `${process.env.API_BASE_URL}/rotation/${body.id}/updateRotation`;
  console.log(url);
  console.log("body ",body)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.updateAssignmentRecord = async (body) => {
  console.log('---API--- : updateAssignmentRecord');
  const url = `${process.env.API_BASE_URL}/assignmentRecord/${body.id}/updateAssignmentRecord`;
  console.log(url);
  console.log("body ",body)
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.bulkUpdateAssignment = async (body) => {
  console.log('---API--- : bulkUpdateAssignment');
  const url = `${process.env.API_BASE_URL}/assignmentRecord/bulkUpdateAssignment`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.getPenddingTests = async (body) => {
  console.log('---API--- : getPenddingTests');
  const url = `${process.env.API_BASE_URL}/assignmentRecord/getPenddingTests`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.removeRotation = async (body) => {
  console.log('---API--- : removeRotation');
  const url = `${process.env.API_BASE_URL}/rotation/${body.id}/removeRotation`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.listRequests = async (body) => {
  console.log('---API--- : listRequests: ', body);
  const url = `${process.env.API_BASE_URL}/request/getRequests?typeCode=${body.typeCode}&statusCode=${body.statusCode}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}


module.exports.listRequestsxSchool = async (body) => {
  console.log('---API--- : getAllRequests');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getAllRequests?typeCode=${body.typeCode}&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.listRequestsxVolunteer = async (body) => {
  console.log('---API--- : listRequestsxVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.idVolunteer}/getRequests?semesterCode=${body.semesterCode}&typeCode=${body.typeCode}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createRequest = async (body) => {
  console.log('---API--- : createRequest');
  const url = `${process.env.API_BASE_URL}/request/createRequest`;
  console.log("url:   ",url);
  console.log("body:   ",body);
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.closeRequest = async (body) => {
  console.log('---API--- : closeRequest');
  const url = `${process.env.API_BASE_URL}/request/${body.id}/closeRequest`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.removeRequest = async (body) => {
  console.log('---API--- : removeRequest');
  const url = `${process.env.API_BASE_URL}/request/${body.id}/removeRequest`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.updateRequestStatus = async (body) => {
  console.log('---API--- : updateRequestStatus');
  const url = `${process.env.API_BASE_URL}/request/${body.id}/updateRequestStatus`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.listStudentsByWorkshop = async (body) => {
  console.log('---API--- : listStudentsByWorkshop');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/listStudentsByWorkshop`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.updateGrades = async (body) => {
  console.log('---API--- : updateGrades');
  const url = `${process.env.API_BASE_URL}/enrollment/${body.id}/updateGrades`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
///schoolManagementEventType

module.exports.getAllTypes = async (body) => {
  console.log('---API--- : getAllTypes');
  const url = `${process.env.API_BASE_URL}/schoolManagementEventType/getAllTypes`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAllClasses = async (body) => {
  console.log('---API--- : getAllClasses');
  const url = `${process.env.API_BASE_URL}/schoolManagementEventType/getAllClasses`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateClass = async (body) => {
  console.log('---API--- : updateClass');
  const url = `${process.env.API_BASE_URL}/schoolManagementEventType/${body.id}/updateClass`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.updateWorkshop = async (body) => {
  console.log('---API--- : updateWorkshop');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/updateWorkshop`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.updateWorkshopContent = async (body) => {
  console.log('---API--- : updateWorkshopContent');
  const url = `${process.env.API_BASE_URL}/workshopContent/${body.idWorkshop}/updateWorkshopContent`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}

module.exports.getPedagogicalKit = async (body) => {
  console.log('---API--- : getPedagogicalKit');
  const url = `${process.env.API_BASE_URL}/document/getPedagogicalKit`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}
//////////////////////////////////////////////////////////////////////////////////

module.exports.listPages = async (body) => {
  console.log('---API--- : listPages');
  const url = `${process.env.API_BASE_URL}/page/`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.listWithComponents = async (body) => {
  console.log('---API--- : listWithComponents');
  const url = `${process.env.API_BASE_URL}/page/listWithComponents`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createPage = async (body) => {
  console.log('---API--- : createPage');
  const url = `${process.env.API_BASE_URL}/page/createPage`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}




module.exports.listRoles = async (body) => {
  console.log('---API--- : listRoles');
  const url = `${process.env.API_BASE_URL}/role/getRoles`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getJobsTree = async (body) => {
  console.log('---API--- : getJobsTree');
  const url = `${process.env.API_BASE_URL}/job/getJobsTree`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.listRolesByUser = async (body) => {
  console.log('---API--- : listRoles');
  const url = `${process.env.API_BASE_URL}/role/${body.id}/getRoles`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getRolePages = async (body) => {
  console.log('---API--- : getRolePages');
  const url = `${process.env.API_BASE_URL}/role/${body.id}/getPages`;
  const response = await module.exports.consumer(url);
  return response;
}
// Antiguo filtro de pantalla administrar creando
module.exports.getRolesFilters = async (body) => {
  console.log('---API--- : getRolesFilters');
  const url = `${process.env.API_BASE_URL}/role/getRolesFilters`;
  const response = await module.exports.consumer(url);
  return response;
}

//Roles por usuario
module.exports.getRolesByUser = async (body) => {
  console.log('---API--- : getRolesByUser');
  const url = `${process.env.API_BASE_URL}/role/${body.id}/getRolesByUser`;
  const response = await module.exports.consumer(url);
  return response;
}

// Filtro de pantalla administrar creando
module.exports.getJobsFilters = async (body) => {
  console.log('---API--- : getJobsFilters');
  const url = `${process.env.API_BASE_URL}/job/getJobsFilters`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createRole = async (body) => {
  console.log('---API--- : createRole');
  const url = `${process.env.API_BASE_URL}/role/createRole`;
  const response = await module.exports.consumer(url,POST,body);
  return response;
}
module.exports.updateRole = async (body) => {
  console.log('---API--- : updateRole');
  
  const url = `${process.env.API_BASE_URL}/role/${body.id}/updateRole`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url)
  console.log(body)
  return response;
}
module.exports.setPages = async (body) => {
  console.log('---API--- : setPages');
  var body0=body.pages;
  const url = `${process.env.API_BASE_URL}/role/${body.id}/setPages`;
  const response = await module.exports.consumer(url,PUT,body0);
  console.log(url)
  console.log(body)
  return response;
}
module.exports.removePages = async (body) => {
  console.log('---API--- : removePages'); 
  const url = `${process.env.API_BASE_URL}/role/${body.id}/removePages`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}



module.exports.deleteRole = async (body) => {
  console.log('---API--- : deleteRole');
  const url = `${process.env.API_BASE_URL}/role/${body.id}/removeRole`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;


}

//////////////////////////


module.exports.getPenddingEvaluations = async (body) => {
  console.log('---API--- : getPenddingEvaluations');
  const url = `${process.env.API_BASE_URL}/evaluation/getPenddingEvaluations?${body.semesterCode?'semesterCode='+body.semesterCode+'&':''}${body.documentNumber?'documentNumber='+body.documentNumber+'&':''}${body.name?'name='+body.name+'&':''}${body.lastName?'lastName='+body.lastName+'&':''}${body.email?'email='+body.email+'&':''}${body.phone?'phone='+body.phone+'&':''}`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.evaluationUpdate = async (body) => {
  console.log('---API--- : evaluationUpdate');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/evaluationUpdate`;
  const response = await module.exports.consumer(url,PUT,body);
  return response;
}
module.exports.getEvaluation = async (body) => {
  console.log('---API--- : getEvaluation');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/getEvaluation`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.finishEvaluation = async (body) => {
  console.log('---API--- : finishEvaluation');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/finishEvaluation`;
  console.log(url);
  const response = await module.exports.consumer(url,PUT,body);
  console.log(response);
  return response;
}
module.exports.getHistoricalEvaluations = async (body) => {
  console.log('---API--- : getPenddingEvaluations');
  const url = `${process.env.API_BASE_URL}/evaluation/${body.id}/getHistoricalEvaluations/?semesterCode=${body.semesterCode}`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}


module.exports.getSchoolEventsForAssistance = async (body) => {
  console.log('---API--- : getSchoolEventsForAssistance');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolEventsForAssistance?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}

module.exports.getParticipantsSenior = async (body) => {
  console.log('---API--- : getParticipantsSenior');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getParticipantsSenior?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}

//////Docentes//////
module.exports.getTeachers = async (body) => {
  console.log('---API--- : getTeachers');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getTeachers?semesterCode=${body.semesterCode}&schoolManagementEventId=${body.schoolManagementEventId}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.getRegisteredProjects = async (body) => {
  console.log('---API--- : getRegisteredProjects');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getRegisteredProjects?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.setAsRetired = async (body) => {
  console.log('---API--- : setAsRetired');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/setAsRetired`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}
module.exports.setAsSanctioned = async (body) => {
  console.log('---API--- : setAsSanctioned');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/setAsSanctioned?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}
module.exports.setAsSeparated = async (body) => {
  console.log('---API--- : setAsSeparated');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/setAsSeparated?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}
module.exports.setAsActive = async (body) => {
  console.log('---API--- : setAsActive');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/setAsActive?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}

////////Colegio////////////////
module.exports.getProvinceById = async (body) => {
  console.log('---API--- : getProvinceById');
  const url = `${process.env.API_BASE_URL}/location/${body.id}/getProvince`;
  const response = await module.exports.consumer(url);
  console.log(url);
  return response;
}
module.exports.getDistrictById = async (body) => {
  console.log('---API--- : getDistrictById');
  const url = `${process.env.API_BASE_URL}/location/${body.id}/getDistrict`;
  const response = await module.exports.consumer(url);
  return response;
}
///Mi asistencia////
module.exports.getRecordVolunteerJobs = async (body) => {
  console.log('---API--- : getRecordVolunteerJobs');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getRecordVolunteerJobs?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  console.log(url)
  return response;
}
module.exports.updateVolunteerSchool = async (body) => {
  console.log('---API--- : updateVolunteerSchool');
  const url = `${process.env.API_BASE_URL}/volunteerJob/${body.id}/updateVolunteerSchool?idSchool=${body.idSchool}&idJob=${body.idJob}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}
module.exports.updateJobVolunteerJob = async (body) => {
  console.log('---API--- : updateJobVolunteerJob');
  const url = `${process.env.API_BASE_URL}/volunteerJob/${body.id}/updateJobVolunteerJob?idJob=${body.idJob}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log(url);
  return response;
}

module.exports.getAttendanceReport = async (body) => {
  console.log('---API--- : getAttendanceReport');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getAttendanceReport?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  console.log(url)
  return response;
}
module.exports.getAttendanceByAssessment = async (body) => {
  console.log('---API--- : getAttendancegetAttendanceByAssessmentReport');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getAttendanceByAssessment?semesterCode=${body.semesterCode}&idProject=${body.idProject}`;
  const response = await module.exports.consumer(url);
  console.log(url)
  return response;
}
module.exports.getAllAttendanceReport = async (body) => {
  console.log('---API--- : getAllAttendanceReport');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getAllAttendanceReport`;
  const response = await module.exports.consumer(url);
  console.log(url)
  return response;
}
module.exports.getVolunteerJobs = async (body) => {
  console.log('---API--- : getVolunteerJobs');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getJobs?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
////Mi Equipo
module.exports.getParticipants = async (body) => {
  console.log('---API--- : getParticipants');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/getParticipants`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getWorkshop = async (body) => {
  console.log('---API--- : getWorkshop');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getWorkshop?semesterCode=${body.semesterCode}`;
  console.log('url: ', url)  
  const response = await module.exports.consumer(url);
  return response;
}
//////////////////////////

module.exports.getMasterValues = async (body) => {
  console.log('---API--- : getMasterValues');

  var filter = "";
  body.idMaster ? filter = `idMaster=${body.idMaster}`: null ;
  body.ids ? filter = `ids=[${body.ids}]`: null ;

  const url = `${process.env.API_BASE_URL}/master/value?${filter}`;
  //const url = `${process.env.API_BASE_URL}/master/value?idMaster=${body.idMaster}&ids=${body.ids}`;
  console.log("url ",url)
  console.log("getMasterValues body  ",body);

  const response = await module.exports.consumer(url);

  return response;
}


module.exports.getJobs = async (body) => {
  console.log('---API--- : getJobs');
  const url = `${process.env.API_BASE_URL}/job/getJobs?category=${body.category}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateMasterValues = async (body) => {
  console.log('---API--- : updateMasterValues');
  const url = `${process.env.API_BASE_URL}/master/value/${body.code}`;
  const response = await module.exports.consumer(url,PUT,body);
  console.log('updateMasterValues: ', response);
  return response;
}

module.exports.desktopValues = async (body) => {
  console.log('---API--- : desktopValues');
  const url = `${process.env.API_BASE_URL}/master/desktopValues?statusCode=${body.statusCode}&seniorityCode=${body.seniorityCode}&recruitmentStatusCode=${body.recruitmentStatusCode}`;
  // console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  // console.log("resultado");
  // console.log(response);
  return response;
}
module.exports.getDesktopConfiguration = async (body) => {
  console.log('---API--- : getDesktopConfiguration');
  const url = `${process.env.API_BASE_URL}/master/getDesktopConfiguration`;
  console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getWelcomeAndCapacitationConfiguration = async (body) => {
  console.log('---API--- : getDesktopConfiguration');
  const url = `${process.env.API_BASE_URL}/master/value?idMaster[]=18`;
  console.log("url:"+  url);
  let response = await module.exports.consumer(url);

  var filter  = [
    'DESKTOP_WELCOME_ADDRESS',
    'DESKTOP_WELCOME_HOUR',
    'DESKTOP_WELCOME_DATE',
    'DESKTOP_CAPACITATION_ADDRESS',
    'DESKTOP_CAPACITATION_HOUR',
    'DESKTOP_CAPACITATION_DATE',
  ]
  response.body = _.filter(response.body, function(o) {
    return _.includes(filter, o.code);
  });
  ////////////////
  return response;
}

module.exports.getSchoolBus = async (body) => {
  console.log('---API--- : getSchoolBus');
  const url = `${process.env.API_BASE_URL}/school/getSchoolBus`;
  console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  // console.log(response);
  return response;
}
module.exports.listSchools = async (body) => {
  console.log('---API--- : listSchools');
  const url = `${process.env.API_BASE_URL}/school/listSchools`;
  console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getProject = async (body) => {
  console.log('---API--- : getProject');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getProject`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getAvailableSonProjects = async (body) => {
  console.log('---API--- : getAvailableSonProjects');
  var url = `${process.env.API_BASE_URL}/school/${body.id}/getAvailableSonProjects`;
  if(body.idSon){
    url = `${process.env.API_BASE_URL}/school/${body.id}/getAvailableSonProjects?idSon=${body.idSon}`
  }
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getCompetencies = async (body) => {
  console.log('---API--- : getCompetencies');
  const url = `${process.env.API_BASE_URL}/competence/list`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createCompetence = async (body) => {
  console.log('---API--- : createCompetence');
  const url = `${process.env.API_BASE_URL}/competence/create`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.assignCompetence = async (body) => {
  console.log('---API--- : assignCompetence');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/assignCompetence`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}


module.exports.searchProjects = async (body) => {
  console.log('---API--- : searchProjects');
  const url = `${process.env.API_BASE_URL}/school/searchProjects`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.getAvailableProjects = async (body) => {
  console.log('---API--- : getAvailableProjects');
  const url = `${process.env.API_BASE_URL}/school/getAvailableProjects`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createProject = async (body) => {
  console.log('---API--- : createProject');
  const url = `${process.env.API_BASE_URL}/school/createProject`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.createTeam = async (body) => {
  console.log('---API--- : createTeam');
  const url = `${process.env.API_BASE_URL}/school/${body.idFather}/createTeam`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateProject = async (body) => {
  console.log('---API--- : updateProject');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/updateProject`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.deleteProject = async (body) => {
  console.log('---API--- : deleteProject');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/deleteProject`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.deleteProjectCompetence = async (body) => {
  console.log('---API--- : deleteProjectCompetence');
  const url = `${process.env.API_BASE_URL}/school/deleteProjectCompetence`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.updateProjectCompetence = async (body) => {
  console.log('---API--- : updateProjectCompetence');
  const url = `${process.env.API_BASE_URL}/school/updateProjectCompetence`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}


//Inscripción a proyecto
//Paso 1
module.exports.enrollToProject = async (body) => {
  console.log('---API--- : enrollToProject');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/enrollToProject?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
//Paso 2
module.exports.generateEnrollmentEvaluation = async (body) => {
  console.log('---API--- : generateEnrollmentEvaluation');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/generateEnrollmentEvaluation`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
//Paso 3
module.exports.fillTest = async (body) => {
  console.log('---API--- : fillTest');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/fillTest`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
//Paso 4
module.exports.finishVolunteerEnrollment = async (body) => {
  console.log('---API--- : finishVolunteerEnrollment');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/finishVolunteerEnrollment`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateQuestion = async (body) => {
  console.log('---API--- : updateQuestion');
  const url = `${process.env.API_BASE_URL}/question/${body.id}/updateQuestion`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.deleteQuestion = async (body) => {
  console.log('---API--- : deleteQuestion');
  const url = `${process.env.API_BASE_URL}/question/${body.id}/deleteQuestion`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.createQuestion = async (body) => {
  console.log('---API--- : createQuestion');
  const url = `${process.env.API_BASE_URL}/question/createQuestion`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.createAnswer = async (body) => {
  console.log('---API--- : createAnswer');
  const url = `${process.env.API_BASE_URL}/question/${body.idQuestion}/createAnswer`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateAnswer = async (body) => {
  console.log('---API--- : updateAnswer');
  const url = `${process.env.API_BASE_URL}/answer/${body.idAnswer}/updateAnswer`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.getQuestions = async (body) => {
  console.log('---API--- : getQuestions');
  var url = `${process.env.API_BASE_URL}/question/getQuestions`;
  if(body.idAssignmentRecord){
    url = `${process.env.API_BASE_URL}/question/getQuestions?idAssignmentRecord=${body.idAssignmentRecord}`
  }
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.listTeams = async (body) => {
  console.log('---API--- : listTeams');
  const url = `${process.env.API_BASE_URL}/team/getAllTeams`;
  console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.listSchoolsBySemester = async (body) => {
  console.log('---API--- : listSchoolsBySemester');
  const url = `${process.env.API_BASE_URL}/school/listSchoolsBySemester?semesterCode=${body.semesterCode}`;
  console.log("url:"+  url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSemesterCodes = async (body) => {
  console.log('---API--- : getSemesterCodes');
  const url = `${process.env.API_BASE_URL}/event/getSemestersByEvents`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getAttendanceBySemester = async (body) => {
  console.log('---API--- : getAttendanceBySemester');
  const url = `${process.env.API_BASE_URL}/attendance/getAttendanceBySemester?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getAttendanceByStudyCenter = async (body) => {
  console.log('---API--- : getAttendanceByStudyCenter');
  const url = `${process.env.API_BASE_URL}/studyCenter/${body.id}/getAttendance?startDate=${body.startDate}&&endDate=${body.endDate}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getAttendances = async (body) => {
  console.log('---API--- : getAttendances');
  const url = `${process.env.API_BASE_URL}/studyCenter/listAttendances?startDate=${body.startDate}&&endDate=${body.endDate}`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getValues= async (body) => {
  console.log('---API--- : getValues');
  var url1 = `${process.env.API_BASE_URL}/master/value`;
  _.map(body, (id, i) => {
    if(i == 0){
      url1 = url1 + `?ids[]=${id}&`;
    }else{
      if(i == body.length - 1){
      url1= url1 + `ids[]=${id}`;
    }else{
      url1 = url1 + `ids[]=${id}&`;
    }
    }
    })

    const url=url1;
    console.log("url "+ url);
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getStudentAttendances = async (body) => {
  console.log('---API--- : getStudentAttendances');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/listAttendacesByWorkshop?descriptionDetail=${body.descriptionDetail}&semesterCode=${body.semesterCode}`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.listAllAttendacesByWorkshop = async (body) => {
  console.log('---API--- : listAllAttendacesByWorkshop');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/listAllAttendacesByWorkshop`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.createNewAttendanceByStudent = async (body) => {
  console.log('---API--- : createNewAttendanceByStudent');
  const url = `${process.env.API_BASE_URL}/attendance/createNewAttendanceByStudent`;
  console.log(url);
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.updateAttendance = async (body) => {
  console.log('---API--- : updateAttendance');
  const url = `${process.env.API_BASE_URL}/attendance/${body.id}/updateAttendance`;
  console.log(url);
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}

module.exports.createNewAttendanceByEvent = async (body) => {
  console.log('---API--- : createNewAttendanceByEvent');
  const url = `${process.env.API_BASE_URL}/attendance/createNewAttendanceByEvent`;
  console.log('body: ', body);
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.getWorkshopContent = async (body) => {
  console.log('---API--- : getWorkshopContent');
  const url = `${process.env.API_BASE_URL}/workshop/${body.id}/getWorkshopContent`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getCurrentSemester = async (body) => {
  console.log('---API--- : getCurrentSemester');
  const url = `${process.env.API_BASE_URL}/semester/getCurrentSemester`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getLastSemesters = async (body) => {
  console.log('---API--- : getLastSemesters');
  const url = `${process.env.API_BASE_URL}/semester/getLastSemesters`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getDigitalResources = async (body) => {
  console.log('---API--- : getDigitalResources');
  const url = `${process.env.API_BASE_URL}/document/getDigitalResources`;
  const response = await module.exports.consumer(url);
  return response;
}

module.exports.getBirthdate = async (body) => {
  console.log('---API--- : getBirthdate');
  const url = `${process.env.API_BASE_URL}/school/${body.idSchool}/getBirthdate?month=${body.month}&&semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getPenddingAssignments = async (body) => {
  console.log('---API--- : getPenddingAssignments');
  const url = `${process.env.API_BASE_URL}/school/getAssignments`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getOrganizationTree = async (body) => {
  console.log('---API--- : getOrganizationTree');
  const url = `${process.env.API_BASE_URL}/job/getOrganizationTree?semesterCode=${body.semesterCode}`;
  console.log(url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getPreviousSemesters = async (body) => {
  console.log('---API--- : getPreviousSemesters');
  const url = `${process.env.API_BASE_URL}/semester/getPreviousSemesters`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchoolEvent = async (body) => {
  console.log('---API--- : getSchoolEvent');
  const url = `${process.env.API_BASE_URL}/schoolManagementEvent/${body.id}/getSchoolEvent`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchoolEventsDetail = async (body) => {
  console.log('---API--- : getSchoolEventsDetail');
  const url = `${process.env.API_BASE_URL}/schoolManagementEvent/${body.id}/getSchoolEventsDetail?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateSchoolEventsDetail = async (body) => {
  console.log('---API--- : updateSchoolEventsDetail');
  const url = `${process.env.API_BASE_URL}/schoolManagementEventDetail/${body.id}/update`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.getLocationsByDisctrics = async (body) => {
  console.log('---API--- : getLocationsByDisctrics');
  const url = `${process.env.API_BASE_URL}/location/getLocationsByDisctrics?idsDistrict=[${body.idsDistrict}]`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getReportAttendancesBySchoolByStudent = async (body) => {
  console.log('---API--- : getReportAttendancesBySchoolByStudent');
  const url = `${process.env.API_BASE_URL}/reports/getReportAttendancesBySchoolByStudent?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAllStudentsBySchool = async (body) => {
  console.log('---API--- : getAllStudentsBySchool');
  const url = `${process.env.API_BASE_URL}/reports/getAllStudentsBySchool?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getReportAttendancesBySchoolByVolunteers = async (body) => {
  console.log('---API--- : getReportAttendancesBySchoolByVolunteers');
  const url = `${process.env.API_BASE_URL}/reports/getReportAttendancesBySchoolByVolunteers?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAllVolunteersBySchool = async (body) => {
  console.log('---API--- : getAllVolunteersBySchool');
  const url = `${process.env.API_BASE_URL}/reports/getAllVolunteersBySchool?semesterCode=${body.semesterCode}&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchoolTree = async (body) => {
  console.log('---API--- : getSchoolTree');
  const url = `${process.env.API_BASE_URL}/school/${body.id}/getSchoolTree?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getStudentsBySchool = async (body) => {
  console.log('---API--- : getStudentsBySchool');
  const url = `${process.env.API_BASE_URL}/reports/getStudentsBySchool?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getWorkshopAssignments = async (body) => {
  console.log('---API--- : getWorkshopAssignments');
  const url = `${process.env.API_BASE_URL}/school/${body.idSchool}/getWorkshopAssignments?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSchoolStudents = async (body) => {
  console.log('---API--- : getSchoolStudents');
  const url = `${process.env.API_BASE_URL}/school/${body.idSchool}/getSchoolStudents?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateAssignmentWorkshop = async (body) => {
  console.log('---API--- : updateAssignmentWorkshop');
  const url = `${process.env.API_BASE_URL}/assignmentRecord/updateAssignmentWorkshop`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.registerConfirmation = async (body) => {
  console.log('---API--- : registerConfirmation');
  const url = `${process.env.API_BASE_URL}/volunteerJob/registerConfirmation?semesterCode=${body.semesterCode}&idVolunteer=${body.idVolunteer}`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
module.exports.updateFinalResult = async (body) => {
  console.log('---API--- : updateFinalResult');
  const url = `${process.env.API_BASE_URL}/volunteerJob/${body.id}/updateFinalResult`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
///reportes
module.exports.getLastAttendancesByVolunteer = async (body) => {
  console.log('---API--- : getLastAttendancesByVolunteer');
  const url = `${process.env.API_BASE_URL}/reports/getLastAttendancesByVolunteer?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getLastAttendancesByVolunteerBySchool = async (body) => {
  console.log('---API--- : getLastAttendancesByVolunteerBySchool');
  const url = `${process.env.API_BASE_URL}/reports/getLastAttendancesByVolunteerBySchool?idSchoolManagementEvent=${body.id}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getReportBySchoolByVolunteer = async (body) => {
  console.log('---API--- : getReportBySchoolByVolunteer');
  const url = `${process.env.API_BASE_URL}/reports/getReportBySchoolByVolunteer?semesterCode=${body.semesterCode}&&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getAttendanceByTeamByEvent = async (body) => {
  console.log('---API--- : getAttendanceByTeamByEvent');
  const url = `${process.env.API_BASE_URL}/reports/getAttendanceByTeamByEvent?semesterCode=${body.semesterCode}&&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getStudentsReportBySchool = async (body) => {
  console.log('---API--- : getStudentsReportBySchool');
  const url = `${process.env.API_BASE_URL}/reports/getStudentsReportBySchool?semesterCode=${body.semesterCode}&&idSchool=${body.idSchool}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getConsolidateAttendancesByVolunteer = async (body) => {
  console.log('---API--- : getConsolidateAttendancesByVolunteer');
  const url = `${process.env.API_BASE_URL}/reports/getConsolidateAttendancesByVolunteer?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getConsolidateAttendancesByStudent = async (body) => {
  console.log('---API--- : getConsolidateAttendancesByStudent');
  const url = `${process.env.API_BASE_URL}/reports/getConsolidateAttendancesByStudent?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getRetentionRate = async (body) => {
  console.log('---API--- : getRetentionRate');
  const url = `${process.env.API_BASE_URL}/reports/getRetentionRate?currentSemerterCode=${body.currentSemerterCode}&&nextSemerterCode=${body.nextSemerterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getRetentionRateDetail = async (body) => {
  console.log('---API--- : getRetentionRateDetail');
  const url = `${process.env.API_BASE_URL}/reports/getRetentionRateDetail?idSchool=${body.idSchool}&&currentSemerterCode=${body.currentSemerterCode}&&nextSemerterCode=${body.nextSemerterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getSemesters = async (body) => {
  console.log('---API--- : getSemesters');
  const url = `${process.env.API_BASE_URL}/semester/getSemesters`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getVolunteerRegisterBySumate = async (body) => {
  console.log('---API--- : getVolunteerRegisterBySumate');
  var filter = '';
  if(body.idRegion){
    filter += `?idRegion=${body.idRegion}&`
    body.startDate ? filter += `&startDate=${body.startDate}&endDate=${body.endDate}` : null
  }else{
    body.startDate ? filter += `?startDate=${body.startDate}&endDate=${body.endDate}` : null
  }
  const url = `${process.env.API_BASE_URL}/reports/getVolunteerRegisterBySumate${filter}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getVolunteerRegisterByEvents = async (body) => {
  console.log('---API--- : getVolunteerRegisterByEvents');
  var filter = '';
  if(body.attendance){
    filter += `?attendance=${body.attendance}&`
    body.startDate ? filter += `&startDate=${body.startDate}&endDate=${body.endDate}` : null
  }else{
    body.startDate ? filter += `?startDate=${body.startDate}&endDate=${body.endDate}` : null
  }
  const url = `${process.env.API_BASE_URL}/reports/getVolunteerRegisterByEvents${filter}`;
  console.log("url: ", url);
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.linkVolunteerSinc = async (body) => {
  console.log('---API--- : linkVolunteerSinc');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/linkVolunteerSinc`;
  console.log("url: ", url);
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.getDigitalSignature = async (body) => {
  console.log('---API--- : getDigitalSignature');
  const url = `${process.env.API_BASE_URL}/document/getDigitalSignature`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateDigitalSignature = async (body) => {
  console.log('---API--- : updateDigitalSignature');
  const url = `${process.env.API_BASE_URL}/document/updateDigitalSignature`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
//Gestión de documentos por proyectos
module.exports.createDocument = async (body) => {
  console.log('---API--- : createDocument');
  const url = `${process.env.API_BASE_URL}/document/createDocument`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}
module.exports.getDocumentsProject = async (body) => {
  console.log('---API--- : getDocumentsProject');
  const url = `${process.env.API_BASE_URL}/document/getDocumentsProject?idProject=${body.idProject}`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateDocument = async (body) => {
  console.log('---API--- : updateDocument');
  const url = `${process.env.API_BASE_URL}/document/updateDocument`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.updatePickUpStudent = async (body) => {
  console.log('---API--- : updatePickUpStudent');
  const url = `${process.env.API_BASE_URL}/student/${body.id}/updatePickUpStudent`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.getAllPagesByVolunteer = async (body) => {
  console.log('---API--- : getAllPagesByVolunteer');
  const url = `${process.env.API_BASE_URL}/volunteer/${body.id}/getAllPagesByVolunteer?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}
//ANIVERSARIO
  //MAESTRO DE PARTICIPACIONES
module.exports.getSpecialEventParticipation = async (body) => {
  console.log('---API--- : getSpecialEventParticipation');
  const url = `${process.env.API_BASE_URL}/participation/getParticipations`;
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.updateSpecialEventParticipation = async (body) => {
  console.log('---API--- : updateSpecialEventParticipation');
  const url = `${process.env.API_BASE_URL}/participation/${body.id}/updateParticipation`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.createSpecialEventParticipation = async (body) => {
  console.log('---API--- : createSpecialEventParticipation');
  const url = `${process.env.API_BASE_URL}/participation/createParticipation`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.createScopeLink = async (body) => {
  console.log('---API--- : createScopeLink');
  const url = `${process.env.API_BASE_URL}/participation/${body.idParticipation}/createAnniversaryLink`;
  const response = await module.exports.consumer(url, POST, body);
  return response;
}

module.exports.deleteSpecialEventParticipation = async (body) => {
  console.log('---API--- : deleteSpecialEventParticipation');
  const url = `${process.env.API_BASE_URL}/participation/${body.id}/removeParticipation`;
  const response = await module.exports.consumer(url, PUT, body);
  return response;
}
module.exports.searchSpecialEventParticipation = async (body) => {
  console.log('---API--- : searchSpecialEventParticipation');  
  var idTeam = ``
  body.idTeam ? idTeam = `&idTeam=${body.idTeam}` : null
  const url = `${process.env.API_BASE_URL}/participation/searchParticipations?documentNumber=${body.documentNumber}&name=${body.name}&lastName=${body.lastName}&roleCode=${body.roleCode}`+idTeam;
  console.log('URL::::::::::::', url)
  const response = await module.exports.consumer(url);
  return response;
}
module.exports.getParticipantByDocument = async (body) => {
  console.log('---API--- : getParticipantByDocument');
  const url = `${process.env.API_BASE_URL}/participation/getParticipantByDocument?documentNumber=${body.documentNumber}`;
  const response = await module.exports.consumer(url);
  return response;
}

// module.exports.searchVolunteerByJob = async (body) => {
//   console.log('---API--- : searchVolunteerByJob');
//   var filter = "";
//   body.documentNumber ? filter += `&documentNumber=${body.documentNumber}`: null ;
//   body.name ? filter += `&name=${body.name}`: null ;
//   body.lastName ? filter += `&lastName=${body.lastName}`: null ;
//   body.jobs ? filter += `&jobs=[${body.jobs}]`: null ;

//   const url = `${process.env.API_BASE_URL}/volunteer/search?semesterCode=${body.semesterCode}${filter}`;
//   const response = await module.exports.consumer(url);
//   console.log(url);
//   return response;
// }

//MAESTRO DE TALLERES
module.exports.getWorkshops = async (body) => {
  console.log('---API--- : getWorkshops');
  const url = `${process.env.API_BASE_URL}/workshop/getWorkshops?semesterCode=${body.semesterCode}`;
  const response = await module.exports.consumer(url);
  return response;
}

//TALLERES VIRTUALES
module.exports.getWorkshopsVirtual = async (body) => {
  console.log('---API--- : getWorkshopsVirtual');
  const url = `${process.env.API_BASE_URL}/workshop/getWorkshopsVirtual?semesterCode=${body.semesterCode}&typeCode=${body.typeCode}&categoryCode=${body.categoryCode}&contentCode=${body.contentCode}`;
  const response = await module.exports.consumer(url);
  return response;
}