import router from 'koa-router';
import body from 'koa-body';

import ApiController from '../controllers/ApiController';

const Router = router();
const koaBody = body({
    "formLimit":"50mb",
    "jsonLimit":"50mb",
    "textLimit":"50mb"
});
////////////////////

Router.post('/login', koaBody, ApiController.login);
Router.post('/getStudyCenter', koaBody, ApiController.getStudyCenter);
Router.post('/createStudyCenter', koaBody, ApiController.createStudyCenter);
Router.post('/getLocale', koaBody, ApiController.getLocale);
Router.post('/createLocale', koaBody, ApiController.createLocale);
Router.post('/removeLocale', koaBody, ApiController.removeLocale);
Router.post('/updateLocale', koaBody, ApiController.updateLocale);
Router.post('/getLocaleRoom', koaBody, ApiController.getLocaleRoom);
Router.post('/createLocaleRoom', koaBody, ApiController.createLocaleRoom);
Router.post('/updateLocaleRoom', koaBody, ApiController.updateLocaleRoom);
Router.post('/bulkUpdateLocaleRoom', koaBody, ApiController.bulkUpdateLocaleRoom);
Router.post('/removeLocaleRoom', koaBody, ApiController.removeLocaleRoom);
Router.post('/createEvent', koaBody, ApiController.createEvent);
Router.post('/updateSchoolManagementEvent', koaBody, ApiController.updateSchoolManagementEvent);
Router.post('/removeEvent', koaBody, ApiController.removeEvent);
Router.post('/getPenddingAssignments', koaBody, ApiController.getPenddingAssignments);
Router.post('/getSchoolEventsDetail', koaBody, ApiController.getSchoolEventsDetail);
Router.post('/getSchoolEvent', koaBody, ApiController.getSchoolEvent);
Router.post('/updateSchoolEventsDetail', koaBody, ApiController.updateSchoolEventsDetail);
Router.post('/updatePickUpStudent', koaBody, ApiController.updatePickUpStudent);

//reports
Router.post('/getReportAttendancesBySchoolByStudent', koaBody, ApiController.getReportAttendancesBySchoolByStudent);
Router.post('/getAllStudentsBySchool', koaBody, ApiController.getAllStudentsBySchool);
Router.post('/getReportAttendancesBySchoolByVolunteers', koaBody, ApiController.getReportAttendancesBySchoolByVolunteers);
Router.post('/getAllVolunteersBySchool', koaBody, ApiController.getAllVolunteersBySchool);
Router.post('/getStudentsBySchool', koaBody, ApiController.getStudentsBySchool);
Router.post('/getConsolidateAttendancesByStudent', koaBody, ApiController.getConsolidateAttendancesByStudent);
Router.post('/getConsolidateAttendancesByVolunteer', koaBody, ApiController.getConsolidateAttendancesByVolunteer);
Router.post('/getStudentsReportBySchool', koaBody, ApiController.getStudentsReportBySchool);
Router.post('/getReportBySchoolByVolunteer', koaBody, ApiController.getReportBySchoolByVolunteer);
Router.post('/getAttendanceByTeamByEvent', koaBody, ApiController.getAttendanceByTeamByEvent);
Router.post('/getLastAttendancesByVolunteerBySchool', koaBody, ApiController.getLastAttendancesByVolunteerBySchool);
Router.post('/getLastAttendancesByVolunteer', koaBody, ApiController.getLastAttendancesByVolunteer)
Router.post('/getVolunteersByJobPerSchool', koaBody, ApiController.getVolunteersByJobPerSchool)
Router.post('/getRetentionRate', koaBody, ApiController.getRetentionRate)
Router.post('/getRetentionRateDetail', koaBody, ApiController.getRetentionRateDetail)
Router.post('/getVolunteerRegisterBySumate', koaBody, ApiController.getVolunteerRegisterBySumate)
Router.post('/getVolunteerRegisterByEvents', koaBody, ApiController.getVolunteerRegisterByEvents)
Router.post('/getGroupedEnrollments', koaBody, ApiController.getGroupedEnrollments)

