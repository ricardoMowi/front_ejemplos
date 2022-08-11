<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="jumbotron">
      <h1 class="display-4">¡Hola {{shortName}}!</h1>
      <br>
      <p class="lead">Te damos la bienvenida a tu intranet de Crea+.</p>
      <hr class="my-4">
      <p class="lead">Abajo encontrarás información importante sobre tu participación.</p>
      <!-- <p class="lead">
            Te encuentras en programa {{dataProject.desktopName}}. Accede a todas las opciones disponibles en el menú izquierdo.<br/>
            Recuerda siempre mantener actualizado tu perfil.
          </p>
      <a class="btn btn-primary btn-lg" href="/dashboard/perfilCreando" role="button">Learn more</a> -->
    </div>
    <div >
      <!-- <div class="card-header">
        <h2> ¡Hola {{name}}!</h2>
        <div class="clearfix"></div>
      </div> -->
      <!--Modal Password (Sincronización)-->
      <div class="modal fade modal-Password" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Actualizar contraseña</h5>
            </div>
            <div class="modal-body">
              <h2>Bienvenido a la nueva Intranet, por favor, actualiza tu contraseña.</h2>
              <div class="card-body">
                  <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Contraseña (*)</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input type="password" v-model="password" autocomplete="off"  required="required" class="form-control col-md-7 col-xs-12">
                      </div>
                  </div>
              </div>
                <div class="card-body">
                  <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirma la contraseña (*)</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  type="password" v-model="confirmPassword" required="required" class="form-control col-md-7 col-xs-12" autocomplete="off">
                      </div>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="linkVolunteerSinc()" class="btn btn-primary">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin Modal Password-->

      <!-- Componente inicial, empezamos con las reglas -->
      <!-- Sección de inscripciones a proyectos -->
      <div v-if="statusCode != 'VOLUNTEER_PENALIZED' && statusCode != 'VOLUNTEER_SEPARATED' && this.projects.length > 0"  class="card">  
        <div class="card-header collapse show blue" data-toggle="collapse" data-target="#enrollmentProcessess">
          <h2 class="whiteFont" >Mis Procesos de inscripción</h2>
          <div class="clearfix"></div>
        </div>
        <div class="collapse show" id="enrollmentProcessess">
           <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el proceso que desees revisar:</label>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <select v-on:change="selectedProjectChanged()" class="form-control" v-model="idProject" >
                <option disabled="disabled" value="">Selecciona una opción.</option>
                <option v-for="item in penddingAssignmentRecords" v-bind:value="item.School.id" >
                  {{item.School.desktopName}}
                </option>
                <option v-bind:value="undefined">Ver Programas disponibles</option>
              </select> 
            </div>
          <!-- Proceso de Inscripción, sólo si tiene idProject (ya sea de la url o de su posible assignemntRecord) -->
          <div id="divSteps" v-if="idProject != undefined" class="card-body">
            <!--Mostrar pasos-->
            <div v-if="showSteps">
              <h5>Sigue los siguientes pasos para inscribirte</h5>
              <div>
                <vue-step :now-step="nowStep" :style-type="style" :step-list="stepList"></vue-step>
              </div>
            </div>
            <!--|||||||||||||||||||||||||||||||-->

            <!--Paso 1-->
            <div class="card" v-if="nowStep == 1">
                <div class="card-header">
                  <h2>Detalle de programa</h2>
                  <div class="clearfix"></div>
                </div>
                <div class="card-body" >
                  <div class="card-body">
                    <p>Queremos que estés seguro del proyecto en el que te estás inscribiendo.</p>
                    <h2 class="title">
                    <a>{{projectName}}</a>
                    </h2>

                    <p class="excerpt">{{projectDescription}}</p>
                    <div v-if="this.dataProject.attachmentUrl != null && this.dataProject.attachmentUrl != ''">
                      <a :href="this.dataProject.attachmentUrl">Ver material informativo</a>
                    </div>
                    <div v-if="this.urlVideo !=null" style="position: relative;padding-bottom: 56.25%;height: 0;overflow: hidden;">
                      <iframe style="position: absolute;display:block,top:0;left:0;width: 90%;height: 90%;" id="step1Video" src="" frameborder="0" allowfullscreen ></iframe> 
                    </div>

                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-success"  @click="showNotificacion()"> Confirmar mi participación </button>
                  </div>
                </div>
              <!--card-->
            </div>
            <!--|||||||||||||||||||||||||||||||-->

            <!--Paso 2-->
            <div class="card" v-if="nowStep == 2 && this.stepsHidden == false">
              <!--||Proyecto Académico: task|||||||-->
              <div class="card-body" v-if="projectType == 'ACADEMIC_PROJECT'">
                <div class="card-header">
                  <h2>Evaluación</h2>
                  <div class="clearfix"></div>
                </div>
                <div class="card-body" >
                  <div class="card-body">
                    <p style="white-space: pre-wrap;" class="excerpt">{{taskDescription}}</p>
                    <p class="excerpt"> Fecha límite para completar el evaluación: {{taskDeadline}}</p>
                  </div>
                  <div class="card-body">
                      <div class="row">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Pon aquí el link de tu video: </label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input autocomplete="off"  required="required" class="form-control col-md-7 col-xs-12" v-model="formPersonalInformation.taskUrl">
                          </div>
                      </div>
                  </div>             
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="showNotificacion()"> Subir evaluación </button>
                  </div>
                </div>
              </div>
              <!--||Proyecto voluntariado: Assessment|||||||-->
              <div class="card-body" v-if="projectType == 'VOLUNTEER_PROJECT'">
                <div class="card-header">
                  <h2>Agenda tu charla:</h2>
                  <div class="clearfix"></div>
                </div>
                <div class="card-body" >
                  <p class="excerpt"> A continuación, verás la lista de charlas disponibles para este programa. Para continuar, elige la charla a la que asistirás. ¡Te esperamos!</p>
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fechas disponibles:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <select class="form-control" v-model="selectedAssesment" >
                          <option disabled="disabled" value="">Selecciona un fecha disponible</option>
                          <option v-for="item in assessmentEvents" v-bind:value="item" >
                            {{item.desktopName}}
                          </option>
                        </select>     
                    </div>
                  </div>       
                  <p v-if="selectedAssesment.descriptionDetail" class="excerpt">Detalle de charla: {{selectedAssesment.descriptionDetail}}. Fecha: {{formattDate(selectedAssesment.startDate)}}</p> 
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="showNotificacion()">Agendar</button>
                  </div>
                </div>
              </div>
            </div>
            <!--|||||||||||||||||||||||||||||||-->

            <!--Paso 3-->
            <div class="card"  v-if="nowStep == 3 && this.stepsHidden == false">
              <!--|||Creando activo ||||||||||||||||||||||||||||-->
              <div class="card-body"  v-if="recruitmentStatusCode == 'VOLUNTEER_SUITABLE'">
                <div class="card-body" >
                  <div class="card-header">
                    <h2>Prueba Psicológica </h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="card-body" >
                    <p> ¡Ya eres creando! No necesitas completar este paso. </p>
                  </div>       
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="goToStep4()"  > Continuar </button>
                  </div>
                </div>
              </div>

              <!--|||  prueba Psicológica ||||||||||||||||||||||||||||-->
              <div v-else>

                  <!--|||  Completar género y fecha de nacimiento ||||||||||||||||||||||||||||-->
                  <div class="card-body" v-if="showTest == false && recruitmentStatusCode  != 'VOLUNTEER_SUITABLE' " >
                    <div class="card-header">
                      <h2>Completa los siguientes campos para iniciar la prueba Psicológica </h2>
                      <div class="clearfix"></div>
                    </div>
                    <div class="card-body" >
                      <!--Fecha de nacimiento-->
                      <div class="card-body">
                          <div class="row">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">                             
                                    <Datetime  v-model="volunteerTest.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date"  ></Datetime>
                              </div>
                          </div>
                      </div>
                      <!--Género-->
                      <div class="card-body">
                          <div class="row">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Género </label>
                              <div class="col-md-6 col-sm-6 col-xs-12">                                
                                      <select class="form-control" v-model="volunteerTest.genderCode"  >
                                            <option disabled="disabled" value="">Seleccione</option>
                                            <option >Masculino</option>
                                            <option>Femenino</option>
                                      </select>
                              </div>
                          </div>
                      </div>               
                    </div>       
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success"  @click="startTest()"> Empezar prueba </button>
                    </div>
                  </div>

                  <!--|||  prueba Psicológica ||||||||||||||||||||||||||||-->
                  <div class="card-body" v-else>
                    <div class="card-header">
                      <h2>Prueba Psicológica </h2>
                      <div class="clearfix"></div>
                    </div>
                    <div class="card-body" >
                      <p class="excerpt">{{testDescription}}</p>
                      <div>
                        <div v-for="(item, i) in questionArray" :key="`A-${item.id}`">              
                          <div style="margin-left: 10px;" >
                            <div class="form-group row ">
                              <div class="form-group col-md-12 col-sm-12 col-xs-12" style="padding-left: 35px;  padding-bottom: 0px; padding-right: 0px;">
                              <h2>{{item.displayName}} </h2>
                              </div>
                              <form style="margin-left: 20px;">                    
                                  <div class="custom-control custom-radio" v-for="(option) in arrayOption" :key="`A-${option.value}`" style="margin-bottom: 5px;">
                                    <input type="radio" :id="`id_${option.value}_${item.id}`" :name="`n_${item.id}`" class="custom-control-input" 
                                    :value="`${option.value}`"   @change="saveDataAnswer(option.value,item.id, i)" v-model="item.checkedValue ">
                                    <label class="custom-control-label" :for="`id_${option.value}_${item.id}`" >{{option.label}}</label>
                                  </div>                
                              </form>      
                            </div>
                          </div>           
                        </div> 
                      </div>                
                    </div>       
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success"  @click="showNotificacion()"> Enviar respuestas </button>
                    </div>
                  </div>
              </div>

            </div>
            <!--|||||||||||||||||||||||||||||||-->

            <!--Paso 4-->
            <div class="card" v-if="nowStep == 4">
              <!-- Si es apto psicológicamente y competencias, es aceptado! -->
              <div v-if="recruitmentStatusCode == 'VOLUNTEER_SUITABLE' &&
                            (this.projectType == 'VOLUNTEER_PROJECT' && (competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' || competenceStatusCode == 'COMPETENCE_VOLUNTEER_SUITABLE')) || 
                            (this.projectType == 'ACADEMIC_PROJECT' && competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE')">
                <div class="card-header">
                  <h2>¡Bienvenido(a) al Programa!</h2>
                  <div class="clearfix"></div>
                </div>
                <div class="card-body">
                  <p>¡Felicitaciones! Has sido admitido en el programa <strong>{{dataProject.desktopName}}</strong>. Para completar tu inscripción, por favor completa este formulario:</p>
                </div>
                <!--Alias-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.alias" :valueInput="formPersonalInformation.alias" label="Alias:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="name" etiqueta='true' ref="inputAlias">
                  </inputMaf>
                </div>
                <!-- <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Talla de polo:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="formPersonalInformation.dressSize">
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                              </select>
                        </div>
                  </div>
                </div> -->
                <!--Direccion-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.address"  :valueInput="formPersonalInformation.address" label="Dirección:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputAddress">
                  </inputMaf>
                </div>
                <!-- <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de vivienda:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="formPersonalInformation.district" >
                                <option v-for="district in districts" :value="district.id">{{district.name}}</option>
                          </select>
                        </div>
                  </div>
                </div> -->
                <!--Celular-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.phone" :valueInput="formPersonalInformation.phone" label="Celular:" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone">
                  </inputMaf>
                </div>
                <!--Centro de estudios-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.collegeName" :valueInput="formPersonalInformation.collegeName" label="Centro de estudios superior(último):" :validation="{required:true, max:200}" nameInput="text" etiqueta='true' ref="inputCollegeName">
                  </inputMaf>
                </div>
                <!--Carrera-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.careerName" :valueInput="formPersonalInformation.careerName" label="Carrera de estudios (actual o último):" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputCareer">
                  </inputMaf>
                </div>
                <!--Centro de trabajo-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.organizationName" :valueInput="formPersonalInformation.organizationName" label="Organización donde trabajas:" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputOrganizationName">
                  </inputMaf>
                </div>
                <!--Puesto de trabajo-->
                <div class="card-body">
                  <inputMaf type='text' v-model="formPersonalInformation.organizationJob" :valueInput="formPersonalInformation.organizationJob" label="Cargo laboral:" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputorganizationJob">
                  </inputMaf>
                </div>
                <!--Sueño-->
                <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cúal es tu sueño en la vida?:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input type="text" placeholder="Tu sueño ..." v-model="formPersonalInformation.dream" class="form-control" textarea="true" rows="9">
                        </div>
                  </div>
                </div>
                <!--Nivel de cumplimiento del sueño-->
                <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel de cumplimiento del sueño:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="formPersonalInformation.dreamAccomplishment" >
                                <option v-for="item in levelsDreamFulfillment" :value="item.id">{{item.value}}</option>
                          </select>
                        </div>
                  </div>
                </div>
                <!--Cambio en Perú-->
                <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué tanto crees que el cambio en el Perú es posible? :</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="formPersonalInformation.improvementExpectation" >
                                <option v-for="item in levelsBeliefChangePeru" :value="item.id">{{item.value}}</option>
                          </select>
                        </div>
                  </div>
                </div>

                <div class="card-body" v-if="seniorityCode != 'VOLUNTEER_NONE' && this.projectType == 'VOLUNTEER_PROJECT'">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Estás renovando?, Puedes elegir el equipo de tu preferencia si está disponible:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="assignmentForm.teamSelected"  @change="onChangeTeam()" >
                            <option :value="undefined">Cualquiera</option>
                            <option v-for="item in dataProject.Children" :value="item.id">{{item.name}}</option>
                          </select>
                        </div>
                  </div>
                </div>

                <div class="card-body" v-if="this.projectType == 'VOLUNTEER_PROJECT'">
                  <div id="divMessage" class="card-body" style="display:none" >
                    <p>No hay talleres disponibles </p>
                  </div>

                  <div id="divRoles" class="form-group" >
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige cómo quieres participar:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control"  v-model="assignmentForm.role" @change="onChangeRole()" >
                              <option disabled="disabled" value="">Selecciona un rol</option>
                              <option v-for="item in optionsRoles" v-bind:value="item.code" >
                              {{item.name}}
                              </option>
                          </select>
                      </div>
                  </div> 

                  <div id="divWorkshopsCustom" class="card-body" style="display:none" >

                    <div class="card-body" >
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el ciclo:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="assignmentForm.level"  @change="onChangeLevel()">
                                  <option disabled="disabled" value="">Ciclos disponibles</option>
                                  <option v-for="item in availableLevel" v-bind:value="item">
                                    {{getDisplayValue(item)}}
                                  </option>
                                </select>
                            </div>
                      </div>
                    </div>
                    <div class="card-body" >
                            <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la categoría del taller:</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                      <select class="form-control" v-model="assignmentForm.category" @change="onChangeCategory()" >
                                        <option disabled="disabled" value="">Categorías de los talleres</option>
                                        <option v-for="item in optionsCategory" v-bind:value="item">                                      
                                          {{getDisplayValue(item)}}
                                          </option>
                                          </select>
                                  </div>
                            </div>
                    </div>
                    <div class="card-body" >
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller:
                          <p style="color: #0059A8;">No te quedes solo, de preferencia elige un taller que ya tenga creandos</p>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="assignmentForm.workshop" >
                              <option disabled="disabled" value="">Talleres disponibles</option>
                              <option v-for="item in availableWorkshops" v-bind:value="item">
                                    {{getDisplayValue(item.contentCode)}}, Aquí hay {{item.registered}} creando(s).
                              </option>
                            </select>
                        </div>
                      </div>
                    </div>                    
                    <div class="card-body" >
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller (segunda opción):
                          <p style="color: #0059A8;">Si por alguna razón tu taller no logra aperturarse, tendremos en cuenta esta opción para asignarte a otro.</p>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="assignmentForm.requestedSecondContentCode " >
                              <option disabled="disabled" value="">Talleres disponibles</option>
                              <option v-for="item in availableSecondWorkshops" v-bind:value="item.contentCode">
                                    {{getDisplayValue(item.contentCode)}}, Aquí hay {{item.registered}} creando(s).
                              </option>
                            </select>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div id="divWorkshopsMath" class="card-body" style="display:none" >
                    <div class="card-body" >
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el grado :</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control" v-model="assignmentForm.grade" @change="onChangeGrade()" >
                                  <option disabled="disabled" value="">Grados</option>
                                  <option v-for="item in optionsGrade" v-bind:value="item">
                                    {{getDisplayValue(item)}}
                                    </option>
                                    </select>
                            </div>
                      </div>
                    </div>
                    <div class="card-body" >
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la sección :</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control" v-model="assignmentForm.classroomCode" >
                                  <option disabled="disabled" value="">Secciones disponibles</option>
                                  <option v-for="item in availableClassrooms" v-bind:value="item">
                                    {{getDisplayValue(item.classroomCode)}}, Aquí hay {{item.registered}} creando(s).
                                  </option>
                                </select>
                            </div>
                      </div>
                    </div>              
                  </div>

                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-success" @click="showNotificacion()" > Confirmar datos </button>
                </div>  
              </div>   
              <div v-else-if="recruitmentStatusCode == 'VOLUNTEER_NOT_SUITABLE' && competenceStatusCode == 'COMPETENCE_NOT_SUITABLE'">
                <div class="card-header">
                  <h2>Gracias por participar</h2>
                  <div class="clearfix"></div>
                </div>
                <div class="card-body">
                  <div>Nos ha dado mucho gusto poder conocerte. En esta oportunidad, no has sido seleccionado para participar de {{dataProject.desktopName}}.</div>
                  <div>Te invitamos a no desalentarte, tu postulación demuestra el deseo de crecimiento que tienes, por lo que esperamos que sigas buscando formas de contribuir y crecer. Asimismo, recuerda que este programa se repetirá el próxima año y quizás con mayor preparación estarás listo para llevarlo.</div>
                </div>
              </div>              
              <div v-else> 
                <div class="card-header">
                    <h2>Resultados</h2>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body" >
                  <div class="card-body">
                    <p class="excerpt">Gracias por tu envío, evaluamos las pruebas cada 5 días. Cuando tengamos tus resultados podrás verificarlos aquí.</p>
                    <p v-if="selectedAssesment.descriptionDetail" class="excerpt"> <b> Recuerda los datos de tu charla : {{selectedAssesment.descriptionDetail}}. Fecha: {{formattDate(selectedAssesment.startDate)}} </b></p> 
                  </div>
                  <div class="card-body" >
                    <p class="excerpt"> Si no pudiste asistir o necesitas cambiar tu charla, puedes hacerlo aquí :</p>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Fechas disponibles:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="selectedNewAssesment" >
                            <option disabled="disabled" selected="selected" >Elige una fecha disponible</option>
                            <option v-for="item in assessmentEvents" v-bind:value="item" >
                              {{item.desktopName}}
                            </option>
                          </select>     
                      </div>
                    </div>       
                    <p v-if="selectedNewAssesment.descriptionDetail" class="excerpt">Detalle de charla: {{selectedNewAssesment.descriptionDetail}}. Fecha: {{formattDate(selectedNewAssesment.startDate)}}</p> 
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success" @click="updateAssement()">Actualizar charla</button>
                    </div>
                  </div>
                </div>
              </div>              
            </div>
            <!--|||||||||||||||||||||||||||||||-->
          </div>
          <!-- Fin Proceso de Inscripción -->
          <!-- Proyectos activos -->
          <div v-else id="divTableProject" class="card-body">
            <!-- <div class="card-header">
              <h2>Programas de Crea+ disponibles</h2>
              <div class="clearfix"></div>
            </div> -->
            <div v-if="this.projects.length > 0" class="card-body" >
                <TableMaf :header="columTableProject" :data="projects" :tableTitle="titleTableProject" ref="tableMafProjects">
                </TableMaf>
            </div>  
          </div>
          <!-- Fin Proyectos activos -->
        </div>
      <!-- Fin Componente Inicial -->
      </div>
      <!-- Si es activo o penalizado, mostramos el mensaje del escritorio -->
      <div v-if="statusCode == 'VOLUNTEER_ACTIVE'" class="card">
        <div v-if="confirmedAssignmentRecords.length > 0">
          <div class="card-header collapse show blue" data-toggle="collapse" data-target="#confirmedProjects">
            <h2 class="whiteFont">Mis Programas</h2>
            <div class="clearfix"></div>
          </div>
          <div class="collapse show" id="confirmedProjects">
            <p class="lead">
              Te encuentras activo(a) en los siguientes programas.
            </p>
            <div v-for="ar in confirmedAssignmentRecords">
              <p  style="font-size: 15px;">
                <strong>{{ar.School.desktopName}}:</strong>
              </p>
              <div v-if="ar.School.id == 43">
                <p style="font-size: 15px;">
                  A continuación, te mostramos el cronograma del programa {{ar.School.desktopName}}:
                </p>
                <div>
                  <img class="img-fluid" src="https://drive.google.com/uc?id=1PN1gX3VxCuE8PGlQ3jLrDydj6RzaYkaQ&export=download" alt="">
                </div>
              </div>
              <div v-else>
                <p style="font-size: 15px;">
                  Pronto podrás ver el cronograma de este programa.
                </p>
              </div>
              <br>
            </div>
          </div>
        </div>
        <!-- <p v-else class="lead">
          Te encuentras en programa {{dataProject.desktopName}}. Accede a todas las opciones disponibles en el menú izquierdo.<br/>
          Recuerda siempre mantener actualizado tu <a href="/dashboard/perfilCreando">perfil</a>.
        </p> -->
      </div>
      <div v-else-if="statusCode == 'VOLUNTEER_PENALIZED'" class="card">
        <p class="lead">
          Querido Creando, en el último semestre tus líderes reportaron que no cumpliste con uno o más de los mínimos requisitos de profesionalismo con el programa: asistencia, puntualidad y compromiso. Por ello no te permitiremos renovar tu compromiso este semestre, para cuidar del impacto con nuestro niños. El próximo semestre podrás volver a intentar si te puedes comprometer a cumplir con los estándares de voluntariado profesional de Crea+. ¡Nos vemos!
        </p>
      </div>
    </div>
  </div>

  <!--Modal not-->
  <div class="modal fade modal-notification" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-cat">
      <div class="modal-content">
        <div class="modal-header">

            <h3 class="modal-title" > <center> {{formNot.title}}  </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>

        </div>
        <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.message}} </center> </h4></div>
            <div v-if="this.dataProject.message" class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Aceptar</button>
              </center>
            </div>
            <div v-else class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                <button v-if="nowStep == 1" type="button" data-dismiss="modal" class="btn btn-success" @click="confirmParticipation()">Aceptar</button>
                <button v-if="nowStep == 2" type="button" data-dismiss="modal" class="btn btn-success" @click="sendCompetenceTest()">Aceptar</button>
                <button v-if="nowStep == 3" type="button" data-dismiss="modal" class="btn btn-success" @click="finishTest()">Aceptar</button>
                <button v-if="nowStep == 4" type="button" data-dismiss="modal" class="btn btn-success" @click="confirmData()">Aceptar</button>
              </center>
            </div>
      </div>
    </div>
  </div>
  <!--Modal not-->

  <!--Modal not generic-->
  <div class="modal fade modal-notification-generic" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-cat">
      <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title" > <center> {{formNotGeneric.title}}  </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">   <h4 class="modal-title" > <center> {{formNotGeneric.message}} </center> </h4></div>
            <div class="modal-footer">
              <center>
                <button v-on:click="reloadPage" type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
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
import inputMaf from "./../../components/inputMaf.vue";
import TableMaf from "./../../components/tableMaf.vue";

import _ from 'lodash';
import moment from 'moment';
import {
  Datetime
} from 'vue-datetime';
import charlaRegistrar from "./../../components/charlaRegistrar.vue";
//IMPORTAR PARA STEPS
import vueStep from 'vue-step'
export default {
  name: "DesktopContainer",
  components: {
    LoadingComponent,
    charlaRegistrar,
    vueStep,
    inputMaf,
    TableMaf,
    Datetime,
  },
  data: () => ({
    isLoading: false,
    requireVolunteerSincUpdate: window.INITIAL_STATE.requireVolunteerSincUpdate,
    //Id de proyecto
    idProject: window.INITIAL_STATE.tempIdProject, //undefined, // window.INITIAL_STATE.tempIdProject,
    idAssignmentRecord: '',
    idVolunteerJob: '', 
    masters: [],
    message: {
      title: '',
      message: '',
      noEventos: ''
    },
    // form:{
    //   whereabouts:'',school:'',catParticipationId:'',workshopId:'',workshopGrade:'',knowledgeLevel:'',knowledgeLevel2:'',workshopName:'',workshopName2:'',
    // },
    assignmentForm:{role: '', },
    optionsCategory:[],
    optionsGrade:[],
    documentNumber:window.INITIAL_STATE.documentNumber,
    //Primero
    recruitmentStatusCode: window.INITIAL_STATE.recruitmentStatusCode,
    seniorityCode: window.INITIAL_STATE.seniorityCode,
    statusCode: window.INITIAL_STATE.statusCode,
    id: window.INITIAL_STATE.id,
    noEvent:'',
    nowStep: 1,
    stepList: ['Confirma tu Programa','Evaluación de Competencias', 'Prueba Psicológica', 'Ver resultados'],
    // schoolsBus:[],
    // whereabouts:[],
    workshopCategories:[],
    catWorkshops:[],
    workshops:[],
    workshops2:[],
    levels:[],
    semester:[],
    contentWorkshop:[],
    //Opciones
    optionsRoles: [],
    workshopXProject: [],
    grades:[],
    //Selección de talleres en el paso 4
    availableLevel:[],
    availableClassrooms:[],
    availableWorkshops:[],
    availableSecondWorkshops:[],
    workshopsCustom:[],
    workshopsMath:[],
    levelsKnowledge:[],
    levelsBeliefChangePeru:[],
    levelsDreamFulfillment:[],
    flagParticipationFieldsShown:false,
    districts:[],
    //datos del creando
    formPersonalInformation:{},
    assignmentRecords: [],
    penddingAssignmentRecords: [],
    confirmedAssignmentRecords: [],
    //dta fake
    // catWorkshopFlag:false,
    // otherNameFlag:false,
    // nameWorkshopFlag:false,
    // otherNameFlag2:false,
    // nameWorkshopFlag2:false,
    // otherNameFlag3:false,
    // nameWorkshopFlag3:false,
    style: 'white-space: pre-wrap;',
    //necesario para registrarse en un assesment
    address: '',
    date: '',
    showSteps:true,
    name:'',
    shortName:'',
    password: '',
    confirmPassword: '',
    //deadline
    deadlineTimeFlag: false,
    participationFlag: false,
    projectDescription:'',
    idVolunteer: '',  
    //nuevo escritorio
    //proyecto
    dataProject:{},
    projectType: null,
    eventsByProject:[],
    assessmentEvents:[],
    //paso 1 
    urlVideo : '',  
    attachmentUrl : '',
    projectName: '',
    projectDescription: '', 
    isEnrolled: false,
    //paso 2
    selectedAssesment: {}, // Assessment elegido
    selectedNewAssesment: {}, //nuevo assesment, en caso se cambie la fecha en el paso 4
    assessmentScheduled: false, 
    testDescription:'Las páginas siguientes contienen una serie de frases usuales o expresiones que las personas suelen utilizar para describirse a sí mismas. Marque Verdadero SI ESTÁ DE ACUERDO con la frase o piensa que describe su forma de ser. Si por el contrario la frase NO REFLEJA NI CARACTERIZA su forma de ser, marque Falso.',
    questionArray: [],
    arrayOption:[
      {value: 0, label: 'Falso'},
      {value: 1, label: 'Verdadero'},
    ],
    volunteerTest: {},
    showTest: false,
    //paso 3
    testFilled: false,
    taskDescription : '', 
    taskDeadline : '',
    taskUrl: null,
    //paso 4
    stepsHidden: false,
    //notificaciones para el proceso de inscripciones    
    formNot:{title:'',message:'',},
    //notifiaciones genéricas
    formNotGeneric: {title:'',message:'',},
    //Tabla de projectos
    columTableProject: [],
    projects: [],
    titleTableProject: 'Programas de Crea+ disponibles: Confírmanos el programa en el que te vas a inscribir',
    reload: false,
  }),

  async created() {
    this.isLoading = true;
    await this.fillOptions(); //Opciones para p. psicológica
    await this.getVolunteer(); //Setea campos del voluntario
    await this.getSessionStorage(); //Setea semestre    
    await this.setHeadTable(); //Stea cabecera de la tabla
    var response = await consultServices('getAvailableProjects ','POST', {}); //lista proyecto disponibles
    await this.refreshVolunteerAssignemnts(); //Consulta assignemnt records y setea datos del AR
    await this.setDataTableProject(response); //Setea info de proyectos disponibles
    await this.getQuestionForAssignment();
    console.log('1 recruitmentStatusCode::::',this.recruitmentStatusCode )   
    console.log('2 competenceStatusCode::::',this.competenceStatusCode )   
    console.log('3 seniorityCode::::',this.seniorityCode )   
    console.log('4 statusCode::::',this.statusCode )    

    if(this.idProject != undefined){
      await this.getProjectData()       
      this.workshopXProject = await consultServices('getRooms','POST',{id: this.idProject, semesterCode: this.semester.id});         
      console.log('workshopXProject ', this.workshopXProject)
    }
    await this.selectedProjectChanged();
    this.isLoading=false;
   
  },

  //La página ya se ha renderizado, podemos acceder al DOM
  mounted() {
    //Muestra el form de actualizar contraseña si es necesario
    if(this.requireVolunteerSincUpdate == true){
      $('.modal-Password').modal({backdrop: 'static', keyboard: false})
    }
  },

  methods: {
    reloadPage(){
      if(this.reload == true){location.reload()}
    },
    setHeadTable(){
    this.columTableProject = [
        {label:'Nombre del programa' ,name:'nameProject' ,find:0 ,sort:0},
        {label:'Conoce más sobre el programa' ,name:'link' ,find:0 ,sort:0},
        ];
        this.titleTable = "Métodos de pago";
    },

    /**
     * onChangeTeam: Obtiene los datos del equipo seleccionado
    */
    async onChangeTeam(){
      console.log('onChangeTeam')
      let idTeam = this.assignmentForm.teamSelected
      //Limpiamos niveles inferiores
      this.assignmentForm = {role: '', teamSelected: idTeam}
      var responseProject = await consultServices('getAvailableSonProjects','POST',{id:this.idProject  , idSon:this.assignmentForm.teamSelected});
      this.loadWorkshops(responseProject)
    },

    /**
     * onChangeRole: actualiza la interfaz dependiendo del rol elegido
    */
    onChangeRole(){
      console.log('onChangeRole')
      //Limpiamos niveles inferiores
      this.availableLevel = []
      this.assignmentForm = {role: this.assignmentForm.role, teamSelected: this.assignmentForm.teamSelected}

      if(this.assignmentForm.role == 'SCHOOL_MATH'){
        document.getElementById('divWorkshopsMath') ? document.getElementById('divWorkshopsMath').style.display = "block" : null;
        document.getElementById('divWorkshopsCustom') ? document.getElementById('divWorkshopsCustom').style.display = "none" : null;

      }else if(this.assignmentForm.role == 'SCHOOL_CUSTOM'){
        document.getElementById('divWorkshopsCustom') ? document.getElementById('divWorkshopsCustom').style.display = "block" : null;
        document.getElementById('divWorkshopsMath') ? document.getElementById('divWorkshopsMath').style.display = "none" : null;
        //Además, llenamos los ciclos.
          //Limpiamos los ciclos disponibles
          var tempLevels = []
          for (var i = 0; i < this.workshopsCustom.length; i++) {
            tempLevels.push(this.workshopsCustom[i].levelCode)
          }
          var temp = new Set(tempLevels);
          this.availableLevel = [...temp];
      }else if(this.assignmentForm.role == "SCHOOL_OPERATIONS"){//operaciones
        document.getElementById('divWorkshopsCustom') ? document.getElementById('divWorkshopsCustom').style.display = "none" : null;
        document.getElementById('divWorkshops') ? document.getElementById('divWorkshops').style.display = "none" : null;
      }
    },

    /**
     * Se ejecuta cuando cambia el ciclo del paso 4
    */
    onChangeLevel(){
      //Limpiamos los talleres disponibles
      this.optionsCategory = []
      this.availableWorkshops = []
      this.availableSecondWorkshops = []
      var availables = []
      this.assignmentForm.category = undefined

      for (var i = 0; i < this.workshopsCustom.length; i++) {
        if(this.assignmentForm.level == this.workshopsCustom[i].levelCode){
          //availables.push(this.workshopsCustom[i])
          availables.push(this.workshopsCustom[i].categoryCode)
        }        
      }
      var temp = new Set(availables);
      this.optionsCategory = [...temp];
    },

    onChangeCategory(){
      //Limpiamos los talleres disponibles
      this.availableWorkshops = []
      this.availableSecondWorkshops = []
      var availables = []

      for (var i = 0; i < this.workshopsCustom.length; i++) {
        if(this.assignmentForm.category == this.workshopsCustom[i].categoryCode && this.assignmentForm.level == this.workshopsCustom[i].levelCode){
          availables.push(this.workshopsCustom[i])
        }        
      }
      var dataWorkshops = new Set(availables);
      this.availableWorkshops = [...dataWorkshops];
      this.availableSecondWorkshops = [...dataWorkshops];
    },

    onChangeWorkshop(){
      for (var i = 0; i < this.workshopsCustom.length; i++) {
        if(this.assignmentForm.workshop == this.workshopsCustom[i].contentCode){
          this.availableLevel.push(this.workshopsCustom[i])
        }
      }
    },

    onChangeGrade(){
      //Limpiamos las aulas disponibles
      this.availableClassrooms = []
      for (var i = 0; i < this.workshopsMath.length; i++) {
        if(this.assignmentForm.grade == this.workshopsMath[i].gradeCode){
          this.availableClassrooms.push(this.workshopsMath[i])
        }        
      }
    },
    /**
     * setDataTableProject: Setea los proyectos disponibles a los que se puede inscribir el creando
    */
    setDataTableProject(arrayData){
      var ctx = this;
      this.projects = [];
      arrayData.forEach(item => {
        console.log('item: ', item)
        //Verificamos si ya tiene un proceso abierto para este programa:
        var notEnrolledYet = true
        // console.log('setDataTableProject', this.assignmentRecords.length)
        _.map(this.assignmentRecords, (ar) => {
          // console.log('Verificando proyecto: ', item.id, ' contra: ', ar.School.id)
          if(ar.School.id == item.id && ar.confirmed == true){
            // console.log('Ya está inscrito en : ', item)
            notEnrolledYet = false
          }
        })
        if(notEnrolledYet == true){
          var project = {};
          project.name = item.name
          project.nameProject = item.desktopName;
          project.link=<div class="d-flex justify-content-around">
              <div> <button onClick={()=>{this.idProject = item.id;this.selectedProjectChanged()();}} class="btn btn-primary btn-xs">Ver más</button> </div>
              </div>;
          this.projects.push(project);
        }
      });
      this.refreshData();
    },

    //Funciones para refrescar data de la tabla
    refreshData() {
       if(this.$refs.tableMafProjects){
         this.$refs.tableMafProjects.formatData(this.projects);
       }
    },

    /**
     * getAttendance: Consulta las asistencias del creando a eventos tipo assesment del proyecto
    */
    async getAttendance(){
      //consultar si tiene una asistencia a un evento del tipo assessment del proyecto asociado
      console.log('getAttendance')
      var form= {}
      form.semesterCode = this.semester.id 
      form.id = this.id
      form.idProject = this.idProject
      var responseAttendance = await consultServices('getAttendanceByAssessment ','POST', form);
      if(responseAttendance){
        console.log('assessments: ', responseAttendance)
        if(!responseAttendance.message){
          _.map(responseAttendance.SchoolManagementEvents, (event) => {
            if(event.descriptionCode == 'WORKSHOP_EVENT_ASSESSMENT'){
              this.assessmentScheduled = true
              this.selectedAssesment = event
            }
          })
        }
      }
      console.log('fin getAttendance')
    },

    /**
     * Permite actualizar el assesment desde el paso 4
     */
    async updateAssement(){
      this.isLoading = true
      console.log('selectedAssesment ', this.selectedAssesment)
      console.log('selectedNewAssesment ', this.selectedNewAssesment)
      if(this.selectedNewAssesment.id ){
        var jsonATT = {}
        jsonATT.id = this.selectedAssesment.Attendances[0].id
        jsonATT.idSchoolManagementEvent = this.selectedNewAssesment.id
        console.log('form ', jsonATT)
        var responseATT = await consultServices('updateAttendance','POST',jsonATT);
        if(responseATT.message){
            this.formNotGeneric.title = 'Error reasigando fecha'
            this.formNotGeneric.message = responseATT.message          
        }else{
            this.formNotGeneric.title = 'Actualización exitosa'
            this.formNotGeneric.message = 'Se actualizó la fecha de la charla en la que participarás.'
            await this.getAttendance()
        }
      }else{
        this.formNotGeneric.title = 'Campos incompletos'
        this.formNotGeneric.message = 'Seleccione una charla para reasignar.'      
      }
      this.selectedNewAssesment = {}
      this.showNotGeneric()
      this.isLoading = false
    },

    /**
     * refreshVolunteerAssignemnts: Trae los jobs y asignaciónes del voluntario
    */
    async refreshVolunteerAssignemnts() {
      //Buscamos los volunteerJobs del voluntario, puede tener varios, pero los que importan son los ARs
      const volunteerJobs = await consultServices('getRecordVolunteerJobs', 'POST', {id:this.id, semesterCode:this.semester.id});
      // console.log("refreshVolunteerAssignemnts: ",volunteerJobs)
      var tempARs = []
      var penddingARs = []
      var confirmedARs = []
      _.map(volunteerJobs, (vj,i) => {
        //Existe el ARs
        if(vj.AssignmentRecords.length > 0){
          tempARs = tempARs.concat(vj.AssignmentRecords) 
          _.map(vj.AssignmentRecords,(ar) =>{
            if(ar.confirmed == false){
              penddingARs = penddingARs.concat(ar) 
            }else{
              confirmedARs = confirmedARs.concat(ar)
            }
          })
        }
      })
      this.assignmentRecords = tempARs
      this.penddingAssignmentRecords = penddingARs
      this.confirmedAssignmentRecords = confirmedARs
    },

    /**
     * getProjectData: 
     * 1. Consulta un proyecto específico con id = this.idProject
     * 2. Consulta los eventos tipo assessment del proyecto
     * 3. Setea la descripción de ev. de competencias y su deadline
    */
    async getProjectData(){
      console.log('getProjectData ', this.idProject )

      var responseProject = await consultServices('getProject ','POST', {id:this.idProject  }) 
      this.dataProject = _.cloneDeep(responseProject);  
      this.projectType = this.dataProject.projectType

      if(this.dataProject.message){
        // this.formNot.title = 'Hubo un problema'
        // this.formNot.message = this.dataProject.message
        // $('.modal-notification').modal('show');
        //Ocultar pasos, mostrar tabla
        document.getElementById('divSteps') ? document.getElementById('divSteps').style.display = "none" : null;
        document.getElementById('divTableProject') ? document.getElementById('divTableProject').style.display = "block" : null;
      }else{
        //setear arreglo de eventos tipo assessment
        var responseEvents = await consultServices('getSchoolEvents','POST',{id: this.idProject , semesterCode:this.semester.id,public: true});
        if(responseEvents){
          this.eventsByProject = _.cloneDeep(responseEvents.SchoolManagementEvents); 
          var arrayAux = []      
          if(this.eventsByProject){
            for (var j = 0; j < this.eventsByProject.length; j++) {
              if(this.eventsByProject[j].SchoolManagementEventType.descriptionCod == 'WORKSHOP_EVENT_ASSESSMENT'){
                arrayAux.push(this.eventsByProject[j])
              }        
            }
          }  
          this.assessmentEvents = _.cloneDeep(arrayAux); 
        }
        
        //Colocamos valores de prueba de competencias:
        this.taskDescription = responseProject.taskDescription
        const d = new Date(responseProject.taskDeadline);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        this.taskDeadline = `${da}/${mo}/${ye}`

        this.updateToCurrentStep();
      }
    },

    formattDate(temp){
      console.log('formattDate ', temp)
      temp = moment(temp).utcOffset('-0500').toDate();
      console.log('formattDate ', temp)
      const d = new Date(temp);
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${da}/${mo}/${ye}`
    },

    /**
     * startTest: Esta función actualiza el género y la fecha de nacimiento para abrir la prueba Psicológica.
    */
    async startTest(){
      if(this.volunteerTest.genderCode == null || this.volunteerTest.birthdate == null || this.volunteerTest.genderCode == '' || this.volunteerTest.birthdate == ''  ){
          this.formNotGeneric.title = 'Campos incompletos'
          this.formNotGeneric.message = 'Debe completar todos los campos para inicar la prueba.'
          this.showNotGeneric()
      }else{
        this.isLoading = true
        var form= {}
        form.birthday = moment( this.volunteerTest.birthdate).format('YYYY/MM/DD'); //this.volunteerTest.birthdate
        form.genderCode = this.volunteerTest.genderCode=='Masculino' ? form.genderCode='M' : form.genderCode='F'  //this.volunteerTest.genderCode
        form.documentNumber = this.documentNumber
        var response = await consultServices('updateVolunteer ','POST', form);  
        if(!response.message){
          this.showTest = true
        }else{
          this.formNotGeneric.title = 'Error actualizando campos'
          this.formNotGeneric.message = 'No se pudo actualizar los datos del usuario.'
          this.showNotGeneric()
          this.showTest = false
        }
        this.isLoading = false
      }
    },

    async updateToCurrentStep(){
      console.log('updateToCurrentStep')
      this.isLoading = false
      //Paso 1: confirmar proyecto
      if(this.nowStep == 1){
        if(this.dataProject != null){
          console.log('dataproject ', this.dataProject)
          this.projectName = this.dataProject.desktopName
          this.projectDescription = this.dataProject.desktopDescription
          this.dataProject.desktopUrl != null || this.dataProject.desktopUrl != '' ? this.urlVideo = this.dataProject.desktopUrl : this.urlVideo = 'no hay video'          
          document.getElementById('step1Video') ? document.getElementById('step1Video').src = this.urlVideo : null;
        }      
      }
      //Paso 2: evaluación de competencias
      if(this.nowStep == 2){
        await this.refreshVolunteerAssignemnts()
        if((this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE') || (this.testFilled)){
          this.nowStep == 4
        }
      }
      //Paso 3 eva psico
      if(this.nowStep == 3){
        await this.refreshVolunteerAssignemnts()
        await this.getQuestionForAssignment()
        if(this.volunteerTest.genderCode == null || this.volunteerTest.birthdate == null || this.volunteerTest.genderCode == '' || this.volunteerTest.birthdate == ''){
          this.showTest = false
        }else{
          this.showTest = true
        }
      }   
      //Paso 4 
      if(this.nowStep == 4){
        //Obtener talleres por equipos y los registrados a los talleres
        var responseProject = await consultServices('getAvailableSonProjects','POST',{id:this.idProject  , semesterCode:this.semester.id});//this.idProject 
        this.loadWorkshops(responseProject)
      }
      this.isLoading = false
    },

    async loadWorkshops(responseProject){
      console.log('loadworkshop')
        this.workshopsMath = []
        this.workshopsCustom = []
        var categoryCodes = []
        var gradeCodes = []

        if(responseProject.message){
          console.log('entró al if')
          document.getElementById('divMessage') ? document.getElementById('divMessage').style.display = "block" : null;
          document.getElementById('divRoles') ? document.getElementById('divRoles').style.display = "none" : null;
          document.getElementById('divWorkshopsCustom') ? document.getElementById('divWorkshopsCustom').style.display = "none" : null;
          document.getElementById('divWorkshopsMath') ? document.getElementById('divWorkshopsMath').style.display = "none" : null;
          console.log('no hay workshops')
        }else{
          console.log('response project else ::::::::::::::::',responseProject.workshopConfiguration )
            if(responseProject.workshopConfiguration){
                if(responseProject.workshopConfiguration.workshopsCustom){
                  var categories=[]
                  for (var x = 0; x < responseProject.workshopConfiguration.workshopsCustom.length; x++) {  
                    categories.push(responseProject.workshopConfiguration.workshopsCustom[x].categoryCode)        
                  }
                  const uniCat = [... new Set(categories)];   
                  this.optionsCategory = _.cloneDeep(uniCat)
                  this.workshopsCustom = _.cloneDeep(responseProject.workshopConfiguration.workshopsCustom)
                }
                if(responseProject.workshopConfiguration.workshopsMath){
                  console.log('Tiene divertimate')
                  var grades =[]
                  for (var y = 0; y < responseProject.workshopConfiguration.workshopsMath.length; y++) {                
                      grades.push(responseProject.workshopConfiguration.workshopsMath[y].gradeCode)           
                  }
                  console.log('Tiene grados: ', grades)
                  const uniGra = [... new Set(grades)];    
                  this.optionsGrade = _.cloneDeep(uniGra)
                  this.workshopsMath = _.cloneDeep(responseProject.workshopConfiguration.workshopsMath) 
                }
            }          
        }

      console.log('optionsCategory 10', this.optionsCategory )
      console.log('workshopsCustom ', this.workshopsCustom )
      console.log('optionsGrade 10', this.optionsGrade)
      console.log('workshopsMath ', this.workshopsMath)

    },


    async saveDataAnswer(value, id, i){
      this.isLoading = true
      var form = {}
      form.idQuestion = id
      form.numValue = value
      form.idAssignmentRecord =  this.idAssignmentRecord
      if(this.questionArray[i].Answers.length == 0){
        console.log('no hay respuesta , crear')
        var responseNewAnswer = await consultServices('createAnswer ','POST', form)
      }else{  
        console.log('ya hay respuesta actualizar')
        var length = this.questionArray[i].Answers.length
        form.idAnswer = this.questionArray[i].Answers[length-1].id
        var responseUpdateAnswer = await consultServices('updateAnswer ','POST', form)
      }
      await this.getQuestionForAssignment()
      this.isLoading = false
    },

    async getQuestionForAssignment(){
      console.log('getQuestionForAssignment ' , this.idAssignmentRecord )
        var questions = await consultServices('getQuestions ','POST', {idAssignmentRecord: this.idAssignmentRecord})

        for (let index = 0; index < questions.length; index++) {               
           if(questions[index].Answers.length > 0){
             var length =  questions[index].Answers.length
             questions[index].checkedValue = questions[index].Answers[length-1].numValue
           } else{
             questions[index].checkedValue = null
           }              
        }
        
        this.questionArray = []
        this.questionArray = _.cloneDeep(questions)
    },

    /**
    showNotificacion: Muestra el popUp de advertencia dependiendo el paso
    */
    async showNotificacion(){
      if(this.nowStep == 1){
        this.formNot.title = 'Confirmar participación'
        this.formNot.message = '¿Seguro que deseas inscribirte a este proyecto?'
      }
      if(this.nowStep == 2){
        this.formNot.title = 'Enviar evaluación'
        this.formNot.message = '¿Seguro que deseas terminar la evaluación?'
      }
      if(this.nowStep == 3){
        this.formNot.title = 'Enviar prueba'
        this.formNot.message = '¿Seguro que deseas terminar la prueba?'
      }
      if(this.nowStep == 4){
        this.formNot.title = 'Paso 4: Confirmar datos'
        this.formNot.message = '¿Confirmar tus datos?'      
      }
      $('.modal-notification').modal('show');
    },  

    showNotGeneric(){
      $('.modal-notification-generic').modal('show');
    },

    /**
     * linkVolunteerSinc: Pide al usuario actualizar su contraseña, será sincronizado
    */
    async linkVolunteerSinc(){
        this.isLoading = true;
        if(this.password && this.confirmPassword){
          if(this.password == this.confirmPassword){
            var form = { id : this.documentNumber,
                         password : this.password}
            const response = await consultServices('linkVolunteerSinc','POST', form);
            if(response.requireVolunteerSincUpdate == false){
              this.requireVolunteerSincUpdate == response.requireVolunteerSincUpdate
              alert(response.message)
              $('.modal-Password').modal('hide')
            }else{
              alert("Error al actualizar contraseña")
            }
          }
          else{
            alert("Las contraseñas no coinciden")
          }
        }
        else{
          alert("Ingrese la contraseña")
        }
        this.isLoading = false;
    },
    async fillOptions(){
      ///nivel de conocimiento
      this.levelsKnowledge = [];
      this.levelsKnowledge = await this.getValues('(principiante)','(nivel profesional)');
      //Cambio en el Peru
      this.levelsBeliefChangePeru = [];
      this.levelsBeliefChangePeru = await this.getValues('(creo que no es posible)','(es totalmente posible)');
      //Nivel de cumplimiento del sueño
      this.levelsDreamFulfillment = [];
      this.levelsDreamFulfillment = await this.getValues('(no estoy persiguiendo mi sueño)','(estoy viviendo/logrando mi sueño al 100%)');
    },
    getValues(vMin, vMax){
      return [
        {id:1,value:'1' + ' ' + vMin},
        {id:2,value:'2'},
        {id:3,value:'3'},
        {id:4,value:'4'},
        {id:5,value:'5'},
        {id:6,value:'6'},
        {id:7,value:'7'},
        {id:8,value:'8'},
        {id:9,value:'9'},
        {id:10,value:'10' + ' ' + vMax}
      ]
    },

    /**
     * getSessionStorage: Obtiene/setea valores de SessionStorage
    */
    async getSessionStorage(){
      this.isLoading = true;
      //validar si existen los atributos en sessionStorage
      //si no existen y son masterValues, agregar idMaster a ids
      var ids = [] ;
      var flagLevels = false;
      var flagContentWorkshop = false;
      var flagWorkshopCategories = false;
      var flagGrades = false;

      if(!window.sessionStorage.levels){
        ids.push(10);
        flagLevels = true;
      }
      if(!window.sessionStorage.contentWorkshop){
        ids.push(13);
        flagContentWorkshop = true;
      }
      if(!window.sessionStorage.semester){
        const response =  await consultServices('getCurrentSemester','POST', {});
        this.semester =  response ;
        window.sessionStorage.semester  = JSON.stringify(this.semester);
      }
      if(!window.sessionStorage.workshopCategories){
        ids.push(17);
        flagWorkshopCategories = true;
      }
      if(!window.sessionStorage.grades){
        ids.push(11);
        flagGrades = true;
      }
      //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
      this.optionsRoles=[]
      var responseJobs =  await  consultServices('getJobs','POST',{category:'JUNIOR'});
      for (var k = 0; k < responseJobs.length; k++) {
            if(responseJobs[k].code != 'SCHOOL_PARTICIPANT'){
              this.optionsRoles.push(responseJobs[k])
            }
      }    

      // if(!window.sessionStorage.schoolsBus){
      //   this.schoolsBus=await  consultServices('getSchoolBus','POST',{});;
      //   window.sessionStorage.schoolsBus  = JSON.stringify(this.schoolsBus);
      // }
      
      ids= [10,11,12,13,14,17]
      if( ids.length > 0){
        //Hacer consulta única de masterValues
        var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
        this.allMasterValues = arrayMasters
        //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
        if(flagLevels == true){
            this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
            window.sessionStorage.levels  = JSON.stringify(this.levels);
        }
        if(flagContentWorkshop == true){
            this.contentWorkshop = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
            window.sessionStorage.contentWorkshop  = JSON.stringify(this.contentWorkshop);
        }
        if(flagWorkshopCategories == true){
            this.workshopCategories = _.filter(arrayMasters, function(master) {return master.idMaster == 17; })
            window.sessionStorage.workshopCategories  = JSON.stringify(this.workshopCategories);
        }
        if(flagGrades == true){
            this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
            window.sessionStorage.grades  = JSON.stringify(this.grades);
        }
      }

      if(this.formPersonalInformation.region){
        await this.getProvinces();
      //Consultamos si existe distrito para el voluntario
      if(this.formPersonalInformation.province){
        await this.getDistricts();
      }
    }

    this.levels = JSON.parse( window.sessionStorage.levels );
    this.semester = JSON.parse( window.sessionStorage.semester );
    // this.schoolsBus = JSON.parse( window.sessionStorage.schoolsBus );
    this.workshopCategories = JSON.parse( window.sessionStorage.workshopCategories );
    this.contentWorkshop = JSON.parse( window.sessionStorage.contentWorkshop );
    this.grades = JSON.parse( window.sessionStorage.grades );

    this.isLoading = false;
    },

    async getProvinces(){
      this.isLoading = true;
      let json = {idRegion: this.formPersonalInformation.region};
      const response = await consultServices('getProvincesByRegion','POST', json);
      this.provinces = response;
      this.isLoading = false;
    },
    async getDistricts(){
      this.isLoading = true;
      let json = {idProvince: this.formPersonalInformation.province};
      const response = await consultServices('getDistrictsByProvince','POST', json);
      this.districts = response;
      this.isLoading = false;
    },
    /**
     * getVolunteer: Consulta la última data del voluntario
    */
    async getVolunteer() {
      console.log('getVolunteer')
      this.isLoading = true;
      const response = await consultServices('getvolunteer','POST',{id: this.documentNumber}); //ORIGINAL
      // const response = await consultServices('getvolunteer','POST',{id: '46038320'}); //INVESTIGACIÓN
      console.log('getVolunteer response', response)
      this.recruitmentStatusCode = response.recruitmentStatusCode;
      this.seniorityCode = response.seniorityCode;
      this.statusCode = response.statusCode;
      this.idVolunteer = response.id;
      this.testFilled = response.testFilled;
      this.taskUrl = response.taskUrl;
      this.competenceStatusCode = response.competenceStatusCode;
      if(response.genderCode != null){
        response.genderCode == 'M' ? this.volunteerTest.genderCode ='Masculino' : this.volunteerTest.genderCode = 'Femenino'
      }      
      response.birthdate != null ? this.volunteerTest.birthdate = response.birthdate : this.volunteerTest.birthdate = null
      
      // console.log('response ',response)
      this.name = (response.name!=null?response.name:"") + (response.lastName!=null?" " + response.lastName:"") + (response.secondLastName!=null?" "+response.secondLastName:"");
      this.shortName = response.name
      this.formPersonalInformation = _.cloneDeep(response);
      this.isLoading = false;
      //asignar valor a deadlineDate
      if(response.deadlineDate != null || response.deadlineDate != undefined){
        // console.log('response DEADLINE',response.deadlineDate)
        var date1= moment(new Date()).format("YYYY-MM-DD")
        var date2 = moment(response.deadlineDate);
        var diff = date2.diff(date1, 'days')
        if(diff < 0){
          this.deadlineTimeFlag = false;
          this.participationFlag = false;
        }else{
          this.deadlineTimeFlag = true;
          this.participationFlag = true;
        }
        // console.log('Se debe mostrar el formulario de confimacion', this.deadlineTimeFlag);
      }
    },

    /**
     * confirmParticipation: Se asocia el particopante al proyecto
    */
    async confirmParticipation(){
      console.log('confirmParticipation')
      //Acá se asociará el voluntario al proyecto.
      this.isLoading = true      
      var temp = await consultServices('enrollToProject','POST', {id: this.idVolunteer, idProject: this.idProject, semesterCode:this.semester.id })
      if(temp.message){
        // Ocurrió un error, notificar
      }else{
        //Vemos si está renovando o NO
        if((this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE') //Apto para TODO 
        || (this.projectType == 'VOLUNTEER_PROJECT' && this.competenceStatusCode == 'COMPETENCE_VOLUNTEER_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE')){ //Apto para voluntariado y el proyecto es de voluntariado
          //Estamos en una renovación, vamos al paso 4
          this.nowStep = 4 //No requiere evaluación de competencias, ni psico, pasar a paso 4
          this.onChangeTeam()
        }else{
          //Sino, somos nuevos y vamos por el camino regular
          this.nowStep = 2
          this.updateToCurrentStep()
        }
      }
      this.isLoading = false
    },

    /**
     * finishTest: Finaliza la prueba psicológica se haya llenado o pasado por ser apto.
    */
    async finishTest(){
      var answersSum = _.filter(this.questionArray,(q) => {
        return q.Answers.length > 0
      })  
      // if(answersSum.length < this.questionArray.length){
      //   this.formNotGeneric.title = 'Prueba incompleta'
      //   this.formNotGeneric.message =  'Has contestado '+answersSum.length+ ' de '+ this.questionArray.length+ ', por favor contesta todas las preguntas para enviar tu prueba.'
      //   this.showNotGeneric()
      // }else{
        this.isLoading = true
        var temp = await consultServices('fillTest','POST', {id: this.idVolunteer, idAssignmentRecord: this.idAssignmentRecord })
        if(temp.message){
          // Ocurrió un error, notificar
        }else{
          this.nowStep = 4
          this.updateToCurrentStep()
        }
        this.isLoading = false
      //}
    },
    async goToStep4(){
        this.isLoading = true
        var temp = await consultServices('fillTest','POST', {id: this.idVolunteer, idAssignmentRecord: this.idAssignmentRecord })
        if(temp.message){
          // Ocurrió un error, notificar
        }else{
          this.nowStep = 4
          this.updateToCurrentStep()
        }
        this.isLoading = false
    },

    /**
     * sendCompetenceTest: Permite enviar el link del video o agendar la fecha de assessment, según el tipo de proyecto
    */ 
    async sendCompetenceTest(){
      this.isLoading = true
      if(this.projectType == 'ACADEMIC_PROJECT'){
        if(this.formPersonalInformation.taskUrl == null || this.formPersonalInformation.taskUrl == '' ){
          this.formNotGeneric.title = 'Campos incompletos'
          this.formNotGeneric.message =  'Debes completar los campos para terminar la evaluación'
          this.showNotGeneric()
        }else{
          var formUpdate = _.cloneDeep(this.formPersonalInformation);
          console.log('formUpdate :::::::::::::', formUpdate)
          const response = await consultServices('updateAllVolunteer','POST',formUpdate);
            if(response.message){
              this.formNotGeneric.title = 'Ocurrió un error'
              this.formNotGeneric.message = response.message
              this.showNotGeneric() 
            }else{
                this.nowStep = 3
                this.updateToCurrentStep()
            }
        }
      }else{ // Es proyecto de voluntariado
        //Aquí crearemos la asistencia para el evento elegido
        if(!this.selectedAssesment.startDate){ // Proyecto elegido
          this.formNotGeneric.title = 'Campos incompletos'
          this.formNotGeneric.message =  'Debes elegir una fecha antes de continuar'
          this.showNotGeneric()
        }else{
          var assessment = _.cloneDeep(this.selectedAssesment);
          var temp = {}
          temp['id'] = this.formPersonalInformation.id //se usa el id del voluntario
          temp['idSchoolManagementEvent'] = assessment.id
          const response = await consultServices('createNewAttendance','POST',temp);
          if(response.message){
            this.formNotGeneric.title = 'Ocurrió un error'
            this.formNotGeneric.message = response.message
            this.showNotGeneric() 
          }else{
            await this.getAttendance()
            this.nowStep = 3
            this.updateToCurrentStep()
          }
        }
      }
      consultServices('generateEnrollmentEvaluation','POST', {id: this.idVolunteer, idAssignmentRecord: this.idAssignmentRecord })
      this.isLoading = false
    },

    /**
     * confirmData: Se ejecuta al presionar el botón "Confirmar datos" (paso 4)
    */
    async confirmData(){
      // console.log('fin de paso 4')
      this.isLoading = true
      //validar todos los campos completos
      if(this.formPersonalInformation.alias == ''||this.formPersonalInformation.alias == null||
          this.formPersonalInformation.address == ''||this.formPersonalInformation.address == null||
          this.formPersonalInformation.phone == ''||this.formPersonalInformation.phone == null||
          this.formPersonalInformation.collegeName == ''||this.formPersonalInformation.collegeName == null||
          this.formPersonalInformation.careerName == '' || this.formPersonalInformation.careerName == null ||
          this.formPersonalInformation.organizationName == '' || this.formPersonalInformation.organizationName == null ||
          this.formPersonalInformation.organizationJob == '' || this.formPersonalInformation.organizationJob == null ||
          this.formPersonalInformation.dream == '' || this.formPersonalInformation.dream == null ||
          this.formPersonalInformation.dreamAccomplishment == '' || this.formPersonalInformation.dreamAccomplishment == null ||
          this.formPersonalInformation.improvementExpectation == '' || this.formPersonalInformation.improvementExpectation == null ) 
      {
          this.formNotGeneric.title = 'Campos incompletos'
          this.formNotGeneric.message = 'Debe completar todos los campos confirmar sus datos.'
          this.showNotGeneric()         
      }else{
          var form0 = _.cloneDeep(this.formPersonalInformation);    
          form0.statusCode = 'VOLUNTEER_ACTIVE'
          form0.birthdate = undefined
          console.log('Vamos a enviar: ', form0)
          
          const response = await consultServices('updateAllVolunteer','POST',form0);
          if(response.message){
            this.formNotGeneric.title = 'Hubo un problema'
            this.formNotGeneric.message = response.message
            this.showNotGeneric() 
          }else{
            await this.assignVolunteer()
          }          
      }
      this.isLoading = false

    },

    /**
     * assignVolunteer: Finaliza el proceso de inscripción de un voluntario
    */
    async assignVolunteer(){
      console.log('assignVolunteer: ')
      //sección para registrar participación a taller
      var showNot = false

      //Validar los campos obligatorios para cada tipo de taller
      if(this.assignmentForm.role == 'SCHOOL_MATH'){
        if(this.assignmentForm.grade && this.assignmentForm.classroomCode ){
          this.assignmentForm.idWorkshop = this.assignmentForm.classroomCode.idWorkshop 
          this.assignmentForm.idSchool = this.assignmentForm.classroomCode.idSchool
        }else{
          showNot = true      
        }
      }else if(this.assignmentForm.role == 'SCHOOL_CUSTOM'){
        if(this.assignmentForm.category && this.assignmentForm.level && this.assignmentForm.workshop ){
          this.assignmentForm.idWorkshop = this.assignmentForm.workshop.idWorkshop 
          this.assignmentForm.idSchool = this.assignmentForm.workshop.idSchool
        }else{
          showNot = true
        } 
      }else if(this.assignmentForm.role == ""){
        showNot = true
      }

      if(showNot == true){
         this.formNotGeneric.title = 'Campos incompletos'
         this.formNotGeneric.message = 'Todos los campos son obligatorios.'
         this.showNotGeneric() 
      }else{
        //Actualizar assignment_record con el workshop seleccionado
        var idSchool = this.assignmentForm.idSchool
        var idWorkshop = this.assignmentForm.idWorkshop
        var idAssignmentRecord = this.idAssignmentRecord
        var idVolunteerJob = this.idVolunteerJob
        var idVolunteer = this.idVolunteer
        var job =  _.find(this.optionsRoles, (item) => { return item.code == this.assignmentForm.role });
        var idJob = job.id
        var typeCode = this.assignmentForm.role == 'SCHOOL_CUSTOM' ? 'WORKSHOP_CUSTOM' : 'WORKSHOP_MATH'
        var body = {}
        body.typeCode = typeCode
        body.idJob = idJob
        body.id = idVolunteer
        body.idVolunteerJob = idVolunteerJob
        body.idAssignmentRecord = idAssignmentRecord
        body.idWorkshop = idWorkshop
        // body.idSchool = idSchool
        //valores si es un taller custom
        this.assignmentForm.level ? body.levelCode = this.assignmentForm.level :null
        this.assignmentForm.workshop ? body.contentCode = this.assignmentForm.workshop.contentCode :null
        this.assignmentForm.category ? body.categoryCode = this.assignmentForm.category :null
        //Segunda opcion taller custom
        this.assignmentForm.requestedSecondContentCode ? body.requestedSecondContentCode = this.assignmentForm.requestedSecondContentCode :null        
        //valores si es un taller divertimate
        this.assignmentForm.classroomCode ? body.classroomCode = this.assignmentForm.classroomCode.classroomCode : null
        this.assignmentForm.grade ? body.gradeCode = this.assignmentForm.grade :null
        body.idFatherProject = this.idProject
        body.semesterCode = this.semester.id
        
        //Si tenemos un equipo seleccionado, enviamos la capacidad y el id
        
        if(this.assignmentForm.teamSelected){
          console.log('SE ELIGIÓ EL EQUIPO: ', this.assignmentForm.teamSelected)
          var teamId = this.assignmentForm.teamSelected
          let selectedTeam = _.find(this.dataProject.Children, function(team) {
                              //return team.id == this.assignmentForm.teamSelected;
                              return team.id == teamId;
                            });
          selectedTeam.capacity ? body.quota = selectedTeam.capacity : body.quota = this.dataProject.capacity          
          body.selectedTeam = this.assignmentForm.teamSelected
          
        }
        
        console.log('body a enviar: ', body)
        const response = await consultServices('finishVolunteerEnrollment','POST',body);
        if(response.message){
          this.formNotGeneric.title = 'Hubo un problema'
          this.formNotGeneric.message = response.message
          this.showNotGeneric() 
        }else{
          this.formNotGeneric.title = 'Asiganción exitosa'
          this.formNotGeneric.message = '¡Tu participación está confirmada!'
          this.reload = true
          this.showNotGeneric() 
        }          
      }
    },

    getDisplayValue(string){
        var display=''
        for (let index = 0; index < this.allMasterValues.length; index++) {
                if(this.allMasterValues[index].code == string){
                    display=this.allMasterValues[index].displayValue;
                }
        }
        return display;
    },

    /**
     * selectedProjectChanged: Reacciona al cambio de proceso de inscripción en el combo
     * 1. Obtiene los datos actualizados del proyecto elegido
     * 2. Setea las variables del proyecto elegido
    */
    async selectedProjectChanged(){
      this.isLoading = true;
      console.log('selectedProjectChanged ', this.idProject)
      //Si tiene idProject
      if(this.idProject != undefined){
        //Consultamos el proyecto
        await this.getProjectData()
        //Verificamos si se debe eliminar pasos del medio:
        console.log('1 recruitmentStatusCode::::',this.recruitmentStatusCode )   
        console.log('2 competenceStatusCode::::',this.competenceStatusCode )   
        console.log('3 seniorityCode::::',this.seniorityCode )   
        console.log('4 statusCode::::',this.statusCode )    

        if(this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE' 
        && ((this.projectType == 'ACADEMIC_PROJECT' && this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE') 
        || (this.projectType == 'VOLUNTEER_PROJECT' && (this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' || this.competenceStatusCode == 'COMPETENCE_VOLUNTEER_SUITABLE') )) 
        && this.statusCode != 'VOLUNTEER_PENALIZED' && this.statusCode != 'VOLUNTEER_SEPARATED'
        ){
          this.stepsHidden = true
          this.stepList = ['Confirma tu Programa', 'Ver resultados']
        }else{
          this.stepsHidden = false
          this.stepList = ['Confirma tu Programa','Evaluación de Competencias', 'Prueba Psicológica', 'Ver resultados']
        }
        //Seteamos variables de proceso de inscripción DEL proyecto
        _.map(this.assignmentRecords, async (ar) => {
          //Encontramos el proyecto elegido, vamos a setear los valores importantes
          if(ar.School.id == this.idProject){
            //Al menos está en paso 2
            this.isEnrolled = true
            this.idAssignmentRecord = ar.id;
            this.idVolunteerJob = ar.idVolunteerJob
            // await this.getProjectData()
            //ponemos el paso correcto
            var step = 1   

            if(this.isEnrolled){ //si está registrado en un proyecto por lo menos irá a paso 2
              step = 2;
              if((this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE') //Apto para TODO 
                || (this.projectType == 'VOLUNTEER_PROJECT' && this.competenceStatusCode == 'COMPETENCE_VOLUNTEER_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE')){ //Apto para voluntariado y el proyecto es de voluntariado
                  step = 4 //No requiere evaluación de competencias, ni psico, pasar a paso 4
                  this.onChangeTeam()
                }else{
                  await this.getAttendance()
                  if((this.projectType == 'VOLUNTEER_PROJECT' && this.assessmentScheduled == true ) ||(this.projectType == 'ACADEMIC_PROJECT' && this.taskUrl )){ 
                    //Si Proyecto de tipo Voluntario y asistencia registrada a assessment listo ó es Proyecto de tipo Académico y ha enviado su link de video-> pasar a paso 3
                    step = 3
                    if((this.testFilled == true) || 
                      (this.competenceStatusCode == 'COMPETENCE_ACADEMIC_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE') //Apto para TODO 
                    || (this.projectType == 'VOLUNTEER_PROJECT' && this.competenceStatusCode == 'COMPETENCE_VOLUNTEER_SUITABLE' && this.recruitmentStatusCode == 'VOLUNTEER_SUITABLE')){ //Apto para voluntariado y el proyecto es de voluntariado
                      step = 4 //No requiere evaluación de competencias, ni psico, pasar a paso 4
                      this.onChangeTeam()
                    }
                  }
                }
            }
            console.log('Vamos a colocar step: ', step)
            this.nowStep = step
            if(this.nowStep == 3){
              if(this.volunteerTest.genderCode == null || this.volunteerTest.birthdate == null || this.volunteerTest.genderCode == '' || this.volunteerTest.birthdate == ''){
                this.showTest = false
              }else{
                this.showTest = true
              }
            }
          }
        })
      }else{
        //No hay proyecto, colocamos todas las variables con sus valores iniciales
        this.isEnrolled = false
        this.idAssignmentRecord = ''
        this.idVolunteerJob = ''
        this.nowStep = 1
        this.showTest = false
        this.testFilled = false
      }
      this.isLoading = false;
    }
  }
}
</script>



