<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Administrar Especialistas Obstétricos </h1>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" data-toggle="modal" data-target=".master-modal" class="btn btn-success btn-xs" @click="showAddModal()"><i class="fa fa-plus"></i> Registrar especialista  </button>
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
          :registerFields="registerFields"          
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
              <h3 v-if="formType=='ADD'" class="modal-title" >Nuevo Especialista</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" >Editar Especialista</h3>
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
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.name" onkeypress="return event.charCode >= 65 || event.charCode == 32" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Paterno:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.lastName" onkeypress="return event.charCode >= 65 || event.charCode == 32" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Materno:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.surName" onkeypress="return event.charCode >= 65 || event.charCode == 32" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.documentNumber"  maxlength="8" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5"   v-model="form.birthdate"  ></Datetime>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de vivienda:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control col-md-12 col-xs-12" v-model="form.idDistrict" >
                                <option disabled value="">Seleccione un distrito</option>
                                <option v-for="(item,index) in districts" :key="index" :value="item.id">{{item.name}}</option>
                            </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección domiciliaria:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.address" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Correo electrónico:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.email" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono/celular:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.phone" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de colegiatura:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.colegiatureNumber"  maxlength="6" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Es administrador?</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <select v-model="form.isAdmin" class="form-control col-md-12 col-xs-12" >
                              <option disabled value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Especialidades:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <treeselect v-model="form.specialtiesArray"
                      :disable-branch-nodes="true"
                      :value-consists-of="valueConsistsOf"
                      :multiple="true"
                      :options="specialties" />
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Desactivar Especialista </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              Este cambio no se podrá revertir, ¿Seguro que quieres continuar y desactivar el registro seleccionado?
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
      <!--Modal not-->



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
import moment from "moment"; //tiempos
import _ from 'lodash';
import masterTemplateComponent from "./../../../assets/component/index.js";  
import Treeselect, { ASYNC_SEARCH } from '@riophae/vue-treeselect';
import { Datetime } from 'vue-datetime';