//Gestión de documentos por proyectos
Router.post('/createDocument', koaBody, ApiController.createDocument);
Router.post('/getDocumentsProject', koaBody, ApiController.getDocumentsProject);
Router.post('/updateDocument', koaBody, ApiController.updateDocument);

Router.post('/newEvent', koaBody, ApiController.newEvent);
Router.post('/renewAgreement', koaBody, ApiController.renewAgreement);
Router.post('/renewVirtualAgreement', koaBody, ApiController.renewVirtualAgreement);
Router.post('/assignJob', koaBody, ApiController.assignJob);
Router.post('/removeAssignation', koaBody, ApiController.removeAssignation);
Router.post('/newEvent', koaBody, ApiController.newEvent);
Router.post('/addTurn', koaBody, ApiController.addTurn);
Router.post('/createNewAttendance', koaBody, ApiController.createMyNewAttendance);
Router.post('/newVolunteer', koaBody, ApiController.newVolunteer);
Router.post('/getRegions', koaBody, ApiController.getRegions);
Router.post('/getProvincesbyRegion', koaBody, ApiController.getProvincesbyRegion);
Router.post('/getDistrictsbyProvince', koaBody, ApiController.getDistrictsbyProvince);
Router.post('/getUbigeos', koaBody, ApiController.getUbigeos);
Router.post('/getEvents', koaBody, ApiController.getEvents);
Router.post('/getOpenEvents', koaBody, ApiController.getOpenEvents);
Router.post('/getTurnbyEvent', koaBody, ApiController.getTurnbyEvent);
Router.post('/updateTurn', koaBody, ApiController.updateTurn);
Router.post('/deleteTurn', koaBody, ApiController.deleteTurn);
Router.post('/updateStatusEvent', koaBody, ApiController.updateStatusEvent);
Router.post('/updateEvent', koaBody, ApiController.updateEvent);
Router.post('/deleteAttendance', koaBody, ApiController.deleteAttendance);
Router.post('/evaluationCompetenceSave', koaBody, ApiController.evaluationCompetenceSave);
Router.post('/getSemesterCodes', koaBody, ApiController.getSemesterCodes);
Router.post('/getAttendanceBySemester', koaBody, ApiController.getAttendanceBySemester);
Router.post('/getAttendanceByStudyCenter', koaBody, ApiController.getAttendanceByStudyCenter);
Router.post('/getAttendances', koaBody, ApiController.getAttendances);
Router.post('/listStudentsByWorkshop', koaBody, ApiController.listStudentsByWorkshop);
Router.post('/updateGrades', koaBody, ApiController.updateGrades);
Router.post('/signUp', koaBody, ApiController.signUp);
Router.post('/checkAttendance', koaBody, ApiController.checkAttendance)
Router.post('/getSchoolLeaders', koaBody, ApiController.getSchoolLeaders);
Router.post('/getSchoolEvents', koaBody, ApiController.getSchoolEvents);
Router.post('/getSchoolAvailableWorkshops', koaBody, ApiController.getSchoolAvailableWorkshops);
Router.post('/updateVolunteer', koaBody, ApiController.updateVolunteer);
Router.post('/updateAllVolunteer', koaBody, ApiController.updateAllVolunteer);
Router.post('/checkDocument', koaBody, ApiController.checkDocument);
Router.post('/checkDocumentSpecialEvent', koaBody, ApiController.checkDocumentSpecialEvent); 
Router.post('/participationRegister', koaBody, ApiController.participationRegister); 
Router.post('/searchVolunteer', koaBody, ApiController.searchVolunteer);
Router.post('/getSchool', koaBody, ApiController.getSchool);
Router.post('/searchStudent', koaBody, ApiController.searchStudent);
Router.post('/createStudent', koaBody, ApiController.createStudent);
Router.post('/updateStudent', koaBody, ApiController.updateStudent);
Router.post('/createEnrollment', koaBody, ApiController.createEnrollment)
Router.post('/updateEnrollmentWorkshop', koaBody, ApiController.updateEnrollmentWorkshop);
Router.post('/getVolunteer', koaBody, ApiController.getVolunteer);
Router.post('/getRecruitmentEvent', koaBody, ApiController.getRecruitmentEvent);
Router.post('/getWelcomeEvent', koaBody, ApiController.getWelcomeEvent);
Router.post('/changePassword', koaBody, ApiController.changePassword);
Router.post('/changePasswordFromEmail', koaBody, ApiController.changePasswordFromEmail);
Router.post('/resetPassword', koaBody, ApiController.resetPassword);
Router.post('/sendEmailResetPassword', koaBody, ApiController.sendEmailResetPassword);
Router.post('/getSessionsByUser', koaBody, ApiController.getSessionsByUser);
Router.post('/deleteSession', koaBody, ApiController.deleteSession);
Router.post('/createSession', koaBody, ApiController.createSession);
Router.post('/searchVolunteerByJob', koaBody, ApiController.searchVolunteerByJob);
Router.post('/searchVolunteerNoJobs', koaBody, ApiController.searchVolunteerNoJobs);
Router.post('/getStudentAttendances', koaBody, ApiController.getStudentAttendances);
Router.post('/listAllAttendacesByWorkshop', koaBody, ApiController.listAllAttendacesByWorkshop);
Router.post('/getSchoolStudents', koaBody, ApiController.getSchoolStudents);
Router.post('/createNewAttendanceByStudent', koaBody, ApiController.createNewAttendanceByStudent);
Router.post('/createNewAttendanceByEvent', koaBody, ApiController.createNewAttendanceByEvent);
Router.post('/updateAttendance', koaBody, ApiController.updateAttendance);
Router.post('/updateAssignmentWorkshop', koaBody, ApiController.updateAssignmentWorkshop);
Router.post('/getDigitalSignature', koaBody, ApiController.getDigitalSignature);
Router.post('/updateDigitalSignature', koaBody, ApiController.updateDigitalSignature);


