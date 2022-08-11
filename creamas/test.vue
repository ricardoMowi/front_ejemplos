<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12">
            <div class="x_panel">
                <div class="x_title">
                    <h2 class="p-2">Principal actividad económica</h2>
                    <div class="mb-3">
                        <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-sm">
                            <i class="fa fa-plus"></i> Registrar
                        </button>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content">
                    <MasterTemplate :filters="propsData.filters"
                                    :setDataTable="this.setDataTable"
                                    :dataLoadFunction="this.getData"
                                    :header="colum"
                                    :useMassiveSelector="useMassiveSelector"
                                    :customActions="propsData.customActions"
                                    :data="this.Data"
                                    :tableTitle="titleTable"
                                    :showSearchSection="this.showSearchSection"
                                    :searchOptionTableMaf="this.searchOptionTableMaf"
                                    :loadingComponentLabel="this.loadingComponentLabel"
                                    :loadingComponentClass="this.loadingComponentClass"
                                    ref="mowiMaster" />

                </div>
            </div>

            <!-- Modal Add/Edit -->
            <div id="mainModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel">Nuevo</h3>
                        <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel">Editar</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                      <div class="form-group row">
                        <div class="col-md-12 col-sm-12">
                          <inputMaf type='text' v-model="form.Code" :valueInput='form.Code' label="Código: (*)" :validation="{required:true, max:501}" nameInput="text" etiqueta='true' ref="Code" :readOnly="formType=='EDIT'"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-md-12 col-sm-12">
                          <inputMaf type='text' v-model="form.MainEconomicActivity" :valueInput='form.MainEconomicActivity' label="Principal actividad económica: (*)" :validation="{required:true, max:501}" nameInput="text" etiqueta='true' ref="MainEconomicActivity" :readOnly="formType=='EDIT'"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-md-12 col-sm-12">
                          <inputMaf textArea="textArea" v-model="form.Description" :valueInput='form.Description'
                                      label="Descripción: (*)" :validation="{required:true, max:501}" nameInput="text" etiqueta='true' ref="Description" />
                        </div>
                      </div>
                      <div v-if="formType=='ADD'" class="form-group row">
                        <div class="col-md-12 col-sm-12">
                          <label class="control-label col-md-3 col-sm-3">Estado: (*)</label>
                          <div class="col-md-7 col-sm-6 ">
                            <select v-model="form.Status" :valueInput='form.Status' class="custom-select">
                              <option value="" selected>Selecciona una opción:</option>
                              <option value="true">Activado</option>
                              <option value="false">Inactivado</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-pink">Cerrar</button>
                      <button v-if="formType=='ADD'" @click="createRecord()" type="button" class="btn btn-success">Confirmar</button>
                      <button v-if="formType=='EDIT'" @click="updateRecord()" type="button" class="btn btn-success">Guardar</button>
                    </div>
                </div>
              </div>
            </div>
            <!-- Modal Fin -->

            <!-- Modal Active/Inactive  -->
            <div class="modal fade" id="modal-active-inactive" tabindex="-1" role="dialog" aria-labelledby="modal-active-inactive__title" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 v-if="formType=='ACTIVE'" class="modal-title" id="modal-active-inactive__title">Activar</h5>
                    <h5 v-if="formType=='INACTIVE'" class="modal-title" id="modal-active-inactive__title">Inactivar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p v-if="formType=='ACTIVE'">¿Seguro que desea activar?</p>
                    <p v-if="formType=='INACTIVE'">¿Seguro que desea inactivar?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-pink" data-dismiss="modal">
                      Cerrar
                    </button>
                    <button v-if="formType=='ACTIVE'" @click="activeRecord()" data-dismiss="modal" type="button" class="btn btn-success">
                      Confirmar
                    </button>
                    <button v-if="formType=='INACTIVE'" @click="inactiveRecord()" data-dismiss="modal" type="button" class="btn btn-success">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Modal Active/Inactive  -->

            <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"> {{formNot.title}} </h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">×</span>
                            </button>

                        </div>
                        <div class="modal-body">{{formNot.message}}</div>
                        <div class="modal-footer">
                          <button type="button" data-dismiss="modal" class="btn btn-success">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Modal not-->
        </div>
    </div>
