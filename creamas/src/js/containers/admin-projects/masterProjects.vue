<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Gestión de Proyectos</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".master-modal" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Crear Proyecto  </button>
            <button type="button" @click="showQuestionModal()" data-toggle="modal" data-target=".question-modal" class="btn btn-success btn-xs"><i class="icon-pencil"></i> Prueba Psicométrica </button>
          </div>
          <div class="clearfix"></div>
        </div>
       
        <div class="x_content">
          <MasterTemplate
            :filters="propsProjects.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getProjects"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsProjects.customActions"  
            :data="this.projects"
            :tableTitle="titleTable"
            :setContent="this.setContentListComponent"
            :showSearchSection="this.showSearchSection"
            :searchOptionTableMaf="this.searchOptionTableMaf"
          ref="mowiMaster"/>

        </div>

        <!-- <div class="nav navbar-right panel_toolbox">
            <button type="button"  @click="downloadRegister()" class="btn btn-primary btn-xs">Descargar consolidado </button>
        </div>  -->
      </div>

      <!-- Modal Edición -->
      <div class="modal fade master-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" >Nuevo proyecto</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" >Editar proyecto</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" type='text' v-model="form.name" :valueInput='form.name' label="Nombre del proyecto: (*)" :validation="{required:true}" nameInput="name"  etiqueta='true' ref="projectName"/>
                  </div>                 
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" type='text' v-model="form.desktopName" :valueInput='form.desktopName' label="Nombre público: (*)" :validation="{required:true}" nameInput="desktopName" etiqueta='true' ref="desktopName"/>           
                  </div>                 
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" textArea="textArea" v-model="form.desktopDescription" :valueInput='form.desktopDescription'
                      label="Descripción del Proyecto: " :validation="{required:false}" nameInput="desktopDescription" etiqueta='true' ref="desktopDescription"/>
                  </div>
                </div>  

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <div class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de proyecto: </div>
                      <div class="col-md-8 col-sm-9 col-xs-12" style="align-self: center; padding-top: 10px;" >
                         
                            <select class="form-control" v-model="form.projectType">
                                    <option value="ACADEMIC_PROJECT">Proyecto Académico</option>
                                    <option value="VOLUNTEER_PROJECT">Proyecto de Voluntariado</option>
                            </select>
                          
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" type='text' v-model="form.desktopUrl" :valueInput='form.desktopUrl' label="Link video informativo:" nameInput="desktopUrl" etiqueta='true' ref="desktopUrl"/>           
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" type='text' v-model="form.attachmentUrl" :valueInput='form.attachmentUrl' label="Link material informativo:" nameInput="attachmentUrl" etiqueta='true' ref="attachmentUrl"/>           
                  </div>
                </div>      
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha límite de Inscripción:</label>
                      <DatePicker class="col-md-8 col-sm-8 col-xs-12" mode="datetime"
                      :value="form.enrollDeadline" v-model="form.enrollDeadline" :masks="masks"/>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classInput="col-md-8 col-sm-8 col-xs-12" textArea="textArea" v-model="form.taskDescription" :valueInput='form.taskDescription'
                      label="Descripción de la evaluación de competencias: " :validation="{required:false}" nameInput="taskDescription" etiqueta='true' ref="taskDescription"/>
                  </div>
                </div>  

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha límite de Reto de Competencias:</label>
                      <DatePicker class="col-md-8 col-sm-8 col-xs-12"
                          mode="date"
                          :value="new Date(form.taskDeadline)"
                          v-model="form.taskDeadline"
                          :masks="masks"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <div class="control-label col-md-3 col-sm-3 col-xs-12">Presencialidad: </div>
                      <div class="col-md-9 col-sm-9 col-xs-12" style="align-self: center; padding-top: 10px;" >
                        <input  type="checkbox" id="gridCheck1" v-model="form.faceToFace">
                        <label for="gridCheck1">
                          El proyecto se desarrollará de forma presencial.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <div class="control-label col-md-3 col-sm-3 col-xs-12">Configuración de talleres multidiciplinarios: </div>
                      <div class="col-md-8 col-sm-8 col-xs-12" style="align-self: center; padding-top: 10px;" >
                        <treeselect 
                          v-model="form.workshopTree"
                          :disable-branch-nodes="false"
                          :value-consists-of="valueConsistsOf"
                          :multiple="true"
                          :options="workshopsTree"
                          :clearable="false" />
                      </div>
                    </div>
                 </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <div class="control-label col-md-3 col-sm-3 col-xs-12">Configuración de talleres divertimate: </div>
                      <div class="col-md-8 col-sm-8 col-xs-12" style="align-self: center; padding-top: 10px;" >
                        <treeselect 
                          v-model="form.workshopTreeMath"
                          :disable-branch-nodes="false"
                          :value-consists-of="valueConsistsOf"
                          :multiple="true"
                          :options="workshopsTreeMath"
                          :clearable="false" />
                      </div>
                    </div>
                 </div>
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" @click="clearModal()" data-target=".master-modal" data-toggle="modal" class="btn btn-default">Cerrar</button>            
                <button v-if="formType=='ADD'" @click="createProject()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateProject()" type="button" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->
      <!-- Modal Equipos -->
      <div class="modal fade teams-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h3 class="modal-title" >Equipos de {{form.name}}</h3>
                <p style="margin-bottom: 0px">Aquí puedes gestionar los equipos del proyecto.</p>
              </div>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre del equipo (*):</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" class="form-control col-md-7 col-xs-12" v-model="newTeam.name">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Creandos por taller (*):</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="number" class="form-control col-md-7 col-xs-12" v-model="newTeam.capacity" min="0">
                      </div>
                    </div>
                  </div>
                </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 row">
                    <div class="col-md-10 col-sm-10 col-xs-12"></div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                      <button type="submit" @click="createTeam" class="btn btn-success" >Agregar</button>
                    </div>
                  </div>                
              </div>

              <div class="card-body">
                <div class="table-responsive" style="max-height: 400px;">
                  <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                  <thead>
                    <tr >
                      <th style="width: 5%;text-align: center;vertical-align: middle;">#</th>
                      <th style="width: 40%;text-align: center;vertical-align: middle;">Nombre</th>
                      <th style="width: 15%; text-align: center;vertical-align: middle;">Creandos por taller</th>
                      <th style="width: 40%; text-align: center;vertical-align: middle;">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(team,index) in form.Children" style="background-color: rgba(0, 0, 0, 0.05);" >
                      <td style="text-align: center">{{team.id}}</td> 
                      <td ><input style="text-align: center" type="text" class="form-control" v-model="team.name"></td> 
                      <td ><input style="text-align: center" type="number" class="form-control" v-model="team.capacity" min="0"></td> 
                      <td style="text-align: center;vertical-align: middle;">
                          <button style="margin-bottom: 0px;" @click="updateTeam(team)" type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" title="Actualizar equipo"><i class="icon-pencil"></i></button> 
                          <span data-toggle="modal" data-target=".modal-delete-team"><button style="margin: 0px;" @click="prepareDeleteTeam(team)" data-toggle="tooltip" type="button" class="btn btn-danger btn-xs"  data-placement="top" title="Eliminar" ><i class="icon-trash"></i></button></span>
                          <a :href="`/dashboard/gestionardocentes?idFather=${form.id}&idTeam=${team.id}`"  target="_newtab"><button type="button" class="btn btn-primary" > BBDD Equipo </button></a>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>

            </div>
              <div class="modal-footer">
                  <button type="button" data-target=".teams-modal" data-toggle="modal" class="btn btn-default">Cerrar</button>
              </div>
          </div>
        </div>
      </div>
      <!-- Fin Modal Equipos-->
      <!-- Modal Competencias -->
      <div class="modal fade competencies-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h3 class="modal-title" >Competencias de {{form.name}}</h3>
                <p style="margin-bottom: 0px">Aquí puedes agregar las competencias del proyecto</p>
              </div>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Competencia:</label>
                      <search-input class="col-md-6 col-sm-6 col-xs-12" v-model="selectedCompetence" :value="selectedCompetence" :arrayData="competencies" displayNameKey="name" ref="competencies" AddNewValue="Y"/>
                    </div>
                    <!-- <inputMaf classLabel="control-label col-md-3 col-sm-3 col-xs-12" classInput="col-md-8 col-sm-8 col-xs-12" type="text" v-model="question.displayName" :valueInput='question.displayName' 
                    label="Competencia: " nameInput="displayName" etiqueta='true' ref="questionDisplayName" /> -->
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo:</label>
                      <select class="form-select col-md-6 col-sm-6 col-xs-12" v-model="isEnrollment">
                        <option selected>Selecciona una opción</option>
                        <option value="true">Inscripción</option>
                        <option value="false">Seguimiento</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Peso (%):</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input type="number" class="form-control col-md-7 col-xs-12" v-model="weight" min="0" max="100">
                      </div>
                    </div>
                  </div>
                </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 row">
                    <div class="col-md-10 col-sm-10 col-xs-12"></div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                      <button type="submit" @click="assignCompetence" class="btn btn-success" >Agregar</button>
                    </div>
                  </div>                
              </div>
              
              <!--<div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-3">Hora fin:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                      <Datetime v-model="turn.endHour" type="time" title="Hora fin"></Datetime>
                  </div>
              </div>-->

              <!-- <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Cupos:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                      <input v-model="turn.quota" type="text" required="required" class="form-control col-md-6 col-xs-12">
                  </div>
              </div> -->

              <div class="card-body">
                <div class="table-responsive" style="max-height: 400px;">
                  <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                  <thead>
                    <tr >
                      <th style="width: 60%;">Competencias de inscripción</th>
                      <th style="width: 20px; text-align: center;vertical-align: middle;">Peso (%)</th>
                      <th style="width: 20px; text-align: center;vertical-align: middle;">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(comp,index) in form.ProjectCompetences"style="background-color: rgba(0, 0, 0, 0.05);" >
                      <td v-if="comp.isEnrollment">{{comp.Competence.name}}</td> 
                      <td v-if="comp.isEnrollment" ><input style="text-align: center" type="number" class="form-control" v-model="comp.weight" min="0" max="100"></td> 
                      <td  v-if="comp.isEnrollment" style="text-align: center;vertical-align: middle;">
                          <button style="margin-bottom: 0px;" @click="updateProjectCompetence(comp)" type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" title="Actualizar datos"><i class="icon-pencil"></i></button> 
                          <span data-toggle="modal" data-target=".modal-delete-team"><button style="margin: 0px;" @click="prepareDeleteProjectCompentece(comp)" type="button" class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="top" title="Eliminar" data-target=".modal-delete-competence"><i class="icon-trash"></i></button></span>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>

              <div class="table-responsive" style="max-height: 400px;">
                <table id="searcher-datatable-not-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                  <thead>
                      <tr >
                          <th style="width: 60%;">Competencias de seguimiento</th>
                          <th style="width: 20px; text-align: center;vertical-align: middle;">Peso (%)</th>
                          <th style="width: 20px; text-align: center;vertical-align: middle;">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(comp,index) in form.ProjectCompetences" style="background-color: rgba(0, 0, 0, 0.05);">
                      <td v-if="!comp.isEnrollment">{{comp.Competence.name}}</td> 
                      <td v-if="!comp.isEnrollment"><input style="text-align: center" type="number" class="form-control" v-model="comp.weight" min="0" max="100"></td>                      
                      <td v-if="!comp.isEnrollment" style="text-align: center;vertical-align: middle;">
                        <button style="margin: 0px;" @click="updateProjectCompetence(comp)" type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" title="Actualizar datos" ><i class="icon-pencil"></i></button>
                        <span data-toggle="modal" data-target=".modal-delete-team"><button style="margin: 0px;" @click="prepareDeleteProjectCompentece(comp)" type="button" class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="icon-trash"></i></button></span>
                      </td> 
                    </tr>
                  </tbody>
                  </table>
                </div>

            </div>
              <div class="modal-footer">
                  <button type="button" data-target=".competencies-modal" data-toggle="modal" class="btn btn-default">Cerrar</button>
              </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->
      <!-- Modal documentos -->
      <div class="modal fade documents-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h3 class="modal-title" >Gestión de documentos </h3>
                <p style="margin-bottom: 0px">Aquí puedes gestionar los documentos del proyecto</p>
              </div>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre :</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  class="form-control col-md-7 col-xs-12" v-model="formDoc.name">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12" style="padding-top: 10px;">
                    <div class="row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <input id="uploadInputFile" type="file" ref="docFile" style="display: block" v-on:change="handleFileUpload" > 
                    </div>
                    </div>
                </div>
                </div>
    
                  <div class="col-md-12 col-sm-12 col-xs-12 row">
                    <div class="col-md-10 col-sm-10 col-xs-12"></div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                      <button type="submit" @click="addDocument()" class="btn btn-success" >Agregar</button>
                    </div>
                  </div>          
              </div>

              <div class="card-body">
                <div class="table-responsive" style="max-height: 400px;">
                  <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                  <thead>
                    <tr >
                      <th style="width: 50%;">Documento</th>
                      <th style="width: 20%;">Link</th>
                      <th style="width: 30px; text-align: center;vertical-align: middle;">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(doc,index) in documentsProject"style="background-color: rgba(0, 0, 0, 0.05);" >
                      <!--<td >{{doc.name}}</td>-->
                      <td ><input style="text-align: center" type="text" class="form-control" v-model="doc.name"></td> 
                      <td><a :href="doc.url" target="_blank">ver documento</a> </td>
                      <td  style="text-align: center;vertical-align: middle;">          
                          <button style="margin-bottom: 0px;" @click="updateDoc(doc)" type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" ><i class="icon-pencil"></i></button>                 
                          <span ><button style="margin: 0px;" @click="setInactiveDoc(doc)" type="button" class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="top" title="Eliminar" ><i class="icon-trash"></i></button></span>
                      </td>
                    </tr>

                  </tbody>
                  </table>
                </div>
              </div>


           </div>
              <div class="modal-footer">
                  <button type="button" data-dismiss="modal" class="btn btn-success" >Cerrar</button>
              </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->

      <!-- Modal Preguntas -->
      <div class="modal fade question-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" >Prueba Psicométrica</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <p >Aquí se pueden configurar las preguntas de la prueba psicométrica. Para agregar una nueva pregunta, tipéala y presiona ENTER.</p>
                <div class="form-group">
                  <div v-on:keyup.enter="createQuestion" class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf classLabel="control-label col-md-2 col-sm-2 col-xs-12" classInput="col-md-9 col-sm-9 col-xs-12" type="text" v-model="question.displayName" :valueInput='question.displayName' 
                    label="Enunciado: " nameInput="displayName" etiqueta='true' ref="questionDisplayName" />
                  </div>
                </div>        
              </div>
              <div class="card-body">
                <div class="table-responsive" style="max-height: 400px;">
                  <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                  <thead>
                    <tr >
                      <th style="width: 80%;">Lista de Preguntas</th>
                      <th style="width: 20px;">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(quest,index) in questions" >
                      <th><input type="text" v-model="quest.displayName" class="form-control col-md-7 col-xs-12"></th>
                      <th style="width: 20px;">
                        <button style="margin-bottom: 0px;" @click="updateQuestion(quest)" type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" title="Actualizar pregunta" ><i class="icon-pencil"></i></button> 
                        <span data-toggle="modal" data-target=".modal-delete-team"><button style="margin: 0px;" @click="prepareDeleteQuestion(quest)" type="button" class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="icon-trash"></i></button></span>
                      </th>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".question-modal" data-toggle="modal" class="btn btn-default">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin Preguntas -->
       <!--Modal Delete Question-->
      <div class="modal fade modal-delete-question" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar Pregunta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que deseas eliminar la pregunta? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                <button @click="deleteQuestion()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal Delete Team-->
      <div class="modal fade modal-delete-team" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar equipo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Este cambio no se podrá revertir, ¿seguro que quieres continuar?.
            </div>
            <div class="modal-footer">
              <center>
                  <button type="button" @click="closeModalSafety('.modal-delete-team')" class="btn btn-primary">Cancelar</button>
                  <button @click="deleteTeam()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Fin modal delete team-->
      <!--Modal Delete Competence-->
      <div class="modal fade modal-delete-competence" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Desasociar Competencia</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              La competencia quedará desasociada al proyecto para {{selectedProjectCompetence.isEnrollment == true ? 'inscripción':'seguimiento'}}.
            </div>
            <div class="modal-footer">
              <center>
                  <button type="button" @click="closeModalSafety('.modal-delete-competence')" class="btn btn-primary">Cancelar</button>
                  <button @click="deleteProjectCompetence()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal Delete Project-->
      <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar proyecto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar al proyecto? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                <button @click="deleteProject()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal not-->
        <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" > {{formNot.title}} </h5>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">{{formNot.message}}</div>
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
  </div>
