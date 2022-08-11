rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">

        <div class="card">
            <div class="card-header">
                <h2>Administrar periodos contables</h2>

                <div class="card-header-actions"  v-if="organization.id" align-items: center >
                    <button type="button" @click="showAdPeriod()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar nuevo periodo
                    </button>
                </div>
                <div class="clearfix"></div>


            </div>

            <div class="card-body" v-if="role == 'CCADMIN'">
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione una Organización</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="organization" @change="onChangeOrganization()" >
                                <option v-for="item in organizations" v-bind:value="item" >
                                     {{item.name}}
                                </option>
                            </select>
                        </div>
                </div>

                <TableMaf :header="colum" :data="accountingPeriods"  :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>

            </div> <!--card-body-->

            <!--Modal-->

            <div class="modal fade modal-org" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="formType=='Add'">Agregar periodo</h1>
                        <h1 v-if="formType=='Edit'">Editar fechas de periodo</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card">
                    <div class="card-body">
                              <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Organización:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                   <input v-model="organization.name" type="text" required="required" class="form-control col-md-12 col-xs-12" readonly="readonly" >
                              </div>
                      </div>

                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Código del periodo</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <input v-model="period.code" type="text" required="required" class="form-control col-md-12 col-xs-12"  readonly="readonly"  >
                              </div>
                      </div>

                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de inicio:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5"   v-model="period.initialDate"  ></Datetime>
                              </div>
                      </div>

                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de cierre:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5"  v-model="period.closeDate"  ></Datetime>
                              </div>
                      </div>

                    </div><!--body-->
                    </div>

                    <div class="modal-footer">
                            <center>
                                <button v-if="formType=='Add'"  type="button" data-dismiss="modal" class="btn btn-default">Actualizar más tarde</button>
                                <button @click="updatePeriod()" data-dismiss="modal" type="button" class="btn btn-success">Actualizar fechas</button>
                                <button v-if="formType=='Edit'"  type="button" data-dismiss="modal" class="btn btn-default">Cancelar</button>

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
import XLSX from './../../components/xlsx/xlsx.js';
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
        role:'',
        isLoading: true,
        colum:[],
        titleTable:'',
        formNot:{not:'',tit:'',},
        organization:{},
        area:{},
        accountingPeriods:[],
        account:{},
        organizations:[],
        areas:[],
        semester: [],
        formType: '',
        period: {},
        titleI:[
          'mes',
          'idDoc',
          'tipo',
          'fechaRealizado',
          'numFactura',
          'proveedor',
          'lugarDesdeTaxi',
          'lugarHastaTaxi',
          'descripcion',
          'centroDeCostos',
          'cuentaContable',
          'origen',
  	      'DNI',
	        'nombres',
	        'monto',
          'observacion',
          'Organziación',
          'link',
        ],
        NAME :'rendiciones_contables',
        nameOfSheet: 'reporte_rendiciones_contables',
        declarations :[],
        paymentMethod:[],
        declarationDocumentType:[],
        semester: {},
        X: '',
        ArrayAccountingPeriods:[],


    }),

    async created () {
      this.X = XLSX;
      this.role ="CCADMIN"
      if(this.role == "CCADMIN"){
        const response = await consultServices('listOrganizations','POST',{});
        this.organizations = response
      }

      await this.getSessionStorage();
      console.log("semester ",this.semester)
    },

    methods: {
      async onChangeOrganization(){
        this.isLoading = true;
        this.accountingPeriods = {};
        await this.listAccountingPeriods();
        this.isLoading = false;
      },
      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
         //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagPaymentMethod = false;
                 var flagDeclarationdocumentType = false;

                if(!window.sessionStorage.paymentMethod){
                  ids.push(27);
                  flagPaymentMethod = true;
                }
                if(!window.sessionStorage.declarationDocumentType){
                  ids.push(28);
                  flagDeclarationdocumentType = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }

                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagPaymentMethod == true){
                       this.paymentMethod = _.filter(arrayMasters, function(master) {return master.idMaster == 27; })
                       window.sessionStorage.paymentMethod  = JSON.stringify(this.paymentMethod);
                    }
                    if(flagDeclarationdocumentType == true){
                       this.declarationDocumentType = _.filter(arrayMasters, function(master) {return master.idMaster == 28; })
                       window.sessionStorage.declarationDocumentType  = JSON.stringify(this.declarationDocumentType);
                    }
                }

                    // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.paymentMethod =JSON.parse( window.sessionStorage.paymentMethod );
                    this.declarationDocumentType =JSON.parse( window.sessionStorage.declarationDocumentType );
                    this.semester =JSON.parse( window.sessionStorage.semester );

                    // //fin de la carga de arreglos para la pantalla
        this.isLoading = false;
      },



      async listAccountingPeriods(){
        console.log("org ", this.organization.id)
          const response = await consultServices('getPeriods','POST',{id:this.organization.id});
          this.ArrayAccountingPeriods = response
          this.setDataTable(response);
          await this.setHeadTable();
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(){

          this.colum = [
            {label:'Mes' ,name:'code' ,find:1 ,sort:0},
            {label:'Activo desde' ,name:'initialDate' ,find:1 ,sort:0},
            {label:'Activo hasta' ,name:'closeDate' ,find:0 ,sort:0},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Periodos contables";

      },

      refreshData(){
             this.$refs.tableMaf.formatData(this.accountingPeriods);
      },

      setDataTable(arrayData){
          var ctx = this;

            this.accountingPeriods = [];
            arrayData.forEach(item => {
                    var account= {};
                    account.code = item.code;
                    account.initialDate = item.initialDate != null ? account.initialDate= item.initialDate : account.initialDate = "---" ;
                    account.closeDate = item.closeDate != null ? account.closeDate= item.closeDate : account.closeDate = "---" ;
                    account.actions = <font style="vertical-align: inherit;">
                                              <button onClick={()=>ctx.showUpdate(item)} data-toggle="modal" data-target=".modal-org"  type="button" class="btn btn-success btn-xs"> Actualizar fechas</button>
                                              <button onClick={()=>ctx.exportExcel(item.id)}   type="button" class="btn btn-success btn-xs"> Descargar</button>
                                      </font>;
                    this.accountingPeriods.push(account);
                });

          this.refreshData();
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

        async showAdPeriod(){
          this.isLoading = true;
          //ordenar los periodos contables generados 
          this.ArrayAccountingPeriods.sort(function(a,b){ return (a.id) - (b.id);  });
          //obtener el mes del ultimo periodo contable de la organización
          var month = parseInt((this.ArrayAccountingPeriods[this.ArrayAccountingPeriods.length -1 ].code).substring(4));
          var flag=confirm("¿Agregar nuevo periodo?");
                if(flag == true){
                        const response = await consultServices('createNewPeriod','POST',{idOrganization: this.organization.id, month: month });
                        this.listAccountingPeriods();
                        this.formType = 'Add'
                        this.period.code= this.semester.id
                        //$('.modal-org').modal('show');
                }
          this.isLoading = false;
        },

        showUpdate(item){
          console.log("showupdate ",item)
          this.formType = 'Edit';
          this.period.initialDate = item.initialDate;
          this.period.closeDate = item.closeDate;
          this.period.code = item.code;
          this.period.id = item.id;
        },
        async updatePeriod(item){
          this.isLoading = true;
          console.log("periodo ",this.period )
          if(this.period.initialDate && this.period.closeDate ){
            if(Date.parse(this.period.closeDate) < Date.parse(this.period.initialDate)){
                alert("La fecha de cierre debe ser mayor a la fecha de inicio");
            }else{
              var flag= confirm("¿Actualizar fechas?");
              if(flag == true){
              const response = await consultServices('updatePeriod','POST',{id:this.period.id, initialDate: this.period.initialDate, closeDate:this.period.closeDate });
                  if(response){
                    this.formNot.tit="Registro de periodo exitoso "; this.formNot.not="Se actualizó un nuevo periodo de manera correcta"
                    this.listAccountingPeriods();
                    this.period={};
                  }else{
                    this.formNot.tit="Error en la actualización de un periodo."; this.formNot.not="No se pudo actualizar las fechas de periodo de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
            }
          }else{
              alert("Complete todos los campos necesarios para actualizar las fechas del periodo.")
          }
          this.isLoading = false;
        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 27){
                array=  this.paymentMethod
            }
            if(master == 28){
                array=  this.declarationDocumentType
            }
            for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
                }
            return display;
        },
        async exportExcel(id) {
         if(id){
           //Listar las rendiciones contables del periodo
           const resp = await consultServices('getDeclarationsByPeriod', 'POST', {idAccountingPeriod: id});
           this.declarations = resp;
           console.log("array ",resp)

           var tempFormat =_.cloneDeep(this.titleI);

           //Seteamos la cabecera del excel
           var data = [];
           var dataBody = [];
           data[0] = _.map(tempFormat,(item_format)=>{
             return item_format;
           });

           //Seteamos la data del excel
           var dataBody = _.map(this.declarations, (declaration)=>{
           var _declaration = [];

            // console.log('')
            _.map( declaration, (item) => {

                  var name="";
                  var lastName="";
                  var secondLastName="";

                  _declaration[0] = declaration.AccountingPeriodCode ;
                  declaration.AccountingDeclarationCode  ? _declaration[1] = declaration.AccountingDeclarationCode : _declaration[1] = '';
                  declaration.declarationTypeCode  ? _declaration[2] = this.getDisplayValue( declaration.declarationTypeCode,28)  : _declaration[2] = '';
                  declaration.excecutionDate  ? _declaration[3] = declaration.excecutionDate  : _declaration[3] =  '';
                  declaration.invoiceNumber  ? _declaration[4] = declaration.invoiceNumber  : _declaration[4] = '';
                  declaration.vendorName ? _declaration[5] = declaration.vendorName : _declaration[5] =  '';
                  declaration.startDistrict ? _declaration[6] = declaration.startDistrict : _declaration[6] =  '';
                  declaration.endDistrict ? _declaration[7] =  declaration.endDistrict  :  _declaration[7] = '';
                  declaration.AccountingDeclarationDescription ? _declaration[8] =  declaration.AccountingDeclarationDescription : _declaration[8] = '';
                  declaration.AccountingCostCenterName ? _declaration[9] =  declaration.AccountingCostCenterName : _declaration[9] = '';
                  declaration.AccountingAccountName ? _declaration[10] =   declaration.AccountingAccountName : _declaration[10] = ''; //acá va la cuenta
                  declaration.paymentMethodCode ? _declaration[11] = this.getDisplayValue(  declaration.paymentMethodCode,27 ): _declaration[11] = '';
                  declaration.VolunteerDocumentNumber ? _declaration[12] =  declaration.VolunteerDocumentNumber : _declaration[12] = '';
                  declaration.VolunteerName ? name =  declaration.VolunteerName : name = '';
                  declaration.VolunteerLastName ? lastName =  declaration.VolunteerLastName : lastName = '';
                  declaration.VolunteerSecondLastName ? secondLastName =  declaration.VolunteerSecondLastName : secondLastName = '';
                  _declaration[13] = name+ lastName+ secondLastName;
                  declaration.itemAmount ? _declaration[14] =  declaration.itemAmount : _declaration[14] = '';
                  declaration.AccountingDeclarationNote ? _declaration[15] =   declaration.AccountingDeclarationNote : _declaration[15] = '';
                  declaration.OrganizationName ? _declaration[16] =   declaration.OrganizationName : _declaration[16] = '';
                  declaration.AccountingDeclarationAttachmentUrl ? _declaration[17] =   declaration.AccountingDeclarationAttachmentUrl : _declaration[17] = '';

                  console.log('declaration ',_declaration);

             });
             return _declaration;
            });

           //Seteamos los parametros para el excel
           data = _.concat(data, dataBody);
             var filename = "reporte_rendiciones_por_periodo" + ".xlsx";
             var ws_name = this.NAME;
             var wb = XLSX.utils.book_new();
             var ws = XLSX.utils.aoa_to_sheet(data);
             XLSX.utils.book_append_sheet(wb, ws, ws_name);

            var stringLetter = "ABCDEFGHIJKLMNOPQR";
            var arrayString = stringLetter.split('');

            for (var i = 0; i <= dataBody.length; i++) {
              i = i + 1
              var json = {}
              if(i == 1){
                json = {
                  font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                  fill: { fgColor: {rgb: "00aae4"}},
                  border: {
                    top : { style: 'thin', color: {rgb: "000000"} },
                    bottom :	{ style: 'thin', color: {rgb: "000000"} },
                    left :	{ style: 'thin', color: {rgb: "000000"} },
                    right :	{ style: 'thin', color: {rgb: "000000"} },
                  }
                }
              }else{
                json ={
                  border: {
                    top : { style: 'thin', color: {rgb: "000000"} },
                    bottom :	{ style: 'thin', color: {rgb: "000000"} },
                    left :	{ style: 'thin', color: {rgb: "000000"} },
                    right :	{ style: 'thin', color: {rgb: "000000"} },
                  }
                }
              }
              _.map(arrayString, (item) => {
                var cell = item + String(i);
                console.log("cells ",cell);
                console.log("debajo de cells ",wb.Sheets.rendiciones_contables[cell]);
                wb.Sheets.rendiciones_contables[cell]['s']=json;
              })
              i = i - 1
            };

             XLSX.writeFile(wb, filename);

         }else{
           alert("No existen semestres");
         }
       },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },



    },
  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;

}

</style>
