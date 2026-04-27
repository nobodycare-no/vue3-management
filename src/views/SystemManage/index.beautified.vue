<template>
    <div class="sys-page">
        <div class="sys-card">
            <div class="sys-toolbar">
                <h2 class="sys-toolbar__title">用户管理</h2>
                <div class="sys-toolbar__actions">
                    <el-input
                        v-model="searchInfo"
                        class="sys-toolbar__input"
                        placeholder="请输入要搜索的用户信息"
                        clearable
                        @keyup.enter="searchHandler"
                    />
                    <el-button type="primary" @click="searchHandler">搜索</el-button>
                    <el-button type="primary" @click="addHandler">添加</el-button>
                </div>
            </div>

            <el-table
                class="sys-table"
                :data="userInfo.list"
                border
                stripe
                style="width: 100%"
                :header-cell-style="tableHeaderStyle"
            >
                <el-table-column label="ID" prop="id" width="80" align="center" />
                <el-table-column label="用户名" prop="username" min-width="120" show-overflow-tooltip />
                <el-table-column label="权限" width="120" align="center">
                    <template #default="scope">
                        <el-tag :type="scope.row.permission == 'admin' ? 'danger' : 'info'" size="small">
                            {{ scope.row.permission == 'admin' ? '管理员' : '普通用户' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="电话" prop="phone" min-width="140" show-overflow-tooltip />
                <el-table-column label="操作" width="160" align="center" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" link size="small" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" link size="small" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="dialogAddVisible" title="添加用户" width="480px" align-center destroy-on-close>
            <el-form class="sys-form" :model="userForm" label-width="96px" label-position="right">
                <el-form-item label="用户名称">
                    <el-input v-model="userForm.username" placeholder="请输入用户名称" clearable />
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input
                        v-model="userForm.password"
                        type="password"
                        show-password
                        placeholder="请输入用户密码"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="用户权限">
                    <el-radio-group v-model="userForm.permission">
                        <el-radio value="admin" @click="permissionHandler('admin')">管理员</el-radio>
                        <el-radio value="vip" @click="permissionHandler('vip')">普通用户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户电话">
                    <el-input v-model="userForm.phone" placeholder="请输入用户电话" clearable />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="sys-dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmHandler">确定</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogUpdateVisible" title="修改用户信息" width="480px" align-center destroy-on-close>
            <el-form class="sys-form" :model="userUpdateForm" label-width="96px" label-position="right">
                <el-form-item label="用户名称">
                    <span class="sys-readonly-name">{{ userUpdateForm.username }}</span>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input
                        v-model="userUpdateForm.password"
                        type="password"
                        show-password
                        placeholder="新密码"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="用户权限">
                    <el-radio-group v-model="userUpdateForm.permission">
                        <el-radio value="admin" @click="permissionUpdateHandler('admin')">管理员</el-radio>
                        <el-radio value="vip" @click="permissionUpdateHandler('vip')">普通用户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户电话">
                    <el-input v-model="userUpdateForm.phone" placeholder="用户电话" clearable />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="sys-dialog-footer">
                    <el-button @click="dialogUpdateVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmUpdateHandler">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
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

const tableHeaderStyle = () => ({
    background: '#f5f7fa',
    color: '#606266',
    fontWeight: 600,
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
.sys-page {
    min-height: calc(100vh - 120px);
    padding: 16px;
    box-sizing: border-box;
    background: #f0f2f5;
}

.sys-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    padding: 16px;
    box-sizing: border-box;
}

.sys-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #ebeef5;
}

.sys-toolbar__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.sys-toolbar__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.sys-toolbar__input {
    width: 260px;
}

.sys-table {
    border-radius: 4px;
    overflow: hidden;
}

.sys-form :deep(.el-input),
.sys-form :deep(.el-input__wrapper) {
    width: 100%;
}

.sys-readonly-name {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    line-height: 32px;
}

.sys-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
