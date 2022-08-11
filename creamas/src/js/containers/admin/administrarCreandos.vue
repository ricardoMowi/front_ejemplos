<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Administrar Creandos </h2>
                    <br/>



                    <div class="clearfix"></div>
                         <small>Seleccione rol para filtrar creandos </small>
                </div>

                <div class="card-body">
                    <div class="card">

                        <div class="card-body">
                            <div class="card-body">
                              <inputMaf type='text' v-model="formFilter.documentNumber" :valueInput="formFilter.documentNumber" label="DNI:" nameInput="document" etiqueta='true' ref="filterDocument">
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="formFilter.name" label="Nombres:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="filterName">
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="formFilter.lastName" label="Apellido Paterno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="filterLastName">
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' v-model="formFilter.secondLastName" label="Apellido Materno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="filterSecondLastName">
                              </inputMaf>
                            </div>
                            <div class="card-body">
                              <div class="form-group">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Cargos:</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                      <treeselect v-model="jobs"
                                      :value-consists-of="valueConsistsOf"
                                      :multiple="true"
                                      :options="jobsFilter"
                                      />
                                  </div>
                              </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="Filter()"><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                    <div class="card">
                    <TableMaf :header="colum" :data="creando" :tableTitle="titleTable" :filter='false' ref="tableMaf">
                    </TableMaf>

                    </div>

                </div> <!--card-body-->

            </div> <!--card-->

            <!-- Modal -->
                <div class="modal fade bs-example-modal-role" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">

                        <h3 class="modal-title" id="myModalLabel" >Editar información de usuario</h3>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card-body">

                            <div class="card-body">
                              <inputMaf type='text' :validate="true" v-model="formCreando.documentNumber" :valueInput="formCreando.documentNumber" label="Documento del usuario:" :validation="{required:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument">
                              </inputMaf>
                            </div>
                            
                            <div class="card-body">
                              <inputMaf type='text' :validate="true" v-model="formCreando.name" :valueInput="formCreando.name"  label="Nombres:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName" >
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' :validate="true" v-model="formCreando.lastName" :valueInput="formCreando.lastName"  label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName" >
                              </inputMaf>
                            </div>
                          
                            <div class="card-body">
                              <inputMaf type='text' :validate="true" v-model="formCreando.secondLastName" :valueInput="formCreando.secondLastName"  label="Apellido Materno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                              </inputMaf>
                            </div>

                            <div class="card-body">
                              <inputMaf type='text' :validate="true" v-model="formCreando.email" :valueInput="formCreando.email"  label="Email:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail" >
                              </inputMaf>
                            </div>

                          <!--<div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Roles del usuario:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                              <treeselect v-model="valueRole"
                              :value-consists-of="valueConsistsOf"
                              :multiple="true"
                              :options="optionsRoles" />
                              </div>
                          </div> -->

                          <!--Cargos-->
                          <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Cargos:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <treeselect v-model="valueAppointment"
                                :value-consists-of="valueConsistsOf"
                                :multiple="true"
                                :disable-branch-nodes="true"
                                :options="optionsAppointment"
                                :default-expand-level="1"
                                />
                                </div>
                            </div>
                          </div>


                          <div class="card-body">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Aptitud Psicológica:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formCreando.recruitmentStatusCode">
                                            <option v-for="master in psychologicalStatusCodeArray" v-bind:value="master.code">{{master.displayValue}} </option>
                                        </select>
                                    </div>
                                </div>
                          </div>
                          
                          <div class="card-body">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Aptitud de Competencias:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formCreando.competenceStatusCode">
                                            <option v-for="master in competenceStatusCodeArray" v-bind:value="master.code">{{master.displayValue}} </option>
                                        </select>
                                    </div>
                                </div>
                          </div>

                        </div>

                        <div class="modal-footer">
                          <button type="button" data-target=".bs-example-modal-role" data-toggle="modal" class="btn btn-default">Cerrar</button>
                          <button  @click="updateUser()" type="button" class="btn btn-primary">Guardar cambios</button>
                        </div>
                    </div>



                    </div>
                </div>
                </div>
            <!-- Modal Fin -->

            <!-- Modal -->
                <!-- <div class="modal fade bs-modal-change-status" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                      <div class="modal-header">
                          <h3 class="modal-title" id="myModalLabel" >Cambio de estados</h3>
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <p>Aquí podrás modificar los estados de los creandos, estas modificaciones pueden alterar el conportamiento de la intranet para ellos</p>                        
                          
                          <div class="card-body">

                              <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-4 col-sm-4 col-xs-12">Aptitud Psicológica:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" v-model="formCreando.recruitmentStatusCode">
                                                <option v-for="master in psychologicalStatusCodeArray" v-bind:value="master.code">{{master.displayValue}} </option>
                                            </select>
                                        </div>
                                    </div>
                              </div>
                              
                              <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-4 col-sm-4 col-xs-12">Aptitud de Competencias:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" v-model="formCreando.competenceStatusCode">
                                                <option v-for="master in competenceStatusCodeArray" v-bind:value="master.code">{{master.displayValue}} </option>
                                            </select>
                                        </div>
                                    </div>
                              </div>


                          </div>
                          <div class="modal-footer">
                          <button type="button" data-target=".bs-modal-change-status" data-toggle="modal" class="btn btn-default">Cerrar</button>
                          <button @click="updateChangeStatus()" type="button" class="btn btn-primary">Guardar cambios</button>
                          </div>
                      </div>

                    </div>
                </div>
                </div> -->
            <!-- Modal Fin -->

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
    import TableMaf from "./../../components/TableMaf.vue";
    import Treeselect from '@riophae/vue-treeselect';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import inputMaf from "./../../components/inputMaf.vue";


  export default {
        name: "AdministrarCreandos",
        components: {
            LoadingComponent,
            TableMaf,
            inputMaf,
            Treeselect,
        },

        data: () => ({
            isLoading:false,
            formCreando:{},
            titleTable:"",
            creandos:[],
            creando:{},
            formNot:{not:'',tit:'',},
            formFilter:{
              documentNumber:'',
              name:'',
              lastName:'',
              secondLastName:'',
            },
            semester:{},
            colum:[],
            valueConsistsOf: 'ALL_WITH_INDETERMINATE',
            valueAppointment:null,
            rolesFilter:[],
            jobsFilter:[],
            appointmentFilter:[],
            optionsAppointment:[],
            jobs:[],
            //Arreglos 
            competenceStatusCodeArray:[],
            psychologicalStatusCodeArray: []
        }),

        async created () {

            await this.getMasterValues();
            this.setHeadTable();

        },

        methods: {

          async getMasterValues(){
            this.isLoading = true;
            //Listar arreglos
            var responseMaster = await consultServices('getMasterValues','POST',{ids:[8,31]});
            for (var j = 0; j < responseMaster.length; j++) {
              if(responseMaster[j].code == 'VOLUNTEER_SUITABLE'|| responseMaster[j].code == 'VOLUNTEER_NOT_SUITABLE' || responseMaster[j].code == 'VOLUNTEER_NOT_SUITABLE_TOTAL' ){
                this.psychologicalStatusCodeArray.push(responseMaster[j])
              }
              if(responseMaster[j].idMaster == 31){
                this.competenceStatusCodeArray.push(responseMaster[j])
              }
            }

            if (!window.sessionStorage.descriptionEventCode) {
                // //si no trae los valores, cargarlos en un array que luego se separará en atributos para sessionStorage
                // //consulta única de masterValues (incluir todos los masterValues necesarios para esta pantalla)
                const response =  await consultServices('getCurrentSemester','POST', {});
                //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                this.semester = response;


                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                var jobsFilterAux = await consultServices('getJobsFilters','POST',{});
                this.jobsFilter = this.tranforForSelectTreeFilter(jobsFilterAux);
                var optionsAppointmentEdit = await consultServices('getJobsTree','POST',{});
                this.optionsAppointment=this.tranforForSelectTreeB(optionsAppointmentEdit);
                //Agregar todos los arreglos a los atributos del sessión storage
                window.sessionStorage.semester  = JSON.stringify(this.semester);
                window.sessionStorage.jobsFilter  = JSON.stringify(this.jobsFilter);
                window.sessionStorage.optionsAppointment  = JSON.stringify(this.optionsAppointment);

            } else {
                console.log("existen datos en sessionStorage")
                // //si los datos existen cargarlos en los arreglos definidos para la patalla
                this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                this.jobsFilter =JSON.parse( window.sessionStorage.jobsFilter );
                this.semester =JSON.parse( window.sessionStorage.semester );
                this.optionsAppointment =JSON.parse( window.sessionStorage.optionsAppointment );
                // //fin de la carga de arreglos para la pantalla
            }

            this.isLoading = false;
          },

          tranforForSelectTreeFilter(jobs) {
            return _.map(jobs,(job)=>{
                var response = {
                id: job.id,
                label: job.name+" ("+job.volunteerCount+")",
                }
                return response;
            })
          },

          tranforForSelectTree(roles) {
            return _.map(roles,(role)=>{
                var response = {
                id: role.id,
                label: role.name,
                }
                return response;
            })
            },

          tranforForSelectTreeB(Organizations) {
            var children1=[];
            var children2=[];
            var valueAux=[];
            return _.map(Organizations,(organization)=>{

              children1=[];
              var areaAux={};

              _.map(organization.Areas,(area)=>{

                children2=[];
                _.map(area.Jobs,(job)=>{
                  children2=_.concat(children2,{id:job.id,label:job.name,isDisabled:!job.availableForAdmin})

                })

                areaAux={
                  id: "a"+area.id,
                  label: area.name,
                  children: children2,
                };

                children1=_.concat(children1,areaAux);

              })

                var response = {
                id: "d"+organization.id,
                label: organization.name,
                children:children1,
                }

                console.log("arbol")
                console.log(response)

                return response;
            })
          },

          tranforForSelectTree(roles) {
            return _.map(roles,(role)=>{
                var response = {
                id: role.id,
                label: role.name,
                }
                return response;
            })
            },

          obtainAllIdJobs(jobs) {
          return _.map(jobs,(job)=>{

              var response = job.id;

              return response;
          })
          },

          async Filter(){
              this.isLoading = true;
                var array1;

                var form = _.cloneDeep(this.formFilter);

                if(this.jobs != "undefined" && this.jobs != null && this.jobs.length != null && this.jobs.length > 0) {

                  form = {
                    ...form,
                    jobs:[this.jobs],
                    semesterCode:this.semester.id,
                  }

                } else {
                  form = {
                    ...form,
                    semesterCode:this.semester.id,
                  }
                }

                array1= await consultServices('searchVolunteerByJob','POST',form)
                this.setDataTable(array1);
                 //}
                /*else{

                $('.modal').modal('hide');
                   this.formNot.tit="Parámetros incompletos";
                   this.formNot.not="Seleccione al menos un cargo para iniciar la búsqueda";
                   this.shownotificacion();
                }*/
              this.isLoading = false;
           },

          async shownotificacion(){
            $('.bs-example-modal-not').modal('show');
          },

          setHeadTable() {
            this.colum = [
              //{label:'Nombre de usuario' ,name:'user' ,find:0 ,sort:0},
              {label:'Nombre' ,name:'fullName' ,find:0 ,sort:0},
              {label:'Email' ,name:'email' ,find:0 ,sort:0},
              {label:'Cargos' ,name:'appointment' ,find:0 ,sort:0},
              {label:'Sesiones' ,name:'publications' ,find:0 ,sort:0},
              {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},],
            this.titleTable = "Resultados";
          },

          refreshData() {
                //console.log("creandos : ",this.creandos);
            this.$refs.tableMaf.formatData(this.creandos);
          },

          showPasswordEdit(item){
            this.editPassword.documentNumber=item.documentNumber;
            $('.modal-password').modal('hide');
          },


          setDataTable(arrayData){
            console.log('arrayDat:::',arrayData)
            var ctx = this;
            this.creandos = [];

            var name = "";
            var lastName = "";
            var secondLastName = "";
            var fullName = "";
            var vJobs = [];

            arrayData.forEach(item => {
              var crea = {};
              var pro = this.tranforForSelectTree(item.roles);
              vJobs = [];

              vJobs = _.filter(item.VolunteerJobs,(job)=>{
                if(job.Job != null){
                  return job.Job.name;
                }
              })
              console.log('tenemos: ', vJobs)
              console.log('tenemos: ', vJobs)
              crea.id=item.id;
              name=item.name;
                if(item.lastName) {
                lastName=item.lastName
                } else {
                  lastName="";
                };

              if(item.secondLastName) {
                secondLastName=item.secondLastName
                } else {
                  secondLastName="";
                };
              fullName=name + " " + lastName + " " + secondLastName;
              crea.fullName=fullName
              crea.name = name;
              crea.lastName=lastName;
              crea.secondLastName=secondLastName;
              //crea.user=item.user;
              crea.email=item.email;
              crea.appointment=_.map(vJobs,'Job.name')[0];
              //crea.profile=load.toString();
              //crea.roles=item.roles;
              crea.publications=item.sessionCount;
              crea.documentNumber=item.documentNumber;
              crea.actions=<font style="vertical-align: inherit;">
                  <div> <button onClick={()=>ctx.showEditModal(item)} type="button" class="btn btn-warning btn-xs" data-target=".bs-example-modal-role" data-toggle="modal">Editar</button> </div>                  
              </font>;

              this.creandos.push(crea);
            });
            this.refreshData();
          },

          async showEditModal(item){
            this.isLoading = true;
              var formFilter = { documentNumber : item.documentNumber,
                  semesterCode : this.semester.id };
              const resp = await consultServices('searchVolunteerByJob','POST',formFilter);
              var pro = this.tranforForSelectTree(resp[0].roles);
              var vJobs = _.filter(item.VolunteerJobs,(job)=>{
                if(job.Job != null){
                  return job.Job.name
                }
                })
              console.log('vJobs: ', vJobs)
              var appointment = _.uniqBy(vJobs,'name');
              //  var auxJobs=[];
                this.valueAppointment = null;
                this.formCreando = _.cloneDeep(resp[0]);
                this.formCreando = {
                  ...this.formCreando,
                  fullName:item.name + " " + item.lastName + " " + item.secondLastName,
                }
                this.formCreando.appointment = appointment;

                var jobsArray = _.filter(this.formCreando.VolunteerJobs,(volunteerJob)=>{
                  if(volunteerJob.Job != null){
                    console.log('agregando a jobsArray el id de ', volunteerJob.Job)
                    return volunteerJob.Job.id;
                  } 
                })
                console.log('Arreglo final: ', jobsArray)
                jobsArray = _.map(jobsArray, 'Job.id');
                this.valueAppointment = jobsArray

                //var array1= _.map(this.creando.roles,(item)=>(item.code));
                //this.valueRole = _.concat(array1)
            this.isLoading = false;
          },

          async showChangeStatusModal(item){
            console.log('item showChangeStatusModal', item)
            var formFilter = { documentNumber : item.documentNumber,
                  semesterCode : this.semester.id };
            const resp = await consultServices('searchVolunteerByJob','POST',formFilter);
            this.formCreando = _.cloneDeep(resp[0]);
            console.log('fromcreando', this.formCreando)
          },

          async updateUser(){
            console.log('this.valueAppointment  ', this.valueAppointment)
            //if(this.valueAppointment.length > 0){
              var flag = confirm("Estos cambios pueden impactar la experiencia del usuario, ¿Desea continuar?");
              //Validamos los jobs que jobAvalibleTrue
              var allJobs = await consultServices('getAllJobs','POST',{});
              var apoimentTrue=[];

              console.log('valores del arbol: ', this.valueAppointment)
              _.map(this.valueAppointment, (appointmentAvalible) => {
                console.log('nodo del arbol: ', appointmentAvalible.childen1)
                var jobAvalibleTrue = _.find(allJobs, (JobAvailable) => {
                    return JobAvailable.id == appointmentAvalible
                })

                if(jobAvalibleTrue) {
                  if(jobAvalibleTrue.availableForAdmin == true){
                    apoimentTrue.push(jobAvalibleTrue.id)
                  }
                }
              })

                var form = _.cloneDeep(this.formCreando);
                if(flag==true) {
                  form = {
                    ...form,
                    id:this.formCreando.id,
                    jobs: apoimentTrue,
                    semesterCode:this.semester.id,
                  }

                  this.isLoading = true;

                  if(await this.$refs.inputDocument.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ||
                  await this.$refs.inputLastName.returnValidationAsync() == false || await this.$refs.inputSecondLastName.returnValidationAsync() == false ||
                  await this.$refs.inputEmail.returnValidationAsync() == false) {
                    this.formNot.tit="Actualización del voluntario";
                    this.formNot.not="No se pudieron actualizar los datos del usuario, datos del creando incompletos";
                  } else {
                      const response = await consultServices('setJobs','POST',form);
                      const response0 = await consultServices('updateVolunteer','POST',form);
                      $('.modal').modal('hide');
                      this.formNot.tit = "Actualización del voluntario";
                      this.formNot.not = "Se actualizaron los datos del usuario de manera correcta.";
                      this.Filter();
                  }
                  this.shownotificacion();
                  this.isLoading = false;
                }else{
                  return this.isLoading=false
                }
            // }else{
            //   alert("Seleccione como mínimo un cargo");
            // }
          },

          async updateChangeStatus(){
            this.isLoading = true
            // console.log('form creando', this.formCreando)
            var form = _.cloneDeep(this.formCreando);
            // console.log('form listo', form)
            const response0 = await consultServices('updateVolunteer','POST',form);
            $('.modal').modal('hide');
            if(response0.length > 0){
              this.formNot.tit = "Actualización del voluntario";
              this.formNot.not = "Se actualizaron los datos del usuario de manera correcta.";
            }else{
              this.formNot.tit = "Error actualizando";
              this.formNot.not = "No se actualizaron los datos del usuario de manera correcta.";
            }
            this.shownotificacion();
            this.isLoading = false
          },
        },
    }

</script>

<style scoped>
.fa {cursor:pointer}
</style>
