<template>
    <div class="map_menu-body" @click="updateValue">
        <div class="map_menu-body-img-wrapper">
            <img class="map_menu-body-img" :src="icon"/>
        </div>
        <span>{{displayName}}</span>
    </div>
</template>

<script>
    export default {
        name: "filterMapComponent",
        model: { prop: 'value', event: 'changeValueFilter' },
        props: ['value', 'nameFilter' , 'displayName','icon'],
        data: () => ({
            check: true
        }),
        methods: {
          updateValue() {
            console.log('ENTRA 1.');
            this.$emit('changeValueFilter', this.nameFilter);
          }
        }
    }
</script>



<style scoped>

</style>
