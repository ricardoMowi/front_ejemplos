<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Administrar Especialidades Obstétricas </h1>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" data-toggle="modal" data-target=".master-modal" class="btn btn-success btn-xs" @click="showAddModal()"><i class="fa fa-plus"></i> Registrar especialidad  </button>
          </div>
        </div>
        <div class="clearfix"></div>
        <masterTemplate
          :searchHistory= "this.propsTemplateManangerOrder.searchHistory"
          :flagListFilters= "this.flagListFilters"
          :flagSearchHistory= "this.flagSearchHistory"
          :filters="propsTemplateManangerOrder.filters"     
          :setDataTable="this.setDataTable"
          :dataLoadFunction="this.getRecords"
          :header="colum"
          :useMassiveSelector="useMassiveSelector"          
          :customActions="propsTemplateManangerOrder.customActions"  
          :data="records"
          :tableTitle="titleTable"
          :flagUploadData="flagUploadData"      
          :progressBarValue="progressBarValue"          
          :loadSummary ="loadSummary"
          :showSearchSection="this.showSearchSection"
          :tableSearch="this.searchOptionTableMaf"
          :loadingComponentLabel="this.loadingComponentLabel"
          :loadingComponentClass="this.loadingComponentClass"
        ref="mowiMaster"/>


      </div>

      <!-- Modal ADD/EDIT -->
      <div class="modal fade master-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" >Nueva Especialidad</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" >Editar Especialdad</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-horizontal form-label-left">

                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Centro de salud:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="nameCenter" type="text" class="form-control col-md-12 col-xs-12" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Especialidad:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.name" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.description" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" @click="clearModal()" data-target=".master-modal" data-toggle="modal" class="btn btn-default">Cerrar</button>            
                <button v-if="formType=='ADD'" @click="createRecord()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateRecord()" type="button" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal Rotación Fin -->
      </div>
      <!--Modal Delete -->
      <div class="modal fade modal-delete" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-cat">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Desactivar Especialidad </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              Este cambio no se podrá revertir, ¿Seguro que quieres continuar y desactivar la especialidad seleccionada?
          </div>
          <div class="modal-footer">
              <center>
                  <button type="button" @click="closeModalSafety('.modal-delete')" class="btn btn-pink">Cerrar</button>
                  <button @click="deleteRecord()" data-dismiss="modal" type="button" class="btn btn-success">Aceptar</button>
              </center>
          </div>
          </div>
      </div>
      </div>
      <!--Modal not-->
      <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">
                <center>{{formNot.title}}</center>
              </h3>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <h4 class="modal-title">
                <center>{{formNot.message}}</center>
              </h4>
            </div>
            <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-success">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import consultServices from "./../utilities/consultServices.js"; //consulta servicios
import LoadingComponent from "./../components/loadingComponent.vue";
import TableMaf from "./../components/tableMaf.vue";
import inputMaf from "./../components/inputMaf.vue";
import SearchComponent from "./../components/searcherComponent.vue";
import masterTemplate from "./../components/masterComponents/masterTemplateContainer.vue";
//import ButtonUpload from "./../components/buttonUploadMasiveComponent.vue";
import moment from "moment"; //tiempos
import _ from 'lodash';
import masterTemplateComponent from "./../../../assets/component/index.js";

