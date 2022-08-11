<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
            <div class="card-header">
                <h2>Detalle del taller "{{formWorkshop.displayName}}" - Ciclo {{semesterCode}}</h2><br/><br/>
            </div>
            <div class="card-body" style="background-color: #ffffff;"  >
                  <div class="card-body">
                        <div class="row">
                          <label class="control-label col-md-2 col-sm-3 col-xs-12">Nombre creativo:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12" >
                                <input class="form-control" v-model="formWorkshop.displayName" type="text" name="textarea-input"  rows="6" placeholder="Nombre creativo" readonly='readonly'/>     
                          </div>
                        </div>
                  </div>        
                  <div class="card-body">
                        <div class="row">
                          <label class="control-label col-md-2 col-sm-3 col-xs-12">Descripción del taller:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12" >
                                <textarea class="form-control"  v-model="formWorkshop.description" name="textarea-input"  rows="6" placeholder="Objetivo del taller" readonly='readonly'></textarea>    
                          </div>
                          <div class="col-md-3 col-sm-3 col-xs-12">
                            <p>Plantea ¿qués es lo que se desea lograr en los niños?<br/>
                            Te recomendamos incluir:<br/>
                            -Características de la disciplina/talento que vayas a desarrollar.<br/>
                            -Acompañar de aspectos actitudiales</p>
                          </div>                         
                        </div>
                  </div>  
            </div>

            <div class="card-footer" style="background-color: #ffffff;"  >
                    <div style="text-align:right;">
                        <button @click="showEditWorkShop()" type="button" class="btn btn-warning btn-xs" data-target=".bs-example-modal-ws" data-toggle="modal">Editar</button>
                    </div>              
            </div>    
            
   
            <div class="card-body">
            <h2 v-if="isLoading2==true" style="color:blue">... Actualizando</h2>
            <form class="form-horizontal" action="" method="post">
            </form>
            </div>

     </div>

      <!-- Modal editar taller -->
        <div class="modal fade bs-example-modal-ws" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Editar Taller</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>

                <div class="modal-body">
                        <div class="card-body">
                            <div class="card">
                                    <div class="card-header">
                                        <h4>Información general del taller</h4>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card-body">
                                      <div class="card-body">
                                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del taller:</label> 
                                          <div class="col-md-6 col-sm-6 col-xs-12">
                                            <textarea class="form-control"  v-model="formEdit.description" name="textarea-input"  rows="6" placeholder="Objetivo del taller" ></textarea>
                                          </div>
                                      </div>                                                        
                                    </div>                                       
                              </div>
                              <div class="card">
                                    <div class="card-header">
                                        <h4>Contenido del taller</h4>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-body">
                                              <div  class="table-responsive" >
                                                <table class="table table-striped projects"  >
                                                  <thead>
                                                    <tr>
                                                      
                                                      <th scope="col" >Lista de temas ya desarrollados</th>
                                                      
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr v-for="item in workshops">
                                                      <td>{{item.displayName}}</td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                        </div>

                                        <div class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Escribe el tema que desarrollarás:</label> 
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                              <input class="form-control"  v-model="formEdit.displayName" name="textarea-input" placeholder="Objetivo del taller" >
                                            </div>
                                        </div>
                                        
                                        <div class="card-body">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Link del video:</label> 
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                               <input class="form-control"  v-model="formEdit.url" name="textarea-input"  >
                                            </div>
                                        </div>
                                    </div>
                              </div>
                        </div>         
                </div>
                
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-ws" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="updateWorkShop()" type="button" class="btn btn-success">Guardar cambios</button>
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
    import inputMaf from "./../../components/inputMaf.vue";


  export default {
      name: "silabusContainer",
      components: {
      LoadingComponent,
      TableMaf,
      inputMaf,

     },
      data: () => ({
          isLoading2: false,
          isLoading: false,
          formEdit:{displayName:'', description:''},
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          dates:[],
          semester:[],
          events:[],
          semesterCode:'',
          classesAndWorkshop:[],
          listClasses:[],
          idWorkshop:"",
          idVolunteer: window.INITIAL_STATE.id,
          idWorkshop:window.INITIAL_STATE.idWorkshop,
          adm:window.INITIAL_STATE.adm,
          formWorkshop:{},
          workShop:"",
          form: {},
          workshops:[{displayName:'test 1'}]

      }),
     async  created () {
        var ctx = this;
          this.isLoading=true;
          console.log('adm:::::::', this.adm)
          console.log('idWorkshop:::::::', this.idWorkshop)

          await this.getSessionStorage();
          await this.getWorkShop();
          // if(this.adm == false){
          //   console.log('entró a false:::::::')
            
          // }
          
          // if(this.idWorkshop!="") {
            //obtener taller
            //preprar json para listar talleres
            var form={}
            form.typeCode = 'WORKSHOP_CUSTOM'
            form.contentCode = 'WORKSHOP_MUSIC_PERCUSSION' 
            form.categoryCode =  'WORKSHOP_ARTISTIC'
            form.semesterCode = '202001' // this.semesterCode
            //poblar la lista 
            console.log('ESTE ES EL FORM:::::::::::::',form )
            const response =  await consultServices('getWorkshopsVirtual','POST', form);
            if(response.status == 200){
              this.workshops = response.workshops
            }
            
          // }else{
          //}

          this.isLoading=false;

      },
      methods: {
        async getSessionStorage(){
                this.isLoading = true;

                 var ids = [] ;
                 var flagSemester = false;
                 var flagEvent = false;

                if(!window.sessionStorage.semester){
                  ids.push(15);
                  flagSemester = true;
                }
                if(!window.sessionStorage.events){
                  ids.push(20);
                  flagEvent = true;
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(!window.sessionStorage.semester){
                      const response =  await consultServices('getCurrentSemester','POST', {});
                      this.semester = response;
                      window.sessionStorage.semester  = JSON.stringify(this.semester);
                    }
                    if(flagEvent == true){
                       this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.events);
                    }
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                this.semester =JSON.parse( window.sessionStorage.semester );
                this.events =JSON.parse( window.sessionStorage.events );

             // //fin de la carga de arreglos para la pantalla
             this.semesterCode = this.semester.id;

                this.isLoading = false;
            },
        async shownotificacion() {
            $('.bs-example-modal-not').modal('show');

        },
        showEditWorkShop() {
           this.formEdit = _.cloneDeep(this.formWorkshop);
        },


        async getWorkShop() {
            this.isLoading = true;
            const response1 = await consultServices('getWorkshop', 'POST', {id: this.idVolunteer,semesterCode:this.semesterCode});
            if(response1){
              this.idWorkshop = response1.id;
              //poblar los datos en la pantalla
              this.formWorkshop.displayName = response1.displayName
              this.formWorkshop.description = response1.description
              //poblar los datos para el modal 
              this.formEdit.displayName = response1.displayName
              this.formEdit.description = response1.description
              console.log("show response ", response1)
              this.formEdit.url = response1.url
            }else{            
            alert('El creando no tiene talleres asignados ')
            }
            this.isLoading = false;
        },
        async updateWorkShop() {
          this.isLoading = true;

          if (this.formEdit.displayName == "" || this.formEdit.description == "" || this.formEdit.displayName == null || this.formEdit.description == null
          || this.formEdit.url == "" || this.formEdit.url == null ) {
              this.formNot.tit="Mensaje de actualización";
              $('.modal').modal('hide');
              this.formNot.not = "Error al actualizar debe llenar los campos";
              this.shownotificacion();
          } 
          else {
              this.formEdit.id = this.idWorkshop
              const response = await consultServices('updateWorkshop','POST',this.formEdit);
              this.formNot.tit="Mensaje de actualización"
              this.formNot.not = response.message
              $('.modal').modal('hide');
              this.shownotificacion();
          }
          this.isLoading = false;
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


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-nrix{text-align:center;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
