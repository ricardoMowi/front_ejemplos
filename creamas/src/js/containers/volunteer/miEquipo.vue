<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Mi Colegio</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                    <div class="card">
                        <h2>{{courseName}}</h2>
                        <div class="clearfix"></div>
                    </div>

                    <div class="col-sm-6 col-md-4" v-for="item in items">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header">
                              <img v-if="item.img!=null" class="card-img-top" :src="item.img" >
                              <h5 class="card-title">{{item.name}}</h5>
                              <p class="card-text">{{item.description}}</p>
                            </div>
                            <div>
                              <ul class="list-unstyled">
                                <li>Email: {{item.email}} </li>
                                <li>Celular #: {{item.phone}} </li>
                                <li>Antiguedad: {{item.seniority}} </li>
                              </ul>
                            </div>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import TableMaf from "./../../components/TableMaf.vue";

    export default {
        name: "MiEquipoContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            colum:[],
            titleTable:'',
            myAssistance:[],
            id: window.INITIAL_STATE.id,
            seniorities:[],
            typesWorkshops:[],
            courseName:'',
            workShop:{},
            items:{},
            VolunteerJobs:{},
            haveWorkshop: true,
            idSchool: 0
       }),
        async created () {
          await this.getMasterValues();
          await this.getVolunteerJobs();
          if(this.VolunteerJobs[0].Job.id == '4'){
              this.haveWorkshop=false
              this.courseName= 'Líderes de colegio'
              const resp =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id});
              this.idSchool = resp.AssignmentRecords[0].School.id
              await this.getParticipants();
          }else{
             await this.getWorkShop(); 
          }          
          
        },

        methods: {
          async getMasterValues() {

                var ids = [];
                var flagSeniorities = false;
                var flagWorkshops = false;

                if(!window.sessionStorage.seniorities){
                  ids.push(7);
                  flagSeniorities = true;
                }
                if(!window.sessionStorage.typesWorkshops){
                  ids.push(13);
                  flagWorkshops = true;
                }

                if( ids.length > 0){
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagSeniorities == true){
                       this.seniorities = _.filter(arrayMasters, function(master) {return master.idMaster == 7; })
                       window.sessionStorage.seniorities  = JSON.stringify(this.seniorities);
                    }
                    if(flagWorkshops == true){
                       this.typesWorkshops = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
                       window.sessionStorage.typesWorkshops  = JSON.stringify(this.typesWorkshops);
                    }
                }

                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }

                this.seniorities =JSON.parse( window.sessionStorage.seniorities );
                this.typesWorkshops =JSON.parse( window.sessionStorage.typesWorkshops );
                this.semester =JSON.parse( window.sessionStorage.semester );
            },
          async getVolunteerJobs(){ 
              this.VolunteerJobs = await consultServices('getVolunteerJobs','POST',{id:this.id,semesterCode:this.semester.id});              
          },
          async getWorkShop(){
              this.isLoading = true;
              var form = {
                  id:this.id,
                  semesterCode: this.semester.id,
              }
              this.workShop = await consultServices('getWorkshop','POST',form);
              if(this.workShop) {
                  if(this.workShop.displayName != null) {
                      this.courseName = this.workShop.displayName;
                  } else {
                      var aux = _.find(this.typesWorkshops, (object) => { return object.code == this.workShop.contentCode});
                      this.courseName = "Taller de " + aux.displayValue;
                  }
                  await this.getParticipants();
              } 
              else {
                  alert("El  creando  no esta asignado a un taller");
              }
              this.isLoading = false;
          },
          async getParticipants() {
             this.isLoading = true;
             if(this.haveWorkshop == true ){
                var const0 = await consultServices('getParticipants','POST',{id:this.workShop.id});
                this.myTeam(const0.AssignmentRecords)
                this.isLoading = false;
             }
             else if(this.haveWorkshop == false){
                var response = await consultServices('getParticipantsSenior','POST',{id:this.idSchool, semesterCode:this.semester.id});
                
                if(response[0]){
                    this.myTeam(response[0].AssignmentRecords)
                }else{
                   alert('No existe aún un equipo asignado para este colegio')
                }
                
                this.isLoading = false;
             }

          },
          myTeam(team) {
              this.items=[];
              var num = 0;
              _.map(team,(participant)=>{
                  var volunteer = {};
                  var participantAux = participant.VolunteerJob.Volunteer;
                  var displaySeniority = participantAux.seniorityCode == 'VOLUNTEER_SENIOR' ? 'Creando Senior' : 'Creando Nuevo'
                  var jobAux =  participant.VolunteerJob.Job;
                  volunteer.name = participantAux.name + " " + (participantAux.lastName != null ? participantAux.lastName:"") + " " + (participantAux.secondLastName != null ? participantAux.secondLastName:"");
                  if(jobAux.code == 'SCHOOL_GUIDE') {
                    volunteer.description = jobAux.name;
                  } else {
                      volunteer.description = "Dupla " + (num + 1);
                      num++;
                  }
                  volunteer.phone = participantAux.phone;
                  volunteer.email = participantAux.email;
                  volunteer.seniority = displaySeniority;
                  if(participantAux.imageUrl != null) {
                    volunteer.img = participantAux.imageUrl;
                  } else {
                      volunteer.img = './user.png';
                  }
                  this.items.push(volunteer);
              })
          }
        }
    }
</script>
