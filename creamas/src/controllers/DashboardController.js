import renderGeneralView from '../utilities/renderGeneralView';
import Api from './Api';
import _ from 'lodash';

module.exports.redirectTo = async (ctx,next) => {
    ctx.redirect('/dashboard/login');
};

module.exports.showLogin = async (ctx,next) => {
  console.log('show login ', ctx.session)
    const isSessionActive = !!ctx.session.user;
    console.log('ctx',ctx.query)
    if (isSessionActive) {
      var idProject = null 
      if(ctx.query.idProject){
        idProject = ctx.query.idProject;
        ctx.session.tempIdProject = idProject
      }
      ctx.redirect('/dashboard/escritorio')     

    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Login',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'shared-public/login', viewData);
    }
};

// module.exports.showLoginToProject = async (ctx,next) => {
//   console.log('está en showLoginToProject ')
//   const isSessionActive = !!ctx.session.user;
//   console.log('ctx',ctx)
//   if (isSessionActive) {
//       ctx.redirect('/dashboard/escritorio')
//   }else{
//     var idProject = ctx.params.idProject;
//     const _initialState = {
//       idProject: idProject,
//     }
//     const viewData = {
//         title : 'Login',
//         idProject: idProject,
//         initialState: JSON.stringify(_initialState)
//     }
//     await renderGeneralView(ctx,'shared-public/login', viewData);
//   }
// };

module.exports.logout = async (ctx,next) => {
    console.log("user: ", ctx.session.user);
    let form = {
      id : ctx.session.user.id,
      sessionId : ctx.session.idSession
    };
    console.log("form: ", form);
    const response = await Api.deleteSession(form);
    ctx.session=null;
    ctx.redirect('/dashboard/login');
  };

/*IMPACTO*/

module.exports.showEventsAssistance = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.params.id;
      const _initialState = {
          id: id,
      }
  
      const viewData = {
          title : 'Asistencia Eventos/Charlas',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'massive-attendance/asistenciaEventos', viewData);
    }

};

module.exports.showWorkshopRoutes = async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }

    const viewData = {
        title : 'Subir ruta de talleres',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impacto/gestionarRutaDeTalleres', viewData);
  }
};

module.exports.showRecruimentAssistance = async (ctx,next) => {


  var test= ctx.session.test;
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.params.id;
      const _initialState = {
          id: id,
      }
      const viewData = {
          title : 'Asistencia Reclutamiento',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'massive-attendance/asistenciaReclutamiento', viewData);
    }
};

module.exports.showEvaluationPending = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    const code='PENDING_EVALUATIONS';
    var codes=ctx.session.pagesArray;
    var access  = _.find(codes, (item) =>{
      return item == code
    });
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
        const _initialState = {
        }
        const viewData = {
            title : 'Pendientes Evaluación Reclutamiento',
            initialState: JSON.stringify(_initialState)
        }
        await renderGeneralView(ctx,'admin-impact/pendientesEvaluacionReclu', viewData);
    }
};

module.exports.showRecruimentFocus = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Reclutamiento focalizado',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin-impact/focalizadoReclutamiento', viewData);
    }

};

module.exports.showEvent = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Crear Charla',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin-impact/charlasReclutamiento', viewData);
    }
};

module.exports.showAdminCreandos= async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
        title : 'Administrar Creandos',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin/administrarCreandos', viewData);
  }
};

module.exports.showAdminClassroms = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.session.user.id;
      const _initialState = {
        id:id,
      }
      const viewData = {
          title : 'Administrar Salones',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin-impact/administrarSalones', viewData);
    }
};

module.exports.showCreandoRxReadonly = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
        readonly:true,
      }

      const viewData = {
          title : 'Radiografia Creando',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/radiografiaCrea', viewData);
    }
};

module.exports.showCreandoRx = async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
      readonly:false,
    }

    const viewData = {
        title : 'Radiografia Creando',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin/radiografiaCrea', viewData);
  }
};

module.exports.showDetailCreando = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var dni = ctx.params.id;
      const _initialState = {
          DNI: dni,
          readonly:false,
      }
      const viewData = {
          title : 'Detalle Creando',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin/detalleCreando', viewData);
    }
};

