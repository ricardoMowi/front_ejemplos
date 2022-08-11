<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>{{categories.name}} </h2>
          <div class="clearfix"></div>
        </div>

        <div class="row">
        <div class="card" v-for="(group, groupindex) in categories.groups">
            <div class="card-header">
            <h2 v-if="group.horsesPerGroup > 0"> {{group.name}} ( {{group.horses.length}} / {{group.horsesPerGroup}} ) </h2>
            <h2 v-if="group.horsesPerGroup < 0"> {{group.name}} ( {{group.horses.length}} ) </h2>
            <div class="clearfix"></div>
            </div>

          <div class="col-sm-12">
            <table id="searcher-datatable-default" class="table table-striped projects" role="grid">
              <thead>
                <tr>
                  <th style="width: 30px;">Codigo</th>
                  <th style="width: 30px;">Nombre</th>
                  <th style="width: 30px;">Prefijo</th>
                  <th style="width: 30px;">Raza</th>
                  <th style="width: 68px;">Dueño</th>
                  <th style="width: 30px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(horse, index) in group.horses">
                  <td> {{horse.code}} </td>
                  <td> {{horse.name}} </td>
                  <td> {{horse.prefix}} </td>
                  <td> {{horse.fur}} </td>
                  <td> {{horse.ownerName}} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
         </div>
        </div>

        </div>
    </div>
</template>

<script>

  import consultServices from './../utilities/consultServices.js';
  import * as lang from "vuejs-datepicker/src/locale";
  import moment from 'moment';
  import _ from 'lodash';


  export default {
      name: "inscriptionContainer",
      components: {
      },
      data: () => ({
          categorieId: window.INITIAL_STATE.categorieId,
          isLoading: true,
          categories: {},
          horses: [],
          groups: [],
          formCat : '',
          language:lang['es'],
          horse: [],
          indexGroupSource: '',
          indexGroupDestiny: '',
          indexhorse:'',
          delType:'',
          longGroup:'',
          formGroupType:'',
          formGroup:'',
      }),
      created () {
        var ctx = this;
        this.getCategorie();



  		},

      methods: {
        async getCategorie() {
          this.isLoading=true;

          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.groups = this.categories.groups;
          this.horses = this.categories.horses;
          this.longGroup = this.categories.groups.length - 1;

          this.isLoading=false;
        },
        iniHorses(horse)
        {
          this.horses = horse;
        },
        showEditCat(formCat){
          this.formGroupType = "ADD";
          this.formCat = _.cloneDeep(formCat);
          console.log(this.formCat);
        },
        async updateCategories() {
          this.isLoading=true;

          var formCat = _.cloneDeep(this.formCat)
          const response0 = await consultServices('updateCategories','POST',formCat);
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.longGroup = this.categories.groups.length - 1;

          this.isLoading=false;
          $('.bs-example-modal-cat').modal('hide');
        },
        showEditHorse(indxHorse, indxGroupSource, Horse){

          console.log(indxHorse);
          console.log(indxGroupSource);
          this.indexhorse = indxHorse;
          this.indexGroupSource = indxGroupSource
          this.horse = _.cloneDeep(Horse);

        },
        showReset(){
          this.delType = "REF";
        },
        showEditGroup(indx, group){
          this.formGroupType = "EDIT";
          this.indexGroupSource = indx;
          this.formGroup = group;
        },
        showDel(indx){
          this.delType = "DEL";
          this.indexGroupSource = indx;

        },
        showCreateGroup(){
          this.formGroupType = "ADD";
          this.formGroup = {};
        },
        async createGroup(group){
          this.formGroupType = "ADD";

          this.isLoading=true;
          var addGroup = {
            name: group.name,
            horsesPerGroup: group.horsesPerGroup,
            horses: [],};
          this.categories.groups.push(addGroup);

          const response0 = await consultServices('updateCategories','POST',this.categories);
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.longGroup = this.categories.groups.length - 1;


          this.isLoading=false;
          $('.bs-example-modal-group').modal('hide');
       },
        async moveHorse(indxGroupDestiny){
          this.isLoading=true;

          this.indexGroupDestiny = indxGroupDestiny;

          console.log("Holis" , this.categories.groups[this.indexGroupDestiny]);

          this.categories.groups[this.indexGroupDestiny].horses.push(this.horse);
          this.categories.groups[this.indexGroupSource].horses.splice(this.indexhorse,1);
          //Falta consumir los servicios


          const response0 = await consultServices('updateCategories','POST',this.categories);
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.longGroup = this.categories.groups.length - 1;


          this.isLoading=false;
          $('.bs-example-modal-groupHorse').modal('hide');
        },
        async updateGroups(group){
          this.formGroupType = "ADD";
          this.isLoading=true;
          this.categories.groups[this.indexGroupSource].name = group.name ;
          this.categories.groups[this.indexGroupSource].horsesPerGroup = group.horsesPerGroup ;

          const response0 = await consultServices('updateCategories','POST',this.categories);
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.longGroup = this.categories.groups.length - 1;


          this.isLoading=false;
          $('.bs-example-modal-group').modal('hide');

        },
        async generateGroups(){
          this.isLoading=true;

          var formCat = _.cloneDeep(this.formCat)
          const response0 = await consultServices('generateGroupCategory','POST',{categorieId:this.categorieId});
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});
          this.categories = response;
          this.longGroup = this.categories.groups.length - 1;

          this.isLoading=false;
          $('.bs-example-modal-del').modal('hide');
        },
        async deleteGroup(){
          var ind = this.categories.groups.length - 1;
          var horse = {};

          for (let index = 0; index < this.categories.groups[this.indexGroupSource].horses.length; index++) {
            horse = this.categories.groups[this.indexGroupSource].horses[index];
            this.categories.groups[ind].horses.push(horse);
          }
          this.categories.groups.splice(this.indexGroupSource,1);
          this.longGroup = this.categories.groups.length - 1;

          const response0 = await consultServices('updateCategories','POST',this.categories);
          const response = await consultServices('getCategorie','POST',{categorieId:this.categorieId});

          this.isLoading=false;
          $('.bs-example-modal-del').modal('hide');
        },
      }
  }
</script>


<style scoped>
    /*
     * Some styles so that our first component
     * looks somewhat special
    */
</style>
