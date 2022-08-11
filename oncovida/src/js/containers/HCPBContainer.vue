<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Historia Clínica Perinatal Base (HCPB) </h1>
          <div class="nav navbar-right panel_toolbox">
             <button v-if="HCPB.status == 'MONITORING'" @click="redirect('NEW_EMERGENCY',idHCPB)" class="btn btn-success">Registrar Emergencia</button>
             <button v-if="HCPB.status == 'MONITORING'" @click="redirect('NEW_PRENATAL_CONTROL',idHCPB)" class="btn btn-success">Registrar Control Prenatal</button>
             <button data-toggle="modal" data-target=".master-modal-vaccination" class="btn btn-success">Ver cartilla de vacunaciones</button>
             <button data-toggle="modal" data-target=".master-modal" class="btn btn-success">Ver antecedentes médicos</button>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="card-body">  

          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag1" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Datos generales de la gestante</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag1" class="card-collapse collapse in">
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                      
  
                      <form  class="form-horizontal "  > 
                         <div class="row">     
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Doc. Identidad
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control" v-model="pregnant.documentNumber"  readonly>
                                </div>
                              </div>                            
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Apellido Paterno 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="first-name" required="required" class="form-control "  v-model="pregnant.lastName" readonly>
                                </div>
                              </div>
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Edad
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="pregnant.age"  readonly>
                                </div>
                              </div>   
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Apellido Materno 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="pregnant.surName"  readonly>
                                </div>
                              </div>
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Dirección domiciliaria
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="pregnant.address" readonly>
                                </div>
                              </div>   
                              <div  class="item col-md-6 col-sm-12 form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Nombres
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="first-name" required="required" class="form-control "   v-model="pregnant.name" readonly>
                                </div>
                              </div>

                         </div>                           
                      </form>           

                    </div>
                  </div>
              </div>      
          </div>

          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag2" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Datos del Embarazo actual</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag2" class="card-collapse collapse in">
                  <div class="card-body">                                           
                      <div class="row">                  
                        <div class="column" style="padding-bottom:5px; padding-top: 10px;">
                          <div>
                            <form  class="form-horizontal " >  
                                  <div  class="item form-group">
                                    <label class="col-form-label col-md-6 col-sm-12 label-align" for="first-name"> <b> Datos Ginecológicos </b>
                                    </label>
                                  </div>                                             
                                  <div  class="item form-group">
                                    <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Menarquía (edad de la primera menstruación): 
                                    </label>
                                    <div class="col-md-6 col-sm-6 ">                                  
                                      <input type="text" id="last-name" name="last-name" v-model="HCPB.ageMenarche" required="required" class="form-control" readonly>
                                    </div>
                                  </div>
                                  <div  class="item form-group">
                                    <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Edad de primera relación sexual: 
                                    </label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <input type="text" id="last-name" name="last-name" v-model="HCPB.ageFirstSexualExperience" required="required" class="form-control" readonly>
                                    </div>
                                  </div>
                                  <div  class="item form-group">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Último método anticonceptivo usado</label>
                                    <div class="col-md-6 col-sm-6 ">
                                        <!-- <select class="form-control" v-model="HCPB.lastContraceptiveMethod" >
                                                <option value="0">Ninguno</option>
                                                <option value="1">Condón</option>
                                                <option value="2">Óvulo</option>
                                                <option value="3">Inyectable</option>
                                                <option value="4">Pastilla</option>       
                                                <option value="5">Implante</option>
                                                <option value="6">Natural</option>                                 
                                        </select> -->
                                        <input type="text" id="last-name" name="last-name" v-model="HCPB.methodDisplay" class="form-control" readonly>
                                    </div>
                                  </div>            
                                  <div class="item form-group"  v-if="HCPB.havePapSmear == '1'">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">¿Tiene papanicolaou?</label>
                                    <div class="col-md-6 col-sm-6 ">
                                        <select class="form-control" v-model="HCPB.havePapSmear" >
                                                <option value="0">No</option>
                                                <option value="1">Si</option>                               
                                        </select>
                                    </div>
                                  </div>                                     
                                  <div class="item form-group"  v-if="HCPB.havePapSmear == '1'">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Fecha de último papanicolaou</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <Datepicker :format="DatePickerFormat" v-model="HCPB.havePapSmearDate"></Datepicker>
                                    </div>
                                  </div> 
                                  <div class="item form-group"  v-if="HCPB.havePapSmear == '1'">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Resultado papanicolaou</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <textarea id="middle-name" v-model="HCPB.PapSmearResult" class="form-control" type="text" name="middle-name"></textarea>
                                    </div>
                                  </div> 
                                  <div class="item form-group">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">¿Tiene antecedentes de parto pretérmino?</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <input type="text" id="last-name" v-model="HCPB.previousPretermPregnancyD" name="last-name" required="required" class="form-control" readonly>
                                    </div>
                                  </div>   
                                  <div class="item form-group">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">¿Es un embarazo múltiple?</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <input type="text" id="last-name" v-model="HCPB.multiplePregenancyD" name="last-name" required="required" class="form-control" readonly>
                                    </div>
                                  </div>      
                                  <div class="item form-group">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">¿Considera que tiene un alto nivel de estrés durante sus actividades diarias?</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <input type="text" id="last-name" v-model="HCPB.highStressLevelD" name="last-name" required="required" class="form-control" readonly>
                                    </div>
                                  </div>   
                                  <div class="item form-group">
                                    <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">¿Presenta cuello uterino corto?</label>
                                    <div class="col-md-6 col-sm-6 ">
                                      <input type="text" id="last-name" v-model="HCPB.shortUterineNeckD" name="last-name" required="required" class="form-control" readonly>
                                    </div>
                                  </div>                                    
                            </form>
                          </div>       
                        </div>                                                 
                        <div class="column" style="padding-bottom:5px; padding-top: 10px;">
                          <div>
                            <form  class="form-horizontal " >         
                              <div  class="item form-group">
                                <label class="col-form-label col-md-6 col-sm-12 label-align" for="first-name"> <b> Datos generales </b>
                                </label>
                              </div>                    
                              <div class="item form-group">
                                <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Fecha de última menstruación
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <!-- <Datepicker :format="DatePickerFormat" v-model="HCPB.lastDateMenstruation"></Datepicker>  -->                                  
                                   <input type="text" v-model="HCPB.lastDateMenstruationDisplay" id="last-name" name="last-name" required="required" class="form-control" readonly>
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Talla de la gestante (en centímetros) 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" v-model="HCPB.pregnantHeight" id="last-name" name="last-name" required="required" class="form-control" readonly>
                                </div>
                              </div>
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Peso habitual antes del embarazo (en kilogramos)</label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" id="last-name" v-model="HCPB.pregnantWeight" name="last-name" required="required" class="form-control" readonly>
                                </div>
                              </div>           
                              <div v-if="HCPB.status == 'MONITORING'" class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Edad gestacional actual (en semanas)</label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" v-model="HCPB.gestationalAge" name="last-name" required="required" class="form-control" readonly>
                                </div>
                              </div> 
                              <div v-if="HCPB.status == 'MONITORING'" class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Fecha probable del parto</label>
                                <div class="col-md-6 col-sm-6 ">
                                  <Datepicker :format="DatePickerFormat" v-model="HCPB.probableDateBirth" ></Datepicker>
                                </div>
                              </div>          
                            </form>
                          </div>                        
                        </div>
                      </div>                  
                  </div>
                  <div  v-if="HCPB.status == 'MONITORING'" class="modal-footer">
                        <center>
                          <button type="button" @click="updateHCPB()" data-dismiss="modal" class="btn btn-primary">Actualizar</button>
                        </center>
                  </div>      
              </div>     
          </div>

          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag3" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Controles prenatales</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag3" class="card-collapse collapse in">
                  <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">                   
                    <div class="form-group ">          
                      <div id="idAntPersonales" class="card-body" >
                        <div class="table-responsive">
                          <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                          <thead>
                            <tr >
                              <th style="width:15px; text-align: center;vertical-align: middle;">Número de control</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Fecha de atención</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Clasificación del embarazo</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Especialista asignado</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Observación/recomendaciones </th>
                              <th style="width:20px; text-align: center;vertical-align: middle;">Acciones </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,index) in prenatalControls" style="background-color: rgba(0, 0, 0, 0.05);" >
                              <td style="width:15px;" >{{item.numberControl}} </td>    
                              <td >{{item.dateAttentionD}} </td>    
                              <td >{{item.systemDiagnosis}} </td>    
                              <td >{{item.specialistD}} </td>    
                              <td >{{item.recommendations}} </td>    
                              <td style="width:20px;"><button type="button" data-toggle="modal" data-target=".master-prenatal" @click="showData(item, 'PRENATAL')"  class="btn btn-success btn-xs">Ver detalle</button></td>                                                           
                            </tr>
                          </tbody>
                          </table>
                        </div>
                      </div>
                    </div>                         
                  </div>                                                               
              </div>     
          </div>

          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag4" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Emergencias médicas</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag4" class="card-collapse collapse in">
                  <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                   
                    <div class="form-group ">          
                      <div id="idEmergencias" class="card-body" >
                        <div class="table-responsive">
                          <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                          <thead>
                            <tr >
                              <th style="width: 20%;text-align: center;vertical-align: middle;">Fecha de emergencia</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Centro de salud</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Diagnóstico</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">¿Se internó a la gestante?</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">¿Se interrumpió el embarazo?</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">¿Parto pretérmino?</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Observación/ recomendaciones </th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Acciones </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,index) in emergencies" style="background-color: rgba(0, 0, 0, 0.05);" >
                              <td > {{item.dateAttentionD}}  </td>    
                              <td > {{item.clinic}}  </td>  
                              <td >{{item.systemDiagnosis}} </td>    
                              <td >{{item.interPregnantD}} </td>    
                              <td >{{item.terminatePregnancyD}} </td>    
                              <td >{{item.pretermBirthD}} </td>    
                              <td >{{item.recommendations}} </td>  
                              <td ><button type="button" data-toggle="modal" data-target=".master-emergency"  @click="showData(item, 'EMERGENCY')" class="btn btn-success btn-xs">Ver detalle</button></td>                              
                            </tr>
                          </tbody>
                          </table>
                        </div>
                      </div>
                    </div>                         
                  </div>                                                               
              </div>     
          </div>

          <div  v-if="HCPB.status != 'MONITORING'" class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag5" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Término del embarazo</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag5" class="card-collapse collapse in">
                  <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                   
                    <div class="form-group ">          
                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de embarazo</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">                            
                            <input style="text-align: left" type="text" class="form-control" v-model="formT.pregnancyTypeD" readonly >
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Terminación</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                            <input style="text-align: left" type="text" class="form-control" v-model="formT.pregnancyTerminationD" readonly >
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Terminó con un parto pretérmino</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                            <input style="text-align: left" type="text" class="form-control" v-model="formT.pretermBirthD" readonly >
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de parto</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                            <input style="text-align: left" type="text" class="form-control" v-model="formT.dateOfBirthD" readonly >
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Lugar de parto</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                          <input style="text-align: left" type="text" class="form-control" v-model="formT.placeOfBirth" readonly >
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado del neonato</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                          <input style="text-align: left"  type="text" class="form-control" v-model="formT.neonateStatusD" readonly>
                        </div>
                        </div>
                      </div> 

                      <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                        <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Observación</label>
                        <div class="col-md-7 col-sm-6 col-xs-12">
                          <textarea style="text-align: left"  placeholder="Registre tambien el nombre del bebé" type="text" class="form-control" v-model="formT.observation" readonly></textarea>
                        </div>
                        </div>
                      </div>

                    </div>                         
                  </div>                                                               
              </div>     
          </div>
        </div>   
   
      </div>

      <div class="modal fade master-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3  class="modal-title" >Antecedentes médicos</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">     
              
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                       <h2>Antecedentes Familiares </h2>
                        <div id="idAntFamiliares" class="card-body" >
                          <div class="table-responsive" style="max-height: 400px;">
                            <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                            <thead>
                              <tr >
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Relación de parentezco</th>
                                <th style="width: 20%;text-align: center;vertical-align: middle;">DNI</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Nombre completo</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Antecedente de salud</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Observación</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(family,index) in familyHistory" style="background-color: rgba(0, 0, 0, 0.05);" >
                                <td >{{family.relation}}</td>                                    
                                <td >{{family.documentNumber}}</td>
                                <td >{{family.fullName}}</td>    
                                <td >{{family.antecedent}}</td>
                                <td >{{family.observation}}</td>
                                <!-- <td ><input v-model="family.documentNumber" style="text-align: left" type="text" class="form-control" ></td>
                                <td ><input v-model="family.fullName" style="text-align: left" type="text" class="form-control" ></td>    
                                <td ><textarea v-model="family.antecedent" style="text-align: left" type="text" class="form-control" ></textarea></td>
                                <td ><textarea v-model="family.observation" style="text-align: left" type="text" class="form-control" ></textarea></td> -->
                              </tr>
                            </tbody>
                            </table>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                      <h2>Antecedentes Médicos</h2>
                      
                      <div class="form-group ">

                        <div  v-if="HCPB.status == 'MONITORING'" class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Buscar patología</label>
                            
                            <select class="form-control col-md-5 col-xs-12" v-model="selectedPathology" >
                                <option disabled value="">Seleccione una patología</option>
                                <option v-for="(item,index) in pathologies" :key="index" :value="item">{{item.description}}</option>
                            </select>

                            <button type="button" class="btn btn-success btn-xs float-right" @click="addPathology()">Agregar Patología</button>                               
                        </div>    
                        
                        <div id="idAntPersonales" class="card-body" >
                          <div class="table-responsive" style="max-height: 400px;">
                            <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                            <thead>
                              <tr >
                                <!-- <th style="width: 20%;text-align: center;vertical-align: middle;">Código</th> -->
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Descripción</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Observación</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Fecha de diagnóstico</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(record,index) in medicalHistory" style="background-color: rgba(0, 0, 0, 0.05);" >
                                <!-- <td >{{record.codeDisease}}</td>     -->
                                <td >{{record.description}}</td>    
                                <td ><textarea style="text-align: left" type="text" class="form-control" v-model="record.observation" ></textarea></td>                                                         
                                <td > <Datepicker :format="DatePickerFormat" v-model="record.diagnosisDate"></Datepicker></td>
                                <td  v-if="HCPB.status == 'MONITORING'"><button type="button" @click="removePathology(record.code)" class="btn btn-danger btn-xs">Eliminar</button> </td>
                                <td  v-else><button class="btn btn-danger btn-xs" disabled>Eliminar</button> </td>
                              </tr>
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>                        
                    </div>
                  </div>
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                       <h2>Embarazos previos</h2>  
                      <div class="form-group "> 
                        <!-- <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">                    
                            <button type="button" class="btn btn-success btn-xs float-right" @click="addPregnancy()">Agregar</button>           
                        </div>             -->
                        <div id="idAntPersonales" class="card-body" >
                          <div class="table-responsive">
                            <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                            <thead>
                              <tr >
                                <th style="width: 20%;text-align: center;vertical-align: middle;">Tipo de embarazo</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Terminación</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Fecha de parto</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Lugar de parto</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Estado del neonato</th>
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Observación </th>                               
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in pregnancyHistory" style="background-color: rgba(0, 0, 0, 0.05);" >
                                <td >
                                  <!-- <select class="form-control col-md-12 col-xs-12"  v-model="item.pregnancyType">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Único</option>
                                          <option  value="2">Multiple</option>
                                  </select>   -->
                                  {{item.pregnancyTypeDisplay}}
                                </td>    
                                <td >
                                  <!-- <select class="form-control col-md-12 col-xs-12"  v-model="item.pregnancyTermination">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Parto Vaginal</option>
                                          <option  value="2">Cesárea</option>
                                          <option  value="3">Aborto</option>
                                          <option  value="4">Óbito</option>
                                          <option  value="5">Ectópico</option>
                                  </select>  -->
                                  {{item.pregnancyTerminationD}} 
                                </td>
                                <td >
                                  <!-- <Datepicker :format="DatePickerFormat" v-model="item.dateOfBirth"></Datepicker>   -->
                                   {{item.birthDateDisplay}} 
                                </td>                            
                                <td >
                                  <!-- <input style="text-align: center" type="text" class="form-control" v-model="item.pregnancySite" > -->
                                  {{item.placeOfBirth}} 
                                </td>
                                <td >
                                  <!-- <select class="form-control col-md-12 col-xs-12"  v-model="item.neonateStatus">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Vive</option>
                                          <option  value="2">No vive</option>
                                  </select>  -->
                                  {{item.neonateStatusDisplay}} 
                                </td>
                                <td style="min-width: 200px;" >
                                  <!-- <textarea style="text-align: left"  placeholder="Registre tambien el nombre del bebé" type="text" class="form-control" v-model="item.observation" ></textarea> -->
                                 {{item.observation}} 
                                </td>                                                           
                              </tr>
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>                         
                    </div>
                  </div>
             
            </div>
            <div  v-if="HCPB.status == 'MONITORING'" class="modal-footer">
                  <center>
                    <button type="button" @click="updateHCPB()" data-dismiss="modal" class="btn btn-primary">Actualizar</button>
                  </center>
            </div>    
          </div>
        </div>
      </div>

      <div class="modal fade master-modal-vaccination" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3  class="modal-title" >Cartilla de vacunaciones</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">                                                                   
              <form  class="form-horizontal " >                             
                <div class="row row-mod2">     
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Rubeola</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control" v-model="vaccinationRecord.rubella" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>    
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Hepatitis B</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control" v-model="vaccinationRecord.hepatitisB" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>  
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Papiloma</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control" v-model="vaccinationRecord.papilloma" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>  
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fiebre Amarilla</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control"  v-model="vaccinationRecord.yellowFever" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>  
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">AH1N1</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control"  v-model="vaccinationRecord.ah1n1" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>  
                  <div  class="item col-md-6 col-sm-12 form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Influenza</label>
                    <div class="col-md-6 col-sm-6 ">
                        <select class="form-control"  v-model="vaccinationRecord.influenza" >
                                <option v-bind:value="false">No</option>
                                <option v-bind:value="true">Si</option>                               
                        </select>
                    </div>
                  </div>  
                </div>
              </form>                                                 
            </div>
            <div  v-if="HCPB.status == 'MONITORING'" class="modal-footer">
                 <center>
                    <button type="button" data-dismiss="modal" class="btn btn-light">Cerrar</button>
                    <button type="button" @click="updateHCPB()" data-dismiss="modal" class="btn btn-primary">Actualizar</button>
                  </center>
            </div>    
          </div>
        </div>
      </div>

      <div class="modal fade master-prenatal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3  class="modal-title" >Control prenatal</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">                                                                   
              <form  class="form-horizontal " >   
                  <div class="row">     
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Peso Actual
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57"
                          required="required" class="form-control" v-model="prenatal.actualWeight"  readonly >
                        </div>
                      </div> 
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Presión sistólica </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="first-name" required="required" class="form-control"  pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="prenatal.systolicPressure" readonly>
                        </div>
                      </div>                           
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Ganancia de peso
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="first-name" required="required" class="form-control "  v-model="prenatal.weightGain" readonly>
                        </div>
                      </div>
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Presión diastólica
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  class="form-control"  v-model="prenatal.diastolicPressure" readonly>
                        </div>
                      </div>   
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Índice de masa corporal (IMC)
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="prenatal.imc"  readonly>
                        </div>
                      </div>   
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Pulso
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  class="form-control"   v-model="prenatal.pulse" readonly>
                        </div>
                      </div> 
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Temperatura
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"   v-model="prenatal.temperature" readonly>
                        </div>
                      </div>
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Frecuencia respiratoria
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"    v-model="prenatal.breathingFrequency" readonly >
                        </div>
                      </div> 
                      <div class="item col-md-6 col-sm-12 form-group">
                        <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Altura uterina
                        </label>
                        <div class="col-md-6 col-sm-6 ">
                          <input type="text" id="last-name" name="last-name" required="required" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" class="form-control"    v-model="prenatal.uterineHeight" readonly >
                        </div>
                      </div>    
                  
                  </div>
                  <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                      <div id="idAntFamiliares" class="card-body" >
                        <div class="table-responsive" style="max-height: 400px;">
                          <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                          <thead>
                            <tr >
                              <th style="width: 15%; text-align: center;vertical-align: middle;">FCF</th>
                              <th style="width: 20%;text-align: center;vertical-align: middle;">Situación</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Presentación del feto</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Posición</th>
                              <th style="width: 20%; text-align: center;vertical-align: middle;">Observación</th>
                              

                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,index) in fetusePre" style="background-color: rgba(0, 0, 0, 0.05);  min-width: 50px;" >
                              <td ><input v-model="item.fcf" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 46 && event.charCode <= 57" style="text-align: left" type="text" class="form-control" ></td>    
                              <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.situationFetus">
                                      <option disabled value="">Seleccione una opción</option>
                                      <option  value="1">Longitudinal</option>
                                      <option  value="2">Transversal</option>
                                  </select> 
                              </td>
                              <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.presentationFetus">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Cefálico</option>
                                          <option  value="2">Podálico</option>
                                  </select> 
                              </td>       
                              <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.positionFetus">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Derecho</option>
                                          <option  value="2">Izquierdo</option>
                                  </select> 
                              </td>                
                              <td ><textarea v-model="item.observation" style="text-align: left" type="text" class="form-control" ></textarea></td>
                           
                            </tr>
                          </tbody>
                          </table>
                        </div>
                      </div>
                  </div>
                  <div class="row">     
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del sistema
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <input type="text" id="last-name" v-model="prenatal.systemDiagnosisD" name="last-name" required="required" class="form-control" readonly>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Especialista encargado del control
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <input type="text" id="last-name" v-model="prenatal.specialistD" name="last-name" required="required" class="form-control" readonly>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del especialista
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <textarea type="text" id="last-name" v-model="prenatal.finalDiagnosis " name="last-name" required="required" class="form-control" readonly> </textarea>
                    </div>
                  </div> 
                  <div class="item col-md-12 col-sm-12 form-group">
                    <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Recomendaciones
                    </label>
                    <div class="col-md-10 col-sm-10 ">
                      <textarea type="text" id="last-name" name="last-name" v-model="prenatal.recommendations" required="required" class="form-control" readonly> </textarea>
                    </div>
                  </div> 
  
                  </div>
              </form>                                           
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade master-emergency" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3  class="modal-title" >Emergencia</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">                                                                   
              <form  class="form-horizontal " >   
                  <fieldset class="scheduler-border" style="padding-bottom: 30px"> 
                      <h3  class="modal-title" ><p>I. Datos generales</p></h3>   
                      <form  class="form-horizontal " >                         
                        <div class="row">     
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Fecha de la emergencia médica
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" v-model="emergency.dateAttentionD" id="last-name" name="last-name" required="required" class="form-control" readonly>                              
                              </div>
                            </div>                            
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Centro de salud donde se atiende la emergencia médica
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <textarea type="text" id="first-name" required="required" class="form-control "  v-model="emergency.clinic" readonly> </textarea>
                              </div>
                            </div>
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Observación
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <textarea type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="emergency.initialObservation" readonly > </textarea>
                              </div>
                            </div>   
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label for="middle-name" class="col-form-label col-md-6 col-sm-3 label-align">Fecha de último control prenatal</label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" v-model="emergency.lastControlDateD" id="last-name" name="last-name" required="required" class="form-control" readonly>                              
                              </div>
                            </div>   
                        </div>
                      </form>
                  </fieldset>

                  <fieldset class="scheduler-border" style="padding-bottom: 30px">
                      <h3  class="modal-title" ><p>II. Evaluación de la gestante</p></h3>      
                      <form  class="form-horizontal " >   
                        <div class="row">     
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Edad gestacional (semanas)
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="last-name" name="last-name" required="required" class="form-control" v-model="emergency.gestationalAge" readonly  >
                              </div>
                            </div> 
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="first-name">Temperatura  </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="first-name" required="required" class="form-control "  v-model="emergency.temperature" readonly>
                              </div>
                            </div>     
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Presión diastólica
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="emergency.diastolicPressure" readonly >
                              </div>
                            </div>    
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Pulso
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="emergency.pulse" readonly>
                              </div>
                            </div> 
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Presión sistólica  </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="emergency.systolicPressure" readonly>
                              </div>
                            </div>
                            <div class="item col-md-6 col-sm-12 form-group">
                              <label class="col-form-label col-md-6 col-sm-3 label-align" for="last-name">Frecuencia respiratoria
                              </label>
                              <div class="col-md-6 col-sm-6 ">
                                <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="emergency.breathingFrequency"  readonly>
                              </div>
                            </div> 
            
                        </div>
                      </form>
                  </fieldset>

                  <fieldset class="scheduler-border" style="padding-bottom: 30px"> 
                      <h3  class="modal-title" ><p>III. Evaluación del feto</p></h3>      
                      <form  class="form-horizontal " >   
                            
                        <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                            <div id="idAntFamiliares" class="card-body" >
                              <div class="table-responsive" style="max-height: 400px;">
                                <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                                <thead>
                                  <tr >
                                    <th style="width: 15%; text-align: center;vertical-align: middle;">FCF</th>
                                    <th style="width: 20%;text-align: center;vertical-align: middle;">Situación</th>
                                    <th style="width: 20%; text-align: center;vertical-align: middle;">Presentación del feto</th>
                                    <th style="width: 20%; text-align: center;vertical-align: middle;">Posición</th>
                                    <th style="width: 20%; text-align: center;vertical-align: middle;">Observación</th>
                                    

                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item,index) in fetusesEme" style="background-color: rgba(0, 0, 0, 0.05);  min-width: 50px;" >
                                    <td ><input v-model="item.fcf" style="text-align: left" type="text" class="form-control" ></td>    
                                    <td >
                                        <select class="form-control col-md-12 col-xs-12"  v-model="item.situationFetus">
                                            <option disabled value="">Seleccione una opción</option>
                                            <option  value="1">Longitudinal</option>
                                            <option  value="2">Transversal</option>
                                        </select> 
                                    </td>
                                    <td >
                                        <select class="form-control col-md-12 col-xs-12"  v-model="item.presentationFetus">
                                                <option disabled value="">Seleccione una opción</option>
                                                <option  value="1">Cefálico</option>
                                                <option  value="2">Podálico</option>
                                        </select> 
                                    </td>       
                                    <td >
                                        <select class="form-control col-md-12 col-xs-12"  v-model="item.positionFetus">
                                                <option disabled value="">Seleccione una opción</option>
                                                <option  value="1">Derecho</option>
                                                <option  value="2">Izquierdo</option>
                                        </select> 
                                    </td>                
                                    <td ><textarea v-model="item.observation" style="text-align: left" type="text" class="form-control" ></textarea></td>
                                    
                                  </tr>
                                </tbody>
                                </table>
                              </div>
                            </div>
                        </div>

                      </form>
                  </fieldset>        

                  <fieldset class="scheduler-border">      
                      <h3  class="modal-title" ><p>IV. Diagnóstico y recomendaciones</p></h3>      
                      <form  class="form-horizontal " >   
                        <div class="row">     
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del sistema
                              </label>
                              <div class="col-md-10 col-sm-10 ">
                                <input type="text" v-model="emergency.systemDiagnosis" id="last-name" name="last-name" required="required" class="form-control" readonly>
                              </div>
                            </div> 
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Especialista encargado 
                              </label>
                              <div class="col-md-10 col-sm-10 ">
                                <input type="text" v-model="emergency.specialistName" id="last-name" name="last-name" required="required" class="form-control" readonly>
                              </div>
                            </div>
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Número de colegiatura
                              </label>
                              <div class="col-md-10 col-sm-10 ">
                                <input type="text" v-model="emergency.colegiatureNumber" id="last-name" name="last-name" required="required" class="form-control" readonly>
                              </div>
                            </div>
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Diagnóstico del especialista
                              </label>
                              <div class="col-md-10 col-sm-10 ">
                                <textarea type="text" v-model="emergency.finalDiagnosis" id="last-name" name="last-name" required="required" class="form-control" readonly> </textarea>
                              </div>
                            </div> 
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">Recomendaciones
                              </label>
                              <div class="col-md-10 col-sm-10 ">
                                <textarea type="text" v-model="emergency.recommendations" id="last-name" name="last-name" required="required" class="form-control" readonly> </textarea>
                              </div>
                            </div> 
                            <div class="item col-md-12 col-sm-12 form-group">
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">¿Se internará a la gestante?</label>
                              <div class="col-md-4 col-sm-10 ">
                                <input type="text" v-model="emergency.interPregnantD" id="last-name" name="last-name" required="required" class="form-control" readonly>
                              </div>
                              <label class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">¿Requiere interrupción de embarazo?</label>
                              <div class="col-md-4 col-sm-10 ">
                                <input type="text" v-model="emergency.terminatePregnancyD" id="last-name" name="last-name" required="required" class="form-control" readonly>                             
                              </div>
                              <label  v-if="form.terminatePregnancy == 1" class="col-form-label col-md-2 col-sm-3 label-align" for="last-name">¿Será un parto pretérmino?</label>
                              <div  v-if="form.terminatePregnancy == 1" class="col-md-4 col-sm-10 ">
                                <input type="text" v-model="emergency.pretermBirthD" id="last-name" name="last-name" required="required" class="form-control" readonly>                             
                              </div>
                            </div>   
                        </div>
                      </form>
                  </fieldset>   

              </form>                                           
            </div>
          </div>
        </div>
      </div>
     
      <!--Modal not-->
      <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">
                <center>{{formNot.title}}</center>
              </h3>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <h4 class="modal-title">
                <center>{{formNot.message}}</center>
              </h4>
              <div v-if="formNot.title == 'Campos incompletos'" style="padding-top: 20px; padding-left: 15px;">
                  <tr v-for="(item,index) in arrayComplete" >
                    <td >{{item}}</td>    
                  </tr>
              </div>
            </div>
            <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-success">Aceptar</button>
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
import consultServices from "./../utilities/consultServices.js"; //consulta servicios
import LoadingComponent from "./../components/loadingComponent.vue";
import TableMaf from "./../components/tableMaf.vue";
import inputMaf from "./../components/inputMaf.vue";
import SearchComponent from "./../components/searcherComponent.vue";
import masterTemplate from "./../components/masterComponents/masterTemplateContainer.vue";
import moment from "moment"; //tiempos
import _ from 'lodash';
import masterTemplateComponent from "./../../../assets/component/index.js";
import Datepicker from 'vuejs-datepicker';
export default {
  user:  window.INITIAL_STATE,
  name: "HCPBManagementContainer",
  components: {
    LoadingComponent,
    TableMaf,
    inputMaf,
    SearchComponent,
    masterTemplate,
    masterTemplateComponent,
    Datepicker,
    //ButtonUpload
  },
  data: () => ({
    DatePickerFormat: 'dd/MM/yyyy',
    contraceptiveMethod:[
        { id:0, display:'Ninguno'},
        { id:1, display:'Condón'},
        { id:2, display:'Óvulo'},
        { id:3, display:'Inyectable'},
        { id:4, display:'Pastilla'},       
        { id:5, display:'Implante'},
        { id:6, display:'Natural'},        
    ],
    pregnant:{
      _id: null,
      name: '',
      lastName: '',
      secondLastName:'',
      documentNumber: '', 
      fullName:'', 
      age: '', 
      address: '',
    },
    form:{},
    prenatal:{},
    fetusePre:[],
    emergency:{},
    fetusesEme:[],
    fetuses:[],
    formT:{},
    HCPB:{
      idPregnant: null,
      ageMenarche: '',
      ageFirstSexualExperience: null,
      lastContraceptiveMethod:null,
      havePapSmear:null,
      havePapSmearDate:null,
      PapSmearResult:null,
      lastDateMenstruation:null,
      pregnantHeight:null,
      pregnantWeight:null,
      gestationalAge:null,
      probableDateBirth:null,
    },    
    vaccinationRecord:{
       rubella : null,
       hepatitisB : null,
       papilloma : null,
       yellowFever : null,
       ah1n1 : null,
       influenza : null,
    },
    medicalHistory:[],
    pregnancyHistory:[],
    selectedPathology:{
      id:null, code:'', description:''
    },
    patients:[
    ],
    pathologies:[
     { id:1, description:'Alergias'},
     { id:2, description:'Asma'},
     { id:3, description:'Bronquitis'},
     { id:4, description:'Cáncer'},
     { id:5, description:'Convulsiones'},
     { id:6, description:'Diabetes'},
     { id:7, description:'Dislipidemia'},
     { id:8, description:'Epilepsia'},
     { id:9, description:'Hepatitis B'},
     { id:10, description:'Salud Mental'},
     { id:11, description:'TBC'},
     
    ],
    arrayComplete:[],
    formNot: { message: "", title: "" },
    familyHistory:[    
      {id:1, fullName:null, relation: 'Padre de la paciente', documentNumber:null,antecedent: null, observation:null, motherPatient: false, fatherPatient: true},
      {id:2, fullName:null, relation: 'Madre de la paciente', documentNumber:null,antecedent: null, observation:null, motherPatient: true, fatherPatient: false},   
    ], 
    specialists:[], 
    idHCPB: null,
    dataHCPB: {},
    prenatalControls:[],
    emergencies:[],
    //////////////////
    isLoading: false,    
  }),
  async mounted() {
    var urlParams = new URLSearchParams(window.location.search);
    this.idHCPB = urlParams.get('idHCPB')
    //listar especialistas
    this.specialists = await consultServices('listSpecialists','POST',{})
    //Listar la info del HCPB
    var data0 = await consultServices('showHCPB','POST',{_id:this.idHCPB })
    //Listar todas las emergencias
    var data1 = await consultServices('listEmergencies','POST',{_idHCPB:this.idHCPB })
    //Listar todos los controles
    var data2 = await consultServices('listControls','POST',{_idHCPB:this.idHCPB })
    await this.loadingHCPB(data0, data1, data2)    
  },
  methods: {
    async showNotification() {
      $(".bs-example-modal-not").modal("show");
    },
    loadingHCPB(dat0, dat1, dat2){

        //Cargar datos del HCPB
        this.pregnant = _.cloneDeep(dat0.patientDetail)
        this.calAge()
        console.log('pregnant::::::', this.pregnant)
        this.HCPB = _.cloneDeep(dat0.hcpb)
        //Cargar datos del HCPB-> displays
        var method = this.contraceptiveMethod.find(element => element.id == this.HCPB.lastContraceptiveMethod);
        console.log('method', method.display)
        this.HCPB.methodDisplay = method.display
        this.HCPB.lastDateMenstruationDisplay = moment(this.HCPB.lastDateMenstruation).format("DD/MM/YYYY")
        this.HCPB.previousPretermPregnancyD = this.HCPB.previousPretermPregnancy == 1? 'Si': 'No'
        this.HCPB.multiplePregenancyD = this.HCPB.multiplePregenancy == 1? 'Si': 'No'
        this.HCPB.shortUterineNeckD = this.HCPB.shortUterineNeck == 1? 'Si': 'No'
        this.HCPB.highStressLevelD = this.HCPB.highStressLevel == 1? 'Si': 'No'
        //Cargar datos de la cartilla de vacunación
        this.vaccinationRecord = _.cloneDeep(this.HCPB.vaccinationRecord)
        //Cargar datos de antecedentes médicos
        //Antecedentes familiares
        this.familyHistory = this.HCPB.familyHistory        
        for (var i = 0; i < this.familyHistory.length; i++) {
          //this.familyHistory[i].antecedent = this.familyHistory[i].disease   
          this.familyHistory[i].fatherPatient == true ? this.familyHistory[i].relation = 'Padre de la paciente' : null
          this.familyHistory[i].motherPatient == true ? this.familyHistory[i].relation = 'Madre de la paciente' : null  
        }
        //Antecedentes médicos
        this.medicalHistory = this.HCPB.medicalHistory
        //Embarazos previos
        this.pregnancyHistory = this.HCPB.previousPregnancy
        for (var i = 0; i < this.pregnancyHistory.length; i++) {
          
          this.pregnancyHistory[i].pregnancyTypeDisplay =  this.pregnancyHistory[i].pregnancyType == 1 ? 'Único' : 'Múltiple'
          this.pregnancyHistory[i].birthDateDisplay = moment(this.pregnancyHistory[i].birthDateDisplay).format("DD/MM/YYYY")          
          this.pregnancyHistory[i].neonateStatusDisplay =  this.pregnancyHistory[i].neonateStatus == 1 ? 'Vive' : 'No vive'
          if(this.pregnancyHistory[i].pregnancyTermination == 1) {this.pregnancyHistory[i].pregnancyTerminationD = 'Parto Vaginal'} 
          if(this.pregnancyHistory[i].pregnancyTermination == 2) {this.pregnancyHistory[i].pregnancyTerminationD = 'Cesárea' } 
          if(this.pregnancyHistory[i].pregnancyTermination == 3) {this.pregnancyHistory[i].pregnancyTerminationD = 'Aborto'} 
          if(this.pregnancyHistory[i].pregnancyTermination == 4) {this.pregnancyHistory[i].pregnancyTerminationD = 'Óbito'} 
          if(this.pregnancyHistory[i].pregnancyTermination == 5) {this.pregnancyHistory[i].pregnancyTerminationD = 'Ectópico'} 
           
        }
        //Emergencias
        this.emergencies = _.cloneDeep(dat1)
        for (var t = 0; t < this.emergencies.length; t++) {
          this.emergencies[t].dateAttentionD = moment(this.emergencies[t].dateAttention).format("DD/MM/YYYY")  
          this.emergencies[t].lastControlDateD = moment(this.emergencies[t].lastControlDate).format("DD/MM/YYYY")   
          this.emergencies[t].systemDiagnosisD  = 'Bajo riesgo'
          this.emergencies[t].systemDiagnosisD  = this.emergencies[t].systemDiagnosis //== 2?  'Alto riesgo' : 'Bajo riesgo' 
          //this.emergencies[t].systemDiagnosisD  = this.emergencies[t].systemDiagnosis //== 3?  'Riesgo inminente' : 'Bajo riesgo'

          this.emergencies[t].interPregnantD  = this.emergencies[t].interPregnant == 1?  'Si' : 'No'
          this.emergencies[t].pretermBirthD  = this.emergencies[t].pretermBirth == 1?  'Si' : 'No'
          this.emergencies[t].terminatePregnancyD  = this.emergencies[t].terminatePregnancy == 1?  'Si' : 'No'       
          
        }
        //Controles prenatales
        var auxQ = _.cloneDeep(dat2)
        auxQ.sort(function (a, b) {
          if (a.numberControl > b.numberControl) {
            return 1;
          }
          if (a.numberControl < b.numberControl) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });    

        this.prenatalControls = _.cloneDeep(auxQ)
        for (var t = 0; t < this.prenatalControls.length; t++) {
          var idSp = this.prenatalControls[t].idSpecialist
          this.prenatalControls[t].dateAttentionD = moment(this.prenatalControls[t].dateAttention).format("DD/MM/YYYY")    
          this.prenatalControls[t].systemDiagnosisD  =  this.prenatalControls[t].systemDiagnosis == 2? 'Embarazo de alto riesgo' : 'Embarazo de bajo riesgo'   
          var specialist= _.find(this.specialists, function(o) { return o._id == idSp; });
          this.prenatalControls[t].specialistD = specialist.lastName + ' ' +specialist.surName  + ' '+ specialist.name  
        }

        if(this.HCPB.status != 'MONITORING'){
          this.formT = _.cloneDeep(this.HCPB.terminatedPregnancy[0])
          this.formT.pregnancyTypeD =  this.formT.pregnancyType == 1 ? 'Único' : 'Múltiple'
          this.formT.birthDateDisplay = moment(this.formT.birthDateDisplay).format("DD/MM/YYYY")          
          this.formT.neonateStatusD =  this.formT.neonateStatus == 1 ? 'Vive' : 'No vive'
          if(this.formT.pregnancyTermination == 1) {this.formT.pregnancyTerminationD = 'Parto Vaginal'} 
          if(this.formT.pregnancyTermination == 2) {this.formT.pregnancyTerminationD = 'Cesárea' } 
          if(this.formT.pregnancyTermination == 3) {this.formT.pregnancyTerminationD = 'Aborto'} 
          if(this.formT.pregnancyTermination == 4) {this.formT.pregnancyTerminationD = 'Óbito'} 
          if(this.formT.pregnancyTermination == 5) {this.formT.pregnancyTerminationD = 'Ectópico'} 
          this.formT.pretermBirthD = this.formT.pretermBirth == '1' ? 'Si' : 'No'
          this.formT.dateOfBirthD = moment(this.formT.dateOfBirth).format("DD/MM/YYYY")     
        }
    },
    addPregnant(){
      this.isLoading = true
      console.log('paciente ', this.pregnant)
      if(this.pregnant._id != null){
        alert('La paciente seleccionada fue asociada a la nueva HCPB.')
        this.HCPB.idPregnant = this.pregnant._id
      }else{
        alert('Seleccione una gestante para registrar una nueva HCPB.')
      }     
      this.isLoading = false
    },
    addPathology(){
      console.log('addPathology', this.selectedPathology)
      this.isLoading = true

      if(this.selectedPathology.id == null){
        alert('Seleccione una patología.')
      }else{
        var patho = _.cloneDeep(this.selectedPathology)
        var obj={
          code: patho.code,
          description: patho.description,
          observation:'',
          diagnosisDate: '',
        }
        this.medicalHistory.push(obj)
      }
      this.isLoading = false

    },
    removePathology(code){
          var newArray = _.filter(this.medicalHistory, function(x) { return x.code !== code; });
          this.medicalHistory =[]
          this.medicalHistory = _.cloneDeep(newArray)
    },
    async updateHCPB(){
      this.isLoading = true
      
      console.log('HCPB', this.HCPB)
      console.log('pregnant',this.pregnant._id)
      console.log('familyHistory', this.familyHistory)
      console.log('medicalHistory', this.medicalHistory)
      console.log('pregnancyHistory', this.pregnancyHistory )
      console.log('vaccinationRecord', this.vaccinationRecord)

      var newRecord = _.cloneDeep(this.HCPB)
      //Barrientos lokito de mrd
      newRecord.vaccinationRecord = this.vaccinationRecord
      newRecord.medicalHistory = this.medicalHistory
      newRecord.probableDateBirth = this.HCPB.probableDateBirth
      newRecord.id = this.HCPB._id

      console.log('newRecord::::::::::::', newRecord)

    
      var newCreate = await consultServices('updateHCPB','POST',newRecord);  
      if(newCreate.message){
        this.formNot.title="Error en operación";
        this.formNot.message='No se pudo actualizar el registro' //newCreate.message;
      }else{
        this.formNot.title="Operación exitosa";
        this.formNot.message = "Registro actualizado";
        //actualizar lista
        //this.clearForm()
        //Jimmy cotmre
        $('.modal').modal('hide');
      } 
   
      this.showNotification();
      this.isLoading = false
    },
    redirect(text, id){

      if(text=='NEW_PRENATAL_CONTROL' && id!=0){
        window.open('/dashboard/controlPrenatal?idHCPB='+id, '_blank');
      }
      if(text=='NEW_EMERGENCY' && id!=0){
        window.open('/dashboard/emergencia?idHCPB='+id, '_blank');
      }
      
    },
    calAge(){
      var birth = this.pregnant.birthdate
      console.log('birth:::::::::', birth)
      var now = moment()
      var difCurrent= now.diff(birth, 'years')
      console.log('edad::::::::', difCurrent)
      this.pregnant.age = difCurrent
    },
    showData(item, text){
      console.log('item data', item)
      console.log('text data', text)
      if(text == 'PRENATAL'){
         this.prenatal = _.cloneDeep(item)
         this.fetusePre = _.cloneDeep(item.fetusesDetail)
      }
      if(text == 'EMERGENCY'){
         this.emergency = _.cloneDeep(item)
         this.fetusesEme = _.cloneDeep(item.fetusesDetail)
      }
    }

  }
};
</script>
<style scoped>
h1 {
  font-size: 1.25rem;
}
.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row-mod2:after {
  content: "";
  display: table;
  clear: both;
}
</style>
