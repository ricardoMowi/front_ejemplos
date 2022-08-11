<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="card">


      <div class="card">
        <div>
          <h2>{{title}}</h2>
          <hr lass="my-4"/>
        </div>
        <img src="/logo_desktop.png" class="rounded mx-auto d-block" height="200" width="200">
        <div class="card-body">
          <h2>{{message}}</h2>
          <hr lass="my-4"/>
          <p class="lead">
            <!-- <small>Aquí encontrarás información para tu día a día. Accede a todas las opciones disponibles en el menú izquierdo.<br/>
            Recuerda siempre mantener actualizado tu <a href="/dashboard/perfil">perfil</a>.</small> -->
            <small>{{secondaryMessage}}</small>
          </p>
        </div>
      </div>

      <div class="card-body" v-if="this.showSteps == true">
        <!--Activo-->

        <div class="card" id="accordion" style="padding-bottom: 0px;">
            <div class="panel panel-default" >
                <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapse1" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h2>Paso 1: Registrarse en la plataforma</h2>
                  <div class="nav navbar-right panel_toolbox" style="padding-top: 14px;">
                      <input type="checkbox" v-model="checkStep1" disabled=true > 
                  </div>                  
                  <div class="clearfix">
                  </div>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body">
                       
                       <div class="panel-body" style="padding-bottom:5px; padding-top: 10px;">
                        <inputMaf type='text' v-model="formPersonalInformation.name" :valueInput="formPersonalInformation.name" label="Nombres:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="name" etiqueta='true' ref="inputName">
                        </inputMaf>
                       </div>
                       
                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.lastName" :valueInput="formPersonalInformation.lastName" label="Apellido:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="lastName" etiqueta='true' ref="inputLastName">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.secondLastName" :valueInput="formPersonalInformation.secondLastName" label="Segundo Apellido:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="secondLastName" etiqueta='true' ref="inputSecondLastName">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.documentNumber"  :valueInput="formPersonalInformation.documentNumber" label="DNI o carnet de extranjería:" :validation="{required:true}" nameInput="documentNumber" etiqueta='true' ref="inputDocumentNumber">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.ruc" :valueInput="formPersonalInformation.ruc" label="RUC:" :validation="{required:true, numeric:true, max:20}" nameInput="ruc" etiqueta='true' ref="inputRuc">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="padding-left: 0px;">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12 col-form-label">Fecha de nacimiento:</label>
                          <div class="col-md-9 col-form-label">
                              <Datetime  v-model="formPersonalInformation.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date"  ></Datetime>
                          </div>
                        </div>
                        
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.secondPhone" :valueInput="formPersonalInformation.secondPhone" label="Teléfono fijo:" :validation="{required:true, numeric:true, max:50}" nameInput="homePhone" etiqueta='true' ref="inputHomePhone">
                        </inputMaf>
                       </div>                                              

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.phone" :valueInput="formPersonalInformation.phone" label="Celular:" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.address" :valueInput="formPersonalInformation.address" label="Domicilio:" :validation="{required:true, max:250}" nameInput="address" etiqueta='true' ref="inputAddress">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px;">
                        <inputMaf type='text' v-model="formPersonalInformation.email" :valueInput="formPersonalInformation.email" label="Correo:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail">
                        </inputMaf>
                       </div>

                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12 col-form-label">¿Tienes bicicleta o scooter?:</label>
                          <div class="col-md-9 col-form-label">
                            <div class="form-check form-check-inline mr-1">
                              <input class="form-check-input" id="inline-radio1" type="radio"  v-model="formPersonalInformation.vehicle"  value="byclo" name="inline-radios" >
                              <label class="form-check-label" for="inline-radio1">Bicicleta</label>
                            </div>
                            <div class="form-check form-check-inline mr-1">
                              <input class="form-check-input" id="inline-radio2" type="radio"   v-model="formPersonalInformation.vehicle"  value="scooter" name="inline-radios" >
                              <label class="form-check-label" for="inline-radio2">Scooter</label>
                            </div>
                          </div>
                        </div>
                      </div>  
                      
                       <div class="panel-body" style="padding-bottom:5px; ">
                        <inputMaf type='text' v-model="formPersonalInformation.urlFacebook" :valueInput="formPersonalInformation.urlFacebook" label="Url de tu perfil de Facebook:" :validation="{required:false}" nameInput="urlFacebook" etiqueta='true' ref="inputUrlFacebook">
                        </inputMaf>
                       </div>

                       <div class="panel-body" style="padding-bottom:5px; ">
                        <inputMaf type='text' v-model="formPersonalInformation.urlInstagram" :valueInput="formPersonalInformation.urlInstagram" label="Url de tu perfil de Instagram:" :validation="{required:true}" nameInput="urlInstagram" etiqueta='true' ref="inputUrlInstagram">
                        </inputMaf>
                       </div>

                    </div>
                    <div class="actionBar">
                      <div class="msgBox">
                        <div class="content"></div>
                      </div>
                      <button type="button"  @click="register()" class="btn btn-success btn-xs">Registrarse
                      </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" id="accordion" style="padding-bottom: 0px;">
            <div class="panel panel-default" >
                <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h2>Paso 2: Subir la documentación a la plataforma</h2>
                  <div class="nav navbar-right panel_toolbox" style="padding-top: 14px;">
                      <input type="checkbox" v-model="checkStep2" disabled=true style="padding-top: 14px;"> 
                  </div>                   
                  <div class="clearfix">                    
                  </div>
                </div>
                <div id="collapse2" class="panel-collapse collapse in">
                    <div class="panel-body">

                      <!-- <div class="panel-body" style="padding-bottom:5px; padding-top: 10px;">
                        <inputMaf type='text' v-model="formDocumentation.documentNumber"  label="DNI o carnet de extranjería:" :validation="{required:true}" nameInput="documentNumber" etiqueta='true' ref="inputDocumentNumber">
                        </inputMaf>
                      </div> -->

                      <div class="col-md-12 col-sm-12 col-xs-12" style="padding-top: 15px; padding-bottom: 15px;">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Foto de carnet o pasaporte: *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNameDocument" accept="image/*">
                            <label class="custom-file-label" for="tempFileNameDocument">{{tempFileNameDocument ? tempFileNameDocument : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink1" style="display: none;"  >
                          <div class="custom-file">
                             <button class="btn btn-primary" type="reset"><a ref="link1" style="color: WHITE;" href="" target="_blank">Visualizar</a></button>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Recibo de agua, luz o teléfono para verificar domicilio: *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNameInvoice" accept="image/*">
                            <label class="custom-file-label" for="tempFileNameInvoice">{{tempFileNameInvoice ? tempFileNameInvoice : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink2" style="display: none;"  >
                          <div class="custom-file">
                             <button class="btn btn-primary" type="reset"><a ref="link2" style="color: WHITE;" target="_blank">Visualizar</a></button>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Certificado de antecedentes policiales – máximo 3 meses de antigüedad: *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNamePoliceCer" accept="image/*">
                            <label class="custom-file-label" for="tempFileNamePoliceCer">{{tempFileNamePoliceCer ? tempFileNamePoliceCer : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink3" style="display: none;"  >
                          <div class="custom-file">
                             <button class="btn btn-primary" type="reset"><a ref="link3" style="color: WHITE;" target="_blank">Visualizar</a></button>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Certificado de antecedentes penales – máximo 3 meses de antigüedad: *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNameCriminalCer" accept="image/*">
                            <label class="custom-file-label" for="tempFileNameCriminalCer">{{tempFileNameCriminalCer ? tempFileNameCriminalCer : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink4" style="display: none;"  >
                          <div class="custom-file">
                              <button class="btn btn-primary" type="reset"><a ref="link4" style="color: WHITE;" target="_blank">Visualizar</a></button>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12 col-form-label">¿Eres estudiante?:</label>
                          <div class="col-md-9 col-form-label" style="padding-left: 20px;">
                            <div class="form-check form-check-inline mr-1">
                              <input class="form-check-input" id="inline-radio1" type="radio"  v-model="isStudent"  value=true name="inline-radios" v-on:change="editFlag" >
                              <label class="form-check-label" for="inline-radio1">Si</label>
                            </div>
                            <div class="form-check form-check-inline mr-1">
                              <input class="form-check-input" id="inline-radio2" type="radio"   v-model="isStudent"  value=false name="inline-radios" v-on:change="editFlag">
                              <label class="form-check-label" for="inline-radio2">No</label>
                            </div>
                          </div>
                        </div>
                      </div> 
                  
                      <div ref="divEnrol"  class="col-md-12 col-sm-12 col-xs-12" style="padding-top: 5px; padding-bottom: 15px; display: none;">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Copia de la ficha de su matrícula : *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNameEnrol" accept="image/*" >
                            <label class="custom-file-label" for="tempFileNameEnrol">{{tempFileNameEnrol ? tempFileNameEnrol : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink5" style="display: none;"  >
                          <div class="custom-file">
                             <button class="btn btn-primary" type="reset"><a ref="link5" style="color: WHITE;" target="_blank">Visualizar</a></button>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 col-sm-12 col-xs-12" style="padding-top: 5px; padding-bottom: 15px;">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fotografía de la bicicleta: *</label>
                        <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <div class="custom-file">
                            <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="tempFileNameVehicle" accept="image/*">
                            <label class="custom-file-label" for="tempFileNameVehicle">{{tempFileNameVehicle ? tempFileNameVehicle : 'Elige la imagen'}}</label>
                          </div>
                        </div>
                        <div class="col-md-2 col-sm-6 col-xs-12 " ref="divLink6" style="display: none;"  >
                          <div class="custom-file">
                            <button class="btn btn-primary" type="reset"><a ref="link6" style="color: WHITE;" target="_blank">Visualizar</a></button>                             
                          </div>
                        </div>
                      </div>
                    </div> 


                    <div class="actionBar" style="margin-top: 120px;">

                      <button type="button"  @click="uploadDocuments()"  class="btn btn-success btn-xs">Subir documentos
                      </button>
                    </div> 

                </div>
            </div>
        </div>

        <div class="card" id="accordion" style="padding-bottom: 0px;">
            <div class="panel panel-default" >
                <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapse3" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h2>Paso 3: Revisión y aceptación del contrato de afiliación</h2>
                  <div class="nav navbar-right panel_toolbox" style="padding-top: 14px;">
                      <input type="checkbox" v-model="checkStep3" disabled=true style="padding-top: 14px;"> 
                  </div>                   
                  <div class="clearfix">
                  </div>
                </div>
                <div id="collapse3" class="panel-collapse collapse in">
                    <div>
                        <h2 class="StepTitle" style="padding-top: 10px;">Contrato de afiliación</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div class="actionBar">
                      <div class="msgBox">
                        <div class="content"></div>
                      </div>
                      <button type="button"  class="btn btn-success btn-xs">Acepto
                      </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" id="accordion" style="padding-bottom: 0px;">
            <div class="panel panel-default" >
                <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapse4" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h2>Paso 4: Validación de aplicación y respuesta.</h2>
                  <div class="nav navbar-right panel_toolbox" style="padding-top: 14px;">
                      <input type="checkbox" v-model="checkStep4" disabled=true style="padding-top: 14px;"> 
                  </div> 
                  <div class="clearfix">
                  </div>
                </div>
                <div id="collapse4" class="panel-collapse collapse in">
                    <div>
                        <h2 class="StepTitle" style="padding-top: 10px;">Esta es la respuesta al proceso de admisión</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" id="accordion" style="padding-bottom: 0px;">
            <div class="panel panel-default" >
                <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapse5" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h2>Paso 5: Capacitación y entrega de kit de bienvenida</h2>
                  <div class="nav navbar-right panel_toolbox" style="padding-top: 14px;">
                      <input type="checkbox" v-model="checkStep5" disabled=true style="padding-top: 14px;"> 
                  </div>                   
                  <div class="clearfix">
                  </div>
                </div>
                <div id="collapse5" class="panel-collapse collapse in">
                    <div>
                        <h2 class="StepTitle" style="padding-top: 10px;">Información de capacitación</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>

      <!--|||||||||||||||||||||||||||||||-->
      <div class="card" v-if="showOnlyMessage">
        <div class="card-header">
          <h2>{{secondCardTitle}}</h2>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <h2>{{secondCardMessage}}</h2>
        </div>
      </div>

    </div>
  </div>
  <!--Modal not-->
  <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-cat">
      <div class="modal-content">
        <div class="modal-header">

            <h3 class="modal-title" > <center> {{formNot.title}}  </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>

        </div>
        <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.message}} </center> </h4></div>
            <div class="modal-footer">
              <center>
                      <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
              </center>
            </div>
      </div>
    </div>
  </div>
<!--Modal not-->
</div>
</template>
<script>
import consultServices from './../../utilities/consultServices.js';
import LoadingComponent from "./../../components/loadingComponent.vue";
import convert from 'image-file-resize';
import inputMaf from "./../../components/inputMaf.vue";
import _ from 'lodash';
import moment from 'moment';
//import * as lang from "vuejs-datepicker/src/locale";
import {
  Datetime
} from 'vue-datetime';
//IMPORTAR PARA STEPS
import vueStep from 'vue-step'
export default {
  name: "DesktopContainer",
  components: {
    LoadingComponent,
    Datetime,
    vueStep,
    inputMaf,
    convert,
  },
  data: () => ({
    isLoading: false,
    //variables que muestran los componentes en el escritorio
    showSteps : false, //1
    showOnlyMessage: false,
    title : "",
    message : "",
    secondaryMessage : "",
    secondCardMessage: "",
    //variables que se setean con info del usuario que inició sesión 
    id: window.INITIAL_STATE.id, 
    isAdmin: window.INITIAL_STATE.isAdmin, 
    isRider: window.INITIAL_STATE.isRider, 
    currentStatus: window.INITIAL_STATE.currentStatus, 
    recruitmentStatus: window.INITIAL_STATE.recruitmentStatus, 
    //
    nowStep: 1,
    stepList: ['Registro personales', 'Subir', 'Final'],
    formPersonalInformation: {},
    //checks
    checkStep1:true,
    checkStep2:true,
    checkStep3:true,
    checkStep4:false,
    checkStep5:false,
    //paso 2
    tempFileNameDocument:'',
    tempFileNameInvoice:'',
    tempFileNamePoliceCer:'',
    tempFileNameCriminalCer:'',    
    tempFileNameEnrol:'',
    tempFileNameVehicle:'',  
    formDocumentation:{},
    isStudent:false,
    //flags para actualizar
    uploadLink1Flag:false,
    uploadLink2Flag:false,
    uploadLink3Flag:false,
    uploadLink4Flag:false,
    uploadLink5Flag:false,
    uploadLink6Flag:false,
    //notificaciones
    formNot:{title:'',message:'',},
    secondCardTitle : '',
  }),
  async created() {
  },

  async mounted() {
    
    console.log('admin?',this.isAdmin)
    console.log('rider?',this.isRider)
    console.log('currentStatus',this.currentStatus)
    console.log('recruitmentStatus',this.recruitmentStatus)   
    console.log('idRider',this.id)

    //identificar el tipo y estado del usuario 
    if(this.isRider == true){
      var code = this.recruitmentStatus[this.recruitmentStatus.length-1].code 
      console.log('código ', code)
      switch (code) {
        case "PERMISSION_NEW":
          //inició proceso de reclu
          //habilitar pasos
          this.showSteps = true
          this.showOnlyMessage = false
          this.title = "Proceso de admisión"
          this.message = "Bienvenido"
          this.secondaryMessage = "Este es el proceso de admisión"
        break;
        case "PERMISSION_APPROVED":
          //aprobó el proceso de reclu
          //mostrar mensaje
          this.showSteps = false //1
          this.showOnlyMessage = true
          this.title = "Resultado del proceso de admisión"
          this.message = "Rider aceptado"
          this.secondaryMessage = "Este es el escritorio"
        break;
        case "PERMISSION_DENIED":
          //no aprobó el proceso de reclu
          //mostrar mensaje
          this.showSteps = false //1
          this.showOnlyMessage = true
          this.title = "Resultado del proceso de admisión"
          this.message = "Permiso denegado"
          this.secondaryMessage = "Este es el escritorio"
        break;          
                   
        default:
          break;
      }
    }

    if(this.isAdmin == true){
      //es admin
      console.log('es admin')
      this.title = "Escritorio"
      this.message = "Bienvenido"
      this.secondaryMessage = "Este es el escritorio , admin"
    }

    await this.getRider()
  },

  methods: {
    

    async getRider(){
        //Obtener info de rider postulante
        var id= this.id;
        var rider = await consultServices('getRider','POST',{id:id});  
        //Completar campos de los pasos con la información del rider postulante
        console.log('rider', rider)
        //cargar variables en el paso 1
        this.formPersonalInformation._id = rider._id
        rider.name? this.formPersonalInformation.name = rider.name : null
        rider.lastName? this.formPersonalInformation.lastName = rider.lastName : null
        rider.secondLastName? this.formPersonalInformation.secondLastName = rider.secondLastName : null
        rider.email? this.formPersonalInformation.email = rider.email : null
        rider.phone? this.formPersonalInformation.phone = rider.phone : null
        rider.secondPhone? this.formPersonalInformation.secondPhone = rider.secondPhone : null
        rider.documentNumber? this.formPersonalInformation.documentNumber = rider.documentNumber : null
        rider.address? this.formPersonalInformation.address = rider.address.addressLine1 : null
        rider.ruc? this.formPersonalInformation.ruc = rider.ruc : null
        rider.birthdate? this.formPersonalInformation.birthdate = rider.birthdate : null
        if(rider.riderDetail){
          rider.riderDetail.vehicle? this.formPersonalInformation.vehicle = rider.riderDetail.vehicle : null
          rider.riderDetail.urlFacebook? this.formPersonalInformation.urlFacebook = rider.riderDetail.urlFacebook : null
          rider.riderDetail.urlInstagram? this.formPersonalInformation.urlInstagram = rider.riderDetail.urlInstagram : null          
        }

        console.log('formP ', this.formPersonalInformation)
        //cargar variables en el paso 2
        if(rider.riderDetail != undefined || rider.riderDetail != null){
          if(rider.riderDetail.uploadedDocs){
            var ctx = this
            var document= {}
            var invoice = {}
            var enrollment = {}
            var vehicle = {}
            var policeCertificate = {}
            var criminalCertificate = {}

            for (let index = 0; index < rider.riderDetail.uploadedDocs.length; index++) {
              if(rider.riderDetail.uploadedDocs[index].type == "document"){
                this.tempFileNameDocument = rider.riderDetail.uploadedDocs[index].name
                var strLink= rider.riderDetail.uploadedDocs[index].url   
                this.$refs.divLink1.setAttribute("style","display: block");      
                this.$refs.link1.setAttribute("href",strLink);  
              }
              if(rider.riderDetail.uploadedDocs[index].type == "invoice"){
                this.tempFileNameInvoice = rider.riderDetail.uploadedDocs[index].name
                var strLink= rider.riderDetail.uploadedDocs[index].url
                this.$refs.link2.setAttribute("href",strLink);
                this.$refs.divLink2.setAttribute("style","display: block");
              }
              if(rider.riderDetail.uploadedDocs[index].type == "policeCertificate"){
                this.tempFileNamePoliceCer = rider.riderDetail.uploadedDocs[index].name
                var strLink= rider.riderDetail.uploadedDocs[index].url
                this.$refs.link3.setAttribute("href",strLink);
                this.$refs.divLink3.setAttribute("style","display: block");  
              }
              if(rider.riderDetail.uploadedDocs[index].type == "criminalCertificate"){
                this.tempFileNameCriminalCer = rider.riderDetail.uploadedDocs[index].name
                var strLink= rider.riderDetail.uploadedDocs[index].url
                this.$refs.link4.setAttribute("href",strLink);
                this.$refs.divLink4.setAttribute("style","display: block");  
              }
              if(rider.riderDetail.uploadedDocs[index].type == "enrollment"){
                this.$refs.divEnrol.setAttribute("style","display: block");
                this.isStudent = true
                this.tempFileNameEnrol = rider.riderDetail.uploadedDocs[index].name
                var strLink= rider.riderDetail.uploadedDocs[index].url
                this.$refs.link5.setAttribute("href",strLink);
                this.$refs.divLink5.setAttribute("style","display: block"); 
              }
              if(rider.riderDetail.uploadedDocs[index].type == "vehicle"){
                this.tempFileNameVehicle=  rider.riderDetail.uploadedDocs[index].name
                var strLink=  rider.riderDetail.uploadedDocs[index].url
                this.$refs.link6.setAttribute("href",strLink);
                this.$refs.divLink6.setAttribute("style","display: block");
              }              
            }
          }
        }

        console.log('formPersonal',this.formPersonalInformation)
    },
    
    /**
     * editFlag: Esta función permite ocultar/mostrar el input para subir la matrícula de postulantes que estudian 
     */
    editFlag(){
      if(this.isStudent == 'true'){
         this.$refs.divEnrol.setAttribute("style","display: block");
      }
      if(this.isStudent == 'false'){ 
         this.$refs.divEnrol.setAttribute("style","display: none");
      }
    },


 
    cleanOptionsShowed () {
      this.showSteps=false;
      this.showSelectEvent=false;
      this.showEventSummary=false;
      this.showSelectSchool=false;
      this.showOnlyMessage=false;
    },
    async setStep() {

    },
    
    /**
     * handleFileSelection: Permitirá conservar el archivo elegido por el usuario
     * para subirlo a Spaces después
     * variable e: objeto que captura toda la infomración del evento  
    */
    async handleFileSelection(e){
      //obtener el id del componente html donde se capturó el evento
      var id= e.target.id
      //Validar Si el evento tiene algún archivo seleccionado
      if(e.target.files.length > 0){
        const ctx=this
        console.log('entró a handleFileSelection', e.target.files[0])
        //obtener ancho y largo del archivo subido
        let img = new Image()
        var imgWidth= 0
        var imgHeigth = 0
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {          
          imgWidth= img.width
          imgHeigth = img.height
        }
        //Guardamos el archivo y el nombre en variables separadas
        switch (id) {
        //el switch presenta todos los campos que pueden cargar archivos, cada campo hace referencia a un atributo particalr del registro  
          case "tempFileNameDocument":
            console.log('entró a tempFileNameDocument', e.target.files[0])
            this.formDocumentation.newImageFileDocument = e.target.files[0]
            this.formDocumentation.newFileNameDocument = e.target.files[0].name
            this.tempFileNameDocument = e.target.files[0].name
            this.uploadLink1Flag = true

            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7, 
                height: imgHeigth*0.7, 
                type: 'png'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFileDocument = resp
                    console.log('entró a convert', ctx.formDocumentation.newImageFileDocument)
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)
                })
            break;

          case "tempFileNameInvoice":
            console.log('entró a tempFileNameInvoice')
            this.formDocumentation.newImageFileInvoice = e.target.files[0]
            this.formDocumentation.newFileNameInvoice = e.target.files[0].name
            this.tempFileNameInvoice = e.target.files[0].name
            this.uploadLink2Flag = true
            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7,//250, 
                height: imgHeigth*0.7 ,//250, 
                type: 'png'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFileInvoice = resp
                    console.log('entró a convert 2', ctx.formDocumentation.newImageFileInvoice)
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)  
                })          
            break;
          
          case "tempFileNamePoliceCer":
            console.log('entró a tempFileNamePoliceCer')
            this.formDocumentation.newImageFilePoliceCer = e.target.files[0]
            this.formDocumentation.newFileNamePoliceCer = e.target.files[0].name
            this.tempFileNamePoliceCer = e.target.files[0].name
            this.uploadLink3Flag = true
            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7, 
                height: imgHeigth*0.7, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFilePoliceCer = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)  
                })          
            break;
          
          case "tempFileNameCriminalCer":
            console.log('entró a tempFileNameCriminalCer')
            this.formDocumentation.newImageFileCriminalCer = e.target.files[0]
            this.formDocumentation.newFileNameCriminalCer = e.target.files[0].name
            this.tempFileNameCriminalCer = e.target.files[0].name
            this.uploadLink4Flag = true
            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7, 
                height: imgHeigth*0.7, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFileCriminalCer = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)  
                })              
            break;

          case "tempFileNameEnrol":
            console.log('entró a tempFileNameEnrol')
            this.formDocumentation.newImageFileEnroll = e.target.files[0]
            this.formDocumentation.newFileNameEnroll = e.target.files[0].name
            this.tempFileNameEnrol = e.target.files[0].name
            this.uploadLink5Flag = true
            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7, 
                height: imgHeigth*0.7, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFileEnroll = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)  
                })              
            break;  
            
          case "tempFileNameVehicle":
            console.log('entró a tempFileNameVehicle')
            this.formDocumentation.newImageFileVehicle = e.target.files[0]
            this.formDocumentation.newFileNameVehicle = e.target.files[0].name
            this.tempFileNameVehicle = e.target.files[0].name
            this.uploadLink6Flag = true
            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: imgWidth*0.7, 
                height: imgHeigth*0.7, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    ctx.formDocumentation.newImageFileVehicle = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)  
                })              
            break;  

          default:
            break;
        }
      }
    },
    async showNotificacion(){
      $('.bs-example-modal-not').modal('show');
    },    
    /**
     * register() : usada en el paso 1 , utiliza la función para registrar o actualizar los datos personales de un rider 
     * y se actualiza el estado de los pasos
     */
    async register(){
       this.isLoading =true
       console.log("uploadDocuments", this.formPersonalInformation)
       const userUpdated = await consultServices('updateUser','POST',this.formPersonalInformation);
        if(userUpdated.status == 400){
          this.formNot.title="Error en operación";
          this.formNot.message=userUpdated.message;  
        }else if(userUpdated.status == 200){
          this.formNot.title="Operación exitosa";
          this.formNot.message="Se actualizaron los datos del rider de manera correcta";  
          this.showNotificacion()         
          await this.getRider()    
        }
        this.isLoading =false
         $('.modal').modal('hide');
    },
    /**
     * uploadDocuments() : en el paso 2 , se usa la función para subir los documentos con el servicio back uploadDocuments
     * y se actualiza el estado de los pasos
     */
    async uploadDocuments(){
        //this.formPersonalInformation.documentNumber ='72299165'
        this.isLoading =true
        var formDocumentation = {}
        console.log('dats form', this.formDocumentation)
        //actualizar cada imagen que fue subida 
        if(this.uploadLink1Flag == true){
          var url1 =await this.uploadSelectedFile(this.formDocumentation.newImageFileDocument, this.formDocumentation.newFileNameDocument) 
          this.$refs.link1.setAttribute("href",url1);
          formDocumentation.document={name:'',url:'',type:'document'}
          formDocumentation.document.name = this.formDocumentation.newFileNameDocument
          formDocumentation.document.url = url1
        }
        if(this.uploadLink2Flag == true){
          var url2 =await this.uploadSelectedFile(this.formDocumentation.newImageFileInvoice, this.formDocumentation.newFileNameInvoice) 
          this.$refs.link2.setAttribute("href",url2);
          formDocumentation.invoice={name:'',url:'',type:'invoice'}
          formDocumentation.invoice.name = this.formDocumentation.newFileNameInvoice
          formDocumentation.invoice.url = url2          
        }        
        if(this.uploadLink3Flag == true){
          var url3 =await this.uploadSelectedFile(this.formDocumentation.newImageFilePoliceCer, this.formDocumentation.newFileNamePoliceCer) 
          this.$refs.link3.setAttribute("href",url3);
          formDocumentation.policeCertificate={name:'',url:'',type:'policeCertificate'}
          formDocumentation.policeCertificate.name = this.formDocumentation.newFileNamePoliceCer
          formDocumentation.policeCertificate.url = url3          
        }
        if(this.uploadLink4Flag == true){
          var url4 =await this.uploadSelectedFile(this.formDocumentation.newImageFileCriminalCer, this.formDocumentation.newFileNameCriminalCer) 
          this.$refs.link4.setAttribute("href",url4);
          formDocumentation.criminalCertificate={name:'',url:'',type:'criminalCertificate'}
          formDocumentation.criminalCertificate.name = this.formDocumentation.newFileNameCriminalCer
          formDocumentation.criminalCertificate.url = url4             
        }     
        if(this.uploadLink5Flag == true){
          var url5 =await this.uploadSelectedFile(this.formDocumentation.newImageFileEnroll, this.formDocumentation.newFileNameEnroll) 
          this.$refs.link5.setAttribute("href",url5);
          formDocumentation.enrollment={name:'',url:'',type:'enrollment'}
          formDocumentation.enrollment.name = this.formDocumentation.newFileNameEnroll
          formDocumentation.enrollment.url = url5             
        }
        if(this.uploadLink6Flag == true){
          var url6 =await this.uploadSelectedFile(this.formDocumentation.newImageFileVehicle, this.formDocumentation.newFileNameVehicle) 
          this.$refs.link6.setAttribute("href",url6);
          formDocumentation.vehicle={name:'',url:'',type:'vehicle'}
          formDocumentation.vehicle.name = this.formDocumentation.newFileNameVehicle
          formDocumentation.vehicle.url = url6    
        }  
        console.log('actualizar json', formDocumentation)
        //Actualizar colección en la bd
        var formUpdate={}
        formUpdate.formDocumentation = formDocumentation
        formUpdate._id = this.id //"5f4da84c90d4f0394bdaa785"
        console.log('json listo', formUpdate)
        var response = await consultServices('updateDocumentation','POST',formUpdate); 
        if(response.status==400){
          this.formNot.title="Error en operación";
          this.formNot.message=response.message;  
        }else if(response.status == 200){
          this.formNot.title="Operación exitosa";
          this.formNot.message="Se actualizaron los documentos del rider de manera correcta";   
          this.showNotificacion();  
          //Limpiar formularios 
          this.formDocumentation={}
          //Listar registro actualizado
          await this.getRider()              
        }
        $('.modal').modal('hide');    
        this.isLoading =false
        //Limpiar flags
        this.uploadLink1Flag = false
        this.uploadLink2Flag = false
        this.uploadLink3Flag = false
        this.uploadLink4Flag = false
        this.uploadLink5Flag = false
        this.uploadLink6Flag = false
        
    },
    /**
     * uploadSelectedFile: Permitirá subir a Spaces el archivo seleccionado 
     * y colocar la url en la variable local
    */
    async uploadSelectedFile(file,fileName ){
      console.log('entró a uploadSelectedFile 1', file)
      console.log('entró a uploadSelectedFile 2', fileName)
      
      /**Variables generales:
       *    urlSufix: Sufijo del archivo, define la ubicación final del archivo en Spaces
       *    newUrl: esta url retornará el servicio para setear un atributo
       * variables que necesita la función:
       *    file: es el documento a subir
       *    fileName: nombre del documento
      */
      var newUrl=''
      const urlSufix = 'riders/'+ this.formPersonalInformation.documentNumber +'/attachments'
      //Declaramos y seteamos el formData con el archivo
      var formData = new FormData();
      formData.append('file',file)
      //Subimos el archivo al servidor web 
      var url = 'uploadAttachment?fileName=' + fileName + '&urlSufix=' + urlSufix
      //Usamos el método fetch para consultar el servicio con opciones especiales
      await fetch(url, {
        method:'POST',
        body: formData
      })
      .then(async (response) => {
        if(response.ok) {
          await response.json().then(data => {
            console.log('data', data)
            if(data.error){
              console.log('error del back: ', data.error)
            }else{
              console.log('Se subió exitosamente: ', data.generatedUrl)
              newUrl = data.generatedUrl
            }
          }).catch((error)=>{console.log('Error: ', error)})
        }else{
          console.log('No ok')
        }
      }).catch((error)=>{console.log('Error: ', error)})
      return newUrl
    },
 
  }
}
</script>
