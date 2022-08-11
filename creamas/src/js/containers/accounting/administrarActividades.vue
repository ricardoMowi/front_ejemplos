rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <nav class="breadcrumb">
          <a class="breadcrumb-item" href="/dashboard/adminCuentasContables">{{name}}</a>                
          <span class="breadcrumb-item active">Actividades de la cuenta </span>
        </nav>
        <div class="card">
            <div class="card-header">
                <h2>Administrar actividades de una cuenta contable</h2>
                <div class="clearfix"></div>
            </div>
            <div class="card">
                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Actividades:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="activity.typeCode">
                                    <option v-for="item in typeActivity" v-bind:value="item.code" >
                                     {{item.displayValue}} 
                                    </option>
                                  </select>
                               </div>
                      </div>
              <div class="card-header-actions" align-items: center>
                    <button type="button" @click="createNewActivity()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar actividad
                    </button>
              </div>                        
            </div>
            <div class="card-body" >
                <TableMaf :header="colum" :data="activities" :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>
            </div> <!--card-body-->

            <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                     <div class="modal-header">
                        <h4 class="modal-title">{{formNot.tit}} </h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p> <center> {{formNot.not}} </center> </p>
                    </div>
                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!--card-->
    </div> <!--col 12 -->
  </div> <!--row-->
</template>

<script>
import consultServices from './../../utilities/consultServices.js';
import moment from 'moment';
import _ from 'lodash';
//import * as lang from "vuejs-datepicker/src/locale";
// import { Datetime } from 'vue-datetime';
//COMPONENTS
import LoadingComponent from "./../../components/loadingComponent.vue";
//import Datepicker from 'vuejs-datepicker';
import TableMaf from "./../../components/TableMaf.vue";
// import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";


export default {
    name: "roomsManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
    },

    data: () => ({
        id: window.INITIAL_STATE.id, 
        name: window.INITIAL_STATE.name, 
        isLoading: true,
        colum:[],
        titleTable:'',
        formNot:{not:'',tit:'',},
        organization:{},       
        activities:[],
        typeActivity:[],
        activity:{},
        organizations:[],
        areas:[],
        semester: {},
        formType: '',
    }),

    async created () {   
        await this.getSessionStorage();  
        await this.listActivities();
        this.currentAccount = this.name
        this.idCurrentAccount = this.id
        console.log("actividades ", this.typeActivity)

        
    },

    methods: {

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;

                //validar si existen los atributos en sessionStorage
                var ids = [] ;
                var flagActivity = false;
                if(!window.sessionStorage.typeActivity){
                  ids.push(24);
                  flagActivity = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //Hacer consulta única de masterValues
                if( ids.length > 0){                
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagActivity == true){
                       this.typeActivity = _.filter(arrayMasters, function(master) {return master.idMaster == 24; })
                       window.sessionStorage.typeActivity  = JSON.stringify(this.typeActivity);
                    }
                }
                // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.typeActivity =JSON.parse( window.sessionStorage.typeActivity );
                    this.semester =JSON.parse( window.sessionStorage.semester );

        this.isLoading = false;
      },

      
      
      async listActivities(){
        console.log("id de actividad ", this.id)
        const response = await consultServices('listActivities','POST',{idAccount: this.id });        
        console.log("response ", response);
        this.setDataTable(response);
        await this.setHeadTable('ACTIVITIES');
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(type){
        if(type == 'ACTIVITIES'){
          this.colum = [
            {label:'Código de actividad' ,name:'code' ,find:1 ,sort:1},
            {label:'Nombre de actividad' ,name:'name' ,find:1 ,sort:1},
            {label:'Rubros asignados' ,name:'items' ,find:0 ,sort:0},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Actividades";
        }
      },

      refreshData(){
             this.$refs.tableMaf.formatData(this.activities);   
      },

      setDataTable(arrayData){
          var ctx = this;
          this.activities = [];
          //prueba cmabio
            arrayData.forEach(item => {
                    var activity= {};
                    activity.name =this.getDisplayValue( item.typeCode,24);
                    activity.code = item.id;
                    activity.items = item.headingsCount
                    var url= '/dashboard/adminRubros/'+this.name+'/'+this.id+ '/'+ activity.name+ '/'+item.id;
                    activity.actions = <font style="vertical-align: inherit;">
                                              <div> <a href={url} class="btn btn-success btn-xs" >Ver rubros </a></div>
                                              {item.headingsCount == 0?  <button onClick={()=>ctx.removeActivity(item)}   type="button" class="btn btn-danger btn-xs"> Eliminar</button>:null}
                                           </font>;
                    this.activities.push(activity);
                });
          
          this.refreshData();
        },

        async removeActivity(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la actividad seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeActivity','POST',form);
                        this.listActivities();
                        this.isLoading=false;
                }
        },

        async createNewActivity(){
          this.isLoading = true;
          if(this.activity.typeCode ){

              var flag= confirm("¿Crear nueva Actividad?");
              if(flag == true){
              const response = await consultServices('createNewActivity','POST',{idAccount:this.id, typeCode:this.activity.typeCode});
                  if(response.status == 200){
                    this.formNot.tit="Registro de actividad exitoso "; this.formNot.not="Se registró una nueva actividad en la cuenta seleccioanda de manera correcta"
                    this.listActivities();
                    this.activity={};
                  }else if(response.status == 400){
                    this.formNot.tit="Error en el registro de una nueva actividad  "; this.formNot.not="No se pudo registrar la nueva actividad de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear una actividad.")
          }    
          this.isLoading = false;
        },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 24){
                array= this.typeActivity
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
button.btn.btn-danger.btn-xs {
    color: #ffffff;
   
}

</style>
