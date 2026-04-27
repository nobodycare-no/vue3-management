<template>
   <div id="chinaMap" class="chinaMap"></div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

onMounted(() => {
    proxy.$china('chinaMap').catch((e) => console.error(e))
})
</script>

<style scoped>
.chinaMap{
    width: 100%;
    height: 1000px;
    background-color: #fff;
    text-align: center;
}

</style>