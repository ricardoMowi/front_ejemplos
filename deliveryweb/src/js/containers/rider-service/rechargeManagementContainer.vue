<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Recargas</h2>

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
            :data="this.credits"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
            :searchOptionTableMaf="this.searchOptionTableMaf"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nueva recarga</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Detalle de recarga</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type='text' v-model="form.documentNumber"  :valueInput='form.documentNumber' label="Núm. de documento de Rider: (*)" :validation="{required:true}" nameInput="documentNumber"  etiqueta='true' ref="documentNumber"/>           
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type="number" v-model="form.amount" :valueInput='form.amount'
                      label="Monto (S/): (*)" :validation="{required:true}" nameInput="amount" etiqueta='true' ref="amount"/>
                  </div>
                </div>
                <!-- <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Comprobante de la recarga</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 " style="padding-left: 5px;padding-top: 5px;">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Elige la imagen</label>
                      </div>
                    </div>
                  </div>
                </div>              -->

                <div class="form-group">
                  <div v-if="form.document" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Comprobante de la recarga:</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <img v-bind:src="form.document.url" class="img-fluid" alt="Responsive image" width="400px">
                    </div>
                  </div>
                  
                  <div v-if="formType=='ADD'" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Agregar Imagen: (*)</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <div class="custom-file">
                        <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="customFile" accept="image/*">
                        <label class="custom-file-label" for="customFile">{{tempFileName ? tempFileName : 'Elige la imagen'}}</label>
                      </div>
                    </div>
                  </div>

                  <div v-if="formType=='EDIT'" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Actualizar Imagen</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <div class="custom-file">
                        <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="customFile" accept="image/*">
                        <label class="custom-file-label" for="customFile">{{tempFileName ? tempFileName : 'Elige la imagen'}}</label>
                      </div>
                    </div>
                  </div>
                </div>  
                
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createCredit()" type="button" class="btn btn-primary">Confirmar</button>
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
      <!--Modal Approve-->
      <div class="modal fade bs-example-modal-approve" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Aprobar recarga</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea aprobar esta recarga? Una vez aprobada, se le asignará el crédito al rider.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="approveCredit()" data-dismiss="modal" type="button" class="btn btn-danger">Confirmar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal Reject-->
      <div class="modal fade bs-example-modal-reject" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Rechazar recarga</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea rechazar esta recarga?.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="rejectCredit()" data-dismiss="modal" type="button" class="btn btn-danger">Confirmar</button>
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
  import convert from 'image-file-resize';
  const uuidv1 = require('uuid/v1');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
        convert,
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
          credits: [],
          countries: [],
          client: {},
          propsCredits: {
            filters: [              
              {
                name:'nameRider',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombre",              
                validation:{required:true, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,      
                showOp: false,       
              },
              {
                name:'documentNumberRider',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Núm. documento",              
                validation:{required:true, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,     
                showOp: false,        
              },
              {
                name:'phoneRider',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Teléfono",              
                validation:{required:true, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,    
                showOp: false,         
              },
              {
                name:'status',
                filterType:'listComponent',
                label: "Estado",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                  {
                    value:'APPROVED',
                    label:'Saldo Aprobado'
                  },
                  {
                    value:'PENDING_APPROVEMENT',
                    label:'Saldo pedniente de aprobación'
                  }
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              }, 

            ],
          },
          useMassiveSelector:false,
          titleTable: '', //No tiene efecto
          showSearchSection: true,  
          searchOptionTableMaf: false,
          tempFileName: '',
      }),
      
      async created () {
        var ctx = this;
        this.credits = await this.getCredits()
        this.setHeadTable();
        // this.$refs.mowiMaster.runSearch() 
        this.$refs.mowiMaster.setInitialData(this.credits)
  		},
      
      methods: {
        deleteClient(index) {
        },
        setHeadTable() {
          this.colum = [
              {name:'riderName', label: 'Nombre del Rider', find:1, sort:1},
              {name:'riderPhone', label: 'Teléfono', find:1, sort:1},
              {name:'riderDocumentNumber', label: 'Núm. de documento', find:1, sort:1},
              {name:'amount', label: 'Monto (S/)', find:1, sort:1},
              {name:'currentStatus', label: 'Estado', find:1, sort:1},
              {name:'createdBy', label: 'Creado por', find:1, sort:1},
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
            let status = item.currentStatus.code
            let statusDescription = item.currentStatus.description
            var credit = {};
            credit.currentStatus = statusDescription
            if(item.createdBy){
              switch (item.createdBy) {
                case 'ADMIN':
                  credit.createdBy = 'Administrador'
                  break;
                case 'RIDER':
                  credit.createdBy = 'Rider'
                  break;
                case 'SYSTEM':
                  credit.createdBy = 'Sistema'
                  break;              
                default:
                  credit.createdBy = 'Sistema'
                  break;
              }
            }else{
              credit.createdBy = '-'
            }
            credit.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Ver Más</a>
                    {
                      status == 'PENDING_APPROVEMENT' ? <div>
                        <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-approve">Aprobar</a>
                        <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-reject">Rechazar</a>
                      </div> : null
                    }
                    {
                      status == 'REJECTED' ? <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a> : null
                    }
                    
                  </div>
                </div>
              </div>
            );
            credit.riderName = item.riderName;
            credit.riderPhone = item.riderPhone ? item.riderPhone : "-";
            credit.riderDocumentNumber = item.riderDocumentNumber;
            credit.amount = item.amount;
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
          console.log('filteeeeeeeeeeeeeers',filters )
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var name  =_.filter(filters,{'name':'nameRider'});
              var documentNumber  =_.filter(filters,{'name':'documentNumberRider'});
              var phone  =_.filter(filters,{'name':'phoneRider'});
              var status  =_.filter(filters,{'name':'status'}); 
              /**obtener los valores y agregarlos en el objeto filter */
              // documentNumber.length > 0 ?  filter.documentNumber = documentNumber[0].value : null
              // name.length > 0 ?  filter.fullName = name[0].value : null
              // phone.length > 0 ?  filter.phone = phone[0].value : null
              // status.length > 0 ?  filter.currentStatus = status[0].value : null

              if(documentNumber.length > 0 ){documentNumber[0].value != ''  ?  filter.documentNumber = documentNumber[0].value : null} 
              if(name.length > 0 ) {name[0].value != ''  ?   filter.fullName = name[0].value : null}  
              if(phone.length > 0 ) { phone[0].value != ''  ?   filter.phone = phone[0].value : null}
              if(status.length > 0 ) {status[0].value != ''  ?   filter.currentStatus = status[0].value : null} 
              
              // name[0].value != ''  ?   filter.fullName = name[0].value : null
              // phone[0].value != ''  ?   filter.phone = phone[0].value : null
              // status[0].value != ''  ?   filter.currentStatus = status[0].value : null

              console.log('filter obtenido ', filter)
              /**consultar servicio con el objeto filter  */
              var credits = await consultServices('searchCredits','POST',filter);   
          }else{
              /**consultar servicio con el objeto filter  */
              var credits = await consultServices('listCredits','POST',{});     
          }


          /**retornar el nuevo arreglo */
          return credits
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        
        async createCredit() {
          this.isLoading = true;
          var credit = {}
          credit.documentNumber = this.form.documentNumber;
          credit.amount = this.form.amount
          console.log('crédito: ', credit)
          if(credit.documentNumber && credit.amount){
            //Subimos el archivo
            await this.uploadSelectedFile()
            if(this.form.newFileUrl){
                let document = {
                  name: this.form.newFileName,
                  url: this.form.newFileUrl,
                  type: 'VOUCHER',
                }
                credit.document = document
            }
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

        async rejectCredit() {
          this.isLoading=true;
          var credit = {}
          credit._id = this.form._id;
          const response0 = await consultServices('rejectCredit','POST',credit);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La recarga fue rechazada";
            const response = await consultServices('listCredits','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion();
        },

        async approveCredit() {
          this.isLoading=true;
          var credit = {}
          credit._id = this.form._id;
          const response0 = await consultServices('approveCredit','POST',credit);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La recarga fue aprobada";
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
          // console.log('entré a setForm')
          this.form = _.cloneDeep(item);
        },
        showAddModal() {
           this.formType = "ADD";
           this.$refs.documentNumber.dataInput();
           this.$refs.amount.dataInput();
           this.value = null;
        },
        limpiarForm() {
          this.form.amount="";
          this.form.documentNumber="";
        },
       
        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showEditModal(item) {
          console.log('edit show ', item)
          this.formType = "EDIT";
          this.form = _.cloneDeep(item);
          this.form.documentNumber = item.riderDocumentNumber
          this.credits = (this.form.credits||[]);
        },
        /**
         * handleFileSelection: Permitirá conservar el archivo elegido por el usuario
         *  para subirlo a Spaces después
        */
        async handleFileSelection(e){
          console.log('handleFileSelection')
          //Si la nueva selección tiene algún archivo seleccionado
          if(e.target.files.length > 0){
            //Guardamos el archivo y el nombre en variables separadas
            this.form.newImageFile = e.target.files[0]
            this.form.newFileName = e.target.files[0].name
            this.tempFileName = e.target.files[0].name

            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: 250, 
                height: 250, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    console.log('resp 22', resp)
                    ctx.form.newImageFile = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)
                })
          }
        },
        /**
         * uploadSelectedFile: Permitirá subir a Spaces el archivo seleccionado 
         * y colocar la url en la variable local
        */
        async uploadSelectedFile(){
          /**Variables generales:
           * urlSufix: Sufijo del archivo, define la ubicación final del archivo en Spaces
          */
          console.log('uploadSelectedFile')
          const urlSufix = 'news/'+ this.form.target +'/'
          //Declaramos y seteamos el formData con el archivo
          var formData = new FormData();
          formData.append('file',this.form.newImageFile)
          //Subimos el archivo al servidor web 
          var url = 'uploadAttachment?fileName=' + this.form.newFileName + '&urlSufix=' + urlSufix
          //Usamos el método fetch para consultar el servicio con opciones especiales
          await fetch(url, {
            method:'POST',
            body: formData
          })
          .then(async (response) => {
            if(response.ok) {
              await response.json().then(data => {
                if(data.error){
                  console.log('error del back: ', data.error)
                }else{
                  console.log('Se subió exitosamente: ', data.generatedUrl)
                  this.form.newFileUrl = data.generatedUrl
                }
              }).catch((error)=>{console.log('Error: ', error)})
            }else{
              console.log('No ok')
            }
          }).catch((error)=>{console.log('Error: ', error)})
        },
      }
  }
</script>
