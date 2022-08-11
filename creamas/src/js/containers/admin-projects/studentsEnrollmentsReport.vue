<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
        <div class="card-header">Niños matriculados en el {{semester.displayName}}
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
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";


export default {
    name: "niniosMatriculados",
    components: {
    LoadingComponent,
    TableMaf,

   },
    data: () => ({
      isLoading: false,
      colum : [],
      titleTable : '',
      semester: '',
      schools : [],
    }),

    created () {
      this.setHeadTable();
      this.getSessionStorage();
      this.getSchool();
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

      async getSchool(){
        this.isLoading = true;
        const response =  await consultServices('getStudentsBySchool','POST', {semesterCode:this.semester.id});
        this.setDataTable(response);
        this.isLoading = false;
      },
      setHeadTable(){
        this.colum = [
          {label:'Colegio' ,name:'name' ,find:1 ,sort:1},
          {label:'Primaria' ,name:'elementarySchool' ,find:1 ,sort:1},
          {label:'Secundaria' ,name:'highSchool' ,find:1 ,sort:1},
          {label:'Total' ,name:'total' ,find:1 ,sort:1}];
        this.titleTable = "";
      },
      refreshData() {
         this.$refs.tableMaf.formatData(this.schools);
      },
      setDataTable(arrayData){
        this.schools = [];
        var elementarySchool = 0;
        var highSchool = 0;
        var total = 0;
        this.schools = _.map(arrayData, (item) => {
          var school = {};
          school.name = item.name;
          school.elementarySchool = item.elementarySchool;
          school.highSchool = item.studentsHighSchool;
          school.total = parseInt(item.studentsHighSchool) + parseInt(item.elementarySchool);
          elementarySchool = elementarySchool + parseInt(item.elementarySchool);
          highSchool = highSchool + parseInt(item.studentsHighSchool);
          total = total + school.total;
          console.log(school);
          return school;
        });
        var jsonTotal = {
          name : 'Total',
          elementarySchool :elementarySchool,
          highSchool :highSchool,
          total :total
        };
        this.schools.push(jsonTotal);

        this.refreshData();
      },
    }
  }
</script>
