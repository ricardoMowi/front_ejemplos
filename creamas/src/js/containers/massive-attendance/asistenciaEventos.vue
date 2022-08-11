<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header" v-if="isWelcome==true">
                    <h2 v-if="id=='WORKSHOP_EVENT_DESCRIPTION_1'" >Asistencia a Bienvenida</h2>
                    <h2 v-if="id=='WORKSHOP_EVENT_DESCRIPTION_3'">Asistencia a Capacitación</h2>
                    <h2 v-if="id=='WORKSHOP_EVENT_DESCRIPTION_2'">Asistencia a Bienvenida y Capacitación</h2>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <div class="card">
                        <div class="card-header">
                            <h4>Toma de asistencia a eventos:</h4>
                            <div class="clearfix"></div>
                        </div>

                        <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de Identidad:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input v-model="document" type="text" id="document" required="required" class="form-control col-md-7 col-xs-12">
                              </div>
                          </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button"  @click="checkAttendance()"   class="btn btn-primary"> Marcar asistencia </button>
                        </div>

                    </div>
                </div> <!--card-body-->
            </div> <!--card-->
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
        </div> <!--col 12 -->

    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import modalEvaluatedComponent from "./../../components/modalEvaluatedComponent.vue";
    import inputMaf from "./../../components/inputMaf.vue";

    export default {
        name: "AsistenciaReclutamiento",
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            inputMaf,
        },
        data: () => ({
            id:window.INITIAL_STATE.id, 
            isLoading: false,
            document:'',
            event:false,
            formNot:{not:'',tit:'',}, 
            isWelcome:false,
            semester:[],
        }),
        async created () {
            await this.getMasterValues();
            if(this.id == 'WORKSHOP_EVENT_DESCRIPTION_1' || this.id == 'WORKSHOP_EVENT_DESCRIPTION_2' || this.id == 'WORKSHOP_EVENT_DESCRIPTION_3' ){
            this.isWelcome=true
            }
           
        },
        methods: {

          async getMasterValues(){
                this.isLoading = true;

                if(!window.sessionStorage.semester){
                    const response = await consultServices('getCurrentSemester','POST', {});
                    this.semester = response;
                    window.sessionStorage.semester  = JSON.stringify(this.semester);
                }else{
                    this.semester = JSON.parse( window.sessionStorage.semester );
                }
                
                this.isLoading = false;
          },  
          async checkAttendance(){
            this.isLoading = true;
            //parámetros
            var idSchoolEvent=0;
            var newAttendance = true; 
            var descriptionCode= '';
            var text='';
            this.id == 'WORKSHOP_EVENT_DESCRIPTION_1' ? text= 'Bienvenida':null
            this.id == 'WORKSHOP_EVENT_DESCRIPTION_2' ? text= 'Bienvenida y Capacitación':null
            this.id == 'WORKSHOP_EVENT_DESCRIPTION_3' ? text= 'Capacitación':null
           
            if(this.document != null && this.document !="" && this.document != undefined){
                //primero verificar si hay en la bd un voluntario con el dni ingresado
                var respVol= await consultServices('getVolunteer','POST',{id:this.document});
                if(respVol.message){
                    alert('No se encontró el dni ingresado.')
                }else{
                    //obtener colegio del voluntario
                    var getSchool =  await consultServices('getSchool','POST',{id:respVol.id, semesterCode:this.semester.id});
                    //obtener eventos del colegio
                    
                   
                    var array = await consultServices('getSchoolEvents','POST',{ semesterCode:this.semester.id, id:getSchool.AssignmentRecords[0].School.id,});                   
                    var respEvents = array.SchoolManagementEvents
                    //para evitar asistencias duplicadas (al mismo evento), listamos todas las asistencias del voluntario por el semestre
                    var formAttendances = {
                        id:respVol.id,
                        idSchool:getSchool.AssignmentRecords[0].School.id,
                        semesterCode:this.semester.id,
                    }
                    var respAttendance= await consultServices('getAttendanceReport','POST',formAttendances);
                    console.log('respEvents', respEvents )
                    console.log('id',this.id)
                    //es evento de Bienvenida: Bienvenida, Capacitación o Bienvenida y Capacitación
                    if(this.isWelcome == true){                  
                        //buscar el evento de bienvenida y obtenr su id   
                        var existEvent=false
                        for (let index = 0; index < respEvents.length; index++) {
                            if(respEvents[index].SchoolManagementEventType.descriptionCod == this.id){
                                idSchoolEvent= respEvents[index].id
                                descriptionCode = respEvents[index].SchoolManagementEventType.descriptionCode
                                existEvent =true
                            }
                        }
                        existEvent == false? descriptionCode = 'NO_EVENT': null                   
                    }
                    //si no es un evento de Bienvenida, el campo idSchoolEvent será igual al id que viene en el link 
                    else{
                        idSchoolEvent = this.id 
                        descriptionCode = event.SchoolManagementEventType.descriptionCode
                    }

                    if(descriptionCode != 'NO_EVENT'){
                            //buscar si existe una asistencia con el idSchoolEvent
                            for (let index = 0; index < respAttendance.SchoolManagementEvents.length; index++) {                   
                                if(respAttendance.SchoolManagementEvents[index].id == idSchoolEvent){
                                    if(respAttendance.SchoolManagementEvents[index].Attendances.length == 0){
                                        //nueva asistencia                            
                                        newAttendance = true
                                    }
                                }                            
                            }

                            //si newAttendance = true, registrar nueva asistencia 
                            if(newAttendance == true){
                                var flag = confirm("¿Regitrar asistencia a evento?");
                                    if(flag == true){

                                        //Armar el form para el servicio
                                        var form = {
                                            idSchoolManagementEvent:idSchoolEvent,
                                            idVolunteer: respVol.id,
                                            isClass : false,
                                            isWorkshop: false,
                                            type: descriptionCode
                                        }

                                        const response = await consultServices('createNewAttendanceByEvent','POST',form);
                                        if(response.id){
                                            this.formNot.tit="Solicitud enviada "; this.formNot.not="Se ha regitrado la asistencia de manera exitosa."
                                            this.document = ""
                                        }else{
                                            this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo registrar la asistencia de manera exitosa."
                                        }
                                        this.improvement = "";
                                        $('.modal').modal('hide');
                                        this.shownotificacion();
                                    }

                            }
                            //si newAttendance = false, ya existe asistencia para el evento
                            else{
                                alert('Ya se registró la asistencia del dni ingresado.')
                            }
                    }else{                   
                        alert('No se ha registrado '+ text +' en el calendario del colegio del creando.' )
                    }
                }
            }else{
                alert('Ingrese un número de documento para el registro de asistencia')
            }

           
         



            // if(this.isWelcome == true){
            //     //obtener el id del voluntario
            //     var response0=  await consultServices('getVolunteer','POST',{id:this.document}); 
            //     //obtener el id del cole asociado al voluntario
            //     var getSchool =  await consultServices('getSchool','POST',{id:response0.id, semesterCode:202001});
            //     var form = {
            //     semesterCode:202001,
            //     id:getSchool.AssignmentRecords[0].School.id,
            //     }           
            //     //listar los eventos del cole para este semestre     
            //     var response = await consultServices('getSchoolEventsForAssistance','POST',form);
            //     //id del evento de asistencia 
            //     var idSchoolEvent=0;
            //     for (let index = 0; index < response.length; index++) {
            //         if(response[index].SchoolManagementEventType.descriptionCode == this.id){
            //             idSchoolEvent= response[index].id
            //         }                    
            //     }
            //     console.log("idschool:::::::::::::::",idSchoolEvent )
                
            //     //cargar las asistencia del creando 
            //     var formAttendances = {
            //         id:response0.id,
            //         idSchool:getSchool.AssignmentRecords[0].School.id,//this.idSchool ---- Cambiar 24
            //         semesterCode:202001,
            //     }
            //     var response2= await consultServices('getAttendanceReport','POST',formAttendances);
            //     console.log("entróz:::::::::::::: ",response2)
            //     //verificar si no existe asistencia a este evento
            //     for (let index = 0; index < response2.SchoolManagementEvents.length; index++) {
            //         console.log("entró0:::::::::::::: ",response2.SchoolManagementEvents[index].id)
            //         if(response2.SchoolManagementEvents[index].id == idSchoolEvent){
            //               console.log("entró1:::::::::::::: ", newAttendance)
            //             if(response2.SchoolManagementEvents[index].Attendances.length == 0){
            //                 //nueva asistencia
            //                  console.log("entró2:::::::::::::: ", newAttendance)
            //                 newAttendance = true
            //             }
            //         }
                    
            //     }

            //     console.log("resutado:::::::::::::: ", newAttendance)

            // }

            // var flag = confirm("¿Regitrar asistencia a evento?");
            // console.log("enviar  ", flag);
            //     if(flag == true){
            //         //Obtener parámetros del evento y el id del creando
            //         var event = await consultServices('getSchoolEvent','POST',{id:this.id});
            //         var volunteer = await consultServices('getVolunteer','POST',{id:this.document});
            //         //Armar el form para el servicio
            //         var form = {
            //             idSchoolManagementEvent: this.id,
            //             idVolunteer: volunteer.id,
            //             isClass : false,
            //             isWorkshop: false,
            //             type: event.SchoolManagementEventType.descriptionCode
            //         }

            //         const response = await consultServices('createNewAttendanceByEvent','POST',form);
            //         if(response.id){
            //         this.formNot.tit="Solicitud enviada "; this.formNot.not="Se ha regitrado la asistencia de manera exitosa"
            //         this.document = " "
            //         }else{
            //             this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo registrar la asistencia de manera exitosa"
            //         }
            //         this.improvement = "";
            //         $('.modal').modal('hide');
            //         this.shownotificacion();
            //     }

            this.isLoading = false;
          },
          async shownotificacion(){
            $('.bs-example-modal-not').modal('show');
          },
          showEvaluated(){
              this.$refs.evaluationComponent.showModal();
          },

        }
    }
</script>
