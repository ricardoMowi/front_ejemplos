<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="card">
              <div class="card-header">
                  <h2>Estadisticas del colegio en el semestre {{semester.displayName}}</h2>
                  <div class="clearfix"></div>
              </div>
              <div class="card-body">
                <div class="col-md-12">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Lista de colegios:</label>
                   <div class="col-md-6 col-sm-6 col-xs-12">
                      <select class="form-control" v-model="idSchool" @change="viewResults()">
                          <option v-for="school in schools" :value="school.id">{{school.name}}</option>
                      </select>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="col-md-12">
                  <canvas id="myChartStudents"></canvas>
                </div>
                <div class="col-md-12">
                  <canvas id="myChartVolunteers"></canvas>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>

    import consultServices from './../../utilities/consultServices.js'; //consulta servicios
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import moment from 'moment';

    export default {
        name: "CreandoColegios",
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading: true,
            volunteersDataY1: [],
            volunteersDataY2: [],
            volunteersDataX: [],
            studentsDataY1: [],
            studentsDataY2: [],
            studentsDataX: [],
            totalStudents: 1,
            totalVolunteers: 1,
            semester:'',
            schools: [],
            idSchool: ''
        }),
        async created () {
          await this.getSessionStorage();
          await this.getSchool();
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
           // //fin de la carga de arreglos para la pantalla

              this.isLoading = false;
          },

          async getSchool(){
            this.isLoading = true;
            const resp =  await consultServices('listSchools','POST',{});
            this.schools = resp;
            this.isLoading = false;
          },

          async getVolunteerstResults(){
            this.isLoading = true;
            var form = {
              semesterCode : this.semester.id,
              idSchool : this.idSchool
            };
            const resp = await consultServices('getReportAttendancesBySchoolByVolunteers','POST', form);
            const respII = await consultServices('getAllVolunteersBySchool','POST', form);
            this.totalVolunteers = respII[0].count;
            this.formatDataForGraphic(resp, 'volunteersDataX', 'volunteersDataY1', 'volunteersDataY2', this.totalVolunteers);
            this.graphics('myChartVolunteers', this.volunteersDataY1, this.volunteersDataY2, this.volunteersDataX, this.totalVolunteers, 'Lista de voluntarios');
            this.isLoading = false;
          },


          async getStudentResults(){
            this.isLoading = true;
            var form = {
              semesterCode : this.semester.id,
              idSchool : this.idSchool
            };
            const resp = await consultServices('getReportAttendancesBySchoolByStudent','POST', form);
            const respII = await consultServices('getAllStudentsBySchool','POST', form);
            this.totalStudents = respII[0].totalstudents;
            this.formatDataForGraphic(resp, 'studentsDataX', 'studentsDataY1', 'studentsDataY2', this.totalStudents);
            this.graphics('myChartStudents', this.studentsDataY1, this.studentsDataY2, this.studentsDataX, this.totalStudents, 'Lista de estudiantes');
            this.isLoading = false;
          },

          async viewResults(){
            await this.getStudentResults();
            await this.getVolunteerstResults();
          },

          graphics (id ,axesY1, axesY2, axesX, maxY1, title){
            var ctx = document.getElementById(id).getContext('2d');
            var mixedChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Nro de asistentes',
                        borderColor: 'rgb(255,0,0)',
                        backgroundColor: 'rgb(255,0,0)',
                        data: axesY1 ,
                        yAxisID: 'A',
                        fill: false,
                        type: 'line'
                    },
                    {
                        label: '% de asistentes',
                        backgroundColor: 'rgb(138,43,226)',
                        borderColor: 'rgb(138,43,226)',
                        data: axesY2,
                        yAxisID: 'B',
                        fill: false,
                        type: 'line'
                    }],
                    labels: axesX
                },
                options: {
                    title: {
                      display: true,
                      text: title
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
              						display: true,
              						scaleLabel: {
              							display: true,
              							labelString: 'Días'
              						}
              					}],
                        yAxes: [{
                          id: 'A',
                          type: 'linear',
                          position: 'left',
                          ticks: {
                              min: 0,
                              max: parseInt(maxY1)
                          },
                          gridLines: {
            								drawOnChartArea: false,
            							},
                        }, {
                          id: 'B',
                          type: 'linear',
                          position: 'right',
                          ticks: {
                              min: 0,
                              max: 100
                          },
                          gridLines: {
            								drawOnChartArea: false,
            							},
                        }]
                    }
                },
            });
          },

          formatDataForGraphic(datesArray, keyArrayX, keyArrayY, keyArrayY2, total){
            this.reset();
            if(datesArray !=null){
               _.map(datesArray.attendances, (item) => {
               console.log('item::::::::::::', item)
                var obj = [] ;
                var obj2 = 0 ;
                var day = {}
                day = _.find(datesArray.events, (event) => {
                  return event.code == item.description_code
                })
                console.log('day::::::::::::', day)
                obj[0] = day.displayValue
                obj[1] = parseInt(item.attendances);
                obj2 = ( obj[1] / total ) * 100 ;
                this[keyArrayY].push(obj[1]);
                this[keyArrayY2].push(obj2);
                this[keyArrayX].push(obj[0]);
              });
            }
          },

          reset(){
            this.volunteersDataY1 = [];
            this.volunteersDataY2 = [];
            this.volunteersDataX = [];
            this.studentsDataY1 = [];
            this.studentsDataY2 = [];
            this.studentsDataX = [];
          },
        }
    }
</script>
