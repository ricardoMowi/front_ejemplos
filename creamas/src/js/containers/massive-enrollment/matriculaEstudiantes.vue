<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Matrícula de Estudiantes  </h2>
                    <br/>
                    <div class="clearfix"></div>
                         <small>Busca un estudiante </small>
                </div>

                <div class="card-body">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-body">
                                <inputMaf type='text' v-model="formStudent.documentNumber" :valueInput="formStudent.documentNumber" label="DNI:" :validation="{required:false, digits:8}" nameInput="document" etiqueta='true' ref="inputDocument">
                                </inputMaf>
                            </div>

                            <div class="card-body">
                                <inputMaf type='text' v-model="formStudent.name" label="Nombres:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputName">
                                </inputMaf>
                            </div>

                            <div class="card-body">
                                <inputMaf type='text' v-model="formStudent.lastName" label="Apellido Paterno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputLastName">
                                </inputMaf>
                            </div>

                            <div class="card-body">
                                <inputMaf type='text' v-model="formStudent.secondLastName" label="Apellido Materno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputSecondLastName">
                                </inputMaf>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="searchStudent()"><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                    <div class="card">
                          <div class="modal-footer">
                         <button type="button" class="btn btn-success" @click="newStudentModal()" data-target=".bs-example-modal-upd" data-toggle="modal">Registrar nuevo estudiante</button>
                          </div>
                    <TableMaf :header="colum" :data="students" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

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

            <!--Modal Mat-->
            <div class="modal fade bs-example-modal-mat" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"  aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4  v-if="this.formEnrollmentType=='ADD'" class="modal-title">Matricular estudiante para el semestre {{this.semester.semesterCode}}</h4>
                                <h4  v-if="this.formEnrollmentType=='EDIT'" class="modal-title">Cambiar Taller</h4>
                                <h4  v-if="this.formEnrollmentType=='EDIT_STUDENT'" class="modal-title">Editar datos del estudiante</h4>
                                
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="modal-title" id="myModalLabel">Paso 1: Actualizar datos del estudiante</h4>
                                        <h4  v-if="this.formEnrollmentType=='EDIT_STUDENT'" class="modal-title" id="myModalLabel">Actualizar datos del estudiante</h4>
                                    </div>
                                    <div class="card-body">

                                        <div class="card-body" >
                                            <inputMaf type='text' v-model="formStudentEnrollment.documentNumber" :valueInput="formStudentEnrollment.documentNumber"  label="Documento de identidad:" :validation="{required:true, alpha_num:true, max:20}" nameInput="document" etiqueta='true' ref="inputDocument" >
                                            </inputMaf>
                                        </div>
                                        <div class="card-body">
                                            <inputMaf type='text' v-model="formStudentEnrollment.lastName" :valueInput="formStudentEnrollment.lastName"  label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputLastName" >
                                            </inputMaf>
                                        </div>
                                        <div class="card-body">
                                            <inputMaf type='text' v-model="formStudentEnrollment.secondLastName" :valueInput="formStudentEnrollment.secondLastName"  label="Apellido Materno:" :validation="{required:false, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                                            </inputMaf>
                                        </div>

                                        <div class="card-body">
                                            <inputMaf type='text' v-model="formStudentEnrollment.name" :valueInput="formStudentEnrollment.name"  label="Nombres:" :validation="{required:true, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputName" >
                                            </inputMaf>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Género:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" v-model="formStudentEnrollment.gender" >
                                                        
                                                        <option value="M">Masculino</option>
                                                        <option value="F">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body" >
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha Nacimiento:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                <Datetime  v-model="formStudentEnrollment.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date" ></Datetime>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <inputMaf type='text' v-model="formStudentEnrollment.address" :valueInput="formStudentEnrollment.address"  label="Dirección domiciliaria:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="inputAddress" >
                                            </inputMaf>
                                        </div>
                                        <div class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Grado del estudiante:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" @change="listAvailableWorkshops"  v-model="formStudentEnrollment.gradeCode">
                                                    <option disabled="disabled" value="">Selecciona el grado del estudiante</option>
                                                    <option v-for="item in grades" v-bind:value="item.code">
                                                        {{item.displayValue}}
                                                        </option>
                                                        </select>
                                                </div>
                                        </div>
                                        <div  class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Su apoderado vendrá siempre a recogerlo:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <input type="checkbox" value="false" v-model="formStudentEnrollment.pickUpByParent"> <label for="cbox2">Checklist si es que el estudiante no podrá salir del colegio solo</label>
                                                </div>
                                        </div>
                                        <div class="card">
                                                <div class="card-header">
                                                    <h2>Datos de los contactos</h2>
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="card-body">
                                                        
                                                        <!--Nombre contacto-->
                                                        <div class="card-body">
                                                            <inputMaf type='text' v-model="contact.name" :valueInput="contact.name"  label="Nombre completo:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="inputContactName" >
                                                            </inputMaf>
                                                        </div>

                                                            <!--Direccion contacto-->
                                                        <div class="card-body">
                                                            <inputMaf type='text' v-model="contact.address" :valueInput="contact.address"  label="Dirección" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputContactAddress" >
                                                            </inputMaf>
                                                        </div>

                                                        <!--Relación contacto-->
                                                        <div class="card-body">
                                                            <inputMaf type='text' v-model="contact.relation" :valueInput="contact.relation"  label="Relación con el estudiante:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputContactRelation" >
                                                            </inputMaf>
                                                        </div>

                                                        <!--Numero del contacto-->
                                                        <div class="card-body">
                                                        <inputMaf type='text' v-model="contact.phone" :valueInput="contact.phone"  label="Número telefónico del contacto" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" >
                                                        </inputMaf>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button class="btn btn-primary" @click="newContact()">Agregar nuevo contacto</button>
                                                        </div>
                                                </div>
                                         
                                                <div class="col-md-12 col-sm-12 col-xs-12">
                                                        <TableMaf :header="columModal" :data="emergencyContacts" :tableTitle="titleTable" :searchOption="false" :pagination="false" :datePerPageV="false"  :filter="false" :title="false" ref="tableMafModal"></TableMaf>
                                                </div>
                                         </div>
                                         <div class="card"><!--Sueño-->
                                                <div class="card-header">
                                                    <h2>Sueños, gustos y ambiciones</h2>
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="card-body">
                                                    <div class="card-body">
                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuál es su sueño?</label>
                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                        <textarea v-model="formStudentEnrollment.dream" class="form-control col-md-12 col-xs-12"></textarea>
                                                    </div>
                                                    </div>
                                                    <div class="card-body">
                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué le gusta?</label>
                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                        <textarea v-model="formStudentEnrollment.likesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                                    </div>
                                                    </div>
                                                    <div class="card-body">
                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué no le gusta?</label>
                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                        <textarea v-model="formStudentEnrollment.dislikesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                                    </div>
                                                    </div>
                                                    <div class="card-body">
                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuáles son sus ambiciones?</label>
                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                        <textarea v-model="formStudentEnrollment.ambitions" class="form-control col-md-12 col-xs-12"></textarea>
                                                    </div>
                                                    </div>
                                                    <div class="card-body">
                                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Otros datos</label>
                                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                                            <textarea v-model="formStudentEnrollment.other" class="form-control col-md-12 col-xs-12"></textarea>
                                                        </div>
                                                    </div> 
                                                </div>
                                         </div><!--Sueño-->
                                    </div>                                 
                                </div>   
                                
                                
                                
                                
                                <div  v-if="this.formEnrollmentType !='EDIT_STUDENT'" class="card">
                                    <div class="card-header">
                                        <h4 class="modal-title" id="myModalLabel">Paso 2: Matrícula </h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el taller:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control"  v-model="form.workshopId">
                                                <option disabled="disabled" value="">Talleres disponibles</option>
                                                <option v-for="item in workshopsxSchool" v-bind:value="item.id" >
                                                Taller: {{item.displayName}} | vacantes:  {{showVacantes(item.quota,item.enrollments)}}
                                                </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div class="modal-footer">
                                    <center>
                                        <button type="button" data-dismiss="modal" class="btn btn-default" >Cancelar</button>
                                        <button  v-if="this.formEnrollmentType =='ADD'" @click="registration()" type="button" data-dismiss="modal" class="btn btn-success" >Matricular en Taller</button>
                                        <button  v-if="this.formEnrollmentType =='EDIT'" @click="update('WORKSHOP')" type="button" data-dismiss="modal" class="btn btn-success" >Cambiar Taller</button>
                                        <button  v-if="this.formEnrollmentType =='EDIT_STUDENT'" @click="update('STUDENT')" type="button" data-dismiss="modal" class="btn btn-success" >Actualizar datos</button>
                                     </center>
                            </div>
                        </div>
                    </div>
            </div>


          <!--Modal Upd-->
          <div  class="modal fade bs-example-modal-upd" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"  aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
               <div class="modal-header">

                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar Estudiante </h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar datos personales del estudiante</h3>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
                <div class="card-body">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="modal-title" id="myModalLabel"><strong> Datos Personales del Estudiante</strong></h4>
                                </div>
                                <div class="card-body">

                                    <div class="card-body" >

                                        <inputMaf type='text' v-model="formEdit.documentNumber" :valueInput="formEdit.documentNumber"  label="Documento de identidad:" :validation="{required:true, alpha_num:true, max:20}" nameInput="document" etiqueta='true' ref="inputDocument" >
                                        </inputMaf>

                                    </div>

                                    <div class="card-body">

                                        <inputMaf type='text' v-model="formEdit.lastName" :valueInput="formEdit.lastName"  label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputLastName" >
                                        </inputMaf>

                                    </div>
                                    <div class="card-body">

                                        <inputMaf type='text' v-model="formEdit.secondLastName" :valueInput="formEdit.secondLastName"  label="Apellido Materno:" :validation="{required:false, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                                        </inputMaf>

                                    </div>

                                    <div class="card-body">

                                        <inputMaf type='text' v-model="formEdit.name" :valueInput="formEdit.name"  label="Nombres:" :validation="{required:true, alpha_spaces:true, max:150}" nameInput="text" etiqueta='true' ref="inputName" >
                                        </inputMaf>

                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Género:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <select class="form-control" v-model="formEdit.gender" >
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" >
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha Nacimiento:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                            <Datetime  v-model="formEdit.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date" ></Datetime>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <inputMaf type='text' v-model="formEdit.address" :valueInput="formEdit.address"  label="Dirección domiciliaria:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="inputAddress" >
                                        </inputMaf>
                                    </div>
                                    <div class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Grado del estudiante:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control" @change="listAvailableWorkshops"  v-model="formEdit.gradeCode">
                                                    <option disabled="disabled" value="">Selecciona el grado del estudiante</option>
                                                    <option v-for="item in grades" v-bind:value="item.code">
                                                        {{item.displayValue}}
                                                        </option>
                                                        </select>
                                                </div>
                                    </div>
                                    <div  class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Su apoderado vendrá siempre a recogerlo:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                     <input type="checkbox" value="false" v-model="formEdit.pickUpByParent"> <label for="cbox2">Checklist si es que el estudiante no podrá salir del colegio solo</label>
                                                </div>
                                    </div>
                              </div>
                            </div>
                            <div class="card-body" v-if="formType=='ADD'">
                                <div class="card" >
                                        <div class="card-header">
                                        <h4 class="modal-title" id="myModalLabel"><strong> Contactos del estudiante </strong></h4>
                                        </div>

                                        <div class="control-label col-md-12 col-sm-12 col-xs-12" v-if="formType=='ADD'">

                                                <div class="card">
                                                            <div class="card-body">
                                                                    
                                                                    <!--Nombre contacto-->
                                                                    <div class="card-body">
                                                                        <inputMaf type='text' v-model="contact.name" :valueInput="contact.name"  label="Nombre completo:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="inputContactName" >
                                                                        </inputMaf>
                                                                    </div>

                                                                    <!--Direccion contacto-->
                                                                    <div class="card-body">
                                                                        <inputMaf type='text' v-model="contact.address" :valueInput="contact.address"  label="Dirección" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputContactAddress" >
                                                                        </inputMaf>
                                                                    </div>

                                                                    <!--Relación contacto-->
                                                                    <div class="card-body">
                                                                        <inputMaf type='text' v-model="contact.relation" :valueInput="contact.relation"  label="Relación con el estudiante:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputContactRelation" >
                                                                        </inputMaf>
                                                                    </div>

                                                                    <!--Numero del contacto-->
                                                                    <div class="card-body">
                                                                    <inputMaf type='text' v-model="contact.phone" :valueInput="contact.phone"  label="Número telefónico del contacto" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" >
                                                                    </inputMaf>

                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button class="btn btn-primary" @click="newContact()">Agregar nuevo contacto</button>
                                                                    </div>
                                                            </div>
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                    <TableMaf :header="columModal" :data="emergencyContacts" :tableTitle="titleTable" :pagination="false" :searchOption="false" :datePerPageV="false"  :filter="false" :title="false" ref="tableMafModal"></TableMaf>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="card"><!--Sueño-->
                                <div class="card-header">
                                    <h2>Sueños, gustos y ambiciones</h2>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="card-body">
                                    <div class="card-body">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuál es su sueño?</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea v-model="formEdit.dream" class="form-control col-md-12 col-xs-12"></textarea>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué le gusta?</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea v-model="formEdit.likesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué no le gusta?</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea v-model="formEdit.dislikesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuáles son sus ambiciones?</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <textarea v-model="formEdit.ambitions" class="form-control col-md-12 col-xs-12"></textarea>
                                    </div>
                                    </div>
                                    <div class="card-body">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Otros datos</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <textarea v-model="formEdit.other" class="form-control col-md-12 col-xs-12"></textarea>
                                        </div>
                                    </div> 
                                </div>
                            </div><!--Sueño-->
                            <div class="modal-footer">
                                <button type="button"  data-dismiss="modal" class="btn btn-default" >Cancelar</button>
                                <button type="button" v-if="formType=='ADD'" @click="newStudent()" class="btn btn-success" >Registrar nuevo estudiante</button>
                                <button type="button" v-if="formType=='EDIT'" @click="updateData()" class="btn btn-primary"> Actualizar Datos del Estudiante</button>

                            </div>
                        </div>
                </div>
              </div>
            </div>
          </div>


        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import TableMaf from "./../../components/TableMaf.vue";
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import inputMaf from "./../../components/inputMaf.vue";
    import { Datetime } from 'vue-datetime';


  export default {
        name: "MatriculaEstudiantes",
        components: {
            LoadingComponent,
            TableMaf,
            inputMaf,
            Datetime,

        },

        data: () => ({
            id: window.INITIAL_STATE.id,
            isLoading: true,
            workshops:[],
            students:[],
            form:{workshopId:'',grade:''},
            formEdit:{emergencyContacts:[]},
            formStudent:{documentNumber:'', name:'',lastName:'',secondLastName:''},
            formNot:{not:'',tit:'',},
            colum:[],
            columModal:[{label:'Nombre contacto' ,name:'name' ,find:0 ,sort:0}, {label:'# Contacto' ,name:'phone' ,find:0 ,sort:0},{label:'Acciones ' ,name:'actions' ,find:0 ,sort:0}],
            titleTable:'',
            semester:[],
            idStudent:'',
            formType: '',
            contact:{},
            contacts:[],
            emergencyContacts:[],
            grades:[],
            workshopsxSchool:[],
            school:[],
            idSchool:'',
            formStudentEnrollment:{},
            formEnrollmentType:''



        }),

        async created () {
            console.log("sessionStorage actual ",window.sessionStorage)
            this.isLoading=true;
            await this.getSessionStorage();
            this.school =  await consultServices('getSchool','POST',{id: this.id ,semesterCode: this.semester.id})
            console.log("escuela: ",this.school)
            let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
            this.idSchool = _idSchool

            if(_idSchool){
            //   this.workshopsxSchool = await consultServices('getSchoolAvailableWorkshops','POST',{id:_idSchool  , semesterCode: this.semester.id});
            //   console.log("workXschool:  ",this.workshopsxSchool);
            }else if(!_idSchool){
                alert("El creando no cuenta con un colegio asignado")
            }
            this.setHeadTable('tableListCreando');
            this.setHeadTable('tableListCreandoModal');

            this.isLoading = false;

        },

        methods: {
            async getSessionStorage(){

                 var ids = [] ;
                 var flagWorkshops = false;
                 var flagGrades = false;
                 var flagSemester  = false;

                if(!window.sessionStorage.workshops){
                  ids.push(13);
                  flagWorkshops = true;
                }
                if(!window.sessionStorage.grades){
                  ids.push(11);
                  flagGrades = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids: ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagWorkshops == true){
                       this.workshops = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
                       window.sessionStorage.workshops  = JSON.stringify(this.workshops);
                    }
                    if(flagGrades == true){
                       this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                       window.sessionStorage.grades  = JSON.stringify(this.grades);
                    }
                }

                this.semester =JSON.parse( window.sessionStorage.semester );
                this.workshops =JSON.parse( window.sessionStorage.workshops );
                this.grades =JSON.parse( window.sessionStorage.grades );
             //fin de la carga de arreglos para la pantalla



            },
            async searchStudent() {
                this.isLoading=true;
                var form = this.formStudent;
                form.idSchool = this.idSchool;
                form.semesterCode= this.semester.id;
                console.log("form:::::::::::::::::::::::::::::::::::::: ",form)
                if(!this.formStudent.documentNumber && !this.formStudent.name  && !this.formStudent.lastName  && !this.formStudent.secondLastName ){
                    this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete un campo para realizar la búsqueda"
                    $('.modal').modal('hide');
                    this.shownotificacion();
                }else{
                    if((this.formStudent.documentNumber.length<3 && this.formStudent.documentNumber.length >0 || this.formStudent.name.length<3 && this.formStudent.name.length>0)||(this.formStudent.lastName.length<3 && this.formStudent.lastName.length>0)||(this.formStudent.secondLastName.length<3 && this.formStudent.secondLastName.length>0)){
                        this.formNot.tit="Cantidad mínima de carcateres"; this.formNot.not="Por favor ingrese al menos 3 caractéres para la búsqueda."
                    $('.modal').modal('hide');
                    this.shownotificacion();

                    }else{
                    const response = await consultServices('searchStudent','POST',form);
                    console.log("search searchStudent",response);
                        if(response.message){
                            var arr=[]
                            this.setDataTable(arr,"students");
                            alert("No se encontraron resultados");

                        }else{
                            this.setDataTable(response,"students");           
                        }
                    }
                }
               this.isLoading=false; 
            } ,
            showVacantes(quota,enrollments){
                return (quota-enrollments);
             },
            async registration(student){
                if(this.formStudentEnrollment.gradeCode == null && this.form.workshopId == null ){
                    alert('Campos incompletos para registrar una matrícula')
                }else{
                  var flag= confirm("¿Matricular estudiante en el taller seleccionado?");
                  if(flag == true){
                    //PASO 1: actualizar datos del estudiante
                    var form={}
                    form.name=this.formStudentEnrollment.name
                    form.lastName=this.formStudentEnrollment.lastName
                    form.id=this.formStudentEnrollment.id
                    form.secondLastName=this.formStudentEnrollment.secondLastName
                    form.EmergencyContacts=this.formStudentEnrollment.EmergencyContacts
                    form.gradeCode=this.formStudentEnrollment.gradeCode
                    form.dream=this.formStudentEnrollment.dream
                    form.likesTo=this.formStudentEnrollment.likesTo
                    form.dislikesTo=this.formStudentEnrollment.dislikesTo
                    form.ambitions=this.formStudentEnrollment.ambitions
                    form.other=this.formStudentEnrollment.other
                    console.log("formStudentEnrollment ", form)
                    //console.log("formStudentEnrollment.pickUpByP ", this.formStudentEnrollment.pickUpByParent)
                    const responseStudent = await consultServices('updateStudent','POST',form);
                    if(responseStudent.status == 200){
                        //PASO 2: registrar matrícula
                        var registration={
                            semesterCode:this.semester.id,
                            idWorkshop:this.form.workshopId,
                            id:this.idStudent,
                            gradeCode: this.formStudentEnrollment.gradeCode,
                            //Agregar id school
                            idSchool: this.school.AssignmentRecords[0].School.id,
                        };
                        console.log("Matrícula: ",registration);
                        const response = await consultServices('createEnrollment','POST',registration);

                        if(response.message){
                            this.formNot.tit="Error en la matrícula del estudiante "; this.formNot.not=response.message;
                        }
                        else{
                        this.formNot.tit="Matrícula exitosa "; this.formNot.not="Se matriculó al estudiante de manera correcta"
                        this.form.workshopId="";
                        this.form.grade="";
                        this.idStudent="";
                        this.workshopsxSchool=[];
                        this.workshopsxSchool = await consultServices('getSchoolAvailableWorkshops','POST',{id:this.idSchool  , semesterCode: this.semester.id});
                        this.formStudentEnrollment={}
                        }
                        $('.modal').modal('hide');
                        this.shownotificacion();
                    }else{
                        this.formNot.tit="Error en la matrícula del estudiante "; this.formNot.not=response.message;
                        $('.modal').modal('hide');
                        this.shownotificacion();
                    }
                  }
                } 
            },
            async shownotificacion(){
                    $('.bs-example-modal-not').modal('show');
            },
            setHeadTable() {

                    this.colum = [
                        {label:'DNI' ,name:'documentNumber' ,find:1 ,sort:1},
                        {label:'Nombre completo' ,name:'name' ,find:1 ,sort:1},
                        {label:'Dirección' ,name:'address' ,find:1 ,sort:1},
                        {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},
                        ];
                    this.titleTable = "Resultados de búsqueda";
            },
            async refreshData(type) {
                if(type == "students"){
                   await this.$refs.tableMaf.formatData(this.students);
                }
                if(type == "contacts"){
                   await this.$refs.tableMafModal.formatData(this.emergencyContacts);
                }
            },
            async  showUpdModal(item){
               this.formType="EDIT";
               console.log("item update  ",item);
               this.formEdit = {};

                this.formEdit.name=item.name;
                this.formEdit.lastName=item.lastName;
                this.formEdit.secondLastName=item.secondLastName;
                this.formEdit.documentNumber=item.documentNumber;
                this.formEdit.gender=item.gender;
                this.formEdit.birthdate=item.birthdate;
                this.formEdit.address=item.address;
                this.formEdit.id=item.id;

            },
            async  showRegModal(item,type){  
                                  
               this.emergencyContacts=[];
               this.contacts=[];       
               this.contac={};
               var idWorkshop= 0; 
               this.idStudent=item.id;
               this.formStudentEnrollment= item;
               if(item.pickUpByParent == true){
                   this.formStudentEnrollment.pickUpByParent = true
               }
               this.contacts=item.EmergencyContacts;
               if(type=="ADD"){
                   this.formEnrollmentType="ADD"
                   this.listAvailableWorkshops()
                   
               } 
               if(type=="EDIT"){
                   console.log('EDIT')
                   this.formEnrollmentType="EDIT"
                   this.listAvailableWorkshops()
                   this.form.oldGradeCode = this.formStudentEnrollment.gradeCode
                  for (let index = 0; index  < item.Enrollments.length; index++) {
                       if(item.Enrollments[index].Workshop.typeCode == 'WORKSHOP_CUSTOM'){
                           this.form.workshopId= item.Enrollments[index].Workshop.id
                           this.form.oldWorkshopId= item.Enrollments[index].Workshop.id
                           this.form.idEnrollment =  item.Enrollments[index].id
                       }else{
                           //si el enrollment es de un taller divertimate
                           this.form.idEnrollment2= item.Enrollments[index].id
                       }                       
                   }                      
               }   
               if(type== "EDIT_STUDENT"){
                    this.formEnrollmentType="EDIT_STUDENT"
               }     
               await this.setDataTable(this.contacts, "contacts");
            },
            async newStudentModal(){
                this.formType="ADD";
                this.emergencyContacts=[];
                this.contacts=[];
                this.formStudentEnrollment={};
                await this.$refs.inputDocument.dataInput();
                await this.$refs.inputLastName.dataInput();
                await this.$refs.inputSecondLastName.dataInput();
                await this.$refs.inputName.dataInput();
                await this.$refs.inputContactName.dataInput();
                await this.$refs.inputContactAddress.dataInput();
                await this.$refs.inputContactRelation.dataInput();
                await this.$refs.inputPhone.dataInput();
                await this.setDataTable(this.emergencyContacts, "contacts");
            },
            async  onChangeWorkshop(){
                alert("se cargarán detalles de cupos y descripción del taller")
            },
            async update(type){
                console.log("form ::::::::::::::::", this.form)
                if(type == 'WORKSHOP'){
                    if(this.form.oldGradeCode == this.formStudentEnrollment.gradeCode &&  this.form.oldWorkshopId == this.form.workshopId){
                    console.log("No hay cambios")
                    }else{
                        if(this.form.oldGradeCode != this.formStudentEnrollment.gradeCode ){
                        //actualizar registro de estudiante
                        var form={}
                        form.name=this.formStudentEnrollment.name
                        form.lastName=this.formStudentEnrollment.lastName
                        form.id=this.formStudentEnrollment.id
                        form.secondLastName=this.formStudentEnrollment.secondLastName
                        form.EmergencyContacts=this.formStudentEnrollment.EmergencyContacts
                        form.gradeCode=this.formStudentEnrollment.gradeCode
                        form.dream=this.formStudentEnrollment.dream
                        form.likesTo=this.formStudentEnrollment.likesTo
                        form.dislikesTo=this.formStudentEnrollment.dislikesTo
                        form.ambitions=this.formStudentEnrollment.ambitions
                        form.other=this.formStudentEnrollment.other
                        console.log("formStudentEnrollment ", form)
                        const responseStudent = await consultServices('updateStudent','POST',form);
                        //actualizar enrollment de taller y taller divertimate         
                        var semester= this.semester.id .toString()               
                        jsonUpdateEnrollment.id = this.form.idEnrollment
                        jsonUpdateEnrollment.idWorkshop = this.form.workshopId
                        jsonUpdateEnrollment.gradeCode = this.formStudentEnrollment.gradeCode
                        jsonUpdateEnrollment.idEnrollment2 = this.form.idEnrollment2
                        jsonUpdateEnrollment.idSchool = this.idSchool
                        jsonUpdateEnrollment.semesterCode =  semester                 
                        }else{
                            //corroborar si se cambio de taller  
                            if(this.form.oldWorkshopId == this.form.workshopId){
                                //no actualizar nada
                                console.log("no se actualiza nada")
                            }else{
                                jsonUpdateEnrollment.id = this.form.idEnrollment
                                jsonUpdateEnrollment.idWorkshop = this.form.workshopId
                            } 
                        }
                        console.log("json ",jsonUpdateEnrollment )
                        var response =  await consultServices('updateEnrollmentWorkshop','POST',jsonUpdateEnrollment );
                        if(response.status == 200){
                            //actualizar los talleres y sus cupos 
                            this.listAvailableWorkshops()
                            this.formNot.tit="Registro exitoso"; this.formNot.not="Registro realizado de manera satisfactoria";
                        }else{
                            this.formNot.tit="Error en el cambio de taller"; this.formNot.not=response.message;
                        }
                        $('.modal').modal('hide');
                        this.shownotificacion();
                        
                    }

                }
                if(type == 'STUDENT'){
                    this.isLoading=true;
                    var form={}
                    form.name=this.formStudentEnrollment.name
                    form.lastName=this.formStudentEnrollment.lastName
                    form.id=this.formStudentEnrollment.id
                    form.secondLastName=this.formStudentEnrollment.secondLastName
                    form.EmergencyContacts=this.formStudentEnrollment.EmergencyContacts
                    form.gradeCode=this.formStudentEnrollment.gradeCode
                    form.dream=this.formStudentEnrollment.dream
                    form.likesTo=this.formStudentEnrollment.likesTo
                    form.dislikesTo=this.formStudentEnrollment.dislikesTo
                    form.ambitions=this.formStudentEnrollment.ambitions
                    form.other=this.formStudentEnrollment.other
                    console.log("formStudentEnrollment ", form)
                    const responseStudent = await consultServices('updateStudent','POST',form);
                    if(responseStudent.status == 200){
                        this.formNot.tit="Actualización exitosa"; this.formNot.not="Actualización realizada de manera satisfactoria";
                    }else{
                        this.formNot.tit="Error en la actualización del estudiante"; this.formNot.not=response.message;
                    }
                    $('.modal').modal('hide');
                    this.shownotificacion();
                    this.isLoading=false;
                        
                }              

                   
            },
            async setDataTable(arrayData,type){
                console.log("entró setDataTable: ", type);
                var ctx = this;

                if(type == "students"){
                        this.students = [];
                        arrayData.forEach(item => {
                                var flag = false;
                                var student = {};
                                var name = item.name;
                                var lastName = item.lastName;
                                var secondLastName = item.secondLastName;
                                student.name = name.concat(" ", lastName," ", secondLastName);
                                student.address=item.address;
                                student.documentNumber=item.documentNumber;
                                student.gender=item.gender;
                                item.Enrollments.length>0? flag=true: flag=false;
                                student.actions=<div class="d-flex justify-content-around">                               
                                {flag == false?  <button  onClick={()=>ctx.showRegModal(item,'ADD')} class="btn btn-success btn-xs" data-target=".bs-example-modal-mat" data-toggle="modal">Matricular en taller</button> : <button  onClick={()=>ctx.showRegModal(item,'EDIT')} class="btn btn-success btn-xs" data-target=".bs-example-modal-mat" data-toggle="modal">Cambiar Taller</button> }
                                <button  onClick={()=>ctx.showRegModal(item, 'EDIT_STUDENT')} class="btn btn-info btn-xs" data-target=".bs-example-modal-mat" data-toggle="modal">Actualizar datos</button>
                                </div>;
                                this.students.push(student);
                        });

                       await this.refreshData("students");
                }
                if(type == "contacts"){
                     this.emergencyContacts = [];
                        arrayData.forEach(item => {
                                var contac = {};
                                contac.name = item.name;
                                contac.address=item.address;
                                contac.relation=item.relation;
                                contac.phone=item.phone;
                                contac.actions=<div class="d-flex justify-content-around">
                                     <div> <button onClick={()=>ctx.removeContact(item.name)}   class="btn btn-danger btn-xs" >Eliminar</button> </div>
                                </div>;
                                this.emergencyContacts.push(contac);
                        });
                        await  this.refreshData("contacts");
                }

            },


            // async deleteReg(item){
            //     console.log("item registration ", item)
            //     var flag=confirm("¿Eliminar la matrícula del estudiante seleccionado?");
            //     if(flag == true){
            //             this.isLoading=true;
            //             var form={id:item.student.id}
            //             console.log(" eliminar ",form);
            //             const response0 = await consultServices('removeRegistration','POST',form);
            //             this.isLoading=false;
            //     }
            // },

            async newContact(){
                console.log("contacts antes  ",this.contacts);
                console.log("contacto nuevo ",this.contact);
                if(await this.$refs.inputContactName.returnValidationAsync() == false || await this.$refs.inputContactAddress.returnValidationAsync() == false ||
                   await this.$refs.inputContactRelation.returnValidationAsync() == false || await this.$refs.inputPhone.returnValidationAsync() == false){
                    alert("Complete los campos para agregar un contacto de emergencia");
                } else {
                    this.contacts.push(this.contact);
                    console.log("contacts ahora  ",this.contacts);
                    this.setDataTable(this.contacts,"contacts");
                }
            },

            async newStudent(){               

                if(this.emergencyContacts.length == 0){
                    alert("Para registrar un nuevo un estudiante, debe ingresar al menos un contacto de emergencia");
                }
                else{
                    
                    if(await this.$refs.inputDocument.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                       await this.$refs.inputSecondLastName.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ||
                       await this.$refs.inputAddress.returnValidationAsync() == false){
                           alert("Complete los campos para registrar al estudiante");
                    }else {
                        this.isLoading = true;
                        this.formEdit.emergencyContacts = this.contacts;
                        this.formEdit.idSchool=this.idSchool
                        //this.formEdit.gradeCode = this.formStudentEnrollment.gradeCode
                        var form = _.cloneDeep(this.formEdit);
                        console.log('edit ', this.formEdit.gradeCode)
                        console.log("formulario para registro ",form);
                        const response = await consultServices('createStudent','POST',form);
                        if(response.status == 400 && response.itAlreadyExists==true){
                            this.formNot.tit="Documento ya registrado"; this.formNot.not=response.message;
                        }else if( response.status == 200)
                        {
                                this.formNot.tit="Registro exitoso"; this.formNot.not="Registro realizado de manera satisfactoria";
                                this.formEdit={};
                                this.contacts={}
                                this.formStudentEnrollment = {}
                        }
                        $('.modal').modal('hide');
                        this.shownotificacion();
                        this.isLoading = false;
                    }

                }

            },
            async updateData(){
               this.isLoading = true;

                     var form = _.cloneDeep(this.formStudentEnrollment);
                     if(await this.$refs.inputDocument.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                        await this.$refs.inputSecondLastName.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ||
                        await this.$refs.inputAddress.returnValidationAsync() == false){
                           alert("Complete los campos para actualizar al estudiante");
                    }else {
                        console.log("formulario para actualizar ",form);
                        const response = await consultServices('updateStudent','POST',form);
                        console.log("respuesta:  ",response);
                        if(response ){
                                this.students=[];
                                this.searchStudent();
                                this.formNot.tit="Actualización exitosa"; this.formNot.not="Se actualizó de manera exitosa los datos del estudiante";
                                this.formEdit={};
                        }else{
                            this.formNot.tit="Error en la actualización"; this.formNot.not="No se pudo actualizar la información del alumno";
                        }
                        this.shownotificacion();
                        $('.modal').modal('hide');
                    }
                    this.isLoading = false;
            },
            async listAvailableWorkshops(item){
                console.log('listAvailableWorkshops')
                console.log('grade', this.formStudentEnrollment.gradeCode)
                //Buscamos el grado que coincida con el del estudiante
                let gradeObj = _.find(this.grades, (grade) => {  
                    if(this.formStudentEnrollment.gradeCode == 'sssss'){
                        return grade;
                    }
                })
                var filters = { 
                    id: this.idSchool, 
                    semesterCode: this.semester.id,  
                    typeCode: 'WORKSHOP_CUSTOM'
                }
                //Si el grado del estudiante existe, usamos el parentcode para mandar el ciclo (o level) como filtro
                gradeObj ? filters['levelCode'] = gradeObj.parentCode[0] : null
                
                this.workshopsxSchool = await consultServices('getSchoolAvailableWorkshops','POST', filters);  
            },
            async removeContact(name){
                _.remove(this.emergencyContacts, function (e) {
                    return e.name == name;
                });
                _.remove(this.contacts, function (e) {
                    return e.name == name;
                });
                await  this.refreshData("contacts");
            }

        }

    };

</script>

<style scoped>
.fa {cursor:pointer}
</style>
