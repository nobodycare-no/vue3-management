<template>
    <div class="layout-container">
        <Slider />
        <div class="right-container" :style="{marginLeft: menuStore.isCollapse ? '64px' : '210px'}">
            <Top />
            <router-view></router-view>
        </div>
        <Drawer />
    </div>

</template>

<script setup>

import Slider from '../components/slider/index.vue'
import Top from '../components/top/index.vue'
import Drawer from '../components/Drawer/index.vue'
import { useMenuStore } from '@/stores/menuStore'
import { onMounted } from 'vue'
import api from '@/api/index.js'
import { useLoginStore } from '@/stores/loginStore'
const menuStore = useMenuStore()
const loginStore = useLoginStore()

onMounted(() => {
    api.getRouter({ user: loginStore.permission }).then((res) => {
        menuStore.menus = res.data.menuData.menus
    })
})
</script>

<style scoped>
.right-container{
    transition: margin-left 0.3s ease-in;
}

</style>