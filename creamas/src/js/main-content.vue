
<template>
    <div class="main-content">
        <h1>  Container :3 </h1>
        <h3> {{ webpack }} </h3>
        <ElementoComponent></ElementoComponent>
        <ElementoComponent></ElementoComponent>
        <ElementoComponent></ElementoComponent>
        <ElementoComponent></ElementoComponent>
        <ElementoComponent></ElementoComponent>
        <a @click="handleClick">Click me!</a>
    </div>
</template>

<script>
    import consultServices from './utilities/consultServices.js';
    import ElementoComponent from "./components/elementoComponent.vue"
    export default {
        name: "main-content",
        components: {
          ElementoComponent
        },
        data: () => ({
            webpack: 'Powered by mowidev!',
        }),
        methods: {
          handleClick: async () => {
            alert('test1');
            await consultServices('horse/listHorses?filter=1&query=&resultsPerPage=10&pageNumber=1');
            alert('test2');
          }
        }
    }
</script>

<style scoped>
    /*
     * Some styles so that our first component
     * looks somewhat special
    */
    .main-content {
        margin: 0 auto;
        font-family: sans-serif;
        background-color: #ccf7e2;
        padding: 10px;
        border-radius: 5px;
        max-width: 500px;
    }
</style>
