<template>
  <div class="row"> 
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
          
          <div class="card">
              <div class="card-header">
                  <h2 style="padding-left: 10px;">Perfil</h2>
                  <div class="clearfix"></div>
              </div><!--HEADER-->
              <div class="row">
                <!-- Datos laborales -->
                <div class="col-md-6" style="padding-top: 15px;">
                  <div class="card">
                      <div class="card-header">
                        <h2>Datos Laborales</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Foto de perfil-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12"></label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <center>
                                <img class="navbar-brand-full" src="/profile.jpg" width="100" height="100" alt="CoreUI Logo">
                            </center>
                          </div>
                        </div>
                          <div class="card-body" style="padding-top: 10px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">N° Colegiatura:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.specialistDetail.colegiatureNumber" maxlength="6" pattern=" 0+\.[0-9]*[1-9][0-9]*$" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control col-md-12 col-xs-12" >
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Especialidades:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <treeselect v-model="formUser.specialistDetail.specialtiesArray"
                                :disable-branch-nodes="true"
                                :value-consists-of="valueConsistsOf"
                                :multiple="true"
                                :options="specialties" />
                            </div>
                          </div>
                          <div class="card-body" style="padding-top: 10px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Correo electrónico:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.email" class="form-control" >
                            </div>
                          </div>
                          <div class="card-body" style="padding-top: 10px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.phone" class="form-control" >
                            </div>
                          </div>                                                        
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Centro de trabajo:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.clinic" class="form-control" readonly>
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol actual:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.role" class="form-control" readonly>
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado laboral:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.activeD" class="form-control" readonly>
                            </div>
                          </div> 
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de registro:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input type="text" v-model="formUser.creationDateD" class="form-control" readonly>
                            </div>
                          </div>                          
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Cambiar contraseña:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <button class="btn btn-warning" data-toggle="modal"  @click="clearForm()" data-target=".modal-password">Cambiar</button>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <!-- Datos personales -->
                <div class="col-md-6" style="padding-top: 15px;">
                  <div class="card">
                      <div class="card-header">
                        <h2>Datos personales</h2>
                        <div class="clearfix"></div>
                      </div>
                          <div class="card-body" style="padding-top: 10px;">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.name" class="form-control" >
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido paterno:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.lastName" class="form-control" >
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido materno:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.surName" class="form-control" >
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" v-model="formUser.documentNumber" class="form-control" >
                            </div>
                          </div>
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de vivienda:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <select class="form-control col-md-12 col-xs-12" v-model="formUser.idDistrict" >
                                    <option disabled value="">Seleccione un distrito</option>
                                    <option v-for="(item,index) in districts" :key="index" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                          </div> 
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección de domicilio:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <textarea type="text" v-model="formUser.address" class="form-control"></textarea>
                            </div>
                          </div> 
                          <div class="card-body">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                              <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5"   v-model="formUser.birthdate"  ></Datetime>
                            </div>
                          </div>
                  </div>   
                </div>
              </div><!--BODY-->

                <div class="modal-footer">
                  <center>
                  <button @click="updateRecord()" class="btn btn-primary" >Actualizar Perfil</button>      
                  </center>            
                </div>

          </div><!--CARD-->

          <div class="modal fade modal-password" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-cat">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">
                    <center>Cambiar contraseña</center>
                  </h3>
                  <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Contraseña actual:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input v-model="formPassword.currentPassword" type="password" required="required" class="form-control col-md-12 col-xs-12">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Nueva contraseña:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input v-model="formPassword.password" type="password" required="required" class="form-control col-md-12 col-xs-12">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Reingrese contraseña:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input v-model="formPassword.passwordII" type="password" required="required" class="form-control col-md-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <center>
                    <button type="button"  @click="changePassword(formPassword)"  class="btn btn-success">Aceptar</button>
                  </center>
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

      </div><!--COL-->
  </div>
</template>

