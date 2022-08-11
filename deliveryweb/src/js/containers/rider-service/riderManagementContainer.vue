<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Riders</h2>
          <div class="nav navbar-right panel_toolbox">
            <!-- <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar rider
            </button> -->
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsRider.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getRiders"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsRider.customActions"  
            :data="this.riders"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Registrar rider</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar rider</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>
              <!-- <h5>(*) Campos obligatorios</h5> -->

              <div class="modal-body">

                  <div class="card-body" >
                 
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                        <inputMaf type="text" v-model="form.documentNumber" :valueInput='form.documentNumber'
                            label="Nro. Documento: (*)" :validation="{required:true, min:8}" nameInput="document" etiqueta='true' ref="documentNumber">
                        </inputMaf>                      
                      </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <inputMaf type='text' v-model="form.name"  :valueInput='form.name' label="Nombre: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="name">
                          </inputMaf>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <inputMaf type="text" v-model="form.lastName" :valueInput='form.lastName' label="Apellido paterno: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="lastName">
                          </inputMaf>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <inputMaf type="text" v-model="form.secondLastName" :valueInput='form.secondLastName' label="Apellido materno:" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="secondLastName">
                          </inputMaf>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <inputMaf type="text" v-model="form.email"  :valueInput='form.email' label="Correo electrónico: (*)" :validation="{required:false, email:true}" nameInput="email" etiqueta='true' ref="email">
                          </inputMaf>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <inputMaf type="text"  v-model="form.phone" :valueInput='form.phone' label="Teléfono:" :validation="{required:true, numeric:true}" nameInput="phone"  etiqueta='true' ref="phone">
                            </inputMaf>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Método de pago:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <treeselect v-model="paymentMethodsPerRider"
                          :value-consists-of="valueConsistsOf"
                          :multiple="true"
                          :options="paymentMethods" />
                        </div>
                      </div>
                    
                  </div>

                  
                  <div class="card-body" v-if="formType=='EDIT'" >
                    <div class="card-header" >
                        <h2>Reclutamiento</h2>
                        <div class="clearfix"></div>
                    </div>  
                    <div class="card-body">                  
                      <div class="form-group" v-if="formType=='EDIT'">
                        <div class="col-md-12 col-sm-12 col-xs-12" >
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado de reclutamiento: </label>
                          <div class="col-md-6 col-sm-6 col-xs-12 " style="padding-left: 5px;  padding-top: 8px;">
                                <label > <b>{{form.recruitmentStatus.description}} </b> </label>                           
                          </div>      
                        </div>
                      </div>                                                
                      <div class="form-group" v-if="showTableDocs == true">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Documentos de reclutamiento: </label>
                        <div class="card-body">             
                        <TableMaf :header="columModal" :data="uploadedDocs" :tableTitle="titleTableModal" :pagination="paginationView" :datePerPageV="datePerPageV" :searchOption="searchOption" ref="mowiMasterModal">
                        </TableMaf>
                        </div>        
                      </div>
                      <div class="form-group" v-if="formType=='EDIT'">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                        <div v-if="form.recruitmentStatus.code == 'PERMISSION_NEW' || 'PERMISSION_APPROVED' ||  'DISABLED' " class="col-md-6 col-sm-6 col-xs-12 " style="padding-left: 8px;">
                              <button @click="setUpRider()" v-if="form.recruitmentStatus.code == 'PERMISSION_NEW'" class="btn btn-warning" style="margin-bottom: 5px;" type="button">Dar de alta </button>
                              <button @click="setdisabledRider()" v-if="form.recruitmentStatus.code == 'PERMISSION_APPROVED'" class="btn btn-danger" style="margin-bottom: 5px;" type="button">Inhabilitar </button>
                              <button @click="setEnabledRider()" v-if="form.recruitmentStatus.code == 'DISABLED'" class="btn btn-success" style="margin-bottom: 5px;" type="button">Habilitar </button>    
                        </div>
                        <div v-else style ="padding-top: 8px; padding-left: 5px;">
                          <p> No hay acciones disponibles </p>
                        </div>
                      </div>                   
                    </div>
                  </div>

              </div>

              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createUser()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateRider()" type="button" class="btn btn-primary">Guardar</button>
              </div>
            
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!--Modal Borrar-->
        <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                  <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al rider : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteRider()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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

                  <h3 class="modal-title" > <center> {{formNot.title}}  </center> </h3>
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
      <!--Modal operations (Bonificar,reembolsar)-->
        <div class="modal fade bs-example-modal-operations" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              
              <div class="modal-header">
                  <h3 class="modal-title" > <center> {{modalOperations.title}}  </center> </h3>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span> </button>
              </div>

              <div class="modal-body">   
                    <div class="form-group">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" > Rider: </label>                      
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input v-model="formOperations.fullname" class=" form-control col-md-7 col-sm-6 col-xs-12" readonly />   
                        </div>                    
                      </div>
                    </div> 

                    <div class="form-group">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" > Monto: </label>                      
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input v-model="formOperations.amount" class=" form-control col-md-7 col-sm-6 col-xs-12" type="number" step="0.01" />   
                        </div>                    
                      </div>
                    </div>           
              </div>

              <div class="modal-footer">
                <center>
                        <button v-if="this.modalOperations.operation == 'BONUS'" type="button" data-dismiss="modal" class="btn btn-success"  @click="createBonus()" >Registrar bonificación</button>
                        <button v-if="this.modalOperations.operation == 'REFUND'" type="button" data-dismiss="modal" class="btn btn-success" @click="createRefund()" >Registrar reembolso</button>
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
  import Treeselect from '@riophae/vue-treeselect';
  import TableMaf from "./../../components/tableMaf.vue";
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        Treeselect,
        TableMaf,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
      },
      data: () => ({
          valueConsistsOf: 'ALL_WITH_INDETERMINATE',
          isLoading: false,
          users: [],
          form: {},
          formOperations:{},
          formType: '',
          formNot:{title:'',message:'',},
          modalOperations:{title:'',operation: ''},
          readonly: true,
          value: null,
          options: [],
          colum:[],
          riders: [],
          countries: [],
          client: {},
          propsRider: {
            filters: [              
              {
                name:'fullName',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombres o apellidos",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              },  
              {
                name:'documentNumber',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Número de Doc.",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp: false,
                selectField:true,
                isRequired :false,        
              }, 
              {
                name:'email',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Correo",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              }, 
              {
                name:'phone',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Teléfono",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              },       
            ],
          },
          useMassiveSelector:false,
          titleTable: '',
          titleTableModal: '', 
          showSearchSection: true, //mostrar la sección de búsqueda
          //tabla de documentos
          uploadedDocs: [],
          showTableDocs:false,
          paginationView:false,
          datePerPageV: false,
          searchOption: false,
          paymentMethods : [],
          paymentMethodsPerRider : [' Crédito del Imperio'],

      }),
      async created () {
        var ctx = this;        
        this.riders = await this.getRiders()
        await this.getPaymentMethods()
        this.setHeadTable();        
        this.$refs.mowiMaster.setInitialData(this.riders)        
  		},
      methods: {
        deleteClient(index) {

        },
        setHeadTable() {
          console.log('setHeadTable')
          this.colum = [
              {name:'documentNumber', label: 'DNI', find:1, sort:1},
              {name:'fullname', label: 'Nombre', find:1, sort:1},
              {name:'phone', label: 'Teléfono', find:1, sort:1},
              {name:'email', label: 'Correo', find:1, sort:1},
              {name:'availability', label: 'Disponibilidad', find:0, sort:0},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados ";
          this.columModal = [
              {name:'name', label: 'Nombres', find:0, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:1}]
          this.titleTableModal = "Tabla de documentos ";
        },
        async getPaymentMethods(){
            var response = await consultServices('getConfiguration','POST',{});
            if(response.status = 200){
              this.configurationPaymentMethod = response.configuration[0].paymentMethods
              var newArray= [];
              for (let index = 0; index < this.configurationPaymentMethod.length; index++) {
                if(this.configurationPaymentMethod[index].status == 'enabled'){
                  newArray.push(this.configurationPaymentMethod[index])
                }                
              }
              this.paymentMethods = this.tranforForSelectTree(newArray)
            }  
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(riders){  
          console.log('setDataTable', riders)
          var ctx = this;
          var formattedRiders = [];
          riders.forEach(item => {
            var rider = {};
            //obtener el último estado de reclutamiento
            item.recruitmentStatus = item.riderDetail.recruitmentStatus[item.riderDetail.recruitmentStatus.length -1] 
            rider.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    {
                      item.recruitmentStatus.code != 'PERMISSION_NEW' ? <a class="dropdown-item" onClick={()=>ctx.setNotOperations(item, 'REFUND')} data-toggle="modal" data-target=".bs-example-modal-operations">Reembolsar</a> : null
                    }
                    {
                      item.recruitmentStatus.code != 'PERMISSION_NEW' ? <a class="dropdown-item" onClick={()=>ctx.setNotOperations(item, 'BONUS')} data-toggle="modal" data-target=".bs-example-modal-operations">Bonificar</a> : null
                    }                                                  
                  </div>
                </div>
              </div>
            );
            rider.documentNumber = item.documentNumber;
            rider.fullname = item.fullname;
            rider.phone = item.phone;
            rider.email = item.email;
            rider.availability = item.riderDetail.currentStatus.description;
            rider.status = item.riderDetail.currentStatus.code;
            rider.id = item._id;          
            formattedRiders.push(rider);
          }); 
          return formattedRiders
        },
        setNotOperations(item, operation){
            console.log('item', item)
            console.log('operation', operation)
            this.formOperations.fullname = item.fullname
            this.formOperations.idRider = item._id
            this.formOperations.documentNumber = item.documentNumber
            this.formOperations.amount = 0
            if(operation == 'REFUND'){
              this.modalOperations.title = 'Asignar reembolso'
              this.modalOperations.operation = 'REFUND'
              this.formOperations.createdBy = 'ADMIN'
            }
            if(operation == 'BONUS'){
              this.modalOperations.title = 'Asignar bonificación'
              this.modalOperations.operation = 'BONUS'
              this.formOperations.createdBy = 'ADMIN'
            }
        },
        setDataTableModal(arrayData){
          var ctx = this;

            this.uploadedDocs = [];
            for (let index = 0; index < arrayData.length; index++) {
              var document ={}
              var type = arrayData[index].type
              var url = arrayData[index].url
              console.log('setDataTableModal type', type)
              switch (type) {
                case 'document':
                  document.name = "Foto de carnet o pasaporte"
                  break;
                case 'invoice':
                  document.name = "Recibo de agua, luz o teléfono para verificar domicilio"
                  break;  
                case  'enrollment':
                  document.name = "Copia de la ficha de su matrícula"
                  break;
                case 'vehicle':
                  document.name = "Fotografía de la bicicleta"
                  break; 
                case 'policeCertificate':
                  document.name = "Certificado de antecedentes policiales"
                  break;
                case  'criminalCertificate':
                  document.name = "Certificado de antecedentes penales"
                  break;           
                default:
                  break;
              }
              document.actions = 
              <font style="vertical-align: inherit;">  
                    <div> <a href={url} class="btn btn-danger btn-xs" style="color:#FFFFFF" target="_newtab" download><i class="cui-file"></i> Descargar</a> </div>
              </font>
              this.uploadedDocs.push(document)
            } 
          console.log('setDataTableModal', this.uploadedDocs)       
          //this.refreshDataModal();
        },    
        /**
        *  La función getRiders() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getRiders(filters) {
          console.log('getRiders: ', filters)
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var fullName  =_.filter(filters,{'name':'fullName'});
              var documentNumber  =_.filter(filters,{'name':'documentNumber'});
              var email  =_.filter(filters,{'name':'email'});
              var phone  =_.filter(filters,{'name':'phone'});
              /**obtener los valores y agregarlos en el objeto filter */
              console.log('test', fullName[0])
              fullName.length > 0 ?  filter.fullName = fullName[0].value.variable : null
              documentNumber.length > 0 ?  filter.documentNumber = documentNumber[0].value.variable : null
              email.length > 0 ?  filter.email = email[0].value.variable : null
              phone.length > 0 ?  filter.phone = phone[0].value.variable : null
              filter.isRider = true

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              // var response1 = await consultServices('searchRiders','POST',filter);  
              // response1.status == 200 ? look = response1.riders : null
              look = await consultServices('searchRiders','POST',filter);   
          }else{ 
              look = await consultServices('getAllRiders','POST',{});   
          }
          return look
        },
        async showNotificacion(isSucces=true){
          this.formNot.title==isSucces?'Operación exitosa':'Error'
          $('.bs-example-modal-not').modal('show');
        },

        async updateRider() {
          this.isLoading=true;
          console.log('métodos de pago', this.paymentMethodsPerRider)
          var form = _.cloneDeep(this.form)
          form.roles = this.value;
          
          if(!this.form.documentNumber||!this.form.name||!this.form.lastName || !this.form.email){
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }else{

            var finalArrayPaymentMethods = []
            for (let i = 0; i < this.paymentMethodsPerRider.length; i++) {
              for (let j = 0; j < this.configurationPaymentMethod.length; j++) {
                if(this.paymentMethodsPerRider[i] == this.configurationPaymentMethod[j].name){
                  finalArrayPaymentMethods.push(this.configurationPaymentMethod[j])
                }
              }            
            }
            console.log('métodos de pago final', finalArrayPaymentMethods)
            form.paymentMethods = finalArrayPaymentMethods
            console.log('form para update', form)
            var userUpdated = await consultServices('updateUser','POST',form);
            console.log('userUpdated para update', userUpdated)

            if(userUpdated.error){
              this.formNot.title="Error en la operación";
              this.formNot.message=userUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del rider de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               var response = await consultServices('getAllRiders','POST',{});
               this.refreshData(response);
            }
          }

          this.isLoading=false;
          this.showNotificacion();
        },

        tranforForSelectTree(array) {
          return _.map(array,(method)=>{
            var response = {       
              id:  method.name,       
              label: method.name,
              status: method.status,
              detail: method.detail,
              }
            return response;
          })
        },

        async setUpRider() {
            this.isLoading=true;
            // var form = _.cloneDeep(this.form)
            console.log('form setup', this.form)
          

            const riderUpdated = await consultServices('setUpRider','POST',{_id: this.form._id});
            if(riderUpdated.status != 200 ){
              this.formNot.title="Error en la operación";
              this.formNot.message=riderUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del rider de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('getAllRiders','POST',{});
               this.refreshData(response);
            }
            this.isLoading=false;
            this.showNotificacion();

        },

        async setdisabledRider() {
            this.isLoading=true;
            console.log('form setup', this.form)        
            const riderUpdated = await consultServices('setdisabledRider','POST',{_id: this.form._id});
            if(riderUpdated.message ){
              this.formNot.title="Error en la operación";
              this.formNot.message=riderUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del rider de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('getAllRiders','POST',{});
               this.refreshData(response);
            }
            this.isLoading=false;
            this.showNotificacion();
        },

        async setEnabledRider() {
            this.isLoading=true;
            console.log('form setup', this.form)
            const riderUpdated = await consultServices('setEnabledRider','POST',{_id: this.form._id});
            if(riderUpdated.message){
              this.formNot.title="Error en la operación";
              this.formNot.message=riderUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del rider de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('getAllRiders','POST',{});
               this.refreshData(response);
            }
            this.isLoading=false;
            this.showNotificacion();
        },
        
        validar(){
            if(!this.$refs.documentNumber.returnValidation() || !this.$refs.name.returnValidation() || !this.$refs.lastName.returnValidation() || !this.$refs.email.returnValidation()){
              return false;
            }else{return true;}
        },
        async createUser() {
            this.isLoading = true;
            var form = {}
            form.name= this.form.name;
            form.lastName= this.form.lastName
	          form.secondLastName=this.form.secondLastName
	          form.email = this.form.email
	          form.password = this.form.password
	          form.phone = this.form.phone
	          form.documentType= 'DNI'
	          form.documentNumber= this.form.documentNumber
            // form.clientDetail= {lastServices:[], totalServices:[], complains:[], addresses:[]}

            if(!this.validar() || !this.form.email){
              this.formNot.message="Por favor complete los campos obligatorios";
              this.formNot.title="Campos incompletos"
            }else{
              const response0 = await consultServices('createClient','POST',form);
              const response = await consultServices('listRiders','POST',{});           
                    
              $('.modal').modal('hide');
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se ha registardo con éxito un nuevo rider";
              if(response0.code || response0.error){
                this.formNot.message=response0.message;
              }
            
            }
            this.isLoading=false;
            this.showNotificacion();
        },
        async deleteRider() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            form.roles = this.value;
            //const response0 = await consultServices('deleteClient','POST',form);
            const response = await consultServices('listRiders','POST',{});
            this.users=response;
            this.isLoading=false;
            this.formNot.title="Operación exitosa";
            this.formNot.message="El rider seleccionado está inactivo";
            if(response0.code || response0.error){
              this.formNot.title="Error en la operación";
              this.formNot.message=response0.message;
              this.showNotificacion(false);
            }else{
              this.showNotificacion();
            }
        },
        showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
        },
        showAddModal() {
           this.formType = "ADD";
           this.$refs.documentNumber.dataInput();
           this.$refs.name.dataInput();
           this.$refs.lastName.dataInput();
           this.$refs.secondLastName.dataInput();
           this.$refs.email.dataInput();
           this.$refs.phone.dataInput();
           this.riders = [];
           this.value = null;
        },
        limpiarForm() {
          this.form.documentNumber="";
          this.form.name="";
          this.form.surName="";
          this.form.lastName="";
          this.form.email="";
          this.form.phone="";
        },
       
        async refreshData(response){
          console.log('refreshData')
          this.$refs.mowiMaster.setInitialData(response)
        },

        async refreshDataModal(){
          console.log('refreshDataModal', this.$refs)
          this.$refs.mowiMasterModal.formatData(this.uploadedDocs)
        },

        async showEditModal(item) {
          this.formType = "EDIT";
          console.log('item showEditModal', item)
          this.form = _.cloneDeep(item);
          this.value = this.form.roles;
          console.log('el value es: ', this.vale)
          this.paymentMethodsPerRider = []
          if(item.riderDetail.paymentMethods){
            for (let index = 0; index < item.riderDetail.paymentMethods.length; index++) {
              this.paymentMethodsPerRider.push(item.riderDetail.paymentMethods[index].name)              
            }       
          }
          console.log('el payment es: ', this.paymentMethodsPerRider)
          this.riders = (this.form.riders||[]);
          if(item.riderDetail.uploadedDocs){
            if(item.riderDetail.uploadedDocs.length >0 ){
              this.showTableDocs = true
              await this.setDataTableModal(item.riderDetail.uploadedDocs)
            }else{
              this.showTableDocs = false
            }           
          }else{
            this.showTableDocs = false
          }
        },

        async resetPassword() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           form.userId=form._id;
           const response0 = await consultServices('resetPassword','POST',form);
           const response = await consultServices('listRiders','POST',{});
           this.users = response;
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se restauro la contraseña del usuario de manera correcta";
           if(response0.code || response0.error){
             this.formNot.title="Error en la operación";
             this.formNot.message=response0.message;
             this.shownotificacion(false)
           }else{
             this.shownotificacion();
           }
        },

        async createRefund(){
          this.isLoading=true;
          var retVal = confirm("¿Asignar reembolso al rider?");
          if(retVal){
            console.log('prueba ', this.formOperations)
            this.formOperations.amount = this.formOperations.amount*-1
            var form = _.cloneDeep(this.formOperations)
            const response = await consultServices('createRefund','POST',form);        

            if(response.message){
              this.formNot.title="Error en la operación"
              this.formNot.message="No se pudo registrar el reembolso de manera exitosa"
              this.showNotificacion();
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se ha registrado el reembolso de manera exitosa";
              this.showNotificacion();
            }            
          }
          this.isLoading=false;
        },

        async createBonus(){
          this.isLoading=true;
          var retVal = confirm("¿Asignar bono al rider?");
          if(retVal){
            console.log('prueba ', this.formOperations)
            var form = _.cloneDeep(this.formOperations)
            const response = await consultServices('createBonus','POST',form);        

            if(response.message){
              this.formNot.title="Error en la operación"
              this.formNot.message="No se pudo registrar la bonificación de manera exitosa"
              this.showNotificacion();
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se ha registrado la bonificación de manera exitosa";
              this.showNotificacion();
            }            
          }
          this.isLoading=false;
        },        

      }
  }
</script>
