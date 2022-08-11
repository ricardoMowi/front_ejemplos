<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header">
                <h2>Administrar Organizaciones</h2>
                <div class="card-header-actions" align-items: center>
                    <button type="button" @click="showAddOrganization()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar nueva Organización
                    </button>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <TableMaf :header="colum" :data="organizations" :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>
            </div> <!--card-body-->

            <!--Modal-->

            <div class="modal fade modal-org" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="formType=='Add'">Agregar Organización</h1>
                        <h1 v-if="formType=='Edit'">Editar datos de la Organización</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card">
                    <div class="card-body"> <!--body-->

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre de la Organización</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input v-model="organization.name" type="text" required="required" class="form-control col-md-12 col-xs-12">
                              </div>
                      </div>

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                   <input v-model="organization.description" type="text" required="required" class="form-control col-md-12 col-xs-12">
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
                                <button v-if="formType=='Add'"  @click="createNewOrganization()" data-dismiss="modal" type="button" class="btn btn-success">Agregar</button>
                                <button v-if="formType=='Edit'" @click="updateOrganization()" data-dismiss="modal" type="button" class="btn btn-primary">Guardar cambios</button>
                            </center>
                    </div>
                    </div>
                </div>
            </div>
            <!--Modal-->


            <!--Modal-->

            <div class="modal fade modal-area" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 >Áreas de la Organización</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card">
                        <div class="card-body"> <!--body-->
                           <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre del Área :</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="area.name" type="text" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                           </div>
                           <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="area.description" type="text" required="required" class="form-control col-md-12 col-xs-12">
                              </div>
                           </div>
                           <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del Área en inglés:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="area.enDescription" type="text" required="required" class="form-control col-md-12 col-xs-12">
                              </div>
                           </div>
                        </div>
                        <div class="card-header-actions" align-items: center>
                            <button  class="btn btn-primary" @click="newArea()"   >Agregar nueva Área </button>
                        </div>

                    </div><!--body-->
                        <div class="col-md-12 col-sm-12 col-xs-12">
                           <TableMaf :header="columModal" :data="areas" :tableTitle="titleTableModal" :pagination="false" :datePerPageV="false"  :searchOption="false" :filter="false" :title="false" ref="tableMafModal"></TableMaf>
                        </div>

                  </div>
                </div>
            </div>
            <!--Modal-->

            <!--Modal-->

            <div class="modal fade modal-adm" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 >Administradores </h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="card-header">
                              <h2><font style="vertical-align: inherit;">Agregar administrador</font></h2>
                            </div>

                            <div class="card-body">
                                <div class="card-body">
                                    <inputMaf type='text' v-model="formCrea.documentNumber" :valueInput="formCrea.documentNumber" label="DNI:" :validation="{required:false, digits:8}" nameInput="document" etiqueta='true' ref="inputDocument">
                                    </inputMaf>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button"  @click="searchVolunteer()" class="btn btn-primary"><i class="fa fa-search"></i> Buscar Creando</button>
                            </div>

                        </div>

                            <TableMaf :header="columModalCreando" :data="creandos" :tableTitle="titleTableCreando" ref="tableMafCreando"></TableMaf>


                            <TableMaf :header="columModalADM" :data="administrators" :tableTitle="titleTableADM" ref="tableMafADM"></TableMaf>

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
import inputMaf from "./../../components/inputMaf.vue";

