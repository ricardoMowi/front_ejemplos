import Api from './Api';
const koa = require('koa');
import _ from 'lodash';
const userAgent = require('koa-useragent');

module.exports.login = async (ctx) => {
    const body = ctx.request.body;
    var browserData = {
        device:((ctx.userAgent.isMobile==true)?'Mobile':'') + ((ctx.userAgent.isTablet==true)?'Tablet':'') + ((ctx.userAgent.isDesktop==true)?'Desktop':''),
        browserName:ctx.userAgent.browser,
        platform:ctx.userAgent.platform,
        ipAddress: ctx.request.header['x-real-ip'] || 'LOCALHOST'
    };
    body.browserData = browserData;
    let response = await Api.login(body);

    var idSchool = '' ;
    var pagesArray = [];
    var finalPagesArray=[];
    _.map((response.body.VolunteerJobs),(volunteerJob) => {
      if(volunteerJob.AssignmentRecords.length > 0){
        idSchool = volunteerJob.AssignmentRecords[0].idSchool;
      }
      if(volunteerJob.Job!=null) {
        _.map((volunteerJob.Job.Roles),(role) => {
          pagesArray = _.concat(pagesArray, role.Pages)
      })
      }
    })
    finalPagesArray = _.uniqBy(pagesArray, 'code')
    finalPagesArray = _.map(finalPagesArray,(item)=>{
      return item.code;
    })

    if(!response.body.message) {
      console.log('user: ', response.body)
      //response.body.imageUrl='';
      ctx.session.user = response.body;
      ctx.session.user.VolunteerJobs = null
      ctx.session.idSchool = idSchool;
      ctx.session.idSession = response.body.idSession;
      ctx.session.pagesArray = finalPagesArray;
    }

    ctx.body = JSON.stringify(response.body);
    ctx.status = response.status;
    // console.log('ctx.session.idSession: ', ctx.session.idSession)
}

/////////////////////////////////////////////////

