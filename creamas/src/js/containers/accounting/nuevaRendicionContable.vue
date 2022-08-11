<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
 
        <div class="card">
            <div class="card-header">
                <h2>Agregar un registro a la rendición de este mes</h2>
                <div class="clearfix"></div>               
                 
            </div>
            
            <div class="card-body">
              <div class="form-group row"> 
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-4 col-xs-12">Identificador único:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <input v-model="accountingDeclaration.code" type="text" required="required" class="form-control col-md-12 col-xs-12" readonly="readonly" >
                        </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-4 col-xs-12">Documento:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <button @click="$refs.imageFile.click()" class="btn btn-primary">Cargar nueva imagen</button>
                      <input type="file" ref="imageFile" style="display: none" v-on:change="handleFileUpload" accept="image/*" >
                    </div>
                </div>
                <div  class="form-group col-md-6">
                          <label class="control-label col-md-4 col-sm-4 col-xs-12">Imagen:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <img :src="accountingDeclaration.attachmentUrl" class="img-thumbnail" alt="Responsive image" style="width:150px;  height:1 50px">
                          </div>
                </div>
        
                                       

                  
              <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Seleccione el tipo</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="accountingDeclaration.declarationTypeCode"  @change="showLocations"  >
                                <option v-for="item in declarationDocumentType" v-bind:value="item.code" >
                                     {{item.displayValue}} 
                                </option>
                            </select>
                        </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Fecha de realización</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <Datetime v-model="accountingDeclaration.excecutionDate" type="date" format="dd/MM/yyyy" value-zone="UTC-5"  ></Datetime>
                              </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Número de factura/boleta</label>
                              <div class="col-md-6 col-sm-6 col-xs-12"> 
                                <input  v-model="accountingDeclaration.invoiceNumber"  type="text" required="required" class="form-control col-md-7 col-xs-12" >
                              </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Proveedor</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control" v-model="accountingDeclaration.idVendor" @change="setVendor(accountingDeclaration.idVendor)">
                                      <option disabled="disabled" value="">Selecciona un proveedor </option>
                                      <option  v-for="item in vendors" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>
                </div>
                <div class="form-group col-md-6" v-if="this.flagInput == true">
                      <label class="control-label col-md-4 col-sm-3 col-xs-12">Otro Proveedor</label>
                       <div class="col-md-8 col-sm-6 col-xs-12"> 
                                <textarea v-model="accountingDeclaration.nameVendor" class="form-control" rows="1" ></textarea>
                       </div>
                </div>
                <div v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido desde (Región)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control"  @change="listProvincesFrom" v-model="locationFrom.region">
                                      <option disabled="disabled" value="">Selecciona una región </option>
                                      <option v-for="item in regions" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>
                </div>                        
                <div  v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido hasta (Región)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control"  @change="listProvincesTo" v-model="locationTo.region">
                                      <option disabled="disabled" value="">Selecciona una región </option>
                                      <option v-for="item in regions" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>                         
                </div>
                <div  v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido desde (Provincia)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control"  @change="listDistrictsFrom" v-model="locationFrom.province">
                                      <option disabled="disabled" value="">Selecciona una provincia </option>
                                      <option v-for="item in provincesFrom" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>
                </div>                        
                <div  v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido hasta (Provincia)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control"  @change="listDistrictsTo" v-model="locationTo.province">
                                      <option disabled="disabled" value="">Selecciona una provincia </option>
                                      <option v-for="item in provincesTo" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>                         
                </div>                                
                <div  v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido desde (distrito)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control" v-model="accountingDeclaration.startDistrict">
                                      <option disabled="disabled" value="">Selecciona un distrito </option>
                                      <option v-for="item in districtsFrom" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>
                </div>                        
                <div  v-if="showLocation == true" class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Recorrido hasta (distrito)</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">                                   
                                   <select class="form-control" v-model="accountingDeclaration.endDistrict">
                                      <option disabled="disabled" value="">Selecciona un distrito </option>
                                      <option v-for="item in districtsTo" v-bind:value="item.id">
                                          {{item.name}}
                                      </option>
                                    </select>
                                  </div>                         
                </div>
                <div class="form-group col-md-12"  >
                    <label class="control-label col-md-2 col-sm-3 col-xs-12">Descripción</label>
                         <div class="col-md-8 col-sm-6 col-xs-12"> 
                                <textarea v-model="accountingDeclaration.description" class="form-control" rows="3" ></textarea>
                         </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Cuenta contable</label>
                              <div class="col-md-6 col-sm-6 col-xs-12"> 
                                <input v-model="accountingDeclaration.account" type="text" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                              </div>
                </div> 
               <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-4 col-xs-12">Cargar cuenta contable</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target=".modal-cc" > Cargar una cuenta</button>
                        </div>
                </div>                       
                <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Cómo se pagará</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="accountingDeclaration.paymentMethodCode">
                                <option v-for="item in paymentMethod" v-bind:value="item.code" >
                                     {{item.displayValue}} 
                                </option>
                            </select>
                        </div>
                </div>
                <div class="form-group col-md-12"  >
                    <label class="control-label col-md-2 col-sm-3 col-xs-12">Observación</label>
                         <div class="col-md-8 col-sm-6 col-xs-12"> 
                                <textarea  v-model="accountingDeclaration.note" class="form-control" rows="3" ></textarea>
                         </div>
                </div>
              
              </div>  
                 
            </div> <!--card-body-->

            <div class="card-body">
                <div class="card-header">
                <h2>Distribución del gasto a los centros de costos (en soles)</h2>              
                <div class="clearfix"></div>              
                </div>

                <div class="card-body">
                  <!-- <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Centros de costos de la organización</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="costCenter"  >
                                <option v-for="item in costCentersAviable" v-bind:value="item" >
                                     {{item.name}} 
                                </option>
                            </select>
                        </div> 
                   </div>
                  <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12"></label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <button type="button"  @click="AddCostCenter()"   class="btn btn-success">Agregar Centro de Costos</button>     
                        </div>
                   </div> -->
                  
                   <!-- <TableMaf :header="columCostCenter" :data="costCenters" :tableTitle="titleTableCostCenter" ref="tableMafCostCenter">
                  </TableMaf> -->
                  <div class="table-responsive">
                      <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                      <thead>
                          <tr >
                        
                              <th style="width: 20px;">Centro de costos </th>
                              <th style="width: 20px;">Monto</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(cost,index) in costCentersDeclaration" >
                            
                              <th style="width: 20px;" >{{cost.name}}</th>
                              <th style="width: 20px;"><input @change="suma()" type="text" v-model="cost.itemAmount" class="form-control col-md-7 col-xs-12"></th>
                          </tr>
                      </tbody>
                      </table>
                 </div> 
                 <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12">Monto total (S/)</label>
                         <div class="col-md-6 col-sm-6 col-xs-12"> 
                              <input v-model="this.totalAmount" type="text" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                         </div>
                  </div>
                 <div class="form-group col-md-6">
                    <label class="control-label col-md-4 col-sm-3 col-xs-12"></label>
                         <div class="col-md-6 col-sm-6 col-xs-12"> 
                             <button  type="button"  @click="createNewDeclaration()" class="btn btn-success">Grabar Rendición</button>
                         </div>
                  </div>                  
                </div>
             
 
            </div> <!--card-body-->

            <!--Modal-->

            <div class="modal fade modal-cc" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 >Cargar Cuenta Contable</h1>                     
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div class="card">
                      <TableMaf :header="colum" :data="allAccounts" :tableTitle="titleTable" ref="tableMaf"></TableMaf>                   
                    </div>

                    <div class="modal-footer">
                            <center>
                              <button type="button" data-dismiss="modal" class="btn btn-default">Cancelar</button>                                                                
                            </center>
                    </div>
                    </div>
                </div>
            </div>
            <!--Modal-->





            <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                     <div class="modal-header">
                        <h4 class="modal-title">{{formNot.tit}} </h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p> <center> {{formNot.not}} </center> </p>
                    </div>
                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!--card-->
    </div> <!--col 12 -->
  </div> <!--row-->
