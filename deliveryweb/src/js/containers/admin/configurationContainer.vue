<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <!--Sección 1 -->
        <div class="card">
            <div class="card-header"><strong>Asignación de Riders</strong></div>
            <div class="card-body">
                <!--Subsección 1.1 -->
                <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Distancia de búsqueda de rider (Km) *:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input class="form-control col-md-7 col-xs-12" id="company" type="number" min=1 v-model="form.distanceRiderSearch" placeholder="Ingrese la distancia">
                    </div>
                </div>
                <!--Subsección 1.2 -->
                <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Ordenamiento:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="col-md-9 col-form-label">
                        <div class="form-check form-check-inline mr-1">
                            <input id="sortBy1" class="form-check-input" type="radio" value="riders_closest_to_the_origin" name="inline-radios" v-model="form.checkedOrder">
                            <label class="form-check-label" for="inline-radio1">Priorizar los más cercanos al punto de origen</label>
                        </div>
                        <div class="form-check form-check-inline mr-1">
                            <input id="sortBy2" class="form-check-input" type="radio" value="riders_with_more_balance" name="inline-radios" v-model="form.checkedOrder">
                            <label class="form-check-label" for="inline-radio2">Priorizar a los riders con más saldo</label>
                        </div>                      
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Sección 2 -->
        <div class="card">
            <div class="card-header"><strong>Parámetros generales</strong></div>
            <div class="card-body">
                <!-- Nueva subsección: Precio del servicio -->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Precio del servicio</strong> </div>
                 
                                         
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Cuota por kilómetro:</label>                         
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div >                                
                                        <input class="form-control col-md-7 col-xs-12" id="company" type="number" v-model="form.feePerKm" min=0 max=100 placeholder="Ingrese la cuota">
                                    </div>
                                </div>                          
                            </div>   
                 
                </div> 
                <!--Subsección 2.1 -->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Descuento del rider</strong> </div>
                    <div class="card-body">

                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <div class="form-check checkbox">
                                    <input class="form-check-input" id="check1" type="checkbox" value="FLAT" v-model="form.flatMount">
                                </div>
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Monto FLAT:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input class="form-control col-md-7 col-xs-12" id="company" min=0 type="number" v-model="form.flatMountValue" placeholder="Ingrese el monto de descuento">
                                </div>
                        </div>

                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">

                                <div class="form-check checkbox">
                                    <input class="form-check-input" id="check1" type="checkbox" value="SERV" v-model="form.servicePercentage" >
                                </div>
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Porcentaje del servicio:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input class="form-control col-md-7 col-xs-12" id="company" type="number" v-model="form.servicePercentageValue" min=0 max=100 placeholder="Ingrese el porcentaje">
                                </div>

                        </div>
                        
                    </div>
                </div> 
                <!-- Subsección 2.2-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Horario de atención</strong> </div>
                       

                       
                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Horario de inicio:</label>                         
                            <div class="col-md-9 col-sm-6 col-xs-12">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <label for="ccmonth" class="col-md-3 col-sm-6 col-xs-12" style="padding-top: 5px; padding-left: 0px;" itemtype="">Hora:</label>
                                <select class="form-control col-md-6 col-sm-6 col-xs-12" v-model="form.startHour">
                                    <option disabled="disabled" value="">Selecciona una hora</option>
                                    <option v-for="item in hours"  v-bind:value="item.code">
                                        {{item.display}}
                                    </option>
                                </select>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <label for="ccyear" class="col-md-3 col-sm-6 col-xs-12" style="padding-top: 5px; padding-left: 0px;" >Minutos:</label>
                                <select class="form-control col-md-6 col-sm-6 col-xs-12" v-model="form.startMinute">
                                    <option disabled="disabled" value="">Selecciona un minuto</option>
                                    <option v-for="item in minutes" v-bind:value="item.code" >
                                        {{item.display}}
                                    </option>
                                </select>
                                </div>  
                            </div>                          
                        </div>  
                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Horario de fin:</label>                         
                            <div class="col-md-9 col-sm-6 col-xs-12">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <label for="ccmonth" class="col-md-3 col-sm-6 col-xs-12" style="padding-top: 5px; padding-left: 0px;" itemtype="">Hora: </label>
                                <select class="form-control col-md-6 col-sm-6 col-xs-12" v-model="form.endHour">
                                    <option disabled="disabled" value="">Selecciona una hora</option>
                                    <option v-for="item in hours"  v-bind:value="item.code">
                                        {{item.display}}
                                    </option>
                                </select>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <label for="ccyear" class="col-md-3 col-sm-6 col-xs-12" style="padding-top: 5px; padding-left: 0px;" >Minutos:</label>
                                <select class="form-control col-md-6 col-sm-6 col-xs-12" v-model="form.endMinute">
                                    <option disabled="disabled" value="">Selecciona un minuto</option>
                                    <option v-for="item in minutes" v-bind:value="item.code" >
                                        {{item.display}}
                                    </option>
                                </select>
                                </div>  
                            </div>                          
                        </div>  
                </div>   

                <!-- Subsección 2.3-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Intervalo para actualizar la posición del rider (en segundos)</strong> </div>                         
                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Intervalo:</label>                         
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div >                                
                                <select class="form-control" v-model="form.interval">
                                    <option disabled="disabled" value="">Selecciona una intervalo</option>
                                    <option v-for="item in minutes"  v-bind:value="item.code" >
                                        {{item.display}}
                                    </option>
                                </select>
                                </div>
                            </div>                          
                        </div>  
                </div> 


                <!-- Subsección 2.4-->
                <!-- <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Cuota por Kilómetro</strong> </div>                   
                        <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Cuota:</label>                         
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div >                                
                                    <input class="form-control col-md-7 col-xs-12" id="company" type="number" v-model="form.feePerKm" min=0 max=100 placeholder="Ingrese la cuota">
                                </div>
                            </div>                          
                        </div>   
                </div>      -->

              
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Lista de métodos de pago</strong> 
                    </div>    
                    <div class="card-header-actions" align-items: center>
                        <button type="button" @click="showAddMethod()" data-toggle="modal" data-target=".bs-example-modal-lg"  class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar nuevo método de pago
                        </button>
                    </div>
                    <div style="padding-top: 10px;">               
                    <TableMaf :header="colum" :data="paymentMethods" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>
                    </div>
                </div>  

                <!-- Subsección 2.5-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Factor de polución</strong> </div>                                                   
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">CO por kilómetro:</label>                         
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <div >                                
                                        <input class="form-control col-md-7 col-xs-12" id="company" type="number" v-model="form.pollutionFactor" min=0 max=100 placeholder="Ingrese el factor">
                                    </div>
                                </div>                          
                            </div>                    
                </div> 

                <!-- Subsección 2.6-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Consulta de estado de envío (Cliente)</strong> </div>                         
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Intervalo para refrescar el estado del envío en proceso:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input class="form-control col-md-7 col-xs-12" id="company" type="number" v-model="form.checkServiceInterval" min=0 max=100 placeholder="Ingrese el intervalo">
                                        </div>
                                    </div>                                  
                            </div>   
                </div> 

                <!-- Subsección 2.7-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Bonificación del rider</strong> </div>                         
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Monto de Bonificación de bienvenida:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input v-model="form.initialBonus" class=" form-control col-md-7 col-sm-6 col-xs-12" type="number" step="0.01" /> 
                                        </div>
                                    </div>                                  
                            </div>                             
                </div> 

                <!-- Subsección 2.8-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Notificaciones</strong> </div>             
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de administración:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input class="form-control col-md-7 col-xs-12"  type="text" v-model="form.adminPhone" placeholder="Ingrese un número telefónico">
                                        </div>
                                    </div>                                  
                            </div>              
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Correo para enviar notificaciones:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input class="form-control col-md-7 col-xs-12" id="company" type="text" v-model="form.email" min=0 max=100 placeholder="Ingrese una dirección de correo">
                                        </div>
                                    </div>                                  
                            </div>   
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Ingresa un valor para reemplazar la contraseña actual:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input v-model="form.newPassword" type="password" class="form-control col-md-7 col-xs-12"  placeholder="Contraseña" required="">
                                        </div>
                                    </div>                                  
                            </div>                            
                </div> 

                <!-- Subsección 2.9-->
                <div class="card-body">
                    <div class="card-header" style="margin-top: 10px;"><strong>Gestión de soporte</strong> </div>             
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Permitir que el cliente llame al soporte:</label>          
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="col-md-9 col-form-label">
                                    <div class="form-check form-check-inline mr-1">
                                        <input id="callSuport1" class="form-check-input" type="radio" value="Y" name="inline-radios" v-model="form.clientCallSupport">
                                        <label class="form-check-label" for="inline-radio1">Permitir</label>
                                    </div>
                                    <div class="form-check form-check-inline mr-1">
                                        <input id="callSuport2" class="form-check-input" type="radio" value="N" name="inline-radios" v-model="form.clientCallSupport">
                                        <label class="form-check-label" for="inline-radio2">No permitir</label>
                                    </div>
                                </div>
                                </div>                                 
                            </div>              
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de soporte al cliente:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input class="form-control col-md-7 col-xs-12" id="company" type="text" v-model="form.contactSupportNumber" min=0 max=100 placeholder="Ingrese un número">
                                        </div>
                                    </div>                                  
                            </div>   
                            <div class="row" style="padding-bottom: 5px;  padding-top: 5px;">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de administrador de soporte:</label>          
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div >
                                        <input v-model="form.contactAdminNumber" type="text" class="form-control col-md-7 col-xs-12"  placeholder="Ingrese un número" required="">
                                        </div>
                                    </div>                                  
                            </div>                            
                </div> 
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" @click="saveConfiguration()" class="btn btn-primary"> Guardar Cambios </button>
        </div>

      <!-- Modal  -->
      <div id="mainModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
                <div class="modal-header">
                    <h1 v-if="formType=='Add'">Agregar Método de pago</h1>
                    <h1 v-if="formType=='Edit'">Editar Método de pago</h1>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>

            <div class="modal-body">
              <div class="form-horizontal form-label-left">

                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="method.name"  type="text" required="required" class="form-control col-md-12 col-xs-12">                                
                            </div>
                    </div>

                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="method.detail" type="text" required="required" class="form-control col-md-12 col-xs-12"  >
                            </div>
                    </div>

                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control" v-model="method.status">
                                    <option disabled="disabled" value="">Selecciona una hora</option>
                                    <option  value="enabled">Habilitado</option>
                                    <option  value="disabled">Inhabilitado</option>
                                </select>
                            </div>
                    </div>

                <div class="modal-footer">
                        <center>
                            <button type="button" data-dismiss="modal" class="btn btn-default">Cancelar</button>
                            <button v-if="formType=='Add'"  @click="addMethod()" data-dismiss="modal" type="button" class="btn btn-success">Agregar</button>
                            <button v-if="formType=='Edit'" @click="updateMethod()" data-dismiss="modal" type="button" class="btn btn-primary">Guardar cambios </button>
                        </center>
                </div>       
                                
              </div>

            </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->

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



      <!--Modal Delete-->
      <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar método de pago</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar el mpetodo de cambio? 
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="removeMethod()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->

    </div>
  </div>
