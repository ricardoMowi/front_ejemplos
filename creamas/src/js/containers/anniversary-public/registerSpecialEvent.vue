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
                            </div>

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
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de Documento (*):</label>
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
                                    <input type="text" v-model="volunteer.name" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
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
                                    <input type="text" v-model="volunteer.lastName" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.lastName" :valueInput="volunteer.lastName" label="Apellidos (*):" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" v-else>
                            </inputMaf>
                        </div>

                        <!--Fecha de nacimiento-->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                     <input type="text" v-model="volunteer.birthdate" required="required" class="form-control col-md-7 col-xs-12" v-if="this.readonly===1" readonly="readonly">
                                     <Datetime  v-model="volunteer.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date" v-else ></Datetime>
                                </div>
                            </div>
                        </div>

                        <!--Género-->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Género (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="volunteer.genderCode" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                        <select class="form-control" v-model="volunteer.genderCode"  v-else>
                                              <option disabled="disabled" value="">Seleccione</option>
                                              <option value="M" >Masculino</option>
                                              <option value="F">Femenino</option>
                                        </select>
                                </div>
                            </div>
                        </div>

                        <!--Email-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.email" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.email" :valueInput="volunteer.email" label="Email (*):" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" v-else>
                            </inputMaf>
                        </div>

                        <!--Confirmar tu Email-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirmar tu Email:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="email" required="required" class="form-control col-md-7 col-xs-12"  readonly="readonly">
                                </div>
                            </div>
                            <inputMaf type='text' v-model="email" :valueInput="email" label="Confirmar tu Email (*):" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail2" v-else>
                            </inputMaf>
                         </div>

                        <!--Region-->
                         <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Región (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                     <input type="text" v-model="volunteer.region" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                    <select class="form-control"  @change="listProvinces" v-model="volunteer.region" v-else>
                                      <option disabled="disabled" value="">Selecciona una región</option>
                                      <option v-for="item in regions" v-bind:value="item.id" >
                                          {{item.name}}
                                      </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!--Provincia-->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Provincia (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input type="text" v-model="volunteer.province" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                  <select class="form-control" @change="listDistricts"  v-model="volunteer.province" v-else>
                                      <option disabled="disabled" value="">Selecciona una provincia de la región</option>
                                      <option v-for="item in provinces" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!--Distrito-->
                          <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                   <input type="text" v-model="volunteer.district" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                   <select class="form-control" v-model="volunteer.district" v-else>
                                      <option disabled="disabled" value="">Selecciona un distrito de la provincia</option>
                                      <option v-for="item in districts" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!--Telefono-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.phone" required="required" class="form-control col-md-7 col-xs-12"  readonly="readonly" >
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.phone" :valueInput="volunteer.phone" label="Teléfono (*):" :validation="{numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" v-else>
                            </inputMaf>
                        </div>

                        <!--Organizacion-->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Centro de Trabajo (*):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.organizationName" required="required" class="form-control col-md-7 col-xs-12"   v-if="this.readonly===1" readonly="readonly">
                                    <input type="text" v-model="volunteer.organizationName" required="required" class="form-control col-md-7 col-xs-12"   v-else>
                                </div>
                            </div>
                        </div>

                        <!--Contraseña-->
                        <!-- <div class="card-body" v-if="read==0">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Contraseña (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="password"  v-model="volunteer.password" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly"  >
                                    <input type="password" autocomplete="off" v-model="volunteer.password" required="required" class="form-control col-md-7 col-xs-12" v-else  >
                                </div>
                            </div>
                        </div>
                        <div class="card-body" v-if="read==0">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirma la contraseña (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="password"  v-model="pass" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                    <input  type="password"  v-model="pass" required="required" class="form-control col-md-7 col-xs-12" v-else autocomplete="off">
                                </div>
                            </div>
                        </div> -->
                         <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Cantidad de años como creando activo(*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.totalYears" required="required" class="form-control col-md-7 col-xs-12" v-if="this.readonly===1" readonly="readonly">
                                    <input type="number"  v-model="volunteer.totalYears" class="form-control col-md-7 col-xs-12" min="0" max="100" v-else>
                                </div>
                            </div>                           
                         </div>

                         <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿En qué semestres estuviste? (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.yearsDetail" required="required" class="form-control col-md-7 col-xs-12" v-if="this.readonly===1" readonly="readonly">
                                    <input v-model="volunteer.yearsDetail" class="form-control col-md-7 col-xs-12" min="0" max="100" v-else>
                                </div>
                            </div>                           
                         </div>

                        <!--Rol para participar -->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué rol te gustaría tener? - LLENAR AL FINAL DE LA REUNIÓN (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input type="text" v-model="volunteer.role" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                  <select class="form-control"  v-model="volunteer.role"  @change="onChangeRole()" v-else>
                                      <option disabled="disabled" value="">Selecciona un rol</option>
                                      <option v-for="item in roles" v-bind:value="item.code">
                                          {{item.displayValue}}
                                      </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" v-if="otherFlag==true ">
                            <inputMaf type='text' v-model="form.roleDetail" :valueInput="form.roleDetail"  label="Ingrese otro rol:" :validation="{required:false}" nameInput="workshopName" etiqueta='true' ref="inputWorkshopName" >
                            </inputMaf>
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
                    formStep: 2, //Indica el paso de registro en el aniversario
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
                this.roles= await consultServices('getMasterValues','POST',{idMaster:29});
                this.isLoading = false;
            },

            async listProvinces() {
                var ctx = this;
                setTimeout(async () => {
                    if(ctx.volunteer.region ){
                        var form={idRegion:this.volunteer.region}
                        ctx.isLoading=true;
                        ctx.provinces= await  consultServices('getProvincesByRegion','POST',form);
                        ctx.isLoading=false;
                    }
                }, 400);
            },

            async listDistricts() {
                var ctx = this;

                setTimeout(async () => {
                    if(ctx.volunteer.province ){
                        var form={idProvince:this.volunteer.province }
                        ctx.isLoading=true;
                        ctx.districts= await  consultServices('getDistrictsByProvince','POST',form);
                        ctx.isLoading=false;

                    }

                }, 400);
            },

            async shownotificacion(){
                $('.bs-example-modal-not').modal('show');
            },

            async registerVolunteer() {
                console.log("entró a registerVolunteer", this.volunteer)
                this.isLoading = true; 
                var flagSelectedRole =  this.volunteer.role ? flagSelectedRole = true: flagSelectedRole = false
                var valueValidation= true;

                 if(await this.$refs.inputName.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                 await this.$refs.inputEmail.returnValidationAsync() == false || await this.$refs.inputEmail2.returnValidationAsync() == false ||
                 flagSelectedRole == false || await this.$refs.inputDocument.returnValidationAsync() == false || this.volunteer.birthdate == null || this.volunteer.birthdate == ''|| this.volunteer.region == ''|| this.volunteer.province == ''|| this.volunteer.district == ''||
                 this.volunteer.birthdate == '' || this.volunteer.yearsDetail == null || this.volunteer.yearsDetail == '' || this.volunteer.totalYears == null
                 ){ 
                     console.log("entró al primer if")
                     valueValidation = false;
                 }


                //si alguno los campos obligatorios está vacío, informar 
                if(valueValidation == false){
                        this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete los campos obligatorio (*)";
                        $('.modal').modal('hide');
                        this.shownotificacion();  
                }else{
                    //Validar si el email ingresado coincide    
                    if(this.volunteer.email!=this.email){ 
                        this.formNot.tit="Error"; this.formNot.not="Los emails ingresados no coinciden"; 
                        $('.modal').modal('hide');
                        this.shownotificacion();                           
                    }
                    //si hay coincidencia entre emails , registrar
                    else{
                        //Registrar participación
                        var idVolunteer= this.id   
                        var flag= confirm("¿Registrar participación?");
                         console.log('form::::::', this.volunteer)
                        if(flag == true){
                            var form={}
                            form.idVolunteer = idVolunteer;
                            form.roleCode = this.volunteer.role;
                            this.otherFlag == true?  form.roleDetail = this.volunteer.roleDetail : form.roleDetail = ''  
                            //idTeam y eventDate deben ir como nulos al no se un registro de alumni
                            this.volunteer.idTeam = null
                            this.volunteer.eventDtae = null                
                            console.log('form::::::', this.volunteer)
                            const response = await consultServices('participationRegister','POST',this.volunteer);
                            if(response.message){
                                this.formNot.tit="Esta opción no es posible"; this.formNot.not=response.message;
                                this.volunteer.formStep = 2;
                            }else{
                                this.formNot.tit="Registro exitoso";
                                this.formNot.not="Registro realizado de manera correcta."; 
                                this.volunteer.documentType="";
                                this.volunteer.document=""; 
                                this.read= 0;  
                                this.ClearForm();
                                this.volunteer ={}
                                this.volunteer.formStep = 2;
                            }
                            $('.modal').modal('hide');
                            this.shownotificacion();   
                        }
                    }
                }

                this.isLoading = false;
    


            },

            async ClearForm(){
                     this.volunteer.name="";
                     this.volunteer.lastName="";
                     this.volunteer.birthdate="";
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
                     this.volunteer.yearsDetail = '';
                     this.volunteer.totalYears = null;
                     this.volunteer.role = null;
                     this.$refs.inputName ? await this.$refs.inputName.clearValue() : null
                     this.$refs.inputLastName ? await this.$refs.inputLastName.clearValue() :null
                     this.$refs.inputEmail ? await this.$refs.inputEmail.clearValue() :null
                     this.$refs.inputEmail2 ? await this.$refs.inputEmail2.clearValue() :null
                     this.$refs.inputPhone ? await this.$refs.inputPhone.clearValue() :null
                     this.$refs.inputDocument ? await this.$refs.inputDocument.clearValue() :null
                     
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

                this.isLoading = true;
                if(this.$refs.inputDocument.returnValidation() == false || !this.volunteer.documentType ){
                   this.formNot.tit="Campo(s) vacío(s)"; this.formNot.not="Complete el tipo de documento y el número de documento ";
                   $('.modal').modal('hide');
                   this.shownotificacion();
                }else{
                    var documentOld = this.volunteer.documentType;
                    var responseStatus='';
                    const response = await consultServices('checkDocumentSpecialEvent','POST',{id:this.volunteer.document});
                   
                   //Cargar datos de ubigeo: primero cargar las regiones
                    this.regions = await consultServices('getRegions','POST',{});
                    //si el voluntario tiene registrado una región cargar la provincias de la región
                    if(response.volunteer != null){
                        if(response.volunteer.region){
                            this.provinces =  await consultServices('getProvincesByRegion','POST',{idRegion:response.volunteer.region});
                                //si el voluntario tiene registrado una provincia cargar los distritos
                                if(response.volunteer.province){
                                    this.districts =  await consultServices('getDistrictsByProvince','POST',{idProvince:response.volunteer.province});
                                }
                        }
                    }

                    //Cargar los datos del registro obtenido 
                    if(response.message == "CREAMAS"){
                        this.readonly=2;
                        this.read=0;
                        this.id = response.volunteer.id;
                        this.volunteer.name=response.volunteer.name;
                        this.volunteer.lastName=response.volunteer.lastName;
                        this.volunteer.email=response.volunteer.email;
                        this.volunteer.phone=response.volunteer.phone;
                        this.volunteer.birthdate = response.volunteer.birthdate;
                        this.volunteer.organizationName = response.volunteer.organizationName;
                        this.volunteer.genderCode = response.volunteer.genderCode;
                        response.volunteer.province !=null ? this.volunteer.province = response.volunteer.province :null
                        response.volunteer.region !=null ? this.volunteer.region = response.volunteer.region :null
                        response.volunteer.district !=null ? this.volunteer.district = response.volunteer.district :null

                    }
                    if(response.message == "SYNCHRONIZER"){
                        this.readonly=2;
                        this.read=0;
                        var docTypeTemp = _.find(this.documentTypes, function(o){ return o.code == documentOld });
                        // this.volunteer.documentType=docTypeTemp.displayValue;
                        this.volunteer.name=response.volunteer.first_name;
                        this.volunteer.lastName=response.volunteer.last_name;
                        this.volunteer.email=response.volunteer.email;
                        this.volunteer.phone=response.volunteer.mobile_phone;
                        this.id=response.id;
                    }
                    if(response.message == "NOT_REGISTERED"){
                        this.readonly=2
                        this.read=0; 
                        //limpiar campos
                        this.ClearForm();
                    }
                }
                this.isLoading = false;
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
