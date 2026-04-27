<template>
    <div class="user-manage">
        <el-input v-model="searchInfo" placeholder="请输入要搜索的用户信息" class="input" @keyup.enter="searchHandler"></el-input>
        <el-button @click="searchHandler" type="primary" class="button">搜索</el-button>
        <el-button @click="addHandler" type="primary" class="button">添加</el-button>
    </div>
    <el-table :data="userInfo.list">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="权限">
            <template #default="scope">
                <div>{{ scope.row.permission == 'admin' ? '管理员' : '普通用户' }}</div>
            </template>
        </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="操作" prop="operation">
            <template #default="scope">
                <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogAddVisible" title="添加用户" width="35%" center destroy-on-close>

        <el-form :model="userForm">
            <el-form-item label="用户名称">
                <el-input v-model="userForm.username" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="userForm.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-radio-group v-model="userForm.permission">
                    <el-radio value="admin" @click="permissionHandler('admin')">管理员</el-radio>
                    <el-radio value="vip" @click="permissionHandler('vip')">普通用户</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用户电话">
                <el-input v-model="userForm.phone" placeholder="请输入用户电话"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmHandler">确定</el-button>
        </template>

    </el-dialog>

    <el-dialog v-model="dialogUpdateVisible" title="修改用户信息" width="35%" center destroy-on-close>

        <el-form :model="userUpdateForm">
            <el-form-item label="用户名称">
                <h3>{{ userUpdateForm.username }}</h3>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="userUpdateForm.password"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-radio-group v-model="userUpdateForm.permission">
                    <el-radio value="admin" @click="permissionUpdateHandler('admin')">管理员</el-radio>
                    <el-radio value="vip" @click="permissionUpdateHandler('vip')">普通用户</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用户电话">
                <el-input v-model="userUpdateForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogUpdateVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmUpdateHandler">确定</el-button>
        </template>

    </el-dialog>
</template>

<script setup>

import { onMounted, reactive, ref } from 'vue'
import api from '@/api/index.js'

const userInfo = reactive({
    list: []
})

const searchInfo = ref('')

const dialogAddVisible = ref(false)
const dialogUpdateVisible = ref(false)
const editorID = ref(0)

const userForm = reactive({
    username: '',
    password: '',
    permission: 'vip',
    phone: ''
})

const userUpdateForm = reactive({
    username: '',
    password: '',
    permission: 'vip',
    phone: ''
})

onMounted(() => {
    http()

})

const http = () => {
    api.getUserInfo().then(res => {
        if (res.data.status == 200) {
            userInfo.list = res.data.result
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

const searchHandler = () => {
    api.getUserSearch({ search: searchInfo.value }).then(res => {
        if (res.data.status == 200) {
            userInfo.list = res.data.result
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

const addHandler = () => {
    dialogAddVisible.value = true
}

const confirmHandler = () => {
    api.getAddUser({
        username: userForm.username,
        password: userForm.password,
        permission: userForm.permission,
        phone: userForm.phone
    }).then(res => {
        if (res.data.status == 200) {
            ElMessage.success(res.data.msg)
            http()
            dialogAddVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

const permissionHandler = (data) => {
    userForm.permission = data
}

const permissionUpdateHandler = (data) => {
    userUpdateForm.permission = data
}

const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '是否确定删除该用户？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            api.getDelUser({ id: row.id }).then(res => {
                if (res.data.status == 200) {
                    http()
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                } else {
                    ElMessage.error(res.data.msg)
                }
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

const handleEdit = (index, row) => {
    if (row.id == 1) return;
    editorID.value = row.id
    dialogUpdateVisible.value = true
    api.getUserPreview({ id: row.id }).then(res => {
        if (res.data.status == 200) {
            userUpdateForm.username = res.data.result[0].username
            userUpdateForm.password = res.data.result[0].password
            userUpdateForm.permission = res.data.result[0].permission
            userUpdateForm.phone = res.data.result[0].phone
        } else{
            ElMessage.error(res.data.msg)
            dialogUpdateVisible.value = false
        }
    })
}

const confirmUpdateHandler = () => {
    api.getUpdateUser({
        id: editorID.value,
        password: userUpdateForm.password,
        permission: userUpdateForm.permission,
        phone: userUpdateForm.phone
    }).then(res => {
        if (res.data.status == 200) {
            http()
            dialogUpdateVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

</script>

<style scoped>
.user-manage {
    margin: 20px 16px;
}

.input {
    width: 300px;
}

.button {
    margin-left: 10px;
}
</style>