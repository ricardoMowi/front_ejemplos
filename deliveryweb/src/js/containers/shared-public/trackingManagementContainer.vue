<template>
    <div>
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="map_menu-wrapper" >
      <div class="map_menu-title-wrapper" style="padding-top: 10px;">
        <div class="map_menu-title">
          <img src="/images/mapPage/icon-rider.png"/>
          <h2>Estado del viaje: </h2>
        </div>
      </div>
      <div class="map_menu-body-wrapper"  style="padding-top: 10px;">



        <input type="checkbox" class="map_menu-checkbox-helper"  v-model="filters" value="REQUEST-INPROCESS" id="filter-REQUEST-INPROCESS"/>
        <label class="map_menu-body" for="filter-REQUEST-INPROCESS">
          <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" src="/images/mapPage/icon-request-in-process.png"/>
          </div>
          <span>{{this.actualStatus}}</span>
        </label>


      </div>
    </div>
    <div class="map" id="mapRender"></div>
   
    
    <!--Modal Detalle Completo Rider-->
    <div class="modal fade bs-modal-rider" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title"><center>Detalle de Rider</center></h3>
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-horizontal form-label-left"> 
              <p><strong>Nombre:</strong> {{form.fullname}}</p>
              <p><strong>Correo:</strong> {{form.email}}</p>
              <p><strong>{{form.documentType}}:</strong> {{form.documentNumber}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <center>
                  <button type="button" data-dismiss="modal" class="btn btn-primary">Cerrar</button>
            </center>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Fin-->
    <!--Modal Detalle Completo Request-->
    <div class="modal fade bs-modal-request" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title"><center>Detalle de Request</center></h3>
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-horizontal form-label-left"> 
              <p><strong>Nombre del Cliente:</strong> {{form.clientName}}</p>
              <p><strong>Teléfono del Cliente:</strong> {{form.clientPhone}}</p>
              <p><strong>Nombre del Cliente:</strong> {{form.riderName}}</p>
              <p><strong>Teléfono del Cliente:</strong> {{form.riderPhone}}</p>
              <p><strong>Desde:</strong> {{form.fromAddress}}</p>
              <p><strong>Hasta:</strong> {{form.toAddress}}</p>
              <p><strong>Estado:</strong> {{form.status}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <center>
                  <button type="button" data-dismiss="modal" class="btn btn-primary">Cerrar</button>
            </center>
          </div>
        </div>
      </div>
    </div>
    <!--Modal Fin-->
  </div>
</template>
<script>
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import filterMapComponent from "./../../components/filterMapComponent.vue";
  import moment from 'moment';
  import toMarkerBycle from '../../utilities/toMarkerBycle';

  export default {
      name: "MapContainer",
      components: {
        LoadingComponent,
        filterMapComponent,
      },
      data: () => ({
          idService: window.INITIAL_STATE.id, 
          showTracking : true,
          filters:[
            "REQUEST-INPROCESS",
            "REQUEST-NEW",
            "RIDER-INPROCESS",
            "RIDER-ACTIVE"
          ],
          map:null,
          isLoading: true,
          form: {},
          name:window.INITIAL_STATE.fullName||"",
          userCode:window.INITIAL_STATE.userCode||"",
          formNot:{prueba:'',tit:''},
          markers:[],
          actualStatus :'',
          data:[],            
          titleTable:'',

      }),
      async created () {
         this.isLoading = false;
      },
      async mounted () {
        //Inicializamos el mapa del modal Crear
        var mapNode = document.getElementById('mapRender');
        var map = new google.maps.Map(mapNode,{
          center: {lat: -12.0783252, lng: -77.032439},
          zoom: 18,
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
        this.monitoringData();
      },

      methods: {
        async getDataService () {
          this.isLoading=true;
          //variables para concatenar a this.data
          var requestArray=[] //arreglo para 
          var riders=[]       //   
          if(this.showTracking == true){
            // Buscar servicio 
            const response = await consultServices('getService','POST',{id: this.idService});
            //this.showTrackingMap(response.service.path)
            //Validar respuesta del servicio
            if(response.status == 400){
              this.showTracking =false
              alert('Error consultando servicios')
            }
            else if(response.status == 404 ){
              this.showTracking =false
              alert('No hay servicio con identificador ingresado')
            }
            else{
              this.showTracking =true
              var requestsApiTracking= response.service
              console.log('request obtenido:::', requestsApiTracking)
              
              //Marker que muestra el punto de origen del viaje
              var requestFrom={}
              requestFrom.type=  "ADDRESS"
              requestFrom.id=requestsApiTracking._id
              requestFrom.idClient=requestsApiTracking.idClient
              requestFrom.clientName=requestsApiTracking.clientName
              requestFrom.idRider=requestsApiTracking.idRider
              requestFrom.riderName=requestsApiTracking.riderName
              requestFrom.riderPhone=requestsApiTracking.riderPhone
              requestFrom.latitude=    requestsApiTracking.fromAddress.location.coordinates[0] 
              requestFrom.longitude=   requestsApiTracking.fromAddress.location.coordinates[1]
              requestFrom.displayStatus=requestsApiTracking.currentStatus.description;
              requestFrom.status= 'FROM-ADDRESS'

              //Marker que muestra el punto de destino del viaje
              var requestTo={}
              requestTo.type="ADDRESS"
              requestTo.id=requestsApiTracking._id
              requestTo.idClient=requestsApiTracking.idClient
              requestTo.clientName=requestsApiTracking.clientName
              requestTo.idRider=requestsApiTracking.idRider
              requestTo.riderName=requestsApiTracking.riderName
              requestTo.riderPhone=requestsApiTracking.riderPhone
              requestTo.latitude=    requestsApiTracking.toAddress.location.coordinates[0] 
              requestTo.longitude=   requestsApiTracking.toAddress.location.coordinates[1]            
              requestTo.displayStatus=requestsApiTracking.currentStatus.description;
              requestTo.status= 'TO-ADDRESS'
          
              //Marker que muestra la posición actual del viaje 
              if(response.service.path.length >0){
                var path = response.service.path
                const riderPlanCoordinates =[]
                // paso 1: obtener longitud y latitud de cada punto de viaje 
                // y pushear cada objeto coordinates en riderPlanCoordinates
                for (let index = 0; index < path.length; index++) {
                  var coordinates={}
                  coordinates.lat= path[index].coordinates[0]
                  coordinates.lng= path[index].coordinates[1]
                  riderPlanCoordinates.push(coordinates)
                }
                console.log('arreglo riderPlanCoordinates',riderPlanCoordinates )

                // paso 2:
                // con la función Polyline dibujar el viaje
                const flightPath = new google.maps.Polyline({
                  path: riderPlanCoordinates,
                  geodesic: true,
                  strokeColor: "#4dbd74",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                });
                flightPath.setMap(this.map);
                //paso 3:
                //mostrar la posición actual del viaje con un marcador
                var realPosition= riderPlanCoordinates[riderPlanCoordinates.length-1]
                  var requestActualPosition={}
                  requestActualPosition.type="REQUEST"
                  requestActualPosition.id=requestsApiTracking._id
                  requestActualPosition.idClient=requestsApiTracking.idClient
                  requestActualPosition.clientName=requestsApiTracking.clientName
                  requestActualPosition.idRider=requestsApiTracking.idRider
                  requestActualPosition.riderName=requestsApiTracking.riderName
                  requestActualPosition.riderPhone=requestsApiTracking.riderPhone
                  requestActualPosition.latitude=    realPosition.lat
                  requestActualPosition.longitude=   realPosition.lng          
                  requestActualPosition.displayStatus=requestsApiTracking.currentStatus.description;
                  requestActualPosition.status= requestsApiTracking.currentStatus.code;//'NEW'
                  requestArray.push(requestActualPosition)
                  this.map.setCenter(
                    {lat: realPosition.lat, lng:realPosition.lng}
                  )
              }
              this.actualStatus = requestsApiTracking.currentStatus.description
              requestArray.push(requestFrom)
              requestArray.push(requestTo)
              this.data = _.concat(riders,requestArray);
              this.dataToMarkers();
            }
          }

          this.isLoading=false;

        },
        monitoringData () {
          console.log('entró a monitoring ', this.showTracking)
          var ctx = this;
              console.log('getDataService');
              ctx.getDataService()
              if(this.showTracking == true){
              setInterval(function(){
              console.log('getDataService');
                ctx.getDataService();
              }, 5000);}

        },
        dataToMarkers () {
          var _data = this.data
          const markers = Object.assign({}, toMarkerBycle(_data));
          this.setMarkers(markers);
        },

        /**
         * showTrackingMap(path): muestra el trayecto del rider en tiempo real
         * path: arreglo de coordenadas del viaje del rider
         */
        showTrackingMap(path) {
          /**variables
           * riderPlanCoordinates: arreglo con las coordenadas de viaje
           */          
          const riderPlanCoordinates =[]
          // paso 1: obtener longitud y latitud de cada punto de viaje 
          // y pushear cada objeto coordinates en riderPlanCoordinates
          for (let index = 0; index < path.length; index++) {
            var coordinates={}
            coordinates.lat= path[index].coordinates[0]
            coordinates.lng= path[index].coordinates[1]
            riderPlanCoordinates.push(coordinates)
          }
          console.log('arreglo riderPlanCoordinates',riderPlanCoordinates )

          // paso 2:
          // con la función Polyline dibujar el viaje
          const flightPath = new google.maps.Polyline({
            path: riderPlanCoordinates,
            geodesic: true,
            strokeColor: "#4dbd74",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          flightPath.setMap(this.map);
          //paso 3:
          //mostrar la posición actual del viaje con un marcador
          var realPosition= riderPlanCoordinates[riderPlanCoordinates.length-1]
          var componentMarker= new google.maps.Marker({
            position: realPosition,
            map: this.map,
            title: "Hello World!",
          });
          this.addEventMarker(componentMarker)
        },



        setMarkers (markers) {
          var ctx = this;
          this.deleteMarkers();
          var _markers = _.map(markers, (marker) => {
            console.log('marker show ',marker )
            var componentMarker = new google.maps.Marker({
              position: marker.position,
              map: this.map,
              icon: marker.icon,
              shape: marker.shape,
              title: marker.title,
              zIndex: marker.zIndex
            });
            this.addEventMarker(componentMarker,'click',() => {
              ctx.showMiniPopUp(componentMarker,marker);
            });
            marker['componentMarker'] = componentMarker;
            return marker;
          });
          this.markers = _markers;
        },
        addEventMarker (marker,eventName,func) {
          let ctx = this;
          marker.addListener(eventName, () => {
            func(marker);
            ctx.animationToggleBounce(marker);
          });
          return marker;
        },
        deleteMarkers() {
          for (var i = 0; i < this.markers.length; i++) {
            if(_.has(this.markers[i],'componentMarker')){
              this.markers[i].componentMarker.setMap(null);
            }
          }
          this.markers = [];
        },
        animationToggleBounce (marker) {marker.setAnimation(google.maps.Animation.So);},
        showMiniPopUp (componentMarker,markerData) {
          //Distribuir la data de los markers a está estructura para mostrar el miniPopUp
          var data;
          if(markerData.type=="RIDER"){
            data={
              title:`Rider - ${markerData.displayStatus}`, 
              photoUrl:"/images/mapPage/icon-rider.png",
              param1: markerData.fullname,
              param2:`${markerData.documentType} ${markerData.documentNumber}`,
              param3:`Cel.:${markerData.phone}`,
              type:"RIDER",
              id:markerData.id,
            }
          }
          if(markerData.type=="REQUEST"){
            data={
              title:`Servicio - ${markerData.displayStatus}`,
              photoUrl:`/images/mapPage/icon-rider.png`,
              param1:`Cli.: ${markerData.clientName}`,
              param2:`Rider: ${markerData.riderName}`,
              param3:`Rider Cel.: ${markerData.riderPhone}`,
              type:"REQUEST",
              id:markerData.id,
            }
          }
          if(markerData.type=="ADDRESS"){
            data={
              title:`Servicio - ${markerData.displayStatus}`,
              photoUrl:`/images/mapPage/icon-rider.png`,
              param1:`Cli.: ${markerData.clientName}`,
              param2:`Rider: ${markerData.riderName}`,
              param3:`Rider Cel.: ${markerData.riderPhone}`,
              type:"REQUEST",
              id:markerData.id,
            }
          }
          this.showInfoWindow(componentMarker,data);
        },
        showInfoWindow (marker,data) {
          console.log("info dtaaaaaaa::::",data);
          var ctx = this;
          data.photoUrl == null || data.photoUrl == undefined ? data.photoUrl = '/images/mapPage/icon-rider.png' :null 
          var infowindow = new google.maps.InfoWindow({ content:`
            <div class="mini_popUp-wrapper">
              <div class="mini_popUp-img-wrapper">
                <div class="mini_popUp-img-wrapper-helper">
                  <img class="mini_popUp-img" src="${data.photoUrl}"/>
                </div>
              </div>
              <div class="mini_popUp-body-wrapper">
                <div class="mini_popUp-body-wrapper-helper">
                  <h2>${data.title}</h2>
                  <p>${data.param1}</p>
                  <p>${data.param2}</p>
                  <p>${data.param3}</p>
                  <a class="mini_popUp-btn"onclick="showPopUpAllData('${data.id}','${data.type}')">Ver detalle</a>
                </div>
              </div>
            </div>
            `,
          maxWidth: 300 });
          infowindow.open(this.map, marker);
          window.showPopUpAllData = function(id,type) {
              infowindow.close()
              ctx.showPopUpAllData(id,type)
          }
        },
        async showPopUpAllData (id,type) {
          console.log('Obtengo Id al dar clic: '+id);
          //Consumir servicios y mostrar PopupGrande
          this.isLoading = true;
          if(type=="RIDER"){
            const ridersApi = await consultServices('getRider','POST',{id});
            this.form={
              fullname:ridersApi.fullname,
              email:ridersApi.email,
              documentType:ridersApi.documentType,
              documentNumber:ridersApi.documentNumber,
            }
            $('.bs-modal-rider').modal('show');
          }
          if(type=="REQUEST"){
            
            const response = await consultServices('getService','POST',{id});
            var requestsApi = response.service

            this.form={
             clientName:requestsApi.clientName,
             clientPhone:requestsApi.clientPhone,
             riderName:requestsApi.riderName,
             riderPhone:requestsApi.riderPhone,
             fromAddress:requestsApi.fromAddress.addressLine1+" "+requestsApi.fromAddress.interior,
             toAddress:requestsApi.toAddress.addressLine1+" "+requestsApi.toAddress.interior,
             status:requestsApi.currentStatus.description,
            }
            $('.bs-modal-request').modal('show');
          }
          this.isLoading = false;


        },
      }
  }
</script>
<style scoped>
  h1 {
      font-size: 1.25rem;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }


  /**/
  .map_menu-wrapper {
      display: flex;
      background: #FFFFFF;
      padding: 10px;
      flex-wrap: wrap;
  }

  .map_menu-body-wrapper {
      display: flex;
      flex-wrap: wrap;
  }

  .map_menu-body {
      background: #FFFFFF;
      border: 1px solid #bbbbbb;
      margin: 3px;
      border-radius: 18px;
      overflow: hidden;
      padding: 0px 20px 0px 4px;
      height: 37px;
      display: flex;
      cursor: pointer;
      user-select: none;
  }
  .map_menu-body:hover {
      border: 1px solid #3a3a3a;
  }

  .map_menu-body-img-wrapper {
      min-width: 42px;
      justify-content: center;
      display: flex;
  }

  .map_menu-body span {
      line-height: 36px;
  }
  .map_menu-title h2 {
      line-height: 38px;
      margin-right: 14px;
  }
  .map_menu-title {
      display: flex;
      width: 185px;
  }
  .map_menu-body-img {
      max-height: 25px;
      margin-top: 5px;
  }
  .map_menu-title img {
      width: 33px;
      height: 33px;
      margin-top: 3px;
      margin-right: 8px;
  }
  .map_menu-checkbox-helper {
    width: 0;
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
  input[type="checkbox"]:not(:checked)+ .map_menu-body {
      opacity: 0.5;
      filter: grayscale(1);
  }
</style>


  