</template>

<script>
  import MasterTemplate from 'mowi-master';
  import moment from "moment";

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        inputMaf,
        SearchComponent,
        MasterTemplate,
      },
      data: () => ({
          isLoading: false,
          services: { /* URL of services */
            list:   'CountryByCountry/BusinessActivity/List',
            update: 'CountryByCountry/BusinessActivity/Update',
            active: 'CountryByCountry/BusinessActivity/ActivePage',
            inactive: 'CountryByCountry/BusinessActivity/InactivePage',
            create: 'CountryByCountry/BusinessActivity/Create',
            search: 'CountryByCountry/BusinessActivity/Search'
          },
          users: [],
          form: {},
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          Data: [],
          countries: [],
          client: {},
          propsData: {
            filters: [
              {
                name:'Code',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Código",
                validation:{required:false, max:501},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: false,
              },
              {
                name:'MainEconomicActivity',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Principal actividad económica",
                validation:{required:false, max:501},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: false,
              },
              {
                name:'Description',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Descripción",
                validation:{required:false, max:501},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: false,
              },
              {
                name:'Status',
                filterType:'listComponent',
                label: "Estado",
                selectedValue:"",
                value:'',
                isVisible:true,
                content: [
                  {
                    value: 'true',
                    label:'Activo'
                  },
                  {
                    value: 'false',
                    label:'Inactivo'
                  }
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              }
            ],
          },
          useMassiveSelector:false,
          titleTable: '', //No tiene efecto
          showSearchSection: true,
          searchOptionTableMaf: false,
          loadingComponentClass: "spinner-grow text-warning",
          loadingComponentLabel: "",

      }),

      async created () {
        var ctx = this;
        this.Data = await this.getData()
        this.setHeadTable();
        this.$refs.mowiMaster.setInitialData(this.Data)
      },

      methods: {
        setHeadTable() {
          this.colum = [
              {name:'Code', label: 'Código', find: 1, sort: 1},
              {name:'MainEconomicActivity', label: 'Principal actividad económica', find:1, sort:1},
              {name:'Description', label: 'Descripción', find:1, sort:1},
              {name:'Status', label: 'Estado', find:1, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */
        setDataTable(Data){
          var ctx = this;
          var formattedData = [];
          Data.forEach(item => {
            let record = {};
            record.actions = (
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Acciones
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                  <a class="dropdown-item" onClick={ ()=>ctx.showActiveModal(item) } data-toggle="modal" data-target="#modal-active-inactive">Activar</a>
                  <a class="dropdown-item" onClick={ ()=>ctx.showInactiveModal(item) } data-toggle="modal" data-target="#modal-active-inactive">Inactivar</a>
                </div>
              </div>
            );
            // Registra la data a cargar
            record.Code = item.Code;
            record.MainEconomicActivity = item.MainEconomicActivity;
            record.Description = item.Description;
            if(item.Status) {
              record.Status = 'Activo';
            } else {
              record.Status = 'Inactivo';
            }

            formattedData.push(record);
          });
          return formattedData
        },
        /**
        *  La función getData() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */
        async getData(filters) {
          console.log('filteeeeeeeeeeeeeers',filters )
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              let filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              let Code  =_.filter(filters,{'name':'Code'});
              let MainEconomicActivity  =_.filter(filters,{'name':'MainEconomicActivity'});
              let Description  =_.filter(filters,{'name':'Description'});
              let Status  =_.filter(filters,{'name':'Status'});
              /**obtener los valores y agregarlos en el objeto filter */
              Code.length > 0 ?  filter.Code = Code[0].value : null
              MainEconomicActivity.length > 0 ?  filter.MainEconomicActivity = MainEconomicActivity[0].value : null
              Description.length > 0 ?  filter.Description = Description[0].value : null
              Status.length > 0 ?  (filter.Status = Status[0].value == 'true') : null

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              look = await consultServices(this.services.search,'POST',filter);
          }else{
              look = await consultServices(this.services.list,'POST',{});
          }

          // /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        /**
         * updateRecord: Valida y actualiza la negocio
        */
        async updateRecord() {
          console.log('updateRecord', this.form)
          //Mostramos la pantalla de cargando
          this.isLoading=true;
          //Validamos campos obligatorios
          if(this.form.Code != "" && this.form.MainEconomicActivity != ""
            && this.form.Description != ""){

            //Creamos objeto
            let record = {}
            record.Id = this.form.Id;
            record.Code = this.form.Code;
            record.MainEconomicActivity = this.form.MainEconomicActivity;
            record.Description = this.form.Description;

            const recordUpdated = await consultServices(this.services.update,'POST',record);
            if(recordUpdated.message){
              this.formNot.title="Error en operación";
              this.formNot.message=recordUpdated.message;
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message = "Actualización de forma exitosa";
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices(this.services.list,'POST',{});
               this.refreshData(response);
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        /**
         * createRecord: Valida y registra el nuevo registro
        */
        async createRecord() {
          //Mostramos la pantalla de cargando
          this.isLoading = true;
          //Validamos campos obligatorios
          if(this.form.Code != "" && this.form.MainEconomicActivity != ""
            && this.form.Description != "" && this.form.Status != ""){
              //Creamos objeto a registrar
              let record = {}
              record.Code = this.form.Code;
              record.MainEconomicActivity = this.form.MainEconomicActivity;
              record.Description = this.form.Description;
              record.Status = (this.form.Status == 'true');

              const response0 = await consultServices(this.services.create,'POST',record);
              console.log('respuesta del back: ', response0)
              if(response0.message){
                this.formNot.title="No fue posible realizar el registro";
                this.formNot.message=response0.message;
              }else{
                this.formNot.title="Operación exitosa";
                this.formNot.message="El registro completo de forma exitosa.";
                this.limpiarForm();
                $('.modal').modal('hide');
                const response = await consultServices(this.services.list,'POST',{});
                this.refreshData(response);
              }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        /**
        * activeRecord: activa el estado de un registro
        */
        async activeRecord() {
          this.isLoading = true;
          let record = {};
          record.Id = this.form.Id;
          const res = await consultServices(this.services.active, 'POST', record);
          this.isLoading = false;

          if(res.message || res.error) {
            this.formNot.title = "La operación no fue posible";
            this.formNot.message = res.message;
          } else {
            this.formNot.title = "Operación exitosa";
            this.formNot.message = "Activado de forma exitosa";
            let data = await consultServices(this.services.list, 'POST', {});
            this.refreshData(data);
          }
          this.showNotificacion();
        },
        /**
        * inactiveRecord: inactiva el estado de un registro
        */
        async inactiveRecord() {
          this.isLoading = true;
          let record = {};
          record.Id = this.form.Id;
          const res = await consultServices(this.services.inactive, 'POST', record);
          this.isLoading = false;

          if(res.message || res.error) {
            this.formNot.title = "La operación no fue posible";
            this.formNot.message = res.message;
          } else {
            this.formNot.title = "Operación exitosa";
            this.formNot.message = "Inactivado de forma exitosa";
            let data = await consultServices(this.services.list, 'POST', {});
            this.refreshData(data);
          }
          this.showNotificacion();
        },
        setForm(item) {
          console.log('entré a setForm')
          this.form = _.cloneDeep(item);
        },
        showAddModal() {
          this.limpiarForm()
          this.formType = "ADD";
          this.$refs.Code.dataInput();
          this.$refs.MainEconomicActivity.dataInput();
          this.$refs.Description.dataInput();
          this.value = null;
        },
        showActiveModal(item) {
          this.formType = 'ACTIVE';
          this.form = _.cloneDeep(item);
        },
        showInactiveModal(item) {
          this.formType = 'INACTIVE';
          this.form = _.cloneDeep(item);
        },
        limpiarForm() {
          this.form.Id = "";
          this.form.Code = "";
          this.form.MainEconomicActivity = "";
          this.form.Description = "";
          this.form.Status = "";
        },
        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showEditModal(item) {
          this.formType = "EDIT";
          this.form = _.cloneDeep(item);
          this.Data = (this.form.Data||[]);
        }
      }
    }
</script>


