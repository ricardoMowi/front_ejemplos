<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
            <div class="card-header">
                <h2>Sílabo del taller de "{{workShop}}" - Ciclo {{semesterCode}}</h2><br/><br/>
                <small>Una vez completo, lo debes validar con tu Creando guía</small>
            </div>
            <div class="card-body" >
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre creativo:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input class="form-control" v-model="formWorkshop.displayName" type="text" name="textarea-input"  rows="6" placeholder="Nombre creativo" readonly='readonly'/>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                      <label>Este es el nombre para la matrícula</label>
                    </div>  
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Url del video:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input class="form-control" v-model="formWorkshop.url" type="text" name="textarea-input"  rows="6" placeholder="Nombre creativo" readonly='readonly'/>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                      <label>Esta es la url del video del proyecto</label>
                    </div>
                </div>
                <div class="form-group">                    
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Objetivo del taller:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <textarea class="form-control"  v-model="formWorkshop.description" name="textarea-input"  rows="6" placeholder="Objetivo del taller" readonly='readonly'></textarea>
                    </div>                   
                    <div class="col-md-3 col-sm-6 col-xs-12">
                    <p>Plantea ¿qués es lo que se desea lograr en los niños?<br/>
                    Te recomendamos incluir:<br/>
                    -Características de la disciplina/talento que vayas a desarrollar.<br/>
                    -Acompañar de aspectos actitudiales</p>
                    </div>
                </div>      
                <div style="text-align:right;">
                        <button @click="showEditWorkShop()" type="button" class="btn btn-warning btn-xs" data-target=".bs-example-modal-ws" data-toggle="modal">Editar </button>
                </div>
                <h2 v-if="isLoading2==true" style="color:blue">... Actualizando</h2>

                <TableMaf :header="colum" :data="classesAndWorkshop" :tableTitle="titleTable" ref="tableMaf">
                </TableMaf>
           
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

                        <inputMaf type='text' v-model="formEdit.displayName" :valueInput="formEdit.displayName"  label="Nombre creativo:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputDisplayName" >
                        </inputMaf>

                    </div>

                    <div class="card-body">

                        <inputMaf type='text' v-model="formEdit.url" :valueInput="formEdit.url"  label="Url del video:" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputUrl" >
                        </inputMaf>

                    </div>

                    <div class="card-body">

                      <inputMaf type='text' v-model="formEdit.description" :valueInput="formEdit.description" textArea="textArea" label="Objetivo del taller:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="textAreaDescription" >
                      </inputMaf>


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
          formEdit:{displayName:'', description:'', url:''},
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

      }),
     async  created () {
        var ctx = this;
          this.isLoading=true;
          console.log('adm:::::::', this.adm)
          console.log('idWorkshop:::::::', this.idWorkshop)

          await this.getSessionStorage();
          await this.listAllClasses();
          if(this.adm == false){
            console.log('entró a false:::::::')
            await this.getWorkShop();
          }
          
          if(this.idWorkshop!="") {
            console.log('entró a !=:::::::')
            await this.listSilabus();
          }
          await this.setHeadTable();

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
        joinClassWithWorkshop(classes,workshopContents) {
         console.log("entró a joinClassWithWorkshop")
         console.log("classes",classes)
         console.log("workshopContents",workshopContents)
          var classesAndWorkShopAux=[];
          // _.map((classes),(itemClass) => {
          //     var classAndWorkShop = {};
          //         classAndWorkShop.personalSocialDevelopmentContent = itemClass.classContent;
          //         classAndWorkShop.contentUrl = itemClass.contentUrl;
          //         classAndWorkShop.descriptionCode = itemClass.descriptionCode;
                  
          //     _.map(workshopContents, (workshopContent)=>{
          //       //classAndWorkShop.idWork=workshopContent.id
          //       classAndWorkShop.idWorkshopContent = workshopContent.id
          //         if(itemClass.descriptionCode == workshopContent.contentType) {
          //           classAndWorkShop.cognitiveContent = workshopContent.content;
          //           classAndWorkShop.operationalRequirements = workshopContent.operationalRequirements;
          //           classAndWorkShop.goalOfTheDay = workshopContent.goalOfTheDay;
          //           classAndWorkShop.initialAssembly = workshopContent.initialAssembly;
          //           classAndWorkShop.finalAssembly = workshopContent.finalAssembly;                    
          //         }
          //     })
          //     classesAndWorkShopAux.push(classAndWorkShop);
          //  })
           var arrayFinal=[]
           for (let i = 0; i < classes.length; i++) {
              for (let j = 0; j < workshopContents.length; j++) {
                if(classes[i].descriptionCode == workshopContents[j].contentType){
                  var json={}
                  json.personalSocialDevelopmentContent = classes[i].classContent
                  json.contentUrl = classes[i].contentUrl
                  json.descriptionCode = classes[i].descriptionCode
                  json.idWorkshopContent = workshopContents[j].id                 
                  json.cognitiveContent = workshopContents[j].content
                  json.operationalRequirements = workshopContents[j].operationalRequirements
                  json.goalOfTheDay = workshopContents[j].goalOfTheDay
                  json.initialAssembly = workshopContents[j].initialAssembly
                  json.finalAssembly = workshopContents[j].finalAssembly
                  arrayFinal.push(json)
                }                
              }             
           }
           classesAndWorkShopAux=arrayFinal
           console.log("resultado de joinClassWithWorkshop",classesAndWorkShopAux) 
           return classesAndWorkShopAux;
        },
        async listSilabus() {
          console.log('entró a listSilabus')
            this.isLoading = true;
            this.formWorkshop = {};
            const response0 = await consultServices('getWorkshopContent','POST',{id:this.idWorkshop});
            this.workShop = response0.displayName; //// --- cambiar
            this.formWorkshop.displayName = response0.displayName;/// -- cambiar
            this.formWorkshop.url = response0.url ? response0.url: '';
            this.formWorkshop.description = response0.description;/// -- cambiar
            this.formWorkshop.id = response0.id; /// idWorkshop
           response0.WorkshopContents.sort(((a, b) => a.id - b.id));
           console.log('entró a listSilabus',response0.WorkshopContents) 

            var dataForTable = await this.joinClassWithWorkshop(this.listClasses,response0.WorkshopContents);
            await this.setDataTable(dataForTable);
            this.isLoading = false;

       },
       async listAllClasses() {
          this.isLoading = true;
          //Brinda Contenido de desarrollo personal y social          
          this.listClasses = await consultServices('getAllClasses','POST',{});
          this.listClasses.sort(((a, b) => a.id - b.id));

          console.log('1:::::',this.listClasses)
          this.isLoading = false;
       },
       async getWorkShop() {
          this.isLoading = true;
          const response1 = await consultServices('getWorkshop', 'POST', {id: this.idVolunteer,semesterCode:this.semesterCode});
          if(response1){
            this.idWorkshop = response1.id;//2 -- cambiar;
          }else{
          
          alert('El creando no tiene talleres asignados ')
          }

          this.isLoading = false;
       },
        async updateWorkShop() {
          this.isLoading = true;

          if (this.formEdit.displayName == "" || this.formEdit.description == "" || this.formEdit.displayName == null || this.formEdit.description == null) {
            this.formNot.tit="Mensaje de actualización";
            $('.modal').modal('hide');
            this.formNot.not = "Error al actualizar debe llenar los campos";
            this.shownotificacion();
          } else {
            const response = await consultServices('updateWorkshop','POST',this.formEdit);
            this.formNot.tit="Mensaje de actualización"
            this.formNot.not = response.message
            $('.modal').modal('hide');
            this.shownotificacion();
            await this.listSilabus();
          }
          this.isLoading = false;
        },
        async updateWorkShopContent(item,idTextArea,type) {
          this.isLoading2 = true;

          if(item.idWorkshopContent){
          var aux = document.getElementById(idTextArea).value;
          var form = {};
          if (type == 'cognitive') {
            form.idWorkshop = item.idWorkshopContent;
            form.content = aux;
            form.operationalRequirements = item.operationalRequirements;
            form.goalOfTheDay = item.goalOfTheDay;
            form.initialAssembly= item.initialAssembly;
            form.finalAssembly = item.finalAssembly;
          }
          if (type == 'requirements') {
            form.idWorkshop = item.idWorkshopContent,
            form.content = item.cognitiveContent,
            form.operationalRequirements = aux,
            form.goalOfTheDay = item.goalOfTheDay,
            form.initialAssembly= item.initialAssembly,
            form.finalAssembly = item.finalAssembly;
          }
          if (type == 'goalOfTheDay') {
            form.idWorkshop = item.idWorkshopContent,
            form.content = item.cognitiveContent,
            form.operationalRequirements = item.operationalRequirements,
            form.goalOfTheDay = aux,
            form.initialAssembly= item.initialAssembly,
            form.finalAssembly = item.finalAssembly;
          }
          if (type == 'initialAssembly') {
            form.idWorkshop = item.idWorkshopContent,
            form.content = item.cognitiveContent,
            form.operationalRequirements = item.operationalRequirements,
            form.goalOfTheDay = item.goalOfTheDay,
            form.initialAssembly= aux,
            form.finalAssembly = item.finalAssembly
          }
          if (type == 'finalAssembly') {
            form.idWorkshop = item.idWorkshopContent,
            form.content = item.cognitiveContent,
            form.operationalRequirements = item.operationalRequirements,
            form.goalOfTheDay = item.goalOfTheDay
            form.initialAssembly= item.initialAssembly
            form.finalAssembly = aux;
          }
          const response = await consultServices('updateWorkshopContent','POST',form);
          }
          else{
            alert("No existe esta clase ")

          }
          var response0 = await consultServices('getWorkshopContent','POST',{id:this.idWorkshop});
          //parseInt( a.id, 10);
          response0.WorkshopContents.sort(((a, b) => parseInt( a.id, 10) - parseInt( b.id, 10)));
          //response0.WorkshopContents.sort(((a, b) => a.id - b.id));
          const dataForTable = await this.joinClassWithWorkshop(this.listClasses,response0.WorkshopContents);
          await this.setDataTable(dataForTable);
          this.isLoading2 = false;
        },
        setHeadTable(){
            this.colum = [

                {label:'En aulas' ,name:'week' ,find:1 ,sort:1},               
                {label:'Tema sociopersonal' ,name:'personalSocialDevelopmentContent' ,find:1 ,sort:1},
                {label:'Objetivo del día' ,name:'goalOfTheDay' ,find:1 ,sort:1},
                {label:'Asamblea inicial' ,name:'initialAssembly' ,find:0 ,sort:0},
                {label:'Desarrollo del taller' ,name:'cognitiveContent' ,find:1 ,sort:1},
                {label:'Asamblea final' ,name:'finalAssembly' ,find:0 ,sort:0},
                {label:'Materiales' ,name:'operationalRequirements' ,find:0 ,sort:0}];
                
            this.titleTable = "Contenido";
        },
        refreshData() {
               this.$refs.tableMaf.formatData(this.classesAndWorkshop);
        },
        setDataTable(arrayData){
          var ctx = this;
          this.classesAndWorkshop = [];
          var nWeek = 0;
          arrayData.forEach(item => {
            var classItem = {};
            var eventAux = {} ;
              eventAux = _.find(this.events, (event) =>{
              return event.code == item.descriptionCode;
            });
            classItem.week = eventAux.displayValue;
            classItem.contentUrl = item.contentUrl;
            var idTextArea1 = "textAreaCognitive"+nWeek;
            var idTextArea2 = "textAreaOperation"+nWeek;
            var idTextArea3 = "textAreaGoal"+nWeek;
            var idTextArea4 = "textAreaInitial"+nWeek;
            var idTextArea5 = "textAreaFinal"+nWeek;
            classItem.cognitiveContent = <div><textarea onChange={()=>ctx.updateWorkShopContent(item,idTextArea1,'cognitive')} id={idTextArea1} type="text" cols="60" rows="5" value={item.cognitiveContent} placeholder="¿Qué es lo que voy a hacer y cómo lo voy a hacer?" class="form-control col-md-7 col-xs-12"></textarea></div>;
            classItem.goalOfTheDay = <div><textarea onChange={()=>ctx.updateWorkShopContent(item,idTextArea3,'goalOfTheDay')} id={idTextArea3} type="text" cols="60" rows="5" value={item.goalOfTheDay} placeholder="¿Qué quiero lograr este día?" class="form-control col-md-7 col-xs-12"></textarea></div>;
            classItem.initialAssembly = <div><textarea onChange={()=>ctx.updateWorkShopContent(item,idTextArea4,'initialAssembly')} id={idTextArea4} type="text" cols="60" rows="5" value={item.initialAssembly} placeholder="¿Cómo puedo lograr que mi alumno pueda interiorizar el valor de esta semana?" class="form-control col-md-7 col-xs-12"></textarea></div>;
            classItem.finalAssembly = <div><textarea onChange={()=>ctx.updateWorkShopContent(item,idTextArea5,'finalAssembly')} id={idTextArea5} type="text" cols="60" rows="5" value={item.finalAssembly} placeholder="¿Cómo puedo verificar si interiorizaron la clase de hoy?" class="form-control col-md-7 col-xs-12"></textarea></div>;
            if(item.contentUrl != null ) {
              classItem.operationalRequirements = <div> <a href={item.contentUrl} class="btn btn-danger btn-xs" style="color:#FFFFFF" target="_newtab"><i class="cui-file"></i> Descargar</a> </div>
            } else {
              classItem.operationalRequirements = <div><textarea onChange={()=>ctx.updateWorkShopContent(item,idTextArea2,'requirements')} id={idTextArea2}   cols="60" rows="5" type="text" value={item.operationalRequirements} placeholder="¿Qué necesito?" class="form-control col-md-7 col-xs-12"></textarea></div>;
            }
            classItem.personalSocialDevelopmentContent = <div><textarea type="text" value={item.personalSocialDevelopmentContent} class="form-control col-md-7 col-xs-12"  cols="60" rows="5" readonly></textarea></div>;

            this.classesAndWorkshop.push(classItem);
            nWeek++;
          });
          //carros.sort(((a, b) => a.modelo - b.modelo));

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


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-nrix{text-align:center;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
