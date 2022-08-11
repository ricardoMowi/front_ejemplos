rooms<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <nav class="breadcrumb">
              <a class="breadcrumb-item" href="/dashboard/adminCuentasContables">{{nameAccount}}</a>             
              <a class="breadcrumb-item" :href="'/dashboard/adminActividades/' + nameAccount+'/'+idAccount"> {{nameActivity}} </a>     
              <span class="breadcrumb-item active">Rubros de la actividad</span>
        </nav>
        <div class="card">
            <div class="card-header">
                <h2>Administrar rubros de una cuenta contable</h2>
                <div class="clearfix"></div>
                 <small>Sólo se podrán eliminar los rubros que no tengan subrubros asociados</small>
            </div>
            <div class="card">
              <div class="card-body"> 
                      <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Rubros:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="heading.typeCode">
                                    <option v-for="item in typeHeading" v-bind:value="item.code" >
                                     {{item.displayValue}} 
                                    </option>
                                  </select>
                               </div>
                      </div>                        
              </div> 
              <div class="card-header-actions" align-heading: center>
                    <button type="button" @click="createNewHeading()" data-toggle="modal" data-target=".modal-org" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar rubro
                    </button>
              </div>                        
            </div>
            <div class="card-body" >
                <TableMaf :header="colum" :data="heading" :tableTitle="titleTable" ref="tableMaf">
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
//import * as lang from "vuejs-datepicker/src/locale";
import { Datetime } from 'vue-datetime';
//COMPONENTS
import LoadingComponent from "./../../components/loadingComponent.vue";
//import Datepicker from 'vuejs-datepicker';
import TableMaf from "./../../components/TableMaf.vue";
import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";


export default {
    name: "roomsManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
    },

    data: () => ({
        idActivity: window.INITIAL_STATE.idActivity, 
        nameActivity: window.INITIAL_STATE.nameActivity, 
        idAccount: window.INITIAL_STATE.idAccount, 
        nameAccount: window.INITIAL_STATE.nameAccount, 
        isLoading: true,
        colum:[],
        semester:{},
        titleTable:'',
        formNot:{not:'',tit:'',},
        heading:{},       
        typeHeading:[],
        activity:{},
        organizations:[],
        areas:[],
        semester: {},
        formType: '',
       
    }),

    async created () { 
        await this.getSessionStorage();  
        await this.listHeadings();        
    },

    methods: {

      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                var ids = [] ;
                var flagHeading = false;
                if(!window.sessionStorage.typeHeading){
                  ids.push(25);
                  flagHeading = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //Hacer consulta única de masterValues
                if( ids.length > 0){                
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagHeading == true){
                       this.typeHeading = _.filter(arrayMasters, function(master) {return master.idMaster == 25; })
                       window.sessionStorage.typeHeading  = JSON.stringify(this.typeHeading);
                    }
                }
                // //si los datos existen cargarlos en los arreglos definidos para la patalla
                    this.typeHeading =JSON.parse( window.sessionStorage.typeHeading );
                    this.semester =JSON.parse( window.sessionStorage.semester );
        this.isLoading = false;
      },

      
      
      async listHeadings(){
        const response = await consultServices('listHeadings','POST',{idActivity: this.idActivity });
        console.log("listHeadings  ",response)
        this.setDataTable(response);
        await this.setHeadTable();
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(type){       
          this.colum = [
            {label:'Código de rubro' ,name:'code' ,find:1 ,sort:1},
            {label:'Nombre de rubro' ,name:'name' ,find:1 ,sort:1},
            {label:'Subrubros asignados' ,name:'subItems' ,find:0 ,sort:0},
            {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Rubros";
        
      },

      refreshData(){
             this.$refs.tableMaf.formatData(this.heading);   
      },

      setDataTable(arrayData){
          var ctx = this;
          this.heading = [];
            arrayData.forEach(item => {
                    var vitem= {};
                    vitem.name = this.getDisplayValue(item.typeCode,25);
                    vitem.code = item.id;
                    vitem.subItems = item.subheaderCount
                    var url= '/dashboard/adminSubRubros/'+this.nameAccount+'/'+this.idAccount+ '/'+this.nameActivity+ '/'+this.idActivity+ '/'+ vitem.name+ '/'+item.id;
                    vitem.actions = <font style="vertical-align: inherit;">
                                              <div> <a href={url } class="btn btn-success btn-xs" >Ver subrubros </a></div> 
                                              {item.subheaderCount == 0?  <button onClick={()=>ctx.removeHeading(item)}   type="button" class="btn btn-danger btn-xs">Eliminar</button>:null}
                                           </font>;
                    this.heading.push(vitem);
                });
          
          this.refreshData();
        },

        async removeHeading(item){
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar el rubro seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeHeading','POST',form);
                        this.listHeadings();
                        this.isLoading=false;
                }
        },

        async createNewHeading(){
          this.isLoading = true;
          if(this.heading.typeCode ){

              var flag= confirm("¿Crear nuevo Rubro?");
              if(flag == true){
              const response = await consultServices('createNewHeading','POST',{idAccountingActivity:this.idActivity,typeCode: this.heading.typeCode});
              console.log("id para crear ",this.id )
              console.log("typeCode para crear ",this.heading.typeCode )
                  if(response.id){
                    this.formNot.tit="Registro de rubro exitoso "; this.formNot.not="Se registró un nuevo rubro de manera correcta"
                    this.listHeadings();
                    this.heading={};
                  }else{
                    this.formNot.tit="Error en el registro de un nuevo rubro"; this.formNot.not="No se pudo registrar el nuevo rubro de manera correcta"
                  }
              $('.modal').modal('hide');
              this.shownotificacion();
              }
          }else{
              alert("Complete todos los campos necesarios para crear un rubro.")
          }    
          this.isLoading = false;
        },
        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 25){
                array= this.typeHeading
                this.typeHeadingy
            }
            for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
            }
            return display;
        },


        

    },
  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    
}

</style>
