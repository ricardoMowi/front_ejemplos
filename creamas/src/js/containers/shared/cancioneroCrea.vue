<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
            <div class="card-header">
                <h2>Cancionero Crea+</h2><br/><br/>
            </div>
            <div class="card-body">
                <h2>Si quieres crear una canción para Crea+ aprovecha tus talleres para componerla</h2>
            </div>
            <div class="card">    
                <div class="card-header">
                    <h1>{{songTitle}}</h1>
                </div>
                <div class = "card-body" style="text-align: center">
                    <audio src='./music/nuestro_sueno.mp3' controls="controls">
                    </audio><br/>

                </div>
                <div style="text-align: center">
                    <h2>Letra</h2><br/>
                    Nuestros sueños son inspiraciones <br/>
                    y sabemos que se cumpliran<br/>
                    Queremos un mejor futuro,<br/>
                    un futuro ideal...(BIS)<br/>
                    <br/>
                    Y con esfuerzo lo lograremos<br/> 
                    y nuestros sueños alcanzaremos.<br/>
                    <br/>
                    Son inspiraciones,<br/>
                    nuestros corazones,<br/>
                    guardan sueños de verdad (BIS)<br/>
                    <br/>
                    Y con esfuerzo lo lograremos<br/> 
                    y nuestros sueños alcanzaremos.<br/>
                    <br/>
                    Son inspiraciones,<br/>
                    nuestros corazones,<br/>
                    guardan sueños de verdad (BIS)<br/><br/>
                </div>
                <div style="text-align: center">
                    <iframe width="420" height="315"
                        src="https://www.youtube.com/embed/4ApcflBVVfw?controls=0">
                    </iframe>
                </div>
            </div>
     </div>


    </div>
  </div>
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import { Datetime } from 'vue-datetime';
    import Media from '@dongido/vue-viaudio'
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";


  export default {
      name: "CancioneroCreaContainer",
      components: {
      LoadingComponent,     
      TableMaf,
      Datetime,
      Media,
   
     },
      data: () => ({

          isLoading: false,
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          songTitle:"",
        
      }),
     async  created () {
        var ctx = this;

          this.isLoading=true;
          await this.getData();
          this.isLoading=false;

  		},
      methods: {
          async getData() {
              this.songTitle = "Nuestros Sueños";
          }
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