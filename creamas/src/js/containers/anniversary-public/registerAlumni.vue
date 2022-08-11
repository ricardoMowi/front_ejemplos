<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">

                    <div class="card-body" background-color= #198ac8>
                    <div class="card">
                            <div class="card-header">
                                <center>
                                    <img src="/LogoCrea.png" alt="img" class="img-responsive" width="200" heigth="100">
                                </center>
                                <h1>10 años Crea+</h1>
                                <h4>Como saben, este año celebraremos los 10 años de Crea+ en colegios públicos.</h4>
                                <h4>Queremos que sea una celebración de cumpleaños número 10 que sirva para REENCONTRARNOS y CELEBRAR con todos los que hemos hecho posible que Crea+ exista.</h4>
                                <h4>Te pedimos dejes aquí tus datos para mantenerte al tanto de los preparativos de esta celebración y para mantenernos en contacto de aquí a futuro. </h4>
                                <h4>Gracias, ¡será genial contar contigo! </h4>
                                <h5>(*) Campos requeridos</h5>              
                               
                            </div>

                            <div class="card-body">
                                <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Has sido Creando (Voluntario de Crea+)*?:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control"  @change="listEvents" v-model="volunteer.wasCreando">
                                              <option disabled="disabled" value="">Seleccione</option>
                                              <option>Si</option>
                                              <option>No </option>
                                        </select>
                                    </div>
                                </div>
                            </div>                            

                            <div class="card-body">
                                <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo que te convocó (*):</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="volunteer.idTeam">
                                        <option disabled="disabled" value="">Selecciona un equipo</option>
                                        <option v-for="item in teams" v-bind:value="item.id" >
                                        {{item.name}}
                                        </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="card-body">
                                <div class="row">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de documento(*)</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12" >
                                            <select class="form-control" v-model="volunteer.documentType"  v-if="read===0" >
                                                <option disabled="disabled" value="">Selecciona un tipo de documento</option>
                                                <option v-for="item in documentTypes" v-bind:value="item.code">
                                                    {{item.displayValue}}
                                                </option>
                                            </select>
                                            <input type="text" v-model="volunteer.documentType" required="required" class="form-control col-md-7 col-xs-12"  v-if="read===1" readonly="readonly">
                                        </div>
                                </div>
                            </div> -->

                            <div class="card-body">
                                <div class="row" v-if="read===0">
                                    <div class="col-md-12 col-sm-12 col-xs-12" v-on:keyup.enter="searchVolunteer"   v-if="read===0" >
                                        <inputMaf type="text" v-model="volunteer.document" :valueInput='volunteer.document'
                                        label="Número de Documento (*):" :validation="{required:true, alpha_num:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument"  >
                                        </inputMaf>
                                        <div class="small text-muted">
                                            <center style="color: blue;"><span>Búsqueda de documento</span>: Completa el campo y presiona ENTER en tu PC o celular. </center>
                                        </div>
                                    </div>
                                </div>
                                <div class="row"  v-if="read===1">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de Documento (*): </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="volunteer.document" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                                </div>
                            </div>

                         <!--Nombre-->
                         <div class="card-body">

                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.name" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly" >
                                </div>
                            </div>

                            <inputMaf type='text' v-model="volunteer.name" :valueInput="volunteer.name" label="Nombres (*):" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName" v-else>
                            </inputMaf>
                        </div>

                        <!--Apellidos-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellidos:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.lastName" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly" >
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.lastName" :valueInput="volunteer.lastName" label="Apellidos (*):" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" v-else>
                            </inputMaf>
                        </div>


                        <!--Email-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.email" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly" >
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.email" :valueInput="volunteer.email" label="Email (*):" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" v-else>
                            </inputMaf>
                        </div>

                        <!--Confirmar tu Email-->
                         <!-- <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirmar tu Email: (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="email" required="required" class="form-control col-md-7 col-xs-12"  readonly="readonly">
                                </div>
                            </div>
                            <inputMaf type='text' v-model="email" :valueInput="email" label="Confirmar tu Email (*):" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail2" v-else>
                            </inputMaf>
                         </div> -->

                        <!--Telefono-->
                        <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono: </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.phone" required="required" class="form-control col-md-7 col-xs-12"  readonly="readonly"  >
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.phone" :valueInput="volunteer.phone" label="Teléfono (*):" :validation="{numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" v-else>
                            </inputMaf>
                        </div>

                        <div class="card-body" v-if="this.showEvents==true">    
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿En qué fecha podrás asistir a la Presentación de la Celebración por los 10 años (vía Zoom, te llegará el link a tu email)?: (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select class="form-control" v-model="volunteer.eventDate">
                                    <option disabled="disabled" value="">Selecciona una fecha
                                    </option>
                                    <option v-for="item in events" v-bind:value="item.eventDate" >
                                    {{item.displayValue}}
                                    </option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="modal-footer">
                            <button type="button" @click="registerVolunteer()" class="btn btn-primary"> Registrar </button>
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


    export default {
        name: "RegisterVolunteerContainer",
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            Datetime,
            inputMaf,
        },
        data: () => ({
            isLoading: true,
            ///////////////////////////
            event: window.INITIAL_STATE.event, 
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
                wasCreando: '',
                idTeam: '',
                formStep: 1, //Indica el paso de registro en el aniversario
            },
            pass:'',
            email:'',
            region:' ',
            regions:[],
            documentTypes:[],
            provinces:[],
            roles:[],
            districts:[],
            readonly:1,
            read:0,
            formNot:{not:'',tit:'',},
            otherFlag:false,
            id:-1, 
            teams:[],
            showEvents : false,
            events:[
                // {displayValue:'Martes 8 de set., 7-8 pm', eventDate:'2020-09-08'},
                // {displayValue:'Jueves 10 de set., 7-8 pm', eventDate:'2020-09-10'},
                // {displayValue:'Sábado 12 de set., 4-5 pm', eventDate:'2020-09-12'},
                { displayValue:'Lunes 14 de set., 7-8 pm', eventDate:'2020-09-14' },
                {displayValue:'No puedo asistir a ninguna, pero quiero participar.', eventDate: '1999-12-12'},
                {displayValue:'No deseo participar.', eventDate: 'null'},
            ]


        }),
        created () {
           this.initLoad();
        },

        methods: {

            ////////////////////////////////////////
            async initLoad() {
                this.isLoading = true;
                var form={id:" "};
                await this.getTeams();
                //Comentados para Crea+ Digital
                // this.documentTypes= await consultServices('getMasterValues','POST',{idMaster:16}); 
                // this.roles= await consultServices('getMasterValues','POST',{idMaster:29});
                this.isLoading = false;
            },

            listEvents(){
                // console.log('entró ',this.volunteer.wasCreando )
                // console.log('entró aaaa',this.showEvents )
                this.volunteer.wasCreando == 'Si'? this.showEvents = true: this.showEvents =false
                // console.log('salida aaaa',this.showEvents )
            },

            async getTeams(){
               this.teams = await consultServices('listTeams','POST',{});            
            },

            async shownotificacion(){
                $('.bs-example-modal-not').modal('show');
            },

            async registerVolunteer() {
                if(this.volunteer.document != "" ){
                    this.isLoading = true; 
                    var flagSelectedRole =  this.volunteer.role ? flagSelectedRole = true: flagSelectedRole = false
                    var valueValidation= true;

                    if(await this.$refs.inputName.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                    await this.$refs.inputEmail.returnValidationAsync() == false || this.volunteer.idTeam == '' ||
                    this.volunteer.wasCreando == '' || 
                    this.volunteer.idTeam == '' || 
                    (this.showEvents && (this.volunteer.eventDate == null || this.volunteer.eventDate == ''))
                    ){                     
                        valueValidation = false;
                    }


                    //si alguno los campos obligatorios están vacíos, informar 
                    if(valueValidation == false){
                            this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete los campos obligatorio (*)";
                            $('.modal').modal('hide');
                            this.shownotificacion();  
                    }else{
                            //Registrar participación
                            var idVolunteer= this.id   
                            var flag= confirm("¿Registrar participación?");
                            // console.log('form::::::', this.volunteer)
                            if(flag == true){     
                                //birthdate, district, province y region deben ir como nulos al ser un registro de alumni
                                this.volunteer.birthdate = null  
                                this.volunteer.district = null  
                                this.volunteer.province = null  
                                this.volunteer.region = null   
                                this.volunteer.eventDate = this.volunteer.eventDate == 'null' ? null : this.volunteer.eventDate        
                                console.log('form cambio::::::', this.volunteer)
                                const response = await consultServices('participationRegister','POST',this.volunteer);

                                if(response.status == 200){
                                    this.formNot.tit="Registro exitoso";
                                    this.formNot.not="Registro realizado de manera correcta."; 
                                    this.volunteer.documentType="";
                                    // this.volunteer.document=""; 
                                    this.read= 0;  
                                    this.ClearForm();
                                    // this.volunteer ={}
                                }else{
                                    this.formNot.tit="Esta opción no es posible"; this.formNot.not=response.message;
                                }
                                $('.modal').modal('hide');
                                this.shownotificacion();   
                            }
                    }  
                }else{
                    this.formNot.tit="Campo vacío"; this.formNot.not="Complete el número de documento ";
                   $('.modal').modal('hide');
                   this.shownotificacion();
                }
                console.log("entró a registerVolunteer", this.volunteer)             
                this.isLoading = false;   
            },

            async ClearForm(){
                    this.volunteer.idTeam="";
                    this.volunteer.name="";
                    this.volunteer.lastName="";
                    this.volunteer.birthdate="";
                    this.volunteer.eventDate="";
                    this.volunteer.genderCode="";
                    this.volunteer.email="";
                    this.volunteer.region="";
                    this.volunteer.province="";
                    this.volunteer.district="";
                    this.volunteer.phone="";
                    this.volunteer.organizationName="";
                    this.volunteer.password="";
                    this.pass="";
                    this.email="";
                    this.$refs.inputName ? await this.$refs.inputName.clearValue() : null
                    this.$refs.inputLastName ? await this.$refs.inputLastName.clearValue() :null
                    this.$refs.inputEmail ? await this.$refs.inputEmail.clearValue() :null
                    this.$refs.inputPhone ? await this.$refs.inputPhone.clearValue() :null
                    //  this.$refs.inputDocument ? await this.$refs.inputDocument.clearValue() :null   
            },

            onChangeRole(){
                if(this.volunteer.role == 'ROLE_OTHER'){
                this.otherFlag=true;
                }
                else{                  
                    this.otherFlag=false;
                }
            },

            async searchVolunteer() {

                // this.isLoading = true;
                if(this.$refs.inputDocument.returnValidation() == false ){
                   this.formNot.tit="Campo vacío"; this.formNot.not="Complete el número de documento ";
                   $('.modal').modal('hide');
                   this.shownotificacion();
                }else{
                    this.isLoading = true;
                    var documentOld = this.volunteer.documentType;
                    var responseStatus='';
                    const response = await consultServices('checkDocumentSpecialEvent','POST',{id:this.volunteer.document});
                   

                    //Cargar los datos del registro obtenido 
                    if(response.message == "CREAMAS"){
                        this.readonly=2;
                        this.read=0;
                        this.id = response.volunteer.id;
                        this.volunteer.name=response.volunteer.name;
                        this.volunteer.lastName=response.volunteer.lastName;
                        this.volunteer.email=response.volunteer.email;
                        this.volunteer.phone=response.volunteer.phone;
                    }
                    if(response.message == "SYNCHRONIZER"){
                        this.readonly=2;
                        this.read=0;
                        this.volunteer.name=response.volunteer.first_name;
                        this.volunteer.lastName=response.volunteer.last_name;
                        this.volunteer.email=response.volunteer.email;
                        this.volunteer.phone=response.volunteer.mobile_phone;
                        this.id=response.id;
                    }
                    if(response.message == "NOT_REGISTERED"){
                        this.readonly=2
                        this.read=0; 
                        this.ClearForm();


                        // this.volunteer.name="";
                        // this.volunteer.lastName="";
                        // this.volunteer.birthdate="";
                        // this.volunteer.email="";
                        // this.volunteer.phone="";
                        // console.log('refs: ', this.$refs)
                        // // this.$refs.inputName.clearValue();
                        // // await this.$refs.inputLastName.clearValue();
                        // // await this.$refs.inputPhone.clearValue();
                        // // await this.$refs.inputEmail.clearValue();                        
                        // this.volunteer.eventDate = '';
                        // // this.volunteer.idTeam = null;
                        // console.log("volunteer not registred ", this.volunteer)
                    }
                    this.isLoading = false;
                }
                // this.isLoading = false;
            }
        }


    }
</script>
<style>
.inner {
  display: table;
  margin: 0 auto;

}

.outer {

  width:100%
}
</style>
