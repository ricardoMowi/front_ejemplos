<template>
  <div>
    <input
    @focus="isFocus = true"
    @blur="onBlur()"
    v-on:input="onChange()"
    type="text"
    v-model="text"

    required="required"
    class="form-control col-md-12 col-xs-12"> 
    <i class="fa fa-search" aria-hidden="true"></i>

    <div class="searcherHorses-wrapper">
      <div class="searcherHorses-helper" v-if="isFocus" >

        <div @click="selectItem(item)" class="searcherHorses-item" v-for="item in items">
          {{item[displayNameKey]}}
        </div>
      </div>

    </div>

  </div>

</template>

<script>
    import consultServices from './../utilities/consultServices.js';

    export default {
        name: "searcherComponent",
        props: ['value','arrayData','displayNameKey','service', 'callBackData','AddNewValue'],
        data: () => ({
          items:[],
          isLoading:false,
          isFocus: false,
          text:'',
          selected:{},
          timeout:null,
        }),
        watch: {
          arrayData(newValue){
            this.items = _.cloneDeep(newValue);
          }
        },
        created () {
           this.getItem();
           this.items = _.cloneDeep(this.arrayData);
        },
        methods: {
          onChange(){
            var ctx = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function(){ctx.getItem();}, 600);
          },
          async getItem() {

            this.isLoading=true;
             var ctx=this;
             console.log("arreglo en getItem  "+   this.arrayData);
             console.log("consulta en getItem  "+   ctx.text);
             console.log("consulta en AddNewValue  "+   ctx.AddNewValue);


             this.items=_.filter(this.arrayData, function(o) {
                  return _.includes( _.lowerCase(o[ctx.displayNameKey]),  _.lowerCase(ctx.text)) 
             });

             console.log("ARRAY ", this.items.length)
             //Si se debe agregar un nuevo valor a la lista, la propiedad AddNewValue debe ser igual a Y
             //entonces el nuevo valor tendrá por defecto el id 999999 y el texto como name para poder ser seleccionado   
             if(ctx.AddNewValue == "Y" && this.items.length == 0){   
                this.items=[{
                  name: ctx.text,
                  id:999999
                }]

             }         


            this.isLoading=false;

          },

          onBlur(){
            var ctx = this;
            setTimeout(function(){ ctx.isFocus = false }, 600);
          },
          selectItem(item) {
            this.$emit('input', item);
            this.text = item[this.displayNameKey]
            if(this.callBackData != undefined)
            {
             this.callBackData();
           };
            //this.value = item;

            this.isFocus = false;
          },
          cleanText(){
             this.text = '';
          },
          setText(name){
             this.text = name;
          },
        }
    }
    //getHorses     @blur="isFocus = false"
</script>



<style scoped>
  .searcherHorses-helper {
      position: absolute;
      top: 100%;
      z-index: 10;
      background: white;
      border: 1px solid;
      width: calc(100% - 20px);
      max-height: 170px;
      overflow: auto;
  }
  .searcherHorses-item {
    padding: 3px;
    border-bottom: 1px solid;
    padding-left: 10px;
    cursor: pointer;
  }

  .searcherHorses-item:hover {
    background: #e2e8ee;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    padding-right: 5px;
    position: absolute;
    right: 13px;
    top: 10px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