module.exports.showDetailCreandoReadonly = async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var dni = ctx.params.id;
    const _initialState = {
        DNI: dni,
        readonly:true,
    }
    const viewData = {
        title : 'Detalle Creando',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin/detalleCreando', viewData);
  }
};

/* FIN IMPACTO*/

module.exports.showListAlumnos = async (ctx,next) => {
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Lista de alumnos ',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/listAlumnos', viewData);
    }
};

module.exports.showAtendanceStudent = async (ctx,next) => {
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
        id: ctx.session.user.id,
        idWorkshop: 0,
        idSchool:0,
        workshopType:'',
        adm:false,
      }
      const viewData = {
          title : 'Asistencia de alumnos',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/attendanceStudents', viewData);
    }
};

module.exports.showAtendanceStudentADM = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var idWorkshop = ctx.params.id;
    var idSchool = ctx.params.idSchool;
    var workshopType = ctx.params.workshopType;
    const _initialState = {
        idWorkshop: idWorkshop,
        idSchool:idSchool,
        workshopType: workshopType,
        adm:true,
    }
    const viewData = {
        title : 'Asistencia de alumnos (administrador)',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/attendanceStudents', viewData);
  }

};

module.exports.showComponents = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Componentes',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'rap/components', viewData);
  }
};

module.exports.showPages = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Páginas',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'rap/pages', viewData);
  }
};

module.exports.showRoles = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Roles y Cargos',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'rap/roles', viewData);
  }
};

module.exports.showSchoolsVolunteer = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
  var id = ctx.params.id;
  var startDate = ctx.query.startDate;
  var endDate = ctx.query.endDate;
  const _initialState = {
    id : id,
    startDate: startDate,
    endDate: endDate
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    title : 'Reclutamiento focalizado',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'admin-impact/colegiosCreandos', viewData);
 }
};
module.exports.showDesktop = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    
    var tempIdProject = undefined
    var recruitmentStatusCode = ctx.session.user.recruitmentStatusCode;
    var competenceStatusCode =  ctx.session.user.competenceStatusCode;
    var seniorityCode = ctx.session.user.seniorityCode;
    var statusCode = ctx.session.user.statusCode;
    var id = ctx.session.user.id;
    var documentNumber = ctx.session.user.documentNumber;
    var requireVolunteerSincUpdate = ctx.session.user.requireVolunteerSincUpdate;
    
    const _initialState = {
      recruitmentStatusCode: recruitmentStatusCode,
      competenceStatusCode: competenceStatusCode,
      seniorityCode: seniorityCode,
      statusCode: statusCode,
      id:id,
      documentNumber:documentNumber,
      requireVolunteerSincUpdate:requireVolunteerSincUpdate
    }
    //viene del form de proyectos
    if(ctx.query.idProject){
      tempIdProject = ctx.query.idProject;
      _initialState.tempIdProject = tempIdProject
    }else{
      //viene de login
      if(ctx.session.tempIdProject){
        //Lo enviamos y después lo destruímos
        tempIdProject = ctx.session.tempIdProject;
        _initialState.tempIdProject = tempIdProject
        ctx.session.tempIdProject = undefined
      }
    }

    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Escritorio',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/escritorio', viewData);
  }
};

module.exports.showGoDesktop = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{  
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Escritorio',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/irEscritorio', viewData);
  }
};

module.exports.showAccessDenied = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{  
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Acceso Denegado',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/accesoDenegado', viewData);
  }
};

module.exports.showDesktopManagement = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestión de escritorios',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/gestionEscritorios', viewData);
  }
};

module.exports.showAsignacionCreandos = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user; 
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Asignación de rol y programa a creandos ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/asignacionCreandos', viewData);
  }
};

module.exports.showMatriculaEstudiantes = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user; 
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{  
    var id=ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Matrícula de estudiante en talleres ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'massive-enrollment/matriculaEstudiantes', viewData);
  }
};

