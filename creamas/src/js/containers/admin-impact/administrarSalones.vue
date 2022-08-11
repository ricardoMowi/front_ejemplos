<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Asignar salones </h2>
                    <div class="clearfix"></div>
                </div>
                <!-- <div class="card-header-actions" align-items: center>
                  <a  href='/dashboard/asistenciaeventos/WORKSHOP_EVENT_DESCRIPTION_2' target="_newtab" class="btn btn-success">Link para Bienvenida + Capacitación</a>
                </div> 
                <div class="card-header-actions" align-items: center> 
                  <div class="btn-group" role="group" style="padding-right: 5px;">
                                            <button class="btn btn-success dropdown-toggle"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Link para Capacitación</button>  
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="margin: 0px;">
                                              <a class="dropdown-item" href='/dashboard/asistenciaeventos/WORKSHOP_EVENT_DESCRIPTION_3' target="_newtab" >Capacitación Creandos</a>
                                              <a class="dropdown-item" href='/dashboard/asistenciaeventos/WORKSHOP_EVENT_DESCRIPTION_4' target="_newtab">Capacitación Divertimate</a>                                           
                                              <a class="dropdown-item" href='/dashboard/asistenciaeventos/WORKSHOP_EVENT_DESCRIPTION_5' target="_newtab">Capacitación Operaciones y Talleres</a>                                     
                                            </div>
                  </div>   
                </div>
                <div class="card-header-actions" align-items: center>
                  <a  href='/dashboard/asistenciaeventos/WORKSHOP_EVENT_DESCRIPTION_1' target="_newtab" class="btn btn-success">Link para Bienvenida</a>
                </div>  -->

                <div class="card-header-actions" align-items: center> 
                  <div class="btn-group" role="group" style="padding-right: 5px;">
                                            <button class="btn btn-success dropdown-toggle"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Generar link de asistencia </button>  
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="margin: 1px;">
                                                 <!-- <a class="dropdown-item" :href="'/dashboard/asistenciaeventos/' + event.code" target="_newtab">{{event.name}} </a> -->
                                                 <div v-for="event in events"  style="margin: 1px;">
                                                      <a class="dropdown-item" :href="`/dashboard/asistenciaeventos/${event.descriptionCode}`" target="_newtab">{{getDisplayValue(event.descriptionCode,20)}}</a>       
                                                 </div>
                                                                                         
                                            </div>
                  </div>   
                </div>

                <div class="card-body">
                  <TableMaf :header="colum" :data="classrooms" :searchOption="false" :tableTitle="titleTable" ref="tableMaf">
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


  export default {
        name: "AdministrarSalones",
        components: {
            LoadingComponent,
            TableMaf,
        },

        data: () => ({
            isLoading: true,
            classrooms:[],
            levels:[],
            seniority:[],
            semester:{},
            school:{},
            idSchool:'',
            id: window.INITIAL_STATE.id,
            events:[],
            displayEvents:[],
            titleTable:'',
            colum:[],
        }),

        async created () {
           await this.getEvents();
           await this.setHeadTable();
           await this.getMasterValues();
           await this.getClassrooms();

        },

        methods: {

          async getMasterValues(){
                this.isLoading = true;
                var ids = [] ;
                var flagVolunteerCode = false;
                var flagLevel = false;
                var flagEvents = false;
                if(!window.sessionStorage.seniority){
                  ids.push(7);
                  flagVolunteerCode = true;
                }
                if(!window.sessionStorage.levels){
                  ids.push(10);
                  flagLevel = true;
                }
                if(!window.sessionStorage.displayEvents){
                  ids.push(20);
                  flagEvents = true;
                }                
                if(!window.sessionStorage.semester){
                  const response = await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }else{
                  this.semester = JSON.parse( window.sessionStorage.semester );
                }
                // if(!window.sessionStorage.school){
                //   this.school =  await consultServices('getSchool','POST',{ id:this.idVolunteer, semesterCode: this.semester.id})
                //   this.idSchool = this.school.AssignmentRecords[0].School.id,
                //   window.sessionStorage.school  = JSON.stringify(this.school);
                // }

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagVolunteerCode == true){
                       this.seniority = _.filter(arrayMasters, function(master) {return master.idMaster == 7; })
                       window.sessionStorage.seniority = JSON.stringify(this.seniority);
                    };
                    if(flagLevel == true){
                       this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                       window.sessionStorage.levels = JSON.stringify(this.levels);
                    }
                    if(flagEvents == true){
                       this.displayEvents = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.displayEvents);
                    }                    
                };
                this.displayEvents =JSON.parse( window.sessionStorage.events );
                this.seniority =JSON.parse( window.sessionStorage.seniority );
                this.levels =JSON.parse( window.sessionStorage.levels );
                this.isLoading = false;
            },

            async getClassrooms (){
              this.isLoading = true;
              const response = await consultServices('getSchoolEventsDetail','POST',{semesterCode: this.semester.id});
              this.setDataTable(response);
              this.isLoading = false;
            },

            setHeadTable(){
                this.colum = [
                    {label:'Colegio' ,name:'school' ,find:0 ,sort:0},
                    {label:'Antiguedad' ,name:'volunteerCode' ,find:0 ,sort:0},
                    {label:'Categoria' ,name:'category' ,find:0 ,sort:0},
                    {label:'Ciclo' ,name:'level' ,find:0 ,sort:0},
                    {label:'Cantidad' ,name:'quantity' ,find:0 ,sort:0},
                    {label:'Salón' ,name:'roomName' ,find:0 ,sort:0}];
                    //{label:'Acciones' ,name:'actions' ,find:0 ,sort:0},];
                this.titleTable = "";
            },
            refreshData() {
              this.$refs.tableMaf.formatData(this.classrooms);
            },

            async getEvents(){
              this.events =[]
              const response=await consultServices('getAllTypes','POST',{});
              for (let index = 0; index < response.length; index++) {
                if(response[index].isClass == false){
                    this.events.push(response[index])
                }                
              }         
            },

            setDataTable(arrayData){
              var ctx = this;
              this.classrooms = [];
              var cont = 0;

              this.classrooms = _.map(arrayData, (item) => {
                var eventDetail = {};
                var idinput = 'input' + cont;
                var level = {};
                var seniority = {};
                //seniority =  _.find(ctx.seniority , (it) => { return it.code == item.volunteer_seniority_code });
                eventDetail.volunteerCode = 'Junior', // seniority.displayValue ;
                eventDetail.category = item.job_name;
                if(item.level_code){
                  level = _.find(ctx.levels , (it) => { return it.code == item.level_code });
                  eventDetail.level = level.displayValue;
                }else{
                  eventDetail.level = "";
                }
                eventDetail.school = item.name;
                eventDetail.quantity = item.quantity;
                eventDetail.roomName = <div><input onChange={()=>ctx.updateEventDetail(item,idinput)} id={idinput} type="text" value={item.room_name} class="form-control col-md-7 col-xs-12"/></div>;
                eventDetail.actions = <font style="vertical-align: inherit;">
                                                  <div>   <a href={'/dashboard/asistenciaeventos/'+ item.id } class="btn btn-success btn-xs" target="_newtab">Link asistencias a bienvenida</a></div>
                                                  </font>;
                cont++;
                return eventDetail;
              });

              this.refreshData();
            },
            async updateEventDetail(item, idInput){
              this.isLoading = true;
              var form = {
                id : item.id,
                roomName: document.getElementById(idInput).value
              };
              const response = await consultServices('updateSchoolEventsDetail','POST',form);
              this.getClassrooms();
              this.isLoading = false;
            },
            getDisplayValue(string, master){
                var array=[];
                var display="";
                if(master == 20){
                    array= this.displayEvents
                }
                for (let index = 0; index < array.length; index++) {
                        if(array[index].code == string){
                            display=array[index].displayValue;
                        }
                }
                return display;
            },

        },
    }

</script>

<style scoped>
.dropdown-item:last-child {
    border-bottom: 1;
}
</style>
