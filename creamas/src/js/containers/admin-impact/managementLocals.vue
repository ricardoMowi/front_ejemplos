<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Gestionar locales</h2>
                    <div class="card-header-actions" align-items: center>
                        <button type="button" @click="showAddLocal()" data-toggle="modal" data-target=".modal-locals" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar local
                        </button>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                  <TableMaf :header="colum" :data="locals" :tableTitle="titleTable" ref="tableMaf">
                  </TableMaf>
                </div>

                <!-- Modal local -->
                <div class="modal fade modal-locals" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar local</h3>
                                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar local</h3>
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                </button>

                            </div>

                            <div class="modal-body">
                                <div class="card-body">
                                    
                                    <div class="card-body">
                                        <inputMaf type='text' v-model="formLocal.name" :valueInput="formLocal.name"  label="Nombre:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputNameLocal" >
                                        </inputMaf>
                                    </div>

                                    <div class="card-body">
                                        <inputMaf type='text' v-model="formLocal.address" :valueInput="formLocal.address"  label="Dirección:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputAddressLocal" >
                                        </inputMaf>
                                    </div>

                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Departamento:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <!-- cambio 24/03/2020 -->
                                                <select class="form-control" v-model="formLocal.region" >
                                                <!-- cambio 24/03/2020 
                                                <select class="form-control" v-model="formLocal.region" @change="getProvinces()" >-->
                                                    <option v-for="region in regions" :value="region.id">{{region.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button v-if="formType=='ADD'" @click="createLocal(formLocal)" type="button" class="btn btn-primary">Crear local</button>
                                    <button v-if="formType=='EDIT'" @click="updateLocal(formLocal)" type="button" class="btn btn-primary">Guardar cambios</button>
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
            <!--Modal not-->

            <!--Modal Space-->
                <div class="modal fade modal-spaces" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h3 class="modal-title" id="myModalLabel"> Gestionar espacio de local </h3>
                                <button type="button" @click="addSpaceOff()"   class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
                            </div>
                
                            <div class="card">
                                <div class="card-header">
                                    <button type="button" @click="showAddLocaleRoom()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar Espacio de Local
                                    </button>
                                </div>

                                <div v-if="spaceType=='ADD'" >
                                    <div class="card-body">

                                        <div class="card-body">
                                            <inputMaf type='text' v-model="localeRoom.name" :valueInput="localeRoom.name"  label="Nombre:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputNameLocalRoom" >
                                            </inputMaf>
                                        </div>
                                        

                                        <div class="modal-footer">
                                            <button type="submit" @click="createSpace(localeRoom)" class="btn btn-success" >Agregar</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="modal-body">
                                <div class="card-body">
                                <div class="table-responsive">
                                    <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                                    <thead>
                                        <tr >
                                            <th style="width: 20px;">#</th>
                                            <th style="width: 20px;">Nombre</th>
                                            <th style="width: 20px;">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(localRoom,index) in localeRooms" >
                                            <th style="width: 20px;">Espacio {{index+1}} </th>
                                            <th style="width: 20px;"><input type="text" v-model="localRoom.name" class="form-control col-md-7 col-xs-12"></th>
                                            <th style="width: 20px;"><button @click="deleteSpace(localRoom)" type="button" class="btn btn-danger btn-xs" > Eliminar </button> </th>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" data-target=".modal-spaces" data-toggle="modal" @click="addSpaceOff()" class="btn btn-default"> Cancelar </button>
                                        <button type="button" class="btn btn-primary" @click="updateSpace(localeRooms)" > Guardar </button>
                                    </div>

                                </div>
                            </div> <!--Body-->
                        </div> <!--Content-->
                    </div>
                </div>
                <!--Modal space Fin-->
      
            </div>
        </div>
    </div>
</template>

 <script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import inputMaf from "./../../components/inputMaf.vue";

  export default {
        name: "ManagementLocalsContainerMount",
        components: {
            LoadingComponent,
            TableMaf,
            inputMaf,
        },

        data: () => ({
            isLoading: true,
            locals:[],
            formLocal:{},
            formType:"",
            formNot:{not:'',tit:'',},
            //formSpaces:{},
            localeRooms:[],
            spaceType:'',
            localeRoom:{},
            regions:[],
        }),

        async created () {
           await this.setHeadTable();
           await this.getMasterValues();
           await this.getLocals();

        },

        methods: {

          async getMasterValues(){
                this.isLoading = true;
                var ids = [] ;

                if( ids.length > 0){
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                };

                if (!window.sessionStorage.regions) {                 
                    this.regions= await consultServices('getRegions','POST',{});
                    window.sessionStorage.regions  = JSON.stringify(this.regions);  
                }

                this.regions =JSON.parse( window.sessionStorage.regions);

                this.isLoading = false;
            },

            async getLocals (){
              this.isLoading = true;
              const response = await consultServices('getLocale','POST',{});
              //[{name:"Local1",address:'Direccción prueba',region:1}];

              this.setDataTable(response);
              this.isLoading = false;
            },

            setHeadTable(){
                this.colum = [
                    {label:'Nombre' ,name:'name' ,find:1 ,sort:0},
                    {label:'Dirección' ,name:'address' ,find:1 ,sort:0},
                    {label:'Región' ,name:'region' ,find:1 ,sort:0},
                    {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
                this.titleTable = "Lista de locales";
            },
            refreshData() {
                   this.$refs.tableMaf.formatData(this.locals);
            },
            setDataTable(arrayData){
              var ctx = this;
              this.locals = [];

               arrayData.forEach(item => {
                var localAux = {};
                localAux.name = item.name ;
                localAux.address = item.address;
                var regionAux = _.find(this.regions, (aux) => {
                      return aux.id == item.region;
                })
                localAux.region = regionAux.name;
                localAux.actions = <font class="d-flex justify-content-around">
                                      <div><button onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".modal-locals" class="btn btn-warning btn-xs" >Editar</button></div>
                                      <div><button onClick={()=>ctx.deleteLocal(item)} data-toggle="modal" class="btn btn-danger btn-xs" >Eliminar local</button></div>
                                      <div><button onClick={()=>ctx.showSpaces(item)} data-toggle="modal" data-target=".modal-spaces" class="btn btn-info btn-xs" >Ver espacios</button></div>
                              </font>;
                this.locals.push(localAux);
              });
              this.refreshData();
            },
            async shownotificacion() {
                $('.bs-example-modal-not').modal('show');
            },
            async updateLocal(formLocal) {
              this.isLoading = true;
              var flag = confirm("¿Guardar cambios");

              if(flag == true) {
                
                var form = _.cloneDeep(formLocal);
                
                if(!formLocal.region || await this.$refs.inputNameLocal.returnValidationAsync() == false || await this.$refs.inputAddressLocal.returnValidationAsync() == false) {
                    this.formNot.tit="Actualización incorrecta "; this.formNot.not="No se pudo actualizar el local"
                } else {

                    const response = await consultServices('updateLocale','POST',form);
                    console.log("response 2020 ::::::::::", response[0])

                    if(response[0]){
                            this.formNot.tit="Actualización correcta "; this.formNot.not="Se ha actualizado el local de manera existosa"
                    }else{
                        this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo actualizar el local"
                    }
                    
                    this.getLocals();
                    this.formLocal={};
                    $('.modal-locals').modal('hide');

                }
                
                this.shownotificacion();

              }
              this.isLoading = false;
            },
            showSpaces(item) {

                this.formSpaces = _.cloneDeep(item);
                this.getSpaces();
            },
            async getSpaces(){

                this.isLoading = true;

                const response = await consultServices('getLocaleRoom','POST',{id:this.formSpaces.id});

                this.localeRooms = response; //[{name:"Espacio de local 1"},{name:"Espacio de local 2"}];

                this.isLoading = false;

            },
             async showEditModal(item) {
                this.formType = "EDIT";
                this.formLocal = _.cloneDeep(item);
            },
            showAddLocal(){
                this.formType = 'ADD';
                this.formLocal = {};
                this.$refs.inputNameLocal.dataInput();
                this.$refs.inputAddressLocal.dataInput();
            },
            async deleteLocal(item) {
                var flag=confirm("¿Eliminar el local seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        const response0 = await consultServices('removeLocale','POST',form);
                        this.formNot.tit="Eliminar local"; this.formNot.not="Se eliminó el local de manera exitosa";
                        this.shownotificacion();
                        this.getLocals();
                        this.isLoading=false;

                }
            },
            /////Espacios de local
            showAddLocaleRoom(){
                this.spaceType = "ADD";
            },
            async updateSpace(localeRooms){

                this.isLoading = true;

                var _locals = _.cloneDeep(localeRooms);

                console.log("Espacios del local",_locals);
                
                const responseII = await consultServices('bulkUpdateLocaleRoom','POST',_locals);

                this.formNot.tit="Actualización de espacios de local"; this.formNot.not="Se actualizaron los espacios del local de manera exitosa";

                this.getLocals();
                $('.modal-spaces').modal('hide');
                this.localeRooms=[];

                this.isLoading = false;
                this.shownotificacion();

            },
            async deleteSpace(localRoom){
                var retVal = confirm("Seguro que desea eliminar espacio de local, no podrá recuperarlo");
                if( retVal == true ) {
                    const responseII = await consultServices('removeLocaleRoom','POST',{id:localRoom.id});
                    this.getSpaces();
                    this.spaceType = "None";
                }
                else
                {
                    return false;
                }
            },
            addSpaceOff() {
                this.spaceType = "None";
            },
            async createLocal(formLocal){

                this.titleMessage = "Locales";

                var form = _.cloneDeep(formLocal);

                if(!formLocal.region || await this.$refs.inputNameLocal.returnValidationAsync() == false || await this.$refs.inputAddressLocal.returnValidationAsync() == false) {
                    
                    this.formNot.tit="Creación incorrecta"; this.formNot.not="No se ha podido crear el local";
                    
                }else{
                    this.isLoading = true;
                    console.log(form);
                    const responseII = await consultServices('createLocale','POST',form);
                    this.getLocals();

                    this.isLoading = false;

                    this.formNot.tit="Creación correcta"; this.formNot.not="Se ha creado el local de manera exitosa";

                    $('.modal-locals').modal('hide');

                }
                this.shownotificacion();

            },
            async createSpace(localeRoom){


                var form = _.cloneDeep(localeRoom);
                if (!form.name || await this.$refs.inputNameLocalRoom.returnValidationAsync() == false) {
                    alert("No se ha podido crear el espacio del local");
                }else {
                    form.idLocale = this.formSpaces.id;

                    const response = await consultServices('createLocaleRoom','POST',form);

                    this.addSpaceOff();
                    this.getLocals();
                    this.getSpaces();
                    this.localeRoom={};
                }

            },

        },
    }

</script>
<style scoped>

</style>


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-nrix{text-align:center;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
