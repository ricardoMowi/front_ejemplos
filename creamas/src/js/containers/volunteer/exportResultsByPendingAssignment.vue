<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Pendientes de asignacion del semestre  {{currentSemester.displayName}} </h2>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <UploadMasiveComponent :serviceUrl='serviceUrl' :serviceContent='serviceContent' :headerSection='headerSection' :columnExcel='columnExcel' :colum='colum' :columnToDB='columnToDB' :slice='slice' :initRow='initRow' :nameOfSheet='nameOfSheet' ></UploadMasiveComponent>
        </div> <!--Body-->
      </div> <!--Card-->
    </div> <!--Col-->
  </div> <!--Row-->
</template>

<script>
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  //import writeFileXLSX from './../../components/xlsx/example.js'; //consulta servicios
  import XLSX from './../../components/xlsx/xlsx.js';
  import UploadMasiveComponent from './../../components/UploadMasiveComponent.vue';
  import _ from 'lodash';


    export default {
      name: "exportResultByPendingAssigmentContainer",
      components: {
        LoadingComponent,
        UploadMasiveComponent,
      },
      data: () => ({
          isLoading: false,
          NAME :'Vol_pendientes_asignacion',
          NAMEII :'Lista_de_colegios',
          titleII:[
            'Código',
            'Nombre'
          ],
          titleI:[
            'Código',
            'DNI',
            'Nombres',
            'Apellido Paterno',
            'Apellido Materno',
            'Email',
            'Celular',
            'Distrito',
            'Antiguedad',
            'ColegioProcedencia',
            'ColegioProcedencia',
            'ColegioProcedencia',
            'ColegioInicial',
            'ColegioFinal',
            'Rol',
            'Grado',
            'Motivacion',
            'Comentario Adicional',
            'Sueño',
            'CambioPeru',
            'Fecha Registro'
          ],
          reports:[],
          reportsExcel:[],
          semesters: [],
          currentSemester: [],
          psychologicalStatus : [],
          resultEvaluation: [],
          X: '',
          id: window.INITIAL_STATE.id,
          headerSection: '',
          serviceContent: {
            eventId:'15',
          },
        columnExcel: [ //SON LAS COLUMNA / MASCARA QUE HARA MATCH CON LA DATA DEL EXCEL
          'code',
          'document',
          'name',
          'lastName',
          'secondLastName',
          'email',
          'phone',
          'district',
          'time',
          'schoolNext',
          'schoolNow',
          'schoolPrevious',
          'schoolInitial',
          'schoolFinal',
          'rol',
          'grade',
          'motivation',
          'comment',
          'dream',
          'peruChange',
          'registerDate',
        ],
        colum:[ //SON LAS COLUMNAS QUE SE MOSTRARAN EN LA TABLA
          {name:'code', label :'Código', find:1, sort:1},
          {name:'document', label :'DNI', find:1, sort:1},
          {name:'name', label :'Nombre', find:1, sort:1},
          {name:'lastName', label :'Apellido Paterno', find:1, sort:1},
          {name:'secondLastName', label :'Apeliido Materno', find:1, sort:1},
          {name:'email', label :'Email', find:1, sort:1},
          {name:'phone', label :'Celular', find:1, sort:1},
          {name:'district', label :'Destrito', find:1, sort:1},
          {name:'time', label :'Antiguedad', find:1, sort:1},
          {name:'schoolNext', label :'ColegioProcedencia 20191', find:1, sort:1},
          {name:'schoolNow', label :'ColegioProcedencia 20192', find:1, sort:1},
          {name:'schoolPrevious', label :'ColegioProcedencia 20182', find:1, sort:1},
          {name:'schoolInitial', label :'Colegio Inicial', find:1, sort:1},
          {name:'schoolFinal', label :'Colegio Final', find:1, sort:1},
          {name:'rol', label :'Rol', find:1, sort:1},
          {name:'grade', label :'Grado', find:1, sort:1},
          {name:'motivation', label :'Motivación', find:1, sort:1},
          {name:'comment', label :'Comentario', find:1, sort:1},
          {name:'dream', label :'Sueño', find:1, sort:1},
          {name:'peruChange', label :'CambioPerú', find:1, sort:1},
          {name:'registerDate', label :'Fecha de registro', find:1, sort:1},
        ],
        columnToDB:[
          'code',
          'schoolFinal'
        ],
        slice: 1,
        initRow:1,//0,1,2,3... Es la posicion en donde empieza el la data
        nameOfSheet: 'Vol_pendientes_asignacion',
        serviceUrl:'bulkUpdateAssignment',
        grades:[],
      }),

      created () {
        var ctx = this;
        this.X = XLSX;
        this.getSessionStorage();
        this.headerSection = <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcel()}><i class="fa fa-download"></i> Descargar lista </button>;
      },

      methods: {
        async getSessionStorage(){
          this.isLoading = true;
          var ids = [] ;
          var flagGrades = false;

          if(!window.sessionStorage.grades){
            ids.push(11);
            flagGrades = true;
          }
          if(!window.sessionStorage.semesters){
            const response = await consultServices('getPreviousSemesters','POST',{});
            this.semesters = response;
            window.sessionStorage.semesters = JSON.stringify(this.semesters);
          }
          if(!window.sessionStorage.semester){
            const response = await consultServices('getCurrentSemester','POST',{});
            this.semester = response;
            window.sessionStorage.semester = JSON.stringify(this.semester);
          }
          if(!window.sessionStorage.school){
            // console.log('this.semester', this.semester)
            this.school = await  consultServices('getSchool','POST',{ id:this.id, semesterCode: JSON.parse( window.sessionStorage.semester ).id});
            window.sessionStorage.school  = JSON.stringify(this.school);
          }

          if( ids.length > 0){
            //Hacer consulta única de masterValues
            var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
            //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
            if(flagGrades == true){
                this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                window.sessionStorage.grades  = JSON.stringify(this.grades);
            }
          }

          this.grades = JSON.parse( window.sessionStorage.grades );
          this.semesters = JSON.parse( window.sessionStorage.semesters );
          this.semester = JSON.parse( window.sessionStorage.semester );
          this.school = JSON.parse( window.sessionStorage.school );

          //Seteamos el idSchool del storage "school"
          _.map(this.school.AssignmentRecords,(assingmentRecord)=>{
            this.idSchool = assingmentRecord.School.id;
          });
          this.isLoading = false;
        },

        async getPenddingAssignmentsBySchool(){
          this.isLoading = true;
          const resp = await consultServices('getPenddingAssignments', 'POST', {});
          this.reports = resp;
          this.isLoading = false;
         },

        //Seteamos la data que recibimos para exportarla al un archivo excel
         async exportExcel_sdsd () {
           //writeFileXLSX();
         },
         async exportExcel () {
          var time1 = {};
          var time2 = {};
          var time3 = {};

          _.map(this.semesters, (item, indx) => {
            if(indx == 0){
              time1 = item.id
            }
            if(indx == 1){
              time2 = item.id
            }
            if(indx == 2){
              time3 = item.id
            }
          });
          const ctx = this;

           if(this.semester){
             await this.getPenddingAssignmentsBySchool();
             var tempFormat =_.cloneDeep(this.titleI);
             var tempFormatII =_.cloneDeep(this.titleII);
             tempFormat[9] = 'ColegioProcedencia ' + time3 ;
             tempFormat[10] = 'ColegioProcedencia ' + time2 ;
             tempFormat[11] = 'ColegioProcedencia ' + time1 ;


             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             var dataI = []
             dataI[0] = _.map(tempFormatII,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel
             var dataBody = _.map(this.reports.assignments, (report)=>{
               var _report = [];
               var schoolTemp1 = null;
               var schoolTemp2 = null;
               var schoolTemp3 = null;
               var schoolTemp4 = null;

              // console.log('')
               _.map( report.VolunteerJobs, (item) => {
                  if(item.semesterCode == this.semester.id) {
                    schoolTemp4 = item;
                  }else if(item.semesterCode == time1) {
                    schoolTemp1 = item;
                  }else if(item.semesterCode == time2) {
                    schoolTemp2 = item;
                  }else if (item.semesterCode == time3) {
                    schoolTemp3 = item;
                  }
               })

               if(schoolTemp4){
                 _report[0] = schoolTemp4.AssignmentRecords[0].id ;
                 report.documentNumber  ? _report[1] = report.documentNumber : _report[1] = '';
                 report.name  ? _report[2] = report.name : _report[2] = '';
                 report.lastName  ? _report[3] = report.lastName : _report[3] =  '';
                 report.secondLastName  ? _report[4] = report.secondLastName : _report[4] = '';
                 report.email ? _report[5] = report.email : _report[5] =  '';
                 report.phone ? _report[6] = report.phone : _report[6] =  '';
                 report.district ? _report[7] = report.district :  _report[7] = '';
                 report.startDate ? _report[8] = report.startDate : _report[8] = '';
                 if(schoolTemp1){
                   _report[9] = schoolTemp1.AssignmentRecords[0].idSchool;
                 }else {
                   _report[9] = 'No inscrito en el ' + time3;
                 }
                 if(schoolTemp2){
                   _report[10] = schoolTemp2.AssignmentRecords[0].idSchool;
                 }else {
                   _report[10] = 'No inscrito en el ' + time2;
                 }
                 if(schoolTemp3){
                   _report[11] = schoolTemp3.AssignmentRecords[0].idSchool;
                 }else {
                   _report[11] = 'No inscrito en el ' + time1;
                 }

                 var levelDisplayName = _.result(_.find(this.grades, function(obj) {
                    return obj.code === schoolTemp4.AssignmentRecords[0].requestedWorkshopGradeCode;
                }), 'displayValue');

                schoolTemp4.AssignmentRecords[0].idSchool ? _report[12] = schoolTemp4.AssignmentRecords[0].idSchool : _report[12] = '';
                 _report[13] = '';
                schoolTemp4.Job.name ? _report[14] = schoolTemp4.Job.name : _report[14] = '';
                levelDisplayName ? _report[15] = levelDisplayName : _report[15] = '';
                schoolTemp4.AssignmentRecords[0].assignmentReason ? _report[16] = schoolTemp4.AssignmentRecords[0].assignmentReason : _report[16] = '';
                 _report[17] = '';
                report.dream ? _report[18] = report.dream : _report[18] = '';
                 _report[19] = '';
                report.startDate ? _report[20] = report.startDate : _report[20] = '';
               return _report;
               }
             });



             var dataBodyII = _.map(this.reports.schools, (school)=>{
               var _report = [];
               _report[0] = school.id ;
               _report[1] = school.name ;
               return _report;
             });

             //Seteamos los parametros para el excel
             data = _.concat(data, dataBody);
             dataI = _.concat(dataI, dataBodyII);
               var filename = "crea_asignacion_colegios" + ".xlsx";
               var ws_name = this.NAME;
               var ws_nameII = this.NAMEII;
               var wb = XLSX.utils.book_new();
               var ws = XLSX.utils.aoa_to_sheet(data);
               var wsII = XLSX.utils.aoa_to_sheet(dataI);
               XLSX.utils.book_append_sheet(wb, ws, ws_name);
               XLSX.utils.book_append_sheet(wb, wsII, ws_nameII);

              var stringLetter = "ABCDEFGHIJKLMNOPQRSTU";
              var arrayString = stringLetter.split('');

              for (var i = 0; i <= dataBody.length; i++) {
                i = i + 1
                _.map(arrayString, (item) => {
                  var cell = item + i;
                  wb.Sheets.Vol_pendientes_asignacion[cell]['s']={
                    border: {
                      top : { style: 'thin', color: {rgb: "000000"} },
                      bottom :	{ style: 'thin', color: {rgb: "000000"} },
                      left :	{ style: 'thin', color: {rgb: "000000"} },
                      right :	{ style: 'thin', color: {rgb: "000000"} },
                    }
                  }
                })
                i = i - 1
            };

              _.map(arrayString, (item) => {
                var cell = item + '1';
                wb.Sheets.Vol_pendientes_asignacion[cell]['s']={
                  font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                  fill: { fgColor: {rgb: "00aae4"}},
                  border: {
                    top : { style: 'thin', color: {rgb: "000000"} },
                    bottom :	{ style: 'thin', color: {rgb: "000000"} },
                    left :	{ style: 'thin', color: {rgb: "000000"} },
                    right :	{ style: 'thin', color: {rgb: "000000"} },
                  }
                }
              });

               XLSX.writeFile(wb, filename);
           }else{
             alert("No existen semestres");
           }
         },
      }
  }

</script>
