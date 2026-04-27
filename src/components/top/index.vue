<template>
    <div class="container">
        <div class="top-toggle-menu">
            <el-icon :size="20" @click="openMenu" v-if="menuStore.isCollapse">
                <Expand />
            </el-icon>
            <el-icon :size="20" @click="closeMenu" v-else>
                <Fold />
            </el-icon>
        </div>
        <div class="top-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>当前</el-breadcrumb-item>
                <el-breadcrumb-item>{{ menuStore.breadcrumb }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="top-dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    语言切换
                    <el-icon class="el-icon--right" :size="16">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changeLang('zh')">中文</el-dropdown-item>
                        <el-dropdown-item @click="changeLang('en')">英文</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <div class="top-dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ loginStore.username }}
                    <el-icon class="el-icon--right" :size="16">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link to="/userCenter">个人中心</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'
import { useMenuStore } from '@/stores/menuStore'

const menuStore = useMenuStore()

const openMenu = () => {
    menuStore.isCollapse = false
}

const closeMenu = () => {
    menuStore.isCollapse = true
}

const router = useRouter()
const loginStore = useLoginStore()

const logoutHandler = () => {
    loginStore.token = ''
    loginStore.username = ''
    loginStore.permission = ''
    router.push('/login')
}

const changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    location.reload()
}

</script>

<style scoped>
.container {
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 16px;
}

.top-toggle-menu {
    flex-shrink: 0;
    margin-right: 16px;
}

.top-breadcrumb {
    flex: 1;
    min-width: 0;
    margin-left: 20px;
}

.top-dropdown {
    flex-shrink: 0;
    margin-left: auto;
}

/* 用 border 画整块矩形；浏览器 outline 容易在文字+图标内联排版时出现“缺口” */
.top-dropdown .el-dropdown-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    box-sizing: border-box;
    padding: 4px 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
}

.top-dropdown .el-dropdown-link:hover {
    border-color: var(--el-border-color);
}

.top-dropdown .el-dropdown-link:focus,
.top-dropdown .el-dropdown-link:focus-visible {
    outline: none;
    border-color: var(--el-border-color);
}

.top-dropdown :deep(.el-tooltip__trigger:focus),
.top-dropdown :deep(.el-tooltip__trigger:focus-visible) {
    outline: none;
}
</style>