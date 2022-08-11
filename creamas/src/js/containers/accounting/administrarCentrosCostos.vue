rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header">
                <h2>Administrar Centros de costos</h2>
                <div class="card-header-actions" align-items: center>
                    <button type="button" @click="showAddCostCenter()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar nuevo centro de costos 
                    </button>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione una Organización</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="organization" @change="onChangeOrganization()" >
                                <option v-for="item in organizations" v-bind:value="item" >
                                     {{item.name}} 
                                </option>
                            </select>
                        </div>
                </div>
                <TableMaf :header="colum" :data="costCenters" :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>
            </div> <!--card-body-->

            <!--Modal-->

            <div class="modal fade modal-org" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="formType=='Add'">Agregar Centro de costos</h1>
                        <h1 v-if="formType=='Edit'">Editar datos del Centro de costos</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card">
                    <div class="card-body"> <!--body-->

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre del Centro de costos</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input v-model="costCenter.name" type="text" required="required" class="form-control col-md-12 col-xs-12">
                              </div>
                      </div>

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Organización:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                   <input v-model="organization.name" type="text" required="required" class="form-control col-md-12 col-xs-12" readonly="readonly" >
                              </div>
                      </div>

                    </div><!--body-->
                    </div>

                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-default">Cancelar</button>
                                <button v-if="formType=='Add'"  @click="createNewCostCenter()" data-dismiss="modal" type="button" class="btn btn-success">Agregar</button>
                                <button v-if="formType=='Edit'" @click="updateCostCenter()" data-dismiss="modal" type="button" class="btn btn-primary">Guardar cambios</button>
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
        isLoading: false,
        colum:[],
        titleTable:'',
        formNot:{not:'',tit:'',},
        costCenter:{},
        costCenters:[],
        semester: [],
        formType: '',
        organization:{},
        organizations:[],
        role:'CCADMIN'
           

    }),

    async created () {
      this.role ="CCADMIN"
      if(this.role == "CCADMIN"){
        const response = await consultServices('listOrganizations','POST',{});
        this.organizations = response
      }
      
      await this.setHeadTable();
      
    },

    methods: {
      async onChangeOrganization(){
        this.costCenters = {};
        await this.listCostCenters();

      },

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
        this.isLoading = false;
      },

      
      async listCostCenters(){
          const response = await consultServices('getCostCenters','POST',{id: this.organization.id});
          this.setDataTable(response);
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(){
        this.colum = [
            {label:'Código de CC' ,name:'id' ,find:0 ,sort:0},
            {label:'Nombre de centro de costos' ,name:'name' ,find:1 ,sort:1},
            //{label:'Acciones' ,name:'actions' ,find:0 ,sort:0}
            ];
          this.titleTable = "Centros de costos";
      },

      refreshData(){         
             this.$refs.tableMaf.formatData(this.costCenters);          
      },

      setDataTable(arrayData){
          var ctx = this;
          var type= type;
        
            this.costCenters = [];
            arrayData.forEach(item => {
                    var costCenter= {};
                    costCenter.name = item.name;
                    costCenter.id = item.id;
                    costCenter.actions = <font style="vertical-align: inherit;">                                             
                                              <div><button onClick={()=>ctx.removeCostCenter(item)}  data-toggle="modal"  class="btn btn-danger btn-xs" >Eliminar</button></div>
                                           </font>;
                    this.costCenters.push(costCenter);
                });
          

          this.refreshData();
        },

        showAddCostCenter(){
          this.isLoading = true;
          this.formType = 'Add'
          
          this.isLoading = false;
        },

        async removeCostCenter(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar el centro de costos seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeCostCenter','POST',form);
                        this.listCostCenters();
                        this.isLoading=false;
                }
        },

        async createNewCostCenter(){
          this.isLoading = true;
          if(this.costCenter.name && this.organization.id){

              var flag= confirm("¿Crear nuevo centro de costos??");
              if(flag == true){
              const response = await consultServices('createCostCenter','POST',{name:this.costCenter.name, idOrganization: this.organization.id});
                  if(response.status == 200){
                    this.formNot.tit="Registro de Centro de costos exitoso "; this.formNot.not="Se registró un nuevo Centro de Costos de manera correcta"
                    this.listCostCenters();
                    this.organization={};
                  }else if(response.status == 400){
                    this.formNot.tit="Error en el registro de un nuevo Centro de costos"; this.formNot.not="No se pudo registrar el nuevo Centro de costos de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear un nuevo Centro de costos.")
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
    margin: 0px;
}

</style>
