<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Mis créditos</h2>

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
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Detalle de crédito</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">

                <!-- <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type='text' v-model="form.riderDocumentNumber"  :valueInput='form.riderDocumentNumber' label="Núm. de documento de Rider: (*)" :validation="{required:true}" nameInput="documentNumber"  etiqueta='true' ref="documentNumber"/>           
                  </div>
                </div> -->

                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Núm. de documento de Rider:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <input readonly v-model="form.riderDocumentNumber" type="text" id="name" class="form-control" >
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Monto (S/):</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <input readonly v-model="form.amount" type="text" id="name" class="form-control" >
                  </div>
                </div>

                <!-- <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type="number" v-model="form.amount" :valueInput='form.amount'
                      label="Monto (S/): (*)" :validation="{required:true}" nameInput="amount" etiqueta='true' ref="amount"/>
                  </div>
                </div> -->

                <!-- <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Comprobante de la recarga</label>
                    <div class="col-md-6 col-sm-6 col-xs-12 " style="padding-left: 5px;padding-top: 5px;">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Elige la imagen</label>
                      </div>
                    </div>
                  </div>
                </div>              -->
                
                <div class="form-group" v-if="showDocument == true">
                  <div  class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Comprobante de la recarga:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12 " style="padding-top: 20px;">
                      <img v-bind:src="form.document.url" class="img-fluid" alt="Responsive image" width="400px">
                    </div>
                  </div>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
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
          id:window.INITIAL_STATE.id,
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
                    label:'Saldo pendiente de aprobación'
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
          showDocument: false,

      }),
      
      async created () {
        var ctx = this;
        this.credits = await this.getCredits()
        this.setHeadTable();
        // this.$refs.mowiMaster.runSearch() 
        this.$refs.mowiMaster.setInitialData(this.credits)
        this.form.url = "https://byclo-space.sfo2.digitaloceanspaces.com/riders/98986709/attachmentsfacturacompleta-viviralmaximo-660x330.png_1605296300604"
  		},
      
      methods: {
        deleteClient(index) {
        },
        setHeadTable() {
          this.colum = [
              // {name:'riderName', label: 'Nombre del Rider', find:1, sort:1},
              // {name:'riderPhone', label: 'Teléfono', find:1, sort:1},
              // {name:'riderDocumentNumber', label: 'Núm. de documento', find:1, sort:1},
              {name:'amount', label: 'Monto (S/)', find:1, sort:1},
              {name:'currentStatus', label: 'Estado', find:1, sort:1},
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
            credit.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showDetailModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Ver Más</a>                    
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
              var status  =_.filter(filters,{'name':'status'}); 
              /**obtener los valores y agregarlos en el objeto filter */
              if(status.length > 0 ) {status[0].value != ''  ?   filter.currentStatus = status[0].value : null} 
              filter.idRider = this.id
              console.log('filter obtenido ', filter)
              /**consultar servicio con el objeto filter  */
              var credits = await consultServices('searchCredits','POST',filter);   
          }else{
              /**consultar servicio con el objeto filter  */
              var credits = await consultServices('listCreditsByRider','POST',{_id:this.id });     
          }


          /**retornar el nuevo arreglo */
          return credits
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        
        /** 
         * setForm: Esta función sirve para seleccionar el item elegido para ejecutar
         * alguna acción como eliminar, editar, etc.
        */
        setForm(item) {
          // console.log('entré a setForm')
          this.form = _.cloneDeep(item);
        },

        limpiarForm() {
          this.form.amount="";
          this.form.documentNumber="";
        },
       
        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showDetailModal(item) {
          this.showDocument = false
          console.log('edit show', item)
          this.formType = "EDIT";
          this.form = _.cloneDeep(item);    
          if(item.document){
            this.showDocument = true
          }
          this.credits = (this.form.credits||[]);
        }
      }
  }
</script>
