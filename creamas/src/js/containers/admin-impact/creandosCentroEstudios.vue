<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Postulantes por centro de estudios</h2>
                    <div class="clearfix"></div>
                    <!--<div>
                        <GChart
                            id="asis"
                            type="ColumnChart"
                            :data="volunteers"
                            :options="options"
                        />
                    </div>-->
                    <div>
                      <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import consultServices from './../../utilities/consultServices.js'; //consulta servicios
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import { GChart } from 'vue-google-charts'
    import _ from 'lodash';
    import moment from 'moment';

    export default {
        name: "CreandoColegios",
        components: {
            LoadingComponent,
            GChart
        },
        data: () => ({
            isLoading: true,
            results:[],
            volunteers:[
                ['Date', 'Inscritos'],
            ],
            options: {
                    title: 'Inscritos a la charla',
                    trendlines: {
                        0: {}
                    },
                    hAxis: {
                    title: 'Día',
                    },
                    vAxis: {
                    title: 'Cant. de voluntarios'
                  }
            },
            volunteersDataY: [],
            volunteersDataX: [],
            title: '',
            formGet: {
              id: window.INITIAL_STATE.id,
              startDate: window.INITIAL_STATE.startDate,
              endDate: window.INITIAL_STATE.endDate },
        }),
        async created () {
          await this.getResults();
          this.formatDataForGraphic();
          this.graphics();
        },

        methods: {

          async getResults(){
            this.isLoading = true;
            console.log("formGet ", this.formGet)
            const resp = await consultServices('getAttendanceByStudyCenter','POST', this.formGet);
            this.results = resp;
            this.isLoading = false;
          },
          graphics (){
            var ctx = document.getElementById('myChart').getContext('2d');
            var mixedChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Registrados en creamas.org/sumate',
                        borderColor: 'rgb(214,116,92)',
                        backgroundColor: 'rgb(214,116,92)',
                        data: this.volunteersDataY ,
                        fill: false,
                        type: 'line'
                    },
                    {
                        label: 'Registrados en creamas.org/sumate',
                        borderColor: 'rgb(74,97,197)',
                        backgroundColor: 'rgb(74,97,197)',
                        hoverBackgroundColor: 'rgb(48,172,197)', 
                        data: this.volunteersDataY
                    }],
                    fill: false,
                    labels: this.volunteersDataX
                },
                options: {
                    title: {
                      display: true,
                      text: this.title
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
                          scaleLabel: {
                            display: true,
                            labelString: 'Voluntarios'
                          },
                          ticks: {
                              min:  0
                          }
                        }]
                    }
                },
            });
          },

          formatDataForGraphic(){
            var dates = [];
            var montPre = moment(this.results.attendances[0].creationDate).format('MM');
            var yearAnt = moment(this.results.attendances[0].creationDate).format('YYYY');
            _.map(this.results.attendances, (item) => {
              var obj = [] ;
              /*var montNew  = moment(item.creationDate).format('MM');
              var yearNew = moment(this.results.attendances[0].creationDate).format('YYYY');
              if( montPre >= montNew  ){
                obj[0] =  moment(item.creationDate).format('DD');
                dates.push(moment(item.creationDate).format('DD'));
              }else{
                obj[0] = moment(item.creationDate).format('DD/' + montNew);
                dates.push(moment(item.creationDate).format('01/' + montNew ));
                montPre = montNew;
              };*/
              var date = moment(item.creationDate).lang('es').format('LL')
              console.log('date', date);
              obj[0] = moment(item.creationDate).lang('es').format('LL')
              obj[1] = parseInt(item.attendances);
              this.volunteersDataY.push(obj[1]);
              this.volunteersDataX.push(obj[0]);
              this.volunteers.push(obj);
            });
            //this.volunteers[1][0] = moment(this.results.attendances[0].creationDate).format('DD/MM/YYYY');
            //this.volunteersDataX[0] = moment(this.results.attendances[0].creationDate).format('DD/MM/YYYY');
            if(this.formGet.id != 0){
              this.title = 'Inscritos de la ' + this.results.studyCenter.name ;
            }else{
              this.title = 'Inscritos'
            }
          }
        }
    }
</script>