</template>

<script>
  import MasterTemplate from 'mowi-master';
  import DatePicker from 'v-calendar/lib/components/date-picker.umd'
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  import moment from 'moment';
  import SearchInput from "./../../components/searcherComponent.vue";
  import Treeselect from '@riophae/vue-treeselect';
  import "regenerator-runtime/runtime";
  import XLSX from './../../components/xlsx/xlsx.js';

  const uuidv1 = require('uuid/v1');

export default {
    name: "projectsContainer",
    components: {
      LoadingComponent,
      inputMaf,
      SearchComponent,
      MasterTemplate, 
      DatePicker,
      SearchInput,
      Treeselect,
    },
    data: () => ({
      valueConsistsOf: 'ALL_WITH_INDETERMINATE',
      //workshopTree
      workshopsTree:[],
      workshopsTreeMath:[],
      workshopConfigurationJson:{
        workshopsCustom:{},
        workshopsMath:{}
      },
      treeLevel2:[],
      treeLevel3:[],
      classroom:[],
      newRegisters: [],
      ///
      isLoading: false,
      form: {},
      masks: {
        input: 'DD/MM/YYYY',
      },
      //Questions
      questions: [],
      question: {},
      selectedQuestion: {},
      //Formularios
      formType: '',
      formNot:{title:'',message:'',},
      //Tablas
      colum:[],
      //Competencias
      competencies: [],
      selectedCompetence: '',
      weight: null,
      isEnrollment: '',
      selectedProjectCompetence: '',
      //Equipos:
      newTeam: {},
      selectedTeam: '',
      //Proyectos
      projects: [],
      propsProjects: {
        filters: [              
          {
            name:'name',
            filterType:'inputComponent',
            type:"text",
            valueInput: "",
            etiqueta: true,
            label: "Nombre del proyecto",              
            validation:{},
            callbackData:"",
            textArea:false,
            operators:true,
            selectField:true,
            isRequired :false, 
            showOp: false,             
          },
          {
            name:'desktopDescription',
            filterType:'inputComponent',
            type:"text",
            valueInput: "",
            etiqueta: true,
            label: "Descripción",              
            validation:{},
            callbackData:"",
            textArea:false,
            operators:true,
            selectField:true,
            isRequired :false,  
            showOp: false,            
          },
        ],
      },
      useMassiveSelector:false,
      titleTable: '', //No tiene efecto
      showSearchSection: true,  
      searchOptionTableMaf: false,
      arrayFormattedProjects:[],
      documentsProject:[],
      formDoc:{},
      projectSelected:{},
      auxDoc:{url:'', formData:{}}
    }),
    
    async created () {
      this.isLoading = true
      //Cargar array projects
      this.projects = await this.getProjects({})
      this.questions = await this.getQuestions()
      this.competencies = await this.getCompetencies()
      //Setear la cabecera de la tabla
      this.setHeadTable();
      //Poblar la tabla del componente Mowi
      this.$refs.mowiMaster.setInitialData(this.projects)
      await this.getWorkshopTree()
      await this.getWorkshopTreeMath()
      this.isLoading = false
      $(document).on('hidden.bs.modal', '.modal', function () {
      $('.modal:visible').length && $(document.body).addClass('modal-open');
});
    },
    
    methods: {
      setHeadTable() {
        this.colum = [
            {name:'name', label: 'Proyecto', find:1, sort:1},
            {name:'faceToFace', label: 'Presencial', find:1, sort:1},
            {name:'desktopName', label: 'Nombre público', find:1, sort:1},
            {name:'desktopDescription', label: 'Descripción', find:1, sort:1},
            {name:'creationDate', label: 'Fecha de creación', find:1, sort:1},
            {name:'desktopUrl', label: 'Video informativo', find:1, sort:1},
            {name:'actions', label: 'Acciones', find:0, sort:0},]
        this.titleTable = "Resultados";
      },
      async getWorkshopTree(){
        
        this.treeLevel2 = []
        this.treeLevel3 = []
        var ids = [17,13,10]
        var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
        console.log('arrayMaster :::::: ', arrayMasters[19].parentCode[0])
        this.workshopsTree = []
        var level1 = []
        var level2 = []
        var level3 = []

        //nivel 3 
        var id = 0
        for (var h = 0; h < arrayMasters.length; h++) {
          
          if(arrayMasters[h].idMaster == 10 ){
            var obj = {}
            obj.id = id+1
            obj.father = ''
            obj.code =  arrayMasters[h].code
            obj.label = arrayMasters[h].displayValue              
            level3.push(obj)
          }     
          id += 1 
        }

        var auxLevel3 = []
  
        for (var i = 0; i < arrayMasters.length; i++) {
          if (arrayMasters[i].idMaster == 17 ) {
            var obj = {}
            obj.id = arrayMasters[i].code
            obj.label = arrayMasters[i].displayValue  
            obj.children = []
            level1.push(obj)
          }
          if(arrayMasters[i].idMaster == 13 && arrayMasters[i].code != 'WORKSHOP_OTHER' ){
            var obj = {}
            var level3N = _.cloneDeep(level3)
            obj.id = arrayMasters[i].code
            obj.label = arrayMasters[i].displayValue  

            for (var t = 0; t < level3N.length; t++) {
              level3N[t].id = level3N[t].id + '_'+arrayMasters[i].code
              level3N[t].father = arrayMasters[i].code
              auxLevel3.push(level3N[t])
            }

            obj.children = level3N
            obj.parent =  arrayMasters[i].parentCode[0]
            level2.push(obj)
          }          
        }

        for (var j = 0; j < level1.length; j++) {
          for (var k = 0; k < level2.length; k++) {            
            if(level2[k].parent == level1[j].id){
              level1[j].children.push(level2[k])
            } 
          }             
        }

        this.workshopsTree = _.cloneDeep(level1)

        ///Clonar
        this.treeLevel2 = _.cloneDeep(level2)
        this.treeLevel3 = _.cloneDeep(auxLevel3)
        

        console.log('arrayMasters ::::', arrayMasters)
        console.log('tree 2 ::::::', this.treeLevel2)
        console.log('tree 3 ::::::', this.treeLevel3)

      },

      async getWorkshopTreeMath(){     


        var ids = [11,12]
        var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
        this.classrooms = []

        this.workshopsTreeMath = []
        var grades = []
        var classroomsArray = []

        //classroomsArray
        var id = 0
        for (var h = 0; h < arrayMasters.length; h++) {          
          if(arrayMasters[h].idMaster == 12 ){
            var obj = {}
            obj.id = id+1
            obj.code =  arrayMasters[h].code
            obj.label = arrayMasters[h].displayValue     
            obj.classroom = ''         
            classroomsArray.push(obj)
          }     
          id += 1 
        }

  
        for (var i = 0; i < arrayMasters.length; i++) {
          if (arrayMasters[i].idMaster == 11 ) {
            var obj2 = {}
            obj2.id = arrayMasters[i].code
            obj2.label = arrayMasters[i].displayValue  
            obj2.children = []
            for (var j = 0; j < classroomsArray.length; j++) {
               var obj1 = {}
               obj1.id = classroomsArray[j].id + '_'+arrayMasters[i].code
               obj1.code = classroomsArray[j].code
               obj1.label = classroomsArray[j].label
               obj1.grade = arrayMasters[i].code   
               this.classrooms.push(obj1) 
               obj2.children.push(obj1)        
            }     
             grades.push(obj2)        
          }                
        }


        this.workshopsTreeMath = _.cloneDeep(grades)

        console.log('arrayMasters ::::', arrayMasters)
        console.log('workshopsTreeMath ::::::', this.workshopsTreeMath)

      },


      createdRegister(objLevel3){
        console.log('objeLevel3 ', objLevel3)
        var auxTreeLevel3 = _.cloneDeep(this.treeLevel3)
        var auxTreeLevel2 = _.cloneDeep(this.treeLevel2)
        var newRegister ={
          levelCode : '',
          categoryCode : '',
          contentCode : '',
          typeCode : 'WORKSHOP_CUSTOM',
          idTree : objLevel3
        }
        for (var h = 0; h < auxTreeLevel3.length; h++) {
          if (auxTreeLevel3[h].id == objLevel3) {
            console.log('coincidencia ')
            newRegister.levelCode = auxTreeLevel3[h].code 
            newRegister.contentCode = auxTreeLevel3[h].father  
            for (var i = 0; i < auxTreeLevel2.length; i++) {
                if(auxTreeLevel2[i].id == newRegister.contentCode ){
                  newRegister.categoryCode = auxTreeLevel2[i].parent
                }          
            }         
          }          
        }
        return newRegister
        
      },

      /**
      *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
      *  el formato es definido por el programador
      *  se envía al componente <MasterTemplate> en la propiedad setDataTable
      *  */ 
      setDataTable(projects){
        var ctx = this;
        var formattedProjects = [];
        projects.forEach(item => {
          var project = {};
          project.actions = (
            <div class="d-flex justify-content-around">
              <div class="btn-group" role="group">
                <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Acciones
                </button>
                
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".master-modal">Editar</a>
                  <a class="dropdown-item" onClick={()=>ctx.showCompetenciesModal(item)} data-toggle="modal" data-target=".competencies-modal">Ver Competencias</a>
                  <a class="dropdown-item" onClick={()=>ctx.showDocumentsModal(item)} data-toggle="modal" data-target=".documents-modal">Gestionar documentos</a>
                  <a class="dropdown-item" href={ `/dashboard/calendarioGDC?idProject=${item.id}` } target="_newtab">Ver Cronograma</a>
                  {
                    item.projectType == 'VOLUNTEER_PROJECT' ? <a class="dropdown-item" onClick={()=>ctx.showTeamsModal(item)} data-toggle="modal" data-target=".teams-modal">Ver Equipos</a> : null
                  }
                  <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                </div>
              </div>
            </div>
          );
          var name = item.name
          var faceToFace = item.faceToFace
          var desktopName = item.desktopName
          var desktopDescription = item.desktopDescription
          var creationDate = item.creationDate
          var desktopUrl = item.desktopUrl
          // console.log('VOLUNTEER_PROJECT')
          project.name = name;
          faceToFace ? project.faceToFace = 'Sí' : project.faceToFace = 'No';
          project.desktopName = desktopName;
          project.desktopDescription = desktopDescription;
          project.creationDate = creationDate;
          desktopUrl ? project.desktopUrl = (<div>
            <a href={desktopUrl} target="_blank">Ver</a>
          </div>) : null
          formattedProjects.push(project);
        }); 
        this.arrayFormattedProjects = formattedProjects
        return formattedProjects
      },

      /**
      *  La función getQuestions() es la encargada de la búsqueda de preguntas de examen psicométrico
      *  */ 
      async getQuestions() {
        var questions = []
        questions = await consultServices('getQuestions','POST',{});  
        // /**consultar servicio con el objeto filter  */
        // /**retornar el nuevo arreglo */
        return questions
      },

      /**
       * Este método se ejecuta cuando se selecciona una competencia en el buscador
      */
      competenceSelected(item) {
        console.log('competenceSelected')
      },

      /**
      *  La función getCompetencies() es la encargada de listar las competencias disponibles
      */ 
      async getCompetencies() {
        var competencies = []
        competencies = await consultServices('getCompetencies','POST', {});  
        if(competencies.message){
          this.formNot.title = "Error consultando competencias";
          this.formNot.message = competencies.message; 
          this.showNotificacion();
        }
        return competencies
      },

      /**
      *  La función getProjects() es la encargada de la búsqueda de registros
      *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
      *  */ 
      async getProjects(selectedFilters) {
        var look = []
        // if(selectedFilters != null || selectedFilters != undefined){
        /**variables declaradas para el funcionamiento de la función */
        var filters = {}
        /**
         * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
         */
        var name =_.filter(selectedFilters,{'name':'name'});
        var faceToFace =_.filter(selectedFilters,{'name':'faceToFace'});
        var desktopDescription =_.filter(selectedFilters,{'name':'desktopDescription'});
        // var creationDate =_.filter(selectedFilters,{'name':'creationDate'}); 
        /**obtener los valores y agregarlos en el objeto filter */
        name.length > 0 ?  filters.name = name[0].value : null
        faceToFace.length > 0 ?  filters.faceToFace = faceToFace[0].value : null
        desktopDescription.length > 0 ?  filters.desktopDescription = desktopDescription[0].value : null
        // creationDate.length > 0 ?  filters.creationDate = creationDate[0].value : null

        // console.log('filters obtenido ', filters)
        look = await consultServices('searchProjects','POST',filters);  
        // /**consultar servicio con el objeto filter  */
        // /**retornar el nuevo arreglo */
        return look
      },
      async showNotificacion(isSucces=true){
        $('.bs-example-modal-not').modal('show');
      },

      async updateProject() {
        this.isLoading=true;

        this.workshopConfigurationJson.workshopsCustom={}       
        this.workshopConfigurationJson. workshopsMath={}

        var project = {}
        project.projectType = this.form.projectType
        project.id = this.form.id;
        project.name = this.form.name;
        project.faceToFace = this.form.faceToFace;
        project.desktopName = this.form.desktopName;
        project.desktopUrl = this.form.desktopUrl;
        project.attachmentUrl = this.form.attachmentUrl;
        project.desktopDescription = this.form.desktopDescription; 
        project.taskDescription = this.form.taskDescription;
        project.taskDeadline = this.form.taskDeadline ? project.taskDeadline = moment(this.form.taskDeadline).utcOffset('-0500').valueOf() : null
        project.enrollDeadline = this.form.enrollDeadline ? project.enrollDeadline = moment(this.form.enrollDeadline).utcOffset('-0500').valueOf() : null

        console.log('form:::::::::::::: ', this.form)
        //Json con el arreglo de combinaciones
        if(this.form.workshopTree != null  ){

          var workshopsCustom= []
          console.log('arbol obtenido', this.form.workshopTree)

          var selected = _.cloneDeep(this.form.workshopTree)
          var newRegisters =[]
          for (var m = 0; m < selected.length; m++) {
            var register = this.createdRegister(selected[m])
            console.log('register ', register)
            register.levelCode !='' ? newRegisters.push(register) : null 
          }
          
          this.workshopConfigurationJson.workshopsCustom =  _.cloneDeep(newRegisters)
          console.log('registros nuevos custom', newRegisters)

          project.workshopConfiguration = _.cloneDeep(this.workshopConfigurationJson)
        }

        if(this.form.workshopTreeMath != null  ){

          var workshopsMath= []
          console.log('arbol obtenido', this.form.workshopTreeMath)

          var selected = _.cloneDeep(this.form.workshopTreeMath)
          for (var m = 0; m < selected.length; m++) {

            for (var p = 0; p < this.classrooms.length; p++) {
              if(this.classrooms[p].id == selected[m]){
                  var newObj ={}
                  newObj.classroomCode = this.classrooms[p].code
                  newObj.gradeCode = this.classrooms[p].grade
                  newObj.idTree = this.classrooms[p].id
                  workshopsMath.push(newObj)
              }              
            }

          }
          
          this.workshopConfigurationJson.workshopsMath =  _.cloneDeep(workshopsMath)
          console.log('registros nuevos math', workshopsMath)

          project.workshopConfiguration = _.cloneDeep(this.workshopConfigurationJson)
        }


        console.log('project update ', project)

        if(project.id && project.name && project.desktopName){
          const projectUpdated = await consultServices('updateProject','POST',project);
          if(!projectUpdated.message){
            this.formNot.title="Operación exitosa";
            this.formNot.message="Se actualizaron los datos del proyecto de manera correcta";  
            this.limpiarForm();
            $('.modal').modal('hide');
            var projects = await this.getProjects({})
            this.refreshData(projects);
          }else{
            this.formNot.title="Error en operación";
            this.formNot.message=creditUpdated.message;  
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }


        this.isLoading=false;
        this.showNotificacion();
      },

      /**
       * assignCompetence: Permite asociar una competencia a un proyecto
      */
      async assignCompetence() {
        //Validamos
        if(this.selectedCompetence.id != null && this.isEnrollment != '' || this.weight != null){
          this.isLoading = true;
          var comp = this.selectedCompetence
          //1. Verificamos si la competencia existe
          if(comp.id == 999999){
            //Es nueva, procedemos a crearla
            let temp = {name: comp.name}
            const newComp = await consultServices('createCompetence', 'POST', temp); 
            if(newComp.message){
              this.formNot.title = "No fue posible crear la competencia";
              this.formNot.message = newComp.message;
              this.showNotificacion();
            }else{
              console.log('Competencia creada: ', newComp)
              //Procedemos a asignarla:
              await this.assignCompetenceAux(newComp)
            }
          }else{
            await this.assignCompetenceAux(comp)
          }
        }
        
        this.isLoading=false;
      },

      /**
       * createTeam: Permite crear un equipo nuevo a un proyecto.
      */
      async createTeam() {
        //Validamos
        if(this.newTeam.name != null && this.newTeam.capacity != null){
          //Mostramos cargando
          this.isLoading = true;
          const team = {
            name: this.newTeam.name,
            capacity: this.newTeam.capacity,
            idFather: this.form.id, // id del proyecto actual
          }

          const createdTeam = await consultServices('createTeam', 'POST', team);
          if(createdTeam.message){
              this.formNot.title = "No fue posible crear el equipo";
              this.formNot.message = createdTeam.message;
              this.showNotificacion();
            }else{
              console.log('Equipo creada: ', createdTeam)
              this.newTeam = {}
              const projects = await this.getProjects({})
              this.refreshData(projects);
              this.form = await consultServices('getProject ','POST', {id: this.form.id})
            }
          //ocultamos cargando
          this.isLoading = false;
        }
      },

      /**
       * assignCompetenceAux: Función auxiliar de assignCompetence. Asigna la competencia
      */
      async assignCompetenceAux(comp) {
        let temp = {
          id: this.form.id,
          idCompetence: comp.id,
          isEnrollment: this.isEnrollment,
          weight: this.weight
        }
        const assignedComp = await consultServices('assignCompetence', 'POST', temp); 
        if(assignedComp.message){
          this.formNot.title = "No fue posible asociar la competencia";
          this.formNot.message = assignedComp.message;
          this.showNotificacion();
        }else{
          this.selectedCompetence = ''
          this.isEnrollment = ''
          this.weight = null
          this.$refs.competencies.cleanText()
          const projects = await this.getProjects({})
          this.refreshData(projects);
          this.form = await consultServices('getProject ','POST', {id: this.form.id  })
          this.competencies = await this.getCompetencies()
        }
      },
      /**
       * createQuestion: Permite crear una nueva pregunta
      */
      async createQuestion() {
        this.isLoading = true;
        var quest = {}

        quest.displayName = this.question.displayName;
        const createdQuestion = await consultServices('createQuestion','POST',quest);     
        if(!createdQuestion.message){
          this.limpiarFormQuestion();
          this.questions = await this.getQuestions()
        }else{
          this.formNot.title = "No fue posible realizar el registro";
          this.formNot.message = createdQuestion.message;
          this.showNotificacion();
        }
        this.isLoading=false;
      },
      
      /**
       * createProject: Registra un nuevo proyecto
      */
      async createProject() {
        this.isLoading=true;
        var project = {}

        project.name = this.form.name
        project.projectType = this.form.projectType
        project.faceToFace = this.form.faceToFace 
        project.desktopName = this.form.desktopName
        project.desktopUrl = this.form.desktopUrl ? project.desktopUrl = this.form.desktopUrl: null ;
        this.form.attachmentUrl ? project.attachmentUrl = this.form.attachmentUrl: null ;
        project.desktopDescription = this.form.desktopDescription ? project.desktopDescription = this.form.desktopDescription: null ;
        project.taskDescription = this.form.taskDescription ? project.taskDescription = this.form.taskDescription: null ; 
        project.taskDeadline = this.form.taskDeadline ? project.taskDeadline = moment(this.form.taskDeadline).utcOffset('-0500').valueOf() : null
        project.enrollDeadline = this.form.enrollDeadline ? project.enrollDeadline = moment(this.form.enrollDeadline).utcOffset('-0500').valueOf() : null
        
        //Json con el arreglo de combinaciones
        // if(this.form.workshopTree != null){

        //   var workshopConfiguration ={workshopsCustom: []}
        //   console.log('arbol obtenido', this.form.workshopTree)

        //   var selected = _.cloneDeep(this.form.workshopTree)
        //   var newRegisters =[]
        //   for (var m = 0; m < selected.length; m++) {
        //     var register = this.createdRegister(selected[m])
        //     console.log('register ', register)
        //     register.levelCode !='' ? newRegisters.push(register) : null 
        //   }
          
        //   workshopConfiguration.workshopsCustom =  _.cloneDeep(newRegisters)
        //   console.log('registros nuevos ', newRegisters)

        //   project.workshopConfiguration = workshopConfiguration
        // }
          
        console.log('form:::::::::::::: ', this.form)
        //Json con el arreglo de combinaciones
        if(this.form.workshopTree != null  ){

          var workshopsCustom= []
          console.log('arbol obtenido', this.form.workshopTree)

          var selected = _.cloneDeep(this.form.workshopTree)
          var newRegisters =[]
          for (var m = 0; m < selected.length; m++) {
            var register = this.createdRegister(selected[m])
            console.log('register ', register)
            register.levelCode !='' ? newRegisters.push(register) : null 
          }
          
          this.workshopConfigurationJson.workshopsCustom =  _.cloneDeep(newRegisters)
          console.log('registros nuevos custom', newRegisters)

          project.workshopConfiguration = _.cloneDeep(this.workshopConfigurationJson)
        }

        if(this.form.workshopTreeMath != null  ){

          var workshopsMath= []
          console.log('arbol obtenido', this.form.workshopTreeMath)

          var selected = _.cloneDeep(this.form.workshopTreeMath)
 
          for (var m = 0; m < selected.length; m++) {

            for (var p = 0; p < this.classrooms.length; p++) {
              if(this.classrooms[p].id == selected[m]){
                  var newObj ={}
                  newObj.classroomCode = this.classrooms[p].code
                  newObj.gradeCode = this.classrooms[p].grade
                  newObj.idTree = this.classrooms[p].id
                  workshopsMath.push(newObj)
              }              
            }

          }
          
          this.workshopConfigurationJson.workshopsMath =  _.cloneDeep(workshopsMath)
          console.log('registros nuevos math create', workshopsMath)

          project.workshopConfiguration = this.workshopConfigurationJson
        }

        console.log('project ::::::::::', project)
        if(project.name && project.desktopName){
          const projectUpdated = await consultServices('createProject','POST', project);
          if(!projectUpdated.message){
            this.formNot.title="Operación exitosa";
            this.formNot.message="Se ha creado el proyecto de manera correcta";  
            this.limpiarForm();
            $('.modal').modal('hide');
            var projects = await this.getProjects({})
            this.refreshData(projects);
          }else{
            this.formNot.title="Error en operación";
            this.formNot.message=creditUpdated.message;  
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
        this.isLoading=false;
        this.showNotificacion();
      },

      /**
       * deleteQuestion: Permite eliminar el proyecto seleciconado en this.form
      */
      async deleteQuestion() {
        this.isLoading=true;
        var question = {}
        question.id = this.selectedQuestion.id;
        const response0 = await consultServices('deleteQuestion','POST', question);
        this.isLoading=false;
        if(!response0.message){
          this.questions = await this.getQuestions()
        }else{
          this.formNot.title = "No fue posible realizar eliminar la pregunta.";
          this.formNot.message = response0.message;
          this.showNotificacion();
        }
      },

      /**
       * deleteTeam: Permite eliminar un equipo específico
      */
      async deleteTeam() {
        this.isLoading=true;
        var temp = {}
        temp.id = this.selectedTeam.id;
        const response0 = await consultServices('deleteProject','POST', temp);
        this.isLoading=false;
        if(!response0.message){
          const projects = await this.getProjects({})
          this.refreshData(projects);
          this.form = await consultServices('getProject ','POST', {id: this.form.id  })
        }else{
          this.formNot.title = "No fue posible eliminar el equipo.";
          this.formNot.message = "Ocurrió un error, por favor intenta más tarde.";
          this.showNotificacion();
        }
      },
     

      /**
       * deleteProjectCompetence: Permite eliminar la competencia del proyecto seleccionado
      */
      async deleteProjectCompetence() {
        this.isLoading=true;
        var projComp = {}
        projComp.id = this.selectedProjectCompetence.id;
        const response0 = await consultServices('deleteProjectCompetence','POST', projComp);
        this.isLoading=false;
        if(!response0.message){
          const projects = await this.getProjects({})
          this.refreshData(projects);
          this.form = await consultServices('getProject ','POST', {id: this.form.id  })
        }else{
          this.formNot.title = "No fue posible desasociar la competencia.";
          this.formNot.message = response0.message;
          this.showNotificacion();
        }
      },

      closeModalSafety(css) {
        $(css).modal('hide');
      },

      /**
       * SE USA? deleteCompetence: Permite eliminar el proyecto seleciconado en this.form
      */
      // async deleteCompetence() {
      //   this.isLoading=true;
      //   var competence = {}
      //   competence.id = this.selectedQuestion.id;
      //   const response0 = await consultServices('deleteCompetence','POST', competence);
      //   this.isLoading=false;
      //   if(!response0.message){
      //     // this.questions = await this.getQuestions()
      //   }else{
      //     this.formNot.title = "No fue posible realizar eliminar la competencia.";
      //     this.formNot.message = response0.message;
      //     this.showNotificacion();
      //   }
      // },

      /**
       * deleteProject: Permite eliminar el proyecto seleciconado en this.form
      */
      async deleteProject() {
        this.isLoading=true;
        var project = {}
        project.id = this.form.id;
        const deletedProject = await consultServices('deleteProject','POST',project);
        this.isLoading=false;
        if(!deletedProject.message){
          this.formNot.title="Operación exitosa";
          this.formNot.message="El proyecto fue eliminado";
          const response = await this.getProjects({})
          this.refreshData(response);
        }else{
            this.formNot.title = "No fue posible eliminar el proyecto";
            this.formNot.message = deletedProject.message;
         }
        this.showNotificacion();
      },

      showDeleteModal(item) {
        this.formType = "DELETE";
        this.form = _.cloneDeep(item);
      },

      async updateQuestion(item) {
        this.isLoading=true;
        var temp = {}
        temp.id = item.id;
        temp.displayName = item.displayName;

        if(temp.id && temp.displayName ){
          const updatedQuestion = await consultServices('updateQuestion','POST', temp);
          if(!updatedQuestion.message){
            this.questions = await this.getQuestions()
          }else{
            this.formNot.title = "No fue posible realizar la pregunta";
            this.formNot.message = updatedQuestion.message;
            this.showNotificacion();
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
        this.isLoading=false;
      },

      /**
       * updateTeam: Permite actualizar los datos de un equipo específico
      */
      async updateTeam(team) {
        var temp = {}
        temp.id = team.id;
        temp.capacity = team.capacity;
        temp.name = team.name;
        console.log('temp: ', temp)
        if(temp.id && temp.capacity && temp.name ){
          this.isLoading=true;
          const projectUpdated = await consultServices('updateProject','POST', temp);
          this.isLoading=false;
          if(!projectUpdated.message){
            const projects = await this.getProjects({})
            this.refreshData(projects);
            this.form = await consultServices('getProject ','POST', {id: this.form.id})
          }else{
            this.formNot.title = "No fue posible realizar la pregunta";
            this.formNot.message = projectUpdated.message;
            this.showNotificacion();
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
      },

      async updateProjectCompetence(item) {
        console.log('item  ', item)
        this.isLoading=true;
        var temp = {}
        temp.id = item.id;
        temp.weight = item.weight;
        if(temp.id && temp.weight ){
          const updateProjectCompetence = await consultServices('updateProjectCompetence','POST', temp);
          if(!updateProjectCompetence.message){
            // this.questions = await this.getQuestions()
          }else{
            this.formNot.title = "No fue posible realizar la pregunta";
            this.formNot.message = updateProjectCompetence.message;
            this.showNotificacion();
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
        this.isLoading=false;
      },

      prepareDeleteQuestion(item) {
        this.selectedQuestion = _.cloneDeep(item);
      },

      prepareDeleteProjectCompentece(item) {
        this.selectedProjectCompetence = _.cloneDeep(item);
      },
      prepareDeleteTeam(item) {
        this.selectedTeam = _.cloneDeep(item);
      },

      setForm(item) {
        this.form = _.cloneDeep(item);
      },
      showAddModal() {
        this.formType = "ADD";
        this.clearModal()
        //this.form.workshopTree = ["1_WORKSHOP_ART", "3_WORKSHOP_ECOLOGY_2"]
      },

      clearModal(){
        console.log('clearModal')
        this.form = {};
        this.$refs.projectName ? this.$refs.projectName.clearValue() : null;
        this.$refs.desktopName ? this.$refs.desktopName.clearValue() : null;
        this.$refs.desktopDescription ? this.$refs.desktopDescription.clearValue() : null;
        this.$refs.taskDescription ? this.$refs.taskDescription.clearValue() : null; 
        this.$refs.desktopUrl ? this.$refs.desktopUrl.clearValue() : null;
        this.$refs.attachmentUrl ? this.$refs.attachmentUrl.clearValue() : null;
      },

      showQuestionModal() {
        this.question = {};
      },

      showTeamsModal(item) {
        console.log('Vamos a mostrar: ', item)
        this.form = _.cloneDeep(item);
        this.selectedTeam = '';
        this.newTeam = {};
      },

      showCompetenciesModal(item) {
        this.form = _.cloneDeep(item);
        this.selectedCompetence = '';
        this.selectedProjectCompetence = '';
        this.isEnrollment = '';
      },
      async showDocumentsModal(item){
        this.isLoading = true
        console.log('showDocumentsModal ', item)
        //limpiar todos los form y arrays
        this.documentsProject = []
        this.formDoc.name = null
        this.formDoc.idSchool = null
        this.formDoc.url = null
        document.getElementById("uploadInputFile").value = "";
        //capturar proyecto seleccionado
        this.projectSelected = _.cloneDeep(item)
        //Listar documentos
        var arrayDocs =  await consultServices('getDocumentsProject','POST',{idProject:item.id});
        console.log('documentsProject ', this.documentsProject)
        this.documentsProject = _.cloneDeep(arrayDocs)
        this.isLoading = false
      },
      
      limpiarForm() {
        //Para limpiar los campos que usan inputMaf, primero validar que exista, luego invocar la prop clearValue()
        this.form = {}
        this.$refs.projectName ? this.$refs.projectName.clearValue() : null;
        this.$refs.desktopName ? this.$refs.desktopName.clearValue() : null;
        this.$refs.desktopDescription ? this.$refs.desktopDescription.clearValue() : null;
        this.$refs.desktopUrl ? this.$refs.desktopUrl.clearValue() : null;
        this.$refs.attachmentUrl ? this.$refs.attachmentUrl.clearValue() : null;
      },

      limpiarFormQuestion() {
        //Para limpiar los campos que usan inputMaf, primero validar que exista, luego invocar la prop clearValue()
        this.$refs.questionDisplayName ? this.$refs.questionDisplayName.clearValue() : null;
      },
      
      async refreshData(response){
        this.$refs.mowiMaster.setInitialData(response)
      },
      async showEditModal(item) {
        this.formType = "EDIT";
        this.form = _.cloneDeep(item);
        this.form.taskDeadline = moment(item.taskDeadline).utcOffset('-0500').toDate();
        this.form.enrollDeadline = moment(item.enrollDeadline).utcOffset('-0500').toDate();
        this.projects = (this.form.projects||[]);

        //Preparar la configuración de talleres
        if (item.workshopConfiguration != null) {

          if(item.workshopConfiguration.workshopsCustom){
            if(item.workshopConfiguration.workshopsCustom){
              console.log('item.workshopConfiguration.workshopsCustom ', item.workshopConfiguration.workshopsCustom )
              var idsOptions = []
              for (var k = 0; k < item.workshopConfiguration.workshopsCustom.length; k++) {
                idsOptions.push(item.workshopConfiguration.workshopsCustom[k].idTree)            
              }
              this.form.workshopTree = idsOptions
            }  
          }

          if(item.workshopConfiguration.workshopsMath){
            if(item.workshopConfiguration.workshopsMath){
              console.log('item.workshopConfiguration.workshopsMath ', item.workshopConfiguration.workshopsMath )
              var idsOptionsMath = []
              for (var k = 0; k < item.workshopConfiguration.workshopsMath.length; k++) {
                idsOptionsMath.push(item.workshopConfiguration.workshopsMath[k].idTree)            
              }
              this.form.workshopTreeMath = idsOptionsMath
            }
          }
        
        }else{
          this.form.workshopTree = []
          this.form.workshopTreeMath = []
        }

        console.log('this.form.workshopTree ',this.form.workshopTree )
        console.log('this.form.workshopTreeMath ',this.form.workshopTreeMath )
      },
      /**
       * setContentListComponent() :   permite setear los valores de los atributos de propsTemplateManangerOrder
       */
      async setContentListComponent(){
        console.log('setContentListComponent')
        //Variables útiles para actualizar el contenido de los listComponents de la sección de búsqueda
        optionList = [{
          value: true,
          label: 'Sí'
        },
        {
          value: false,
          label: 'No'
        }]
        await this.$refs.mowiMaster.setContentListComponent(optionList, 'faceToFace')  
      },
      /**
       * saveOnDo() : permite subir un documento en Digital Ocean y crear  el registro en postgres
       * url: url donde su subirá el doc (DO)
       * formData: documento subido 
       * form: es el json que se envía al servicio createDocument()
       */
      async saveOnDo(url,formData, form ){
        this.isLoading = true
        var urlFinal= '0'
        fetch(url, {
          method:'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
              response.json()
              .then(async data => {
                if(data.error){
                    this.formNot.title = "Error subiendo archivo";
                    this.formNot.message = "No se puedo subir el archivo"
                    this.showNotificacion() 
                }else{
                  form.url= data.generatedUrl
                  //crear doc
                  var newDoc =  await consultServices('createDocument','POST',form);
                  if(newDoc.id){
                    //actualizar lista de docs
                    var respDocs =  await consultServices('getDocumentsProject','POST',{idProject:this.projectSelected.id});
                    this.documentsProject = _.cloneDeep(respDocs)  
                    //limpiar formDoc
                    this.formDoc.name = null
                    this.formDoc.url = null
                    this.formDoc.idSchool = null
                    this.auxDoc.UploadUrl = null
                    this.auxDoc.formData = null
                    document.getElementById("uploadInputFile").value = "";
                    this.formNot.title = "Operación existosa";
                    this.formNot.message = "Se subió el archivo"
                    this.showNotificacion() 
                  }else{
                    this.formNot.title = "Error subiendo archivo";
                    this.formNot.message = "No se puedo subir el archivo"
                    this.showNotificacion()           
                  }                   
                }
              })
          }
        })
        this.isLoading = false
      },

      //Manejamos cuando el usuario elige un archivo de su ordenador
      async handleFileUpload(e){
        //test
        //seteamos variable local
        const urlSufix = 'projects/'+ this.projectSelected.id  +'/attachments/'// Folder destino del archivo
        this.isLoading = true;
        var formData = new FormData();
        formData.append('file',e.target.files[0])
        var nameAux = e.target.files[0].name

        var url = 'upload/uploadAttachment?urlSufix='+urlSufix+ `&fileName=`+ nameAux     
        console.log("url:::::", url);
        console.log("formData:::::", formData);
        this.auxDoc.UploadUrl = url
        this.auxDoc.formData = formData
        this.isLoading = false;

      },
      /**
       * addDocument(): guardar documento en DO y en postgresql 
       */
      async addDocument(){
        console.log('entró a addDoc', this.formDoc)
        if(this.formDoc.name == null || this.auxDoc.UploadUrl == null ){
          this.formNot.title = "Campos incompletos";
          this.formNot.message = "Complete todos los campos para cargar un documento"
          this.showNotificacion()
        }else{
          //usar saveDoc para guardar en DO y Postgre
          var form={}
          form.idSchool = this.projectSelected.id 
          form.url= '' //this.formDoc.url
          form.name = this.formDoc.name
          console.log('form new ', form)

          //subir a digital ocean
          await this.saveOnDo(this.auxDoc.UploadUrl, this.auxDoc.formData, form)                         
      
        }
      },
      /**
       * updateDoc: Actualiza documento y la lista de docs por proyecto
       */
      async updateDoc(doc){
        console.log('doccccccccccccc', doc )
        this.isLoading = true
        //actualizar doc
        var updDoc =  await consultServices('updateDocument','POST',{id:doc.id , name:doc.name});
        //actualizar lista de docs
        var respDocs =  await consultServices('getDocumentsProject','POST',{idProject:this.projectSelected.id});
        this.documentsProject = _.cloneDeep(respDocs)
        this.isLoading = false
      },
      async setInactiveDoc(doc){
        this.isLoading = true
        //actualizar doc
        var updDoc =  await consultServices('updateDocument','POST',{id:doc.id ,setInactive:true});
        //actualizar lista de docs
        var respDocs =  await consultServices('getDocumentsProject','POST',{idProject:this.projectSelected.id});
        this.documentsProject = _.cloneDeep(respDocs)
        this.isLoading = false
      }
    }
    }
</script>
