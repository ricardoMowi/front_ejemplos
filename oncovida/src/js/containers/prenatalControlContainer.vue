<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Control prenatal </h1>
        </div>
        <div class="clearfix"></div>

        <fieldset class="scheduler-border">
            <legend class="scheduler-border">I. Datos generales del Control Prenatal</legend>        
            <form  class="form-horizontal " >   
              <div class="row">     
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Documento Nacional de Identidad
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" class="form-control" v-model="pregnant.documentNumber"  readonly>
                    </div>
                  </div>                            
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Nombre de la paciente
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="first-name" required="required" class="form-control "  v-model="pregnant.fullName" readonly>
                    </div>
                  </div>
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Edad
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="pregnant.age"  readonly>
                    </div>
                  </div>   
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Dirección domiciliaria
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="pregnant.address" readonly>
                    </div>
                  </div>    
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fecha de control prenatal</label>
                    <div class="col-md-6 col-sm-6 ">
                      <Datepicker :format="DatePickerFormat"   v-model="form.dateAttention"></Datepicker>                      
                    </div>
                  </div>    
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fecha del próximo control prenatal</label>
                    <div class="col-md-6 col-sm-6 ">
                      <Datepicker :format="DatePickerFormat"   v-model="form.nextControlDate"></Datepicker>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Número de control
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  class="form-control"  v-model="form.numberControl"  readonly>
                    </div>
                  </div>    
              </div>
            </form>
        </fieldset>

        <fieldset class="scheduler-border">
            <legend class="scheduler-border">II. Evaluación de la gestante</legend>        
            <form  class="form-horizontal " >   
              <div class="row">     
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Peso Actual
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57"
                       required="required" class="form-control" v-model="form.actualWeight" @change="calIMC()"  >
                    </div>
                  </div> 
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Presión sistólica </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="first-name" required="required" class="form-control"  pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="form.systolicPressure" >
                    </div>
                  </div>                           
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Ganancia de peso
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="first-name" required="required" class="form-control "  v-model="form.weightGain" readonly>
                    </div>
                  </div>
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Presión diastólica
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  class="form-control"  v-model="form.diastolicPressure"  >
                    </div>
                  </div>   
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Índice de masa corporal (IMC)
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="form.imc"  readonly>
                    </div>
                  </div>   
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Pulso
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  class="form-control"   v-model="form.pulse" >
                    </div>
                  </div> 
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Temperatura
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"   v-model="form.temperature" >
                    </div>
                  </div>
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Frecuencia respiratoria
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"    v-model="form.breathingFrequency" >
                    </div>
                  </div> 
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Altura uterina
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"    v-model="form.uterineHeight" >
                    </div>
                  </div>    
                  <div class="item col-md-6 col-sm-12 form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Edad gestacional 
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"    v-model="form.gestationalAge" >
                    </div>
                  </div>                     
              </div>
            </form>
        </fieldset>

        <fieldset class="scheduler-border">
            <legend class="scheduler-border">III. Evaluación del feto</legend>        
            <form  class="form-horizontal " >   
                  
              <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                  <h2>Complete una fila por feto en caso de embarazo múltiple </h2>
                  <button type="button" @click="addFetus()" class="btn btn-success btn-xs float-right">Nueva fila</button>  
                  <div id="idAntFamiliares" class="card-body" >
                    <div class="table-responsive" style="max-height: 400px;">
                      <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                      <thead>
                        <tr >
                          <th style="width: 15%; text-align: center;vertical-align: middle;">FCF</th>
                          <th style="width: 20%;text-align: center;vertical-align: middle;">Situación</th>
                          <th style="width: 20%; text-align: center;vertical-align: middle;">Presentación del feto</th>
                          <th style="width: 20%; text-align: center;vertical-align: middle;">Posición</th>
                          <th style="width: 20%; text-align: center;vertical-align: middle;">Observación</th>
                          <th style="width: 20%; text-align: center;vertical-align: middle;">Eliminar</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in fetuses" style="background-color: rgba(0, 0, 0, 0.05);  min-width: 50px;" >
                          <td ><input v-model="item.fcf" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" style="text-align: left" type="text" class="form-control" ></td>    
                          <td >
                              <select class="form-control col-md-12 col-xs-12"  v-model="item.situationFetus">
                                  <option disabled value="">Seleccione una opción</option>
                                  <option  value="1">Longitudinal</option>
                                  <option  value="2">Transversal</option>
                              </select> 
                          </td>
                          <td >
                              <select class="form-control col-md-12 col-xs-12"  v-model="item.presentationFetus">
                                      <option disabled value="">Seleccione una opción</option>
                                      <option  value="1">Cefálico</option>
                                      <option  value="2">Podálico</option>
                              </select> 
                          </td>       
                          <td >
                              <select class="form-control col-md-12 col-xs-12"  v-model="item.positionFetus">
                                      <option disabled value="">Seleccione una opción</option>
                                      <option  value="1">Derecho</option>
                                      <option  value="2">Izquierdo</option>
                              </select> 
                          </td>                
                          <td ><textarea v-model="item.observation" style="text-align: left" type="text" class="form-control" ></textarea></td>
                          <td ><button type="button" @click="removeRegister(index)" class="btn btn-danger btn-xs">Eliminar</button></td>   
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  </div>
              </div>

            </form>
        </fieldset>        

        <fieldset class="scheduler-border">
            <legend class="scheduler-border">IV. Diagnóstico y recomendaciones</legend>        
            <form  class="form-horizontal " >   
              <div class="row">     
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del sistema
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <input type="text" id="last-name" v-model="form.systemDiagnosis" name="last-name" required="required" class="form-control" readonly>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Especialista encargado del control
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <input type="text" id="last-name" v-model="form.nameSpecialist" name="last-name" required="required" class="form-control" readonly>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del especialista
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <textarea type="text" id="last-name" v-model="form.finalDiagnosis " name="last-name" required="required" class="form-control" > </textarea>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Recomendaciones
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <textarea type="text" id="last-name" name="last-name" v-model="form.recommendations" required="required" class="form-control" > </textarea>
                    </div>
                  </div> 
  
              </div>
            </form>
            <div class="modal-footer">
              <center>
                <button type="button" @click="getSystemDiagnosis()" data-dismiss="modal" class="btn btn-success">Solicitar diganóstico del sistema</button>
              </center>
            </div>    
        </fieldset>     

        <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                <button type="button" @click="createControl()" data-dismiss="modal" class="btn btn-success">Registrar</button>
              </center>
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
              <div v-if="formNot.title == 'Campos incompletos'" style="padding-top: 20px; padding-left: 15px;">
                  <tr v-for="(item,index) in arrayComplete" >
                    <td >{{item}}</td>    
                  </tr>
              </div>
            </div>
            <div class="modal-footer">
              <center>
                <button v-if="formNot.message == 'Registro creado'" @click="redirect('HCPB',idHCPB)" type="button" data-dismiss="modal" class="btn btn-success">Aceptar y ver HCPB</button>
                <button v-else type="button" data-dismiss="modal" class="btn btn-success">Aceptar</button>
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
//import ButtonUpload from "./../components/buttonUploadMasiveComponent.vue";
import moment from "moment"; //tiempos
import _ from 'lodash';
import masterTemplateComponent from "./../../../assets/component/index.js";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "controlsManagementContainer",
  components: {
    LoadingComponent,
    TableMaf,
    inputMaf,
    SearchComponent,
    masterTemplate,
    masterTemplateComponent,
    Datepicker,
    //ButtonUpload
  },
  data: () => ({
    user : window.INITIAL_STATE,
    DatePickerFormat: 'dd/MM/yyyy',
    isLoading: false,
    formType:'ADD',
    //
    idHCPB: null,
    pregnantHeight: null,
    pregnantWeight:null,
    pregnant:{
      documentNumber : null,
      fullName: null,
      age: null,
      address: null,
      attentionDate: null,
    },  
    fetuses:[],
    form: {
      nextControlDate: null,
      dateAttention: null,   
      actualWeight: null,     
      weightGain   : null,
      imc   : null,
      temperature   : null,
      systolicPressure   : null,
      diastolicPressure   : null,
      uterineHeight   : null,
      breathingFrequency   : null,
      systemDiagnosis   : null,
      finalDiagnosis :   null,
      numberControl   : null,
      recommendations : null,
      fetusesDetail :[],
      idHCPB : null,
      idSpecialist : null,
      active: null,
      nameSpecialist:null,
    },
    formNot: { message: "", title: "" },
    HCPB:{},
  }),
  async created() {
    var ctx = this;
    var urlParams = new URLSearchParams(window.location.search);
    this.idHCPB = urlParams.get('idHCPB')
    this.form.nameSpecialist = this.user.lastName +' '+ this.user.surName +' '+ this.user.name 
    this.form.systemDiagnosis = 'Pendiente de diagnóstico'
    var data = await consultServices('showHCPB','POST',{_id:this.idHCPB })
    this.HCPB = data.hcpb
    //Cargar datos de la paciente
    this.pregnant.documentNumber = data.patientDetail.documentNumber
    this.pregnant.fullName = data.patientDetail.name +' '+data.patientDetail.lastName +' '+data.patientDetail.surName
    this.pregnant.attentionDate =  moment()
    this.pregnant.address = data.patientDetail.address
    var birth = data.patientDetail.birthdate
    var now = moment()
    var difCurrent= now.diff(birth, 'years')
    this.pregnant.age = difCurrent
    this.pregnantHeight = data.hcpb.pregnantHeight 
    this.pregnantWeight =  data.hcpb.pregnantWeight
    this.form.numberControl = data.hcpb.currentControl + 1
    this.pathologyH = data.hcpb.medicalHistory
  },
  methods: {
    async showNotification() {
      $(".bs-example-modal-not").modal("show");
    },
    addFetus(){
      var fetus={
        fcf : null,
        situationFetus: null,
        presentationFetus: null,
        positionFetus: null,
        observation: null,
      }
      this.fetuses.push(fetus)
    },
    removeRegister(index){
      console.log('index selected ', index)
      this.fetuses.splice(index, 1);
    },
    calIMC(){
      this.form.actualWeight = parseFloat(this.form.actualWeight).toFixed(2) 
      this.form.weightGain = ((parseFloat(this.form.actualWeight)).toFixed(2) -  (parseFloat(this.pregnantWeight)).toFixed(2)).toFixed(2)
      var pesoActual = parseFloat(this.form.actualWeight)
      var altura2 = Math.pow( parseFloat(this.pregnantHeight/100), 2)
      this.form.imc = (pesoActual/altura2).toFixed(2)
    },
    validationComplete(){

      var isIncomplete = true
      var dateComplete = true
      var pregnantEvaluationComplete = true
      var fetusesEvaluationComplete = true
      var diagnosisComplete = true


      console.log('validación')
      console.log('idHCPB', this.idHCPB)
      console.log('control', this.form)
      console.log('fetuses',this.fetuses)
      console.log('::::::::::::::::::::::::')


      //sección fechas
      if(this.form.nextControlDate == null || this.form.dateAttention == null || this.form.numberControl == null) {
        dateComplete = false 
        isIncomplete = false
      }      
      //sección gestante
      if(
        this.form.actualWeight ==  null ||      
        this.form.weightGain  == null ||
        this.form.imc  == null ||
        this.form.temperature  == null ||
        this.form.systolicPressure  == null ||
        this.form.diastolicPressure  == null ||
        this.form.pulse  == null ||
        this.form.breathingFrequency  == null ||
        this.form.uterineHeight  == null
      ){
        pregnantEvaluationComplete = false
        isIncomplete = false
      }
      //sección fetos: fetuses
      if(this.fetuses.length == 0){
        fetusesEvaluationComplete = false
        isIncomplete = false
      }
      for (var i = 0; i < this.fetuses.length; i++) {
          var objeto=  this.fetuses[i]
          for (var key in objeto) {
            if(objeto[key] === null ){  
               fetusesEvaluationComplete = false
               isIncomplete = false
            }           
          }
      }
      //sección Diagnóstico y recomendaciones
      if(
        this.form.finalDiagnosis == null || this.form.recommendations  == null
      ){
        diagnosisComplete = false
        isIncomplete = false
      }


      var validationF = {complete: true, listVal: []}

      if(isIncomplete == false){
        var text= 'Campos incompletos, debe completar las siguientes secciones para registrar una nueva HCPB'
        var incompleteArray = []
        console.log('pregnantEvaluationComplete', pregnantEvaluationComplete)
        console.log('fetusesEvaluationComplete', fetusesEvaluationComplete)
        console.log('diagnosisComplete', diagnosisComplete)
        console.log('dateComplete', dateComplete)
        console.log('isIncomplete', isIncomplete)

        dateComplete == false ? incompleteArray.push('*Sección Datos generales del Control Prenatal') :null
        pregnantEvaluationComplete == false ? incompleteArray.push('*Sección Evaluación de la gestante')  :null
        fetusesEvaluationComplete == false ? incompleteArray.push('*Sección Evaluación del feto') :null
        diagnosisComplete == false ? incompleteArray.push('*Sección Diagnóstico y recomendaciones') :null

        validationF.complete = false
        validationF.listVal = incompleteArray
        
      }
      return validationF
    },
    async getSystemDiagnosis(){

      var formD = {}
    
      formD.age= this.pregnant.age >= 20 && this.pregnant.age <= 34 ? 0 : 1 
      formD.gestationalAge= this.form.gestationalAge >= 25 ? 1 : 0
      formD.nControls= this.form.numberControl
      formD.firstControl = 0
      formD.previousPreterm = parseInt(this.HCPB.previousPretermPregnancy)
      formD.mpregnancy= parseInt(this.HCPB.multiplePregenancy)
      formD.shortUterineNeck= parseInt(this.HCPB.shortUterineNeck)
      formD.diabetes= 0
      formD.hypertension= 0
      formD.obesity = 0
      for (let index = 0; index < this.pathologyH.length; index++) {
        if(this.pathologyH[index].description == 'Diabetes'){ formD.diabetes= 1}
        if(this.pathologyH[index].description == 'Hipertensión'){ formD.hypertension= 1}
        if(this.pathologyH[index].description == 'Obesidad'){ formD.obesity= 1}        
      }
      formD.highStressLevel = parseInt(this.HCPB.highStressLevel)    
      console.log('formD:::::::::::', formD)
      //var initialD = await consultServices('classifyPregnancy','POST',formD);  
      //var initialC = initialD.codePregnancy
      var diagnosis= 'low_risk_of_preterm_birth'
      if(formD.age == 1 && formD.previousPreterm == 1 && formD.shortUterineNeck == 1  ){diagnosis = 'high_risk_of_preterm_birth'}
      else if (formD.diabetes == 1 || formD.hypertension == 1 || formD.obesity == 1  ){diagnosis = 'moderate_risk_of_preterm_birth'} 
      var initialC = diagnosis

      if(initialC == 'low_risk_of_preterm_birth'){this.form.systemDiagnosis = 'Embarazo con bajo riesgo de parto prematuro.' }
      if(initialC == 'moderate_risk_of_preterm_birth'){this.form.systemDiagnosis = 'Embarazo con riesgo moderado de parto prematuro.' }
      if(initialC == 'high_risk_of_preterm_birth'){this.form.systemDiagnosis = 'Embarazo con alto riesgo de parto prematuro.' }    

      alert("Diagnóstico de sistema generado"); 

    },
    async createControl(){
      this.isLoading = true
      var response = await this.validationComplete()
      
      console.log('control', this.form)
      console.log('fetuses', this.fetuses)

      var newRecord = _.cloneDeep(this.form)

      newRecord.idHCPB =  this.idHCPB
      newRecord.idSpecialist = this.user._id
      newRecord.nameSpecialist = this.form.nameSpecialist
      newRecord.fetusesArray = this.fetuses

      console.log('newRecord::::::::::::', newRecord)
      
      console.log('respuesta validación ', response)

      if(response.complete == true ){
        var dateI = moment(this.form.dateAttention)
        var dateE = moment(this.form.nextControlDate)
        if(this.form.systemDiagnosis == 'Pendiente de diagnóstico'){
          alert('Solicite el diagnótico del sistema para registrar el control prenatal')
        }
        else if(dateI>dateE){
           alert('La fecha del próximo control no puede ser anterior a la fecha del control actual')
        }else{
         var newCreate = await consultServices('createControl','POST',newRecord);  
            if(newCreate.message){
              this.formNot.title="Error en operación";
              this.formNot.message='No se pudo crear un nuevo registro' //newCreate.message;
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message = "Registro creado";
              //actualizar lista
              //this.clearForm()
              $('.modal').modal('hide');
            } 
        }
      }else{
          this.formNot.title="Campos incompletos";
          this.formNot.message = "Debe completar las siguientes secciones para registrar una nueva HCPB.";
          this.arrayComplete = _.cloneDeep(response.listVal)
      }    
      this.showNotification();
      this.isLoading = false
    },
    redirect(text, id){
      //window.open('/dashboard/gestantes');
      if(text =='HCPB'){
         window.location="dashboard/HCPB?idHCPB="+id;
      }      
    },

  }
};
</script>
<style scoped>
h1 {
  font-size: 1.25rem;
}
    fieldset.scheduler-border {
        border: 1px groove #ddd !important;
        padding: 0 1.4em 1.4em 1.4em !important;
        margin: 0 0 1.5em 0 !important;
        -webkit-box-shadow: 0px 0px 0px 0px #000;
        box-shadow: 0px 0px 0px 0px #000;
    }

    legend.scheduler-border {
        font-size: 1.2em !important;
        font-weight: bold !important;
        text-align: left !important;
        width: auto;
        padding: 0 10px;
        border-bottom: none;
    }

    textarea {
        width: 100%;
    }
</style>
