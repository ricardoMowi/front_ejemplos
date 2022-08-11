<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="card">
      <div class="card-header">
        <h2>{{message.title}}</h2>
        <div class="clearfix"></div>
      </div>
      <!--Modal Password-->
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
      <!--Modal Password-->
      <div class="card-body">
        <!--Activo-->
        <div class="card">
          <div>
            <h2>Intranet Crea+</h2>
            <hr lass="my-4"/>
          </div>
          <img src="/LogoCrea.png" class="rounded mx-auto d-block" height="200" width="200">
          <div v-if="statusCode=='VOLUNTEER_ACTIVE'" class="card-body">
            <h2>¡Hola {{name}}! Te damos la bienvenida</h2>
            <hr lass="my-4"/>
            <p class="lead">
              <small>Aquí encontrarás información para tu día a día en Crea+. Accede a todas las opciones disponibles en el menú izquierdo.<br/>
              Recuerda siempre mantener actualizado tu <a href="/dashboard/perfilCreando">perfil</a>.</small>
            </p>
          </div>
        <!--Inactivo-->
          <div v-else-if="statusCode=='VOLUNTEER_INACTIVE' && (seniorityCode=='VOLUNTEER_SENIOR' || seniorityCode=='VOLUNTEER_ALUMNI')" class="card-body">
            <h2>¡Hola {{name}}! Te damos la bienvenida</h2>
            <hr lass="my-4"/>
            <!-- <div v-if="deadlineTimeFlag == false && nowStep != 3">
              <p class="lead">
                <small>Estamos muy contentos por este semestre y la gran muestra de solidaridad mostrada.</small><br/>
                <small>En caso conozcas a alguien interesado(a) en ingresar a Crea+ anímalo(a) a que pueda unirse a nosotros en las siguientes charlas informativas para las siguientes intervenciones.</small><br/>
                <small>¡Gracias a personas como tú nuestro país crecerá positivamente!.</small><br/><br/><br/>
                <small>Saludos</small><br/><br/>
                <small style="color:gray"><strong>Crea+</strong></small><br/>
                <small>impacto@creamas.org</small>
              </p>
            </div> -->
          </div>
        <!--Default-->
            <div v-else class="card-body">
              <h2>¡Hola {{name}}! Te damos la bienvenida</h2>
              <hr lass="my-4"/>
              <p class="lead">
                <small>Muchas gracias por mostrar interés en ser parte de Crea+ y las ganas de compartir tu talento.</small>
              </p>
            </div>
        </div>
        <!--|||||||||||||||||||||||||||||||-->
        <div v-if="showSteps">
          <h5>Tu proceso de inscripción</h5>
          <div>
            <vue-step :now-step="nowStep" :style-type="style" :step-list="stepList"></vue-step>
          </div>
        </div>
        <!--|||||||||||||||||||||||||||||||-->
        <div class="card" v-if="showSelectEvent">
          <div class="card">
            <div class="card-header">
              <h2>{{message.message}}</h2>
              <div class="clearfix"></div>
            </div>
            <div class="card-body" v-if="events.length!=0">
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar charla:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <select class="form-control" v-model="event" @change="getTurn">
                      <option disabled value="0">Por favor seleccione lugar</option>
                      <option v-for="event in events" :value="event"> {{event.LocaleRoom.Locale.name}} - {{event.LocaleRoom.name}} - {{getDay(event.startDate)}} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Direccion:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <input readonly type="text" v-model="address" class="form-control col-md-12 col-xs-12">
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <input readonly type="text" v-model="date" class="form-control col-md-12 col-xs-12">
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar turno:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <select class="form-control" v-model="idEventTurn">
                      <option v-for="(turn, index) in turns" :value="turn.id"> Turno {{index + 1}} - {{turn.startHour}} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" @click="addParticipant()" class="btn btn-primary"> Inscribirme </button>
              </div>
            </div>
            <!--card-body-->
            <div class="card-body" v-if="events.length==0">
              <div class="card-header">
                <h5>{{message.noEventos}}</h5>
                <div class="clearfix"></div>
              </div>
              <div class="card-body">
                <h3>Próximamente abriremos charlas, estate atento a nuestras redes.</h3>
              </div>
            </div>
            <!--card-body-->
          </div>
          <!--card-->
        </div>
        <!--|||||||||||||||||||||||||||||||-->
        <div class="card" v-if="showEventSummary == true">
          <div class="card-body">
            <div class="card-header">
              <h2>{{message.message}}</h2>
              <div class="clearfix"></div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataEvent.address">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Espacio:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataEvent.room">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataEvent.date">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--|||||||||||||||||||||||||||||||-->
        <div class="card" v-if="showWelcomeSummary == true">
          <div class="card-body">
            <div class="card-header">
              <h2>Información sobre la bienvenida</h2>
              <div class="clearfix"></div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataWelcome.address">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataWelcome.date">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Hora:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataWelcome.hour">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--|||||||||||||||||||||||||||||||-->
        <div class="card" v-if="showCapacitationSummary">
          <div class="card-body">
            <div class="card-header">
              <h2>Información sobre la capacitatión</h2>
              <div class="clearfix"></div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataCapacitation.address">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataCapacitation.date">
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Hora:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input readonly type="text" id="name" class="form-control" v-model="dataCapacitation.hour">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--|||||||||||||||||||||||||||||||-->
          <div class="card-body"  v-if="showNoEvent == true">
              <div class="card-header">
                    <h2 style="width: auto;">{{noEvent}}</h2>
                    <div class="clearfix"></div>
              </div>
          </div>
        <!--|||||||||||||||||||||||||||||||-->

        <div v-if="deadlineTimeFlag == false && seniorityCode == 'VOLUNTEER_SENIOR'">
          <div class="card-body"  >

                <div class="card-header">
                  <h2>La renovación de participación no está habilitada</h2>
                  <div class="clearfix"></div>
                </div>
          </div>
        </div>
        <div v-if="deadlineTimeFlag == true ">
            <div class="card-body"  v-if="flagParticipationFieldsShown == false">
              <!-- original
                <div v-if="deadlineTimeFlag == true && nowStep == 3"> 
                  <div class="card-body"  v-if="showSelectSchool && flagParticipationFieldsShown == false"> 
                  -->
              <!-- Actualización importante:
                Se colocó en duro: 
                Título: Renueva tu compromiso este 2020-II
                mensaje: Hola Creando, Estamos muy felices de saludarte nuevamente, te damos la bienvenida a la intranet. 
                          Queremos agradecerte por el compromiso y profesionalismo demostrado como Creando Docente el semestre en que participaste.
                          Este 2020 estamos llevando el programa de manera digital, en el cual estamos reinventándonos para seguir impactando positivamente en la vida de nuestros niños. 
                          Y nos gustaría hacerlo posible de la mano contigo, te invitamos a renovar tu compromiso este 2020-II. Confirma tu participación hasta: 15 de setiembre ¡A darlo todo!
              -->
                <div class="card" >
                    <div class="col-md-12 col-sm-12 form-group">
                      <!-- <h2>{{message.title}}</h2> -->
                      <h2>Renueva tu compromiso este 2020-II</h2>
                    </div>
                    <div class="col-md-12 col-sm-12 form-group">
                      <!-- <p>{{message.message}}</p> -->
                      <p>Hola Creando, Estamos muy felices de saludarte nuevamente, te damos la bienvenida a la intranet. Queremos agradecerte por el compromiso y profesionalismo demostrado como Creando Docente el semestre en que participaste. Este 2020 estamos llevando el programa de manera digital, en el cual estamos reinventándonos para seguir impactando positivamente en la vida de nuestros niños. Y nos gustaría hacerlo posible de la mano contigo, te invitamos a renovar tu compromiso este 2020-II. Confirma tu participación hasta: 15 de setiembre ¡A darlo todo!</p>
                    </div>
                    <div v-if="VolunteerAssignments.length == 0" class="col-md-12 col-sm-12 form-group">
                      <br>
                      <button type="button" class="btn btn-primary" @click="startConfirmParticipation()">Confirmar Participación </button>
                    </div>
                    <div v-else class="col-md-12 col-sm-12 form-group">
                      <p style="color: blue; font-weight: bold;">Tu participación ya fue confirmada.</p>
                    </div>
                </div>
          </div>
        </div>
        <!---Seccion confirmar participacion-->
          <div v-if="participationFlag == true">
            <div class="card" v-if="flagParticipationFieldsShown == true">
          <!-- original
          <div class="card" v-if="showSelectSchool && flagParticipationFieldsShown == true">
            -->
            <div class="card-header">
              <!--original
               <h2>{{message.message}}</h2> -->
              <h2>Renueva tu compromiso este 2020-II</h2>
              <div class="clearfix"></div>
            </div>
            <!--Datos personales-->
            <div class="card-body">
              <div class="card-header">
                <h2>Datos Personales</h2>
                <div class="clearfix"></div>
              </div>
              <!--Alias-->
              <div class="card-body">
                <inputMaf type='text' v-model="formPersonalInformation.alias" :valueInput="formPersonalInformation.alias" label="Alias:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="name" etiqueta='true' ref="inputAlias">
                </inputMaf>
              </div>
              <div class="card-body">
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
              </div>
              <!--Direccion-->
              <div class="card-body">
                <inputMaf type='text' v-model="formPersonalInformation.address"  :valueInput="formPersonalInformation.address" label="Dirección:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputAddress">
                </inputMaf>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de vivienda:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select class="form-control" v-model="formPersonalInformation.district" >
                              <option v-for="district in districts" :value="district.id">{{district.name}}</option>
                        </select>
                      </div>
                </div>
              </div>
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
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué tanto crees que el cambio en el Perú es posible?:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select class="form-control" v-model="formPersonalInformation.improvementExpectation" >
                              <option v-for="item in levelsBeliefChangePeru" :value="item.id">{{item.value}}</option>
                        </select>
                      </div>
                </div>
              </div>
            </div>
            <!--Fin datos personales-->
            <div class="card-body">
              <div class="card-header">
                <h2>Datos necesarios para el semestre</h2>
                <div class="clearfix"></div>
              </div>
              <div class="card-body" v-if="flagVirtual == true"> 
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar cómo quieres participar:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="form.projectCode" @change="onChangeProject">
                              <option disabled="disabled" value="">Seleccione</option>
                              <option value="PROJECT_WORKSHOP" >Dona tu talento</option>
                              <option value="PROJECT_ORIENTATION">Comparte tu pasión</option>                                   
                          </select>
                      </div>
                </div>
              </div>

              <div class="card-body" v-if="flagVirtual == true && flagShowDescription == true" >  
                    <div class="logo-container" v-if="form.projectCode == 'PROJECT_WORKSHOP'">
                      <img class="navbar-brand-full" 
                      src="https://creamas.org/wp-content/uploads/elementor/thumbs/BotonDonaTuTalento-our0ys3mdq5bnwhjrvg88yajonwyekp1mt12y24la0.png" 
                      width="200px" height="200px" >
                    </div>
                    <div class="logo-container" v-else>
                      <img class="navbar-brand-full"
                      src="https://creamas.org/wp-content/uploads/elementor/thumbs/BotonComparteTuPasion-our0zawe6ev243q8q3krmtjrkdcaoirode2sjlcptk.png" 
                      width="200px" height="200px" >
                    </div>
              </div>        
              <div class="card-body" v-if="flagVirtual == true && flagShowDescription == true" >  
                <div class="form-group">
                    <h5 style="text-align:center; width: -webkit-fill-available;">{{projectDescription}} </h5>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group" v-if="flagVirtual == false">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar colegio:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="form.school" @change="onChangeBusStops">
                          <option disabled="disabled" value="">Selecciona un colegio</option>
                          <option v-for="item in schoolsBus" v-bind:value="item.id" >
                          {{item.name}}
                          </option>
                          </select>
                      </div>
                </div>
                <div class="form-group" v-else>
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar equipo:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="form.school" @change="onChangeBusStops">
                          <option disabled="disabled" value="">Selecciona un equipo</option>
                          <option v-for="item in schoolsByProject" v-bind:value="item.id" >
                          {{item.name}}
                          </option>
                          </select>
                      </div>
                </div>
              </div>
              <div class="card-body" v-if=" flagVirtual == false">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Rutas:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="item in whereabouts">
                                      {{item.name}}-{{item.reference}}
                                </li>
                            </ul>
                    </div>
                </div>
              </div>
              <div class="card-body"  v-if=" flagVirtual == false">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Participar como:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control"  v-model="form.catParticipationId"  @change="changeCatParticipation">
                            <option disabled="disabled" value="">Selecciona una opción</option>
                            <option v-for="item in catParticipation" v-bind:value="item.id">
                              {{item.name}}
                              </option>
                              </select>
                      </div>
                </div>
              </div>
              <div class="card-body"  v-if=" flagVirtual == false">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Grado:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control"  v-model="form.workshopGrade" >
                            <option disabled="disabled" value="">Selecciona el grado</option>
                            <option v-for="item in grades" v-bind:value="item.code" v-model="form.grade">
                              {{item.displayValue}}
                              </option>
                              </select>
                      </div>
                </div>
              </div>
              <div class="card-body" v-if="catWorkshopFlag==true && flagVirtual == false">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la categoría del taller:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control"  v-model="form.catWorkshopId"  @change="onChangeCatWorkshop()">
                            <option disabled="disabled" value="">Categorías de los talleres</option>
                            <option v-for="item in catWorkshops" v-bind:value="item.code">
                              {{item.displayValue}}
                              </option>
                              </select>
                      </div>
                </div>
              </div>
            <div class="card-body" v-if="nameWorkshopFlag==true && catWorkshopFlag==true && flagVirtual == false">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control"  v-model="form.workshopCode" @change="onChangeNameWorkshop()" >
                            <option disabled="disabled" value="">Talleres disponibles</option>
                            <option v-for="item in workshops" v-bind:value="item.code">
                              {{item.displayValue}}
                              </option>
                              </select>
                      </div>
                </div>
              </div>
              <div class="card-body" v-if="otherNameFlag==true && catWorkshopFlag==true &&  flagVirtual == false ">
                <inputMaf type='text' v-model="form.workshopName" :valueInput="form.workshopName"  label="Ingrese el nombre del taller:" :validation="{required:true,  max:50}" nameInput="workshopName" etiqueta='true' ref="inputWorkshopName" >
                </inputMaf>
              </div>
              <div class="card-body" v-if="nameWorkshopFlag==true && catWorkshopFlag==true">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel de conocimiento del taller:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control"  v-model="form.knowledgeLevel" >
                              <option disabled="disabled" value="">Seleccione su nivel</option>
                              <option v-for="item in levelsKnowledge" v-bind:value="item.id">
                              {{item.value}}
                              </option>
                            </select>
                      </div>
                </div>
              </div>
              <!--Opcion 2-->
              <div class="card-body" v-if="catWorkshopFlag==true &&  flagVirtual == false ">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la categoría del taller (Opción2):</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="form.catWorkshopId2"  @change="onChangeCatWorkshop2()">
                                  <option disabled="disabled" value="">Categorías de los talleres</option>
                                  <option v-for="item in catWorkshops" v-bind:value="item.code">
                                    {{item.displayValue}}
                                    </option>
                                    </select>
                            </div>
                      </div>
              </div>
              <div class="card-body" v-if="nameWorkshopFlag2==true && catWorkshopFlag==true &&  flagVirtual == false ">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller (Opción2):</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <select class="form-control"  v-model="form.workshopCode2" @change="onChangeNameWorkshop2()" >
                              <option disabled="disabled" value="">Talleres disponibles</option>
                              <option v-for="item in workshops2" v-bind:value="item.code">
                                {{item.displayValue}}
                                </option>
                                </select>
                        </div>
                  </div>
              </div>
              <div class="card-body" v-if="otherNameFlag2==true && catWorkshopFlag==true &&  flagVirtual == false ">
                  <!--<div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Ingrese el nombre del taller (Opción2):</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input  v-model="form.workshopName2" class="form-control col-md-12 col-xs-12">
                        </div>
                  </div>-->
                  <inputMaf type='text' v-model="form.workshopName2" :valueInput="form.workshopName2"  label="Ingrese el nombre del taller (Opción2):" :validation="{required:true,  max:50}" nameInput="workshopName2" etiqueta='true' ref="inputworkshopName2" >
                  </inputMaf>
              </div>
              <div class="card-body" v-if="nameWorkshopFlag2==true && catWorkshopFlag==true &&  flagVirtual == false ">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel de conocimiento del taller:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control"  v-model="form.knowledgeLevel2" >
                              <option disabled="disabled" value="">Seleccione su nivel</option>
                              <option v-for="item in levelsKnowledge" v-bind:value="item.id">
                              {{item.value}}
                              </option>
                            </select>
                      </div>
                </div>
              </div>
              <!--Fin opcion 2-->
              <!--Opcion 3-->
              <div class="card-body" v-if="catWorkshopFlag==true &&  flagVirtual == false ">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la categoría del taller (Opción3):</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="form.catWorkshopId3"  @change="onChangeCatWorkshop3()">
                                  <option disabled="disabled" value="">Categorías de los talleres</option>
                                  <option v-for="item in catWorkshops" v-bind:value="item.code">
                                    {{item.displayValue}}
                                    </option>
                                    </select>
                            </div>
                      </div>
              </div>
              <div class="card-body" v-if="nameWorkshopFlag3==true && catWorkshopFlag==true &&  flagVirtual == false ">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller (Opción3):</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <select class="form-control"  v-model="form.workshopCode3" @change="onChangeNameWorkshop3()" >
                              <option disabled="disabled" value="">Talleres disponibles</option>
                              <option v-for="item in workshops3" v-bind:value="item.code">
                                {{item.displayValue}}
                                </option>
                                </select>
                        </div>
                  </div>
              </div>
              <div class="card-body" v-if="otherNameFlag3==true && catWorkshopFlag==true &&  flagVirtual == false  ">
                  <inputMaf type='text' v-model="form.workshopName3" :valueInput="form.workshopName3"  label="Ingrese el nombre del taller (Opción3):" :validation="{required:true,  max:50}" nameInput="workshopName3" etiqueta='true' ref="inputworkshopName3" >
                  </inputMaf>
              </div>
              <div class="card-body" v-if="nameWorkshopFlag3==true && catWorkshopFlag==true">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel de conocimiento del taller:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control"  v-model="form.knowledgeLevel3" >
                              <option disabled="disabled" value="">Seleccione su nivel</option>
                              <option v-for="item in levelsKnowledge" v-bind:value="item.id">
                              {{item.value}}
                              </option>
                            </select>
                      </div>
                </div>
              </div> 
              <!--Fin opcion 3-->
              <div class="card-body" v-if=" flagVirtual == false ">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Por qué quiere participar en crea+?</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                              <textarea  v-model="form.reason" class="form-control col-md-12 col-xs-12" rows="3"></textarea>
                      </div>
                </div>
              </div>
              <!--OPCION SECUNDARIA-->
                <!--<div class="card" v-if="showSelectSchool">
                  <div class="card-header">
                    <h2>Segunda opción</h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="card-body">
                    <div class="card-body">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccionar colegio:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control" v-model="form.school2" @change="onChangeBusStops">
                                <option disabled="disabled" value="">Selecciona un colegio</option>
                                <option v-for="item in schoolsBus" v-bind:value="item.id" >
                                {{item.name}}
                                </option>
                                </select>
                            </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Rutas:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                                  <ul class="list-group">
                                      <li class="list-group-item" v-for="item in whereabouts">
                                            {{item.name}}-{{item.reference}}
                                      </li>
                                  </ul>
                          </div>
                      </div>
                    </div>



                    <div class="card-body">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Participar como:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="form.catParticipationId2"  @change="changeCatParticipation">
                                  <option disabled="disabled" value="">Selecciona una opción</option>
                                  <option v-for="item in catParticipation" v-bind:value="item.id">
                                    {{item.name}}
                                    </option>
                                    </select>
                            </div>
                      </div>
                    </div>
                      <div class="card-body" v-if="catWorkshopFlag==true">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona la categoría del taller:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="form.catWorkshopId2"  @change="onChangeCatWorkshop">
                                  <option disabled="disabled" value="">Categorías de los talleres</option>
                                  <option v-for="item in catWorkshops" v-bind:value="item.code">
                                    {{item.displayValue}}
                                    </option>
                                    </select>
                            </div>
                      </div>
                    </div>
                  <div class="card-body" v-if="nameWorkshopFlag==true">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Selecciona el taller:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control"  v-model="form.workshopCode2" @change="onChangeNameWorkshop()" >
                                  <option disabled="disabled" value="">Talleres disponibles</option>
                                  <option v-for="item in workshops" v-bind:value="item.code">
                                    {{item.displayValue}}
                                    </option>
                                    </select>
                            </div>
                      </div>
                    </div>
                  <div class="card-body" v-if="otherNameFlag==true">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Ingrese el nombre del taller:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input  v-model="form.workshopName2" class="form-control col-md-12 col-xs-12">
                            </div>
                      </div>
                    </div>
                  </div>
                </div>-->
              <!--|||||||||||||||||||||||||||||||-->
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="confirmParticipation()"> Confirmar participación </button>
              </div>
            </div>
          </div>
          </div>
        <!--Fin confirmar participacion-->

        <!--|||||||||||||||||||||||||||||||-->
        <div class="card" v-if="showOnlyMessage">
          <div class="card-header">
            <h2>{{message.message}}</h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import consultServices from './../../utilities/consultServices.js';
