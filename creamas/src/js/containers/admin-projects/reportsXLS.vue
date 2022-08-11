<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">Asistencia de colegios del sabado</div>
        <div class="card-body">
          <TableMaf :header="colum" :data="schools" :tableTitle="titleTable" ref="tableMaf">
          </TableMaf>
          <TableMaf :header="columIII" :data="schoolsIII" :tableTitle="titleTableIII" ref="tableMafIII">
          </TableMaf>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import consultServices from './../../utilities/consultServices.js';
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import XLSX from './../../components/xlsx/xlsx.js';
  import TableMaf from "./../../components/TableMaf.vue";
  import _ from 'lodash';
  import moment from 'moment';

    export default {
      name: "exportResultByAttendanceContainer",
      components: {
      LoadingComponent,
      TableMaf

      },
      data: () => ({

          isLoading: true,
          NAME :'Listado_creandos',
          NAMEII :'Consolidado_crea',
          NAMEIII :'Consolidado_ninios',
          NAMEIV :'Listado_ninios',

          title:[
            'Nº',
            'Categoría',
            'Ciclo',
            'Tipo',
            'Descripción',
            'Nombres',
            'Ap. Paterno',
            'Ap. Materno',            
            'Nickname',
            'Email',
            'Celular',
            'DNI/CE',
            'Fecha de nacimiento',
            'Inició en Crea+',
            'Centro de estudios',
            'Carrera de estudios',
            'Lugar de Trabajo',
            'Distrito donde vive',
            'Cuál es su sueño',
            'Cuál es tu talento',
            'Positivismo',
            'Proactividad',
            'Solidaridad',
            'Confianza',
            'Relación con niños',
            'Sigue metodología Crea+',
            'Cumplimiento de normas',
          ],
          //consolidadoVolunteers
          titleII:[
            'Semestre',
            'fecSuceso',
            'Colegio',
            'Categoría',
            'Ciclo',
            'Antigüedad',
            'Cantidad',
            'A tiempo',
            'Tardanzas'
          ],

          titleIII:[
            'Semestre',
            'fecSuceso',
            'Colegio',
            'Grado',
            'Cantidad'
          ],


          titleIV:[
            'Semestre',
            'fecSuceso',
            'Colegio',
            'Grado',
            'Nombre',
            'Apellido Paterno',
            'Apellido Materno',
            'DNI',
            'Apoderado',
            'Teléfono Apoderado',
            'Recoge Apoderado',
            'Dirección',
            'Taller',
            'Ciclo',
            'Asistencia'
          ],

          reports:[],
          reportStudents:[],
          reportsExcel:[],

          reportConsolidateVolunteers:[],
          reportConsolidateStudents:[],

          semester: '',
          schools: [],
          semesterCodes: [],
          psychologicalStatus : [],
          resultEvaluation: [],
          colum: [],
          titleTable: '',
          schools: [],
          columII: [],
          schoolsII: [],
          titleTableII: '',
          columIII: [],
          schoolsIII: [],
          titleTableIII: '',
          X: '',
          grades:[],
          levels:[],

      }),

      created () {
        this.X = XLSX;
        this.getSessionStorage();
        this.setHeadTable();
        this.getSchoolsAttendances()
      },

      methods: {

        async getSessionStorage(){
          this.isLoading = true;
          var ids = [] ;
          var flagLevels = false;
          var flagGrades = false;

          if(!window.sessionStorage.levels){
            ids.push(10);
            flagLevels = true;
          }
          if(!window.sessionStorage.grades){
            ids.push(11);
            flagGrades = true;
          }

          if(!window.sessionStorage.semester){
            const response = await consultServices('getCurrentSemester','POST',{});
            this.semester = response;
            window.sessionStorage.semester = JSON.stringify(this.semester);
          }

          if( ids.length > 0){
            //Hacer consulta única de masterValues
            var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
            //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
            if(flagLevels == true){
                this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                window.sessionStorage.levels  = JSON.stringify(this.levels);
                this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                window.sessionStorage.grades  = JSON.stringify(this.grades);
            }
          }

          this.semester = JSON.parse( window.sessionStorage.semester );
          this.levels = JSON.parse( window.sessionStorage.levels );
          this.grades = JSON.parse( window.sessionStorage.grades );

          this.isLoading = false;
        },

        async getSchoolsAttendances(){
          this.isLoading = true;
          const resp = await consultServices('getVolunteersByJobPerSchool', 'POST', { semesterCode : this.semester.id });
          this.setDataTable(resp);
          this.isLoading = false;
         },

        async getSchoolsAttendancesDetail(item){
           this.isLoading = true;
           console.log('school ', item.id);
           var form = {
             idSchool : item.id,
             semesterCode : this.semester.id
           };
           const resp = await consultServices('getReportBySchoolByVolunteer', 'POST', form);
           this.reports = resp;
           this.isLoading = false;
          },

        async getSchoolsVolunteerAttendancesConsolidate(){
            this.isLoading = true;
            const resp = await consultServices('getConsolidateAttendancesByVolunteer', 'POST', { semesterCode : this.semester.id });
            this.reportConsolidateVolunteers = resp;
            this.isLoading = false;
           },

        async getSchoolsStudentAttendancesConsolidate(){
             this.isLoading = true;
             const resp = await consultServices('getConsolidateAttendancesByStudent', 'POST', { semesterCode : this.semester.id });
             this.reportConsolidateStudents = resp;
             this.isLoading = false;
           },

        async getSchoolsStudentsAttendancesDetail(item){
          this.isLoading = true;
          var form = {
            idSchool : item.id,
            semesterCode : this.semester.id
          };
          const resp = await consultServices('getStudentsReportBySchool', 'POST', form);
          console.log(resp);
          this.reportStudents = resp;
          this.isLoading = false;
         },


        //Seteamos la data que recibimos para exportarla al un archivo excel
        async exportExcelVolunteers (school) {
           if(school){
             await this.getSchoolsAttendancesDetail(school);
             var tempFormat =_.cloneDeep(this.title);
             var tempContHeader = tempFormat.length;
             var mustAssist = 0;
             var estimatedGDC = 0;
             var estimatedOperations = 0;
             var estimatedDivertimate = 0;
             var estimatedWorkshop = 0;
             //Recorremos los eventos del colegio
             _.map(this.reports.schoolEvents, (event) =>{
              //Calculamos si se debió asistir por la fecha (los futuros no cuentan)
              //Calculamos si debieron haber asistido por distintos cargos
              let dateEvent = moment(event.startDate )
              let dateCurrent = moment()
              let mustAssistByDate = dateEvent.diff(dateCurrent, 'days') <= 0
              // console.log('Fecha del evento: ', dateEvent)
              // console.log('fecha de hoy: ', dateCurrent)
              // console.log('Debe asistir: ', mustAssistByDate)
              // console.log('diferencia en días: ', dateEvent.diff(dateCurrent, 'days'))
              tempFormat[tempContHeader] = event.startDate;
              event.isSeniorRequired == true ? estimatedGDC++ : null
              event.isOperationsRequired == true ?  estimatedOperations++ : null
              event.isMathRequired == true ?  estimatedDivertimate++ : null
              event.isCustomRequired == true ?  estimatedWorkshop++ : null
              mustAssistByDate ? mustAssist++ : null;
              tempContHeader++;
             });
             tempFormat.push('Esperado');
             tempFormat.push('Asistio');
             tempFormat.push('Tarde');
             tempFormat.push('Falto');
             var num = 1;

             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel
             var startDate = this.reports ;

             //console.log(this.reports.schoolEvents.length, 'schoolEvents');
             var data_body =_.map(this.reports.volunteers, (volunteer)=>{
               if(volunteer){
                 var _report = [];
                 var absenceCount = 0 ;
                 var attendanceCount = 0 ;
                 var lateCount = 0 ;
                  _report[0] = num;
                  _report[1] = volunteer.VolunteerJobs[0].Job ? volunteer.VolunteerJobs[0].Job.name : 'sin cargo';
                  if(volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop){
                    _report[2] = volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.levelCode;
                    _report[3] = volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.categoryCode;
                    if(volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.typeCode == 'WORKSHOP_MATH'){
                      _report[4] = volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.gradeCode;
                    }else {
                      if(volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.displayName){
                        _report[4] = volunteer.VolunteerJobs[0].AssignmentRecords[0].Workshop.displayName;
                      }else{ _report[4] = " " }
                    };
                  }else{
                    _report[2] = " ";
                    _report[3] = volunteer.VolunteerJobs[0].Job ? volunteer.VolunteerJobs[0].Job.name : 'sin cargo';
                    _report[4] = volunteer.VolunteerJobs[0].Job ? volunteer.VolunteerJobs[0].Job.name : 'sin cargo';
                  };
                  _report[5] = volunteer.name;
                  _report[6] = volunteer.lastName;
                  volunteer.secondLastName == null? _report[7] = '': _report[7] =  volunteer.secondLastName ;
                  _report[8] = volunteer.alias;
                  _report[9] = volunteer.email;
                  _report[10] = volunteer.phone;
                  _report[11] = volunteer.documentNumber;
                  _report[12] = volunteer.birthdate;
                  volunteer.startDate ? _report[13] = volunteer.startDate : _report[13] = " " ;
                  volunteer.collegeName ? _report[14] = volunteer.collegeName : _report[14] = " ";
                  volunteer.careerName ? _report[15] = volunteer.careerName : _report[15] = " ";
                  volunteer.organizationName ? _report[16] = volunteer.organizationName : _report[16] = " ";
                  volunteer.district ? _report[17] = volunteer.district : _report[17] = " ";
                  volunteer.dream ? _report[18] = volunteer.dream : _report[18] = " ";
                  volunteer.talent ? _report[19] = volunteer.talent : _report[19] = " ";
                  volunteer.VolunteerJobs[0].positivismScore ? _report[20] = volunteer.VolunteerJobs[0].positivismScore : _report[20] = " ";
                  volunteer.VolunteerJobs[0].proactivityScore ? _report[21] = volunteer.VolunteerJobs[0].proactivityScore : _report[21] = " ";
                  volunteer.VolunteerJobs[0].solidarityScore ? _report[22] = volunteer.VolunteerJobs[0].solidarityScore :  _report[22] = " ";
                  volunteer.VolunteerJobs[0].trustScore ? _report[23] = volunteer.VolunteerJobs[0].trustScore : _report[23] = " ";
                  volunteer.VolunteerJobs[0].studentRelationshipScore ? _report[24] = volunteer.VolunteerJobs[0].studentRelationshipScore : _report[24] = " ";
                  volunteer.VolunteerJobs[0].methodologyFollowingScore ? _report[25] = volunteer.VolunteerJobs[0].methodologyFollowingScore : _report[25] = " ";
                  volunteer.VolunteerJobs[0].rulesFollowingScore ? _report[26] = volunteer.VolunteerJobs[0].rulesFollowingScore : _report[26] = " ";
                  var indxAux = _report.length;

                  if(volunteer.Attendances.length > 0){
                    //colocamos los eventos en el let events
                    // let events = this.reports.schoolEvents;
                    //Buscamos 
                    //Recorremos los eventos del colegio
                    _.map(this.reports.schoolEvents, (event) =>{
                      var attendanceValue = 0;
                      _.map(volunteer.Attendances, (attendance) => {
                        //Si la asistencia es del evento actual
                        if(event.id == attendance.idSchoolManagementEvent){
                          // console.log('Tiene asistencia en el evento', attendance.statusCode)
                          //Colocamos la asistencia en cada fecha
                          if(attendance.statusCode == "ATTENDANCE_ATTENDED"){
                            attendanceValue = 1;
                            if(attendance.isLate == false){
                              attendanceCount++;
                            }else{
                              lateCount++;
                            }
                          }else{
                            attendanceValue = 0;
                          }
                        }
                        _report[indxAux] = attendanceValue;
                      })
                      indxAux++;
                    })
                  }else{
                    _.map(this.reports.schoolEvents, (item) =>{
                      _report[indxAux] = 0;
                      indxAux++;
                    })
                  }
                //Calulamos las inasistencias:
                if(volunteer.VolunteerJobs[0].Job.category == "SENIOR"){
                   _report.push(estimatedGDC);
                   absenceCount = mustAssist - attendanceCount - lateCount;
                }else if (volunteer.VolunteerJobs[0].Job.category != "SENIOR" && volunteer.VolunteerJobs[0].Job.code == "SCHOOL_MATH") {
                  _report.push(estimatedDivertimate);
                  absenceCount = mustAssist - attendanceCount - lateCount;
                }else if (volunteer.VolunteerJobs[0].Job.category != "SENIOR" && volunteer.VolunteerJobs[0].Job.code == "SCHOOL_OPERATIONS") {
                  _report.push(estimatedOperations);
                  absenceCount = mustAssist - attendanceCount - lateCount;
                }else if (volunteer.VolunteerJobs[0].Job.category != "SENIOR" && volunteer.VolunteerJobs[0].Job.code == "SCHOOL_CUSTOM") {
                  _report.push(estimatedWorkshop);
                  absenceCount = mustAssist - attendanceCount - lateCount;
                }
                 attendanceCount ? _report.push(attendanceCount) : _report.push(0);
                 lateCount ? _report.push(lateCount) : _report.push(0);
                 absenceCount ? _report.push(absenceCount) : _report.push(0);
                 num++;
                 return _report;
               }
             });

             //Seteamos los parametros para el excel
             data = _.concat(data, data_body);
               var filename = this.NAME + ".xlsx";
               var ws_name = this.NAME;
               var wb = XLSX.utils.book_new();
               var ws = XLSX.utils.aoa_to_sheet(data);
               XLSX.utils.book_append_sheet(wb, ws, ws_name);

               //Definimos nuestros estilos
               var jsonBlue = {
                 font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                 fill: { fgColor: {rgb: "00aae4"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };

               var jsonOrange = {
                 font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                 fill: { fgColor: {rgb: "FFA420"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };

               var jsonGreen = {
                 font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                 fill: { fgColor: {rgb: "89AC76"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };
               var jsonData ={
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };
               var jsonDataGris ={
                 fill: { fgColor: {rgb: "D7D7D7"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };


               //arreglo que contiene las celdas que seran pintadas de azul
               var auxArrayblue = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1'];

               //arreglo que contiene las celdas que seran pintadas de anaranjado
               var auxArrayOrange = ['U1', 'V1', 'W1', 'X1', 'Y1', 'Z1', 'AA1'] ;

               //damos estilo a nuestras celdas
               var contRow = 1 ;
               var indxColor = 0 ;
               _.map(ws, (cell, key) => {
                 var flagHeader = false ;
                 if(key != "!ref"){
                   _.map(auxArrayblue, (blue) => {
                     if(key == blue){
                       wb.Sheets.Listado_creandos[key]['s']=jsonBlue;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   _.map(auxArrayOrange, (orange) => {
                     if(key == orange){
                       wb.Sheets.Listado_creandos[key]['s']=jsonOrange;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   _.map(this.reports.schoolEvents, (green) => {
                     if(cell.v == green.startDate){
                       wb.Sheets.Listado_creandos[key]['s']=jsonGreen;
                       indxColor = 0
                       flagHeader = true;
                     }else if( cell.v == 'Esperado'){
                       wb.Sheets.Listado_creandos[key]['s']=jsonGreen;
                       indxColor = 0
                       flagHeader = true;
                     }else if( cell.v == 'Asistio'){
                       wb.Sheets.Listado_creandos[key]['s']=jsonGreen;
                       indxColor = 0
                       flagHeader = true;
                     }else if( cell.v == 'Tarde'){
                       wb.Sheets.Listado_creandos[key]['s']=jsonGreen;
                       indxColor = 0
                       flagHeader = true;
                     }else if( cell.v == 'Falto'){
                       wb.Sheets.Listado_creandos[key]['s']=jsonGreen;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   if(flagHeader == false){
                     if(indxColor == 0){
                       wb.Sheets.Listado_creandos[key]['s']=jsonDataGris;
                       contRow++;
                       if(tempFormat.length < contRow){
                         contRow = 1 ;
                         indxColor = 1;
                       }
                     }else{
                       wb.Sheets.Listado_creandos[key]['s']=jsonData;
                       contRow++;
                       if(tempFormat.length <= contRow){
                         contRow = 1 ;
                         indxColor = 0;
                       }
                     }
                   }
                 }
               })
               XLSX.writeFile(wb, filename);
           }else{
             alert("Seleccione un colegio");
           }
         },

        async exportExcelVolunteersConsolidate () {

           await this.getSchoolsVolunteerAttendancesConsolidate();
           if(this.reportConsolidateVolunteers.length > 0){
             var tempFormat =_.cloneDeep(this.titleII);

             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel
             var semester = this.semester.displayName ;
             var data_body =_.map(this.reportConsolidateVolunteers, (item)=>{
               if(item){
                 var _report = [];
                 var tot = parseInt(item.not_late) + parseInt(item.late);
                   _report[0] = semester;
                   _report[1] = item.start_date;
                   _report[2] = item.name ;
                   _report[3] = item.category;
                   if(item.level_code){
                     var levelDisplayName = _.result(_.find(this.levels, function(obj) {
                        return obj.code === item.level_code;
                    }), 'displayValue');
                    levelDisplayName ? _report[4] = levelDisplayName : _report[4] = item.level_code;
                   }else{ _report[4] = " " };
                   if(item.older){
                      item.older == 'JUNIOR' ? _report[5] = "Nuevo" :  _report[5] = "Senior"
                   }else{ _report[5] = " " };
                   _report[6] = tot;
                   _report[7] = item.not_late;
                   _report[8] = item.late;
                   //console.log(_report);
                 return _report;
               }
             });

             //Seteamos los parametros para el excel
             data = _.concat(data, data_body);
               var filename = this.NAMEII + ".xlsx";
               var ws_name = this.NAMEII;
               var wb = XLSX.utils.book_new();
               var ws = XLSX.utils.aoa_to_sheet(data);
               XLSX.utils.book_append_sheet(wb, ws, ws_name);

               var stringLetter = "ABCDEFGHI";
               var arrayString = stringLetter.split('');

               for (var i = 0; i <= data_body.length; i++) {
                 i = i + 1
                 var json = {}
                 if(i == 1){
                   json = {
                     font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                     fill: { fgColor: {rgb: "00aae4"}},
                     border: {
                       top : { style: 'thin', color: {rgb: "000000"} },
                       bottom :	{ style: 'thin', color: {rgb: "000000"} },
                       left :	{ style: 'thin', color: {rgb: "000000"} },
                       right :	{ style: 'thin', color: {rgb: "000000"} },
                     }
                   }
                 }else{
                   json ={
                     border: {
                       top : { style: 'thin', color: {rgb: "000000"} },
                       bottom :	{ style: 'thin', color: {rgb: "000000"} },
                       left :	{ style: 'thin', color: {rgb: "000000"} },
                       right :	{ style: 'thin', color: {rgb: "000000"} },
                     }
                   }
                 }
                 _.map(arrayString, (item) => {
                   var cell = item + String(i);
                   wb.Sheets.Consolidado_crea[cell]['s']=json;
                 })
                 i = i - 1
               };
               XLSX.writeFile(wb, filename);
           }else{
             alert("No se encontro asistencias de voluntarios");
           }
         },

        async exportExcelStudentsConsolidate () {

          await this.getSchoolsStudentAttendancesConsolidate();
          if(this.reportConsolidateStudents.length > 0){
            var tempFormat =_.cloneDeep(this.titleIII);

            //Seteamos la cabecera del excel
            var data = []
            data[0] = _.map(tempFormat,(item_format)=>{
              return item_format;
            });

            //Seteamos la data del excel
            var semester = this.semester.displayName ;
            var data_body =_.map(this.reportConsolidateStudents, (item)=>{
              if(item){
                var _report = [];
                  _report[0] = semester;
                  _report[1] = item.start_date;
                  _report[2] = item.name ;
                  if(item.grade_code){
                    var gradeDisplayName = _.result(_.find(this.grades, function(obj) {
                       return obj.code === item.grade_code;
                   }), 'displayValue');
                   gradeDisplayName ? _report[3] = gradeDisplayName : _report[3] = item.grade_code;
                 }else{ _report[3] = " " };
                  _report[4] = item.attendances;
                return _report;
              }
            });

            //Seteamos los parametros para el excel
            data = _.concat(data, data_body);
              var filename = this.NAMEIII + ".xlsx";
              var ws_name = this.NAMEIII;
              var wb = XLSX.utils.book_new();
              var ws = XLSX.utils.aoa_to_sheet(data);
              XLSX.utils.book_append_sheet(wb, ws, ws_name);

              var stringLetter = "ABCDE";
              var arrayString = stringLetter.split('');

              console.log(ws);

              for (var i = 0; i <= data_body.length; i++) {
                var json = {}
                if(i == 0){
                  json = {
                    font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                    fill: { fgColor: {rgb: "00aae4"}},
                    border: {
                      top : { style: 'thin', color: {rgb: "000000"} },
                      bottom :	{ style: 'thin', color: {rgb: "000000"} },
                      left :	{ style: 'thin', color: {rgb: "000000"} },
                      right :	{ style: 'thin', color: {rgb: "000000"} },
                    }
                  }
                }else{
                  json ={
                    font: { name: "Verdana", sz: 10, color: {rgb: "ffffff"}},
                    border: {
                      top : { style: 'thin', color: {rgb: "000000"} },
                      bottom :	{ style: 'thin', color: {rgb: "000000"} },
                      left :	{ style: 'thin', color: {rgb: "000000"} },
                      right :	{ style: 'thin', color: {rgb: "000000"} },
                    }
                  }
                }
                _.map(arrayString, (item) => {
                  var cell = item + String(i + 1);
                  wb.Sheets.Consolidado_ninios[cell]['s']=json;
                })
              };
              XLSX.writeFile(wb, filename);
          }else{
            alert("No se encontro asistencias de niños");
          }
        },

        async exportStudents (item) {
           if(item){
             await this.getSchoolsStudentsAttendancesDetail(item);
             var tempFormat =_.cloneDeep(this.titleIV);

             _.map(this.reportStudents.schoolEvents, (item) =>{
               tempFormat.push(item.startDate);
             });

             var tempContHeader = tempFormat.length;

             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel

             var data_body =_.map(this.reportStudents.students, (student)=>{
               if(student){
                 var _report = [];
                 var attendanceCount = 0 ;
                  _report[0] = this.semester.displayName;
                  _report[1] = "Matrícula";
                  _report[2] = item.name;
                  student.Enrollments[0].Workshop.gradeCode ? _report[3] = student.Enrollments[0].Workshop.gradeCode : _report[3] = "";
                  _report[4] = student.name;
                  _report[5] = student.lastName;
                  student.secondLastName ? _report[6] = student.secondLastName : _report[6] = " ";
                  _report[7] = student.documentNumber;
                  if(student.EmergencyContacts.length > 0){
                    _report[8] = student.EmergencyContacts[0].name;
                    _report[9] = student.EmergencyContacts[0].phone;
                    _report[11] = student.EmergencyContacts[0].address;
                  }else{
                    _report[8] = " ";
                    _report[9] = " ";
                    _report[11] = " ";
                  }
                  student.pickUpByParent ? _report[10] = "Sí" : _report[10] = "No" ;
                  student.Enrollments[0].Workshop.contentCode ? _report[12] = student.Enrollments[0].Workshop.contentCode :  _report[12] = " " ;
                  student.Enrollments[0].Workshop.levelCode ? _report[13] = student.Enrollments[0].Workshop.levelCode :  _report[13] = " " ;
                  _report[14] = attendanceCount;
                  var indxAux = _report.length;
                  if(student.Enrollments[0].Attendances.length > 0){
                    _.map(this.reportStudents.schoolEvents, (item) =>{
                      _.map(student.Enrollments[0].Attendances, (attendance) => {
                        var attendanceAux = false;
                        if (item.id == attendance.idSchoolManagementEvent){
                          attendanceAux = true;
                        }
                        if(attendanceAux){
                          if(attendance.statusCode == "ATTENDANCE_ATTENDED"){
                            _report[indxAux] = 1;
                            attendanceCount++;
                          }else{
                            _report[indxAux] = 0;
                          }
                        }else{
                          _report[indxAux] = 0;
                        }
                      })
                      indxAux++;
                    })
                  }else{
                    _.map(this.reportStudents.schoolEvents, (item) =>{
                      _report[indxAux] = 0;
                      indxAux++;
                    })
                  }
                  _report[14] = attendanceCount;
                  console.log(_report);
                  return _report;
               }
             });

             //Seteamos los parametros para el excel
             data = _.concat(data, data_body);
               var filename = this.NAMEIV + ".xlsx";
               var ws_name = this.NAMEIV;
               var wb = XLSX.utils.book_new();
               var ws = XLSX.utils.aoa_to_sheet(data);
               XLSX.utils.book_append_sheet(wb, ws, ws_name);

               //Definimos nuestros estilos
               var jsonBlue = {
                 font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                 fill: { fgColor: {rgb: "00aae4"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };

               var jsonData ={
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };

               var jsonDataGris ={
                 fill: { fgColor: {rgb: "D7D7D7"}},
                 border: {
                   top : { style: 'thin', color: {rgb: "000000"} },
                   bottom :	{ style: 'thin', color: {rgb: "000000"} },
                   left :	{ style: 'thin', color: {rgb: "000000"} },
                   right :	{ style: 'thin', color: {rgb: "000000"} },
                 }
               };


               //arreglo que contiene las celdas que seran pintadas de azul
               var auxArrayblue = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1'];

               //damos estilo a nuestras celdas
               var contRow = 1 ;
               var indxColor = 0 ;
               _.map(ws, (cell, key) => {
                 var flagHeader = false ;
                 if(key != "!ref"){
                   _.map(auxArrayblue, (blue) => {
                     if(key == blue){
                       wb.Sheets.Listado_ninios[key]['s']=jsonBlue;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   _.map(this.reportStudents.schoolEvents, (green) => {
                     if(cell.v == green.startDate){
                       wb.Sheets.Listado_ninios[key]['s']=jsonBlue;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   if(flagHeader == false){
                     if(indxColor == 0){
                       wb.Sheets.Listado_ninios[key]['s']=jsonDataGris;
                       contRow++;
                       if(tempFormat.length < contRow){
                         contRow = 1 ;
                         indxColor = 1;
                       }
                     }else{
                       wb.Sheets.Listado_ninios[key]['s']=jsonData;
                       contRow++;
                       if(tempFormat.length <= contRow){
                         contRow = 1 ;
                         indxColor = 0;
                       }
                     }
                   }
                 }
               })
               XLSX.writeFile(wb, filename);
           }else{
             alert("Seleccione un colegio");
           }
         },

        setHeadTable(){
         this.colum = [
           {label:'Colegio' ,name:'name' ,find:0 ,sort:0},
           {label:'GDC' ,name:'gdc' ,find:0 ,sort:0},
           {label:'Divertimate' ,name:'divertimate' ,find:0 ,sort:0},
           {label:'Talleres' ,name:'workshops' ,find:0 ,sort:0},
           {label:'Operaciones' ,name:'operations' ,find:0 ,sort:0},
           {label:'Total Creandos' ,name:'totalVolunteers' ,find:0 ,sort:0},
           {label:'Detalle' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Base de datos creandos - Semestre " + this.semester.displayName;
          //tableMafIII
          this.columIII= [
            {label:'Colegio' ,name:'name' ,find:0 ,sort:0},
            {label:'Detalle' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTableIII = "Niños por colegio";

       },

        refreshData() {
        this.$refs.tableMaf.formatData(this.schools);
        this.$refs.tableMafIII.formatData(this.schoolsIII);
       },

        setDataTable(arrayData){
         var ctx = this;
         this.schools = [];
         this.schoolsII = [];
         this.schoolsIII = [];
         var consolidado = {};
         var consolidadoStudents = {};

         this.schools = _.map(arrayData, (item) => {
             var school = {};
                 school.name = item.name;
                 school.totalVolunteers = item.total_volunteers;
                 school.gdc = item.gdc;
                 school.divertimate = item.divertimate;
                 school.workshops = item.workshops;
                 school.operations = item.operations;
                 school.actions=<div class="d-flex justify-content-around">
                      <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcelVolunteers(item)}><i class="fa fa-download"></i> Descargar lista </button>
                    </div>;
             return school;
         });
         consolidado.name = "Consolidados de colegios";
         consolidado.actions=<div class="d-flex justify-content-around">
              <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcelVolunteersConsolidate()}><i class="fa fa-download"></i> Descargar lista </button>
            </div>;
        this.schools.push(consolidado);


        //tableMafIII
        this.schoolsIII = _.map(arrayData, (item) => {
            var school = {};
                school.name = item.name;
                school.actions=<div class="d-flex justify-content-around">
                     <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportStudents(item)}><i class="fa fa-download"></i> Descargar lista </button>
                   </div>;
            return school;
        });
        consolidadoStudents.name = "Asistencia detallada de niños por colegio"
        consolidadoStudents.actions=<div class="d-flex justify-content-around">
             <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcelStudentsConsolidate()}><i class="fa fa-download"></i> Descargar lista </button>
           </div>;
        this.schoolsIII.push(consolidadoStudents)
        this.refreshData();
       },

      }

  }

</script>
