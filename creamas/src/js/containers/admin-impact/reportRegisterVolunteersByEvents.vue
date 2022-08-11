<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
        <div class="card-header">Reporte de inscritos por charla
        </div>
        <div class="card-body">
          <!--Calendar-->
          <div class="form-group card-date">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Rango de fechas:</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                  <v-date-picker class="col-md-6 col-sm-6 col-xs-6"
                          mode="range"
                          :value="dateRange"
                          v-model="dateRange"
                          :columns="$screens({ default: 1, laptop: 2 })"
                      />
              </div>
          </div>
          <!--Region-->
           <div class="card-body">
              <div class="row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Asistencia a la charla:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                      <select class="form-control" v-model="attendance">
                        <option disabled="disabled" value="">Selecciona una opción</option>
                        <option value="1">Asistió</option>
                        <option value="2">No Asistió</option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <center>
                  <button type="button" @click="exporteVolunteers()" class="btn btn-success">Descargar reporte</button>
              </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import { Datetime } from 'vue-datetime';
    import XLSX from './../../components/xlsx/xlsx.js';


export default {
    name: "voluntariosCharlas",
    components: {
    LoadingComponent,
    TableMaf,

   },
    data: () => ({
      isLoading: false,
      volunteers: [],
      dateRange:{},
      attendance: '',
      NAME :'Reporte_Charlas',
      title:[
        'DNI',
        'Nombres',
        'apePatero',
        'apeMaterno',
        'Celular',
        'Correo',
        'fechaRegistro',
        'lugarRegistro',
        'fechaRegistroCharla',
        'Asistió'
      ],
      X: '',
    }),

    created () {
      this.X = XLSX;
      this.getSessionStorage();
      this.getRegions();
    },

    methods: {
      async getSessionStorage(){
          this.isLoading = true;

          if(!window.sessionStorage.semester){
            var response =  await consultServices('getCurrentSemester','POST', {});
            this.semester = response;
            window.sessionStorage.semester  = JSON.stringify(this.semester);
          }
          this.semester =JSON.parse( window.sessionStorage.semester );
       //fin de la carga de arreglos para la pantalla

          this.isLoading = false;
      },

      async getRegions(){
        this.isLoading = true;
        const response =  await consultServices('getRegions','POST',{});
        this.regions = response;
        this.isLoading = false;
      },


      async getVolunteers(){
        this.isLoading = true;
        var form = {};
        this.attendance != '' ? form['attendance'] = this.attendance : null
        if(this.dateRange.start && this.dateRange.end){
          form['startDate'] = this.dateRange.start;
          form['endDate'] = this.dateRange.end;
        }
        if(form != {}){
          const response =  await consultServices('getVolunteerRegisterByEvents','POST', form);
          this.volunteers = response;
        }else{
          alert("Seleccione un filtro para buscar");
        }
        this.isLoading = false;
      },

      async exporteVolunteers () {
           await this.getVolunteers();
         if(this.volunteers.length > 1){
           var tempFormat =_.cloneDeep(this.title);

           var tempContHeader = tempFormat.length;

           //Seteamos la cabecera del excel
           var data = []
           data[0] = _.map(tempFormat,(item_format)=>{
             return item_format;
           });

           //Seteamos la data del excel

           var data_body =_.map(this.volunteers, (volunteer)=>{
             if(volunteer){
               var _report = [];
               var attendanceCount = 0 ;
                _report[0] = volunteer.documentNumber;
                _report[1] = volunteer.name;
                _report[2] = volunteer.lastName;
                volunteer.secondLastName ? _report[3] = volunteer.secondLastName : _report[3] = " ";
                _report[4] = volunteer.phone;
                _report[5] = volunteer.email;
                _report[6] = moment(volunteer.startDate).format('DD/MM/YYYY');
                var regionName = _.find(this.regions, (region)=>{
                    return region.id == volunteer.region
                })
                _report[7] = regionName.name;
                _report[8] = moment(volunteer.Attendances[0].creationDate).format('DD/MM/YYYY');
                if(volunteer.Attendances[0].statusCode == 'ATTENDANCE_ATTENDED' ){
                  _report[9] = "Sí";
                }else if(volunteer.Attendances[0].statusCode == 'ATTENDANCE_CREATED'){
                  _report[9] = "No";
                }else{
                  _report[9] = " ";
                };
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
             var auxArrayblue = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'];

             //damos estilo a nuestras celdas
             var contRow = 1 ;
             var indxColor = 0 ;
             _.map(ws, (cell, key) => {
               var flagHeader = false ;
               if(key != "!ref"){
                 _.map(auxArrayblue, (blue) => {
                   if(key == blue){
                     wb.Sheets.Reporte_Charlas[key]['s']=jsonBlue;
                     indxColor = 0
                     flagHeader = true;
                   }
                 })
                 if(flagHeader == false){
                   if(indxColor == 0){
                     wb.Sheets.Reporte_Charlas[key]['s']=jsonDataGris;
                     contRow++;
                     if(tempFormat.length < contRow){
                       contRow = 0 ;
                       indxColor = 1;
                     }
                   }else{
                     wb.Sheets.Reporte_Charlas[key]['s']=jsonData;
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
           alert("No existen voluntarios registrados");
         }
       },




    }
  }
</script>
