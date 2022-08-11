<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Administrar Historias Clínicas Perinatal Base (HCPB) </h1>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="redirect('NEW_HCPB',0)" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Nueva HCPB</button>          
          </div>
        </div>
        <div class="clearfix"></div>
        <masterTemplate
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
          :showSearchSection="this.showSearchSection"
          :tableSearch="this.searchOptionTableMaf"
          :loadingComponentLabel="this.loadingComponentLabel"
          :loadingComponentClass="this.loadingComponentClass"
        ref="mowiMaster"/>   


      </div>
      <!--Modal Delete -->
      <div class="modal fade modal-delete" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Archivar HCPB </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Este cambio no se podrá revertir y no se podrá acceder a este registro después, ¿Seguro que quieres continuar y archivar el registro seleccionado?
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
      <!--Modal Asign -->
      <div class="modal fade modal-asign" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Asignar otro especialista al monitoreo de la HCPB </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               <div class="form-group ">
                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Especialista</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                          <input type="text" id="last-name" name="last-name" required="required" class="form-control col-md-12 col-sm-12"  v-model="formA.currentSp"  readonly>                  
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Buscar especialista</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">

                      <select class="form-control col-md-12 col-xs-12" v-model="formA.idSpecialist"  >
                          <option disabled value="">Seleccione un especialista </option>
                          <option v-for="(item,index) in specialists" :key="index" :value="item._id">{{item.lastName}} {{item.surName}} {{item.name}}</option>
                      </select>

                    </div>
                    </div>
                  </div> 
                </div>   
            </div>
            <div class="modal-footer">
                <center>
                    <button type="button" @click="closeModalSafety('.modal-asign')" class="btn btn-pink">Cerrar</button>
                    <button @click="asign()"  type="button" class="btn btn-success">Aceptar</button>
                </center>
            </div>
            </div>
        </div>
      </div>
      <!--Modal term -->
      <div class="modal fade modal-terminate" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Registrar término del embarazo y concluir el monitoreo </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               <div class="form-group ">
                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Gestante</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                          <input type="text" id="last-name" name="last-name" required="required" class="form-control col-md-12 col-sm-12"  v-model="formT.patientName"  readonly>                  
                    </div>
                    </div>
                  </div> 
                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                          <input type="text" id="last-name" name="last-name" required="required" class="form-control col-md-12 col-sm-12"  v-model="formT.documentNumber"  readonly>                  
                    </div>
                    </div>
                  </div> 
                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Edad gestacional</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                          <input type="text" id="last-name" name="last-name" required="required" class="form-control col-md-12 col-sm-12"  v-model="formT.gestationalAge"  readonly>                  
                    </div>
                    </div>
                  </div> 


                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de embarazo</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                        <select class="form-control col-md-12 col-xs-12"  v-model="formT.pregnancyType">
                            <option disabled value="">Seleccione una opción</option>
                            <option  value="1">Único</option>
                            <option  value="2">Multiple</option>
                        </select>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Terminación</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                        <select class="form-control col-md-12 col-xs-12"  v-model="formT.pregnancyTermination">
                            <option disabled value="">Seleccione una opción</option>
                            <option  value="1">Parto Vaginal</option>
                            <option  value="2">Cesárea</option>
                            <option  value="3">Aborto</option>
                            <option  value="4">Óbito</option>
                            <option  value="5">Ectópico</option>
                         </select>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Terminó con un parto pretérmino</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                        <select class="form-control col-md-12 col-xs-12"  v-model="formT.pretermBirth">
                            <option disabled value="">Seleccione una opción</option>
                            <option  value="1">Si</option>
                            <option  value="2">No</option>
                         </select>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de parto</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                        <Datepicker :format="DatePickerFormat" v-model="formT.dateOfBirth"></Datepicker>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Lugar de parto</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                       <textarea style="text-align: left" type="text" class="form-control" v-model="formT.placeOfBirth" ></textarea>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado del neonato</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                        <select class="form-control col-md-12 col-xs-12"  v-model="formT.neonateStatus">
                            <option disabled value="">Seleccione una opción</option>
                            <option  value="1">Vive</option>
                            <option  value="2">No vive</option>
                        </select>
                    </div>
                    </div>
                  </div> 

                  <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Observación</label>
                    <div class="col-md-7 col-sm-6 col-xs-12">
                      <textarea style="text-align: left"  placeholder="Registre tambien el nombre del bebé" type="text" class="form-control" v-model="formT.observation" ></textarea>
                    </div>
                    </div>
                  </div> 

                </div>   
            </div>
            <div class="modal-footer">
                <center>
                    <button type="button" @click="closeModalSafety('.modal-terminate')" class="btn btn-pink">Cerrar</button>
                    <button @click="validTerm()" type="button" class="btn btn-success">Aceptar</button>
                </center>
            </div>
            </div>
        </div>
      </div>
      <!--Modal termConfirm -->
      <div class="modal fade modal-termConfirm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Terminar el embarazo y concluir el monitoreo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Este cambio no se podrá revertir y no podrá editar los datos ni el estado de este registro después, ¿Seguro que quieres continuar y actualizar el registro seleccionado?
            </div>
            <div class="modal-footer">
                <center>
                    <button type="button" @click="closeModalSafety('.modal-termConfirm')" class="btn btn-pink">Cerrar</button>
                    <button @click="termRecord()" data-dismiss="modal" type="button" class="btn btn-success">Aceptar</button>
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
import moment from "moment"; 
import _ from 'lodash';
import masterTemplateComponent from "./../../../assets/component/index.js";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "HCPBsManagementContainer",
  components: {
    LoadingComponent,
    TableMaf,
    inputMaf,
    SearchComponent,
    masterTemplate,
    masterTemplateComponent,
    Datepicker,
  },
  data: () => ({
    DatePickerFormat: 'dd/MM/yyyy',
    isLoading: false,
    formType:'ADD',
    user:  window.INITIAL_STATE,
    nameRole: null, // || "",
    userCodeSession:null, //INITIAL_STATE.userCode || "",

    records: [
      //{HCPBCode:'1020', name:'Maria Elena Villafan Matos', documentNumber:'102030725',gestationalAge:3, phone:'99021353',registerDate:'2021-07-01 00:00:00.000',nextControlDate:'2021-08-01 00:00:00.000'},
      //{HCPBCode:'1021', name:'Sonia Bermudez ',documentNumber:'78030725', gestationalAge:2, phone:'99021000',registerDate:'2021-07-01 00:00:00.000',nextControlDate:'2021-08-01 00:00:00.000'}
    ],
        
    registerFields:[{name:'id',displayValue:'Identificador'}, {name:'phone', displayValue:'Teléfono'}],
    progressBarValue: 0,
    nowStep:1,
    flagListFilters: true,
    flagSearchHistory: false,
    loadingComponentLabel:"Test de carga nuevo",
    loadingComponentClass:"captureClient_component-black_blanket",
    propsTemplateManangerOrder: {
    filters: [              
      {
        name:'title',
        filterType:'inputComponent',
        type:"text",
        valueInput: "",
        etiqueta: true,
        label: "Título",              
        validation:{required:false, min:3},
        callbackData:"",
        textArea:false,
        operators:true,
        selectField:true,
        isRequired :false,
        showOp: false,        
      },      
    ],

    },
    form: {
      statusDescription: "",
      orderReasonTypeCode: "",
      addresseeCode: "",
      vendorCode: "",
      clientCode: "",
      countryCode: "",
      statusDownloadReport: ""
    },
    formNot: { message: "", title: "" },
    colum: [],
    useMassiveSelector:false,
    flagUploadData:false,
    titleTable: "",
    clients: [],
    showSearchSection: true,    
    searchOptionTableMaf: true,
    nameOfSheetTable1:'Template - Tabla 1',
    formA:{
      currentSp:null,
      id: null,
      idSpecialist: null
    },
    formT:{
      patientName: null,
      documentNumber: null,
      gestationalAge: null,
      pregnancyType: null,
      pregnancyTermination: null,
      pretermBirth: null,
      dateOfBirth: null,
      placeOfBirth: null,
      neonateStatus: null,
      observation: null,
    },
    specialists:[]
  }),
  async mounted() {
    var ctx = this;
    this.setHeadTable();
    const response = await consultServices('listHCPBs','POST',{})
    this.specialists = await consultServices('listSpecialists','POST',{})
    console.log('user::::::', this.user)
    //this.user.specialistDetail.isAdmin = false
    if(this.user.specialistDetail.isAdmin == false){
      var responseSp = []
      for (let i = 0; i < response.length; i++) {
         if(response[i].idSpecialist == this.user._id ){
           responseSp.push(response[i])
         }       
      }
      this.$refs.mowiMaster.setInitialData(responseSp)
    }else{
      this.$refs.mowiMaster.setInitialData(response)
    }
  },
  methods: {
    setHeadTable() {
      (this.colum = [      
        { label: "Código de HCPB", name: "HCPBCode", find: 1, sort: 1 },
        { label: "Documento de identidad", name: "documentNumber", find: 1, sort: 1 },
        { label: "Nombre", name: "fullName", find: 1, sort: 1 },
        { label: "Edad gestacional (semanas)", name: "gestationalAge", find: 1, sort: 1 },
        { label: "Número telefónico", name: "phone", find: 1, sort: 1 },
        { label: "Fecha registro", name: "registerDate", find: 1, sort: 1 },
        { label: "Próximo control", name: "nextControlDate", find: 1, sort: 1 },
        { label: "Estado", name: "status", find: 1, sort: 1 },
        { label: "Acciones", name: "actions", find: 0, sort: 0 },
      ]),
      (this.titleTable = "Historias Clinicas Perinatal Base ");
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
        console.log('item:::::::::::::', item)
        var order = {};
        
        order.status = (
              <div class="d-flex justify-content-around">
                {item.status == 'MONITORING'? <button  class="btn btn-success btn-xs"> En monitoreo </button> :null}
                {item.status == 'TERMINATED'? <button  class="btn btn-primary btn-xs"> Terminado </button> :null}
                {item.status == 'TERMINATED_PRETERM_BIRTH'?<button  class="btn btn-warning btn-xs"> Parto prematuro </button> :null}
              </div>
        );
        order.actions = (
              <div class="d-flex justify-content-around">
                  <div class="btn-group" role="group">
                      <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Acciones
                      </button>
                      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                          {ctx.user.specialistDetail.isAdmin == true && item.status == 'MONITORING'?  <a class="dropdown-item" onClick={() => ctx.showAsignModal(item) } >Asignar a otro especialista</a>:null}
                          <a class="dropdown-item" onClick={() => ctx.redirect('SHOW_HCPB',item._id )} >Ver HCPB</a>
                          {item.status == 'MONITORING'? <a class="dropdown-item" onClick={() => ctx.redirect('NEW_PC',item._id )} >Registrar control prenatal</a> :null}
                          {item.status == 'MONITORING'? <a class="dropdown-item" onClick={() => ctx.redirect('NEW_EMERGENCY',item._id)} >Registrar emergencia</a> :null}
                          {item.status == 'MONITORING'? <a class="dropdown-item" onClick={() => ctx.terminatePregnancy(item)} >Terminar el embarazo</a> :null}
                          <a class="dropdown-item" onClick={() => ctx.showDeleteModal(item)} data-toggle="modal">Archivar</a>
                      </div>
                  </div>
              </div>
        );
        order.HCPBCode = item._id;
        order.documentNumber = item.patient[0].documentNumber;

        var name= item.patient[0].name
        var lastName= item.patient[0].lastName
        var surName= item.patient[0].surName

        order.fullName = name + ' '+ lastName + ' '+ surName;
        
        var register =moment(item.creationDate)
        var today =moment()
        var difWeek = today.diff(register, 'week')
        console.log('register::::::::', register)
        console.log('today::::::::', today)
        console.log('difweek::::::::', difWeek)
        order.gestationalAge = item.gestationalAge + difWeek ;



        order.phone = item.patient[0].phone != ''? item.patient[0].phone: 'Pendiente de registro'  ;
        order.registerDate = moment(item.creationDate).format('DD/MM/YYYY');
        order.nextControlDate = 'Pendiente de asiganción'
        
        item.nextControlDate?    order.nextControlDate = moment(item.nextControlDate).format('DD/MM/YYYY') : null
        records.push(order);




      });     
     return records 
    },


    refreshData(array) {
      this.$refs.mowiMaster.setInitialData(array);
    },

    redirect(text, id){
      //window.location="/dashboard/HCPB";
      
      if(text=='SHOW_HCPB' && id!=0){
        window.open('/dashboard/HCPB?idHCPB='+id, '_blank');
      }
      if(text=='NEW_HCPB' && id==0){
        window.open('/dashboard/newHCPB', '_blank');
      }
      if(text=='NEW_PC' && id!=0){
        window.open('/dashboard/controlPrenatal?idHCPB='+id, '_blank');
      }
      if(text=='NEW_EMERGENCY' && id!=0){
        window.open('/dashboard/emergencia?idHCPB='+id, '_blank');
      }
      
    },
    async showNotification(){
        $('.bs-example-modal-not').modal('show');
    },
    closeModalSafety(css) {
        $(css).modal('hide');
    },
    async deleteRecord(){
      this.isLoading = true;
      let record = {}
      record._id = this.form.id;
      const res = await consultServices('deleteHCPB', 'POST', record);      
      if(res.message) {
        this.formNot.title = "La operación no fue posible";
        this.formNot.message = "No se pudo eliminar el registro";
      } else {
        this.formNot.title = "Operación exitosa";
        this.formNot.message = "Registro archivado de forma exitosa";
        const response =  await consultServices('listHCPBs','POST',{})
        
        if(this.user.specialistDetail.isAdmin == false){
          var responseSp = []
          for (let i = 0; i < response.length; i++) {
            if(response[i].idSpecialist == this.user._id ){
              responseSp.push(response[i])
            }       
          }
          this.refreshData(responseSp);
        }else{
          this.refreshData(response);
        }        
      }
      this.showNotification();
      this.isLoading = false;
    },
    async asign(){
      this.isLoading = true;
      if(this.formA.idSpecialist == null){
        alert('Debe seleccionar un especialista para la asignación')
      }else{
        let record = {}      
        record.id = this.formA.id;
        record.idSpecialist = this.formA.idSpecialist;
        console.log('formA:::::::',this.formA)
        const res = await consultServices('updateHCPB', 'POST', record);
        this.closeModalSafety('.modal-asign')
        this.isLoading = false;
        if(res.message) {
          this.formNot.title = "La operación no fue posible";
          this.formNot.message = "No se pudo asignar un nuevo especialista al monitero";
        } else {
          this.formNot.title = "Operación exitosa";
          this.formNot.message = "Asignación realizada de forma exitosa";
          const response =  await consultServices('listHCPBs','POST',{})
          this.refreshData(response);        
        }
        this.showNotification();
      }
      this.isLoading = false
    },
    showDeleteModal(item){
      console.log('showDeleteModal:::::::::', item)
      this.form.id = item._id
			$('.modal-delete').modal('show');
    },
    showAsignModal (item){   
      console.log('showAsignModal:::::::::', item)
      this.formA.currentSp = 'Pendiente de asignación'
      this.formA.idSpecialist = null
      this.formA.id = item._id
      var record = this.specialists.find((d) => d._id == item.idSpecialist);
      if(record != undefined){
        this.formA.currentSp = record.lastName + ' '+ record.surName +' '+ record.name
      }
      
			$('.modal-asign').modal('show');
    },
    async terminatePregnancy (item){
      console.log('item::::::::', item)
      this.formT.patientName = null
      this.formT.documentNumber = null
      this.formT.gestationalAge = null
      this.formT.pregnancyType = null
      this.formT.pregnancyTermination = null
      this.formT.pretermBirth = null
      this.formT.dateOfBirth = null
      this.formT.placeOfBirth = null
      this.formT.neonateStatus = null
      this.formT.observation = null
      this.formT._id = item._id
      console.log('terminatePregnancy:::::::::', item)     
      var data0 = await consultServices('showHCPB','POST',{_id:item._id }) 
      this.formT.patientName = data0.patientDetail.lastName +' '+ data0.patientDetail.surName +' '+ data0.patientDetail.name 
      this.formT.documentNumber = data0.patientDetail.documentNumber
      this.formT.gestationalAge = item.gestationalAge
			$('.modal-terminate').modal('show');
    },
    validTerm(){
      console.log('formt', this.formT)
      if(
          this.formT.patientName == null || this.formT.documentNumber == null || this.formT.gestationalAge == null ||
          this.formT.pregnancyType == null || this.formT.pregnancyTermination == null || this.formT.pretermBirth == null ||
          this.formT.dateOfBirth == null ||   this.formT.placeOfBirth == null || this.formT.neonateStatus == null ||   this.formT.observation == null ||
          this.formT.observation == '' || this.formT.placeOfBirth == ''
      ){
        alert('Debe completar todos los campos del formulario para registrar el término del proceso de embarazo')
      }else{
        $('.modal-termConfirm').modal('show');
      }
    },
    async termRecord(){
      this.isLoading = true;
      var record = _.cloneDeep(this.formT)
      record._id = this.formT._id;
      const res = await consultServices('terminatedHCPB', 'POST', record);      
      if(res.message) {
        this.formNot.title = "La operación no fue posible";
        this.formNot.message = "No se pudo actualizar el registro";
      } else {
        this.formNot.title = "Operación exitosa";
        this.formNot.message = "Registro actualizado de forma exitosa";
        const response =  await consultServices('listHCPBs','POST',{})
        
        if(this.user.specialistDetail.isAdmin == false){
          var responseSp = []
          for (let i = 0; i < response.length; i++) {
            if(response[i].idSpecialist == this.user._id ){
              responseSp.push(response[i])
            }       
          }
          this.refreshData(responseSp);
        }else{
          this.refreshData(response);
        }  
        this.closeModalSafety('.modal-terminate')      
      }

      this.showNotification();
      this.isLoading = false;
    }

  }
};
</script>
<style scoped>
h1 {
  font-size: 1.25rem;
}
</style>