import LoadingComponent from "./../../components/loadingComponent.vue";
import inputMaf from "./../../components/inputMaf.vue";
import _ from 'lodash';
import moment from 'moment';
//import * as lang from "vuejs-datepicker/src/locale";
import {
  Datetime
} from 'vue-datetime';
import charlaRegistrar from "./../../components/charlaRegistrar.vue";
//IMPORTAR PARA STEPS
import vueStep from 'vue-step'
export default {
  name: "DesktopContainer_old",
  components: {
    LoadingComponent,
    Datetime,
    charlaRegistrar,
    vueStep,
    inputMaf,
  },
  data: () => ({
    isLoading: false,
    requireVolunteerSincUpdate:window.INITIAL_STATE.requireVolunteerSincUpdate,
    selectEvent: '',
    attendance: {},
    masters: [],
    message: {
      title: '',
      message: '',
      noEventos: ''
    },
    form:{
      whereabouts:'',school:'',catParticipationId:'',workshopId:'',workshopGrade:'',knowledgeLevel:'',knowledgeLevel2:'',workshopName:'',workshopName2:'',
    },
    documentNumber:window.INITIAL_STATE.documentNumber,
    //Primero
    recruitmentStatusCode: window.INITIAL_STATE.recruitmentStatusCode,
    seniorityCode: window.INITIAL_STATE.seniorityCode,
    statusCode: window.INITIAL_STATE.statusCode,
    id: window.INITIAL_STATE.id,
    VolunteerAssignments:[],
    dataEvent: {
      address: '',
      room: '',
      date: '',
    },
    noEvent:'',
    showNoEvent:false,
    dataState: [],
    desktopCode: '',
    nowStep: 0,
    stepList: ['Registro completo', 'Inscrito a charla', 'Evaluación aprobada', 'Participación confirmada'],
    //data fake
    schoolsBus:[],
    whereabouts:[],
    catParticipation:[],
    workshopCategories:[],
    catWorkshops:[],
    workshops:[],
    workshops2:[],
    levels:[],
    semester:[],
    contentWorkshop:[],
    //Opciones
    grades:[],
    levelsKnowledge:[],
    levelsBeliefChangePeru:[],
    levelsDreamFulfillment:[],
    flagParticipationFieldsShown:false,
    districts:[],
    //datos personas
    formPersonalInformation:{},
    //dta fake
    catWorkshopFlag:false,
    otherNameFlag:false,
    nameWorkshopFlag:false,
    otherNameFlag2:false,
    nameWorkshopFlag2:false,
    otherNameFlag3:false,
    nameWorkshopFlag3:false,
    style: 'style1',
    //necesario para registrarse en una charla
    events: [],
    turns: [],
    event: [],
    suscriptor: [],
    registry: {},
    idEvent: '',
    idEventTurn: '',
    address: '',
    date: '',
    dataWelcome:{},
    dataCapacitation:{},
    showCapacitationSummary:false,
    showWelcomeSummary:false,
    showSteps:false,
    showSelectEvent:false,
    showEventSummary:false,
    showSelectSchool:true,
    showOnlyMessage:false,
    name:'',
    idVolunteerJob:'',
    password: '',
    confirmPassword: '',
    //deadline
    deadlineTimeFlag: false,
    participationFlag: false,
    //flagVirtual
    flagVirtual:true,
    projectDescription:'',
    flagShowDescription:false,
    schoolsByProject: [],
  }),
  async created() {

        this.isLoading=true;
        await this.fillOptions();
        await this.setRecruitmentStatusCode();
        await this.getVolunteer();
        // console.log("recruitmentStatusCode",this.recruitmentStatusCode)
        await this.getSessionStorage();
        await this.setStep();
        this.isLoading=false;
        // console.log('requireVolunteerSincUpdate ',this.requireVolunteerSincUpdate)
  },

  mounted() {
    if(this.requireVolunteerSincUpdate == true){
      $('.modal-Password').modal({backdrop: 'static', keyboard: false})
      //$('.modal-Password').modal()
    }
  },

  methods: {
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
    async setRecruitmentStatusCode() {
      console.log('Llama la funcion');
      if(this.recruitmentStatusCode == 'VOLUNTEER_CANDIDATE' || this.recruitmentStatusCode == 'VOLUNTEER_SUBSCRIPTER') {
        console.log('Entro una');
        const response = await consultServices('getVolunteer','POST', {id:this.documentNumber});
        console.log("response.recruitmentStatusCode",response.recruitmentStatusCode)
        if(this.recruitmentStatusCode == response.recruitmentStatusCode) {
          this.recruitmentStatusCode = response.recruitmentStatusCode;
        }
      }
    },
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
                if(!window.sessionStorage.catParticipation){
                 this.catParticipation=await  consultServices('getJobs','POST',{category:'JUNIOR'});;
                  window.sessionStorage.catParticipation  = JSON.stringify(this.catParticipation);
                }
                if(!window.sessionStorage.schoolsBus){
                 this.schoolsBus=await  consultServices('getSchoolBus','POST',{});;
                  window.sessionStorage.schoolsBus  = JSON.stringify(this.schoolsBus);
                }
                

                if( ids.length > 0){

                  //Hacer consulta única de masterValues
                  var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
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
              this.schoolsBus = JSON.parse( window.sessionStorage.schoolsBus );
              this.catParticipation = JSON.parse( window.sessionStorage.catParticipation );
              this.workshopCategories = JSON.parse( window.sessionStorage.workshopCategories );
              this.contentWorkshop = JSON.parse( window.sessionStorage.contentWorkshop );
              this.grades = JSON.parse( window.sessionStorage.grades );

              //TEMPORAL: Adicionalmente buscamos al voluntario con el semestre para poder obtener sus roles y decidir si mostrar o no la renovación
              await this.refreshVolunteerAssignemnts();

            this.isLoading = false;
        },

        //Listamos las provicias x region
        async getProvinces(){
          this.isLoading = true;
          let json = {idRegion: this.formPersonalInformation.region};
          const response = await consultServices('getProvincesByRegion','POST', json);
          this.provinces = response;
          this.isLoading = false;
        },

        //Listamos los distritos x provincia
        async getDistricts(){
          this.isLoading = true;
          let json = {idProvince: this.formPersonalInformation.province};
          const response = await consultServices('getDistrictsByProvince','POST', json);
          this.districts = response;
          this.isLoading = false;
        },

        async getVolunteer() {
          this.isLoading = true;
          const response = await consultServices('getvolunteer','POST',{id: this.documentNumber});
          this.recruitmentStatusCode = response.recruitmentStatusCode;
          this.seniorityCode = response.seniorityCode;
          this.statusCode = response.statusCode;
          // console.log('response ',response)
          this.name = (response.name!=null?response.name:"") + (response.lastName!=null?" " + response.lastName:"") + (response.secondLastName!=null?" "+response.secondLastName:"");
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
    cleanOptionsShowed () {
      this.showSteps=false;
      this.showSelectEvent=false;
      this.showEventSummary=false;
      this.showSelectSchool=false;
      this.showOnlyMessage=false;
    },
    async setStep() {
      this.isLoading = true;
      var responseStatus='';
      await this.getVolunteer();
      // console.log("this.statusCode ", this.statusCode);
      // console.log("this.seniorityCode ", this.seniorityCode);
      // console.log("this.recruitmentStatusCode ", this.recruitmentStatusCode);
      this.dataState = await consultServices('desktopValues', 'POST', {
        statusCode: this.statusCode,
        seniorityCode: this.seniorityCode,
        recruitmentStatusCode: this.recruitmentStatusCode
      }, (status)=>{
        responseStatus=status;
      });
      this.desktopCode = this.dataState.statusCode;
      this.message.title = this.dataState.title;
      this.message.message = this.dataState.message;
      this.cleanOptionsShowed();
      //STEPS//////////////
      // console.log('this.desktopCode ', this.desktopCode);
      switch (this.desktopCode) {
        case 'DESKTOP_VOLUNTEER_NEW_SUBSCRIPTER':
          await this.getEvent();
          this.nowStep = 1;
          this.showSteps = true;
          this.showSelectEvent=true;

          break;
        case 'DESKTOP_VOLUNTEER_NEW_CANDIDATE':
          this.nowStep = 2;
          this.showSteps = true;
          console.log("this.id ", this.id);
          const response = await consultServices('getRecruitmentEvent', 'POST', {
            id: this.id
          });
          console.log("response event ",response);
          if(response!=null){
            if(response.EventTurn){
              this.showEventSummary=true;
              this.dataEvent.room = `${response.EventTurn.Event.LocaleRoom.name}`;
              this.dataEvent.address = `${response.EventTurn.Event.LocaleRoom.Locale.name} : ${response.EventTurn.Event.LocaleRoom.Locale.address}`;
              this.dataEvent.date = `${response.EventTurn.Event.startDate} ${response.EventTurn.startHour}`}
              else{
                showOnlyMessage = true;
                this.message.message="Comenzó tu proceso de evaluación. Los resultados te serán comunicados";
              }
          }else{
            this.showOnlyMessage = true;
            this.message.message = 'Dentro de 2 semanas te informaremos de tus resultados.';
          }
          break;
        case 'DESKTOP_VOLUNTEER_NEW_SUITABLE_OK':
          this.nowStep = 3;
          this.showSteps = true;
          this.showSelectSchool=true;
          break;
        case 'DESKTOP_VOLUNTEER_NEW_SUITABLE_FALSE':
          this.nowStep = 0;
          this.showSteps = false;
          this.showOnlyMessage=true;
          break;
        case 'DESKTOP_VOLUNTEER_JUNIOR_INACTIVE':
          this.nowStep = 4;
          this.showSteps = true;
          this.showWelcomeSummary=true;
          this.showCapacitationSummary=true;
          const response1 = await consultServices('getWelcomeEvent', 'POST', {
            id: this.semester.id,
          });
           if(response1.message){
               this.noEvent=response1.message;
               this.showWelcomeSummary = false;
               this.showCapacitationSummary=false;
               this.showNoEvent=true;
           }else{
           this.showEventSummary=true;
           this.dataEvent.room = `${response1.EventTurn.Event.LocaleRoom.name}`;
           this.dataEvent.address = `${response1.EventTurn.Event.LocaleRoom.Locale.name} : ${response1.EventTurn.Event.LocaleRoom.Locale.address}`;
           this.dataEvent.date = `${response1.EventTurn.Event.startDate} ${response1.EventTurn.startHour}`
           this.showSteps = true;
           }


          const response_1 = await consultServices('getWelcomeAndCapacitationConfiguration', 'POST', {});
          _.map(response_1,(item)=>{
            item.code == 'DESKTOP_WELCOME_ADDRESS'?this.dataWelcome.address = item.displayValue:null;
            item.code == 'DESKTOP_WELCOME_HOUR'?this.dataWelcome.hour = this.getHour(item.displayValue):null;
            item.code == 'DESKTOP_WELCOME_DATE'?this.dataWelcome.date = this.getDay(item.displayValue):null;
            item.code == 'DESKTOP_CAPACITATION_ADDRESS'?this.dataCapacitation.address = item.displayValue:null;
            item.code == 'DESKTOP_CAPACITATION_HOUR'?this.dataCapacitation.hour = this.getHour(item.displayValue):null;
            item.code == 'DESKTOP_CAPACITATION_DATE'?this.dataCapacitation.date = this.getDay(item.displayValue):null;
          })


          break;
        case 'DESKTOP_VOLUNTEER_JUNIOR_ACTIVE':
          this.nowStep = 4;
          this.showWelcomeSummary=true;
          this.showCapacitationSummary=true;
          const response2 = await consultServices('getWelcomeEvent', 'POST', {
            id: this.semester.id
          });

           if(response2.message){
               this.showWelcomeSummary=false;
               this.showCapacitationSummary=false;
               this.noEvent=response2.message;
               this.showNoEvent=true;
           }else{
           this.dataEvent.room = `${response2.EventTurn.Event.LocaleRoom.name}`;
           this.dataEvent.address = `${response2.EventTurn.Event.LocaleRoom.Locale.name} : ${response.EventTurn.Event.LocaleRoom.Locale.address}`;
           this.dataEvent.date = `${response2.EventTurn.Event.startDate} ${response.EventTurn.startHour}`
           this.showSteps = true;
           }

          break;

        case 'DESKTOP_VOLUNTEER_ALUMNI_INACTIVE':
          this.nowStep = 3;
          // console.log('deadline ', this.deadlineTimeFlag)
          // console.log('showSelectSchool ', this.showSelectSchool)
          // console.log('flagParticipationFieldsShown ', this.flagParticipationFieldsShown)
          this.showSelectSchool = true
          this.flagParticipationFieldsShown = false
        break;
          
          
        default:
      }
        // console.log("nowStep", this.nowStep);
        // console.log("stepList", this.stepList);
      this.isLoading = false;
    },
    async refreshVolunteerAssignemnts() {
      const volunteerSearch = await consultServices('searchVolunteerByJob', 'POST', {documentNumber:this.documentNumber,semesterCode:this.semester.id});
      // console.log("volunteerSearch: ",volunteerSearch)
      this.VolunteerAssignments = volunteerSearch[0].VolunteerJobs.length > 0 ? volunteerSearch[0].VolunteerJobs[0].AssignmentRecords : [];
    },
    ///necesario para registrarse en una charla
    async getEvent() {
      const response = await consultServices('getOpenEvents', 'POST', {});
      console.log(response);
      this.events = response;
    },
    async addParticipant() {
      var retVal = confirm("¿Seguro de inscribirse a ese turno?");
      if (retVal == true) {
        this.isLoading = true;
        var form = {};
        form.idEventTurn = this.idEventTurn;
        form.id=this.id;
        // console.log(form);
        const responseII = await consultServices('createNewAttendance', 'POST', form);
        this.recruitmentStatusCode = responseII.recruitmentStatusCode;
        await this.setStep();
        this.dataEvent.address = responseII.attendance.EventTurn.Event.LocaleRoom.Locale.name + " " + responseII.attendance.EventTurn.Event.LocaleRoom.Locale.address;
        this.dataEvent.room = responseII.attendance.EventTurn.Event.LocaleRoom.name;
        this.dataEvent.date = responseII.attendance.EventTurn.Event.startDate;
        this.isLoading = false;
        alert("Inscripción registrada");
      } else {
        return false;
      }
    },
    async getTurn() {
      this.address = this.event.LocaleRoom.Locale.address;
      this.date = this.getDay(this.event.startDate);
      this.isLoading = false;
      const response = await consultServices('getTurnbyEvent', 'POST', {
        idEvent: this.event.id,
      });
      console.log(response);
      var availableTurns = [];
      for (let index = 0; index < response.length; index++) {
        if(response[index].quota > response[index].Attendances.length){
          availableTurns.push(response[index])
        }        
      }
      this.turns = availableTurns;
      this.isLoading = false;
    },
    getHour(Hour) {
      return moment(Hour).format("HH:mm");
    },
    getDay(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    async confirmParticipation(){
      //renovar para ciclo virtual
      if(this.flagVirtual == true){
        //variables
        var validationInformation = true
        var formVirtualParticipation = {}
        //fin variables
        //validar todos los campos obligatorios completos
        if(this.formPersonalInformation.alias == '' || this.formPersonalInformation.alias == null||
          this.formPersonalInformation.dressSize == null|| !this.formPersonalInformation.dressSize||
          this.formPersonalInformation.address == ''||this.formPersonalInformation.address == null||
          // this.formPersonalInformation.district == null ||!this.formPersonalInformation.district||
          this.formPersonalInformation.phone == ''||this.formPersonalInformation.phone == null||
          this.formPersonalInformation.collegeName == ''||this.formPersonalInformation.collegeName == null||
          this.formPersonalInformation.careerName == '' || this.formPersonalInformation.careerName == null ||
          this.formPersonalInformation.organizationName == '' || this.formPersonalInformation.organizationName == null ||
          this.formPersonalInformation.organizationJob == '' || this.formPersonalInformation.organizationJob == null ||
          await this.$refs.inputAlias.returnValidationAsync() == false|| await this.$refs.inputAddress.returnValidationAsync() == false||
          await this.$refs.inputPhone.returnValidationAsync() == false|| await this.$refs.inputCollegeName.returnValidationAsync() == false||
          await this.$refs.inputCareer.returnValidationAsync() == false|| await this.$refs.inputOrganizationName.returnValidationAsync() == false ||
          await this.$refs.inputorganizationJob.returnValidationAsync() == false || this.form.projectCode == null || this.form.projectCode == '' ||
          this.form.school == null || this.form.school == '' 
        ){
          //El formulario no fue validado
          alert('Debe completar todos los campos del formulario')
        }else{
          this.isLoading = true;
          //si todos los campos están completos, proceder a renovar participación
            //Para renovar la participación, primero actualizar perfil
            const form0 = _.cloneDeep(this.formPersonalInformation);
            const response0 = await consultServices('updateAllVolunteer','POST',form0);
            //Ahora renovar la participacion
            //valores del json que irá al servicio
            formVirtualParticipation = {
              idSchool:this.form.school,
              requestedWorkshopContentCode: '',
              requestedWorkshopDisplayName: '',
              requestedWorkshopGradeCode: null,
              assignmentReason: '',
              idJob: null,
              semesterCode: this.semester.id,
              idVolunteer :this.id,
              idVolunteerJob:this.idVolunteerJob,
              ///Agregando nuevo
              knowledgeLevel:null,
              secondKnowledgeLevel:null,
              requestedSecondWorkshopContentCode: '',
              requestedSecondWorkshopDisplayName: '',
              thirdKnowledgeLevel:null,
              requestedThirdWorkshopContentCode: '',
              requestedThirdWorkshopDisplayName: '',
            }
            const response = await consultServices('renewVirtualAgreement', 'POST', formVirtualParticipation,  (status)=>{ responseStatus=status;});
            //Con el resultado, setear los valores del escritorio
            console.log('respuesta de renovación virtual: ', response)
            if(responseStatus == 200){
              //si la renovación fue correcta, actualizar los valores del escritorio
              this.seniorityCode = response.seniorityCode; // -> Comentado porque el back no está modificando 
              this.statusCode = response.statusCode;
              await this.refreshVolunteerAssignemnts(); //Refrescamos las asignaciones del volutario
              await this.setStep();
              if(response.attendance){
                this.dataEvent.address = response.attendance.EventTurn.Event.LocaleRoom.Locale.name + " " + response.attendance.EventTurn.Event.LocaleRoom.Locale.address;
                this.dataEvent.room = response.attendance.EventTurn.Event.LocaleRoom.name;
                this.dataEvent.date = response.attendance.EventTurn.Event.startDate;
              }else{
                this.showWelcomeSummary = false;
                this.showCapacitationSummary=false;  
                this.noEvent="El lugar y la fecha del evento de Bienvenida, aún no está disponible.A";
                // this.showNoEvent=true;
              }
              this.isLoading = false;
              this.flagParticipationFieldsShown = false
              alert("Participación registrada");
            }
            if(responseStatus == 400){
              //si la renovación no fue correcta, notificar
              this.isLoading = false;
              alert(response.message);
            }
        }
      }
      //renovar para ciclo presencial 
      else{
         console.log('this.form.catParticipationId',this.form.catParticipationId)
          var participation = {};
          if(this.form.secondSchool){
            participation.requestedSecondIdSchool = this.form.school2;
          }
          ////////
          var catParticipationAux = _.find(this.catParticipation, (aux) => {
                            return aux.id == this.form.catParticipationId
            })
          // variables de validación
          var auxValidation = true;
          var validationPersonalInformation = true;
          console.log('this catParticipationAux',catParticipationAux)
          ////
          if(this.form.catParticipationId != '') {

            ///Validar datos por el tipo de categoría de participación
              if(catParticipationAux.code == 'SCHOOL_CUSTOM') {
                if(this.form.workshopGrade=='' || this.form.catParticipationId=='' || this.form.school == '' || this.form.workshopName==''
                || this.form.workshopName2=='' || this.form.knowledgeLevel == '' || this.form.knowledgeLevel2 == '') {
                    auxValidation = false;
                }
              } else {
                if(this.form.workshopGrade=='' || this.form.catParticipationId=='' || this.form.school == '') {
                    auxValidation = false;
                }
              }

            ////Validar datos personales del voluntario
            if(this.formPersonalInformation.alias == ''||this.formPersonalInformation.alias == null||
                this.formPersonalInformation.dressSize == null|| !this.formPersonalInformation.dressSize||
                this.formPersonalInformation.address == ''||this.formPersonalInformation.address == null||
                this.formPersonalInformation.district == null ||!this.formPersonalInformation.district||
                this.formPersonalInformation.phone == ''||this.formPersonalInformation.phone == null||
                this.formPersonalInformation.collegeName == ''||this.formPersonalInformation.collegeName == null||
                this.formPersonalInformation.careerName == '' || this.formPersonalInformation.careerName == null ||
                this.formPersonalInformation.organizationName == '' || this.formPersonalInformation.organizationName == null ||
                this.formPersonalInformation.organizationJob == '' || this.formPersonalInformation.organizationJob == null ||
                await this.$refs.inputAlias.returnValidationAsync() == false|| await this.$refs.inputAddress.returnValidationAsync() == false||
                await this.$refs.inputPhone.returnValidationAsync() == false|| await this.$refs.inputCollegeName.returnValidationAsync() == false||
                await this.$refs.inputCareer.returnValidationAsync() == false|| await this.$refs.inputOrganizationName.returnValidationAsync() == false ||
                await this.$refs.inputorganizationJob.returnValidationAsync() == false) {

                  validationPersonalInformation = false;
            }

          ////////
          if(auxValidation == false|| validationPersonalInformation==false){
            var flag=confirm("Complete todos los campos para registrar ")
            if(flag==true){
              return true;
            }
          }else{
            ///Pregunta si se ha llenado la segunda opición
                var flag=confirm("¿Confirmar su participación? ")
                //Flag
                if(flag==true){
                  this.isLoading=true;
                  var responseStatus='';
                  var value= 1;
                  if(catParticipationAux.code != 'SCHOOL_CUSTOM'){

                      participation={
                      idSchool:this.form.school,
                      requestedWorkshopContentCode: '',//this.form.workshopCode,
                      requestedWorkshopDisplayName: '',//this.form.workshopName,
                      requestedWorkshopGradeCode: this.form.workshopGrade,
                      assignmentReason: this.form.reason,
                      idJob: this.form.catParticipationId,
                      semesterCode: this.semester.id,
                      idVolunteer :this.id,
                      idVolunteerJob:this.idVolunteerJob,
                      ///Agregando nuevo
                      knowledgeLevel:value,
                      secondKnowledgeLevel:value,
                      requestedSecondWorkshopContentCode: '',
                      requestedSecondWorkshopDisplayName: '',
                      thirdKnowledgeLevel:value,
                      requestedThirdWorkshopContentCode: '',
                      requestedThirdWorkshopDisplayName: '',
                      }

                  } else {

                    participation={
                    idSchool:this.form.school,
                    requestedThirdWorkshopContentCode: this.form.workshopCode3,
                    requestedThirdWorkshopDisplayName: this.form.workshopName3,
                    requestedSecondWorkshopContentCode: this.form.workshopCode2,
                    requestedSecondWorkshopDisplayName: this.form.workshopName2,
                    requestedWorkshopContentCode: this.form.workshopCode,
                    requestedWorkshopDisplayName: this.form.workshopName,
                    requestedWorkshopGradeCode: this.form.workshopGrade,
                    assignmentReason: this.form.reason,
                    idJob: this.form.catParticipationId,
                    semesterCode: this.semester.id,
                    idVolunteer :this.id,
                    idVolunteerJob:this.idVolunteerJob,
                    knowledgeLevel:this.form.knowledgeLevel,
                    secondKnowledgeLevel:this.form.knowledgeLevel2,
                    thirdKnowledgeLevel:this.form.knowledgeLevel3
                    }

                  }
                //Actualizar perfil
                const form0 = _.cloneDeep(this.formPersonalInformation);
              
                const response0 = await consultServices('updateAllVolunteer','POST',form0);

                /////Participacion
                const response = await consultServices('renewAgreement', 'POST', participation,  (status)=>{ responseStatus=status;});

                ///El status del response
                  if(responseStatus == 200){
                    this.seniorityCode = response.seniorityCode;
                    this.statusCode=response.statusCode;
                    await this.setStep();
                    if(response.attendance){
                    this.dataEvent.address = response.attendance.EventTurn.Event.LocaleRoom.Locale.name + " " + response.attendance.EventTurn.Event.LocaleRoom.Locale.address;
                    this.dataEvent.room = response.attendance.EventTurn.Event.LocaleRoom.name;
                    this.dataEvent.date = response.attendance.EventTurn.Event.startDate;}
                    else{
                    
                    this.showWelcomeSummary = false;
                    this.showCapacitationSummary=false;  
                    this.noEvent="El lugar y la fecha del evento de Bienvenida, aún no está disponible.";
                    this.showNoEvent=true;
                    }
                    this.isLoading = false;
                    alert("Participación registrada");

                  }
                  if(responseStatus == 400){
                    this.isLoading = false;
                    alert("Error en el registro de su participación");

                  }
                }
            }
          } else {
            alert('Debes seleccionar como quieres participar')
          }
      }     
    },
    async changeCatParticipation(){
      var arr=[];
      var catParticipationAux = _.find(this.catParticipation, (aux) => {
        return aux.id == this.form.catParticipationId
      })
      //Cambie la comparacion
      if(catParticipationAux.code == 'SCHOOL_CUSTOM'){
        const response = this.workshopCategories
        for (let index = 0; index < response.length; index++) {
            if(response[index].parentCode[0] == "WORKSHOP_CUSTOM"){
              arr.push(response[index]);
            }
        }

         this.catWorkshops=arr;
         this.catWorkshopFlag=true
         } else{this.catWorkshopFlag=false;}
    },
    async onChangeCatWorkshop(){
      if(this.form.catWorkshopId) {
        var ctx=this;
        this.otherNameFlag=false;
        this.nameWorkshopFlag=true;
        var arr=[];

        const  response= this.contentWorkshop;

        for (let index = 0; index < response.length; index++) {
          for (let indexj = 0; indexj < response[index].parentCode.length; indexj++) {
                    if(response[index].parentCode[indexj] == this.form.catWorkshopId){
                    arr.push(response[index]);
                    }
          }
        }
        this.workshops=arr;
      }
    },
    async onChangeCatWorkshop2(){
      if(this.form.catWorkshopId2) {
        var ctx=this;
        this.otherNameFlag2=false;
        this.nameWorkshopFlag2=true;
        var arr=[];

        const  response= this.contentWorkshop;

        for (let index = 0; index < response.length; index++) {
          for (let indexj = 0; indexj < response[index].parentCode.length; indexj++) {
            if(response[index].parentCode[indexj] == this.form.catWorkshopId2){
              arr.push(response[index]);
            }
          }
        }
        this.workshops2=arr;
      }
    },
    async onChangeCatWorkshop3(){
      if(this.form.catWorkshopId3) {
        var ctx=this;
        this.otherNameFlag3=false;
        this.nameWorkshopFlag3=true;
        var arr=[];

        const response = this.contentWorkshop;
        for (let index = 0; index < response.length; index++) {
          for (let indexj = 0; indexj < response[index].parentCode.length; indexj++) {
            if(response[index].parentCode[indexj] == this.form.catWorkshopId3){
              arr.push(response[index]);
            }
          }
        }
        this.workshops3=arr;
      }
    },

    findWorkShopName(workshopId){
      for (let index = 0; index < this.workshops.length; index++) {
        if(this.workshops[index].code == workshopId){
          return this.workshops[index].displayValue;
        }
      }
    },

    findWorkShopName2(workshopId){
      for (let index = 0; index < this.workshops2.length; index++) {
        if(this.workshops2[index].code == workshopId){
          return this.workshops2[index].displayValue;
        }
      }
    },

    findWorkShopName3(workshopId){
      for (let index = 0; index < this.workshops3.length; index++) {
        if(this.workshops3[index].code == workshopId){
          return this.workshops3[index].displayValue;
        }
      }
    },

    onChangeNameWorkshop(){
      if(this.form.workshopCode == 'WORKSHOP_OTHER'){
      this.otherNameFlag=true;
      }
      else{
        this.form.workshopName=this.findWorkShopName(this.form.workshopCode);
        this.otherNameFlag=false;
      }
    },
    onChangeNameWorkshop2(){
      if(this.form.workshopCode2 == 'WORKSHOP_OTHER'){
        this.otherNameFlag2=true;
      }else{
        console.log('Entro')
        this.form.workshopName2=this.findWorkShopName2(this.form.workshopCode2);
        this.otherNameFlag2=false;
      }
    },
    onChangeNameWorkshop3(){
      if(this.form.workshopCode3 == 'WORKSHOP_OTHER'){
        this.otherNameFlag3=true;
      }else{
        console.log('Entro')
        this.form.workshopName3=this.findWorkShopName2(this.form.workshopCode3);
        this.otherNameFlag3=false;
      }
    },
    onChangeBusStops(){
      for (let index = 0; index < this.schoolsBus.length; index++) {
        if(this.schoolsBus[index].id==this.form.school){
            this.whereabouts=this.schoolsBus[index].BusStops;
        }
      }
    },
    onChangeProject(){
      if(this.form.projectCode != null || this.form.projectCode != ''){
        this.flagShowDescription = true
        if( this.form.projectCode == 'PROJECT_WORKSHOP'){
          this.projectDescription = 'Compartiendo eso que te hace único/a, tu talento, haces posible que miles de niños y adolescentes descubran el suyo, ello a través de clases en video de Talleres Multidisciplinarios y Divertimate. ¡Súmate!'
          this.schoolsByProject = _.filter(this.schoolsBus, function(school) {return school.projectCode == 'PROJECT_WORKSHOP'; })           
        }
        if( this.form.projectCode == 'PROJECT_ORIENTATION'){
          this.projectDescription = 'Compartiendo tu experiencia profesional inspirarás a que miles de adolescentes y jóvenes encuentren su pasión, a través de la orientación vocacional. ¡Súmate!'
          this.schoolsByProject = _.filter(this.schoolsBus, function(school) {return school.projectCode == 'PROJECT_ORIENTATION'; })
        }
      }
    },    
     /**
      * startConfirmParticipation: Se registra el volunteer_job del creando que confirma participación,
     */
    async startConfirmParticipation() {
      console.log('startConfirmParticipation')
      this.flagParticipationFieldsShown = true;
      //Aqui va el servicio
      var form = {
        idVolunteer:this.id,
        semesterCode:this.semester.id,
      }
      this.participationFlag = true;
      console.log('Jobs del voluntario: ', this.VolunteerAssignments)
      if(this.VolunteerAssignments.length <= 0) {
        const responseII = await consultServices('registerConfirmation', 'POST', form);
        this.idVolunteerJob = responseII.id;
        
      } else {
        this.idVolunteerJob
      }
    }
  }
}
</script>
