<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Servicios</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">

          <MasterTemplate
            :filters="propsCustomer.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getServices"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsCustomer.customActions"  
            :data="services"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar servicio</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar servicio</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-horizontal form-label-left">
                    <div  v-if="formType=='EDIT'"  class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12"> Cliente: (*)</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input readonly type="text" id="name" class="form-control" v-model="this.form.customer" >                           
                        </div>                        
                    </div>     
                    <div  v-else  class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione Cliente : (*)</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <SearchComponent v-model="customer" :value="customer" :arrayData="customers"  service="listClients" displayNameKey="name" ref="customer">                                             
                            </SearchComponent>                              
                        </div>                         
                    </div>                      
                </div>      
                <div class="form-horizontal form-label-left">
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione Rider: (*)</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <SearchComponent v-model="rider" :arrayData="riders"  service="listRiders" displayNameKey="fullname" ref="rider">                                             
                            </SearchComponent>
                        </div>
                    </div>                  
                </div>
                <div class="form-horizontal form-label-left" style="z-index=99999px">
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Recoger en: (*)</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input v-model="addressFrom.addressLine1" type="text" id="addressAutocomplete" name="last-name" required="required" class="form-control col-md-12 col-xs-12">
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
                            <input   v-model="addressTo.addressLine1" type="text" id="addressAutocompleteTo"  name="last-name" class="form-control col-md-12 col-xs-12" style="z-">
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
                            <textarea v-model="form.notes" class="form-control col-md-12 col-xs-12"></textarea>
                        </div>
                </div>   
                <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del paquete:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                            <textarea v-model="form.packageDescription" class="form-control col-md-12 col-xs-12"></textarea>
                        </div>
                </div>   
                <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Mensaje para el rider:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                            <textarea v-model="form.messageForRider" class="form-control col-md-12 col-xs-12"></textarea>
                        </div>
                </div>                
                <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="padding-left: 18px;">
                          <input class="form-control" id="date-input" placeholder="date" v-model="form.deliveryDate" readonly>                          
                        </div>
                </div>

            

                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" ref="/dashboard/customerManagement" type="button" class="btn btn-primary"> <a href="/dashboard/newCustomerManagement" style="color: #f7f7f7;" >Registrar nuevo cliente</a> </button>    
                  <button v-if="formType=='ADD'" @click="createService()" type="button" class="btn btn-primary">Aceptar</button>
                  <button v-if="formType=='EDIT'" @click="updateService()" type="button" class="btn btn-primary">Aceptar</button>
                </div>
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
                  <h3 class="modal-title"> <center> ¿Seguro que quiere el servicio? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteService()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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
  </div>
</template>