module.exports.showProfileCreando = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id = (ctx.session.user || {}).id;
    var documentNumber = (ctx.session.user || {}).documentNumber;
    const _initialState = {
      id: id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Perfil del creando',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/creandoPerfil', viewData);
  }

};

module.exports.showSolicitudInasistencia = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
    id:id,
    documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Solicitar Regularización de Asistencia ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/solicitudInasistencia', viewData);
  }
};

module.exports.showSolicitudConstancia = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
      id:id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Solicitar Constancias de Voluntariado ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/solicitudConstancia', viewData);
  }
};


module.exports.showEvaluarSolicitudInasistencia = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
      id:id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestionar Regularización de Asistencia ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/evaluarSolicitudInasistencia', viewData);
  }
};


module.exports.showEvaluarSolicitudConstancia = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{  
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
      id:id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestionar Constancias de Voluntariado ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/evaluarSolicitudConstancia', viewData);
  }
};

module.exports.showEvaluarMejoraWeb = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
      id:id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestionar solicitudes de mejoras web ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin/evaluarSolicitudMejoraWeb', viewData);
  }
};

module.exports.showSolicitudMejorasWeb = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id=ctx.session.user.id;
    var documentNumber=ctx.session.user.documentNumber;
    const _initialState = {
      id:id,
      documentNumber: documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Solicitud de mejoras web',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/solicitudMejorasWeb', viewData);
  }
};

// module.exports.showSilabus = async (ctx,next) => {
//   const isSessionActive = !!ctx.session.user;
//   if (!isSessionActive) {
//       ctx.redirect('/dashboard/login');
//   }else{

//     const _initialState = {

//     }
//     const viewData = {
//       //allAccess: ctx.session.allAccess,
//       title : 'Sílabus',
//       initialState: JSON.stringify(_initialState)
//     }
//     await renderGeneralView(ctx,'dashboard/pages/silabus', viewData);
//   }
// };


module.exports.showRegisterVolunteerToProject = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  var sessionActive = false
  // if (isSessionActive) {
  //  ctx.redirect('/dashboard/irEscritorio');      
  // }else{  
    
    isSessionActive == true ? sessionActive = true: null
    const _initialState = {
      sessionActive : sessionActive
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Registro a proyecto',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/registroProyecto', viewData);
  //}
};

module.exports.showRecoverPassword = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (isSessionActive) {
      ctx.redirect('/dashboard/irEscritorio');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Cambiar contraseña',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/recoverPassword', viewData);
  }
};

module.exports.showSendEmailToRecoverPassword = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (isSessionActive) {
      ctx.redirect('/dashboard/irEscritorio');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Enviar correo para cambiar contraseña',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/sendEmailTorecoverPassword', viewData);
  }
};

/////////////////Para el iframe
module.exports.showRegisterVolunteer = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (isSessionActive) {
      ctx.redirect('/dashboard/irEscritorio');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Registro',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared-public/registro', viewData);
  }
};

//////////////////////DGC

module.exports.showCalendarGDC = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Calendario Proyectos',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/calendarioGDC', viewData);
 }
};

module.exports.showClassMaterials = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;

    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Material Colegios',
      initialState: JSON.stringify(_initialState)
    }
    //await renderGeneralView(ctx,'dashboard/pages/materialesClases', viewData);
    await renderGeneralView(ctx,'admin-projects/materialesDivertimate', viewData);
  }
};

module.exports.showSchoolLeaders = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
  var id = ctx.session.user.id;
  const _initialState = {
    id:id,
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    title : 'Lideres Colegios',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'volunteer/lideresColegio', viewData);
 }
};

//////Gestion docentes
module.exports.showGestionardocentes = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;

    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestionar Docente',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/gestionarDocente', viewData);
  }
};

 //////Cancionero crea+
 module.exports.showCancioneroCrea = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user; 
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Cancionero ',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/cancioneroCrea', viewData);
  }
};

//////Lideres Crea+
module.exports.showLideresCrea = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Líderes Crea+',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/lideresCrea', viewData);
  }
};

 //////Colegios Asignados
 module.exports.showColegiosNivelNacional = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user; 
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Colegios a Nivel Nacional',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/colegiosNivelNacional', viewData);
  }
};

