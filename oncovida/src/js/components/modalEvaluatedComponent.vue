<template>
        <!--Modal Evaluated-->
    <div class="modal fade modal-Evaluation" tabindex="-1" role="dialog" aria-hidden="true" >
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
                                <h4 class="modal-title" id="myModalLabel"><strong> Resultados de la evaluación Personales </strong></h4>
                            </div>

                            <div class="card-body">

                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Proactividad:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.proactivityScore">
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
                                                <select class="form-control" v-model="formEvaluated.teamworkScore">
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
                                                <select class="form-control" v-model="formEvaluated.empathyScore">
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
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivación:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.motivationScore">
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
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Prueba Psicológica:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEvaluated.psychologicalStatusCode" >
                                                    <option v-for="master in masters" v-bind:value="master.code">{{master.displayValue}} </option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                   <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Observación:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <textarea class="form-control" rows="3" v-if="formEvaluated.psychologicalStatusCode=='EVALUATION_PSYCHOLOGICAL_COMMENTED'"  id="Observacion" v-model="formEvaluated.comment" placeholder="Por favor escriba una observación.Campo obligatorio."></textarea>
                                                <textarea class="form-control" rows="3" v-else  id="Observacion" v-model="formEvaluated.comment" placeholder="Observación"></textarea>
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
         <!--Modal not-->
                <div class="modal fade bs-example-modal-notModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                <message :titleMessage="titleMessage" :bodyMessage="messageBody" ref="MessageModal">
                </message>

    </div>
    <!--Modal Evaluated-->


</template>

<script>

    import consultServices from './../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import LoadingComponent from "./../components/loadingComponent.vue";
     import Message from "./../components/MessageConfirmation.vue";
    import inputMaf from "./../components/inputMaf.vue";

    export default {
        name: "modalEvaluatedComponent",
        props: ['callbackData'],

        components:{Message,
            inputMaf
            },

        data: () => ({
          formEvaluated:{},
          formCreando:{},
          isLoading:false,
          documentNumber:'',
          id:'',
          not:'',
          masters:[],
          titleMessage:'',
          messageBody:'',
          formNot:{not:'',tit:'',},
        }),

        created () {
            this.getMasterValues();
        },

        methods: {

            async getMasterValues(){
                const response = await consultServices('getMasterValues','POST',{idMaster:'4'});
                 console.log("consume");
                console.log(response);
                this.masters = response;
            },

            async getEvaluated() {
            this.isLoading = true;

            const response = await consultServices('getVolunteer','POST',{id:this.documentNumber});
            console.log("Hola");
            const response2 = await consultServices('getEvaluation','POST',{id:this.id});
            console.log(response);

            this.formCreando = response;
            this.formEvaluated = response2;

            this.isLoading = false;
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
                   if(temp2.proactivityScore!=this.formEvaluated.proactivityScore || temp2.teamworkScore!=this.formEvaluated.teamworkScore  || temp2.empathyScore!=this.formEvaluated.empathyScore ||temp2.motivationScore!=this.formEvaluated.motivationScore
                  || temp2.psychologicalStatusCode!=this.formEvaluated.psychologicalStatusCode ||  temp2.comment!=this.formEvaluated.comment ){
                            this.evaluationUpdate();
                   }}

                    this.callbackData();
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
                 if(this.formEvaluated.proactivityScore==0 || this.formEvaluated.teamworkScore==0 || this.formEvaluated.empathyScore==0  || this.formEvaluated.motivationScore==0  || this.formEvaluated.psychologicalStatusCode == null){
                               console.log("evaluacion  "+this.formEvaluated.proactivityScore);
                               this.messageBody="Es necesario completar los campos ";
                                this.$refs.MessageModal.showModal();
                    }
                else{
                    console.log("entró a finalizar eva")

                    var form={}
                    var flag= confirm("¿Concluir evaluación? Una vez conluida la evaluación esta acción no se podrá revertir");
                    if(flag==true){

                    form.documentNumber=this.formCreando.documentNumber;
                    form.proactivityScore=this.formEvaluated.proactivityScore;
                    form.teamworkScore=this.formEvaluated.teamworkScore;
                    form.empathyScore=this.formEvaluated.empathyScore;
                    form.motivationScore=this.formEvaluated.motivationScore;
                    form.psychologicalStatusCode=this.formEvaluated.psychologicalStatusCode;
                    form.id=this.formEvaluated.id;

                    const response = await consultServices('finishEvaluation','POST',form);
                    if(response.message=="Error actualizando voluntario.")
                    {
                        this.formNot.tit="Error en el registro";
                        this.formNot.not=response.message;
                        this.shownotificacion();
                    }else{

                        const responseII = await consultServices('getMasterValues','POST',{idMaster:'9'});
                        var Values = _.find(responseII, function(o){ return o.code==response.resultcode });
                        this.formEvaluated.Resultado= Values.displayValue;
                        this.formNot.tit="Evaluación finalizada con éxito";
                        this.formNot.not="Se ha completado la evaluación de manera correcta";
                        this.shownotificacion();
                    }

                }
                }

                this.callbackData();

                this.isLoading = false;
            },

            async showModal(document, id){


                this.documentNumber = document;
                this.id=id;
                await this.getEvaluated();
                /*
                this.$refs.inputDocument.dataInput();
                this.$refs.inputLastName.dataInput();
                this.$refs.inputSecondLastName.dataInput();
                this.$refs.inputName.dataInput();
                this.$refs.inputEmail.dataInput();
                this.$refs.inputPhone.dataInput();*/
                $('.modal-Evaluation').modal('show');

            },

            refreshEvaluation() {
                this.callbackData();
            },
            async shownotificacion(){
            $('.bs-example-modal-notModal').modal('show'); },
        },

    }
</script>

<style>

</style>
