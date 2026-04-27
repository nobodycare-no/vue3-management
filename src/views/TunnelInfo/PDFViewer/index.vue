<template>
    <iframe :src="pdfUrl" frameborder="0" width="100%" height="100%"></iframe>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import api from '@/api/index.js'


const pdfUrl = ref('')
const route = useRoute()

onMounted(() => {
    api.getPDFView({id:route.params.id}).then(res => {
        console.log(res.data.result[0].url)
        pdfUrl.value = 'http://localhost:3000/' + res.data.result[0].url
    })
})
</script>