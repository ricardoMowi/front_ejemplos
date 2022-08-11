<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
        <div class="card-header">Inscritos por fecha de Reclutamiento
        </div>
        <div class="card-body">
          <TableMaf :header="columBeta" :data="eventsBeta" :tableTitle="titleTableBeta" ref="tableMafII">
          </TableMaf>
          <TableMaf :header="colum" :data="events" :tableTitle="titleTable" ref="tableMaf">
          </TableMaf>
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


export default {
    name: "InscritosPorFecha",
    components: {
    LoadingComponent,
    TableMaf,

   },
    data: () => ({
      isLoading: false,
      colum : [],
      titleTable : '',
      semester: '',
      events : [],
      columBeta: [],
      eventsBeta: [],
      titleTableBeta: ''
    }),

    created () {
      this.setHeadTable();
      this.getSessionStorage();
      this.getEvents();
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

      async getEvents (){
        this.isLoading = true;
        const response = await consultServices('getEvents','POST',{});
        this.setDataTable(response);
        this.isLoading = false;
      },

      setHeadTable(){
      this.colum = [
          {label:'Fecha de charla' ,name:'startDate' ,find:1 ,sort:1},
          {label:'Dirigido a' ,name:'nameStudyCenter' ,find:1 ,sort:1},
          {label:'Lugar' ,name:'nameLocaleRoom' ,find:1 ,sort:1},
          {label:'Dirección' ,name:'address' ,find:1 ,sort:1},
          {label:'Cupos' ,name:'quotatotal' ,find:1 ,sort:1},
          {label:'Inscritos' ,name:'total_signups' ,find:1 ,sort:1},
          {label:'Vacantes' ,name:'vacancies' ,find:1 ,sort:1},
          {label:'Estimado' ,name:'grandsire' ,find:0 ,sort:0}];
        this.titleTable = "Detalle de charlas programadas";
        this.columBeta = [
            {label:'Fecha de charla' ,name:'startDate' ,find:1 ,sort:1},
            {label:'Cupos' ,name:'quotatotal' ,find:1 ,sort:1},
            {label:'Inscritos' ,name:'total_signups' ,find:1 ,sort:1},
            {label:'Vacantes' ,name:'vacancies' ,find:1 ,sort:1},
            {label:'Asistentes estimados(Beta)' ,name:'grandsireB' ,find:0 ,sort:0}];
          this.titleTableBeta = "Charlas programadas";
      },

      refreshData(){
          this.$refs.tableMaf.formatData(this.events);
          this.$refs.tableMafII.formatData(this.eventsBeta);
      },

      setDataTable(arrayData){
        var ctx = this;
        this.events = [];
        this.eventsFull = _.cloneDeep(arrayData);
        arrayData.forEach(item => {
          var object = {};
          var objectBeta = {};
          if(item.quotatotal == null){
              object.total_signups = 'Sin turnos';
              object.quotatotal = 'Sin turnos';
              object.vacancies = 'Sin turnos';
              object.grandsire = 'Sin turnos';
          }else{
              var vacancies = parseInt(item.quotatotal) - parseInt(item.total_signups);
              object.total_signups = item.total_signups;
              object.quotatotal = item.quotatotal;
              object.vacancies = vacancies;
              object.grandsire = Math.round(item.grandsire);
          }
            object.startDate = moment(item.start_date).format('DD/MM/YYYY');
            item.study_center_name ? object.nameStudyCenter = item.study_center_name : object.nameStudyCenter = 'Todos';
            object.nameLocaleRoom = item.locale_room_name;
            object.address = item.address;

            objectBeta.startDate = object.startDate;
            objectBeta.total_signups = object.total_signups;
            objectBeta.quotatotal = object.quotatotal;
            objectBeta.vacancies = object.vacancies;
            object.grandsireB = Math.round(item.grandsire);

        this.events.push(object);
        this.eventsBeta.push(object);
        });
        this.refreshData();
      },
    }
  }
</script>
