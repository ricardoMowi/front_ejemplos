<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Detalle del creando</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">

                    <div class="card">

                        <div class="card-body" id="BlockData">

                            <!-- <div class="card-body lee-esto">
                              <inputMaf type='text'  v-model="creando.documentNumber" :valueInput="creando.documentNumber" label="Documento del usuario:" :validation="{required:false, max:60}" nameInput="document" etiqueta='true' ref="inputDocument" >
                              </inputMaf>
                            </div> -->
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento del usuario: </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control col-md-7 col-xs-12" v-model="creando.documentNumber" readonly >                            
                                        </div>
                                </div>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="creando.name" :valueInput="creando.name"  label="Nombres:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName" >
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="creando.lastName" :valueInput="creando.lastName"  label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" >
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="creando.secondLastName" :valueInput="creando.secondLastName"  label="Apellido Materno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                              </inputMaf>
                            </div>

                            <!-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Provincia:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input v-model="creando.province" type="text" id="email" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                            </div> -->
                            
                            <!--Region-->
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Región</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="volunteer.region" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                        <select class="form-control"  v-model="creando.region" v-else>
                                        <option disabled="disabled" value="">Selecciona una región</option>
                                        <option v-for="item in regions" v-bind:value="item.id" >
                                            {{item.name}}
                                        </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input v-if="readonly==true" v-model="creando.birthdate" type="text" required="required">
                                        <Datetime v-else v-model="creando.birthdate" format="dd/MM/yyyy" :language="language" ></Datetime>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de ingreso a Crea+:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input  v-model="creando.startDate" type="text" required="required" readonly>
                                    </div>
                                </div>
                            </div>                            

                            <!-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo de integracion actual:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.group" type="text" id="email" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                            </div> -->


                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Apto para confirmar su participación en colegios?: </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control col-md-7 col-xs-12" v-model="formCrea.status" readonly  >                            
                                        </div>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha límite de confirmación:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input v-if="readonly==true" v-model="creando.confirmationDate" type="text" required="required">
                                        <Datetime v-else v-model="creando.confirmationDate" format="dd/MM/yyyy" :language="language" ></Datetime>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Deadline para renovar compromiso:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input v-if="readonly==true" v-model="creando.deadlineDate" type="text" required="required">
                                        <Datetime v-else v-model="creando.deadlineDate" format="dd/MM/yyyy" :language="language" ></Datetime>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">
                                <inputMaf type='text' v-model="creando.phone" :valueInput="creando.phone"  label="Celular:" :validation="{required:true, min:6, max:20}" nameInput="celular" etiqueta='true' ref="inputPhone" >
                                </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="creando.email" :valueInput="creando.email"  label="Email:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" >
                              </inputMaf>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">RUC: </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control col-md-7 col-xs-12" v-model="formCrea.ruc"  >                            
                                        </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Direccion de envío: </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control col-md-7 col-xs-12" v-model="formCrea.address"  >                            
                                        </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Contacto: </label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" class="form-control col-md-7 col-xs-12" v-model="formCrea.contact"  >                            
                                        </div>
                                </div>
                            </div>  
                        </div>

                      

                    </div>
                    <div class="card">
                         <div class="card-body">
                            <TableMaf :header="colum" :data="jobs" :tableTitle="titleTable" ref="tableMaf"></TableMaf>
                         </div>
                    </div>

                    <div class="card">
                         <div class="card-body">
                            <TableMaf :header="columR" :data="evaluations" :tableTitle="titleTableRecruitment" ref="tableMafRecruitment"></TableMaf>
                         </div>
                    </div>




                    <div v-if="showAssigmentComponent == true" class="card">
                        <div class="card-header">
                            <h2>Asignar un rol al creando para este semestre</h2>
                            <div class="clearfix"></div>
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Es apto para ser asignado al colegio?:</label>
                                
                                <div  class="col-md-6 col-sm-6 col-xs-12">
                                    <input v-model="formAsigment.finalResult" type="text" required="required" class="form-control col-md-12 col-xs-12"  readonly=true>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Ya está en la BBDD para coordinador lo jale?:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input v-model="formAsigment.bdStatus" type="text" required="required" class="form-control col-md-12 col-xs-12"  readonly=true>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Ya lo jalo el coordinador y esta en un colegio?:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input v-model="formAsigment.assigmentStatus" type="text" required="required" class="form-control col-md-12 col-xs-12"  readonly=true>
                                </div>
                            </div>
                            <div class="form-group" v-if="this.flagAssignmentComponent == false">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Asignar colegio(Si es apto):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  v-model="formAsigment.school" type="text"  required="required" class="form-control col-md-12 col-xs-12"  readonly=true>
                                </div>
                            </div>
                            <div class="form-group" v-if="this.flagAssignmentComponent == true">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el colegio:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select class="form-control"  v-model="formAsigment.idSchool"  >
                                    <option disabled="disabled" value="">Selecciona un colegio</option>
                                    <option v-for="item in schools" v-bind:value="item.id" >
                                    {{item.name}}
                                    </option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer" style="justify-content: space-between;"  v-if="this.flagAssignmentComponent == true">
                                <button  type="button" @click="updateVolunteerSchool()" class="btn btn-warning"> Asignar colegio </button>
                            </div>
                        </div>

                    </div> <!--card table -->
                    <div class="modal-footer">
                            <button type="button" v-if="readonly==false" @click="updateVolunteer()" class="btn btn-primary"> Guardar cambios </button>
                    </div>
                </div> <!--card-body-->

            </div> <!--card-->
        </div> <!--col 12 -->
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
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import * as lang from "vuejs-datepicker/src/locale";
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import Datepicker from 'vuejs-datepicker';
    import inputMaf from "./../../components/inputMaf.vue";
    import TableMaf from "./../../components/TableMaf.vue";

     import { Datetime } from 'vue-datetime';

    export default {
        name: "detalleCreando",
        components: {
            LoadingComponent,
            Datepicker,
            inputMaf,
            TableMaf,
            Datetime,

        },

        data: () => ({
            isLoading: true,
            language:lang['es'],
            DNI: window.INITIAL_STATE.DNI,
            readonly: window.INITIAL_STATE.readonly,
            creandos:[],
            creando:{},
            formCrea:{
              dni:'',
              name:'',
              apePaterno:'',
              apeMaterno:'',
              city:'',
              birthDay:'',
              startDay:'',
              group:'',
              status:'',
              //cambio 12/03/2020
              deadlineDate:'',
              confirmationDate:'',
              ///////////
              celphone:'',
              email:'',
              ruc:'',
              address:'',
              contact:'',
            },
            formAsigment:{},
            search:'',
            jobs:[],
            titleTable:'',
            titleTableRecruitment:'',
            colum:[],
            columR:[], 
            prueba: 4,
            classrooms:[],
            grades:[],
            volunteerStatus:[],
            resultCodes:[],
            psychologicalStatusCodes:[],
            recruitmentStatusCode:[],
            evaluations:[],
            semester:[],
            regions:[],
            volunteerJobCurrentSemester:[],
            flagAssignmentComponent:false, 
            volunteerLastJob : [],
            schools :[],
            formNot:{not:'',tit:'',},
            showAssigmentComponent: true,
        }),

        async  created () {
            await this.getSessionStorage();
            await this.getCreando();
            await this.getRecordVolunteerJob();
            await this.setAssignmentComponent();
            await this.getHistoricalEvaluation();
            this.setHeadTable();  
            this.regions = await consultServices('getRegions','POST',{});
        },

        methods: {
        async getSessionStorage(){
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagClassrooms = false;
                 var flagGrades = false;
                 var flagVolunteerStatus = false;
                 var flagResultCodes = false;
                 var flagPsychologicalStatusCodes = false;
                 var flagRecruitmentStatusCode = false;
                if(!window.sessionStorage.psychologicalStatusCodes){
                  ids.push(4);
                  flagPsychologicalStatusCodes = true;
                }
                if(!window.sessionStorage.volunteerStatus){
                  ids.push(6);
                  flagVolunteerStatus = true;
                }
                if(!window.sessionStorage.recruitmentStatusCode){
                  ids.push(8);
                  flagRecruitmentStatusCode = true;
                }
                if(!window.sessionStorage.resultCodes){
                  ids.push(9);
                  flagResultCodes = true;
                }
                if(!window.sessionStorage.grades){
                  ids.push(11);
                  flagGrades = true;
                }
                if(!window.sessionStorage.classrooms){
                  ids.push(12);
                  flagClassrooms = true;
                }
                if(!window.sessionStorage.semester){
                    var response =  await consultServices('getCurrentSemester','POST', {});
                    this.semester = response;
                    window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                this.semester =JSON.parse( window.sessionStorage.semester );
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagPsychologicalStatusCodes == true){
                       this.psychologicalStatusCodes = _.filter(arrayMasters, function(master) {return master.idMaster == 4; })
                       window.sessionStorage.psychologicalStatusCodes  = JSON.stringify(this.psychologicalStatusCodes);
                    }
                    if(flagVolunteerStatus == true){
                       this.volunteerStatus = _.filter(arrayMasters, function(master) {return master.idMaster == 6; });
                       console.log("this.volunteerStatus en el if ", this.volunteerStatus)
                       window.sessionStorage.volunteerStatus  = JSON.stringify(this.volunteerStatus);   
                    }
                    if(flagRecruitmentStatusCode == true){
                       this.recruitmentStatusCode = _.filter(arrayMasters, function(master) {return master.idMaster == 8; })
                       window.sessionStorage.recruitmentStatusCode  = JSON.stringify(this.recruitmentStatusCode);
                    }
                    if(flagResultCodes == true){
                       this.resultCodes = _.filter(arrayMasters, function(master) {return master.idMaster == 9; })
                       window.sessionStorage.resultCodes  = JSON.stringify(this.resultCodes);
                    }
                    if(flagGrades == true){
                       this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                       window.sessionStorage.grades  = JSON.stringify(this.grades);
                    }
                    if(flagClassrooms == true){
                       this.classrooms = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
                       window.sessionStorage.classrooms  = JSON.stringify(this.classrooms);
                    }
                }
                    // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.classrooms = JSON.parse( window.sessionStorage.classrooms );
                    this.grades = JSON.parse( window.sessionStorage.grades );
                    this.volunteerStatus = JSON.parse( window.sessionStorage.volunteerStatus );
                    this.resultCodes = JSON.parse( window.sessionStorage.resultCodes ); 
                    this.psychologicalStatusCodes = JSON.parse( window.sessionStorage.psychologicalStatusCodes ); 
                    this.recruitmentStatusCode = JSON.parse( window.sessionStorage.recruitmentStatusCode );                     
                    // //fin de la carga de arreglos para la pantalla


                this.isLoading = false;
        },
            async getCreando(){       
                this.isLoading = true;                
                const response = await consultServices('getVolunteer','POST',{id:this.DNI});
                this.creando = response;  

                console.log("CREANDO    ",response)                                    
                if(this.readonly==true){ 
                console.log("solo lectura: ",this.readonly);
                $("#BlockData :input").attr("disabled", true);}   
                this.isLoading = false;
            },
            async getRecordVolunteerJob(){
                const response = await consultServices('getRecordVolunteerJobs','POST',{id:this.creando.id,semesterCode:'' });
                this.setDataTable(response, 'JOBS');
                const response1 = await consultServices('getRecordVolunteerJobs','POST',{id:this.creando.id,  semesterCode: this.semester.id })
                this.volunteerJobCurrentSemester = response1
                const response0 = await consultServices('getRecordVolunteerJobs','POST',{id:this.creando.id,  semesterCode: this.semester.previousSemester })
                this.volunteerLastJob = response0
            },
            async getHistoricalEvaluation(){
                const response = await consultServices('getHistoricalEvaluations','POST',{id:this.creando.id, semesterCode: this.semester.id });
                this.setDataTable(response, 'EVALUATIONS');
            },
            setDataTable(arrayData, type){
                var ctx = this;
                if(type == "JOBS"){
                    this.jobs = [];
                    arrayData.forEach(item => {
                        console.log("item   ",item)
                        var record = {};
                        var name= item.Volunteer.name ?name= item.Volunteer.name : name= "";
                        var lastName= item.Volunteer.lastName ?lastName= item.Volunteer.lastName : lastName= "";
                        var secondLastName=item.Volunteer.secondLastName ?secondLastName= item.Volunteer.secondLastName : secondLastName= "";
                            record.creando = name +" "+ lastName +" "+secondLastName;
                            record.semester= item.displaySemester;
                            record.creationDate= item.Volunteer.startDate == null? record.creationDate="No especificado": record.creationDate= moment(item.Volunteer.startDate).format('DD/MM/YYYY');
                            record.school= item.AssignmentRecords[0]? record.school=item.AssignmentRecords[0].School.name : record.school='-' ;
                            record.days =  item.AssignmentRecords[0] ? record.days=  item.AssignmentRecords[0].School.SchoolManagementEvents.length : record.days= 0;   
                            if(item.Job){
                                
                                if(item.Job.category == 'JUNIOR' ){
                                    //var grade = item.AssignmentRecords[0].Workshop ?grade = this.getDisplayValue(item.AssignmentRecords[0].Workshop.gradeCode, 11) : grade= "";
                                    //var classroomCode = item.AssignmentRecords[0].Workshop ?classroomCode =  this.getDisplayValue(item.AssignmentRecords[0].Workshop.classroomCode,12) :classroomCode="";
                                    var grade = '';
                                    var classroomCode = '';
                                    if( item.AssignmentRecords[0]){
                                        grade = item.AssignmentRecords[0].Workshop ?grade = this.getDisplayValue(item.AssignmentRecords[0].Workshop.gradeCode, 11) : grade= "";
                                        classroomCode = item.AssignmentRecords[0].Workshop ?classroomCode =  this.getDisplayValue(item.AssignmentRecords[0].Workshop.classroomCode,12) :classroomCode="";
                                    }
                                    record.workshop =grade+" " +classroomCode;
                                    record.hours = record.days * 5;   
                                    record.job = item.Job.name;
                                }    
                            }else{
                                record.job ='';
                                record.workshop = "GDC";
                                record.hours = record.days* 7;
                                record.job = '';
                            }                       
            
                            //record.days =  item.AssignmentRecords[0].School.SchoolManagementEvents[0]? record.days= item.AssignmentRecords[0].School.SchoolManagementEvents.length : record.days= 0;                                                     
                            record.finalResult = item.finalResult  ?   record.finalResult = this.getDisplayValue(item.finalResult, 8 ) :  record.finalResult = "";                       
                            console.log("rec  ", record)
                            this.jobs.push(record);
                    });
                    this.refreshData("JOBS");

                }
                if(type == "EVALUATIONS"){
                    this.evaluations = [];
                    arrayData.forEach(item => {
                        console.log("item   ",item)
                        var eva = {};
                        eva.semester= item.semester_code? eva.semester= item.semester_code: eva.semester= "-";
                        eva.psychologicalStatusCode = item.proactivity_score ? eva.psychologicalStatusCode = this.getDisplayValue(item.psychological_status_code, 4):eva.psychologicalStatusCode= " " ;
                        eva.proactivityScore= item.proactivity_score;
                        eva.teamworkScore= item.teamwork_score;
                        eva.empathyScore= item.empathy_score;
                        eva.motivationScore= item.motivation_score;
                        eva.comment= item.comment;
                        var numb=  (item.proactivity_score * 0.3 + item.teamwork_score * 0.2 + item.empathy_score * 0.35 + item.motivation_score * 0.15)
                        eva.resultValue=  numb.toFixed(2);
                        eva.resultCode= item.result_code ? eva.resultCode=this.getDisplayValue( item.result_code,9)  : eva.resultCode = " " ;
                        eva.confirm= item.confirmed=true? eva.confirm='Si': eva.confirm='No' ;

                        this.evaluations.push(eva);
                    });
                    this.refreshData("EVALUATIONS");
                }                
            },

            async setAssignmentComponent(){

                //todo por defecto no
                    this.formAsigment.finalResult = 'No'
                    this.formAsigment.bdStatus = 'No',
                    this.formAsigment.assigmentStatus = 'No'                    
                    this.flagAssignmentComponent = false;
                    this.formCrea.status = 'No'
                //hay volunteer_job del semestre previo?
                if(this.volunteerLastJob[0]){
                    if( this.volunteerLastJob[0].finalResult == 'VOLUNTEER_SUITABLE' ){
                        this.formCrea.status = "Sí"
                        this.formAsigment.finalResult = 'Sí'

                        if(this.volunteerJobCurrentSemester[0].AssignmentRecords[0]){
                                //Paso 2 es SI si el assignment record tiene confirmado el colegio (confirmed=true)
                                if(this.volunteerJobCurrentSemester[0].AssignmentRecords[0].confirmed == true ){
                                    this.formAsigment.bdStatus = 'Sí'
                                }

                                //Paso 3 es SI si se ha confirmado el taller y cargo en el colegio
                                if(this.volunteerJobCurrentSemester[0].AssignmentRecords[0].idWorkshop !=null && this.volunteerJobCurrentSemester[0].Job !=null && this.volunteerJobCurrentSemester[0].AssignmentRecords[0].workshopConfirmed ){
                                    this.formAsigment.assigmentStatus = 'Sí'
                                }
                        }                      
                       
                        // es Sí, No, No?
                        if(this.formAsigment.finalResult == 'Sí' && this.formAsigment.bdStatus == 'No' && this.formAsigment.assigmentStatus == 'No' ){
                            //se le crea el assignment y se actualiza su job a Operaciones 
                            this.schools=await consultServices('listSchools','POST',{});
                            this.flagAssignmentComponent = true;
                        }else{
                            this.showAssigmentComponent =false
                        }
                        
                    }
                }


            },

            async updateVolunteerSchool(){
                console.log("form ::::::::::",this.formAsigment )
                var flag= confirm("¿Aginar al colegio seleccionado?");
                if(flag==true){
                    var json={
                        idSchool: this.formAsigment.idSchool,
                        id: this.volunteerJobCurrentSemester[0].id,
                        idJob:3
                    }
                    const response = await consultServices('updateVolunteerSchool','POST',json);
                    if(response.status == 200){
                        this.formNot.tit="Colegio asignado "; this.formNot.not="Se asignó el colegio al creando de manera correcta";
                        const response1 = await consultServices('getRecordVolunteerJobs','POST',{id:this.creando.id,  semesterCode: this.semester.id })
                        this.volunteerJobCurrentSemester = response1
                        this.showAssigmentComponent = false

                    }else{
                        this.formNot.tit="Error asignando rol"; this.formNot.not="No se pudo asignar el colegio al creando seleccionado"
                    }
                    $('.modal').modal('hide');
                    this.shownotificacion();          
                }
            },

            setHeadTable(){
                this.prueba = this.jobs.length;
                this.colum = [
                    {label:this.prueba + ' Resultados de la búsqueda' ,name:'creando' ,find:0 ,sort:0},
                    {label:'Semestre' ,name:'semester' ,find:0 ,sort:0},
                    {label:'Fech. inicio Creando' ,name:'creationDate' ,find:0 ,sort:0},
                    {label:'Colegio' ,name:'school' ,find:0 ,sort:0},
                    {label:'Rol' ,name:'job' ,find:0 ,sort:0},
                    {label:'Taller ' ,name:'workshop' ,find:0 ,sort:0},
                    {label:'Días ' ,name:'days' ,find:0 ,sort:0},
                    {label:'Horas ' ,name:'hours' ,find:0 ,sort:0},
                    {label:'Resultado al cierre de cada semestre ' ,name:'finalResult' ,find:0 ,sort:0}];
                this.titleTable = "Historial del creando en Crea+";

                this.columR = [
                    
                    {label:'Semestre' ,name:'semester' ,find:0 ,sort:0},
                    {label:'Prueba psico' ,name:'psychologicalStatusCode' ,find:0 ,sort:0},
                    {label:'Proactividad' ,name:'proactivityScore' ,find:0 ,sort:0},
                    {label:'Trabajo en equipo' ,name:'teamworkScore' ,find:0 ,sort:0},
                    {label:'Empatía ' ,name:'empathyScore' ,find:0 ,sort:0},
                    {label:'Motivación ' ,name:'motivationScore' ,find:0 ,sort:0},
                    {label:'Observación ' ,name:'comment' ,find:0 ,sort:0},
                    {label:'Puntaje ' ,name:'resultValue' ,find:0 ,sort:0},
                    {label:'Resultado ' ,name:'resultCode' ,find:0 ,sort:0},
                    {label:'Confirmó para este semestre ' ,name:'confirm' ,find:0 ,sort:0}];
                this.titleTableRecruitment = "Histórico de sus resultados de cuando pasó reclutamiento ";

            },

            refreshData(type) {
               if(type == "JOBS"){
                   this.$refs.tableMaf.formatData(this.jobs);
                   console.log(" historial ahora: ",this.jobs);
               } 
               if(type == "EVALUATIONS"){
                   this.$refs.tableMafRecruitment.formatData(this.evaluations);
                   console.log(" historial ahora: ",this.evaluations);
               } 

            },

            async updateVolunteer(){
               
                this.isLoading = true;
                if(await this.$refs.inputDocument.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ||
                await this.$refs.inputLastName.returnValidationAsync() == false || await this.$refs.inputSecondLastName.returnValidationAsync() == false || 
                await this.$refs.inputPhone.returnValidationAsync() == false || await this.$refs.inputEmail.returnValidationAsync() == false) {
                    alert("No se pudo actualizar los datos del voluntario");
                } else {

                    var form={};
                    form.id=this.creando.id;
                    console.log("id:  "+form.id);
                    form.name = this.creando.name;
                    form.lastName = this.creando.lastName;
                    form.secondLastName = this.creando.secondLastName;
                    form.documentNumber = this.creando.documentNumber;
                    form.birthdate = this.creando.birthdate;
                    form.genderCode =this.creando.genderCode;
                    form.email = this.creando.email;
                    form.phone = this.creando.phone;
                    form.region = this.creando.region;
                    form.deadlineDate= this.creando.deadlineDate;


                    const response = await consultServices('updateVolunteer','POST',form);
                
                    this.DNI = form.documentNumber;
                    const response1 = await consultServices('getVolunteer','POST',{id:this.DNI});
                    this.creando = response1;
                    alert("Se actualizaron los datos del voluntario de manera exitosa");
                }
                
                this.isLoading = false;
            },
            getDisplayValue(string, master){
                var array=[];
                var display="";
                if(master == 4){
                    array= this.psychologicalStatusCodes 
                } 
                if(master == 6){
                    array= this.volunteerStatus 
                }  
                if(master == 8){
                    array= this.recruitmentStatusCode 
                }                             
                if(master == 9){
                    array= this.resultCodes 
                }       
                if(master == 11){
                    array= this.grades
                }
                if(master == 12){
                    array= this.classrooms

                }
                for (let index = 0; index < array.length; index++) {
                        if(array[index].code == string){
                            display=array[index].displayValue;
                        }

                }
                return display;
            },
            async shownotificacion(){
            $('.bs-example-modal-not').modal('show'); },

        },


        computed:{
            filteredEvaluation () {
                return this.search ?
                    this.evaluation.filter( eva =>{
                    return (eva.date.includes(this.search))
                }) : this.evaluation ;
            },
        }

    }

</script>

<style scoped>
</style>