module.exports.getStudyCenter = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getStudyCenter(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createStudyCenter = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createStudyCenter(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getLocale = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLocale(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createLocale = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createLocale(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.removeLocale = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeLocale(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateLocale = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateLocale(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSemesterCodes = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSemesterCodes(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAttendanceBySemester = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendanceBySemester(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getLocaleRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLocaleRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createLocaleRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createLocaleRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateLocaleRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateLocaleRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.bulkUpdateLocaleRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.bulkUpdateLocaleRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.removeLocaleRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeLocaleRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.newEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.newEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.createEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.updateSchoolManagementEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateSchoolManagementEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getAttendanceByStudyCenter = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendanceByStudyCenter(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAttendances = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendances(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.renewAgreement = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.renewAgreement(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.renewVirtualAgreement = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.renewVirtualAgreement(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.assignJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.assignJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeAssignation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeAssignation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.addTurn = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.addTurn(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.newAttendance = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.newAttendance(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createMyNewAttendance = async (ctx) => {
  let body = ctx.request.body;
  body.id = ctx.session.user.id;

  const response = await Api.newAttendance(body);
  console.log("Respuesta del api Controller");
  console.log(response);
  ctx.session.user.recruitmentStatusCode=response.body.recruitmentStatusCode;
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.checkAttendance = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.checkAttendance(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getSchoolLeaders = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolLeaders(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getSchoolAvailableWorkshops = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolAvailableWorkshops(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getSchoolEvents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolEvents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getSchoolEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}


module.exports.newVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.newVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateAllVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateAllVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setRoles = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setRoles(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.setJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getRegions = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRegions (body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getProvincesbyRegion = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getProvincesbyRegion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getDistrictsbyProvince = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDistrictsbyProvince(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getUbigeos = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getUbigeos(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getEvents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getEvents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getOpenEvents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getOpenEvents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getTurnbyEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getTurnbyEvent(body);
  console.log("getTurnsBy ",response)
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.updateTurn = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateTurn(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.deleteTurn = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteTurn(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.updateStatusEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateStatusEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.deleteAttendance = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteAttendance(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.evaluationCompetenceSave = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.evaluationCompetenceSave(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getRooms = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRooms(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.removeRoom = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeRoom(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSchoolWorkshops = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolWorkshops(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.listStudentsByWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listStudentsByWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateGrades = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateGrades(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getPreviousSemesters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPreviousSemesters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSemesters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSemesters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSchoolEventsDetail = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolEventsDetail(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateSchoolEventsDetail = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateSchoolEventsDetail(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateAssignmentWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateAssignmentWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.linkVolunteerSinc = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.linkVolunteerSinc(body);
  console.log('response controller ', response);
  if(response.body.requireVolunteerSincUpdate == false){
    ctx.session.user.requireVolunteerSincUpdate = response.body.requireVolunteerSincUpdate
  }
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updatePickUpStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updatePickUpStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

///reports

module.exports.getReportAttendancesBySchoolByStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getReportAttendancesBySchoolByStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAllStudentsBySchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllStudentsBySchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getReportAttendancesBySchoolByVolunteers = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getReportAttendancesBySchoolByVolunteers(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAllVolunteersBySchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllVolunteersBySchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getStudentsBySchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getStudentsBySchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getLastAttendancesByVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLastAttendancesByVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getLastAttendancesByVolunteerBySchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLastAttendancesByVolunteerBySchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getReportBySchoolByVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getReportBySchoolByVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAttendanceByTeamByEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendanceByTeamByEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getStudentsReportBySchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getStudentsReportBySchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getConsolidateAttendancesByVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getConsolidateAttendancesByVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getConsolidateAttendancesByStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getConsolidateAttendancesByStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getVolunteersByJobPerSchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getVolunteersByJobPerSchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getRetentionRate = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRetentionRate(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getRetentionRateDetail = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRetentionRateDetail(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getVolunteerRegisterBySumate = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getVolunteerRegisterBySumate(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getVolunteerRegisterByEvents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getVolunteerRegisterByEvents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

/////////////////////////////////////////////////

module.exports.listPages = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listPages(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.listWithComponents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listWithComponents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createPage = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createPage(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updatePage = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updatePage(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.deletePage = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deletePage(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.listRoles = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listRoles(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getRolePages = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRolePages(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getRolesFilters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRolesFilters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getRolesByUser = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRolesByUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Filtro admin creando
module.exports.getJobsFilters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getJobsFilters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.searchVolunteerByJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchVolunteerByJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.searchVolunteerNoJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchVolunteerNoJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getJobsTree = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getJobsTree(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.listRolesByUser = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listRolesByUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createRole = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createRole(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateRole = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateRole(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setPages = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setPages(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.removePages = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removePages(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.deleteRole = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteRole(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

////////////////Jobs
module.exports.updateJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getAllJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
////////////////Organizations
module.exports.updateOrganization = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateOrganization(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.createOrganization = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createOrganization(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getOrganizations = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getOrganizations(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
//////////////Administradores
module.exports.getAdministrators = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAdministrators(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.createAdministrator = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createAdministrator(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getAreas = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAreas(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getCostCenters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getCostCenters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getPeriods = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPeriods(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getAllAccounts = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllAccounts(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

//////////////Centro de costos
module.exports.createCostCenter = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createCostCenter(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeCostCenter = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeCostCenter(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
//////////////Periodods contables
module.exports.createNewPeriod = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewPeriod(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.updatePeriod = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updatePeriod(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getDeclarationsByPeriod = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDeclarationsByPeriod(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getDeclarationsByPeriodByVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDeclarationsByPeriodByVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getGroupedEnrollments = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getGroupedEnrollments(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
///////////////Rendición contable
module.exports.createNewDeclaration = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewDeclaration(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createNewDeclarationCode = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewDeclarationCode(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

///////////////Cuentas contables
module.exports.createNewAccount = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewAccount(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getAccounts = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAccounts(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeAccount = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeAccount(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

///////////////Actividades
module.exports.createNewActivity = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewActivity(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getActivities = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getActivities(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeActivity = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeActivity(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

///////////////Rubros
module.exports.createNewHeading = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewHeading(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getHeadings = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getHeadings(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeHeading = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeHeading(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

///////////////Subrubros
module.exports.createNewSubHeader = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewSubHeader(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getSubHeaders = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSubHeaders(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.removeSubHeader = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeSubHeader(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

///////////////Areas
module.exports.createArea = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createArea(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}


module.exports.getAreasTree = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAreasTree(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.deleteJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getRolesByJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRolesByJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.setRolesByJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setRolesByJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

////////////////////////////
module.exports.signUp = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.signUp(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.checkDocument = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.checkDocument(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.checkDocumentSpecialEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.checkDocumentSpecialEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

} 

module.exports.participationRegister = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.participationRegister(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.searchVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.searchStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.createStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.createEnrollment = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createEnrollment(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateEnrollmentWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateEnrollmentWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getVolunteer(body);
  ctx.session.user.recruitmentStatusCode=response.body.recruitmentStatusCode;
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getRecruitmentEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRecruitmentEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getWelcomeEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWelcomeEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.sendEmailResetPassword = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.sendEmailResetPassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.resetPassword = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.resetPassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.changePassword = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.changePassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.changePasswordFromEmail = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.changePasswordFromEmail(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
//ROTATION
module.exports.listRotations = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRotations(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.createRotation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewRotation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateRotation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateRotation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.removeRotation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeRotation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//ASSIGNMENTRECORD
module.exports.updateAssignmentRecord = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateAssignmentRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getPenddingTests = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPenddingTests(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateVolunteerSchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateVolunteerSchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateJobVolunteerJob = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateJobVolunteerJob(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.bulkUpdateAssignment = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.bulkUpdateAssignment(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getWorkshopAssignments = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWorkshopAssignments(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getDigitalSignature = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDigitalSignature(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateDigitalSignature = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateDigitalSignature(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Gestion docuemtnos por proyecto
module.exports.createDocument = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createDocument(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.getDocumentsProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDocumentsProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateDocument = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateDocument(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//REQUEST
module.exports.listRequestsxVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listRequestsxVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.listRequestsxSchool = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listRequestsxSchool(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.listRequests = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listRequests(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createRequest = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createRequest(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.closeRequest = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.closeRequest(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateRequestStatus = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateRequestStatus(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.createNewAttendanceByStudent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewAttendanceByStudent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateAttendance = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateAttendance(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.createNewAttendanceByEvent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createNewAttendanceByEvent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.removeRequest = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.removeRequest(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
///schoolManagementEventType
module.exports.updateClass = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateClass(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.getSchoolStudents = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolStudents(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAllClasses = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllClasses(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAllTypes = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllTypes(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//////////////////////
module.exports.getPenddingEvaluations = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPenddingEvaluations(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.evaluationUpdate = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.evaluationUpdate(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.finishEvaluation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.finishEvaluation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getEvaluation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getEvaluation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getHistoricalEvaluations = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getHistoricalEvaluations(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getStudentAttendances = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getStudentAttendances(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.listAllAttendacesByWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listAllAttendacesByWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getCurrentSemester = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getCurrentSemester(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getLastSemesters = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLastSemesters(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getPenddingAssignments = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPenddingAssignments(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
//Proyectos:
module.exports.searchProjects = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchProjects(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Proyectos disponibles
module.exports.getAvailableProjects = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAvailableProjects(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Lista Proyecto por id:
module.exports.getProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//
module.exports.getAvailableSonProjects = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAvailableSonProjects(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Competencias
module.exports.getCompetencies = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getCompetencies(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.createCompetence = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createCompetence(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.assignCompetence = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.assignCompetence(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Crear proyecto
module.exports.createProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Crear equipo
module.exports.createTeam = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createTeam(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Actualizar proyecto
module.exports.updateProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.deleteProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.deleteProjectCompetence = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteProjectCompetence(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.updateProjectCompetence = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateProjectCompetence(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Inscripción a proyecto
//Paso 1
module.exports.enrollToProject = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.enrollToProject(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Paso 2
module.exports.generateEnrollmentEvaluation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.generateEnrollmentEvaluation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Paso 3
module.exports.fillTest = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.fillTest(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Paso 4
module.exports.finishVolunteerEnrollment = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.finishVolunteerEnrollment(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Preguntas de examen psicométrico
//Consultar preguntas
module.exports.getQuestions = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getQuestions(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Crear pregunta
module.exports.createQuestion = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Actualizar pregunta
module.exports.updateQuestion = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Eliminar Pregunta
module.exports.deleteQuestion = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Crear Respuesta
module.exports.createAnswer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createAnswer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Actualizar Respuesta
module.exports.updateAnswer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateAnswer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


///////////Proyectos
module.exports.getProvinceById = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getProvinceById(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getDistrictById = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDistrictById(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
///Mi asistencia
module.exports.getAttendanceReport = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendanceReport(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getAttendanceByAssessment = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAttendanceByAssessment(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getRecordVolunteerJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRecordVolunteerJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getAllAttendanceReport = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllAttendanceReport(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getVolunteerJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getVolunteerJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
/////Docentes
module.exports.getTeachers = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getTeachers(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getRegisteredProjects = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getRegisteredProjects(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getSchoolEventsForAssistance = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolEventsForAssistance(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getParticipantsSenior = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getParticipantsSenior(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setAsRetired = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setAsRetired(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setAsSanctioned = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setAsSanctioned(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setAsSeparated = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setAsSeparated(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.setAsActive = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.setAsActive(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
////Mi Equipo
module.exports.getParticipants = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getParticipants(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getWorkshopContent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWorkshopContent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateWorkshop = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateWorkshop(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateWorkshopContent = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateWorkshopContent(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getPedagogicalKit = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getPedagogicalKit(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getDigitalResources = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDigitalResources(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getBirthdate = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getBirthdate(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getOrganizationTree = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getOrganizationTree(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getLocationsByDisctrics = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getLocationsByDisctrics(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getSchoolTree = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolTree(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.registerConfirmation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.registerConfirmation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateFinalResult = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateFinalResult(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
//////////////////////
module.exports.getMasterValues = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getMasterValues(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.getJobs = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getJobs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.updateMasterValues = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateMasterValues(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.desktopValues = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.desktopValues(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getDesktopConfiguration = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getDesktopConfiguration(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getWelcomeAndCapacitationConfiguration = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWelcomeAndCapacitationConfiguration(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSchoolBus = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSchoolBus(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.listSchools = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listSchools(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.listTeams = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listTeams(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.listSchoolsBySemester = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.listSchoolsBySemester(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

module.exports.getValues = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getValues(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSessionsByUser = async (ctx) => {
  const body = ctx.request.body;
  body.idSession = ctx.session.idSession;
  const response = await Api.getSessionsByUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteSession = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteSession(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createSession = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createSession(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getAllPagesByVolunteer = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getAllPagesByVolunteer(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.getSpecialEventParticipation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getSpecialEventParticipation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateSpecialEventParticipation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.updateSpecialEventParticipation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createSpecialEventParticipation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createSpecialEventParticipation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteSpecialEventParticipation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.deleteSpecialEventParticipation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.searchSpecialEventParticipation = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.searchSpecialEventParticipation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createScopeLink = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.createScopeLink(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.getWorkshops = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWorkshops(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getWorkshopsVirtual = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getWorkshopsVirtual(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getParticipantByDocument = async (ctx) => {
  const body = ctx.request.body;
  const response = await Api.getParticipantByDocument(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}