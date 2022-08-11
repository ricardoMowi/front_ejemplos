<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Colegio asignado: {{form.name}}</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">

                    <div class="card">

                        <div class="card-body">

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email del contacto:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="text" v-model="form.email" class="form-control col-md-7 col-xs-12" readonly='readonly'>
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Provincia:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="text" v-model="form.province" class="form-control col-md-7 col-xs-12" readonly='readonly'>
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="text" v-model="form.district" class="form-control col-md-7 col-xs-12" readonly='readonly'>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="text" v-model="form.address" class="form-control col-md-7 col-xs-12" readonly='readonly'>
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Lugar de parada del bus::</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                        <ul class="list-group">
                                            <li class="list-group-item col-md-7 col-xs-12" v-for="item in whereabouts">
                                                    {{item.name}}-{{item.reference}}
                                            </li>
                                        </ul>
                                </div>
                            </div>

                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Inicio de Crea+ en el colegio:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input  type="text" v-model="form.dateStart" class="form-control col-md-7 col-xs-12" readonly='readonly'>
                                </div>
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

    export default {
        name: "RegisterVolunteerContainer",
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading:false,
            form:{},
            id: window.INITIAL_STATE.id,
            semester:[],
            school:{},
            whereabouts:[],
             }),
        async created () {
            await this.getMasterValues();
            this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
            console.log("escualaaa: ",this.school)
            let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
            if(_idSchool){
                this.getData();
            }else if(!_idSchool){
                alert("El  creando  no cuenta con un colegio asignado")
            }          
        },

        methods: {
           async getMasterValues() {


                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }

                this.semester =JSON.parse( window.sessionStorage.semester );
            },
           async getData() {
               this.isLoading=true;
               const form = {
                   semesterCode:this.semester.id,
                   id:this.id,
               }
               var response = await consultServices('getSchool','POST',form);
               this.form=response;
               await this.setForm(response.AssignmentRecords[0].School)
               this.isLoading=false;
           },
           async setForm(form) {
               this.form.name = form.name;
               this.form.email = form.email;
               this.form.address = form.address;
               var consultProvince = await consultServices('getProvinceById','POST',{id:form.province});
               this.form.province = consultProvince.name;
               var consultDistrict = await consultServices('getDistrictById','POST',{id:form.district});
               this.form.district = consultDistrict.name;
               this.whereabouts = form.BusStops;
               this.form.dateStart = form.startDate;
           },
        }
    }
</script>