Router.post('/getPenddingEvaluations', koaBody, ApiController.getPenddingEvaluations);
Router.post('/evaluationUpdate', koaBody, ApiController.evaluationUpdate);
Router.post('/finishEvaluation', koaBody, ApiController.finishEvaluation);
Router.post('/getEvaluation', koaBody, ApiController.getEvaluation);
Router.post('/getHistoricalEvaluations', koaBody, ApiController.getHistoricalEvaluations);
Router.post('/getMasterValues', koaBody, ApiController.getMasterValues);
Router.post('/getJobs', koaBody, ApiController.getJobs);
Router.post('/updateMasterValues', koaBody, ApiController.updateMasterValues);
Router.post('/desktopValues', koaBody, ApiController.desktopValues);
Router.post('/getValues', koaBody, ApiController.getValues);
Router.post('/getDesktopConfiguration', koaBody, ApiController.getDesktopConfiguration);
Router.post('/getWelcomeAndCapacitationConfiguration', koaBody, ApiController.getWelcomeAndCapacitationConfiguration);
Router.post('/getSchoolBus', koaBody, ApiController.getSchoolBus);
Router.post('/listSchools', koaBody, ApiController.listSchools);
Router.post('/listTeams', koaBody, ApiController.listTeams);
Router.post('/listSchoolsBySemester', koaBody, ApiController.listSchoolsBySemester);
Router.post('/createRoom', koaBody, ApiController.createRoom);
Router.post('/getRooms', koaBody, ApiController.getRooms);
Router.post('/updateRoom', koaBody, ApiController.updateRoom);
Router.post('/removeRoom', koaBody, ApiController.removeRoom);
Router.post('/createRoom', koaBody, ApiController.createRoom);
Router.post('/listRequestsxVolunteer', koaBody, ApiController.listRequestsxVolunteer);
Router.post('/listRequests', koaBody, ApiController.listRequests);
Router.post('/listRequestsxSchool', koaBody, ApiController.listRequestsxSchool);
Router.post('/createRequest', koaBody, ApiController.createRequest);
Router.post('/closeRequest', koaBody, ApiController.closeRequest);
Router.post('/removeRequest', koaBody, ApiController.removeRequest);
Router.post('/updateRequestStatus', koaBody, ApiController.updateRequestStatus);
Router.post('/getAllTypes', koaBody, ApiController.getAllTypes);
Router.post('/getAllClasses', koaBody, ApiController.getAllClasses);
Router.post('/updateClass', koaBody, ApiController.updateClass);
Router.post('/getSchoolWorkshops', koaBody, ApiController.getSchoolWorkshops);
Router.post('/getJobsTree', koaBody, ApiController.getJobsTree);
Router.post('/listRolesByUser', koaBody, ApiController.listRolesByUser);
Router.post('/getCurrentSemester', koaBody, ApiController.getCurrentSemester);
Router.post('/getLastSemesters', koaBody, ApiController.getLastSemesters);
Router.post('/listRotations', koaBody, ApiController.listRotations);
Router.post('/createRotation', koaBody, ApiController.createRotation);
Router.post('/removeRotation', koaBody, ApiController.removeRotation);
Router.post('/updateRotation', koaBody, ApiController.updateRotation);
Router.post('/updateAssignmentRecord', koaBody, ApiController.updateAssignmentRecord);
Router.post('/getPenddingTests', koaBody, ApiController.getPenddingTests); 
Router.post('/updateVolunteerSchool', koaBody, ApiController.updateVolunteerSchool);
Router.post('/updateJobVolunteerJob', koaBody, ApiController.updateJobVolunteerJob);
Router.post('/bulkUpdateAssignment', koaBody, ApiController.bulkUpdateAssignment);
Router.post('/getWorkshopAssignments', koaBody, ApiController.getWorkshopAssignments);
Router.post('/getPreviousSemesters', koaBody, ApiController.getPreviousSemesters);
Router.post('/getSemesters', koaBody, ApiController.getSemesters);
Router.post('/linkVolunteerSinc', koaBody, ApiController.linkVolunteerSinc);

