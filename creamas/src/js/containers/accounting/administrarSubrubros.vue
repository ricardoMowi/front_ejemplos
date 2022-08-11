rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <nav class="breadcrumb">
              <a class="breadcrumb-item" href="/dashboard/adminCuentasContables">{{nameAccount}}</a>             
              <a class="breadcrumb-item" :href="'/dashboard/adminActividades/' + nameAccount+'/'+idAccount"> {{nameActivity}} </a> 
              <a class="breadcrumb-item" :href="'/dashboard/adminRubros/' + nameAccount+'/'+idAccount+ '/'+nameActivity +'/'+ idActivity "> {{nameHeading}} </a>                
          <span class="breadcrumb-item active">Subrubros del rubro </span>
        </nav>
        <div class="card">
            <div class="card-header">
                <h2>Administrar subrubros de rubro</h2>
                <div class="clearfix"></div>
               
            </div>
            <div class="card">
              <div class="card-body"> 
                        <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Subrubros:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="subHeader.typeCode">
                                    <option v-for="item in typeSubHeader" v-bind:value="item.code" >
                                     {{item.displayValue}} 
                                    </option>
                                  </select>
                                </div>
                        </div>                              
              </div> 
              <div class="card-header-actions" align-items: center>
                    <button type="button" @click="createNewSubHeader()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar subrubro
                    </button>
              </div>                        
            </div>
            <div class="card-body" >
                <TableMaf :header="colum" :data="subHeaders" :tableTitle="titleTable" ref="tableMaf">
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
import { Datetime } from 'vue-datetime';
//COMPONENTS
import LoadingComponent from "./../../components/loadingComponent.vue";
//import Datepicker from 'vuejs-datepicker';
import TableMaf from "./../../components/TableMaf.vue";
import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";


export default {
    name: "roomsManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
    },

    data: () => ({
        idActivity: window.INITIAL_STATE.idActivity, 
        nameActivity: window.INITIAL_STATE.nameActivity, 
        idAccount: window.INITIAL_STATE.idAccount, 
        nameAccount: window.INITIAL_STATE.nameAccount, 
        idHeading: window.INITIAL_STATE.idHeading, 
        nameHeading: window.INITIAL_STATE.nameHeading, 
        isLoading: true,
        colum:[],
        titleTable:'',
        formNot:{not:'',tit:'',},
        typeSubHeader:[],
        subHeaders:[],
        subHeader:{},
        semester: {},
        formType: '',
        idItem:'',
    }),

    async created () {   
        this.idItem = 1;
        await this.getSessionStorage();  
        await this.listSubHeaders();

        
    },

    methods: {

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                var ids = [] ;
                var flagSubHeader = false;
                if(!window.sessionStorage.typeSubHeader){
                  ids.push(26);
                  flagSubHeader = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //Hacer consulta única de masterValues
                if( ids.length > 0){                
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagSubHeader == true){
                       this.typeSubHeader = _.filter(arrayMasters, function(master) {return master.idMaster == 26; })
                       window.sessionStorage.typeSubHeader  = JSON.stringify(this.typeSubHeader);
                    }
                }
                // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.typeSubHeader =JSON.parse( window.sessionStorage.typeSubHeader );
                    this.semester =JSON.parse( window.sessionStorage.semester );

        this.isLoading = false;
      },

      
      
      async listSubHeaders(){
        const response = await consultServices('listSubHeaders','POST',{idAccountingHeading: this.idHeading});
        this.setDataTable(response);
        await this.setHeadTable();
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(){
       this.colum = [
            {label:'Código de subrubro' ,name:'code' ,find:1 ,sort:1},
            {label:'Nombre de subrubro' ,name:'name' ,find:1 ,sort:1},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Sub Rubros";
      },

      refreshData(){
             this.$refs.tableMaf.formatData(this.subHeaders);   
      },

      setDataTable(arrayData){
          var ctx = this;
          this.subHeaders = [];
            arrayData.forEach(item => {
                    var subItem= {};
                    subItem.name = this.getDisplayValue( item.typeCode,26);
                    subItem.code = item.id;                    
                    subItem.actions = <font style="vertical-align: inherit;">                                              
                                               <button onClick={()=>ctx.removeSubHeader(item)}   type="button" class="btn btn-danger btn-xs"> Eliminar</button>
                                           </font>;
                    this.subHeaders.push(subItem);
                });
          
          this.refreshData();
        },

        async removeSubHeader(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar el subrubro seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeSubHeader','POST',form);
                        this.listSubHeaders();
                        this.isLoading=false;
                }  
        },

        async createNewSubHeader(){
          this.isLoading = true;
          if(this.subHeader.typeCode){

              var flag= confirm("¿Crear nuevo subrubro?");
              if(flag == true){
              const response = await consultServices('createNewSubHeader','POST',{idAccountingHeading:this.idHeading, typeCode: this.subHeader.typeCode});
                  if(response.id){
                    this.formNot.tit="Registro de subrubro exitoso "; this.formNot.not="Se registró un nuevo subrubro de manera correcta"
                    this.listSubHeaders();
                    this.subHeader={};
                  }else{
                    this.formNot.tit="Error en el registro de un nuevo subrubro  "; this.formNot.not="No se pudo registrar el subrubro de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear un subrubro.")
          }    
          this.isLoading = false;
        },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },

        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 26){
                array= this.typeSubHeader
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
