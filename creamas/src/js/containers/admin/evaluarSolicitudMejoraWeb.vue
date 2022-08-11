<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Solicitudes de mejoras web de los creandos</h2>

          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="colum" :data="requests" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>
        </div>
      </div>




      <!-- Modal update-->
        <div class="modal fade bs-example-modal-update" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Actualizar estado de la  solicitud</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Creando solicitante:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.fullname" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>

                    <div class="card-body" >
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado de la solicitud:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.statusCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>

                    <div class="card-body" >
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione un estado de la solicitud para la actualización</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formRequest.statusCodeUpdate" >
                                            <option value="REQUEST_QUEUED">En cola </option>
                                            <option value="REQUEST_IN_DEVELOPMENT">En desarrollo</option>
                                            <option value="REQUEST_FINISHED">Finalizada</option>
                                        </select>
                                    </div>
                        </div>
                    </div>



                </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>            
                  <button @click="updateStatusRequest()" type="button" class="btn btn-primary">Actualizar estado de solicitud</button>
                </div>

            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!-- Modal  -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Resolver solicitud</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Creando solicitante:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.fullname" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>
                    <div class="card-body" >
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado de la solicitud:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.statusCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Aprobar esta solicitud?:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formClose.approved"  @change="onChangeapproved()" >
                                            <option value="Y">Si, aprobar</option>
                                            <option value="N">No aprobar</option>
                                        </select>
                                    </div>
                        </div>
                    </div>
                    <div class="card-body" v-if="approved == true">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione el estado de la solicitud aprobada</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formClose.stateRequest" >
                                            <option value="REQUEST_QUEUED">En cola </option>
                                            <option value="REQUEST_IN_DEVELOPMENT">En desarrollo</option>
                                            <option value="REQUEST_FINISHED">Finalizada</option>
                                        </select>
                                    </div>
                        </div>
                    </div>



                </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="closeRequest()" type="button" class="btn btn-primary">Resolver solicitud</button>
                  
                </div>

            </div>
          </div>
        </div>
      <!-- Modal Fin -->




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
      name: "EvaluarSolicitudConstantiaContainer",
      components: {
      LoadingComponent,
      TableMaf,

     },
      data: () => ({

          isLoading: false,
          formRequest:{},
          formClose:{},
          requests:[],
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          typeRequest:[],
          stateRequest:[],
          school:[],
          approved:false,
         
      }),
     async  created () {
        var ctx = this;

          this.isLoading=true;
          await this.getSessionStorage();
          this.listRequests();
          this.setHeadTable();


          this.isLoading=false;

  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-not').modal('show');

        },
        
        async getSessionStorage(){                
                this.isLoading = true;

                 var ids = [] ;
                 var flagStateRequest = false;
                 var flagTypeRequest = false;
                 var flagSemester = false;

                if(!window.sessionStorage.semester){
                  ids.push(15);
                  flagSemester = true;
                }
                if(!window.sessionStorage.stateRequest){
                  ids.push(21);
                  flagStateRequest = true;
                }
                if(!window.sessionStorage.typeRequest){
                  ids.push(22);
                  flagTypeRequest = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección      
                if( ids.length > 0){

                //Hacer consulta única de masterValues 
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagSemester == true){
                       this.semester = _.filter(arrayMasters, function(master) {return master.idMaster == 15; }) 
                       window.sessionStorage.semester  = JSON.stringify(this.semester);  
                    }
                    if(flagStateRequest == true){
                       this.stateRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 21; }) 
                       window.sessionStorage.stateRequest  = JSON.stringify(this.stateRequest);  
                    } 
                    if(flagTypeRequest == true){
                       this.typeRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 22; }) 
                       window.sessionStorage.typeRequest  = JSON.stringify(this.typeRequest);  
                    } 
                }

                    this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                    this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                    this.semester =JSON.parse( window.sessionStorage.semester );
                this.isLoading = false;
        }, 


        async listRequests() {
            const response = await consultServices('listRequests','POST',{typeCode:'REQUEST_WEB_IMPROVEMENT'});   
            console.log("request actuales ",response);         
            this.setDataTable(response);
        },
         async closeRequest() {

           this.isLoading=true;
           var form={};
           var flag= confirm("¿Resolver esta solicitud?");
            if(flag==true){
                if(this.formClose.approved == 'Y'){
                form.approved= true;
                }else{
                form.approved= false;
                }
                form.id=this.formRequest.id;
                form.typeCode = 'REQUEST_WEB_IMPROVEMENT';                
                form.statusCode = this.formClose.stateRequest
                console.log("resultado",form);

                const response=  await consultServices('closeRequest','POST',form);
                if(response.message){
                this.formNot.tit="Solicitud resuelta "; this.formNot.not="Se ha resuelto la solicitud de manera exitosa"
                this.listRequests();
                this.fomrClose={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo resolver la solicitud de manera exitosa"
                }
                $('.modal').modal('hide');
                this.shownotificacion();
            }
            this.isLoading=false;


         },
         async updateStatusRequest(){
            this.isLoading=true;
            var form={};
            var flag= confirm("Actualizar estado de esta solicitud?");
                if(flag==true){
                    form.id=this.formRequest.id;
                    form.typeCode = 'REQUEST_WEB_IMPROVEMENT';                
                    form.statusCode =this.formRequest.statusCodeUpdate
                    console.log("resultado",form);

                    const response=  await consultServices('updateRequestStatus','POST',form);
                    if(response.message){
                    this.formNot.tit="Solicitud resuelta "; this.formNot.not="Se ha actualizado del estado de la solicitud de manera exitosa"                    
                    this.formRequest={};
                    }else{
                        this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo actualizar el estado la solicitud de manera exitosa"
                    }
                    $('.modal').modal('hide');
                    this.shownotificacion();
                    this.listRequests();
                }
                this.isLoading=false;

         },


         updateStatusRequestModal(item){
            
             console.log("data solicitud para actualizar",item);
             this.formRequest = {};
             

             var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
             var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
             var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

             this.formRequest.fullname = name.concat(" ", lastName," ", secondLastName);
             this.formRequest.typeCode= this.getDisplayValue(item.typeCode, 22);
             this.formRequest.statusCode=this.getDisplayValue(item.statusCode, 21);
             this.formRequest.id=item.id;

             console.log(" formReq para actualizar: ",this.formRequest);

         },      

         showCloseModal(item){
             console.log("data solicitud ",item);
             this.formClose.approved == '';
             this.formRequest = {};
             this.formRequest = _.cloneDeep(item);

             var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
             var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
             var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

             this.formRequest.fullname = name.concat(" ", lastName," ", secondLastName);

             this.formRequest.typeCode= this.getDisplayValue(item.typeCode, 22);
             this.formRequest.statusCode=this.getDisplayValue(item.statusCode, 21);
             this.formRequest.id=item.id;

             console.log(" formReq: ",this.formRequest);
         },

        onChangeapproved(){
            if(this.formClose.approved == 'Y'){
                this.approved = true;
            }
            if(this.formClose.approved == 'N'){
                 this.approved = false;
            }
        },


        setHeadTable(){
            this.colum = [
                {label:'Idea' ,name:'idea' ,find:1 ,sort:1},
                {label:'Autor' ,name:'author' ,find:1 ,sort:1},                               
                {label:'Estado de solicitud' ,name:'requestState' ,find:1 ,sort:1},               
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Solicitudes del semestre";
        },
        refreshData() {
               this.$refs.tableMaf.formatData(this.requests);
               console.log(" solicituds ahora: ",this.requests);
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
                    var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
                    var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
                    var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

                        request.idea = item.reason;
                        request.type= this.getDisplayValue(item.typeCode, 22)
                        request.requestState= 
                        <font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_QUEUED'?  <button  type="button" class="btn btn-secondary btn-xs">Mejora en cola </button>:null}
                            {item.statusCode == 'REQUEST_IN_DEVELOPMENT'?  <button  type="button" class="btn btn-primary btn-xs">Mejora en desarrollo </button>:null}
                            {item.statusCode == 'REQUEST_FINISHED'?  <button  type="button" class="btn btn-success btn-xs">Mejora implementada </button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud desaprobada</button> :null}
                        </font>
                        request.initialDate=item.initialDate;
                        request.endDate=item.endDate == null ? request.endDate = "Aún no finalizada" : item.endDate;
                        request.author=name.concat(" ", lastName," ", secondLastName);
                        request.actions = 
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_QUEUED' || item.statusCode == 'REQUEST_IN_DEVELOPMENT'  ? <button onClick={()=>ctx.updateStatusRequestModal(item)} data-target=".bs-example-modal-update" data-toggle="modal" type="button" class="btn btn-info btn-xs"> Actualizar estado</button>:null}                    
                            {item.statusCode == 'REQUEST_FINISHED'? " " :null}
                            {item.statusCode == 'REQUEST_PENDING'? <div>
                            <div>  <button onClick={()=>ctx.showCloseModal(item)} type="button" class="btn btn-primary btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Evaluar</button></div>
                           
                            
                              </div>:null}                 
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