export default {
  name: "specialityManagementContainer",
  components: {
    LoadingComponent,
    TableMaf,
    inputMaf,
    SearchComponent,
    masterTemplate,
    masterTemplateComponent,
    //ButtonUpload
  },
  data: () => ({
    isLoading: false,
    formType:'ADD',
    //Datos
    nameCenter: 'Clínica Tu salud es Primero',
    idClinic:1,


    nameRole: null, //null, // || "",
    userCodeSession:null,//null, //INITIAL_STATE.userCode || "",
    orderReasonTypes: [],
    records: [
    ],
    
    progressBarValue: 0,
    nowStep:1,
    importData:[],
    loadSummary:[{
      total:5,
      successful:4,
      errors:1,
      detail:[],
    }],
    flagListFilters: false,
    flagSearchHistory: false,
    loadingComponentLabel:"Test de carga nuevo",
    loadingComponentClass:"captureClient_component-black_blanket",
    propsTemplateManangerOrder: {
    filters: [              
      {
        name:'specialityName',
        filterType:'inputComponent',
        type:"text",
        valueInput: "",
        etiqueta: true,
        label: "Especialidad",              
        validation:{required:false, min:3},
        callbackData:"",
        textArea:false,
        operators:true,
        selectField:true,
        isRequired :false,
        showOp: false,        
      },    
    ],
    searchHistory:[
    ],
    customActions: "Test boton filter",

    },
    form: {
      id: null,
      name: '',
      description: '',
      status: null,
      idClinic: null 
    },
    formNot: { title: "", message: "" },
    colum: [],
    useMassiveSelector:false,
    flagUploadData:false,
    titleTable: "",
    showSearchSection: true,    
    searchOptionTableMaf: true,
    initRowTable1:3,
    nameOfSheetTable1:'Template - Tabla 1',
  }),
  async mounted() {
    var ctx = this;
    this.setHeadTable(); 
    const response = await consultServices('listSpecialties','POST',{})
    this.$refs.mowiMaster.setInitialData(response)
    console.log('mounted', response)

  },
  methods: {

    setHeadTable() {
      (this.colum = [
      
        { label: "Código de Sistema", name: "orderCode", find: 1, sort: 1 },
        { label: "Especialidad", name: "name", find: 1, sort: 1 },
        { label: "Descripción", name: "description", find: 1, sort: 1 },
        { label: "Acciones", name: "actions", find: 0, sort: 0 },
      ]),
      (this.titleTable = "Especialidades activas ");
    },
    
    
    /**
    *  La función getRecords() es la encargada de la búsqueda de registros
    *  se envía al componente <masterTemplate> en la propiedad dataLoadFunction
    *  */ 
    async getRecords(selectedFilters) {
        console.log('ultimo paso ', selectedFilters)
        /**variables declaradas para el funcionamiento de la función */
        var filter={}
        /**declarar acá los parámetros necesarios para el servicio a utilizar
         * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
         */
        var statusDescription  =_.filter(selectedFilters,{'name':'statusDescription'});
        var nameContact  =_.filter(selectedFilters,{'name':'nameContact'});
        var orderCode  =_.filter(selectedFilters,{'name':'orderCode'});
        var dateComponent =_.filter(selectedFilters,{'name':'dateComponent'});
        /**obtener los valores y agregarlos en el objeto filter */

        // filter.orderCode = orderCode[0].value
        // filter.nameContact = nameContact[0].value
        // filter.statusDescription = statusDescription[0].value

        orderCode.length > 0 ?  filter.orderCode = orderCode[0].value : null
        nameContact.length > 0 ?  filter.nameContact = nameContact[0].value : null
        statusDescription.length > 0 ?  filter.statusDescription = statusDescription[0].value : null
        dateComponent.length > 0 ?  filter.dateComponent = dateComponent[0].value : null

        /**consultar servicio con el objeto filter  */
        //var look= await consultServices("test", "POST", filter);
        /**retornar el nuevo arreglo */
        console.log('filter final',filter)
        //return look    
    },
    /**
    *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
    *  el formato es definido por el programador
    *  se envía al componente <masterTemplate> en la propiedad setDataTable
    *  */ 
    setDataTable(arrayData){  
    console.log('entró acá a a setdata')  
      var ctx = this;
      var records = [];
      arrayData.forEach(item => {
        var order = {};
        order.actions = (
                    <div class="d-flex justify-content-around">
                        <div class="btn-group" role="group">
                            <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Acciones
                            </button>
                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <a class="dropdown-item" onClick={() => ctx.showEditModal(item)} >Editar</a>
                                <a class="dropdown-item" onClick={() => ctx.showDeleteModal(item)} data-toggle="modal">Desactivar</a>
                            </div>
                        </div>
                    </div>
        );
        order.orderCode = item._id;
        order.name = item.name;
        order.description = item.description;
        records.push(order);
        
      });     
      console.log('records:::::::::', records)
     return records 
    },


    refreshData(array) {
      console.log('refs',this.$refs )
      this.$refs.mowiMaster.setInitialData(array);
    },


    async createRecord(){
      console.log('form en create::::::::::', this.form)
      this.isLoading = true
      //validar campos completos 
      if(this.form.name != '' && this.form.name != null &&this.form.description != '' && this.form.description != null){
        //crear json 
        var newRecord = _.cloneDeep(this.form) 
        newRecord.status = true
        newRecord.idClinic = this.idClinic
        console.log('NewRecord::::::::', newRecord)
        
        var newCreate =  await consultServices('createSpeciality','POST',newRecord)       

        if(newCreate.message){
          this.formNot.title="Error en operación";
          this.formNot.message='No se pudo crear un nuevo registro' //newCreate.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message = "Registro creado";
          //actualizar lista
          this.clearForm()
          $('.modal').modal('hide');
          const response =  await consultServices('listSpecialties','POST',{})
          this.refreshData(response);
        }        
      }else{
        this.formNot.message="Por favor complete todos los campos del formulario";
        this.formNot.title="Campos incompletos"
      }
      this.isLoading = false
      this.showNotification()

    },
    async updateRecord(){
      console.log('form en create::::::::::', this.form)
      this.isLoading = true
      //validar campos completos 
      if(this.form.name != '' && this.form.name != null &&this.form.description != '' && this.form.description != null){
        //crear json 
        var updateRecord = _.cloneDeep(this.form) 
        updateRecord.status = true
        updateRecord.idClinic = this.idClinic
        console.log('NewRecord::::::::', updateRecord)
        var newCreate = await consultServices('updateSpeciality','POST',updateRecord);  
        if(newCreate.message){
          this.formNot.title="Error en operación";
          this.formNot.message='No se pudo actualizar el registro' //newCreate.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message = "Registro actualizado";
          //actualizar lista
          this.clearForm()
          $('.modal').modal('hide');
          const response =  await consultServices('listSpecialties','POST',{})
          this.refreshData(response);
        }        
      }else{
        this.formNot.message="Por favor complete todos los campos del formulario";
        this.formNot.title="Campos incompletos"
      }
      this.isLoading = false
      this.showNotification()
    },
    async deleteRecord(){
      this.isLoading = true;
      let record = {}
      record._id = this.form.id;
      const res = await consultServices('deleteSpeciality', 'POST', record);
      this.isLoading = false;
      if(res.message) {
        this.formNot.title = "La operación no fue posible";
        this.formNot.message = "No se pudo desactivar el registro";
      } else {
        this.formNot.title = "Operación exitosa";
        this.formNot.message = "Registro eliminado de forma exitosa";
        const response =  await consultServices('listSpecialties','POST',{})
        this.refreshData(response);
      }
      this.showNotification();
    },


    showEditModal(item){
        console.log('item ', item)        
        this.formType = 'EDIT'
        this.form.id = item._id
        this.form.name = item.name
        this.form.description = item.description
        this.form.status = item.status
        this.form.idClinic = this.id_clinic
        $('.master-modal').modal('show');
    },
    showDeleteModal(item){
      console.log('showDeleteModal:::::::::', item)
      this.form.id = item._id
			$('.modal-delete').modal('show');
    },
    clearForm(){
      this.form.id = null,
      this.form.name = ''
      this.form.description =  '',
      this.form.status =  null,
      this.form.idClinic = null 
    },
    async showNotification(){
        $('.bs-example-modal-not').modal('show');
    },
    showAddModal(){
      this.formType = 'ADD'
      this.clearForm()
    },
    closeModalSafety(css) {
        $(css).modal('hide');
    },
    
  }
};
</script>
<style scoped>
h1 {
  font-size: 1.25rem;
}
.master-template .collapse:not(.show) {
    display: block;
}
.master-template .collapse:not(.show) .card-body {
    padding-bottom: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-left: 0px;
}
</style>
