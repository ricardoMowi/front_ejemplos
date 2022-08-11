<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
            <div class="card-header">Sílabus</div>

            <div class="card-body">
            <form class="form-horizontal" action="" method="post">

            <div class="card-body">
            <TableMaf :header="colum" :data="classes" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>
            </div>



            </form>
            </div>

     </div>

<!-- Modal -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Editar contenido</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">

                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Sobre la clase:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formEdit.class" class="form-control col-md-7 col-xs-12" readonly="readonly" >
                                    </div>
                        </div>
                    </div>

                    <div class="form-group row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Contenido:</label>
                        <div class="col-md-6">
                        <textarea class="form-control" id="textarea-input" name="textarea-input" v-model="formEdit.content" rows="6" placeholder="Content.."></textarea>
                        </div>
                    </div>
               </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="updateClass()" type="button" class="btn btn-success">Guardar cambios</button>
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
    import consultServices from './../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../components/loadingComponent.vue";
    import TableMaf from "./../components/TableMaf.vue";


  export default {
      name: "silabusContainer",
      components: {
      LoadingComponent,
      TableMaf,

     },
      data: () => ({

          isLoading: false,
          formEdit:{content:'', class:''},
          descriptionEventCode:[],
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          dates:[],
          semester:{},
          classes:[],



      }),
     async  created () {
        var ctx = this;

          this.isLoading=true;
          this.getSessionStorage();
          this.listSilabus();
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
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagSemester = false;
                 var flagEvents = false;

                if(!window.sessionStorage.semester){
                  ids.push(15);
                  flagSemester = true;
                }
                if(!window.sessionStorage.events){
                  ids.push(20);
                  flagEvents = true;
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
                    if(flagEvents == true){
                       this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.events);
                    }
                }

                    // //si los datos existen cargarlos en los arreglos definidos para la patalla

                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.events =JSON.parse( window.sessionStorage.events );
                    // //fin de la carga de arreglos para la pantalla

                this.isLoading = false;
        },



        async listSilabus() {

            const response = await consultServices('getAllClasses','POST',{});
            this.setDataTable(response);

       },
         async updateClass() {
           if(!this.formEdit.content ){
               alert("Debe completar el contendio de la clase");
           }
           else{

           this.isLoading=true;
           var form ={}
           var flag = confirm("¿Guardar cambios");
            if(flag == true){
                form.id = this.formEdit.id;
                form.classContent = this.formEdit.content;

                console.log("solicitud",form);

                 const response=  await consultServices('updateClass','POST',form);
                 if(response.id){
                     this.formNot.tit="Actualización correcta "; this.formNot.not="Se ha actualizado el contendio de la clase  de manera exitosa"

                     this.listSilabus();
                     this.formEdit={};
                 }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo actualizar el contendio de la clase de manera exitosa"
                 }
                 $('.modal').modal('hide');
                 this.shownotificacion();
            }
             this.isLoading=false;
           }

         },


         async removeRequest(item) {
                // console.log("item delete ", item)
                // var flag=confirm("¿Eliminar la solicitud seleccionada?");
                // if(flag == true){
                //         this.isLoading=true;
                //         var form={id:item.id}
                //         console.log(" eliminar ",form);
                //         const response0 = await consultServices('removeRequest','POST',form);
                //         this.listRequests();
                //         this.isLoading=false;

                // }
         },




        setHeadTable(){
            this.colum = [

                {label:'Semana' ,name:'week' ,find:1 ,sort:1},
                {label:'Contenido de desarrollo personal y social' ,name:'content' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Contenido";
        },
        refreshData() {
               this.$refs.tableMaf.formatData(this.classes);
               console.log("Clases actuales: ",this.classes);
        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 20){
                array= this.events
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
                this.classes = [];

                arrayData.forEach(item => {
                    var classItem = {};
                        classItem.week = this.getDisplayValue(item.descriptionCode,20);
                        classItem.content = item.classContent;
                        classItem.actions=<div class="d-flex justify-content-around">
                           <div> <button onClick={()=>ctx.showEdit(item)} type="button" class="btn btn-success btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Editar</button> </div>
                           </div>;


                    this.classes.push(classItem);
                });

                    this.refreshData();
        },
        showEdit(item){
          this.formEdit.content = item.classContent;
          this.formEdit.class = this.getDisplayValue(item.descriptionCode,20);
          this.formEdit.id = item.id;

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
