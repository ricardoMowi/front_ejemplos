<template>
    <div>
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="map_menu-wrapper">
      <div class="map_menu-title-wrapper">
        <div class="map_menu-title">
          <img src="/images/mapPage/icon-rider.png"/>
          <h2>Estados de Riders: </h2>
        </div>
      </div>
      <div class="map_menu-body-wrapper">

        <input type="checkbox" class="map_menu-checkbox-helper" v-model="filters" value="REQUEST-NEW" id="filter-REQUEST-NEW"/>
        <label class="map_menu-body" for="filter-REQUEST-NEW">
          <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" src="/images/mapPage/icon-new-request.png"/>
          </div>
          <span>Nuevas Solicitudes</span>
        </label>

        <input type="checkbox" class="map_menu-checkbox-helper"  v-model="filters" value="REQUEST-INPROCESS" id="filter-REQUEST-INPROCESS"/>
        <label class="map_menu-body" for="filter-REQUEST-INPROCESS">
          <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" src="/images/mapPage/icon-request-in-process.png"/>
          </div>
          <span>Paquete en camino</span>
        </label>

        <input type="checkbox" class="map_menu-checkbox-helper" v-model="filters" value="RIDER-INPROCESS" id="filter-RIDER-INPROCESS"/>
        <label class="map_menu-body" for="filter-RIDER-INPROCESS">
          <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" src="/images/mapPage/icon-marker-blue.png"/>
          </div>
          <span>Riders en camino</span>
        </label>

        <input type="checkbox" class="map_menu-checkbox-helper" v-model="filters" value="RIDER-ACTIVE" id="filter-RIDER-ACTIVE"/>
        <label class="map_menu-body" for="filter-RIDER-ACTIVE">
          <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" src="/images/mapPage/icon-marker-green.png"/>
          </div>
          <span>Riders disponibles</span>
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
          data:[
            //{type:"REQUEST", status:"ARRIVED", latitude:-12.0783252, longitude:-77.032439},
          ],
          titleTable:'',

      }),
      async created () {
         this.isLoading = false;
      },
      async mounted () {
        //marker de ejemplo
        //const myLatLng = { lat: -12.129939, lng: -77.007271 };
        //Inicializamos el mapa del modal Crear
        var mapNode = document.getElementById('mapRender');
        var map = new google.maps.Map(mapNode,{
          center: {lat: -12.0783252, lng: -77.032439},
          zoom: 12,
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
        //  new google.maps.Marker({
        //   position: myLatLng,
        //   map,
        //   title: "Hello World!",
        //  });
       
        this.map=map;
        this.monitoringData();
      },
      watch: {
        dataFiltered(){
          this.dataToMarkers();
        }
      },
      computed:{
        dataFiltered () {
          let _data = this.data;
          return _.filter(_data,(item)=>{
            return _.findIndex( this.validValues, {type:item.type, status: item.status}) != -1;
          })
        },
        validValues () {
          let _filter = this.filters;
          let filtersData = {
            "REQUEST-INPROCESS":[
              {type:"REQUEST", status: "ARRIVED"},
              {type:"REQUEST", status: "PICKINGUP"},
              {type:"REQUEST", status: "DELIVERING"},
            ],
            "REQUEST-NEW":[
              {type:"REQUEST", status: "NEW"},
            ],
            "RIDER-INPROCESS":[
              {type:"RIDER", status: "DELIVERING"},
              {type:"RIDER", status: "CHECKOUT"},
            ],
            "RIDER-ACTIVE":[
              {type:"RIDER", status: "ACTIVE"},
            ],
          }
          return _.flatMap(_.map(_filter,(filter)=>{
             return filtersData[filter];
          }));
        }
      },
      methods: {
        async getDataService () {
          //this.isLoading=true;

          const ridersApi = await consultServices('getActiveRiders','POST',{});
          const requestsApi = await consultServices('getActiveServices','POST',{});

          const riders = _.map(ridersApi,(rider)=>{
            // console.log('COORDENADAS RIDER: ',rider.riderDetail.location )
            let _rider = {
              type:"RIDER",
              id:rider._id,
              fullname:rider.fullname,
              phone: rider.phone,
              documentNumber:rider.documentNumber,
              documentType:rider.documentType,
              latitude: rider.riderDetail.location ? rider.riderDetail.location.coordinates[0] :-12.0783252,
              longitude: rider.riderDetail.location ? rider.riderDetail.location.coordinates[1]: -77.032439,//rider.riderDetail.location.coordinates[1],
              idCurrentService: rider.riderDetail.idCurrentService,
              displayStatus:rider.riderDetail.currentStatus.description,
              status:rider.riderDetail.currentStatus.code,
            }
            return _rider;
          })
          const requests = _.map(requestsApi,(request)=>{
            console.log('estado del paquete: ', request.currentStatus.code)
            let _request = {
              type:"REQUEST",
              id:request._id,
              idClient:request.idClient,
              clientName:request.clientName,
              idRider:request.idRider,
              riderName:request.riderName,
              riderPhone:request.riderPhone,
              latitude:  request.currentStatus.code == 'NEW' || request.currentStatus.code == 'PICKUP' ?  request.fromAddress.location.coordinates[0] : request.toAddress.location.coordinates[0] ,
              longitude: request.currentStatus.code == 'NEW' || request.currentStatus.code == 'PICKUP' ?  request.fromAddress.location.coordinates[1] : request.toAddress.location.coordinates[1] ,
              displayStatus:request.currentStatus.description,
              status:request.currentStatus.code,
            }

            if( _request.status == 'ARRIVED' || _request.status == 'PICKINGUP' || _request.status == 'DELIVERING' ){ 
              _request.latitude= request.toAddress.location.coordinates[0];
              _request.longitude= request.toAddress.location.coordinates[1];
            }
            return _request;
          })

          this.data = _.concat(riders,requests);
          this.dataToMarkers();
         // this.isLoading=false;
        },
        monitoringData () {
          var ctx = this;
          // console.log('getDataService');
          ctx.getDataService()
          setInterval(function(){
          // console.log('getDataService');
            //Consumir servicio
            ctx.getDataService();
          }, 5000);
        },
        dataToMarkers (data) {
          var _data = data || this.dataFiltered;
          const markers = Object.assign({}, toMarkerBycle(_data));
          this.setMarkers(markers);
        },
        setMarkers (markers) {
          console.log('markers show ', markers)
          var ctx = this;
          this.deleteMarkers();
          var _markers = _.map(markers, (marker) => {
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
          this.showInfoWindow(componentMarker,data);
        },
        showInfoWindow (marker,data) {
          console.log(data);
          var ctx = this;
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
            const requestsApi = await consultServices('getService','POST',{id});
            console.log('requestsApi: ', requestsApi)
            let tempService = requestsApi.service
            this.form={
             clientName:tempService.clientName,
             clientPhone:tempService.clientPhone,
             riderName:tempService.riderName,
             riderPhone:tempService.riderPhone,
             fromAddress: tempService.fromAddress ? tempService.fromAddress.addressLine1+" "+tempService.fromAddress.interior: '-',
             toAddress:tempService.toAddress ? tempService.toAddress.addressLine1+" "+tempService.toAddress.interior : "-",
             status:tempService.currentStatus.description,
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