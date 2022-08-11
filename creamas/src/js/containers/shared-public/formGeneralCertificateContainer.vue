<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card-body" background-color= #198ac8>
                <div class="card">
                    <div class="card-header" style="display: inline;">
                        <center>
                            <img src="/LogoCrea.png" alt="img" class="img-responsive" width="200" heigth="100">
                        </center>
                        <h4 style="text-align:center;">Certificación de participación</h4>
                        <h4 style="text-align:center;">En este formulario podrás descargar tu certificado de participación de aniversario</h4>
                        <div class="clearfix"></div>
                    </div>
                        <div class="card-body" style="margin-top: 30px;">
                        <div class="row" v-if="read===0">

                            <div class="col-md-12 col-sm-12 col-xs-12" v-on:keyup.enter="searchVolunteer"   v-if="read===0" >
                                <inputMaf type="text" v-model="volunteer.document" :valueInput='volunteer.document'
                                label="DNI:(*)" :validation="{required:true, alpha_num:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument"  >
                                </inputMaf>
                                <div class="small text-muted">
                                    <center style="color: #198ac8;"><span>Búsqueda de DNI</span> : <strong>Completa el campo y presiona ENTER para verficar que el DNI se encuentre registrado y poder generar el certificado. </strong></center>
                                </div>
                            </div>
                        </div>
                        <div class="row"  v-if="read===1">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">DNI:</label> 
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="volunteer.document" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">

                            </div>
                        </div>
                    </div>

                    <!--Nombre-->
                    <div class="card-body">
                        <div v-if="this.readonly===1" class="row">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres (*)</label> 
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="volunteer.name" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                            </div>
                        </div>

                        <inputMaf type='text' v-model="volunteer.name" :valueInput="volunteer.name" label="Nombres (*)" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName" v-else>
                        </inputMaf>
                    </div>

                    <!--Apellidos-->
                    <div class="card-body">
                        <div v-if="this.readonly===1" class="row">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellidos (*)</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="volunteer.lastName" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                            </div>
                        </div>
                        <inputMaf type='text' v-model="volunteer.lastName" :valueInput="volunteer.lastName" label="Apellidos (*)" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" v-else>
                        </inputMaf>
                    </div>

                    <div class="modal-footer">
                        <button ref="buttonCertificate" v-if="buttonDisabled == true" type="button" class="btn btn-primary  modal-button" disabled> Descargar certificado </button>
                        <button ref="buttonCertificate" v-else type="button" @click="generatePDF()" class="btn btn-primary  modal-button" > Descargar certificado </button>
                    </div>
                </div>
        </div> <!--card-body-->
                 <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <h3 class="modal-title" > <center>  {{formNot.tit}}  </center> </h3>
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
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import modalEvaluatedComponent from "./../../components/modalEvaluatedComponent.vue";
    import moment from 'moment';
    //import * as lang from "vuejs-datepicker/src/locale";
    import { Datetime } from 'vue-datetime';
    import inputMaf from "./../../components/inputMaf.vue";
    import { jsPDF } from "jspdf";

    export default {
        name: "registerContainer",
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            Datetime,
            inputMaf,
            jsPDF,
        },
        data: () => ({
            isLoading: true,


            ///////////////////////////
            volunteer:{
                    name:'' ,
                    lastName:'',
                    document:'',
                    birthdate: '',
                    genderCode: '',
                    email: '',
                    region: '',
                    province: '' ,
                    district: '',
                    phone:'',
                    organizationName:'',
                    password: '',
                    roleParticipation: '',
            },
            pass:'',
            email:'',
            region:' ',
            regions:[],
            documentTypes:[],
            provinces:[],
            districts:[],
            readonly:1,
            read:0,
            formNot:{not:'',tit:'',},
            buttonDisabled: true,
        }),
        created () {

           this.initLoad();
        },

        methods: {

            ////////////////////////////////////////
            async initLoad() {
                this.isLoading = true;
                var form={id:" "};
                this.documentTypes= await consultServices('getMasterValues','POST',{idMaster:16});
                this.isLoading = false;

            },

            async shownotificacion(){
                $('.bs-example-modal-not').modal('show');

            },

            /**
             * generatePDF():  Esta función permite generar el pdf con el nombre del usuario
             */
            generatePDF(){
                //url de la imagen de fondo
                var imgData = 'https://creamas-space.sfo2.digitaloceanspaces.com/anniversary/assets/Diplomafestival.png'
                //Cambiar la orientación del pdf
                var doc = new jsPDF('landscape')
                //Obtener el ancho y largo del pdf 
                var width = doc.internal.pageSize.getWidth();
                var height = doc.internal.pageSize.getHeight();
                //Obtener el nombre completo del creando
                var fullName = this.volunteer.name + ' ' + this.volunteer.lastName
                //Definir el ancho y largo para la posición del texto
                var halfWidth = width/2 
                var halfHeigth = height/2
                // console.log('Ancho del pdf: ', width)
                // console.log('Medio: ', halfWidth)
                // console.log('')
                
                var xOffset = halfWidth - (doc.getStringUnitWidth(fullName) * doc.internal.getFontSize() / 2) + 15 ;
                // console.log('xOffset actual: ', xOffset)
                //Definir nombre del documento
                var nameDoc= 'Certificado_' + this.volunteer.name + '_' + this.volunteer.lastName + '.pdf' 

                doc.addImage(imgData, 'JPEG', 0, 0, width, height)
                //Colocamos el tamaño de fuente
                //30 es bueno para nombres cortos (Hasta 15 caracteres)
                if(fullName.length > 15){
                    doc.setFontSize(20)
                }else{
                    doc.setFontSize(30)
                }

                //Agregar el texto en el medio del pdf
                // doc.text(xOffset, halfHeigth, fullName)
                //Según esta documentación, la forma de usar .text es: text(text, x, y, flags) Fuente: http://www.rotisedapsales.com/snr/cloud_staging/website/jsPDF-master/docs/global.html#text
                doc.text(fullName, halfWidth - doc.getTextWidth(fullName) / 2, halfHeigth)
                //Guardar documento
                doc.save(nameDoc);
            },

            /**
             * searchVolunteer(): Busca el voluntario con el dni ingresado en this.volunteer.document
             */
            async searchVolunteer() {

                this.isLoading = true;

                if(this.$refs.inputDocument.returnValidation() == false  ){

                   this.formNot.tit="Campo(s) vacío(s)"; this.formNot.not="Ingrese un número de documento  ";
                   $('.modal').modal('hide');
                   this.shownotificacion();


                }else{

                    var responseStatus='';
                    const response = await consultServices('checkDocument','POST',{id:this.volunteer.document},(status)=>{
                        responseStatus = status;
                    });
                    // console.log('response ', response)
                    this.regions = await consultServices('getRegions','POST',{});
                    if(response == null ){
                            this.formNot.tit="Documento no registrado"
                            this.formNot.not="El documento ingresado no está registrado";
                            this.shownotificacion();
                    }else{
                        if(response.volunteer){
                            this.volunteer.document=response.volunteer.documentNumber;
                            this.volunteer.name=response.volunteer.name;
                            this.volunteer.lastName=response.volunteer.lastName;
                            this.volunteer.email=response.volunteer.email;
                            this.volunteer.phone=response.volunteer.phone;
                            this.id=response.volunteer.id;
                            this.readonly=1;
                            this.read=1;    
                            this.buttonDisabled = false;
                            //cargar el registro de participación
                            const responseParticipation = await consultServices('getParticipantByDocument','POST',{documentNumber:this.volunteer.document});
                            if(responseParticipation.status == 200 ){
                                console.log('responseParticipation')
                                //si existe el registro de participación, cargar el rol en el atributo this.volunteer.roleParticipation
                                if(responseParticipation.participant.SpecialEventParticipations.length > 0){
                                    console.log('responseParticipation: ', responseParticipation.participant.SpecialEventParticipations[0].roleCode)
                                    this.volunteer.roleParticipation = responseParticipation.participant.SpecialEventParticipations[0].roleCode
                                }
                            }
                        }
                    }
                }
                this.isLoading = false;


            }


        }


    }
</script>
<style>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
.modal-footer { 
    padding-right: 0px;
}
.modal-button {
    margin-top: 20px;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    label{
    text-align: right;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    label{
    text-align: right;
    }
}


</style>
