<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">

                    <div class="card-body" background-color= #198ac8>

                    
                    <div class="card" style="display: grid;">

                        <div class="container-header"  >
                            <div class="centered-div-header">
                                <div class="card-header" style="text-align:center;">
                                    <h4 style="text-align:left;">Quiero ser creando</h4>
                                        <h4 style="text-align:left;">Regístrate para ser parte del proceso de selección</h4>
                                        <h5 style="text-align:left;">(*) Campos requeridos</h5>                                   
                                </div>
                            </div>
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
                                           label="Documento:(*)" :validation="{required:true, alpha_num:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument"  >
                                           </inputMaf>
                                           <div class="small text-muted">
                                            <center><span>Búsqueda de documento</span> | Completa el campo y presiona ENTER para verficar que el documento no se encuentre registrado y poder registrar un nuevo creando  </center>
                                           </div>
                                          </div>



                            </div>
                            <div class="row"  v-if="read===1">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento:(*)</label>
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

                        <!--Fecha de nacimiento-->
                          <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                     <input type="text" v-model="volunteer.birthdate" required="required" class="form-control col-md-7 col-xs-12" v-if="this.readonly===1" readonly="readonly">
                                     <Datetime  v-model="volunteer.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date" v-else ></Datetime>
                                </div>
                            </div>
                        </div>

                        <!--Género-->
                          <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Género (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                         <input type="text" v-model="volunteer.genderCode" required="required" class="form-control col-md-7 col-xs-12"  v-if="this.readonly===1" readonly="readonly">
                                        <select class="form-control" v-model="volunteer.genderCode"  v-else>
                                              <option disabled="disabled" value="">Seleccione</option>
                                              <option >Masculino</option>
                                              <option>Femenino</option>
                                        </select>
                                </div>
                            </div>
                        </div>

                        <!--Email-->
                         <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.email" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.email" :valueInput="volunteer.email" label="Email (*)" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" v-else>
                            </inputMaf>
                        </div>

                        <!--Confirmar tu Email-->
                          <div class="card-body">
                            <div v-if="this.readonly===1" class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirmar tu Email (*)</label>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Región</label>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Provincia</label>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito</label>
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
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.phone" required="required" class="form-control col-md-7 col-xs-12"  readonly="readonly" >
                                </div>
                            </div>
                            <inputMaf type='text' v-model="volunteer.phone" :valueInput="volunteer.phone" label="Teléfono" :validation="{numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" v-else>
                            </inputMaf>
                        </div>

                        <!--Organizacion-->
                        <div class="card-body">
                            <div class="row">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Organización</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="volunteer.organizationName" required="required" class="form-control col-md-7 col-xs-12"   v-if="this.readonly===1" readonly="readonly">
                                     <input type="text" v-model="volunteer.organizationName" required="required" class="form-control col-md-7 col-xs-12"   v-else>
                                </div>
                            </div>
                        </div>

                        <!--Contraseña-->
                        <div class="card-body" v-if="read==0">
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
            id:-1, ///ID QUE SE OBTIENE DEL SERVICIO CHECKDOCUMENT


            ///FIN DE STEPS//////////////


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
                this.isLoading = true;
                var form = _.cloneDeep(this.volunteer);
                    var valueValidation = true;

                    if(this.read==0){
                        if(!this.volunteer.document || !this.volunteer.name  || !this.volunteer.lastName || !this.volunteer.email || !this.email || !this.volunteer.password || !this.pass || !this.volunteer.genderCode  ){
                        valueValidation = false;} 

                    }else{
                        if(!this.volunteer.document || !this.volunteer.name  || !this.volunteer.lastName || !this.volunteer.email || !this.email || !this.volunteer.genderCode  ){
                        valueValidation = false;}
                    }

                    if(this.readonly!=1){
                        if(await this.$refs.inputName.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                        await this.$refs.inputEmail.returnValidationAsync() == false || await this.$refs.inputEmail2.returnValidationAsync() == false ||
                        await this.$refs.inputPhone.returnValidationAsync() == false){
                            valueValidation = false;
                        }
                    }

                    if(valueValidation == false){
                        this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete los campos obligatorio (*)";
                    }else{
                        if(this.volunteer.email!=this.email){ this.formNot.tit="Error"; this.formNot.not="Los emails ingresados no coinciden"; }else{
                        if(this.volunteer.password!=this.pass){ this.formNot.tit="Error"; this.formNot.not="La constraseñas ingresadas no coinciden";this.volunteer.password=""; this.pass=""; }
                            else{
                            form.documentNumber=this.volunteer.document;
                            form.documentTypeCode=this.volunteer.documentType;
                            form.name = this.volunteer.name;
                            form.lastName = this.volunteer.lastName;                            
                            if( this.volunteer.genderCode=='Masculino'){form.genderCode='M'}
                            if(this.volunteer.genderCode=='Femenino'){form.genderCode='F'}
                            form.email = this.volunteer.email;


                            this.volunteer.region == "" ? form.region = null :form.region = this.volunteer.region;                            
                            this.volunteer.province == "" ? form.province = null :form.province = this.volunteer.province;
                            this.volunteer.district == "" ? form.district = null :form.district = this.volunteer.district;
                            this.volunteer.birthdate == "" ? form.birthdate = null :form.birthdate = moment( this.volunteer.birthdate).format('YYYY/MM/DD');
                            this.volunteer.phone == "" ? form.phone = null :form.phone = this.volunteer.phone;
                            this.volunteer.organizationName == "" ? form.organizationName = null :form.organizationName=this.volunteer.organizationName;
                            
                            if(valueValidation = false){
                                form.password = this.volunteer.password;
                            }

                            if(this.id!=-1){form.id=this.id}

                            

                            const response = await consultServices('signUp','POST',form);
                            console.log('respuesta del back: ', response)
                            if(response.status == 400){
                                  this.formNot.tit="Error en el registro"; this.formNot.not=response.message;
                            }else if(response.status == 200)
                            {
                                this.formNot.tit="Registro exitoso";
                                this.formNot.not="Registro realizado correctamente."; 
                                this.volunteer.documentType="";
                                this.volunteer.document=""; 
                                this.read= 0;  
                                this.ClearForm();
                                this.volunteer ={}
                            }
                            this.ClearForm();
                            }
                        }

                    }

                    this.isLoading = false;

                   $('.modal').modal('hide');
                    this.shownotificacion();

            },
            async ClearForm(){
                     this.volunteer.documentType = "";
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
                     await this.$refs.inputName.clearValue();
                     await this.$refs.inputDocument.clearValue()
                     await this.$refs.inputLastName.clearValue()
                     await this.$refs.inputEmail.clearValue()
                     await this.$refs.inputEmail2.clearValue()
                     await this.$refs.inputPhone.clearValue()

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
                const response = await consultServices('checkDocument','POST',{id:this.volunteer.document},(status)=>{
                    responseStatus = status;
                });
                this.regions = await consultServices('getRegions','POST',{});

                if(response){
                        if(response.documentType == null){
                            var docTypeTemp = _.find(this.documentTypes, function(o){ return o.code == documentOld });
                        }
                        else{
                            var docTypeTemp = _.find(this.documentTypes, function(o){ return o.code == response.documentType });
                        }
                        this.volunteer.documentType=docTypeTemp.displayValue;
                        this.volunteer.name=response.name;
                        this.volunteer.lastName=response.lastName;
                        this.volunteer.email=response.email;
                        this.volunteer.phone=response.phone;
                        this.id=response.id;

                        this.readonly=2;
                        this.read=1;

                        if(response.message){
                            this.volunteer.documentType = "";
                            this.volunteer.document = "";
                            await this.$refs.inputDocument.clearValue();
                            this.formNot.tit="Documento ya registrado"
                            this.formNot.not=response.message;
                            this.readonly=1;
                            this.read=0;
                            $('.modal').modal('hide');
                            this.shownotificacion();
                        }
                }
                else{this.readonly=2  }
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

.container-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.centered-div-header {
    width: 80%;
    height: 140px;
    margin: 10px;
    padding: 5px;
}

</style>
