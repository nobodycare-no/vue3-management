<template>
    <div class="container" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
        <div class="logo" v-if="logoStore.logoStore">
            <span v-if="!menuStore.isCollapse" class="logo-text">隧道工程项目管理系统</span>
            <span v-else class="logo-text logo-text--mini" title="隧道工程项目管理系统">隧</span>
        </div>
        <el-menu router background-color="#304156" text-color="#fff" active-text-color="#ffd04b"
            :default-active="active" class="el-menu-vertical" :collapse="menuStore.isCollapse">
            <template v-for="(item, index) in menuStore.menus" :key="index">
                <el-sub-menu v-if="item.children" :index="item.path">
                    <template #title>
                        <el-icon :size="18">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(childItem, childIndex) in item.children" :key="childIndex"
                        :index="childItem.path">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <el-icon :size="18">
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useLogoStore } from '@/stores/logoStore'
const menuStore = useMenuStore()
const logoStore = useLogoStore()
const active = menuStore.active
</script>

<style scoped>
.container {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #304156;
    transition: width 0.3s ease-in;
    overflow: hidden;
}

.logo {
    width: 100%;
    height: 60px;
    background-color: #364e6d;
    text-align: center;
    font-size: 15px;
    color: #fff;
    line-height: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-shrink: 0;
}

.logo-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}

.logo-text--mini {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0;
}
</style>