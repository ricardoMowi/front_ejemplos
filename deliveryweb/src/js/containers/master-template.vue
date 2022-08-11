<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Recargas</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar rider
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsCredits.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getCredits"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsCredits.customActions"  
            :data="this.riders"
            :tableTitle="titleTable"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nueva recarga</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar recarga</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type='text' v-model="form.title"  :valueInput='form.title' label="Título: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="title"  etiqueta='true' ref="title"/>           
                  </div>
              </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf textArea="textArea" v-model="form.content" :valueInput='form.content'
                      label="Contenido: (*)" :validation="{required:true}" nameInput="content" etiqueta='true' ref="content"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Público objetivo: (*)</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <select v-model="form.target" :valueInput='form.target' class="custom-select">
                        <option selected>Selecciona una opción:</option>
                        <option value="RIDER">Riders</option>
                        <option value="CLIENT">Clientes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12 col-form-label">Tamaño de la recarga: (*)</label>
                    <div class="col-md-9 col-form-label">
                      <div class="form-check form-check-inline mr-1">
                        <input class="form-check-input" id="inline-radio1" type="radio" v-model="form.size" :valueInput='form.size' value="STANDART" name="inline-radios" ref="size">
                        <label class="form-check-label" for="inline-radio1">Estandar</label>
                      </div>
                      <div class="form-check form-check-inline mr-1">
                        <input class="form-check-input" id="inline-radio2" type="radio" v-model="form.size" :valueInput='form.size' value="LARGE" name="inline-radios" ref="size">
                        <label class="form-check-label" for="inline-radio2">Grande</label>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Imagen de la recarga</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Elige la imagen</label>
                      </div>
                    </div>
                  </div>
                </div>             
                

                <!-- <div class="card-body">
                  <div class="form-group" v-if="formType=='EDIT'">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <button @click="resetPassword()" class="btn btn-danger" style="margin-bottom: 5px;" type="reset">Restaurar Contraseña</button>
                    </div>
                  </div>
                </div> -->
                
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createCredit()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateCredit()" type="button" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->

      <!--Modal Delete-->
      <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar recarga</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar la recarga? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="deleteCredit()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal not-->
        <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" > {{formNot.title}} </h5>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">{{formNot.message}}</div>
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
          users: [],
          form: {},
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          riders: [],
          countries: [],
          client: {},
          propsCredits: {
            filters: [              
              {
                name:'title',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Título",              
                validation:{required:true, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :true,        
              }      
            ],
          },
          useMassiveSelector:false,
          titleTable: '' //No tiene efecto

      }),
      
      async created () {
        var ctx = this;
        this.riders = await this.getCredits()
        this.setHeadTable();
        // this.$refs.mowiMaster.runSearch() 
        this.$refs.mowiMaster.setInitialData(this.riders)
  		},
      
      methods: {
        deleteClient(index) {
        },
        setHeadTable() {
          this.colum = [
              {name:'title', label: 'Título', find:1, sort:1},
              {name:'content', label: 'Contenido', find:1, sort:1},
              {name:'target', label: 'Público objetivo', find:1, sort:1},
              {name:'published', label: 'Publicada', find:1, sort:1},
              {name:'size', label: 'Tamaño', find:1, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(credits){  
          var ctx = this;
          var formattedCredits = [];
          credits.forEach(item => {
            var credit = {};
            credit.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                  </div>
                </div>
              </div>
            );
            credit.title = item.title;
            credit.content = item.content;
            if(item.target){
              credit.target = item.target == "CLIENT" ? 'Clientes' : 'Riders';
            }else{
              credit.target = '-'
            }
            credit.published = item.published ? 'Sí' : 'No';
            if(item.size){
              credit.size = item.size == "STANDART" ? 'Estandar' : 'Grande';
            }else{
              credit.size = '-'
            }
            // credit.userPhotoUrl = item.userPhotoUrl;
            formattedCredits.push(credit);
          }); 
          return formattedCredits
        },
        /**
        *  La función getCredits() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getCredits(filters) {
          /**consultar servicio con el objeto filter  */
          var look = await consultServices('listCredits','POST',{});   
          /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },

        async updateCredit() {
          console.log('updateCredit', this.form)
          this.isLoading=true;
          var credit = {}
          credit._id = this.form._id;
          credit.title = this.form.title;
          credit.content = this.form.content
          credit.target = this.form.target
          credit.size = this.form.size
          if(credit.title && credit.content && credit.target && credit.target != "" && credit.size){
            const creditUpdated = await consultServices('updateCredit','POST',credit);
            if(creditUpdated.message){
              this.formNot.title="Error en operación";
              this.formNot.message=creditUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos de la recarga de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('listCredits','POST',{});
               this.refreshData(response);
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        
        async createCredit() {
          this.isLoading = true;
          var credit = {}
          credit.title = this.form.title;
          credit.content = this.form.content
          credit.target = this.form.target
          credit.size = this.form.size
          if(credit.title && credit.content && credit.target && credit.target != "" && credit.size){
            const response0 = await consultServices('createCredit','POST',credit);         
            console.log('respuesta del back: ', response0)
            if(response0.message){
              this.formNot.title="No fue posible realizar el registro";
              this.formNot.message=response0.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="El registro completo de forma exitosa.";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('listCredits','POST',{});
               this.refreshData(response);
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        
        async deleteCredit() {
          this.isLoading=true;
          var credit = {}
          credit._id = this.form._id;
          const response0 = await consultServices('deleteCredit','POST',credit);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La recarga fue eliminada";
            const response = await consultServices('listCredits','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion();
        },

        showDeleteModal(item) {
          this.formType = "DELETE";
          this.form = _.cloneDeep(item);
        },

        /** 
         * setForm: Esta función sirve para seleccionar el item elegido para ejecutar
         * alguna acción como eliminar, editar, etc.
        */
        setForm(item) {
          console.log('entré a setForm')
          this.form = _.cloneDeep(item);
        },
        showAddModal() {
           this.formType = "ADD";
           this.$refs.title.dataInput();
           this.$refs.content.dataInput();
          //  this.$refs.target.dataInput();
           this.value = null;
        },
        limpiarForm() {
          this.form.title="";
          this.form.content="";
          this.form.target="";
          this.form.size="";
        },
       
        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showEditModal(item) {
          this.formType = "EDIT";
          this.form = _.cloneDeep(item);
          this.riders = (this.form.riders||[]);
        }
      }
  }
</script>
