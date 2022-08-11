<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Resultados de reclutamiento </h2>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <div class="card-body">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar semestre:</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select class="form-control" v-model="semesterCode">
                  <option v-for="code in semesterCodes" > {{code.semesterCode}} </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <button type="button" @click="exportExcel()" class="btn btn-success btn-xs"><i class="cui-file icons"></i> Descargar reporte</button>
            </div>
          </div>
        </div> <!--Body-->
      </div> <!--Card-->
    </div> <!--Col-->
  </div> <!--Row-->
</template>

<script>
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import XLSX from './../../components/xlsx/xlsx.js';
  import _ from 'lodash';

    export default {
      name: "exportResultByAttendanceContainer",
      components: {
      LoadingComponent,

      },
      data: () => ({

          isLoading: true,
          NAME :'Reporte_de_reclutamiento',

          title:[
            'N°',
            'Semestre',
            'Fecha de Charla',
            'DNI',
            'Nombres',
            'Ap. Paterno',
            'Ap. Materno',
            'Email',
            'Evaluación psicológica',
            'Entusiasmo',
            'Proactividad',
            'Trabajo en equipo',
            'Empatia',
            'Observaciones',
            'Puntaje ponderado',
            'Resultado'
          ],

          reports:[],
          reportsExcel:[],

          semesterCode: '',
          semesterCodes: [],
          psychologicalStatus : [],
          resultEvaluation: [],
          X: '',

      }),

      created () {
        this.X = XLSX;
        //this.getSemester();
        this.getSessionStorage();
      },

      methods: {

        async getSessionStorage(){
          this.isLoading = true;
          //Sacamos los valores de la eva psicologicaresponse
          const response = await consultServices('getMasterValues','POST',{idMaster:4});
          this.psychologicalStatus = response;
          //Sacamos los valores del resultado
          const responseI = await consultServices('getMasterValues','POST',{idMaster:9});
          this.resultEvaluation = responseI;
          this.isLoading = false
          console.log(this.resultEvaluation);

             if (!window.sessionStorage.resultEvaluation) {

              //si no trae los valores, cargarlos en un array que luego se separará en atributos para sessionStorage
              //consulta única de masterValues (incluir todos los masterValues necesarios para esta pantalla)
              var ids = [4,9]
              var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
              //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
              this.resultEvaluation = _.filter(arrayMasters, function(master) {return master.idMaster == 9; });
              this.psychologicalStatus = _.filter(arrayMasters, function(master) {return master.idMaster == 4; });

              //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
              this.semesterCodes = await consultServices('getSemesterCodes', 'POST', {});


              //Agregar todos los arreglos a los atributos del sessión storage
               window.sessionStorage.resultEvaluation  = JSON.stringify(this.resultEvaluation);
               window.sessionStorage.psychologicalStatus = JSON.stringify(this.psychologicalStatus);
               window.sessionStorage.semesters = JSON.stringify(this.semesterCodes);

             } else {
             console.log("existen datos en sessionStorage")
              // //si los datos existen cargarlos en los arreglos definidos para la patalla
              this.resultEvaluation =JSON.parse( window.sessionStorage.resultEvaluation );
              this.psychologicalStatus = JSON.parse( window.sessionStorage.psychologicalStatus );
              this.semesterCodes =  JSON.parse(  window.sessionStorage.semesterCodes) ;
              // //fin de la carga de arreglos para la pantalla
            }

        },

        //Consumimos el un servicio para obtener los semestres
        // async getSemester() {
        //     this.isLoading=true;
        //     const resp = await consultServices('getSemesterCodes', 'POST', {});
        //     this.semesterCodes = resp;
        //     this.isLoading=false;
        //   },

        //Consumimos el un para mostrar los resultados
        async getResultForSemester()
        {
          this.isLoading = true;
          const resp = await consultServices('getAttendanceBySemester', 'POST', { semesterCode:this.semesterCode });
          this.reports = resp;
          this.isLoading = false;
         },

        //Seteamos la data que recibimos para exportarla al un archivo excel
         async exportExcel () {
           if(this.semesterCode){
             await this.getResultForSemester();
             var tempFormat =_.cloneDeep(this.title);
             var num = 1;

             //Seteamos la cabecera del excel
             var data = []
             data[0] = [this.NAME]
             data[1] = _.map(tempFormat,(item_format)=>{
               return item_format;
             });

             //Seteamos la data del excel
             var data_body=_.map(this.reports, (report)=>{
               if(report.Evaluations[0]){
                 var _report = [];
                 var psychologic = {};
                 var result = {};

                   _report[0] = num ;
                   _report[1] = report.EventTurn.Event.semesterCode ;
                   _report[2] = report.EventTurn.Event.startDate + ' ' + report.EventTurn.startHour;
                   _report[3] = report.Volunteer.documentNumber ;
                   _report[4] = report.Volunteer.name ;
                   _report[5] = report.Volunteer.lastName ;
                   _report[6] = report.Volunteer.secondLastName ;
                   _report[7] = report.Volunteer.email ;
                   if(report.Evaluations[0].psychologicalStatusCode){
                     psychologic = _.find(this.psychologicalStatus, (item) =>{
                       return item.code == report.Evaluations[0].psychologicalStatusCode
                     });
                     _report[8] = psychologic.displayValue ;
                   }else{
                     _report[8] = "NO EVALUADO";
                   }
                   _report[9] = report.Evaluations[0].motivationScore ;
                   _report[10] = report.Evaluations[0].proactivityScore ;
                   _report[11] = report.Evaluations[0].teamworkScore ;
                   _report[12] = report.Evaluations[0].empathyScore ;
                   _report[13] = report.Evaluations[0].comment ;
                   _report[14] = report.Evaluations[0].resultValue ;
                   if(report.Evaluations[0].resultCode){
                     result = _.find(this.resultEvaluation, (item) =>{
                       return item.code == report.Evaluations[0].resultCode
                     });
                     _report[15] = result.displayValue ;
                   }else{
                     _report[15] = "NO EVALUADO";
                   }
                 num = num + 1;
                 return _report;
               }
             });

             //Seteamos los parametros para el excel
             data = _.concat(data, data_body);
               var filename = this.NAME + this.semesterCode + ".xlsx";
               var ws_name = this.NAME;
               var wb = XLSX.utils.book_new();
               var ws = XLSX.utils.aoa_to_sheet(data);
               XLSX.utils.book_append_sheet(wb, ws, ws_name);
               XLSX.writeFile(wb, filename);
           }else{
             alert("Seleccione un semestre");
           }
         },
      }

  }

</script>
