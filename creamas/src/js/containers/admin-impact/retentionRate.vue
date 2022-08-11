<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">Tasa de retencion</div>
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar semestre :</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <select class="form-control" v-model="semester" @change="getRetentionRate()">
              <option v-for="semester in semesters" :value="semester"> {{semester.displayName}} </option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <TableMaf :header="colum" :data="schools" :tableTitle="titleTable" ref="tableMaf">
          </TableMaf>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
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
          NAME :'Retencion_creandos',

          title:[
            'DNI',
            'Ap. Paterno',
            'Ap. Materno',
            'Nombres',
            'Antiguedad',
            'Promedio',
            'APTO/NO APTO',
            'Ingresó',
            'Confirmación',
            'distritoVive',
            'Pospone semestre'
          ],

          reports:[],

          semester: {},
          schools: [],
          semesters: [],
          colum: [],
          titleTable: '',
          X: '',

      }),

      created () {
        this.X = XLSX;
        //this.getSessionStorage();
        this.setHeadTable();
        this.getSemesters();
      },

      methods: {

        async getSessionStorage(){
          this.isLoading = true;
          this.isLoading = false;
        },

        async getSemesters(){
          this.isLoading = true;
          const resp = await consultServices('getSemesters', 'POST', {});
          this.semesters = resp;
          this.isLoading = false;
        },

        async getRetentionRate(){
          this.isLoading = true;
          console.log('SEMESTRE::::::::::::::', this.semester)
          this.titleTable = "Base de datos creandos - Semestre " + this.semester.displayName;
          var form = {
            currentSemerterCode : this.semester.id,
            nextSemerterCode : this.semester.nextSemester
          };
          const resp = await consultServices('getRetentionRate', 'POST', form);
          this.setDataTable(resp);
          this.isLoading = false;
         },

        async getRetentionRateDetail(item){
           this.isLoading = true;
           var form = {
             idSchool : item.id,
             currentSemerterCode : this.semester.id,
             nextSemerterCode : this.semester.nextSemester
           };
           const resp = await consultServices('getRetentionRateDetail', 'POST', form);
           this.reports = resp;
           this.isLoading = false;
        },
        //Seteamos la data que recibimos para exportarla al un archivo excel
        async exportExcelVolunteers (item) {
           if(item){
             await this.getRetentionRateDetail(item);
             var tempFormat =_.cloneDeep(this.title);

             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel

             var data_body =_.map(this.reports, (volunteer)=>{
               if(volunteer){
                 var _report = [];
                 _report[0] = volunteer.documentNumber;
                 _report[1] = volunteer.name;
                 _report[2] = volunteer.lastName;
                 volunteer.secondLastName ? _report[3] = volunteer.secondLastName : _report[3] = " " ;
                 if(volunteer.seniorityCode == 'VOLUNTEER_SENIOR'){
                   _report[4] = 'Senior'
                 }else{
                   _report[4] = "Nuevo"
                 }
                 var longJob = volunteer.VolunteerJobs.length;

                 _.map(volunteer.VolunteerJobs, (volunteerJob) => {
                   if(volunteerJob.semesterCode == this.semester.id){
                     if(volunteerJob.evaluationAverage){
                       _report[5] = volunteerJob.evaluationAverage;
                       if(volunteerJob.evaluationAverage > 5 && volunteer.statusCode == 'VOLUNTEER_ACTIVE'){
                         _report[6] = "Apto";
                       }else{
                         _report[6] = "No apto";
                       }
                     }else{
                       _report[5] = 0;
                       _report[6] = "Pendiente";
                     };
                     _report[7] = "No ingresó a formulario";
                     _report[8] = " ";
                     volunteerJob.putOffNextSemester ? _report[10] = 'Pospone un semestre' : _report[10] = " " ;
                   }else if(volunteerJob.semesterCode == this.semester.nextSemerterCode){
                     _report[7] = "Ingresó a formulario";
                     if(volunteerJob.AssignmentRecords.length > 0){
                       _report[8] = 'Confirmo en ' + volunteerJob.AssignmentRecords[0].School.name;
                     }else{
                       _report[8] = " ";
                     }
                   }
                 })
                 _report[9] = volunteer.district;

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
               var auxArrayblue = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1'];

               //damos estilo a nuestras celdas
               var contRow = 1 ;
               var indxColor = 0 ;
               _.map(ws, (cell, key) => {
                 var flagHeader = false ;
                 if(key != "!ref"){
                   _.map(auxArrayblue, (blue) => {
                     if(key == blue){
                       wb.Sheets.Retencion_creandos[key]['s']=jsonBlue;
                       indxColor = 0
                       flagHeader = true;
                     }
                   })
                   if(flagHeader == false){
                     if(indxColor == 0){
                       wb.Sheets.Retencion_creandos[key]['s']=jsonDataGris;
                       console.log(key);
                       contRow++;
                       if(tempFormat.length < contRow){
                         console.log("jsonDataGris", contRow);
                         contRow = 0 ;
                         indxColor = 1;
                       }
                     }else{
                       wb.Sheets.Retencion_creandos[key]['s']=jsonData;
                       console.log(key);
                       contRow++;
                       if(tempFormat.length <= contRow){
                         console.log("jsonData", contRow);
                         contRow = 1 ;
                         indxColor = 0;
                       }
                     }
                   }
                 }
               })

               console.log(wb);
               XLSX.writeFile(wb, filename);

           }else{
             alert("Seleccione un colegio");
           }
         },

        setHeadTable(){
         this.colum = [
           {label:'Colegio' ,name:'name' ,find:0 ,sort:0},
           //{label:'Creandos activos' + this.semester.displayName ,name:'active' ,find:0 ,sort:0},
           {label:'Creandos activos en el semestre' ,name:'active' ,find:0 ,sort:0},
           {label:'Creandos aptos' ,name:'suitables' ,find:0 ,sort:0},
           {label:'Ingresaron a Formulario' ,name:'formCompleted' ,find:0 ,sort:0},
           {label:'Confirmaron participación' ,name:'confirmed' ,find:0 ,sort:0},
           {label:'Pospone un semestre' ,name:'putOffNextSemester' ,find:0 ,sort:0},
           {label:'Registro incompleto' ,name:'formIncompleted' ,find:0 ,sort:0},
           {label:'Ratio de retención' ,name:'retentionRate' ,find:0 ,sort:0},
           {label:'Detalle' ,name:'actions' ,find:0 ,sort:0}];
         

       },

       refreshData() {
        this.$refs.tableMaf.formatData(this.schools);
       },

       setDataTable(arrayData){
         console.log('entró a setData ', arrayData)
         var ctx = this;
         this.schools = [];

         var totalActive = 0 ;
         var totalSuitables = 0 ;
         var totalFormCompleted = 0 ;
         var totalConfirmed = 0 ;
         var totalPutOffNextSemester = 0 ;
         var totalFormIncompleted = 0 ;
         var totalRetentionRate = 0 ;

         this.schools = _.map(arrayData, (item) => {
             var school = {};
             var formIncompleted = 0;
             var retentionRate = 0;

                 school.name = item.name
                 school.active = parseInt(item.active)
                 school.suitables = parseInt(item.suitables)
                 school.formCompleted = parseInt(item.form_completed)
                 school.confirmed = parseInt(item.confirmed)
                 school.putOffNextSemester = parseInt(item.put_off_next_semester)
                 formIncompleted =(school.confirmed + school.putOffNextSemester)-  school.active 
                 retentionRate =  (school.formCompleted  ) / school.active
                 school.formIncompleted = formIncompleted
                 school.retentionRate = retentionRate + "%"
                 school.actions=<div class="d-flex justify-content-around">
                      <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcelVolunteers(item)}><i class="fa fa-download"></i> Descargar lista </button>
                    </div>;

                    totalActive = totalActive + item.active;
                    totalSuitables = totalSuitables + item.suitables;
                    totalFormCompleted = totalFormCompleted + item.form_completed;
                    totalConfirmed = totalConfirmed + item.confirmed;
                    totalPutOffNextSemester = totalPutOffNextSemester + item.put_off_next_semester;
                    totalFormIncompleted = totalFormIncompleted + formIncompleted;
                    totalRetentionRate = totalRetentionRate + retentionRate;
             return school;
         });

          var school = {};

          school.name = "Colegio (" + totalConfirmed + " confirmados/" + totalRetentionRate + "%)";
          school.active = "Creando activos " + totalActive;
          school.suitables = "Creandos aptos " + totalSuitables;
          school.formCompleted = "Ingresaron a Formulario " + totalFormCompleted;
          school.confirmed = "Confirmaron participación " + totalConfirmed;
          school.putOffNextSemester = "Pospone un semestre " + totalPutOffNextSemester;
          school.formIncompleted = "Registro incompleto " + totalFormIncompleted;
          school.retentionRate = "Ratio de retención " + totalRetentionRate + "%";

          this.schools.push(school);
          console.log('escuela lista ', this.schools)

        this.refreshData();
       },

      }

  }

</script>
