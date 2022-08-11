<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Estadisticas del colegio en el semestre {{semester.displayName}}</h2>
                    <div class="clearfix"></div>
                </div>
                <div class="col-sm-12">
                  <canvas id="myChartStudents"></canvas>
                </div>
                <div class="col-sm-12">
                  <canvas id="myChartVolunteers"></canvas>
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
            id: window.INITIAL_STATE.id,
            idSchool: 0,
        }),
        async created () {
          await this.getSessionStorage();
          if( await this.getSchool() == true ){
            await this.getStudentResults();
            await this.getVolunteerstResults();
          }
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
            const resp =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id});
            let _idSchool = ((((resp || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
            if(_idSchool){
                this.idSchool = _idSchool;
                return true;
            }else if(!_idSchool){
                alert("El  creando  no cuenta con un colegio asignado")
                return false;
            };
          },

          async getVolunteerstResults(){
            this.isLoading = true;
            var form = {
              semesterCode : this.semester.id,
              idSchool : this.idSchool
            };
            const resp = await consultServices('getReportAttendancesBySchoolByVolunteers','POST', form);
            const respII = await consultServices('getAllVolunteersBySchool','POST', form);
            console.log('getVolunteerstResults: ',respII);
            this.totalVolunteers = respII[0].count;
            this.formatDataForGraphic(resp, 'volunteersDataX', 'volunteersDataY1', 'volunteersDataY2', this.totalVolunteers);
            this.graphics('myChartVolunteers', this.volunteersDataY1, this.volunteersDataY2, this.volunteersDataX, this.totalVolunteers, 'Lista de voluntarios');
            this.isLoading = false;
          },


          async getStudentResults(){
            this.isLoading = true;
            var form = {
              semesterCode :this.semester.id,
              idSchool : this.idSchool
            };
            const resp = await consultServices('getReportAttendancesBySchoolByStudent','POST', form);
            const respII = await consultServices('getAllStudentsBySchool','POST', form);
            console.log('getStudentResults: ',respII);
            this.totalStudents = respII[0].totalstudents;
            this.formatDataForGraphic(resp, 'studentsDataX', 'studentsDataY1', 'studentsDataY2', this.totalStudents);
            this.graphics('myChartStudents', this.studentsDataY1, this.studentsDataY2, this.studentsDataX, this.totalStudents, 'Lista de estudiantes');
            this.isLoading = false;
          },

          graphics(id ,axesY1, axesY2, axesX, maxY1, title){
            var ctx = document.getElementById(id).getContext('2d');
            var mixedChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Nro asistentes',
                        borderColor: 'rgb(138,43,226)',
                        backgroundColor: 'rgb(138,43,226)',
                        data: axesY1 ,
                        yAxisID: 'A',
                        fill: false,
                        type: 'line'
                    },
                    {
                        label: '% asistentes',
                        backgroundColor: 'rgb(255,0,0)',
                        borderColor: 'rgb(255,0,0)',
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
                    },
                    tooltips: {
                      mode: 'index',
                      intersect: false,
                    }
                },
            });
          },

          formatDataForGraphic(datesArray, keyArrayX, keyArrayY, keyArrayY2, total){
            
            if(datesArray != null){
              _.map(datesArray.attendances, (item) => {
                var obj = [] ;
                var obj2 = 0 ;
                var day = {}
                day = _.find(datesArray.events, (event) => {
                  return event.code == item.description_code
                })
                obj[0] = day.displayValue.substring(0,7)
                obj[1] = parseInt(item.attendances);
                obj2 = Math.round(( obj[1] / total ) * 100 * 100)/100;
                this[keyArrayY].push(obj[1]);
                this[keyArrayY2].push(obj2);
                this[keyArrayX].push(obj[0]);
              });              
            }
          }
        }
    }
</script>