//Colegio Asignado
module.exports.showMySchool = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Colegio Asignado',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/colegioAsignado', viewData);
  }
};

//Mi asistencia
module.exports.showMyAssistance = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var seniorityCode = ctx.session.user.seniorityCode;
    var VolunteerJobs = ctx.session.user.VolunteerJobs;
    var id = ctx.session.user.id;
    var documentNumber = ctx.session.user.documentNumber;

    const _initialState = {
      seniorityCode:seniorityCode,
      VolunteerJobs:VolunteerJobs,
      id:id,
      documentNumber:documentNumber,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Mi Asistencia',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/miAsistencia', viewData);
  }
};

//Mi Equipo
module.exports.ShowMyTeam = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Mi Equipo',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/miEquipo', viewData);
  }
};

//Kit Pedagógico
module.exports.ShowPedagogicalKit = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,  
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Kit Pedagógico',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/kitPedagogico', viewData);
  }
};

//Gestión de firmas
module.exports.showUpdateAsignature = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestión de firmas',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/gestionarFirmas', viewData);
  }
};

//Gestión de rotación de creandos
module.exports.ShowRotations = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestión de rotación de creandos',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/evaluarSolicitudRotacionCreando', viewData);
  }
};

//Guías de clase
module.exports.ShowClassGuides= async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id ,
      idWorkshop: 0,
      adm:false,
      gradeCode:'',
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Guías de clase',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/guiasDeClase', viewData);
  }
};

//Guías de clase ADM
module.exports.ShowClassGuidesADM = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    var idWorkshop = ctx.params.idWorkshop;
    var gradeCode = ctx.params.gradeCode;
    const _initialState = {
      id:id ,
      idWorkshop: idWorkshop,
      adm:true,
      gradeCode:gradeCode,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Guías de clase',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'dashboard/pages/guiasDeClase', viewData);
  }
};

//Sílabo
module.exports.showSilabus = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
      idWorkshop:0,
      adm:false
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Sílabus',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/silabus', viewData);
  }
};

//Detalle taller
module.exports.showDetailWorkshop = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
      idWorkshop:0,
      adm:false
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Detalle taller',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/detalleTaller', viewData);
  }
};

//Sílabo ADM
module.exports.showSilabusADM = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    var idWorkshop = ctx.params.idWorkshop;
    const _initialState = {
      id:id,
      idWorkshop: idWorkshop,
      adm:true
    }
    const viewData = {
      //allAccess: ctx.session.allAccess,
      title : 'Sílabus',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'volunteer/silabus', viewData);
  }
};

//Gestion de organizaciones
module.exports.showAdminOrganizations = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{  
    var id = ctx.session.user.id;
    const _initialState = {
    id:id,
    }
    const viewData = {
    //allAccess: ctx.session.allAccess,
    title : 'Gestión de organizaciones',
    initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin/gestionOrganizaciones', viewData);
 }
};

//Gestion de centros de costo
module.exports.showAdminCostsCenters = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{  
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
      //allAccess: ctx.session.allAccess,
      title : 'Gestión de centros de costos',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionCentrosCostos', viewData);
  }
};

//Gestion de periodos contables
module.exports.showAdminAccountingPeriods = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
  var id = ctx.session.user.id;
  const _initialState = {
    id:id,
  }
  const viewData = {
    //allAccess: ctx.session.allAccess,
    title : 'Gestión de periodos contables',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'accounting/gestionPerdiodosContables', viewData);
  }
};

//Gestion de cuentas contables
module.exports.showAdminAccounts = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{  
    var id = ctx.session.user.id;
    const _initialState = {
     id:id,
    }
    const viewData = {
    title : 'Gestión de cuentas contables',
    initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionCuentasContables', viewData);
  }  
};

  //Gestionar rendición contable
module.exports.showAdminAccountingDeclaration = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id:id,
    }
    const viewData = {
    title : 'Gestión de rendición contables',
    initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionRendicionContable', viewData);
  }
};

