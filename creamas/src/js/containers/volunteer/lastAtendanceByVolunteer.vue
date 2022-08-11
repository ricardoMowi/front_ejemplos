<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">Asistencia de colegios del sabado</div>
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
      name: "exportResultByLastAttendanceContainer",
      components: {
      LoadingComponent,
      TableMaf

      },
      data: () => ({

          isLoading: true,
          NAME :'Asistencia_sabado_vol',

          title:[
            'fecRegistro',
            'fecSuceso',
            'DNI',
            'puntualOtarde',
            'nombres',
            'apPaterno',
            'apMaterno'
          ],

          reports:[],
          reportsExcel:[],

          semesterCode: '',
          schools: [],
          semesterCodes: [],
          psychologicalStatus : [],
          resultEvaluation: [],
          colum: [],
          titleTable: '',
          X: '',

      }),

      created () {
        this.X = XLSX;
        this.setHeadTable();
        this.getSessionStorage();
        this.getSchoolsAttendances()
      },

      methods: {

        async getSessionStorage(){
          this.isLoading = true;

          if(!window.sessionStorage.semester){
            const response = await consultServices('getCurrentSemester','POST',{});
            this.semester = response;
            window.sessionStorage.semester = JSON.stringify(this.semester);
          }
          this.semester = JSON.parse( window.sessionStorage.semester );

          this.isLoading = false;
        },

        async getSchoolsAttendances(){
          this.isLoading = true;
          const resp = await consultServices('getLastAttendancesByVolunteer', 'POST', { semesterCode : this.semester.id });
          this.setDataTable(resp);
          this.isLoading = false;
         },

         async getSchoolsAttendancesDetail(item){
           this.isLoading = true;
           var form = {
             id : item.idEvent
           };
           const resp = await consultServices('getLastAttendancesByVolunteerBySchool', 'POST', form);
           this.reports = resp;
           this.isLoading = false;
          },

        //Seteamos la data que recibimos para exportarla al un archivo excel
         async exportExcel (item) {
           if(item){
             //console.log("item exportExcel  ",item);
             await this.getSchoolsAttendancesDetail(item);
             var tempFormat =_.cloneDeep(this.title);
             var num = 1;

             //Seteamos la cabecera del excel
             var data = []
             data[0] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel
             var startDate = this.reports.startDate ;
             var data_body =_.map(this.reports.Attendances, (attendance)=>{
               if(attendance){
                  console.log("attendance exportExcel  ",attendance);
                 var _report = [];
                   _report[0] = moment(attendance.attendedDate).format("YYYY-MM-DD HH:mm:ss");
                   _report[1] = startDate ;
                   _report[2] = attendance.Volunteer.documentNumber;
                   attendance.isLate == true ? _report[3] = 'T' : _report[3] = 'P' ;
                   _report[4] = attendance.Volunteer.name ;
                   _report[5] = attendance.Volunteer.lastName ;
                   attendance.Volunteer.secondLastName ? _report[6] = attendance.Volunteer.secondLastName : _report[6] = "";
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
               var stringLetter = "ABCDEFG";
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
                   wb.Sheets.Asistencia_sabado_vol[cell]['s']=json;
                 })
                 i = i - 1
               };
               XLSX.writeFile(wb, filename);
           }else{
             alert("Seleccione un colegio");
           }
         },



         setHeadTable(){
           this.colum = [
             {label:'Colegio' ,name:'name' ,find:0 ,sort:0},
             {label:'Total Creandos' ,name:'totalVolunteers' ,find:0 ,sort:0},
             {label:'GDC' ,name:'gdc' ,find:0 ,sort:0},
             {label:'Div' ,name:'divertimate' ,find:0 ,sort:0},
             {label:'Tall' ,name:'workshops' ,find:0 ,sort:0},
             {label:'Ope' ,name:'operations' ,find:0 ,sort:0},
             {label:'Asistieron puntual' ,name:'notLate' ,find:0 ,sort:0},
             {label:'Asistieron total' ,name:'totalAttendances' ,find:0 ,sort:0},
             {label:'Detalle' ,name:'actions' ,find:0 ,sort:0}];
         },

         refreshData() {
                this.$refs.tableMaf.formatData(this.schools);
         },

         setDataTable(arrayData){
           var ctx = this;
           this.schools = [];

           this.schools = _.map(arrayData, (item) => {
               var school = {};
                   school.name = item.name;
                   if(item.total_volunteers == 0 ){
                    school.totalVolunteers = 'Sin creandos registrados'
                    school.gdc ='Sin creandos registrados'
                    school.divertimate = 'Sin creandos registrados'
                    school.workshops = 'Sin creandos registrados'
                    school.operations = 'Sin creandos registrados'
                    school.notLate = 'Sin creandos registrados'
                    school.totalAttendances ='Sin creandos registrados'

                   }else{
                    school.totalVolunteers = item.AllCreandos;
                    school.gdc = item.countSE;
                    school.divertimate = item.countMA;
                    school.workshops = item.countCU;
                    school.operations = item.countOP;
                    var notLate = parseInt(item.countSE) + parseInt(item.countMA) + parseInt(item.countCU) + parseInt(item.countOP);
                    var notLatePercent = (notLate / parseFloat(item.attendace)) *100;
                    //var total = notLate + parseInt (item.late);
                    var total =  parseInt (item.AllCreandos);
                    var totalPercent = (total / parseFloat(item.AllCreandos)) *100;
                    school.notLate = notLate + " (" + notLatePercent + "%)" ;
                    school.totalAttendances = total + " (" + totalPercent + "%)" ;
                   }

                   school.actions=<div class="d-flex justify-content-around">
                        <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcel(item)}><i class="fa fa-download"></i> Descargar lista </button>
                      </div>;

               return school;
           });

           this.refreshData();
         },

      }

  }

</script>