export default {
    name: "orgManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
        inputMaf,
    },

    data: () => ({
        id: window.INITIAL_STATE.id,
        isLoading: true,
        colum:[],
        titleTable:'',
        titleTableCreando:'Resultados de la búsqueda',
        titleTableADM:'Administradores de la organización',
        formNot:{not:'',tit:'',},
        organization:{},
        area:{},
        organizations:[],
        areas:[],
        administrators:[],
        semester:{},
        formType: '',
        columModal:[{label:'Nombre del Área' ,name:'name' ,find:0 ,sort:0}, {label:'Descripción' ,name:'description' ,find:0 ,sort:0}],
        columModalCreando:[{label:'Nombre ' ,name:'name' ,find:0 ,sort:0}, {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}],
        columModalADM:[{label:'Creando' ,name:'name' ,find:0 ,sort:0}, {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}],
        titleTableModal:'Áreas de la organización',
        formCrea:{
          documentNumber: "", name: "", lastName: "", secondLastName: "", email: "", phone: ""
        },
        creandos:[],


    }),

    async created () {
      await this.setHeadTable();
      await this.getSessionStorage();
      await this.listOrganizations();
      await this.listAdministrators()

    },

    methods: {

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
        if(!window.sessionStorage.semester){
          var response =  await consultServices('getCurrentSemester','POST', {});
          this.semester = response;
          window.sessionStorage.semester  = JSON.stringify(this.semester);
        }
        this.semester =JSON.parse( window.sessionStorage.semester );
        //validar si existen los atributos en sessionStorage
        //si no existen y son masterValues, agregar idMaster a ids
        //          var ids = [] ;
        //          var flagLevels = false;
        //          var flagContentWorkshop = false;
        //          var flagClassrooms = false;
        //          var flagGrades = false;
        //          var flagWorkshopCategories = false;
        //          var flagWorkshopType = false;

        //         if(!window.sessionStorage.levels){
        //           ids.push(10);
        //           flagLevels = true;
        //         }
        //         if(!window.sessionStorage.grades){
        //           ids.push(11);
        //           flagGrades = true;
        //         }
        //         if(!window.sessionStorage.classrooms){
        //           ids.push(12);
        //           flagClassrooms = true;
        //         }
        //         if(!window.sessionStorage.contentWorkshop){
        //           ids.push(13);
        //           flagContentWorkshop = true;
        //         }
        //         if(!window.sessionStorage.workshopType){
        //           ids.push(14);
        //           flagWorkshopType = true;
        //         }
        //         if(!window.sessionStorage.semester){
        //           var response =  await consultServices('getCurrentSemester','POST', {});
        //           this.semester = response;
        //           window.sessionStorage.semester  = JSON.stringify(this.semester);
        //         }
        //         if(!window.sessionStorage.workshopCategories){
        //           ids.push(17);
        //           flagWorkshopCategories = true;
        //         }
        //         console.log("acá están las ids " ,ids);
        //         //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

        //         if( ids.length > 0){

        //         //Hacer consulta única de masterValues
        //             var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
        //             console.log("array  ",arrayMasters);
        //             //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
        //             if(flagLevels == true){
        //                this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
        //                window.sessionStorage.levels  = JSON.stringify(this.levels);
        //             }
        //             if(flagGrades == true){
        //                this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
        //                window.sessionStorage.grades  = JSON.stringify(this.grades);
        //             }
        //             if(flagClassrooms == true){
        //                this.classrooms = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
        //                window.sessionStorage.classrooms  = JSON.stringify(this.classrooms);
        //             }
        //             if(flagContentWorkshop == true){
        //                this.contentWorkshop = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
        //                window.sessionStorage.contentWorkshop  = JSON.stringify(this.contentWorkshop);
        //             }
        //             if(flagWorkshopType == true){
        //                this.workshopType = _.filter(arrayMasters, function(master) {return master.idMaster == 14; })
        //                window.sessionStorage.workshopType  = JSON.stringify(this.workshopType);
        //             }

        //             if(flagWorkshopCategories == true){
        //                this.workshopCategories = _.filter(arrayMasters, function(master) {return master.idMaster == 17; })
        //                window.sessionStorage.workshopCategories  = JSON.stringify(this.workshopCategories);
        //             }
        //         }

        //             // //si los datos existen cargarlos en los arreglos definidos para la patalla
        //             this.levels =JSON.parse( window.sessionStorage.levels );
        //             this.grades =JSON.parse( window.sessionStorage.grades );
        //             this.classrooms =JSON.parse( window.sessionStorage.classrooms );
        //             this.contentWorkshop =JSON.parse( window.sessionStorage.contentWorkshop );
        //             this.workshopType =JSON.parse( window.sessionStorage.workshopType );
        //             this.semester =JSON.parse( window.sessionStorage.semester );
        //             this.workshopCategories =JSON.parse( window.sessionStorage.workshopCategories );
        //             // //fin de la carga de arreglos para la pantalla

        // this.formWorkshop.semesterCode = this.semester.id;

        // this.setCategoriesWorkshop();

        this.isLoading = false;
      },


      async listOrganizations(){
          const response = await consultServices('listOrganizations','POST',{});
          this.setDataTable(response,'ORGANIZATION');
      },
      async listAdministrators(){
          const response = await consultServices('listAdministrators','POST',{idJob:7,semesterCode:this.semester.id});
          this.setDataTable(response,'ADM');
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(){
        this.colum = [
            {label:'Nombre' ,name:'name' ,find:1 ,sort:1},
            {label:'Descripción' ,name:'description' ,find:0 ,sort:0},
            {label:'Inicio de actividades ' ,name:'initialDate' ,find:0 ,sort:0},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Organizaciones";
      },

      refreshData(type){
          if(type == 'ORGANIZATION'){
             this.$refs.tableMaf.formatData(this.organizations);
          }
          if(type == 'AREA'){
             this.$refs.tableMafModal.formatData(this.areas);
          }
          if(type == 'VOLUNTEER'){
             this.$refs.tableMafCreando.formatData(this.creandos);
          }
          if(type == 'ADM'){
             this.$refs.tableMafADM.formatData(this.administrators);
          }


      },


      setDataTable(arrayData, type){
          var ctx = this;
          var type= type;
          if(type == 'ORGANIZATION'){
            console.log("entró a orga")
            this.organizations = [];
            arrayData.forEach(item => {
                    var organization= {};
                    organization.name = item.name;
                    organization.description = item.description;
                    organization.initialDate = item.initialDate
                    organization.actions = <font style="vertical-align: inherit;">
                                              <div><button onClick={()=>ctx.showAdministrators(item)} data-toggle="modal" data-target=".modal-adm" class="btn btn-primary btn-xs" >Ver administradores</button></div>
                                              <div><button onClick={()=>ctx.showAreas(item)}  data-toggle="modal" data-target=".modal-area" class="btn btn-primary btn-xs" >Ver Áreas de la organización</button></div>
                                              <div><button onClick={()=>ctx.showUpdateOrganization(item)}  data-toggle="modal" data-target=".modal-org" class="btn btn-primary btn-xs" >Actualizar datos de la organización</button></div>
                                           </font>;
                    this.organizations.push(organization);
                });
          }
          if(type == 'AREA'){
            this.areas = [];
            arrayData.forEach(item => {
                    var area= {};
                    area.name = item.name;
                    area.description = item.description;
                    this.areas.push(area);
                });
          }
          if(type == 'VOLUNTEER'){
            this.creandos = [];
            arrayData.forEach(item => {
                var crea = {};
                    var name = item.name ? name = item.name : name= "";
                    var lastName = item.lastName? lastName = item.lastName : secondLastName= "";
                    var secondLastName = item.secondLastName? secondLastName = item.secondLastName: secondLastName= "" ;
                    crea.name = name.concat(" ", lastName," ", secondLastName);
                    crea.actions=<div class="d-flex justify-content-around">
                    <button  onClick={()=>ctx.assign(item)} class="btn btn-info btn-xs" > Asignar </button>
                    </div>;
                this.creandos.push(crea);
            });
          }
          if(type == 'ADM'){
            this.administrators = [];
            arrayData.forEach(item => {
                var crea = {};
                    var name = item.Volunteer.name ? name = item.Volunteer.name : name= "";
                    var lastName = item.Volunteer.lastName? lastName = item.Volunteer.lastName : secondLastName= "";
                    var secondLastName = item.Volunteer.secondLastName? secondLastName = item.Volunteer.secondLastName: secondLastName= "" ;
                    crea.name = name.concat(" ", lastName," ", secondLastName);
                    crea.actions=<div class="d-flex justify-content-around">
                    <button  class="btn btn-danger btn-xs" > Eliminar </button>
                    </div>;
                this.administrators.push(crea);
            });
          }

          this.refreshData(type);
        },


        async showAdministrators(item){
          this.isLoading = true;
          this.isLoading = false;
        },

        async showAreas(item){
          this.isLoading = true;
          const response = await consultServices('getAreas','POST',{id:item.id});
          this.setDataTable(response,'AREA');
          this.area.idOrganization = item.id;
          this.isLoading = false;
        },

        async newArea(){
          this.isLoading = true;
          if(this.area.name && this.area.description && this.area.idOrganization && this.area.enDescription ){
              var flag= confirm("¿Crear nueva Área para la Organización?");
              if(flag == true){
              const response = await consultServices('createArea','POST',this.area);
                  if(response.id){
                    this.formNot.tit="Registro de Área exitoso"; this.formNot.not="Se registró una nueva Área en la Organización de manera correcta"
                    const response = await consultServices('getAreas','POST',{id:this.area.idOrganization});
                    this.setDataTable(response,'AREA');
                    this.area={};
                  }else{
                    this.formNot.tit="Error en el registro de una nueva Área  "; this.formNot.not="No se pudo registrar la nueva Área en la Organización de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear una Organización.")
          }
          this.isLoading = false;
        },


        showAddOrganization(){
          this.isLoading = true;
          this.formType = 'Add'
          this.isLoading = false;
        },
        showUpdateOrganization(item){
          this.isLoading = true;
          this.formType = 'Edit'
          this.organization = {}
          this.organization.name = item.name;
          this.organization.description = item.description;
          this.organization.initialDate = item.initialDate;
          this.isLoading = false;
        },

        async createNewOrganization(){
          this.isLoading = true;
          if(this.organization.name && this.organization.description ){

              var flag= confirm("¿Crear nueva Organziación?");
              if(flag == true){
              const response = await consultServices('createOrganization','POST',this.organization);
                  if(response.id){
                    this.formNot.tit="Registro de Organización exitoso "; this.formNot.not="Se registró una nueva Organización de manera correcta"
                    this.listOrganizations();
                    this.organization={};
                  }else{
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

        async updateOrganization(item){
          this.isLoading = true;
          if(this.organization.name && this.organization.description ){
              var flag= confirm("¿Actualziar datos de la organización?");
              if(flag == true){
              const response = await consultServices('updateOrganization','POST',form);
                  if(response.id){
                    this.formNot.tit="Actualización de Organización exitosa "; this.formNot.not="Se actualizaron lso datos de la Organización de manera correcta"
                    this.listOrganizations();
                    this.organization={};
                  }else{
                    this.formNot.tit="Error en la actualización de datos de la organización  "; this.formNot.not="No se pudo actualizar los datos de la Organización de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para actualizar los datos de la Organización.")
          }
          this.isLoading = false;
        },

        async searchVolunteer() {
              var form=this.formCrea;

              if(!this.formCrea.documentNumber){
                    this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete el campo para realizar la búsqueda"
                    $('.modal').modal('hide');
                    this.shownotificacion();
              }
              else{
                  if(this.formCrea.documentNumber.length<3){
                      this.formNot.tit="Cantidad mínima de carcateres"; this.formNot.not="Por favor ingrese al menos 3 caractéres para la búsqueda."
                    $('.modal').modal('hide');
                    this.shownotificacion();

                  }else{
                    const response = await consultServices('searchVolunteer','POST',form);
                    console.log("search res",response);
                    if(response.length == 0){
                    alert("No se encontraron resultados");

                    }
                    else{
                    this.id=response[0].id;
                    console.log("id",this.id);
                    this.setDataTable(response, 'VOLUNTEER');
                    }
                    }
              }



        },
        async assign(item){
          console.log("item ", item)
          const response = await consultServices('createAdministrator','POST',{documentNumber: item.documentNumber, idJob:7, semesterCode:this.semester.id});
                  if(response.id){
                    //this.formNot.tit="Registro de administrador exitoso "; this.formNot.not="Se registró un nuevo administrador en la organización seleccioanda de manera correcta"
                    this.listAdministrators();
                    this.formCrea={};
                    this.creandos=[];
                  }else{
                    this.formNot.tit="Error en el registro de un nuevo administrador  "; this.formNot.not="No se pudo registrar un nuevo administrador de manera correcta"
                  }
              //$('.modal').modal('hide');
              //this.shownotificacion();
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