//Nueva rendición contable
module.exports.showNewAccountingDeclaration = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    var idAccountingPeriod= ctx.params.idAccountingPeriod;
    const _initialState = {
     id:id,
     idAccountingPeriod:idAccountingPeriod,
    }
    const viewData = {
    title : 'Nueva rendición contables',
    initialState: JSON.stringify(_initialState)
    }
   await renderGeneralView(ctx,'accounting/nuevaRendicionContable', viewData);
  }
};


module.exports.showAdminActivities = async (ctx,next) => {  
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.params.id;
    var name = ctx.params.name;
    const _initialState = {
        id: id,
        name: name,
    }
    const viewData = {
        title : 'Actividades de una cuenta contable',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionActividades', viewData);
  }
};

module.exports.showAdminItems= async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var idActivity = ctx.params.idActivity;
    var nameActivity = ctx.params.nameActivity;
    var idAccount = ctx.params.idAccount;
    var nameAccount = ctx.params.nameAccount;
    const _initialState = {
      idActivity: idActivity,
      nameActivity: nameActivity,
      idAccount:idAccount,
      nameAccount:nameAccount
    }
    const viewData = {
        title : 'Rubros de una actividad',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionRubros', viewData);
  }
};

module.exports.showAdminSubItems= async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var idActivity = ctx.params.idActivity;
    var nameActivity = ctx.params.nameActivity;
    var idAccount = ctx.params.idAccount;
    var nameAccount = ctx.params.nameAccount;
    var idHeading = ctx.params.idHeading;
    var nameHeading = ctx.params.nameHeading;
    const _initialState = {
      idActivity: idActivity,
      nameActivity: nameActivity,
      idAccount:idAccount,
      nameAccount:nameAccount,
      idHeading:idHeading,
      nameHeading:nameHeading,

    }
    const viewData = {
        title : 'SubRubros de una actividad',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'accounting/gestionSubRubros', viewData);
  }
};

/////////////////////////////

module.exports.showRooms = async (ctx,next) => {
  console.log('entró a rooms',ctx.session )
  const isSessionActive = !!ctx.session.user;
  const code='CLASSROOMS_MANAGEMENT';
  var codes=ctx.session.pagesArray;
  var access  = _.find(codes, (item) =>{
    return item == code
  });
  console.log('result:::::::::::', access)
  if (!isSessionActive) {
    ctx.redirect('/dashboard/login');
  }else{
    //if(access == null){
      //ctx.redirect('/dashboard/irEscritorio');
    //}else{
      var id = ctx.session.user.id;
      var idSchool = ctx.session.idSchool;
      const _initialState = {
        id : id,
        idSchool: idSchool
      }
      const viewData = {
        allAccess: ctx.session.allAccess,
        title : 'Gestión de salones',
        initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/gestionSalones', viewData);
    //}
  }
};

module.exports.showResults = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Resultados',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/exportResults', viewData);
  }
};

module.exports.showCumpleanios = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
      id : ctx.session.user.id,
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Cumpleaños del mes',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/cumpleanios', viewData);
  }
};

module.exports.showRecursosDigitales = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Recursos Digitales',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'shared/recursosDigitales', viewData);
  }
};

module.exports.showAssignmentPending = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.session.user.id;
      const _initialState = {
        id: id,
      }
      const viewData = {
          title : 'Pendientes de Asignación',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/pendienteAsignacion', viewData);
    }
};

module.exports.showIndicatorsGDC = async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id: id,
    }
    const viewData = {
        title : 'Indicadores GDC',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/indicadoresGDC', viewData);
  }
};

module.exports.showIndicatorsGDCAdmin = async (ctx,next) => {

  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
    id: id,
    }
    const viewData = {
        title : 'Indicadores GDC',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/indicadoresGDCAdmin', viewData);
  }
};

module.exports.showStudentsReportBySchool = async (ctx,next) => {

    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.session.user.id;
      const _initialState = {
        id: id,
      }
      const viewData = {
          title : 'Niños matriculados',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin-projects/reporteEstudiantes', viewData);
    }
};

