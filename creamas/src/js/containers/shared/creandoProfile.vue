<template>
    <div class="row"> <!--ROW-->
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Perfil</h2>
                    <div class="clearfix"></div>
                </div><!--HEADER-->
                <div class="card-body">

                  <div class="card"><!--Opcines personales-->
                      <div class="card-header">
                        <h2>Datos personales</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Documento de indentidad-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.documentNumber" :valueInput="formCrea.documentNumber" label="DNI:" :validation="{required:false, max:60}" nameInput="document" etiqueta='true' ref="inputDocument">
                          </inputMaf>
                        </div>
                        <!--Nombres-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.name" :valueInput="formCrea.name" label="Nombres:" :validation="{required:false, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName">
                          </inputMaf>
                        </div>
                        <!--Apellido Paterno-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.lastName" :valueInput="formCrea.lastName" label="Apellido Paterno:" :validation="{required:false, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName">
                          </inputMaf>
                        </div>
                        <!--Apellido Maaterno-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.secondLastName" :valueInput="formCrea.secondLastName" label="Apellido Materno:" :validation="{required:false, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputSecondLastName">
                          </inputMaf>
                        </div>
                        <!--Alias-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.alias" :valueInput="formCrea.alias" label="Alias:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputAlias">
                          </inputMaf>
                        </div>
                        <!--Email-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.email" :valueInput="formCrea.email" label="Email:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail">
                          </inputMaf>
                        </div>
                      </div>
                  </div><!--Opciones personales-->

                  <div class="card"><!--Cambiar contraseña-->
                      <div class="card-header">
                        <h2>Contraseña</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Cambiar contraseña-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Cambiar contraseña:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <button class="btn btn-danger" data-toggle="modal" data-target=".modal-password">Cambiar</button>
                          </div>
                        </div>
                      </div>
                  </div><!--Cambiar contraseña-->

                  <div class="card"><!--Sesiones-->
                      <div class="card-header">
                        <h2>Sesiones</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Sesiones-->
                        <div class="card-body" >
                          <div v-if="sessions.length == '0'">
                            <h2>Esta es la única sesión activa</h2>
                          </div>
                          <div :style="divSessionTable">
                            <TableMaf :header="colum" :data="sessions" searchOption="false" pagination="false" ref="tableMaf">
                            </TableMaf>
                          </div>
                        </div>
                      </div>
                  </div><!--Sesiones-->

                  <div class="card"><!--Acerca de ti-->
                      <div class="card-header">
                        <h2>Acerca de ti</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Foto de perfil-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Foto de perfil:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <img :src="formCrea.imageUrl" class="img-thumbnail" alt="Responsive image" style="width:150px;  height:1 50px">
                          </div>
                        </div>
                        <!--Sueño-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Ingresa URL:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="url" v-model="formCrea.profilePhoto" class="form-control" >
                          </div>
                        </div>
                        <!--Cargar foto de perfil-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Cambiar foto de perfil:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <button @click="$refs.imageFile.click()" class="btn btn-warning">Cargar nueva imagen</button>
                            <input type="file" ref="imageFile" style="display: none" v-on:change="handleFileUpload" accept="image/*" >
                          </div>
                        </div>
                        <!--Genero-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Genero:</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                              <select class="form-control" v-model="formCrea.genderCode" >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                              </select>
                          </div>
                        </div>
                        <!--Talla de polo-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Talla de polo:</label>
                           <div class="col-md-6 col-sm-6 col-xs-12">
                              <select class="form-control" v-model="formCrea.dressSize">
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                              </select>
                          </div>
                        </div>
                        <!--Fecha de nacimiento-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <Datetime v-model="formCrea.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date">
                            </Datetime>
                          </div>
                        </div>
                      </div>
                  </div><!--Acerca de ti-->

                  <div class="card"><!--Datos del contacto-->
                      <div class="card-header">
                        <h2>Datos del contacto</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Departamento-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Departamento:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="formCrea.region" @change="getProvinces()" >
                              <option v-for="region in regions" :value="region.id">{{region.name}}</option>
                            </select>
                          </div>
                        </div>
                        <!--Provincia-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Provincia:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="formCrea.province" @change="getDistricts()" >
                              <option v-for="province in provinces" :value="province.id">{{province.name}}</option>
                            </select>
                          </div>
                        </div>
                        <!--Distrito-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de residencia:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="formCrea.district" >
                              <option v-for="district in districts" :value="district.id">{{district.name}}</option>
                            </select>
                          </div>
                        </div>
                        <!--Direccion-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.address"  :valueInput="formCrea.address" label="Dirección:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputAddress">
                          </inputMaf>
                        </div>
                        <!--Email-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.secondaryEmail" :valueInput="formCrea.secondaryEmail" label="Email secundario:" :validation="{required:false, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail2">
                          </inputMaf>
                        </div>
                        <!--Celular-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.phone" :valueInput="formCrea.phone" label="Celular:" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone">
                          </inputMaf>
                        </div>
                        <!--Celular opcional-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.secondaryPhone" :valueInput="formCrea.secondaryPhone" label="Celular secundario:" :validation="{required:false, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone2">
                          </inputMaf>
                        </div>
                        <!--Teléfono fijo-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.homePhone" :valueInput="formCrea.homePhone"  label="Teléfono fijo:" :validation="{required:false, numeric:true}" nameInput="phone" etiqueta='true' ref="inputHomePhone">
                          </inputMaf>
                        </div>
                      </div>
                  </div><!--Datos del contacto-->

                  <div class="card"><!--Datos de estudio y trabajo-->
                      <div class="card-header">
                        <h2>Datos de estudio y trabajo</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Colegio-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.schoolName" :valueInput="formCrea.schoolName" label="Colegio donde estudiaste:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputSchoolName">
                          </inputMaf>
                        </div>
                        <!--Centro de estudios-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.collegeName" :valueInput="formCrea.collegeName" label="Centro de estudios superior(último):" :validation="{required:true,max:200}" nameInput="address" etiqueta='true' ref="inputCollegeName">
                          </inputMaf>
                        </div>
                        <!--Carrera-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.careerName" :valueInput="formCrea.careerName" label="Carrera de estudios:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputCareer">
                          </inputMaf>
                        </div>
                        <!--Año de culminar-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.careerEndingYear" :valueInput="formCrea.careerEndingYear" label="Año de culminar estudios:" :validation="{required:true, numeric:true}" nameInput="number" etiqueta='true' ref="inputCareerEndingYear">
                          </inputMaf>
                        </div>
                        <!--Centro de trabajo-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.organizationName" :valueInput="formCrea.organizationName" label="Organización donde trabajas:" :validation="{required:true}" nameInput="address" etiqueta='true' ref="inputOrganizationName">
                          </inputMaf>
                        </div>
                        <!--Puesto de trabajo-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.organizationJob" label="Cargo laboral:" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputOrganizationalJob">
                          </inputMaf>
                        </div>
                      </div>
                  </div><!--Datos de estudio y trabajo-->

                  <div class="card"><!--Sueño-->
                      <div class="card-header">
                        <h2>Sueño</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <!--Sueño-->
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuál es tu sueño?:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" placeholder="Tu sueño ..." v-model="formCrea.dream" class="form-control" textarea="true" rows="9">
                          </div>
                        </div>
                        <!--Nivel de cmplimiento del sueño-->
                        <div class="card-body">
                          <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel de cumplimiento del sueño:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formCrea.dreamAccomplishment" >
                                        <option v-for="item in levelsDreamFulfillment" :value="item.id">{{item.value}}</option>
                                  </select>
                                </div>
                          </div>
                        </div>
                        <!--Fecha de ingreso a Crea+
                        <div class="card-body">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de ingreso a Crea+:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <Datetime v-model="formCrea.startDate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date">
                            </Datetime>
                          </div>
                        </div>-->
                        <!--Código universitario-->
                        <div class="card-body">
                          <inputMaf type='text' v-model="formCrea.collegeCode" :valueInput="formCrea.collegeCode" label="Código universitario:" :validation="{required:false}" nameInput="address" etiqueta='true' ref="inputUniversityCode">
                          </inputMaf>
                        </div>
                      </div>
                  </div><!--Sueño-->

                  <div class="card-body"><!--Sueño-->
                    <button @click="updateVolunteer(formCrea)" class="btn btn-primary" >Actualizar Perfil</button>
                  </div><!--Sueño-->

                </div><!--BODY-->
            </div><!--CARD-->

            <!--Modal-->

            <div class="modal fade modal-password" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="card-header">
                        <h1>Cambiar contraseña</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card-body"> <!--body-->

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


                    </div><!--body-->

                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-light">Cancelar</button>
                                <button data-dismiss="modal" type="button" @click="changePassword(formPassword)" class="btn btn-danger">Cambiar</button>
                            </center>
                    </div>
                    </div>
                </div>
            </div>
            <!--Modal-->

        </div><!--COL-->
    </div><!--ROW-->
</template>

<script>

  import consultServices from './../../utilities/consultServices.js';
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import _ from 'lodash';
  import inputMaf from "./../../components/inputMaf.vue";
  import { Datetime } from 'vue-datetime';
  import TableMaf from "./../../components/TableMaf.vue";

export default {
  name: "profileCreando",
  components: {
      LoadingComponent,
      inputMaf,
      Datetime,
      TableMaf
  },
  data: () => ({
      documentNumber: window.INITIAL_STATE.documentNumber,
      id: window.INITIAL_STATE.id,
      isLoading: false,
      formCrea: {},
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
  }),
   created () {
    this.setHeadTable();
    this.fillOptions();
    console.log("sesiones: ",this.sessions.length);
  },

  async mounted () {
    await this.getVolunteer();
    await this.getSessions();
    await this.getSessionStorage();
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
      if(this.formCrea.region){
        await this.getProvinces();
        //Consultamos si existe distrito para el voluntario
        if(this.formCrea.province){
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
      let json = {idRegion: this.formCrea.region};
      const response = await consultServices('getProvincesByRegion','POST', json);
      this.provinces = response;
      this.isLoading = false;
    },

    //Listamos los distritos x provincia
    async getDistricts(){
      this.isLoading = true;
      let json = {idProvince: this.formCrea.province};
      const response = await consultServices('getDistrictsByProvince','POST', json);
      this.districts = response;
      this.isLoading = false;
    },

    //Consultamos los datos del voluntario x DNI
    async getVolunteer(){
      this.isLoading = true;
      let json = {id: this.documentNumber};
      const response = await consultServices('getvolunteer','POST', json);
      this.formCrea = {};
      this.formCrea = _.cloneDeep(response);
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
      const urlSufix = 'profile-photos/'+ this.formCrea.documentNumber +'/'// Folder destino del archivo
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
                this.formCrea.imageUrl = data.generatedUrl
                this.formCrea.profilePhoto = data.generatedUrl
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
