<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Mis Solicitudes de Mejoras web </h2>

                <div class="clearfix"></div>

          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <div class="card-body">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <textarea  v-model="improvement" class="form-control" id="textarea-input" name="textarea-input" rows="9" placeholder="Escribe una sugerencia.."></textarea>
            </div>
            <div class="card-header-actions" align-items: center>
                <button type="button" data-toggle="modal"  @click="sendRequest()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Enviar sugerencia
                </button>
            </div>

            </div>


            <TableMaf :header="colum" :data="requests" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

        </div>
      </div>





        <!-- <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Registrar nueva solicitud</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">

                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento del solicitante:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="documentNumber" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>
                    <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha del calendario:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="formRequest.typeCode" >
                                            <option disabled="disabled" value="">Fechas del calendario del colegio</option>
                                            <option v-for="item in dates" v-bind:value="item.startDate" >
                                            {{item.startDate}}
                                            </option>
                                            </select>
                                        </div>
                                    </div>
                    </div>
                     <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="formRequest.typeCode" >
                                            <option disabled="disabled" value="">Seleccione un motivo</option>
                                            <option v-for="item in dates" v-bind:value="item.startDate" >
                                            {{item.startDate}}
                                            </option>
                                            </select>
                                        </div>
                                    </div>
                    </div>


                </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="sendRequest()" type="button" class="btn btn-primary">Enviar esta solicitud</button>
                </div>

            </div>
          </div>
        </div> -->
      <!-- Modal Fin-->



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
      <!--Modal not-->


    </div>
  </div>
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";


  export default {
      name: "rolesContainer",
      components: {
      LoadingComponent,
      TableMaf,

     },
      data: () => ({
          id: window.INITIAL_STATE.id,
          documentNumber: window.INITIAL_STATE.documentNumber,
          typeRequest:[],
          isLoading: false,
          formRequest:{typeCode:''},
          requests:[],
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          dates:[],
          stateRequest:[],
          semester:[],
          improvement: '',

      }),
     async  created () {


          this.isLoading=true;
          await this.getSessionStorage();
          this.listRequests();
          this.setHeadTable();


          this.isLoading=false;

  		},
      methods: {
        async shownotificacion(){
            $('.bs-example-modal-not').modal('show');

        },

        async getSessionStorage(){
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagSemester = false;
                 var flagStateRequest = false;
                 var flagTypeRequest = false;

                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response ;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                if(!window.sessionStorage.stateRequest){
                  ids.push(21);
                  flagStateRequest = true;
                }
                if(!window.sessionStorage.typeRequest){
                  ids.push(22);
                  flagTypeRequest = true;
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagStateRequest == true){
                       this.stateRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 21; })
                       window.sessionStorage.stateRequest  = JSON.stringify(this.stateRequest);
                    }
                    if(flagTypeRequest == true){
                       this.typeRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 22; })
                       window.sessionStorage.typeRequest  = JSON.stringify(this.typeRequest);
                    }
                }

                    // //si los datos existen cargarlos en los arreglos definidos para la patalla

                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                    this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                    // //fin de la carga de arreglos para la pantalla


                this.isLoading = false;
        },


        async listRequests() {            
            const response = await consultServices('listRequestsxVolunteer','POST',{semesterCode:this.semester.id, typeCode: 'REQUEST_WEB_IMPROVEMENT', idVolunteer:this.id});
            this.setDataTable(response);
        },

        async sendRequest() {

           if(!this.improvement){
               alert("Debe completar todos los campos para una nueva solicitud");
           }else{
           this.isLoading=true;
           var form ={}
           var flag = confirm("¿Enviar nueva solicitud?");
           console.log("enviar  ", flag);
            if(flag == true){
                form.idVolunteer = this.id;
                form.semesterCode =this.semester.id;
                form.typeCode = 'REQUEST_WEB_IMPROVEMENT';
                form.reason = this.improvement;


                console.log("solicitud",form);

                const response=  await consultServices('createRequest','POST',form);
                if(response.status == 200){
                this.formNot.tit="Solicitud enviada "; this.formNot.not="Se ha enviado la solicitud de manera exitosa"
                this.listRequests();
                this.formRequest={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo enviar la solicitud de manera exitosa"
                }
                this.improvement = "";
                $('.modal').modal('hide');
                this.shownotificacion();
            }
             this.isLoading=false;
           }
        },

        async removeRequest(item) {
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la solicitud seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeRequest','POST',form);
                        this.listRequests();
                        this.isLoading=false;

                }
         },




        setHeadTable(){
            this.colum = [
                {label:'Idea' ,name:'idea' ,find:0 ,sort:0},
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Fecha de cierre de solicitud' ,name:'closeDate' ,find:1 ,sort:1},
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Solicitudes del semestre";
        },


        refreshData() {
               this.$refs.tableMaf.formatData(this.requests);
               console.log(" solicitudes ahora: ",this.requests);
        },


        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 21){
                array= this.stateRequest
            }
            if(master == 22){
                array= this.typeRequest

            }


                for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }

                }
            return display;



        },

        setDataTable(arrayData){
                var ctx = this;
                this.requests = [];

                arrayData.forEach(item => {
                    var request = {};
                    var varActionsPending="";
                    var varActionFinishedAproveed="";
                    var varActionFinishedDisapprove="";


                         request.state=
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud desaprobada</button> :null}
                            {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}
                            {item.statusCode == 'REQUEST_QUEUED'?  <button  type="button" class="btn btn-secondary btn-xs">Mejora en cola </button>:null}
                            {item.statusCode == 'REQUEST_IN_DEVELOPMENT'?  <button  type="button" class="btn btn-primary btn-xs">Mejora en desarrollo </button>:null}
                            {item.statusCode == 'REQUEST_FINISHED'?  <button  type="button" class="btn btn-success btn-xs">Mejora implementada </button>:null}
                            </font></font>;
                        request.creationDate= moment(item.initialDate).format('DD/MM/YYYY');
                        request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" :   request.closeDate=moment(item.closeDate).format('DD/MM/YYYY');

                        request.idea = item.reason;
                        request.actions =
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'? <button onClick={()=>ctx.generatePDF(item)}   type="button" class="btn btn-info btn-xs"> Ver documento en PDF</button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'? " " :null}
                            {item.statusCode == 'REQUEST_PENDING'?  <button onClick={()=>ctx.removeRequest(item)}   type="button" class="btn btn-danger btn-xs"> Eliminar solicitud</button>:null}
                            </font></font>;


                    this.requests.push(request);
                });

                    this.refreshData();
        },


      }


  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    margin: 0px;
}

</style>
