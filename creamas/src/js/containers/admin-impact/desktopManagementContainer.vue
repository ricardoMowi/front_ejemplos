<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>

        <div class="col-md-12 col-sm-12 col-xs-12">

            <div class="card-body" background-color= #198ac8>
           <div class="card-header">
                <h2><font style="vertical-align: inherit;">Configuración</font></h2>
                    <div class="clearfix"></div>
           </div>
            <div class="card-body">
              <tableMaf :header="colum" :data="configuration" tableTitle="Gestión de escritorios" :searchOption="false"  ref="tableMaf">
              </tableMaf>
            </div>
            <div class="card-body">
              <tableMaf :header="columWelcomeCapacitation" :data="stakesWelcomeAndCapacitation" tableTitle="Gestión de Mensaje de Bienvenida y Capacitación" :searchOption="false" :filter='false'  ref="tableWelcomeAndCapacitation">
              </tableMaf>
            </div>
             <!--Panel-->
              <!-- Modal -->
        <div class="modal fade modal-Trainning" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                    <h3 class="modal-title" > Editar valores </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body">
                <div class="form-horizontal form-label-left">


                 <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Etapa del escritorio </label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                              <input  class="form-control"   v-model="formEdit.stage" readonly="readonly" >
                               </div>
                  </div>


                  <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Título </label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                <textarea class="form-control"    v-model="formEdit.title" rows="3" ></textarea>
                               </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Mensaje </label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                              <textarea class="form-control"   v-model="formEdit.message" rows="3" ></textarea>
                               </div>
                  </div>



                </div>
                <div class="modal-footer">
                  <button type="button" @click="closeModalEdit()"data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button  @click="update()" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

                    <!-- Modal -->
        <div class="modal fade modal-welcome" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                    <h3 class="modal-title" > Editar valores </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body">
                <div class="form-horizontal form-label-left">
                  <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Mensaje </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <textarea v-if="formEditWelcomeAndCapacitation.type=='adress'" class="form-control" v-model="formEditWelcomeAndCapacitation.displayValue" rows="3" ></textarea>
                        <Datetime v-if="formEditWelcomeAndCapacitation.type=='date'" v-model="formEditWelcomeAndCapacitation.displayValue" format="dd/MM/yyyy" value-zone="UTC-5"  type="date" ></Datetime> 
                        <Datetime v-if="formEditWelcomeAndCapacitation.type=='hour'" v-model="formEditWelcomeAndCapacitation.displayValue" value-zone="UTC-5" type="time" title="Hora del evento:"></Datetime> 
                      </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="closeModalEdit()" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button  @click="saveEditModalWelcomeAndCapacitation()" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->


       <!--Modal not-->
        <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">

                  <h3 class="modal-title" > <center>  {{formNot.title}}   </center> </h3>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.message}} </center> </h4></div>
                  <div class="modal-footer">
                    <center>
                           <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                    </center>
                  </div>
            </div>
          </div>
        </div>
      <!--Modal not-->


        </div>
        </div>
    </div>
</template>
<script>
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import TableMaf from "./../../components/TableMaf.vue";
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import _ from 'lodash';
  import moment from 'moment';
  import { Datetime } from 'vue-datetime';
