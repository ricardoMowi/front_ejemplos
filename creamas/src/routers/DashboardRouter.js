import router from 'koa-router';
import body from 'koa-body';

import DashboardController from '../controllers/DashboardController';
import UploadController from '../controllers/UploadController';

const Router = router();
const koaBody = body();

Router.get('/', DashboardController.redirectTo);
Router.get('/dashboard/login', DashboardController.showLogin);
//Router.get('/dashboard/login?idProject=:idProject', DashboardController.showLoginToProject);
Router.get('/dashboard/logout', DashboardController.logout);
/*IMPACTO*/
Router.get('/dashboard/:id/resultRecluFocalizado', DashboardController.showSchoolsVolunteer);
Router.get('/dashboard/asignacionCreandos', DashboardController.showAsignacionCreandos);
Router.get('/dashboard/matriculaEstudiantes', DashboardController.showMatriculaEstudiantes);
Router.get('/dashboard/asistenciaeventos/:id', DashboardController.showEventsAssistance);
Router.get('/dashboard/asisenciareclu/:id', DashboardController.showRecruimentAssistance);
Router.get('/dashboard/asisenciareclu', DashboardController.showRecruimentAssistance);
Router.get('/dashboard/evapendiente', DashboardController.showEvaluationPending);
Router.get('/dashboard/focoreclu', DashboardController.showRecruimentFocus);
Router.get('/dashboard/crearcharla', DashboardController.showEvent);
Router.get('/dashboard/adminclases', DashboardController.showAdminClassroms);
Router.get('/dashboard/admincreando', DashboardController.showAdminCreandos)
Router.get('/dashboard/creandorxLectura', DashboardController.showCreandoRxReadonly);
Router.get('/dashboard/creandorx', DashboardController.showCreandoRx);
Router.get('/dashboard/detalleCreando/:id', DashboardController.showDetailCreando);
Router.get('/dashboard/detalleCreandoLectura/:id', DashboardController.showDetailCreandoReadonly);
Router.get('/dashboard/colegiocreando', DashboardController.showSchoolsVolunteer);
Router.get('/dashboard/registro', DashboardController.showRegisterVolunteer);
Router.get('/dashboard/registroProject', DashboardController.showRegisterVolunteerToProject);
Router.get('/dashboard/recoverPassword', DashboardController.showRecoverPassword);
Router.get('/dashboard/sendEmailToRecoverPassword', DashboardController.showSendEmailToRecoverPassword);
Router.get('/dashboard/formularioCertificacion', DashboardController.showRegisterCertificate);
Router.get('/dashboard/certificacionAniversario', DashboardController.showGeneralCertificationForm);
Router.get('/dashboard/escritorio', DashboardController.showDesktop);
Router.get('/dashboard/admEscritorio', DashboardController.showDesktopManagement);
Router.get('/dashboard/calendarioGDC', DashboardController.showCalendarGDC);
Router.get('/dashboard/materialesClases', DashboardController.showClassMaterials);
Router.get('/dashboard/lideresColegio', DashboardController.showSchoolLeaders);
Router.get('/dashboard/irEscritorio', DashboardController.showGoDesktop);
Router.get('/dashboard/accesoDenegado', DashboardController.showAccessDenied);
Router.get('/dashboard/perfilCreando', DashboardController.showProfileCreando);
Router.get('/dashboard/gestionSalones', DashboardController.showRooms);
Router.get('/dashboard/adminOrganizaciones', DashboardController.showAdminOrganizations);
Router.get('/dashboard/adminCentroDeCostos', DashboardController.showAdminCostsCenters);
Router.get('/dashboard/adminPeriodosContables', DashboardController.showAdminAccountingPeriods);
Router.get('/dashboard/adminRendicionContable', DashboardController.showAdminAccountingDeclaration);
Router.get('/dashboard/:idAccountingPeriod/nuevaRendicionContable', DashboardController.showNewAccountingDeclaration);
Router.get('/dashboard/adminCuentasContables', DashboardController.showAdminAccounts);
Router.get('/dashboard/adminActividades/:name/:id', DashboardController.showAdminActivities);
Router.get('/dashboard/adminRubros/:nameAccount/:idAccount/:nameActivity/:idActivity', DashboardController.showAdminItems);
Router.get('/dashboard/adminSubRubros/:nameAccount/:idAccount/:nameActivity/:idActivity/:nameHeading/:idHeading', DashboardController.showAdminSubItems);
Router.get('/dashboard/solicitudConstancia', DashboardController.showSolicitudConstancia);
Router.get('/dashboard/solicitudMejorasWeb', DashboardController.showSolicitudMejorasWeb);
Router.get('/dashboard/solicitudInasistencia', DashboardController.showSolicitudInasistencia);
Router.get('/dashboard/evaluarSolicitudConstancia', DashboardController.showEvaluarSolicitudConstancia);
Router.get('/dashboard/evaluarSolicitudMejoraWeb', DashboardController.showEvaluarMejoraWeb);
Router.get('/dashboard/evaluarSolicitudInasistencia', DashboardController.showEvaluarSolicitudInasistencia);
Router.get('/dashboard/evaluarSolicitudRotacionCreando', DashboardController.ShowRotations);
Router.get('/dashboard/rutaTalleres', DashboardController.showWorkshopRoutes);
Router.get('/dashboard/gestionardocentes', DashboardController.showGestionardocentes);
Router.get('/dashboard/cancionerocrea', DashboardController.showCancioneroCrea);
Router.get('/dashboard/liderescrea', DashboardController.showLideresCrea);
Router.get('/dashboard/colegiosnivelnacional', DashboardController.showColegiosNivelNacional);
Router.get('/dashboard/listAlumnos', DashboardController.showListAlumnos);
Router.get('/dashboard/attendanceStudents', DashboardController.showAtendanceStudent);
Router.get('/dashboard/attendanceStudentsADM/:id/:workshopType/:idSchool', DashboardController.showAtendanceStudentADM);
Router.get('/dashboard/inscritosPorFecha', DashboardController.showEnrollEvents);
Router.get('/dashboard/managementLocals', DashboardController.showManagementLocals);
//Colegio
Router.get('/dashboard/colegioasignado', DashboardController.showMySchool);
Router.get('/dashboard/miasistencia', DashboardController.showMyAssistance);
Router.get('/dashboard/miequipo', DashboardController.ShowMyTeam);
Router.get('/dashboard/kitpedagogico', DashboardController.ShowPedagogicalKit);
Router.get('/dashboard/guiasDeClase', DashboardController.ShowClassGuides);
Router.get('/dashboard/guiasDeClaseADM/:idWorkshop/:gradeCode', DashboardController.ShowClassGuidesADM);
Router.get('/dashboard/gestionarFirmas', DashboardController.showUpdateAsignature);
Router.get('/dashboard/reporteReclu', DashboardController.showResults);
Router.get('/dashboard/silabus', DashboardController.showSilabus);
Router.get('/dashboard/detalleTaller', DashboardController.showDetailWorkshop);
Router.get('/dashboard/silabusADM/:idWorkshop', DashboardController.showSilabusADM);
Router.get('/dashboard/cumpleanios', DashboardController.showCumpleanios);
Router.get('/dashboard/recursosdigitales', DashboardController.showRecursosDigitales);
Router.get('/dashboard/pendienteAsignacion', DashboardController.showAssignmentPending);
Router.get('/dashboard/indicadoresGDC', DashboardController.showIndicatorsGDC);
Router.get('/dashboard/indicadoresGDCAdmin', DashboardController.showIndicatorsGDCAdmin);
Router.get('/dashboard/ninosMatriculados', DashboardController.showStudentsReportBySchool);
Router.get('/dashboard/pendienteAsignacionTalleres', DashboardController.showWorkshopAssignmentPendding);
Router.get('/dashboard/masterProjects', DashboardController.showMasterProjects);
Router.get('/dashboard/asistenciaColegioSabado', DashboardController.showLastAtendanceByVolunteer);
Router.get('/dashboard/reportesExcel', DashboardController.showReportsToXls);
Router.get('/dashboard/tasaRetencion', DashboardController.showRetentionRate);
Router.get('/dashboard/voluntariosSumate', DashboardController.showVolunteersBySumate);
Router.get('/dashboard/voluntariosCharla', DashboardController.showVolunteersByEvents);

//CREA VIRTUAL
Router.get('/dashboard/workshopsHistory', DashboardController.showWorkshopsHistory);


//RAP
Router.get('/dashboard/settings/components', DashboardController.showComponents);
Router.get('/dashboard/settings/pages', DashboardController.showPages);
Router.get('/dashboard/settings/roles', DashboardController.showRoles);

//URL TEMPORAL
const tempKoaBody = body({ multipart: true , jsonLimit:'10mb'});
Router.post('/dashboard/upload/uploadAttachment', tempKoaBody, UploadController.uploadAttachment);

//ANIVERSARIO
// Router.get('/dashboard/participantes', DashboardController.showMasterParticipation);
Router.get('/dashboard/registroEventoEspecial', DashboardController.showRegisterSpecialEvent);
Router.get('/dashboard/registroAlumnis', DashboardController.showRegisterAlumni);
Router.get('/dashboard/registroAlcance', DashboardController.showScopeRegistration);

module.exports = Router;