<script>

  import consultServices from './../utilities/consultServices.js';
  import LoadingComponent from "./../components/loadingComponent.vue";
  import _ from 'lodash';
  import inputMaf from "./../components/inputMaf.vue";
  import { Datetime } from 'vue-datetime';
  import TableMaf from "./../components/tableMaf.vue";
  import Treeselect, { ASYNC_SEARCH } from '@riophae/vue-treeselect';
  import moment from "moment";
export default {
  name: "profileCreando",
  components: {
      LoadingComponent,
      inputMaf,
      Datetime,
      TableMaf,
      Treeselect,
  },
  data: () => ({
      user : window.INITIAL_STATE,
      documentNumber: null,// window.INITIAL_STATE.documentNumber,
      id:window.INITIAL_STATE._id,
      isLoading: false,
      valueConsistsOf: 'LEAF_PRIORITY',
      specialties:[],
      formUser: {},
      levelsDreamFulfillment:[],
      regions: [],
      provinces: [],
      districts: [],
      colum: [],
      sessions: [],
      titleTable: '',
      formPassword: {
        currentPassword: '',
        password: '',
        passwordII: '',
      },
      divSessionTable: {
        opacity: 0,
        position: 'absolute',
        pointerEvents: 'none'
      },
      formUser:{
        fullName: null, 
        isAdmin: null, 
        documentNumber:null,
        active: null,
        address: null,
        email: null,
        phone: null,
        activeD: null,
        clinic:null,
        specialistDetail:{}
      },
      formNot: { message: "", title: "" },
      arrayComplete:[],
  }),
  async  created () {

  },

  async mounted () {
     this.getDistricts();
     this.arrayForTree();
     await this.setUser();
  },


  methods: {

    async setUser(){
     const response =  await consultServices('showUser','POST',{_id: this.user._id})
     this.formUser = _.cloneDeep(response)
     this.formUser.clinic = 'Clínica Tu salud es Primero'
     this.formUser.isAdmin = this.user.specialistDetail.isAdmin   
     this.formUser.role =  this.formUser.specialistDetail.isAdmin == false ?  'Especialista obstétrico' : 'Administrador, Especialista obstétrico'
     this.formUser.creationDateD = moment(this.formUser.creationDate).format("DD/MM/YYYY")
     this.formUser.active == true ? this.formUser.activeD = 'En actividad' : this.formUser.activeD = 'Fuera de servicio'
    },
    async arrayForTree(){
      const response =  await consultServices('listSpecialties','POST',{})
      var optionsTree = []

      for (var j = 0; j <response.length; j++) {
        var obj={}
        obj.id = response[j]._id
        obj.label = response[j].name
        optionsTree.push(obj)
      }

      this.specialties = _.cloneDeep(optionsTree)
    },
    async getDistricts(){
      this.districts =[
{id: 1251,name:'LIMA'},
{id: 1252,name:'ANCON'},
{id: 1253,name:'ATE'},
{id: 1254,name:'BARRANCO'},
{id: 1255,name:'BREÑA'},
{id: 1256,name:'CARABAYLLO'},
{id: 1257,name:'CHACLACAYO'},
{id: 1258,name:'CHORRILLOS'},
{id: 1259,name:'CIENEGUILLA'},
{id: 1260,name:'COMAS'},
{id: 1261,name:'EL AGUSTINO'},
{id: 1262,name:'INDEPENDENCIA'},
{id: 1263,name:'JESUS MARIA'},
{id: 1264,name:'LA MOLINA'},
{id: 1265,name:'LA VICTORIA'},
{id: 1266,name:'LINCE'},
{id: 1267,name:'LOS OLIVOS'},
{id: 1268,name:'LURIGANCHO'},
{id: 1269,name:'LURIN'},
{id: 1270,name:'MAGDALENA DEL MAR'},
{id: 1271,name:'MAGDALENA VIEJA'},
{id: 1272,name:'MIRAFLORES'},
{id: 1273,name:'PACHACAMAC'},
{id: 1274,name:'PUCUSANA'},
{id: 1275,name:'PUENTE PIEDRA'},
{id: 1276,name:'PUNTA HERMOSA'},
{id: 1277,name:'PUNTA NEGRA'},
{id: 1278,name:'RIMAC'},
{id: 1279,name:'SAN BARTOLO'},
{id: 1280,name:'SAN BORJA'},
{id: 1281,name:'SAN ISIDRO'},
{id: 1282,name:'SAN JUAN DE LURIGANCHO'},
{id: 1283,name:'SAN JUAN DE MIRAFLORES'},
{id: 1284,name:'SAN LUIS'},
{id: 1285,name:'SAN MARTIN DE PORRES'},
{id: 1286,name:'SAN MIGUEL'},
{id: 1287,name:'SANTA ANITA'},
{id: 1288,name:'SANTA MARIA DEL MAR'},
{id: 1289,name:'SANTA ROSA'},
{id: 1290,name:'SANTIAGO DE SURCO'},
{id: 1291,name:'SURQUILLO'},
{id: 1292,name:'VILLA EL SALVADOR'},
{id: 1293,name:'VILLA MARIA DEL TRIUNFO'},
      ]
    },

    async updateRecord(){
      console.log('formUser en create::::::::::', this.formUser)
      this.isLoading = true
      //validar campos completos 
      if(
        this.formUser.name != '' && this.formUser.name != null &&
        this.formUser.lastName != '' && this.formUser.lastName != null &&
        this.formUser.surName != '' && this.formUser.surName != null &&
        this.formUser.documentNumber != '' && this.formUser.documentNumber != null &&
        this.formUser.birthdate != '' && this.formUser.birthdate != null &&
        this.formUser.phone != '' && this.formUser.phone != null &&
        this.formUser.email != '' && this.formUser.email != null &&
        this.formUser.idDistrict != '' && this.formUser.idDistrict != null &&
        this.formUser.address != '' && this.formUser.address != null &&
        this.formUser.specialistDetail.colegiatureNumber != '' && this.formUser.specialistDetail.colegiatureNumber != null 
        
      ){
        //crear json 
        var updateRecord = _.cloneDeep(this.formUser) 
        updateRecord.id = this.formUser._id
        updateRecord.colegiatureNumber = this.formUser.specialistDetail.colegiatureNumber
        updateRecord.isAdmin = this.formUser.specialistDetail.isAdmin
        updateRecord.specialtiesArray = this.formUser.specialistDetail.specialtiesArray
        console.log('NewRecord::::::::', updateRecord)
        var newCreate = await consultServices('updateSpecialist','POST',updateRecord);  
        if(newCreate.message){
          this.formNot.title="Error en operación";
          this.formNot.message='No se pudo actualizar el perfil' //newCreate.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message = "Perfil actualizado";
          await this.setUser()
        }        
      }else{
        this.formNot.message="Por favor complete todos los campos del formulario";
        this.formNot.title="Campos incompletos"
      }
      this.isLoading = false
      this.showNotification()
    },

    async showNotification() {
      $(".bs-example-modal-not").modal("show");
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
    async updateUser(formVolunteer){
      // this.isLoading = true;
      // const form = _.cloneDeep(formVolunteer);
      console.log("updateUser  ",formVolunteer);
      // const response = await consultServices('updateAllVolunteer','POST',form);
      // Consultamos los datos del voluntario x DNI
      // await this.getVolunteer();
      // this.isLoading = false;
    },

    //Cambiamos la contraseña
    async changePassword(formPassword){
      console.log('changepassword::::::::', formPassword)
      this.isLoading = true;

      if(
        formPassword.password.length > 0 &&  
        formPassword.passwordII.length > 0 &&  
        formPassword.currentPassword.length > 0 
      ){
        const form = _.cloneDeep(formPassword);
        form._id = this.id;
        if(form.password == form.passwordII){
          const response = await consultServices('changePassword','POST',form);
          if(response.status != 200){
            alert(response.message);
          }else{
            alert("Se cambió la contraseña");
            $('.modal').modal('hide');
          }
        }else{
          alert("Las contraseñas nuevas no coinciden");
        }
      }else{
          alert("Campos incompletos para realizar el cambio de contraseña");
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

    clearForm(){
      this.formPassword.currentPassword= ''
      this.formPassword.password= ''
      this.formPassword.passwordII= ''      
    },

  }
}
</script>
