<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <!--Modal Evaluated-->
        <div class="modal fade modal-Evaluation" tabindex="-1" role="dialog" aria-hidden="true"  style="overflow-y:auto">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="card-header">

                        <h1>Detalle de evaluación</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>

                    </div>

                    <div class="card-body">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="modal-title" id="myModalLabel"><strong> Datos Personales </strong></h4>
                            </div>
                            <div class="card-body">

                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.documentNumber" :valueInput="formCreando.documentNumber"  label="Documento de identidad:" :validation="{required:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument" >
                                    </inputMaf>

                                </div>
                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.lastName" :valueInput="formCreando.lastName"  label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" >
                                    </inputMaf>

                                </div>
                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.secondLastName" :valueInput="formCreando.secondLastName"  label="Apellido Materno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                                    </inputMaf>

                                </div>
                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.name" :valueInput="formCreando.name"  label="Nombres:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName" >
                                    </inputMaf>

                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Género:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" v-model="formCreando.genderCode" >
                                                <option value="M">Masculino</option>
                                                <option value="F">Femenino</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha Nacimiento:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" id="Nacimiento" v-model="formCreando.birthdate" required="required" data-inputmask="'mask': '99/99/9999'" class="form-control col-md-7 col-xs-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.email" :valueInput="formCreando.email"  label="Email:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" >
                                    </inputMaf>

                                </div>
                                <div class="card-body">

                                    <inputMaf type='text' v-model="formCreando.phone" :valueInput="formCreando.phone"  label="Celular:" :validation="{required:true, min:6, max:20}" nameInput="celular" etiqueta='true' ref="inputPhone" >
                                    </inputMaf>
                                </div>
                            </div>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <h4 class="modal-title" id="myModalLabel"><strong> Resultados de la evaluación </strong></h4>
                                </div>

                                <div class="card-body" v-if="competences.length == 0">
                                    <p>El proyecto no tiene competencias asociadas.</p>
                                        <!-- <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Proactividad:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.Resultado" >
                                                    <option v-bind:value="'EVALUATION_SUITABLE'">APTO</option>
                                                    <option v-bind:value="'EVALUATION_NOT_SUITABLE'">NO APTO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            <div class="card" v-else>
                                    <div class="card-header">
                                        <h2>Prueba Psicológica </h2>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Proactividad:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" v-model="formEvaluated.proactivityScore" @change="updateEvaluation()" >
                                                <option v-bind:value="1">Nunca</option>
                                                <option v-bind:value="2">A veces</option>
                                                <option v-bind:value="3">Casi siempre</option>
                                                <option v-bind:value="4">Siempre</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Trabajo en Equipo:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.teamworkScore" @change="updateEvaluation()">
                                                    <option v-bind:value="1">Nunca</option>
                                                    <option v-bind:value="2">A veces</option>
                                                    <option v-bind:value="3">Casi siempre</option>
                                                    <option v-bind:value="4">Siempre</option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <!-- <div class="card-body">
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Trabajo en Equipo:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" v-model="formEvaluated.teamworkScore" @change="updateEvaluation()">
                                                        <option v-bind:value="1">Nunca</option>
                                                        <option v-bind:value="2">A veces</option>
                                                        <option v-bind:value="3">Casi siempre</option>
                                                        <option v-bind:value="4">Siempre</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Empatía:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" v-model="formEvaluated.empathyScore" @change="updateEvaluation()">
                                                        <option v-bind:value="1">Nunca</option>
                                                        <option v-bind:value="2">A veces</option>
                                                        <option v-bind:value="3">Casi siempre</option>
                                                        <option v-bind:value="4">Siempre</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivación:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.motivationScore" @change="updateEvaluation()">
                                                    <option v-bind:value="1">Nunca</option>
                                                    <option v-bind:value="2">A veces</option>
                                                    <option v-bind:value="3">Casi siempre</option>
                                                    <option v-bind:value="4">Siempre</option>
                                                </select>
                                            </div>
                                        </div> -->
                                        <!-- <div class="card-body">
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Prueba Psicológica:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" v-model="formEvaluated.psychologicalStatusCode" @change="updateEvaluation()">
                                                        <option v-for="master in masters" v-bind:value="master.code">{{master.displayValue}} </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Observación:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <textarea class="form-control" rows="3" v-if="formEvaluated.psychologicalStatusCode=='EVALUATION_PSYCHOLOGICAL_COMMENTED'"  id="Observacion" v-model="formEvaluated.comment" @change="updateEvaluation()" placeholder="Por favor escriba una observación.Campo obligatorio."></textarea>
                                                <textarea class="form-control" rows="3" v-else  id="Observacion" v-model="formEvaluated.comment" @change="updateEvaluation()" placeholder="Observación"></textarea>
                                                <h1>{{this.not}}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Resultado Final:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <input v-model="formEvaluated.Resultado" type="text" id="Nacimiento" required="required" disabled="disabled" class="form-control col-md-7 col-xs-12">
                                            </div>
                                        </div> -->

                                </div>

                                <div class="card-body" v-else>
                                    <div class="form-group">
                                        <label style="align-self: center;" class="control-label col-md-4 col-sm-4 col-xs-12">Video del Creando:</label>
                                        <div style="align-self: center;" class="col-md-6 col-sm-6 col-xs-12">
                                            <a v-if="formCreando.taskUrl != null && formCreando.taskUrl != ''" target="_blank" :href="`${this.formCreando.taskUrl}`" >Ver</a>
                                            <p style="margin-top: 13px; margin-bottom: 13px;" v-else >El potencial aún no sube su video.</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label style="align-self: center;" class="control-label col-md-4 col-sm-4 col-xs-12">Fecha de la charla a la que está inscrito el creando:</label>
                                        <div style="align-self: center;" class="col-md-6 col-sm-6 col-xs-12">
                                             <p style="margin-top: 13px; margin-bottom: 13px;" >{{formattDate(selectedAssesment.startDate)}}</p>                                           
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label style="align-self: center;" class="control-label col-md-4 col-sm-4 col-xs-12">¿Asistió a la charla?:</label>
                                        <div style="align-self: center;" class="col-md-6 col-sm-6 col-xs-12">
                                            <select v-model="formCreando.attendance" class="form-control">
                                                <option value= "ATTENDANCE_CREATED"  >No asistió</option>
                                                <option value= "ATTENDANCE_ATTENDED" >Asistió </option>
                                            </select> 
                                        </div>
                                    </div>                                    
                                    <div class="card-body" >     
                                        <div v-for="(item, i) in showEvaluationCompetences" :key="`A-${item.idCompetence}`">              
                                            <div  >
                                            <div class="form-group  ">
                                                <label class="control-label col-md-4 col-sm-4 col-xs-12">{{item.nameCompetence}} </label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select v-model="item.score" class="form-control" @change="updateScore()">
                                                        <option v-for="option in arrayOption2" :value="option.value" >{{option.label}}</option>
                                                    </select> 
                                                </div>  

                                            </div>
                                            </div>           
                                        </div>                
                                    </div> 

                                    <div class="card-body" v-if="isEnrollment == true">
                                        <div class="form-group">
                                            <label class="control-label col-md-4 col-sm-4 col-xs-12">Prueba Psicológica:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.psychologicalStatusCode">
                                                    <option v-for="master in masters" v-bind:value="master.code">{{master.displayValue}} </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-4 col-sm-4 col-xs-12">Observación:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <textarea class="form-control" rows="3" v-if="formEvaluated.psychologicalStatusCode=='EVALUATION_PSYCHOLOGICAL_COMMENTED'"  id="Observacion" v-model="formEvaluated.comment" @change="updateEvaluation()" placeholder="Por favor escriba una observación. Este es un campo obligatorio."></textarea>
                                                <textarea class="form-control" rows="3" v-else  id="Observacion" v-model="formEvaluated.comment" placeholder="Observación"></textarea>
                                                <h1>{{this.not}}</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-4 col-sm-4 col-xs-12">Resultado Final:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <input v-model="formEvaluated.Resultado" type="text" required="required" disabled="disabled" class="form-control col-md-7 col-xs-12">
                                            </div>
                                        </div> 
                                    </div>

                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" data-target=".modal-Evaluation" data-toggle="modal" class="btn btn-default"> Cancelar </button>
                                <button type="button" @click="updateData()" class="btn btn-primary"> Actualizar Datos </button>
                                <button type="button" @click="finishEvaluation()" class="btn btn-success"> Terminar evaluación </button>
                            </div>
                    </div> <!--Body-->
                </div> <!--Content-->
            </div>
        </div>
        <!--Modal Evaluated-->
        <!--Modal not-->
        <div class="modal fade bs-example-modal-notModal" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:auto">
            <div class="modal-dialog modal-cat">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">{{formNot.tit}} </h4>
                    <button class="close" type="button"  @click="closeModalSafety('.bs-example-modal-notModal')" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p> <center> {{formNot.not}} </center> </p>
                </div>
                    <div class="modal-footer">
                        <center>
                            <button type="button" class="btn btn-success" @click="closeModalSafety('.bs-example-modal-notModal')" >Aceptar</button>
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

    import consultServices from './../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import LoadingComponent from "./../components/loadingComponent.vue";
    import Message from "./../components/MessageConfirmation.vue";
    import inputMaf from "./../components/inputMaf.vue";
    import jsPDF from 'jspdf';

    export default {


        name: "modalEvaluatedComponent",
        props: ['callbackData', 'competences'],

        components:{
            Message,
            inputMaf,
            LoadingComponent,
        },

        data: () => ({
          isLoading: false,
          formEvaluated:{},
          formCreando:{},
          isLoading:false,
          documentNumber:'',
          id:'',
          not:'',
          masters:[],
          titleMessage:'',
          messageBody:'',
          selectedAssesment: {}, 
          assessmentDate:'10 de marzo de 2017',
          idProject : 0,
          semesterId : 0,
          idVolunteer: 0,
          formNot:{not:'',tit:'',},
          isEnrollment: true,
          arrayOption:[
            {value: 0, label: 'Falso'},
            {value: 1, label: 'Verdadero'},
          ],
          arrayOption2:[
            {value: 4, label: 'Siempre'},
            {value: 3, label: 'Casi siempre'},
            {value: 2, label: 'A veces'},
            {value: 1, label: 'Nunca'},
          ],
          competencesPerProject:[
          ],
          showEvaluationCompetences:[],
          idAssignment: null,
        }),

        created () {
            console.log('competences en modal 1 ', this.competences)
            console.log('setEvaluationCompetences 2 ', this.showEvaluationCompetences)
            this.competences ? this.competencesPerProject = this.competences : this.competencesPerProject = [];            
            this.getMasterValues();
            
        },

        methods: {

            async getMasterValues(){
                const response = await consultServices('getMasterValues','POST',{idMaster:'4'});
                this.masters = response;
            },

            async getAttendance(){
                //consultar si tiene una asistencia a un evento del tipo assessment del proyecto asociado
                var form= {}
                form.semesterCode = this.semesterId 
                form.id = this.idVolunteer
                form.idProject = this.idProject
                var responseAttendance = await consultServices('getAttendanceByAssessment ','POST', form);
                if(responseAttendance){
                    console.log('assessments: ', responseAttendance)
                    if(!responseAttendance.message){
                        _.map(responseAttendance.SchoolManagementEvents, (event) => {
                            if(event.descriptionCode == 'WORKSHOP_EVENT_ASSESSMENT'){
                            this.selectedAssesment = event
                            this.formCreando.idAttendance = this.selectedAssesment.Attendances[0].id
                            this.formCreando.attendance = this.selectedAssesment.Attendances[0].statusCode
                            }
                        })
                    }
                }
                console.log('this.selectedAssesment ', this.selectedAssesment)
            },


            /**
             * setCompetences: setea el arreglo de competencias por proyecto
             * solo se agregan al arreglo competencesPerProject competencias activas y con isEnrollemnt = true
             */
            async setCompetences(newCompetences){

                this.competencesPerProject = []
                for (var i = 0; i < newCompetences.length; i++) {
                  if(newCompetences[i].isEnrollment == true && newCompetences[i].active == true){                    
                    this.competencesPerProject.push(newCompetences[i])
                  }                    
                }
            },


            /**
             * setEvaluationCompetences: setea el arreglo de evaluaciones de competencias 
             * el arreglo showEvaluationCompetences contiene las evaluaciones de competencia y su score, si es que ya existe en la bd
             */
            async setEvaluationCompetences(evaluationCompetences){                

                this.showEvaluationCompetences = []
                for (var i = 0; i < this.competencesPerProject.length; i++) {
                    
                    var obj={}

                    obj.idEvaluation = null
                    obj.idCompetence = this.competencesPerProject[i].Competence.id
                    obj.nameCompetence = this.competencesPerProject[i].Competence.name
                    obj.idProjectCompetence = this.competencesPerProject[i].id
                    obj.score = null
                    obj.idEvaluationCompetence = null
                    obj.weight = this.competencesPerProject[i].weight

                    for (let j = 0; j < evaluationCompetences.length; j++) {
                        
                        if(this.competencesPerProject[i].id == evaluationCompetences[j].idProjectCompetence ){
                            obj.score = evaluationCompetences[j].score 
                            obj.idEvaluationCompetence = evaluationCompetences[j].id
                        }                        
                    }            
                    this.showEvaluationCompetences.push(obj)   
                }

                console.log('showEvaluationCompetences modal ', this.showEvaluationCompetences) 
            },

            async getEvaluated() {
            this.isLoading = true;

            const response = await consultServices('getVolunteer','POST',{id:this.documentNumber});
            // console.log("Hola");
            const response2 = await consultServices('getEvaluation','POST',{id:this.id});
            console.log(response);

            this.formCreando = response;
            this.formEvaluated = response2;

            

            this.isLoading = false;
            },

            updateScore(){
                console.log('this.showEvaluationCompetences actual ', this.showEvaluationCompetences)
            },

            async  updateData()
            {
                   var temp=await consultServices('getVolunteer','POST',{id:this.documentNumber});
                   var temp2=await consultServices('getEvaluation','POST',{id:this.id});
                   var flag= confirm("¿Actualizar información del registro?");
                   if(flag==true){
                        if(temp.lastName!=this.formCreando.lastName || temp.secondLastName!=this.formCreando.secondLastName || temp.name!=this.formCreando.name ||
                            temp.genderCode!=this.formCreando.genderCode||temp.birthdate!=this.formCreando.birthdate ||temp.email!=this.formCreando.email ||
                            temp.phone!=this.formCreando.phone || temp.documentNumber!=this.formCreando.documentNumber ){
                            this.updateVolunteer();
                        }
                        // if(temp2.comment!=this.formEvaluated.comment ){
                        //     this.evaluationUpdate();
                        // }
                        this.saveEvaluationCompetence();
                   }
                   this.callbackData();

            },

            /**
             * Permite crear/actualizar las evacluaciones de comptenecias y el campo psychologicalStatusCodede la evaluacion pendiente
             * cosnume el servicio evaluationCompetenceSave
             */
            async saveEvaluationCompetence(){
                var form = {}
                var idEvaluation = this.id
                var createEvaluationCompetence =[]
                var updateEvaluationCompetence = []
                //if: si el campo Prueba psicológica es 'OBSERVADO' , es obligatorio tener un comentario
                if(this.formEvaluated.psychologicalStatusCode=="EVALUATION_PSYCHOLOGICAL_COMMENTED" && (this.formEvaluated.comment == null || this.formEvaluated.comment == '') ){
                    //alert('El campo Observación es obligatorio')
                    this.formNot.tit="Error";
                    this.formNot.not="Es necesario completar los campos obligatorios para terminar la evaluación.";
                    this.shownotificacion();
                }else{
                    for (var index = 0; index < this.showEvaluationCompetences.length; index++) {
                        if(this.showEvaluationCompetences[index].score != null){
                            this.showEvaluationCompetences[index].idEvaluation = idEvaluation
                            if(this.showEvaluationCompetences[index].idEvaluationCompetence != null){
                                //incluir objeto en el arreglo usado para actualizar
                                updateEvaluationCompetence.push(this.showEvaluationCompetences[index])
                            }else{
                                //incluir objeto en el arreglo usado para guardar
                                createEvaluationCompetence.push(this.showEvaluationCompetences[index])
                            } 
                        }                   
                    }
                    //Preparar form para el servicio que actualiza datos de la evaluación 
                    form.idEvaluation = idEvaluation
                    form.arrayUpdate = updateEvaluationCompetence
                    form.arrayCreate = createEvaluationCompetence
                    this.formEvaluated.psychologicalStatusCode != '' || formEvaluated.psychologicalStatusCode != null ? form.psychologicalStatusCode = this.formEvaluated.psychologicalStatusCode : null
                    this.formEvaluated.comment != null ? form.comment = this.formEvaluated.comment : null      
                    form.idAttendance = this.formCreando.idAttendance 
                    form.attendance = this.formCreando.attendance
                    const response = await consultServices('evaluationCompetenceSave','POST',form);
                    if(response.message){
                        alert('Error actualizando datos')
                    } 
                }                                         
            },
            async  updateVolunteer(){
                        var update={};
                        update.documentNumber=this.formCreando.documentNumber;
                        update.id=this.formCreando.id;
                        update.name=this.formCreando.name;
                        update.lastName=this.formCreando.lastName;
                        update.secondLastName=this.formCreando.secondLastName;
                        update.birthdate=this.formCreando.birthdate;
                        update.genderCode=this.formCreando.genderCode;
                        update.email=this.formCreando.email;
                        update.phone=this.formCreando.phone;
                        //Se esta agregando la validación
                        if( await this.$refs.inputDocument.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false || 
                            await this.$refs.inputSecondLastName.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ||
                            await this.$refs.inputEmail.returnValidationAsync() == false || await this.$refs.inputPhone.returnValidationAsync() == false) {
                            alert("No se pudo actualizar los datos del voluntario");
                        }else {
                            const response = await consultServices('updateVolunteer','POST',update);
                        }

            },
            async  evaluationUpdate(){
                        console.log("Actualización datos evaluación ");
                        var update2=  _.cloneDeep(this.formEvaluated);
                        if(this.formEvaluated.comment==""|| this.formEvaluated.comment==null && this.formEvaluated.psychologicalStatusCode=="EVALUATION_PSYCHOLOGICAL_COMMENTED" ){
                                    this.messageBody="Es necesario escribir un comentario";
                                    this.$refs.MessageModal.showModal();}
                        const response = await consultServices('evaluationUpdate','POST',update2);
            },

            async finishEvaluation(){                
                this.isLoading = true;
                console.log('entró a finishEvaluation ')
                console.log(this.showEvaluationCompetences)
                var evaluationCompetences = _.cloneDeep(this.showEvaluationCompetences)
                var flagShowAlert = false

                //Validar se todas la competencias tengan un valor seleccionado 
                for (var index = 0; index < evaluationCompetences.length; index++) {
                    if(evaluationCompetences[index].score == null){ 
                        flagShowAlert = true
                    }                   
                }
                if(this.formEvaluated.psychologicalStatusCode == null || (this.formEvaluated.psychologicalStatusCode=="EVALUATION_PSYCHOLOGICAL_COMMENTED" && (this.formEvaluated.comment == null || this.formEvaluated.comment == ''))){
                    flagShowAlert = true
                }
                if(flagShowAlert == true){
                    //Notificar campos incompletos
                    this.formNot.tit="Error";
                    this.formNot.not="Es necesario completar los campos obligatorios para terminar la evaluación.";
                    this.shownotificacion();
                }else{

                    var flag= confirm("¿Concluir evaluación? Una vez conluida la evaluación esta acción no se podrá revertir");
                    if(flag==true){
                        //primero guardar todas las calificaciones 
                        var form = {}
                        var idEvaluation = this.id
                        var createEvaluationCompetence =[]
                        var updateEvaluationCompetence = []
                        for (var index = 0; index < this.showEvaluationCompetences.length; index++) {
                            if(this.showEvaluationCompetences[index].score != null){
                                this.showEvaluationCompetences[index].idEvaluation = idEvaluation
                                if(this.showEvaluationCompetences[index].idEvaluationCompetence != null){
                                    //actualizar
                                    updateEvaluationCompetence.push(this.showEvaluationCompetences[index])
                                }else{
                                    //guardar
                                    createEvaluationCompetence.push(this.showEvaluationCompetences[index])
                                } 
                            }                   
                        }

                        form.idEvaluation = idEvaluation
                        form.arrayUpdate = updateEvaluationCompetence
                        form.arrayCreate = createEvaluationCompetence
                        form.idAttendance = this.formCreando.idAttendance 
                        form.attendance = this.formCreando.attendance
                        this.formEvaluated.psychologicalStatusCode != '' || formEvaluated.psychologicalStatusCode != null ? form.psychologicalStatusCode = this.formEvaluated.psychologicalStatusCode : null
                        this.formEvaluated.comment != null ? form.comment = this.formEvaluated.comment : null    

                        const response = await consultServices('evaluationCompetenceSave','POST',form);
                        if(response.message){
                            this.formNot.tit="Error finalizando evaluación";
                            this.formNot.not=response.message;
                        }else{
                                //ahora terminar la evaluación
                                //Preparar la data para terminar la evaluación
                                var form= {}
                                form.arrayEvaluationCompetences = evaluationCompetences
                                form.id=this.formEvaluated.id
                                form.documentNumber=this.formCreando.documentNumber
                                form.psychologicalStatusCode = this.formEvaluated.psychologicalStatusCode
                                form.idAssignmentRecord = this.idAssignment
                                //Terminar la evaluación
                                const response = await consultServices('finishEvaluation','POST',form);
                                if(response.status == 400)
                                {
                                    this.formNot.tit="Error finalizando evaluación";
                                    this.formNot.not=response.message;
                                    
                                }else if(response.status == 200){
                                    const responseII = await consultServices('getMasterValues','POST',{idMaster:'9'});
                                    var Values = _.find(responseII, function(o){ return o.code==response.jsonUpdate.resultcode });
                                    this.formEvaluated.Resultado= Values.displayValue;
                                    this.formNot.tit="Evaluación finalizada con éxito";
                                    this.formNot.not="Se ha completado la evaluación de manera correcta"                       
                                }  
                        }
                        this.shownotificacion();  
                    }
      
                }
                this.callbackData();
                this.isLoading = false;
            },

            async showModal(document, id, idAssignment,idVolunteer, idProject, semesterCode){

                this.documentNumber = document;                
                this.id=id;
                this.idProject= idProject 
                this.idAssignment = idAssignment
                this.idVolunteer = idVolunteer
                this.semesterId = semesterCode
                console.log('id assignment ', this.id)
                await this.getEvaluated();                
                await this.getAttendance()
                console.log('selectedAssesment ', this.selectedAssesment)
                $('.modal-Evaluation').modal('show');

            },
            async updateEvaluation(){
                this.isLoading = true
                console.log('update:::::::::::::')
                console.log(this.formEvaluated)                     
                var form=  _.cloneDeep(this.formEvaluated);
                this.isLoading = false
            },
            refreshEvaluation() {
                this.callbackData();
            },
            async shownotificacion(){
                $('.bs-example-modal-notModal').modal('show'); 
            },
            closeModalSafety(css) {
                $(css).modal('hide');
            },
            formattDate(temp){
                console.log('formattDate ', temp)
                temp = moment(temp).utcOffset('-0500').toDate();
                console.log('formattDate ', temp)
                const d = new Date(temp);
                const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                return `${da}/${mo}/${ye}`
            },
        },

    }
</script>

<style>

</style>