export default {
    components: {
        LoadingComponent,
        consultServices,
        Datetime,
        TableMaf,
    },
          data: () => ({

              isLoading: true,
              formEditWelcomeAndCapacitation:{},
                configuration: {},
                values:{},
                desktopMessageArray:{},
                dataValues:{},
                colum:[
                  {name:'stage', label: 'Etapa del escritorio', find:0, sort:1},
                  {name:'state', label: 'Estado de creando', find:0, sort:1},
                  {name:'seniority', label: 'Seniority', find:0, sort:1},
                  {name:'stateCrea', label: 'Estado de reclutamiento', find:0, sort:1},
                  {name:'editdButton', label: 'Acciones'},
                ],
                columWelcomeCapacitation:[
                  {name:'displayName', label: 'Campo', find:0},
                  {name:'stage', label: 'Valor', find:0},
                  {name:'editButton', label: '', find:0, sort:0},
                ],
                formType: '',
                stakes:[],
                stakesWelcomeAndCapacitation:[],
                formNot:{message:'',title:''},
                formEdit:{},
                valuesConfiguration: [],
                desktopMessageArray: [],


          }),


          async created () {
            this.isLoading=true;
            var ctx = this;
            await this.getSessionStorage();
            var arr=[];
            arr= await consultServices('getDesktopConfiguration','POST',{});
            this.setDataTable(arr);
            var arrWelcomeAndCapacitationConfiguration = await consultServices('getWelcomeAndCapacitationConfiguration','POST',{});
            this.setDataTableWelcomeAndCapacitation(arrWelcomeAndCapacitationConfiguration);
            this.isLoading=false;
          },

          methods:{
           async getSessionStorage(){                
                this.isLoading = true;             
                
                 var ids = [] ;
                 var id= [];
                 var flagValuesConfiguration = false;
                 var flagDesktopMessageArray = false;
 

                if(!window.sessionStorage.valuesConfiguration){
                  ids =[6,7,8];
                  flagValuesConfiguration = true;
                }
                if(!window.sessionStorage.desktopMessageArray){
                  ids.push(18);
                  flagDesktopMessageArray = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección    

                if( ids.length > 0 || id.length > 0){

                //Hacer consulta única de masterValues 
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagValuesConfiguration == true){

                        for (let index = 0; index < arrayMasters.length; index++) {
                          if(arrayMasters[index].idMaster == 6 || arrayMasters[index].idMaster == 7 || arrayMasters[index].idMaster == 8){
                            this.valuesConfiguration.push(arrayMasters[index]);

                          }
                          
                          
                        }
                      
                       window.sessionStorage.valuesConfiguration  = JSON.stringify(this.valuesConfiguration);  
                    } 
                    if(flagDesktopMessageArray == true){
                       this.desktopMessageArray = _.filter(arrayMasters, function(master) {return master.idMaster == 18; }) 
                       window.sessionStorage.desktopMessageArray  = JSON.stringify(this.desktopMessageArray);  
                    }
                }

               
                this.valuesConfiguration =JSON.parse( window.sessionStorage.valuesConfiguration );
                this.desktopMessageArray =JSON.parse( window.sessionStorage.desktopMessageArray );
             // //fin de la carga de arreglos para la pantalla       
  

                this.isLoading = false;
            }, 
        async shownotificacion() {
            $('.bs-example-modal-not').modal('show');

        },
          refreshData(){ this.$refs.tableMaf.formatData(this.stakes);  },
          refreshDataWelcomeAndCapacitation(){ this.$refs.tableWelcomeAndCapacitation.formatData(this.stakesWelcomeAndCapacitation);  },

          searchLabel(value){

              var label;
              for (let index = 0; index < this.valuesConfiguration.length; index++) {

                if(this.valuesConfiguration[index].code == value){label=this.valuesConfiguration[index].displayValue }
              }
              return label;
          },
          searchCode(value){
              var code;
              for (let index = 0; index < this.desktopMessageArray.length; index++) {
                if(this.desktopMessageArray[index].displayValue == value){code=this.desktopMessageArray[index].code }
              }
              return code;
          },

        /**
         * update: Actualiza el título y mensaje colocados por el usuario
        */
        async update()  {
          //Mostramos mensaje de cargando
          this.isLoading=true;
          console.log('this.dataValues: ', this.dataValues)
          if(this.formEdit.title != this.dataValues.title){
              console.log("way A", this.dataValues.title);
              var code = this.dataValues.titleCode
              var tempRes = await consultServices('updateMasterValues','POST',{displayValue: this.formEdit.title, code:code});
              console.log('tempRes: ', tempRes)
          }
          if(this.formEdit.message != this.dataValues.message){
            console.log("way B");
            var code = this.dataValues.messageCode
            await consultServices('updateMasterValues','POST',{displayValue: this.formEdit.message, code:code});
          }
            this.dataValues = await consultServices('desktopValues','POST',{statusCode:this.configuration.statusCode,seniorityCode:this.configuration.seniorityCode , recruitmentStatusCode:this.configuration.recruitmentStatusCode});
            $('.modal').modal('hide');

            this.formNot.title="Actualización exitosa";
            this.formNot.message="Se actualizaron los datos de la etapa del escritorio";
            this.shownotificacion();
            this.isLoading=false;
        },

         closeModalEdit(){
           $('.modal').modal('hide');
         },

      async showEditModal(item) {
          var _formEdit = _.cloneDeep(item);
          var result=  await consultServices('desktopValues','POST',{statusCode:_formEdit.parentCode[1],seniorityCode:_formEdit.parentCode[2] , recruitmentStatusCode:_formEdit.parentCode[0]});
          this.dataValues = result;
          this.configuration = {statusCode:_formEdit.parentCode[1],seniorityCode:_formEdit.parentCode[2] , recruitmentStatusCode:_formEdit.parentCode[0]};

          this.formEdit = {
            ..._formEdit,
            stage:_formEdit.displayValue,
            message:result.message,
            title:result.title,
          }
        },
        async saveEditModalWelcomeAndCapacitation() {
          this.isLoading=true;
          console.log('----------------this.formEditWelcomeAndCapacitation');
          console.log(this.formEditWelcomeAndCapacitation);
          const responseA =  await consultServices('updateMasterValues','POST',this.formEditWelcomeAndCapacitation);
          var arrWelcomeAndCapacitationConfiguration = await consultServices('getWelcomeAndCapacitationConfiguration','POST',{});
          this.setDataTableWelcomeAndCapacitation(arrWelcomeAndCapacitationConfiguration);
         
         $('.modal').modal('hide');
          this.formNot.title="Actualización exitosa";
          this.formNot.message="Se actualizaron los datos de bienvenida del escritorio";
          this.shownotificacion();
          this.isLoading=false;
        },
        async showEditModalWelcomeAndCapacitation(item) {
          var _formEdit = _.cloneDeep(item);
          console.log(item);
          //var result=  await consultServices('desktopValues','POST',{statusCode:_formEdit.parentCode[1],seniorityCode:_formEdit.parentCode[2] , recruitmentStatusCode:_formEdit.parentCode[0]});
          this.formEditWelcomeAndCapacitation = {
            ..._formEdit,
          }
        },

        
        setDataTable(arrayData){
          var ctx = this;
          this.stakes = [];

          arrayData.forEach(item => {
              var stage = {};

                  stage.stage = item.displayValue;
                  stage.editdButton = <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> <a onClick={()=>ctx.showEditModal(item)} data-target=".modal-Trainning" data-toggle="modal" class="btn btn-warning btn-xs"><i class="fa fa-pencil"></i></a></font></font>;
                  stage.stateCrea= this.searchLabel(item.parentCode[0]);
                  stage.state= this.searchLabel(item.parentCode[1]);
                  stage.seniority= this.searchLabel(item.parentCode[2]);
                  stage.parentCode=item.parentCode;
                  this.stakes.push(stage);
          });

          this.refreshData();
        },
        setDataTableWelcomeAndCapacitation(arrayData){
          var ctx = this;
          var _stakesWelcomeAndCapacitation = [];

          arrayData.forEach(item => {
            var stage = {};
            item.code == 'DESKTOP_WELCOME_ADDRESS'?stage.displayName = 'Dirección de la bienvenida':null;
            item.code == 'DESKTOP_WELCOME_HOUR'?stage.displayName = 'Hora de la bienvenida':null;
            item.code == 'DESKTOP_WELCOME_DATE'?stage.displayName = 'Fecha de la bienvenida':null;
            item.code == 'DESKTOP_CAPACITATION_ADDRESS'?stage.displayName = 'Dirección de la Capacitación':null;
            item.code == 'DESKTOP_CAPACITATION_HOUR'?stage.displayName = 'Hora de la Capacitación':null;
            item.code == 'DESKTOP_CAPACITATION_DATE'?stage.displayName = 'Fecha de la Capacitación':null;

            item.code == 'DESKTOP_WELCOME_ADDRESS'?stage.pos = 1:null;
            item.code == 'DESKTOP_WELCOME_HOUR'?stage.pos = 2:null;
            item.code == 'DESKTOP_WELCOME_DATE'?stage.pos = 3:null;
            item.code == 'DESKTOP_CAPACITATION_ADDRESS'?stage.pos = 4:null;
            item.code == 'DESKTOP_CAPACITATION_HOUR'?stage.pos = 5:null;
            item.code == 'DESKTOP_CAPACITATION_DATE'?stage.pos = 6:null;

            item.code == 'DESKTOP_WELCOME_ADDRESS'?item.type = 'adress':null;
            item.code == 'DESKTOP_WELCOME_HOUR'?item.type = 'hour':null;
            item.code == 'DESKTOP_WELCOME_DATE'?item.type = 'date':null;
            item.code == 'DESKTOP_CAPACITATION_ADDRESS'?item.type = 'adress':null;
            item.code == 'DESKTOP_CAPACITATION_HOUR'?item.type = 'hour':null;
            item.code == 'DESKTOP_CAPACITATION_DATE'?item.type = 'date':null;

            stage.stage = item.displayValue;
            item.type == 'hour'?stage.stage = moment(item.displayValue).format('HH:mm'):null;
            item.type == 'date'?stage.stage = moment(item.displayValue).format('DD/MM/YYYY'):null;

            stage.editButton = <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> <a onClick={()=>ctx.showEditModalWelcomeAndCapacitation(item)} data-target=".modal-welcome" data-toggle="modal" class="btn btn-warning btn-xs"><i class="fa fa-pencil"></i></a></font></font>;
            _stakesWelcomeAndCapacitation.push(stage);
          });
          this.stakesWelcomeAndCapacitation = _.orderBy(_stakesWelcomeAndCapacitation, ['pos'], ['asc']);
          this.refreshDataWelcomeAndCapacitation();
        },
        async shownotificacion(){ $('.bs-example-modal-not').modal('show');  },
        }

}
</script>
<style>


</style>