module.exports.showWorkshopAssignmentPendding = async (ctx,next) => {
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      var id = ctx.session.user.id;
      const _initialState = {
        id: id,
      }
      const viewData = {
          title : 'Asignar docentes',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/pendienteAsignacionTalleres', viewData);
    }
};

module.exports.showMasterProjects = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    var id = ctx.session.user.id;
    const _initialState = {
      id: id,
    }
    const viewData = {
        title : 'GDP',
        initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/masterProjects', viewData);
  }
};

module.exports.showEnrollEvents = async (ctx,next) => {
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Inscritos por fechas',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'admin-impact/reportEnrollEvents', viewData);
    }
};
module.exports.showManagementLocals = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      title : 'Gestión de locales',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/managementLocals', viewData);
  }

};
module.exports.showLastAtendanceByVolunteer = async (ctx,next) => {
    const isSessionActive = !!ctx.session.user;
    if (!isSessionActive) {
        ctx.redirect('/dashboard/login');
    }else{
      const _initialState = {
      }
      const viewData = {
          title : 'Asistencia de colegios del sábado',
          initialState: JSON.stringify(_initialState)
      }
      await renderGeneralView(ctx,'volunteer/asistenciaColegioSabado', viewData);
    }
};

module.exports.showReportsToXls = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      title : 'Reporte XLS',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-projects/reportsToXls', viewData);
  }
};

module.exports.showRetentionRate = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      title : 'Tasa de retencion',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/retentionRate', viewData);
  }
};

module.exports.showVolunteersBySumate = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      title : 'Voluntarios registrados por Sumate',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/reportVolunteerBySumate', viewData);
  }
};
module.exports.showVolunteersByEvents = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      title : 'Reporte de charlas',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'admin-impact/reportVolunteerByEvents', viewData);
  }
};

/////////////////Registro evento especial
module.exports.showRegisterSpecialEvent = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  // if (isSessionActive) {
  //     ctx.redirect('/dashboard/irEscritorio');
  // }
  const _initialState = {
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Registro a evento especial',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'anniversary-public/registroEventoEspecial', viewData);
};

/////////////////Formulario para descargar certifiación de participación
module.exports.showRegisterCertificate = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  // if (isSessionActive) {
  //     ctx.redirect('/dashboard/irEscritorio');
  // }
  const _initialState = {
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Certificación de participacipación',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared-public/registerCertificate', viewData);
};

module.exports.showGeneralCertificationForm = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  // if (isSessionActive) {
  //     ctx.redirect('/dashboard/irEscritorio');
  // }
  const _initialState = {
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Certificación de participacipación',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared-public/formGeneralCertificate', viewData);
};

/////////////////Maestro participantes
module.exports.showMasterParticipation = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;
  if (!isSessionActive) {
      ctx.redirect('/dashboard/login');
  }else{
    const _initialState = {
    }
    const viewData = {
      allAccess: ctx.session.allAccess,
      username: 'Creamas',
      title : 'Participaciones',
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'anniversary/masterParticipations', viewData);
  }
};

/////////////////Registro Alumnis
module.exports.showRegisterAlumni = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;

  var event = ctx.query.event;
  const _initialState = {
    event : event,
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Registro Alumni',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'anniversary-public/registroAlumnis', viewData);
};

//Registro de links de alcance
module.exports.showScopeRegistration = async (ctx,next) => {
  const isSessionActive = !!ctx.session.user;

  var event = ctx.query.event;
  const _initialState = {
    event : event,
  }
  const viewData = {
    allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Registro de Alcance',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'anniversary-public/scopeRegistration', viewData);
};

//CREA VIRTUAL
/**
 * showWorkshopsHistory: Esta función prepara y muestra el historial de talleres. 
 * Esta función es PÚBLICA, por lo tanto no se usa sesión.
*/
module.exports.showWorkshopsHistory = async (ctx,next) => {
  // var event = ctx.query.event;
  const _initialState = {
  }
  const viewData = {
    // allAccess: ctx.session.allAccess,
    username: 'Creamas',
    title : 'Talleres',
    initialState: JSON.stringify(_initialState)
  }
  await renderGeneralView(ctx,'shared-public/workshopsHistory', viewData);
};