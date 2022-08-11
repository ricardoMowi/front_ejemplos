<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Centros de estudios</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                    <div class="col-sm-12">
                        <div class="card-header">
                            <h4>Seleccione las fecha para mostrar los inscritos </h4>
                            <div class="clearfix"></div>
                        </div>

                        <div class="card">
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
                          <div class="modal-footer">
                              <button type="button" @click="getAttendances()" class="btn btn-primary"> Buscar </button>
                          </div>
                       </div> <!--table-->


                    </div>
                    <TableMaf :header="colum" :data="universitys" :tableTitle="titleTable" ref="tableMaf">
                  </TableMaf>
                </div> <!--card-body-->

            </div> <!--card-->
        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import { Datetime } from 'vue-datetime';


  export default {
        name: "ReclutamientoFocalizado",
        components: {
            LoadingComponent,
            TableMaf,
            Datetime,
        },

        data: () => ({
            isLoading: false,
            universitys:[],
            search:'',
            colum:[],
            titleTable:'',
            dateRange:{},
        }),

        mounted () {
            this.setHeadTable();

            },

        methods: {

            async getAttendances(){
              this.isLoading = true;
              if(this.dateRange.start && this.dateRange.end){
                var form2 ={
                    startDate:this.dateRange.start,
                    endDate:this.dateRange.end
                };
                //
                const response = await consultServices('getAttendances','POST',form2);
                this.setDataTable(response);
              }else{
                  alert("Seleccione dos fechas");
              }
              this.isLoading = false;
            },

           setHeadTable() {
            this.colum = [
                {label:'Centro de estudios' ,name:'name' ,find:1 ,sort:1},
                {label:'Cantidad' ,name:'files' ,find:0 ,sort:0}];

            this.titleTable = "Resultados";
            },
             refreshData() {
                this.$refs.tableMaf.formatData(this.universitys);
            },

            setDataTable(arrayData){
                var ctx = this;
                this.universitys = [];

                this.universitys = _.map(arrayData, (item) => {
                  var univ = {};
                  univ.name = item.name;
                  univ.files = <font style="vertical-align: inherit;">
                      <a href={'/dashboard/' + item.id  + '/resultRecluFocalizado' + '?startDate=' + this.dateRange.start + '&&endDate=' + this.dateRange.end} class="btn btn-success btn-xs" target="_newtab"> {item.totalAttendances} inscritos</a>
                    </font>;

                  return univ;
                });

                    this.refreshData();
            },


        },

        computed:{
            filteredFocus () {
                return this.search ?
                    this.universitys.filter( uni =>{
                    return (uni.name.includes(this.search))
                }) : this.universitys ;
            },
        }

    }

</script>

<style scoped>
.card-date {
    margin: 1rem;
    padding: 1rem;
    /* IMPORTANTE */
    justify-content:center;
}
</style>
