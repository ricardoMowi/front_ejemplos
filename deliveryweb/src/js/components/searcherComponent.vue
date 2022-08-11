<template>
  <div>
    <input
    @focus="focusTrue()"
    @blur="onBlur()"
    v-on:input="onChange()"
    type="text"
    v-model="text"
    autocomplete="off"
    id="first-name"
    required="required"
    class="form-control col-md-12 col-xs-12">  <i class="fa fa-search" aria-hidden="true"></i>

    <div class="searcher_component-wrapper">
      <div class="searcher_component-helper" v-if="isFocus" v-on:mouseover="forceFocus()" v-on:mouseleave="closeList()" >

        <div @click="selectItem(item)" class="searcher_component-item" v-for="item in items">
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
        props: ['value','method','service','displayNameKey','countryCode'],
        data: () => ({
          items:[],
          isLoading:false,
          isFocus: false,
          text:'',
          selected:{},
          timeout:null,
        }),
        watch: {
          value(newValue){
            if(!newValue){
              this.text='';
              this.getItem(true);
            }else{
              if(this.text != newValue[this.displayNameKey]){
                this.getItem(true);
                this.selectItem(newValue);
              }
            }
          }
        },
        created () {
          this.getItem();
        },
        methods: {
          async getItem(clean) {
            this.isLoading=true;

            const response = await consultServices(this.service,'POST',{countryCode:this.countryCode});
            this.items = response;

            this.isLoading=false;
            //$('.modal').modal('hide');
          },
          onChange(){
            var ctx = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function(){ console.log('click'); ctx.getItem(); }, 600);
          },
          onBlur(){
            var ctx = this;
            setTimeout(function(){ console.log(ctx.forceFocusFlag);if(!ctx.forceFocusFlag){ctx.isFocus = false} }, 600);
          },
          forceFocus(){
            this.forceFocusFlag = true;
          },
          focusTrue(){
            this.isFocus = true;
            this.forceFocusFlag = false;
          },
          closeList(){
            this.forceFocusFlag = false;
            let el = this.$el.querySelector(':focus');
            if (el) el.blur();
            this.onBlur();
          },
          selectItem(item) {
            // this.selectedId = item.code
            // this.selectedName = item.prefix+' '+item.name
            this.$emit('input', item);
            this.text = item[this.displayNameKey]
            //this.value = item;
            if(this.method){
              this.method(item);
            }


            this.isFocus = false;
          }
        }
    }
    //getHorses     @blur="isFocus = false"
</script>



<style scoped>
  .searcher_component-helper {
      position: absolute;
      top: 100%;
      z-index: 10;
      background: white;
      border: 1px solid;
      width: calc(100% - 20px);
      max-height: 170px;
      overflow: auto;
  }
  .searcher_component-item {
    padding: 3px;
    border-bottom: 1px solid;
    padding-left: 10px;
    cursor: pointer;
  }

  .searcher_component-item:hover {
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