/////////////////////////

//RAP
Router.post('/listPages', koaBody, ApiController.listPages);
Router.post('/listWithComponents', koaBody, ApiController.listWithComponents);
Router.post('/createPage', koaBody, ApiController.createPage);
Router.post('/updatePage', koaBody, ApiController.updatePage);
Router.post('/deletePage', koaBody, ApiController.deletePage);
Router.post('/listRoles', koaBody, ApiController.listRoles);
Router.post('/getRolePages', koaBody, ApiController.getRolePages);
Router.post('/getRolesFilters', koaBody, ApiController.getRolesFilters);
Router.post('/getRolesByUser', koaBody, ApiController.getRolesByUser);
Router.post('/removePages', koaBody, ApiController.removePages);
//Filtro admin creando
Router.post('/getJobsFilters', koaBody, ApiController.getJobsFilters);
Router.post('/createRole', koaBody, ApiController.createRole);
Router.post('/updateRole', koaBody, ApiController.updateRole);
Router.post('/deleteRole', koaBody, ApiController.deleteRole);
Router.post('/setPages', koaBody, ApiController.setPages);
Router.post('/setJobs', koaBody, ApiController.setJobs);
Router.post('/setRoles', koaBody, ApiController.setRoles);
//Jobs
Router.post('/updateJob', koaBody, ApiController.updateJob);
Router.post('/createJob', koaBody, ApiController.createJob);
Router.post('/getAllJobs', koaBody, ApiController.getAllJobs);
Router.post('/getAreasTree', koaBody, ApiController.getAreasTree);
Router.post('/deleteJob', koaBody, ApiController.deleteJob);
Router.post('/getRolesByJob', koaBody, ApiController.getRolesByJob);
Router.post('/setRolesByJob', koaBody, ApiController.setRolesByJob);
Router.post('/getSchoolEventsForAssistance', koaBody, ApiController.getSchoolEventsForAssistance);
//Cost Centers
Router.post('/createCostCenter', koaBody, ApiController.createCostCenter);
Router.post('/removeCostCenter', koaBody, ApiController.removeCostCenter);
//Organizations
Router.post('/updateOrganization', koaBody, ApiController.updateOrganization);
Router.post('/createOrganization', koaBody, ApiController.createOrganization);
Router.post('/listOrganizations', koaBody, ApiController.getOrganizations);
Router.post('/getAreas', koaBody, ApiController.getAreas);
Router.post('/getCostCenters', koaBody, ApiController.getCostCenters);
Router.post('/getPeriods', koaBody, ApiController.getPeriods);
Router.post('/getAllAccounts', koaBody, ApiController.getAllAccounts);
//Administradores
Router.post('/listAdministrators', koaBody, ApiController.getAdministrators);
Router.post('/createAdministrator', koaBody, ApiController.createAdministrator);
//Periodos contables
Router.post('/getDeclarationsByPeriod', koaBody, ApiController.getDeclarationsByPeriod);
Router.post('/getDeclarationsByPeriodByVolunteer', koaBody, ApiController.getDeclarationsByPeriodByVolunteer);
Router.post('/updatePeriod', koaBody, ApiController.updatePeriod);
Router.post('/createNewPeriod', koaBody, ApiController.createNewPeriod);
//Rendición contable
Router.post('/createNewDeclaration', koaBody, ApiController.createNewDeclaration);
Router.post('/createNewDeclarationCode', koaBody, ApiController.createNewDeclarationCode);
//Cuentas contables
Router.post('/createNewAccount', koaBody, ApiController.createNewAccount);
Router.post('/listAccounts', koaBody, ApiController.getAccounts);
Router.post('/removeAccount', koaBody, ApiController.removeAccount);
//Actividades
Router.post('/createNewActivity', koaBody, ApiController.createNewActivity);
Router.post('/listActivities', koaBody, ApiController.getActivities);
Router.post('/removeActivity', koaBody, ApiController.removeActivity);
//Rubros
Router.post('/createNewHeading', koaBody, ApiController.createNewHeading);
Router.post('/listHeadings', koaBody, ApiController.getHeadings);
Router.post('/removeHeading', koaBody, ApiController.removeHeading);
//Subrubros
Router.post('/createNewSubHeader', koaBody, ApiController.createNewSubHeader);
Router.post('/listSubHeaders', koaBody, ApiController.getSubHeaders);
Router.post('/removeSubHeader', koaBody, ApiController.removeSubHeader);
//Areas
Router.post('/createArea', koaBody, ApiController.createArea);
//////Proyectos
Router.post('/createQuestion', koaBody, ApiController.createQuestion);
Router.post('/deleteQuestion', koaBody, ApiController.deleteQuestion);
Router.post('/updateQuestion', koaBody, ApiController.updateQuestion);
Router.post('/createAnswer', koaBody, ApiController.createAnswer);
Router.post('/updateAnswer', koaBody, ApiController.updateAnswer);
Router.post('/updateProject', koaBody, ApiController.updateProject);
Router.post('/deleteProject', koaBody, ApiController.deleteProject);
Router.post('/deleteProjectCompetence', koaBody, ApiController.deleteProjectCompetence);
Router.post('/updateProjectCompetence', koaBody, ApiController.updateProjectCompetence);
Router.post('/createProject', koaBody, ApiController.createProject);
Router.post('/createTeam', koaBody, ApiController.createTeam);
Router.post('/getProject', koaBody, ApiController.getProject);
Router.post('/getAvailableSonProjects', koaBody, ApiController.getAvailableSonProjects);
Router.post('/getCompetencies', koaBody, ApiController.getCompetencies);
Router.post('/createCompetence', koaBody, ApiController.createCompetence);
Router.post('/assignCompetence', koaBody, ApiController.assignCompetence);
Router.post('/searchProjects', koaBody, ApiController.searchProjects);
Router.post('/getAvailableProjects', koaBody, ApiController.getAvailableProjects);
Router.post('/getQuestions', koaBody, ApiController.getQuestions);
Router.post('/getProvinceById', koaBody, ApiController.getProvinceById);
Router.post('/getDistrictById', koaBody, ApiController.getDistrictById);
Router.post('/getWorkshopContent', koaBody, ApiController.getWorkshopContent);
//Inscripción a proyectos
//Paso 1:
Router.post('/enrollToProject', koaBody, ApiController.enrollToProject);
//Paso 2:
Router.post('/generateEnrollmentEvaluation', koaBody, ApiController.generateEnrollmentEvaluation);
//Paso 3:
Router.post('/fillTest', koaBody, ApiController.fillTest);
//Paso 4:
Router.post('/finishVolunteerEnrollment', koaBody, ApiController.finishVolunteerEnrollment);
//Mi asistencia
Router.post('/getAttendanceReport', koaBody, ApiController.getAttendanceReport);
Router.post('/getAttendanceByAssessment', koaBody, ApiController.getAttendanceByAssessment);
Router.post('/getAllAttendanceReport', koaBody, ApiController.getAllAttendanceReport);
Router.post('/getRecordVolunteerJobs', koaBody, ApiController.getRecordVolunteerJobs);
Router.post('/getVolunteerJobs', koaBody, ApiController.getVolunteerJobs);
//Docentes
Router.post('/getTeachers', koaBody, ApiController.getTeachers);
Router.post('/getRegisteredProjects', koaBody, ApiController.getRegisteredProjects);
Router.post('/setAsRetired', koaBody, ApiController.setAsRetired);
Router.post('/setAsSanctioned', koaBody, ApiController.setAsSanctioned);
Router.post('/setAsSeparated', koaBody, ApiController.setAsSeparated);
Router.post('/setAsActive', koaBody, ApiController.setAsActive);
//Mi equipo
Router.post('/getParticipants', koaBody, ApiController.getParticipants);
Router.post('/getParticipantsSenior', koaBody, ApiController.getParticipantsSenior);
Router.post('/getWorkshop', koaBody, ApiController.getWorkshop);
Router.post('/updateWorkshop', koaBody, ApiController.updateWorkshop);
Router.post('/updateWorkshopContent', koaBody, ApiController.updateWorkshopContent);
Router.post('/getPedagogicalKit', koaBody, ApiController.getPedagogicalKit);
Router.post('/getDigitalResources', koaBody, ApiController.getDigitalResources);
Router.post('/getBirthdate', koaBody, ApiController.getBirthdate);
Router.post('/getOrganizationTree', koaBody, ApiController.getOrganizationTree);
Router.post('/getLocationsByDisctrics', koaBody, ApiController.getLocationsByDisctrics);
Router.post('/getSchoolTree', koaBody, ApiController.getSchoolTree);
Router.post('/registerConfirmation', koaBody, ApiController.registerConfirmation);
Router.post('/updateFinalResult', koaBody, ApiController.updateFinalResult);


