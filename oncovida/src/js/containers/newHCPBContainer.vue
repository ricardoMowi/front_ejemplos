<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-body">
          <h1>Registro de nueva Historia Clínica Perinatal Base (HCPB) </h1>
        </div>
        <div class="clearfix"></div>
        <div class="card-body">
          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag1" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Registro de gestante</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag1" class="card-collapse collapse in">
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                      
                      <div class="form-group ">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
                          <div class="row">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Buscar gestante</label>
                          <div class="col-md-7 col-sm-6 col-xs-12">

                            <select class="form-control col-md-7 col-xs-12" v-model="pregnant" :change="calAge()"   >
                                <option disabled value="">Seleccione una gestante</option>
                                <option v-for="(item,index) in patients" :key="index" :value="item">{{item.lastName}} {{item.surName}} {{item.name}}</option>
                            </select>

                          </div>
                          </div>
                        </div> 
                      </div>   
                      <form  class="form-horizontal " v-if="pregnant._id != null" > 
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Documento Nacional de Identidad
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control" v-model="pregnant.documentNumber"  readonly>
                                </div>
                              </div>                            
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Apellido Paterno 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="first-name" required="required" class="form-control "  v-model="pregnant.lastName" readonly>
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Apellido Materno 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="pregnant.surName"  readonly>
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Nombres
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="first-name" required="required" class="form-control "   v-model="pregnant.name" readonly>
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Edad
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"  v-model="pregnant.age"  readonly>
                                </div>
                              </div>   
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Dirección domiciliaria
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="text" id="last-name" name="last-name" required="required" class="form-control"   v-model="pregnant.address" readonly>
                                </div>
                              </div>                               
                      </form>                            

                      <div class="modal-footer">
                          <center>
                              <button type="button" @click="addPregnant()" class="btn btn-warning">Asociar gestante seleccionada</button>
                              <button type="button" @click="redirect('NEW_PREGNANT', 0)" class="btn btn-success">Registrar nueva gestante</button>
                          </center>
                      </div>  

                    </div>
                  </div>
              </div>      
          </div>
          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag2" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Registro de Antecedentes</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag2" class="card-collapse collapse in">
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
                                <td ><input v-model="family.documentNumber" type="text" maxlength="8" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="text-align: left" class="form-control" ></td>
                                <td ><input v-model="family.fullName" style="text-align: left" type="text" class="form-control" ></td>    
                                <td ><textarea v-model="family.antecedent" style="text-align: left" type="text" class="form-control" ></textarea></td>
                                <td ><textarea v-model="family.observation" style="text-align: left" type="text" class="form-control" ></textarea></td>
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

                        <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">
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
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Descripción</th>
                                <th style="width: 40%; text-align: center;vertical-align: middle;">Observación</th>
                                <th style="width: 30%; text-align: center;vertical-align: middle;">Fecha de diagnóstico</th>
                                <th style="width: 10%; text-align: center;vertical-align: middle;">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(record,index) in medicalHistory" style="background-color: rgba(0, 0, 0, 0.05);" >
                                <td >{{record.description}}</td>    
                                <td ><textarea style="text-align: left" type="text" class="form-control" v-model="record.observation" ></textarea></td>                                                         
                                <td > <Datepicker :format="DatePickerFormat" v-model="record.diagnosisDate"></Datepicker></td>
                                <td ><button type="button" @click="removePathology(record.id)" class="btn btn-danger btn-xs">Eliminar</button> </td>
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
                        <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 1%;">                    
                            <button type="button" class="btn btn-success btn-xs float-right" @click="addPregnancy()">Agregar</button>           
                        </div>            
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
                                <th style="width: 20%; text-align: center;vertical-align: middle;">Acciones </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,index) in pregnancyHistory" style="background-color: rgba(0, 0, 0, 0.05);" >
                                <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.pregnancyType">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Único</option>
                                          <option  value="2">Múltiple</option>
                                  </select>  
                                </td>    
                                <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.pregnancyTermination">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Parto Vaginal</option>
                                          <option  value="2">Cesárea</option>
                                          <option  value="3">Aborto</option>
                                          <option  value="4">Óbito</option>
                                          <option  value="5">Ectópico</option>
                                  </select> 
                                </td>
                                <td >
                                  <Datepicker :format="DatePickerFormat" v-model="item.dateOfBirth"></Datepicker>  
                                </td>                            
                                <td >
                                  <input style="text-align: center" type="text" class="form-control" v-model="item.pregnancySite" >
                                </td>
                                <td >
                                  <select class="form-control col-md-12 col-xs-12"  v-model="item.neonateStatus">
                                          <option disabled value="">Seleccione una opción</option>
                                          <option  value="1">Vive</option>
                                          <option  value="2">No vive</option>
                                  </select> 
                                </td>
                                <td style="min-width: 200px;" ><textarea style="text-align: left"  placeholder="Registre tambien el nombre del bebé" type="text" class="form-control" v-model="item.observation" ></textarea></td>
                                <td ><button type="button" @click="removeRegister(index)" class="btn btn-danger btn-xs">Eliminar</button></td>                              
                              </tr>
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>                         




                    </div>
                  </div>
              </div>      
          </div>
          <div class="card" id="accordion" style="padding-bottom: 0px;">          
              <div class="card-header" style="padding-left: 15px;"  data-toggle="collapse" href="#collapseTag3" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h2>Registro de Embarazo actual</h2>
                <div class="clearfix">
                </div>
              </div>
              <div id="collapseTag3" class="card-collapse collapse in">
                  <div class="card-body">                      
                    <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                      <div class="card-body">                      
                        <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                          <h2>Datos Ginecológicos</h2>
                          <div class="ln_solid"></div>
                          <div>
                            <form  class="form-horizontal " >                            
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Menarquía (edad de la primera menstruación): 
                                </label>
                                <div class="col-md-6 col-sm-6 ">                                  
                                  <input type="number" id="last-name" name="last-name" v-model="HCPB.ageMenarche" required="required" class="form-control">
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Edad de primera relación sexual: 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" id="last-name" name="last-name" v-model="HCPB.ageFirstSexualExperience" required="required" class="form-control">
                                </div>
                              </div>
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Último método anticonceptivo usado</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.lastContraceptiveMethod" >
                                            <option value="0">Ninguno</option>
                                            <option value="1">Condón</option>
                                            <option value="2">Óvulo</option>
                                            <option value="3">Inyectable</option>
                                            <option value="4">Pastilla</option>       
                                            <option value="5">Implante</option>
                                            <option value="6">Natural</option>                                 
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">¿Presenta cuello uterino corto?</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.shortUterineNeck" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>            
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">¿Tiene papanicolaou?</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.havePapSmear" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>    
                              <div v-if="HCPB.havePapSmear == '1'">
                                <div class="item form-group">
                                  <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fecha de último papanicolaou</label>
                                  <div class="col-md-6 col-sm-6 ">
                                    <Datepicker :format="DatePickerFormat" v-model="HCPB.havePapSmearDate"></Datepicker>
                                  </div>
                                </div> 
                                <div class="item form-group">
                                  <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Resultado papanicolaou</label>
                                  <div class="col-md-6 col-sm-6 ">
                                    <textarea id="middle-name" v-model="HCPB.PapSmearResult" class="form-control" type="text" name="middle-name"></textarea>
                                  </div>
                                </div>    
                              </div>  

                            </form>
                          </div>       
                        </div>
                      </div> 
                      <div class="card-body">                      
                        <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                          <h2>Datos generales</h2>
                          <div class="ln_solid"></div>
                          <div>
                            <form  class="form-horizontal " >                            
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Fecha de última menstruación
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <Datepicker :format="DatePickerFormat" v-model="HCPB.lastDateMenstruation"></Datepicker>  
                                </div>
                              </div>
                              <div class="item form-group">
                                <label class="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Talla de la gestante (en centímetros) 
                                </label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" v-model="HCPB.pregnantHeight" id="last-name" name="last-name" required="required" class="form-control">
                                </div>
                              </div>
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Peso habitual antes del embarazo (en kilogramos)</label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" id="last-name" v-model="HCPB.pregnantWeight" name="last-name" required="required" class="form-control">
                                </div>
                              </div>           
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Edad gestacional actual (en semanas)</label>
                                <div class="col-md-6 col-sm-6 ">
                                  <input type="number" id="last-name" v-model="HCPB.gestationalAge" name="last-name" required="required" class="form-control">
                                </div>
                              </div> 
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fecha probable del parto</label>
                                <div class="col-md-6 col-sm-6 ">
                                   <Datepicker :format="DatePickerFormat" v-model="HCPB.probableDateBirth" ></Datepicker>
                                </div>
                              </div>    
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">¿Ha tenido un parto pretérmino antes?</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.previousPretermPregnancy" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div> 
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">¿Es un embarazo múltiple?</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.multiplePregnancy" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">¿Considera que tiene un alto nivel de estrés durante sus actividades diarias?</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="HCPB.highStressLevel" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>                                                                    
                            </form>
                          </div>                        
                        </div>
                      </div>
                      <div class="card-body">                      
                        <div class="card-body" style="padding-bottom:5px; padding-top: 10px;">
                          <h2>Cartilla de vacunaciones</h2>
                          <div class="ln_solid"></div>
                          <div>
                            <form  class="form-horizontal " >                            
           
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Rubeola</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="vaccinationRecord.rubella" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>    
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Hepatitis B</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="vaccinationRecord.hepatitisB" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Papiloma</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control" v-model="vaccinationRecord.papilloma" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Fiebre Amarilla</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control"  v-model="vaccinationRecord.yellowFever" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">AH1N1</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control"  v-model="vaccinationRecord.ah1n1" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
                              <div class="item form-group">
                                <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Influenza</label>
                                <div class="col-md-6 col-sm-6 ">
                                    <select class="form-control"  v-model="vaccinationRecord.influenza" >
                                            <option value="0">No</option>
                                            <option value="1">Si</option>                               
                                    </select>
                                </div>
                              </div>  
    
                            </form>
                          </div>                        
                        </div>
                      </div>

                    </div>
                  </div>
              </div>      

          </div>
        </div>   
        <div class="modal-footer">
              <center>
                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                <button type="button" @click="createHCPB()" data-dismiss="modal" class="btn btn-success">Registrar</button>
              </center>
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
                <button v-if="formNot.message == 'Registro creado'" @click="redirect('FIRST_CONTROL',0)" type="button" data-dismiss="modal" class="btn btn-success">Aceptar y registrar primer control prenatal</button>
                <button v-else type="button" data-dismiss="modal" class="btn btn-success">Aceptar</button>
                
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
  name: "newHCPBManagementContainer",
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
    user:  window.INITIAL_STATE,
    DatePickerFormat: 'dd/MM/yyyy',
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
    HCPB:{
      idPregnant: null,
      ageMenarche: null,
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
      _id: 1
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
      id:null,  description:''
    },
    patients:[],
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
     { id:10, description:'Hipertensión'}, 
     { id:11, description:'Obesidad'},   
     { id:12, description:'Salud Mental'},
     { id:13, description:'TBC'},        
    ],
    arrayComplete:[],
    formNot: { message: "", title: "" },
    familyHistory:[              
      {id:1, fullName:null, relation: 'Padre de la paciente', documentNumber:null,antecedent: null, observation:null, motherPatient: false, fatherPatient: true},
      {id:2, fullName:null, relation: 'Madre de la paciente', documentNumber:null,antecedent: null, observation:null, motherPatient: true, fatherPatient: false},   
    ],  
    
    //////////////////
    isLoading: false,    
  }),
  async created() {
    await this.filterPregnants()
  
  },
  methods: {
    async showNotification() {
      $(".bs-example-modal-not").modal("show");
    },

    async filterPregnants(){
      const response =  await consultServices('listPatients','POST',{})
      var newArray =[]
      for (let index = 0; index < response.length; index++) {
        if(response[index].patientDetail.hcpbActive == false){
          newArray.push(response[index])
        }        
      }
      this.patients = _.cloneDeep(newArray)
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
          id: patho.id,
          description: patho.description,
          observation:'',
          diagnosisDate: '',
        }
        this.medicalHistory.push(obj)
      }
      this.isLoading = false

    },
    removePathology(id){
          var newArray = _.filter(this.medicalHistory, function(x) { return x.id !== id; });
          this.medicalHistory =[]
          this.medicalHistory = _.cloneDeep(newArray)
    },
    validationComplete(){

      var isIncomplete = true
      var pregnantSelect = true
      var familyBackgroundComplete = true
      var medicalHistoryComplete = true
      var pregnancyHistoryComplete = true
      var newPregnantComplete = true
      var vaccinationComplete = true
      console.log('validación')
      console.log('HCPB', this.HCPB)
      console.log('pregnant',this.pregnant._id)
      console.log('familyHistory', this.familyHistory)
      console.log('medicalHistory', this.medicalHistory)
      console.log('pregnancyHistory', this.pregnancyHistory)
      console.log('vaccinationRecord', this.vaccinationRecord)
      //validar
      //gestante seleccionada
      if(this.pregnant._id == null ) {pregnantSelect = false}      
      //sección antecedentes: familyHistory
      for (var i = 0; i < this.familyHistory.length; i++) {
          var objeto=  this.familyHistory[i]
          for (var key in objeto) {
            // if(objeto[key] == '' || objeto[key] == null ){

            if(objeto[key] === null ){  
               console.log('incompleto en familyHistory', i)
               console.log(' name=' + key + ' value=' +  objeto[key]);
               familyBackgroundComplete = false
               isIncomplete = false
            }           
          }
      }
      //sección antecedentes: medicalHistory
      if(this.medicalHistory.length != 0){
        for (var i = 0; i < this.medicalHistory.length; i++) {
          var objeto=  this.medicalHistory[i]
          for (var key in objeto) {
            if(objeto[key] == '' || objeto[key] == null ){
                console.log('incompleto en ', i)
                console.log(' name=' + key + ' value=' +  objeto[key]);
                medicalHistoryComplete = false
                isIncomplete = false
            }           
          }
        }
      }
      //sección antecedentes: pregnancyHistory
      if(this.pregnancyHistory.length != 0){
        console.log('entró al if', this.pregnancyHistory.length)
        for (var i = 0; i < this.pregnancyHistory.length; i++) {
          var objeto=  this.pregnancyHistory[i]
          for (var key in objeto) {
            if(objeto[key] == '' || objeto[key] == null ){
                console.log('incompleto en ', i)
                console.log(' name=' + key + ' value=' +  objeto[key]);
                pregnancyHistoryComplete = false
                isIncomplete = false
            }           
          }
        }
      }
      //sección  Embarazo actual: Datos Ginecológicos
      for (var key in this.HCPB) {
        if(this.HCPB.havePapSmear == '1'){
          if(this.HCPB.havePapSmearDate  == null || this.HCPB.PapSmearResult == null) {
          newPregnantComplete = false
          isIncomplete = false
          }
        }
        // if(objeto[key] == '' || objeto[key] == null ){
        if(this.HCPB[key] === null && key !='havePapSmearDate' && key != 'PapSmearResult' ){
            //console.log('incompleto en ', i)
            //console.log(' name=' + key + ' value=' +  objeto[key]);
            newPregnantComplete = false
            isIncomplete = false
        }           
      }
      //sección  Embarazo actual: Cartilla de vacunación
      for (var key in this.vaccinationRecord) {
        if(this.vaccinationRecord[key] == '' || this.vaccinationRecord[key] == null ){
            //console.log('incompleto en ', i)
            //console.log(' name=' + key + ' value=' +  objeto[key]);
            vaccinationComplete = false
            isIncomplete = false
        }           
      }
      var validationF = {complete: true, listVal: []}

      if(isIncomplete == false){
        var text= 'Campos incompletos, debe completar las siguientes secciones para registrar una nueva HCPB'
        var incompleteArray = []
        console.log('pregnantSelect', pregnantSelect)
        console.log('familyBackgroundComplete', familyBackgroundComplete)
        console.log('medicalHistoryComplete', medicalHistoryComplete)
        console.log('pregnancyHistoryComplete', pregnancyHistoryComplete)
        console.log('newPregnantComplete', newPregnantComplete)
        console.log('vaccinationComplete', vaccinationComplete)

        pregnantSelect == false ? incompleteArray.push('*Sección registro de gestante')  :null
        familyBackgroundComplete == false ? incompleteArray.push('*Sección registro de antecedentes: Antecedentes Familiares') :null
        medicalHistoryComplete == false ? incompleteArray.push('*Sección registro de antecedentes: Antecedentes médicos') :null
        pregnancyHistoryComplete == false ? incompleteArray.push('*Sección registro de antecedentes: Embarazos previos') :null
        newPregnantComplete == false ? incompleteArray.push('*Sección registro de embarazo actual') :null
        vaccinationComplete == false ? incompleteArray.push('*Sub-sección cartilla de vacunación') :null

        validationF.complete = false
        validationF.listVal = incompleteArray
        
      }
      return validationF
    },
    async createHCPB(){
      this.isLoading = true
      var response = await this.validationComplete()
      
      console.log('HCPB', this.HCPB)
      console.log('pregnant',this.pregnant._id)
      console.log('familyHistory', this.familyHistory)
      console.log('medicalHistory', this.medicalHistory)
      console.log('pregnancyHistory', this.pregnancyHistory )
      console.log('vaccinationRecord', this.vaccinationRecord)

      var newRecord = _.cloneDeep(this.HCPB)

      newRecord.familyHistory =  this.familyHistory
      newRecord.vaccinationRecord = this.vaccinationRecord
      newRecord.previousPregnancy = this.pregnancyHistory
      newRecord.medicalHistory = this.medicalHistory
      newRecord.idSpecialist = this.user._id

      console.log('newRecord::::::::::::', newRecord)
      
      console.log('respuesta validación ', response)



      if(response.complete == true ){
         newRecord.initialDiagnostic = await this.classifyPregnancy()
         console.log('classf', newRecord.initialDiagnostic)
         var newCreate = await consultServices('createHCPB','POST',newRecord);  
            if(newCreate.message){
              this.formNot.title="Error en operación";
              this.formNot.message='No se pudo crear un nuevo registro' //newCreate.message;
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message = "Registro creado";
              this.HCPB._id= newCreate._id
              //actualizar lista
              //this.clearForm()
              $('.modal').modal('hide');
            } 
      }else{
          this.formNot.title="Campos incompletos";
          this.formNot.message = "Debe completar las siguientes secciones para registrar una nueva HCPB.";
          this.arrayComplete = _.cloneDeep(response.listVal)
      }    
      this.showNotification();
      this.isLoading = false
    },
    addPregnancy(){
      var obj={}
      obj.pregnancyType = '',
      obj.pregnancyTermination = '',
      obj.dateOfBirth = '',
      obj.pregnancySite = '',
      obj.neonateStatus = '',
      obj.observation = '',
      this.pregnancyHistory.push(obj)
    },
    removeRegister(index){
      console.log('arreglo',this.pregnancyHistory )
      console.log('index selected ', index)
      this.pregnancyHistory.splice(index, 1);
    },
    redirect(text, id){
      //window.open('/dashboard/gestantes');
      if(text =='NEW_PREGNANT'){
        window.location="/dashboard/gestantes";
      }
      if(text =='FIRST_CONTROL'){
         window.location="dashboard/controlPrenatal?idHCPB="+this.HCPB._id;
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
    async classifyPregnancy(){
      var initialDiagnostic = ''
      var formD = {}
    
      formD.age= this.pregnant.age >= 20 && this.pregnant.age <= 34 ? 0 : 1 
      formD.gestationalAge= this.HCPB.gestationalAge >= 25 ? 1 : 0
      formD.nControls= 1
      formD.firstControl = 1
      formD.previousPreterm = this.HCPB.previousPretermPregnancy 
      formD.mpregnancy= this.HCPB.multiplePregenancy
      formD.shortUterineNeck= this.HCPB.shortUterineNeck
      formD.diabetes= 0
      formD.hypertension= 0
      formD.obesity = 0
      for (let index = 0; index < this.medicalHistory.length; index++) {
        if(this.medicalHistory[index].id == 6){ formD.diabetes= 1}
        if(this.medicalHistory[index].id == 10){ formD.hypertension= 1}
        if(this.medicalHistory[index].id == 11){ formD.obesity= 1}        
      }
      formD.highStressLevel = this.HCPB.highStressLevel    
      console.log('formD:::::::::::', formD)
      //var initialD = await consultServices('classifyPregnancy','POST',formD);  
      //console.log('initial D', initialD[0])
      var diagnosis= 'low_risk_of_preterm_birth'
      if(formD.age == 1 && formD.previousPreterm == 1 && formD.shortUterineNeck == 1  ){diagnosis = 'high_risk_of_preterm_birth'}
      else if (formD.diabetes == 1 || formD.hypertension == 1 || formD.obesity == 1  ){diagnosis = 'moderate_risk_of_preterm_birth'}      
      return diagnosis //initialD.codePregnancy 
    },
  }
};
</script>
<style scoped>
h1 {
  font-size: 1.25rem;
}
</style>
