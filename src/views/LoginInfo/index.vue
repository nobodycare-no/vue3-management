<template>
    <div class="container">
        <el-form class="user" :model="user" size="large">
            <h3 class="title">隧道后台管理系统</h3>
            <el-form-item class="form-item" prop="username">
                <el-input :prefix-icon="User" v-model="user.username" placeholder="请输入用户名" @keyup.enter="handleLogin"></el-input></el-form-item>
            <el-form-item class="form-item" prop="password">
                <el-input :prefix-icon="Lock" v-model="user.password" placeholder="请输入密码" @keyup.enter="handleLogin"></el-input></el-form-item>
            <el-button class="login-btn" type="primary" @click.native.prevent="handleLogin">登录</el-button>

        </el-form>


    </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../../api/index'
import { useLoginStore } from '../../stores/loginStore'
import {useRouter} from 'vue-router'
import {User, Lock} from '@element-plus/icons-vue'

const loginStore = useLoginStore()

const router = useRouter()

const user = reactive({
    username: '',
    password: ''
})

function handleLogin() {
    api.postLogin({username: user.username, password: user.password}).then(res => {
        console.log(res.data)
        if(res.data.status == 200){
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            router.push('/')
        }else{
            ElMessage.error(res.data.msg)
        }
    })
}



</script>

<style scoped>
.container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2d3a4b 0%, #1f2d3d 100%);
}


.user {
    width: 420px;
    max-width: 90%;
    padding: 36px 32px 28px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.title {
    text-align: center;
    padding-bottom: 18px;
    font-size: 26px;
    color: #1f2d3d;
    letter-spacing: 1px;
}

.form-item {
    margin-bottom: 18px;
}

.login-btn {
    width: 100%;
    height: 42px;
    border-radius: 8px;
    font-weight: 600;
}

.login-btn:hover {
    filter: brightness(1.05);
}
</style>