Router.post('/getAllPagesByVolunteer', koaBody, ApiController.getAllPagesByVolunteer);
//Aniversario
Router.post('/getSpecialEventParticipation', koaBody, ApiController.getSpecialEventParticipation);
Router.post('/updateSpecialEventParticipation', koaBody, ApiController.updateSpecialEventParticipation);
Router.post('/createSpecialEventParticipation', koaBody, ApiController.createSpecialEventParticipation);
Router.post('/deleteSpecialEventParticipation', koaBody, ApiController.deleteSpecialEventParticipation);
Router.post('/searchSpecialEventParticipation', koaBody, ApiController.searchSpecialEventParticipation);
Router.post('/getParticipantByDocument', koaBody, ApiController.getParticipantByDocument);
//Talleres
Router.post('/getWorkshops', koaBody, ApiController.getWorkshops);
Router.post('/getWorkshopsVirtual', koaBody, ApiController.getWorkshopsVirtual);

// Router.post('/updateSpecialEventParticipation', koaBody, ApiController.updateSpecialEventParticipation);
// Router.post('/createSpecialEventParticipation', koaBody, ApiController.createSpecialEventParticipation);
// Router.post('/deleteSpecialEventParticipation', koaBody, ApiController.deleteSpecialEventParticipation);

/**
 * Router.post('/getParticipantByDocument', koaBody, ApiController.getParticipantByDocument);
 * Router.post('/createScopeLink', koaBody, ApiController.createScopeLink); 
*/

module.exports = Router;
