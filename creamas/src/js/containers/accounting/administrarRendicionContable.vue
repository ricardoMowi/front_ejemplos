rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
 
        <div class="card">
            <div class="card-header">
                <h2>Rendición contable</h2>
               

                <div class="clearfix"></div>
                
                 
            </div>
            
            <div class="card-body" >
                <div class="form-group" v-if="FlagADM == true" >
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
// import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";
import { Datetime } from 'vue-datetime';
import XLSX from './../../components/xlsx/xlsx.js';



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
        X:'',  
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
        FlagADM:false,
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
           

    }),

    async created () {
      await this.getSessionStorage()
      this.X = XLSX;
      await this.isADM();
      this.isLoading= false;
      
     
    },

    methods: {
      async onChangeOrganization(){
        this.accountingPeriods = {};
        //this.organization.id= item.id        
        await this.listAccountingPeriods();
      },
      async isADM(){
      //validar si es adminitrador del sistema  
        console.log("id:::::::::::::::::: ",this.id )
        //obtener el volunteer:job del semestre actual
        const response = await consultServices('getRecordVolunteerJobs','POST',{id:this.id,semesterCode:this.semester.id });
        if(response[0].Job.code == 'SYSTEM_ADMINISTRATOR'){
          console.log("es admi:::::::::::::")
          this.FlagADM = true   
          const response = await consultServices('listOrganizations','POST',{});
          this.organizations = response
        }else{
          //si no es admi, no puede seleccioar el tipo de organización
          console.log("no admi:::::::::::::")
          this.FlagADM = false  
          this.organization.id = response[0].Job.Area.idOrganization
          //se listará la organizacion relacionada al area del job del volunteer_job 
          await this.listAccountingPeriods();
        }
      },
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
                  const response =  await consultServices('getCurrentSemester','POST', {});
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
          this.titleTable = "Seleccione un periodo para rendir";
        
      },

      refreshData(){        
             this.$refs.tableMaf.formatData(this.accountingPeriods);    
      },

      setDataTable(arrayData){
          var ctx = this;
   
            this.accountingPeriods = [];
            arrayData.forEach(item => {
                    var account= {};
                    var flag = true;
                    var currentDay= moment(new Date()).utcOffset('-0500').valueOf();
                    if(moment(item.closeDate).utcOffset('-0500').valueOf() <currentDay){
                      flag = false;
                    }
                    flag= true;
                    account.code = item.code;
                    account.initialDate = item.initialDate != null ? account.initialDate= item.initialDate : account.initialDate = "---" ;
                    account.closeDate = item.closeDate != null ? account.closeDate= item.closeDate : account.closeDate = "---" ;
                    var url= '/dashboard/'+item.id+'/nuevaRendicionContable';
                    console.log("flag ",flag)
                    account.actions = <font style="vertical-align: inherit;">       
                                             {flag == true?  <div> <a href={url } class="btn btn-success btn-xs" >Rendir </a></div> :null}                                         
                                              <button  onClick={()=>ctx.exportExcel(item.id)}  type="button" class="btn btn-success btn-xs"> Descargar</button>                       
                                      </font>;
                    this.accountingPeriods.push(account);
                });
          
          this.refreshData();
      },
      async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
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
           //si es admin, se listaran todas las rendiciones contables 
           if(this.FlagADM == true){
             const resp = await consultServices('getDeclarationsByPeriod', 'POST', {idAccountingPeriod: id});
             this.declarations = resp;  
             console.log("array ",resp)
           }else{
             //si no es admin, solo se listarán las declaraciones del voluntario 
             const resp0 = await consultServices('getDeclarationsByPeriodByVolunteer', 'POST', {idAccountingPeriod: id, idVolunteer: this.id});
             this.declarations = resp0; 
             console.log("array ",resp0)
           }
           
           //Listar las rendiciones contables del periodo                           
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

                  console.log(_declaration);
               
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

        

    },
  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    
}

</style>
