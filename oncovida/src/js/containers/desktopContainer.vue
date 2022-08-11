<template>
    <div class="row"> <!--ROW-->
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">



            <div class="card">
                
                <div class="card-body">
                  <div class="jumbotron">
                    <h1 class="display-4">Bienvenido</h1>
                    <p class="lead" v-if="formUser.isAdmin == false">En esta pantalla puedes visualizar tu ficha laboral y el listado de HCPBs a tu cargo.</p>
                    <p class="lead" v-else>En esta pantalla puedes visualizar tu ficha laboral e información de tu centro de salud.</p>
                                    <div class="row">


                  <div class="col-md-6" > 
                    <div class="card">
                      <div class="card-header">
                        <h2>Ficha Laboral</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre completo:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.fullname" class="form-control" readonly >
                              </div>
                            </div>
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.documentNumber" class="form-control" readonly >
                              </div>
                            </div>
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de colegiatura:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.specialistDetail.colegiatureNumber" class="form-control" readonly >
                              </div>
                            </div> 
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado laboral:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.activeD" class="form-control" readonly >
                              </div>
                            </div>
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.address" class="form-control" readonly >
                              </div>
                            </div>
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Correo electrónico:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.email" class="form-control" readonly >
                              </div>
                            </div>
                            <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Telefóno de contacto:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.phone" class="form-control" readonly >
                              </div>
                            </div>  

                      </div>     
                    </div>               
                  </div>

                  <div class="col-md-6" v-if="formUser.isAdmin == true"> 
                    <div class="card" >
                        <div class="row" >
                          <div class="col-md-12 tile_count">
                            <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-user"></i> Total Especialistas activos</span>
                              <div class="count">{{report.total_esp}}</div>
                              <span class="count_bottom"> <a href="/dashboard/admEspecialistas"> ver todos los especialistas</a> </span>
                            </div>
                            <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-female"></i> Total embarazos monitoreados</span>
                              <div class="count">{{report.total_hcpb}}</div>
                              <span class="count_bottom"> <a href="/dashboard/admEspecialistas"> ver todas las HCPBs</a> </span>
                            </div>
                          </div>
                          <div class="col-md-12 tile_count">
                            <!-- <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-file-text"></i> Prom. de controles por HCPBs</span>
                              <div class="count ">3</div>
                              <span class="count_bottom"> <a href="/dashboard/admEspecialistas"> ver controles</a> </span>
                            </div> -->
                            <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-table"></i> Edad gestacional promedio</span>
                              <div class="count">{{report.total_hcpb}}</div>
                              <span class="count_bottom">semanas </span>
                            </div>
                          </div>
                          <div class="col-md-12 tile_count">
                            <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-clock-o"></i> N° controles este mes</span>
                              <div class="count">{{report.total_control}}</div>
                              <span class="count_bottom"> <a href="/dashboard/admEspecialistas"> ver controles</a> </span>
                            </div>
                            <div class="col-md-6 col-sm-6  tile_stats_count">
                              <span class="count_top"><i class="fa fa-heart"></i> N° emergencias atendidas este mes</span>
                              <div class="count ">{{report.total_emergencies}}</div>
                               <span class="count_bottom"> <a href="/dashboard/admEspecialistas"> ver emergencias</a> </span>
                            </div>
                          </div>
                        </div>
                    </div>                  
                  </div>

                  <div class="col-md-6" v-else > 
                    <div class="card" style="padding-bottom:5px; padding-top: 10px;">                
                      <div class="card-header">
                        <h2>HCPBs a su cargo</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">   
                        <div class="form-group ">          
                          <div id="idAntPersonales" class="card-body" >
                            <div class="table-responsive">
                              <table id="searcher-datatable-enrollment" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                              <thead>
                                <tr >
                                  <th style="width:15px; text-align: center;vertical-align: middle;">Doc Identidad</th>
                                  <th style="width: 20%; text-align: center;vertical-align: middle;">Nombre de la gestante</th>
                                  <th style="width: 20%; text-align: center;vertical-align: middle;">Edad gestacional</th>
                                  <th style="width: 20%; text-align: center;vertical-align: middle;">Último control</th>
                                  <th style="width: 20%; text-align: center;vertical-align: middle;">Fecha estimada de parto</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item,index) in hcpbs" style="background-color: rgba(0, 0, 0, 0.05);" >
                                  <td style="width:15px;" >{{item.patientDoc}} </td>  
                                  <td >{{item.patientName}} </td>    
                                  <td >{{item.patientGestAge}} </td>    
                                  <td >{{item.nextControl}} </td>     
                                  <td >{{item.probableDateBirth}} </td>    
                                  </tr>
                              </tbody>
                              </table>
                            </div>
                          </div>
                        </div>    
                      </div>                     
                    </div>                
                  </div>

                </div><!--BODY-->
                  </div>
                </div>

            </div><!--CARD-->
      

        </div><!--COL-->
    </div><!--ROW-->
