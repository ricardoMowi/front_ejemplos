<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Toma de asistencia a evento</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                    <div class="card">
                        <div class="card-header">
                            <h4>Ingresar el documento del postulante:</h4>
                            <div class="clearfix"></div>
                        </div>

                        <div class="card-body">

                            <inputMaf type='text' v-model="documentNumber" label="Documento de identidad:" :validation="{required:true, min:'8'}" nameInput="document" etiqueta='true' ref="inputDocument" >
                            </inputMaf>

                        </div>
                        <div class="modal-footer">
                            <button type="button" @click="checkAttendance()" class="btn btn-primary"> Marcar asistencia </button>
                        </div>

                    </div>

                </div>

              <!--Modal not-->
                <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" > <center>  {{formNot.tit}}  </center> </h3>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>


                    </div>
                    <div  class="modal-body">
                          <h4 class="modal-title" > <center> {{formNot.not}} </center> </h4>
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


            </div> <!--card-->
        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
   import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import modalEvaluatedComponent from "./../../components/modalEvaluatedComponent.vue";
    import moment from 'moment';
    import * as lang from "vuejs-datepicker/src/locale";
    import inputMaf from "./../../components/inputMaf.vue";


    export default {
        name: "AsistenciaReclutamiento",
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            inputMaf,
        },
        data: () => ({
            isLoading: false,
            documentNumber:'',
            formNot:{not:'',tit:'',},
            id:window.INITIAL_STATE.id,
        }),
        created (){
        },


        methods: {

            async checkAttendance(){
                this.isLoading= true;
                if(this.documentNumber.length<8){
                   this.formNot.tit="Notificación";
                   this.formNot.not="Documento de identidad no válido";
                   $('.modal').modal('hide');
                   this.shownotificacion();
                   this.documentNumber='';


                }else{
               var form={id:this.id, documentNumber:this.documentNumber}
               console.log("evento:  "+form.id +"   dni: "+form.documentNumber);
               const response= await  consultServices('checkAttendance','POST',form);
               if(response.message){
                   this.formNot.tit="Notificación";
                   this.formNot.not=response.message;
                   $('.modal').modal('hide');
                   this.shownotificacion();
               }
               }
               this.isLoading= false;
            },
           async shownotificacion(){
            $('.bs-example-modal-not').modal('show');
           },
        }
    }
</script>