export default {
  name: "specialistsManagementContainer",
  components: {
    LoadingComponent,
    TableMaf,
    inputMaf,
    SearchComponent,
    masterTemplate,
    masterTemplateComponent,
    Treeselect,
    Datetime,

  },
  data: () => ({
    isLoading: false,
    formType:'ADD',
    //Datos
    nameCenter: 'Clínica Tu salud es Primero',
    idClinic:1,
    valueConsistsOf: 'LEAF_PRIORITY',
    specialties:[
      ],


    nameRole: null, // || "",
    userCodeSession:null, //INITIAL_STATE.userCode || "",
   
    records: [    
    ],

    registerFields:[{name:'id',displayValue:'Identificador'}, {name:'phone', displayValue:'Teléfono'}],    
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
        name:'documentNumber',
        filterType:'inputComponent',
        type:"text",
        valueInput: "",
        etiqueta: true,
        label: "Documento de identidad",              
        validation:{required:false, min:3},
        callbackData:"",
        textArea:false,
        operators:true,
        selectField:true,
        isRequired :false,
        showOp: false,        
      },      
    ],
    customActions: "Test boton filter",

    },
    form: {
      name:'',
      lastName:'',
      surName:'',
      documentNumber:'',
      phone:'',
      email:'',
      birthdate:'',
      idDistrict:'',
      address:'',
      colegiatureNumber:'',
      isAdmin:null,
      specialtiesArray:[]
    },
    formNot: { message: "", title: "" },
    colum: [],
    useMassiveSelector:false,
    flagUploadData:false,
    titleTable: "",
    clients: [],
    showSearchSection: true,    
    searchOptionTableMaf: true,
    districts:[
        {id: 1251,name:'LIMA'},
        {id: 1252,name:'ANCON'},
        {id: 1253,name:'ATE'},
        {id: 1254,name:'BARRANCO'},
        {id: 1255,name:'BREÑA'},
        {id: 1256,name:'CARABAYLLO'},
        {id: 1257,name:'CHACLACAYO'},
        {id: 1258,name:'CHORRILLOS'},
        {id: 1259,name:'CIENEGUILLA'},
        {id: 1260,name:'COMAS'},
        {id: 1261,name:'EL AGUSTINO'},
        {id: 1262,name:'INDEPENDENCIA'},
        {id: 1263,name:'JESUS MARIA'},
        {id: 1264,name:'LA MOLINA'},
        {id: 1265,name:'LA VICTORIA'},
        {id: 1266,name:'LINCE'},
        {id: 1267,name:'LOS OLIVOS'},
        {id: 1268,name:'LURIGANCHO'},
        {id: 1269,name:'LURIN'},
        {id: 1270,name:'MAGDALENA DEL MAR'},
        {id: 1271,name:'MAGDALENA VIEJA'},
        {id: 1272,name:'MIRAFLORES'},
        {id: 1273,name:'PACHACAMAC'},
        {id: 1274,name:'PUCUSANA'},
        {id: 1275,name:'PUENTE PIEDRA'},
        {id: 1276,name:'PUNTA HERMOSA'},
        {id: 1277,name:'PUNTA NEGRA'},
        {id: 1278,name:'RIMAC'},
        {id: 1279,name:'SAN BARTOLO'},
        {id: 1280,name:'SAN BORJA'},
        {id: 1281,name:'SAN ISIDRO'},
        {id: 1282,name:'SAN JUAN DE LURIGANCHO'},
        {id: 1283,name:'SAN JUAN DE MIRAFLORES'},
        {id: 1284,name:'SAN LUIS'},
        {id: 1285,name:'SAN MARTIN DE PORRES'},
        {id: 1286,name:'SAN MIGUEL'},
        {id: 1287,name:'SANTA ANITA'},
        {id: 1288,name:'SANTA MARIA DEL MAR'},
        {id: 1289,name:'SANTA ROSA'},
        {id: 1290,name:'SANTIAGO DE SURCO'},
        {id: 1291,name:'SURQUILLO'},
        {id: 1292,name:'VILLA EL SALVADOR'},
        {id: 1293,name:'VILLA MARIA DEL TRIUNFO'},
    ],
  }),
  async mounted() {
    var ctx = this;
    this.setHeadTable();
    this.arrayForTree();
    const response = await consultServices('listSpecialists','POST',{})
    this.$refs.mowiMaster.setInitialData(response)
  },
  methods: {

    async arrayForTree(){
      const response =  await consultServices('listSpecialties','POST',{})
      var optionsTree = []

      for (var j = 0; j <response.length; j++) {
        var obj={}
        obj.id = response[j]._id
        obj.label = response[j].name
        optionsTree.push(obj)
      }

      this.specialties = _.cloneDeep(optionsTree)
    },
    setHeadTable() {
      (this.colum = [
      
        { label: "Documento de identidad", name: "documentNumber", find: 1, sort: 1 },
        { label: "Nombre Completo", name: "fullName", find: 1, sort: 1 },
        { label: "Especialidades obstétricas", name: "speciality", find: 1, sort: 1 },
        { label: "Número telefónico", name: "phone", find: 1, sort: 1 },
        { label: "Correo", name: "email", find: 1, sort: 1 },
        { label: "N° de colegiatura", name: "colegiatureNumber", find: 1, sort: 1 },
        { label: "Estado laboral", name: "status", find: 1, sort: 1 },
        { label: "Acciones", name: "actions", find: 0, sort: 0 },
      ]),
      (this.titleTable = "Especialistas ");
    },
       
    
    /**
    *  La función getRecords() es la encargada de la búsqueda de registros
    *  se envía al componente <masterTemplate> en la propiedad dataLoadFunction
    *  */ 
    async getRecords(selectedFilters) {
        console.log('ultimo apso ', selectedFilters)
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
      var ctx = this;
      var records = [];
      arrayData.forEach(item => {
        console.log('item:::::::::::::::::::', item)
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
        order.documentNumber = item.documentNumber;
        order.fullName = item.name +' '+item.lastName+ ' '+item.surName;

        var concatSpe = ''
        for (var i = 0; i < item.specialistDetail.specialtiesArray.length; i++) {
            var record = _.find(this.specialties, (item0) => { return item.specialistDetail.specialtiesArray[i] == item0.id });
            concatSpe += record.label+', '          
        }
        var sSubCadena = concatSpe.substring(0,concatSpe.length-2)
        order.speciality = sSubCadena;

        order.phone = item.phone;
        order.email = item.email;
        order.colegiatureNumber = item.specialistDetail.colegiatureNumber;
        order.status = 'Activo'
        records.push(order);
      });     
     return records 
    },
    refreshData(array) {
      this.$refs.mowiMaster.setInitialData(array);
    },
    async createRecord(){
      console.log('form en create::::::::::', this.form)
      this.isLoading = true
      //validar campos completos 
      if(
        this.form.name != '' && this.form.name != null &&
        this.form.lastName != '' && this.form.lastName != null &&
        this.form.surName != '' && this.form.surName != null &&
        this.form.documentNumber != '' && this.form.documentNumber != null &&
        this.form.birthdate != '' && this.form.birthdate != null &&
        this.form.idDistrict != '' && this.form.idDistrict != null &&
        this.form.address != '' && this.form.address != null &&
        this.form.colegiatureNumber != '' && this.form.colegiatureNumber != null &&
        this.form.isAdmin != null &&
        this.form.phone != '' && this.form.phone != null && 
        this.form.email != '' && this.form.email != null 
      ){
        if(this.form.specialtiesArray.length == 0){
              this.formNot.title="Campos incompletos"
              this.formNot.message = "Por favor selecciones al menos una especialidad para registrar un especialista";
        }else{     
            if(this.form.documentNumber.length != 8 ){
              this.formNot.title="Campo no válido"
              this.formNot.message = "El número de documento de identidad no es válido";
              this.isLoading = false
              this.showNotification()
              return false  
            }
            if(this.form.colegiatureNumber.length != 6){
              this.formNot.title="Campo no válido"
              this.formNot.message = "El número de colegiatura no es válido";     
              this.isLoading = false
              this.showNotification()
              return false  
            }
            //validar que no se repitan email, dni y num de colegiatura
            var validateForm = {}
            validateForm.email = this.form.email
            validateForm.colegiatureNumber = this.form.colegiatureNumber
            validateForm.documentNumber = this.form.documentNumber

            var validate = await consultServices('validateUser','POST',validateForm);  
            if(validate == true){
                //crear json 
                var newRecord = _.cloneDeep(this.form) 
                newRecord.status = true
                newRecord.idClinic = this.idClinic
                console.log('NewRecord::::::::', newRecord)
                var newCreate = await consultServices('createSpecialist','POST',newRecord);  
                if(newCreate.message){
                  this.formNot.title="Error en operación";
                  this.formNot.message='No se pudo crear un nuevo registro' //newCreate.message;
                }else{
                  this.formNot.title="Operación exitosa";
                  this.formNot.message = "Registro creado";
                  //actualizar lista
                  this.clearForm()
                  $('.modal').modal('hide');
                  const response =  await consultServices('listSpecialists','POST',{})
                  this.refreshData(response);
                } 
            }else{
                  this.formNot.title="Error registrado nuevo especialista";
                  this.formNot.message = validate.message
            }  
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
      if(
        this.form.name != '' && this.form.name != null &&
        this.form.lastName != '' && this.form.lastName != null &&
        this.form.surName != '' && this.form.surName != null &&
        this.form.documentNumber != '' && this.form.documentNumber != null &&
        this.form.birthdate != '' && this.form.birthdate != null &&
        this.form.phone != '' && this.form.phone != null &&
        this.form.email != '' && this.form.email != null &&
        this.form.idDistrict != '' && this.form.idDistrict != null &&
        this.form.address != '' && this.form.address != null &&
        this.form.colegiatureNumber != '' && this.form.colegiatureNumber != null &&
        this.form.isAdmin != null 
      ){
        //crear json 
        var updateRecord = _.cloneDeep(this.form) 
        updateRecord.status = true
        updateRecord.idClinic = this.idClinic
        console.log('NewRecord::::::::', updateRecord)
        var newCreate = await consultServices('updateSpecialist','POST',updateRecord);  
        if(newCreate.message){
          this.formNot.title="Error en operación";
          this.formNot.message='No se pudo actualizar el registro' //newCreate.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message = "Registro actualizado";
          //actualizar lista
          this.clearForm()
          $('.modal').modal('hide');
          const response =  await consultServices('listSpecialists','POST',{})
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
      const res = await consultServices('deleteSpecialist', 'POST', record);
      this.isLoading = false;
      if(res.message) {
        this.formNot.title = "La operación no fue posible";
        this.formNot.message = "No se pudo desactivar el registro";
      } else {
        this.formNot.title = "Operación exitosa";
        this.formNot.message = "Registro eliminado de forma exitosa";
        const response =  await consultServices('listSpecialists','POST',{})
        this.refreshData(response);
      }
      this.showNotification();
    },
    showEditModal(item){
        console.log('item ', item)        
        this.formType = 'EDIT'
        this.form.id = item._id
        this.form.documentNumber = item.documentNumber
        this.form.name = item.name
        this.form.lastName = item.lastName
        this.form.surName = item.surName
        this.form.name = item.name
        this.form.birthdate = item.birthdate
        this.form.idDistrict = item.idDistrict
        this.form.address = item.address

        this.form.isAdmin = item.specialistDetail.isAdmin
        this.form.specialtiesArray = item.specialistDetail.specialtiesArray
        this.form.phone = item.phone
        this.form.email = item.email
        this.form.colegiatureNumber = item.specialistDetail.colegiatureNumber
        this.form.status = item.active

        $('.master-modal').modal('show');
    },
    showDeleteModal(item){
      console.log('showDeleteModal:::::::::', item)
      this.form.id = item._id
			$('.modal-delete').modal('show');
    },
    clearForm(){
      this.form.id = null,
      this.form.name='',
      this.form.lastName='',
      this.form.surName='',
      this.form.documentNumber='',
      this.form.email= '',
      this.form.phone= '',
      this.form.birthdate='',
      this.form.idDistrict='',
      this.form.address='',
      this.form.colegiatureNumber='',
      this.form.isAdmin=null,
      this.form.specialtiesArray=[]
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
</style>