</template>

<script>

  import consultServices from './../utilities/consultServices.js';
  import LoadingComponent from "./../components/loadingComponent.vue";
  import _ from 'lodash';
  import inputMaf from "./../components/inputMaf.vue";
  import { Datetime } from 'vue-datetime';
  import TableMaf from "./../components/tableMaf.vue";
  import moment from "moment"; 

export default {
  name: "profileCreando",
  components: {
      LoadingComponent,
      inputMaf,
      Datetime,
      TableMaf
  },
  data: () => ({
      documentNumber: null, //window.INITIAL_STATE.documentNumber,
      id: null,// window.INITIAL_STATE.id,
      user : window.INITIAL_STATE,
      isLoading: false,
      //formUser: {},
      levelsDreamFulfillment:[],
      regions: [],
      provinces: [],
      districts: [],
      colum: [],
      sessions: [],
      titleTable: '',
      formPassword: {},
      divSessionTable: {
        opacity: 0,
        position: 'absolute',
        pointerEvents: 'none'
      },
      adm:2,
      formUser:{
        fullName: null, 
        isAdmin: null, 
        documentNumber:null,
        active: null,
        address: null,
        email: null,
        phone: null,
        activeD: null,
      },
      report:{
        total_esp: null,
        total_hcpb: null,
        total_control: null,
        total_emergencies: null,
        prom_edad: null
      },
      hcpbs:[],
  }),
  async  created () {
     console.log('user desktop::::::::::::::::', this.user)
     this.formUser = _.cloneDeep(this.user)
     this.formUser.isAdmin = this.user.specialistDetail.isAdmin
     this.user.active = true ? this.formUser.activeD = 'En actividad' : this.formUser.activeD = 'Fuera de servicio'
     if(this.formUser.isAdmin ==true){
       this.report= await consultServices('reportAdmin','POST',{});
     }else{
       var response = await consultServices('listHCPBs','POST',{})
       for (var i = 0; i < response.length; i++) {
        if(response[i].idSpecialist == this.user._id ){
          var hcpb={}
          var patient = response[i].patient[0]
          hcpb._id= response[i]._id
          hcpb.patientDoc = patient.documentNumber 
          hcpb.patientName= patient.name + ' '+ patient.lastName + ' ' + patient.surName
          hcpb.patientGestAge=  response[i].currentGestationalAge
          hcpb.probableDateBirth= moment( response[i].probableDateBirth).format("DD/MM/YYYY")  
          hcpb.nextControl= moment( response[i].nextControlDate ).format("DD/MM/YYYY")  
          this.hcpbs.push(hcpb)
        }
       }
     }
  },

  async mounted () {
    // await this.getVolunteer();
    // await this.getSessions();
    // await this.getSessionStorage();
  },


  methods: {
    //Listamos los maestros de region
    async getSessionStorage(){
      this.isLoading = true;
      if (!window.sessionStorage.regions) {
                    // //si no trae los valores, cargarlos en un array que luego se separará en atributos para sessionStorage
                    //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                     this.regions= await consultServices('getRegions','POST',{});

                    //Agregar todos los arreglos a los atributos del sessión storage
                    window.sessionStorage.regions  = JSON.stringify(this.regions);
      }
      this.regions =JSON.parse( window.sessionStorage.regions );

      //Consultamos si existe region para el voluntario
      if(this.formUser.region){
        await this.getProvinces();
        //Consultamos si existe distrito para el voluntario
        if(this.formUser.province){
          await this.getDistricts();
        }
      }
      this.isLoading = false;
    },

    async fillOptions(){
      this.levelsDreamFulfillment=[];
      this.levelsDreamFulfillment = [
        {id:1,value:'1' + ' (no estoy persiguiendo mi sueño)'},
        {id:2,value:'2'},
        {id:3,value:'3'},
        {id:4,value:'4'},
        {id:5,value:'5'},
        {id:6,value:'6'},
        {id:7,value:'7'},
        {id:8,value:'8'},
        {id:9,value:'9'},
        {id:10,value:'10' + ' (estoy viviendo/logrando mi sueño al 100%)'}
      ]
    },
    
    //Listamos las provicias x region
    async getProvinces(){
      this.isLoading = true;
      let json = {idRegion: this.formUser.region};
      const response = await consultServices('getProvincesByRegion','POST', json);
      this.provinces = response;
      this.isLoading = false;
    },

    //Listamos los distritos x provincia
    async getDistricts(){
      this.isLoading = true;
      let json = {idProvince: this.formUser.province};
      const response = await consultServices('getDistrictsByProvince','POST', json);
      this.districts = response;
      this.isLoading = false;
    },

    //Consultamos los datos del voluntario x DNI
    async getVolunteer(){
      this.isLoading = true;
      let json = {id: this.documentNumber};
      const response = await consultServices('getvolunteer','POST', json);
      this.formUser = {};
      this.formUser = _.cloneDeep(response);
      this.isLoading = false;
    },

    //Listamos las sesiones activas del voluntario
    async getSessions(){
      this.isLoading = true;
      let json = {id: this.id};
      const response = await consultServices('getSessionsByUser','POST', json);
      if(response.length > 0){
        this.setDataTable(response);
        this.divSessionTable = {};
      }else{
        this.sessions = [];
        this.divSessionTable = {
          opacity: 0,
          position: 'absolute',
          pointerEvents: 'none'
        };
      }
      this.isLoading = false;
    },

    //Matamos la sesiones activa del voluntario
    async killSession(idSession){
      this.isLoading = true;
      let json = {id: idSession};
      const response = await consultServices('deleteSession','POST', json);
      await this.getSessions();
      this.isLoading = false;
    },

    //Actualizamos los datos del voluntario
    async updateVolunteer(formVolunteer){
      this.isLoading = true;
      const form = _.cloneDeep(formVolunteer);
      console.log("updateVolunteer  ",form);
      const response = await consultServices('updateAllVolunteer','POST',form);
      //Consultamos los datos del voluntario x DNI
      await this.getVolunteer();
      this.isLoading = false;
    },



    //Cambiamos la contraseña
    async changePassword(formPassword){
      this.isLoading = true;
      const form = _.cloneDeep(formPassword);
      form.documentNumber = this.documentNumber;
      if(form.password == form.passwordII){
        const response = await consultServices('changePassword','POST',form);
        alert("Se cambió la contraseña");
      }else{
        alert("Las contraseñas no coinciden");
      }
      this.isLoading = false;
    },

    async closeSession(item){
      if (confirm("Seguro que desea cerrar sesión?")) {
        this.isLoading = true;
        let form = {
          id : this.id,
          sessionId : item.id
        };
        const response = await consultServices('deleteSession','POST',form);
        //Consultamos las sesiones activas
        await this.getSessions();
        this.isLoading = false;
      }
    },

    setHeadTable(){
    this.colum = [
        {label:'IP Address' ,name:'ipAddress' ,find:0 ,sort:1},
        {label:'Dispositivo' ,name:'device' ,find:0 ,sort:1},
        {label:'Navegador' ,name:'browser' ,find:0 ,sort:1},
        {label:'Fecha' ,name:'startDate' ,find:0 ,sort:1},
        {label:'' ,name:'actions' ,find:0 ,sort:0},];
    this.titleTable = "";
    },

    refreshData(){
      this.$refs.tableMaf.formatData(this.sessions);
    },

    setDataTable(arrayData){
        var ctx = this;
        this.sessions = [];
        this.sessions = _.map(arrayData, (item) => {
          let object = {};
          object.ipAddress = item.ipAddress;
          object.device = item.device;
          object.browser = item.browserName;
          object.startDate = item.startDate;
          object.actions = <font style="vertical-align: inherit;">
                                    <div>
                                    <div> <button onClick={()=>ctx.closeSession(item)} class="btn btn-warning btn-xs">Cerrar sesión</button></div>
                                    </div>
                            </font>;
          return object
        });

        this.refreshData();
    },

    //Manejamos cuando el usuario elige una imagen de su ordenador
    async handleFileUpload(e){
      //seteamos variable local
      const urlSufix = 'profile-photos/'+ this.formUser.documentNumber +'/'// Folder destino del archivo
      //const urlSufix = 'profile-photos/00000001/';// Folder destino del archivo
      this.isLoading = true;
      var formData = new FormData();
      formData.append('file',e.target.files[0])
      var url = 'upload/uploadAttachment?urlSufix='+urlSufix
      fetch(url, {
        method:'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
            response.json()
            .then(data => {
              if(data.error){
                alert(data.error)
              }else{
                this.formUser.imageUrl = data.generatedUrl
                this.formUser.profilePhoto = data.generatedUrl
              }
              this.isLoading = false;
            })
        }else{
          this.isLoading = false;
        }
      })
    },

  }
}
</script>
<style>
.jumbotron {
  background-image: url("/back_desktop.jpg");
  background-size: cover;
}
</style>
