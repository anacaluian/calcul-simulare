<template>
    <v-chip class="yourNumber" text-color="#EDF1FF" :color="color" :pill="true">{{value}}</v-chip>
</template>

<script>
export default {
    props:['color','value']
}
</script>

<style scoped>
    .yourNumber{
        margin: 10px;
    }
</style>