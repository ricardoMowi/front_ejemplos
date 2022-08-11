<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Clientes </h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar cliente 
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsClient.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getClients"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsClient.customActions"  
            :data="this.clients"
            :tableTitle="titleTable"
            :flagUploadData="flagUploadData"
            :registerFields="registerFields"          
            :progressBarValue="progressBarValue"          
            :loadSummary ="loadSummary"
            :uploadFunction="this.uploadFunction"
            :showSearchSection="this.showSearchSection"
          ref="mowiMaster"/>
        </div>

        
      </div>

      <!-- Modal  -->
        <div id="myModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Registrar cliente</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar cliente</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>
              <!-- <h5>(*) Campos obligatorios</h5> -->

              <div class="modal-body">
                <div class="form-horizontal form-label-left">
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                     <inputMaf type="text" v-model="form.documentNumber" :valueInput='form.documentNumber'
                        label="Nro. Documento: (*)" :validation="{required:true, min:8}" nameInput="document" etiqueta='true' ref="documentNumber">
                     </inputMaf>                      
                   </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type='text' v-model="form.name"  :valueInput='form.name' label="Nombre: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="name">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.lastName" :valueInput='form.lastName' label="Apellido paterno: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="lastName">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.secondLastName" :valueInput='form.secondLastName' label="Apellido materno:" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="secondLastName">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.email"  :valueInput='form.email' label="Correo electrónico: (*)" :validation="{required:false, email:true}" nameInput="email" etiqueta='true' ref="email">
                      </inputMaf>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <inputMaf type="text"  v-model="form.phone" :valueInput='form.phone' label="Teléfono:" :validation="{required:true, numeric:true}" nameInput="phone"  etiqueta='true' ref="phone">
                        </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Dirección </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input v-model="addressPrincipal.addressLine1" type="text" id="addressPrincipalDiv" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                  </div>
                  <div class="form-horizontal form-label-left">
                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del interior: </label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input v-model="addressPrincipal.interior" type="text" class="form-control col-md-12 col-xs-12">
                          </div>
                      </div>                  
                  </div> 
                  <div class="form-horizontal form-label-left" style="padding-bottom: 10px;">
                      <div class="map" id="mapRender" style="height: 400px;"></div>
                  </div>
                   
                  <div class="card-body">
                    <div class="form-group" v-if="formType=='EDIT'">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                      <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <button @click="toActive()" v-if="form.statusCode==0" class="btn btn-success" style="margin-bottom: 5px;" type="button">Aprobar cliente</button>
                            <button @click="toInactive()" v-if="form.statusCode==1" class="btn btn-warning" style="margin-bottom: 5px;" type="button">Inactivar cliente</button>
                            <button @click="toActive()" v-if="form.statusCode==2" class="btn btn-success" style="margin-bottom: 5px;" type="button">Activar cliente</button>
                            <!-- <button @click="resetPassword()" class="btn btn-danger" style="margin-bottom: 5px;" type="reset">Restaurar Contraseña</button> -->
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="form-group table-responsive" v-if="formType=='EDIT' && showDataLastServices==true">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Últimos servicios: </label>
                      <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline " role="grid">
                        <thead>
                            <tr>
                                <th style="width: 20px;">Fecha de servicio</th>
                                <th style="width: 20px;">Recoger en </th>
                                <th style="width: 20px;">Entregar en </th>
                                <th style="width: 20px;">Rider </th>
                                <th style="width: 20px;">Teléfono del rider </th>
                                <th style="width: 20px;">Estado </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dataLastServices" >
                                <th style="width: 20px;">
                                  <label>{{item.creationDate}} </label>
                                </th>
                                <th style="width: 20px;">
                                  <label>{{item.fromAddress}} </label>
                                </th>                              
                                <th style="width: 20px;">
                                  <label>{{item.toAddress}} </label>
                                </th>
                                <th style="width: 20px;">
                                  <label>{{item.riderName}} </label>
                                </th>     
                                <th style="width: 20px;">
                                  <label>{{item.riderPhone}} </label>
                                </th>
                                <th style="width: 20px;">
                                  <label>{{item.currentStatus}} </label>
                                </th>                                                     
                            </tr>
                        </tbody>
                      </table>
                    </div>    
                  </div>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="newCustomer == true" type="button" class="btn btn-primary"> <a href="/dashboard/serviceManagement" style="color: #f7f7f7;" > Regresar a registro de servicio </a> </button>
                  <button v-if="formType == 'ADD'" @click="createUser()" type="button" class="btn btn-primary">Confirmar</button>
                  <button v-if="formType == 'EDIT'" @click="updateUser()" type="button" class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!-- Modal Registrar servicio -->
        <div class="modal fade bs-example-modal-service" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3  class="modal-title" id="myModalLabel" >Agregar servicio </h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12"> Cliente: (*)</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input readonly type="text" id="name" class="form-control" v-model="formService.client">
                            </div>                                                         
                        </div>                         
                    </div>      
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione Riders: (*)</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <SearchComponent v-model="formService.rider" :arrayData="riders"  service="listRiders" displayNameKey="fullname" ref="rider">                                             
                                </SearchComponent>
                            </div>
                        </div>                  
                    </div>
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Recoger en: (*)</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="addressFrom.addressLine1" type="text" id="addressAutocomplete" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
                            </div>
                        </div>                  
                    </div>         
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del interior: </label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="addressFrom.interior" type="text" class="form-control col-md-12 col-xs-12">
                            </div>
                        </div>                  
                    </div>            
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Entregar en: (*)</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input   v-model="addressTo.addressLine1" type="text" id="addressAutocompleteTo" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
                            </div>
                        </div>                  
                    </div> 
                    <div class="form-horizontal form-label-left">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del interior: </label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="addressTo.interior" type="text" class="form-control col-md-12 col-xs-12">
                            </div>
                        </div>                  
                    </div>                     
                    <div class="form-horizontal form-label-left" style="padding-bottom: 10px;">
                        <div class="map" id="mapRender" style="height: 400px;"></div>
                    </div>

                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Notas:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                                <textarea v-model="formService.notes" class="form-control col-md-12 col-xs-12"></textarea>
                            </div>
                    </div>      
                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del paquete:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                                <textarea v-model="formService.packageDescription" class="form-control col-md-12 col-xs-12"></textarea>
                            </div>
                    </div>   
                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Mensaje para el rider:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                                <textarea v-model="formService.messageForRider" class="form-control col-md-12 col-xs-12"></textarea>
                            </div>
                    </div>              
                    <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                              <input readonly type="text" id="name" class="form-control" v-model="formService.date">
                            </div>
                    </div>                 
                  </div>                  

                  <div class="modal-footer">
                    <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                    <button  @click="createService()" type="button" class="btn btn-primary">Aceptar </button>
                  </div>
                </div>



            </div>
        </div>
      <!-- Modal Fin -->

      <!--Modal Borrar-->
        <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                  <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al cliente : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteUser()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
                    </center>
                  </div>
            </div>
          </div>
        </div>
      <!--Modal Fin-->

      <!--Modal not-->
        <div id="myModalNot" class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
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
                           <button v-if="newCustomer == true" type="button" class="btn btn-primary"> <a href="/dashboard/serviceManagement" style="color: #f7f7f7;" > Regresar a registro de servicio </a> </button>
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
  import moment from "moment";

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import Treeselect from '@riophae/vue-treeselect';
  import TableMaf from "./../../components/tableMaf.vue";
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');


  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        Treeselect,
        TableMaf,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
      },
      data: () => ({
          //windows
          newCustomer: window.INITIAL_STATE.newCustomer,
          //services
          dataLastServices:[],
          showDataLastServices:false,
          //mapa
          markers:[],
          markerFrom:{},
          markerTo:{},
          markerPrincipal:[],
          place: null,
          autocompleteFrom: null,
          addressPrincipal:{
              addressLine1 : null,
              interior : null,
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point"
              },
              isPrimary: true
          },
          addressFrom:{
              addressLine1 : null,
              interior : null,
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point"
              },
              isPrimary: false
          },
          addressTo:{
              addressLine1 : null,
              interior : null,
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point"
              },
              isPrimary: false
          },
          riders:[],
          formService:{},
          map:null,
          //////////
          pointCenter:null,
          zoomMap: null,
          isLoading: false,
          users: [],
          form: {},
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          clients: [],
          countries: [],
          client: {},
          propsClient: {
            filters: [              
              {
                name:'fullName',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombres o apellidos",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              },  
              {
                name:'documentNumber',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Número de Doc.",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp: false,
                selectField:true,
                isRequired :false,        
              }, 
              {
                name:'email',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Correo",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              }, 
              {
                name:'phone',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Teléfono",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              }, 
            ],
          },
          useMassiveSelector:false,
          titleTable: '', //No tiene efecto
          flagUploadData:false, //ocultar sección de subida masiva
          showSearchSection: true, //mostrar la sección de búsqueda
          registerFields:[{name:'id',displayValue:'Identificador'}, {name:'phone', displayValue:'Teléfono'}],
          progressBarValue: 0,
          loadSummary:[{
            total:5,
            successful:4,
            errors:1,
            detail:[],
          }],
      }),
      async created () {
        var ctx = this;
        this.clients = await this.getClients()
        this.setHeadTable();
        $(document).ready(function(){
            $(".show-modal").click(function(){
                $("#myModa").modal({
                    backdrop: 'static',
                    keyboard: false
                });
            });
        });   
        this.$refs.mowiMaster.setInitialData(this.clients)
        if(this.newCustomer == true){
          this.formType='ADD'
          $('.bs-example-modal-lg').modal('show');
        }    
      },
      
      mounted(){
        this.geocoder = new google.maps.Geocoder();
        
        //nodo para la direccion del modal de usuario
        var startNodeAddressPrincipal = document.getElementById('addressPrincipalDiv');
        this.autocompleteAddress =  new google.maps.places.Autocomplete(startNodeAddressPrincipal,{
              types: ['geocode'],
              componentRestrictions: {country: 'per'}
        });

        //nodo para el punto de origen del viaje
        var startNodeFrom = document.getElementById('addressAutocomplete');
        this.autocompleteFrom =  new google.maps.places.Autocomplete(startNodeFrom,{
              types: ['geocode'],
              componentRestrictions: {country: 'per'}
        });

        //nodo para el punto de destino del viaje
        var startNodeTo = document.getElementById('addressAutocompleteTo');
        this.autocompleteTo =  new google.maps.places.Autocomplete(startNodeTo,{
              types: ['geocode'],
              componentRestrictions: {country: 'per'}
        });      

        //inicializar mapa
        var mapNode = document.getElementById('mapRender');
        var map = new google.maps.Map(mapNode,{
          center: {lat: -12.0783252, lng: -77.032439},
          zoom: 15,
          disableDefaultUI: true,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#28292a"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "color": "#414244"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": "-75"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#b7b7b7"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#9c9fa4"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#9c9ea3"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#929599"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#28292a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#b8bbc1"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#373737"
                        },
                        {
                            "weight": "2.01"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "hue": "#ff0000"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#83858a"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#83858a"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#070707"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                }
            ]
        
        });
        this.map=map;
        
        //Habilitar el autocompletado
        this.autocompleteFrom.addListener('place_changed', ()=>{this.onPlaceChanged('addressAutocomplete',this.map)});
        this.autocompleteTo.addListener('place_changed', ()=>{this.onPlaceChanged('addressAutocompleteTo',this.map)});
        this.autocompleteAddress.addListener('place_changed', ()=>{this.onPlaceChanged('addressPrincipalDiv',this.map)});
        
      },

    
      methods: {

        onPlaceChanged (id,map){
          const value  = document.getElementById(id).value.trim()
          if(id=="addressAutocompleteTo"){
              this.addressTo.addressLine1 = value
          }
          if(id=="addressAutocomplete"){
              this.addressFrom.addressLine1 = value
          }
          if(id=="addressPrincipalDiv"){
              this.addressPrincipal.addressLine1 = value
          }
          this.geocodeAddress(value,map,id)
          this.form.address=value
        },

        geocodeAddress   (address,map,id) {
          this.geocoder.geocode({'address': address}, (results, status)=>{this._geocodeAddress(results, status, map, id)});
        },

        _geocodeAddress  (results, status, map, id) {
          if (status === google.maps.GeocoderStatus.OK) {
              const position = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              }     
              var coordinates=[]    

              coordinates.push(results[0].geometry.location.lat())   
              coordinates.push(results[0].geometry.location.lng())   
              
              if(id=="addressAutocomplete"){
                  this.addressFrom.location.coordinates = coordinates
              }
              if(id=="addressAutocompleteTo"){
                  this.addressTo.location.coordinates = coordinates
              }              
              if(id=="addressPrincipalDiv"){
                  this.addressPrincipal.location.coordinates = coordinates
              }
              this.addMarkerInMap(position.lat, position.lng, map, id)
              this.form.location = [position.lat, position.lng];
          } 
          else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        },

        addMarkerInMap (lat, lng, map, id){
          const position = {
            lat,
            lng
          }

          var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: position,
          });

          this.addEventMarker(marker,'dragend',this.handleDraggedEvent,()=>{});

          if(id=="addressAutocomplete"){  
              if(this.markerFrom.position){
                  this.markerFrom.setMap(null);
              }
              this.markerFrom = marker
              this.markerFrom.setMap(map)
          }
          if(id=="addressAutocompleteTo"){
              if(this.markerTo.position){
                  this.markerTo.setMap(null);
              }
              this.markerTo = marker
              this.markerTo.setMap(map)
          }
          if(id=="addressPrincipalDiv"){
              if(this.markerPrincipal.position){
                  this.markerPrincipal.setMap(null);
              }
              this.markerPrincipal = marker
              this.markerPrincipal.setMap(map)
          }
          map.setCenter(position);

        },

        addEventMarker (marker,eventName,func,animation) {
          marker.addListener(eventName, (e) => {
            func(marker,e);
            animation(marker);
          });
          return marker;
        },

        handleDraggedEvent (marker, event) {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
          this.form.location = [position.lat, position.lng];
          console.log(position)
        },

        deleteClient(index) {

        },



        async createService(){
            this.isLoading=true;
            var form ={}

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0')
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy
            this.formService.date=today
            form.idClient = this.formService.idClient
            form.clientName = this.formService.client
            form.phone = this.formService.phone
            form.idRider = this.formService.rider._id
            form.riderName = this.formService.rider.fullname
            form.riderPhone = this.formService.rider.phone
            form.notes = this.formService.notes
            form.packageDescription = this.formService.packageDescription
            form.messageForRider = this.formService.messaegForRider
            form.deliveryDate = this.formService.deliveryDate
            form.fromAddress = this.addressFrom
            form.toAddress = this.addressTo

            if(this.formService.rider == null  ){
              Alert("Por favor complete los campos obligatorios")
            }
            else{
              const response0 = await consultServices('createService','POST',form);
              if(response0.status == 200){
                  this.formNot.title="Operación exitosa";
                  this.formNot.message="Se ha registardo con éxito un nuevo servicio";
              }else{
                  this.formNot.title="Error en la operación";
                  this.formNot.message=response0.message;
              }        
              $('.modal').modal('hide');        
            }
            this.clearModalService();
            this.isLoading=false;
            this.showNotificacion();
        },

        clearModalService(){
          this.formService ={}

          this.addressFrom.addressLine1=null
          this.addressFrom.interior=null
          this.addressFrom.location.coordinates=[]

          this.addressTo.addressLine1=null
          this.addressTo.interior=null
          this.addressTo.location.coordinates=[]

          
          if(this.markerFrom.position){
             this.markerFrom.setMap(null);
          }
          if(this.markerTo.position){
             this.markerTo.setMap(null);
          }


        },
        async listRiders() {
          this.isLoading=true;          
          const response = await consultServices('listRiders','POST',{});   
          this.riders = response  
          console.log('riders::::::::::: ', this.riders)
          this.isLoading=false;
        },

        setHeadTable() {
          console.log('setHeadTable')
          this.colum = [
              {name:'documentNumber', label: 'DNI', find:1, sort:1},
              {name:'fullname', label: 'Nombre', find:1, sort:1},
              {name:'phone', label: 'Teléfono', find:1, sort:1},
              {name:'email', label: 'Correo', find:1, sort:1},
              {name:'userPhotoUrl', label: 'Foto', find:0, sort:0},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados ";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(clients){  
          console.log('setDataTable, client ', clients)
          var ctx = this;
          var formattedClients = [];
          clients.forEach(item => {
            var client = {};

            client.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    <a class="dropdown-item" onClick={()=>ctx.showCreateService(item)} data-toggle="modal" data-target=".bs-example-modal-service">Crear servicio</a> 
                    
                  </div>
                </div>
              </div>
            );
            client.documentNumber = item.documentNumber;
            client.fullname = item.fullname;
            client.phone = item.phone;
            client.email = item.email;
            client.userPhotoUrl = item.userPhotoUrl;
            client.id = item._id
            formattedClients.push(client);
          }); 
          return formattedClients
        },
        /**
        *  La función getClients() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getClients(filters) {
          console.log('getClients: ', filters)
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var fullName  =_.filter(filters,{'name':'fullName'});
              var documentNumber  =_.filter(filters,{'name':'documentNumber'});
              var email  =_.filter(filters,{'name':'email'});
              var phone  =_.filter(filters,{'name':'phone'});
              /**obtener los valores y agregarlos en el objeto filter */
              console.log('test', fullName[0])
              fullName.length > 0 ?  filter.fullName = fullName[0].value.variable : null
              documentNumber.length > 0 ?  filter.documentNumber = documentNumber[0].value.variable : null
              email.length > 0 ?  filter.email = email[0].value.variable : null
              phone.length > 0 ?  filter.phone = phone[0].value.variable : null
              filter.isClient = true

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              var response1 = await consultServices('searchClients','POST',filter);  
              response1.status == 200 ? look = response1.clients : null
          }else{
              look = await consultServices('listClients','POST',{});   
          }
          return look

        },
        async showNotificacion(isSucces=true){
          this.formNot.title==isSucces?'Operación exitosa':'Error'
          $('.bs-example-modal-not').modal('show');
        },

        async updateUser() {
          this.isLoading=true;
          var form = _.cloneDeep(this.form)
          form.address = this.addressPrincipal 
          form.roles = this.value;
          if(!this.form.documentNumber||!this.form.name||!this.form.lastName || !this.form.email){
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }else{
            const userUpdated = await consultServices('updateUser','POST',form);
            if(userUpdated.error){
              this.formNot.title="Error en operación";
              this.formNot.message=userUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del cliente de manera correcta";  
              
              $('.modal').modal('hide');
               const response = await consultServices('listClients','POST',{});
               this.refreshData(response);
            }
          }
          this.isLoading=false;
          this.showNotificacion();
          this.limpiarForm();
        },
        validar(){
            if(!this.$refs.documentNumber.returnValidation() || !this.$refs.name.returnValidation() || !this.$refs.lastName.returnValidation() || !this.$refs.email.returnValidation()){
              return false;
            }else{return true;}
        },
        async createUser() {
            console.log('dirección ', this.addressPrincipal)
            this.isLoading = true;
            var form = {}
            form.name= this.form.name;
            form.lastName= this.form.lastName
	          form.secondLastName=this.form.secondLastName
	          form.email = this.form.email
	          form.password = this.form.password
	          form.phone = this.form.phone
	          form.documentType= 'DNI'
            form.documentNumber= this.form.documentNumber
            form.address = this.addressPrincipal
            console.log('formListo', form)
            // form.clientDetail= {lastServices:[], totalServices:[], complains:[], addresses:[]}

            if(!this.validar() || !this.form.email){
              this.formNot.message="Por favor complete los campos obligatorios";
              this.formNot.title="Campos incompletos"
            }else{
              //const response0 = await consultServices('createClient','POST',form);
              const response0 = await consultServices('createClient','POST',form);
              const response = await consultServices('listClients','POST',{});           
                if(response0.message){
                  this.formNot.title = "Error en operación";
                  this.formNot.message = response0.message;  
                }else{
                  this.formNot.title = "Operación exitosa";
                  this.formNot.message = "Se actualizaron los datos del cliente de manera correcta";  
                  this.limpiarForm();
                  $('.modal').modal('hide');
                  const response = await consultServices('listClients','POST',{});
                  this.refreshData(response);
                }
              $('.modal').modal('hide');
            }
            this.isLoading=false;
            this.showNotificacion();
        },
        async deleteUser() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            form.roles = this.value;
            //const response0 = await consultServices('deleteClient','POST',form);
            const response = await consultServices('listClients','POST',{});
            this.users=response;
            this.isLoading=false;
            this.formNot.title="Operación exitosa";
            this.formNot.message="El cliente seleccionado está inactivo";
            if(response0.code || response0.error){
              this.formNot.title="Error en la operación";
              this.formNot.message=response0.message;
              this.showNotificacion(false);
            }else{
              this.showNotificacion();
            }
        },
        showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
        },
        showAddModal() {
           //limpiar mapa
          this.addressPrincipal.addressLine1=null
          this.addressPrincipal.interior=null
          this.addressPrincipal.location.coordinates=[]

          if(this.markerPrincipal.position){
            this.markerPrincipal.setMap(null);
          } 

           this.formType = "ADD";
           this.$refs.documentNumber.dataInput();
           this.$refs.name.dataInput();
           this.$refs.lastName.dataInput();
           this.$refs.secondLastName.dataInput();
           this.$refs.email.dataInput();
           this.$refs.phone.dataInput();
           this.clients = [];
           
           var today = new Date();
           var dd = String(today.getDate()).padStart(2, '0')
           var mm = String(today.getMonth() + 1).padStart(2, '0')
           var yyyy = today.getFullYear();

           today = mm + '/' + dd + '/' + yyyy
           this.formService.date=today
           this.value = null;


        },
        limpiarForm() {
          this.form.documentNumber="";
          this.form.name="";
          this.form.surName="";
          this.form.lastName="";
          this.form.email="";
          this.form.phone="";
          
          this.addressPrincipal.addressLine1=null
          this.addressPrincipal.interior=null
          this.addressPrincipal.location.coordinates=[]

          if(this.markerPrincipal.position){
             this.markerPrincipal.setMap(null);
          }          
        },
       
        async refreshData(response){
          console.log('refreshData')
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showEditModal(item) {
          //limpiar mapa
          this.addressPrincipal.addressLine1=null
          this.addressPrincipal.interior=null
          this.addressPrincipal.location.coordinates=[]

          if(this.markerPrincipal.position){
             this.markerPrincipal.setMap(null);
          } 
          console.log("iteeeeeeeeeeeeeem", item)
          this.formType = "EDIT";
          if(item.clientDetail){
              if(item.clientDetail.totalServices > 0){
                this.dataLastServices = []
                this.showDataLastServices = true
                for (let index = 0; index < item.clientDetail.lastServices.length; index++) {
                  var obj={}
                  var date = new Date(item.clientDetail.lastServices[index].creationDate)
                  date.toDateString() 
                  obj.creationDate = date.getDate()+ '/'+(date.getMonth()+1)+'/'+date.getFullYear()
                  obj.fromAddress = item.clientDetail.lastServices[index].fromAddress.addressLine1
                  obj.toAddress = item.clientDetail.lastServices[index].toAddress.addressLine1
                  obj.riderName = item.clientDetail.lastServices[index].riderName
                  obj.riderPhone = item.clientDetail.lastServices[index].riderPhone
                  obj.currentStatus = item.clientDetail.lastServices[index].currentStatus.description    
                  this.dataLastServices.push(obj)       
                }
              }
          }
          else{
            this.showDataLastServices = false
            this.dataLastServices = []          
          }
          this.form = _.cloneDeep(item);
          this.value = this.form.roles;
          //mostrar puntos de origen y destino del viaje
          if(item.address){
            this.addressPrincipal.addressLine1 = item.address.addressLine1      
            this.addressPrincipal.interior = item.address.interior     
            this.addressPrincipal.location.coordinates = item.address.location.coordinates
            this.addMarkerInMap(this.addressPrincipal.location.coordinates[0], this.addressPrincipal.location.coordinates[1],this.map,'addressPrincipalDiv' )
          }

          console.log('el value es: ', this.vale)
          this.clients = (this.form.clients||[]);
        },

        uploadFunction(array){},

        async showCreateService(item) {
          this.clearModalService()
          this.formService ={}
          this.formService.idClient= item._id
          this.formService.client= item.name +' '+ item.lastName+ ' ' + item.secondLastName
          this.formService.phoneClient = item.phone
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0')
          var mm = String(today.getMonth() + 1).padStart(2, '0')
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy
          this.formService.date=today          
        },
      },
      /**
       * uploadFunction() en esta función se realizará la subida masiva,
       * la lógica del consumo del servicio y los datos del resumen se debe desarrollar en esta funciónm
       */
      uploadFunction(array){
        this.progressBarValue = 0    
        var progress =100/array.length
        for (let index = 0; index < array.length; index++) {
            setTimeout(() => {
            //usar el servicio acá
            console.log('arreglo test', array[index])
            //luego de usar, sumar el progreso
            this.progressBarValue += progress    
            console.log('progressbar ', this.progressBarValue)        
            }, 1000);
        }
        var arrayDetail=['Este es un test','Este tambien']
        //cargar datos de resumen
        this.loadSummary[0].total = array.length
        this.loadSummary[0].successful = 2
        this.loadSummary[0].errors = 1
        this.loadSummary[0].detail = arrayDetail
        //retornar true
        return true      
      },
      setPlace(place) {
        this.place = place
      },
      usePlace(place) {
        if (this.place) {
          this.markers.push({
            position: {
              lat: this.place.geometry.location.lat(),
              lng: this.place.geometry.location.lng(),
            }
          })
          this.place = null;
        }
      }
  }
</script>
