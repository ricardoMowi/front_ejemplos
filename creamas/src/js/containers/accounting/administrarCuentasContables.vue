rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <nav class="breadcrumb">
          <span class="breadcrumb-item active">Cuentas contables</span>
        </nav>
        <div class="card">
            <div class="card-header">
                <h2>Administrar cuentas contables</h2>
               
                <div class="card-header-actions" align-items: center>
                    <button type="button" @click="showAddAccount()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar cuenta
                    </button>
                </div>
                <div class="clearfix"></div>
                
                 
            </div>
            
            <div class="card-body" v-if="role == 'CCADMIN'">
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione una Organización</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="organization.id" @change="onChangeOrganization()" >
                                <option v-for="item in organizations" v-bind:value="item.id" >
                                     {{item.name}} 
                                </option>
                            </select>
                        </div>
                </div>
                
                <TableMaf :header="colum" :data="accounts" :text="text" :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>
                 
            </div> <!--card-body-->

            <!--Modal-->

            <div class="modal fade modal-org" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="formType=='Add'">Agregar cuenta</h1>                       
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card">
                    <div class="card-body">

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre de la cuenta</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input v-model="account.name" type="text" required="required" class="form-control col-md-12 col-xs-12">
                              </div>
                      </div>

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Área asociada a la cuenta:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="account.idArea">
                                    <option v-for="item in areas" v-bind:value="item.id" >
                                     {{item.name}} 
                                    </option>
                                  </select>
                               </div>
                      </div>

                    <div v-if="formType=='Edit'">
                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de inicio de actividades:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input v-model="organization.initialDate" type="text" class="form-control col-md-12 col-xs-12" readonly>
                          </div>
                      </div>
                    </div>

                    </div><!--body-->
                    </div>

                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-default">Cancelar</button>
                                <button v-if="formType=='Add'"  @click="createNewAccount()" data-dismiss="modal" type="button" class="btn btn-success">Agregar</button>
                                
                            </center>
                    </div>
                    </div>
                </div>
            </div>
            <!--Modal-->





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
        id: window.INITIAL_STATE.id,    
        role:'',    
        isLoading: true,
        colum:[],
        titleTable:'',
        formNot:{not:'',tit:'',},
        organization:{},
        area:{},
        accounts:[],
        account:{},
        organizations:[],
        areas:[],
        semester: [],
        formType: '',
        text:'* Sólo se podrán eliminar Cuentas contables que no tengan actividades asociadas'

           

    }),

    async created () {
     
      this.role ="CCADMIN"
      if(this.role == "CCADMIN"){
        const response = await consultServices('listOrganizations','POST',{});
        this.organizations = response
      }
      
      await this.getSessionStorage();   
    },

    methods: {
      async onChangeOrganization(){
        this.accounts = {};
        await this.listAccounts();

      },
      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
        this.isLoading = false;
      },

      
      
      async listAccounts(){
          const response = await consultServices('listAccounts','POST',{idOrganization:this.organization.id});
          this.setDataTable(response,'ACCOUNT');
          await this.setHeadTable('ACCOUNT');
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(type){
        if(type == 'ACCOUNT'){
          this.colum = [
            {label:'Código de cuenta' ,name:'code' ,find:1 ,sort:1},
            {label:'Nombre' ,name:'name' ,find:1 ,sort:1},
            {label:'Actividades asignadas' ,name:'activities' ,find:0 ,sort:0},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Cuentas contables";
        }
      },

      refreshData(type){
          if(type == 'ACCOUNT'){
             this.$refs.tableMaf.formatData(this.accounts);
          }

          
      },

      setDataTable(arrayData, type){
          var ctx = this;
          var type= type;
          if(type == 'ACCOUNT'){
            this.accounts = [];
            arrayData.forEach(item => {
                    var account= {};
                    account.name = item.name;
                    account.code = item.id;
                    account.activities = item.activitiesCount
                    var url= '/dashboard/adminActividades/'+item.name+'/'+item.id;
                    console.log("url  ",url)
                    account.actions = <font style="vertical-align: inherit;">
                                              <div> <a href={url} class="btn btn-success btn-xs" >Ver actividades </a></div>                                         
                                              {item.activitiesCount == 0?  <button onClick={()=>ctx.removeAccount(item)}   type="button" class="btn btn-danger btn-xs">Eliminar</button>:null}
                                           </font>;
                    this.accounts.push(account);
                });
          }
          this.refreshData(type);
        },

        async removeAccount(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la cuenta contable seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeAccount','POST',form);
                        this.listAccounts();
                        this.isLoading=false;
                }
        },

        async showAddAccount(){
          this.isLoading = true;
          this.formType = 'Add'
          this.areas =[]
          this.areas =await consultServices('getAreas','POST',{id:this.organization.id});
          this.isLoading = false;
        },

        async createNewAccount(){
          this.isLoading = true;
          if(this.account.idArea && this.account.name ){

              var flag= confirm("¿Crear nueva cuenta?");
              if(flag == true){
              const response = await consultServices('createNewAccount','POST',this.account);
                  if(response.status == 200){
                    this.formNot.tit="Registro de cuenta exitoso "; this.formNot.not="Se registró una nueva cuenta contable de manera correcta"
                    this.listAccounts();
                    this.organization={};
                  }else if(response.status == 400){
                    this.formNot.tit="Error en el registro de una nueva Organización  "; this.formNot.not="No se pudo registrar la nueva Organización de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear una Organización.")
          }    
          this.isLoading = false;
        },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },

        

    },
  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    
}

</style>