<script>
  import MasterTemplate from 'mowi-master';
  import moment from "moment";
  // import { Datetime } from 'vue-datetime';
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import Treeselect from '@riophae/vue-treeselect';
  import TableMaf from "./../../components/tableMaf.vue";
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');

  // const TableQQ = ({ props }) => {
  //   var qq = props.data
  //   return _.map(qq,(item)=>(
  //     <div>{item.iniButton}{item.name}</div>
  //   ))
  // }
  export default {
      name: "usersContainer",
      components: {
      LoadingComponent,
      Treeselect,
      TableMaf,
      inputMaf,
      SearchComponent,
      MasterTemplate, 
      // Datetime,
      },
      data: () => ({
          isLoading: false,
          showSearchSection: true,
          services: [],
          form: { },
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          customers: [],
          propsCustomer: {
            filters: [              
              {
                name:'riderName',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombre del rider",           
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,      
              },
              {
                name:'clientName',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombre del cliente",           
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,          
              },
              {
                name:'riderPhone',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Teléfono del rider",             
                callbackData:"",
                textArea:false,
                showOp:false,
                selectField:true,
                isRequired :false,        
              },
              {
                name:'status',
                filterType:'listComponent',
                label: "Estado",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                  {
                    value:'PENDDING_CONFIRMATION',
                    label:'Pendiente de confirmación'
                  },
                  {
                    value:'NEW',
                    label:'Servicio nuevo'
                  },
                  {
                    value:'PICKINGUP',
                    label:'Recogiendo'
                  },
                  {
                    value:'DELIVERING',
                    label:'Entregando'
                  },
                  {
                    value:'ARRIVED',
                    label:' Llegado'
                  },
                  {
                    value:'CLOSED',
                    label:'Cerrado'
                  }
                ],
                showOp:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              }, 

            ],
          },
          useMassiveSelector:false,
          services:[],
          titleTable: 'Servicios',
          customer:{},
          //mapa
          rider:{},
          markers:[],
          markerFrom:{},
          markerTo:{},
          place: null,
          autocompleteFrom: null,
          addressFrom:{
              addressLine1 : null,
              interior : null,
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point"
              }
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
              }
          },
          riders:[],
          formService:{},
          map:null,

      }),
      async created () {
        var ctx = this;
        this.setHeadTable();
        this.services = await this.getServices();
        this.listClients();
        this.listRiders();
        this.$refs.mowiMaster.setInitialData(this.services)
      },
      
      mounted(){
        this.geocoder = new google.maps.Geocoder();

        //nodo para el punto de origen del viaje
        var startNodeFrom = document.getElementById('addressAutocomplete');
        console.log('start node ', startNodeFrom)
        console.log('nuevo ', this.$refs.test)
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
          console.log('value', value)
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

        setHeadTable() {
            this.colum = [
                {name:'creationDate', label: 'Fecha', find:1, sort:1},
                {name:'clientName', label: 'Cliente', find:1, sort:1},
                {name:'toAddress', label: 'Origen', find:1, sort:1},
                {name:'fromAddress', label: 'Destino', find:1, sort:1},
                {name:'riderName', label: 'Rider', find:1, sort:1},
                {name:'riderPhone', label: 'Teléfono del Rider', find:1, sort:1},
                {name:'currentStatus', label: 'Estado', find:1, sort:1},
                {name:'actions', label: 'Acciones', find:0, sort:0},],
            this.titleTable = "Servicios ";
        },

        async shownotificacion(isSucces=true) {
          this.formNot.title==isSucces?'Operación exitosa':'Error'
          $('.bs-example-modal-not').modal('show');
        },
        async getServices(filters) {
          console.log('filteeeeeeeeeeeeeers',filters )
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var riderName  =_.filter(filters,{'name':'riderName'});
              var clientName  =_.filter(filters,{'name':'clientName'});
              var riderPhone  =_.filter(filters,{'name':'riderPhone'});
              var status  =_.filter(filters,{'name':'status'}); 
              /**obtener los valores y agregarlos en el objeto filter */
              riderName.length > 0 ?  filter.riderName = riderName[0].value.variable : null
              clientName.length > 0 ?  filter.clientName = clientName[0].value.variable : null
              riderPhone.length > 0 ?  filter.riderPhone = riderPhone[0].value.variable : null
              status.length > 0 ?  filter.status = status[0].value : null

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              look = await consultServices('searchServices','POST',filter);  
          }else{
              look = await consultServices('getActiveServices','POST',{});   
          }    
          return look      
        },


        async listRiders() {
          this.isLoading=true;          
          const response = await consultServices('listRiders','POST',{});   
          this.riders = response  
          console.log('riders::::::::::: ', this.riders)
          this.isLoading=false;
        },
        async listClients() {
          this.isLoading=true;          
          const response = await consultServices('listClients','POST',{});   
          this.customers = response  
          console.log('customers::::::::::: ', this.customers)
          this.isLoading=false;
        },        
        async updateService() {
           this.isLoading=true;
            
            var form  ={}

            form.id = this.form.id
            form.idClient = this.form.idClient
            form.clientName = this.form.customer
            form.idRider = this.rider._id
            form.riderName = this.rider.fullname
            form.riderPhone = this.rider.phone
            form.notes = this.form.notes
            form.packageDescription = this.form.packageDescription
            form.messageForRider = this.form.messageForRider
            form.deliveryDate = this.form.deliveryDate
            form.fromAddress = this.addressFrom
            form.toAddress = this.addressTo
            form.fromAddress = this.addressFrom
            form.toAddress = this.addressTo

            console.log('form revisa ', this.form)

            console.log('form revisa para actualizar', form)

            if(this.form.idClient == null){
              this.formNot.message="Por favor complete los campos obligatorios"; this.formNot.title="Campos incompletos"
            }
            else{
              const response0 = await consultServices('updateService','POST',form);
              const response = await consultServices('getActiveServices','POST',{});
              this.refreshData(response);
              this.clearForm();
              $('.modal').modal('hide');
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos del usuario de manera correcta";
            }
            this.isLoading=false;
            this.shownotificacion();
        },
        async createService() {
            this.isLoading=true;
            var form ={}
            var fromAddress={
              //addressLine1 : "Calle Cesar Vallejo 411",
              addressLine1 : this.form.fromAddress,
              interior : "Dpto 101",
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point",
              }
            }
            var toAddress={
              //addressLine1 : "Calle Cesar Vallejo 412",
              addressLine1 : this.form.toAddress,
              interior : "Dpto 102",
              location : {
                  coordinates : [ 
                      0, 
                      0
                  ],
                  type : "Point",
              }
            }
            form.idClient = this.form.customer._id
            form.clientName = this.form.customer.name + ' ' + this.form.customer.lastName + ' '+ this.form.customer.secondLastName
            form.phone = this.form.customer.phone
            form.idRider = this.form.rider._id
            form.riderName = this.form.rider.fullname
            form.riderPhone = this.form.rider.phone
            form.notes = this.form.notes
            form.deliveryDate = this.form.deliveryDate
            form.fromAddress = fromAddress
            form.toAddress = toAddress

            if(this.form.rider == null || this.form.customer == null ){
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
              const response = await consultServices('getActiveServices','POST',{});   
              console.log('response servicios  ',response)        
              this.$refs.mowiMaster.setInitialData(response)                    
              $('.modal').modal('hide');        
            }
            this.isLoading=false;
            this.shownotificacion();
        },

        async deleteService() {

        },

        showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
        },

        showAddModal() {
           this.formType = "ADD";
           this.form ={
           };
        },

        clearForm()
        {
          this.form.name="";
          this.form.surName="";
          this.form.lastName="";
          this.form.email="";
          this.form.phone="";

          this.rider={};

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

        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },

        async showEditModal(item) {
           console.log('edit', item)
           this.formType = "EDIT"
           var rider = {} 
           for (let index = 0; index < this.riders.length; index++) {
                if( this.riders[index]._id == item.idRider ){
               console.log('coincidencia', rider)
               rider=  this.riders[index]
             }             
           }
           this.rider = rider
           var customer =  _.map(this.customers,(customer) => {
             var name = customer.name + ' ' + customer.lastName + ' '+ customer.secondLastName
             if( name == item.clientName){
               return customer
             }
           });

           this.form.customer = item.clientName
           this.form.idClient = item.idClient
           this.form.riderPhone = item.riderPhone
           this.form.rider = item.riderName          
           this.form.id = item._id
           //mostrar puntos de origen y destino del viaje
           this.addressFrom.addressLine1 = item.fromAddress.addressLine1           
           this.addressTo.addressLine1 = item.toAddress.addressLine1
           this.addressFrom.interior = item.fromAddress.interior           
           this.addressTo.interior = item.toAddress.interior
           this.addressFrom.location.coordinates = item.fromAddress.location.coordinates
           this.addressTo.location.coordinates = item.toAddress.location.coordinates
           this.addMarkerInMap(this.addressFrom.location.coordinates[0], this.addressFrom.location.coordinates[1],this.map,'addressAutocomplete' )
           this.addMarkerInMap(this.addressTo.location.coordinates[0], this.addressTo.location.coordinates[1],this.map,'addressAutocompleteTo' )

           //
           var date = new Date(item.creationDate)
           date.toDateString() 
           this.form.deliveryDate =  date.getDate()+ '/'+(date.getMonth()+1)+'/'+date.getFullYear()
           this.form.notes = item.notes
        },

        setDataTable(services){  
          console.log('setDataTable services ', services)
          var ctx = this;
          var formattedServices = [];
          services.forEach(item => {
            var service = {};
            service.actions = (
              <div class="d-flex justify-content-around">
                <div> <button onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg" type="button" class="btn btn-success btn-xs"> Editar </button></div>
              </div>
            );
            var date = new Date(item.creationDate)
            date.toDateString() 
            service.creationDate = date.getDate()+ '/'+(date.getMonth()+1)+'/'+date.getFullYear()
            service.riderName = item.riderName;
            service.riderPhone = item.riderPhone; 
            service.currentStatus = item.currentStatus.description
            service.clientName = item.clientName;
            service.fromAddress = item.fromAddress.addressLine1;
            service.toAddress = item.toAddress.addressLine1;
            
            formattedServices.push(service);
          }); 
          return formattedServices 
        },

        // async getServices(selectedFilters) {

        // } 
      }
  }
</script>