</template>

<script>
import consultServices from './../../utilities/consultServices.js';
import moment from 'moment';
import _ from 'lodash';
//COMPONENTS
import LoadingComponent from "./../../components/loadingComponent.vue";
//import Datepicker from 'vuejs-datepicker';
import TableMaf from "./../../components/TableMaf.vue";
import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";
import { Datetime } from 'vue-datetime';


export default {
    name: "roomsManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
        Datetime,
    },

    data: () => ({
        id: window.INITIAL_STATE.id,    
        idAccountingPeriod: window.INITIAL_STATE.idAccountingPeriod,    
        idOrganization: 1,
        isLoading: true,
        colum:[],
        columCostCenter:[],
        titleTable:'',
        titleTableCostCenter:'',
        costCenters:[],
        costCenter:{},
        formNot:{not:'',tit:'',},
        allAccounts:[],
        semester: [],
        formType: '',
        period: {},
        accountingDeclaration:{code:''},
        activityTypeCode:[],
        headingTypeCode:[],
        subHeaderTypeCode:[],
        paymentMethod:[],
        declarationDocumentType:[],
        costCentersAviable:[],
        costCentersDeclaration:[],
        costCentersTable:[],        
        vendors:[],
        totalAmount:0,
        regions:[],
        provincesFrom:[],
        provincesTo:[],
        districtsFrom:[],
        districtsTo:[],
        locationFrom:{region:15, },
        locationTo:{region:15},        
        showLocation: false,
        flagInput: false,
        newAmount:0,
    }),

    async created () {  
      
      await this.getSessionStorage();  
      await this.createNewDeclarationCode();
      await this.getRegions();
      await this.isADM();
      await this.locationDefault();  
      await this.listVendors(); 
      await this.getAllAccounts();
      await this.listCostCenters();
      

    },

    methods: {

      async createNewDeclarationCode (){
          const response =  await  consultServices('createNewDeclarationCode','POST',{});
          this.accountingDeclaration.code= response[0].funcion_codigo_declaracion;
          console.log('code inicial::::::::', this.accountingDeclaration.code)
      },
      async getAllAccounts(){
          const response = await consultServices('getAllAccounts','POST',{id:this.idOrganization});
          this.setDataTable(response,'ACCOUNT');
          await this.setHeadTable('ACCOUNT');
      },
      async locationDefault(){
        var form={idRegion:15}
        this.provincesFrom= await  consultServices('getProvincesByRegion','POST',form);
        this.provincesTo= await  consultServices('getProvincesByRegion','POST',form);
      },
      async getRegions(){
        this.regions = await consultServices('getRegions','POST',{});
      },
      async isADM(){
        console.log("id:::::::::::::::::: ",this.id )
        const response = await consultServices('getRecordVolunteerJobs','POST',{id:this.id,semesterCode:this.semester.id });
        if(response[0].Job.id == 26){
          console.log("es admi:::::::::::::::::::::::")
        }else{
          console.log("no lo es manito:::::::::::::")
        }
      },
      async suma(){
        console.log("dejó de escribir ", this.costCentersDeclaration)
        var mount = 0; 
        for (let index = 0; index <  this.costCentersDeclaration.length; index++) {
          console.log("monto:::::::::::::",mount )
          console.log("monto unitario:::::::::::::", this.costCentersDeclaration[index].itemAmount )
          mount +=  Number(this.costCentersDeclaration[index].itemAmount)
          
        }
        this.totalAmount = mount
        this.accountingDeclaration.totalAmount = this.totalAmount
        mount=0

      },
      async listProvincesFrom(){
                var ctx = this;
                setTimeout(async () => {
                    if(ctx.locationFrom.region ){
                        var form={idRegion:this.locationFrom.region}
                        ctx.isLoading=true;
                        ctx.provincesFrom= await  consultServices('getProvincesByRegion','POST',form);
                        ctx.isLoading=false;
                    }
                }, 400);
                this.locationFrom.district = '';
                this.districtsFrom =[];
      },
      async listProvincesTo(){
                var ctx = this;
                setTimeout(async () => {
                    if(ctx.locationTo.region ){
                        var form={idRegion:this.locationTo.region}
                        ctx.isLoading=true;
                        ctx.provincesTo= await  consultServices('getProvincesByRegion','POST',form);
                        ctx.isLoading=false;
                    }
                }, 400);
                this.locationTo.district = '';
                this.districtsTo =[];
      },
      async listDistrictsFrom() {
                var ctx = this;
                setTimeout(async () => {
                    if(ctx.locationFrom.province ){
                        var form={idProvince:this.locationFrom.province }
                        ctx.isLoading=true;
                        ctx.districtsFrom= await  consultServices('getDistrictsByProvince','POST',form);
                        ctx.isLoading=false;
                    }
                }, 400);
      },      
      async listDistrictsTo() {
                var ctx = this;
                setTimeout(async () => {
                    if(ctx.locationTo.province ){
                        var form={idProvince:this.locationTo.province }
                        ctx.isLoading=true;
                        ctx.districtsTo= await  consultServices('getDistrictsByProvince','POST',form);
                        ctx.isLoading=false;
                    }
                }, 400);
      },       
      async listCostCenters(){         
          const response = await consultServices('getCostCenters','POST',{id: this.idOrganization});
          this.costCentersAviable= response;
          this.costCentersDeclaration= []
          for (let index = 0; index < this.costCentersAviable.length; index++) {
              var json={
                idAccountingCostCenter:this.costCentersAviable[index].id,
                name:this.costCentersAviable[index].name,
                idOrganization:this.costCentersAviable[index].idOrganization,
                itemAmount:0,
              }
            this.costCentersDeclaration.push(json)
          }
          //this.setDataTable(this.costCentersDeclaration,'COSTCENTER');
      },
      async listDistricts() {
              this.districts= await  consultServices('getDistrictsByProvince','POST',{idProvince:127});
      },
      async listVendors() {
              //this.vendors= await  consultServices('getDistrictsByProvince','POST',{idProvince:127});
              this.vendors= [{id:1 , name:'Vendor 1'},{id:2 , name:'Vendor 2'}, {id:3 , name:'otros'}]
      },

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
        //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagActivityTypeCode = false;
                 var flagHeadingTypeCode = false;
                 var flagSubHeaderTypeCode = false;
                 var flagPaymentMethod = false;        
                 var flagDeclarationDocumentType = false;

                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                if(!window.sessionStorage.activityTypeCode){
                  ids.push(24);
                  flagActivityTypeCode = true;
                }
                if(!window.sessionStorage.headingTypeCode){
                  ids.push(25);
                  flagHeadingTypeCode = true;
                }
                if(!window.sessionStorage.subHeaderTypeCode){
                  ids.push(26);
                  flagSubHeaderTypeCode = true;
                }
                if(!window.sessionStorage.flagPaymentMethod){
                  ids.push(27);
                  flagPaymentMethod = true;
                }
                if(!window.sessionStorage.declarationDocumentType){
                  ids.push(28);
                  flagDeclarationDocumentType = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagActivityTypeCode == true){
                       this.activityTypeCode = _.filter(arrayMasters, function(master) {return master.idMaster == 24; })
                       window.sessionStorage.activityTypeCode  = JSON.stringify(this.activityTypeCode);
                    }
                    if(flagHeadingTypeCode == true){
                       this.headingTypeCode = _.filter(arrayMasters, function(master) {return master.idMaster == 25; })
                       window.sessionStorage.headingTypeCode  = JSON.stringify(this.headingTypeCode);
                    }
                    if(flagSubHeaderTypeCode == true){
                       this.subHeaderTypeCode = _.filter(arrayMasters, function(master) {return master.idMaster == 26; })
                       window.sessionStorage.subHeaderTypeCode  = JSON.stringify(this.subHeaderTypeCode);
                    }
                    if(flagPaymentMethod == true){
                       this.paymentMethod = _.filter(arrayMasters, function(master) {return master.idMaster == 27; })
                       window.sessionStorage.paymentMethod  = JSON.stringify(this.paymentMethod);
                    }
                    if(flagDeclarationDocumentType == true){
                       this.declarationDocumentType = _.filter(arrayMasters, function(master) {return master.idMaster == 28; })
                       window.sessionStorage.declarationDocumentType  = JSON.stringify(this.declarationDocumentType);
                    }
                }

                    // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.activityTypeCode =JSON.parse( window.sessionStorage.activityTypeCode );
                    this.headingTypeCode =JSON.parse( window.sessionStorage.headingTypeCode );
                    this.subHeaderTypeCode =JSON.parse( window.sessionStorage.subHeaderTypeCode );
                    this.paymentMethod =JSON.parse( window.sessionStorage.paymentMethod );  
                    this.declarationDocumentType =JSON.parse( window.sessionStorage.declarationDocumentType );                   
                    // //fin de la carga de arreglos para la pantalla
        this.isLoading = false;
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(type){
        if('ACCOUNT'){
            this.colum = [
              {label:'Area' ,name:'area' ,find:1 ,sort:0},
              {label:'Actividad' ,name:'activity' ,find:1 ,sort:0},
              {label:'Rubro' ,name:'heading' ,find:1 ,sort:0},
              {label:'Subrubro' ,name:'subHeader' ,find:1 ,sort:0},
              {label:' ' ,name:'actions' ,find:1 ,sort:0}];
            this.titleTable = "Identificación de cuenta contable a cargar";
        }   
      },

      refreshData(type){    
             if(type == 'ACCOUNT'){
               this.$refs.tableMaf.formatData(this.allAccounts); 
             }                 
      },

      setDataTable(arrayData, type){
          var ctx = this;          
          if(type == 'ACCOUNT'){
            this.allAccounts = [];
            arrayData.forEach(item => {
                    var account= {};
                    account.area = item.AccountingHeading.AccountingActivity.AccountingAccount.Area.nam;
                    account.activity = this.getDisplayValue( item.AccountingHeading.AccountingActivity.typeCode,24)
                    account.heading =  this.getDisplayValue( item.AccountingHeading.typeCode,25)
                    account.subHeader = this.getDisplayValue( item.typeCode,26);
                    account.actions = <font style="vertical-align: inherit;">      
                                              <button onClick={()=>ctx.loadAccount(item)}  type="button"  data-dismiss="modal" class="btn btn-success btn-xs"> Elegir esta cuenta</button>                           
                                      </font>;
                    this.allAccounts.push(account);
            });
          }
          // if(type == 'COSTCENTER'){
          //   var nWeek = 0;
          //   this.costCentersTable = [] 
          //   //arrayData = this.costCentersAviable;
          //   arrayData.forEach(item => {
          //     var ctx = this;
          //     var costCenter = {};
          //               console.log(item);
          //               costCenter.name = item.name;                       
          //               var idTextArea1 = "textAreaCognitive"+nWeek;                       
          //               console.log("idtext",idTextArea1)
          //               console.log("nweek ", nWeek)
          //               costCenter.amount = <div><input onChange={()=>ctx.sumAmount(item,idTextArea1)} id={idTextArea1} type="text" value={item.itemAmount} class="form-control col-md-7 col-xs-12"></input></div>;
          //               costCenter.actions = <font style="vertical-align: inherit;"><button onClick={()=>ctx.RemoveCostCenter(item)}  type="button"  data-dismiss="modal" class="btn btn-danger btn-xs"> Eliminar</button></font>;  
          //               this.costCentersTable.push(costCenter);
          //               nWeek++;
          //   });
          // }          
          this.refreshData(type);
        },
        RemoveCostCenter(item){
            var sum=0;
            for( var i = 0; i < this.costCentersDeclaration.length; i++){ 
              if ( this.costCentersDeclaration[i] == item) {
                this.costCentersDeclaration.splice(i, 1); 
              }
            }
            console.log("costCentersDeclaration despues ",this.costCentersDeclaration)
            this.setHeadTable('COSTCENTER');
            this.setDataTable(  this.costCentersDeclaration,'COSTCENTER');
            this.costCentersTable =[];
            this.costCenter={}
            for (let index = 0; index < this.costCentersDeclaration.length; index++) {
              sum = sum + Number(this.costCentersDeclaration[index].itemAmount) ;
            }         
            this.accountingDeclaration.totalAmount = sum;

        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 24){
                array= this.activityTypeCode
            }
            if(master == 25){
                array= this.headingTypeCode
            }
            if(master == 26){
                array= this.subHeaderTypeCode
            }
            if(master == 27){
                array= this.paymentMethod
            }
            if(master == 28){
                array= this.declarationDocumentType
            }
            for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
            }
            return display;
        },

        loadAccount(item){
          this.accountCount='';
          var flag=confirm("¿Cargar cuenta seleccionada?");

                if(flag == true){
                        this.isLoading=true;
                        this.accountingDeclaration.idAccountingSubHeader = item.id;
                        this.accountingDeclaration.account= item.AccountingHeading.AccountingActivity.AccountingAccount.name;
                        this.isLoading=false;
                }else{
                  $('.modal-cc').modal('show');
                }
        },

        async removeAccount(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la cuenta contable seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeAccount','POST',form);
                        this.listAccountingPeriods();
                        this.isLoading=false;
                }
        },

        showLocations(){
          if(this.accountingDeclaration.declarationTypeCode == 'ACCOUNTING_TRANSPORTATION'){
            this.showLocation = true;
          }else{
            this.showLocation = false;
          }
        },

        async createNewDeclaration(){
          console.log("costCentersDeclaration  ", this.costCentersDeclaration) 
          this.isLoading = true;
          if(this.accountingDeclaration.totalAmount && this.accountingDeclaration.declarationTypeCode && this.accountingDeclaration.idVendor && this.accountingDeclaration.account && this.accountingDeclaration.idAccountingSubHeader &&  this.accountingDeclaration.attachmentUrl && this.costCentersDeclaration){
             var flag=confirm("¿Agregar nueva Rendición contable?");              
                if(flag == true){ 
                var finalCostCenter =[]  
                //solo se registrarán los centros de costo con itemAmount > 0
                for (let index = 0; index < this.costCentersDeclaration.length; index++) {
                  if(this.costCentersDeclaration[index].itemAmount > 0){
                    finalCostCenter.push(this.costCentersDeclaration[index])
                  }                  
                }
                    
                var form={}
                form.totalAmount = this.totalAmount;  
                form.attachmentUrl = this.accountingDeclaration.attachmentUrl;
                form.idVendor = this.accountingDeclaration.idVendor;
                form.idAccountingSubHeader = this.accountingDeclaration.idAccountingSubHeader;  
                form.idAccountingPeriod =  this.idAccountingPeriod 
                form.declarationTypeCode =   this.accountingDeclaration.declarationTypeCode;
                form.costCentersDeclaration = finalCostCenter; 
                form.paymentMethodCode = this.accountingDeclaration.paymentMethodCode;
                form.code = this.accountingDeclaration.code
                form.idVolunteer =parseInt( this.id, 10);
                console.log("form que se va a crear ", form)  
                console.log("accountingDeclaration ",this.accountingDeclaration)                      
                const response = await consultServices('createNewDeclaration','POST',form);
                if(response.id){
                  this.formNot.tit="Registro de Rendición Contable exitoso"; this.formNot.not="Se registró una nueva Rendición Contable de manera correcta"
                }else{
                  this.formNot.tit="Error en el registro de una nueva Rendición Contable "; this.formNot.not="No se pudo registrar una nueva Rendición Contable de manera correcta"
                }
                $('.modal').modal('hide');
                this.shownotificacion();
                this.flagInput= false,
                this.accountingDeclaration ={};
                this.costCentersDeclaration =[]; 
                this.listCostCenters();            
                }
          }else{
            alert("Complete los campos mínimos necesarios para registrar una rendición contable")
          }
         
          this.isLoading = false;
        },

        setVendor(id){
          if(id == 3){
            this.flagInput = true;
          }else{
            this.flagInput= false;
          }

        },

        showUpdate(item){
          console.log("showupdate ",item)
          this.formType = 'Edit';
          this.period.initialDate = item.initialDate;
          this.period.closeDate = item.closeDate;
          this.period.code = item.code;
        },
        async updatePeriod(){
          this.isLoading = true;
          console.log("periodo ",this.period )
          if(this.period.initalDate && this.period.closeDate ){
            if(Date.parse(this.period.closeDate) < Date.parse(this.period.initalDate)){
                alert("La fecha de cierre debe ser mayor a la fecha de inicio");
            }else{
              var flag= confirm("¿Crear nueva cuenta?");
              if(flag == true){
              }
            }
          }else{
              alert("Complete todos los campos necesarios para actualizar las fechas del periodo.")
          }    
          this.isLoading = false;
        },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },
        async handleFileUpload(e){
        //seteamos variable local
        const urlSufix = 'accounting-photos/'+ this.idAccountingPeriod+ '/'//this.semester.id +'/'// Folder destino del archivo
        this.isLoading = true;
        var formData = new FormData();
        formData.append('file',e.target.files[0])
        //var url = 'upload/uploadAttachment?urlSufix='+urlSufix
        var url = '/upload/uploadAttachment?urlSufix='+urlSufix
        console.log("url handleFileUpload ", url)
        fetch(url, {
          method:'POST',
          body: formData
        })
        .then(response => {
          console.log('response ', response);
          if (response.ok) {
              response.json()
              .then(data => {
                if(data.error){
                  alert(data.error)
                }else{
                  console.log('generatedUrl ', data.generatedUrl);
                  console.log('data ', data);
                  this.accountingDeclaration.attachmentUrl = data.generatedUrl
                  console.log('attachmentUrl ',this.accountingDeclaration.attachmentUrl)
                }
                this.isLoading = false;
              }).catch(error =>{
                console.log("error catch ", error)
              }

              )
          }else{
            this.isLoading = false;
          }
        })
      },


    },
  }
</script>
<style scoped>
/* button.btn.btn-danger.btn-xs {
    color: #ffffff;
    
} */

</style>