</template>

<script>
  import MasterTemplate from 'mowi-master';
  import moment from "moment";

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  import TableMaf from "./../../components/tableMaf.vue";
  const uuidv1 = require('uuid/v1');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
        TableMaf,
      },
      data: () => ({
          isLoading: false,
          hours:[],
          minutes:[],
          form: {},
          formType: '',
          formNot:{title:'',message:'',},
          colum:[],
          titleTable:'', 
          paymentMethods:[],   
          methodsArray:[],
          method:{},
          formType:'',      
          configuration:{},
          indexMethod:0,
          sortBy: null
      }),
      
      async created () {
        var ctx = this;
        //en esta sección se poblan los arreglos de horas y minutos
        for (let index = 0; index < 24; index++) {
          var hour ={}
          //mostrar hora con el formato de dos dígitos: 00, 01, 02 ... 23
          if(index < 10){
              hour.display = '0'+index
          }else{
              hour.display = index
          }
          hour.code = index
          this.hours.push(hour)            
        }
        for (let index = 0; index < 60; index++) {
          var minute ={}
          //mostrar minutos con el formato de dos dígitos: 00, 01, 02 ... 60
          if(index < 10){
              minute.display = '0'+index
          }else{
              minute.display = index
          }
          minute.code = index
          this.minutes.push(minute)            
        }
        //obtener configuración
        await this.getConfiguration()
        //poblar la tabla de métdos de pago
        await this.setHeadTable();
        console.log('horas', this.hours)
        console.log('minutos', this.minutes)
  	  },
      
      methods: {

        //Configuramos la cabecera de la tabla de métodos de pagos
        setHeadTable(){
        this.colum = [
            {label:'Método de pago' ,name:'name' ,find:0 ,sort:0},
            {label:'Detalle' ,name:'detail' ,find:1 ,sort:1},
            {label:'Estado' ,name:'status' ,find:1 ,sort:1},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}
            ];
            this.titleTable = "Métodos de pago";
        },

        //Actualizar tabla de métodos de pagos
        refreshData(){         
            this.$refs.tableMaf.formatData(this.arrayMethods);          
        },

        setDataTable(arrayData){
          var ctx = this;
          var type= type;
        
            this.arrayMethods = [];
            this.arrayMethods = _.map(arrayData, (item, i) => {
                    var method= {};
                    method.name = item.name;
                    method.detail = item.detail;
                    method.actions = 
                    <font style="vertical-align: inherit;">  
                        <div class="btn-group" role="group">
                        <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acciones
                        </button>
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" onClick={()=>ctx.showEditModal(item, i)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar </a>
                            <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item, i)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                        </div>
                        </div>
                    </font>
                    var status= ''
                    item.status == 'enabled'? status = 'Habilitado': status = 'Inhabilitado'
                    method.status= status
                    method.position = i
                    return method    

            })   

          this.refreshData();
        },
        showAddMethod(){
          this.isLoading = true;
          this.formType = 'Add'          
          this.isLoading = false;
        },
        addMethod(){
            this.paymentMethods.push(this.method)
            this.setDataTable(this.paymentMethods);
            this.clearForm()
        },
        showEditModal(item, i){
            this.method = item
            this.formType = 'Edit'  
            this.indexMethod = i 
        },

        showDeleteModal(item,i){
            this.method= item
            this.indexMethod = i 
        },
        removeMethod(){
           this.paymentMethods.splice(this.indexMethod, 1);
           this.setDataTable(this.paymentMethods);
        },
        clearForm(){
            this.method = {}
        },
        updateMethod(){
            console.log('entró a ', this.paymentMethods)

            let _item = _.cloneDeep(this.method)
            this.paymentMethods.splice(this.indexMethod, 1, _item );
            this.setDataTable(this.paymentMethods); 
            this.clearForm()            
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        /**
         * saveConfiguration(): esta función permite guardar los parámetros de configuración ingresados
         * en la función se distingue si ya existe un documento de la colección configuración en la bd o si debe crearse 
         */
        async saveConfiguration(){
            this.isLoading = true
            console.log('entro a saveConfiguration', this.form)
            console.log('entro a paymentMethods', this.paymentMethods)            
            //el campo Distancia de búsqueda de rider (Km) no puede estar vacío
            if(this.form.distanceRiderSearch == null || this.form.distanceRiderSearch == "" ){
                alert('Debe completar los campos obligatorios (*)')
            }else{
                var flag= confirm('¿Actualizar la configuración del sistema?')
                if(flag == true){
                    //armar el objeto
                    var configuration={
                        bussinessHour:{
                            start:{},
                            end:{}
                        }
                    }
                    console.log('mira el cheeeeck',this.sortBy)
                    configuration.distanceRadius = this.form.distanceRiderSearch
                    this.sortBy != null ? configuration.sortBy = this.sortBy :null
                    this.form.startHour != null ? configuration.bussinessHour.start.hour= this.form.startHour :null
                    this.form.startMinute != null ? configuration.bussinessHour.start.minute= this.form.startMinute :null
                    this.form.endHour != null ? configuration.bussinessHour.end.hour= this.form.endHour :null
                    this.form.endMinute != null? configuration.bussinessHour.end.minute= this.form.endMinute :null
                    this.form.flatMountValue ? configuration.flatAmount = this.form.flatMountValue : configuration.flatAmount=null 
                    this.form.servicePercentageValue ? configuration.servicePercentage = this.form.servicePercentageValue : configuration.servicePercentage = null
                    this.form.flatMount == true ? configuration.useFlatAmount = this.form.flatMount : configuration.useFlatAmount=false 
                    this.form.servicePercentage == true ? configuration.usePercentage = this.form.servicePercentage : configuration.usePercentage = false
                    this.form.interval ? configuration.timerInterval= (this.form.interval)*1000 :null
                    this.form.feePerKm ? configuration.feePerKm = this.form.feePerKm :null
                    this.form.pollutionFactor ? configuration.pollutionFactor = this.form.pollutionFactor :null
                    this.form.checkServiceInterval ? configuration.checkServiceInterval = this.form.checkServiceInterval :null
                    this.form.newPassword ? configuration.password = this.form.newPassword :null
                    this.form.email ? configuration.email = this.form.email :null
                    this.form.initialBonus ? configuration.initialBonus = this.form.initialBonus :null
                    this.form.adminPhone ? configuration.adminPhone = this.form.adminPhone :null 
                    this.paymentMethods ? configuration.paymentMethods = this.paymentMethods : null                  
                    this.form.clientCallSupport == 'Y'? configuration.clientCallSupport = true : configuration.clientCallSupport = false 
                    this.form.contactSupportNumber ? configuration.contactSupportNumber = this.form.contactSupportNumber :null 
                    this.form.contactAdminNumber ? configuration.contactAdminNumber = this.form.contactAdminNumber :null 

                    //actualizar o crear objeto
                    console.log('configuration a enviar ', configuration)
                    const response = await consultServices('saveConfiguration','POST',configuration);
                    if(response.status == 400){
                        this.formNot.title="Error en operación";
                        this.formNot.message="No se pudo actualizar la configuración";  
                    }else{
                        this.formNot.title="Operación exitosa";
                        this.formNot.message="Se actualizaron los datos de la configuración del sistema";  
                        $('.modal').modal('hide');
                        this.getConfiguration();
                    }
                }
                this.showNotificacion();
            }
            this.isLoading = false

        },

        /**
         * getConfiguration(): esta función permite obtener los datos de la configuración para mostrarlo en pantalla
         */
        async getConfiguration(){
            //consultar configuración
            var response = await consultServices('getConfiguration','POST',{});  
            console.log('response', response ) 
            if(response.status == 200 && response.configuration.length > 0 ){
                this.form =[]
                //darle formato para mostrar en la pantalla
                var configuration = response.configuration[0]
                console.log("config miraaaaaaaaaaaaaaaaaaa", configuration.sortBy  )
                
                configuration.distanceRadius ?  this.form.distanceRiderSearch = configuration.distanceRadius :null
                if(configuration.sortBy == "riders_with_more_balance"){
                    console.log('entróooooooooooooooo 1000000000000',configuration.sortBy )
                    document.getElementById("sortBy1").checked = true;
                }else if(configuration.sortBy == "riders_closest_to_the_origin" ){
                    console.log('entróooooooooooooooo 2000000000000',configuration.sortBy )
                    document.getElementById("sortBy2").checked = true;
                }

                if(configuration.clientCallSupport == true){
                    document.getElementById("callSuport1").checked = true;
                }else if(configuration.clientCallSupport == false ){
                    document.getElementById("callSuport2").checked = true;
                }        

                //configuration.sortBy ? this.form.checkedOrder = configuration.sortBy :null
                if(configuration.bussinessHour){
                    if(configuration.bussinessHour.start){
                        configuration.bussinessHour.start.hour != null ? this.form.startHour = configuration.bussinessHour.start.hour :null
                        configuration.bussinessHour.start.minute != null ?  this.form.startMinute = configuration.bussinessHour.start.minute :null
                    }
                    if(configuration.bussinessHour.end){
                        configuration.bussinessHour.end.hour != null?  this.form.endHour = configuration.bussinessHour.end.hour :null
                        configuration.bussinessHour.end.minute != null ? this.form.endMinute =configuration.bussinessHour.end.minute :null
                    }

                }
                
                configuration.useFlatAmount ? this.form.flatMount = configuration.useFlatAmount :null
                configuration.usePercentage ? this.form.servicePercentage = configuration.usePercentage :null
                configuration.pollutionFactor ? this.form.pollutionFactor = configuration.pollutionFactor :null
                configuration.checkServiceInterval ? this.form.checkServiceInterval = configuration.checkServiceInterval :null
                configuration.email ? this.form.email = configuration.email :null
                configuration.initialBonus ? this.form.initialBonus = configuration.initialBonus :null
                configuration.adminPhone ? this.form.adminPhone = configuration.adminPhone :null
                configuration.clientCallSupport == true ? this.form.clientCallSupport = 'Y' : this.form.clientCallSupport = 'N' 
                configuration.contactSupportNumber ? this.form.contactSupportNumber = configuration.contactSupportNumber :null
                configuration.contactAdminNumber ? this.form.contactAdminNumber = configuration.contactAdminNumber :null



                if(configuration.flatAmount){
                    this.form.flatMountValue = configuration.flatAmount
                    //this.form.flatMount = true
                } 

                if(configuration.servicePercentage){
                    this.form.servicePercentageValue = configuration.servicePercentage
                    //this.form.servicePercentage = true
                }

                if(configuration.paymentMethods){
                    this.paymentMethods = configuration.paymentMethods
                    this.setDataTable(this.paymentMethods)
                }

                if(configuration.timerInterval){
                    this.form.interval = (configuration.timerInterval)/1000
                }

                if(configuration.feePerKm){
                    this.form.feePerKm = (configuration.feePerKm)
                }
            }
            
        },
        
        limpiarForm() {
          this.form.title="";
          this.form.content="";
          this.form.target="";
          this.form.size="";

        },
      }
  }
</script>
